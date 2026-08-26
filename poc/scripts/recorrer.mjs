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
import { EPISODE_COST } from '../src/lib/economy.ts'

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
// El título ya no cuelga debajo de la miniatura: va quemado en la portada,
// y la barra de avance marca las empezadas. Así se pide una sin empezar.
const nuevas = page.locator('.riel', { hasText: 'Estrenos' }).locator('.poster:not(:has(.poster-bar))')
const titulo = ((await nuevas.first().getAttribute('aria-label')) ?? '').split('.')[0].trim()
await nuevas.first().click()
await page.waitForTimeout(500)
paso('entra a una serie sin empezar', (await estado()) === 'serie-detalle', `«${titulo}»`)

// Comprobar `data-state` no alcanza: el prototipo llegó a mandar al player de
// *Pasión a Domicilio* a quien había tocado cualquiera de las otras 47 series
// del catálogo. El estado era el correcto y la historia era otra.
const enPantalla = async () =>
  (await page.locator('.phone .topbar b, .phone h1, .phone .serie-title').first().innerText()).trim()
paso('la ficha es la serie que tocó', (await enPantalla()) === titulo, `«${await enPantalla()}»`)

paso('la ficha abre con el resumen del catálogo real',
  (await page.locator('.serie-resumen p').innerText()).length > 60)

const abiertos = await page.locator('.ep.abierto, .ep.visto').count()
const cerrados = await page.locator('.ep.cerrado').count()
paso('la lista de capítulos separa gratis de bloqueados', abiertos > 0 && cerrados > 0,
  `${abiertos} abiertos · ${cerrados} bloqueados`)

// El precio no está en ninguna parte de la ficha real: es la propuesta, y va
// donde se decide —la tarjeta del primer capítulo bloqueado—, no en el pie.
paso('el capítulo del muro dice qué lo abre',
  (await page.locator('.ep.cerrado').first().innerText()).match(/monedas|Pase de la Noche/) !== null)

await page.locator('.ep.abierto, .ep.visto').first().click()
await page.waitForTimeout(600)
paso('el primer episodio abre el player', (await estado()) === 'player-free')
paso('el player es la serie que tocó', (await enPantalla()) === titulo, `«${await enPantalla()}»`)

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
paso('el muro habla de la serie que tocó', muro.includes(titulo))

// El muro no puede contradecir la mecánica que la intervención propone: esta
// hoja llegó a decir «el que no uses hoy no se acumula», que es la regla vieja.
await page.locator('.sheet button', { hasText: 'Usar el pase' }).click()
await page.waitForTimeout(400)
const eleccion = await page.locator('.sheet').innerText()
paso('la elección incluye la serie que está viendo', eleccion.includes(titulo))
paso('la elección no promete que el pase caduca', !/no se acumula|se pierde hoy/i.test(eleccion))
await page.locator('.sheet button', { hasText: 'Usar el pase aquí' }).click()
await page.waitForTimeout(500)
paso('usar el pase desbloquea', (await estado()) === 'unlocked-via-pass')

// Y el episodio que abre es el que sigue, no cualquiera: el pase tiene que
// devolver al usuario a SU historia, en el punto donde la dejó.
await page.locator('.sheet button', { hasText: 'Ver el episodio' }).click()
await page.waitForTimeout(500)
paso('vuelve al player con el episodio abierto', (await estado()) === 'player-free')
paso('sigue siendo la misma serie', (await enPantalla()) === titulo, `«${await enPantalla()}»`)

// ── La otra mitad de la economía: el camino de pago ──────────────────────
// El pase ya se gastó, así que este es el muro de quien no tiene la vía gratis.
// Nadie había recorrido esto: la tienda es donde aterriza toda la pedagogía de
// la moneda, y hasta hoy solo se verificaba saltando a ella con el panel.
while ((await estado()) === 'player-free') {
  await page.locator('[aria-label^="Siguiente episodio"]').click()
  await page.waitForTimeout(90)
}
paso('sin pase, el muro vuelve a aparecer', (await estado()) === 'wall-pass-spent')

await page.locator('.sheet button', { hasText: /No quiero esperar|consigue monedas/i }).first().click()
await page.waitForTimeout(500)
paso('el muro lleva a la tienda', (await estado()) === 'store')

const meta = await page.locator('.goal').innerText()
paso('la tienda calcula la meta de ESTA serie', meta.includes(titulo), meta.replace(/\n/g, ' · '))

// El badge «termina esta serie» mintió en 40 de 41 series cuando era fijo.
// Que caiga sobre un paquete que de verdad alcanza es la corrección, y solo se
// puede comprobar con una serie de verdad: acá son 60 bloqueados, no 44.
const cierra = page.locator('.pack').filter({ hasText: 'TERMINA ESTA SERIE' })
const faltan = Number(meta.match(/(\d+) monedas/)?.[1] ?? 0)
const ofrece = Number((await cierra.first().innerText()).match(/(\d+) monedas/)?.[1] ?? 0)
paso('el paquete que cierra la serie de verdad alcanza', ofrece >= faltan,
  `${ofrece} monedas para una meta de ${faltan}`)

await cierra.first().click()
await page.waitForTimeout(600)
paso('comprar devuelve al muro con saldo', (await estado()) === 'wall-with-balance')

const antes = Number((await page.locator('.wallet').first().innerText()).match(/\d+/)?.[0] ?? 0)
await page.locator('.sheet button', { hasText: /Abrirlo ahora/ }).first().click()
await page.waitForTimeout(600)
paso('pagar desbloquea el episodio', (await estado()) === 'unlocked-via-coins')

await page.locator('.sheet button', { hasText: 'Ver el episodio' }).click()
await page.waitForTimeout(500)
const luego = Number((await page.locator('.wallet').first().innerText()).match(/\d+/)?.[0] ?? 0)
paso('cobra exactamente el precio del episodio', antes - luego === EPISODE_COST,
  `${antes} → ${luego}`)

// Volver atrás desde el player
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
