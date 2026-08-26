import { useEffect, useState } from 'react';
import {
  COINS_PER_EPISODE, CYCLE_LENGTH, rewardForNight,
  type EconomyState, type UnlockMethod,
} from '../economy';
import { episodeMeta } from '../data';
import { useTween } from '../useTween';
import { Coin, Moon, Shield, Bell, Lock, Check } from '../icons';

/** Lo que dura la animación de gasto antes de entrar al episodio. */
const SPEND_MS = 880;

/**
 * El muro de desbloqueo — la intervención.
 *
 * El ORDEN de los bloques es el argumento de diseño, no una preferencia
 * estética. Ver docs/03-intervencion.md §3.6:
 *   1 deseo → 2 posición → 3 acción gratuita → 4 promesa de regreso
 *   → 5 precio → 6 cita
 * El precio va DESPUÉS de que el usuario ya sabe que hay una vía sin pagar.
 */
export function UnlockSheet({
  ep, state, brokenFrom, nightJustAdvanced, onUnlock, onShop, onClose,
}: {
  ep: number;
  state: EconomyState;
  /** Si la racha se rompió al entrar esta noche, la noche anterior alcanzada. */
  brokenFrom: number | null;
  /** La noche subió en esta sesión: la luna actual entra con animación. */
  nightJustAdvanced: boolean;
  onUnlock: (m: UnlockMethod) => void;
  onShop: () => void;
  onClose: () => void;
}) {
  const meta = episodeMeta(ep);
  const hasPass = state.passes > 0;
  const canPay = state.coins >= COINS_PER_EPISODE;
  const [reminder, setReminder] = useState(false);
  const [spent, setSpent] = useState<UnlockMethod | null>(null);

  // El saldo baja a la vista. Percibir el gasto es la mitad de entender la economía.
  const coins = useTween(state.coins - (spent === 'coins' ? COINS_PER_EPISODE : 0));
  const passes = useTween(state.passes - (spent === 'pass' ? 1 : 0), 420);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !spent && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, spent]);

  const spend = (m: UnlockMethod) => {
    if (spent) return;
    setSpent(m);
    window.setTimeout(() => onUnlock(m), SPEND_MS);
  };

  const cycleStart = Math.floor((state.night - 1) / CYCLE_LENGTH) * CYCLE_LENGTH;
  const posInCycle = state.night - cycleStart; // 1..7
  const nextNight = state.night + 1;
  const nextReward = rewardForNight(nextNight);

  return (
    <>
      <div className="scrim" onClick={() => !spent && onClose()} />
      <section className={`sheet ${spent ? 'is-leaving' : ''}`} role="dialog" aria-modal="true"
               aria-label={`Episodio ${ep} bloqueado`}>
        <div className="grabber" />

        {/* ── 1 · DESEO ─────────────────────────────────────────────────── */}
        <p className="sheet-eyebrow">
          <Lock s={12} /> Episodio {ep} · bloqueado
        </p>
        <h2 className="sheet-title">{meta.title}</h2>
        <p className="sheet-lede">{meta.line}</p>

        {/* ── 2 · POSICIÓN ──────────────────────────────────────────────── */}
        <div className="position">
          <div className="position-row">
            <span className="lead">Vas {ep - 1} de 30</span>
            <span className="trail">quedan {30 - (ep - 1)} capítulos</span>
          </div>
          <div className="bar">
            {/* Al desbloquear, la barra avanza un capítulo antes de salir del muro. */}
            <i style={{ width: `${((ep - 1 + (spent ? 1 : 0)) / 30) * 100}%` }} />
          </div>
        </div>

        {/* ── Estado F: racha rota. Se informa, no se regaña. ───────────── */}
        {brokenFrom !== null && (
          <div className="broken">
            <h3>Tu racha de {brokenFrom} noches terminó</h3>
            <p>Pasa. Esta noche empiezas de nuevo — y el capítulo de la casa ya está aquí.</p>
          </div>
        )}

        {/* ── 3 · ACCIÓN ────────────────────────────────────────────────── */}
        {hasPass ? (
          <>
            <button className={`cta cta--primary ${spent ? 'is-spending' : ''}`}
                    disabled={!!spent} onClick={() => spend('pass')}>
              {spent ? <><Check s={19} /> Listo</> : <><Moon s={17} /> Ver gratis</>}
            </button>
            <p className="cta-note">
              Capítulo de la casa · te quedan{' '}
              <span className={spent ? 'tick' : ''}>{Math.round(passes)}</span> de {state.passesGranted} esta noche
            </p>
          </>
        ) : (
          <>
            {/* Sin pase, el CTA primario es el que SÍ lleva a algún lado.
                Un "Desbloquear por 15" deshabilitado es UI muerta: enseña un
                precio y no ofrece camino. Si no alcanza, el camino es recargar. */}
            {canPay ? (
              <button className={`cta cta--coins ${spent ? 'is-spending' : ''}`}
                      disabled={!!spent} onClick={() => spend('coins')}>
                {spent ? <><Check s={19} /> Listo</> : <><Coin s={18} /> Desbloquear por {COINS_PER_EPISODE}</>}
              </button>
            ) : (
              <button className="cta cta--coins" onClick={onShop}>
                <Coin s={18} /> Conseguir monedas
              </button>
            )}
            {/* El saldo y el precio NO se repiten aquí: ya viven en la cartera,
                cuatro bloques más abajo. Repetirlos sube el ruido sin subir la
                comprensión. */}
            <p className="cta-note">
              {state.passesGranted > 0
                ? `Ya usaste ${state.passesGranted === 1 ? 'tu capítulo' : `tus ${state.passesGranted} capítulos`} de la casa de esta noche`
                : 'Esta noche no te quedan capítulos de la casa'}
            </p>
          </>
        )}

        {/* ── 4 · RACHA ─────────────────────────────────────────────────── */}
        <div className="streak">
          <div className="streak-head">
            <span className="streak-count">
              <Moon s={14} /> Noche <em>{state.night}</em>
            </span>
            {state.shields > 0 && (
              <span className="shield-badge">
                <Shield /> {state.shields} escudo{state.shields > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="moons" role="img"
               aria-label={`Noche ${posInCycle} de ${CYCLE_LENGTH} del ciclo`}>
            {Array.from({ length: CYCLE_LENGTH }, (_, i) => {
              const n = i + 1;
              const isMilestone = n === 3 || n === CYCLE_LENGTH;
              const cls = n < posInCycle ? 'done' : n === posInCycle ? 'now'
                : isMilestone ? 'milestone' : '';
              const pop = n === posInCycle && nightJustAdvanced ? ' pop' : '';
              return <span key={n} className={`moon ${cls}${pop}`}>{n}</span>;
            })}
          </div>

          <p className="streak-promise">
            Mañana es la <b>noche {nextNight}</b>:{' '}
            <b>{nextReward.passes} capítulo{nextReward.passes > 1 ? 's' : ''} de la casa</b>
            {nextReward.shield && <> y un <b>escudo</b></>}.
          </p>
        </div>

        {/* ── 5 · SALDO Y FUENTE COMPRADA ───────────────────────────────── */}
        <div className="wallet">
          <span style={{ color: 'var(--home-amber)', display: 'flex' }}><Coin s={19} /></span>
          <div style={{ position: 'relative' }}>
            <div className="amt">{Math.round(coins)}</div>
            <div className="lbl">monedas · cada capítulo cuesta {COINS_PER_EPISODE}</div>
            {spent === 'coins' && <span className="spend-fly">−{COINS_PER_EPISODE}</span>}
          </div>
          <button className="go" onClick={onShop}>Recargar</button>
        </div>

        {/* ── 6 · CITA DE REGRESO ───────────────────────────────────────── */}
        <div className="appointment">
          <span style={{ color: 'var(--home-magenta)', display: 'flex' }}><Bell /></span>
          <p className="txt">
            <b>Mañana a las 8:00 pm</b>
            <br />
            <span>
              te esperan {nextReward.passes} capítulo{nextReward.passes > 1 ? 's' : ''} de la casa
            </span>
          </p>
          <button className={reminder ? 'on' : ''} onClick={() => setReminder((r) => !r)}>
            {reminder ? 'Listo' : 'Avísame'}
          </button>
        </div>
      </section>
    </>
  );
}
