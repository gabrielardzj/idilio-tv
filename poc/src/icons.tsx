const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const Heart = ({ s = 26 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...S}>
    <path d="M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 2.6c0 5.8-8.5 11.3-8.5 11.3Z" />
  </svg>
);
export const Comment = ({ s = 26 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...S}>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-3.3-.6L3 21l1.8-5a8.2 8.2 0 0 1-.8-3.6 8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 8 7.5Z" />
  </svg>
);
export const Share = ({ s = 26 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...S}>
    <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 15V3m0 0L8.2 6.8M12 3l3.8 3.8" />
  </svg>
);
export const List = ({ s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...S}>
    <path d="M4 6h16M4 12h16M4 18h10" />
  </svg>
);
export const Lock = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...S}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.6" />
    <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
  </svg>
);
export const Coin = ({ s = 15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9.2" fill="currentColor" opacity=".22" />
    <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7.4v9.2M14.6 9.4a2.9 2.9 0 0 0-2.6-1.3c-1.5 0-2.7.8-2.7 2s1 1.7 2.7 2 2.9.8 2.9 2.1-1.2 2-2.9 2a3 3 0 0 1-2.7-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
export const Moon = ({ s = 15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M20 14.2A8.6 8.6 0 0 1 9.8 4 8.6 8.6 0 1 0 20 14.2Z" fill="currentColor" />
  </svg>
);
export const Shield = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 2.8 4.8 5.7v5.6c0 4.4 3 8.4 7.2 9.9 4.2-1.5 7.2-5.5 7.2-9.9V5.7Z" fill="currentColor" opacity=".22" />
    <path d="M12 2.8 4.8 5.7v5.6c0 4.4 3 8.4 7.2 9.9 4.2-1.5 7.2-5.5 7.2-9.9V5.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="m9.2 11.9 2 2 3.6-3.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Bell = ({ s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...S}>
    <path d="M18 8.6a6 6 0 1 0-12 0c0 6-2 7.4-2 7.4h16s-2-1.4-2-7.4M13.7 19.4a2 2 0 0 1-3.4 0" />
  </svg>
);
export const ChevUp = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...S}><path d="m6 15 6-6 6 6" /></svg>
);
export const Close = ({ s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...S}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Play = ({ s = 15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M7 4.6v14.8L19.5 12z" /></svg>
);
