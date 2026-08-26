import type { CSSProperties } from 'react'

/** Fotograma sintético: no uso fotos reales del catálogo, pero el POC necesita
 *  la misma temperatura visual que un still nocturno de la app. */
export function frameStyle(hue: [string, string], seed: number): CSSProperties {
  // Luz de recorte + masa oscura en primer plano + viñeta.
  // No es una foto, pero tiene la misma estructura lumínica que un still
  // nocturno: la clave arriba, el sujeto en sombra abajo.
  const kx = 28 + ((seed * 37) % 44)
  const ky = 18 + ((seed * 19) % 22)
  const fx = 34 + ((seed * 53) % 32)
  return {
    backgroundImage: [
      `radial-gradient(38% 26% at ${kx}% ${ky}%, ${hue[0]}ee 0%, ${hue[0]}55 42%, transparent 72%)`,
      `radial-gradient(26% 18% at ${kx + 26}% ${ky + 9}%, rgba(255,236,214,.20) 0%, transparent 68%)`,
      `radial-gradient(52% 42% at ${fx}% 96%, ${hue[1]} 0%, ${hue[1]}cc 48%, transparent 78%)`,
      `radial-gradient(120% 90% at 50% 50%, transparent 24%, rgba(4,2,7,.72) 100%)`,
      `linear-gradient(${152 + (seed % 46)}deg, ${hue[0]}3a 0%, ${hue[1]} 62%, #070410 100%)`,
    ].join(','),
  }
}

