import { initialState, nightIndex, type EconomyState, type StreakEvent } from '../economy';
import { Close } from '../icons';

export interface Preset {
  state: EconomyState;
  ep: number;
  overlay: null | 'unlock' | 'account' | 'shop';
  /** Congela la hoja en la animación de gasto para poder inspeccionarla. */
  frozenSpend?: 'pass' | 'coins' | null;
  now?: Date;
  brokenFrom?: number | null;
  toast?: StreakEvent | null;
}

/** Reloj base del POC: 23:12, dentro de la franja donde ocurre el 54% de las sesiones. */
const night = (offsetDays = 0) => {
  const d = new Date();
  d.setHours(23, 12, 0, 0);
  d.setDate(d.getDate() + offsetDays);
  return d;
};

const at = (d: Date) => nightIndex(d);

const PRESETS: { id: string; label: string; hint: string; make: () => Preset }[] = [
  {
    id: 'A', label: 'A · Invitado · noche 1 · sin monedas',
    hint: 'Primer muro. CTA primario = Ver gratis. El precio va debajo.',
    make: () => ({
      state: initialState({ night: 1, passes: 1, passesGranted: 1, coins: 0, lastNightIndex: at(night()) }),
      ep: 11, overlay: 'unlock', now: night(),
    }),
  },
  {
    id: 'B', label: 'B · Pase gastado · sin monedas',
    hint: 'Segundo muro de la noche. Aquí es donde el producto monetiza.',
    make: () => ({
      state: initialState({ night: 1, passes: 0, passesGranted: 1, coins: 0, unlocked: [11], lastNightIndex: at(night()) }),
      ep: 12, overlay: 'unlock', now: night(),
    }),
  },
  {
    id: 'C', label: 'C · Pase gastado · con saldo',
    hint: 'CTA primario pasa a "Desbloquear por 15".',
    make: () => ({
      state: initialState({ night: 2, passes: 0, passesGranted: 2, coins: 90, unlocked: [11, 12], lastNightIndex: at(night()) }),
      ep: 13, overlay: 'unlock', now: night(),
    }),
  },
  {
    id: 'D', label: 'D · Noche 2',
    hint: 'La recompensa se duplica. Dos lunas encendidas.',
    make: () => ({
      state: initialState({ night: 2, passes: 2, passesGranted: 2, coins: 0, lastNightIndex: at(night()) }),
      ep: 11, overlay: 'unlock', now: night(),
    }),
  },
  {
    id: 'E', label: 'E · Noche 3 — hito',
    hint: '3 pases + escudo + oferta de cuenta. Donde el dato dice 2,4× en D30.',
    make: () => ({
      state: initialState({ night: 3, passes: 3, passesGranted: 3, shields: 1, coins: 0, lastNightIndex: at(night()) }),
      ep: 11, overlay: 'account', now: night(),
      toast: { kind: 'continued', night: 3 },
    }),
  },
  {
    id: 'F', label: 'F · Racha rota',
    hint: 'Faltó más de una noche y no tenía escudo. Se informa sin culpa.',
    make: () => ({
      state: initialState({ night: 1, passes: 1, passesGranted: 1, coins: 0, unlocked: [], lastNightIndex: at(night()) }),
      ep: 11, overlay: 'unlock', now: night(), brokenFrom: 5,
      toast: { kind: 'broken', previousNight: 5 },
    }),
  },
  {
    id: 'G', label: 'G · Escudo consumido',
    hint: 'Faltó una noche. El escudo se gasta solo y se avisa después.',
    make: () => ({
      state: initialState({ night: 6, passes: 3, passesGranted: 3, shields: 0, coins: 30, lastNightIndex: at(night()) }),
      ep: 11, overlay: 'unlock', now: night(),
      toast: { kind: 'shielded', night: 6, nightsMissed: 1 },
    }),
  },
  {
    id: 'H', label: 'H · Con cuenta · noche 7',
    hint: 'Cierre de ciclo: 5 pases y el escudo se repone.',
    make: () => ({
      state: initialState({ night: 7, passes: 5, passesGranted: 5, shields: 2, coins: 45, hasAccount: true, accountOffered: true, lastNightIndex: at(night()) }),
      ep: 11, overlay: 'unlock', now: night(),
    }),
  },
  {
    id: 'I', label: 'I · Toast en el reproductor',
    hint: 'La confirmación de racha NO es un modal. No interrumpe el video.',
    make: () => ({
      state: initialState({ night: 2, passes: 2, passesGranted: 2, coins: 0, lastNightIndex: at(night()) }),
      ep: 4, overlay: null, now: night(),
      toast: { kind: 'continued', night: 2 },
    }),
  },
  {
    id: 'J', label: '· El momento del gasto',
    hint: 'La hoja congelada 240 ms después del toque: CTA confirmado, recibo −15, saldo bajando.',
    make: () => ({
      state: initialState({ night: 2, passes: 0, passesGranted: 2, coins: 90, unlocked: [11, 12], lastNightIndex: at(night()) }),
      ep: 13, overlay: 'unlock', now: night(), frozenSpend: 'coins',
    }),
  },
  {
    id: 'S', label: '· Tienda de monedas',
    hint: 'La fuente comprada. Precio por capítulo, no por moneda.',
    make: () => ({
      state: initialState({ night: 1, passes: 0, passesGranted: 1, coins: 5, lastNightIndex: at(night()) }),
      ep: 12, overlay: 'shop', now: night(),
    }),
  },
  {
    id: '0', label: '· Empezar de cero',
    hint: 'Episodio 1, sin racha. El recorrido completo, como un usuario nuevo.',
    make: () => ({ state: initialState(), ep: 1, overlay: null, now: night() }),
  },
];

export function DevPanel({ eco, ep, now, onPreset, onAdvance, onClose }: {
  eco: EconomyState; ep: number; now: Date;
  onPreset: (p: Preset) => void;
  onAdvance: (n: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="dev" role="dialog" aria-label="Estados del prototipo">
      <button className="dev-close" onClick={onClose} aria-label="Cerrar"><Close /></button>
      <h2>Estados del prototipo</h2>
      <p>
        Andamiaje del POC, no parte del producto. Sirve para llegar a cualquier
        estado sin tener que esperar noches reales.
      </p>

      <h3>Recorrido real</h3>
      <div className="dev-grid">
        <button className="dev-btn" onClick={() => onAdvance(1)}>
          <b>Avanzar una noche</b>
          <i>Simula que vuelves mañana. La racha sube y la recompensa crece.</i>
        </button>
        <button className="dev-btn" onClick={() => onAdvance(2)}>
          <b>Saltarte una noche</b>
          <i>Si tienes escudo, aguanta. Si no, la racha se rompe.</i>
        </button>
        <button className="dev-btn" onClick={() => onAdvance(4)}>
          <b>Desaparecer tres noches</b>
          <i>Ni el escudo cubre esto. Estado F.</i>
        </button>
      </div>

      <h3>Estados</h3>
      <div className="dev-grid">
        {PRESETS.map((p) => (
          <button key={p.id} className="dev-btn" onClick={() => onPreset(p.make())}>
            <b>{p.label}</b>
            <i>{p.hint}</i>
          </button>
        ))}
      </div>

      <div className="dev-state">
        noche <b>{eco.night}</b> · pases <b>{eco.passes}/{eco.passesGranted}</b> ·
        monedas <b>{eco.coins}</b> · escudos <b>{eco.shields}</b>
        <br />
        episodio <b>{ep}</b> · desbloqueados <b>[{eco.unlocked.join(', ') || '—'}]</b>
        <br />
        cuenta <b>{eco.hasAccount ? 'sí' : 'no'}</b> ·
        reloj <b>{now.toLocaleString('es-MX', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</b>
        <br />
        índice de noche <b>{nightIndex(now)}</b> <span style={{ opacity: .6 }}>(corte 4:00 am)</span>
      </div>
    </div>
  );
}
