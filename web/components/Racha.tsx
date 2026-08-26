import { STREAK } from '@/lib/economy'
import { Escudo } from './Moneda'

/** Siete noches. La 3 lleva escudo en vez de número: ahí se gana el comodín. */
export function Racha({ nights, shields }: { nights: number; shields: number }) {
  return (
    <div className="rounded-2xl border border-white/7 bg-white/[0.035] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <b className="text-sm font-bold">
          {nights === 0 ? 'Sin racha' : `Racha de ${nights} noche${nights === 1 ? '' : 's'}`}
        </b>
        <span className="text-[11.5px] text-ink-low">La noche corre de 5 a.m. a 5 a.m.</span>
      </div>

      <ol className="grid grid-cols-7 gap-1.5">
        {STREAK.map((r) => {
          const hecha = r.night <= nights
          return (
            <li key={r.night} className="grid justify-items-center gap-1.5">
              <span
                className={[
                  'grid aspect-square w-full max-w-[38px] place-items-center rounded-xl border text-xs font-bold',
                  hecha
                    ? 'border-brand-cyan/45 bg-brand-cyan/12 text-brand-cyan'
                    : 'border-white/8 bg-white/5 text-ink-low',
                ].join(' ')}
              >
                {r.shield ? <Escudo s={16} c={hecha ? '#3fc1c9' : '#6e6e78'} /> : r.night}
              </span>
              <span className={`text-[9.5px] font-semibold ${hecha ? 'text-brand-cyan' : 'text-ink-low'}`}>
                {r.coins > 0 ? `+${r.coins}` : 'pase'}
              </span>
            </li>
          )
        })}
      </ol>

      {/* El comodín se consume solo. Si hay que hacer algo para no perder la
          racha, la racha ya es una tarea. */}
      <p className="mt-4 flex items-center gap-2.5 rounded-xl border border-brand-cyan/20 bg-brand-cyan/7 px-3 py-2.5 text-[12.5px] leading-snug text-ink-mid">
        <Escudo s={17} c="#3fc1c9" />
        {shields > 0 ? (
          <span><b className="font-bold text-ink">Tienes 1 comodín.</b> Si te saltas una noche, se usa solo. No hay que hacer nada.</span>
        ) : (
          <span>En la <b className="font-bold text-ink">noche 3</b> ganas un comodín que te cubre una falta.</span>
        )}
      </p>
    </div>
  )
}
