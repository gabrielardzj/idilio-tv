/**
 * Motor de economía — "Racha de Noches" · Idilio TV
 *
 * Lógica pura, sin React y sin DOM, para que las reglas de la economía se puedan
 * leer, discutir y testear sin abrir la app. Todas las decisiones de producto
 * documentadas en docs/03-intervencion.md están implementadas aquí y solo aquí.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Constantes de la economía
// ─────────────────────────────────────────────────────────────────────────────

/** Precio del sumidero. Verificado en reseñas públicas de Google Play (18-ago-2026). */
export const COINS_PER_EPISODE = 15;

/** Episodios libres por serie antes del muro. Verificado en www.idilio.tv. */
export const FREE_EPISODES = 10;

/**
 * La noche cierra a las 4:00 am hora local, no a medianoche.
 * Razón: 54% de las sesiones ocurren entre 11pm y 2am; un corte a medianoche
 * parte la ventana principal de consumo por la mitad y rompe rachas por
 * contabilidad, no por abandono. Ver docs/01-diagnostico.md §1.2 señal 4.
 */
export const NIGHT_ROLLOVER_HOUR = 4;

/**
 * Tabla de recompensas por noche de racha.
 * El salto grande está en la noche 3 a propósito: ahí es donde el dato dice que
 * la retención D30 se multiplica por 2,4. Se premia donde el producto gana.
 */
export const NIGHT_REWARDS: { passes: number; shield: boolean }[] = [
  { passes: 1, shield: false }, // noche 1
  { passes: 2, shield: false }, // noche 2
  { passes: 3, shield: true },  // noche 3 — hito: escudo + oferta de cuenta
  { passes: 3, shield: false }, // noche 4
  { passes: 3, shield: false }, // noche 5
  { passes: 3, shield: false }, // noche 6
  { passes: 5, shield: true },  // noche 7 — cierre de ciclo semanal
];

export const CYCLE_LENGTH = NIGHT_REWARDS.length;
export const MAX_SHIELDS = 2;
/** La noche en la que se ofrece la cuenta. Coincide con el hito del 2,4×. */
export const ACCOUNT_PROMPT_NIGHT = 3;

export type StreakEvent =
  | { kind: 'continued'; night: number }
  | { kind: 'started'; night: 1 }
  | { kind: 'shielded'; night: number; nightsMissed: number }
  | { kind: 'broken'; previousNight: number };

export interface EconomyState {
  /** Noches consecutivas. 0 = nunca ha visto nada. */
  night: number;
  /** Pases de la casa disponibles ESTA noche. No se acumulan entre noches. */
  passes: number;
  /** Pases que le tocaban esta noche (para mostrar "2 de 3"). */
  passesGranted: number;
  /** Monedas compradas. Sí se acumulan, no caducan. */
  coins: number;
  /** Escudos ganados. Nunca comprados. */
  shields: number;
  /** Índice de la última noche acreditada (días desde epoch, corregido a 4am). */
  lastNightIndex: number | null;
  /** Episodios desbloqueados de la serie en curso. */
  unlocked: number[];
  /** Si el usuario creó cuenta. */
  hasAccount: boolean;
  /** Si ya se le ofreció la cuenta (se ofrece una sola vez). */
  accountOffered: boolean;
}

export const initialState = (overrides: Partial<EconomyState> = {}): EconomyState => ({
  night: 0,
  passes: 0,
  passesGranted: 0,
  coins: 0,
  shields: 0,
  lastNightIndex: null,
  unlocked: [],
  hasAccount: false,
  accountOffered: false,
  ...overrides,
});

// ─────────────────────────────────────────────────────────────────────────────
// El calendario de noches
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Índice de noche para un instante dado. Todo lo que ocurre antes de las 4:00 am
 * pertenece a la noche del día anterior — que es como funcionan las noches.
 */
export function nightIndex(at: Date): number {
  const shifted = new Date(at.getTime() - NIGHT_ROLLOVER_HOUR * 3600_000);
  return Math.floor(
    Date.UTC(shifted.getFullYear(), shifted.getMonth(), shifted.getDate()) / 86_400_000,
  );
}

/** Momento en que abre la próxima noche (para el copy "vuelve mañana a las…"). */
export function nextNightOpensAt(at: Date): Date {
  const d = new Date(at);
  if (d.getHours() < NIGHT_ROLLOVER_HOUR) {
    d.setHours(NIGHT_ROLLOVER_HOUR, 0, 0, 0);
  } else {
    d.setDate(d.getDate() + 1);
    d.setHours(NIGHT_ROLLOVER_HOUR, 0, 0, 0);
  }
  return d;
}

export function rewardForNight(night: number): { passes: number; shield: boolean } {
  if (night <= 0) return { passes: 0, shield: false };
  // El contador de noches nunca se reinicia; lo que se repite es el ciclo de 7.
  const idx = (night - 1) % CYCLE_LENGTH;
  return NIGHT_REWARDS[idx];
}

// ─────────────────────────────────────────────────────────────────────────────
// La regla central: la racha se acredita por VER, no por reclamar
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Se invoca al TERMINAR un episodio. No hay ningún botón de "reclamar".
 *
 * Esta es la decisión de diseño que convierte la adopción de la fuente de ~19%
 * (los que encuentran el módulo en el perfil) a ~100% (los que ven un episodio,
 * que es todo el mundo). Ver docs/03-intervencion.md §3.1.
 */
export function creditNight(
  state: EconomyState,
  at: Date,
): { state: EconomyState; event: StreakEvent | null } {
  const idx = nightIndex(at);

  // Ya se acreditó esta noche: ver más episodios no acumula más pases.
  if (state.lastNightIndex === idx) return { state, event: null };

  const gap = state.lastNightIndex === null ? null : idx - state.lastNightIndex;

  let night: number;
  let shields = state.shields;
  let event: StreakEvent;

  if (gap === null) {
    night = 1;
    event = { kind: 'started', night: 1 };
  } else if (gap === 1) {
    night = state.night + 1;
    event = { kind: 'continued', night };
  } else {
    // Faltó al menos una noche.
    const missed = gap - 1;
    // El escudo cubre UNA noche perdida y se consume solo, sin preguntar.
    if (missed === 1 && shields > 0) {
      shields -= 1;
      night = state.night + 1;
      event = { kind: 'shielded', night, nightsMissed: missed };
    } else {
      event = { kind: 'broken', previousNight: state.night };
      night = 1;
    }
  }

  const reward = rewardForNight(night);
  if (reward.shield) shields = Math.min(MAX_SHIELDS, shields + 1);

  return {
    state: {
      ...state,
      night,
      // Los pases NO se acumulan entre noches: se reemplazan. Es acceso, no saldo.
      passes: reward.passes,
      passesGranted: reward.passes,
      shields,
      lastNightIndex: idx,
    },
    event,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Sumidero
// ─────────────────────────────────────────────────────────────────────────────

export const isFree = (ep: number) => ep <= FREE_EPISODES;

export function isUnlocked(state: EconomyState, ep: number): boolean {
  return isFree(ep) || state.unlocked.includes(ep);
}

export type UnlockMethod = 'pass' | 'coins';

export function canUnlock(state: EconomyState, method: UnlockMethod): boolean {
  return method === 'pass' ? state.passes > 0 : state.coins >= COINS_PER_EPISODE;
}

export function unlock(
  state: EconomyState,
  ep: number,
  method: UnlockMethod,
): EconomyState {
  if (isUnlocked(state, ep) || !canUnlock(state, method)) return state;
  return {
    ...state,
    passes: method === 'pass' ? state.passes - 1 : state.passes,
    coins: method === 'coins' ? state.coins - COINS_PER_EPISODE : state.coins,
    unlocked: [...state.unlocked, ep],
  };
}

export const buyCoins = (state: EconomyState, amount: number): EconomyState => ({
  ...state,
  coins: state.coins + amount,
});

export const createAccount = (state: EconomyState): EconomyState => ({
  ...state,
  hasAccount: true,
  accountOffered: true,
});
