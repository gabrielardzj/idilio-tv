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

  -- LA CITA: la hora de mañana en que este usuario suele ver. NULL = está en
  -- el tope. No es un temporizador que acredite nada — el pase se acredita al
  -- terminar un episodio, en credit_night(). Esto solo alimenta la promesa que
  -- se muestra en el muro y el push.
  -- Vive en el servidor a propósito: un countdown en cliente se vulnera
  -- cambiando la hora del teléfono.
  next_pass_at  timestamptz,

  -- Hora habitual de este usuario, derivada de su historial de reproducción.
  -- Anclar la cita a "+24 h desde el último uso" la deja caer a una hora
  -- arbitraria, y una cita a una hora arbitraria no es una cita.
  habitual_hour numeric(4,2) not null default 21.5,

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
returns table (passes smallint, nights smallint)
language plpgsql security definer as $$
declare
  v_now   timestamptz := now();
  v_state pass_state%rowtype;
begin
  select * into v_state from pass_state where viewer_id = p_viewer for update;
  if v_state.passes < 1 then raise exception 'sin pases disponibles'; end if;

  -- Gastar el pase NO avanza la racha: eso ya pasó en credit_night() al
  -- terminar el episodio. Aquí solo se descuenta y se registra el desbloqueo.
  update pass_state set
    passes     = v_state.passes - 1,
    updated_at = v_now
  where viewer_id = p_viewer;

  insert into episode_unlock (viewer_id, episode_id, source)
  values (p_viewer, p_episode, 'pass')
  on conflict do nothing;

  return query select ps.passes, ps.nights from pass_state ps where ps.viewer_id = p_viewer;
end $$;

-- ── 6 · Acreditar la noche ─────────────────────────────────────────────
-- Se llama al terminar un episodio, no con un cron.
--
-- Es la decisión de producto con más peso de todo el esquema: mientras la
-- acreditación cuelgue de un botón —o de un reloj que puede sonar cuando el
-- usuario no está— la adopción de la fuente se queda donde está hoy, en 19%.
-- Acreditando al ver, es del ~100% por construcción.
--
-- Idempotente dentro de la misma noche: llamarla en cada episodio es seguro.
create or replace function credit_night(p_viewer uuid)
returns table (nights smallint, passes smallint, shields smallint, coins int, broke boolean)
language plpgsql security definer as $$
declare
  v_tz     text;
  v_hab    numeric;
  v_now    timestamptz := now();
  v_night  date;
  v_st     pass_state%rowtype;
  v_bonus  int := 0;
  v_broke  boolean := false;
begin
  select timezone, habitual_hour into v_tz, v_hab from viewer v
    join pass_state ps on ps.viewer_id = v.id where v.id = p_viewer;

  v_night := night_of(v_now, v_tz);

  select * into v_st from pass_state where viewer_id = p_viewer for update;
  if v_st.last_night = v_night then
    return query select v_st.nights, v_st.passes, v_st.shields, 0, false;
    return;
  end if;

  if v_st.last_night is null or v_st.last_night = v_night - 1 then
    v_st.nights := least(v_st.nights + 1, 7);
  elsif v_st.shields > 0 then
    v_st.shields := v_st.shields - 1;            -- el comodín se consume solo
    v_st.nights  := least(v_st.nights + 1, 7);
  else
    v_st.nights := 1;                             -- se cortó
    v_broke := true;
  end if;

  v_bonus := case v_st.nights when 3 then 30 when 5 then 45 when 7 then 75 else 0 end;

  update pass_state set
    nights       = v_st.nights,
    shields      = least(v_st.shields + case when v_st.nights = 3 then 1 else 0 end, 1),
    passes       = least(passes + 1, 2),
    last_night   = v_night,
    -- la cita de mañana, a la hora de siempre de este usuario
    next_pass_at = case when least(passes + 1, 2) >= 2 then null
                        else (v_night + 1 + (v_hab || ' hours')::interval) at time zone v_tz end,
    updated_at   = v_now
  where viewer_id = p_viewer;

  if v_bonus > 0 then perform credit_coins(p_viewer, v_bonus, 'streak_bonus'); end if;

  return query
    select ps.nights, ps.passes, ps.shields, v_bonus, v_broke
    from pass_state ps where ps.viewer_id = p_viewer;
end $$;

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
