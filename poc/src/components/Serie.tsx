import { porId } from '../lib/catalogo'
import { EPISODE_COST, episodesLabel, toEpisodes } from '../lib/economy'
import type { State } from '../lib/state'
import { frameStyle } from '../lib/frame'
import { Back, Coin, Lock, Pass, Play } from './Icons'

/**
 * Ficha de serie.
 *
 * Es la pantalla donde hoy la progresión es invisible: el producto real muestra
 * una grilla de números grises sin decir cuánto falta ni cuánto cuesta. Acá la
 * grilla dice las tres cosas — dónde vas, qué está abierto y qué vale terminar—
 * y si tienes un pase disponible, lo dice antes que el precio.
 */
export function Serie({
  id, state, onVolver, onEpisodio, onWallet,
}: {
  id: string; state: State
  onVolver: () => void; onEpisodio: (n: number) => void; onWallet: () => void
}) {
  const s = porId(id)
  if (!s) return null

  const va = state.vistos[id] ?? 0
  const desbloqueado = Math.max(va, s.gratis)
  const pct = Math.round((va / s.total) * 100)
  const restantes = s.total - desbloqueado
  const paraTerminar = restantes * EPISODE_COST

  return (
    <div className="serie">
      <div className="serie-art" style={frameStyle(s.tono, s.total)}>
        <button className="icon-btn serie-back" onClick={onVolver} aria-label="Volver"><Back /></button>
        <button className="wallet serie-wallet" onClick={onWallet} aria-label={`Saldo: ${state.balance} monedas`}>
          <Coin s={19} />
          <span>
            <span className="wallet-n">{state.balance}</span>
            <span className="wallet-eps" style={{ display: 'block', marginTop: -3 }}>
              {state.balance >= EPISODE_COST ? episodesLabel(state.balance) : 'sin episodios'}
            </span>
          </span>
        </button>
        <div className="serie-head">
          <h1>{s.titulo}</h1>
          <p>Temporada 1 · {s.total} episodios · {s.gratis} gratis</p>
        </div>
      </div>

      <div className="serie-scroll">
        <div className="serie-prog">
          <div className="pp-row">
            <b>{va > 0 ? `Vas ${va} de ${s.total}` : 'Sin empezar'}</b>
            <span>{restantes > 0 ? `quedan ${restantes} por desbloquear` : 'completa'}</span>
          </div>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div>
        </div>

        {state.passes > 0 ? (
          <div className="serie-pase">
            <Pass s={20} />
            <p>Tienes <b>{state.passes}</b> {state.passes === 1 ? 'Pase de la Noche' : 'Pases de la Noche'}. Abre el episodio {desbloqueado + 1} sin pagar.</p>
          </div>
        ) : restantes > 0 ? (
          <div className="serie-meta">
            <span>Para terminarla</span>
            <b>{restantes} episodios · {paraTerminar} monedas</b>
          </div>
        ) : null}

        <h2 className="sect-label" style={{ marginTop: 22 }}>Episodios</h2>
        <ol className="ep-grid">
          {Array.from({ length: s.total }, (_, i) => i + 1).map((n) => {
            const abierto = n <= desbloqueado
            const visto = n <= va
            return (
              <li key={n}>
                <button
                  className={`ep ${abierto ? 'abierto' : 'cerrado'} ${visto ? 'visto' : ''}`}
                  onClick={() => onEpisodio(n)}
                  aria-label={`Episodio ${n}${abierto ? '' : ', bloqueado, 15 monedas'}`}
                >
                  <span className="ep-n">{n}</span>
                  {abierto ? <Play s={9} /> : <Lock s={11} />}
                </button>
              </li>
            )
          })}
        </ol>

        <p className="serie-pie">
          Cada episodio bloqueado cuesta {EPISODE_COST} monedas.
          {state.balance >= EPISODE_COST && ` Con tu saldo abres ${toEpisodes(state.balance)}.`}
        </p>
      </div>
    </div>
  )
}
