/**
 * Audita la accesibilidad de CADA estado del prototipo, no solo del que se ve
 * al cargar.
 *
 * Existe porque auditar por URL no alcanza: el muro, la elección, la tienda y
 * el resto viven detrás de una interacción, así que un axe apuntado a la página
 * solo ve el home. Ahí se escondía un `aria-label` sobre un `div` sin rol —un
 * atributo prohibido, impacto serio— en el punto de cada noche de la tira de la
 * racha. Los lectores de pantalla lo ignoran, así que el elemento central de la
 * intervención no se anunciaba, y estaba en 7 de los 11 estados.
 *
 * Es el mismo hueco que dejó pasar el fallo de contraste de `--tx-lo`: la regla
 * existía, pero nadie la aplicaba donde el defecto vivía.
 *
 *   node scripts/verificar-a11y.mjs [url]
 */
import { chromium } from 'playwright-core'
import { readFile } from 'node:fs/promises'

const SITIO = process.argv[2] || 'http://localhost:5199/'
const AXE = await readFile(new URL('../node_modules/axe-core/axe.min.js', import.meta.url), 'utf8')

/** Cada estado con el botón del panel que lleva a él. El panel es la única vía
 *  para algunos —la racha rota necesita haber faltado una noche— y acá sí vale:
 *  lo que se audita es la pantalla, no el camino. */
const ESTADOS = [
  ['home', null],
  ['muro · pase listo', '2 · El muro'],
  ['muro · tope', '2b · El muro'],
  ['elección de serie', '3 · ¿A cuál serie'],
  ['desbloqueo', '4 · Desbloqueo'],
  ['muro · la cita', '5 · El muro'],
  ['muro · con saldo', '6 · El muro'],
  ['tienda', '7 · Tienda'],
  ['guardar la racha', '8 · Guardar'],
  ['mi economía', '9 · Mi economía'],
  ['racha rota', '10 · Racha rota'],
]

const browser = await chromium.launch()
const page = await (await browser.newContext({ viewport: { width: 1280, height: 1000 }, locale: 'es-MX' })).newPage()

let total = 0
for (const [nombre, boton] of ESTADOS) {
  await page.goto(SITIO, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  if (boton) {
    await page.locator('.director button', { hasText: boton }).first().click()
    await page.waitForTimeout(400)
  }
  await page.addScriptTag({ content: AXE })
  // Solo el teléfono: el panel del director es andamiaje de la presentación,
  // no producto, y auditarlo mezclaría defectos de dos cosas distintas.
  const r = await page.evaluate(async () => await window.axe.run(document.querySelector('.phone'), {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
  }))
  total += r.violations.length
  const detalle = r.violations
    .map((v) => `${v.id} · ${v.help} · ${v.nodes.map((n) => n.html.slice(0, 70)).join(' ; ')}`)
    .join('\n      ')
  console.log(`${r.violations.length ? '✗' : '✓'} ${nombre.padEnd(20)} ${r.passes.length} reglas${detalle ? `\n      ${detalle}` : ''}`)
}

console.log(`\n${total === 0 ? '✓ NINGÚN ESTADO TIENE VIOLACIONES WCAG A/AA' : `✗ ${total} VIOLACIONES`}`)

await browser.close()
process.exit(total ? 1 : 0)
