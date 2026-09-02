# Export de flujos · Idilio TV
### Continuará · Pase de la Noche (propuesta)

27 pantallas · 9 flujos · iPhone 14 Pro · 390×844 @3x · 2026-08-25

Abre `index.html` para la galería navegable. `manifest.json` tiene la taxonomía completa
en formato consumible (flujo → pantalla → tipo · patrones · elementos · estado interno del POC).

> La taxonomía —«Paywall», «Bottom sheet», «Reward claim»— va en inglés a propósito: es el
> vocabulario con el que Mobbin indexa estos flujos, y traducirlo lo haría inbuscable. Traducidos:
> *paywall* es el muro de pago, *bottom sheet* la tarjeta que sube desde abajo, *reward claim* el
> reclamo de la recompensa, *streak* la racha y *countdown* la cuenta regresiva.

Regenerar: `cd poc && npm run export` (con el dev server arriba).

## Flujo 1 · Cómo se llega al muro

El muro no se puede juzgar en el vacío. Hay que llegar a él como se llega de verdad: eligiendo una serie del catálogo, viendo un rato y chocando. Estas tres pantallas son el camino.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Home · el catálogo](flows/f0-llegar-al-muro/01-home.png) | Home / Browse | Content rails, Continue watching, Currency balance |
| 2 | [Ficha de serie · la progresión visible](flows/f0-llegar-al-muro/02-serie.png) | Detail | Chapter list, Progress indicator, Unlock cost |
| 3 | [Ficha de serie · la lista de capítulos](flows/f0-llegar-al-muro/02b-serie-capitulos.png) | Detail | Chapter list, Unlock cost, Progress indicator |
| 4 | [Player · el core loop](flows/f0-llegar-al-muro/03-player.png) | Media player | Vertical video, Swipe navigation, Progress indicator |

**Home · el catálogo** — La estructura del producto real tal como es hoy, con los pósters de verdad del catálogo y los rieles en el orden de la app (Estrenos, Seguir viendo, Lo más visto y los géneros —«Amores Prohibidos», «Venganza Pasional»— hasta «Nuestra selección para ti») y las 41 series con muro del catálogo, con sus cifras medidas. Dos diferencias, y son la propuesta: el chip de saldo lleva su traducción a episodios, y la tercera pestaña se llama «Tu noche» y lleva un distintivo con lo que hay dentro —«1 pase»—, no un punto rojo. «Recompensas» se conserva: el muro real ya trae el anuncio y la suscripción, así que la pestaña queda con las tareas sociales, los referidos y el Pase Idilio.

**Ficha de serie · la progresión visible** — La pantalla es la de la app nativa tal como es hoy, capítulo por capítulo: «Volver», «Resumen» con el póster y la sinopsis real del catálogo, y la lista de «Capítulo N» con la píldora «Interactiva» y el candado. Encima van tres cosas, y son la propuesta: dónde vas —el contador y la barra—, qué ya viste, y qué abre el siguiente, dicho en la tarjeta donde está el muro y no en una letra chica. La ficha real muestra el candado y nunca el precio.

**Ficha de serie · la lista de capítulos** — La misma ficha, bajando. Las tarjetas son las del producto —«Capítulo N», el número como título, «Interactiva» y el candado—; lo que el producto no tiene son las tres marcas de la propuesta: el visto de los que ya viste, el «Seguir viendo» de dónde te quedaste, y el precio en la tarjeta del capítulo 11, que es donde está el muro. Del 12 en adelante la tarjeta se apaga, igual que en la app.

**Player · el core loop** — El core loop: lo que el usuario hace una y otra vez. Se desliza hacia arriba para el siguiente episodio y hacia abajo para el anterior, como en el producto. El muro aparece cuando el siguiente está bloqueado — no antes.

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

**Muro · el Pase está listo** — Orden deliberado: la historia, dónde estoy, lo gratis, lo pago, la racha. Un muro que abre con precios enseña que el sistema es una tienda. Lo gratuito tiene dos escalones y el orden entre ellos también es una decisión: el Pase arriba y el anuncio debajo, porque el Pase es lo mismo sin los 30 segundos ni el corte en el cliffhanger.

**Elegir a qué serie va el pase** — El corazón pedagógico: obligar a elegir con un recurso escaso enseña la economía por uso, no por explicación.

**Desbloqueado · la racha avanza** — La recompensa se entrega en el mismo gesto que resuelve la necesidad. La noche 3 dispara el comodín.

**Player · episodio 13 abierto** — El regreso al loop es inmediato: un toque desde la celebración, sin pantallas intermedias.

## Flujo 3 · El pase ya se usó · la cita de mañana

El muro deja de ser un final y pasa a ser una hora. El countdown es el motivo del próximo regreso.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Muro · faltan horas para el próximo pase](flows/f2-la-cita/01-muro-pase-gastado.png) | Paywall | Countdown, Appointment, Streak, Bottom sheet |
| 2 | [Después del anuncio · el episodio ya está abierto](flows/f2-la-cita/01b-tras-el-anuncio.png) | Confirmation | Rewarded ad, Ad-gated unlock, Quota translated, Success state |
| 3 | [Muro · con saldo suficiente](flows/f2-la-cita/02-muro-con-saldo.png) | Paywall | Balance spend, Countdown, Streak |

**Muro · faltan horas para el próximo pase** — El countdown ocupa el lugar jerárquico que antes tenía el precio. La compra queda debajo, como atajo, no como única salida.

**Después del anuncio · el episodio ya está abierto** — La salida gratuita que el producto YA tenía y que este trabajo casi propone como si fuera nueva: el anuncio recompensado, tope de 10 al día. Lo que la intervención aporta no es el anuncio sino su sitio, su etiqueta y su número de pasos. El producto lo rotula «0/10» en gris —una fracción sin unidad, que además cuenta anuncios y no episodios— y al verlo acredita 15 monedas que el usuario todavía tiene que gastar en un segundo toque. Acá el anuncio ABRE el episodio: el botón promete «Ver un anuncio y abrir este episodio» y eso es exactamente lo que pasa. Un anuncio vale un episodio, así que la moneda en el medio no informaba nada — solo agregaba un paso a la única salida que este muro quiere hacer fácil. La emisión no cambia: 10 anuncios siguen siendo 10 episodios por día.

**Muro · con saldo suficiente** — Con saldo, la acción de pago sube a primaria — pero el saldo restante se declara en episodios, no en monedas.

## Flujo 4 · Conseguir monedas

La tienda deja de vender monedas y pasa a vender episodios.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Tienda · el precio en episodios](flows/f3-tienda/01-tienda.png) | Store | IAP packs, Value ladder, Unit-of-value translation |

**Tienda · el precio en episodios** — Jerarquía invertida: EPISODIOS grande, monedas de subtítulo, precio a la derecha. La escalera baja el precio por episodio en cada escalón — hoy $1.99 y $3.99 rinden casi lo mismo. Y no hay ni un precio tachado: la fila superior calcula la meta real de la serie que el usuario está viendo, y el badge cae sobre el paquete que de verdad la termina.

## Flujo 5 · Faltar noches · el perdón del sistema

Un usuario de 2.3 días por semana no puede sostener 7 de 7. El flujo abre con el momento en que el usuario vuelve —el acuse le dice qué se acumuló mientras no estaba— y sigue con los tres estados de perdón: el comodín que absorbe la falta, la racha que se corta sin drama, y los pases que se detienen en dos. Las dos primeras pantallas salen de un solo recorrido: el toast en el player, y el muro al que llega ese mismo usuario al darle a siguiente.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Vuelves tras faltar · entran los dos](flows/f4-comodin/01-acuse-de-la-vuelta.png) | Media player | Silent accrual, Toast, Anti-FOMO |
| 2 | [El comodín te cubrió](flows/f4-comodin/02-comodin-usado.png) | Paywall | Streak protection, Forgiveness mechanic |
| 3 | [Se cortó la racha](flows/f4-comodin/03-racha-rota.png) | Paywall | Streak reset, Non-punitive feedback |
| 4 | [Dos pases acumulados · el tope](flows/f4-comodin/04-dos-pases.png) | Paywall | Resource cap, Anti-FOMO |

**Vuelves tras faltar · entran los dos** — El único momento en que la regla anti-FOMO se le hace visible al usuario como recompensa y no como estado: *«Tu comodín te cubrió · Noche 4 · +2 pases»*. El pase se emite por reloj aunque nadie abra la app, así que al volver entra lo que se acumuló mientras no estabas. Si entrara uno solo, faltar costaría el pase de esa noche — el «úsalo o piérdelo» de Webtoon, que es justo lo que esta mecánica existe para no repetir.

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

## Flujo 8 · Tu noche · la pestaña, en sus dos estados

El 82% nunca abre el perfil. Esta pestaña no intenta arreglarlo haciéndose más bonita: cambia qué contiene —el pase, la racha, dónde ibas y el saldo, que hoy están repartidos en tres pantallas— y se llena desde el muro, el acuse y el chip de saldo. La misma pantalla en los dos estados de la base: 88% sin cuenta, 12% con cuenta. El benchmark y el argumento están en docs/07-perfil/.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Sin cuenta · el 88% de la base](flows/f8-tu-noche/01-invitado.png) | Account / Profile | Guest-first, Wallet, Streak, Continue watching, Loss aversion |
| 2 | [Sin cuenta · lo que hay en juego](flows/f8-tu-noche/02-invitado-guardar.png) | Account / Profile | Loss aversion, Contextual auth, Guest-first |
| 3 | [Con cuenta · el 12%](flows/f8-tu-noche/03-con-cuenta.png) | Account / Profile | Activity calendar, Cross-device sync, Wallet, Streak |
| 4 | [Sin pase · la cita de mañana](flows/f8-tu-noche/04-sin-pase.png) | Account / Profile | Countdown, Appointment, Opt-in notification, Wallet |

**Sin cuenta · el 88% de la base** — No hay avatar, ni nombre, ni foto: la identidad de esta pantalla es la racha. El orden es el argumento — primero lo que se puede usar (el pase), después dónde ibas y qué tienes, y solo al final la cuenta. Pedir el correo arriba convertiría la pestaña en un muro de registro, y este producto no lo tiene: ReelShort da UID de invitado al instante y ofrece monedas por registrarse, incentivo y no requisito.

**Sin cuenta · lo que hay en juego** — La misma pantalla, abajo. El bloque de la cuenta va en ámbar y no en rojo: es un aviso, no un error — el usuario no hizo nada mal por no registrarse. Y la lista de ajustes trae las dos piezas que no mueven ninguna métrica y que si faltan aparecen en las reseñas de la tienda: iniciar sesión desde otro teléfono y restaurar compras.

**Con cuenta · el 12%** — El mismo esqueleto y el mismo orden; cambia un bloque. Donde el invitado ve qué puede perder, quien tiene cuenta ve que está guardado — y gana lo único que una cuenta habilita de verdad: un registro que sobrevive al teléfono. El calendario de 31 noches es dato de prototipo, y su densidad (13 de 31, 2.9 por semana) se eligió apenas por encima de las 2.3 que hace hoy el usuario promedio: un calendario casi lleno sería una pantalla bonita contando un producto que no existe.

**Sin pase · la cita de mañana** — Gastado el pase, la tarjeta se convierte en la cita —«mañana a las 21:30, tu hora de siempre»— y el interruptor del aviso vive acá, que es el único sitio del producto donde el usuario está mirando su propia noche. Sin pase la pestaña pierde el distintivo: si apareciera igual, dejaría de significar algo en tres días.

## Flujo 9 · Sobre el stack real de Idilio

La misma mecánica implementada en Next.js App Router + Tailwind v4 + Supabase, con los tokens de producción. El estado económico se resuelve en el servidor, que es el riesgo técnico nº 1 de la propuesta.

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
| 1 | [Muro · el Pase está listo](flows/f7-stack-real/01-muro-pase-listo.png) | Paywall | Server-rendered state, Reward claim, Streak |
| 2 | [La cita · hoy a las 21:30](flows/f7-stack-real/02-la-cita.png) | Paywall | Countdown, Appointment, Opt-in notification |
| 3 | [Faltan 42 minutos](flows/f7-stack-real/03-cuenta-regresiva-corta.png) | Paywall | Countdown, Balance spend |

**Muro · el Pase está listo** — Mismo muro, tokens reales: el violeta es #a000f0 y las superficies son negro neutro. Comparado con el prototipo se ve que mis superficies tenían tinte violeta — el producto real es más sobrio.

**La cita · hoy a las 21:30** — El héroe es la hora del reloj. El botón «Avísame» es el que cierra el ciclo: sin push —el aviso que llega al teléfono—, la cita depende de que el usuario se acuerde — y ahí se pierde la mitad del efecto.

**Faltan 42 minutos** — Debajo de una hora el countdown vuelve a ser el héroe: ahí los segundos sí son la información relevante. Y con saldo, el pago sube a primario — pero el resto se declara en episodios, no en monedas.

## Taxonomía

**Tipos de pantalla:** Account / Profile · Account / Wallet · Confirmation · Detail · Home / Browse · Media player · Paywall · Selection · Sign up · Store

**Patrones:** Activity calendar · Ad-gated unlock · Anti-FOMO · Appointment · Balance spend · Bottom sheet · Chapter list · Cliffhanger · Content rails · Contextual auth · Continue watching · Countdown · Cross-content discovery · Cross-device sync · Currency balance · Forgiveness mechanic · Guest-first · IAP packs · Ledger · Loss aversion · Milestone unlock · Non-punitive feedback · Opt-in notification · Progress indicator · Quota translated · Resource cap · Reward claim · Reward reveal · Rewarded ad · Scarcity · Server-rendered state · Silent accrual · Single select · Source-sink model · Streak · Streak advance · Streak protection · Streak reset · Success state · Swipe navigation · Toast · Unit-of-value translation · Unlock cost · Value ladder · Vertical video · Wallet

**Elementos:** Account chip · Action rail · Badge · Balance caption · Balance headline · Bottom sheet · Breakdown list · Calendar heatmap · Chapter list · Chevron · Clock time · Countdown timer · Fine print · Goal row · Headline · Horizontal rail · Icon · List row · Lock · Medal · Notice · Pack list · Poster · Price per unit · Price row · Primary button · Progress bar · Progress label · Quota caption · Radio list · Reminder toggle · Reward card · Reward lines · Scrubber · Secondary card · Stat tiles · Status row · Streak strip · Synopsis · Tab bar · Text button · Thumbnail · Toast · Top bar · Total row · Video · Wallet chip
