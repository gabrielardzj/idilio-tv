# 4. El POC

**`/poc`** · React + TypeScript + Vite, sin librerías de UI. CSS propio con tokens.
**`/mobbin-export`** · 22 pantallas en 8 flujos, capturadas automáticamente de los dos prototipos.

---

## 4.1 Qué está construido

El brief acota el alcance a *"la pantalla o el momento donde ocurre la mecánica"*. El momento es **el muro de desbloqueo** — pero un muro no se puede juzgar en el vacío, así que el prototipo tiene también el camino que lleva hasta él:

| Pantalla | Para qué está |
|---|---|
| **Home** | Las 41 series reales con muro, con sus cifras medidas y **sus pósters reales**, sobre la estructura de la app tal como es hoy: los rieles en el orden real (Estrenos, Seguir viendo, Lo más visto y los géneros, de «Amores Prohibidos» a «Nuestra selección para ti»). Dos detalles son la propuesta dicha en la navegación: el saldo lleva su traducción a episodios, y **la pestaña «Recompensas» ya no existe** — su contenido se mudó al muro. |
| **Ficha de serie** | La pantalla de la app nativa tal como es hoy, capítulo por capítulo: «Volver», «Resumen» con el póster y **la sinopsis real del catálogo**, y la lista de «Capítulo N» con la píldora «Interactiva» y el candado. Encima, tres cosas que la ficha real no dice: dónde vas, qué ya viste, y **qué abre el siguiente** —el pase si lo tienes, el precio si no— dicho en la tarjeta donde está el muro. |
| **Player** | Se desliza hacia arriba para avanzar y hacia abajo para retroceder, como en el producto. |

Y el muro, con sus trece estados:

| # | Estado | Qué demuestra |
|---|---|---|
| 1 | Player · episodio gratis | El chip de saldo con traducción a episodios; progreso de serie |
| 2 | Muro · pase disponible | La jerarquía: historia → progreso → gratis → pago → racha |
| 3 | Elección de serie | El recurso escaso que hay que asignar |
| 4 | Desbloqueo + racha avanza | Recompensa, bono de noche 3, comodín ganado |
| 5 | Player · episodio abierto | El regreso al loop en un toque |
| 6 | Muro · pase gastado (la cita) | «Hoy a las 21:30 · tu hora de siempre», el intervalo debajo, y avísame |
| 7 | Muro · con saldo | El pago sube a primario, el saldo se declara en episodios |
| 8 | Tienda | Episodios grandes, monedas de subtítulo, precio por episodio |
| 9 | El comodín te cubrió | La mecánica de perdón, sin nada que reclamar |
| 10 | Se cortó la racha | El fallo sin castigo — y sin oferta para "recuperarla" pagando |
| 11 | Dos pases acumulados (tope) | El anti-FOMO: faltar no cuesta, volver seguido sigue rindiendo más |
| 12 | Guardar la racha | El prompt de cuenta con las tres cifras en juego |
| 13 | Mi economía | Fuentes, sumidero y posición, en una sola vista |

Y tres más en [`web/`](../../web/), sobre el stack real, que son **rutas prerrenderizadas** y no
estados de un panel: el pase listo, la cita de las 21:30 con «Avísame», y el contador de 42 minutos
donde los segundos vuelven a ser el héroe.

**El recorrido completo se verifica solo.** `npm run recorrer` maneja el prototipo como una persona —home → una serie sin empezar → ver los gratis → chocar con el muro— y comprueba once cosas, entre ellas que el muro abra con la historia antes que con el precio. Corre en el pipeline.

Esa comprobación ya encontró un bug que el panel escondía: **el episodio 1 de cualquier serie sin empezar abría el muro en vez del player**, porque la condición miraba los episodios vistos y no los gratis. Saltar a un estado con el panel demuestra que el estado existe, no que se pueda llegar a él.

**Es un prototipo funcional, no un clickable.** El estado vive en un reducer real (`src/lib/state.ts`), el countdown corre contra un reloj, el saldo se descuenta, la racha avanza, el comodín se consume solo y la emisión está topada en un pase por noche. Se puede llegar a cualquier estado jugando, sin usar el panel lateral.

*Acá decía «y el pase entra en cooldown de 24 h», que describía la mecánica vieja tres párrafos antes de que [§4.4](#44-cinco-cosas-que-cambiaron-por-verificar-y-por-usar-el-prototipo) anuncie que se cambió.* En `src/lib/economy.ts` el `PASS_COOLDOWN_MS` sobrevive como **techo de emisión** —no se genera más de un pase por noche—, no como el reloj que acredita: eso pasa al terminar un episodio, y la cita de mañana la ancla `HORA_HABITUAL`.

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
| Episodios gratis por serie | **10** (moda: 37 de las 41 series con muro) | Censo de las 50 series del catálogo |
| Series del catálogo | 50 · 2.230 episodios | Censo |
| Episodios gratis en total | 500 (22% del catálogo) | Censo |
| Precio de la serie mediana | 600 monedas ≈ $6.63 | 40 bloqueados × 15 |
| Paquetes actuales | $0.99/180 · $1.99/180 · $3.99/375 | Captura oficial del paywall (build 1.20.0) |

**Y las cifras se verifican solas.** `npm run verificar` corre 41 comprobaciones de los
documentos contra el código y contra el censo del catálogo: 35 son cifras (episodios, monedas,
precios, porcentajes) y 6 son invariantes que ninguna cifra sola expresa —que cada serie cuadre,
que la escalera de precios baje en cada escalón, que ningún paquete lleve precio tachado—.
Aparte, rastrea los textos buscando cifras que se corrigieron en el camino y podrían haber
sobrevivido a una edición, y audita el contraste de los tokens de texto. Corre en el pipeline
antes de cada build, así que una cifra vieja rompe el despliegue en vez de llegar al entregable.

`src/lib/economy.ts` marca cada constante como **REAL** o **PROPUESTA**. Es, a la vez, el modelo del POC y la especificación de la economía.

Las tres series del POC son reales y están elegidas para cubrir la moda y los dos extremos del censo: *La Enfermera Infiltrada* con 10 gratis (la moda: 37 de las 41 series con muro), *Pasión a Domicilio* con 12 (una de las dos que más regalan, junto con *Las Flores del Amor*) y *La Herencia del Patriarca Enamorado* con 7 (la que menos regala).

*Acá decía «las tres estructuras que existen en el catálogo». Son cuatro.* Entre las 41 series con muro la distribución de gratis tiene cuatro valores: una con 7, 37 con 10, una con 11 y dos con 12. Así que las tres del POC dejan sin representar a *La Mágica Navidad del Amargado Millonario*, la única con 11. No cambié la selección —los extremos son lo que hay que poder juzgar en el muro—, pero decir «las tres» era contar mal el propio censo.

## 4.4 Cinco cosas que cambiaron por verificar y por usar el prototipo

**El Pase dejó de colgar de un reloj.** Acreditaba uno cada 24 h. Al leer la versión paralela del reto vi que acreditar **al terminar un episodio** es mejor: la adopción de la fuente pasa a ~100% por construcción, en vez de depender de que el usuario llegue al muro. Es la corrección directa al 19% de reclamo. Y como acreditar en silencio dejaría el metajuego invisible —el defecto que este trabajo corrige—, el acuse es un toast de dos segundos: *«Noche 3 · +1 pase · +30 monedas»*.

**El countdown gigante estaba mal.** La primera versión mostraba `17h 47m 03s` como héroe. Al usarlo, comunica *«falta muchísimo»* — el mensaje opuesto al buscado. Se reemplazó por la hora del reloj (`HOY A LAS 21:30`, la hora de siempre del usuario) con el intervalo debajo. El countdown vuelve a ser héroe solo cuando falta menos de una hora.

**El pase caducaba, y eso era el error de Webtoon otra vez.** La primera versión decía *"no se acumula, el que no se usa se pierde"*. Al verificar el precedente — el Daily Pass de Webtoon, retirado en mayo de 2025 — resultó que la queja dominante de sus lectores durante cinco años fue justamente el "úsalo o piérdelo": convertía leer en una tarea. Era la misma trampa que el diagnóstico le señala a la racha diaria de Idilio, reintroducida sin darme cuenta. Los pases ahora se acumulan hasta 2: faltar una noche no cuesta nada y volver seguido sigue rindiendo más. Detalle completo en [§3.4bis](../03-diseno/#34bis--el-precedente-revisado-en-contra).

**Tocabas una historia y el reproductor te daba otra.** Es el peor fallo que encontré, y llevaba ahí desde el principio. El home muestra las 50 series del censo y la ficha de cualquiera funciona bien — pero el player y el muro leían un `seriesId` que solo se movía para las **tres** series con guion escrito. Abrir cualquiera de las otras 47 te dejaba viendo *Pasión a Domicilio* con un muro que decía *«quedan 44 episodios de Pasión a Domicilio»*. Yo había pedido *Enamoradas del Motociclista Mafioso*.

La raíz era una duplicación: el estado guardaba el progreso dos veces, en `vistos` (por id del catálogo) y en `unlocked` (por las tres con guion), o sea dos espacios de nombres para el mismo hecho. Se unificaron en el del catálogo, y `serieDe()` arma la serie desde el censo cuando no hay guion: título, total y gratis son cifras medidas. El muro cae entonces en *«La historia sigue.»* — que es verdad. Inventarle un cliffhanger a un contenido que no leyó nadie habría sido peor.

*Por qué no lo vio nadie antes.* [`recorrer.mjs`](../../poc/scripts/recorrer.mjs) caminaba justo por ese camino y pasaba, porque comprobaba `data-state` y nunca la **identidad**: el estado era el correcto y la historia era otra. Ahora comprueba las dos cosas en cada pantalla y camina además el flujo del pase entero —elegir serie, desbloquear, volver al episodio—, que es el corazón de la intervención y hasta hoy no lo recorría nadie. Con el fallo puesto a propósito, caen cuatro y señalan la sustitución.

**Después recorrí la otra mitad: la de pago.** La tienda es donde aterriza toda la pedagogía de la moneda, y hasta ese momento solo se verificaba saltando a ella con el panel. El camino entero —gratis, muro, pase, muro otra vez, tienda, compra, desbloqueo con monedas— funciona y **no encontró ningún fallo**. Vale decirlo igual: una prueba que solo se reporta cuando falla convierte el silencio en ambigüedad.

Lo que sí faltaba era que CI lo cubriera. Ahora son **29 comprobaciones donde había 11**. La que más pesa es la del badge *«termina esta serie»*, que cuando era fijo mentía en 40 de las 41 series con muro: se comprueba contra una serie de verdad —60 episodios bloqueados, no los 44 de *Pasión a Domicilio*— y verifica que el paquete ofrecido **alcance** para la meta. Con el badge fijo otra vez, el paso cae diciendo *«660 monedas para una meta de 885»*: el fallo original con sus números. Y el precio del episodio se importa del modelo en vez de escribirse a mano, para que no puedan divergir en silencio.

*Una cosa que parecía un fallo y no lo era.* El paquete de $0.99 da 12 episodios y el de $1.99 da 13: pagas el doble por uno más. Fui a mirar antes de tocarlo y en el producto real **los dos dan 180 monedas** —la bienvenida es un 50% sobre el mismo paquete—, así que el escalón es del producto, no de la propuesta. Queda registrado en `PACKS` con `live` al lado de `coins`, y el pie de la tienda excluye la bienvenida de la promesa de la escalera.

**La hoja del pase desmentía la mecánica.** Decía, quemado en el componente: *«Tienes un pase por noche. El que no uses hoy no se acumula.»* Es literalmente la regla vieja — el «úsalo o piérdelo» que [§3.4bis](../03-diseno/#34bis--el-precedente-revisado-en-contra) documenta como el error que hundió al Daily Pass de Webtoon y que esta mecánica corrigió. La pantalla central de la intervención le decía al usuario lo contrario de lo que el sistema hace. Sobrevivió a todas las correcciones del documento porque **nadie probaba el texto de la UI**; ahora sale del estado y el recorrido falla si vuelve a prometer que el pase caduca.

*Y la elección dejaba fuera la serie que estabas viendo.* Listaba solo las tres con guion, ordenadas por progreso: la historia que el usuario tenía delante podía no aparecer, y la hoja abría sin ninguna opción marcada. Ahora la del muro va siempre primera.

**«Tu economía» reportaba un número que el usuario puede desmentir de memoria.** Es la pantalla que responde al objetivo de experiencia del brief —*que el usuario entienda de dónde salen sus monedas*— y decía **«Pases usados esta semana: 2»** cuando yo no había usado ninguno. Salía de `state.nights`: contaba noches asistidas y las llamaba pases usados, porque el estado ni siquiera llevaba la cuenta. Ahora la lleva, y se reinicia con la vuelta de 7 noches, igual que la escalera.

Al arreglarlo apareció la de debajo: el total seguía valorando los pases por `nights` mientras la línea de arriba ya decía otra cosa, así que **los dos sumandos daban 0 y el total 30**. En esta pantalla concretamente, esa resta la puede hacer cualquiera.

**Y la escalera enseñaba lo contrario de lo que la mecánica hace.** La etiqueta de cada noche era `coins > 0 ? '+30' : 'pase'` — un ternario. Las noches 3, 5 y 7 mostraban el bono **en lugar** del pase, así que la tira leía como si esas noches dieran bono *en vez de* pase, cuando lo que hacen es sumar. En la pantalla que existe para deshacer ese malentendido. Ahora dicen `pase +30`.

Las tres se sostienen desde [`recorrer.mjs`](../../poc/scripts/recorrer.mjs), que llega a la pantalla como una persona —tocando el saldo— y comprueba que el número sea el gasto real, que el total sea la suma de lo que lista, y que ninguna noche esconda el pase. Reproduciendo el fallo original, el paso cae diciendo *«15 + 0 = 30»*.

**La versión sobre el stack real implementaba la mecánica vieja.** Es el único prototipo que nadie había usado como persona —se capturaba entrando por sus rutas y nada más—, y al pulsar *«Usar el pase»* la racha avanzaba de 2 a 3, se otorgaba el comodín y se pagaba el bono. El diseño dice lo contrario, y **el `use_pass()` que está en el mismo repositorio lo dice en un comentario**: *«Gastar el pase NO avanza la racha: eso ya pasó en `credit_night()` al terminar el episodio»*. El componente de React hacía justo lo que su propia función de servidor prohíbe.

**Y las dos versiones prometían «El próximo llega en 24 horas».** Es la mecánica que [D2b](../03-diseno/#d2b--la-cita-se-ancla-a-la-hora-de-siempre-no-a-24-h-desde-que-lo-usaste) reemplazó: `proximaCita()` devuelve la **hora de siempre** del usuario, así que nunca son 24 horas exactas — gastarlo a las 00:30 deja el próximo a 21 h, y a las 22:00 a 23:30. El muro ya lo decía bien; la celebración, que es la pantalla que todo el mundo ve al usar el pase, seguía con la frase vieja en el prototipo **y** en la web. Ahora las dos dicen la cita, o cuántos pases quedan si todavía hay.

*Un fixture que no obedecía a su propia función.* Al corregir la copia, la celebración de la web se quedaba sin poder decir la hora: el estado de *Pasión a Domicilio* traía `nextPassAt: null` con un pase en la mano, y `credit_night()` solo deja ese campo en null **en el tope de dos**. Con uno, el usuario sigue acumulando y la cita existe.

**Y esas tres pantallas se capturaban sin ninguna red.** En el manifiesto salían con `data-state: null`, porque la versión web no exponía el atributo que el export compara. Es exactamente el agujero por el que este script llegó a publicar tres veces el home con etiquetas de otras pantallas. Ahora la web declara su estado con el mismo vocabulario que `stateName()` del prototipo, y el export lo verifica antes de disparar: con un estado esperado incorrecto, se niega a capturar.

**El documento prometía un pase que el código no entregaba.** El diseño dice que el pase se *emite por reloj* y se *entrega al ver*, y que por eso al volver de una noche de ausencia hay **dos** esperando. Las dos implementaciones —el reducer del prototipo y `credit_night()` en SQL— entregaban `+1` por visita. La diferencia solo se nota en el caso que la mecánica existe para cubrir: quien gastó su pase anoche y faltó hoy volvía a encontrar uno solo, o sea *use it or lose it* — el error de Webtoon, otra vez, ahora escondido en una línea de código en vez de en una frase. Se corrigió en las dos, y ahora [`scripts/acreditacion.mjs`](../../poc/scripts/acreditacion.mjs) lo sostiene en CI: le devolví el `+1` fijo al reducer y la prueba cae señalando exactamente esa regla.

*Por qué hacía falta una prueba nueva.* [`recorrer.mjs`](../../poc/scripts/recorrer.mjs) evita el panel del director a propósito, porque saltar a un estado no prueba que se pueda llegar a él. Pero estas reglas hablan del **paso del tiempo**, y no hay forma de esperar una noche dentro de una prueba: ahí el panel es la única vía. Son dos scripts porque prueban dos cosas distintas, no por comodidad.

**El badge «Una serie completa» era falso en 40 de las 41 series con muro.** Estaba fijo sobre el paquete de 660 monedas porque *Pasión a Domicilio* cuesta exactamente eso — y es la única que cuesta exactamente eso. El censo mostró que las series van de 150 a 960 monedas, y los dos números que salen de ahí dicen cosas distintas: el badge es literalmente inexacto en 40 de 41, y en **19 de las 41 (el 46%)** el paquete directamente no alcanza para terminar la serie. Ese segundo caso es el que cuesta confianza, porque el usuario paga creyendo el badge y sigue frente al muro. Ahora la tienda abre con la meta calculada de la serie que el usuario está viendo y el badge cae sobre el paquete que de verdad alcanza.

*Acá decía «en el 46% de las compras».* El 46% son 19 de las 41 series con muro, no una fracción de las compras: ponderar por compras exigiría volumen de ventas, que el censo del catálogo no tiene.

**La tienda se contradecía a sí misma.** La primera versión mostraba «monedas por dólar» y el pie decía *«cada paquete rinde más por dólar que el anterior»* — pero los números daban 182, 151, 165, 180. Es exactamente el defecto que el diagnóstico le señala al producto real, reproducido por descuido. Se corrigió a **precio por episodio**, que además es la unidad legible, y la escalera quedó monótona de verdad: $0.15 → $0.11 → $0.10.

## 4.5 Qué queda fuera, a propósito

Navegación general, home, catálogo, búsqueda, perfil, reproducción de video real, compra real por IAP y persistencia entre sesiones. El brief lo excluye explícitamente y agregarlo diluiría la profundidad del único momento que sí importa evaluar.

## 4.6 Accesibilidad y contexto de uso

- Objetivos táctiles ≥44 px; todo alcanzable con el pulgar en el tercio inferior.
- Roles y `aria-label` en diálogos, temporizador, listas de selección y el chip de saldo (que se anuncia como *"Saldo: 90 monedas, 6 episodios"*).
- `prefers-reduced-motion` respetado: todas las animaciones se anulan.
- Blanco máximo `#F2EBF7` en lugar de `#FFFFFF`, pensado para brillo bajo en la franja de 11 p.m. a 2 a.m. — pero **ningún** token de texto por debajo de 4.5:1, y el ratio se calcula en el pipeline.
- Ningún estado depende solo del color: la racha combina color, icono y etiqueta de texto.

Los dos árboles auditados con **axe-core** (`wcag2a`, `wcag2aa`, `wcag21aa`, `best-practice`): **0 violaciones** en las tres superficies desplegadas — prototipo, galería de flujos y versión sobre el stack. La primera pasada del prototipo encontró cuatro — `maximum-scale` bloqueando el zoom, falta de landmark `main`, contenido fuera de landmarks y orden de encabezados — y están corregidas.
