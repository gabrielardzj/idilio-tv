/**
 * Censo del catálogo real de idilio.tv.
 *
 * Para cada serie: total de episodios, primer episodio bloqueado (= episodios
 * gratis) y costo de desbloqueo en monedas. Todo sale del HTML renderizado en
 * servidor del reproductor web público; no toca ninguna API privada.
 *
 *   node scrape-catalogo.mjs > catalogo.json
 */
const HOME = 'https://www.idilio.tv/'

const get = async (url) => {
  const r = await fetch(url, { headers: { 'accept-language': 'es-419,es' } })
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  return r.text()
}

const ids = async () => {
  const html = await get(HOME)
  return [...new Set([...html.matchAll(/\/serie\/([0-9a-f-]{36})/g)].map((m) => m[1]))]
}

const serie = async (id) => {
  const html = await get(`https://www.idilio.tv/serie/${id}`)
  const locked = [...new Set([...html.matchAll(/Episodio (\d+), bloqueado/g)].map((m) => +m[1]))].sort((a, b) => a - b)
  const all = [...new Set([...html.matchAll(/Episodio (\d+)"/g)].map((m) => +m[1]))].sort((a, b) => a - b)
  const total = Math.max(0, ...all, ...locked)
  const titulo = html.match(/<h1[^>]*>([^<]{2,80})<\/h1>/)?.[1]?.trim() ?? '?'

  let costo = null
  if (locked.length) {
    const ep = await get(`https://www.idilio.tv/serie/${id}/${locked[0]}`)
    // Next inserta comentarios de hidratación entre el texto y el número
    const raw = ep.replace(/<!--[\s\S]*?-->/g, '')
    costo = Number(raw.match(/con\s*(\d+)\s*monedas/)?.[1] ?? null) || null
  }

  return {
    id, titulo, total,
    gratis: locked.length ? locked[0] - 1 : total,
    bloqueados: locked.length,
    costo,
    costoSerie: costo && locked.length ? costo * locked.length : null,
  }
}

const all = await ids()
process.stderr.write(`${all.length} series\n`)

const out = []
for (let i = 0; i < all.length; i += 6) {
  const batch = await Promise.all(all.slice(i, i + 6).map((id) => serie(id).catch((e) => ({ id, error: String(e) }))))
  out.push(...batch)
  process.stderr.write(`  ${out.length}/${all.length}\n`)
}

console.log(JSON.stringify(out, null, 2))
