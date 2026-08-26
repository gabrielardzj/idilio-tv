/**
 * Publica los entregables de texto como páginas del sitio.
 *
 * El brief pide «un solo link con los cuatro entregables». Dos de esos cuatro
 * —el diagnóstico y la estrategia— son texto, y estaban solo como markdown en
 * el repo: para leerlos había que navegar GitHub. Esto los pone en el mismo
 * sitio que el prototipo, con la misma tipografía y los mismos tokens.
 *
 *   node scripts/publicar-docs.mjs <destino>
 */
import { marked } from 'marked'
import { mkdir, readFile, writeFile, cp } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = dirname(dirname(dirname(fileURLToPath(import.meta.url))))
const OUT = process.argv[2] || join(RAIZ, '_site', 'docs')

const PAGINAS = [
  { slug: 'diagnostico', src: 'docs/01-diagnostico/README.md', titulo: 'Diagnóstico', n: '1', peso: '35% de la evaluación' },
  { slug: 'estrategia', src: 'docs/02-estrategia/README.md', titulo: 'Estrategia', n: '2', peso: 'con el diagnóstico' },
  { slug: 'intervencion', src: 'docs/03-diseno/README.md', titulo: 'La intervención', n: '3', peso: '20% craft' },
  { slug: 'sistema', src: 'docs/03-diseno/sistema.md', titulo: 'Sistema visual', n: '3b', peso: '' },
  { slug: 'diseno', src: 'docs/03-diseno/pencil/README.md', titulo: 'Archivo de diseño', n: '3c', peso: '' },
  { slug: 'poc', src: 'docs/04-poc/README.md', titulo: 'El POC', n: '4', peso: '25%' },
  { slug: 'dogfooding', src: 'docs/00-dogfooding/README.md', titulo: 'Dogfooding y censo', n: '0', peso: 'anexo' },
  { slug: 'benchmark', src: 'docs/05-benchmark/README.md', titulo: 'Benchmark competitivo', n: '5', peso: 'anexo' },
  { slug: 'reconciliacion', src: 'docs/RECONCILIACION.md', titulo: 'Las dos versiones', n: '·', peso: 'anexo' },
]

/** Reescribe los enlaces del repo a los del sitio publicado. */
function reescribirEnlaces(html, desdeSrc) {
  const mapa = Object.fromEntries(PAGINAS.map((p) => [p.src, `./${p.slug}.html`]))
  return html.replace(/href="([^"]+)"/g, (todo, href) => {
    if (/^(https?:|mailto:|#)/.test(href)) return todo
    const [ruta, ancla = ''] = href.split('#')
    // resuelve la ruta relativa contra la ubicación del documento origen
    const partes = dirname(desdeSrc).split('/')
    for (const seg of ruta.split('/')) {
      if (seg === '..') partes.pop()
      else if (seg && seg !== '.') partes.push(seg)
    }
    let abs = partes.join('/')
    if (!abs.endsWith('.md') && !abs.includes('.')) abs = `${abs}/README.md`
    if (mapa[abs]) return `href="${mapa[abs]}${ancla ? '#' + ancla : ''}"`
    // lo que no es una página publicada apunta al repo
    return `href="https://github.com/gabrielardzj/idilio-tv/blob/main/${abs}"`
  })
}

/**
 * Los títulos llevan el mismo id que les pone GitHub. Los documentos se citan entre
 * ellos por sección —«ver §5.7»— y sin id ningún enlace con ancla aterriza en ningún
 * lado: el navegador se queda arriba de la página.
 */
function anclasEnTitulos(html) {
  const vistos = new Map()
  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (_, nivel, contenido) => {
    const base = contenido
      .replace(/<[^>]+>/g, '')
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      .toLowerCase().trim()
      .replace(/[^\p{L}\p{N}\s_-]/gu, '')
      .replace(/ /g, '-')
    const n = vistos.get(base) ?? 0
    vistos.set(base, n + 1)
    const id = n ? `${base}-${n}` : base
    return `<h${nivel} id="${id}">${contenido}</h${nivel}>`
  })
}

/** Las imágenes de los documentos se copian al sitio y se reapuntan. */
function reescribirImagenes(html, desdeSrc, activos) {
  return html.replace(/src="([^"]+)"/g, (todo, src) => {
    if (/^(https?:|data:)/.test(src)) return todo
    const partes = dirname(desdeSrc).split('/')
    for (const seg of src.split('/')) {
      if (seg === '..') partes.pop()
      else if (seg && seg !== '.') partes.push(seg)
    }
    const abs = partes.join('/')
    const destino = `activos/${abs.replace(/\//g, '__')}`
    activos.add([abs, destino])
    return `src="./${destino}" loading="lazy"`
  })
}

/** Cada imagen se puede abrir a tamaño completo: a 268 px no se juzga el craft. */
function imagenesAmpliables(html) {
  return html.replace(/<img src="\.\/(activos\/[^"]+)"([^>]*)>/g,
    (_, ruta, resto) => `<a class="zoom" href="./${ruta}" target="_blank" rel="noopener"><img src="./${ruta}"${resto}></a>`)
}

const nav = (activo) => PAGINAS.map((p) =>
  `<a class="${p.slug === activo ? 'on' : ''}" href="./${p.slug}.html"><b>${p.n}</b> ${p.titulo}</a>`).join('')

/**
 * Mermaid, con la paleta del sitio. Solo lo cargan las páginas que tienen diagrama.
 * Si el import falla —sin red, o un CSP que bloquee el CDN— el catch deja el bloque
 * como está: el código fuente, que es lo que se ve hoy. Nunca se queda vacío.
 */
const scriptMermaid = `<script type="module">
try {
  const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')
  mermaid.initialize({
    startOnLoad: false,
    suppressErrorRendering: true,
    theme: 'base',
    fontFamily: 'Outfit, system-ui, sans-serif',
    state: { useMaxWidth: true },
    flowchart: { useMaxWidth: true },
    themeVariables: {
      darkMode: true, background: '#120C1A', fontSize: '14px',
      primaryColor: '#1E1430', primaryTextColor: '#F2EBF7', primaryBorderColor: '#A855F7',
      secondaryColor: '#181022', tertiaryColor: '#120C1A',
      lineColor: '#8F8896', textColor: '#B7A9C4',
      mainBkg: '#1E1430', nodeBorder: '#A855F7', nodeTextColor: '#F2EBF7',
      stateBkg: '#1E1430', stateLabelColor: '#F2EBF7', labelColor: '#F2EBF7',
      transitionColor: '#8F8896', transitionLabelColor: '#B7A9C4',
      labelBackgroundColor: '#120C1A', edgeLabelBackground: '#120C1A',
      compositeBackground: '#0F0A17', compositeTitleBackground: '#120C1A', compositeBorder: '#2A1E3C',
      altBackground: '#0F0A17', clusterBkg: '#0F0A17', clusterBorder: '#2A1E3C',
      specialStateColor: '#A855F7', innerEndBackground: '#A855F7',
      noteBkgColor: '#1E1430', noteTextColor: '#F2EBF7', noteBorderColor: '#3FE0D0',
    },
  })
  await mermaid.run({ querySelector: 'pre.mermaid' })
} catch (e) {
  console.warn('mermaid no cargó; queda el código fuente del diagrama', e)
}
</` + `script>`

const plantilla = (p, cuerpo) => `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${p.titulo} · Idilio TV — Continuará</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--bg:#08060D;--s1:#120C1A;--tx:#F2EBF7;--mid:#B7A9C4;--lo:#8F8896;--v:#A855F7;--c:#3FE0D0;--g:#FFC53D}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--tx);font-family:Outfit,system-ui,sans-serif;-webkit-font-smoothing:antialiased;
line-height:1.65;background-image:radial-gradient(900px 480px at 15% -8%,#1B0C2E,transparent 62%)}
.shell{display:grid;grid-template-columns:250px minmax(0,1fr);gap:56px;max-width:1180px;margin:0 auto;padding:48px 28px 120px}
@media(max-width:900px){.shell{grid-template-columns:1fr;gap:28px;padding:32px 20px 80px}}
nav{position:sticky;top:32px;align-self:start}
@media(max-width:900px){nav{position:static}}
nav .marca{font-size:13px;font-weight:800;letter-spacing:-.3px;margin-bottom:4px}
nav .sub{font-size:11.5px;color:var(--lo);margin-bottom:22px;line-height:1.5}
nav a{display:flex;gap:9px;align-items:baseline;padding:7px 11px;border-radius:9px;color:var(--mid);
text-decoration:none;font-size:13.5px;transition:.15s}
nav a b{color:var(--lo);font-size:11px;min-width:14px}
nav a:hover{background:rgba(168,85,247,.12);color:var(--tx)}
nav a.on{background:rgba(168,85,247,.18);color:var(--tx);font-weight:600}
nav a.on b{color:var(--v)}
nav .volver{margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08);font-size:12.5px}
nav .volver a{padding:6px 11px}
main{min-width:0;font-size:15.5px}
main>.kicker{font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--lo);margin-bottom:10px}
h1{font-size:38px;font-weight:800;letter-spacing:-1.3px;line-height:1.1;margin:0 0 24px}
h2{font-size:24px;font-weight:700;letter-spacing:-.6px;margin:52px 0 16px;padding-top:20px;border-top:1px solid rgba(255,255,255,.08)}
h3{font-size:18px;font-weight:700;letter-spacing:-.3px;margin:34px 0 12px;color:#E6D9F5}
h4{font-size:15px;font-weight:700;margin:22px 0 8px}
p{margin:0 0 16px;color:var(--mid)}
strong{color:var(--tx);font-weight:700}
ul,ol{margin:0 0 18px 22px;color:var(--mid)}
li{margin-bottom:7px}
a{color:#C9A6F5}
blockquote{margin:0 0 20px;padding:14px 20px;border-left:3px solid var(--v);background:rgba(168,85,247,.08);border-radius:0 10px 10px 0}
blockquote p{margin:0;color:var(--tx)}
blockquote p+p{margin-top:10px}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.86em;background:rgba(63,224,208,.1);
color:var(--c);padding:2px 6px;border-radius:5px}
pre{background:var(--s1);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:18px 20px;overflow-x:auto;margin:0 0 20px}
pre code{background:none;color:var(--mid);padding:0;font-size:12.5px;line-height:1.6}
table{width:100%;border-collapse:collapse;margin:0 0 22px;font-size:14px}
th{text-align:left;font-weight:700;color:var(--tx);padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.14);vertical-align:bottom}
td{padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.06);color:var(--mid);vertical-align:top}
tr:last-child td{border-bottom:none}
img{max-width:100%;height:auto;border-radius:14px;border:1px solid rgba(255,255,255,.1);display:block}
/* En las tablas de pantallas, 150px no alcanza para juzgar nada. */
td img{max-width:268px;transition:transform .18s cubic-bezier(.22,1,.36,1),border-color .18s}
td a:hover img{transform:scale(1.02);border-color:rgba(168,85,247,.5)}
td:has(img){width:284px;padding-right:22px}
a.zoom{display:block;text-decoration:none}
a.zoom::after{content:'ampliar ↗';display:block;font-size:10.5px;color:var(--lo);margin-top:7px;letter-spacing:.3px}
hr{border:none;border-top:1px solid rgba(255,255,255,.08);margin:40px 0}
/* El diagrama. Sin JS —o si el CDN de mermaid no carga— queda el código fuente,
   legible; con JS, mermaid reemplaza el contenido por el SVG y manda :has(svg). */
pre.mermaid{background:var(--s1);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:18px 20px;
overflow-x:auto;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:var(--lo);
line-height:1.6;margin:0 0 20px;white-space:pre}
pre.mermaid:has(svg){padding:24px 16px;white-space:normal;text-align:center;line-height:1.4}
pre.mermaid svg{display:block;margin:0 auto;max-width:100%;height:auto}
pre.mermaid svg .edgeLabel,pre.mermaid svg .label{font-family:Outfit,system-ui,sans-serif}
/* En una columna de 330 px el diagrama entra al 21% y no se lee nada.
   Ahí conviene que conserve tamaño y se desplace en horizontal. */
@media(max-width:760px){pre.mermaid:has(svg) svg{width:700px;max-width:none}}
</style></head><body>
<div class="shell">
<nav>
<div class="marca">Continuará · Idilio TV</div>
<div class="sub">El Pase de la Noche — reto de diseño</div>
${nav(p.slug)}
<div class="volver">
<a href="../">← El prototipo</a>
<a href="../flujos/">← Los flujos</a>
<a href="https://github.com/gabrielardzj/idilio-tv">← El repositorio</a>
</div>
</nav>
<main>
<p class="kicker">Entregable ${p.n}${p.peso ? ` · ${p.peso}` : ''}</p>
${cuerpo}
</main>
</div>${cuerpo.includes('<pre class="mermaid">') ? `\n${scriptMermaid}` : ''}
</body></html>`

await mkdir(join(OUT, 'activos'), { recursive: true })
const activos = new Set()

for (const p of PAGINAS) {
  const md = await readFile(join(RAIZ, p.src), 'utf8')
  let html = marked.parse(md, { mangle: false, headerIds: false })
  // los bloques mermaid se dibujan en la página; el fuente queda adentro como respaldo
  html = html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
    (_, cod) => `<pre class="mermaid">${cod}</pre>`)
  html = anclasEnTitulos(html)
  html = reescribirEnlaces(html, p.src)
  html = reescribirImagenes(html, p.src, activos)
  html = imagenesAmpliables(html)
  await writeFile(join(OUT, `${p.slug}.html`), plantilla(p, html))
  process.stdout.write(`  · ${p.slug}.html\n`)
}

for (const [origen, destino] of activos) {
  const src = join(RAIZ, origen)
  if (existsSync(src)) await cp(src, join(OUT, destino))
}

console.log(`\n${PAGINAS.length} páginas · ${activos.size} imágenes → ${OUT}`)
