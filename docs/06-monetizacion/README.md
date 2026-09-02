# 6. Monetización

> **La pregunta.** Si la usuaria promedio de Idilio es una mujer de estrato medio-bajo con poca
> capacidad de pago, ¿la salida es monetizar con publicidad? ¿Y hay que ampliar el catálogo más
> allá del microdrama romántico —suspenso, ciencia ficción— para llegar a público con más
> capacidad económica?
>
> **Qué es esto.** No es un entregable del reto: los cuatro que pidió el brief están
> [en el sitio](../01-diagnostico/) y hablan de retención. Esto sale de aplicarle al mismo
> material una pregunta distinta —**cómo gana plata Idilio**— y trae análisis y propuesta juntos,
> en ese orden.
>
> **Procedencia.** **[M]** medido —censo, dogfooding o brief—, **[S]** supuesto declarado con
> banda, **[I]** inferencia. **Ningún número de ingreso publicitario de esta página es un dato de
> Idilio.** Lo que aporto es la estructura de la cuenta; los siete datos que la cierran están en
> [§6.14](#614-los-siete-datos-que-faltan).

---

## 6.1 El veredicto

| | |
|---|---|
| **1** | **La publicidad es la línea que falta — no la que manda, y esa distinción la trajo el benchmark.** Idilio ya tiene anuncios y no le cobra a nadie: regala un episodio por anuncio, hasta diez al día [M], cuando para que esa transacción cerrara el eCPM tendría que ser de **US$ 177** y el real en Colombia está entre **US$ 2 y 6** [S]. Hoy el anuncio es un cupón de descuento, no un canal de ingreso. **Pero el 60% del ingreso mundial del microdrama viene de pago directo** [M, Omdia], así que la publicidad es la segunda línea, no la primera. Se cobra sobre **visionado**, no sobre desbloqueos. |
| **2** | **El mapeo de la premisa está invertido, y darlo vuelta la vuelve mucho más fuerte.** La publicidad no le cobra al espectador sino al anunciante. Mujeres de 25 a 54 en Latinoamérica son las decisoras de compra del hogar: **no es una audiencia pobre, es una audiencia mal vendida.** Lo que le pone techo al eCPM no es su ingreso, es que un catálogo íntegramente de romance subido de tono queda clasificado como contenido sensible y no accede a la demanda de marca. |
| **3** | **El competidor no es ReelShort: es el feed — y el dueño del feed cobra aparte.** El **44% de quienes ven microdrama lo hacen en YouTube y el 38% en TikTok** [M, Ampere sobre 100.000 consumidores]. Y aun así ByteDance, dueña de TikTok, vende microdrama en **dos apps de pago separadas** —PineDrama y LimeShorts, a US$ 20 por semana— en vez de monetizarlo dentro de TikTok. **Lo que se paga no es el video: es saber cómo termina** ([§6.3](#63-benchmark-quién-paga-por-video-y-por-qué-no-se-va-a-tiktok)). |
| **4** | **La publicidad es un negocio de escala, y Idilio no la tiene todavía.** Bien construida vale **≈ US$ 660 k al año** en el escenario base [S] — que con el 95%+ que no paga está en el mismo orden que todo el ingreso in-app actual. **No lo reemplaza: lo duplica.** Se vuelve el negocio principal a diez veces el MAU de hoy. |

> **Los anuncios monetizan al núcleo que ya está. Los géneros nuevos hacen crecer la suscripción
> — y, de paso, vuelven vendible el inventario del núcleo.**

**Y la tesis que sale de cruzar las dos mitades del benchmark, que es más precisa que la que este
documento tenía antes:** en el mundo, esta categoría **cobra** —60% del ingreso es pago directo, y
el microdrama saca US$ 10–25 por usuario al mes contra los US$ 3–8 del streaming—; en
Latinoamérica, el dinero **se está yendo a la publicidad** —AVOD +74% hasta US$ 8,0 B, y en Brasil
ya es el 37% del ingreso de streaming—. **Idilio está justo en ese cruce, y por eso necesita las
dos líneas y no una.** Lo que sigue construye la que falta sin tocar la que ya factura.

**La propuesta, en cinco movimientos:**

| | Movimiento | Cuesta |
|---|---|---|
| **1** | **Un piso gratuito con pauta: «Idilio Libre».** La biblioteca cuya ventana de explotación ya venció se ve entera y gratis, con cortes y sin muro | Producto, no contenido |
| **2** | **La publicidad se cobra por visionado.** Corte entre episodios con carga acotada; el recompensado deja de ser la única superficie | ~3 semanas + mediación |
| **3** | **Cuatro productos publicitarios en vez de uno.** Recompensado · corte in-stream · patrocinio de serie · microdrama de marca | El cuarto no depende de escala |
| **4** | **El catálogo se ensancha empezando por lo que ya está.** Dos rieles de suspenso con series que Idilio **ya tiene** | **1 semana, cero producción** |
| **5** | **La suscripción se reempaqueta como «sin cortes»** — y **se descarta el plan anual** que este documento recomendaba antes de tener el benchmark ([§6.5](#65-la-propuesta-tres-pisos)) | Copy y precio |
| **6** | **El Piso 0 sale a buscar a la audiencia donde ya está: YouTube y TikTok.** Es el movimiento que el benchmark agregó, y ninguno de los otros cinco lo cubría | Distribución, no producto |

---

## 6.2 La premisa, corregida

### Lo que acierta

| Sostiene | Evidencia |
|---|---|
| La base no paga y no va a pagar | Latinoamérica tiene **el ingreso por instalación más bajo del mundo (~US$ 0,10 a D14)** y el mayor crecimiento mediano de MRR (17,2%) [M, RevenueCat vía [§5.2](../05-benchmark/)] |
| Es hacia dónde va la categoría | **El 57,6% ya opera con monetización híbrida** — suscripción + microtransacción + anuncios [M, Mintegral] |
| Hay prueba de existencia a escala | **Hongguo Short Drama** (ByteDance): 304 M de MAU, ~125 min diarios, **todo gratis financiado por publicidad, sin muro de monedas** [M, [§5.3](../05-benchmark/)] |
| Monetizar al no-pagador es la palanca sin explotar | El **95%+ de la base no paga** [M]. Toda la escalera de precios le habla al 5% |

### Lo que no está medido en ninguna parte de este trabajo

**«Mujeres de estrato medio-bajo» no aparece en el brief, ni en el censo, ni en el dogfooding.**
Es la única afirmación sobre la que se apoyaría una inversión en catálogo, y es la que no tiene
respaldo propio. *El benchmark sí trae el dato de la **categoría**, y matiza la premisa en una
dirección concreta: el espectador latinoamericano de microdrama es bastante más joven que el
estadounidense ([§6.3.5](#635-una-corrección-a-la-premisa-con-datos-de-categoría)).* Verificarla
sobre la base propia es gratis y toma una tarde:

1. **Google Play Console y App Store Connect** — edad y género de la base instalada, por país.
2. **El panel de la red de anuncios** — qué audiencia están comprando ya los anunciantes, y a qué
   eCPM. Es la respuesta *comercial*, que es la que importa.
3. **Mix de dispositivo y sistema operativo** — el mejor proxy de capacidad de pago en la región.
   El indicio que ya está en el repo apunta fuerte a Android: **4,7★ sobre 28 K valoraciones en
   Google Play contra 4,9★ sobre 36 en App Store US** [M, [§5.1](../05-benchmark/)].
4. **La distribución de pagadores** cruzada contra las tres anteriores.

> **Si la premisa es falsa**, el problema no es de monetización sino de conversión, y la respuesta
> está en la [Etapa 1 de la estrategia](../02-estrategia/) —traducir la economía, arreglar la
> escalera— y no acá. Por eso es el primer dato a mirar y el más barato de los seis.

### El eslabón que va al revés

La cadena de la premisa es *base pobre → anuncios → ampliar catálogo → público con más plata →
monetizar*. Los extremos son correctos; el medio va cruzado:

| | Le habla a | Monetiza con | Qué hay que construir |
|---|---|---|---|
| **Catálogo actual** (romance) | La base de hoy: alto volumen, sensible al precio | **Publicidad** — volumen de atención | La línea publicitaria ([§6.5](#65-la-propuesta-tres-pisos), [§6.6](#66-cuatro-productos-publicitarios-no-uno)) |
| **Catálogo ampliado** (suspenso, true crime, sci-fi) | Público nuevo con hábito de pagar streaming | **Suscripción**, y de paso inventario vendible a marca | Contenido por fases ([§6.7](#67-el-catálogo-qué-se-produce-y-en-qué-orden)) |

---

## 6.3 Benchmark: quién paga por video, y por qué no se va a TikTok

*Investigación secundaria, septiembre de 2026. Fuentes públicas, enlazadas en el texto. Todo lo de
esta sección es **[M] medido por terceros**, no por mí, y las fuentes tienen calidad desigual: las
casas de análisis —Ampere, Omdia, Sensor Tower, Deloitte, 3Vision— pesan más que los agregadores
de estadísticas.*

### 6.3.1 El tablero: qué le vende cada modelo a quién

Latinoamérica llega a **142 M de suscripciones SVOD en 2026** y **US$ 17,1 B de ingreso**, camino a
178 M y US$ 22,3 B en 2031 ([3Vision](https://www.3vision.tv/news-insights/americas-streaming-market-forecast-2026-2031-a-165-billion-market-running-at-two-speeds)).
El detalle que importa está en la diferencia entre esos dos crecimientos: **las suscripciones suben
25% y el ingreso solo 14%.** La región agrega usuarios más rápido de lo que agrega plata — cada
suscriptor nuevo vale menos que el anterior.

| Plataforma | Público objetivo | Modelo | Precio / ARPU | Escala en LatAm |
|---|---|---|---|---|
| **Netflix** | Hogar de clase media, TV conectada | Suscripción con piso publicitario | **ARPU LatAm ≈ US$ 7** contra US$ 18,65 en EE.UU./Canadá | **53,8 M** suscripciones |
| **Prime Video** | Comprador de Amazon; el video viene con el envío | Suscripción empaquetada | No se cobra sola | 17,5 M |
| **Disney+** | Familias y deporte | Suscripción con piso publicitario | — | 16,9 M |
| **Max** | Series de prestigio, deporte | Suscripción | — | 9,6 M · **el que más rápido crece** |
| **ViX** | Hispanohablante, telenovela y fútbol | **Tres pisos: gratis / premium con anuncios / premium sin anuncios** | — | ~9 M · **ViX Gratis llega a 40 M** de hispanohablantes |
| **Pluto TV · Tubi** | Quien no piensa pagar nunca | **Gratis total, financiado por pauta** | US$ 0 | **FAST en LatAm pasa de US$ 1,0 B a 2,1 B** |
| **YouTube** | Todos | Gratis + Premium por quitar anuncios | **125 M** de suscriptores Premium globales | — |
| **TikTok** | Todos | **Solo publicidad** | ARPU global ≈ US$ 16/año | — |
| **ReelShort · DramaBox** | Microdrama, pago por episodio | Monedas + suscripción + anuncios | **ARPU equivalente US$ 10–25/mes** | ~US$ 140 M cada una solo en Q1-2026 |
| **Idilio** | Microdrama en español | Monedas + suscripción | **$ 24.500 COP/mes ≈ US$ 8** | Cientos de miles de MAU |

**Y el dato que reordena la lectura:** **el AVOD latinoamericano crece 74% hasta US$ 8,0 B**, y en
Brasil —el mercado más maduro de la región— **la publicidad ya es el 37% del ingreso total de
streaming**, con Globoplay facturando US$ 640 M solo en AVOD. La región no está migrando hacia la
suscripción: está migrando hacia la publicidad.

### 6.3.2 Los cuatro modelos, y qué vende realmente cada uno

| Modelo | Qué cree el usuario que compra | Qué compra de verdad |
|---|---|---|
| **Suscripción** (Netflix, Max) | Contenido | **Conveniencia** — 44% de quienes pagan lo hacen porque pone todo bajo un techo y les ahorra decisiones ([Simon-Kucher](https://www.simon-kucher.com/en/insights/us-results-2025-global-streaming-study-0)) |
| **Freemium de tres pisos** (ViX, YouTube) | Contenido premium | **Quitar el anuncio.** 20,9% de los consumidores paga de más solo por no verlos |
| **Gratis total** (Pluto, Tubi, TikTok) | Nada | Nada. **Y encima ganan:** Tubi, Pluto TV y The Roku Channel sacan **la mejor calificación de «valor excelente»** de toda la categoría, por delante de Prime, Max, Apple TV y Netflix ([Advanced Television](https://www.advanced-television.com/2026/07/13/research-us-streaming-consumers-prioritise-low-price/)) |
| **Pago por episodio** (ReelShort, Idilio) | El siguiente episodio | **La resolución.** Es el único de los cuatro que cobra por saber cómo termina |

Esa cuarta fila explica la brecha de ARPU: **el streaming tradicional saca US$ 3–8 al mes por
usuario y el microdrama US$ 10–25**, y la razón que da la industria es que *«la monetización ocurre
dentro del bucle emocional, no contra un muro de suscripción»*
([Streaming Radar](https://lens.streaming-radar.com/micro-drama-apps)). **El microdrama cobra
varias veces más por usuario que Netflix, con un contenido que cuesta una fracción.**

### 6.3.3 Por qué alguien paga si TikTok es gratis

**Primero, el dato incómodo: la mayoría no paga, porque ya lo está viendo gratis.**

> Ampere Analysis encuestó a **100.000 consumidores**: más de **uno de cada diez usuarios de
> internet** ya vio microdramas, y **el 44% lo hizo en YouTube y el 38% en TikTok**
> ([Ampere](https://worldscreen.com/tvdrama/ampere-micro-dramas-draw-massive-global-viewer-numbers/)).
> **El competidor de Idilio no es ReelShort. Es el feed.** Y el feed no cobra.

**Segundo: y aun así el mercado de pago existe, es grande y acelera.** El ingreso in-app de
micro-series fue de **US$ 3,8 B en 2025** y Deloitte proyecta **US$ 7,8 B en 2026**
([Deloitte](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/short-form-video-series.html)).
Omdia estima el mercado global en **US$ 11 B**, y **el 60% viene de suscripción o pago
transaccional** — no de publicidad ([Digital Content Next](https://digitalcontentnext.org/blog/2026/03/05/how-microdramas-hook-viewers-and-drive-revenue/)).
Solo en Estados Unidos el formato facturó **US$ 1,3 B en 2025, en su mayoría por pago directo del
espectador**.

**Tercero, y es la prueba más fuerte de todo este benchmark: el dueño del feed gratis está cobrando
por microdrama fuera del feed.**

> ByteDance —dueña de TikTok— lanzó **PineDrama** en enero de 2026 en Estados Unidos y Brasil, que
> vende **acceso sin anuncios** al género; y desde marzo de 2026 prueba **LimeShorts** en Estados
> Unidos, a **US$ 20 por semana o US$ 200 al año**
> ([Tubefilter](https://www.tubefilter.com/2026/07/23/tiktok-lime-shorts-paid-microdrama-app/)).
>
> **La empresa que mejor conoce la economía de la atención gratuita decidió que el microdrama no se
> monetiza dentro de TikTok, sino en una app aparte y de pago.** Si el feed pudiera capturar este
> valor, ByteDance no estaría construyendo dos aplicaciones para hacerlo.

### 6.3.4 El mecanismo: lo que se paga no es el video, es el final

| | **El feed** (TikTok, Reels, Shorts) | **La serie** (Idilio, ReelShort, Netflix) |
|---|---|---|
| Qué vende | Una sesión | Un final |
| Qué pasa si te vas | Nada. Hay otro video | **No sabés cómo termina** |
| Costo de abandonar | Cero | El único costo real que existe en video |
| Cuándo aparece la disposición a pagar | Nunca | En el cliffhanger, y solo ahí |
| Qué se puede cobrar | La atención, al anunciante | La resolución, al espectador |

**El feed y la serie no compiten por lo mismo, aunque compitan por el mismo minuto.** En el feed el
costo de abandono es cero por diseño: la siguiente pieza siempre está ahí y siempre es gratis. En
una serie el abandono cuesta —no saber cómo termina— y **ese costo es lo único que un producto de
video puede cobrarle a alguien que ya tiene entretenimiento infinito y gratis en el bolsillo.**

Los datos de la suscripción lo dicen desde el otro lado: lo que más valoran quienes pagan es
*«acceso a todas las temporadas y episodios, y poder maratonear»*, y **el 34% de las cancelaciones
se explica por agotamiento del catálogo** — se acabó lo que había que ver
([Retention Check](https://retentioncheck.com/churn-benchmarks/streaming-services)). **Se paga por
una historia, y se cancela cuando la historia se termina.** El 2026 ya tiene nombre para eso:
*strategic churning*, suscribirse para un estreno y cancelar enseguida.

### 6.3.5 Una corrección a la premisa, con datos de categoría

En [§6.2](#62-la-premisa-corregida) escribí que la demografía de Idilio no está medida en ninguna
parte de este trabajo. Sigue sin estarlo — pero la de la **categoría** sí, y matiza la premisa en
una dirección concreta:

| | 16–24 | 25–34 | 35–44 |
|---|---|---|---|
| **Estados Unidos y Canadá** | 21% | 24% | 22% |
| **Latinoamérica** | **30%** | **26%** | 17% |

*Distribución de espectadores de microdrama por región ([Streaming Radar](https://lens.streaming-radar.com/micro-drama-apps)).*

Mientras la prensa describe a la audiencia estadounidense como **«mujeres urbanas y acomodadas de
30 a 60»**, la latinoamericana **es marcadamente más joven: el 30% tiene entre 16 y 24 años.** La
mitad de la premisa —poca capacidad de pago— gana respaldo; la otra mitad —el perfil de mujer
adulta— puede estar describiendo el mercado estadounidense y no el colombiano. **Es una razón más
para mirar el dato propio antes de comprometer catálogo, no una razón para no hacerlo.**

Y un contexto que juega a favor: **Latinoamérica ya es el 23% de las descargas globales de apps de
microdrama** —850 M en el trimestre, +140% interanual— y el tiempo diario en la categoría llegó a
**25 minutos, mientras el streaming tradicional lleva años plano en ~35**
([Sensor Tower](https://sensortower.com/blog/state-of-short-drama-apps-2026-report)).

### 6.3.6 Qué le cambia esto a la propuesta

**1 · El Piso 0 no canibaliza una venta: recupera una sesión que hoy ocurre en el feed de otro.**
Si el 44% y el 38% de esta audiencia ya ve microdrama gratis en YouTube y TikTok, el contrafáctico
de una serie abierta con pauta no es *«esa persona habría pagado»* sino *«esa persona habría
scrolleado en otra app»*. Es el argumento más fuerte a favor del Piso 0, y no estaba en este
documento antes del benchmark.

**2 · La suscripción de Idilio no puede venderse como Netflix.** Netflix vende catálogo, y el
catálogo de Idilio se agota — con un 34% de churn por agotamiento en la categoría entera, vender
«todo el catálogo» es vender exactamente lo que produce la cancelación. **Se vende como YouTube
Premium: quitar la fricción.** Que es justo lo que el Piso 2 *«Todo Idilio, sin cortes»*
([§6.5](#65-la-propuesta-tres-pisos)) hace posible por primera vez.

**3 · El precio de Idilio no es el problema, y ahora hay con qué demostrarlo.** LimeShorts, de
ByteDance, pide **US$ 20 por semana**; el Pase Idilio mensual son **≈ US$ 8**. Idilio es del orden
de **diez veces más barato al mes que lo que ByteDance cree que vale este contenido en un mercado
desarrollado.** Con la brecha de ingreso entre regiones eso es esperable —el ARPU de Netflix en
LatAm es US$ 7 contra US$ 18,65 en EE.UU.—, pero descarta la lectura de que el muro no convierte
por caro. **No convierte porque la razón para pagar no está dicha**, que es lo que sostiene el
[diagnóstico](../01-diagnostico/) desde el principio.

**4 · Y confirma la dirección publicitaria por el flanco que faltaba.** El AVOD latinoamericano
crece 74% hasta US$ 8,0 B y en Brasil ya es el 37% del ingreso de streaming. La pauta no es el
plan B de esta región: es hacia donde se está moviendo el dinero.

> **Dónde aterrizó cada una.** Este benchmark no se quedó en observación: la propuesta que sigue ya
> está corregida con él, y en dos puntos **contra lo que este mismo documento decía antes**.
>
> | Lo que trajo el benchmark | Qué cambió en la propuesta |
> |---|---|
> | El 60% del ingreso de la categoría es pago directo | La publicidad pasa a ser **la línea que falta, no la que manda** ([§6.1](#61-el-veredicto), [§6.8](#68-cuánto-vale-supuestos-y-tres-escenarios)) |
> | 44% YouTube · 38% TikTok | **Movimiento 6:** las series del Piso 0 se publican enteras en social ([§6.5](#65-la-propuesta-tres-pisos)) |
> | 34% del churn es agotamiento de catálogo | **Se retira el plan anual** que yo mismo había propuesto ([§6.5](#65-la-propuesta-tres-pisos), decisión 12) |
> | Lo que se paga es la resolución | El escalón alto de la escalera se vende como *«termina esta historia»* ([§6.5](#65-la-propuesta-tres-pisos), decisión 7) |
> | La audiencia latinoamericana es más joven | La premisa queda matizada, y el dato propio sigue siendo el primer paso ([§6.2](#62-la-premisa-corregida)) |

---

## 6.4 El hallazgo: Idilio regala episodios y cobra un error de redondeo

El producto entrega **15 monedas por anuncio, con tope de 10 diarios** [M], y el episodio cuesta
**15 monedas sin una sola excepción** en las 41 series con muro [M, censo]. La equivalencia es
limpia: **un anuncio = un episodio.** Del otro lado, el episodio tiene precio de lista: **$ 540
COP** al peldaño regular, **$ 208** al de bienvenida [M].

> **Para que un anuncio pagara el episodio que abre, el eCPM tendría que ser de ≈ US$ 177**
> —o US$ 68 contra el peldaño barato—. *($ 540 COP por impresión × 1.000, a la tasa de ≈ 3.050
> COP/USD que usa [§3.4bis](../03-diseno/#34bis--el-precedente-revisado-en-contra).)*
>
> **El eCPM real de video recompensado en Colombia está entre US$ 2 y 6 [S]. La brecha es de 30 a
> 90 veces.**

**Y eso no es una pérdida de $ 540 por anuncio**, porque el valor regalado solo es real contra el
contrafáctico de que esa persona hubiera pagado. Para el 95%+ que no paga nunca, el intercambio no
cuesta nada y devuelve medio centavo de dólar. **La conclusión correcta no es que el grifo sea
caro: es que no es un canal de ingreso.**

| | Hoy | Lo que tiene que ser |
|---|---|---|
| Qué se vende | Un desbloqueo | Tiempo de visionado |
| Quién decide que haya anuncio | El usuario, si encuentra la tarjeta | El producto, como parte del contrato del piso gratuito |
| Techo de impresiones | 10 por usuario y día, y casi nadie llega | El contenido consumido: **~140 episodios por MAU al mes** [I] |
| Función económica | Discriminación de precios con devolución marginal | **Segunda línea de ingreso** |

Idilio ve unos **42 millones de episodios al mes** [I, [§6.8](#68-cuánto-vale-supuestos-y-tres-escenarios)]
y monetiza publicitariamente una fracción mínima.

> **Esto no contradice la Etapa 1 de la estrategia: le agrega una razón.**
> [I2](../02-estrategia/#i2--el-muro-muestra-las-salidas-que-ya-existen) —subir el anuncio al
> primer renglón del muro y traducir su `0/10` a *«te quedan 10 episodios gratis hoy»*— ya era lo
> más barato del portafolio. Ahora además es la primera palanca de la línea publicitaria: **cada
> anuncio que hoy no se ve es una impresión que no se cobra.**

---

## 6.5 La propuesta: tres pisos

Es el modelo de **ViX** —gratis / premium con anuncios / premium sin anuncios—, que además es el
competidor directo en español [M, [§5.3bis](../05-benchmark/)]. No hay que inventarlo: hay que
adaptarlo.

| | **Piso 0 · Idilio Libre** | **Piso 1 · Monedas** | **Piso 2 · Pase Idilio** |
|---|---|---|---|
| **Qué se ve** | Series **completas** de la biblioteca vencida | Estrenos: 10 gratis, después muro | Todo |
| **Qué cuesta** | Nada | 15 monedas/episodio · packs desde $ 2.500 | $ 12.500/sem · $ 24.500/mes · **anual, nuevo** |
| **Publicidad** | **Sí** — 1 corte cada 4 episodios | Solo el recompensado, opcional | **Ninguna, jamás** |
| **Cómo monetiza** | Impresiones | Microtransacción | Suscripción |

### Piso 0 · la biblioteca abierta

Un microdrama **se produce en una semana y se explota durante un mes** [M,
[§5.3bis](../05-benchmark/)]. Pasado ese mes el muro no recauda casi nada y la serie sigue
ocupando catálogo. **Un activo depreciado vale más como inventario que como muro.**

> **La regla de entrada, que es una regla y no un juicio:** una serie pasa al Piso 0 cuando **el
> ingreso semanal de su muro cae por debajo del ingreso publicitario esperado de abrirla.**
> Escrita así, el riesgo que más asusta —que el Piso 0 canibalice la venta— **no puede
> materializarse**: nada entra hasta que ya dejó de venderse. Solo hace falta un dato, y Idilio lo
> tiene ([§6.14](#614-los-siete-datos-que-faltan), dato 5).

**Cómo se ve.** Un riel propio en el home —*«Gratis y completas»*—, sello en la portada, y una
línea nueva en el muro:

```
🔒 Episodio 16/56 · Te falta 1 episodio

  ▸ Tu Pase de la Noche llega hoy a las 21:30 · tu hora de siempre
  ▸ Ver un anuncio y abrir este episodio            te quedan 10 hoy
  ▸ Gratis y completas en Idilio Libre              con algunos cortes
  ─────────────────────────────────────────────────────────────────
  ▸ Paquetes de episodios                           desde $ 208 c/u
  ▸ Pase Idilio · todo abierto y sin anuncios       $ 24.500/mes
```

*Maqueta, no producto. El orden —lo gratis arriba de lo pago— es el de
[D2](../03-diseno/#d2--lo-gratis-siempre-va-arriba-de-lo-pago).*

Esa tercera línea hace lo que ninguna otra salida del muro hace: **ofrecer una historia entera.**
Hoy «empezar otra serie» significa chocar contra otro muro dentro de diez episodios [M, censo].

> **Y es a la vez su mejor propiedad y su mayor riesgo.** Una serie completa y gratis es también
> la mejor razón que tuvo nunca alguien para **saltar de historia** en vez de quedarse — que es la
> conducta que el [diagnóstico](../01-diagnostico/) señala como el problema. Por eso el Piso 0 se
> puebla con **series completas y nunca con arranques**, y por eso
> [I8](../02-estrategia/#i8--el-pase-como-puente-entre-series) deja de ser una intervención de
> descubrimiento sin mucho que descubrir y pasa a ser el mecanismo que dirige el salto.

### El Piso 0 no vive solo dentro de la app *(ajuste del benchmark)*

Este documento planteaba el Piso 0 como reciclaje: un activo depreciado rinde más como inventario
que como muro. Sigue siendo cierto y sigue siendo la regla de entrada. Pero el benchmark le cambia
**el trabajo**: si el **44% de esta audiencia ve microdrama en YouTube y el 38% en TikTok**, el
Piso 0 no es un depósito de series viejas — **es el argumento para abrir Idilio en vez de abrir el
feed.** Y un argumento que solo se puede leer estando ya dentro de la app no le habla a nadie que
esté afuera.

**Dos consecuencias concretas, y la segunda no estaba en la propuesta.**

**1 · El Piso 0 no puede ser solo lo que sobró.** Si su función es competir contra el feed, tiene
que llevar al menos un título que alguien recomendaría. Idilio ya tomó esa decisión una vez y le
salió bien: **dos de sus cuatro finalistas del India Catalina son series enteramente gratis**
[M, [§5.1](../05-benchmark/)]. La muestra gratuita ya incluye su material premiado; el Piso 0 es
esa misma decisión, sistematizada.

**2 · Las series del Piso 0 se publican en YouTube y TikTok, completas.** Es exactamente lo que
hace ViX —tráiler y cinco primeros episodios en Instagram, TikTok, Facebook y X, el resto en la
app [M, [§5.3bis](../05-benchmark/))— y lo que Idilio no hace. La diferencia que propongo es que
ahí vaya la **serie entera del Piso 0**, no un adelanto: el adelanto compite contra el feed con las
armas del feed y pierde, porque el feed tiene infinitos adelantos gratis. Una historia completa no
compite: es lo que el feed no tiene.

| | Qué se publica afuera | Qué queda en la app |
|---|---|---|
| **ViX** (hoy) | Tráiler + 5 episodios | El resto de la serie |
| **Idilio** (propuesta) | **La serie del Piso 0, entera** | **Los estrenos, la continuidad y la cita del Pase** |

**Y esto le da a [I4](../02-estrategia/#i4--continuidad-web--app) —la continuidad web→app— el
volumen que hoy no tiene.** Esa intervención arregla un aterrizaje que hoy vale cero; con
distribución en social, pasa a ser el camino por donde entra la gente. La instrumentación es la
misma; lo que cambia es cuánta gente la usa.

> **El riesgo, dicho antes de que aparezca:** regalar la serie entera en YouTube puede volver
> innecesario instalar la app. Se acota con lo mismo que hace ViX — **la continuidad vive solo en
> la app**: el Pase de la Noche, la racha, «seguir viendo» y los estrenos no existen en YouTube.
> Se publica la historia, no el producto. **Guardrail:** si las instalaciones atribuidas a social
> no crecen en 4 semanas, se corta la distribución externa; regalar contenido sin capturar entrada
> es publicidad para YouTube, no para Idilio.

### Piso 1 · monedas, sin cambios — con una regla de precio nueva

Los estrenos conservan el muro, los 10 gratis, las 15 monedas y la escalera que
[I3](../02-estrategia/#i3--la-escalera-de-precios-vuelve-a-ser-una-escalera) arregla. **El Piso 0
no le quita nada porque solo recibe lo que ya dejó de rendir.**

Lo que sí hay que corregir: terminar la serie mediana con monedas sale **≈ $ 21.000** y el mensual
abre el catálogo entero por **$ 24.500** [M, [§5.1](../05-benchmark/)]. Una serie no puede costar
lo mismo que todas.

> **Regla:** completar cualquier serie con monedas cuesta **como máximo el 60% del plan mensual.**

**Y una segunda regla que sale del benchmark: el escalón más alto de la escalera se construye sobre
la resolución, no sobre el volumen.** Si lo que se paga es saber cómo termina
([§6.3.4](#634-el-mecanismo-lo-que-se-paga-no-es-el-video-es-el-final)), entonces el producto de
mayor valor de la tienda no es «725 monedas» sino ***«termina esta historia»***, con el nombre de
la serie adentro y su precio dicho de una vez. El paquete ya existe —*«Completa la serie»*— y hoy
está roto: cuesta casi el doble que el anterior y mejora el precio por episodio un 1,7%
[M, [§1.2/F3](../01-diagnostico/#f3--comprar-el-paquete-más-grande-no-le-conviene-a-nadie)]. **La
escalera no necesita un escalón nuevo: necesita que el que ya tiene arriba deje de venderse como
un bulto de monedas.**

### Piso 2 · el reempaquetado

Hoy el Pase vende *«desbloquea todo»* y *«sin anuncios»*. **La segunda es casi ficticia**: los
anuncios son opcionales y están escondidos, así que se le cobra al usuario por quitarle una
molestia que no tiene. Con los cortes del Piso 0 el beneficio se vuelve real.

> **La publicidad es la mejor herramienta de venta de suscripciones que existe** — es el mecanismo
> con el que Hulu, Spotify, YouTube y ViX venden su nivel de pago. El Piso 0 no compite con el
> Piso 2: **lo alimenta.**

**Un cambio: la promesa escrita entera — *«Todo Idilio, sin cortes»*.** Sin anuncios y sin muro,
dicho en la misma línea. Es literalmente lo que vende **PineDrama**, la app que ByteDance lanzó en
enero de 2026: *acceso sin anuncios al género* [M, [§6.3](#63-benchmark-quién-paga-por-video-y-por-qué-no-se-va-a-tiktok)].

> ### Y un cambio que retiro: el plan anual
>
> **Este documento recomendaba agregar un plan anual. El benchmark dice que es una mala idea para
> este catálogo, y lo retiro.**
>
> El motivo es un número: **el 34% de las cancelaciones de streaming se explica por agotamiento de
> catálogo** — se acabó lo que había que ver [M,
> [§6.3.4](#634-el-mecanismo-lo-que-se-paga-no-es-el-video-es-el-final)]. Un plan anual sobre un
> catálogo que se agota le cobra a alguien doce meses de algo que se le termina en dos, y eso no
> produce ingreso recurrente: produce pedidos de reembolso y reseñas de una estrella. Es
> exactamente el pasivo reputacional que [D4](../05-benchmark/) documenta como la queja #1 de la
> categoría.
>
> **La preferencia revelada de la región apunta al otro lado y también la había leído mal:** el
> plan semanal se lleva el **29% del ingreso de suscripción latinoamericano** [M, RevenueCat], y
> 2026 es el año del *strategic churning* —suscribirse para un estreno y cancelar enseguida—. En
> un catálogo que se agota, **el compromiso corto no es una debilidad del producto: es la forma
> correcta del producto.** Semanal y mensual se quedan; el anual entra solo si algún día la
> cadencia de estrenos supera al consumo, y eso es una medición, no un supuesto.

**Y la regla que no se rompe nunca**, de [D4 del benchmark](../05-benchmark/) —la doble
monetización es la queja #1 de la categoría—: **el suscriptor no se encuentra jamás con un muro ni
con un anuncio.** Ni en estrenos, ni por error de configuración. Se prueba con un test
automatizado, no con una intención.

---

## 6.6 Cuatro productos publicitarios, no uno

| | Producto | Formato y ubicación | Tope | Quién lo compra |
|---|---|---|---|---|
| **P1** | **Recompensado** *(existe)* | Video vertical en el muro. Abre el episodio, no acredita monedas ([I2](../02-estrategia/#i2--el-muro-muestra-las-salidas-que-ya-existen)) | 10/día, sin cambios | Adquisición: juegos, apps, fintech |
| **P2** | **Corte entre episodios** *(nuevo)* | Video vertical, **entre** episodios del Piso 0 | 1 cada 4 episodios · 15 s | Programático, y acuerdos privados cuando haya inventario clasificado |
| **P3** | **Patrocinio de serie o riel** *(nuevo)* | **Sin video.** Marca en la ficha y en la cabecera del riel: *«Esta noche te la trae X»* | 1 marca por riel y mes | Demanda de marca. **Apto para marca por construcción** |
| **P4** | **Microdrama de marca** *(nuevo)* | Una serie escrita alrededor de una marca y **pagada por ella** | 1 por trimestre | Marca. Contenido gratis + audiencia de regalo |

**P3 y P4 son los que cambian el negocio.** P1 y P2 se venden a lo que pague la subasta; P3 y P4
se venden por conversación, tienen margen de contenido y **no dependen de escala de MAU**. P4 es
además lo único de toda esta propuesta que **se puede probar mañana**: una marca, una serie, y se
sabe si el mercado existe. En China es una categoría establecida; en español no la ocupa nadie con
escala, y Idilio tiene lo difícil de conseguir —producción propia, cadencia semanal y una serie
premiada [M, [§5.1](../05-benchmark/)]—.

*No le pongo precio a P4 porque no hay comparables en el mercado hispano y no voy a inventarlo.*

### Lo que hay que construir para poder venderlos

| Qué | Por qué |
|---|---|
| **Mediación** — AdMob / AppLovin / ironSource, con pisos por formato y geografía | Sin subasta no hay precio; hoy no hay ni medición |
| **Clasificación de inventario** — cada serie clasificada y mapeada a categorías estándar, y esa señal viaja en la puja | **Sin esto la ampliación de catálogo no cobra la prima que la justifica** |
| **Consentimiento** — CMP para la UE, Ley 1581 en Colombia, clasificación por edad | Idilio opera en 120 países, España incluida [M] |
| **Pisos de precio** — piso = **60% del eCPM mediano de las 4 semanas previas**, revisado cada mes | Un piso fijo inventado hoy sería un número sin respaldo; este se calibra solo |

**Y la ventaja que Idilio ya tiene y no cobra:** es **video vertical de pantalla completa**, el
formato para el que los anunciantes ya producen porque es el de TikTok, Reels y Shorts. **No hay
que pedirle a nadie una creatividad especial** — la fricción que mata a la mayoría de los
inventarios nuevos. Debe ser el primer argumento de venta. *Con una salvedad: a las 11 p.m. en la
cama buena parte de la sesión ocurre sin sonido [I], así que las creatividades tienen que
funcionar mudas y eso se exige en las especificaciones.*

---

## 6.7 El catálogo: qué se produce y en qué orden

Entre la primera fase y la última hay un factor 100 de costo — y la primera no cuesta nada.

| Fase | Qué | Cuesta | Alimenta | Cómo se sabe si funcionó |
|---|---|---|---|---|
| **0 · Reordenar** | Dos o tres rieles de suspenso con series **que ya están**, con arte re-encuadrado | **1 semana. Cero producción** | Inventario clasificable · prueba de demanda | Clics al riel, retención y series terminadas contra los rieles de romance |
| **1 · Thriller y true crime** | **Una** de las cinco producciones comprometidas con GammaTime en 2026 [M] | Marginal: mismos escenarios, mismo elenco, misma semana de rodaje | Suscripción · demanda de marca | Series iniciadas por usuarios que nunca vieron romance |
| **2 · Terror y sobrenatural** | El catálogo ya lo insinúa con dos series de vampiros | Bajo-medio | Publicidad — audiencia joven y tolerante a la pauta [I] | Retención en la franja de 11 p.m. a 2 a.m. |
| **3 · Ciencia ficción** | Solo en su forma barata: distopía contemporánea, un único elemento especulativo | **Alto — por eso va última, o no va** | Suscripción | — |

### Fase 0, que es la más importante y no cuesta nada

**Idilio ya tiene thriller, misterio y terror. Están vendidos como romance.** Del censo de 50
series, con sus sinopsis reales:

| Serie | Lo que realmente es |
|---|---|
| *Creo que mi Esposa Quiere Matarme* | Thriller doméstico con cadáver, incriminación y detective |
| *La Enfermera Infiltrada* | Misterio de infiltración sobre una muerte nunca aclarada |
| *Intenciones Ocultas* | Thriller de envenenamiento doméstico |
| *La Venganza de la Hija del Esmeraldero* | Policial de investigación, con detective a cargo del caso |
| *Sangre Enemiga* · *Pasión Frente a los Colmillos del Conde* | Vampiros y terror gótico |
| *Chamado na Madrugada* | **Ganadora del India Catalina 2026** [M, [§5.1](../05-benchmark/)] |

El home ordena el catálogo **por promesa emocional** —*«Amores Prohibidos»*, *«Venganza
Pasional»*, *«Romances Oscuros»*— [M, cuatro rieles verificados en producción]. Es excelente
merchandising para el núcleo, y es la razón por la que **una serie de suspenso no tiene hoy dónde
vivir en esta app: no hay riel que la prometa.**

> **Si el reordenamiento no mueve nada, la tesis de ampliación de catálogo queda seriamente
> debilitada y se ahorró el presupuesto entero.**

**Sobre la ciencia ficción, que está en la pregunta original:** es la peor primera apuesta de las
cuatro. Vestuario, escenografía y post rompen la economía que hace viable al formato —una serie
por semana—, y un sci-fi de microdrama hecho barato **se ve** barato de una manera en que el
melodrama no. Si entra, entra como *Black Mirror*: oficinas y apartamentos, un solo elemento
especulativo. Naves y planetas no caben en una semana de rodaje.

---

## 6.8 Cuánto vale: supuestos y tres escenarios

**Los supuestos primero, todos declarados.** Cambiar cualquiera cambia el resultado
proporcionalmente.

| | Valor | Origen |
|---|---|---|
| MAU | 300.000 | **[S]** el repo dice «cientos de miles» [M]; tomo el punto medio bajo |
| DAU/MAU | 0,33 → ~99.000 DAU | **[M]** brief |
| Episodios por sesión | 14 | **[M]** brief |
| Sesiones por día activo | 1 | **[S]** el supuesto **conservador** acá: subestima el inventario |
| Episodios vistos/mes | **~41,6 M** · ~140 por MAU | **[I]** 99.000 × 30 × 14 |
| eCPM recompensado, Colombia | US$ 3 – 6 | **[S]** banda de mercado, **a reemplazar con el dato de la mediación** |
| eCPM in-stream, Colombia | US$ 1,5 – 3 | **[S]** ídem |
| Carga publicitaria | 1 corte cada 4 episodios | **[S]** decisión de diseño de [§6.9](#69-la-restricción-que-impone-un-episodio-de-90-segundos) |

| | **Conservador** | **Base** | **Alto** |
|---|---|---|---|
| MAU a 12 meses | 300 k *(plano)* | 450 k | 750 k |
| Qué se hizo | Solo Piso 0 sobre biblioteca vencida | Piso 0 completo + recompensado bien ubicado | Lo anterior + inventario apto para marca y venta directa |
| Impresiones/mes | ~5,5 M | ~19 M | ~33 M |
| eCPM mezclado | US$ 1,9 | US$ 2,9 | US$ 4,5 |
| **Ingreso publicitario/mes** | **≈ US$ 10 k** | **≈ US$ 55 k** | **≈ US$ 148 k** |
| **Al año** | **≈ US$ 123 k** | **≈ US$ 660 k** | **≈ US$ 1,78 M** |
| Por MAU/mes | US$ 0,03 | US$ 0,12 | US$ 0,20 |
| P3 y P4 | sin estimar | sin estimar | sin estimar |

**No son optimismo, base y pesimismo sobre la misma acción: son tres acciones distintas.** El
conservador es no hacer casi nada. El base es ejecutar la propuesta. El alto necesita **las dos
cosas a la vez** —más usuarios y mejor precio por impresión—, que son exactamente las dos que
compra la ampliación de catálogo: la venta directa a demanda de marca paga típicamente entre 2 y 4
veces el remanente programático [S].

### El cruce que decide la estrategia

El ingreso in-app por MAU es `conversión × ARPPU`. Los tres escenarios son [S]; el real lo tiene
Idilio ([§6.14](#614-los-siete-datos-que-faltan), dato 4):

| Conversión | ARPPU/mes | IAP por MAU/mes | Contra la línea publicitaria |
|---|---|---|---|
| 2% | US$ 4 | US$ 0,08 | **Los anuncios la superan** |
| 3% | US$ 4 | US$ 0,12 | **Empatan** |
| 5% | US$ 6 | US$ 0,30 | Los anuncios son un complemento de ~⅓ |

Con el 95%+ que no paga [M] —lo que ubica la conversión bien por debajo del 5%—, **la línea
publicitaria está en el mismo orden que todo el ingreso in-app actual. No lo reemplaza: lo
duplica.**

> **Y acá el benchmark obliga a corregir el énfasis de este documento.** El 60% del ingreso
> mundial del microdrama viene de pago directo, y la categoría saca **US$ 10–25 por usuario al
> mes contra los US$ 3–8 del streaming tradicional**
> [M, [§6.3.2](#632-los-cuatro-modelos-y-qué-vende-realmente-cada-uno)]. Traducido: **un pagador
> vale dos órdenes de magnitud más que un espectador con pauta.** A US$ 10 al mes, un solo punto
> porcentual de conversión rinde US$ 0,10 por MAU — lo mismo que toda la línea publicitaria del
> escenario base.
>
> Eso **no invalida** la propuesta, porque el 95% no paga y sobre esa gente la publicidad es el
> único instrumento que existe. Lo que cambia es el orden de las prioridades: **si una decisión
> obliga a elegir entre proteger la conversión y subir la impresión, gana la conversión.** Es
> justo lo que ya hacen los guardrails de [§6.12](#612-cómo-se-mide-y-cuándo-se-revierte), y ahora
> se sabe por qué el número está donde está. *(Salvedad: esos US$ 10–25 son de mercados
> desarrollados. En Latinoamérica —ARPU de Netflix US$ 7 contra US$ 18,65 en EE.UU.— la cifra
> real será bastante menor, y la brecha con la publicidad se achica.)*

### El límite, que hay que decir

Para que la publicidad sea *el* negocio haría falta multiplicar por diez. Hongguo lo demuestra con
304 M de MAU y ~125 minutos diarios [M]; Idilio tiene cientos de miles y 22 minutos. **El modelo
publicitario puro es el final del camino, no el principio.**

> **Y por eso esta propuesta no compite con la que ya está entregada: la vuelve rentable.** El
> [Pase de la Noche](../03-diseno/) existía para que la usuaria volviera mañana y su defensa
> económica era que costaba poco. Con una línea publicitaria montada, **cada noche que el Pase
> recupera es ingreso que no existía**, y el guardrail de canibalización deja de tener un solo
> lado.

---

## 6.9 La restricción que impone un episodio de 90 segundos

Es donde una propuesta publicitaria genérica se rompe contra este producto. **Un anuncio de 30
segundos sobre un episodio de 90 es un impuesto del 33%**, y la queja ya está documentada en la
categoría, textual: *«los anuncios duran más que el episodio que desbloquean»* [M,
[§5.3](../05-benchmark/), reseñas de DramaBox].

1. **Nunca pre-roll en el primer episodio de la sesión.** Es el momento de mayor fragilidad y donde se pierde el D1.
2. **El corte va entre episodios, jamás dentro.** Un episodio de 90 segundos no tiene interior que sobreviva a una interrupción: **el cliffhanger es el producto.**
3. **Máximo un corte cada 4 episodios** — uno cada ~6 minutos, carga del 4 al 7%. Muy por debajo de la TV abierta (~25%). Se sube después, midiendo, nunca en el lanzamiento.
4. **15 segundos no salteable, o 30 salteable a los 5.** Sin excepción de puja.
5. **El corte se anuncia** — *«Un anuncio y seguimos»*, con cuenta regresiva. Lo que destruye la sesión no es el anuncio: es no saber cuánto falta.
6. **Nunca sobre el final de una serie ni sobre el episodio que abre un Pase de la Noche.** El Pase es la cita del producto; meterle un anuncio adentro es cobrarle al usuario por el regalo.

---

## 6.10 Las doce decisiones, con recomendación

| | Decisión | Recomendación | Por qué |
|---|---|---|---|
| **1** | ¿Se abre un piso gratuito con pauta? | **Sí**, con la regla de decaimiento | Las otras nueve cuelgan de esta, y con la regla escrita no puede canibalizar |
| **2** | ¿Qué entra al Piso 0? | El que **ya dejó de vender**, medido — no elegido a dedo | Convierte un juicio en una cuenta |
| **3** | ¿Cuánta carga al lanzar? | **1 corte cada 4 episodios, 15 s.** Se sube después | Un anuncio de 30 s sobre 90 s es un impuesto del 33% |
| **4** | ¿El recompensado sigue dando monedas? | **No: abre el episodio.** Ya está en [I2](../02-estrategia/#i2--el-muro-muestra-las-salidas-que-ya-existen) | Un anuncio vale exactamente un episodio; la moneda solo agrega un toque |
| **5** | ¿Se sube el tope de 10 anuncios/día? | **No** | La fuente gratuita ya más que duplica el consumo [M]: más volumen compra menos motivo para pagar |
| **6** | ¿La suscripción quita los anuncios? | **Sí, sin una sola excepción** | Es la queja #1 de la categoría y es autoinfligida [M, D4] |
| **7** | ¿Se toca el precio? | **El tope del 60%** para completar una serie, y el escalón alto de la escalera se vende como *«termina esta historia»* y no como un bulto de monedas. **Sin plan anual** | Hoy una serie cuesta casi lo mismo que el catálogo entero. Y lo que se paga es la resolución, no el volumen |
| **8** | ¿Se produce género nuevo ya? | **No hasta que la Fase 0 responda** | Cuesta una semana y puede ahorrar el presupuesto entero |
| **9** | ¿Venta directa o solo programático? | **Programático primero.** Directo cuando exista inventario clasificado | Sin clasificación no hay nada que vender a marca; sin medición, con qué negociar |
| **10** | ¿Se cambia el posicionamiento de «app #1 de microdramas»? | **No.** Se ensancha el catálogo sin tocar la marca | La serie premiada es del núcleo [M]. El riesgo de dilución es real y no hace falta correrlo |
| **11** | ¿Se publican series completas en YouTube y TikTok? | **Sí, y solo las del Piso 0** | Ahí ya está el 44% y el 38% de esta audiencia. La continuidad —Pase, racha, estrenos— se queda en la app, que es lo que se va a buscar |
| **12** | ¿Se agrega un plan anual? | **No.** *(Este documento decía que sí antes del benchmark)* | El 34% del churn de la categoría es por agotamiento de catálogo. Un anual sobre un catálogo que se agota produce reembolsos, no ingreso recurrente |

---

## 6.11 Lo que NO propone

| Descartado | Por qué |
|---|---|
| **Recortar los 500 episodios gratis del catálogo** | Es la palanca más pesada de la economía, pero es de **conversión** — y toca el motor de adquisición [M, [§1.4](../01-diagnostico/#14-una-palanca-fuera-del-alcance-de-este-objetivo)] |
| **Subir el tope diario de anuncios** | Es la salida fácil y es la equivocada (decisión 5) |
| **Monetizar el comodín o el rescate de racha** | Snapchat demostró que se puede, y también que convierte la ansiedad en línea de ingreso [M, D2]. Es el patrón que la regulación europea empezó a mirar |
| **Recompensar tiempo de pantalla** | Es lo que la Comisión Europea **prohibió permanentemente** en TikTok Lite [M, [§5.4](../05-benchmark/)/D5]. Este modelo va en la dirección contraria, y conviene que esté escrito antes de que lo pregunte alguien de afuera |
| **Pre-roll en el primer episodio** · **cortes dentro del episodio** | [§6.9](#69-la-restricción-que-impone-un-episodio-de-90-segundos) |
| **Offerwall / ganar monedas jugando a juegos de terceros** | Adjoe reporta 3× de retorno, y el número **viene del propio vendedor** [M, D3]. Puede entrar después; no es por donde se empieza |
| **El plan anual de suscripción** | Lo proponía este mismo documento y lo retiro: 34% del churn de la categoría es agotamiento de catálogo, y un compromiso de doce meses sobre un catálogo que se acaba en dos es un pasivo, no un ingreso ([§6.5](#65-la-propuesta-tres-pisos)) |
| **Publicar los estrenos en redes** | Solo sale el Piso 0. Regalar la ventana de explotación en YouTube es regalar el único tramo del catálogo que todavía vende |
| **Ciencia ficción cara** | Rompe la economía de una serie por semana |

---

## 6.12 Cómo se mide, y cuándo se revierte

Las mismas tres señales de la [estrategia](../02-estrategia/#23-el-portafolio): *leading* —¿pasó
algo?—, *lagging* —¿valió la pena?— y *guardrail* —¿hay que parar?—. El número del guardrail **es
el criterio de reversión**, decidido de antemano.

| Movimiento | Leading | Lagging | Guardrail y reversión |
|---|---|---|---|
| **Piso 0** | % de muros que terminan en «ver gratis» en vez de cerrar | DAU/MAU y horas vistas por MAU | **Ingreso in-app por DAU no cae más de 5% relativo** contra holdout |
| **Corte in-stream** | Tasa de finalización del anuncio | Ingreso publicitario por DAU | **Episodios por sesión no caen más de 5% relativo.** Si se cruza: bajar a 1 cada 6 antes de revertir |
| **Recompensado bien ubicado** | Anuncios vistos por DAU | Ingreso publicitario por DAU | % de pagadores no cae más de 5% relativo |
| **Suscripción reempaquetada** | Conversión desde el muro | Suscriptores netos y retención a 3 meses | Cancelaciones no suben |
| **Fase 0 del catálogo** | Clics al riel nuevo | Series terminadas fuera del romance | Retención de la base actual no cae |
| **Distribución en social** | Vistas de la serie publicada afuera | **Instalaciones atribuidas a YouTube y TikTok** | **Si en 4 semanas no crecen las instalaciones atribuidas, se corta.** Regalar contenido sin capturar entrada es publicidad para YouTube |

**Y una regla de método:** la carga publicitaria entra **como experimento con grupo de control
desde el primer día**. Es la única forma de distinguir «los anuncios molestan» de «esta semana
hubo menos contenido nuevo».

---

## 6.13 El primer mes

```
Sem 1   Verificar la premisa demográfica · 4 fuentes que Idilio ya tiene   ← puede detenerlo todo
        Fase 0 del catálogo · dos rieles de suspenso con lo que ya está
Sem 2   Mediación + medición + consentimiento · la línea base publicitaria
        Pedir los siete datos (§6.14)
Sem 3   Regla de decaimiento aplicada → qué series entran al Piso 0
        Primera conversación de P4 con una marca · no depende de nada más
        Una serie del Piso 0 publicada entera en YouTube, con atribución puesta
Sem 4   Piso 0 en cohorte, con holdout · sin cortes todavía
        Lectura de la Fase 0 → decidir si se compromete producción de género
```

**Las dos cosas de la semana 1 cuestan casi nada y las dos pueden invalidar buena parte de lo que
sigue:** si la base no es la que la premisa supone, o si el suspenso no mueve a nadie, la
propuesta cambia de forma antes de haber gastado un peso. Todo lo caro está después, a propósito.

---

## 6.14 Los siete datos que faltan

Ninguno requiere un estudio. Los siete los tiene Idilio hoy, y cada uno reemplaza un supuesto de
esta página por un hecho.

| | Dato | De dónde sale | Qué supuesto reemplaza |
|---|---|---|---|
| **1** | **Demografía real** — edad, género y país | Play Console, App Store Connect | **La premisa entera** ([§6.2](#62-la-premisa-corregida)) |
| **2** | **eCPM real** por formato, geografía y sistema operativo | Panel de la mediación | Toda la banda de ingreso de [§6.8](#68-cuánto-vale-supuestos-y-tres-escenarios) |
| **3** | **Adopción del recompensado** — qué fracción del DAU ve ≥1 anuncio y cómo se distribuye contra el tope de 10 | Analítica propia | El producto P1, y dimensiona [I2](../02-estrategia/#i2--el-muro-muestra-las-salidas-que-ya-existen) |
| **4** | **Conversión a pagador y ARPPU** | Facturación | El cruce de [§6.8](#68-cuánto-vale-supuestos-y-tres-escenarios) — decide si la publicidad es la línea principal o la segunda |
| **5** | **Curva de decaimiento de ingreso por serie** — semana 1, 4, 12 | Facturación por SKU | **Dimensiona el Piso 0 y elimina su riesgo por construcción** |
| **6** | **MAU y sesiones por día activo**, con precisión | Analítica propia | El volumen de inventario |
| **7** | **Atribución de instalación por fuente** — cuántas vienen de YouTube, TikTok y compartidos | Herramienta de atribución móvil | Dimensiona el movimiento 6 y decide si la distribución en social vale la pena ([§6.5](#65-la-propuesta-tres-pisos)) |

> **Y el que no está en la lista porque todavía no existe: el resultado de la Fase 0.** Dos rieles
> con el catálogo que ya está, una semana de trabajo, y la pregunta *«¿esta audiencia quiere algo
> además de romance?»* deja de ser una hipótesis y pasa a ser una medición. **Es lo primero que
> haría, y lo que menos cuesta equivocarse.**

---

> **En una frase.** Idilio ya monetiza con anuncios, pero los usa como cupón de descuento en vez
> de como línea de ingreso. La propuesta es **cobrar por la atención que la usuaria ya entrega**
> —no por los desbloqueos—, abrir un piso gratuito con la biblioteca que ya dejó de vender, tener
> cuatro productos publicitarios en vez de uno, y ensanchar el catálogo empezando por las series
> de suspenso **que Idilio ya tiene y está vendiendo como romance**.
