import { useState } from 'react'
import { Coin, Pass, Shield, X } from './Icons'
import { StreakStrip } from './bits'
import { frameStyle } from '../lib/frame'
import { EPISODE_COST, MAX_PASSES, PACKS, STREAK, episodesLabel, packThatCompletes, pricePerEpisode, toEpisodes } from '../lib/economy'
import { desbloqueadoDe, enCurso, serieDe, type State } from '../lib/state'

/* ═══ Elección del pase ═══════════════════════════════════════
   Es el corazón pedagógico de la intervención. Al obligar a elegir
   entre dos series, el usuario tiene que razonar sobre una economía
   con recurso escaso. Aprende el sistema usándolo, no leyéndolo. */
export function PassChoice({
  state, onPick, onClose,
}: { state: State; onPick: (s: string) => void; onClose: () => void }) {
  const [sel, setSel] = useState<string>(state.seriesId)
  // Antes esto listaba solo las tres series con guion. Si el usuario venía
  // viendo otra del catálogo, no podía darle el pase a la historia que le
  // importaba — que es justo la elección que esta pantalla existe para pedir.
  // La serie del muro va SIEMPRE primera y siempre está: es la que el usuario
  // tiene delante y la que `sel` trae por defecto. Ordenar solo por progreso la
  // dejaba fuera del corte y la hoja abría sin ninguna opción marcada.
  const active = [state.seriesId, ...enCurso(state).map((c) => c.id).filter((id) => id !== state.seriesId)].slice(0, 4)

  return (
    <div className="sheet" role="dialog" aria-label="Elegir serie para el pase">
      <div className="grab" />
      <button className="sheet-close" onClick={onClose} aria-label="Cerrar"><X /></button>

      <div className="cliff">
        <div className="kicker">Pase de la Noche</div>
        <h2>¿A cuál le das el pase?</h2>
        {/* Esta línea decía «El que no uses hoy no se acumula», que es la regla
            vieja — el "úsalo o piérdelo" que §3.4bis documenta como el error de
            Webtoon y que esta mecánica corrigió. Sobrevivió a la corrección
            porque el texto de la UI no lo probaba nadie. Ahora sale del estado. */}
        <p>
          {state.passes >= MAX_PASSES
            ? `Tienes ${state.passes} pases: estás en el tope. El próximo empieza a acumularse cuando uses uno.`
            : 'Tienes un pase. Si no lo usas hoy no se pierde — se guardan hasta dos.'}
        </p>
      </div>

      {active.map((id) => {
        const s = serieDe(id)
        const next = desbloqueadoDe(state, id) + 1
        return (
          <button key={id} className={`choice ${sel === id ? 'sel' : ''}`} onClick={() => setSel(id)} aria-pressed={sel === id}>
            <div className="thumb" style={frameStyle(s.hue, next)} />
            <div className="choice-body">
              <b>{s.title}</b>
              <div className="next">Abre el episodio {next}</div>
              <div className="prog">Vas {desbloqueadoDe(state, id)} de {s.total} · quedan {s.total - desbloqueadoDe(state, id)}</div>
            </div>
            <div className="radio" />
          </button>
        )
      })}

      <button className="btn btn-gold" style={{ marginTop: 12 }} onClick={() => onPick(sel)}>
        <Pass s={20} /> Usar el pase aquí
      </button>
    </div>
  )
}

/* ═══ Tienda ══════════════════════════════════════════════════
   Jerarquía invertida a propósito: EPISODIOS primero, monedas como
   subtítulo, precio a la derecha. El usuario compra episodios. */
export function Store({
  state, onBuy, onClose,
}: { state: State; onBuy: (coins: number, usd: number) => void; onClose: () => void }) {
  const missing = Math.max(0, EPISODE_COST - state.balance)
  const serie = serieDe(state.seriesId)
  const restantes = serie.total - desbloqueadoDe(state, state.seriesId)
  const paraTerminar = restantes * EPISODE_COST
  const completa = packThatCompletes(paraTerminar - state.balance)
  return (
    <div className="sheet" role="dialog" aria-label="Conseguir monedas">
      <div className="grab" />
      <button className="sheet-close" onClick={onClose} aria-label="Cerrar"><X /></button>

      <div className="cliff">
        <div className="kicker">Monedas</div>
        <h2>{missing > 0 ? `Te faltan ${missing} monedas` : 'Consigue monedas'}</h2>
        <p>1 episodio = {EPISODE_COST} monedas. Tienes {state.balance} · {episodesLabel(state.balance)}.</p>
      </div>

      {/* La meta concreta, calculada contra la serie que está viendo */}
      <div className="goal">
        <span>Para terminar <b>{serie.title}</b></span>
        <span className="goal-n">{restantes} episodios · {paraTerminar} monedas</span>
      </div>

      {PACKS.map((p) => (
        <button key={p.id} className={`pack ${p.id === completa ? 'best' : ''} ${p.intro ? 'intro' : ''}`} onClick={() => onBuy(p.coins, p.usd)}>
          {p.id === completa
            ? <span className="pack-tag">Termina esta serie</span>
            : p.tag && <span className="pack-tag">{p.tag}</span>}
          <Coin s={30} />
          <div className="pack-body">
            <div className="pack-eps">{toEpisodes(p.coins)} episodios</div>
            <div className="pack-coins">
              {p.coins} monedas · <b style={{ color: 'var(--gold-300)', fontWeight: 700 }}>${pricePerEpisode(p.coins, p.usd)} por episodio</b>
            </div>
          </div>
          <div className="pack-price">${p.usd.toFixed(2)}</div>
        </button>
      ))}

      <p style={{ fontSize: 11.5, color: 'var(--tx-lo)', lineHeight: 1.5, marginTop: 14, textAlign: 'center' }}>
        Fuera de la oferta de bienvenida, cada paquete baja el precio por episodio.
        Sin descuentos permanentes ni precios tachados que nunca existieron.
      </p>
    </div>
  )
}

/* ═══ Celebración ═════════════════════════════════════════════ */
export function Celebrate({
  state, via, ep, onWatch, justAdvanced,
}: { state: State; via: 'pass' | 'coins'; ep: number; onWatch: () => void; justAdvanced: boolean }) {
  return (
    <div className="sheet" role="dialog" aria-label="Episodio desbloqueado">
      <div className="grab" />
      <div className="celebrate">
        <div className="medal">{via === 'pass' ? <Pass s={38} /> : <Coin s={38} />}</div>
        <h2>Episodio {ep} desbloqueado</h2>
        <p>
          {via === 'pass'
            ? <>Usaste tu Pase de la Noche. El próximo llega en 24 horas.</>
            : <>Pagaste {EPISODE_COST} monedas. Te quedan {state.balance} · {episodesLabel(state.balance)}.</>}
        </p>

        {via === 'pass' && (
          <div className="reward-line">
            <Shield s={17} c="#3FE0D0" /> Vas por la noche {state.nights}
            {state.shields > 0 && ' · tienes 1 comodín'}
          </div>
        )}
      </div>

      {via === 'pass' && (
        <div style={{ marginBottom: 16 }}>
          <StreakStrip nights={state.nights} shields={state.shields} shieldJustUsed={false} justAdvanced={justAdvanced} />
        </div>
      )}

      <button className="btn btn-violet" onClick={onWatch}>Ver el episodio {ep}</button>
    </div>
  )
}

/* ═══ Cuenta ══════════════════════════════════════════════════
   No hay muro de registro. La cuenta se ofrece una sola vez y solo
   cuando el invitado ya tiene algo que perder. */
export function AccountPrompt({
  state, onCreate, onSkip,
}: { state: State; onCreate: () => void; onSkip: () => void }) {
  return (
    <div className="sheet" role="dialog" aria-label="Guardar tu progreso">
      <div className="grab" />
      <div className="cliff">
        <div className="kicker">Antes de que se te pierda</div>
        <h2>Tienes algo que guardar</h2>
        <p>Sin cuenta, esto vive solo en este teléfono. Si lo cambias o borras la app, se va.</p>
      </div>

      <div className="stakes">
        <div className="stake cyan">
          <div className="v">{state.nights}</div>
          <div className="l">noches de racha</div>
        </div>
        <div className="stake gold">
          <div className="v">{state.balance}</div>
          <div className="l">monedas · {toEpisodes(state.balance)} eps</div>
        </div>
        <div className="stake">
          <div className="v">{state.shields}</div>
          <div className="l">comodín</div>
        </div>
      </div>

      <button className="btn btn-violet" onClick={onCreate}>Guardar con mi correo</button>
      <button className="btn btn-text" onClick={onSkip} style={{ marginTop: 6 }}>Ahora no</button>
      <p style={{ fontSize: 11.5, color: 'var(--tx-lo)', textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>
        Solo el correo. Nada de contraseña ni de perfil.
      </p>
    </div>
  )
}

/* ═══ Detalle de racha (desde el chip de saldo) ═══════════════ */
export function StreakSheet({ state, onClose }: { state: State; onClose: () => void }) {
  // Todo lo de esta pantalla se cuenta dentro de la vuelta de 7 noches, que es
  // el ciclo de la escalera. Y el total es la SUMA DE LO QUE LISTA: antes valía
  // los pases por `nights` mientras la línea de arriba decía otra cosa, así que
  // los dos sumandos daban 0 y el total 30. En la pantalla que existe para
  // explicar la economía, un usuario puede hacer esa resta.
  const week = STREAK.slice(0, Math.max(state.nights, 1))
  const bonos = week.reduce((a, n) => a + n.coins, 0)
  const valorPases = state.passesUsed * EPISODE_COST
  const earned = bonos + valorPases
  return (
    <div className="sheet" role="dialog" aria-label="Tu economía">
      <div className="grab" />
      <button className="sheet-close" onClick={onClose} aria-label="Cerrar"><X /></button>
      <div className="cliff">
        <div className="kicker">Tu economía</div>
        <h2>{state.balance} monedas</h2>
        <p>Te alcanzan para {episodesLabel(state.balance)}. Cada episodio cuesta {EPISODE_COST}.</p>
      </div>
      <StreakStrip nights={state.nights} shields={state.shields} shieldJustUsed={state.shieldJustUsed} />
      <div className="sect-label">De dónde salen tus monedas</div>
      <div className="streak">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 9 }}>
          <span style={{ color: 'var(--tx-mid)' }}>Pases usados en esta vuelta</span>
          <b>{state.passesUsed} · {valorPases} monedas de valor</b>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 9 }}>
          <span style={{ color: 'var(--tx-mid)' }}>Bonos de esta vuelta</span>
          <b>+{bonos} monedas</b>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,.08)', margin: '11px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5 }}>
          <span>Total ganado sin pagar</span>
          <b style={{ color: 'var(--gold-300)' }}>{earned} monedas · {toEpisodes(earned)} eps</b>
        </div>
      </div>
    </div>
  )
}
