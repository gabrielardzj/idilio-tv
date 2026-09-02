# 6. Monetización · el análisis

> **La pregunta.** Si el usuario promedio de Idilio es una mujer de estrato medio-bajo
> con poca capacidad de pago, ¿la salida es monetizar con publicidad? ¿Y hay que ampliar
> el catálogo más allá del microdrama romántico —suspenso, ciencia ficción— para llegar
> a un público con más capacidad económica?
>
> **Método y advertencia de procedencia.** Este anexo se apoya en tres tipos de número y
> los marca siempre: **[M] medido** —del censo, del dogfooding o del brief—, **[S] supuesto**
> —lo pongo yo, con banda y con la fuente del rango— y **[I] inferencia**. Ninguna de las
> cifras de ingreso publicitario de este documento es un dato de Idilio: **Idilio tiene esos
> datos y yo no**. Lo que aporto es la estructura de la cuenta y qué hay que reemplazar en
> ella. Los seis datos que la cierran están en [§6.10](#610-los-seis-datos-que-cierran-esta-propuesta).
>
> **Y dónde está la propuesta.** Esta página es el **análisis**: revisa la premisa, hace las
> cuentas y lee el precedente. Lo que se propone hacer —los tres pisos, los cuatro productos
> publicitarios, el catálogo por fases, el modelo a 12 meses y las diez decisiones con
> recomendación— está en **[la propuesta](./propuesta.md)**, que es la página siguiente.
>
> Ninguna de las dos forma parte de los cuatro entregables del reto: nacen de una pregunta
> posterior —cómo gana plata Idilio— sobre el mismo material.

---

## Resumen

**Tres conclusiones, y la segunda es la que cambia la propuesta.**

1. **La publicidad es la línea correcta, y Idilio ya la tiene — pero no le está cobrando a nadie.** El producto regala un episodio por cada anuncio visto, hasta diez al día [M]. Para que esa transacción cerrara, el eCPM tendría que ser de unos **US$ 177**; el eCPM real de video recompensado en Colombia está entre **US$ 2 y US$ 6** [S]. Hoy el anuncio no es un canal de ingreso: es un cupón de descuento que devuelve un error de redondeo. La línea publicitaria de verdad no se construye sobre **desbloqueos**, se construye sobre **tiempo de visionado**.

2. **El mapeo de la propuesta está invertido, y darlo vuelta la vuelve mucho más fuerte.** La publicidad no monetiza la billetera del usuario: monetiza la demanda de los anunciantes por ese segmento. Una mujer de 25 a 54 años en Latinoamérica es la decisora de compra del hogar y **el segmento más disputado del consumo masivo** — no es una audiencia pobre, es una audiencia *mal vendida*. Lo que le pone techo al eCPM de Idilio hoy no es el ingreso de su usuaria: es que un catálogo íntegramente de romance subido de tono queda clasificado como contenido sensible y **no puede acceder a la demanda de marca**, que es la que paga. Y al revés: los géneros nuevos —suspenso, true crime, ciencia ficción— traen público con hábito de **pagar** streaming. Entonces:

   > **Los anuncios monetizan al núcleo que ya está. Los géneros nuevos hacen crecer la suscripción — y, de paso, vuelven vendible el inventario del núcleo.**

3. **La publicidad es un negocio de escala, y Idilio todavía no la tiene — pero la línea vale la pena igual.** A la escala actual —cientos de miles de MAU [M]—, la línea publicitaria bien construida vale del orden de **US$ 0,06 a 0,12 por MAU al mes**, unos **US$ 230 k a 440 k al año** [S]. Eso no es la empresa: es, con los supuestos de [§6.6](#66-cuánto-vale-esto), aproximadamente **duplicar el ingreso actual**. Se vuelve el negocio principal a partir de unas diez veces el MAU de hoy — que es exactamente lo que Hongguo demuestra a 304 M de MAU [M, §5.3].

**La propuesta concreta:** tres pisos —gratis con anuncios, monedas, suscripción sin anuncios—, un catálogo ampliado por costo creciente que arranca **sin producir una sola serie nueva**, y una línea publicitaria construida sobre visionado y no sobre desbloqueos.

---

## 6.1 La premisa, revisada

### Lo que la premisa acierta

| Lo que sostiene la premisa | La evidencia que la respalda |
|---|---|
| La base no paga y no va a pagar | Latinoamérica tiene **el ingreso por instalación más bajo del mundo (~US$ 0,10 a D14)** y a la vez el mayor crecimiento mediano de MRR (17,2%) [M, RevenueCat vía §5.2]. Mercado barato y acelerando. |
| La publicidad es hacia dónde va la categoría | **El 57,6% de la categoría ya opera con monetización híbrida** —suscripción + microtransacción + anuncios— [M, Mintegral/Insightrackr vía §5.2]. |
| Hay una prueba de existencia a escala | **Hongguo Short Drama** (ByteDance): 304 M de MAU, ~125 minutos diarios por usuario, **todo gratis financiado por publicidad, sin muro de monedas** [M, §5.3]. Es la app de microdramas más grande del mundo y no cobra por episodio. |
| Monetizar al no-pagador es la palanca sin explotar | El **95%+ de la base no paga** [M, §2.6]. Toda la escalera de precios de hoy —packs, pases— le habla al 5%. |

### Lo que la premisa asume y no está medido en ninguna parte de este trabajo

**«Mujeres de estrato medio-bajo» no aparece en el brief, ni en el censo, ni en el dogfooding.** Es la única afirmación de toda la propuesta sobre la que se apoyaría una inversión en catálogo, y es la que no tiene respaldo acá. Es plausible —el género, la sensibilidad al precio, la geografía—, pero *plausible* no basta para presupuestar producción.

**Y verificarla es gratis y toma una tarde.** Cuatro fuentes que Idilio ya tiene:

1. **Google Play Console y App Store Connect** publican edad y género de la base instalada, por país. Es el dato directo, sin encuesta.
2. **El panel de la red de anuncios** (AdMob / AppLovin / ironSource) trae la composición de audiencia que los anunciantes ya están comprando, y con qué eCPM la pagan. Es la respuesta *comercial* a la pregunta, que es la que importa.
3. **Mix de dispositivos y de sistema operativo.** La proporción Android/iOS y la gama de los equipos es el mejor proxy disponible de capacidad de pago en Latinoamérica. El indicio que ya está en el repo apunta fuerte hacia Android: **4,7★ sobre 28 K valoraciones en Google Play contra 4,9★ sobre 36 en App Store US** [M, §5.1]. Dos tiendas y dos bases distintas, sí — pero tres órdenes de magnitud de diferencia en volumen de reseñas no es ruido.
4. **La distribución de pagadores** cruzada contra las tres anteriores. Si el pagador se concentra en iOS y en una franja etaria distinta a la base, la premisa se confirma sola.

> **Qué cambia si la premisa es falsa.** Si la base ya tuviera capacidad de pago, el problema no sería de monetización sino de conversión, y la respuesta correcta estaría en la Etapa 1 de la [estrategia](../02-estrategia/) —traducir la economía, arreglar la escalera— y no en construir una línea publicitaria. **Por eso este es el primer dato a mirar, y es el más barato de los seis.**

### La corrección que hace la propuesta más fuerte

La cadena de la premisa es: *base pobre → anuncios → ampliar catálogo → público con más plata → monetizar*. Los dos extremos son correctos y el eslabón del medio va al revés.

**La publicidad no le cobra al usuario. Le cobra al anunciante.** Y lo que el anunciante paga no es proporcional al ingreso del espectador sino a **cuánto vale para él llegar a ese segmento en ese contexto**. Ahí, la audiencia que la premisa da por poco valiosa es en realidad la más disputada del mercado publicitario latinoamericano: mujeres de 25 a 54, decisoras de la compra del hogar, objetivo primario de consumo masivo, retail, telco, farma y banca minorista. **El problema no es quién es la usuaria. Es que Idilio no puede venderla al precio que vale**, por dos razones que sí son arreglables y que están en [§6.4](#64-el-inventario-lo-que-decide-el-precio-no-es-la-billetera-del-usuario).

Y al mismo tiempo, la intuición de que otros géneros traen público con más capacidad económica es probablemente cierta [I] — solo que ese público no es donde está el dinero publicitario, es donde está el dinero de **suscripción**: quien ve thriller y ciencia ficción es el mismo que ya paga Netflix, Max o Prime. Entonces el mapeo correcto es cruzado:

| | Le habla a | Monetiza con | Qué hay que construir |
|---|---|---|---|
| **Catálogo actual** (romance) | La base de hoy: alto volumen, sensible al precio | **Publicidad** — volumen de atención | Una línea publicitaria de verdad ([§6.3](#63-los-tres-pisos)) |
| **Catálogo ampliado** (suspenso, true crime, sci-fi) | Público nuevo con hábito de pagar streaming | **Suscripción**, y de paso inventario vendible a marca | Contenido, por fases y por costo ([§6.5](#65-la-ampliación-de-catálogo-ordenada-por-costo)) |

Las dos cosas de la premisa entran. Cambian de destino.

---

## 6.2 Idilio ya monetiza con anuncios — y no le está cobrando a nadie

### La cuenta que hay que hacer una sola vez

El producto entrega **15 monedas por anuncio visto, con tope de 10 anuncios diarios** [M, §1.2/F1]. Como el episodio cuesta 15 monedas sin una sola excepción en las 41 series con muro [M, censo], la equivalencia es limpia: **un anuncio = un episodio.**

Del otro lado, el episodio tiene precio de lista. Al peldaño regular de la escalera son **$ 540 COP**; al peldaño barato de la oferta de bienvenida, **$ 208 COP** [M, §1.2/F3].

> **Para que un anuncio pagara el episodio que abre, el eCPM tendría que ser de ≈ US$ 177** — o de US$ 68 contra el peldaño barato. *($ 540 COP por impresión × 1.000, a la tasa de ≈ 3.050 COP/USD que usa §3.4bis.)*
>
> **El eCPM real de video recompensado en Colombia está entre US$ 2 y US$ 6 [S].** La brecha es de **30 a 90 veces.**

*Sobre la tasa: 3.050 COP/USD es la que queda implícita en la conversión de §3.4bis. Si la tasa correcta es mayor, la brecha se achica proporcionalmente y no cambia de orden de magnitud.*

### Por qué eso **no** es una pérdida de $ 540 por anuncio

Aquí hay que ser preciso, porque la cifra invita a un error. El valor regalado solo es real contra el contrafáctico de que esa persona **hubiera pagado**. Para el 95%+ que no paga nunca [M], el intercambio no cuesta nada: son episodios que jamás se iban a vender, y encima devuelven medio centavo de dólar. El costo verdadero está concentrado en la cola —el usuario al borde de comprar que aprende que hay un botón gratis—, y ese riesgo ya está declarado como guardrail en [I2](../02-estrategia/#i2--el-muro-muestra-las-salidas-que-ya-existen).

**La conclusión correcta no es que el grifo de anuncios sea caro. Es que no es un canal de ingreso.**

| | Lo que es hoy | Lo que tendría que ser |
|---|---|---|
| **Unidad que se vende** | Un desbloqueo | Tiempo de visionado |
| **Quién decide que haya anuncio** | El usuario, opcionalmente, si encuentra la tarjeta | El producto, como parte del contrato del piso gratuito |
| **Techo de impresiones** | 10 por usuario y por día, y casi nadie llega | El volumen de contenido consumido: **~140 episodios por MAU al mes** [I, sobre datos medidos] |
| **Función económica** | Discriminación de precios con devolución marginal | **Segunda línea de ingreso** |

Esa es toda la propuesta publicitaria en una frase: **dejar de cambiar episodios por anuncios y empezar a cobrar por la atención que el usuario ya está entregando.** Hoy Idilio ve unos 42 millones de episodios al mes [I, §6.6] y monetiza publicitariamente una fracción minúscula de ellos.

### Lo que esto **no** contradice

La [Etapa 1 de la estrategia](../02-estrategia/) —[I2](../02-estrategia/#i2--el-muro-muestra-las-salidas-que-ya-existen): subir el anuncio recompensado al primer renglón del muro y traducir su `0/10` a *«te quedan 10 episodios gratis hoy»*— sigue siendo correcta y sigue siendo lo más barato del portafolio. Solo que ahora tiene una segunda razón: **cada anuncio recompensado que hoy no se ve es una impresión que no se cobra.** I2 no es solo un arreglo de comprensión: es la primera palanca de la línea publicitaria, y probablemente la de mejor relación entre costo y retorno de todo este anexo.

---

## 6.3 Los tres pisos

El modelo propuesto no es nuevo ni arriesgado: es **exactamente el de ViX**, que es además el competidor directo en español y el que está en el repo [M, §5.3bis]. Tres niveles: gratis, premium con anuncios, premium sin anuncios.

### Piso 0 · «Idilio Libre» — la biblioteca abierta, con pauta

**Qué es.** Una porción declarada del catálogo pasa a verse **entera y gratis, sin monedas y sin muro**, con cortes publicitarios. No es una prueba ni una promoción: es un piso permanente del producto.

**Qué contenido va ahí, y por qué esto es lo mejor de la propuesta.** Un microdrama **se produce en una semana y se explota durante un mes** [M, §5.3bis]. Pasado ese mes, el muro de esa serie recauda casi nada y sigue ocupando catálogo. **Un activo depreciado vale más como inventario publicitario que como muro.** Convertir la biblioteca vieja en Piso 0:

- no cuesta un peso de producción nueva,
- no toca la ventana premium, que es de donde sale el ingreso de monedas,
- convierte ~1.728 episodios bloqueados [M, censo] en un depósito de inventario del que hoy no sale nada,
- y le da al Piso 0 catálogo suficiente el primer día, que es lo que un piso gratuito necesita para no parecer una demo.

**Cómo se dimensiona.** Con la curva de decaimiento de ingreso por serie, que Idilio tiene y este anexo no: el punto de corte es la semana en que el ingreso marginal del muro de una serie cae por debajo del ingreso publicitario esperado de abrirla. Es una cuenta, no una opinión, y solo hace falta un dato para hacerla ([§6.10](#610-los-seis-datos-que-cierran-esta-propuesta), dato 5).

### Piso 1 · Monedas — la ventana premium

**Sin cambios respecto de lo que hay hoy**, y ese es el punto: los estrenos y la ventana de explotación conservan el muro, los 10 episodios gratis, las 15 monedas y la escalera de paquetes que [I3](../02-estrategia/#i3--la-escalera-de-precios-vuelve-a-ser-una-escalera) arregla. El Piso 0 no le quita nada porque le entrega contenido que ya había dejado de rendir.

### Piso 2 · Pase Idilio — sin anuncios y sin muro

**Y acá está el efecto que casi nadie ve venir: el AVOD hace la suscripción *más* valiosa, no menos.**

Hoy el Pase Idilio vende dos cosas: *«desbloquea todo»* y *«sin anuncios»*. La segunda es prácticamente ficticia, porque los anuncios de hoy son **opcionales y están escondidos** — se le está cobrando al usuario por quitarle una molestia que no tiene. Ese conflicto ya estaba señalado bajo [I2](../02-estrategia/#i2--el-muro-muestra-las-salidas-que-ya-existen) y es el que este modelo resuelve: con cortes reales en el Piso 0, *«sin anuncios»* pasa a ser un beneficio que se siente en cada sesión.

> **La publicidad es la mejor herramienta de venta de suscripciones que existe.** Es literalmente el modelo con el que Hulu, Spotify, YouTube y ViX venden su nivel de pago.

**Y la regla que no se puede romper**, que sale de [D4 del benchmark](../05-benchmark/) —la doble monetización es la queja #1 de la categoría—: **el suscriptor no se encuentra nunca con un muro ni con un anuncio.** Ni una excepción, ni en series «premium», ni por un rato. Idilio ya tiene los dos productos, o sea que ya está en posición de cometer ese error [M, §5.4/D4].

### Cómo queda el muro

El muro rediseñado en [§3](../03-diseno/) sigue siendo el sitio donde se declara todo, y ahora tiene una salida más que ordenar. El orden que se sostiene es el mismo de [D2](../03-diseno/#d2--lo-gratis-siempre-va-arriba-de-lo-pago) —lo gratis antes que lo pago— con el Piso 0 entrando como la alternativa que hoy no existe:

```
🔒 Episodio 16/56 · Te falta 1 episodio

  ▸ Tu Pase de la Noche llega hoy a las 21:30 · tu hora de siempre
  ▸ Ver un anuncio y abrir este episodio          te quedan 10 hoy
  ▸ Gratis y completas en Idilio Libre            41 series, con pauta
  ─────────────────────────────────────────────────────────────
  ▸ Paquetes de episodios                         desde $ 208 c/u
  ▸ Pase Idilio · todo abierto y sin anuncios     $ 24.500/mes
```

*Maqueta, no producto: ninguna de estas pantallas está construida. El Piso 0 y la línea de Idilio Libre son de este anexo; el resto viene de [§3](../03-diseno/).*

Nótese lo que hace la tercera línea: **le da al muro una salida que no es ni pagar ni irse de la historia** — y como el Piso 0 son series *completas*, es la primera vez que «empezar otra serie» deja de significar «chocar contra otro muro dentro de diez episodios». Ataca el [Hallazgo 2 del diagnóstico](../01-diagnostico/#hallazgo-2--pagar-no-es-la-única-salida-del-muro-empezar-otra-serie-es-gratis) desde el lado opuesto al que lo ataca el Pase de la Noche, y hay que decir que **eso es a la vez su mejor propiedad y su mayor riesgo** ([§6.8](#68-riesgos-y-guardrails), R3).

---

## 6.4 El inventario: lo que decide el precio no es la billetera del usuario

Un eCPM se forma con tres cosas, y ninguna es el ingreso del espectador.

### 1 · Seguridad de marca — el techo que nadie está mirando

Los catálogos de anunciantes clasifican el contexto antes de pujar. Un catálogo **íntegramente de romance con carga erótica** —*Sesiones Prohibidas*, *Mi Amante Secreto*, *Pasión a Domicilio*— cae en las categorías de contenido sensible de los estándares de la industria, y **la demanda de marca sencillamente no puja ahí**. Lo que queda es el pozo de respuesta directa y remanente: juegos móviles, apuestas, préstamos, aplicaciones de citas. Es el tramo más barato del mercado.

**Este es el hallazgo comercial de este anexo.** El techo del ingreso publicitario de Idilio hoy no lo pone su usuaria: lo pone su catálogo. Y a diferencia del ingreso de la usuaria, el catálogo es una decisión de producto.

**Y tiene un requisito de ingeniería que hay que presupuestar:** para vender inventario apto para marca hay que poder **separarlo** del que no lo es en el momento de la puja. Eso significa clasificación de contenido por serie —y ojalá por episodio—, mapeo a categorías estándar de la industria, y que el llamado al servidor de anuncios lleve esa señal. Es trabajo editorial más plomería. No es caro, pero no es gratis, y sin eso la ampliación de catálogo no cobra la prima que la justifica.

### 2 · Competencia de demanda — más segmentos, más pujadores

Un eCPM sube cuando hay más de un comprador peleando por la impresión. Un catálogo de un solo género atrae una sola familia de anunciantes. Suspenso y true crime abren consumo masivo, seguros, servicios financieros y editorial; ciencia ficción abre tecnología, telco, automotriz y gaming de alto valor. **No es que el espectador de sci-fi valga más: es que agrega un comprador distinto a la subasta.**

### 3 · Formato — la ventaja que Idilio ya tiene y no está cobrando

Idilio es **video vertical de pantalla completa con sonido**. Es exactamente el formato para el que los anunciantes ya producen creatividades, porque es el de TikTok, Reels y Shorts. **No hay que pedirle a nadie que haga un anuncio especial para Idilio**, que es la fricción que mata a la mayoría de los inventarios nuevos. Eso es una ventaja competitiva real frente a inventarios de banner o de video horizontal, y debería ser el primer argumento de venta.

*Con una salvedad honesta: a las 11 p.m. en la cama, buena parte de la sesión probablemente ocurre con sonido bajo o nulo [I]. Las creatividades deben funcionar sin audio, y eso hay que exigirlo en las especificaciones o el rendimiento las castigará.*

### 4 · La pieza de mayor margen, y la que nadie está haciendo en español: el microdrama de marca

Una serie completa se produce en **una semana** [M, §5.3bis]. Esa es la propiedad económica más rara de este formato, y abre un producto publicitario que el video largo no puede ofrecer: **una serie escrita alrededor de una marca y pagada por ella.** El anunciante no compra impresiones sueltas: compra una historia. El contenido sale gratis, la audiencia es un extra, y el margen es el más alto de toda la línea.

En China es una categoría establecida. En español, por lo que revisé, **no la está ocupando nadie con escala** — y Idilio tiene lo único difícil de conseguir: producción propia, cadencia semanal probada y una serie premiada [M, §5.1].

No pongo un precio porque no tengo comparables en el mercado hispano y no voy a inventarlo. Lo que sí digo es que **es el único renglón de esta propuesta que no depende de tener escala de MAU**, y por eso probablemente sea el primero que conviene probar: una sola marca, una sola serie, y se sabe si el mercado existe.

---

## 6.5 La ampliación de catálogo, ordenada por costo

La propuesta de ampliar géneros es correcta. Lo que hay que ordenar es **en qué orden**, porque las fases se diferencian en un factor 100 de costo y la primera es gratis.

### Fase 0 · Reordenar lo que ya existe *(costo: cero de producción, ~1 semana de trabajo)*

**Idilio ya tiene thriller, misterio y terror gótico en catálogo. Están vendidos como romance.** Del censo de 50 series, con sus sinopsis reales:

| Serie | Lo que realmente es |
|---|---|
| *Creo que mi Esposa Quiere Matarme* | Thriller doméstico con cadáver, incriminación y detective |
| *La Enfermera Infiltrada* | Misterio de infiltración sobre una muerte nunca aclarada |
| *Intenciones Ocultas* | Thriller de envenenamiento doméstico |
| *La Venganza de la Hija del Esmeraldero* | Policial de investigación con detective a cargo del caso |
| *Sangre Enemiga* | Vampiros, clanes y cacería |
| *Pasión Frente a los Colmillos del Conde* | Terror gótico, Transilvania 1795 |
| *Chamado na Madrugada* | **Ganadora del India Catalina 2026** [M, §5.1] |

Los rieles del home ordenan el catálogo **por promesa emocional** —*«Amores Prohibidos»*, *«Venganza Pasional»*, *«Romances Oscuros»*— [M, cuatro rieles verificados en producción]. Esa es una decisión de merchandising excelente para el núcleo, y es también la razón por la que **una serie de suspenso puro no tiene dónde vivir en esta app**: no hay riel que la prometa.

**La intervención:** dos o tres rieles nuevos —*«Nadie es Inocente»*, *«Lo que Esconde la Casa»*, *«Sangre y Sombra»*— poblados con series que ya están, con arte de portada re-encuadrado hacia el gancho de suspenso y no hacia el romántico.

**Qué compra por cero pesos:** (a) la prueba de si existe demanda de género fuera del romance, medida en la única moneda que importa —clics, retención, series terminadas—, antes de comprometer un solo peso de producción; (b) el primer lote de inventario clasificable como apto para marca; (c) el aprendizaje de merchandising que la Fase 1 necesita.

> **Es la fase más importante de las cuatro, y es la que no cuesta nada.** Si el reordenamiento no mueve nada, la tesis de ampliación de catálogo queda seriamente debilitada y se ahorró el presupuesto entero.

### Fase 1 · Thriller y true crime contemporáneo *(costo: marginal sobre la producción actual)*

Es el género adyacente más barato que existe: **mismos escenarios contemporáneos, mismo elenco, misma duración, mismo ritmo de cliffhanger, misma semana de rodaje**. Un thriller doméstico y un melodrama de infidelidad se ruedan en la misma casa. El único cambio real es de guion.

Y el true crime en español tiene una propiedad que el romance no: **es el género con mayor apetito de marca en Latinoamérica** y el que mejor sostiene una audiencia mixta en edad y género [I].

**Cómo entra sin arriesgar:** dentro del acuerdo de producción existente —cinco producciones con GammaTime en 2026 [M, §5.1]—, dedicando **una** a thriller. Una de cinco es una apuesta que se puede perder.

### Fase 2 · Terror y sobrenatural *(costo: bajo-medio)*

El catálogo ya lo insinúa con las dos series de vampiros. El terror de bajo presupuesto es un género con una tradición larguísima de rendir por encima de su costo, y su audiencia es joven y **notoriamente tolerante a la publicidad** [I]. Encaja además con la franja horaria: **el 54% de las sesiones ocurre entre las 11 p.m. y las 2 a.m.** [M].

### Fase 3 · Ciencia ficción *(costo: alto — y por eso va última, o no va)*

Hay que decirlo aunque esté en la premisa: **la ciencia ficción es la peor primera apuesta de las cuatro.** Vestuario, escenografía, efectos y post-producción rompen justamente la economía que hace viable al formato —una serie por semana—. Un sci-fi de microdrama hecho barato se ve barato, y en este género eso es fatal de una manera en que en el melodrama no lo es.

**Si entra, entra en su forma barata:** distopía contemporánea, tecnología cercana, un solo elemento especulativo —una aplicación, un implante, un algoritmo— dentro de escenarios reales. *Black Mirror* se rueda en oficinas y apartamentos. Eso sí cabe en una semana de rodaje; naves y planetas no.

### Y el riesgo que la ampliación agrava, que hay que decir

El [diagnóstico](../01-diagnostico/) concluye que el usuario **tiene relación con el catálogo y no con una historia**, y que por eso no vuelve mañana. **Un catálogo más ancho empeora ese problema si no se hace nada más**: más géneros son más arranques gratis entre los que saltar.

Las dos mitigaciones ya están escritas en la estrategia entregada, y esto es lo que las vuelve más necesarias, no menos:

- **[I8 · El pase como puente entre series](../02-estrategia/#i8--el-pase-como-puente-entre-series)** era una intervención de descubrimiento sin mucho que descubrir. Con géneros nuevos, pasa a ser el mecanismo por el cual la app **dirige** a su usuaria de romance hacia el thriller — que es exactamente la transición que la ampliación necesita que ocurra.
- El Piso 0 se puebla con **series completas**, no con arranques. Una serie entera y gratis crea una relación con una historia; diez arranques gratis crean la conducta que el diagnóstico señala como el problema.

---

## 6.6 Cuánto vale esto

**Los supuestos primero, y todos declarados.** Cambiar cualquiera cambia el resultado proporcionalmente; la estructura de la cuenta es lo que ofrezco, no el número.

| | Valor | Origen |
|---|---|---|
| MAU | 300.000 | **[S]** El repo dice «cientos de miles» y Rio Times «unos pocos cientos de miles» [M, §5.1]. Tomo el punto medio bajo. |
| DAU/MAU | 0,33 → ~99.000 DAU | **[M]** brief |
| Episodios por sesión | 14 | **[M]** brief |
| Sesiones por día activo | 1 | **[S]** El diagnóstico lo llama «el supuesto más generoso» para el argumento del stock; acá es el **conservador**, porque subestima el inventario. |
| Episodios vistos / mes | **~41,6 M** · ~140 por MAU | **[I]** 99.000 × 30 × 14 |
| eCPM video recompensado, Colombia | US$ 3 – 6 | **[S]** banda de mercado; **hay que reemplazarla con el dato real de la mediación** |
| eCPM in-stream / intersticial, Colombia | US$ 1,5 – 3 | **[S]** ídem |
| Carga publicitaria | 1 corte cada 4 episodios | **[S]** decisión de diseño de [§6.7](#67-la-restricción-que-impone-un-episodio-de-90-segundos) |
| Tasa de cambio | ≈ 3.050 COP/USD | **[M]** la implícita en §3.4bis |

### Las tres fuentes de la línea publicitaria

| Fuente | Cómo se calcula | Impresiones/mes | Ingreso/mes |
|---|---|---|---|
| **A · Recompensado, ya visible** ([I2](../02-estrategia/#i2--el-muro-muestra-las-salidas-que-ya-existen)) | 20% de los DAU toma 4 anuncios/día **[S]** | ~2,4 M | **≈ US$ 10.700** |
| **B · Piso 0 conservador** — solo biblioteca vieja, 40% del visionado | 16,6 M eps ÷ 4, a US$ 2 | ~4,2 M | **≈ US$ 8.300** |
| **B′ · Piso 0 completo** — toda la vista no-suscrita lleva pauta | 41,6 M eps ÷ 4, a US$ 2,5 | ~10,4 M | **≈ US$ 26.000** |
| **C · Microdrama de marca** | — | — | **sin estimar** ([§6.4](#64-el-inventario-lo-que-decide-el-precio-no-es-la-billetera-del-usuario)) |

**Banda total (A + B, hasta A + B′): US$ 19.000 – 37.000 al mes ≈ US$ 230 k – 440 k al año.**
**Por MAU: US$ 0,06 – 0,12 al mes.**

### El cruce que decide la estrategia

La pregunta útil no es *«¿cuánto dan los anuncios?»* sino *«¿cuánto dan comparados con lo que ya hay?»*. El ingreso in-app por MAU es `conversión × ARPPU`:

| Conversión a pagador | ARPPU/mes | IAP por MAU/mes | Contra la línea publicitaria |
|---|---|---|---|
| 2% | US$ 4 | US$ 0,08 | **Los anuncios la superan** |
| 3% | US$ 4 | US$ 0,12 | **Empatan** |
| 5% | US$ 6 | US$ 0,30 | Los anuncios son un complemento de ~⅓ |

*Los tres escenarios son [S]; el real lo tiene Idilio.*

> **La lectura.** Con el 95%+ que no paga [M] —lo que ubica la conversión bien por debajo del 5%—, la línea publicitaria bien construida **está en el mismo orden de magnitud que todo el ingreso in-app actual**. No lo reemplaza: **lo duplica.** Ese es el premio, y es suficiente para justificar la inversión sin necesidad de ninguna promesa heroica.

### Y el límite, que es de escala y hay que decirlo

Para que la publicidad sea *el* negocio y no una segunda línea, haría falta multiplicar por tres o por diez. Hay exactamente dos maneras, y **son las dos que compra la ampliación de catálogo**:

1. **Más precio por impresión.** La venta directa y los acuerdos privados con demanda de marca pagan típicamente entre 2 y 4 veces el remanente programático [S]. Eso es lo que desbloquea el inventario apto para marca de [§6.4](#64-el-inventario-lo-que-decide-el-precio-no-es-la-billetera-del-usuario).
2. **Más impresiones.** Que es MAU × frecuencia × tiempo — o sea, **exactamente lo que persigue la estrategia ya entregada.**

**Hongguo es la demostración de las dos a la vez**: 304 M de MAU y ~125 minutos diarios [M, §5.3]. Idilio tiene cientos de miles de MAU y 22 minutos. La diferencia es de tres órdenes de magnitud en usuarios y de seis veces en tiempo. **El modelo publicitario puro es el final del camino, no el principio** — y el camino hasta ahí es retención, que es lo que este trabajo ya venía haciendo.

> **La síntesis con lo ya entregado.** La propuesta de monetización no reemplaza a la de retención: **la vuelve rentable.** El [Pase de la Noche](../03-diseno/) existía para que la usuaria volviera mañana, y su defensa económica era que costaba poco. Con una línea publicitaria montada, cada noche que el Pase recupera **es ingreso publicitario que no existía**, y el guardrail de canibalización de ARPDAU deja de ser un riesgo neto para convertirse en un intercambio con dos lados.

---

## 6.7 La restricción que impone un episodio de 90 segundos

Esta es la parte donde una propuesta publicitaria genérica se rompe contra este producto en particular, y conviene resolverla antes de que la resuelva mal el ad server.

**Un anuncio de 30 segundos sobre un episodio de 90 es un impuesto del 33%.** No hay ningún otro formato de video en el que la carga publicitaria sea tan brutal por construcción. Y la queja ya está documentada en la categoría, textual: *«los anuncios duran más que el episodio que desbloquean»* [M, §5.3, reseñas de DramaBox].

**Las seis reglas, y son de producto, no de operación:**

1. **Nunca pre-roll en el primer episodio de la sesión.** Es el momento de mayor fragilidad —a la 1 a.m., con una mano— y donde se pierde el D1.
2. **El corte va entre episodios, jamás dentro.** Un episodio de 90 segundos no tiene interior que sobreviva a una interrupción: **el cliffhanger es el producto.**
3. **Máximo un corte cada 4 episodios** — un corte cada ~6 minutos de contenido, carga del 4 al 7%. Muy por debajo de la televisión abierta (~25%) y de las plataformas AVOD (15-20%). Es deliberadamente conservador: la carga se sube después, midiendo, y jamás en el lanzamiento.
4. **15 segundos no salteable, o 30 salteable a los 5.** Nada más largo, sin excepción de puja.
5. **El corte se anuncia.** *«Un anuncio y seguimos»* con cuenta regresiva visible. Lo que destruye la sesión no es el anuncio: es no saber cuánto falta.
6. **El corte nunca cae sobre el final de una serie ni sobre el episodio que abre un Pase de la Noche.** El Pase es la cita del producto; meterle un anuncio adentro es cobrarle al usuario por el regalo.

**Y una decisión de medición, no de diseño:** la carga publicitaria debe entrar como experimento con grupo de control desde el día uno, con **episodios por sesión** como guardrail principal. Es la métrica que el impuesto del anuncio va a golpear primero, y es la que alimenta todo el resto del modelo.

---

## 6.8 Riesgos y guardrails

| | Riesgo | Cómo se ve venir | Guardrail y criterio de reversión |
|---|---|---|---|
| **R1** | **La carga publicitaria hunde la sesión.** El riesgo mayor y el más específico de este formato ([§6.7](#67-la-restricción-que-impone-un-episodio-de-90-segundos)). | Episodios por sesión y D1 de la cohorte con pauta. | **Episodios por sesión no caen más de 5% relativo contra holdout.** Si se cruza, se baja la carga a 1 corte cada 6 episodios antes de revertir. |
| **R2** | **El Piso 0 canibaliza el muro.** Es el riesgo económico central: contenido que hoy se vende pasa a regalarse. | Ingreso por serie antes y después de moverla al Piso 0. | Solo entran al Piso 0 series cuyo **ingreso semanal de muro ya cayó por debajo del ingreso publicitario esperado** (dato 5). Es una regla, no un juicio — y si se respeta, R2 no puede materializarse por definición. |
| **R3** | **El Piso 0 agrava el problema del diagnóstico.** Series completas y gratis son la mejor razón que jamás tuvo alguien para **saltar de historia** en vez de quedarse. | Series distintas empezadas por usuario; fracción de series terminadas. | El Piso 0 se puebla con **series completas**, nunca con arranques, y [I8](../02-estrategia/#i8--el-pase-como-puente-entre-series) dirige el Pase hacia allí. Guardrail: la fracción de series que se terminan no cae. |
| **R4** | **La suscripción se choca con un anuncio.** Es la queja #1 de la categoría [M, §5.4/D4] y es puramente autoinfligida. | Reseñas de tienda, tickets de soporte. | **Regla dura:** el suscriptor no ve nunca un anuncio ni un muro. Sin excepciones, ni en estrenos, ni por error de configuración. Un test automatizado, no una intención. |
| **R5** | **Regulatorio.** Idilio opera en 120 países, España incluida [M]. | — | **Buena noticia: la publicidad in-stream es el modelo más seguro de los tres.** Lo que la UE prohibió permanentemente en TikTok Lite es **recompensar tiempo de pantalla** [M, §5.4/D5], que es lo que este modelo *reduce*. Requisitos concretos: plataforma de consentimiento para la UE, cumplimiento de Ley 1581 en Colombia, y clasificación por edad del inventario. |
| **R6** | **La ampliación de género diluye la marca.** Idilio se declara la app #1 de microdramas de Latinoamérica y su serie premiada es del núcleo [M, §5.1]. | Retención de la base actual; composición del catálogo por género. | La **Fase 0 cuesta cero y responde la pregunta antes de gastar.** Ninguna producción nueva de género se compromete hasta que los rieles reordenados muestren tracción. |
| **R7** | **Que la premisa demográfica sea falsa** y toda la propuesta apunte al lugar equivocado. | — | **Se resuelve antes de empezar**, con los datos de [§6.1](#61-la-premisa-revisada), y cuesta una tarde. |

---

## 6.9 La secuencia

Se engancha sobre las tres etapas de la [estrategia entregada](../02-estrategia/#24-la-secuencia-y-por-qué-es-esa) en vez de competir con ellas.

```
Sem  0  1  2  3  4  5  6  7  8  9  10 11 12 13 ...
M0  ██                          verificar la premisa · 4 fuentes que ya existen
M1     ████                     Fase 0 · rieles de género con el catálogo actual
M2     ██████                   instrumentación publicitaria + mediación + consentimiento
M3        ████████              Piso 0 «Idilio Libre» sobre biblioteca depreciada
M4              ██████          in-stream con carga controlada, contra holdout
M5                    ██████    clasificación de inventario + apto para marca
M6                       ██████ una marca, una serie · el piloto de microdrama de marca
M7                          ███ Fase 1 · una de las cinco producciones a thriller
```

**Por qué M0 va antes que todo.** Cuesta una tarde y puede invalidar la propuesta entera. Ningún presupuesto se compromete antes.

**Por qué M1 va antes que cualquier producción.** Cuesta una semana de merchandising y responde, con el catálogo que ya existe, la pregunta que la Fase 1 iba a responder gastando una producción.

**Por qué M2 va temprano y en paralelo.** Sin medición no hay negociación: los eCPM de este documento son supuestos, y hasta que no haya números propios toda la cuenta de [§6.6](#66-cuánto-vale-esto) es una estructura vacía.

**Por qué M6 no espera a tener escala.** El microdrama de marca es el único renglón que **no depende del MAU** ([§6.4](#64-el-inventario-lo-que-decide-el-precio-no-es-la-billetera-del-usuario)). Una marca y una serie bastan para saber si el mercado existe, y si existe cambia el orden de todo lo demás.

**Qué no se toca.** El muro de la ventana premium, los 10 episodios gratis por serie y la escalera de paquetes siguen como están hasta que la Etapa 1 de la estrategia los arregle. Esta propuesta **agrega un piso por debajo**; no reescribe el que ya funciona.

---

## 6.10 Los seis datos que cierran esta propuesta

Ninguno requiere un estudio. Los seis los tiene Idilio hoy, y cada uno reemplaza un supuesto de este documento por un hecho.

| | Dato | De dónde sale | Qué supuesto reemplaza |
|---|---|---|---|
| **1** | **Demografía real de la base** — edad, género y país | Google Play Console, App Store Connect | **La premisa entera** ([§6.1](#61-la-premisa-revisada)) |
| **2** | **eCPM real por formato, geografía y sistema operativo** | Panel de la mediación | Toda la banda de ingreso de [§6.6](#66-cuánto-vale-esto) |
| **3** | **Adopción real del anuncio recompensado** — qué fracción del DAU ve ≥1 anuncio, y cómo se distribuye contra el tope de 10 | Analítica propia | La fuente A, y de paso dimensiona [I2](../02-estrategia/#i2--el-muro-muestra-las-salidas-que-ya-existen) |
| **4** | **Conversión a pagador y ARPPU** | Facturación | La tabla del cruce de [§6.6](#66-cuánto-vale-esto) — es la que decide si los anuncios son la línea principal o la segunda |
| **5** | **Curva de decaimiento de ingreso por serie** — cuánto recauda el muro de una serie en la semana 1, 4, 12 | Facturación por SKU | **Dimensiona el Piso 0 y elimina R2 por construcción** |
| **6** | **MAU y sesiones por día activo**, con precisión | Analítica propia | El volumen de inventario de [§6.6](#66-cuánto-vale-esto) |

> **Y el que no está en la lista, porque no existe todavía: el resultado de la Fase 0.** Dos rieles de género con el catálogo que ya está, una semana de trabajo, y la pregunta *«¿esta audiencia quiere algo además de romance?»* deja de ser una hipótesis de este documento y pasa a ser una medición. **Es lo primero que haría, y lo que menos cuesta equivocarse.**
