/**
 * Censo del catálogo real de idilio.tv.
 *
 * Para cada serie: total de episodios, primer episodio bloqueado (= episodios
 * gratis) y costo de desbloqueo en monedas. Todo sale del HTML renderizado en
 * servidor del reproductor web público; no toca ninguna API privada.
 *
 *   node scrape-catalogo.mjs > catalogo.json
 *
 * ── Tres cosas que la primera versión hacía mal, y por qué importan ─────────
 *
 * 1 · **De dónde salen las series.** Antes se raspaban los enlaces del home, y
 *     el home son rieles curados: no es el catálogo. Ahora la lista sale de
 *     `sitemap.xml`, que es lo que el propio sitio declara como su catálogo
 *     completo. La diferencia no era cosmética: el home dejaba fuera series.
 *
 * 2 · **De dónde sale el total de episodios.** Antes era `max(nº de episodio)`
 *     visto en la lista. Si la numeración tiene huecos —y los tiene— el total
 *     queda mal y deja de cuadrar con gratis + bloqueados. Ahora se lee el
 *     contador que la propia ficha publica ("N episodios"), y `max` queda solo
 *     como control cruzado.
 *
 * 3 · **Qué pasa cuando una ficha no se puede leer.** Antes devolvía
 *     `total: 0` y esa serie se sumaba como un cero: tres series reales
 *     desaparecieron del censo sin una sola línea de aviso, y los agregados
 *     publicados salieron de ahí. Ahora cada ficha se reintenta, y si igual no
 *     se puede leer el script **termina con error** en vez de emitir un censo
 *     incompleto que parece completo. Un censo que se cae es recuperable; uno
 *     que miente por omisión, no.
 */
const SITIO = 'https://www.idilio.tv'
const REINTENTOS = 3

/**
 * `minimo` es el largo por debajo del cual una respuesta se considera cortada.
 * Next puede truncar el stream: una ficha sin <h1> casi nunca es una ficha sin
 * título, es una ficha a medias, y reintentar sale más barato que perder la
 * serie. El sitemap es legítimamente chico, así que va sin mínimo.
 */
const get = async (url, minimo = 0) => {
  let ultimo
  for (let i = 0; i < REINTENTOS; i++) {
    try {
      const r = await fetch(url, { headers: { 'accept-language': 'es-419,es' } })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const txt = await r.text()
      if (txt.length < minimo) throw new Error(`respuesta corta (${txt.length} B)`)
      return txt
    } catch (e) {
      ultimo = e
      await new Promise((r) => setTimeout(r, 400 * (i + 1)))
    }
  }
  throw new Error(`${ultimo.message} · ${url}`)
}

/** El catálogo que el sitio declara, no el que muestra en los rieles del home. */
const ids = async () => {
  const xml = await get(`${SITIO}/sitemap.xml`)
  const delSitemap = [...new Set([...xml.matchAll(/\/show\/([0-9a-f-]{36})/g)].map((m) => m[1]))]
  if (!delSitemap.length) throw new Error('el sitemap no listó ninguna serie')

  // El home a veces estrena antes de que el sitemap se regenere. Unir los dos
  // no puede restar series, solo sumarlas.
  const html = await get(`${SITIO}/`)
  const delHome = [...new Set([...html.matchAll(/\/serie\/([0-9a-f-]{36})/g)].map((m) => m[1]))]
  const soloEnHome = delHome.filter((id) => !delSitemap.includes(id))
  if (soloEnHome.length) process.stderr.write(`  + ${soloEnHome.length} serie(s) en el home que el sitemap todavía no lista\n`)

  return [...delSitemap, ...soloEnHome]
}

/** Una ficha completa pesa >90 KB. Por debajo de esto, vino cortada. */
const FICHA_MINIMA = 20_000

const serie = async (id) => {
  const html = await get(`${SITIO}/serie/${id}`, FICHA_MINIMA)

  const titulo = html.match(/<h1[^>]*>([^<]{2,120})<\/h1>/)?.[1]?.trim()
  if (!titulo) throw new Error(`sin <h1> · /serie/${id}`)

  // El contador que publica la propia ficha. Es la única fuente que no depende
  // de que la numeración de episodios sea contigua.
  const declarado = Number(html.match(/children\\":\[(\d+),\\" episodios/)?.[1])
  if (!Number.isInteger(declarado) || declarado <= 0) throw new Error(`sin contador de episodios · ${titulo}`)

  const bloqueados = [...new Set([...html.matchAll(/Episodio (\d+), bloqueado/g)].map((m) => +m[1]))].sort((a, b) => a - b)
  const listados = [...new Set([...html.matchAll(/Episodio (\d+)"/g)].map((m) => +m[1]))].sort((a, b) => a - b)
  const maxNumerado = Math.max(0, ...listados, ...bloqueados)

  let costo = null
  if (bloqueados.length) {
    const ep = await get(`${SITIO}/serie/${id}/${bloqueados[0]}`, FICHA_MINIMA)
    // Next inserta comentarios de hidratación entre el texto y el número
    const raw = ep.replace(/<!--[\s\S]*?-->/g, '')
    costo = Number(raw.match(/con\s*(\d+)\s*monedas/)?.[1] ?? null) || null
    if (!costo) throw new Error(`serie con muro y sin precio legible · ${titulo}`)
  }

  const gratis = bloqueados.length ? bloqueados[0] - 1 : declarado

  return {
    id,
    titulo,
    total: declarado,
    gratis,
    bloqueados: bloqueados.length,
    costo,
    costoSerie: costo && bloqueados.length ? costo * bloqueados.length : null,
    // Control cruzado, no dato de producto: si `total` no cuadra con
    // gratis + bloqueados, la numeración de esa serie tiene huecos. Queda
    // registrado para que nadie tenga que redescubrirlo sumando a mano.
    huecoDeNumeracion: declarado !== gratis + bloqueados.length ? declarado - (gratis + bloqueados.length) : 0,
    maxNumerado,
  }
}

const todas = await ids()
process.stderr.write(`${todas.length} series\n`)

const out = []
const fallos = []
for (let i = 0; i < todas.length; i += 6) {
  const lote = await Promise.all(
    todas.slice(i, i + 6).map((id) => serie(id).catch((e) => ({ id, error: String(e.message ?? e) }))),
  )
  for (const s of lote) (s.error ? fallos : out).push(s)
  process.stderr.write(`  ${out.length + fallos.length}/${todas.length}\n`)
}

// La regla que faltaba: un censo incompleto no se publica. Si una sola ficha no
// se pudo leer después de tres intentos, esto se cae y no escribe nada — porque
// la alternativa ya pasó una vez, y los agregados publicados salieron de ahí.
if (fallos.length) {
  process.stderr.write(`\n✗ ${fallos.length} serie(s) sin leer:\n`)
  for (const f of fallos) process.stderr.write(`  · ${f.id} → ${f.error}\n`)
  process.stderr.write('\nCenso incompleto: no se emite. Volvé a correrlo.\n')
  process.exit(1)
}

const suma = (f) => out.reduce((a, x) => a + (x[f] || 0), 0)
process.stderr.write(
  `\n✓ ${out.length} series · ${suma('total')} episodios · ${suma('gratis')} gratis · ${suma('bloqueados')} bloqueados\n`,
)

console.log(JSON.stringify(out, null, 2))
