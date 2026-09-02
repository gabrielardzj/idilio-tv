# 7. La propuesta de monetización

> **Qué es esto.** El reto pedía cuatro entregables sobre gamificación y retención, y esos
> cuatro están [en el sitio](../01-diagnostico/). Esto es otra cosa: la propuesta de negocio que
> sale de aplicarle al mismo material una pregunta distinta —**cómo gana plata Idilio**— y de
> mirar el producto desde la caja en vez de desde el DAU/MAU.
>
> **Cómo se lee.** Esta página es **la propuesta**: qué se hace, con qué, cuánto rinde y qué hay
> que decidir. El razonamiento que la sostiene —la revisión de la premisa, la cuenta del eCPM, la
> lectura del benchmark— está en [el análisis](./README.md), y cada afirmación de acá que dependa
> de él lo cita.
>
> **La regla de procedencia es la misma de todo este trabajo.** **[M]** medido, **[S]** supuesto
> declarado, **[I]** inferencia. **Ningún número de ingreso de esta página es un dato de Idilio.**
> Lo que ofrezco es la estructura de la decisión y qué hay que reemplazar en ella; los seis datos
> que la cierran están en [§6.10](./README.md#610-los-seis-datos-que-cierran-esta-propuesta).

---

## 7.1 La propuesta en una página

**El problema de negocio, en una línea.** Idilio le vende a un 5% y le regala a un 95% [M], y a
ese 95% le entrega hoy hasta **70 episodios gratis por semana** [M] a cambio de un ingreso
publicitario que es un error de redondeo: para que el anuncio pagara el episodio que abre, el
eCPM tendría que ser de **US$ 177**, y el real en Colombia está entre **US$ 2 y 6**
[§6.2](./README.md#62-idilio-ya-monetiza-con-anuncios--y-no-le-está-cobrando-a-nadie).

**Cinco movimientos.**

| | Movimiento | Qué es | Cuesta |
|---|---|---|---|
| **1** | **Un piso gratuito con pauta: «Idilio Libre»** | La biblioteca cuya ventana de explotación ya venció se ve entera y gratis, con cortes publicitarios y sin muro | Producto, no contenido |
| **2** | **La publicidad se cobra por visionado, no por desbloqueo** | Corte entre episodios en el Piso 0, con carga acotada. El recompensado sigue, pero deja de ser la única superficie | ~3 semanas + mediación |
| **3** | **Cuatro productos publicitarios en vez de uno** | Recompensado · corte in-stream · patrocinio de serie · microdrama de marca | El cuarto es el de mayor margen y no depende de escala |
| **4** | **El catálogo se ensancha empezando por lo que ya está** | Dos rieles de suspenso con series que Idilio **ya tiene**, antes de producir nada | 1 semana, cero producción |
| **5** | **La suscripción se reempaqueta como «sin anuncios», que recién ahora es verdad** | Con cortes reales, *«sin anuncios»* pasa de promesa vacía a beneficio que se siente | Copy y precio |

**Qué gana.** En el escenario base, **≈ US$ 660 k al año** de una línea que hoy no existe
—unos US$ 0,12 por MAU al mes— [S, [§7.5](#75-el-modelo-a-12-meses-tres-escenarios)]. Con el
95%+ que no paga, eso está en el mismo orden que **todo el ingreso in-app actual**: no lo
reemplaza, lo duplica.

**Qué hay que decidir.** Diez decisiones, con mi recomendación en cada una, en
[§7.6](#76-las-diez-decisiones-con-recomendación). La única que no puede esperar es la primera,
porque las otras nueve cuelgan de ella.

**Y lo primero de todo, que cuesta una tarde:** verificar la premisa demográfica sobre la que se
apoya todo esto y que **no está medida en ninguna parte de este trabajo**
([§6.1](./README.md#61-la-premisa-revisada)).

---

## 7.2 El producto: tres pisos, con precio

Es el modelo de **ViX** —gratis / premium con anuncios / premium sin anuncios— que además es el
competidor directo en español [M, [§5.3bis](../05-benchmark/)]. No hay que inventarlo: hay que
adaptarlo.

| | **Piso 0 · Idilio Libre** | **Piso 1 · Monedas** | **Piso 2 · Pase Idilio** |
|---|---|---|---|
| **Qué se ve** | Series **completas** de la biblioteca vencida | Estrenos y ventana premium: 10 episodios gratis, después muro | Todo |
| **Qué cuesta** | Nada | 15 monedas / episodio · packs desde $ 2.500 | $ 12.500/sem · $ 24.500/mes · **anual, nuevo** |
| **Publicidad** | **Sí** — 1 corte cada 4 episodios | Solo el recompensado, opcional | **Ninguna, jamás** |
| **A quién le habla** | La base de hoy: alto volumen, no paga | Quien ya paga o está por hacerlo | Quien consume mucho o viene de otro streaming |
| **Cómo monetiza** | Impresiones | Microtransacción | Suscripción |

### Piso 0 · «Idilio Libre» — la biblioteca abierta

**La regla de entrada, y es una regla, no un juicio.** Una serie pasa al Piso 0 cuando **el
ingreso semanal de su muro cae por debajo del ingreso publicitario esperado de abrirla**. Un
microdrama se produce en una semana y se explota durante un mes [M, [§5.3bis](../05-benchmark/)];
pasado ese mes el muro no recauda casi nada y la serie sigue ocupando catálogo. **Un activo
depreciado vale más como inventario que como muro.**

Escrita así, la regla vuelve imposible el riesgo que más asusta —que el Piso 0 canibalice la
venta—: nada entra hasta que ya dejó de venderse. Solo hace falta un dato para aplicarla, y
Idilio lo tiene ([§6.10](./README.md#610-los-seis-datos-que-cierran-esta-propuesta), dato 5).

**Cómo se ve.** Un riel propio en el home —*«Gratis y completas»*—, un sello en la portada, y una
línea nueva en el muro que hoy no existe:

```
🔒 Episodio 16/56 · Te falta 1 episodio

  ▸ Tu Pase de la Noche llega hoy a las 21:30 · tu hora de siempre
  ▸ Ver un anuncio y abrir este episodio            te quedan 10 hoy
  ▸ Gratis y completas en Idilio Libre              con algunos cortes
  ─────────────────────────────────────────────────────────────────
  ▸ Paquetes de episodios                           desde $ 208 c/u
  ▸ Pase Idilio · todo abierto y sin anuncios       $ 24.500/mes
```

*Maqueta, no producto: nada de esto está construido. El orden —lo gratis arriba de lo pago— es
el de [D2](../03-diseno/#d2--lo-gratis-siempre-va-arriba-de-lo-pago).*

**Lo que hace esa tercera línea es lo que ninguna otra salida del muro hace: ofrecer una historia
entera.** Hoy «empezar otra serie» significa chocar contra otro muro dentro de diez episodios
[M, censo]. Es la primera vez que no.

> **Y es a la vez su mejor propiedad y su mayor riesgo.** Una serie completa y gratis es también
> la mejor razón que tuvo nunca alguien para **saltar de historia** en vez de quedarse — que es
> exactamente la conducta que el [diagnóstico](../01-diagnostico/) señala como el problema. Por
> eso el Piso 0 se puebla con **series completas y nunca con arranques**, y por eso
> [I8](../02-estrategia/#i8--el-pase-como-puente-entre-series) —el Pase como puente entre
> series— deja de ser una intervención de descubrimiento sin mucho que descubrir y pasa a ser el
> mecanismo que dirige el salto.

### Piso 1 · Monedas — sin cambios, y ese es el punto

Los estrenos conservan el muro, los 10 episodios gratis, las 15 monedas por episodio y la
escalera de paquetes que [I3](../02-estrategia/#i3--la-escalera-de-precios-vuelve-a-ser-una-escalera)
arregla. **El Piso 0 no le quita nada porque solo recibe lo que ya dejó de rendir.**

Con **una regla de precio nueva**, que sale del benchmark: terminar la serie mediana comprando
monedas sale **≈ $ 21.000** y el mensual abre el catálogo entero por **$ 24.500**
[M, [§5.1](../05-benchmark/)]. Una serie no puede costar lo mismo que todas.

> **Regla:** completar cualquier serie con monedas cuesta **como máximo el 60% del plan mensual**.
> Por encima de eso, el muro está vendiendo el peor negocio de la pantalla y el usuario lo
> descubre solo.

### Piso 2 · Pase Idilio — el reempaquetado

Hoy el Pase vende dos cosas: *«desbloquea todo»* y *«sin anuncios»*. **La segunda es
prácticamente ficticia**, porque los anuncios de hoy son opcionales y están escondidos: se le
cobra al usuario por quitarle una molestia que no tiene. Con los cortes del Piso 0, el beneficio
se vuelve real y se siente en cada sesión.

> **La publicidad es la mejor herramienta de venta de suscripciones que existe.** Es literalmente
> el mecanismo con el que Hulu, Spotify, YouTube y ViX venden su nivel de pago. El Piso 0 no
> compite con el Piso 2: **lo alimenta.**

**Dos cambios concretos:**

1. **Un plan anual**, que hoy no existe. Latinoamérica prefiere el semanal —29% del ingreso de
   suscripción de la región [M, RevenueCat vía §5.2]— y por eso el anual no lo reemplaza: lo
   agrega, para la cola de usuarios pesados que hoy no tiene dónde comprometerse.
2. **La promesa se escribe entera:** *«Todo Idilio, sin cortes»*. Sin anuncios y sin muro, dicho
   en la misma línea.

**Y la regla que no se rompe nunca**, que sale de [D4 del benchmark](../05-benchmark/) —la doble
monetización es la queja #1 de la categoría—: **el suscriptor no se encuentra jamás con un muro
ni con un anuncio.** Ni en estrenos, ni en series «premium», ni por un error de configuración.
Se prueba con un test automatizado, no con una intención.

---

## 7.3 La línea publicitaria: cuatro productos, no uno

Hoy Idilio tiene un solo producto publicitario —el recompensado— y lo usa como dispensador de
monedas. La propuesta es tener **cuatro**, cada uno con su comprador.

| | Producto | Formato y ubicación | Tope | Quién lo compra |
|---|---|---|---|---|
| **P1** | **Recompensado** *(ya existe)* | Video vertical en el muro. Abre el episodio, no acredita monedas ([I2](../02-estrategia/#i2--el-muro-muestra-las-salidas-que-ya-existen)) | 10/día, sin cambios | Adquisición de usuarios: juegos, apps, fintech |
| **P2** | **Corte entre episodios** *(nuevo)* | Video vertical, **entre** episodios del Piso 0 | 1 cada 4 episodios · 15 s | Programático abierto, y acuerdos privados cuando haya inventario clasificado |
| **P3** | **Patrocinio de serie o de riel** *(nuevo)* | **Sin video.** Marca en la ficha de la serie y en la cabecera del riel: *«Esta noche te la trae X»* | 1 marca por riel y por mes | Demanda de marca. Es el producto **apto para marca** por construcción |
| **P4** | **Microdrama de marca** *(nuevo)* | Una serie escrita alrededor de una marca y **pagada por ella** | 1 por trimestre | Marca. Contenido gratis + audiencia de regalo |

**P3 y P4 son los que cambian el negocio, y son los que casi nadie mira.** P1 y P2 se venden a lo
que pague la subasta; P3 y P4 se venden por conversación, tienen margen de contenido y no
dependen de tener escala de MAU. **P4 es, además, el único renglón de toda esta propuesta que se
puede probar mañana**: una marca, una serie, y se sabe si el mercado existe.

### Lo que hay que construir para poder venderlos

| | Qué | Por qué |
|---|---|---|
| **Mediación** | AdMob / AppLovin / ironSource, con pisos por formato y por geografía | Sin subasta no hay precio; hoy no hay ni medición |
| **Clasificación de inventario** | Cada serie clasificada por contenido y mapeada a categorías estándar de la industria, y esa señal viaja en la puja | **Sin esto la ampliación de catálogo no cobra la prima que la justifica** ([§6.4](./README.md#64-el-inventario-lo-que-decide-el-precio-no-es-la-billetera-del-usuario)) |
| **Consentimiento** | Plataforma de consentimiento para la UE; cumplimiento de Ley 1581 en Colombia | Idilio opera en 120 países, España incluida [M] |
| **Pisos de precio** | Piso = **60% del eCPM mediano observado en las 4 semanas previas**, revisado cada mes | Un piso fijo inventado hoy sería un número sin respaldo; este se calibra solo |

### La ventaja que Idilio ya tiene y no está cobrando

Idilio es **video vertical de pantalla completa**: exactamente el formato para el que los
anunciantes ya producen, porque es el de TikTok, Reels y Shorts. **No hay que pedirle a nadie una
creatividad especial**, que es la fricción que mata a la mayoría de los inventarios nuevos. Debe
ser el primer argumento de la venta.

*Con una salvedad: a las 11 p.m. en la cama, buena parte de la sesión ocurre con sonido bajo o
nulo [I]. Las creatividades tienen que funcionar sin audio, y eso se exige en las
especificaciones o el rendimiento las castiga.*

---

## 7.4 El catálogo: qué se produce y en qué orden

La ampliación de géneros es correcta. Lo que hay que ordenar es **en qué orden**, porque entre la
primera fase y la última hay un factor 100 de costo — y la primera no cuesta nada.

| Fase | Qué | Cuánto cuesta | Qué línea alimenta | Cómo se sabe si funcionó |
|---|---|---|---|---|
| **0 · Reordenar** | Dos o tres rieles de suspenso poblados con series **que ya están**, con arte re-encuadrado | **1 semana. Cero producción** | Inventario clasificable · prueba de demanda | Clics al riel, retención y series terminadas contra los rieles de romance |
| **1 · Thriller y true crime** | **Una** de las cinco producciones comprometidas con GammaTime en 2026 [M] | Marginal: mismos escenarios, mismo elenco, misma semana de rodaje | Suscripción · demanda de marca | Series iniciadas por usuarios que nunca vieron romance |
| **2 · Terror y sobrenatural** | El catálogo ya lo insinúa con dos series de vampiros | Bajo-medio | Publicidad — audiencia joven y tolerante a la pauta [I] | Retención en la franja de 11 p.m. a 2 a.m. |
| **3 · Ciencia ficción** | Solo en su forma barata: distopía contemporánea, un único elemento especulativo | **Alto — y por eso va última, o no va** | Suscripción | — |

### Fase 0, que es la más importante y la que no cuesta nada

**Idilio ya tiene thriller, misterio y terror en catálogo. Están vendidos como romance.** Del
censo de 50 series, con sus sinopsis reales:

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
merchandising para el núcleo, y es también la razón por la que **una serie de suspenso no tiene
hoy dónde vivir en esta app: no hay riel que la prometa.**

> **Si el reordenamiento no mueve nada, la tesis de ampliación de catálogo queda seriamente
> debilitada y se ahorró el presupuesto entero.** Es la fase que responde la pregunta antes de
> gastar, y por eso va primero.

**Sobre la ciencia ficción, que está en la pregunta original y hay que responder de frente:** es
la peor primera apuesta de las cuatro. Vestuario, escenografía y post rompen la economía que hace
viable al formato —una serie por semana—, y un sci-fi de microdrama hecho barato **se ve** barato
de una manera en que el melodrama no. Si entra, entra como *Black Mirror*: oficinas y
apartamentos, un solo elemento especulativo. Naves y planetas no caben en una semana de rodaje.

---

## 7.5 El modelo a 12 meses: tres escenarios

**Todo lo de esta sección es [S].** Los supuestos están declarados en
[§6.6](./README.md#66-cuánto-vale-esto) y los seis datos que los reemplazan por hechos, en
[§6.10](./README.md#610-los-seis-datos-que-cierran-esta-propuesta). Lo que ofrezco es la
estructura de la cuenta.

| | **Conservador** | **Base** | **Alto** |
|---|---|---|---|
| MAU a 12 meses | 300 k *(plano)* | 450 k | 750 k |
| Qué se hizo | Solo Piso 0 sobre biblioteca vencida | Piso 0 completo + recompensado bien ubicado | Lo anterior + inventario apto para marca y venta directa |
| Impresiones/mes | ~5,5 M | ~19 M | ~33 M |
| eCPM mezclado | US$ 1,9 | US$ 2,9 | US$ 4,5 |
| **Ingreso publicitario/mes** | **≈ US$ 10 k** | **≈ US$ 55 k** | **≈ US$ 148 k** |
| **Al año** | **≈ US$ 123 k** | **≈ US$ 660 k** | **≈ US$ 1,78 M** |
| Por MAU/mes | US$ 0,03 | US$ 0,12 | US$ 0,20 |
| P3 y P4 *(patrocinio y marca)* | sin estimar | sin estimar | sin estimar |

**Cómo leer los tres.** No son optimismo, base y pesimismo sobre la misma acción: **son tres
acciones distintas.** El conservador es no hacer casi nada. El base es ejecutar la propuesta. El
alto necesita **las dos cosas a la vez** —más usuarios y mejor precio por impresión—, y son
exactamente las dos que compra la ampliación de catálogo: la venta directa a demanda de marca
paga típicamente entre 2 y 4 veces el remanente programático [S].

**Y el límite, que hay que decir.** Para que la publicidad sea *el* negocio y no la segunda
línea, haría falta multiplicar por diez. Hongguo lo demuestra con 304 M de MAU y ~125 minutos
diarios [M, §5.3]; Idilio tiene cientos de miles y 22 minutos. **El modelo publicitario puro es
el final del camino, no el principio.**

> **Y por eso esta propuesta no compite con la que ya está entregada: la vuelve rentable.** El
> [Pase de la Noche](../03-diseno/) existía para que la usuaria volviera mañana, y su defensa
> económica era que costaba poco. Con una línea publicitaria montada, **cada noche que el Pase
> recupera es ingreso que no existía**, y el guardrail de canibalización deja de tener un solo
> lado.

---

## 7.6 Las diez decisiones, con recomendación

| | Decisión | Recomendación | Por qué |
|---|---|---|---|
| **1** | ¿Se abre un piso gratuito con pauta? | **Sí**, con la regla de decaimiento de [§7.2](#72-el-producto-tres-pisos-con-precio) | Las otras nueve cuelgan de esta. Y con la regla escrita, no puede canibalizar |
| **2** | ¿Qué contenido entra al Piso 0? | El que **ya dejó de vender**, medido — no elegido a dedo | Convierte un juicio en una cuenta, y elimina el riesgo por construcción |
| **3** | ¿Cuánta carga publicitaria al lanzar? | **1 corte cada 4 episodios, 15 s.** Se sube después, midiendo | Un anuncio de 30 s sobre un episodio de 90 s es un impuesto del 33%. La queja ya está documentada en la categoría [M, §5.3] |
| **4** | ¿El recompensado sigue dando monedas? | **No: abre el episodio.** Ya está propuesto en [I2](../02-estrategia/#i2--el-muro-muestra-las-salidas-que-ya-existen) | Un anuncio vale exactamente un episodio; la moneda en el medio solo agrega un toque |
| **5** | ¿Se sube el tope de 10 anuncios/día? | **No** | La fuente gratuita ya más que duplica el consumo [M]. Más volumen no compra más regreso: compra menos motivo para pagar |
| **6** | ¿La suscripción quita los anuncios? | **Sí, sin una sola excepción** | Es la queja #1 de la categoría y es autoinfligida [M, §5.4/D4] |
| **7** | ¿Se toca el precio? | **Dos cosas:** plan anual nuevo, y el tope del 60% para completar una serie con monedas | Hoy una serie cuesta casi lo mismo que el catálogo entero, y el muro pone las dos ofertas juntas sin comentarlas |
| **8** | ¿Se produce género nuevo ya? | **No hasta que la Fase 0 responda** | Cuesta una semana y puede ahorrar el presupuesto entero |
| **9** | ¿Venta directa propia o solo programático? | **Programático primero.** Directo cuando exista inventario clasificado | Sin clasificación no hay nada que vender a marca, y sin medición no hay con qué negociar |
| **10** | ¿Se cambia el posicionamiento de «app #1 de microdramas»? | **No.** Se ensancha el catálogo sin tocar la marca | La serie premiada es del núcleo [M, §5.1]. El riesgo de dilución es real y no hace falta correrlo |

---

## 7.7 Lo que esta propuesta NO propone

| Descartado | Por qué |
|---|---|
| **Recortar los 500 episodios gratis del catálogo** | Es la palanca más pesada de la economía y está a una decisión de distancia, pero es de **conversión**, no de retención ni de publicidad — y toca el motor de adquisición [M, [§1.4](../01-diagnostico/#14-una-palanca-fuera-del-alcance-de-este-objetivo)] |
| **Subir el tope diario de anuncios recompensados** | Ver decisión 5. Es la salida fácil y es la equivocada |
| **Monetizar el comodín o el rescate de racha** | Snapchat demostró que se puede, y también que convierte la ansiedad en línea de ingreso [M, §5.4/D2]. Es el patrón que la regulación europea empezó a mirar |
| **Recompensar tiempo de pantalla** | Es exactamente lo que la Comisión Europea **prohibió permanentemente** en TikTok Lite [M, §5.4/D5]. Este modelo va en la dirección contraria, y conviene que esté escrito antes de que lo pregunte alguien de afuera |
| **Pre-roll en el primer episodio de la sesión** | Es el momento de mayor fragilidad —a la 1 a.m., con una mano— y donde se pierde el D1 |
| **Cortes dentro del episodio** | Un episodio de 90 segundos no tiene interior que sobreviva a una interrupción: **el cliffhanger es el producto** |
| **Offerwall / ganar monedas jugando a juegos de terceros** | Adjoe reporta 3× de retorno con esta mecánica, y el número **viene del propio vendedor** [M, §5.4/D3]. Puede entrar después; no es por donde se empieza |
| **Ciencia ficción cara** | Rompe la economía de una serie por semana ([§7.4](#74-el-catálogo-qué-se-produce-y-en-qué-orden)) |

---

## 7.8 Cómo se mide, y cuándo se revierte

Las mismas tres señales que usa la [estrategia](../02-estrategia/#23-el-portafolio): *leading*
—¿pasó algo?—, *lagging* —¿valió la pena?— y *guardrail* —¿hay que parar?—. Cuando un guardrail
lleva número, ese número **es el criterio de reversión**, decidido de antemano.

| Movimiento | Leading | Lagging | Guardrail y reversión |
|---|---|---|---|
| **Piso 0** | % de muros que terminan en «ver gratis» en vez de cerrar | DAU/MAU y horas vistas por MAU | **Ingreso in-app por DAU no cae más de 5% relativo** contra holdout |
| **Corte in-stream** | Tasa de finalización del anuncio | Ingreso publicitario por DAU | **Episodios por sesión no caen más de 5% relativo.** Si se cruza: bajar a 1 corte cada 6 antes de revertir |
| **Recompensado bien ubicado** | Anuncios vistos por DAU | Ingreso publicitario por DAU | % de pagadores no cae más de 5% relativo |
| **Suscripción reempaquetada** | Conversión desde el muro | Suscriptores netos y su retención a 3 meses | Cancelaciones no suben |
| **Fase 0 del catálogo** | Clics al riel nuevo | Series terminadas fuera del romance | Retención de la base actual no cae |

**Y una regla de método:** la carga publicitaria entra **como experimento con grupo de control
desde el primer día**. Es la única forma de distinguir «los anuncios molestan» de «esta semana
hubo menos contenido nuevo».

---

## 7.9 El primer mes

```
Sem 1   Verificar la premisa demográfica · 4 fuentes que Idilio ya tiene    ← puede detenerlo todo
        Fase 0 del catálogo · dos rieles de suspenso con lo que ya está
Sem 2   Mediación + medición + consentimiento · la línea base publicitaria
        Pedir los seis datos (§6.10)
Sem 3   Regla de decaimiento aplicada al catálogo → qué series entran al Piso 0
        Primera conversación de P4 con una marca · no depende de nada más
Sem 4   Piso 0 en cohorte, con holdout · sin cortes todavía
        Lectura de la Fase 0 → decidir si se compromete producción de género
```

**Por qué la semana 1 es la que es.** Las dos cosas que hay ahí cuestan casi nada y **las dos
pueden invalidar buena parte de lo que sigue**: si la base no es la que la premisa supone, o si
el suspenso no mueve a nadie, la propuesta cambia de forma antes de haber gastado un peso. Todo
lo caro está después, y a propósito.

---

## 7.10 En una frase

> **Idilio ya monetiza con anuncios, pero los está usando como cupón de descuento en vez de como
> línea de ingreso.** La propuesta es cobrar por la atención que la usuaria ya entrega —no por los
> desbloqueos—, abrir un piso gratuito con la biblioteca que ya dejó de vender, tener cuatro
> productos publicitarios en vez de uno, y ensanchar el catálogo empezando por las series de
> suspenso **que Idilio ya tiene y está vendiendo como romance**.
