import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // rutas relativas: el build funciona igual en GitHub Pages, en un subdirectorio
  // o abierto directamente desde el disco.
  base: './',
  plugins: [react()],
  build: { outDir: 'dist', assetsDir: 'assets' },
})
