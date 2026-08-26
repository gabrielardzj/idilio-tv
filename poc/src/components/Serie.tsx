import { porId } from '../lib/catalogo'
import { SINOPSIS } from '../lib/sinopsis'
import { EPISODE_COST, toEpisodes } from '../lib/economy'
import type { State } from '../lib/state'
import { posterStyle } from '../lib/frame'
import { arteDe, semilla } from '../lib/portada'
import { Back, Candado, Check, Chevron, Coin, Pass } from './Icons'

/**
 * Ficha de serie.
 *
 * El chasis es el de la app nativa, copiado de las capturas del producto: barra
 * «Volver», bloque «Resumen» con el póster a la izquierda y la sinopsis real al
 * lado, y debajo la lista de «Capítulos» —tarjeta gris, «Capítulo N» en violeta,
 * el número como título, la píldora «Interactiva» donde corresponde, candado en
 * los bloqueados y galón a la derecha—. Los colores están muestreados de las
 * capturas: tarjeta #1A1A1A, violeta #6D1EED, píldora #8C3CFD, galón #757575, y
 * los capítulos lejanos atenuados al 44%, que es lo que da el #0A0A0A del
 * producto sobre negro.
 *
 * Sobre ese chasis, y solo eso, va la propuesta. Son tres cosas, y las tres
 * responden a la misma pregunta que la ficha real deja sin contestar —cuánto
 * falta y cuánto cuesta—:
 *
 *   1 · dónde vas: el contador y la barra, arriba de la lista;
 *   2 · qué abre lo siguiente: el pase si lo tienes, el precio si no, dicho en
 *       la tarjeta del capítulo donde está el muro y no en una letra chica;
 *   3 · qué capítulos ya viste, marcados en la lista.
 *
 * Todo lo demás de esta pantalla es del producto tal como está hoy.
 */
export function Serie({
  id, state, onVolver, onEpisodio,
}: {
  id: string; state: State
  onVolver: () => void; onEpisodio: (n: number) => void
}) {
  const s = porId(id)
  if (!s) return null

  const va = state.vistos[id] ?? 0
  const desbloqueado = Math.max(va, s.gratis)
  const pct = Math.round((va / s.total) * 100)
  const restantes = s.total - desbloqueado
  const paraTerminar = restantes * EPISODE_COST
  const interactivos = new Set(s.interactivos ?? [])

  // Cuando el catálogo no trae sinopsis cargada, el sitio real repite el título
  // en su lugar. La ficha hace lo mismo en vez de inventar un resumen.
  const resumen = SINOPSIS[s.id] ?? s.titulo

  return (
    <div className="serie">
      <header className="serie-bar">
        <button className="serie-volver" onClick={onVolver} aria-label="Volver">
          <Back s={22} />
          <span>Volver</span>
        </button>
      </header>

      <div className="serie-scroll">
        {/* La ficha nativa no pone el título en ningún lado: va quemado en el
            arte del póster. Se conserva así, con el título solo para quien
            navega con lector de pantalla, que no ve el póster. */}
        <h1 className="oculto">{s.titulo}</h1>

        <section className="serie-resumen">
          <div
            className="serie-poster"
            role="img"
            aria-label={`Póster de ${s.titulo}`}
            style={{
              ...posterStyle(s.tono, semilla(s.id)),
              backgroundImage: `url(${arteDe(s.id)}), ${posterStyle(s.tono, semilla(s.id)).backgroundImage}`,
            }}
          />
          <div>
            <h2>Resumen</h2>
            <p>{resumen}</p>
          </div>
        </section>

        {/* ── La propuesta ─────────────────────────────────────────────── */}
        <section className="serie-avance">
          <div className="pp-row">
            <b>{va > 0 ? `Vas ${va} de ${s.total}` : 'Sin empezar'}</b>
            <span>{restantes > 0 ? `quedan ${restantes} por desbloquear` : 'completa'}</span>
          </div>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div>

          {state.passes > 0 ? (
            <div className="serie-pase">
              <Pass s={20} />
              <p>Tienes <b>{state.passes}</b> {state.passes === 1 ? 'Pase de la Noche' : 'Pases de la Noche'}. Abre el capítulo {desbloqueado + 1} sin pagar.</p>
            </div>
          ) : restantes > 0 ? (
            <div className="serie-meta">
              <span>Para terminarla</span>
              <b>{restantes} capítulos · {paraTerminar} monedas</b>
            </div>
          ) : null}
        </section>

        <section className="serie-caps">
          <h2>Capítulos</h2>
          <ol className="ep-lista">
            {Array.from({ length: s.total }, (_, i) => i + 1).map((n) => {
              const abierto = n <= desbloqueado
              const visto = n <= va
              const siguiente = va > 0 && n === va + 1 && abierto
              // El muro: el primer capítulo que hay que abrir. Es el único que
              // lleva precio o pase, porque es el único donde se decide.
              const muro = n === desbloqueado + 1
              return (
                <li key={n}>
                  <button
                    className={`ep ${abierto ? 'abierto' : 'cerrado'} ${visto ? 'visto' : ''} ${!abierto && !muro ? 'lejos' : ''}`}
                    onClick={() => onEpisodio(n)}
                    aria-label={
                      // Lo que oye quien no ve tiene que ser lo que dice la
                      // tarjeta: si el pase abre este capítulo, el precio no es
                      // la información.
                      abierto
                        ? `Capítulo ${n}${visto ? ', visto' : ''}`
                        : `Capítulo ${n}, bloqueado, ${muro && state.passes > 0 ? 'lo abre tu Pase de la Noche' : `${EPISODE_COST} monedas`}`
                    }
                  >
                    <span className="ep-txt">
                      <span className="ep-cap">
                        <b>Capítulo {n}</b>
                        {interactivos.has(n) && <em className="ep-badge">Interactiva</em>}
                      </span>
                      {/* El título del capítulo en el producto es su número:
                          estas series no titulan los episodios. */}
                      <span className="ep-n">{n}</span>
                      {siguiente && <span className="ep-marca">Seguir viendo</span>}
                      {muro && (
                        state.passes > 0
                          ? <span className="ep-precio pase"><Pass s={13} /> Con tu Pase de la Noche</span>
                          : <span className="ep-precio"><Coin s={13} /> {EPISODE_COST} monedas</span>
                      )}
                    </span>
                    {visto && <span className="ep-visto"><Check s={15} /></span>}
                    {!abierto && <span className="ep-lock"><Candado s={16} /></span>}
                    <span className="ep-chevron"><Chevron s={22} /></span>
                  </button>
                </li>
              )
            })}
          </ol>
        </section>

        <p className="serie-pie">
          Cada capítulo bloqueado cuesta {EPISODE_COST} monedas.
          {state.balance >= EPISODE_COST && ` Con tu saldo abres ${toEpisodes(state.balance)}.`}
        </p>
      </div>
    </div>
  )
}
