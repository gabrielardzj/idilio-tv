/** La moneda replica la marca: círculo ámbar con las tres barras del logo. */
export function Moneda({ s = 20 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="mn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe0a8" />
          <stop offset=".5" stopColor="#f5a93f" />
          <stop offset="1" stopColor="#c97f16" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#mn)" />
      <g fill="#5c3a05">
        <rect x="6.6" y="7.4" width="2.5" height="9.2" rx="1.25" />
        <rect x="10.75" y="9.4" width="2.5" height="5.2" rx="1.25" />
        <rect x="14.9" y="10.6" width="2.5" height="2.8" rx="1.25" />
      </g>
    </svg>
  )
}

/** El Pase es un ticket, no una moneda: se ve distinto porque se gasta distinto. */
export function Ticket({ s = 24 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v2.1a2.4 2.4 0 0 0 0 4.8v2.1A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-2.1a2.4 2.4 0 0 0 0-4.8V7.5Z"
        fill="url(#tk)" stroke="#ffe0a8" strokeOpacity=".5"
      />
      <path d="M13.4 9.2 10.1 13h2.3l-1.1 2.6 3.3-3.8h-2.3l1.1-2.6Z" fill="#5c3a05" />
      <defs>
        <linearGradient id="tk" x1="3" y1="6" x2="21" y2="18">
          <stop offset="0" stopColor="#f8c46a" />
          <stop offset="1" stopColor="#f5a93f" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Escudo({ s = 18, c = 'currentColor' }: { s?: number; c?: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.6 4.6 5.4v6.2c0 4.5 3 8.5 7.4 9.8 4.4-1.3 7.4-5.3 7.4-9.8V5.4L12 2.6Z"
        stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m8.9 12 2.1 2.2 4.1-4.4" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
