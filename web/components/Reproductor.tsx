'use client'

import Link from 'next/link'
import { useState } from 'react'
import { EPISODE_COST, STREAK, episodesLabel } from '@/lib/economy'
import type { VistaDelPase } from '@/lib/pase'
import type { Serie } from '@/lib/supabase/queries'
import { Moneda, Ticket } from './Moneda'
import { Muro } from './Muro'
import { Racha } from './Racha'
import { Video } from './Video'

export function Reproductor({
  serie, episodio, cliff, titulo, va, bloqueado, pase: paseInicial,
}: {
  serie: Serie
  episodio: number
  cliff: string
  titulo: string
  va: number
  bloqueado: boolean
  pase: VistaDelPase
  hasAccount: boolean
}) {
  // El estado del servidor es el punto de partida. Al usar un pase, en
  // producción esto sería una server action que llama a use_pass() y revalida;
  // acá se aplica optimista para que el POC funcione sin base.
  const [pase, setPase] = useState(paseInicial)
  const [abierto, setAbierto] = useState(!bloqueado)
  const [celebrar, setCelebrar] = useState(false)

  const usarPase = () => {
    const nights = Math.min(pase.nights + 1, 7)
    const premio = STREAK[nights - 1]
    setPase({
      ...pase,
      passes: pase.passes - 1,
      nights,
      shields: Math.min(pase.shields + (premio.shield ? 1 : 0), 1),
      balance: pase.balance + premio.coins,
    })
    setAbierto(true)
    setCelebrar(true)
  }

  const pct = Math.round((episodio / serie.total) * 100)

  return (
    <main className="relative mx-auto h-dvh w-full max-w-[430px] overflow-hidden bg-surface-0">
      <Video serie={serie} episodio={episodio} />

      {/* Barra superior. El chip de saldo es la única huella permanente del
          metajuego dentro del core loop — y nunca muestra una cifra sin su
          traducción a episodios. */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-3 px-4 pt-14">
        <Link
          href="/"
          aria-label="Volver"
          className="grid h-[38px] w-[38px] place-items-center rounded-full border border-white/9 bg-surface-0/50 backdrop-blur-md"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m14.5 5.5-7 6.5 7 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <div className="min-w-0 flex-1">
          <b className="block truncate text-sm font-semibold tracking-tight">{serie.titulo}</b>
          <span className="text-[11.5px] text-ink-mid">Temporada 1 · {serie.total} episodios</span>
        </div>

        <span
          className="inline-flex h-[38px] items-center gap-1.5 rounded-full border border-pass-500/26
                     bg-gradient-to-b from-[#2d1e0ae6] to-[#181006e6] pr-3.5 pl-2 backdrop-blur-md"
          aria-label={`Saldo: ${pase.balance} monedas, ${episodesLabel(pase.balance)}`}
        >
          <Moneda s={19} />
          <span className="leading-none">
            <b className="block text-[14.5px] font-bold tracking-tight tabular-nums text-pass-100">{pase.balance}</b>
            <span className="mt-[1px] block text-[10.5px] font-semibold text-pass-100/60">
              {pase.balance >= EPISODE_COST ? episodesLabel(pase.balance) : 'sin episodios'}
            </span>
          </span>
        </span>
      </div>

      {/* Metadatos del episodio */}
      <div className="absolute inset-x-0 bottom-24 z-20 px-4 pr-20">
        <p className="text-[11.5px] font-bold tracking-[0.1em] text-brand-cyan uppercase">Episodio {episodio}</p>
        <h1 className="mt-1.5 text-[21px] font-bold tracking-tight">{titulo}</h1>
        {cliff && <p className="mt-1 text-[13.5px] leading-snug text-ink-mid">{cliff}</p>}
      </div>

      {/* Progresión de serie: 40 números grises se vuelven un camino */}
      <div className="absolute inset-x-0 bottom-13 z-20 px-4">
        <div className="mb-1.5 flex items-baseline justify-between">
          <b className="text-xs font-semibold">Vas {episodio} de {serie.total}</b>
          <span className="text-[11px] text-ink-low">{pct}% de la temporada</span>
        </div>
        <div className="h-[3px] overflow-hidden rounded bg-white/12">
          <span className="block h-full rounded bg-gradient-to-r from-brand-cyan to-primary" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {!abierto && (
        <>
          <div className="absolute inset-0 z-40 bg-surface-0/62 backdrop-blur-[3px]" />
          <Muro serie={serie} episodio={episodio} cliff={cliff} va={va} pase={pase} onUsarPase={usarPase} />
        </>
      )}

      {celebrar && <Celebracion pase={pase} episodio={episodio} onCerrar={() => setCelebrar(false)} />}
    </main>
  )
}

function Celebracion({
  pase, episodio, onCerrar,
}: { pase: VistaDelPase; episodio: number; onCerrar: () => void }) {
  const premio = STREAK[Math.max(0, pase.nights - 1)]
  return (
    <>
      <div className="absolute inset-0 z-40 bg-surface-0/62 backdrop-blur-[3px]" />
      <section
        className="absolute inset-x-0 bottom-0 z-50 max-h-[88%] overflow-y-auto rounded-t-sheet
                   border-t border-primary/20 bg-gradient-to-b from-surface-2 via-surface-1 to-surface-0
                   px-5 pt-3 pb-8"
        aria-label="Episodio desbloqueado"
      >
        <span className="mx-auto mb-5 block h-1 w-9 rounded bg-white/20" />
        <div className="pt-6 text-center">
          <span className="mx-auto mb-5 grid h-[78px] w-[78px] place-items-center rounded-full border border-pass-500/38 bg-[radial-gradient(circle_at_40%_32%,rgba(255,224,168,.32),rgba(245,169,63,.09))]">
            <Ticket s={38} />
          </span>
          <h2 className="text-2xl font-bold tracking-tight">Episodio {episodio} desbloqueado</h2>
          <p className="mt-2 mb-5 text-sm leading-relaxed text-ink-mid">
            Usaste tu Pase de la Noche. El próximo llega en 24 horas.
          </p>
          {premio.coins > 0 && (
            <p className="mb-4 flex items-center justify-center gap-2 text-[13.5px] font-semibold text-pass-100">
              <Moneda s={18} /> Noche {pase.nights}: +{premio.coins} monedas por la racha
            </p>
          )}
        </div>
        <div className="mb-4">
          <Racha nights={pase.nights} shields={pase.shields} />
        </div>
        <button
          onClick={onCerrar}
          className="flex h-[54px] w-full items-center justify-center rounded-full bg-gradient-to-b
                     from-primary to-[#6d19e2] text-[15.5px] font-bold text-white transition active:scale-[.975]"
        >
          Ver el episodio {episodio}
        </button>
      </section>
    </>
  )
}
