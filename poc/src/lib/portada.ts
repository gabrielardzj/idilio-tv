/**
 * Portada sintética.
 *
 * En la app real el título va quemado en el arte —grande, en mayúsculas, sobre
 * la foto— y no debajo de la miniatura como una etiqueta. Es la diferencia
 * entre un catálogo y una lista: en el riel real se lee la portada, no el pie.
 *
 * Aquí no hay pósters reales, así que la portada se compone: el título se parte
 * en líneas lo más parejas posible y se escala hasta llenar el ancho de la
 * miniatura, con la variación tipográfica que tienen las portadas del catálogo
 * (unas con serif de novela, otras con la última línea en rojo o en oro).
 */

const ANCHO = 88 // px de título que caben dentro de la miniatura de 102
const ALTO = 70 // px que puede ocupar el bloque, sin comerse el arte
const TOPE = 17 // px: más grande que esto ya no parece una miniatura

/** Ancho medio de una mayúscula, en em. Medido sobre el render, no supuesto:
 *  la Outfit en negrita ocupa más que la Playfair. */
const CAJA = { sans: 0.75, serif: 0.72 }

/** El espacio pesa un tercio de una letra: contarlo como una desafinaba el
 *  cálculo en los títulos largos, que son justo los que se salían de la caja. */
const peso = (linea: string) => [...linea].reduce((a, c) => a + (c === ' ' ? 0.32 : 1), 0)

/** El rojo y el oro con que las portadas del catálogo rematan el título.
 *  El null es igual de importante: un tercio va de un solo color. */
const ACENTOS = [null, '#E8453F', '#F2D06B']

export interface Portada {
  lineas: string[]
  /** font-size en px, ya ajustado para que el bloque quepa. */
  tam: number
  serif: boolean
  /** Color de la última línea, o null si el título va de un solo color. */
  acento: string | null
}

const cache = new Map<string, Portada>()

/** Semilla estable por serie: los tonos y la tipografía no deben bailar entre renders. */
export const semilla = (id: string) => [...id].reduce((a, c) => a + c.charCodeAt(0), 0)

export function portada(titulo: string, sem: number): Portada {
  const memo = cache.get(titulo)
  if (memo) return memo

  // El subtítulo se cae: en una portada de 102px no cabe, y en las reales tampoco está.
  const palabras = titulo.replace(/:.*$/, '').toUpperCase().split(/\s+/)
  const serif = sem % 3 === 0
  const caja = serif ? CAJA.serif : CAJA.sans

  let mejor = { lineas: [palabras.join(' ')], tam: 0 }
  for (let k = 1; k <= Math.min(4, palabras.length); k++) {
    const lineas = repartir(palabras, k)
    const largo = Math.max(...lineas.map(peso))
    const tam = Math.min(ANCHO / (largo * caja), ALTO / (k * 1.06), TOPE)
    if (tam > mejor.tam) mejor = { lineas, tam }
  }

  const p: Portada = {
    lineas: mejor.lineas,
    tam: Math.round(mejor.tam * 10) / 10,
    serif,
    // El acento se decide con otra cifra de la semilla que la serif: si no,
    // serif y color irían siempre juntos y las portadas se parecerían entre sí.
    acento: mejor.lineas.length > 1 ? ACENTOS[Math.floor(sem / 3) % ACENTOS.length] : null,
  }
  cache.set(titulo, p)
  return p
}

/**
 * Reparte las palabras en exactamente k líneas minimizando la línea más larga.
 * Son títulos de diez palabras como mucho y k llega a 4: la búsqueda completa
 * cuesta nada y evita los cortes feos del reparto codicioso.
 */
function repartir(palabras: string[], k: number): string[] {
  if (k <= 1 || palabras.length <= 1) return [palabras.join(' ')]
  let mejor = [palabras.join(' ')]
  let mejorLargo = Infinity
  for (let i = 0; i <= palabras.length - k; i++) {
    const cabeza = palabras.slice(0, i + 1).join(' ')
    const resto = repartir(palabras.slice(i + 1), k - 1)
    const largo = Math.max(cabeza.length, ...resto.map((l) => l.length))
    if (largo < mejorLargo) {
      mejorLargo = largo
      mejor = [cabeza, ...resto]
    }
  }
  return mejor
}
