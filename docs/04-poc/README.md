# 4. El POC

**`/poc`** · React + TypeScript + Vite, sin librerías de UI. CSS propio con tokens.
**`/mobbin-export`** · 17 pantallas en 7 flujos, capturadas automáticamente de los dos prototipos.

---

## 4.1 Qué está construido

El alcance que pide el brief es *"la pantalla o el momento donde ocurre la mecánica"*. El momento es **el muro de desbloqueo**, y está resuelto con sus trece estados:

| # | Estado | Qué demuestra |
|---|---|---|
| 1 | Player · episodio gratis | El chip de saldo con traducción a episodios; progreso de serie |
| 2 | Muro · pase disponible | La jerarquía: historia → progreso → gratis → pago → racha |
| 3 | Elección de serie | El recurso escaso que hay que asignar |
| 4 | Desbloqueo + racha avanza | Recompensa, bono de noche 3, comodín ganado |
| 5 | Player · episodio abierto | El regreso al loop en un toque |
| 6 | Muro · pase gastado (la cita) | «Hoy a las 18:05» + faltan 17 h 47 m + avísame |
| 7 | Muro · con saldo | El pago sube a primario, el saldo se declara en episodios |
| 8 | Tienda | Episodios grandes, monedas de subtítulo, precio por episodio |
| 9 | El comodín te cubrió | La mecánica de perdón, sin nada que reclamar |
| 10 | Se cortó la racha | El fallo sin castigo — y sin oferta para "recuperarla" pagando |
| 11 | Dos pases acumulados (tope) | El anti-FOMO: faltar no cuesta, volver seguido sigue rindiendo más |
| 12 | Guardar la racha | El prompt de cuenta con las tres cifras en juego |
| 13 | Mi economía | Fuentes, sumidero y posición, en una sola vista |

Y tres más en [`web/`](../../web/), sobre el stack real, que son **rutas prerrenderizadas** y no
estados de un panel: el pase listo, la cita de 17 h con «Avísame», y el contador de 42 minutos
donde los segundos vuelven a ser el héroe.

**Es un prototipo funcional, no un clickable.** El estado vive en un reducer real (`src/lib/state.ts`), el countdown corre contra un reloj, el saldo se descuenta, la racha avanza, el comodín se consume solo y el pase entra en cooldown de 24 h. Se puede llegar a cualquier estado jugando, sin usar el panel lateral.

## 4.2 Cómo correrlo

```bash
cd poc
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ — funciona también abierto desde el disco
npm run export     # regenera mobbin-export/ desde el POC (con el dev server arriba)
```

El **panel de la derecha** (visible en pantallas ≥900px) sirve para saltar a cualquier estado y para adelantar el reloj. Está fuera del teléfono a propósito: es andamio de revisión, no producto.

En móvil el panel desaparece y el POC ocupa la pantalla completa.

## 4.3 Los datos son reales

Todo lo económico está verificado en el producto en producción, no inventado:

| Constante | Valor | Dónde se verificó |
|---|---|---|
| Costo de episodio | 15 monedas | Muro de idilio.tv + paywall nativo |
| Episodios gratis por serie | **10** (moda de 35 series) | Censo de las 43 series del catálogo |
| Series del catálogo | 43 · 1.885 episodios | Censo |
| Episodios gratis en total | 428 (23% del catálogo) | Censo |
| Precio de la serie mediana | 600 monedas ≈ $6.63 | 40 bloqueados × 15 |
| Paquetes actuales | $0.99/180 · $1.99/180 · $3.99/375 | Captura oficial del paywall (build 1.20.0) |

**Y las cifras se verifican solas.** `npm run verificar` comprueba 36 afirmaciones numéricas de
los documentos contra el código y contra el censo del catálogo, y además rastrea los textos
buscando cifras que se corrigieron en el camino y podrían haber sobrevivido a una edición. Corre
en el pipeline antes de cada build, así que una cifra vieja rompe el despliegue en vez de llegar
al entregable.

`src/lib/economy.ts` marca cada constante como **REAL** o **PROPUESTA**. Es, a la vez, el modelo del POC y la especificación de la economía.

Las tres series del POC son reales y están elegidas para cubrir las tres estructuras que existen en el catálogo: *La Enfermera Infiltrada* con 10 gratis (la moda), *Pasión a Domicilio* con 12 (la excepción por arriba) y *La Herencia del Patriarca Enamorado* con 7 (la excepción por abajo).

## 4.4 Cinco cosas que cambiaron por verificar y por usar el prototipo

**El Pase dejó de colgar de un reloj.** Acreditaba uno cada 24 h. Al leer la versión paralela del reto vi que acreditar **al terminar un episodio** es mejor: la adopción de la fuente pasa a ~100% por construcción, en vez de depender de que el usuario llegue al muro. Es la corrección directa al 19% de reclamo. Y como acreditar en silencio dejaría el metajuego invisible —el defecto que este trabajo corrige—, el acuse es un toast de dos segundos: *«Noche 3 · +1 pase · +30 monedas»*.

**El countdown gigante estaba mal.** La primera versión mostraba `17h 47m 03s` como héroe. Al usarlo, comunica *«falta muchísimo»* — el mensaje opuesto al buscado. Se reemplazó por la hora del reloj (`HOY A LAS 18:05`) con el intervalo debajo. El countdown vuelve a ser héroe solo cuando falta menos de una hora.

**El pase caducaba, y eso era el error de Webtoon otra vez.** La primera versión decía *"no se acumula, el que no se usa se pierde"*. Al verificar el precedente — el Daily Pass de Webtoon, retirado en mayo de 2025 — resultó que la queja dominante de sus lectores durante cinco años fue justamente el "úsalo o piérdelo": convertía leer en una tarea. Era la misma trampa que el diagnóstico le señala a la racha diaria de Idilio, reintroducida sin darme cuenta. Los pases ahora se acumulan hasta 2: faltar una noche no cuesta nada y volver seguido sigue rindiendo más. Detalle completo en [§3.4bis](../03-diseno/#34bis--el-precedente-revisado-en-contra).

**El badge «Una serie completa» habría mentido en el 40% de las compras.** Estaba fijo sobre el paquete de 660 monedas porque *Pasión a Domicilio* cuesta eso. El censo mostró que las series van de 150 a 960 monedas. Ahora la tienda abre con la meta calculada de la serie que el usuario está viendo y el badge cae sobre el paquete que de verdad alcanza.

**La tienda se contradecía a sí misma.** La primera versión mostraba «monedas por dólar» y el pie decía *«cada paquete rinde más por dólar que el anterior»* — pero los números daban 182, 151, 165, 180. Es exactamente el defecto que el diagnóstico le señala al producto real, reproducido por descuido. Se corrigió a **precio por episodio**, que además es la unidad legible, y la escalera quedó monótona de verdad: $0.15 → $0.11 → $0.10.

## 4.5 Qué queda fuera, a propósito

Navegación general, home, catálogo, búsqueda, perfil, reproducción de video real, compra real por IAP y persistencia entre sesiones. El brief lo excluye explícitamente y agregarlo diluiría la profundidad del único momento que sí importa evaluar.

## 4.6 Accesibilidad y contexto de uso

- Objetivos táctiles ≥44 px; todo alcanzable con el pulgar en el tercio inferior.
- Roles y `aria-label` en diálogos, temporizador, listas de selección y el chip de saldo (que se anuncia como *"Saldo: 90 monedas, 6 episodios"*).
- `prefers-reduced-motion` respetado: todas las animaciones se anulan.
- Blanco máximo `#F2EBF7` en lugar de `#FFFFFF`, pensado para brillo bajo en la franja de 11 p.m. a 2 a.m.
- Ningún estado depende solo del color: la racha combina color, icono y etiqueta de texto.

Los dos árboles auditados con **axe-core** (`wcag2a`, `wcag2aa`, `wcag21aa`, `best-practice`): **0 violaciones** en los dos (24 y 33 reglas aprobadas). La primera pasada del prototipo encontró cuatro — `maximum-scale` bloqueando el zoom, falta de landmark `main`, contenido fuera de landmarks y orden de encabezados — y están corregidas.
