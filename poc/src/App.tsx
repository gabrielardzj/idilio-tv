import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import './styles.css'
import { Home } from './components/Home'
import { Player } from './components/Player'
import { Serie } from './components/Serie'
import { Wall } from './components/Wall'
import { AccountPrompt, Celebrate, PassChoice, Store, StreakSheet } from './components/Sheets'
import { Coin, Logo } from './components/Icons'
import { SERIES, type SeriesId } from './lib/content'
import { SERIE_A_ID } from './lib/state'
import { CATALOGO, EPISODE_COST, MAX_PASSES, PASS_COOLDOWN_MS, episodesLabel, weeklyIssuance } from './lib/economy'
import { initialState, proximaCita, reduce, stateName, type Action, type Ctx, type Sheet, type State } from './lib/state'

const T0 = 1_756_099_020_000 // reloj fijo a las 00:17: el POC vive en la franja de las 11pm-2am

export default function App() {
  const [ctx, dispatch] = useReducer(reduce, { state: initialState(T0), sheet: { kind: 'none' } } as Ctx)
  const { state, sheet } = ctx
  const [justAdvanced, setJustAdvanced] = useState(false)
  const [pulse, setPulse] = useState(false)
  const [speed, setSpeed] = useState(1)
  const prevBalance = useRef(state.balance)

  // El reloj solo corre cuando hay una cuenta regresiva a la vista. Tickear
  // siempre re-renderizaba la app entera cada segundo — con 35 pósters en el
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

  const series = SERIES[state.seriesId]
  const activeSeries = (Object.keys(SERIES) as SeriesId[]).length

  const claim = (id: SeriesId) => {
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

        {state.pantalla.en === 'home' && (
          <Home
            state={state}
            onSerie={(id) => dispatch({ t: 'verSerie', id })}
            onWallet={() => dispatch({ t: 'open', sheet: { kind: 'streak' } })}
          />
        )}

        {state.pantalla.en === 'serie' && (
          <Serie
            id={state.pantalla.id}
            state={state}
            onVolver={() => dispatch({ t: 'ir', a: { en: 'home' } })}
            onEpisodio={(n) => dispatch({ t: 'abrirEpisodio', id: (state.pantalla as { id: string }).id, n })}
            onWallet={() => dispatch({ t: 'open', sheet: { kind: 'streak' } })}
          />
        )}

        {state.pantalla.en === 'player' && (
          <Player
            series={series} ep={state.episode} balance={state.balance} walletPulse={pulse}
            onWallet={() => dispatch({ t: 'open', sheet: { kind: 'streak' } })}
            onNext={() => dispatch({ t: 'nextEpisode' })}
            onPrev={() => dispatch({ t: 'devSetState', patch: { episode: Math.max(1, state.episode - 1) } })}
            onVolver={() => dispatch({ t: 'verSerie', id: SERIE_A_ID[state.seriesId] })}
          />
        )}

        {/* El acuse es del player. Si hay una hoja abierta —el caso real: terminas
            el episodio, se acredita la noche y acto seguido se abre el muro— el
            toast taparía el encabezado, y además sobra: la tira de racha de la
            hoja ya dice lo mismo, y con más detalle. */}
        {state.toast && sheet.kind === 'none' && (
          <div className="toast"><Coin s={16} /> {state.toast}</div>
        )}

        {sheet.kind !== 'none' && (
          <>
            <div className="scrim" onClick={() => sheet.kind !== 'unlocked' && dispatch({ t: 'close' })} />
            {sheet.kind === 'unlock' && (
              <Wall
                state={state} series={series} justAdvanced={justAdvanced}
                onClaim={openPass}
                onCoins={() => dispatch({ t: 'unlockWithCoins' })}
                onStore={() => dispatch({ t: 'open', sheet: { kind: 'store' } })}
                onRemind={() => dispatch({ t: 'toggleRemind' })}
                onClose={() => dispatch({ t: 'close' })}
              />
            )}
            {sheet.kind === 'pass-choice' && (
              <PassChoice state={state} onPick={claim} onClose={() => dispatch({ t: 'open', sheet: { kind: 'unlock' } })} />
            )}
            {sheet.kind === 'store' && (
              <Store
                state={state}
                onBuy={(coins, usd) => dispatch({ t: 'buy', coins, usd })}
                onClose={() => dispatch({ t: 'open', sheet: { kind: 'unlock' } })}
              />
            )}
            {sheet.kind === 'unlocked' && (
              <Celebrate state={state} via={sheet.via} ep={sheet.ep} justAdvanced={justAdvanced} onWatch={closeCelebrate} />
            )}
            {sheet.kind === 'account' && (
              <AccountPrompt state={state} onCreate={() => dispatch({ t: 'createAccount' })} onSkip={() => dispatch({ t: 'dismissAccount' })} />
            )}
            {sheet.kind === 'streak' && <StreakSheet state={state} onClose={() => dispatch({ t: 'close' })} />}
          </>
        )}
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
  const go = (patch: Partial<State>, next: Sheet) => {
    dispatch({ t: 'devSetState', patch })
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

      <div className="grp">
        <h2>Recorrido</h2>
        <button className={sheetKind === 'none' ? 'on' : ''} onClick={() => { dispatch({ t: 'devSetState', patch: { episode: 12 } }); dispatch({ t: 'close' }) }}>
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
        sin excepción, {CATALOGO.gratis} episodios gratis de {CATALOGO.episodios} totales.
        El cooldown del pase es de {PASS_COOLDOWN_MS / 3600_000} h reales.
      </div>
    </aside>
  )
}
