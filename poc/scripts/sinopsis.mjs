/**
 * Vuelca las sinopsis del censo en `src/lib/sinopsis.ts`.
 *
 *   node scripts/sinopsis.mjs
 *
 * La ficha de serie de la app nativa abre con «Resumen» y media pantalla de
 * texto. Ese texto es del catálogo real —lo publica cada ficha de idilio.tv y
 * el censo lo guarda—, así que el POC no tiene por qué inventarlo: se copia.
 *
 * Va en un módulo aparte y no en `catalogo.ts` por una razón de lectura: son
 * cuarenta párrafos de ~500 caracteres, y metidos entre las cifras convertirían
 * una tabla que se lee de un vistazo en un muro de prosa.
 *
 * Como `bajar-posters.mjs`, es un script de una sola vez: el .ts queda
 * versionado y solo hay que volver a correrlo cuando el censo cambie.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = dirname(dirname(fileURLToPath(import.meta.url)))
const CENSO = join(RAIZ, '..', 'docs', '00-dogfooding', 'catalogo.json')
const DESTINO = join(RAIZ, 'src', 'lib', 'sinopsis.ts')

/** El mismo id que usa poc/src/lib/catalogo.ts: sin acentos y cortado a 38. */
const slug = (t) =>
  t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 38).replace(/-$/, '')

const censo = JSON.parse(readFileSync(CENSO, 'utf8'))
const conMuro = censo.filter((s) => s.total > s.gratis)
const conTexto = conMuro.filter((s) => s.sinopsis)

const lineas = conTexto
  .map((s) => `  '${slug(s.titulo)}':\n    ${JSON.stringify(s.sinopsis)},`)
  .join('\n')

const sinTexto = conMuro.filter((s) => !s.sinopsis).map((s) => s.titulo)

writeFileSync(
  DESTINO,
  `/**
 * Las sinopsis del catálogo real, tal como las publica la ficha de cada serie
 * en idilio.tv. Son el texto que la app nativa muestra bajo «Resumen».
 *
 * GENERADO por scripts/sinopsis.mjs desde docs/00-dogfooding/catalogo.json.
 * No editar a mano: el catálogo es del producto, no del prototipo.
 *
 * ${sinTexto.length} de las ${conMuro.length} series con muro no tienen sinopsis cargada${sinTexto.length ? ` —${sinTexto.join(', ')}—` : ''}
 * y no aparecen acá. En esas, el sitio real repite el título en el lugar del
 * resumen, y la ficha del POC hace lo mismo.
 */
export const SINOPSIS: Record<string, string> = {
${lineas}
}
`,
  'utf8',
)

console.log(`${conTexto.length} sinopsis · ${sinTexto.length} sin cargar en el catálogo → src/lib/sinopsis.ts`)
