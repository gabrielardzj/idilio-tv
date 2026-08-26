/**
 * Recorre el prototipo como lo haría una persona y verifica que el viaje
 * completo funcione: home → serie nueva → ver los gratis → chocar con el muro.
 *
 * Existe porque saltar a un estado con el panel no prueba nada: prueba que el
 * estado existe, no que se pueda llegar a él.
 *
 *   node scripts/recorrer.mjs [url]
 */
import { chromium } from 'playwright-core'

const URL = process.argv[2] || 'http://localhost:5199/'
const pasos = []
let fallos = 0

const paso = (nombre, ok, detalle = '') => {
  pasos.push(`${ok ? '✓' : '✗'} ${nombre}${detalle ? `  ${detalle}` : ''}`)
  if (!ok) fallos++
}

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 1, locale: 'es-MX' })
const page = await ctx.newPage()

const estado = () => page.locator('.phone').getAttribute('data-state')
const panel = async () => (await page.locator('.director .note').first().innerText()).replace(/\n/g, ' · ')

await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(700)

paso('arranca en el home', (await estado()) === 'home')
paso('el home trae el catálogo real', (await page.locator('.poster').count()) >= 12,
  `${await page.locator('.poster').count()} pósters`)

// Una serie que NO empezó: el viaje de alguien nuevo en esa historia
const nuevas = page.locator('.riel', { hasText: 'Estrenos' }).locator('.poster')
const titulo = (await nuevas.first().locator('.poster-t').innerText()).trim()
await nuevas.first().click()
await page.waitForTimeout(500)
paso('entra a una serie sin empezar', (await estado()) === 'serie-detalle', `«${titulo}»`)

const abiertos = await page.locator('.ep.abierto, .ep.visto').count()
const cerrados = await page.locator('.ep.cerrado').count()
paso('la grilla separa gratis de bloqueados', abiertos > 0 && cerrados > 0,
  `${abiertos} abiertos · ${cerrados} bloqueados`)

await page.locator('.ep.abierto, .ep.visto').first().click()
await page.waitForTimeout(600)
paso('el primer episodio abre el player', (await estado()) === 'player-free')

// Ver hasta chocar. Cada toque avanza un episodio.
let toques = 0
while ((await estado()) === 'player-free' && toques < 25) {
  await page.locator('[aria-label^="Siguiente episodio"]').click()
  await page.waitForTimeout(90)
  toques++
}
paso('viendo se llega al muro', (await estado()).startsWith('wall'), `tras ${toques} episodios`)

const muro = await page.locator('.sheet').innerText()
paso('el muro abre con la historia, no con el precio',
  muro.indexOf('CONTINUARÁ') < muro.indexOf('monedas'))
paso('el muro ofrece la vía gratuita antes que la de pago',
  muro.includes('Pase de la Noche'))

// Volver atrás desde el player
await page.locator('.sheet-close').click()
await page.waitForTimeout(300)
await page.locator('[aria-label="Volver a la serie"]').click()
await page.waitForTimeout(500)
paso('el player vuelve a la ficha de la serie', (await estado()) === 'serie-detalle')

await page.locator('[aria-label="Volver"]').click()
await page.waitForTimeout(500)
paso('la ficha vuelve al home', (await estado()) === 'home')

paso('el saldo se lee en episodios',
  (await page.locator('.wallet').first().innerText()).includes('episodio'))

console.log(pasos.join('\n'))
console.log(`\n${fallos === 0 ? '✓ EL RECORRIDO COMPLETO FUNCIONA' : `✗ ${fallos} PASOS ROTOS`}`)
console.log(`estado final: ${await panel()}`)

await browser.close()
process.exit(fallos ? 1 : 0)
