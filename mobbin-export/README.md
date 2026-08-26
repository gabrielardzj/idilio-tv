# Export de flujos · Idilio TV
### Continuará · Pase de la Noche (propuesta)

13 pantallas · 6 flujos · iPhone 14 Pro · 390×844 @3x · 2026-08-25

Abre `index.html` para la galería navegable. `manifest.json` tiene la taxonomía completa
en formato consumible (flujo → pantalla → tipo · patrones · elementos · estado interno del POC).

Regenerar: `cd poc && npm run export` (con el dev server arriba).

## Flujo 1 · Desbloqueo con el Pase de la Noche

El invitado llega al muro sin monedas y sale con el episodio abierto, una racha más larga y un comodín.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Player · episodio gratis](flows/f1-pase-de-la-noche/01-player-libre.png) | Media player | Vertical video, Progress indicator, Currency balance |
| 2 | [Muro · el Pase está listo](flows/f1-pase-de-la-noche/02-muro-pase-listo.png) | Paywall | Bottom sheet, Reward claim, Streak, Progress indicator, Cliffhanger |
| 3 | [Elegir a qué serie va el pase](flows/f1-pase-de-la-noche/03-eleccion-de-pase.png) | Selection | Single select, Scarcity, Cross-content discovery |
| 4 | [Desbloqueado · la racha avanza](flows/f1-pase-de-la-noche/04-desbloqueo-celebracion.png) | Confirmation | Reward reveal, Streak advance, Milestone unlock |
| 5 | [Player · episodio 13 abierto](flows/f1-pase-de-la-noche/05-player-desbloqueado.png) | Media player | Vertical video, Progress indicator |

**Player · episodio gratis** — El saldo nunca viaja solo: el chip lleva siempre la traducción a episodios. Es la única huella permanente del metajuego dentro del core loop.

**Muro · el Pase está listo** — Orden deliberado: la historia, dónde estoy, lo gratis, lo pago, la racha. Un muro que abre con precios enseña que el sistema es una tienda.

**Elegir a qué serie va el pase** — El corazón pedagógico: obligar a elegir con un recurso escaso enseña la economía por uso, no por explicación.

**Desbloqueado · la racha avanza** — La recompensa se entrega en el mismo gesto que resuelve la necesidad. La noche 3 dispara el comodín.

**Player · episodio 13 abierto** — El regreso al loop es inmediato: un toque desde la celebración, sin pantallas intermedias.

## Flujo 2 · El pase ya se usó · la cita de mañana

El muro deja de ser un final y pasa a ser una hora. El countdown es el motivo del próximo regreso.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Muro · faltan horas para el próximo pase](flows/f2-la-cita/01-muro-pase-gastado.png) | Paywall | Countdown, Appointment, Streak, Bottom sheet |
| 2 | [Muro · con saldo suficiente](flows/f2-la-cita/02-muro-con-saldo.png) | Paywall | Balance spend, Countdown, Streak |

**Muro · faltan horas para el próximo pase** — El countdown ocupa el lugar jerárquico que antes tenía el precio. La compra queda debajo, como atajo, no como única salida.

**Muro · con saldo suficiente** — Con saldo, la acción de pago sube a primaria — pero el saldo restante se declara en episodios, no en monedas.

## Flujo 3 · Conseguir monedas

La tienda deja de vender monedas y pasa a vender episodios.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Tienda · el precio en episodios](flows/f3-tienda/01-tienda.png) | Store | IAP packs, Value ladder, Unit-of-value translation |

**Tienda · el precio en episodios** — Jerarquía invertida: EPISODIOS grande, monedas de subtítulo, precio a la derecha. La escalera baja el precio por episodio en cada escalón — hoy $1.99 y $3.99 rinden casi lo mismo. Y no hay ni un precio tachado: la fila superior calcula la meta real de la serie que el usuario está viendo, y el badge cae sobre el paquete que de verdad la termina.

## Flujo 4 · Faltar noches · el perdón del sistema

Un usuario de 2.3 días por semana no puede sostener 7 de 7. Tres estados de perdón: el comodín que absorbe la falta, la racha que se corta sin drama, y los pases que se acumulan para que faltar no cueste nada.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [El comodín te cubrió](flows/f4-comodin/01-comodin-usado.png) | Paywall | Streak protection, Forgiveness mechanic |
| 2 | [Se cortó la racha](flows/f4-comodin/02-racha-rota.png) | Paywall | Streak reset, Non-punitive feedback |
| 3 | [Dos pases acumulados · el tope](flows/f4-comodin/03-dos-pases.png) | Paywall | Resource cap, Anti-FOMO |

**El comodín te cubrió** — Se consume solo. No hay nada que reclamar ni que comprar: si hay que hacer algo para no perder la racha, la racha ya es una tarea.

**Se cortó la racha** — Sin rojo, sin alarma, sin oferta para "recuperar tu racha" por monedas. Se explica qué pasó, se dice cuándo vuelve el comodín, y el pase sigue estando ahí. Monetizar la culpa habría sido fácil y habría enseñado que el sistema es adversario.

**Dos pases acumulados · el tope** — Los pases se guardan hasta dos. Es la respuesta directa a la crítica que hundió al Daily Pass de Webtoon: un pase que se pierde es una obligación disfrazada de regalo. Con tope 2 faltar una noche no cuesta nada, y volver seguido sigue rindiendo más.

## Flujo 5 · Guardar la racha · de invitado a cuenta

88% consume como invitado. La cuenta se pide una sola vez y solo cuando ya hay algo que perder.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Tienes algo que guardar](flows/f5-cuenta/01-guardar-racha.png) | Sign up | Contextual auth, Loss aversion, Guest-first |

**Tienes algo que guardar** — No hay muro de registro. El argumento no es "crea tu cuenta" sino "no pierdas estas 4 noches y estas 75 monedas".

## Flujo 6 · Mi economía

Objetivo de experiencia: que el usuario entienda fuentes, sumideros y su posición. Se abre desde el chip de saldo, dentro del player.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [De dónde salen mis monedas](flows/f6-mi-economia/01-mi-economia.png) | Account / Wallet | Ledger, Source-sink model, Streak |

**De dónde salen mis monedas** — La única superficie que explica la economía completa, y se llega a ella con un toque desde el player — no desde una pestaña.

## Taxonomía

**Tipos de pantalla:** Account / Wallet · Confirmation · Media player · Paywall · Selection · Sign up · Store

**Patrones:** Anti-FOMO · Appointment · Balance spend · Bottom sheet · Cliffhanger · Contextual auth · Countdown · Cross-content discovery · Currency balance · Forgiveness mechanic · Guest-first · IAP packs · Ledger · Loss aversion · Milestone unlock · Non-punitive feedback · Progress indicator · Resource cap · Reward claim · Reward reveal · Scarcity · Single select · Source-sink model · Streak · Streak advance · Streak protection · Streak reset · Unit-of-value translation · Value ladder · Vertical video

**Elementos:** Action rail · Badge · Balance caption · Balance headline · Bottom sheet · Breakdown list · Countdown timer · Fine print · Goal row · Headline · Medal · Notice · Pack list · Price per unit · Primary button · Progress bar · Progress label · Radio list · Reward card · Reward lines · Scrubber · Secondary card · Stat tiles · Status row · Streak strip · Text button · Thumbnail · Top bar · Total row · Video · Wallet chip
