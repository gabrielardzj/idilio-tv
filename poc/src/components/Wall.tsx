import { Bell, Coin, Lock, Pass, X } from './Icons'
import { NextPass, StreakStrip } from './bits'
import { EPISODE_COST, episodesLabel } from '../lib/economy'
import type { Series } from '../lib/content'
import type { State } from '../lib/state'

/**
 * EL MURO — la pantalla donde ocurre todo.
 *
 * Orden deliberado, de arriba a abajo:
 *   1. La historia (el cliffhanger). El usuario está aquí por eso, no por la economía.
 *   2. Dónde estoy (progreso de serie).
 *   3. La decisión: el Pase primero, las monedas después, la compra al final.
 *   4. La racha, como consecuencia visible de la decisión.
 *
 * La regla que gobierna el orden: lo gratis antes que lo pago, siempre.
 * Un muro que abre con precios enseña que el sistema es una tienda.
 * Un muro que abre con el pase enseña que el sistema es un juego que se puede jugar.
 */
export function Wall({
  state, series, onClaim, onCoins, onStore, onClose, onRemind, justAdvanced,
}: {
  state: State; series: Series; justAdvanced?: boolean
  onClaim: () => void; onCoins: () => void; onStore: () => void; onClose: () => void; onRemind: () => void
}) {
  const ep = state.unlocked[series.id] + 1
  const prev = series.episodes[state.unlocked[series.id]]
  const canPayNow = state.balance >= EPISODE_COST
  const missing = EPISODE_COST - state.balance
  const pct = Math.round((state.unlocked[series.id] / series.total) * 100)

  return (
    <div className="sheet" role="dialog" aria-label="Desbloquear episodio">
      <div className="grab" />
      <button className="sheet-close" onClick={onClose} aria-label="Cerrar"><X /></button>

      {/* 1 · la historia */}
      <div className="cliff">
        <div className="kicker">Continuará · Episodio {ep}</div>
        <h2>{prev?.cliff || 'La historia sigue.'}</h2>
        <p>Quedan {series.total - state.unlocked[series.id]} episodios de {series.title}.</p>
      </div>

      {/* 2 · dónde estoy */}
      <div style={{ marginBottom: 22 }}>
        <div className="pp-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
          <b style={{ fontSize: 12, fontWeight: 600 }}>Vas {state.unlocked[series.id]} de {series.total}</b>
          <span style={{ fontSize: 11, color: 'var(--tx-lo)' }}>{pct}%</span>
        </div>
        <div className="bar"><i style={{ width: `${pct}%` }} /></div>
      </div>

      {/* 3 · la decisión */}
      {state.passReady ? (
        <div className="pass">
          <div className="pass-h"><Pass s={26} /><b>Tu Pase de la Noche está listo</b></div>
          <p>Abre un episodio gratis. Tú eliges de cuál serie — tienes uno por noche.</p>
          <button className="btn btn-gold" onClick={onClaim}>
            <Pass s={20} /> Usar el pase en este episodio
          </button>
        </div>
      ) : (
        <div className="pass waiting">
          <div className="pass-h"><Pass s={24} /><b>Tu próximo Pase de la Noche</b></div>
          <NextPass readyAt={state.passNextAt ?? state.now} now={state.now} />
          <p style={{ textAlign: 'center', margin: '14px 0 0' }}>
            Vuelve y el episodio {ep} te espera abierto. Tu racha suma una noche más.
          </p>
          <button
            className={`remind ${state.remind ? 'on' : ''}`}
            onClick={onRemind}
            aria-pressed={state.remind}
          >
            <Bell s={16} /> {state.remind ? 'Te aviso a las ' + new Date(state.passNextAt ?? state.now).getHours() + ':' + String(new Date(state.passNextAt ?? state.now).getMinutes()).padStart(2, '0') : 'Avísame cuando esté listo'}
          </button>
        </div>
      )}

      {/* La alternativa de pago va SIEMPRE debajo del pase, nunca arriba */}
      <div style={{ marginTop: 14 }}>
        {canPayNow ? (
          <>
            <button className="btn btn-violet" onClick={onCoins}>
              <Lock s={18} /> Abrirlo ahora por {EPISODE_COST} monedas
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--tx-lo)', marginTop: 10 }}>
              Te quedan <b style={{ color: 'var(--gold-300)' }}>{state.balance}</b> monedas · {episodesLabel(state.balance)}
            </p>
          </>
        ) : state.passReady ? (
          <button className="btn btn-text" onClick={onStore}>o consigue monedas para no esperar</button>
        ) : (
          <>
            <button className="btn btn-violet" onClick={onStore}>
              <Coin s={19} /> No quiero esperar
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--tx-lo)', marginTop: 10 }}>
              Tienes {state.balance} monedas. Te faltan <b style={{ color: 'var(--gold-300)' }}>{missing}</b> para este episodio.
            </p>
          </>
        )}
      </div>

      {/* 4 · la racha, como consecuencia */}
      <div className="sect-label">Tu racha</div>
      <StreakStrip
        nights={state.nights} shields={state.shields}
        shieldJustUsed={state.shieldJustUsed} justAdvanced={justAdvanced}
      />
    </div>
  )
}
