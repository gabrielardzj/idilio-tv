/**
 * El catálogo real de Idilio, medido el 25-ago-2026.
 *
 * No son series inventadas: son las 35 con muro que tiene el producto, con sus
 * cifras verdaderas de episodios totales y gratis. El censo completo está en
 * docs/00-dogfooding/catalogo.json y el script que lo levantó, al lado.
 *
 * Los tonos sí son míos: el POC no usa los pósters reales.
 */
export interface SerieCatalogo {
  id: string
  titulo: string
  total: number
  gratis: number
  tono: [string, string]
}

export const CATALOGO_SERIES: SerieCatalogo[] = [
  { id: 'el-hermanastro-enamorado', titulo: "El Hermanastro Enamorado", total: 74, gratis: 10, tono: ['#7B1E4B', '#2A0A1C'] },
  { id: 'mi-esposo-es-la-muerte', titulo: "Mi Esposo es la Muerte", total: 72, gratis: 10, tono: ['#1E3A5F', '#0A1420'] },
  { id: 'enamoradas-del-motociclista-mafioso', titulo: "Enamoradas del Motociclista Mafioso", total: 70, gratis: 10, tono: ['#2F5D50', '#0A1714'] },
  { id: 'esposa-del-playboy-billonario', titulo: "Esposa del Playboy Billonario", total: 70, gratis: 10, tono: ['#5C2E7E', '#1A0A28'] },
  { id: 'habia-una-vez-un-divorcio-la-doble-vid', titulo: "Había una Vez un Divorcio: La Doble Vida de Lady Diana", total: 70, gratis: 10, tono: ['#7A3A1E', '#2A1208'] },
  { id: 'rico-padre-pobre-madre', titulo: "Rico Padre Pobre Madre", total: 69, gratis: 10, tono: ['#1F4B4E', '#08191A'] },
  { id: 'la-herencia-del-patriarca-enamorado', titulo: "La Herencia del Patriarca Enamorado", total: 66, gratis: 7, tono: ['#6B1F2E', '#240A11'] },
  { id: 'la-enfermera-infiltrada', titulo: "La Enfermera Infiltrada", total: 65, gratis: 10, tono: ['#3A2A6B', '#120E24'] },
  { id: 'enamorandome-de-mi-guardian-prohibido', titulo: "Enamorándome de mi Guardián Prohibido", total: 64, gratis: 10, tono: ['#5E4A18', '#1F1806'] },
  { id: 'abrazame-fuerte-senor-bombero', titulo: "Abrázame Fuerte Señor Bombero", total: 62, gratis: 10, tono: ['#2B5A2E', '#0C1A0D'] },
  { id: 'mi-amante-secreto', titulo: "Mi Amante Secreto", total: 62, gratis: 10, tono: ['#6E2A5C', '#260E20'] },
  { id: 'la-venganza-de-la-abogada', titulo: "La Venganza de la Abogada", total: 61, gratis: 10, tono: ['#254A6E', '#0B1725'] },
  { id: 'enamorada-de-la-voz-del-lobo', titulo: "Enamorada de la Voz del Lobo", total: 60, gratis: 10, tono: ['#7B1E4B', '#2A0A1C'] },
  { id: 'quiero-a-mi-ex-fuera-de-mi-vida', titulo: "Quiero a mi Ex Fuera de mi Vida", total: 60, gratis: 10, tono: ['#1E3A5F', '#0A1420'] },
  { id: 'creo-que-mi-esposa-quiere-matarme', titulo: "Creo que mi esposa quiere matarme", total: 60, gratis: 10, tono: ['#2F5D50', '#0A1714'] },
  { id: 'pasion-a-domicilio', titulo: "Pasión a Domicilio", total: 56, gratis: 12, tono: ['#5C2E7E', '#1A0A28'] },
  { id: 'la-magica-navidad-del-amargado-millona', titulo: "La Mágica Navidad del Amargado Millonario", total: 51, gratis: 11, tono: ['#7A3A1E', '#2A1208'] },
  { id: 'apasionada-por-el-padre-de-mi-hijo-que', titulo: "Apasionada por el Padre de mi Hijo que no es mi Esposo", total: 50, gratis: 10, tono: ['#1F4B4E', '#08191A'] },
  { id: 'el-pecado-de-nuestro-amor', titulo: "El Pecado de Nuestro Amor", total: 50, gratis: 10, tono: ['#6B1F2E', '#240A11'] },
  { id: 'aun-eres-tu', titulo: "Aún Eres Tú", total: 50, gratis: 10, tono: ['#3A2A6B', '#120E24'] },
  { id: 'aun-sigues-siendo-tu', titulo: "Aún Sigues Siendo Tú", total: 50, gratis: 10, tono: ['#5E4A18', '#1F1806'] },
  { id: 'la-ninera-poderosa', titulo: "La Niñera Poderosa", total: 50, gratis: 10, tono: ['#2B5A2E', '#0C1A0D'] },
  { id: 'mi-apuesto-guardaespaldas', titulo: "Mi Apuesto Guardaespaldas", total: 50, gratis: 10, tono: ['#6E2A5C', '#260E20'] },
  { id: 'el-juego-de-la-herencia', titulo: "El Juego de la Herencia", total: 50, gratis: 10, tono: ['#254A6E', '#0B1725'] },
  { id: 'intenciones-ocultas', titulo: "Intenciones ocultas", total: 50, gratis: 10, tono: ['#7B1E4B', '#2A0A1C'] },
  { id: 'la-mas-hermosa-y-el-espejo', titulo: "La Más Hermosa y el Espejo", total: 49, gratis: 10, tono: ['#1E3A5F', '#0A1420'] },
  { id: 'buscando-a-mi-padre-me-enamore-de-mi-h', titulo: "Buscando a mi Padre me Enamoré de mi Hermano", total: 40, gratis: 10, tono: ['#2F5D50', '#0A1714'] },
  { id: 'milagro-de-amor-en-nochebuena', titulo: "Milagro de Amor en Nochebuena", total: 31, gratis: 10, tono: ['#5C2E7E', '#1A0A28'] },
  { id: 'mi-mejor-pasajera', titulo: "Mi Mejor Pasajera", total: 30, gratis: 10, tono: ['#7A3A1E', '#2A1208'] },
  { id: 'simona-la-libertadora-enamorada', titulo: "Simona la Libertadora Enamorada", total: 30, gratis: 10, tono: ['#1F4B4E', '#08191A'] },
  { id: 'mi-final-feliz', titulo: "Mi Final Feliz", total: 30, gratis: 10, tono: ['#6B1F2E', '#240A11'] },
  { id: 'la-bandida-que-me-amo', titulo: "La Bandida que me Amó", total: 30, gratis: 10, tono: ['#3A2A6B', '#120E24'] },
  { id: 'tres-meses-de-amor', titulo: "Tres Meses de Amor", total: 30, gratis: 10, tono: ['#5E4A18', '#1F1806'] },
  { id: 'somos-cuatro', titulo: "Somos Cuatro", total: 24, gratis: 10, tono: ['#2B5A2E', '#0C1A0D'] },
  { id: 'pasion-frente-a-los-colmillos-del-cond', titulo: "Pasión Frente a los Colmillos del Conde", total: 21, gratis: 10, tono: ['#6E2A5C', '#260E20'] },
]

export const porId = (id: string) => CATALOGO_SERIES.find((s) => s.id === id)
