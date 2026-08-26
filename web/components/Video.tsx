'use client'

import type { Serie } from '@/lib/supabase/queries'

/**
 * El hueco del video.
 *
 * En producción esto es `<MuxPlayer playbackId={...} streamType="on-demand" />`
 * de `@mux/mux-player-react`, con Mux Data para la analítica de reproducción —
 * es lo que corre hoy en www.idilio.tv.
 *
 * Acá no se instala la dependencia a propósito: sin `playbackId` reales no
 * reproduciría nada, y sumar 200 kB de player muerto al bundle sería ruido.
 * Lo que sí se respeta es el contrato: mismo contenedor, mismo aspect ratio,
 * mismo punto de montaje. Cambiarlo por el player real es reemplazar el cuerpo
 * de este componente.
 */
export function Video({ serie, episodio }: { serie: Serie; episodio: number }) {
  const [luz, sombra] = serie.tono
  const k = (episodio * 37) % 44

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            `radial-gradient(38% 26% at ${28 + k}% 22%, ${luz}ee 0%, ${luz}55 42%, transparent 72%)`,
            `radial-gradient(26% 18% at ${54 + k}% 31%, rgba(255,236,214,.20) 0%, transparent 68%)`,
            `radial-gradient(52% 42% at ${34 + (k % 32)}% 96%, ${sombra} 0%, ${sombra}cc 48%, transparent 78%)`,
            `radial-gradient(120% 90% at 50% 50%, transparent 24%, rgba(10,10,10,.72) 100%)`,
            `linear-gradient(158deg, ${luz}3a 0%, ${sombra} 62%, #070410 100%)`,
          ].join(','),
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-0/70 via-transparent to-surface-0" />
    </div>
  )
}
