/**
 * Verifica que cada cifra publicada en los documentos siga coincidiendo con el
 * código y con el censo del catálogo. Los documentos se editaron muchas veces:
 * esto es lo que impide que una cifra vieja sobreviva a una corrección.
 *
 *   npm run verificar
 */
import { EPISODE_COST, FREE_EPISODES, MAX_PASSES, PACKS, CATALOGO, STREAK,
         weeklyIssuance, toEpisodes, pricePerEpisode, LIVE_LADDER, SUBSCRIPTION,
         FUENTES_HOY, episodiosGratisPorSemanaHoy, monedasRachaSemana } from '../src/lib/economy.ts'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = dirname(dirname(dirname(fileURLToPath(import.meta.url))))

const CENSO = JSON.parse(readFileSync(join(RAIZ, 'docs/00-dogfooding/catalogo.json'), 'utf8'))
// El filtro es por `error` y nada más. Un `total > 0` acá descartaría en silencio
// las series que el scraper no supo parsear y emitió con `total: 0`: los agregados
// cuadrarían contra un CATALOGO igual de incompleto y el guardián firmaría «TODO
// CONSISTENTE» sobre un censo al que le faltan series. Una entrada rota no se
// descarta: se denuncia (ver `rotas`).
const cat = CENSO.filter(x => !x.error)
const con = cat.filter(x => x.bloqueados > 0)
const suma = (a, f) => a.reduce((s, x) => s + f(x), 0)
const mediana = a => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)] }

const check = (etiqueta, real, doc) => {
  const ok = String(real) === String(doc)
  console.log(`${ok ? '✓' : '✗'} ${etiqueta.padEnd(46)} código=${String(real).padEnd(10)} docs=${doc}`)
  return ok
}

let fallos = 0
/** Cuántas comprobaciones corrió este script. Se cuenta sola porque los
 *  documentos publican el número, y un número escrito a mano en un documento
 *  que describe a este mismo script es exactamente la cifra que se queda vieja:
 *  ya pasó con los conteos de pantallas y de flujos. */
let corridas = 0
const v = (...a) => { corridas++; if (!check(...a)) fallos++ }

console.log('── catálogo ───────────────────────────────────────────────────')

// Integridad del censo, antes de creerle a ningún agregado. Una entrada rota no
// es una serie menos: es un agujero. Ya pasó una vez —tres fichas devolvieron
// 200, no se pudieron parsear, salieron con `total: 0` y ninguna dio error—, y
// el censo publicó 43 series mientras el JSON tenía 46 entradas.
const rotas = CENSO.filter(x => x.error || !x.titulo || !(x.total > 0))
v('ninguna entrada rota (error · sin título · total 0)',
  rotas.length ? rotas.map(x => x.titulo || x.id).join(', ') : 'ninguna', 'ninguna')
v('entradas en catalogo.json', CENSO.length, CATALOGO.series)

v('series', cat.length, CATALOGO.series)
v('episodios totales', suma(cat, x => x.total), CATALOGO.episodios)
v('episodios gratis', suma(cat, x => x.gratis), CATALOGO.gratis)
v('episodios bloqueados', suma(cat, x => x.bloqueados), CATALOGO.bloqueados)

// Gratis + bloqueados da dos episodios menos que el total, y eso está explicado:
// dos series tienen huecos en la numeración. El scraper los registra uno por uno
// en `huecoDeNumeracion`, así que el descuadre tiene que cuadrar serie por serie
// y su suma tiene que ser exactamente la diferencia del catálogo. Antes ese −2
// aparecía sin explicación y no había forma de distinguirlo de un error.
v('todas las series traen huecoDeNumeracion', cat.every(x => Number.isInteger(x.huecoDeNumeracion)), true)
const descuadradas = cat.filter(x => x.total !== x.gratis + x.bloqueados + x.huecoDeNumeracion)
v('cada serie cuadra (total = gratis + bloq. + hueco)',
  descuadradas.length ? descuadradas.map(x => x.titulo).join(', ') : 'todas', 'todas')
v('los huecos explican el descuadre del catálogo', suma(cat, x => x.huecoDeNumeracion),
  CATALOGO.episodios - CATALOGO.gratis - CATALOGO.bloqueados)

v('gratis por serie (moda)', 10, FREE_EPISODES)
v('costo por episodio', 15, EPISODE_COST)
v('series sin excepción a las 15 monedas', con.every(x => x.costo === 15), true)
v('serie mediana en monedas', mediana(con.map(x => x.costoSerie)), 600)
// Por título exacto: el censo completo trae también «Pasión Frente a los
// Colmillos del Conde», y el startsWith('Pasión') que había acá se quedaba con
// esa —10 bloqueados, 150 monedas— y reportaba un desajuste que no existía.
const pasion = con.find(x => x.titulo === 'Pasión a Domicilio')
v('Pasión a Domicilio · bloqueados', pasion?.bloqueados, 44)
v('Pasión a Domicilio · costo', pasion?.costoSerie, 660)

console.log('\n── el colchón gratis ──────────────────────────────────────────')
v('sesiones sin pagar (500 / 14)', Math.round(CATALOGO.gratis / 14), 36)
// 35,7 sesiones a 2,3 por semana son 15,5 semanas. Los documentos publican las
// semanas cumplidas —«15 semanas, casi cuatro meses»—, así que acá se trunca.
v('semanas (a 2.3 sesiones)', Math.floor(CATALOGO.gratis / 14 / 2.3), 15)
v('gratis como % del catálogo', Math.round(CATALOGO.gratis / CATALOGO.episodios * 100) + '%', '22%')

console.log('\n── emisión semanal (tabla de docs/03) ─────────────────────────')
for (const [noches, eps, monedas] of [[2, 4, 60], [3, 8, 120], [5, 12, 180], [7, 17, 255]]) {
  const w = weeklyIssuance(noches)
  v(`${noches} noches → episodios`, w.episodeValue, eps)
  v(`${noches} noches → monedas emitidas`, w.coinValue, monedas)
}
v('tope de acumulación', MAX_PASSES, 2)
v('bonos de racha (3/5/7)', STREAK.filter(n => n.coins).map(n => n.coins).join('/'), '30/45/75')

console.log('\n── escalera de precios propuesta ──────────────────────────────')
for (const [id, eps, porEp] of [['intro', 12, 208], ['p1', 25, 540], ['p2', 50, 510], ['p3', 100, 499]]) {
  const p = PACKS.find(x => x.id === id)
  v(`${id} · episodios`, toEpisodes(p.coins), eps)
  v(`${id} · precio por episodio (COP)`, pricePerEpisode(p.coins, p.cop), porEp)
}
const escalera = PACKS.filter(p => !p.intro).map(p => pricePerEpisode(p.coins, p.cop))
v('la escalera baja en cada escalón', escalera.every((x, i) => i === 0 || x < escalera[i - 1]), true)
v('ningún paquete lleva precio tachado', PACKS.every(p => !('anchor' in p)), true)

console.log('\n── el defecto que le señalo al producto actual ────────────────')
const real = LIVE_LADDER.map(p => pricePerEpisode(p.coins, p.cop))
v('hoy · 180 monedas → precio por episodio', real[0], 208)
v('hoy · 375 monedas → precio por episodio', real[1], 540)
v('hoy · 725 monedas → precio por episodio', real[2], 531)
v('hoy · 1500 monedas → precio por episodio', real[3], 599)
v('mejora al subir de 375 a 725', ((1 - real[2] / real[1]) * 100).toFixed(1) + '%', '1.7%')
v('el escalón más caro es el peor por episodio', real[3] > real[2], true)
v('pase semanal (COP)', SUBSCRIPTION.semanal, 12500)
v('pase mensual (COP)', SUBSCRIPTION.mensual, 24500)

console.log('\n── las fuentes gratuitas que el producto ya tiene ─────────────')
v('monedas por anuncio', FUENTES_HOY.anuncio.monedas, 15)
v('tope diario de anuncios', FUENTES_HOY.anuncio.topeDiario, 10)
v('escalera de la racha diaria', FUENTES_HOY.diaria.escalera.join('·'), '15·40·60·50·40·45·200')
v('la racha diaria paga en una semana', monedasRachaSemana, 450)
v('la racha diaria en episodios por semana', toEpisodes(monedasRachaSemana), 30)
v('la escalera de la racha BAJA después del día 3',
  FUENTES_HOY.diaria.escalera[3] < FUENTES_HOY.diaria.escalera[2], true)
v('episodios gratis por semana solo en anuncios', episodiosGratisPorSemanaHoy, 70)
v('la fuente gratuita supera el consumo semanal', episodiosGratisPorSemanaHoy > 14 * 2.3, true)

console.log('\n── el texto de los documentos ─────────────────────────────────')

const DOCS = [
  'README.md', 'docs/00-dogfooding/README.md', 'docs/01-diagnostico/README.md',
  'docs/02-estrategia/README.md', 'docs/03-diseno/README.md', 'docs/03-diseno/sistema.md',
  // Los dos: `pen/` es el archivo vigente y `pencil/` la primera versión, que se
  // conserva a propósito. Vigilar solo uno deja al otro publicando cifras viejas.
  'docs/03-diseno/pen/README.md', 'docs/03-diseno/pencil/README.md',
  'docs/04-poc/README.md', 'web/README.md',
  // Estos dos ya no son páginas del sitio, pero se siguen vigilando: el benchmark
  // publicaba «428 episodios gratis repartidos en 43 títulos» y el guardián no lo
  // veía porque no lo estaba mirando. Dejar de publicar un documento no lo saca
  // del repo, y una cifra vieja ahí sigue siendo una cifra vieja.
  'docs/05-benchmark/README.md', 'docs/RECONCILIACION.md',
  // No solo los documentos: el HTML de la galería y el script que lo genera
  // también publican cifras, y ahí ya se me coló una vieja una vez.
  'mobbin-export/README.md', 'mobbin-export/index.html', 'poc/scripts/export-mobbin.mjs',
]

// Un documento publicado que nadie vigila es por donde se cuela la próxima cifra
// vieja. Si mañana se agrega una página al sitio y no a esta lista, esto avisa.
const PUBLICADOS = ['docs/01-diagnostico', 'docs/02-estrategia', 'docs/03-diseno',
  'docs/04-poc']
const sinVigilar = PUBLICADOS.filter(p => !DOCS.some(d => d.startsWith(p)))
if (sinVigilar.length) {
  console.log(`✗ documentos publicados fuera de la lista de vigilados: ${sinVigilar.join(', ')}`)
  fallos++
}

/** Cuántas pantallas y cuántos flujos tiene el export HOY. Se cuentan del
 *  manifiesto y no se escriben acá: el número vivía hardcodeado en el guardián,
 *  el export creció y el guardián siguió persiguiendo los conteos viejos
 *  mientras los documentos publicaban otro. El manifiesto lo borra y lo rehace
 *  el propio export, así que puede no estar: en ese caso se avisa y se saltea,
 *  que es preferible a caerse. */
const rutaManifiesto = join(RAIZ, 'mobbin-export/manifest.json')
const EXPORT = existsSync(rutaManifiesto)
  ? (m => ({ flujos: m.flows.length, pantallas: suma(m.flows, f => f.screens.length) }))(
      JSON.parse(readFileSync(rutaManifiesto, 'utf8')))
  : null
if (!EXPORT) console.log('· aviso: no hay mobbin-export/manifest.json — no se verifica el conteo de pantallas y flujos')
else console.log(`· el export tiene ${EXPORT.pantallas} pantallas en ${EXPORT.flujos} flujos`)

/** El archivo de diseño en Figma. No se puede contar desde acá —vive fuera del
 *  repo—, así que va declarado, en un solo lugar y con la fecha en que lo
 *  verifiqué contra el archivo: 26-ago-2026, vía el MCP de Figma sobre
 *  `CCI8plwuWvfTV8VBpowN5X`. Está acá y no repartido por los documentos porque
 *  «pantallas» significa dos cosas en este entregable, y sin los dos números a
 *  la vista el guardián no puede distinguir un conteo de otro. */
const DISENO = { pantallas: 10, componentes: 4 }

/** Exención de línea, para la prosa que cita una cifra vieja al explicarla.
 *
 *  Los documentos ya no narran sus propias correcciones, así que esto casi nunca
 *  dispara — y por eso mismo tiene que ser estrecho. Nada de `antes`: aparece en
 *  prosa corriente y eximiría líneas por accidente. Los tres términos que quedan
 *  no pueden caer por azar en una frase que además traiga una cifra vieja. */
const NARRA = /dec[ií]a|primera versión|primera medición/i

/** Exención de bloque, para lo que una regex de línea no puede ver.
 *
 *  Una tabla que compara «primera pasada / segunda pasada / real» tiene cifras
 *  viejas en sus celdas a propósito, y ninguna celda contiene la frase que lo
 *  explica: la explicación está en el encabezado, tres líneas más arriba.
 *
 *  Antes esto se resolvía metiendo el archivo entero en una lista de exentos, y
 *  eso es lo mismo que apagar el guardián para ese archivo: es exactamente la
 *  clase de exención total que dejó pasar el censo incompleto. Con un marcador
 *  se exime **la región**, no el documento, y hay que escribirlo a mano — no se
 *  activa porque una palabra apareció por casualidad. En Markdown no se ve. */
const ABRE_CITADA = /<!--\s*cifras-citadas\s*-->/
const CIERRA_CITADA = /<!--\s*\/cifras-citadas\s*-->/

/** Cifras que se corrigieron en el camino. Si reaparecen fuera de la nota que
 *  explica la corrección, es una cifra vieja que sobrevivió a una edición.
 *
 *  `patron` puede capturar un número: si la entrada trae `ok`, la línea solo
 *  falla cuando el número capturado no es el vigente. Así el conteo de pantallas
 *  y flujos no queda escrito dos veces, y cualquier conteo equivocado cae —no
 *  solo los dos o tres viejos que alguien se acordó de enumerar.
 *
 *  `salvo` tiene que ser ESTRECHO, y la prueba de que importa es cómo se cuela una
 *  cifra vieja: basta con eximir cualquier línea que diga "moda" o "excepción" para
 *  que un pie de galería con «12 episodios gratis por serie (la moda)» pase el
 *  guardián por contener esa palabra. Se exime la frase exacta que cita la cifra
 *  vieja a propósito, nada más. */
const OBSOLETOS = [
  ...(EXPORT ? [
    // El archivo de DISEÑO tiene su propio conteo, distinto al del export: son
    // dos cosas que se cuentan por separado. Las exenciones son literales —la
    // frase exacta con la que cada documento nombra al archivo de diseño— para
    // que ningún conteo del export se escape por parecerse.
    // `soloEn` y no más frases en `salvo`. En el entregable hay dos cosas que se
    // llaman «pantallas» y se cuentan distinto: las del export (22) y las del
    // archivo de diseño en Figma (10). Perseguirlas con una sola regex obliga a
    // ir sumando excepciones de redacción —«hoja de sistema», «archivo de
    // diseño», «y las»— y cada una es una rendija por donde el conteo del export
    // se escapa de verdad. Acotar la comprobación a los documentos que describen
    // el export es exacto y no depende de cómo esté escrita la frase.
    { patron: /(\d+) pantallas/,
      soloEn: [/^README\.md$/, /^docs\/04-poc\//, /^mobbin-export\//, /^poc\/scripts\/export-mobbin/],
      // Dos conteos válidos, no una excepción: el del export y el del archivo de
      // diseño. Verificar contra los dos es más estricto que eximir al segundo,
      // porque un «11 pantallas» sigue fallando contra ambos.
      ok: m => +m[1] === EXPORT.pantallas || +m[1] === DISENO.pantallas,
      porque: m => `hay ${EXPORT.pantallas} pantallas en el export y ${DISENO.pantallas} en el archivo de diseño; ${m[1]} no es ninguna` },
    { patron: /(\d+) flujos/,
      soloEn: [/^README\.md$/, /^docs\/04-poc\//, /^mobbin-export\//, /^poc\/scripts\/export-mobbin/],
      ok: m => +m[1] === EXPORT.flujos,
      porque: m => `el export tiene ${EXPORT.flujos} flujos, no ${m[1]}` },
  ] : []),
  { patron: /12 episodios gratis/, salvo: /Pasión a Domicilio|Las Flores del Amor/i, porque: 'la moda medida es 10' },
  { patron: /\$7\.29/, salvo: null, porque: 'la serie mediana cuesta $6.63' },
  { patron: /\$2\.49/, salvo: /hoy|producción|actual|paywall real/i, porque: 'la propuesta no lleva precio tachado' },

  // El censo del 26-ago-2026 reemplazó al que se publicó incompleto. Cada una de
  // estas cifras tiene sucesora en `.context/HOJA-DE-DATOS.md`.
  { patron: /\b43\b/, salvo: NARRA, porque: 'el censo tiene 50 series' },
  // Con y sin separador de miles: el número viejo también se escribió «1885».
  { patron: /\b1[.,]?885\b/, salvo: NARRA, porque: 'ahora son 2.230 episodios' },
  { patron: /\b428\b/, salvo: NARRA, porque: 'ahora son 500 episodios gratis' },
  { patron: /\b1[.,]?455\b/, salvo: NARRA, porque: 'ahora son 1.728 bloqueados' },
  { patron: /\b31 sesiones\b/, salvo: NARRA, porque: 'ahora son 36 sesiones sin pagar' },
  { patron: /\b13 semanas\b/, salvo: NARRA, porque: 'ahora son 15 semanas' },
  // El otro 23% de los documentos —el de las series que se vuelven a ver— es un
  // dato real y no se toca: acá solo cae el que mide el colchón.
  { patron: /23 ?% del catálogo/, salvo: NARRA, porque: 'los 500 gratis son el 22% del catálogo' },
  // «Tres Meses de Amor» es una serie del catálogo, no el colchón.
  { patron: /tres meses/i, salvo: /Tres Meses de Amor/i, porque: 'el colchón es de casi cuatro meses' },
  { patron: /\$ ?241\b/, salvo: NARRA, porque: 'el catálogo completo cuesta $286' },
  { patron: /\b35 series\b/, salvo: NARRA, porque: 'son 41 series con muro' },
  { patron: /\b8 (series )?(completamente|enteramente) gratis/i, salvo: NARRA, porque: 'son 9 series enteramente gratis' },
  { patron: /una de tres excepciones/i, salvo: NARRA, porque: 'son cuatro las excepciones a los 10 gratis' },

  // Miles con coma es notación inglesa. El sitio llegó a publicar «1,885
  // totales» en una página mientras el resto del entregable escribía «1.885».
  { patron: /(?<![\d.,])[0-9]{1,3},\d{3}(?![\d,])/, salvo: null, porque: 'miles con coma inglesa: acá se escriben con punto (2.230)' },
]

let eximidas = 0

for (const ruta of DOCS) {
  // Algunos de estos archivos son generados (la galería) y el export los borra
  // y rehace. Si el guardián se cae ahí, deja de guardar nada: reporta y sigue.
  if (!existsSync(join(RAIZ, ruta))) {
    console.log(`✗ ${ruta}: no existe — ¿el export quedó a medias?`)
    fallos++
    continue
  }
  const texto = readFileSync(join(RAIZ, ruta), 'utf8')

  // Qué líneas caen dentro de una región de cifras citadas. Se calcula una
  // sola vez por archivo, no una por patrón.
  const citada = new Set()
  let dentro = false
  texto.split('\n').forEach((linea, i) => {
    if (ABRE_CITADA.test(linea)) dentro = true
    if (dentro) citada.add(i)
    if (CIERRA_CITADA.test(linea)) dentro = false
  })
  if (dentro) {
    console.log(`✗ ${ruta}: una región <!-- cifras-citadas --> quedó sin cerrar`)
    fallos++
  }

  for (const { patron, salvo, porque, ok, soloEn } of OBSOLETOS) {
    if (soloEn && !soloEn.some((re) => re.test(ruta))) continue
    // matchAll y no test(): las entradas que capturan un número necesitan el
    // número, y una misma línea puede traer más de una cifra equivocada.
    const global = new RegExp(patron.source, patron.flags.includes('g') ? patron.flags : patron.flags + 'g')
    texto.split('\n').forEach((linea, i) => {
      if (salvo && salvo.test(linea)) return
      for (const m of linea.matchAll(global)) {
        if (ok && ok(m)) continue
        if (citada.has(i)) { eximidas++; continue }
        const motivo = typeof porque === 'function' ? porque(m) : porque
        console.log(`✗ ${ruta}: «${linea.trim().slice(0, 70)}…» → ${motivo}`)
        fallos++
      }
    })
  }
}
// Una exención silenciosa es una exención que nadie vuelve a mirar.
if (eximidas) console.log(`· ${eximidas} cifra(s) vieja(s) eximidas por estar en una región de cifras citadas`)
if (!fallos) console.log('✓ ninguna cifra obsoleta sobrevivió a las ediciones')

console.log('\n── contraste de los tokens de texto (WCAG AA, 4.5:1) ─────────')

/**
 * axe solo mide texto sobre fondos que sabe resolver, y buena parte de este
 * diseño va sobre degradados. Por eso el contraste se calcula acá contra las
 * superficies declaradas: es la única forma de que un token que no cumple no se
 * escape. Ya se escapó una vez.
 */
const canalLineal = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
const luminancia = (hex) => {
  const [r, g, b] = hex.replace('#', '').match(/\w\w/g).map((h) => parseInt(h, 16))
  return 0.2126 * canalLineal(r) + 0.7152 * canalLineal(g) + 0.0722 * canalLineal(b)
}
const contraste = (a, b) => {
  const [alta, baja] = [luminancia(a), luminancia(b)].sort((x, y) => y - x)
  return (alta + 0.05) / (baja + 0.05)
}

const leerVar = (css, nombre) => css.match(new RegExp(`--${nombre}:\\s*(#[0-9a-fA-F]{6})`))?.[1]

const cssPoc = readFileSync(join(RAIZ, 'poc/src/styles.css'), 'utf8')
const cssWeb = readFileSync(join(RAIZ, 'web/app/globals.css'), 'utf8')

const PARES = [
  ['prototipo · tx-hi',  leerVar(cssPoc, 'tx-hi'),  ['#130C1B', '#0B0710', '#1C1327']],
  ['prototipo · tx-mid', leerVar(cssPoc, 'tx-mid'), ['#130C1B', '#0B0710', '#1C1327']],
  ['prototipo · tx-lo',  leerVar(cssPoc, 'tx-lo'),  ['#130C1B', '#0B0710', '#1C1327']],
  ['stack · ink',        leerVar(cssWeb, 'color-ink'),     ['#0a0a0a', '#141414', '#1a1a1a']],
  ['stack · ink-mid',    leerVar(cssWeb, 'color-ink-mid'), ['#0a0a0a', '#141414', '#1a1a1a']],
  ['stack · ink-low',    leerVar(cssWeb, 'color-ink-low'), ['#0a0a0a', '#141414', '#1a1a1a']],
]

for (const [etiqueta, color, fondos] of PARES) {
  if (!color) { console.log(`✗ ${etiqueta}: token no encontrado en el CSS`); fallos++; continue }
  const peor = Math.min(...fondos.map((bg) => contraste(color, bg)))
  const ok = peor >= 4.5
  if (!ok) fallos++
  console.log(`${ok ? '✓' : '✗'} ${etiqueta.padEnd(22)} ${color}  peor=${peor.toFixed(2)}:1`)
}

// Encabezados que anuncian un número y listas que traen otro. Es el defecto que
// más veces reapareció en las revisiones —«ocho decisiones» sobre nueve bloques,
// «dos lecturas» sobre tres ítems—, y es exactamente el que el entregable le
// señala al producto. Contarlo del documento es la única forma de que no vuelva.
console.log('\n── encabezados que anuncian un número ─────────────────────────')
const PALABRAS = { seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12 }
const enPalabras = (n) => Object.keys(PALABRAS).find((p) => PALABRAS[p] === n) ?? String(n)

const intervencion = readFileSync(join(RAIZ, 'docs/03-diseno/README.md'), 'utf8')
// `D[0-9]` y no `D`: si no, «### Dónde el precedente sí sostiene la apuesta»
// entra en el conteo y el guardián persigue un desajuste que no existe.
const decisiones = (intervencion.match(/^### D[0-9]/gm) || []).length
for (const ruta of ['README.md', 'docs/03-diseno/README.md']) {
  const texto = readFileSync(join(RAIZ, ruta), 'utf8')
  const dicho = texto.match(/(\w+) decisiones de diseño/)?.[1]
  if (!dicho) continue
  v(`${ruta} · decisiones de diseño`, enPalabras(decisiones), dicho)
}

// El propio conteo, verificado contra lo que publica docs/04-poc. Sin esto, el
// documento que describe a este script es el único lugar del entregable donde
// una cifra puede envejecer sin que nadie se entere — porque el guardián no se
// estaba mirando a sí mismo.
console.log(`\n── el guardián se cuenta a sí mismo ───────────────────────────`)
const rutaPoc = join(RAIZ, 'docs/04-poc/README.md')
const publicado = Number(readFileSync(rutaPoc, 'utf8').match(/corre (\d+) comprobaciones/)?.[1])
if (!Number.isInteger(publicado)) {
  console.log('✗ docs/04-poc/README.md ya no dice «corre N comprobaciones» — el guardián no puede verificarse')
  fallos++
} else {
  v('comprobaciones que corre este script', corridas + 1, publicado)
}

console.log(fallos === 0 ? '\n✓ TODO CONSISTENTE' : `\n✗ ${fallos} DESAJUSTES`)
process.exit(fallos ? 1 : 0)
