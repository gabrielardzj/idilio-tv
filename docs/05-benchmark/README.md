# Anexo · Benchmark competitivo

> **Pregunta:** ¿qué es exactamente Idilio TV, quién más está construyendo un metajuego sobre
> contenido serializado, cómo lo hace, contra qué chocó y cómo lo resolvió?
>
> **Método:** investigación secundaria (agosto 2026) sobre fuentes públicas — prensa de industria,
> reportes de Sensor Tower y RevenueCat, fichas de App Store, decisiones regulatorias y reseñas
> agregadas. Todo lo que aquí se afirma está enlazado en [§5.7](#57--fuentes). Lo que **no** pude
> verificar está marcado como tal en [§5.6](#56--lo-que-no-pude-verificar).
>
> Este anexo sirve a dos cosas: (a) poner el diagnóstico en escala de categoría, y (b) someter
> el Pase de la Noche a los precedentes reales — incluidos los que juegan en contra.

---

## 5.1 · Qué es Idilio TV, con los datos que el brief no traía

| | |
|---|---|
| **Empresa** | Latido TV SAS (Colombia) |
| **Fundadora** | Gabriela Tafur |
| **Lanzamiento** | Octubre de 2025 |
| **Escala (jun-2026)** | 1,3–1,5 M descargas · **300 K MAU** · 120 países |
| **Financiación** | **US$5 M seed**, anunciada en el Vertical Video Summit (LA, jun-2026) |
| **Inversores** | **a16z Speedrun** (lead), Goodwater Capital, **David Vélez** (fundador de Nubank, a título personal), **WndrCo** (el fondo de Jeffrey Katzenberg) |
| **Contenido** | Microdramas verticales originales en español, capítulos de ~90 s. Acuerdo con GammaTime por cinco producciones en 2026. Títulos nominados a los Premios India Catalina |
| **Posición** | Se declara la app #1 de microdramas de Latinoamérica |

**El dato que cambia el diagnóstico.** La ficha de App Store del build 1.20.0 lista las compras
in-app reales:

| Producto | Precio |
|---|---|
| Promo 180 monedas | $0.49 – $0.99 |
| Packs de 75 a 1.500 monedas | $0.99 – $11.99 |
| **Pase semanal** | **$7.99** |
| **Pase mensual** | **$14.99** |

Es decir: **Idilio ya es un modelo híbrido — suscripción + monedas —, no solo monedas.**
El diagnóstico (§1.2, F3) analizó la escalera de packs porque es lo único que aparece en el muro
del build 1.20.0. Que exista una suscripción que **no se ofrece en el momento de máxima intención**
no debilita el hallazgo F1: lo agrava. El metajuego no es lo único que vive en otro edificio;
el producto de mayor valor de la economía también.

Y hay un segundo problema, de precio: la suscripción semanal a **$7.99** implica **$34,6 al mes**
en una región cuyo ARPU medio de apps es **$11,30 mensuales**. El pase semanal está calibrado para
un mercado que no es este.

*(Nota: la ficha registra 4.9★ con 33 valoraciones en App Store US; el dogfooding había medido
4.7★ / 28 K en Google Play. Son tiendas y bases distintas; ambos números son correctos.)*

---

## 5.2 · La escala de la categoría: el problema de Idilio es el problema de todos

Antes de comparar mecánicas, hay que fijar la vara. Los datos de retención de Sensor Tower para
la categoría de short drama (12 meses a abril-2026):

| | Categoría global | China | DramaBox |
|---|---|---|---|
| **D1** | 26,9 % | 28,8 % | 27,5 % |
| **D7** | 8,6 % | 11,5 % | 7,8 % |
| **D14** | 5,6 % | 6,8 % | 5,0 % |

**Esto reencuadra el diagnóstico.** Un DAU/MAU de 0,33 no es una anomalía de Idilio: es el techo
de una categoría donde **el 94 % de los usuarios no llega al día 14**. La categoría entera está
construida sobre adquisición pagada y extracción rápida, no sobre hábito.

Dos lecturas se siguen de ahí, y las dos importan:

1. **La intervención no está corrigiendo un defecto de Idilio. Está atacando el techo de la
   categoría.** Eso sube el valor estratégico de acertar y baja la probabilidad de acertar rápido:
   nadie en el sector lo tiene resuelto.
2. **La barra de éxito debe ser relativa, no absoluta.** Prometer "D30 al doble" es prometer contra
   una física que ningún competidor venció. Prometer "mover D7 de 8,6 % a 11 %" es una apuesta
   defendible y medible.

Contexto de mercado, para dimensionar el premio:

- Los ingresos in-app de la categoría fueron **$2.980 M en 2025, +115 % interanual** — tercera
  categoría de mayor crecimiento después de IA y redes sociales.
- H1-2026: **1.450 M de descargas, +95,5 %**.
- **Los cinco primeros concentran el 68,8 % de los ingresos.** Es un mercado de ganador-se-lleva-casi-todo.
- **El 57,6 % de la categoría ya opera con monetización híbrida** (suscripción + microtransacción + ads).
- Latinoamérica: ARPU **$11,30**, +28,6 % interanual, y **el mayor crecimiento mediano de MRR de
  cualquier geografía** según RevenueCat. Mercado barato pero acelerando.

---

## 5.3 · El censo: qué mecánica de hábito usa cada app de series verticales

Amplié el barrido más allá de las cinco grandes. La categoría no tiene una mecánica: tiene
**cinco familias**, y casi ninguna app usa una sola.

### Familia 1 · Check-in escalonado a 7 días (el estándar de facto)

Presente en **ReelShort, DramaBox, ShortMax, GoodShort, FlexTV, NetShort, DramaWave, MoboReels,
Kalos TV**. La forma es siempre la misma: monedas que crecen día a día, premio grande el día 7,
y **fallar un día devuelve al día 1**.

| App | Cómo lo hace |
|---|---|
| **ReelShort** | Hasta ~165 monedas por semana completa; el día 7 es el más jugoso. Las monedas bonus **caducan entre 7 y 30 días** |
| **ShortMax** | 25–30 monedas diarias según el día del ciclo |
| **GoodShort** | El check-in da **puntos que extienden el VIP**, no saldo |
| **FlexTV** | Mismo patrón — y la queja registrada de sus usuarios es que **lo que da no alcanza** |
| **Kalos TV** | Sección "Rewards" con tareas; hay reportes de que el check-in falla |

**Lo que esto confirma:** la racha rota de Idilio no es un error de Idilio, es un calco del
estándar. Y el estándar está calibrado para un usuario de 7 días/semana que, según los datos de
retención de §5.2, prácticamente no existe en ninguna de estas apps.

### Familia 2 · Anuncios recompensados con tope diario

**DramaBox** (15 ads/día × 2 monedas), **ShortMax** (6 ads/día × 25), **ReelShort** (15–20 ads
≈ 250 monedas/día), **Wattpad** (3–10/día), **Melolo** (progresión directamente gateada por ads).
Es la fuente gratuita dominante de la categoría. Su costo está documentado en las reseñas:
*"los anuncios duran más que el episodio que desbloquean"*.

### Familia 3 · Tareas rotativas ("rewards center")

**ReelShort** rota micro-encargos: ver episodios, compartir en redes, **activar notificaciones
push**, invitar amigos. Es la familia más flexible y la que más se parece a un metajuego real,
porque el diseñador elige qué conducta premiar cada semana.

Detalle que importa: una de las tareas premiadas es **activar las notificaciones**. La categoría
entera sabe que su motor de retorno no es la racha, es el push.

### Familia 4 · Ver = ganar dinero (el extremo, y funciona)

**Hongguo Short Drama** (ByteDance, China) es el caso más grande del mundo y no aparece en
ninguna comparativa occidental: **300 M de MAU**, #1 en Entretenimiento del App Store chino,
**1,38 h/día por usuario** — más que iQIYI. Su modelo es el opuesto exacto al de Idilio:

- **Todo gratis, financiado por publicidad.** No hay muro de monedas.
- El usuario **gana monedas de oro viendo** y las **convierte en dinero real** ("regístrate 7
  días y retira hasta ¥4,79").
- Onboarding con credenciales de Douyin, lo que le abarata la adquisición.

Es el mismo mecanismo de "tarea → recompensa por tiempo de pantalla" que la Comisión Europea
**prohibió permanentemente** en TikTok Lite (§5.4, D5). Opera a escala de 300 M de usuarios en
una jurisdicción donde eso es legal. **La mecánica más eficaz de la categoría es, literalmente,
la que no se puede exportar a Europa.**

Y trae de regalo el mejor caso de estudio de la categoría sobre **cambiar las reglas de la
economía**, que es exactamente lo que esta intervención propone hacer. En mayo de 2026 los
usuarios descubrieron que una película exigía VIP de pago (¥8/semana, ¥30/mes, ¥260/año) y el
tema estalló en Weibo. Hongguo respondió, con razón, que **el VIP existía desde el lanzamiento
en agosto de 2023** y que solo cubría el mínimo contenido que exigían ciertos titulares de
derechos. No sirvió de nada: la lectura pública fue que *"el personaje de gratis se derrumbó"*.
El análisis de prensa lo resumió mejor de lo que yo podría:

> El desafío real de Hongguo no es si cobrar, sino **cómo lograr que el usuario perciba y acepte
> el cobro. No es un problema de precio: es un problema de reescritura de reglas.**

A eso se suma, en febrero de 2026, que a numerosos usuarios en el exterior **se les pusieron en
cero las monedas acumuladas y el saldo retirable, sin aviso y sin historial**. Es el mismo
material del que están hechas las quejas por caducidad de monedas en DramaBox y ReelShort.

### Familia 5 · Programación y eventos (hábito sin gamificación)

La familia menos explorada y la más interesante para Idilio, porque **no requiere economía**:

- **ShortMax** hace **"binge-hours"**: avisa cuándo cae la temporada completa y convoca a verla,
  con visionado acompañado entre amigos. Convierte el estreno en cita.
- **GoodShort** publica decenas de episodios nuevos **cada día** para que siempre haya movimiento
  en el catálogo.
- Toda la categoría corre **push de continuidad**: *"tu próximo episodio te está esperando"* a
  las 24 h de inactividad con una serie a medias, y *"el final de [serie] acaba de estrenarse"*
  para quienes llevan 3+ días sin abrir.

Es la respuesta no-económica al mismo problema: darle al usuario una razón agendada para volver.
Y es compatible con el Pase de la Noche, no alternativa a él.

---

### 5.3bis · La capa que se me había escapado: las teleseries verticales de los broadcasters

Esta es la competencia real de Idilio en español, y **no juega con monedas**.

| Quién | Qué lanzó | Escala |
|---|---|---|
| **TelevisaUnivision** | **ViX Micro** (jul-2025) | **145 títulos** y **326 M de visualizaciones** en un año |
| **TV Globo** (Brasil) | *Cinderela e o Segredo do Pobre Milionário* (fines de 2025) | — |
| **Telefe** (Argentina) | *Triángulo amoroso* | — |
| **Canal 13 / TVN** (Chile) | *Mi boda es una trampa*, *Amor sin culpas* | *Amor sin culpas*: **30 M de reproducciones** |
| **César Opazo** (productor, Chile) | Seis series | **175 M de visualizaciones** |

**El modelo de ViX Micro, que es el que hay que mirar de frente:**

1. **El tráiler y los cinco primeros episodios se estrenan en Instagram, TikTok, Facebook y X.**
   El resto, solo en la app. El muro no es de dinero: es de plataforma.
2. **Los microdramas viven dentro de la suscripción existente** — ViX tiene tres niveles: gratis,
   premium con anuncios y premium sin anuncios. No hay monedas ni desbloqueo por episodio.
3. **Cadencia semanal declarada** (estreno cada viernes desde el 25 de julio de 2025), 40
   originales en el primer año.
4. Rafael Urbina, presidente de Streaming y Digital, describe el formato como **"puerta de entrada
   a nuestro ecosistema de contenido más amplio"**: el microdrama es adquisición para el catálogo
   grande, no un negocio por sí mismo.

**Por qué esto es una amenaza distinta a ReelShort.** ReelShort compite con Idilio por el mismo
usuario con la misma economía. ViX compite **cambiando la economía**: para alguien que ya paga
ViX, el microdrama es gratis e ilimitado. Frente a eso, un muro que cobra 15 monedas por capítulo
no se lee como precio justo — se lee como el precio de estar en la app equivocada.

Y refuerza la intervención por un camino inesperado: si el diferencial de ViX es "todo incluido",
lo que Idilio necesita no es abaratar el episodio, sino **que el usuario tenga una relación con
una historia** — algo que ViX, con 145 títulos y distribución repartida en cuatro redes sociales,
no está construyendo. La escala del formato confirma que la pelea vale: Variety proyecta
**US$26.000 M anuales para 2030**, y una serie completa se produce en una semana y se explota
durante un mes.

---

## 5.4 · Los seis desafíos, y cómo los resolvió cada quien

### D1 · La mecánica de "espera y es gratis" funciona o fracasa según el contenido, no según el diseño

Es el hallazgo más importante para esta intervención, porque **la misma mecánica produjo el mayor
éxito y los dos fracasos más citados**.

| | Piccoma Japón | Webtoon Daily Pass | Piccoma Francia |
|---|---|---|---|
| Resultado | ¥105.000 M/año, #1 | Retirado 2025 | Cerrada 2024 |
| Qué era el pase | **La vía normal de lectura** de un catálogo infinito | Un racionamiento de series **ya terminadas** que el lector podía maratonear | Igual que Japón |
| Por qué | El manga japonés es de consumo **serial semanal**; esperar ya era la norma cultural | Convirtió leer en **tarea diaria**; hubo hasta una petición pública para eliminarlo | El público francés compra BD como **objeto coleccionable**; esperar se leyó como "alquiler" |

**La regla que sale de comparar los tres:** el pase gratuito funciona cuando es **aditivo** —abre
contenido que el usuario no tenía— y falla cuando es **restrictivo** —raciona contenido que el
usuario ya podía consumir de corrido. Y funciona cuando el ritmo del pase coincide con el ritmo
cultural de consumo del formato.

Para Idilio esto es favorable y verificable: el episodio 11 hoy **no es accesible**, y los
microdramas ya se consumen en sesiones nocturnas cortas y recurrentes. El pase sería aditivo.
Pero la lección francesa advierte de lo contrario: **si el usuario percibe el pase como el nuevo
techo en lugar de como un piso, se comporta como el lector francés.** De ahí que el pase deba
presentarse siempre junto a la compra, nunca como sustituto de ella.

### D2 · La racha estándar castiga a la mayoría — y hay evidencia dura de cómo arreglarlo

Todos los actores de la categoría copiaron la misma racha: 7 días consecutivos, fallas uno y
vuelves a cero (ReelShort lo hace explícito). Fuera de la categoría hay dos correcciones probadas:

- **Duolingo** descubrió, midiendo, que **los usuarios con metas diarias más altas mantenían
  *menos* la racha, incluso entrando todos los días.** Bajar la barra sube la racha. Además dejan
  al usuario **configurar la hora de inicio de su día** —el rollover no es medianoche por decreto—
  y venden el *streak freeze* como red de seguridad, no como castigo.
- **Snapchat** monetiza el rescate: restaurar racha cuesta ~$0.99 y **generó $4,2 M en
  microtransacciones a fines de 2025**; los suscriptores de Snapchat+ además pueden **congelarla**.
  Pero es también el caso de advertencia: hay documentación interna de que la mecánica generó
  ansiedad masiva, y el propio CEO lo reconoció públicamente.

**Lo que valida el diseño actual:** la noche que cierra a las 5 a.m. es la versión de Idilio del
"day start" configurable de Duolingo — la diferencia es que aquí no se le pide al usuario que lo
configure, se infiere del comportamiento (54 % de sesiones entre 11 p.m. y 2 a.m.). Y el 70 % de
espectadores que, según Holywater, ve **en la cama antes de dormir** es evidencia externa e
independiente de que la unidad correcta es la noche.

**Lo que el diseño debe evitar:** monetizar el comodín. Es tentador —Snapchat demostró que se
puede— pero convierte la ansiedad en línea de ingreso, y ese es exactamente el patrón que la
regulación europea empezó a mirar (ver D5).

### D3 · La fuente gratuita canibaliza — o no, según de dónde salga el valor

El miedo de siempre: si regalo episodios, dejo de vender episodios. La categoría respondió con
tres soluciones distintas, y solo una evita el problema de raíz.

1. **Anuncios recompensados** (DramaBox, Wattpad, Melolo): el valor lo paga el anunciante, no la
   caja. Funciona, pero tiene un costo de experiencia documentado — la queja recurrente en las
   reseñas de DramaBox es que *"los anuncios duran más que el episodio que desbloquean"*.
2. **Offerwall / engagement recompensado** (Adjoe Playtime, adoptado por apps de la categoría):
   el usuario gana moneda jugando a juegos de terceros. Adjoe reporta que quienes lo usan
   promedian **16,3 días de retorno contra 5,0 de los que no** — 3×. Es la solución de moda para
   monetizar al no-pagador, y hay que decir que el número viene del propio vendedor.
3. **Convertir el premio en tiempo de suscripción en vez de saldo** (GoodShort): el check-in da
   puntos que **extienden el VIP**. Elegante — la recompensa por volver empuja hacia el producto
   caro en lugar de reemplazarlo.

**Lo que esto le dice al Pase de la Noche:** la decisión de que el pase sea un **episodio que
caduca** y no moneda ya evita la canibalización directa (no acumula hacia una compra que el
usuario habría hecho). Pero la opción 3 sugiere una variante no explorada: que la racha larga
premie con **días de pase semanal**, no con más episodios. Convierte al usuario habitual en
suscriptor probador en vez de en free-rider eficiente. Lo dejo señalado como hipótesis para la
ola 2, no como cambio a esta intervención.

### D4 · La doble monetización quema la confianza — y es la queja #1 de la categoría

El patrón de reseñas se repite en todas las apps: pagar suscripción **y aun así chocar contra
muros de monedas** en series "premium". A eso se suman monedas compradas que caducan, autoplay
que vacía un pack en ocho minutos, pruebas gratis que se renuevan solas y reembolsos que no
llegan. Es el pasivo reputacional de la categoría entera.

Idilio **ya tiene los dos productos** (packs + pases semanal/mensual). Es decir: ya está en
posición de cometer ese error, y todavía a tiempo de no cometerlo. La regla que sale del
benchmark es de una línea: **si hay suscripción, la suscripción no debe encontrarse nunca con
un muro.** Y el muro rediseñado es el lugar donde eso se declara o se traiciona.

### D5 · El riesgo regulatorio ya no es hipotético

Tres precedentes, en tres jurisdicciones, todos posteriores a 2024:

- **Unión Europea, agosto 2024.** La Comisión abrió expediente bajo el DSA contra el programa de
  recompensas de **TikTok Lite** en Francia y España por *diseño adictivo* — tareas y puntos por
  tiempo de uso, sin evaluación previa de riesgo. TikTok se comprometió a **retirarlo
  permanentemente de la UE** y a no lanzar nada que lo eluda. Fue el primer caso cerrado bajo el DSA.
- **Francia.** El análisis del fracaso de Piccoma señala explícitamente que el DSA y la ley de
  consumo francesa prohíben *dark patterns*, y que **la presión temporal combinada con moneda
  virtual dispara escrutinio regulatorio**.
- **China, junio 2026.** La NRTA publicó a consulta las *Medidas para el desarrollo de
  microdramas*, y entre los problemas que declara querer corregir está el **"consumo inducido y
  los estándares de cobro poco claros"** del modelo de negocio.

Idilio opera en 120 países, España incluida. La distinción que salva el diseño es fina pero
sustantiva: **TikTok premiaba tiempo de pantalla; el Pase de la Noche premia terminar un
episodio.** Uno recompensa la permanencia, el otro la finalización de una unidad narrativa —y
tiene techo duro (1/24 h, 7/semana). Vale la pena que esa distinción esté escrita en el
documento de producto **antes** de que la pregunte alguien de fuera. La misma lógica refuerza
F2: declarar el precio en episodios en vez de en monedas desnudas no es solo mejor UX, es
alinearse con la dirección en que se está moviendo la regulación de "estándares de cobro claros".

### D6 · Dónde se pone el muro es la decisión de producto más cara de la categoría

El consenso del sector: **10 episodios gratis, a veces hasta 20**, y el muro justo después de un
cliffhanger, cuando el compromiso emocional ya está hecho. La formulación que más se repite en
los análisis: *"el corte gratis-a-pago es la única palanca que importa más que ninguna otra:
demasiado pronto y espantas al casual, demasiado tarde y regalas tus episodios más monetizables"*.

Idilio está exactamente en la moda de la categoría (10). Lo que el diagnóstico añadió y el
benchmark no contradice es que **el problema no es dónde está el muro por serie, sino cuántas
series hay detrás**: 428 episodios gratis repartidos en 43 títulos convierten el muro en un
desvío, no en una decisión. Ninguna de las fuentes revisadas analiza el muro a nivel de catálogo.
Eso sigue siendo original de este diagnóstico.

---

## 5.5 · Qué se lleva la intervención

**Se refuerza:**

| Decisión del diseño | Evidencia externa que la sostiene |
|---|---|
| Contar noches, no días | 70 % de espectadores de microdrama ve **en la cama antes de dormir** (Holywater/Owl & Co, jul-2026) |
| Rollover a las 5 a.m., no a medianoche | Duolingo permite configurar el "day start" precisamente por esto |
| Bajar la barra: la racha se acredita al **terminar un episodio** | Duolingo midió que **metas más altas → menos racha mantenida** |
| El comodín que se consume solo | El *streak freeze* como red de seguridad, no como castigo |
| Pases que se acumulan hasta 2 | La queja que mató al Daily Pass fue el "úsalo o piérdelo" |
| Declarar todo en episodios | La NRTA china apunta a los "estándares de cobro poco claros" como el problema del modelo |
| Que el pase sea **aditivo** (abre el ep. 11+), no restrictivo | Es la diferencia exacta entre Piccoma Japón y Webtoon Daily Pass |

**Se corrige o se añade:**

1. **El muro debe ofrecer la suscripción.** El producto ya tiene pase semanal ($7.99) y mensual
   ($14.99) y no los muestra en el momento de máxima intención. Esto entra en el diagnóstico
   como falla, y en el rediseño del muro como tercera salida junto al pase y al pack.
2. **El pase semanal está mal calibrado para LatAm.** $7.99/semana = $34,6/mes contra un ARPU
   regional de $11,30. No es materia de esta intervención, pero es un hallazgo de pricing que
   el equipo debería mirar.
3. **La barra de éxito baja y se vuelve relativa.** Con D7 de categoría en 8,6 %, la promesa
   honesta es mover D7 unos puntos, no duplicar D30. Nadie en el sector lo ha logrado.
4. **Hay que escribir la distinción anti-DSA.** Una línea en el documento de producto: se premia
   la finalización de una unidad narrativa, no el tiempo de pantalla; con techo duro y sin venta
   de rescates.
5. **No monetizar el comodín.** Snapchat probó que da dinero y probó que cuesta reputación.
6. **Hipótesis para la ola 2:** que la racha larga premie con **días de suscripción** en vez de
   más episodios (el patrón de GoodShort). Convierte al habitual en suscriptor probador.
7. **Cambiar la unidad de la economía es una reescritura de reglas, y hay que tratarla como tal.**
   Es la lección de Hongguo: tenían razón en los hechos —el VIP existía desde 2023— y aun así
   perdieron el argumento, porque el usuario no juzga la regla, juzga el cambio de regla. Pasar de
   monedas a episodios y meter un pase gratuito es un cambio favorable al usuario, pero **si se
   despliega en silencio se lee como recorte**. El plan de lanzamiento necesita un momento
   explícito de "esto cambió, y cambió a tu favor", no solo una UI nueva.
8. **El competidor a vencer en español no cobra por episodio.** ViX Micro reparte los cinco
   primeros capítulos en TikTok e Instagram y el resto entra en una suscripción que millones ya
   pagan. Contra eso, el argumento de Idilio no puede ser el precio: tiene que ser el apego a una
   historia. Es exactamente lo que persigue el Pase de la Noche, y conviene que el documento de
   estrategia lo diga con ese competidor por nombre.
9. **La programación es la palanca gratuita que nadie en LatAm está usando.** Los "binge-hours"
   de ShortMax y el push de continuidad de toda la categoría producen hábito sin tocar la
   economía. Es más barato que cualquier rediseño del muro y es complementario a la intervención.

---

## 5.6 · Lo que no pude verificar

- **La retención propia de Idilio** contra los benchmarks de Sensor Tower. Los números de
  categoría son públicos; los de Idilio, no. La comparación de §5.2 es indicativa.
- **Si el pase semanal/mensual aparece en algún punto del flujo nativo.** La ficha de App Store
  lo lista como IAP; el muro del build 1.20.0 no lo mostró en el dogfooding. Puede estar en otra
  superficie que no recorrí.
- **Los números de Adjoe Playtime** (16,3 vs 5,0 días de retorno) vienen del proveedor del
  producto. Los cito como reclamo comercial, no como dato independiente.
- **La mecánica exacta de "retos" y video recompensado dentro de Idilio.** Sigue apoyada solo en
  reseñas públicas de Google Play, igual que en el diagnóstico.
- **Ninguna app de series verticales con un pase gratuito diario asignable por serie.**
  Amplié la búsqueda a quince apps (§5.3) y la conclusión se sostiene: la categoría usa check-in,
  anuncios, tareas rotativas, suscripción y programación — **ninguna usa espera**. Lo más cercano
  es el "episodio gratis diario" que reparten DramaBox, ReelShort y ShortMax, pero es una
  asignación que hace el sistema, no un recurso que el usuario dirige. La espera vive en el
  vecindario de al lado (Piccoma, Pocket FM), no en este. Es a la vez la oportunidad y el motivo
  de que no haya precedente directo que lo respalde.
- **Si ViX Micro tiene alguna mecánica de hábito propia dentro de la app.** Verifiqué su modelo de
  distribución y monetización, no su capa de retención. Es la verificación que más falta hace.
- **Las cifras de Hongguo** (300 M MAU, 1,38 h/día) vienen de prensa china y de análisis de
  terceros, no de reportes auditados.

---

## 5.7 · Fuentes

**Idilio TV**
- [C21Media · Colombia's Idilio raises US$5m](https://www.c21media.net/news/colombias-idilio-raises-us5m-to-scale-microdrama-platform/) — ronda, inversores, fundadora, GammaTime
- [App Store · idilio tv](https://apps.apple.com/us/app/idilio-tv/id6749875422) — lista de compras in-app, versión 1.20.0
- [Google Play · Idilio Tv: Microdramas Virales](https://play.google.com/store/apps/details?id=com.stvrae.idilio) — descargas, reseñas
- [Rio Times · Colombia app raises $5M for microdramas](https://www.riotimesonline.com/colombia-idilio-microdrama-app-5-million-seed-round-june-2026/) — MAU, países, lanzamiento

**Datos de categoría**
- [Marketing Dive · Microdrama apps stand out on mobile (Sensor Tower, State of Mobile 2026)](https://www.marketingdive.com/news/microdrama-apps-stand-out-on-mobile-heres-what-the-numbers-say/812610/) — $2.980 M, +115 %, horas
- [Adjoe · Short drama apps' hyper-growth problems](https://adjoe.io/blog/short-drama-apps-rewarded-engagement/) — retención D1/D7/D14, concentración 68,8 %, Playtime
- [Holywater Tech + Owl & Co · The State of Microdrama 2026](https://www.holywater.tech/report) — 70 % ve en la cama, 13,1 h/semana, audiencia masculina
- [Variety · Men flock to microdramas (Owl & Co study)](https://variety.com/2026/tv/news/microdramas-men-romance-sunday-holywater-my-drama-my-muse-1236819953/)
- [Business of Apps · Bite-sized bingeing](https://www.businessofapps.com/insights/bite-sized-bingeing-inside-the-explosion-of-short-drama-apps) — modelos híbridos
- [RevenueCat / Adapty · State of App Monetization 2026 (resumen)](https://chuvak-pavel.medium.com/state-of-app-monetization-2026-key-trends-from-revenuecat-and-adapty-8bdc23a4bb6f) — ARPU LatAm, suscripción semanal

**La capa latinoamericana**
- [TelevisaUnivision · ViX's microdramas premiere](https://corporate.televisaunivision.com/press/2025/07/21/microdramas/) — niveles de suscripción, estreno en redes, cadencia semanal, cita de Rafael Urbina
- [CNN en Español · De la televisión al celular: el auge de las teleseries verticales en América Latina](https://abc17news.com/cnn-spanish/2026/07/22/de-la-television-al-celular-el-auge-de-las-teleseries-verticales-en-america-latina/) — ViX, Globo, Telefe, Canal 13, TVN, César Opazo, proyección de US$26.000 M para 2030
- [PRODU · TelevisaUnivisión presenta ViX microdramas](https://www.produ.com/television/noticias/televisaunivision-presenta-vix-micro-contenido-corto-y-serializado-para-consumo-movil/)
- [Stream TV Insider · A look at TelevisaUnivision's foray into microdramas](https://www.streamtvinsider.com/content/look-televisaunivisions-foray-microdramas-vix)

**Mecánicas de la categoría**
- [Unstar · ReelShort vs DramaBox: 5 short drama apps ranked 2026](https://unstar.app/blog/reelshort-dramabox-shortmax-goodshort-flextv-short-drama-apps-ranked-2026)
- [Unstar · Is DramaBox legit & safe? What reviews say](https://unstar.app/blog/is-dramabox-legit-safe-short-drama-app-reviews-2026) — caducidad de monedas, doble monetización, reembolsos
- [ReelShort Fandom · How to earn free coins](https://www.reelshort.com/fandom/how-to-earn-free-coins-on-reelshort-01-25-3faa2218/) — check-in de 7 días con reset, rewards center, caducidad de monedas bonus 7–30 días
- [Google Play · FlexTV](https://play.google.com/store/apps/details?id=com.aytech.flextv) y [Google Play · NetShort](https://play.google.com/store/apps/details?id=com.netshort.abroad) — check-in y quejas de usuarios
- [Kanopy Labs · How to build a short-form drama streaming app like ReelShort](https://kanopylabs.com/blog/how-to-build-a-short-form-drama-streaming-app) — push de continuidad, check-in escalonado y su efecto declarado sobre D7/D30
- [Filmustage · ReelShort vs DramaBox 2026](https://filmustage.com/blog/short-drama-apps-compared-reelshort-vs-dramabox-in-2026/) — episodios gratis diarios
- [QWE · DramaBox guide: coins vs subscription](https://www.qwe.edu.pl/tutorial/dramabox-guide-coins-vs-subscription/) — 15 ads/día
- [kr-asia · ByteDance takes short dramas global with Melolo](https://kr-asia.com/bytedance-takes-short-dramas-global-with-melolo-launch)
- [Vodlix · Top short drama platforms and how they monetize in 2026](https://vodlix.com/blog/top-short-drama-platforms-and-how-they-monetize) — corte gratis-a-pago

**Hongguo (ByteDance, China)**
- [FoxData · Inside the meteoric rise of Hongguo Short Drama](https://foxdata.com/en/blogs/bytedances-next-global-hit-after-tiktok-inside-the-meteoric-rise-of-hongguo-short-drama-app/) — modelo gratuito, monedas de oro, integración con Douyin
- [Baidu Baike · 红果短剧](https://baike.baidu.com/en/item/Hongguo%20Short%20Drama/12377) — MAU, 1,38 h/día, "regístrate 7 días y retira"
- [北京商报 · 红果短剧收费VIP：de "olvidado" a "tema candente"](https://www.bbtnews.com.cn/2026/0505/592581.shtml) y [17173 · Respuesta oficial de Hongguo al VIP de pago](https://news.17173.com/content/05032026/200254425.shtml) — la crisis de mayo-2026 y la cita sobre reescribir las reglas

**Precedentes de "espera y es gratis"**
- [Wikipedia · Piccoma](https://en.wikipedia.org/wiki/Piccoma) y [Design Compass · Kakao's global entertainment strategy](https://designcompass.org/en/2025/08/27/kakaos-global-entertainment-strategy/) — ¥105.000 M, cuota japonesa
- [The Asia Business Daily · "Wait-for-free" model falls short in France](https://view.asiae.co.kr/en/article/2026032510533909792) — el fracaso francés y el ángulo regulatorio
- [Kcomicsbeat · Kakao to sunset European Piccoma operation](https://kcomicsbeat.com/2024/05/15/kakao-piccoma-to-shutter-french-webtoon-app-operations-in-europe/)
- [Comics Beat · WEBTOON removes Daily Pass](https://www.comicsbeat.com/no-youre-not-losing-it-webtoon-got-rid-of-daily-pass-2/) *(ya citado en §3.4bis)*
- [GeekWire · Amazon to shut down Kindle Vella](https://www.geekwire.com/2024/amazon-to-shut-down-kindle-vella-serial-book-platform-saying-it-hasnt-caught-on-as-wed-hoped/)
- [GrowthX · Pocket FM monetization](https://growthx.club/proof-of-work/entertainment/pocketfm/monetization-project-----pocket-fm%7C67a75ae05c7c7bf7f3bee13b) y [Value for Startups · Pocket FM investor report 2026](https://valueforstartups.in/pocketfm) — 85 % micropagos, RFM
- [Wattpad Help · Earning coins with videos and bonus coins](https://support.wattpad.com/hc/en-us/articles/360034232392-Earning-Coins-with-Videos-Offers-and-Bonus-Coins-Frequently-Asked-Questions) — caducidad a 30 días

**Rachas fuera de la categoría**
- [Apptitude · How Duolingo's streak mechanic actually works](https://apptitude.io/blog/how-duolingos-streak-mechanic-actually-works/) — metas altas → menos racha
- [EngageFabric · Building a Duolingo-style streak system](https://engagefabric.com/blog/building-duolingo-style-streak-system) — day start configurable, husos horarios
- [Snap Newsroom · Keep the streak with Restore](https://newsroom.snap.com/keep-the-streak-with-restore) y [TBIJ · What Snapchat knew about addicted users](https://www.thebureauinvestigates.com/stories/2025-12-03/snapchat-ignored-staff-warnings-about-teens-mental-health)

**Regulación**
- [Comisión Europea · TikTok commits to permanently withdraw TikTok Lite Rewards](https://digital-strategy.ec.europa.eu/en/news/tiktok-commits-permanently-withdraw-tiktok-lite-rewards-programme-eu-comply-digital-services-act)
- [Global Times · China releases draft regulation on micro-drama development (NRTA, jun-2026)](https://www.globaltimes.cn/page/202606/1364363.shtml)

**Los grandes**
- [TechCrunch · Netflix wants you to watch 'Clips'](https://techcrunch.com/2026/04/30/netflix-wants-you-to-watch-clips-its-tiktok-like-vertical-video-feed/)
- [What's on Netflix · Netflix Star Daily Trivia](https://www.whats-on-netflix.com/news/netflix-games/netflix-star-daily-trivia-game-released/) — racha como eje
