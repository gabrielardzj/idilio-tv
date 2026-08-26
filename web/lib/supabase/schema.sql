-- ═══════════════════════════════════════════════════════════════════════
--  «Continuará» — el Pase de la Noche
--  Lo que hay que agregar a la base de Idilio para sostener la mecánica.
--
--  Se asume que ya existen `series`, `episodes` y una tabla/ledger de monedas.
--  Todo lo de abajo es nuevo. Está escrito para Supabase (Postgres + RLS).
-- ═══════════════════════════════════════════════════════════════════════

-- ── 1 · Identidad, incluido el invitado ────────────────────────────────
-- El 88% de la base consume sin cuenta. La mecánica tiene que funcionar para
-- ellos desde el día uno, así que la fila de estado NO cuelga de auth.users:
-- cuelga de un device_id anónimo que después se puede migrar a una cuenta.

create table if not exists viewer (
  id            uuid primary key default gen_random_uuid(),
  device_id     text unique not null,          -- cookie first-party idl_did, ya existe en producción
  user_id       uuid references auth.users(id) on delete set null,
  -- La zona horaria es del USUARIO, no del servidor. MX, CO y US-hispano
  -- cruzan cuatro husos: calcular el corte de la noche en UTC le rompe la
  -- racha a las 10pm a alguien en Los Ángeles.
  timezone      text not null default 'America/Mexico_City',
  created_at    timestamptz not null default now()
);

-- ── 2 · El estado del metajuego ────────────────────────────────────────
create table if not exists pass_state (
  viewer_id     uuid primary key references viewer(id) on delete cascade,

  -- Pases disponibles, tope 2. El tope es la respuesta a la crítica que hundió
  -- al Daily Pass de Webtoon: un pase que caduca es una obligación disfrazada
  -- de regalo. Con tope 2, faltar una noche no cuesta nada, y volver seguido
  -- sigue rindiendo más porque la emisión es de 1 cada 24 h.
  passes        smallint not null default 1 check (passes between 0 and 2),

  -- Momento en que se acredita el próximo pase. NULL = está en el tope.
  -- Vive en el servidor a propósito: un countdown en cliente se vulnera
  -- cambiando la hora del teléfono.
  next_pass_at  timestamptz,

  nights        smallint not null default 0 check (nights between 0 and 7),
  shields       smallint not null default 0 check (shields between 0 and 1),

  -- Última noche contada. Es una fecha, no un timestamp: la noche es la unidad.
  last_night    date,

  updated_at    timestamptz not null default now()
);

-- ── 3 · Desbloqueos ────────────────────────────────────────────────────
create table if not exists episode_unlock (
  viewer_id     uuid not null references viewer(id) on delete cascade,
  episode_id    uuid not null references episodes(id) on delete cascade,
  -- 'pass' no descuenta monedas; 'coins' sí. Separarlos permite medir
  -- canibalización, que es el guardrail de toda la intervención.
  source        text not null check (source in ('free', 'pass', 'coins')),
  created_at    timestamptz not null default now(),
  primary key (viewer_id, episode_id)
);

create index if not exists episode_unlock_by_source
  on episode_unlock (source, created_at desc);

-- ── 4 · La noche, definida una sola vez ────────────────────────────────
-- La ventana corre de 5am a 5am en la zona del usuario. Ver a las 23:40 del
-- martes y a las 00:20 del miércoles son DOS noches, que es como el usuario
-- las vivió. Con corte a medianoche serían una sola y el martes quedaría roto.
create or replace function night_of(ts timestamptz, tz text)
returns date
language sql immutable as $$
  select (ts at time zone tz - interval '5 hours')::date
$$;

-- ── 5 · Usar un pase, de forma atómica ─────────────────────────────────
-- Todo en una transacción y del lado del servidor: descontar el pase, avanzar
-- la racha si la noche es nueva, pagar el bono, dar el comodín y registrar el
-- desbloqueo. Si el cliente miente sobre la hora, esto no se entera.
create or replace function use_pass(p_viewer uuid, p_episode uuid)
returns table (passes smallint, nights smallint, shields smallint, coins_awarded int)
language plpgsql security definer as $$
declare
  v_tz     text;
  v_now    timestamptz := now();
  v_night  date;
  v_state  pass_state%rowtype;
  v_bonus  int := 0;
  v_shield boolean := false;
begin
  select timezone into v_tz from viewer where id = p_viewer;
  if v_tz is null then raise exception 'viewer desconocido'; end if;

  v_night := night_of(v_now, v_tz);

  select * into v_state from pass_state where viewer_id = p_viewer for update;
  if v_state.passes < 1 then raise exception 'sin pases disponibles'; end if;

  -- La racha solo avanza una vez por noche.
  if v_state.last_night is distinct from v_night then
    if v_state.last_night is null or v_state.last_night = v_night - 1 then
      v_state.nights := least(v_state.nights + 1, 7);
    elsif v_state.shields > 0 then
      v_state.shields := v_state.shields - 1;      -- el comodín se consume solo
      v_state.nights  := least(v_state.nights + 1, 7);
    else
      v_state.nights := 1;                          -- se cortó
    end if;
    v_state.last_night := v_night;

    -- Bonos solo en las noches 3, 5 y 7: la emisión se concentra en quien
    -- ya volvió varias veces, no en quien pasa una vez.
    v_bonus  := case v_state.nights when 3 then 30 when 5 then 45 when 7 then 75 else 0 end;
    v_shield := v_state.nights = 3;
  end if;

  update pass_state set
    passes       = v_state.passes - 1,
    -- si estaba en el tope, el reloj del próximo pase arranca ahora
    next_pass_at = coalesce(v_state.next_pass_at, v_now + interval '24 hours'),
    nights       = v_state.nights,
    shields      = least(v_state.shields + case when v_shield then 1 else 0 end, 1),
    last_night   = v_state.last_night,
    updated_at   = v_now
  where viewer_id = p_viewer;

  insert into episode_unlock (viewer_id, episode_id, source)
  values (p_viewer, p_episode, 'pass')
  on conflict do nothing;

  if v_bonus > 0 then
    perform credit_coins(p_viewer, v_bonus, 'streak_bonus');  -- ledger existente
  end if;

  return query
    select ps.passes, ps.nights, ps.shields, v_bonus
    from pass_state ps where ps.viewer_id = p_viewer;
end $$;

-- ── 6 · Acreditar pases con el paso del tiempo ─────────────────────────
-- Un pase cada 24 h hasta el tope de 2. Se ejecuta con pg_cron cada 5 min, o
-- de forma perezosa al leer el estado — lo segundo evita un job por usuario.
create or replace function accrue_passes(p_viewer uuid)
returns void
language sql as $$
  update pass_state set
    passes       = least(passes + 1, 2),
    next_pass_at = case when passes + 1 >= 2 then null else next_pass_at + interval '24 hours' end,
    updated_at   = now()
  where viewer_id = p_viewer
    and passes < 2
    and next_pass_at is not null
    and next_pass_at <= now();
$$;

-- ── 7 · RLS ────────────────────────────────────────────────────────────
alter table pass_state    enable row level security;
alter table episode_unlock enable row level security;

-- Nadie escribe estas tablas directo: solo a través de use_pass(), que es
-- security definer. El cliente únicamente lee su propia fila.
create policy pass_state_own on pass_state for select
  using (viewer_id in (select id from viewer where user_id = auth.uid()));

create policy unlock_own on episode_unlock for select
  using (viewer_id in (select id from viewer where user_id = auth.uid()));

-- ── 8 · Migrar invitado a cuenta ───────────────────────────────────────
-- El prompt de cuenta aparece cuando el invitado ya tiene racha y saldo que
-- perder. Esto es lo que hace que no pierda nada al aceptar.
create or replace function claim_guest(p_device text, p_user uuid)
returns uuid
language plpgsql security definer as $$
declare v_id uuid;
begin
  update viewer set user_id = p_user where device_id = p_device and user_id is null
  returning id into v_id;
  return v_id;
end $$;
