import { Bell, Check, Chevron, Coin, Pass, Shield } from './Icons'
import { NextPass, StreakStrip } from './bits'
import { TabBar, type Tab } from './TabBar'
import { frameStyle } from '../lib/frame'
import { EPISODE_COST, FUENTES_HOY, MAX_PASSES, STREAK, episodesLabel, toEpisodes } from '../lib/economy'
import { desbloqueadoDe, enCurso, serieDe, type State } from '../lib/state'

/**
 * «Tu noche» — la pestaña que hoy es «Perfil».
 *
 * ── Por qué existe esta pantalla, si el diagnóstico descartó el perfil ──
 * El diagnóstico (§1.3) descartó **el perfil como palanca de engagement**: el
 * 82% nunca lo abre, así que nada que dependa de ir hasta ahí puede mover una
 * métrica que se calcula sobre la base entera. Esa conclusión sigue en pie y
 * esta pantalla no la contradice: el metajuego sigue ocurriendo en el player y
 * en el muro, y nada de lo que se gana se gana acá.
 *
 * Lo que esta pantalla hace es otra cosa: ser **el libro mayor y la caja
 * fuerte**. Dice qué tienes, de dónde salió y cómo no perderlo. Es el único
 * trabajo que el muro no puede hacer, porque el muro aparece cuando el usuario
 * quiere ver, no cuando quiere entender.
 *
 * ── La misma pantalla en dos estados ──────────────────────────
 * Invitado (88% de la base) y con cuenta (12%) comparten esqueleto: el mismo
 * orden, los mismos bloques. Cambia UNO —el que habla de la cuenta— y se le
 * agrega el historial, que es lo único que una cuenta hace posible de verdad.
 * Dos pantallas distintas serían dos productos, y el invitado no podría ver qué
 * gana registrándose: lo vería como una promesa en vez de como el mismo cuarto
 * con una puerta más.
 */
export function Perfil({
  state, onIr, onSerie, onUsarPase, onAnuncio, onDetalle, onCrearCuenta, onRemind,
}: {
  state: State
  onIr: (t: Tab) => void
  onSerie: (id: string) => void
  onUsarPase: () => void
  onAnuncio: () => void
  onDetalle: () => void
  onCrearCuenta: () => void
  onRemind: () => void
}) {
  const enCurso3 = enCurso(state).slice(0, 3)
  const anunciosQuedan = FUENTES_HOY.anuncio.topeDiario - state.anunciosHoy

  // Lo ganado sin pagar en esta vuelta de 7 noches. Es la misma cuenta que hace
  // la hoja «Tu economía» y sale del mismo sitio a propósito: si las dos
  // superficies dijeran cifras distintas, la que el usuario creería es ninguna.
  const bonos = STREAK.slice(0, Math.max(state.nights, 1)).reduce((a, n) => a + n.coins, 0)
  const ganado = bonos + state.passesUsed * EPISODE_COST + state.anunciosHoy * FUENTES_HOY.anuncio.monedas

  return (
    <div className="perfil">
      <header className="perfil-top">
        <div>
          <h1>Tu noche</h1>
          {/* Qué hay adentro, dicho en las tres cosas que el usuario reconoce.
              Decía «la noche corre de 5 a.m. a 5 a.m.» y eso ya lo dice la tira
              de racha dos bloques más abajo: un encabezado que repite la letra
              chica del contenido no promete nada. */}
          <p>Tu pase, tu racha y tu saldo.</p>
        </div>
        {state.hasAccount && <span className="cuenta-chip"><Check s={12} /> g•••@gmail.com</span>}
      </header>

      <div className="perfil-scroll">
        {/* ── 1 · El pase ────────────────────────────────────────
            Va primero porque es lo único accionable de la pantalla y porque es
            la razón por la que el distintivo de la pestaña llamó. Si el
            distintivo dice «1 pase» y hay que bajar a buscarlo, el distintivo
            mintió. */}
        {state.passes > 0 ? (
          <div className="pass">
            <div className="pass-h">
              <Pass s={26} />
              <b>{state.passes === 1 ? 'Tienes 1 pase' : `Tienes ${state.passes} pases`}</b>
            </div>
            <p>
              {state.passes >= MAX_PASSES
                ? 'Estás en el tope. El próximo empieza a acumularse cuando uses uno.'
                : 'Vale un episodio, en la serie que tú elijas. Si no lo usas hoy no se pierde.'}
            </p>
            <button className="btn btn-gold" onClick={onUsarPase}>
              <Pass s={20} /> Usar el pase
            </button>
          </div>
        ) : (
          <div className="pass waiting">
            <div className="pass-h">
              <Pass s={26} />
              <b>Tu próximo pase</b>
            </div>
            {state.passNextAt
              ? <NextPass readyAt={state.passNextAt} now={state.now} />
              : <p>Llega al terminar tu primer episodio de la noche.</p>}
            <button className={`remind ${state.remind ? 'on' : ''}`} onClick={onRemind} aria-pressed={state.remind}>
              <Bell s={16} /> {state.remind ? 'Te avisamos cuando llegue' : 'Avísame cuando llegue'}
            </button>
          </div>
        )}

        {/* ── 2 · La racha ─────────────────────────────────────── */}
        <StreakStrip nights={state.nights} shields={state.shields} shieldJustUsed={state.shieldJustUsed} />

        {/* ── 3 · Dónde ibas ───────────────────────────────────
            El patrón que Netflix puso en «My Netflix» y que DramaBox reparte en
            Following / History: la pestaña propia es donde está lo que ya
            empezaste. En Idilio ese riel existe pero vive en el home, mezclado
            con ocho vitrinas más; acá es lo único que hay, y con el número que
            el home no da: cuántos episodios faltan. */}
        {enCurso3.length > 0 && (
          <>
            <div className="sect-label">Dónde ibas</div>
            <div className="perfil-card">
              {enCurso3.map((c, i) => {
                const s = serieDe(c.id)
                const va = state.vistos[c.id] ?? 0
                const abierto = desbloqueadoDe(state, c.id)
                return (
                  <button key={c.id} className="fila-serie" onClick={() => onSerie(c.id)}>
                    <span className="thumb" style={frameStyle(s.hue, i + 3)} />
                    <span className="fila-body">
                      <b>{s.title}</b>
                      <span className="next">Sigues en el episodio {va}</span>
                      <span className="prog">Quedan {s.total - abierto} de {s.total}</span>
                    </span>
                    <Chevron s={18} />
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* ── 4 · El saldo ─────────────────────────────────────
            Traducido, como todo en esta propuesta: la moneda nunca viaja sola.
            Y con la fuente gratuita grande del producto real —el anuncio— dicha
            en episodios y no en el «0/10» gris que el muro usa hoy. */}
        <div className="sect-label">Tu saldo</div>
        <div className="perfil-card">
          <div className="saldo">
            <Coin s={30} />
            <div>
              <b>{state.balance} monedas</b>
              <span>{episodesLabel(state.balance)} · cada uno cuesta {EPISODE_COST}</span>
            </div>
          </div>

          <button className="fila" onClick={onAnuncio} disabled={anunciosQuedan <= 0}>
            <span className="fila-body">
              <b>Ver un anuncio</b>
              <span className="prog">
                {anunciosQuedan > 0
                  ? `Te quedan ${anunciosQuedan} ${anunciosQuedan === 1 ? 'episodio gratis' : 'episodios gratis'} por esta vía hoy`
                  : 'Ya usaste los 10 de hoy. Vuelven a las 5 a.m.'}
              </span>
            </span>
            <Chevron s={18} />
          </button>

          {/* Esta fila NO es nueva: es «Historial de monedas», que el producto
              ya tiene en el perfil, con otro trabajo. El original lista
              transacciones; esta responde la pregunta que el usuario se hace
              —de dónde salen— y la contesta en episodios. El dato ya está: lo
              que falta es la traducción, que es la tesis de toda la
              intervención (I1). */}
          <button className="fila" onClick={onDetalle}>
            <span className="fila-body">
              <b>De dónde salen tus monedas</b>
              <span className="prog">Llevas {ganado} monedas · {toEpisodes(ganado)} episodios ganados sin pagar</span>
            </span>
            <Chevron s={18} />
          </button>
        </div>

        {/* ── 5 · La cuenta ────────────────────────────────────
            El bloque que separa los dos estados, y el único. Va DESPUÉS del
            valor y nunca antes: pedir la cuenta arriba convertiría la pantalla
            en un muro de registro, que es lo que este producto no tiene y no
            debe tener (88% son invitados). El precedente de la categoría va en
            el mismo sentido: ReelShort da UID de invitado al instante y ofrece
            monedas por registrarse — incentivo, no requisito.

            Y el propio Idilio ya lo hace bien: su perfil real ofrece «Hasta +30
            al crear una cuenta» junto a «puedes registrarte en cualquier
            momento» (capturas del 2-sep-2026). Lo que cambia acá no es el
            patrón, es la cifra: en vez de un bono genérico, lo que se pone en
            juego es lo que el usuario ya tiene. */}
        {state.hasAccount ? (
          <>
            <div className="sect-label">Tu cuenta</div>
            <div className="perfil-card">
              <div className="guardado">
                <Check s={15} />
                <p><b>Guardado.</b> Tu racha, tus pases y tus monedas están en g•••@gmail.com y viajan contigo a cualquier teléfono.</p>
              </div>
              <Historial nights={state.nights} />
            </div>
          </>
        ) : (
          <>
            <div className="sect-label">Antes de que se te pierda</div>
            <div className="perfil-card riesgo">
              <p className="riesgo-t">
                <b>Esto vive solo en este teléfono.</b> Si lo cambias o borras la app, se va — y no hay forma de recuperarlo.
              </p>
              <div className="stakes">
                <div className="stake cyan">
                  <div className="v">{state.nights}</div>
                  <div className="l">noches de racha</div>
                </div>
                <div className="stake gold">
                  <div className="v">{state.balance}</div>
                  <div className="l">monedas · {toEpisodes(state.balance)} eps</div>
                </div>
                <div className="stake">
                  <div className="v">{state.shields}</div>
                  <div className="l">comodín</div>
                </div>
              </div>
              <button className="btn btn-violet" onClick={onCrearCuenta}>Guardar con mi correo</button>
              <p className="riesgo-p">Solo el correo. Nada de contraseña ni de perfil.</p>
            </div>
          </>
        )}

        {/* ── 6 · Ajustes ──────────────────────────────────────
            Acá está TODO lo que el perfil real ya tiene hoy —Notificaciones con
            su distintivo, Métodos de inicio de sesión, Enviar Feedback e
            Idioma—, más la pieza que le falta: restaurar compras. Conservarlo
            es la misma decisión que se tomó con la pestaña «Recompensas»: una
            propuesta que amputa funciones que el producto ya envió no es un
            rediseño, es una maqueta.

            Dos cambios respecto del original, los dos declarados en
            `docs/07-perfil/`:
            · «Historial de monedas» sube al bloque del saldo, traducido.
            · «Idioma» pasa de tres banderas siempre desplegadas a una fila con
              su valor: ocupaba un cuarto de la pantalla para un ajuste que se
              toca una vez en la vida. */}
        <div className="sect-label">Ajustes</div>
        <div className="perfil-card">
          <button className="fila">
            <span className="fila-body"><b>Notificaciones</b></span>
            <span className="pip">2</span>
            <Chevron s={18} />
          </button>
          <button className="fila">
            <span className="fila-body">
              <b>{state.hasAccount ? 'Métodos de inicio de sesión' : 'Ya tengo cuenta'}</b>
              <span className="prog">{state.hasAccount ? 'Correo, Google y Facebook' : 'Iniciar sesión desde otro teléfono'}</span>
            </span>
            <Chevron s={18} />
          </button>
          <button className="fila"><span className="fila-body"><b>Restaurar compras</b><span className="prog">Si ya pagaste el Pase Idilio en otro teléfono</span></span><Chevron s={18} /></button>
          <button className="fila"><span className="fila-body"><b>Idioma</b></span><span className="prog">Español</span><Chevron s={18} /></button>
          <button className="fila"><span className="fila-body"><b>Enviar feedback</b></span><Chevron s={18} /></button>
          {state.hasAccount && (
            <button className="fila"><span className="fila-body"><b>Cerrar sesión</b><span className="prog">Tu racha y tus monedas quedan guardadas</span></span><Chevron s={18} /></button>
          )}
        </div>

        <p className="perfil-nota">
          El Pase de la Noche se acredita al terminar un episodio, no acá.
          Esta pantalla dice qué tienes; no es donde se gana.
          {/* El identificador que el perfil real enseña arriba a la derecha del
              invitado. No se borra —soporte lo pide— pero no compite con nada:
              acá abajo, del tamaño de la letra chica que es. */}
          <br /><span className="perfil-id">ID 50654024</span>
        </p>
      </div>

      <TabBar activa="perfil" onIr={onIr} pases={state.passes} />
    </div>
  )
}

/**
 * Las últimas cinco semanas, noche por noche.
 *
 * Es lo único que una cuenta habilita y el invitado no puede tener: un registro
 * que sobreviva al teléfono. Y es la respuesta a F5 —«el usuario no puede ver su
 * propio progreso»— en el único sitio donde un histórico no estorba, porque acá
 * el usuario ya vino a mirar.
 *
 * DATO DE PROTOTIPO: las 31 noches previas están escritas a mano —no medidas—.
 * En el producto saldrían del servidor. Se dejan fijas y no aleatorias para que
 * la pantalla se vea igual en cada captura. La densidad no es arbitraria: 13 de
 * 31 son 2.9 noches por semana, apenas por encima de las 2.3 que hace hoy el
 * usuario promedio (DAU/MAU 0.33). Un calendario casi lleno sería una pantalla
 * bonita contando un producto que no existe.
 *
 * La racha en curso no se dibuja aparte: se escribe sobre la cola del patrón,
 * para que el calendario y la tira de noches no puedan contradecirse.
 */
const HISTORIAL_BASE = '0100010010000110010001001000000'

function Historial({ nights }: { nights: number }) {
  const noches = HISTORIAL_BASE.split('').map((c) => c === '1')
  for (let i = 0; i < Math.min(nights, noches.length); i++) noches[noches.length - 1 - i] = true

  const total = noches.filter(Boolean).length
  // La racha más larga del período, contada y no escrita: si el número fuera
  // literal, un cambio en el patrón lo dejaría mintiendo en silencio.
  let mejor = 0, corriendo = 0
  for (const v of noches) { corriendo = v ? corriendo + 1 : 0; if (corriendo > mejor) mejor = corriendo }

  return (
    <div className="historial">
      <div className="historial-h">
        <b>Tus noches</b>
        <span>{total} de las últimas {noches.length}</span>
      </div>
      <div className="historial-grid" aria-hidden="true">
        {noches.map((v, i) => <i key={i} className={v ? 'on' : ''} />)}
      </div>
      <p className="historial-p">
        <Shield s={14} c="#3FE0D0" />
        <span>
          Tu mejor racha {mejor === 1 ? 'es' : 'son'} {mejor} {mejor === 1 ? 'noche' : 'noches'} seguidas
          {mejor === nights ? ' — la que llevas ahora.' : '.'}
        </span>
      </p>
    </div>
  )
}
