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

console.log(`\n${fallos === 0 ? '✓ LA ACREDITACIÓN CUMPLE LO QUE EL ENTREGABLE PROMETE' : `✗ ${fallos} REGLAS ROTAS`}`)

await browser.close()
process.exit(fallos ? 1 : 0)
