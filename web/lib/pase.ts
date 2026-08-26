import { HORA_HABITUAL, NIGHT_BOUNDARY_HOUR } from '@/lib/economy'
import type { EstadoPase } from '@/lib/supabase/queries'

/**
 * La lógica del Pase, resuelta en el SERVIDOR.
 *
 * Es el riesgo técnico nº 1 de la propuesta y por eso está aquí y no en un
 * componente de cliente: un countdown calculado en el navegador se vulnera
 * cambiando la hora del teléfono. El servidor decide, el cliente solo pinta
 * el delta contra `serverNow`.
 */

export interface VistaDelPase {
  /** cuántos pases tiene ahora, ya contando lo que se acreditó mientras no estaba */
  passes: number
  /** epoch ms del próximo pase; null si está en el tope */
  nextPassAt: number | null
  /** epoch ms del servidor. El cliente descuenta contra esto, no contra Date.now() */
  serverNow: number
  nights: number
  shields: number
  balance: number
  /** hora local del usuario a la que llega el próximo pase, ya formateada */
  listoA: { hora: string; esHoy: boolean } | null
}

/**
 * Resuelve la vista del pase.
 *
 * Ojo con lo que NO hace: acreditar. El pase se acredita al terminar un
 * episodio —`use_pass()` y el trigger de reproducción en schema.sql—, no con
 * un reloj. La diferencia es la que lleva la adopción de la fuente de 19% a
 * ~100%: no hay botón entre el usuario y algo que ya se ganó.
 *
 * `nextPassAt` sigue existiendo, pero solo como **la cita**: la hora de mañana
 * en que este usuario suele ver. No es un temporizador que dispara nada.
 */
export function resolverPase(estado: EstadoPase, ahora = estado.serverNow): VistaDelPase {
  const passes = estado.passes
  const next = estado.nextPassAt ? Date.parse(estado.nextPassAt) : null

  return {
    passes,
    nextPassAt: next,
    serverNow: ahora,
    nights: estado.nights,
    shields: estado.shields,
    balance: estado.balance,
    listoA: next === null ? null : formatearHora(next, ahora, estado.timezone),
  }
}

/**
 * La hora del reloj, no el intervalo.
 *
 * Decisión que salió de usar el prototipo: un contador de «17h 47m 03s» en
 * grande comunica «falta muchísimo», que es el mensaje opuesto al buscado.
 * Una hora concreta se puede agendar mentalmente; un intervalo largo solo se
 * puede sufrir. El countdown vuelve a ser el héroe cuando falta menos de una
 * hora, que es cuando los segundos sí importan.
 */
function formatearHora(cuando: number, ahora: number, tz: string) {
  const fmt = new Intl.DateTimeFormat('es-MX', {
    hour: 'numeric', minute: '2-digit', hour12: false, timeZone: tz,
  })
  const dia = (ms: number) =>
    new Intl.DateTimeFormat('es-MX', { day: 'numeric', timeZone: tz }).format(ms)

  return { hora: fmt.format(cuando), esHoy: dia(cuando) === dia(ahora) }
}

/**
 * En qué noche estamos, en la zona del usuario.
 *
 * La ventana corre de 5am a 5am. El 54% de las sesiones caen entre 11pm y 2am:
 * con corte a medianoche, ver el martes a las 23:40 y el miércoles a las 00:20
 * cuenta como una sola visita y el martes queda roto. Es la misma definición
 * que night_of() en schema.sql — y tiene que ser la misma, o el cliente y la
 * base van a discrepar sobre si la racha sigue viva.
 */
export function nocheDe(ms: number, tz: string): string {
  const partes = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', hour12: false, timeZone: tz,
  }).formatToParts(ms)
  const p = Object.fromEntries(partes.map((x) => [x.type, x.value]))
  const local = new Date(`${p.year}-${p.month}-${p.day}T00:00:00Z`)
  if (Number(p.hour) < NIGHT_BOUNDARY_HOUR) local.setUTCDate(local.getUTCDate() - 1)
  return local.toISOString().slice(0, 10)
}


/**
 * Desfase de `tz` respecto de UTC, en ms, en el instante `ms`.
 *
 * Existe porque `Date` no sabe operar en otra zona que la del proceso, y este
 * archivo entero se apoya en que la zona que manda es la **del espectador**.
 * `formatToParts` en 'en-CA' devuelve el reloj de pared de esa zona; leerlo
 * como si fuera UTC y restar da el desfase.
 */
function desfase(ms: number, tz: string): number {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }).formatToParts(ms).map((x) => [x.type, x.value]),
  )
  const pared = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second)
  return pared - Math.floor(ms / 1000) * 1000
}

/**
 * La cita: mañana a la hora en que este usuario suele ver.
 *
 * **Se calcula en la zona del espectador, no en la del proceso.** Un
 * `d.setHours(21, 30)` fija las 21:30 de la máquina que corre el código: en un
 * portátil con la zona correcta da 21:30 y parece bien; en un runner de CI, que
 * corre en UTC, da 21:30 UTC — o sea las 15:30 de Ciudad de México, que es la
 * zona con la que después se formatea. El sitio publicaría una cita a una hora
 * que el usuario no reconoce.
 *
 * Es exactamente el riesgo técnico nº 2 que la propuesta enumera —«la ventana
 * se calcula en la zona del usuario, nunca en UTC»— en el código que existe
 * para demostrar que se puede evitar.
 *
 * En producción sale de su historial de reproducción; aquí es una constante.
 * Anclar la cita a «+24 h desde el último uso» la deja caer a una hora
 * arbitraria, y una cita a una hora arbitraria no es una cita.
 */
export function proximaCita(now: number, tz: string): number {
  const h = Math.floor(HORA_HABITUAL)
  const m = Math.round((HORA_HABITUAL - h) * 60)

  const enLaZona = (ms: number) => {
    const d = new Date(ms + desfase(ms, tz))
    let objetivo = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), h, m, 0, 0)
    if (objetivo <= ms + desfase(ms, tz)) objetivo += 24 * 60 * 60 * 1000
    return objetivo
  }

  // Dos pasadas por el cambio de hora: si entre `now` y la cita hay salto de
  // horario de verano, el desfase con el que se calculó el objetivo no es el
  // que rige cuando la cita llega. Se recalcula con el desfase del destino.
  const paredObjetivo = enLaZona(now)
  const primera = paredObjetivo - desfase(now, tz)
  return paredObjetivo - desfase(primera, tz)
}
