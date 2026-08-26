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

// ── El teclado, que axe no prueba ────────────────────────────────────────
// Las hojas se declaran role="dialog" y no se comportaban como una: al abrirlas
// el foco se quedaba donde estuviera —fuera de la hoja, en el contenido que el
// scrim tapa— y Escape no cerraba nada. Ninguna regla automática lo marca: axe
// mira el marcado, no lo que pasa al pulsar Tab.
//
// De las tres cosas que se comprueban abajo, dos cambiaron con el arreglo: que
// el foco entre y que Escape cierre. La tercera —que no se salga tabulando— ya
// se cumplía sola: desactivando la contención a propósito, el foco sigue
// ciclando dentro. Se comprueba igual, porque es la propiedad que se quiere
// sostener, pero no la produce el manejador.
const donde = () => page.evaluate(() => {
  const a = document.activeElement
  if (!a || a === document.body) return 'body'
  return a.closest('.sheet') ? 'hoja' : a.closest('.phone') ? 'telefono' : 'panel'
})

for (const [nombre, boton] of [['muro', '2 · El muro'], ['tienda', '7 · Tienda'], ['celebración', '4 · Desbloqueo']]) {
  await page.goto(SITIO, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.locator('.director button', { hasText: boton }).first().click()
  await page.waitForTimeout(450)
  const antes = await page.locator('.phone').getAttribute('data-state')

  const entra = (await donde()) === 'hoja'

  // Hay que tabular MÁS veces que elementos tiene la hoja: con un número fijo
  // —diez— esta comprobación pasaba incluso desactivando la contención entera,
  // porque el muro tiene once y nunca se llegaba al final. Una prueba que no
  // llega al borde no prueba el borde.
  const cuantos = await page.locator('.phone .sheet button:visible, .phone .sheet a[href]:visible').count()
  const trazo = []
  for (let i = 0; i < cuantos + 3; i++) {
    await page.keyboard.press('Tab')
    await page.waitForTimeout(45)
    trazo.push(await donde())
  }
  const contenido = trazo.every((x) => x === 'hoja')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(350)
  const cierra = (await page.locator('.phone').getAttribute('data-state')) !== antes

  const fallos = [!entra && 'el foco no entra', !contenido && `tras ${trazo.findIndex((x) => x !== 'hoja') + 1} de ${trazo.length} tabs el foco se va a ${[...new Set(trazo)].filter((x) => x !== 'hoja').join(', ')}`, !cierra && 'Escape no cierra'].filter(Boolean)
  total += fallos.length
  console.log(`${fallos.length ? '✗' : '✓'} teclado · ${nombre.padEnd(11)} ${fallos.length ? fallos.join(' · ') : 'entra, se queda dentro y Escape cierra'}`)
}

// ── La versión sobre el stack real, si está levantada ────────────────────
// No va en CI: allí el sitio se arma como export estático bajo /idilio-tv/, y
// servirlo en la raíz rompería las rutas de sus recursos, así que la auditoría
// mediría fallos del andamiaje y no del producto. Con `npm run start` en
// web/ —o apuntando al sitio publicado— sí se audita:
//
//   node scripts/verificar-a11y.mjs http://localhost:5199/ http://localhost:5301/
const STACK = process.argv[3]
if (STACK) {
  const rutas = [
    ['stack · muro pase listo', 'serie/pasion-a-domicilio/13', null],
    ['stack · celebración', 'serie/pasion-a-domicilio/13', /Usar (el|un) pase/i],
    ['stack · muro con saldo', 'serie/la-enfermera-infiltrada/13', null],
    ['stack · índice', '', null],
  ]
  for (const [nombre, ruta, accion] of rutas) {
    const r0 = await page.goto(new URL(ruta, STACK).href, { waitUntil: 'networkidle' }).catch(() => null)
    if (!r0?.ok()) { console.log(`· ${nombre} SALTADO — ${STACK} no responde`); continue }
    await page.waitForTimeout(600)
    if (accion) { await page.locator('button', { hasText: accion }).first().click(); await page.waitForTimeout(700) }
    await page.addScriptTag({ content: AXE })
    const r = await page.evaluate(async () => await window.axe.run(document.querySelector('main'), {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    }))
    total += r.violations.length
    console.log(`${r.violations.length ? '✗' : '✓'} ${nombre.padEnd(24)} ${r.passes.length} reglas` +
      r.violations.map((v) => `\n      ${v.id} · ${v.help}`).join(''))
  }

  // La celebración de la web tenía el mismo defecto que las hojas del
  // prototipo: al abrirse dejaba el foco en el body.
  await page.goto(new URL('serie/pasion-a-domicilio/13', STACK).href, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  await page.locator('button', { hasText: /Usar (el|un) pase/i }).first().click()
  await page.waitForTimeout(700)
  const dentro = await page.evaluate(() => !!document.activeElement?.closest('[aria-label="Episodio desbloqueado"]'))
  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  const cerrada = (await page.locator('[aria-label="Episodio desbloqueado"]').count()) === 0
  const mal = [!dentro && 'el foco no entra', !cerrada && 'Escape no cierra'].filter(Boolean)
  total += mal.length
  console.log(`${mal.length ? '✗' : '✓'} teclado · stack           ${mal.length ? mal.join(' · ') : 'el foco entra en la celebración y Escape cierra'}`)
}

console.log(`\n${total === 0 ? '✓ NINGÚN ESTADO TIENE VIOLACIONES WCAG A/AA' : `✗ ${total} VIOLACIONES`}`)

await browser.close()
process.exit(total ? 1 : 0)
