import { Moon, Shield } from '../icons';

/**
 * Estado E — se ofrece la cuenta UNA sola vez, en la noche 3.
 * Encuadre por pérdida, no por beneficio: dice qué se pierde, no qué se gana.
 * Ver docs/03-intervencion.md §3.5.
 */
export function AccountSheet({ night, onCreate, onLater }:
  { night: number; onCreate: () => void; onLater: () => void }) {
  return (
    <>
      <div className="scrim" onClick={onLater} />
      <section className="sheet account-sheet" role="dialog" aria-modal="true"
               aria-label="Guarda tu racha">
        <div className="grabber" />
        <span style={{ color: 'var(--home-magenta)' }}><Moon s={26} /></span>
        <div className="big">{night} noches</div>

        <h2>Tu racha vive solo en este teléfono</h2>
        <p>
          Si cambias de celular o borras la app, se pierde. Guárdala en dos toques
          y sigue donde ibas.
        </p>

        <div style={{
          marginTop: 18, padding: '12px 14px', borderRadius: 16,
          background: 'rgba(99,214,220,0.07)', border: '1px solid rgba(99,214,220,0.25)',
          display: 'flex', gap: 10, alignItems: 'center', textAlign: 'left',
        }}>
          <span style={{ color: 'var(--home-cyan)', display: 'flex' }}><Shield s={19} /></span>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', margin: 0 }}>
            Ganaste un <b style={{ color: 'var(--home-text)', fontWeight: 600 }}>escudo</b>:
            si una noche no puedes venir, tu racha aguanta.
          </p>
        </div>

        <div className="oauth">
          <button onClick={onCreate}> Continuar con Apple</button>
          <button onClick={onCreate}>Continuar con Google</button>
          <button onClick={onCreate}>Continuar con correo</button>
        </div>

        <button className="later" onClick={onLater}>Ahora no</button>
      </section>
    </>
  );
}
