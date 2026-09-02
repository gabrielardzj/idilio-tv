import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import './styles.css'
import { Home } from './components/Home'
import { Player } from './components/Player'
import { Serie } from './components/Serie'
import { Wall } from './components/Wall'
import { AccountPrompt, Celebrate, PassChoice, Store, StreakSheet } from './components/Sheets'
import { Coin, Logo } from './components/Icons'
import { enCurso, serieDe } from './lib/state'
import { useCapas } from './lib/capas'
import { CATALOGO, EPISODE_COST, MAX_PASSES, PASS_COOLDOWN_MS, episodesLabel, weeklyIssuance } from './lib/economy'
import { initialState, proximaCita, reduce, stateName, type Action, type Ctx, type Pantalla, type Sheet, type State } from './lib/state'

const T0 = 1_756_099_020_000 // reloj fijo a las 00:17: el POC vive en la franja de las 11pm-2am

/* ─────────────────────────────────────────────────────────────
   Movimiento

   Las duraciones de SALIDA viven acá y en `styles.css`, y tienen
   que coincidir: el CSS dice cómo se va una capa, esto dice cuánto
   la sostenemos montada. Si divergen, o se ve un salto al final o
   queda una pantalla muerta encima.
   ───────────────────────────────────────────────────────────── */
const SALIDA_HOJA = 220      // .capa-hoja.sale > .sheet
const SALIDA_PANTALLA = 340  // --t-nav (320 ms) con un margen para el último frame

/** Qué hace distinta a una pantalla de otra. Dos series distintas son dos
 *  pantallas distintas; la misma serie con el saldo cambiado, no. */
const clavePantalla = (p: Pantalla) => (p.en === 'serie' ? `serie-${p.id}` : p.en)

/** Las hojas se distinguen por su tipo. `unlocked` cambia de episodio sin
 *  cambiar de hoja: eso se refresca en su sitio, no se reanima. */
const claveHoja = (s: Sheet) => s.kind

/** Profundidad de la navegación: el home está en la superficie y el player
 *  es lo más adentro que se llega. De ahí sale el sentido del movimiento. */
const HONDURA: Record<Pantalla['en'], number> = { home: 0, serie: 1, player: 2 }

/**
 * Hacia dónde va la transición. Es lo que vuelve legible una navegación:
 * entrar por la derecha y salir por la izquierda dice «avancé», y las dos
 * mismas pantallas en sentido inverso dicen «volví». El player no avanza:
 * se levanta encima, como el reproductor del producto real.
 */
function rumbo(antes: Pantalla | null, ahora: Pantalla | null) {
  if (!antes || !ahora) return ''
  if (ahora.en === 'player') return 'sube'
  if (antes.en === 'player') return 'baja'
  if (antes.en === ahora.en) return 'avanza'   // de una serie a otra
  return HONDURA[ahora.en] > HONDURA[antes.en] ? 'avanza' : 'vuelve'
}

/** Una hoja que releva a otra no vuelve a subir desde abajo: ya está ahí.
 *  Se disuelve en la que llega. */
const relevo = (antes: Sheet | null, ahora: Sheet | null) => (antes && ahora ? 'releva' : '')

/** Miles con punto, como se escriben en es-419. A mano y no con
 *  `toLocaleString`: ese método separa según el locale que le pasen —es-MX usa
 *  coma— y el número terminaría escrito distinto que en los documentos. */
const miles = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export default function App() {
  const [ctx, dispatch] = useReducer(reduce, { state: initialState(T0), sheet: { kind: 'none' } } as Ctx)
  const { state, sheet } = ctx
  const [justAdvanced, setJustAdvanced] = useState(false)
  const [pulse, setPulse] = useState(false)
  const [speed, setSpeed] = useState(1)
  const prevBalance = useRef(state.balance)

  // Las capas: lo que está y, mientras dure la transición, lo que se va. Ver
  // `lib/capas.ts` — es lo que convierte cada cambio de pantalla y cada hoja
  // en un movimiento con principio y final en vez de en un corte.
  const pantallas = useCapas(state.pantalla, clavePantalla, SALIDA_PANTALLA, rumbo)
  const hojas = useCapas(sheet.kind === 'none' ? null : sheet, claveHoja, SALIDA_HOJA, relevo)
  const cerrando = hojas.length > 0 && hojas.every((h) => h.sale)
  // La capa que está ENTRANDO, o `undefined` si no hay ninguna. Es lo que
  // gobierna el foco: ver la nota del efecto de abajo.
  const hojaViva = hojas.find((h) => !h.sale)?.id

  // El reloj solo corre cuando hay una cuenta regresiva a la vista. Tickear
  // siempre re-renderizaba la app entera cada segundo — con 62 miniaturas en el
  // home eso es trabajo tirado, y además impedía que la pantalla llegara nunca
  // a estar quieta.
  const relojVisible = sheet.kind === 'unlock' && state.passes === 0 && state.passNextAt !== null
  useEffect(() => {
    if (!relojVisible && speed === 1) return
    const id = setInterval(() => dispatch({ t: 'tick', now: ctx.state.now + 1000 * speed }), 1000)
    return () => clearInterval(id)
  }, [ctx.state.now, speed, relojVisible])

  useEffect(() => {
    if (state.balance !== prevBalance.current) {
      prevBalance.current = state.balance
      setPulse(true)
      const id = setTimeout(() => setPulse(false), 700)
      return () => clearTimeout(id)
    }
  }, [state.balance])

  useEffect(() => {
    if (!state.toast) return
    const id = setTimeout(() => dispatch({ t: 'toast', msg: null }), 2600)
    return () => clearTimeout(id)
  }, [state.toast])

  // Las hojas se declaran role="dialog" y no se comportaban como una: al
  // abrirlas el foco se quedaba donde estuviera —fuera de la hoja, en contenido
  // que el scrim tapa y que el usuario no ve— y Escape no las cerraba. El
  // ciclado de Tab que hay abajo es cinturón y tirantes: medido, el foco ya se
  // quedaba dentro sin él. Se resuelve en un solo sitio, consultando
  // el DOM en vez de envolver nada: la hoja está posicionada contra el teléfono
  // y un contenedor nuevo sería una oportunidad de romper el encuadre.
  // Lo que dispara este efecto es `hojaViva`, no `sheet.kind`. `useCapas` monta
  // la capa desde un efecto, o sea un render DESPUÉS de que la hoja cambió:
  // mirando solo `sheet.kind`, el efecto corría cuando todavía no había nada en
  // el DOM, no encontraba la hoja y se salía — el diálogo abría sin foco y sin
  // Escape. `hojaViva` cambia justo cuando la capa ya está puesta.
  //
  // `sheet.kind` va igualmente en las dependencias, porque el efecto lo lee y
  // omitirlo dejaba un aviso de lint. Se comprobó que no reintroduce el fallo:
  // la pasada temprana se sale sola por la guarda, y durante un relevo el foco
  // no cae ni una vez en la hoja saliente.
  useEffect(() => {
    if (sheet.kind === 'none' || hojaViva === undefined) return
    // `:not(.sale)` importa: durante un relevo hay dos hojas en el DOM, y el
    // foco tiene que irse a la que llega, no a la que se está yendo.
    const hoja = document.querySelector<HTMLElement>('.phone .capa-hoja:not(.sale) .sheet')
    if (!hoja) return
    const previo = document.activeElement as HTMLElement | null
    const focusables = () =>
      [...hoja.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .filter((e) => e.offsetParent !== null)

    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      // Escape cierra siempre, incluida la celebración. El scrim sí la exceptúa,
      // porque un toque fuera puede ser accidental y Escape nunca lo es.
      if (e.key === 'Escape') { e.preventDefault(); dispatch({ t: 'close' }); return }
      if (e.key !== 'Tab') return
      const f = focusables()
      if (!f.length) return
      const [primero] = f
      const ultimo = f[f.length - 1]
      if (!hoja.contains(document.activeElement)) { e.preventDefault(); primero.focus() }
      else if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus() }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus() }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      // Devolver el foco a donde estaba: si no, cerrar el muro deja al usuario
      // de teclado al principio de la página.
      previo?.focus?.()
    }
  }, [hojaViva, sheet.kind])

  const series = serieDe(state.seriesId)
  // Cuántas historias tiene empezadas de verdad. Con una sola, pedirle que
  // elija sería teatro: el pase va donde está.
  const activeSeries = enCurso(state).length

  const claim = (id: string) => {
    dispatch({ t: 'claimPass', series: id })
    setJustAdvanced(true)
    setTimeout(() => setJustAdvanced(false), 2600)
  }

  const openPass = () => {
    // Con más de una serie activa, la elección es parte de la mecánica.
    if (activeSeries > 1) dispatch({ t: 'open', sheet: { kind: 'pass-choice' } })
    else claim(state.seriesId)
  }

  const closeCelebrate = () => {
    dispatch({ t: 'close' })
    // El prompt de cuenta aparece una sola vez: cuando ya hay racha + saldo.
    if (!state.hasAccount && !state.accountAsked && state.nights >= 3) {
      setTimeout(() => dispatch({ t: 'open', sheet: { kind: 'account' } }), 700)
    }
  }

  const clock = useMemo(() => {
    const d = new Date(state.now)
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
  }, [state.now])

  return (
    <div className="stage">
      <main className="phone" data-state={stateName(state, sheet)} aria-label="Idilio TV — prototipo">
        <div className="statusbar">
          <span>{clock}</span>
          <span className="sb-r">▪▪▪ ⌁ <b style={{ fontSize: 12 }}>38</b></span>
        </div>

        {/* Una capa por pantalla viva. Normalmente hay una; durante una
            navegación hay dos, y las dos se mueven: la que llega entra por
            donde corresponde y la que se va sale por el lado contrario. Sin
            eso, cambiar de pantalla enseñaba el fondo negro del teléfono
            durante toda la animación de entrada. */}
        {pantallas.map(({ id, valor, sale, dir }) => (
          <div key={id} className={`pantalla ${dir} ${sale ? 'sale' : ''}`} inert={sale || undefined}>
            {valor.en === 'home' && (
              <Home
                state={state}
                onSerie={(sid) => dispatch({ t: 'verSerie', id: sid })}
                onWallet={() => dispatch({ t: 'open', sheet: { kind: 'streak' } })}
              />
            )}
            {valor.en === 'serie' && (
              <Serie
                id={valor.id}
                state={state}
                onVolver={() => dispatch({ t: 'ir', a: { en: 'home' } })}
                onEpisodio={(n) => dispatch({ t: 'abrirEpisodio', id: valor.id, n })}
              />
            )}
            {valor.en === 'player' && (
              <Player
                series={series} ep={state.episode} balance={state.balance} walletPulse={pulse}
                onWallet={() => dispatch({ t: 'open', sheet: { kind: 'streak' } })}
                onNext={() => dispatch({ t: 'nextEpisode' })}
                onPrev={() => dispatch({ t: 'devSetState', patch: { episode: Math.max(1, state.episode - 1) } })}
                onVolver={() => dispatch({ t: 'verSerie', id: state.seriesId })}
              />
            )}
          </div>
        ))}

        {/* El acuse es del player. Si hay una hoja abierta —el caso real: terminas
            el episodio, se acredita la noche y acto seguido se abre el muro— el
            toast taparía el encabezado, y además sobra: la tira de racha de la
            hoja ya dice lo mismo, y con más detalle. */}
        {state.toast && sheet.kind === 'none' && (
          <div className="toast"><Coin s={16} /> {state.toast}</div>
        )}

        {/* El velo se pinta mientras haya alguna hoja viva —incluida la que se
            está yendo— y se apaga con ella. Un relevo de hoja a hoja no lo
            toca: el velo no parpadea entre dos pantallas que son la misma
            conversación. */}
        {hojas.length > 0 && (
          <div
            className={`scrim ${cerrando ? 'sale' : ''}`}
            onClick={() => sheet.kind !== 'none' && sheet.kind !== 'unlocked' && dispatch({ t: 'close' })}
          />
        )}

        {/* Cada hoja va dentro de su capa. La capa es la que lleva el
            movimiento; la hoja de adentro no cambia. Así una hoja puede
            relevar a otra sin volver a subir desde abajo. */}
        {hojas.map(({ id, valor, sale, dir }) => (
          <div key={id} className={`capa-hoja ${dir} ${sale ? 'sale' : ''}`} inert={sale || undefined}>
            {valor.kind === 'unlock' && (
              <Wall
                state={state} series={series} justAdvanced={justAdvanced}
                onClaim={openPass}
                onCoins={() => dispatch({ t: 'unlockWithCoins' })}
                onStore={() => dispatch({ t: 'open', sheet: { kind: 'store' } })}
                onRemind={() => dispatch({ t: 'toggleRemind' })}
                onAnuncio={() => dispatch({ t: 'verAnuncio' })}
                onClose={() => dispatch({ t: 'close' })}
              />
            )}
            {valor.kind === 'pass-choice' && (
              <PassChoice state={state} onPick={claim} onClose={() => dispatch({ t: 'open', sheet: { kind: 'unlock' } })} />
            )}
            {valor.kind === 'store' && (
              <Store
                state={state}
                onBuy={(coins, cop) => dispatch({ t: 'buy', coins, cop })}
                onClose={() => dispatch({ t: 'open', sheet: { kind: 'unlock' } })}
              />
            )}
            {valor.kind === 'unlocked' && (
              <Celebrate state={state} via={valor.via} ep={valor.ep} justAdvanced={justAdvanced} onWatch={closeCelebrate} />
            )}
            {valor.kind === 'account' && (
              <AccountPrompt state={state} onCreate={() => dispatch({ t: 'createAccount' })} onSkip={() => dispatch({ t: 'dismissAccount' })} />
            )}
            {valor.kind === 'streak' && <StreakSheet state={state} onClose={() => dispatch({ t: 'close' })} />}
          </div>
        ))}
      </main>

      <Director state={state} sheet={sheet} dispatch={dispatch} speed={speed} setSpeed={setSpeed} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Panel de recorrido. Vive FUERA del teléfono a propósito: no es
   parte del producto, es el andamio para revisar los estados.
   ───────────────────────────────────────────────────────────── */
function Director({
  state, sheet, dispatch, speed, setSpeed,
}: {
  state: State; sheet: Sheet; dispatch: React.Dispatch<Action>
  speed: number; setSpeed: (n: number) => void
}) {
  const sheetKind = sheet.kind
  // Todos los pasos del recorrido ocurren dentro del loop: el muro, el pase y
  // la tienda aparecen sobre el episodio que se estaba viendo. Sin fijar la
  // pantalla, las hojas se abrían sobre el home —que es donde arranca la app— y
  // el fondo contaba una historia que no pasa nunca.
  const go = (patch: Partial<State>, next: Sheet) => {
    dispatch({ t: 'devSetState', patch: { pantalla: { en: 'player' }, ...patch } })
    dispatch({ t: 'open', sheet: next })
  }
  const iss = weeklyIssuance(state.nights)

  return (
    <aside className="director" aria-label="Panel de recorrido del prototipo">
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 20 }}>
        <Logo s={20} />
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--tx-hi)', letterSpacing: '-.3px' }}>Continuará</div>
          <div style={{ fontSize: 11, color: 'var(--tx-lo)' }}>POC · el momento del desbloqueo</div>
        </div>
      </div>

      {/* El brief pide los cuatro entregables en un solo link, y este es el
          link. Sin esto, quien entra ve el prototipo y nada más: el
          diagnóstico —35% de la evaluación—, la estrategia y el archivo de
          diseño existían publicados y no había forma de llegar a ellos desde
          la puerta de entrada. Va primero a propósito: lo que hay que saber
          antes de tocar nada es que hay más. */}
      <div className="grp entregable">
        <h2>El entregable</h2>
        <a href="./presentacion/"><b>Los puntos clave</b><span>14 láminas</span></a>
        <a href="./docs/diagnostico.html"><b>1 · Diagnóstico</b><span>35%</span></a>
        <a href="./docs/estrategia.html"><b>2 · Estrategia</b><span>con el diagnóstico</span></a>
        <a href="./docs/intervencion.html"><b>3 · La intervención</b><span>20% craft</span></a>
        <a href="./docs/poc.html"><b>4 · Este POC, explicado</b><span>25%</span></a>
        <a href="./docs/diseno.html"><b>Sistema y archivo de diseño</b><span>Figma · Pen</span></a>
        <a href="./flujos/"><b>Los flujos, pantalla a pantalla</b><span>export</span></a>
        <a href="./stack/"><b>Sobre el stack real de Idilio</b><span>Next.js</span></a>
        {/* Monetización no la pidió el brief: sale de una pregunta posterior
            sobre el mismo material —cómo gana plata Idilio—. Va al final y dicha
            como lo que es, para que nadie la cuente como un quinto entregable. */}
        <a href="./docs/monetizacion.html"><b>Monetización</b><span>fuera del reto</span></a>
      </div>

      <div className="grp">
        <h2>Recorrido</h2>
        <button className={sheetKind === 'none' ? 'on' : ''} onClick={() => { dispatch({ t: 'devSetState', patch: { episode: 12, pantalla: { en: 'player' } } }); dispatch({ t: 'close' }) }}>
          1 · Episodio gratis (ep. 12)
        </button>
        <button className={sheetKind === 'unlock' && state.passes === 1 ? 'on' : ''}
          onClick={() => go({ passes: 1, passNextAt: null, balance: 0, nights: 2, shields: 0, shieldJustUsed: false, streakJustBroke: false }, { kind: 'unlock' })}>
          2 · El muro · un pase disponible
        </button>
        <button className={sheetKind === 'unlock' && state.passes === 2 ? 'on' : ''}
          onClick={() => go({ passes: MAX_PASSES, passNextAt: null, balance: 0, nights: 2, shields: 0, shieldJustUsed: false, streakJustBroke: false }, { kind: 'unlock' })}>
          2b · El muro · dos pases acumulados (tope)
        </button>
        <button className={sheetKind === 'pass-choice' ? 'on' : ''}
          onClick={() => go({ passes: Math.max(1, state.passes) }, { kind: 'pass-choice' })}>
          3 · ¿A cuál serie le doy el pase?
        </button>
        <button className={sheetKind === 'unlocked' ? 'on' : ''}
          onClick={() => go({ passes: 1, nights: 2, balance: 0, streakJustBroke: false }, { kind: 'unlock' })}>
          4 · Desbloqueo + racha (usa el botón dorado)
        </button>
        <button className={sheetKind === 'unlock' && state.passes === 0 && state.balance < EPISODE_COST && !state.streakJustBroke ? 'on' : ''}
          onClick={() => go({ passes: 0, passNextAt: proximaCita(state.now), balance: 0, nights: 3, shields: 1, remind: false, streakJustBroke: false }, { kind: 'unlock' })}>
          5 · El muro · pase gastado (la cita)
        </button>
        <button className={sheetKind === 'unlock' && state.balance >= EPISODE_COST ? 'on' : ''}
          onClick={() => go({ passes: 0, passNextAt: proximaCita(state.now), balance: 45, nights: 3, shields: 1, streakJustBroke: false }, { kind: 'unlock' })}>
          6 · El muro · con saldo
        </button>
        <button className={sheetKind === 'store' ? 'on' : ''} onClick={() => go({ balance: 0 }, { kind: 'store' })}>
          7 · Tienda · precio en episodios
        </button>
        <button className={sheetKind === 'account' ? 'on' : ''}
          onClick={() => go({ nights: 4, balance: 75, shields: 1, hasAccount: false }, { kind: 'account' })}>
          8 · Guardar la racha (invitado)
        </button>
        <button className={sheetKind === 'streak' ? 'on' : ''}
          onClick={() => go({ nights: 5, balance: 90, shields: 1 }, { kind: 'streak' })}>
          9 · Mi economía (desde el saldo)
        </button>
        <button className={state.streakJustBroke ? 'on' : ''}
          onClick={() => go({ nights: 0, shields: 0, shieldJustUsed: false, streakJustBroke: true, passes: 1, balance: 0 }, { kind: 'unlock' })}>
          10 · Racha rota (sin comodín)
        </button>
      </div>

      <div className="grp">
        <h2>Pasar el tiempo</h2>
        <button onClick={() => dispatch({ t: 'devNextNight', attended: true })}>
          Es mañana y volví → pase listo
        </button>
        <button onClick={() => { dispatch({ t: 'devNextNight', attended: false }); dispatch({ t: 'open', sheet: { kind: 'unlock' } }) }}>
          Falté una noche → comodín / racha rota
        </button>
        <button className={speed > 1 ? 'on' : ''} onClick={() => setSpeed(speed > 1 ? 1 : 900)}>
          {speed > 1 ? '⏸ Reloj a velocidad real' : '⏩ Acelerar el countdown ×900'}
        </button>
      </div>

      <div className="grp">
        <h2>Estado</h2>
        <div className="note" style={{ lineHeight: 1.75 }}>
          Saldo <code>{state.balance}</code> · {episodesLabel(state.balance)}<br />
          Racha <code>{state.nights}</code> noche{state.nights === 1 ? "" : "s"} · comodines <code>{state.shields}</code><br />
          Pases <code>{state.passes}/{MAX_PASSES}</code> · cuenta <code>{state.hasAccount ? 'sí' : 'invitado'}</code><br />
          <span style={{ opacity: .7 }}>estado: <code>{stateName(state, sheet)}</code></span>
        </div>
      </div>

      <div className="grp">
        <h2>Emisión de esta semana</h2>
        <div className="note" style={{ lineHeight: 1.75 }}>
          {iss.passes} pases + {iss.coins} monedas de bono<br />
          = <code>{iss.episodeValue} episodios</code> gratis<br />
          = <code>{iss.coinValue} monedas</code> emitidas<br />
          <span style={{ opacity: .7 }}>Techo duro: 1 pase / 24 h / usuario ·
          máximo {weeklyIssuance(7).episodeValue} eps por semana.</span>
        </div>
      </div>

      <div className="note" style={{ paddingTop: 6, borderTop: '1px solid rgba(255,255,255,.07)' }}>
        Datos medidos en las {CATALOGO.series} series del catálogo: 1 episodio = {EPISODE_COST} monedas
        sin excepción, {miles(CATALOGO.gratis)} episodios gratis de {miles(CATALOGO.episodios)} totales.
        El cooldown del pase es de {PASS_COOLDOWN_MS / 3600_000} h reales.
      </div>
    </aside>
  )
}
