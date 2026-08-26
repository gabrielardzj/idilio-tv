import { useState } from 'react'
import { CATALOGO_SERIES, RIELES_GENERO, type SerieCatalogo } from '../lib/catalogo'
import { EPISODE_COST, episodesLabel } from '../lib/economy'
import { enCurso, type State } from '../lib/state'
import { posterStyle } from '../lib/frame'
import { arteDe, portada, semilla } from '../lib/portada'
import { Coin, Logo } from './Icons'

/**
 * Home.
 *
 * Existe por una razón concreta: sin ella, el muro se juzga en el vacío. Hay que
 * llegar a él como se llega de verdad — eligiendo una serie, viendo un rato y
 * chocando— para que la propuesta se pueda evaluar.
 *
 * Reproduce el chasis del producto real: los pósters de verdad del catálogo
 * —con su título y su sello quemados en el arte—, rieles de género con el mismo
 * orden que la app (Estrenos → Seguir viendo → Lo más visto → los géneros → la
 * selección) y la flecha de arrastre asomando en el borde derecho.
 *
 * Dos cosas se apartan de la app, y SON la propuesta: el chip de saldo lleva su
 * traducción a episodios, y la pestaña «Recompensas» ya no existe — su contenido
 * se mudó al muro.
 */
export function Home({
  state, onSerie, onWallet,
}: { state: State; onSerie: (id: string) => void; onWallet: () => void }) {
  const siguiendo = enCurso(state)
  // Estrenos y Lo más visto repiten series que ya están en curso, igual que en
  // la app: un riel es una vitrina, no una partición del catálogo.
  const estrenos = CATALOGO_SERIES.slice(0, 8)
  const masVisto = CATALOGO_SERIES.slice(8, 16)

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
        <Riel titulo="Estrenos" series={estrenos} state={state} onSerie={onSerie} />
        {siguiendo.length > 0 && (
          <Riel titulo="Seguir viendo" series={siguiendo} state={state} onSerie={onSerie} continuar />
        )}
        <Riel titulo="Lo más visto" series={masVisto} state={state} onSerie={onSerie} />
        {RIELES_GENERO.map((r) => (
          <Riel key={r.titulo} titulo={r.titulo} series={r.series} state={state} onSerie={onSerie} />
        ))}

        <p className="home-nota">
          Las {CATALOGO_SERIES.length} series con muro del catálogo real de Idilio, con sus cifras medidas.
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
      <div className="riel-body">
        <div className="riel-row">
          {series.map((s) => (
            <Poster key={s.id} s={s} state={state} onSerie={onSerie} continuar={continuar} />
          ))}
        </div>
        {/* La flecha del borde: en la app no es un botón, es el aviso de que
            el riel sigue. Por eso no recibe clics ni foco. */}
        <span className="riel-mas" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="m9.5 5.5 7 6.5-7 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </section>
  )
}

/** Una portada del riel: el póster real de la serie y —si está empezada— la
 *  barra de avance pegada al borde inferior.
 *
 *  Si el arte no carga, se cae a la portada compuesta: el degradado del tono
 *  con el título y el sello dibujados. No es un adorno defensivo — una serie
 *  recién estrenada puede no tener póster todavía, y ahí una miniatura en negro
 *  sería peor que una compuesta. */
function Poster({
  s, state, onSerie, continuar,
}: { s: SerieCatalogo; state: State; onSerie: (id: string) => void; continuar?: boolean }) {
  const [sinArte, setSinArte] = useState(false)
  const va = state.vistos[s.id] ?? 0
  const pct = Math.round((va / s.total) * 100)
  const sem = semilla(s.id)
  const p = portada(s.titulo, sem)

  return (
    <button
      className="poster"
      onClick={() => onSerie(s.id)}
      aria-label={continuar
        ? `${s.titulo}. Episodio ${va} de ${s.total}`
        : `${s.titulo}. ${s.gratis} episodios gratis de ${s.total}`}
    >
      <span className="poster-art" data-arte={!sinArte || undefined} style={posterStyle(s.tono, sem)}>
        {sinArte ? (
          <>
            <span className="poster-brand" aria-hidden="true"><Logo s={6} /><b>idilio</b><i>original</i></span>
            <span
              className="poster-tit" data-serif={p.serif || undefined}
              style={{ fontSize: p.tam }} aria-hidden="true"
            >
              {p.lineas.map((l, i) => (
                <span key={i} style={p.acento && i === p.lineas.length - 1 ? { color: p.acento } : undefined}>{l}</span>
              ))}
            </span>
          </>
        ) : (
          <img
            className="poster-img" src={arteDe(s.id)} alt="" aria-hidden="true"
            loading="lazy" decoding="async" onError={() => setSinArte(true)}
          />
        )}
        {/* La barra sale en cualquier riel donde aparezca una serie empezada,
            no solo en «Seguir viendo»: es la misma portada, y el avance viaja
            con ella. */}
        {va > 0 && <span className="poster-bar"><i style={{ width: `${pct}%` }} /></span>}
      </span>
    </button>
  )
}
