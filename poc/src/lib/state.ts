import { EPISODE_COST, HORA_HABITUAL, MAX_PASSES, MAX_SHIELDS, NIGHT_BOUNDARY_HOUR, PASS_COOLDOWN_MS, STREAK } from './economy'
import { SERIES, type SeriesId } from './content'

export type Sheet =
  | { kind: 'none' }
  | { kind: 'unlock' }            // el muro
  | { kind: 'pass-choice' }       // ¿a qué serie le doy el pase de esta noche?
  | { kind: 'store' }             // paquetes
  | { kind: 'streak' }            // detalle de la racha
  | { kind: 'account' }           // guardar racha + saldo
  | { kind: 'unlocked'; via: 'pass' | 'coins'; ep: number }

export interface State {
  balance: number
  nights: number                  // noches consecutivas
  shields: number                 // comodines
  shieldJustUsed: boolean
  streakJustBroke: boolean
  passes: number                  // 0..MAX_PASSES — se acumulan, no se pierden
  lastNight: string | null        // última noche en que se acreditó (YYYY-MM-DD)
  passNextAt: number | null       // epoch ms del próximo pase; null si está al tope
  now: number
  seriesId: SeriesId
  unlocked: Record<SeriesId, number>
  episode: number
  remind: boolean
  hasAccount: boolean
  accountAsked: boolean
  toast: string | null
}

export const initialState = (now: number): State => ({
  balance: 0,
  nights: 2,
  shields: 0,
  shieldJustUsed: false,
  streakJustBroke: false,
  passes: 1,
  lastNight: nocheDe(now),
  passNextAt: null,
  now,
  seriesId: 'pasion',
  unlocked: { pasion: 12, herencia: 18, enfermera: 12 },
  episode: 12,
  remind: false,
  hasAccount: false,
  accountAsked: false,
  toast: null,
})

export type Action =
  | { t: 'tick'; now: number }
  | { t: 'open'; sheet: Sheet }
  | { t: 'close' }
  | { t: 'hitWall'; ep: number }
  | { t: 'claimPass'; series: SeriesId }
  | { t: 'unlockWithCoins' }
  | { t: 'buy'; coins: number; usd: number }
  | { t: 'toggleRemind' }
  | { t: 'createAccount' }
  | { t: 'dismissAccount' }
  | { t: 'nextEpisode' }
  | { t: 'switchSeries'; series: SeriesId }
  | { t: 'devSetState'; patch: Partial<State> }
  | { t: 'devNextNight'; attended: boolean }
  | { t: 'toast'; msg: string | null }

export interface Ctx { state: State; sheet: Sheet }

export function reduce(ctx: Ctx, a: Action): Ctx {
  const s = ctx.state
  switch (a.t) {
    case 'tick':
      // El reloj ya no acredita nada: solo mueve la hora. La acreditación
      // ocurre al terminar un episodio, en 'nextEpisode'.
      return { ...ctx, state: { ...s, now: a.now } }

    case 'open':
      return { ...ctx, sheet: a.sheet }

    case 'close':
      return { ...ctx, sheet: { kind: 'none' } }

    case 'hitWall':
      return {
        ...ctx,
        sheet: { kind: 'unlock' },
        state: { ...s, episode: a.ep },
      }

    case 'claimPass': {
      // Gastar el pase ya no avanza la racha: eso pasó al terminar el episodio.
      // Aquí solo se descuenta el pase y se abre el episodio.
      if (s.passes < 1) return ctx
      const targetEp = s.unlocked[a.series] + 1
      const passes = s.passes - 1
      return {
        state: {
          ...s,
          passes,
          passNextAt: passes < MAX_PASSES ? proximaCita(s.now) : null,
          seriesId: a.series,
          episode: targetEp,
          unlocked: { ...s.unlocked, [a.series]: targetEp },
        },
        sheet: { kind: 'unlocked', via: 'pass', ep: targetEp },
      }
    }

    case 'unlockWithCoins': {
      if (s.balance < EPISODE_COST) return { ...ctx, sheet: { kind: 'store' }, state: { ...s } }
      const ep = s.unlocked[s.seriesId] + 1
      return {
        state: {
          ...s,
          balance: s.balance - EPISODE_COST,
          episode: ep,
          unlocked: { ...s.unlocked, [s.seriesId]: ep }
        },
        sheet: { kind: 'unlocked', via: 'coins', ep },
      }
    }

    case 'buy':
      return {
        state: { ...s, balance: s.balance + a.coins, toast: `+${a.coins} monedas` },
        sheet: { kind: 'unlock' },
      }

    case 'toggleRemind':
      return { ...ctx, state: { ...s, remind: !s.remind, toast: s.remind ? null : 'Te avisamos cuando llegue' } }

    case 'createAccount':
      return { state: { ...s, hasAccount: true, accountAsked: true, toast: 'Racha y monedas guardadas' }, sheet: { kind: 'none' } }

    case 'dismissAccount':
      return { state: { ...s, accountAsked: true }, sheet: { kind: 'none' } }

    case 'nextEpisode': {
      // Terminar un episodio es lo que acredita la noche. No hay nada que
      // reclamar: la fuente deja de ser un destino y pasa a ser una consecuencia
      // de lo que el usuario ya vino a hacer.
      const acreditado = acreditarNoche(s)
      const next = acreditado.episode + 1
      if (next > acreditado.unlocked[acreditado.seriesId]) {
        return reduce({ ...ctx, state: acreditado }, { t: 'hitWall', ep: next })
      }
      return { ...ctx, sheet: { kind: 'none' }, state: { ...acreditado, episode: next } }
    }

    case 'switchSeries':
      return { ...ctx, state: { ...s, seriesId: a.series, episode: s.unlocked[a.series] } }

    case 'devSetState':
      return { ...ctx, state: { ...s, ...a.patch } }

    case 'devNextNight': {
      // Avanza el reloj una noche. Si volvió, se acredita al ver; si no, la
      // noche siguiente encuentra un hueco y se consume el comodín.
      const now = s.now + PASS_COOLDOWN_MS + 1000
      if (a.attended) return { ...ctx, state: acreditarNoche({ ...s, now }) }
      const saltada = { ...s, now, lastNight: nocheDe(now - PASS_COOLDOWN_MS * 2) }
      return { ...ctx, state: acreditarNoche(saltada) }
    }

    case 'toast':
      return { ...ctx, state: { ...s, toast: a.msg } }
  }
}

/** Nombre legible del estado actual. Derivado, no almacenado: si fuera estado
 *  se desincronizaría cada vez que el reloj acredita un pase por su cuenta. */
export function stateName(s: State, sheet: Sheet): string {
  switch (sheet.kind) {
    case 'unlock':
      if (s.streakJustBroke) return 'wall-streak-broken'
      if (s.passes >= MAX_PASSES) return 'wall-passes-capped'
      if (s.passes > 0) return 'wall-pass-ready'
      if (s.balance >= EPISODE_COST) return 'wall-with-balance'
      return 'wall-pass-spent'
    case 'pass-choice': return 'pass-choice'
    case 'store': return 'store'
    case 'streak': return 'streak-detail'
    case 'account': return 'account-prompt'
    case 'unlocked': return `unlocked-via-${sheet.via}`
    default: return 'player-free'
  }
}

/**
 * La noche del usuario, en su zona horaria, con corte a las 5 a.m.
 * El 54% de las sesiones caen entre 11pm y 2am: con corte a medianoche, ver el
 * martes a las 23:40 y el miércoles a las 00:20 contaría como una sola visita.
 */
export function nocheDe(ms: number): string {
  const d = new Date(ms)
  if (d.getHours() < NIGHT_BOUNDARY_HOUR) d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** La cita: mañana a la hora en que este usuario suele ver, no +24 h desde ahora. */
export function proximaCita(now: number): number {
  const d = new Date(now)
  const h = Math.floor(HORA_HABITUAL)
  const m = Math.round((HORA_HABITUAL - h) * 60)
  d.setHours(h, m, 0, 0)
  if (d.getTime() <= now) d.setDate(d.getDate() + 1)
  return d.getTime()
}

/**
 * Acredita la noche si es nueva: avanza la racha, entrega el pase y paga el
 * bono. Si se saltó noches, consume el comodín; si no queda, la racha se corta.
 * Es idempotente dentro de una misma noche.
 */
function acreditarNoche(s: State): State {
  const noche = nocheDe(s.now)
  if (s.lastNight === noche) return s

  const consecutiva = s.lastNight === nocheDe(s.now - PASS_COOLDOWN_MS)
  let nights = s.nights
  let shields = s.shields
  let shieldJustUsed = false
  let streakJustBroke = false

  if (consecutiva || s.lastNight === null) {
    nights = Math.min(nights + 1, 7)
  } else if (shields > 0) {
    shields -= 1
    shieldJustUsed = true
    nights = Math.min(nights + 1, 7)
  } else {
    nights = 1
    streakJustBroke = true
  }

  const reward = STREAK[nights - 1]
  const passes = Math.min(s.passes + 1, MAX_PASSES)

  // Acreditar en silencio dejaría el metajuego invisible — que es exactamente
  // el defecto que este diseño corrige. El acuse es un toast de 2 s en el
  // player: entera sin interrumpir y sin pedir nada.
  const partes = [`Noche ${nights}`, passes > s.passes ? '+1 pase' : null,
                  reward.coins ? `+${reward.coins} monedas` : null].filter(Boolean)

  return {
    ...s,
    lastNight: noche,
    toast: streakJustBroke ? `Empiezas de nuevo · ${partes.join(' · ')}`
         : shieldJustUsed  ? `Tu comodín te cubrió · ${partes.join(' · ')}`
         : partes.join(' · '),
    nights,
    shields: Math.min(shields + (reward.shield ? 1 : 0), MAX_SHIELDS),
    shieldJustUsed,
    streakJustBroke,
    passes,
    passNextAt: passes < MAX_PASSES ? proximaCita(s.now) : null,
    balance: s.balance + reward.coins,
  }
}

export const seriesOf = (id: SeriesId) => SERIES[id]
