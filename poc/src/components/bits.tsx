import { Coin, Shield } from './Icons'
import { STREAK, episodesLabel } from '../lib/economy'

export const CoinAmount = ({ n, size = 15 }: { n: number; size?: number }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
    <Coin s={size} />
    <b style={{ fontVariantNumeric: 'tabular-nums' }}>{n}</b>
  </span>
)

/** El componente que materializa I1: ninguna cifra de monedas viaja sola. */
export const InEpisodes = ({ coins }: { coins: number }) => (
  <span style={{ color: 'var(--tx-lo)' }}>{episodesLabel(coins)}</span>
)

/**
 * Cuándo llega el próximo pase.
 *
 * Decisión que salió de usar el POC: un contador de "17 h 48 m 03 s" es
 * ansiedad, no información — nadie mira 17 horas correr. Lo que el usuario
 * necesita saber es A QUÉ HORA vuelve a tener algo. Por eso el héroe es
 * la hora del reloj y el countdown queda de apoyo.
 * Solo cuando falta menos de una hora el countdown pasa a ser el héroe:
 * ahí sí la cuenta regresiva es la información relevante.
 */
export function NextPass({ readyAt, now }: { readyAt: number; now: number }) {
  const ms = Math.max(0, readyAt - now)
  const h = Math.floor(ms / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  const sec = Math.floor((ms % 60_000) / 1000)

  const d = new Date(readyAt)
  const hh = d.getHours()
  const time = `${hh}:${String(d.getMinutes()).padStart(2, '0')}`
  const sameDay = new Date(now).getDate() === d.getDate()
  const when = sameDay ? 'Hoy' : 'Mañana'

  if (h === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div className="clock" role="timer">
          <span className="n">{String(m).padStart(2, '0')}</span><span className="u">m</span>
          <span className="n">{String(sec).padStart(2, '0')}</span><span className="u">s</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--tx-mid)', marginTop: -8 }}>Ya casi. A las {time}, tu hora de siempre.</p>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="when">
        <span className="when-day">{when} a las</span>
        <span className="when-time">{time}</span>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--tx-lo)', marginTop: 4 }}>
        tu hora de siempre · faltan {h} h {String(m).padStart(2, '0')} m
      </p>
    </div>
  )
}

/** La racha: 7 noches, hito visible, comodín explícito. */
export function StreakStrip({
  nights, shields, shieldJustUsed, justAdvanced,
}: { nights: number; shields: number; shieldJustUsed: boolean; justAdvanced?: boolean }) {
  return (
    <div className="streak">
      <div className="streak-h">
        <b>{nights === 0 ? 'Sin racha' : `Racha de ${nights} noche${nights === 1 ? '' : 's'}`}</b>
        <span className="sub">La noche corre de 5 a.m. a 5 a.m.</span>
      </div>

      {/* Una lista de verdad. El punto llevaba `aria-label` sobre un div sin rol,
          que es un atributo prohibido —axe lo marca como serio— y que los
          lectores de pantalla ignoran: la tira, que es el elemento central de la
          intervención, no se anunciaba. Ahora lo visible va oculto a la voz y
          cada noche dice en qué estado está y qué da, que es más de lo que el
          `aria-label` decía cuando funcionaba. */}
      <ol className="nights">
        {STREAK.map((r) => {
          const done = r.night < nights || (r.night === nights && !justAdvanced)
          const today = r.night === nights && justAdvanced
          const estado = today ? 'hoy' : done ? 'cumplida' : 'pendiente'
          const da = `pase${r.coins > 0 ? ` y ${r.coins} monedas` : ''}${r.shield ? ' y un comodín' : ''}`
          return (
            <li key={r.night} className={`night ${done ? 'done' : ''} ${today ? 'today' : ''}`}>
              <div className="dot" aria-hidden="true">
                {r.shield ? <Shield s={16} c={today ? '#2A1A02' : done ? '#3FE0D0' : '#7C6E8B'} /> : r.night}
              </div>
              {/* Todas las noches dan pase; el bono se SUMA. El ternario que había
                  aquí ponía «+30» en lugar de «pase», así que la tira leía como
                  si la noche 3 diera bono en vez de pase — justo el malentendido
                  que esta pantalla existe para deshacer. */}
              <small aria-hidden="true">pase{r.coins > 0 ? <em> +{r.coins}</em> : null}</small>
              <span className="sr">Noche {r.night}, {estado}. Da {da}.</span>
            </li>
          )
        })}
      </ol>

      {shieldJustUsed ? (
        <div className="shield-row spent">
          <Shield s={17} c="#FB923C" />
          <p><b>Tu comodín te cubrió.</b> Faltaste una noche y la racha sigue viva. Ganas otro en la noche 3 de la próxima vuelta.</p>
        </div>
      ) : shields > 0 ? (
        <div className="shield-row">
          <Shield s={17} c="#3FE0D0" />
          <p><b>Tienes 1 comodín.</b> Si te saltas una noche, se usa solo. No hay que hacer nada.</p>
        </div>
      ) : nights > 0 && nights < 3 ? (
        <div className="shield-row">
          <Shield s={17} c="#7C6E8B" />
          <p>En la <b>noche 3</b> ganas un comodín que te cubre una falta.</p>
        </div>
      ) : null}
    </div>
  )
}
