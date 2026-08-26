/**
 * Baja los pósters reales del catálogo de idilio.tv y los deja listos para el
 * prototipo.
 *
 * Hasta ahora el POC dibujaba portadas sintéticas —un degradado por serie y el
 * título compuesto encima— porque no tenía el arte. El arte existe: cada ficha
 * pública publica su póster, y el póster ya trae el título y el sello «idilio
 * original» quemados, que es justo lo que la portada sintética imitaba.
 *
 *   node scripts/bajar-posters.mjs [--forzar]
 *
 * Es un script de una sola vez: los .webp quedan versionados en public/posters
 * y solo hay que volver a correrlo cuando el catálogo cambie. Sin `--forzar` no
 * vuelve a bajar lo que ya está en disco.
 *
 * ── Dos decisiones que vale la pena explicar ────────────────────────────────
 *
 * 1 · **Por qué se re-codifica.** El original pesa ~2 MB (960x1200 PNG). Cuarenta
 *     y uno de esos son 80 MB en un repositorio que se publica en Pages, para
 *     pintar miniaturas de 102x132. Se reencodan a 480x600 webp: sobra
 *     resolución para la miniatura a 3x (306 px) y el peso total baja a ~2 MB.
 *
 * 2 · **Por qué con Chromium y no con una librería de imágenes.** playwright-core
 *     ya es dependencia del POC —lo usan el recorrido y el export—, así que
 *     re-codificar en un canvas no agrega nada al árbol de dependencias. sharp
 *     habría entrado solo para esto, y encima se instalaría en cada corrida de
 *     CI, que no baja pósters nunca.
 */
import { chromium } from 'playwright-core'
import { mkdir, writeFile, readdir, stat } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITIO = 'https://www.idilio.tv'
const RAIZ = dirname(dirname(fileURLToPath(import.meta.url)))
const CENSO = join(RAIZ, '..', 'docs', '00-dogfooding', 'catalogo.json')
const DESTINO = join(RAIZ, 'public', 'posters')
const FORZAR = process.argv.includes('--forzar')

/** El ancho de la miniatura a 3x es 306 px; 480 deja margen para la ficha. */
const ANCHO = 480
const ALTO = 600
const CALIDAD = 0.8

/** El mismo id que usa poc/src/lib/catalogo.ts: sin acentos y cortado a 38. */
const slug = (t) =>
  t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 38).replace(/-$/, '')

const get = async (url, tipo = 'text') => {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { 'accept-language': 'es-419,es' } })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      return tipo === 'text' ? await r.text() : Buffer.from(await r.arrayBuffer())
    } catch (e) {
      if (i === 2) throw e
      await new Promise((r) => setTimeout(r, 400 * (i + 1)))
    }
  }
}

/** La URL del póster viaja dentro del JSON de hidratación, con las comillas
 *  escapadas. Se toma la primera de `posters/`: es la de la ficha. */
const urlDelPoster = (html) => {
  const m = html.match(/https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/sign\/posters\/[^"\\ ]+/)
  return m ? m[0].replace(/&amp;/g, '&') : null
}

const censo = JSON.parse(readFileSync(CENSO, 'utf8'))
const conMuro = censo.filter((s) => s.total > s.gratis)
await mkdir(DESTINO, { recursive: true })
const yaEstan = new Set(FORZAR ? [] : (await readdir(DESTINO).catch(() => [])).map((f) => f.replace(/\.webp$/, '')))

const pendientes = conMuro.filter((s) => !yaEstan.has(slug(s.titulo)))
console.log(`${conMuro.length} series con muro · ${pendientes.length} por bajar`)
if (!pendientes.length) process.exit(0)

const navegador = await chromium.launch()
const pagina = await navegador.newPage()

/** Re-codifica en el canvas: recorte "cover" y salida webp. */
const recodificar = (b64, ancho, alto, calidad) => pagina.evaluate(
  async ([b64, ancho, alto, calidad]) => {
    const img = new Image()
    img.src = `data:image/png;base64,${b64}`
    await img.decode()
    const c = document.createElement('canvas')
    c.width = ancho; c.height = alto
    const escala = Math.max(ancho / img.width, alto / img.height)
    const w = img.width * escala, h = img.height * escala
    c.getContext('2d').drawImage(img, (ancho - w) / 2, (alto - h) / 2, w, h)
    return c.toDataURL('image/webp', calidad).split(',')[1]
  },
  [b64, ancho, alto, calidad],
)

const fallos = []
let bytes = 0
for (const s of pendientes) {
  const id = slug(s.titulo)
  try {
    const url = urlDelPoster(await get(`${SITIO}/serie/${s.id}`))
    if (!url) throw new Error('la ficha no publica póster')
    const original = await get(url, 'bin')
    const webp = Buffer.from(await recodificar(original.toString('base64'), ANCHO, ALTO, CALIDAD), 'base64')
    await writeFile(join(DESTINO, `${id}.webp`), webp)
    bytes += webp.length
    console.log(`  ✓ ${id.padEnd(40)} ${(original.length / 1024 / 1024).toFixed(1)} MB → ${(webp.length / 1024).toFixed(0)} KB`)
  } catch (e) {
    fallos.push(`${s.titulo}: ${e.message ?? e}`)
    console.log(`  ✗ ${id.padEnd(40)} ${e.message ?? e}`)
  }
}

await navegador.close()

const total = (await readdir(DESTINO)).filter((f) => f.endsWith('.webp'))
const peso = (await Promise.all(total.map(async (f) => (await stat(join(DESTINO, f))).size))).reduce((a, b) => a + b, 0)
console.log(`\n${total.length}/${conMuro.length} pósters en disco · ${(peso / 1024 / 1024).toFixed(1)} MB en total`)
if (fallos.length) {
  console.log(`\n${fallos.length} sin arte —el prototipo cae a la portada sintética en esas—:`)
  for (const f of fallos) console.log(`  · ${f}`)
}
