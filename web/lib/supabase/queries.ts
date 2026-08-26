import { CATALOGO, EPISODE_COST } from '@/lib/economy'

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
}

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

export async function estadoDelPase(): Promise<EstadoPase> {
  // select accrue_passes(v); select * from pass_state where viewer_id = v
  return {
    passes: 1,
    nextPassAt: null,
    nights: 2,
    shields: 0,
    balance: 0,
    timezone: 'America/Mexico_City',
    hasAccount: false,
  }
}

/** Lo que costaría terminar la serie desde donde va el usuario. */
export const costoParaTerminar = (serie: Serie, desbloqueadoHasta: number) =>
  (serie.total - desbloqueadoHasta) * EPISODE_COST

export { CATALOGO, EPISODE_COST }
