/**
 * Export tipo Mobbin.
 * Recorre el POC estado por estado, captura cada pantalla en 3x y emite
 * un manifiesto con la taxonomía (flujo · pantalla · patrones · elementos),
 * más una galería navegable.
 *
 *   node scripts/export-mobbin.mjs [baseUrl] [outDir]
 */
import { chromium } from 'playwright-core'
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = process.argv[2] || 'http://localhost:5199/'
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const OUT = process.argv[3] || join(ROOT, '..', 'mobbin-export')

const APP = {
  app: 'Idilio TV',
  release: 'Continuará · Pase de la Noche (propuesta)',
  platform: 'iOS · vertical · una mano',
  captured: '2026-08-25',
  device: 'iPhone 14 Pro · 390×844 @3x',
  theme: 'Dark',
  language: 'es-419',
}

async function click(page, text) {
  await page.locator(`button:has-text("${text}")`).first().click()
  await page.waitForTimeout(700)
}
async function dismissIfAccount(page) {
  const b = page.locator('button:has-text("Ahora no")')
  if (await b.count()) { await b.first().click(); await page.waitForTimeout(500) }
}

/** Cada shot: cómo llegar + qué es. `do` recibe la página. */
const FLOWS = [
  {
    id: 'f1-pase-de-la-noche',
    name: 'Desbloqueo con el Pase de la Noche',
    intent: 'El invitado llega al muro sin monedas y sale con el episodio abierto, una racha más larga y un comodín.',
    screens: [
      {
        id: '01-player-libre', name: 'Player · episodio gratis',
        type: 'Media player', patterns: ['Vertical video', 'Progress indicator', 'Currency balance'],
        elements: ['Video', 'Top bar', 'Wallet chip', 'Action rail', 'Progress bar', 'Scrubber'],
        note: 'El saldo nunca viaja solo: el chip lleva siempre la traducción a episodios. Es la única huella permanente del metajuego dentro del core loop.',
        act: async (p) => { await click(p, '1 · Episodio gratis') },
      },
      {
        id: '02-muro-pase-listo', name: 'Muro · el Pase está listo',
        type: 'Paywall', patterns: ['Bottom sheet', 'Reward claim', 'Streak', 'Progress indicator', 'Cliffhanger'],
        elements: ['Bottom sheet', 'Headline', 'Progress bar', 'Reward card', 'Primary button', 'Text button', 'Streak strip'],
        note: 'Orden deliberado: la historia, dónde estoy, lo gratis, lo pago, la racha. Un muro que abre con precios enseña que el sistema es una tienda.',
        act: async (p) => { await click(p, '2 · El muro · un pase') },
      },
      {
        id: '03-eleccion-de-pase', name: 'Elegir a qué serie va el pase',
        type: 'Selection', patterns: ['Single select', 'Scarcity', 'Cross-content discovery'],
        elements: ['Bottom sheet', 'Radio list', 'Thumbnail', 'Progress label', 'Primary button'],
        note: 'El corazón pedagógico: obligar a elegir con un recurso escaso enseña la economía por uso, no por explicación.',
        act: async (p) => { await click(p, 'Usar el pase en este episodio') },
      },
      {
        id: '04-desbloqueo-celebracion', name: 'Desbloqueado · la racha avanza',
        type: 'Confirmation', patterns: ['Reward reveal', 'Streak advance', 'Milestone unlock'],
        elements: ['Bottom sheet', 'Medal', 'Reward lines', 'Streak strip', 'Primary button'],
        note: 'La recompensa se entrega en el mismo gesto que resuelve la necesidad. La noche 3 dispara el comodín.',
        act: async (p) => { await click(p, 'Usar el pase aquí') },
      },
      {
        id: '05-player-desbloqueado', name: 'Player · episodio 13 abierto',
        type: 'Media player', patterns: ['Vertical video', 'Progress indicator'],
        elements: ['Video', 'Wallet chip', 'Progress bar'],
        note: 'El regreso al loop es inmediato: un toque desde la celebración, sin pantallas intermedias.',
        act: async (p) => { await click(p, 'Ver el episodio'); await p.waitForTimeout(900); await dismissIfAccount(p) },
      },
    ],
  },
  {
    id: 'f2-la-cita',
    name: 'El pase ya se usó · la cita de mañana',
    intent: 'El muro deja de ser un final y pasa a ser una hora. El countdown es el motivo del próximo regreso.',
    screens: [
      {
        id: '01-muro-pase-gastado', name: 'Muro · faltan horas para el próximo pase',
        type: 'Paywall', patterns: ['Countdown', 'Appointment', 'Streak', 'Bottom sheet'],
        elements: ['Bottom sheet', 'Countdown timer', 'Secondary card', 'Primary button', 'Streak strip'],
        note: 'El countdown ocupa el lugar jerárquico que antes tenía el precio. La compra queda debajo, como atajo, no como única salida.',
        act: async (p) => { await click(p, '5 · El muro') },
      },
      {
        id: '02-muro-con-saldo', name: 'Muro · con saldo suficiente',
        type: 'Paywall', patterns: ['Balance spend', 'Countdown', 'Streak'],
        elements: ['Bottom sheet', 'Countdown timer', 'Primary button', 'Balance caption'],
        note: 'Con saldo, la acción de pago sube a primaria — pero el saldo restante se declara en episodios, no en monedas.',
        act: async (p) => { await click(p, '6 · El muro') },
      },
    ],
  },
  {
    id: 'f3-tienda',
    name: 'Conseguir monedas',
    intent: 'La tienda deja de vender monedas y pasa a vender episodios.',
    screens: [
      {
        id: '01-tienda', name: 'Tienda · el precio en episodios',
        type: 'Store', patterns: ['IAP packs', 'Value ladder', 'Unit-of-value translation'],
        elements: ['Bottom sheet', 'Pack list', 'Badge', 'Price', 'Anchor price'],
        note: 'Jerarquía invertida: EPISODIOS grande, monedas como subtítulo, precio a la derecha. Y la escalera sube de verdad — hoy $1.99 y $3.99 rinden casi lo mismo por dólar.',
        act: async (p) => { await click(p, '7 · Tienda') },
      },
    ],
  },
  {
    id: 'f4-comodin',
    name: 'Faltar noches · el perdón del sistema',
    intent: 'Un usuario de 2.3 días por semana no puede sostener 7 de 7. Tres estados de perdón: el comodín que absorbe la falta, la racha que se corta sin drama, y los pases que se acumulan para que faltar no cueste nada.',
    screens: [
      {
        id: '01-comodin-usado', name: 'El comodín te cubrió',
        type: 'Paywall', patterns: ['Streak protection', 'Forgiveness mechanic'],
        elements: ['Bottom sheet', 'Streak strip', 'Status row', 'Reward card'],
        note: 'Se consume solo. No hay nada que reclamar ni que comprar: si hay que hacer algo para no perder la racha, la racha ya es una tarea.',
        act: async (p) => {
          await click(p, '2 · El muro · un pase')
          await click(p, 'Usar el pase en este episodio')
          await click(p, 'Usar el pase aquí')
          await click(p, 'Ver el episodio')
          await dismissIfAccount(p)
          await click(p, 'Falté una noche')
        },
      },
      {
        id: '02-racha-rota', name: 'Se cortó la racha',
        type: 'Paywall', patterns: ['Streak reset', 'Non-punitive feedback'],
        elements: ['Bottom sheet', 'Notice', 'Streak strip', 'Reward card'],
        note: 'Sin rojo, sin alarma, sin oferta para "recuperar tu racha" por monedas. Se explica qué pasó, se dice cuándo vuelve el comodín, y el pase sigue estando ahí. Monetizar la culpa habría sido fácil y habría enseñado que el sistema es adversario.',
        act: async (p) => { await click(p, '10 · Racha rota') },
      },
      {
        id: '03-dos-pases', name: 'Dos pases acumulados · el tope',
        type: 'Paywall', patterns: ['Resource cap', 'Anti-FOMO'],
        elements: ['Bottom sheet', 'Reward card', 'Primary button', 'Streak strip'],
        note: 'Los pases se guardan hasta dos. Es la respuesta directa a la crítica que hundió al Daily Pass de Webtoon: un pase que se pierde es una obligación disfrazada de regalo. Con tope 2 faltar una noche no cuesta nada, y volver seguido sigue rindiendo más.',
        act: async (p) => { await click(p, '2b · El muro') },
      },
    ],
  },
  {
    id: 'f5-cuenta',
    name: 'Guardar la racha · de invitado a cuenta',
    intent: '88% consume como invitado. La cuenta se pide una sola vez y solo cuando ya hay algo que perder.',
    screens: [
      {
        id: '01-guardar-racha', name: 'Tienes algo que guardar',
        type: 'Sign up', patterns: ['Contextual auth', 'Loss aversion', 'Guest-first'],
        elements: ['Bottom sheet', 'Stat tiles', 'Primary button', 'Text button', 'Fine print'],
        note: 'No hay muro de registro. El argumento no es "crea tu cuenta" sino "no pierdas estas 4 noches y estas 75 monedas".',
        act: async (p) => { await click(p, '8 · Guardar la racha') },
      },
    ],
  },
  {
    id: 'f6-mi-economia',
    name: 'Mi economía',
    intent: 'Objetivo de experiencia: que el usuario entienda fuentes, sumideros y su posición. Se abre desde el chip de saldo, dentro del player.',
    screens: [
      {
        id: '01-mi-economia', name: 'De dónde salen mis monedas',
        type: 'Account / Wallet', patterns: ['Ledger', 'Source-sink model', 'Streak'],
        elements: ['Bottom sheet', 'Balance headline', 'Streak strip', 'Breakdown list', 'Total row'],
        note: 'La única superficie que explica la economía completa, y se llega a ella con un toque desde el player — no desde una pestaña.',
        act: async (p) => { await click(p, '9 · Mi economía') },
      },
    ],
  },
]

const run = async () => {
  await rm(OUT, { recursive: true, force: true })

  const browser = await chromium.launch()
  const manifest = { ...APP, flows: [] }
  let total = 0

  for (const flow of FLOWS) {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 1000 },
      deviceScaleFactor: 3,
      reducedMotion: 'reduce',
      colorScheme: 'dark',
      locale: 'es-MX',
    })
    const page = await ctx.newPage()
    await page.goto(BASE, { waitUntil: 'networkidle' })
    await page.waitForTimeout(900)

    const dir = join(OUT, 'flows', flow.id)
    await mkdir(dir, { recursive: true })

    const screens = []
    for (const s of flow.screens) {
      await s.act(page)
      const file = `${s.id}.png`
      await page.locator('.phone').screenshot({ path: join(dir, file) })
      const stateKey = await page.locator('.phone').getAttribute('data-state')
      screens.push({
        id: s.id, name: s.name, screenType: s.type,
        patterns: s.patterns, elements: s.elements, note: s.note,
        stateKey, image: `flows/${flow.id}/${file}`,
      })
      total++
      process.stdout.write(`  · ${flow.id}/${s.id}  [${stateKey}]\n`)
    }
    manifest.flows.push({ id: flow.id, name: flow.name, intent: flow.intent, screens })
    await ctx.close()
  }

  await browser.close()

  manifest.summary = {
    flows: manifest.flows.length,
    screens: total,
    screenTypes: [...new Set(manifest.flows.flatMap(f => f.screens.map(s => s.screenType)))].sort(),
    patterns: [...new Set(manifest.flows.flatMap(f => f.screens.flatMap(s => s.patterns)))].sort(),
    elements: [...new Set(manifest.flows.flatMap(f => f.screens.flatMap(s => s.elements)))].sort(),
  }

  await writeFile(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2))
  await writeFile(join(OUT, 'index.html'), gallery(manifest))
  await writeFile(join(OUT, 'README.md'), readme(manifest))
  console.log(`\n${total} pantallas · ${manifest.flows.length} flujos → ${OUT}`)
}

const gallery = (m) => `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${m.app} · ${m.release} — export de flujos</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--bg:#08060D;--tx:#F2EBF7;--mid:#B7A9C4;--lo:#7C6E8B;--v:#A855F7;--c:#3FE0D0}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--tx);font-family:Outfit,system-ui,sans-serif;-webkit-font-smoothing:antialiased;
background-image:radial-gradient(900px 500px at 20% -5%,#1B0C2E,transparent 60%)}
.wrap{max-width:1180px;margin:0 auto;padding:56px 28px 100px}
header{border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:32px;margin-bottom:48px}
h1{font-size:36px;font-weight:800;letter-spacing:-1.2px;line-height:1.1}
.sub{color:var(--mid);font-size:15px;margin-top:10px;line-height:1.6;max-width:66ch}
.meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}
.tag{font-size:11.5px;font-weight:600;padding:5px 11px;border-radius:99px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);color:var(--mid)}
.flow{margin-bottom:72px}
.flow h2{font-size:22px;font-weight:700;letter-spacing:-.5px;display:flex;align-items:center;gap:11px}
.flow h2 i{font-style:normal;font-size:11px;font-weight:700;letter-spacing:1px;color:var(--v);background:rgba(168,85,247,.14);border:1px solid rgba(168,85,247,.3);padding:4px 9px;border-radius:99px;white-space:nowrap}
.flow .intent{color:var(--mid);font-size:14.5px;margin:12px 0 28px;line-height:1.65;max-width:70ch}
.row{display:flex;gap:24px;overflow-x:auto;padding-bottom:16px;scroll-snap-type:x mandatory}
.row::-webkit-scrollbar{height:8px}.row::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:99px}
.card{flex:0 0 292px;scroll-snap-align:start}
.card img{width:100%;border-radius:26px;border:1px solid rgba(255,255,255,.1);display:block;background:#000}
.card h3{font-size:14.5px;font-weight:700;margin:15px 0 4px;letter-spacing:-.2px}
.card .type{font-size:11px;font-weight:700;letter-spacing:.9px;text-transform:uppercase;color:var(--c);margin-top:16px}
.card .note{font-size:12.5px;color:var(--mid);line-height:1.6;margin:10px 0}
.chips{display:flex;gap:5px;flex-wrap:wrap;margin-top:9px}
.chip{font-size:10.5px;font-weight:600;padding:3px 8px;border-radius:6px;background:rgba(168,85,247,.11);border:1px solid rgba(168,85,247,.22);color:#D3B6F5}
.chip.el{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.09);color:var(--lo)}
.tax{margin-top:64px;padding-top:40px;border-top:1px solid rgba(255,255,255,.08)}
.tax h2{font-size:19px;margin-bottom:22px;font-weight:700}
.taxgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:28px}
.taxgrid h4{font-size:11px;letter-spacing:1.1px;text-transform:uppercase;color:var(--lo);margin-bottom:11px;font-weight:700}
.taxgrid>div{line-height:2.2}
footer{margin-top:56px;color:var(--lo);font-size:12.5px;line-height:1.75}
code{color:var(--c);font-size:11.5px}
</style></head><body><div class="wrap">
<header>
<h1>${m.app} · ${m.release}</h1>
<p class="sub">Export de flujos del POC funcional. ${m.summary.screens} pantallas en ${m.summary.flows} flujos, capturadas del prototipo — no son mockups.</p>
<div class="meta">
<span class="tag">${m.platform}</span><span class="tag">${m.device}</span>
<span class="tag">${m.theme}</span><span class="tag">${m.language}</span><span class="tag">${m.captured}</span>
</div>
</header>
${m.flows.map((f, i) => `<section class="flow">
<h2><i>Flujo ${i + 1}</i> ${f.name}</h2>
<p class="intent">${f.intent}</p>
<div class="row">${f.screens.map(s => `<article class="card">
<img src="${s.image}" alt="${s.name}" loading="lazy">
<div class="type">${s.screenType}</div>
<h3>${s.name}</h3>
<p class="note">${s.note}</p>
<div class="chips">${s.patterns.map(p => `<span class="chip">${p}</span>`).join('')}</div>
<div class="chips">${s.elements.map(e => `<span class="chip el">${e}</span>`).join('')}</div>
</article>`).join('')}</div></section>`).join('')}
<section class="tax"><h2>Taxonomía</h2><div class="taxgrid">
<div><h4>Tipos de pantalla</h4>${m.summary.screenTypes.map(t => `<span class="chip">${t}</span> `).join('')}</div>
<div><h4>Patrones</h4>${m.summary.patterns.map(t => `<span class="chip">${t}</span> `).join('')}</div>
<div><h4>Elementos</h4>${m.summary.elements.map(t => `<span class="chip el">${t}</span> `).join('')}</div>
</div></section>
<footer>Capturado automáticamente del POC con <code>poc/scripts/export-mobbin.mjs</code>.<br>
Datos económicos verificados en el producto en producción: 1 episodio = 15 monedas · 12 episodios gratis por serie · 56 episodios en <i>Pasión a Domicilio</i>.</footer>
</div></body></html>`

const readme = (m) => `# Export de flujos · ${m.app}
### ${m.release}

${m.summary.screens} pantallas · ${m.summary.flows} flujos · ${m.device} · ${m.captured}

Abre \`index.html\` para la galería navegable. \`manifest.json\` tiene la taxonomía completa
en formato consumible (flujo → pantalla → tipo · patrones · elementos · estado interno del POC).

Regenerar: \`cd poc && npm run export\` (con el dev server arriba).

${m.flows.map((f, i) => `## Flujo ${i + 1} · ${f.name}

${f.intent}

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
${f.screens.map((s, j) => `| ${j + 1} | [${s.name}](${s.image}) | ${s.screenType} | ${s.patterns.join(', ')} |`).join('\n')}

${f.screens.map(s => `**${s.name}** — ${s.note}`).join('\n\n')}
`).join('\n')}
## Taxonomía

**Tipos de pantalla:** ${m.summary.screenTypes.join(' · ')}

**Patrones:** ${m.summary.patterns.join(' · ')}

**Elementos:** ${m.summary.elements.join(' · ')}
`

run().catch((e) => { console.error(e); process.exit(1) })
