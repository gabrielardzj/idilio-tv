# Export de flujos · Idilio TV
### Continuará · Pase de la Noche (propuesta)

20 pantallas · 8 flujos · iPhone 14 Pro · 390×844 @3x · 2026-08-25

Abre `index.html` para la galería navegable. `manifest.json` tiene la taxonomía completa
en formato consumible (flujo → pantalla → tipo · patrones · elementos · estado interno del POC).

Regenerar: `cd poc && npm run export` (con el dev server arriba).

## Flujo 1 · Cómo se llega al muro

El muro no se puede juzgar en el vacío. Hay que llegar a él como se llega de verdad: eligiendo una serie del catálogo, viendo un rato y chocando. Estas tres pantallas son el camino.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Home · el catálogo](flows/f0-llegar-al-muro/01-home.png) | Home / Browse | Content rails, Continue watching, Currency balance |
| 2 | [Ficha de serie · la progresión visible](flows/f0-llegar-al-muro/02-serie.png) | Detail | Episode grid, Progress indicator, Unlock cost |
| 3 | [Player · el core loop](flows/f0-llegar-al-muro/03-player.png) | Media player | Vertical video, Swipe navigation, Progress indicator |

**Home · el catálogo** — El chasis del producto real con las 35 series y sus cifras medidas. Dos diferencias, y son la propuesta: el chip de saldo lleva su traducción a episodios, y la pestaña «Recompensas» ya no existe — su contenido se mudó al muro, que es donde pasa el 100% de los usuarios.

**Ficha de serie · la progresión visible** — Donde hoy hay una grilla de números grises, la grilla dice tres cosas: dónde vas, qué está abierto y qué cuesta terminar. Y si hay un pase disponible, lo dice antes que el precio.

**Player · el core loop** — Se desliza hacia arriba para el siguiente episodio y hacia abajo para el anterior, como en el producto. El muro aparece cuando el siguiente está bloqueado — no antes.

## Flujo 2 · Desbloqueo con el Pase de la Noche

El invitado ve un episodio y la noche se acredita sola. Después llega al muro sin monedas y sale con el episodio abierto. En ningún momento reclama nada.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Player · episodio gratis](flows/f1-pase-de-la-noche/01-player-libre.png) | Media player | Vertical video, Progress indicator, Currency balance |
| 2 | [El acuse de la noche](flows/f1-pase-de-la-noche/01b-acuse-de-la-noche.png) | Media player | Silent accrual, Toast, Currency balance |
| 3 | [Muro · el Pase está listo](flows/f1-pase-de-la-noche/02-muro-pase-listo.png) | Paywall | Bottom sheet, Reward claim, Streak, Progress indicator, Cliffhanger |
| 4 | [Elegir a qué serie va el pase](flows/f1-pase-de-la-noche/03-eleccion-de-pase.png) | Selection | Single select, Scarcity, Cross-content discovery |
| 5 | [Desbloqueado · la racha avanza](flows/f1-pase-de-la-noche/04-desbloqueo-celebracion.png) | Confirmation | Reward reveal, Streak advance, Milestone unlock |
| 6 | [Player · episodio 13 abierto](flows/f1-pase-de-la-noche/05-player-desbloqueado.png) | Media player | Vertical video, Progress indicator |

**Player · episodio gratis** — El saldo nunca viaja solo: el chip lleva siempre la traducción a episodios. Es la única huella permanente del metajuego dentro del core loop.

**El acuse de la noche** — El único momento en que el metajuego aparece dentro del video, y dura dos segundos. Al terminar el episodio se acredita la noche, el pase y el bono — sin botón. Acreditar en silencio habría dejado el metajuego invisible otra vez, que es el defecto que este trabajo corrige.

**Muro · el Pase está listo** — Orden deliberado: la historia, dónde estoy, lo gratis, lo pago, la racha. Un muro que abre con precios enseña que el sistema es una tienda.

**Elegir a qué serie va el pase** — El corazón pedagógico: obligar a elegir con un recurso escaso enseña la economía por uso, no por explicación.

**Desbloqueado · la racha avanza** — La recompensa se entrega en el mismo gesto que resuelve la necesidad. La noche 3 dispara el comodín.

**Player · episodio 13 abierto** — El regreso al loop es inmediato: un toque desde la celebración, sin pantallas intermedias.

## Flujo 3 · El pase ya se usó · la cita de mañana

El muro deja de ser un final y pasa a ser una hora. El countdown es el motivo del próximo regreso.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Muro · faltan horas para el próximo pase](flows/f2-la-cita/01-muro-pase-gastado.png) | Paywall | Countdown, Appointment, Streak, Bottom sheet |
| 2 | [Muro · con saldo suficiente](flows/f2-la-cita/02-muro-con-saldo.png) | Paywall | Balance spend, Countdown, Streak |

**Muro · faltan horas para el próximo pase** — El countdown ocupa el lugar jerárquico que antes tenía el precio. La compra queda debajo, como atajo, no como única salida.

**Muro · con saldo suficiente** — Con saldo, la acción de pago sube a primaria — pero el saldo restante se declara en episodios, no en monedas.

## Flujo 4 · Conseguir monedas

La tienda deja de vender monedas y pasa a vender episodios.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Tienda · el precio en episodios](flows/f3-tienda/01-tienda.png) | Store | IAP packs, Value ladder, Unit-of-value translation |

**Tienda · el precio en episodios** — Jerarquía invertida: EPISODIOS grande, monedas de subtítulo, precio a la derecha. La escalera baja el precio por episodio en cada escalón — hoy $1.99 y $3.99 rinden casi lo mismo. Y no hay ni un precio tachado: la fila superior calcula la meta real de la serie que el usuario está viendo, y el badge cae sobre el paquete que de verdad la termina.

## Flujo 5 · Faltar noches · el perdón del sistema

Un usuario de 2.3 días por semana no puede sostener 7 de 7. Tres estados de perdón: el comodín que absorbe la falta, la racha que se corta sin drama, y los pases que se acumulan para que faltar no cueste nada.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [El comodín te cubrió](flows/f4-comodin/01-comodin-usado.png) | Paywall | Streak protection, Forgiveness mechanic |
| 2 | [Se cortó la racha](flows/f4-comodin/02-racha-rota.png) | Paywall | Streak reset, Non-punitive feedback |
| 3 | [Dos pases acumulados · el tope](flows/f4-comodin/03-dos-pases.png) | Paywall | Resource cap, Anti-FOMO |

**El comodín te cubrió** — Se consume solo. No hay nada que reclamar ni que comprar: si hay que hacer algo para no perder la racha, la racha ya es una tarea.

**Se cortó la racha** — Sin rojo, sin alarma, sin oferta para "recuperar tu racha" por monedas. Se explica qué pasó, se dice cuándo vuelve el comodín, y el pase sigue estando ahí. Monetizar la culpa habría sido fácil y habría enseñado que el sistema es adversario.

**Dos pases acumulados · el tope** — Los pases se guardan hasta dos. Es la respuesta directa a la crítica que hundió al Daily Pass de Webtoon: un pase que se pierde es una obligación disfrazada de regalo. Con tope 2 faltar una noche no cuesta nada, y volver seguido sigue rindiendo más.

## Flujo 6 · Guardar la racha · de invitado a cuenta

88% consume como invitado. La cuenta se pide una sola vez y solo cuando ya hay algo que perder.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Tienes algo que guardar](flows/f5-cuenta/01-guardar-racha.png) | Sign up | Contextual auth, Loss aversion, Guest-first |

**Tienes algo que guardar** — No hay muro de registro. El argumento no es "crea tu cuenta" sino "no pierdas estas 4 noches y estas 75 monedas".

## Flujo 7 · Mi economía

Objetivo de experiencia: que el usuario entienda fuentes, sumideros y su posición. Se abre desde el chip de saldo, dentro del player.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [De dónde salen mis monedas](flows/f6-mi-economia/01-mi-economia.png) | Account / Wallet | Ledger, Source-sink model, Streak |

**De dónde salen mis monedas** — La única superficie que explica la economía completa, y se llega a ella con un toque desde el player — no desde una pestaña.

## Flujo 8 · Sobre el stack real de Idilio

La misma mecánica implementada en Next.js App Router + Tailwind v4 + Supabase, con los tokens de producción. El estado económico se resuelve en el servidor, que es el riesgo técnico nº 1 de la propuesta.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Muro · el Pase está listo](flows/f7-stack-real/01-muro-pase-listo.png) | Paywall | Server-rendered state, Reward claim, Streak |
| 2 | [La cita · faltan 17 h](flows/f7-stack-real/02-la-cita.png) | Paywall | Countdown, Appointment, Opt-in notification |
| 3 | [Faltan 42 minutos](flows/f7-stack-real/03-cuenta-regresiva-corta.png) | Paywall | Countdown, Balance spend |

**Muro · el Pase está listo** — Mismo muro, tokens reales: el violeta es #a000f0 y las superficies son negro neutro. Comparado con el prototipo se ve que mis superficies tenían tinte violeta — el producto real es más sobrio.

**La cita · faltan 17 h** — El héroe es la hora del reloj. El botón «Avísame» es el que cierra el ciclo: sin push, la cita depende de que el usuario se acuerde — y ahí se pierde la mitad del efecto.

**Faltan 42 minutos** — Debajo de una hora el countdown vuelve a ser el héroe: ahí los segundos sí son la información relevante. Y con saldo, el pago sube a primario — pero el resto se declara en episodios, no en monedas.

## Taxonomía

**Tipos de pantalla:** Account / Wallet · Confirmation · Detail · Home / Browse · Media player · Paywall · Selection · Sign up · Store

**Patrones:** Anti-FOMO · Appointment · Balance spend · Bottom sheet · Cliffhanger · Content rails · Contextual auth · Continue watching · Countdown · Cross-content discovery · Currency balance · Episode grid · Forgiveness mechanic · Guest-first · IAP packs · Ledger · Loss aversion · Milestone unlock · Non-punitive feedback · Opt-in notification · Progress indicator · Resource cap · Reward claim · Reward reveal · Scarcity · Server-rendered state · Silent accrual · Single select · Source-sink model · Streak · Streak advance · Streak protection · Streak reset · Swipe navigation · Toast · Unit-of-value translation · Unlock cost · Value ladder · Vertical video

**Elementos:** Action rail · Badge · Balance caption · Balance headline · Bottom sheet · Breakdown list · Clock time · Countdown timer · Episode grid · Fine print · Goal row · Headline · Hero · Horizontal rail · Medal · Notice · Pack list · Poster · Price per unit · Primary button · Progress bar · Progress label · Radio list · Reminder toggle · Reward card · Reward lines · Scrubber · Secondary card · Stat tiles · Status row · Streak strip · Tab bar · Text button · Thumbnail · Toast · Top bar · Total row · Video · Wallet chip
