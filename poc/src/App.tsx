import { useCallback, useEffect, useRef, useState } from 'react';
import {
  buyCoins, canUnlock, createAccount, creditNight,
  initialState, isUnlocked, unlock,
  ACCOUNT_PROMPT_NIGHT, type EconomyState, type StreakEvent, type UnlockMethod,
} from './economy';
import { SERIES, episodeMeta, sceneFor } from './data';
import { UnlockSheet } from './components/UnlockSheet';
import { AccountSheet } from './components/AccountSheet';
import { CoinShop } from './components/CoinShop';
import { DevPanel, type Preset } from './components/DevPanel';
import { Heart, Comment, Share, List, Coin, Moon, ChevUp, Shield } from './icons';

/** Duración comprimida del episodio en el POC (el real dura 60–90 s). */
const EPISODE_MS = 11_000;

/** Cerrar la hoja de cuenta nunca debe dejar al usuario dentro de un episodio
 *  bloqueado: si venía del muro, vuelve al muro. */
const afterAccount = (s: EconomyState, ep: number): Overlay =>
  isUnlocked(s, ep) ? null : 'unlock';

type Overlay = null | 'unlock' | 'account' | 'shop';

export default function App() {
  // Reloj simulado: permite viajar entre noches y demostrar la mecánica
  // completa sin esperar días reales.
  const [now, setNow] = useState(() => {
    const d = new Date();
    d.setHours(23, 12, 0, 0); // el 54% de las sesiones ocurre aquí
    return d;
  });

  const [eco, setEco] = useState<EconomyState>(initialState());
  const [ep, setEp] = useState(1);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [toast, setToast] = useState<StreakEvent | null>(null);
  const [brokenFrom, setBrokenFrom] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [nightJustAdvanced, setNightJustAdvanced] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [dev, setDev] = useState(false);
  const [liked, setLiked] = useState(false);

  const nowRef = useRef(now); nowRef.current = now;
  const ecoRef = useRef(eco); ecoRef.current = eco;

  /** La racha se acredita al TERMINAR un episodio. No hay botón de reclamar. */
  const credit = useCallback(() => {
    const { state, event } = creditNight(ecoRef.current, nowRef.current);
    if (!event) return state;
    setEco(state);
    if (event.kind === 'broken') setBrokenFrom(event.previousNight);
    else setBrokenFrom(null);
    setNightJustAdvanced(true);
    window.setTimeout(() => setNightJustAdvanced(false), 1800);
    setToast(event);
    window.setTimeout(() => setToast(null), 3400);
    // La cuenta se ofrece una sola vez, en la noche del hito.
    if (state.night === ACCOUNT_PROMPT_NIGHT && !state.hasAccount && !state.accountOffered) {
      window.setTimeout(() => {
        setEco((s) => ({ ...s, accountOffered: true }));
        setOverlay('account');
      }, 1500);
    }
    return state;
  }, []);

  const goTo = useCallback((next: number) => {
    if (next < 1 || next > SERIES.totalEpisodes) return;
    const state = credit();
    setProgress(0);
    setEp(next);
    setOverlay(isUnlocked(state, next) ? null : 'unlock');
  }, [credit]);

  // Barra de progreso del episodio
  useEffect(() => {
    if (overlay) return;
    setProgress(0);
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / EPISODE_MS);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else goTo(ep + 1);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ep, overlay, goTo]);

  // Gestos: swipe vertical, rueda y teclado
  useEffect(() => {
    if (overlay || dev) return;
    let y0: number | null = null;
    const down = (e: TouchEvent) => { y0 = e.touches[0].clientY; };
    const up = (e: TouchEvent) => {
      if (y0 === null) return;
      const dy = e.changedTouches[0].clientY - y0;
      if (dy < -55) goTo(ep + 1);
      else if (dy > 55) goTo(ep - 1);
      y0 = null;
    };
    let lock = false;
    const wheel = (e: WheelEvent) => {
      if (lock || Math.abs(e.deltaY) < 22) return;
      lock = true; window.setTimeout(() => (lock = false), 460);
      goTo(ep + (e.deltaY > 0 ? 1 : -1));
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') goTo(ep + 1);
      if (e.key === 'ArrowUp') goTo(ep - 1);
    };
    window.addEventListener('touchstart', down, { passive: true });
    window.addEventListener('touchend', up, { passive: true });
    window.addEventListener('wheel', wheel, { passive: true });
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('touchstart', down);
      window.removeEventListener('touchend', up);
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('keydown', key);
    };
  }, [ep, overlay, dev, goTo]);

  const doUnlock = (m: UnlockMethod) => {
    if (!canUnlock(eco, m)) return;
    setEco((s) => unlock(s, ep, m));
    setOverlay(null);
    // El frame vuelve del desenfoque con un pequeño golpe de luz: el usuario
    // acaba de pagar algo y tiene que ver que lo recibió.
    setRevealing(true);
    window.setTimeout(() => setRevealing(false), 900);
  };

  /** Avanza el reloj N noches sin tocar el estado: así se prueban racha y escudo. */
  const advanceNights = (n: number) => {
    const d = new Date(nowRef.current);
    d.setDate(d.getDate() + n);
    setNow(d);
    setBrokenFrom(null);
    setOverlay(null);
    setEp(1);
    setEco((s) => ({ ...s, passes: 0, passesGranted: 0 }));
  };

  const applyPreset = (p: Preset) => {
    setNow(p.now ?? nowRef.current);
    setEco(p.state);
    setEp(p.ep);
    setBrokenFrom(p.brokenFrom ?? null);
    setOverlay(p.overlay);
    setToast(p.toast ?? null);
    setNightJustAdvanced(!!p.toast);
    window.setTimeout(() => setNightJustAdvanced(false), 1800);
    setDev(false);
    // Los presets dejan el toast fijo a propósito, para poder inspeccionarlo.
    // En el flujo real dura 3,4 s y no bloquea (ver `credit`).
  };

  const meta = episodeMeta(ep);

  return (
    <div className="stage">
      <div className="phone">
        {/* ── Reproductor ─────────────────────────────────────────────── */}
        <main className="player">
          <div className={`frame ${overlay ? 'dimmed' : ''} ${revealing ? 'revealing' : ''}`}>
            <div className="scene" style={{ background: sceneFor(ep) }}>
              <div className="scene-grain" />
              <div className="scene-label">frame de video · POC</div>
            </div>
            <p className="burned-sub">{meta.line}</p>
          </div>

          {/* Con el sheet abierto, los chips se apagan: la economía ya está
              completa dentro del sheet y duplicarla arriba solo genera ruido —
              y, durante la animación de gasto, dos cifras que no coinciden. */}
          <div className={`hud-top ${overlay ? 'is-muted' : ''}`}>
            <span className="wordmark">idilio</span>
            <span className="hud-spacer" />
            {/* I1b · migaja de economía: 2 chips, techo estricto de intrusión */}
            {eco.night > 0 && (
              <span className={`chip chip--streak ${nightJustAdvanced ? 'bump' : ''}`}
                    title={`Noche ${eco.night}`}>
                <Moon s={13} /> {eco.night}
              </span>
            )}
            <span className="chip chip--coins"><Coin s={13} /> {eco.coins}</span>
            <button className="chip" aria-label="Lista de episodios"><List s={15} /></button>
          </div>

          {!overlay && (
            <div className="swipe-hint" aria-hidden>
              <ChevUp />
              <span>desliza para el siguiente</span>
            </div>
          )}

          <div className="rail">
            <button onClick={() => setLiked((l) => !l)} aria-label="Me gusta"
                    style={{ color: liked ? 'var(--home-magenta)' : '#fff' }}>
              <Heart /><span className="n">{407 + (liked ? 1 : 0)}</span>
            </button>
            <button aria-label="Comentarios"><Comment /><span className="n">86</span></button>
            <button aria-label="Compartir"><Share /><span className="n">Compartir</span></button>
          </div>

          <div className="meta">
            <p className="ep">Episodio {ep} de {SERIES.totalEpisodes}</p>
            <h1>{SERIES.title}</h1>
            <p className="sub">{meta.title}</p>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>

          <p className="sr-only">
            POC de la intervención «Racha de Noches» para Idilio TV. Desliza hacia
            arriba o usa la flecha abajo para pasar al siguiente episodio.
          </p>
        </main>

        {/* ── Estado I · toast de racha (no modal, no bloquea) ─────────── */}
        {toast && (
          <div className="toast" role="status">
            {toast.kind === 'shielded' ? (
              <>
                <span style={{ color: 'var(--home-cyan)', display: 'flex' }}><Shield s={18} /></span>
                <strong>Usamos tu escudo</strong>
                <span>sigues en {toast.night} noches</span>
              </>
            ) : toast.kind === 'broken' ? (
              <>
                <span style={{ color: 'var(--home-magenta)', display: 'flex' }}><Moon s={18} /></span>
                <strong>Noche 1</strong>
                <span>empezamos otra vez</span>
              </>
            ) : (
              <>
                <span style={{ color: 'var(--home-magenta)', display: 'flex' }}><Moon s={18} /></span>
                <strong>Noche {toast.night}</strong>
                <span>
                  {ecoRef.current.passes} capítulo{ecoRef.current.passes > 1 ? 's' : ''} de la casa
                </span>
              </>
            )}
          </div>
        )}

        {/* ── Sobrecapas ───────────────────────────────────────────────── */}
        {overlay === 'unlock' && (
          <UnlockSheet
            ep={ep} state={eco} brokenFrom={brokenFrom}
            nightJustAdvanced={nightJustAdvanced}
            onUnlock={doUnlock}
            onShop={() => setOverlay('shop')}
            onClose={() => { setEp((e) => Math.max(1, e - 1)); setOverlay(null); }}
          />
        )}
        {overlay === 'shop' && (
          <CoinShop coins={eco.coins}
            onBuy={(n) => { setEco((s) => buyCoins(s, n)); setOverlay('unlock'); }}
            onClose={() => setOverlay('unlock')} />
        )}
        {overlay === 'account' && (
          <AccountSheet night={eco.night}
            onCreate={() => { setEco(createAccount); setOverlay(afterAccount(eco, ep)); }}
            onLater={() => setOverlay(afterAccount(eco, ep))} />
        )}

        {/* ── Panel de estados (andamiaje del POC, no del producto) ────── */}
        <button className="devtoggle" onClick={() => setDev(true)}>Estados</button>
        {dev && (
          <DevPanel
            eco={eco} ep={ep} now={now}
            onPreset={applyPreset}
            onAdvance={advanceNights}
            onClose={() => setDev(false)}
          />
        )}
      </div>
    </div>
  );
}
