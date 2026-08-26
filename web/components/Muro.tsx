'use client'

import { useEffect, useState } from 'react'
import { EPISODE_COST, MAX_PASSES, episodesLabel } from '@/lib/economy'
import type { VistaDelPase } from '@/lib/pase'
import type { Serie } from '@/lib/supabase/queries'
import { Moneda, Ticket } from './Moneda'
import { Racha } from './Racha'

/**
 * EL MURO. La pantalla donde ocurre todo.
 *
 * Orden deliberado, de arriba a abajo:
 *   1. la historia (el cliffhanger)
 *   2. dónde voy (progreso de serie)
 *   3. la decisión — el Pase primero, las monedas después
 *   4. la racha, como consecuencia visible
 *
 * La regla que gobierna el orden: lo gratis antes que lo pago, siempre.
 * Un muro que abre con precios enseña que el sistema es una tienda.
 */
export function Muro({
  serie, episodio, cliff, va, pase, onUsarPase,
}: {
  serie: Serie
  episodio: number
  cliff: string
  va: number
  pase: VistaDelPase
  onUsarPase: () => void
}) {
  const restantes = serie.total - va
  const pct = Math.round((va / serie.total) * 100)
  const puedePagar = pase.balance >= EPISODE_COST
  const faltan = EPISODE_COST - pase.balance

  return (
    <section
      className="absolute inset-x-0 bottom-0 z-50 max-h-[88%] overflow-y-auto rounded-t-sheet
                 border-t border-primary/20 bg-gradient-to-b from-surface-2 via-surface-1 to-surface-0
                 px-5 pt-3 pb-8 shadow-[0_-28px_70px_rgba(0,0,0,.8)]"
      aria-label="Desbloquear episodio"
    >
      <span className="mx-auto mb-5 block h-1 w-9 rounded bg-white/20" />

      {/* 1 · la historia */}
      <header className="mb-5 text-center">
        <p className="text-[11px] font-bold tracking-[0.14em] text-ink-low uppercase">
          Continuará · Episodio {episodio}
        </p>
        <h2 className="mt-2 text-[23px] leading-tight font-bold tracking-tight text-balance">
          {cliff || 'La historia sigue.'}
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-mid">
          Quedan {restantes} episodios de {serie.titulo}.
        </p>
      </header>

      {/* 2 · dónde voy */}
      <div className="mb-6">
        <div className="mb-1.5 flex items-baseline justify-between">
          <b className="text-xs font-semibold">Vas {va} de {serie.total}</b>
          <span className="text-[11px] text-ink-low">{pct}%</span>
        </div>
        <div className="h-[3px] overflow-hidden rounded bg-white/12">
          <span
            className="block h-full rounded bg-gradient-to-r from-brand-cyan to-primary transition-[width] duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* 3 · la decisión */}
      {pase.passes > 0 ? <PaseListo pase={pase} onUsar={onUsarPase} /> : <Cita pase={pase} episodio={episodio} />}

      <div className="mt-3.5">
        {puedePagar ? (
          <>
            <button className={BTN_PRIMARIO}>Abrirlo ahora por {EPISODE_COST} monedas</button>
            <p className="mt-2.5 text-center text-xs text-ink-low">
              Te quedan <b className="font-bold text-pass-100">{pase.balance}</b> monedas · {episodesLabel(pase.balance)}
            </p>
          </>
        ) : pase.passes > 0 ? (
          <button className="h-11 w-full text-[13.5px] font-semibold text-ink-mid">
            o consigue monedas para no esperar
          </button>
        ) : (
          <>
            <button className={BTN_PRIMARIO}>
              <Moneda s={19} /> No quiero esperar
            </button>
            <p className="mt-2.5 text-center text-xs text-ink-low">
              Tienes {pase.balance} monedas. Te faltan <b className="font-bold text-pass-100">{faltan}</b> para este episodio.
            </p>
          </>
        )}
      </div>

      {/* 4 · la racha, como consecuencia */}
      <h3 className="mt-6 mb-3 text-[11px] font-bold tracking-[0.12em] text-ink-low uppercase">Tu racha</h3>
      <Racha nights={pase.nights} shields={pase.shields} />
    </section>
  )
}

const BTN_PRIMARIO =
  'flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b ' +
  'from-primary to-[#6d19e2] text-[15.5px] font-bold text-white shadow-[0_10px_26px_-10px_rgba(160,0,240,.6)] ' +
  'transition active:scale-[.975]'

function PaseListo({ pase, onUsar }: { pase: VistaDelPase; onUsar: () => void }) {
  const enTope = pase.passes >= MAX_PASSES
  return (
    <div
      className="relative overflow-hidden rounded-[22px] border border-pass-500/40 p-5
                 bg-[linear-gradient(145deg,rgba(245,169,63,.16),rgba(245,169,63,.05)_55%,transparent)]
                 shadow-[0_0_34px_-8px_rgba(245,169,63,.28),inset_0_1px_0_rgba(255,224,168,.16)]"
    >
      <div className="mb-3 flex items-center gap-3">
        <Ticket s={26} />
        <b className="text-[16.5px] font-bold tracking-tight text-pass-100">
          {pase.passes === 1 ? 'Tu Pase de la Noche está listo' : `Tienes ${pase.passes} Pases de la Noche`}
        </b>
      </div>
      <p className="mb-4 text-[13.5px] leading-relaxed text-ink-mid">
        Abre un episodio gratis. Tú eliges de cuál serie.{' '}
        {enTope
          ? 'Estás en el tope: el próximo pase empieza a acumularse cuando uses uno.'
          : 'Llega uno cada noche y se guardan hasta dos.'}
      </p>
      <button
        onClick={onUsar}
        className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full
                   bg-gradient-to-b from-pass-300 to-pass-500 text-[15.5px] font-bold text-[#2a1a02]
                   shadow-[0_10px_26px_-10px_rgba(245,169,63,.5)] transition active:scale-[.975]"
      >
        <Ticket s={20} /> Usar {pase.passes > 1 ? 'un pase' : 'el pase'} en este episodio
      </button>
    </div>
  )
}

/**
 * El estado de espera. El héroe es la HORA DEL RELOJ, no el countdown.
 * Ver lib/pase.ts para el porqué.
 */
function Cita({ pase, episodio }: { pase: VistaDelPase; episodio: number }) {
  const restante = useCuentaRegresiva(pase.nextPassAt, pase.serverNow)
  const menosDeUnaHora = restante !== null && restante < 3_600_000

  return (
    <div className="rounded-[22px] border border-primary/28 bg-[linear-gradient(145deg,rgba(160,0,240,.11),transparent_60%)] p-5">
      <div className="mb-3 flex items-center gap-3">
        <Ticket s={24} />
        <b className="text-[16.5px] font-bold tracking-tight">Tu próximo Pase de la Noche</b>
      </div>

      {menosDeUnaHora ? (
        <p className="text-center text-[40px] leading-none font-bold tracking-tighter tabular-nums" role="timer">
          {formatMS(restante!)}
        </p>
      ) : (
        <div className="text-center">
          <p className="text-[12.5px] font-semibold tracking-wide text-ink-low uppercase">
            {pase.listoA?.esHoy ? 'Hoy a las' : 'Mañana a las'}
          </p>
          <p className="text-[42px] leading-[1.05] font-bold tracking-tighter tabular-nums">
            {pase.listoA?.hora}
          </p>
          {restante !== null && (
            <p className="mt-1 text-[12.5px] tabular-nums text-ink-low">
              faltan {Math.floor(restante / 3_600_000)} h{' '}
              {String(Math.floor((restante % 3_600_000) / 60_000)).padStart(2, '0')} m
            </p>
          )}
        </div>
      )}

      <p className="mt-3.5 text-center text-[13.5px] leading-relaxed text-ink-mid">
        Vuelve y el episodio {episodio} te espera abierto. Tu racha suma una noche más.
      </p>
    </div>
  )
}

/** El delta se cuenta contra `serverNow`, nunca contra Date.now() del cliente. */
function useCuentaRegresiva(objetivo: number | null, serverNow: number) {
  const [transcurrido, setTranscurrido] = useState(0)
  useEffect(() => {
    if (objetivo === null) return
    const id = setInterval(() => setTranscurrido((t) => t + 1000), 1000)
    return () => clearInterval(id)
  }, [objetivo])
  if (objetivo === null) return null
  return Math.max(0, objetivo - serverNow - transcurrido)
}

const formatMS = (ms: number) =>
  `${String(Math.floor(ms / 60_000)).padStart(2, '0')}:${String(Math.floor((ms % 60_000) / 1000)).padStart(2, '0')}`
