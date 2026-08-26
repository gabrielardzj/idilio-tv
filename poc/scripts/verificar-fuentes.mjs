/**
 * Comprueba que las fuentes citadas en los documentos sigan vivas.
 *
 * Existe porque una cita de este entregable —el earnings call de Webtoon,
 * sindicado por AOL— devolvía 404 y redirigía a la portada, y nadie se enteró:
 * el verificador de enlaces solo mira los internos, a propósito. La credibilidad
 * de un diagnóstico descansa en que sus fuentes se puedan abrir.
 *
 * NO va en CI, y es deliberado: haría que el despliegue dependiera de que
 * ningún sitio ajeno se caiga, y una fuente con un mal día no puede romper una
 * publicación. Se corre a mano cuando toca revisar el documento.
 *
 * Distingue lo que importa de lo que no:
 *   404/410  → la fuente se movió o murió. Hay que arreglarla.
 *   403/429  → protección anti-bots o límite de peticiones. Un humano la abre.
 *   otros    → se reportan tal cual.
 *
 *   node scripts/verificar-fuentes.mjs
 */
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright-core'

const DOCS = new URL('../../docs', import.meta.url).pathname

const mds = async (dir) => {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...await mds(p))
    else if (e.name.endsWith('.md')) out.push(p)
  }
  return out
}

const fuentes = new Map()   // url → dónde se cita
for (const f of await mds(DOCS)) {
  for (const m of (await readFile(f, 'utf8')).matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
    // El propio repositorio no es una fuente: lo cubre verificar-enlaces.
    if (m[1].includes('github.com/gabrielardzj')) continue
    if (!fuentes.has(m[1])) fuentes.set(m[1], f.replace(DOCS + '/', ''))
  }
}

const browser = await chromium.launch()
const page = await (await browser.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36',
})).newPage()

const muertas = [], bloqueadas = [], raras = []
for (const [url, doc] of fuentes) {
  const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25_000 }).catch(() => null)
  const s = r?.status() ?? 0
  if (s === 404 || s === 410) muertas.push(`${s}  ${doc}  ${url}`)
  else if (s === 403 || s === 429) bloqueadas.push(`${s}  ${url}`)
  else if (s === 0 || s >= 400) raras.push(`${s || 'ERR'}  ${doc}  ${url}`)
  await page.waitForTimeout(1200)   // sin ráfaga: si no, GitHub y otros devuelven 429
}
await browser.close()

console.log(`${fuentes.size} fuentes citadas`)
if (bloqueadas.length) console.log(`\n· ${bloqueadas.length} con protección anti-bots (un humano las abre):\n  ${bloqueadas.join('\n  ')}`)
if (raras.length) console.log(`\n· ${raras.length} con respuesta rara, revisar a mano:\n  ${raras.join('\n  ')}`)
console.log(muertas.length ? `\n✗ ${muertas.length} FUENTES MUERTAS:\n  ${muertas.join('\n  ')}` : '\n✓ ninguna fuente muerta')

process.exit(muertas.length ? 1 : 0)
