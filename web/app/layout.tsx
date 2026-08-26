import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

// next/font, igual que producción — que self-hostea sofia_pro y new_hero.
// Aquí va Outfit porque las del producto son de licencia comercial.
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' })

export const metadata: Metadata = {
  title: 'Continuará · Idilio TV',
  description: 'El Pase de la Noche — el momento del desbloqueo, sobre el stack real de Idilio.',
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={outfit.variable}>
      <body className="font-display antialiased">{children}</body>
    </html>
  )
}
