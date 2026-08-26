/**
 * Verifica que cada cifra publicada en los documentos siga coincidiendo con el
 * código y con el censo del catálogo. Los documentos se editaron muchas veces:
 * esto es lo que impide que una cifra vieja sobreviva a una corrección.
 *
 *   npm run verificar
 */
import { EPISODE_COST, FREE_EPISODES, MAX_PASSES, PACKS, CATALOGO, STREAK,
         weeklyIssuance, toEpisodes, pricePerEpisode, coinsPerDollar } from '../src/lib/economy.ts'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = dirname(dirname(dirname(fileURLToPath(import.meta.url))))

const cat = JSON.parse(readFileSync(join(RAIZ, 'docs/00-dogfooding/catalogo.json'), 'utf8'))
  .filter(x => !x.error && x.total > 0)
const con = cat.filter(x => x.bloqueados > 0)
const suma = (a, f) => a.reduce((s, x) => s + f(x), 0)
const mediana = a => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)] }

const check = (etiqueta, real, doc) => {
  const ok = String(real) === String(doc)
  console.log(`${ok ? '✓' : '✗'} ${etiqueta.padEnd(46)} código=${String(real).padEnd(10)} docs=${doc}`)
  return ok
}

let fallos = 0
const v = (...a) => { if (!check(...a)) fallos++ }

console.log('── catálogo ───────────────────────────────────────────────────')
v('series', cat.length, CATALOGO.series)
v('episodios totales', suma(cat, x => x.total), CATALOGO.episodios)
v('episodios gratis', suma(cat, x => x.gratis), CATALOGO.gratis)
v('episodios bloqueados', suma(cat, x => x.bloqueados), CATALOGO.bloqueados)
v('gratis por serie (moda)', 10, FREE_EPISODES)
v('costo por episodio', 15, EPISODE_COST)
v('series sin excepción a las 15 monedas', con.every(x => x.costo === 15), true)
v('serie mediana en monedas', mediana(con.map(x => x.costoSerie)), 600)
v('Pasión a Domicilio · bloqueados', con.find(x => x.titulo.startsWith('Pasión')).bloqueados, 44)
v('Pasión a Domicilio · costo', con.find(x => x.titulo.startsWith('Pasión')).costoSerie, 660)

console.log('\n── el colchón gratis ──────────────────────────────────────────')
v('sesiones sin pagar (428 / 14)', Math.round(CATALOGO.gratis / 14), 31)
v('semanas (a 2.3 sesiones)', Math.round(CATALOGO.gratis / 14 / 2.3), 13)
v('gratis como % del catálogo', Math.round(CATALOGO.gratis / CATALOGO.episodios * 100) + '%', '23%')

console.log('\n── emisión semanal (tabla de docs/03) ─────────────────────────')
for (const [noches, eps, monedas] of [[2, 4, 60], [3, 8, 120], [5, 12, 180], [7, 17, 255]]) {
  const w = weeklyIssuance(noches)
  v(`${noches} noches → episodios`, w.episodeValue, eps)
  v(`${noches} noches → monedas emitidas`, w.coinValue, monedas)
}
v('tope de acumulación', MAX_PASSES, 2)
v('bonos de racha (3/5/7)', STREAK.filter(n => n.coins).map(n => n.coins).join('/'), '30/45/75')

console.log('\n── escalera de precios propuesta ──────────────────────────────')
for (const [id, eps, porEp] of [['intro', 12, '0.08'], ['p1', 13, '0.15'], ['p2', 44, '0.11'], ['p3', 100, '0.10']]) {
  const p = PACKS.find(x => x.id === id)
  v(`${id} · episodios`, toEpisodes(p.coins), eps)
  v(`${id} · precio por episodio`, pricePerEpisode(p.coins, p.usd), porEp)
}
const escalera = PACKS.filter(p => !p.intro).map(p => +pricePerEpisode(p.coins, p.usd))
v('la escalera baja en cada escalón', escalera.every((x, i) => i === 0 || x < escalera[i - 1]), true)
v('ningún paquete lleva precio tachado', PACKS.every(p => !('anchor' in p)), true)

console.log('\n── el defecto que le señalo al producto actual ────────────────')
v('hoy $1.99 → monedas por dólar', coinsPerDollar(180, 1.99), 90)
v('hoy $3.99 → monedas por dólar', coinsPerDollar(375, 3.99), 94)
v('mejora al subir de escalón', ((94 / 90.5 - 1) * 100).toFixed(1) + '%', '3.9%')

console.log('\n── el texto de los documentos ─────────────────────────────────')

const DOCS = [
  'README.md', 'docs/00-dogfooding/README.md', 'docs/01-diagnostico/README.md',
  'docs/02-estrategia/README.md', 'docs/03-diseno/README.md', 'docs/03-diseno/sistema.md',
  'docs/03-diseno/pencil/README.md', 'docs/04-poc/README.md', 'web/README.md',
  // No solo los documentos: el HTML de la galería y el script que lo genera
  // también publican cifras, y ahí ya se me coló una vieja una vez.
  'mobbin-export/README.md', 'mobbin-export/index.html', 'poc/scripts/export-mobbin.mjs',
]

/** Cifras que se corrigieron en el camino. Si reaparecen fuera de la nota que
 *  explica la corrección, es una cifra vieja que sobrevivió a una edición.
 *
 *  `salvo` tiene que ser ESTRECHO. La primera versión permitía cualquier línea
 *  que dijera "moda" o "excepción", y una cifra vieja se coló por ahí: el pie de
 *  la galería decía «12 episodios gratis por serie (la moda)» y el guardián la
 *  dejó pasar porque contenía la palabra "moda". Se exime la narración de la
 *  corrección —que siempre dice "decía" o "primera versión"—, nada más. */
const OBSOLETOS = [
  { patron: /\b6 flujos\b/, salvo: null, porque: 'ahora son 7 flujos' },
  { patron: /\b(11|13) pantallas\b/, salvo: null, porque: 'ahora son 16 pantallas' },
  { patron: /12 episodios gratis/, salvo: /dec[ií]a|primera versión/i, porque: 'la moda medida es 10' },
  { patron: /\$7\.29/, salvo: null, porque: 'la serie mediana cuesta $6.63' },
  { patron: /\$2\.49/, salvo: /hoy|producción|actual|paywall real|primera versión/i, porque: 'la propuesta no lleva precio tachado' },
]

/** El registro de dogfooding documenta el producto TAL COMO ESTÁ HOY.
 *  Ahí las cifras del paywall actual no son obsoletas: son la evidencia. */
const SIN_REVISAR = new Set(['docs/00-dogfooding/README.md'])

for (const ruta of DOCS) {
  if (SIN_REVISAR.has(ruta)) continue
  const texto = readFileSync(join(RAIZ, ruta), 'utf8')
  for (const { patron, salvo, porque } of OBSOLETOS) {
    for (const linea of texto.split('\n')) {
      if (!patron.test(linea)) continue
      if (salvo && salvo.test(linea)) continue
      console.log(`✗ ${ruta}: «${linea.trim().slice(0, 70)}…» → ${porque}`)
      fallos++
    }
  }
}
if (!fallos) console.log('✓ ninguna cifra obsoleta sobrevivió a las ediciones')

console.log(fallos === 0 ? '\n✓ TODO CONSISTENTE' : `\n✗ ${fallos} DESAJUSTES`)
process.exit(fallos ? 1 : 0)
