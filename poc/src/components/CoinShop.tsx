import { COIN_PACKS } from '../data';
import { Coin } from '../icons';
import { COINS_PER_EPISODE } from '../economy';

export function CoinShop({ coins, onBuy, onClose }:
  { coins: number; onBuy: (n: number) => void; onClose: () => void }) {
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <section className="sheet" role="dialog" aria-modal="true" aria-label="Conseguir monedas">
        <div className="grabber" />
        <p className="sheet-eyebrow">Monedas</p>
        <h2 className="sheet-title">Sigue esta noche</h2>
        <p className="sheet-lede">
          Tienes {coins} monedas. Cada capítulo cuesta {COINS_PER_EPISODE}.
        </p>

        <div className="packs">
          {COIN_PACKS.map((p) => (
            <button key={p.coins} className={`pack ${p.best ? 'best' : ''}`}
                    onClick={() => onBuy(p.coins)}>
              <span style={{ color: 'var(--home-amber)', display: 'flex' }}><Coin s={22} /></span>
              <span>
                <span className="q">{p.coins}</span>
                <span className="d"> · {p.note}</span>
              </span>
              {p.best && <span className="tag">Mejor valor</span>}
              <span className="p">{p.price}</span>
            </button>
          ))}
        </div>

        <button className="cta cta--ghost" onClick={onClose}>Volver</button>
      </section>
    </>
  );
}
