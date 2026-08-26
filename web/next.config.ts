import type { NextConfig } from 'next'

/**
 * Export estático porque este POC se publica en GitHub Pages junto al resto de
 * los entregables. En producción Idilio corre en Vercel con SSR, y este mismo
 * árbol funciona ahí sin cambios: basta quitar `output` y `basePath`.
 *
 * Lo que NO cambia entre los dos modos es lo que importa demostrar: el estado
 * económico se resuelve en el servidor (React Server Components), no en el
 * cliente. Ver lib/pase.ts.
 */
const isPages = process.env.DEPLOY_TARGET === 'pages'

const config: NextConfig = {
  ...(isPages ? { output: 'export', basePath: '/idilio-tv/stack', images: { unoptimized: true } } : {}),
  reactStrictMode: true,
}

export default config
