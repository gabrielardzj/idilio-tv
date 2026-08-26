import { EPISODE_COST, MAX_SHIELDS, PASS_COOLDOWN_MS, STREAK } from './economy'
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
  passReady: boolean
  passNextAt: number | null       // epoch ms
  now: number
  seriesId: SeriesId
  unlocked: Record<SeriesId, number>
  episode: number
  remind: boolean
  hasAccount: boolean
  accountAsked: boolean
  toast: string | null
  /** para el export tipo Mobbin: nombre legible del estado actual */
  stateName: string
}

export const initialState = (now: number): State => ({
  balance: 0,
  nights: 2,
  shields: 0,
  shieldJustUsed: false,
  passReady: true,
  passNextAt: null,
  now,
  seriesId: 'pasion',
  unlocked: { pasion: 12, herencia: 18, enfermera: 12 },
  episode: 12,
  remind: false,
  hasAccount: false,
  accountAsked: false,
  toast: null,
  stateName: 'player-free',
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
    case 'tick': {
      const now = a.now
      // el pase se rehabilita solo cuando vence el cooldown
      if (!s.passReady && s.passNextAt && now >= s.passNextAt) {
        return { ...ctx, state: { ...s, now, passReady: true, passNextAt: null } }
      }
      return { ...ctx, state: { ...s, now } }
    }

    case 'open':
      return { ...ctx, sheet: a.sheet, state: { ...s, stateName: sheetName(a.sheet, s) } }

    case 'close':
      return { ...ctx, sheet: { kind: 'none' }, state: { ...s, stateName: 'player-free' } }

    case 'hitWall':
      return {
        ...ctx,
        sheet: { kind: 'unlock' },
        state: { ...s, episode: a.ep, stateName: sheetName({ kind: 'unlock' }, s) },
      }

    case 'claimPass': {
      if (!s.passReady) return ctx
      const nights = Math.min(s.nights + 1, 7)
      const reward = STREAK[nights - 1]
      const shields = Math.min(s.shields + (reward.shield ? 1 : 0), MAX_SHIELDS)
      const targetEp = s.unlocked[a.series] + 1
      return {
        state: {
          ...s,
          passReady: false,
          passNextAt: s.now + PASS_COOLDOWN_MS,
          nights,
          shields,
          shieldJustUsed: false,
          balance: s.balance + reward.coins,
          seriesId: a.series,
          episode: targetEp,
          unlocked: { ...s.unlocked, [a.series]: targetEp },
          stateName: 'unlocked-via-pass',
        },
        sheet: { kind: 'unlocked', via: 'pass', ep: targetEp },
      }
    }

    case 'unlockWithCoins': {
      if (s.balance < EPISODE_COST) return { ...ctx, sheet: { kind: 'store' }, state: { ...s, stateName: 'store-insufficient' } }
      const ep = s.unlocked[s.seriesId] + 1
      return {
        state: {
          ...s,
          balance: s.balance - EPISODE_COST,
          episode: ep,
          unlocked: { ...s.unlocked, [s.seriesId]: ep },
          stateName: 'unlocked-via-coins',
        },
        sheet: { kind: 'unlocked', via: 'coins', ep },
      }
    }

    case 'buy':
      return {
        state: { ...s, balance: s.balance + a.coins, toast: `+${a.coins} monedas`, stateName: 'unlock-with-balance' },
        sheet: { kind: 'unlock' },
      }

    case 'toggleRemind':
      return { ...ctx, state: { ...s, remind: !s.remind, toast: s.remind ? null : 'Te avisamos cuando llegue' } }

    case 'createAccount':
      return { state: { ...s, hasAccount: true, accountAsked: true, toast: 'Racha y monedas guardadas', stateName: 'player-free' }, sheet: { kind: 'none' } }

    case 'dismissAccount':
      return { state: { ...s, accountAsked: true, stateName: 'player-free' }, sheet: { kind: 'none' } }

    case 'nextEpisode': {
      const next = s.episode + 1
      if (next > s.unlocked[s.seriesId]) return reduce(ctx, { t: 'hitWall', ep: next })
      return { ...ctx, sheet: { kind: 'none' }, state: { ...s, episode: next, stateName: 'player-free' } }
    }

    case 'switchSeries':
      return { ...ctx, state: { ...s, seriesId: a.series, episode: s.unlocked[a.series], stateName: 'player-free' } }

    case 'devSetState':
      return { ...ctx, state: { ...s, ...a.patch } }

    case 'devNextNight': {
      // avanza el reloj 24 h. Si no volvió, se consume el comodín (o se rompe la racha).
      const now = s.now + PASS_COOLDOWN_MS + 1000
      if (a.attended) return { ...ctx, state: { ...s, now, passReady: true, passNextAt: null, shieldJustUsed: false } }
      if (s.shields > 0) {
        return { ...ctx, state: { ...s, now, passReady: true, passNextAt: null, shields: s.shields - 1, shieldJustUsed: true, stateName: 'streak-shield-used' } }
      }
      return { ...ctx, state: { ...s, now, passReady: true, passNextAt: null, nights: 0, shieldJustUsed: false, stateName: 'streak-broken' } }
    }

    case 'toast':
      return { ...ctx, state: { ...s, toast: a.msg } }
  }
}

function sheetName(sheet: Sheet, s: State): string {
  switch (sheet.kind) {
    case 'unlock':
      if (s.passReady) return 'wall-pass-ready'
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

export const seriesOf = (id: SeriesId) => SERIES[id]
