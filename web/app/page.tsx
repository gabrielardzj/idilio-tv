import Link from 'next/link'
import { desbloqueadoHasta, estadoQueDemuestra, listarSeries } from '@/lib/supabase/queries'
import { CATALOGO, EPISODE_COST } from '@/lib/economy'

/**
 * Índice del POC. No es el home de Idilio — el brief deja fuera del alcance la
 * navegación general. Existe solo para entrar a las tres series del fixture.
 */
export default async function Home() {
  const series = await listarSeries()
  const posicion = Object.fromEntries(
    await Promise.all(series.map(async (s) => [s.slug, await desbloqueadoHasta(s.slug)] as const)),
  )

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <p className="text-[11px] font-bold tracking-[0.14em] text-ink-low uppercase">
        Idilio TV · POC sobre el stack de producción
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Continuará</h1>
      <p className="mt-3 leading-relaxed text-ink-mid">
        El Pase de la Noche, implementado en Next.js App Router + Tailwind v4 con los
        tokens reales del producto. El estado económico se resuelve en el servidor.
      </p>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-low">
        Cada serie entra al muro en un estado distinto, para que las tres situaciones sean
        rutas reales y prerrenderizadas y no ramas de código inalcanzables.
      </p>

      <div className="mt-10 space-y-3">
        {series.map((s) => {
          const va = posicion[s.slug]
          const siguiente = va + 1
          return (
            <Link
              key={s.slug}
              href={`/serie/${s.slug}/${siguiente}`}
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-surface-1 p-4
                         transition hover:border-primary/40"
            >
              <span
                className="h-16 w-12 shrink-0 rounded-lg"
                style={{ background: `linear-gradient(150deg, ${s.tono[0]}, ${s.tono[1]})` }}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold tracking-tight">{s.titulo}</span>
                <span className="mt-0.5 block text-[13px] text-pass-300">
                  {estadoQueDemuestra(s.slug)}
                </span>
                <span className="mt-1 block text-xs text-ink-low">
                  Episodio {siguiente} bloqueado · vas {va} de {s.total} · {s.gratis} gratis
                </span>
              </span>
            </Link>
          )
        })}
      </div>

      <p className="mt-10 text-xs leading-relaxed text-ink-low">
        Cifras medidas en las {CATALOGO.series} series del catálogo el 25-ago-2026:
        {' '}{CATALOGO.gratis} episodios gratis de {CATALOGO.episodios.toLocaleString('es-MX')} totales,
        y {EPISODE_COST} monedas por desbloqueo sin una sola excepción.
      </p>
    </main>
  )
}
