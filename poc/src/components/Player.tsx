import { Back, Chat, Heart, Logo, Share, Coin } from './Icons'
import { frameStyle } from '../lib/frame'
import { episodesLabel } from '../lib/economy'
import type { Series } from '../lib/content'

export function Player({
  series, ep, balance, walletPulse, onWallet, onNext,
}: {
  series: Series; ep: number; balance: number; walletPulse: boolean
  onWallet: () => void; onNext: () => void
}) {
  const epData = series.episodes[ep]
  const pct = Math.round((ep / series.total) * 100)

  return (
    <div className="player">
      <div className="frame grain" style={frameStyle(series.hue, ep)} />

      <div className="p-top">
        <button className="icon-btn" aria-label="Volver"><Back /></button>
        <div className="p-title">
          <b>{series.title}</b>
          <span>Temporada 1 · {series.total} episodios</span>
        </div>
        {/* Huella permanente del metajuego: saldo SIEMPRE con su traducción */}
        <button className={`wallet ${walletPulse ? "pulse" : ""}`} onClick={onWallet} aria-label={`Saldo: ${balance} monedas, ${episodesLabel(balance)}`}>
          <Coin s={19} />
          <span>
            <span className="wallet-n">{balance}</span>
            <span className="wallet-eps" style={{ display: 'block', marginTop: -3 }}>
              {balance >= 15 ? episodesLabel(balance) : 'sin episodios'}
            </span>
          </span>
        </button>
      </div>

      <div className="p-rail">
        <div className="rail-item"><Heart /><small>17,2 mil</small></div>
        <div className="rail-item"><Chat /><small>412</small></div>
        <div className="rail-item"><Share /><small>Enviar</small></div>
      </div>

      <div className="p-meta">
        <div className="ep-kicker">Episodio {ep}</div>
        <h1>{epData?.title || series.title}</h1>
        <p>{epData?.cliff || ''}</p>
      </div>

      {/* I6 · la progresión deja de ser 44 números grises */}
      <div className="p-progress">
        <div className="pp-row">
          <b>Vas {ep} de {series.total}</b>
          <span>{pct}% de la temporada</span>
        </div>
        <div className="bar"><i style={{ width: `${pct}%` }} /></div>
      </div>

      <div className="scrub">
        <div className="bar"><i style={{ width: '86%' }} /></div>
      </div>

      <button
        className="sr"
        onClick={onNext}
      >Siguiente episodio</button>

      {/* zona táctil: tocar el video avanza (así se llega al muro) */}
      <button
        onClick={onNext}
        aria-label="Siguiente episodio"
        style={{ position: 'absolute', inset: '100px 78px 210px 0', zIndex: 15, background: 'transparent' }}
      />
      <div style={{ position: 'absolute', left: 16, top: 14, zIndex: 61, opacity: .001 }}><Logo s={14} /></div>
    </div>
  )
}
