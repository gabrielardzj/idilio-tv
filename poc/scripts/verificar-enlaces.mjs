/**
 * Comprueba que el sitio armado se pueda recorrer entero.
 *
 * Existe porque el entregable perdió su navegación sin que nada se quejara: la
 * raíz servía el prototipo y no enlazaba a ningún lado, así que el diagnóstico
 * —35% de la evaluación—, la estrategia y el archivo de diseño estaban
 * publicados y eran inalcanzables desde el único link que se entrega. El brief
 * pide los cuatro entregables en un link; nada verificaba que lo fueran.
 *
 * Dos cosas:
 *   1. Todo href interno de todo HTML del sitio resuelve a un archivo.
 *   2. La puerta de entrada ofrece los cuatro entregables, los flujos y el stack.
 *
 *   node scripts/verificar-enlaces.mjs <dir-del-sitio>
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import { join, dirname, resolve, relative } from 'node:path'

const SITIO = resolve(process.argv[2] ?? '../_site')

/** Lo que la puerta de entrada tiene que ofrecer, pase lo que pase. */
const IMPRESCINDIBLES = [
  'docs/diagnostico.html', 'docs/estrategia.html', 'docs/intervencion.html',
  'docs/poc.html', 'docs/diseno.html', 'flujos/', 'stack/',
]

const htmls = async (dir) => {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) { if (e.name !== '_next' && e.name !== 'assets') out.push(...await htmls(p)) }
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

const existe = async (p) =>
  await stat(p).then((s) => s.isFile() || s.isDirectory()).catch(() => false)

const fallos = []
const paginas = await htmls(SITIO)

/** Los `id` de cada página, para poder comprobar las anclas. Se lee todo una
 *  vez: las páginas son pocas y así el chequeo no depende del orden. */
const anclas = new Map()
for (const pagina of paginas) {
  anclas.set(pagina, new Set([...(await readFile(pagina, 'utf8')).matchAll(/id="([^"]+)"/g)].map((m) => m[1])))
}

for (const pagina of paginas) {
  const html = await readFile(pagina, 'utf8')

  // Las anclas se comprueban aparte, y hacen falta: los documentos se enlazan
  // entre sí por título —«§5.1», «§3.4bis»— y renombrar un título rompe el
  // enlace sin romper nada más. Un índice que lleva al principio de la página
  // en vez de a su sección es de los defectos que nadie reporta y todos sufren.
  for (const m of html.matchAll(/href="([^"#]*)#([^"]+)"/g)) {
    if (/^(https?:|mailto:)/.test(m[1])) continue
    const destino = m[1] === '' || m[1] === './' ? pagina : resolve(dirname(pagina), m[1])
    const ids = anclas.get(destino) ?? anclas.get(join(destino, 'index.html'))
    if (!ids) continue   // fuera del conjunto de páginas: lo cubre la comprobación de abajo
    const anc = decodeURIComponent(m[2])
    if (!ids.has(anc)) fallos.push(`${relative(SITIO, pagina)} → #${anc}  (esa sección ya no existe)`)
  }

  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = m[1].split('#')[0].split('?')[0]
    // Externos y protocolos raros no se comprueban acá.
    if (!href || /^(https?:|mailto:|data:|\/\/)/.test(href)) continue
    // La raíz del sitio publicado vive bajo /idilio-tv/, así que un href
    // absoluto se resuelve contra SITIO y no contra el disco.
    const destino = href.startsWith('/')
      ? join(SITIO, href.replace(/^\/idilio-tv/, ''))
      : resolve(dirname(pagina), href)
    const ok = await existe(destino) || await existe(join(destino, 'index.html'))
    if (!ok) fallos.push(`${relative(SITIO, pagina)} → ${href}`)
  }
}

// La puerta de entrada. El prototipo pinta sus enlaces con React, así que no
// están en el HTML: se buscan en el bundle, que es donde de verdad viven.
const bundle = (await Promise.all(
  (await readdir(join(SITIO, 'assets'))).filter((f) => f.endsWith('.js'))
    .map((f) => readFile(join(SITIO, 'assets', f), 'utf8')),
)).join('')

const faltan = IMPRESCINDIBLES.filter((r) => !bundle.includes(`./${r}`))

console.log(`${paginas.length} páginas revisadas`)
if (faltan.length) console.log(`✗ la puerta de entrada no ofrece: ${faltan.join(', ')}`)
else console.log(`✓ la puerta de entrada ofrece los ${IMPRESCINDIBLES.length} destinos del entregable`)
if (fallos.length) console.log(`✗ ${fallos.length} enlaces rotos:\n  ${fallos.slice(0, 20).join('\n  ')}`)
else console.log('✓ ningún enlace interno roto')

process.exit(fallos.length || faltan.length ? 1 : 0)
