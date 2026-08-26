import { CATALOGO_SERIES, type SerieCatalogo } from '../lib/catalogo'
import { EPISODE_COST, episodesLabel } from '../lib/economy'
import { enCurso, type State } from '../lib/state'
import { posterStyle } from '../lib/frame'
import { Coin, Logo } from './Icons'

/**
 * Home.
 *
 * Existe por una razón concreta: sin ella, el muro se juzga en el vacío. Hay que
 * llegar a él como se llega de verdad — eligiendo una serie, viendo un rato y
 * chocando— para que la propuesta se pueda evaluar.
 *
 * Reproduce el chasis del producto real (chip de saldo arriba, rieles
 * horizontales, tab bar de tres) con dos diferencias que SON la propuesta:
 * el chip de saldo lleva su traducción a episodios, y la pestaña "Recompensas"
 * ya no existe — su contenido se mudó al muro.
 */
export function Home({
  state, onSerie, onWallet,
}: { state: State; onSerie: (id: string) => void; onWallet: () => void }) {
  const siguiendo = enCurso(state)
  const idsEnCurso = new Set(siguiendo.map((s) => s.id))
  const estrenos = CATALOGO_SERIES.filter((s) => !idsEnCurso.has(s.id)).slice(0, 8)
  const masVisto = CATALOGO_SERIES.filter((s) => !idsEnCurso.has(s.id)).slice(8, 16)

  return (
    <div className="home">
      <header className="home-top">
        <Logo s={22} />
        <button className="wallet" onClick={onWallet} aria-label={`Saldo: ${state.balance} monedas, ${episodesLabel(state.balance)}`}>
          <Coin s={19} />
          <span>
            <span className="wallet-n">{state.balance}</span>
            <span className="wallet-eps" style={{ display: 'block', marginTop: -3 }}>
              {state.balance >= EPISODE_COST ? episodesLabel(state.balance) : 'sin episodios'}
            </span>
          </span>
        </button>
      </header>

      <div className="home-scroll">
        {siguiendo.length > 0 && (
          <Riel titulo="Seguir viendo" series={siguiendo} state={state} onSerie={onSerie} continuar />
        )}
        <Riel titulo="Estrenos" series={estrenos} state={state} onSerie={onSerie} />
        <Riel titulo="Lo más visto" series={masVisto} state={state} onSerie={onSerie} />

        <p className="home-nota">
          {CATALOGO_SERIES.length} series reales del catálogo de Idilio, con sus cifras medidas.
        </p>
      </div>

      {/* Tab bar de dos, no de tres. La pestaña Recompensas se eliminó a
          propósito: su contenido vive ahora en el muro, que es donde el 100%
          de los usuarios pasa. Es la intervención, dicha en la navegación. */}
      <nav className="tabbar" aria-label="Navegación principal">
        <span className="tab on"><Icono d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8.5Z" /> Inicio</span>
        <span className="tab"><Icono d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5a7.5 7.5 0 0 1 15 0" /> Perfil</span>
      </nav>
    </div>
  )
}

const Icono = ({ d }: { d: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Riel({
  titulo, series, state, onSerie, continuar,
}: {
  titulo: string; series: SerieCatalogo[]; state: State
  onSerie: (id: string) => void; continuar?: boolean
}) {
  return (
    <section className="riel">
      <h2>{titulo}</h2>
      <div className="riel-row">
        {series.map((s) => {
          const va = state.vistos[s.id] ?? 0
          const pct = Math.round((va / s.total) * 100)
          return (
            <button key={s.id} className="poster" onClick={() => onSerie(s.id)}>
              <span className="poster-art" style={posterStyle(s.tono, s.total)}>
                <span className="poster-tag">{s.total} eps</span>
              </span>
              <span className="poster-t">{s.titulo}</span>
              {continuar ? (
                <>
                  <span className="poster-sub">Ep. {va} de {s.total}</span>
                  <span className="poster-bar"><i style={{ width: `${pct}%` }} /></span>
                </>
              ) : (
                <span className="poster-sub">{s.gratis} episodios gratis</span>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
