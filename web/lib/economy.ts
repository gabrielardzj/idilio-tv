/**
 * Modelo económico — Idilio TV
 * ────────────────────────────
 * Las constantes marcadas REAL están verificadas en el producto en producción
 * (muro web de idilio.tv + paywall del build nativo 1.20.0, ago-2026).
 * Las marcadas PROPUESTA son parte de esta intervención.
 */

/** REAL · costo de desbloqueo de un episodio */
export const EPISODE_COST = 15

/** REAL · episodios gratis al inicio de una serie.
 *  Medido en las 50 series del catálogo: la moda es 10 (37 de 41 series con
 *  muro). Hay cuatro excepciones — Pasión a Domicilio 12, Las Flores del Amor
 *  12, La Mágica Navidad 11, La Herencia del Patriarca 7 — y 9 series de ≤10
 *  episodios sin muro alguno.
 *  Censo completo en docs/00-dogfooding/catalogo.json */
export const FREE_EPISODES = 10

/** REAL · el catálogo entero, censado el 26-ago-2026 recorriendo el sitemap.xml
 *  de idilio.tv, una ficha por serie.
 *  500 episodios gratis a 14 por sesión son 36 sesiones sin pagar; a 2.3
 *  sesiones por semana, casi cuatro meses. Es el dato que explica por qué el
 *  muro no convierte: la alternativa a pagar no es irse, es empezar otra serie.
 *  (500 + 1.728 = 2.228, dos menos que 2.230: dos series tienen huecos en la
 *  numeración de episodios. No es un error de suma.) */
export const CATALOGO = { series: 50, episodios: 2230, gratis: 500, bloqueados: 1728 } as const

/** Paquetes.
 *  `live` = lo que entrega hoy el producto (verificado en el paywall nativo).
 *  `coins` = la propuesta (I3).
 *
 *  Ningún paquete lleva precio tachado. Hoy los cuatro del paywall real llevan
 *  badge de descuento simultáneo (60%, 20%, 20%, 30%) contra anclas de $2.49 y
 *  $4.99: cuando todo está en oferta, el ancla deja de anclar y empieza a restar
 *  confianza justo en el momento de pagar.
 *
 *  El problema de hoy: $1.99 y $3.99 rinden 90.5 y 94.0 monedas por dólar.
 *  Subir de escalón mejora el valor 3.9% — no hay razón para hacerlo.
 *  La propuesta hace la escalera monótona en la métrica que importa,
 *  que no es "monedas por dólar" sino PRECIO POR EPISODIO:
 *      $1.99 → $0.15/ep · $4.99 → $0.11/ep · $9.99 → $0.10/ep
 *  La oferta de bienvenida queda fuera de la escalera y se declara como tal.
 */
export const PACKS = [
  // Sin precio tachado: en esta escalera no existe un paquete de 180 monedas a
  // precio regular, así que anclar contra $2.49 sería anclar contra un producto
  // inventado. El "$0.08 por episodio" frente al "$0.15" del siguiente escalón
  // ya dice todo lo que el ancla pretendía decir, y es verdad.
  { id: 'intro', usd: 0.99, coins: 180, live: 180, tag: 'Bienvenida · una sola vez', best: false, intro: true },
  { id: 'p1', usd: 1.99, coins: 195, live: 180, tag: null, best: false, intro: false },
  { id: 'p2', usd: 4.99, coins: 660, live: 375, tag: null, best: true, intro: false },
  { id: 'p3', usd: 9.99, coins: 1500, live: null, tag: null, best: false, intro: false },
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

/** PROPUESTA · techo duro de emisión: un Pase por noche por usuario, no por
 *  serie. Es la restricción que sostiene la economía.
 *
 *  Se acredita **al terminar el primer episodio de la noche**, no con un reloj
 *  de 24 h. La diferencia importa más de lo que parece:
 *
 *  - Por reloj, el pase puede llegar cuando el usuario no está, y hay que
 *    decidir qué hacer con el pase que nadie recogió.
 *  - Por ver, llega siempre con el usuario presente, y la adopción de la fuente
 *    es del ~100% **por construcción**, no por diseño de pantalla. Es la
 *    corrección directa al 19% de reclamo de la recompensa diaria: no se
 *    reclama nada, se acredita solo.
 *
 *  El cooldown sigue existiendo como techo de emisión y como reloj de la cita,
 *  pero ya no es lo que dispara la acreditación. */
export const PASS_COOLDOWN_MS = 24 * 60 * 60 * 1000

/** PROPUESTA · hora habitual del usuario, para anclar la cita.
 *
 *  «Tu próximo pase mañana a las 21:30» —a la hora en que suele ver— es una
 *  cita mucho mejor que «dentro de 24 h desde que lo usaste», que cae a una
 *  hora arbitraria. El 54% de las sesiones son entre 11pm y 2am: el sistema ya
 *  sabe cuándo vuelve cada quien, y debería usarlo. */
export const HORA_HABITUAL = 21.5

/** PROPUESTA · máximo de comodines acumulables */
export const MAX_SHIELDS = 1

/** PROPUESTA · los pases se acumulan hasta 2, y ahí se detiene la acumulación.
 *
 *  Esta constante es la respuesta a la crítica más seria que se le puede hacer
 *  a la mecánica. El Daily Pass de Webtoon (2020-2025, retirado) funcionaba con
 *  "úsalo o piérdelo" y la queja dominante de sus lectores fue que convertía la
 *  lectura en una tarea diaria. Un pase que se pierde es una obligación disfrazada
 *  de regalo.
 *
 *  Con tope 2: faltar una noche no se siente como pérdida (el pase sigue ahí),
 *  pero volver seguido sigue siendo estrictamente mejor — quien entra 2 noches
 *  por semana recolecta 4 pases; quien entra 4 o más recolecta los 7 que emite
 *  el sistema. El gradiente de incentivo se conserva; el castigo, no.
 *
 *  Si el tope fuera 7, acumular la semana entera y entrar un solo día daría lo
 *  mismo que entrar todos los días, y la mecánica dejaría de mover DAU/MAU. */
export const MAX_PASSES = 2

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

/**
 * Cuál paquete termina la serie en la que está el usuario.
 *
 * La primera versión etiquetaba el paquete de 660 monedas como "Una serie
 * completa" de forma fija. Al medir el catálogo resultó que las series van de
 * 150 a 960 monedas: de las 41 series con muro, una sola cuesta exactamente
 * 660, así que la etiqueta habría sido falsa en las otras 40.
 * Ahora se calcula contra la serie que el usuario está viendo, así que o es
 * cierta o no aparece.
 */
export const packThatCompletes = (coinsNeeded: number) =>
  PACKS.filter((p) => !p.intro).find((p) => p.coins >= coinsNeeded)?.id ?? null

/** Emisión semanal esperada, para el modelo de sostenibilidad. */
export function weeklyIssuance(nightsAttended: number) {
  const nights = Math.min(nightsAttended, 7)
  const coins = STREAK.slice(0, nights).reduce((a, n) => a + n.coins, 0)
  // Con acumulación hasta MAX_PASSES, quien entra N noches recolecta hasta
  // N × MAX_PASSES pases — siempre limitado por la emisión de 1 cada 24 h.
  const passes = Math.min(nights * MAX_PASSES, 7)
  return {
    passes,
    coins,
    episodeValue: passes + toEpisodes(coins),
    coinValue: passes * EPISODE_COST + coins,
  }
}
