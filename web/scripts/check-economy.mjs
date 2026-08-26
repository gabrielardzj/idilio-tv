/**
 * El modelo económico vive una sola vez, en poc/src/lib/economy.ts.
 * web/lib/economy.ts es una copia. Este check falla si divergen, para que no
 * pase lo obvio: que el prototipo y la implementación digan precios distintos.
 *
 *   npm run check-economy        verifica
 *   npm run check-economy -- -w  reescribe la copia desde el original
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(dirname(fileURLToPath(import.meta.url)))
const src = join(here, '..', 'poc', 'src', 'lib', 'economy.ts')
const dst = join(here, 'lib', 'economy.ts')

const a = readFileSync(src, 'utf8')
const b = readFileSync(dst, 'utf8')

if (a === b) { console.log('economy.ts sincronizado'); process.exit(0) }

if (process.argv.includes('-w')) {
  writeFileSync(dst, a)
  console.log('economy.ts actualizado desde el POC')
  process.exit(0)
}

console.error('✗ web/lib/economy.ts difiere de poc/src/lib/economy.ts')
console.error('  Corré:  npm run check-economy -- -w')
process.exit(1)
