import { Bell, Coin, Lock, Pass, Play, X } from './Icons'
import { NextPass, StreakStrip } from './bits'
import { EPISODE_COST, FUENTES_HOY, MAX_PASSES, SUBSCRIPTION, cop, episodesLabel } from '../lib/economy'
import type { Series } from '../lib/content'
import { desbloqueadoDe, type State } from '../lib/state'

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
  state, series, onClaim, onCoins, onStore, onClose, onRemind, onAnuncio, justAdvanced,
}: {
  state: State; series: Series; justAdvanced?: boolean
  onClaim: () => void; onCoins: () => void; onStore: () => void; onClose: () => void
  onRemind: () => void; onAnuncio: () => void
}) {
  const abierto = desbloqueadoDe(state, series.id)
  const ep = abierto + 1
  const prev = series.episodes[abierto]
  const canPayNow = state.balance >= EPISODE_COST
  const atCap = state.passes >= MAX_PASSES
  const anunciosQuedan = FUENTES_HOY.anuncio.topeDiario - state.anunciosHoy
  const missing = EPISODE_COST - state.balance
  const pct = Math.round((abierto / series.total) * 100)

  return (
    <div className="sheet" role="dialog" aria-label="Desbloquear episodio">
      <div className="grab" />
      <button className="sheet-close" onClick={onClose} aria-label="Cerrar"><X /></button>

      {/* 1 · la historia */}
      <div className="cliff">
        <div className="kicker">Continuará · Episodio {ep}</div>
        <h2>{prev?.cliff || 'La historia sigue.'}</h2>
        <p>Quedan {series.total - abierto} episodios de {series.title}.</p>
      </div>

      {/* 2 · dónde estoy */}
      <div style={{ marginBottom: 22 }}>
        <div className="pp-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
          <b style={{ fontSize: 12, fontWeight: 600 }}>Vas {abierto} de {series.total}</b>
          <span style={{ fontSize: 11, color: 'var(--tx-lo)' }}>{pct}%</span>
        </div>
        <div className="bar"><i style={{ '--p': pct / 100 } as React.CSSProperties} /></div>
      </div>

      {/* 3 · la decisión */}
      {state.passes > 0 ? (
        <div className="pass">
          <div className="pass-h">
            <Pass s={26} />
            <b>{state.passes === 1 ? 'Tu Pase de la Noche está listo' : `Tienes ${state.passes} Pases de la Noche`}</b>
          </div>
          <p>
            Abre un episodio gratis. Tú eliges de cuál serie.{' '}
            {atCap
              ? 'Estás en el tope: el próximo empieza a acumularse cuando uses uno.'
              : 'Se acredita solo al ver, una vez por noche. Se guardan hasta dos.'}
          </p>
          <button className="btn btn-gold" onClick={onClaim}>
            <Pass s={20} /> Usar {state.passes > 1 ? 'un pase' : 'el pase'} en este episodio
          </button>
        </div>
      ) : (
        <div className="pass waiting">
          <div className="pass-h"><Pass s={24} /><b>Tu próximo Pase de la Noche</b></div>
          <NextPass readyAt={state.passNextAt ?? state.now} now={state.now} />
          <p style={{ textAlign: 'center', margin: '14px 0 0' }}>
            Con que veas un episodio, el pase se acredita solo y tu racha suma
            una noche. No hay nada que reclamar.
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

      {/* El anuncio recompensado: la fuente gratuita que el producto YA tiene.
          Va aquí, entre el pase y lo pago, por la regla de D2 —lo gratis antes
          que lo pago— y porque el muro real lo entierra bajo la suscripción. Y
          va traducido: el producto lo rotula «0/10», que no le dice nada a
          nadie; son diez episodios gratis al día, y esa es la cifra. */}
      {anunciosQuedan > 0 && (
        <button className="anuncio" onClick={onAnuncio}>
          <span className="anuncio-i"><Play s={17} /></span>
          <span className="anuncio-t">
            <b>Ver un anuncio y abrir este episodio</b>
            {/* Cuenta ANUNCIOS, que es lo que el contador del producto cuenta —su
                «0/10» son anuncios, no episodios—. El título ya dice que cada uno
                abre un episodio, así que el valor se entiende sin conflar las dos
                unidades. Y evita el «te quedan», que en esta misma hoja significa
                el saldo: dos «te quedan» distintos serían un acertijo. */}
            <small>Puedes hacerlo {anunciosQuedan} veces hoy · 30 s cada vez</small>
          </span>
        </button>
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
        ) : state.passes > 0 ? (
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

      {/* La suscripción, último y en una línea. El muro real la pone PRIMERA,
          con las dos tarjetas grandes, y deja la salida gratuita abajo — es el
          orden que el diagnóstico F1 señala como la falla. Invertirlo no
          significa esconderla: el producto la vende, y quien ve mucho merece
          saber que existe. Significa que deje de ser lo primero que lee alguien
          a quien le faltan quince monedas. */}
      <button className="sub-linea" onClick={onStore}>
        ¿Ves mucho? El <b>Pase Idilio</b> abre todo el catálogo por {cop(SUBSCRIPTION.mensual)} al mes
      </button>

      {/* 4 · la racha, como consecuencia */}
      <div className="sect-label">Tu racha</div>
      {state.streakJustBroke && (
        <div className="broke">
          <p><b>Se cortó tu racha.</b> Pasó una noche sin que volvieras y ya no te quedaba comodín. Empieza de nuevo: en la noche 3 vuelves a ganar uno.</p>
        </div>
      )}
      <StreakStrip
        nights={state.nights} shields={state.shields}
        shieldJustUsed={state.shieldJustUsed} justAdvanced={justAdvanced}
      />
    </div>
  )
}
