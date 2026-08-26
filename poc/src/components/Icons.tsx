/** La moneda replica la marca: círculo dorado con las tres barras del logo. */
export const Coin = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFDE8A" /><stop offset=".5" stopColor="#FFC53D" /><stop offset="1" stopColor="#E8940C" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="url(#cg)" />
    <circle cx="12" cy="12" r="11" fill="none" stroke="#B87309" strokeOpacity=".45" />
    <g fill="#7A4A05">
      <rect x="6.6" y="7.4" width="2.5" height="9.2" rx="1.25" />
      <rect x="10.75" y="9.4" width="2.5" height="5.2" rx="1.25" />
      <rect x="14.9" y="10.6" width="2.5" height="2.8" rx="1.25" />
    </g>
  </svg>
)

/** El Pase: un ticket, no una moneda. Se ve distinto porque se gasta distinto. */
export const Pass = ({ s = 24 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v2.1a2.4 2.4 0 0 0 0 4.8v2.1A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-2.1a2.4 2.4 0 0 0 0-4.8V7.5Z"
      fill="url(#pg)" stroke="#FFDE8A" strokeOpacity=".5" strokeWidth="1" />
    <path d="M13.4 9.2 10.1 13h2.3l-1.1 2.6 3.3-3.8h-2.3l1.1-2.6Z" fill="#7A4A05" />
    <defs><linearGradient id="pg" x1="3" y1="6" x2="21" y2="18">
      <stop offset="0" stopColor="#FFD470" /><stop offset="1" stopColor="#F0A118" />
    </linearGradient></defs>
  </svg>
)

export const Shield = ({ s = 18, c = 'currentColor' }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2.6 4.6 5.4v6.2c0 4.5 3 8.5 7.4 9.8 4.4-1.3 7.4-5.3 7.4-9.8V5.4L12 2.6Z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
    <path d="m8.9 12 2.1 2.2 4.1-4.4" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Lock = ({ s = 22 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4.5" y="10.2" width="15" height="10.3" rx="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M8.2 10.2V7.6a3.8 3.8 0 0 1 7.6 0v2.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)

export const Back = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14.5 5.5-7 6.5 7 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const X = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
)
export const Heart = ({ s = 27 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20.3S3.6 15.5 3.6 9.7A4.6 4.6 0 0 1 12 7.1a4.6 4.6 0 0 1 8.4 2.6c0 5.8-8.4 10.6-8.4 10.6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
)
export const Chat = ({ s = 26 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 11.6c0 4-3.8 7.2-8.5 7.2-1 0-2-.1-2.9-.4L4 20l1.4-3.4a6.8 6.8 0 0 1-2.4-5c0-4 3.8-7.2 8.5-7.2s9 3.2 9 7.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
)
export const Share = ({ s = 25 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12v6.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V12M12 3.5v11M12 3.5 8 7.6M12 3.5l4 4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const Play = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5 19.5 12 7 19.5V4.5Z" fill="currentColor" /></svg>
)

export const Logo = ({ s = 22 }: { s?: number }) => (
  <svg width={s * 1.35} height={s} viewBox="0 0 34 24" fill="none" aria-hidden="true">
    <rect x="1" y="2" width="6" height="20" rx="3" fill="#E93BC9" />
    <rect x="10" y="6" width="6" height="12" rx="3" fill="#3FE0D0" />
    <rect x="19" y="9" width="6" height="6" rx="3" fill="#FFC53D" />
  </svg>
)

export const Bell = ({ s = 17 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 9.4a6 6 0 1 0-12 0c0 5-2 6.4-2 6.4h16s-2-1.4-2-6.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M13.7 19.2a2 2 0 0 1-3.4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)
