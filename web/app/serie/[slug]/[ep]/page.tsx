import { notFound } from 'next/navigation'
import { Reproductor } from '@/components/Reproductor'
import { resolverPase } from '@/lib/pase'
import {
  desbloqueadoHasta, estadoDelPase, listarSeries, obtenerEpisodio, obtenerSerie,
} from '@/lib/supabase/queries'

export const dynamicParams = false

/** Export estático: se prerrenderiza el episodio bloqueado de cada serie. */
export async function generateStaticParams() {
  const series = await listarSeries()
  const params: { slug: string; ep: string }[] = []
  for (const s of series) {
    const va = await desbloqueadoHasta(s.slug)
    for (const n of [va, va + 1, va + 2]) params.push({ slug: s.slug, ep: String(n) })
  }
  return params
}

/**
 * Server Component.
 *
 * Todo el estado económico —posición en la serie, si el episodio está
 * bloqueado, cuántos pases hay, cuándo llega el próximo— se resuelve acá,
 * en el servidor. El cliente recibe el resultado ya decidido.
 *
 * No es una preferencia de arquitectura: es el riesgo técnico nº 1 de la
 * propuesta. Un countdown que vive en el navegador se vulnera cambiando la
 * hora del teléfono, y con él la mecánica entera.
 */
export default async function EpisodioPage({
  params,
}: {
  params: Promise<{ slug: string; ep: string }>
}) {
  const { slug, ep } = await params
  const n = Number(ep)

  const serie = await obtenerSerie(slug)
  if (!serie || !Number.isInteger(n) || n < 1 || n > serie.total) notFound()

  const [va, estado] = await Promise.all([desbloqueadoHasta(slug), estadoDelPase(slug)])
  const bloqueado = n > va
  const episodio = await obtenerEpisodio(slug, bloqueado ? n - 1 : n)
  const pase = resolverPase(estado)

  return (
    <Reproductor
      serie={serie}
      episodio={n}
      cliff={episodio?.cliff ?? ''}
      titulo={episodio?.titulo ?? serie.titulo}
      va={va}
      bloqueado={bloqueado}
      pase={pase}
      hasAccount={estado.hasAccount}
    />
  )
}
