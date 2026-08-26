# 4. El POC

**`/poc`** · React + TypeScript + Vite, sin librerías de UI. CSS propio con tokens.
**`/mobbin-export`** · 13 pantallas en 6 flujos, capturadas automáticamente del POC.

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
| Episodios gratis por serie | 12 | Panel de episodios de *Pasión a Domicilio* |
| Episodios de la serie | 56 | Panel de episodios |
| Precio de la serie completa | 660 monedas | 44 bloqueados × 15 |
| Paquetes actuales | $0.99/180 · $1.99/180 · $3.99/375 | Captura oficial del paywall (build 1.20.0) |

`src/lib/economy.ts` marca cada constante como **REAL** o **PROPUESTA**. Es, a la vez, el modelo del POC y la especificación de la economía.

## 4.4 Tres cosas que cambiaron por verificar y por usar el prototipo

**El countdown gigante estaba mal.** La primera versión mostraba `17h 47m 03s` como héroe. Al usarlo, comunica *«falta muchísimo»* — el mensaje opuesto al buscado. Se reemplazó por la hora del reloj (`HOY A LAS 18:05`) con el intervalo debajo. El countdown vuelve a ser héroe solo cuando falta menos de una hora.

**El pase caducaba, y eso era el error de Webtoon otra vez.** La primera versión decía *"no se acumula, el que no se usa se pierde"*. Al verificar el precedente — el Daily Pass de Webtoon, retirado en mayo de 2025 — resultó que la queja dominante de sus lectores durante cinco años fue justamente el "úsalo o piérdelo": convertía leer en una tarea. Era la misma trampa que el diagnóstico le señala a la racha diaria de Idilio, reintroducida sin darme cuenta. Los pases ahora se acumulan hasta 2: faltar una noche no cuesta nada y volver seguido sigue rindiendo más. Detalle completo en [§3.4bis](../03-diseno/#34bis--el-precedente-revisado-en-contra).

**La tienda se contradecía a sí misma.** La primera versión mostraba «monedas por dólar» y el pie decía *«cada paquete rinde más por dólar que el anterior»* — pero los números daban 182, 151, 165, 180. Es exactamente el defecto que el diagnóstico le señala al producto real, reproducido por descuido. Se corrigió a **precio por episodio**, que además es la unidad legible, y la escalera quedó monótona de verdad: $0.15 → $0.11 → $0.10.

## 4.5 Qué queda fuera, a propósito

Navegación general, home, catálogo, búsqueda, perfil, reproducción de video real, compra real por IAP y persistencia entre sesiones. El brief lo excluye explícitamente y agregarlo diluiría la profundidad del único momento que sí importa evaluar.

## 4.6 Accesibilidad y contexto de uso

- Objetivos táctiles ≥44 px; todo alcanzable con el pulgar en el tercio inferior.
- Roles y `aria-label` en diálogos, temporizador, listas de selección y el chip de saldo (que se anuncia como *"Saldo: 90 monedas, 6 episodios"*).
- `prefers-reduced-motion` respetado: todas las animaciones se anulan.
- Blanco máximo `#F2EBF7` en lugar de `#FFFFFF`, pensado para brillo bajo en la franja de 11 p.m. a 2 a.m.
- Ningún estado depende solo del color: la racha combina color, icono y etiqueta de texto.

Auditado con **axe-core** (`wcag2a`, `wcag2aa`, `wcag21aa`, `best-practice`): **0 violaciones**, 24 reglas aprobadas. La primera pasada encontró cuatro — `maximum-scale` bloqueando el zoom, falta de landmark `main`, contenido fuera de landmarks y orden de encabezados — y están corregidas.
