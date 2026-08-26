import { CATALOGO, EPISODE_COST } from '@/lib/economy'
import { proximaCita } from '@/lib/pase'

/**
 * Capa de datos.
 *
 * En producción esto es Supabase: `createServerClient()` y las consultas de
 * abajo contra las tablas de schema.sql. Aquí devuelve un fixture con datos
 * medidos del catálogo real, para que el POC se pueda publicar como export
 * estático sin credenciales.
 *
 * Las firmas son las definitivas: cambiar el fixture por el cliente real es
 * reemplazar el cuerpo de cada función, no reescribir las pantallas.
 */

export interface Serie {
  id: string
  slug: string
  titulo: string
  total: number
  gratis: number
  tono: [string, string]
}

export interface Episodio {
  n: number
  titulo: string
  /** el gancho que quedó abierto al final de ESTE episodio */
  cliff: string
}

export interface EstadoPase {
  passes: number
  /** ISO. null = está en el tope de acumulación */
  nextPassAt: string | null
  nights: number
  shields: number
  balance: number
  /** el corte de la noche se calcula en la zona del usuario, no del servidor */
  timezone: string
  hasAccount: boolean
  /** momento del servidor contra el que el cliente descuenta */
  serverNow: number
}

/**
 * Reloj fijo del POC: 00:17 en Ciudad de México.
 *
 * En producción esto es `now()` de Postgres. Aquí se ancla a propósito, por dos
 * razones. Una, el export estático hornea el valor en el build y un reloj real
 * quedaría congelado en una hora arbitraria. Dos, el 54% de las sesiones de
 * Idilio caen entre 11 p.m. y 2 a.m.: la franja en la que hay que juzgar este
 * diseño es esa, no las tres de la tarde.
 */
export const RELOJ_FIJO = Date.parse('2026-08-26T06:17:00.000Z')

/* ── Fixture ─────────────────────────────────────────────────────────────
   Tres series reales del catálogo, elegidas para cubrir las tres estructuras
   que existen: la moda (10 gratis) y las dos excepciones (12 y 7).
   Censo completo en docs/00-dogfooding/catalogo.json                       */

const SERIES: Serie[] = [
  { id: '1f522266-4c1b-437a-b4c2-8ca1d2077fde', slug: 'pasion-a-domicilio', titulo: 'Pasión a Domicilio', total: 56, gratis: 12, tono: ['#7B1E4B', '#2A0A1C'] },
  { id: 'd7ef3456-d362-40b6-8be3-45403bc016b1', slug: 'la-herencia-del-patriarca', titulo: 'La Herencia del Patriarca Enamorado', total: 66, gratis: 7, tono: ['#1E3A5F', '#0A1420'] },
  { id: '8f1ad02a-0e95-4f2e-868b-5be4b3adfb3b', slug: 'la-enfermera-infiltrada', titulo: 'La Enfermera Infiltrada', total: 65, gratis: 10, tono: ['#2F5D50', '#0A1714'] },
]

const EPISODIOS: Record<string, Record<number, Episodio>> = {
  'pasion-a-domicilio': {
    12: { n: 12, titulo: 'Lo que vio el portero', cliff: 'Camila abre la puerta y el que está del otro lado no es Andrés.' },
    13: { n: 13, titulo: 'Chispa y Pantalla', cliff: 'El teléfono de Andrés se ilumina en la mesa. El nombre en la pantalla es el de Camila.' },
    14: { n: 14, titulo: 'La llamada de las 3 a.m.', cliff: 'La voz al otro lado dice: «Yo estuve ahí esa noche».' },
  },
  'la-herencia-del-patriarca': {
    18: { n: 18, titulo: 'El testamento falso', cliff: 'La firma del notario no coincide con la del documento.' },
    19: { n: 19, titulo: 'Sangre en el estudio', cliff: 'La caja fuerte estaba abierta desde antes del velorio.' },
  },
  'la-enfermera-infiltrada': {
    12: { n: 12, titulo: 'Turno de noche', cliff: 'El paciente de la 304 sabe su nombre real.' },
    13: { n: 13, titulo: 'Historia clínica', cliff: 'En la carpeta hay una foto suya de hace diez años.' },
  },
}

/* ── Consultas ─────────────────────────────────────────────────────────── */

export async function listarSeries(): Promise<Serie[]> {
  // supabase.from('series').select('id, slug, titulo, total_episodios, episodios_gratis')
  return SERIES
}

export async function obtenerSerie(slug: string): Promise<Serie | null> {
  // supabase.from('series').select('*').eq('slug', slug).single()
  return SERIES.find((s) => s.slug === slug) ?? null
}

export async function obtenerEpisodio(slug: string, n: number): Promise<Episodio | null> {
  // supabase.from('episodes').select('*').eq('serie_slug', slug).eq('numero', n).single()
  return EPISODIOS[slug]?.[n] ?? null
}

/** Hasta qué episodio tiene desbloqueado este espectador en esta serie. */
export async function desbloqueadoHasta(slug: string): Promise<number> {
  // select max(e.numero) from episode_unlock u join episodes e on ...
  const serie = SERIES.find((s) => s.slug === slug)
  return { 'pasion-a-domicilio': 12, 'la-herencia-del-patriarca': 18, 'la-enfermera-infiltrada': 12 }[slug]
    ?? serie?.gratis ?? 0
}

/**
 * Estado del metajuego.
 *
 * En producción es una fila por espectador y no depende de la serie:
 * `select * from pass_state where viewer_id = v`. Sin función de acreditación previa:
 * el pase ya se entregó al terminar el episodio, vía `credit_night()`.
 *
 * En el fixture, en cambio, cada serie devuelve un estado distinto — es la forma
 * de que las tres situaciones del muro sean rutas reales y prerrenderizadas, en
 * vez de ramas de código que nadie puede alcanzar.
 */
/**
 * La zona del espectador. En producción sale de `viewer.timezone`; acá es una
 * constante, y tiene que estar declarada **antes** de calcular ninguna cita:
 * `proximaCita` la necesita para no resolver la hora en la zona de la máquina
 * que construye el sitio.
 */
const ZONA = 'America/Mexico_City'

const ESTADOS: Record<string, Omit<EstadoPase, 'timezone' | 'hasAccount' | 'serverNow'>> = {
  // Tiene el pase de esta noche sin usar.
  'pasion-a-domicilio': { passes: 1, nextPassAt: null, nights: 2, shields: 0, balance: 0 },
  // Ya lo usó y no tiene monedas: el muro se vuelve una cita con hora.
  'la-herencia-del-patriarca': {
    passes: 0, nights: 3, shields: 1, balance: 0,
    nextPassAt: new Date(proximaCita(RELOJ_FIJO, ZONA)).toISOString(),
  },
  // Ya lo usó pero tiene saldo, y el próximo pase llega en menos de una hora:
  // ahí el countdown vuelve a ser el héroe, porque los segundos sí importan.
  'la-enfermera-infiltrada': {
    passes: 0, nights: 5, shields: 1, balance: 45,
    // A 42 minutos de su hora de siempre: ahí el countdown vuelve a ser el héroe.
    nextPassAt: new Date(RELOJ_FIJO + 42 * 60_000).toISOString(),
  },
}

export async function estadoDelPase(slug: string): Promise<EstadoPase> {
  const base = ESTADOS[slug] ?? ESTADOS['pasion-a-domicilio']
  return {
    ...base,
    timezone: ZONA,
    hasAccount: false,
    serverNow: RELOJ_FIJO,
  }
}

/** Etiqueta legible del estado que demuestra cada serie. Solo para el índice del POC. */
export const estadoQueDemuestra = (slug: string) =>
  ({
    'pasion-a-domicilio': 'El Pase de la Noche está listo',
    'la-herencia-del-patriarca': 'Pase gastado · la cita de mañana',
    'la-enfermera-infiltrada': 'Con saldo · y el pase llega en 42 min',
  })[slug] ?? ''

/** Lo que costaría terminar la serie desde donde va el usuario. */
export const costoParaTerminar = (serie: Serie, desbloqueadoHasta: number) =>
  (serie.total - desbloqueadoHasta) * EPISODE_COST

export { CATALOGO, EPISODE_COST }
