/**
 * Copia a `perfil/img/` las imágenes que usa la página del anexo del perfil.
 *
 * La página tiene que funcionar abierta desde el disco —igual que
 * `mobbin-export/index.html`—, así que no puede apuntar a `../docs/…` ni a
 * `../mobbin-export/…`: en el sitio publicado esas rutas no existen, porque
 * `_site` solo recibe los cuatro entregables, el prototipo y los flujos.
 *
 * De ahí la copia. Y de ahí que sea un script y no un `cp` a mano: las capturas
 * de la propuesta se regeneran con `npm run export` cada vez que cambia el POC,
 * y sin esto la página se quedaría enseñando una versión anterior sin que se
 * note. Correr `npm run perfil` después de `npm run export`.
 *
 *   node scripts/publicar-perfil.mjs
 */
import { mkdir, copyFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = dirname(dirname(dirname(fileURLToPath(import.meta.url))))
const OUT = join(RAIZ, 'perfil', 'img')

/** origen → nombre en la página. El nombre dice qué es, no de dónde vino. */
const IMAGENES = [
  ['docs/00-dogfooding/evidencia/perfil-nativo-invitado.png', 'antes-invitado.png'],
  ['docs/00-dogfooding/evidencia/perfil-nativo-cuenta.png', 'antes-cuenta.png'],
  ['mobbin-export/flows/f8-tu-noche/01-invitado.webp', 'despues-invitado.webp'],
  ['mobbin-export/flows/f8-tu-noche/02-invitado-guardar.webp', 'despues-invitado-guardar.webp'],
  ['mobbin-export/flows/f8-tu-noche/03-con-cuenta.webp', 'despues-cuenta.webp'],
  ['mobbin-export/flows/f8-tu-noche/04-sin-pase.webp', 'despues-sin-pase.webp'],
  ['mobbin-export/flows/f1-pase-de-la-noche/01b-acuse-de-la-noche.webp', 'entrada-acuse.webp'],
]

await mkdir(OUT, { recursive: true })
for (const [src, dest] of IMAGENES) {
  await copyFile(join(RAIZ, src), join(OUT, dest))
  process.stdout.write(`  · ${dest}\n`)
}
console.log(`\n${IMAGENES.length} imágenes → perfil/img/`)
