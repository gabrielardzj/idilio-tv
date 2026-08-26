/**
 * Verifica las reglas de acreditación del Pase (R1 y R1b del diseño) contra el
 * prototipo corriendo.
 *
 * Va aparte de `recorrer.mjs` a propósito. Ese script evita el panel del
 * director porque saltar a un estado no prueba que se pueda llegar a él. Acá el
 * panel es la única vía: estas reglas hablan del paso del tiempo, y no hay
 * forma de esperar una noche dentro de una prueba.
 *
 * Lo que se prueba es la afirmación que el entregable publica en tres lugares:
 * "faltar una noche no cuesta nada — al volver hay dos esperando". El pase se
 * emite por reloj y se entrega al ver; si se entregara uno solo por visita,
 * faltar costaría el pase de esa noche, que es el "use it or lose it" de
 * Webtoon que esta mecánica existe para no repetir.
 *
 *   node scripts/acreditacion.mjs [url]
 */
import { chromium } from 'playwright-core'

const URL = process.argv[2] || 'http://localhost:5199/'
let fallos = 0

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 }, locale: 'es-MX' })
const page = await ctx.newPage()

const nota = async () => (await page.locator('.director .note').first().innerText()).replace(/\n/g, ' · ')
const pases = async () => (await nota()).match(/Pases (\S+)/)[1]
const racha = async () => (await nota()).match(/Racha (\d+)/)[1]
const btn = (t) => page.locator('.director button', { hasText: t }).first()

// Cada caso arranca del muro con el pase ya gastado (passes 0, racha 3, comodín 1),
// que es donde queda un usuario cualquiera al final de su noche.
const desdeCero = async (boton) => {
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  await btn('pase gastado').click()
  await page.waitForTimeout(200)
  const antes = await pases()
  await btn(boton).click()
  await page.waitForTimeout(250)
  return { antes, pases: await pases(), racha: await racha() }
}

const caso = (nombre, ok, detalle) => {
  console.log(`${ok ? '✓' : '✗'} ${nombre}  ${detalle}`)
  if (!ok) fallos++
}

const volvio = await desdeCero('Es mañana y volví')
caso('volvió anoche: entra un pase', volvio.pases === '1/2', `${volvio.antes} → ${volvio.pases}`)
caso('volvió anoche: la racha avanza', volvio.racha === '4', `racha ${volvio.racha}`)

const falto = await desdeCero('Falté una noche')
caso('faltó una noche: entran los dos pendientes', falto.pases === '2/2', `${falto.antes} → ${falto.pases}`)
caso('faltó una noche: el comodín cubre la racha', falto.racha === '4', `racha ${falto.racha}`)

// ── R5 · la escalera da la vuelta ────────────────────────────────────────
// Sin esto la racha se clavaba en 7: el bono de la noche 7 se pagaba TODAS las
// noches —525 monedas por semana donde el modelo dice 150— y el comodín, que se
// gana en la noche 3, no volvía nunca, aunque el muro promete otro.
await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
const cerrar = async () => {
  const c = page.locator('.sheet-close')
  if (await c.count()) { await c.first().click(); await page.waitForTimeout(150) }
}
await btn('Falté una noche').click()   // gasta el comodín ganado en la noche 3
await page.waitForTimeout(250)
await cerrar()

const comodines = async () => Number((await nota()).match(/comodines (\d+)/)[1])
const noche = async () => {
  await btn('Es mañana y volví').click()
  await page.waitForTimeout(200)
  await cerrar()
  return Number(await racha())
}

const vuelta = []
for (let i = 0; i < 8 && vuelta.at(-1) !== 1; i++) vuelta.push(await noche())
caso('la escalera vuelve a 1 después de la 7',
  vuelta.at(-1) === 1 && vuelta.at(-2) === 7, vuelta.join('→'))

// El punto de la comprobación: gastar el comodín YA en la vuelta nueva y ver que
// vuelve. Tiene que ser la noche 3 de la SEGUNDA vuelta — hacerlo sobre la primera
// pasa sin probar nada, porque ahí el comodín todavía es el original.
await btn('Falté una noche').click()
await page.waitForTimeout(250)
await cerrar()
caso('gastarlo en la vuelta nueva lo deja en cero', (await comodines()) === 0)
const hasta3 = []
for (let i = 0; i < 3 && hasta3.at(-1) !== 3; i++) hasta3.push(await noche())
caso('el comodín vuelve en la noche 3 de la vuelta nueva',
  hasta3.at(-1) === 3 && (await comodines()) === 1, `noches ${hasta3.join('→')}`)

// El saldo es la prueba dura de que la emisión no se disparó: ocho noches de
// escalera son 30+45+75 de la primera vuelta y 30+45 de la segunda.
const saldoFinal = Number((await nota()).match(/Saldo (\d+)/)[1])
caso('la emisión de monedas sigue la escalera, no el bono repetido', saldoFinal <= 250,
  `${saldoFinal} monedas tras ocho noches (con el bono clavado eran 525)`)

console.log(`\n${fallos === 0 ? '✓ LA ACREDITACIÓN CUMPLE LO QUE EL ENTREGABLE PROMETE' : `✗ ${fallos} REGLAS ROTAS`}`)

await browser.close()
process.exit(fallos ? 1 : 0)
