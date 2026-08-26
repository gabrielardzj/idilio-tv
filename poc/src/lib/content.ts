export type SeriesId = 'pasion' | 'herencia' | 'enfermera'

export interface Episode {
  n: number
  title: string
  /** gancho que se muestra en el muro: el cliffhanger que quedó abierto */
  cliff: string
}

export interface Series {
  id: SeriesId
  title: string
  total: number
  free: number
  /** posición del usuario: último episodio desbloqueado */
  unlockedThrough: number
  hue: [string, string]
  episodes: Record<number, Episode>
}

/** Tres series reales del catálogo, con sus cifras medidas el 25-ago-2026.
 *  Se eligieron para que el POC muestre las tres estructuras que existen:
 *  la moda (10 gratis), una excepción por arriba (12) y una por abajo (7). */
export const SERIES: Record<SeriesId, Series> = {
  pasion: {
    id: 'pasion',
    title: 'Pasión a Domicilio',
    total: 56,
    free: 12,         // excepción: la serie con más gratis del catálogo
    unlockedThrough: 12,
    hue: ['#7B1E4B', '#2A0A1C'],
    episodes: {
      12: { n: 12, title: 'Lo que vio el portero', cliff: 'Camila abre la puerta y el que está del otro lado no es Andrés.' },
      13: { n: 13, title: 'Chispa y Pantalla', cliff: 'El teléfono de Andrés se ilumina en la mesa. El nombre en la pantalla es el de Camila.' },
      14: { n: 14, title: 'La llamada de las 3 a.m.', cliff: 'La voz al otro lado dice: «Yo estuve ahí esa noche».' },
      15: { n: 15, title: 'Sin coartada', cliff: 'El portero declara que esa noche nadie entró al edificio.' },
    },
  },
  herencia: {
    id: 'herencia',
    title: 'La Herencia del Patriarca Enamorado',
    total: 66,
    free: 7,          // la serie con menos gratis de todo el catálogo
    unlockedThrough: 18,
    hue: ['#1E3A5F', '#0A1420'],
    episodes: {
      18: { n: 18, title: 'El testamento falso', cliff: 'La firma del notario no coincide con la del documento.' },
      19: { n: 19, title: 'Sangre en el estudio', cliff: 'La caja fuerte estaba abierta desde antes del velorio.' },
      20: { n: 20, title: 'El heredero que faltaba', cliff: 'Hay un cuarto nombre en el acta y nadie lo había leído.' },
    },
  },
  enfermera: {
    id: 'enfermera',
    title: 'La Enfermera Infiltrada',
    total: 65,
    free: 10,         // la moda del catálogo
    unlockedThrough: 12,
    hue: ['#2F5D50', '#0A1714'],
    episodes: {
      12: { n: 12, title: 'Turno de noche', cliff: 'El paciente de la 304 sabe su nombre real.' },
      13: { n: 13, title: 'Historia clínica', cliff: 'En la carpeta hay una foto suya de hace diez años.' },
      14: { n: 14, title: 'Código azul', cliff: 'Alguien desconectó el monitor desde adentro.' },
    },
  },
}
