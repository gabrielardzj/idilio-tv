/**
 * La barra de tres pestañas del producto: Inicio · Recompensas · Perfil.
 *
 * Vivía dentro de `Home` como texto muerto —tres `<span>` sin destino— porque
 * hasta ahora el POC solo tenía una pestaña que visitar. Con el perfil hay dos,
 * y una barra en la que una de las pestañas navega y las otras no sería peor
 * que la barra muerta: enseñaría un producto que responde a medias.
 *
 * `Recompensas` sigue sin destino a propósito y se declara: la pestaña existe
 * en el producto y la propuesta la conserva (D8: ahí se quedan las tareas
 * sociales, los referidos y la suscripción), pero no es lo que este POC
 * construye. Va deshabilitada y con `title`, no borrada — borrarla haría que el
 * prototipo propusiera quitar algo que la propuesta no quita.
 *
 * ── El distintivo ──────────────────────────────────────────────
 * El material promocional de Idilio enseña un PUNTO ROJO sobre «Perfil». Un
 * punto rojo dice «hay algo»; no dice qué, y por eso se aprende a ignorar. Acá
 * el distintivo lleva la única cifra que el usuario cambia por contenido —los
 * pases— y en la unidad de toda la propuesta: episodios. «1 pase» es una razón
 * para entrar. Un punto no lo es.
 */
export type Tab = 'inicio' | 'recompensas' | 'perfil'

export function TabBar({
  activa, onIr, pases = 0,
}: { activa: Tab; onIr: (t: Tab) => void; pases?: number }) {
  return (
    <nav className="tabbar" aria-label="Navegación principal">
      <button
        className={`tab ${activa === 'inicio' ? 'on' : ''}`}
        onClick={() => onIr('inicio')}
        aria-current={activa === 'inicio' ? 'page' : undefined}
      >
        <Icono d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8.5Z" />
        Inicio
      </button>

      <button className="tab" disabled title="Fuera del alcance del POC: la pestaña se conserva en la propuesta">
        <Icono d="M12 8v13H4a1 1 0 0 1-1-1V8m9 0v13h8a1 1 0 0 0 1-1V8M2 8h20v-.5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1V8Zm10 0V5m0 0a2.5 2.5 0 1 1 2.5-2.5M12 5a2.5 2.5 0 1 0-2.5-2.5" />
        Recompensas
      </button>

      <button
        className={`tab ${activa === 'perfil' ? 'on' : ''}`}
        onClick={() => onIr('perfil')}
        aria-current={activa === 'perfil' ? 'page' : undefined}
      >
        <span className="tab-i">
          <Icono d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5a7.5 7.5 0 0 1 15 0" />
          {pases > 0 && (
            <span className="tab-badge">{pases === 1 ? '1 pase' : `${pases} pases`}</span>
          )}
        </span>
        Tu noche
      </button>
    </nav>
  )
}

const Icono = ({ d }: { d: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
