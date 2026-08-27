/**
 * Genera los design tokens en formato W3C Design Tokens a partir de styles.css.
 *
 * El CSS es la única fuente de verdad: los tokens se derivan de él, no al revés.
 * Así el archivo que se importa a Figma (Tokens Studio) no puede desincronizarse
 * del prototipo — si alguien cambia un color en el CSS, el token cambia solo.
 *
 *   node scripts/export-tokens.mjs
 */
import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const OUT = join(ROOT, '..', 'docs', '03-diseno', 'tokens.json')

/** Cómo se agrupa cada variable del CSS y qué significa. */
const MAP = {
  'ink-1000': ['color', 'superficie', 'Fondo absoluto. La escala arranca casi en negro para no quemar de noche.'],
  'ink-900': ['color', 'superficie', 'Fondo del reproductor y base de las hojas.'],
  'ink-800': ['color', 'superficie', 'Tope de la hoja inferior.'],
  'ink-700': ['color', 'superficie', 'Tarjetas elevadas.'],
  'ink-600': ['color', 'superficie', 'Bordes y separadores fuertes.'],
  'ink-500': ['color', 'superficie', 'Estados deshabilitados.'],

  'tx-hi': ['color', 'texto', 'Máxima jerarquía. Es #F2EBF7 y no blanco puro: 8% menos de luminancia para la franja de 11pm a 2am.'],
  'tx-mid': ['color', 'texto', 'Cuerpo y descripciones.'],
  'tx-lo': ['color', 'texto', 'Metadatos y etiquetas de sección.'],

  violet: ['color', 'marca', 'Acción secundaria de pago. Del logo.'],
  'violet-deep': ['color', 'marca', 'Cierre del degradado violeta.'],
  magenta: ['color', 'marca', 'Barra magenta del logo. Solo acento.'],
  cyan: ['color', 'marca', 'Progreso, racha cumplida, comodín disponible.'],

  'gold-300': ['color', 'moneda', 'RESERVADO. Texto sobre superficie dorada y cifras de saldo.'],
  'gold-400': ['color', 'moneda', 'RESERVADO. La moneda y el Pase. Único acento cálido de alta luminancia del sistema.'],
  'gold-500': ['color', 'moneda', 'RESERVADO. Cierre del degradado dorado.'],

  ok: ['color', 'estado', 'Confirmación.'],
  warn: ['color', 'estado', 'Comodín consumido. Nunca rojo: el sistema no regaña.'],

  'r-sm': ['dimension', 'radio', 'Filas y avisos.'],
  'r-md': ['dimension', 'radio', 'Tarjetas y paquetes.'],
  'r-lg': ['dimension', 'radio', 'Tarjeta del Pase.'],
  'r-xl': ['dimension', 'radio', 'Hoja inferior.'],
  'r-full': ['dimension', 'radio', 'Botones y chips.'],

  'sp-1': ['dimension', 'espaciado', ''],
  'sp-2': ['dimension', 'espaciado', ''],
  'sp-3': ['dimension', 'espaciado', ''],
  'sp-4': ['dimension', 'espaciado', 'Base. Padding lateral de la hoja.'],
  'sp-5': ['dimension', 'espaciado', ''],
  'sp-6': ['dimension', 'espaciado', ''],
  'sp-8': ['dimension', 'espaciado', ''],
  'sp-10': ['dimension', 'espaciado', ''],

  ease: ['cubicBezier', 'movimiento', 'La de casi todo, y las DOS mitades de una navegación. Rápida al inicio, asentada al final.'],
  'ease-in': ['cubicBezier', 'movimiento', 'Solo para lo que se va por su cuenta: una hoja que se cierra. Arranca de inmediato y acelera.'],
  'ease-suave': ['cubicBezier', 'movimiento', 'Para lo que cambia sin entrar ni salir: el fundido entre fotogramas.'],
  'ease-rebote': ['cubicBezier', 'movimiento', 'RACIONADA. Con sobrepaso, y solo para lo que celebra: la medalla, la noche cumplida, el saldo que sube.'],

  't-1': ['duration', 'movimiento', 'Respuesta al dedo. Por debajo de esto no se percibe.'],
  't-2': ['duration', 'movimiento', 'Lo que se va.'],
  't-3': ['duration', 'movimiento', 'Un cambio de estado.'],
  't-4': ['duration', 'movimiento', 'Una hoja entera.'],
  't-nav': ['duration', 'movimiento', 'Una navegación. El MISMO valor para la pantalla que entra y la que sale: si difieren, la lámina se parte en dos.'],
}

/** Escala tipográfica, tomada del uso real en los componentes. */
const TYPE = {
  'display': { size: '42px', weight: 700, tracking: '-2px', lineHeight: 1.05, uso: 'La hora del próximo pase. El número más grande del sistema.' },
  'title-1': { size: '24px', weight: 700, tracking: '-0.6px', lineHeight: 1.18, uso: 'Titular de la hoja: el cliffhanger, "Episodio 13 desbloqueado".' },
  'title-2': { size: '21px', weight: 700, tracking: '-0.5px', lineHeight: 1.2, uso: 'Título de episodio en el reproductor.' },
  'headline': { size: '16.5px', weight: 700, tracking: '-0.3px', lineHeight: 1.3, uso: 'Encabezado de la tarjeta del Pase; episodios de un paquete.' },
  'button': { size: '15.5px', weight: 700, tracking: '-0.2px', lineHeight: 1, uso: 'Acción primaria.' },
  'body': { size: '13.5px', weight: 400, tracking: '0', lineHeight: 1.5, uso: 'Descripciones y explicaciones de mecánica.' },
  'caption': { size: '12.5px', weight: 600, tracking: '0', lineHeight: 1.5, uso: 'Notas al pie de una acción, estado del comodín.' },
  'label': { size: '11px', weight: 700, tracking: '1.2px', lineHeight: 1, uso: 'Etiqueta de sección en versalitas: TU RACHA, MONEDAS.' },
  'micro': { size: '10.5px', weight: 600, tracking: '0.1px', lineHeight: 1, uso: 'Traducción a episodios bajo el saldo; recompensa bajo cada noche.' },
}

const px = (v) => v.trim()

const build = (vars) => {
  const t = { $description: 'Idilio TV · «Continuará» — el Pase de la Noche. Generado desde poc/src/styles.css.' }
  for (const [name, [type, group, desc]] of Object.entries(MAP)) {
    const value = vars[name]
    if (!value) continue
    t[group] ??= {}
    t[group][name] = { $type: type, $value: px(value), ...(desc ? { $description: desc } : {}) }
  }
  t.tipografia = {}
  for (const [name, v] of Object.entries(TYPE)) {
    t.tipografia[name] = {
      $type: 'typography',
      $value: {
        fontFamily: 'Outfit',
        fontSize: v.size,
        fontWeight: v.weight,
        letterSpacing: v.tracking,
        lineHeight: v.lineHeight,
      },
      $description: v.uso,
    }
  }
  return t
}

const css = await readFile(join(ROOT, 'src', 'styles.css'), 'utf8')
const root = css.slice(css.indexOf(':root'), css.indexOf('}', css.indexOf(':root')))
const vars = Object.fromEntries(
  [...root.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2]]),
)

const tokens = build(vars)
await writeFile(OUT, JSON.stringify(tokens, null, 2) + '\n')

const n = Object.values(tokens).filter((v) => typeof v === 'object').reduce((a, g) => a + Object.keys(g).length, 0)
console.log(`${n} tokens → ${OUT}`)
