/**
 * Modelo económico — Idilio TV
 * ────────────────────────────
 * Las constantes marcadas REAL están verificadas en el producto en producción
 * (muro web de idilio.tv + paywall del build nativo 1.20.0, ago-2026).
 * Las marcadas PROPUESTA son parte de esta intervención.
 */

/** REAL · costo de desbloqueo de un episodio */
export const EPISODE_COST = 15

/** REAL · episodios gratis al inicio de cada serie */
export const FREE_EPISODES = 12

/** Paquetes.
 *  `live` = lo que entrega hoy el producto (verificado en el paywall nativo).
 *  `coins` = la propuesta (I3).
 *
 *  El problema de hoy: $1.99 y $3.99 rinden 90.5 y 94.0 monedas por dólar.
 *  Subir de escalón mejora el valor 3.9% — no hay razón para hacerlo.
 *  La propuesta hace la escalera monótona en la métrica que importa,
 *  que no es "monedas por dólar" sino PRECIO POR EPISODIO:
 *      $1.99 → $0.15/ep · $4.99 → $0.11/ep · $9.99 → $0.10/ep
 *  La oferta de bienvenida queda fuera de la escalera y se declara como tal.
 */
export const PACKS = [
  { id: 'intro', usd: 0.99, anchor: 2.49, coins: 180, live: 180, tag: 'Bienvenida · una sola vez', best: false, intro: true },
  { id: 'p1', usd: 1.99, anchor: null, coins: 195, live: 180, tag: null, best: false, intro: false },
  { id: 'p2', usd: 4.99, anchor: null, coins: 660, live: 375, tag: 'Una serie completa', best: true, intro: false },
  { id: 'p3', usd: 9.99, anchor: null, coins: 1500, live: null, tag: null, best: false, intro: false },
] as const

/** PROPUESTA · la ventana de la "noche" corre de 5am a 5am en la zona del usuario.
 *  54% de las sesiones son entre 11pm y 2am: cortar a medianoche parte esa
 *  franja en dos días distintos y rompe rachas por un tecnicismo de reloj. */
export const NIGHT_BOUNDARY_HOUR = 5

/** PROPUESTA · escalera de la racha. Cada noche da un Pase; las monedas
 *  llegan solo en las noches 3, 5 y 7 para acotar la emisión. */
export type NightReward = { night: number; pass: true; coins: number; shield: boolean }
export const STREAK: NightReward[] = [
  { night: 1, pass: true, coins: 0, shield: false },
  { night: 2, pass: true, coins: 0, shield: false },
  { night: 3, pass: true, coins: 30, shield: true },
  { night: 4, pass: true, coins: 0, shield: false },
  { night: 5, pass: true, coins: 45, shield: false },
  { night: 6, pass: true, coins: 0, shield: false },
  { night: 7, pass: true, coins: 75, shield: false },
]

/** PROPUESTA · techo duro de emisión: un Pase cada 24 h por usuario,
 *  no por serie. Es la restricción que sostiene la economía. */
export const PASS_COOLDOWN_MS = 24 * 60 * 60 * 1000

/** PROPUESTA · máximo de comodines acumulables */
export const MAX_SHIELDS = 1

// ─────────────────────────────────────────────────────────────
// Traducción: la moneda siempre habla en episodios (I1)
// ─────────────────────────────────────────────────────────────

export const toEpisodes = (coins: number) => Math.floor(coins / EPISODE_COST)

export function episodesLabel(coins: number) {
  const n = toEpisodes(coins)
  if (n === 0) return 'menos de 1 episodio'
  return `${n} episodio${n === 1 ? '' : 's'}`
}

export const coinsPerDollar = (coins: number, usd: number) => Math.round(coins / usd)

/** La métrica legible de la escalera: cuánto cuesta un episodio en este paquete. */
export const pricePerEpisode = (coins: number, usd: number) =>
  (usd / toEpisodes(coins)).toFixed(2)

/** Emisión semanal esperada, para el modelo de sostenibilidad. */
export function weeklyIssuance(nightsAttended: number) {
  const nights = Math.min(nightsAttended, 7)
  const coins = STREAK.slice(0, nights).reduce((a, n) => a + n.coins, 0)
  return {
    passes: nights,
    coins,
    episodeValue: nights + toEpisodes(coins),
    coinValue: nights * EPISODE_COST + coins,
  }
}
