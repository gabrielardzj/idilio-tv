import { MAX_PASSES, NIGHT_BOUNDARY_HOUR, PASS_COOLDOWN_MS } from '@/lib/economy'
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
 * Acreditación perezosa: en vez de un cron por usuario, se calcula cuántos
 * pases le tocaban desde `nextPassAt` cada vez que se lee el estado.
 * Es lo mismo que hace accrue_passes() en Postgres, replicado para el fixture.
 */
export function resolverPase(estado: EstadoPase, ahora = estado.serverNow): VistaDelPase {
  let passes = estado.passes
  let next = estado.nextPassAt ? Date.parse(estado.nextPassAt) : null

  while (next !== null && passes < MAX_PASSES && ahora >= next) {
    passes += 1
    next = passes < MAX_PASSES ? next + PASS_COOLDOWN_MS : null
  }

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
