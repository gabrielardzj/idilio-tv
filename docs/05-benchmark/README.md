# Anexo · Benchmark competitivo

*Benchmark: mirar qué hicieron los demás con el mismo problema, para no estrenar errores ya cometidos.*

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
| **Escala (jun-2026)** | 1,3–1,5 M descargas · **cientos de miles de MAU** · 120 países |
| **Financiación** | **US$5 M seed**, anunciada en el Vertical Video Summit (LA, jun-2026) |
| **Inversores** | **a16z Speedrun** (lead), Goodwater Capital, **David Vélez** (fundador de Nubank, a título personal), **WndrCo** (el fondo de Jeffrey Katzenberg) |
| **Contenido** | Microdramas verticales originales en español, capítulos de ~90 s. Acuerdo con GammaTime por cinco producciones en 2026. *Chamado na Madrugada* **ganó** Mejor Serie de Ficción Vertical en la 42ª edición de los Premios India Catalina (Cartagena, 18-abr-2026, en el marco del FICCI) |
| **Posición** | Se declara la app #1 de microdramas de Latinoamérica |

**Un detalle de catálogo que el diagnóstico no tenía.** En esa categoría Idilio colocó **tres de los
seis títulos prenominados** —*Chamado na Madrugada*, *Dulce Destino* y *Pasión a Domicilio*—, dos de
los cuatro finalistas, y se llevó el premio. Y esas dos que llegaron a la instancia final son, según
el censo, **series enteramente gratis**: dos de las nueve que no tienen muro. La muestra gratuita
de la app incluye su original premiado. Es una decisión de catálogo deliberada, no un descuido, y conviene
leerla así cuando se discuta qué se regala.

**El dato que cambia el diagnóstico.** La ficha de App Store del build 1.20.0 lista las compras
in-app reales:

| Producto | Precio |
|---|---|
| Promo 180 monedas | **$ 1.900 – $ 2.900 COP** |
| Packs de 75 a 1.500 monedas | **$ 4.900 – $ 59.900 COP** |
| **Pase semanal** | **$ 12.500 COP / semana** |
| **Pase mensual** | **$ 24.500 COP / mes** · *«Ahorra 55%»* |

Es decir: **Idilio ya es un modelo híbrido — suscripción + monedas —, no solo monedas.**
El muro real —capturado dentro de la app con storefront de Colombia— **sí ofrece la suscripción**:
la encabeza, con los dos planes y el mensual marcado *RECOMENDADO*. Así que la falla no es de
ubicación. Es de orden: lo más caro va arriba y la salida gratuita queda en la tarjeta de abajo.

Y hay un segundo problema, de precio, que no hace falta salir del catálogo para verlo — y va en
la dirección contraria a la que este anexo sostuvo mientras leyó los precios de la ficha en
dólares. Con las cifras reales en pesos, **la suscripción es el mejor negocio de la pantalla**:
terminar la serie mediana comprando monedas —600, al peldaño regular de $ 540 el episodio— sale
unos **$ 21.000**, y el **mensual abre el catálogo entero por $ 24.500**. Una sola serie cuesta
casi lo mismo que un mes de todo, y el semanal ($ 12.500) sale por la mitad de lo que cuesta
terminar una. El desajuste no está en la suscripción: está en la escalera de monedas, que cobra
por una serie lo que la suscripción cobra por todas.

Con una salvedad que conviene decir, porque es la diferencia entre un argumento y un eslogan: **el
muro no publica ese precio en ninguna parte.** Publica paquetes. Las 600 monedas hay que armarlas
—y las conversiones de arriba son mías, no del producto—. Lo que sí es cierto sin ninguna cuenta
es que la comparación está al alcance del usuario, en la única pantalla donde está mirando
precios, y que ninguna forma de armarla favorece al pase semanal. No es un problema de cadencia —en Latinoamérica el plan semanal se lleva el **29 % de los
ingresos de suscripción de la región**, según RevenueCat—: es un problema del número.

*El $6,63 no es un precio: es una conversión, y por eso va siempre con la tasa que la produce. Al escalón más barato de la escalera la misma serie sale ≈ $7,92, y ahí el empate con el pase semanal es técnico. Y el 29 % es la proporción de Latinoamérica, no un ranking de regiones: la ficha del reporte, en §5.7, no trae ese ranking.*

*(Nota: la ficha registra 4.9★ con 36 valoraciones en App Store US; el dogfooding había medido
4.7★ / 28 K en Google Play. Son tiendas y bases distintas; ambos números son correctos, y ambos se
mueven semana a semana. La cifra de MAU es la que menos firme está: Rio Times habla de "unos pocos
cientos de miles de usuarios activos mensuales", sin dar un número.)*

---

## 5.2 · La escala de la categoría: el problema de Idilio es el problema de todos

Antes de comparar mecánicas, hay que fijar la vara. La retención de la categoría de short drama
(12 meses a abril-2026), tal como la publica **Adjoe**:

| | Categoría global | China | DramaBox |
|---|---|---|---|
| **D1** *(vuelven al día siguiente)* | 26,9 % | 28,8 % | 27,5 % |
| **D7** *(siguen a la semana)* | 8,6 % | 11,5 % | 7,8 % |
| **D14** *(a las dos semanas)* | 5,6 % | 6,8 % | 5,0 % |

*La única fuente de estos tres números es el blog de Adjoe (§5.7) — Sensor Tower, que aparece más
abajo, es la fuente de los ingresos de la categoría, no de la retención. Importa porque Adjoe no es
un tercero neutral: vende engagement recompensado (uso a cambio de premios) a estas mismas apps. La
tabla vale como orden de magnitud del sector, no como medición independiente, y toda esta sección se
apoya en ella. Queda anotado también en [§5.6](#56--lo-que-no-pude-verificar).*

**Esto reencuadra el diagnóstico.** Un DAU/MAU de 0,33 no es una anomalía de Idilio: es el techo
de una categoría donde **el 94 % de los usuarios no llega al día 14**. La categoría entera está
construida sobre adquisición pagada y extracción rápida, no sobre hábito.

Dos lecturas se siguen de ahí, y las dos importan:

1. **La intervención no está corrigiendo un defecto de Idilio. Está atacando el techo de la
   categoría.** Eso sube el valor estratégico de acertar y baja la probabilidad de acertar rápido:
   nadie en el sector lo tiene resuelto.
2. **La barra de éxito debe ser relativa, no absoluta.** Prometer "D30 —los que siguen a los 30 días— al doble" es prometer contra
   una física que ningún competidor venció. Prometer "mover D7 de 8,6 % a 11 %" es una apuesta
   defendible y medible.

Contexto de mercado, para dimensionar el premio:

- Los ingresos in-app de la categoría fueron **$2.980 M en 2025, +115 % interanual** (Sensor Tower,
  *State of Mobile 2026*). Conviene decir en qué eje: **por ritmo de crecimiento es la segunda
  categoría del año**, detrás de IA (+254 %) y delante de redes sociales (+17 %); **por ingresos
  absolutos es la tercera**, detrás de redes ($12.900 M) e IA ($4.330 M). Los dos ejes suelen
  citarse mezclados y dan lecturas distintas.
- H1-2026: **1.450 M de descargas, +95,5 %** — el dato es del *Global Non-Gaming App Trends Report*
  de **Mintegral con Insightrackr**, no de Sensor Tower.
- **Los cinco primeros concentran el 68,8 % de los ingresos.** Es un mercado de ganador-se-lleva-casi-todo.
- **El 57,6 % de la categoría ya opera con monetización híbrida** (suscripción + microtransacción +
  ads), también de Mintegral/Insightrackr.
- Latinoamérica, según RevenueCat: **el mayor crecimiento mediano de MRR de cualquier geografía
  (17,2 %)**, un ingreso por instalación de los más bajos del mundo (**~$0,10 a D14**, agrupada con
  MEA y resto del mundo) y una preferencia marcada por el plan **semanal, que se lleva el 29 % de
  los ingresos de suscripción de la región**. Mercado barato, acelerando, y acostumbrado a
  comprometerse de a poco.

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
| **Kalos TV** | Sección "Rewards" —recompensas— con tareas; hay reportes de que el check-in falla |

**Lo que esto confirma:** la racha rota de Idilio no es un error de Idilio, es un calco del
estándar. Y el estándar está calibrado para un usuario de 7 días/semana que, según los datos de
retención de §5.2, prácticamente no existe en ninguna de estas apps.

### Familia 2 · Anuncios recompensados con tope diario

**DramaBox** (15 ads/día × 2 monedas), **ShortMax** (6 ads/día × 25), **ReelShort** (15–20 ads
≈ 250 monedas/día), **Wattpad** (3–10/día), **Melolo** (progresión directamente gateada por ads).
Es la fuente gratuita dominante de la categoría. Su costo está documentado en las reseñas:
*"los anuncios duran más que el episodio que desbloquean"*.

*Aviso de procedencia:* el tope de DramaBox —**15 anuncios diarios ≈ 30 monedas**— es el dato peor
sostenido de esta sección. Sale de un blog de tutoriales que a su vez cita la guía de una VPN: es
de tercera mano. Lo dejo porque es lo mejor disponible y porque ninguna de estas apps publica sus
topes, no porque esté confirmado.

### Familia 3 · Tareas rotativas ("rewards center")

Las fuentes secundarias describen a **ReelShort** rotando micro-encargos: ver episodios, compartir
en redes, **activar notificaciones push** (los avisos que llegan al teléfono), invitar amigos. Sería la familia más flexible y la que
más se parece a un metajuego real, porque el diseñador elige qué conducta premiar cada semana.

El detalle que importaría es que una de las tareas premiadas fuera **activar las notificaciones**:
de ser así, la categoría entera sabría que su motor de retorno no es la racha, es el push.

> **Hasta dónde llega la evidencia.** Fui a la fuente de primera mano —la propia ReelShort, en su
> página de cómo conseguir monedas gratis— y sostiene dos cosas de este apartado con sus palabras:
> los 15–20 anuncios diarios por unas 250 monedas, y que *"si te salteás un solo día, tu racha
> vuelve al día uno y te perdés las recompensas de los niveles altos"*. Eso último vale doble,
> porque viene del operador y no de un tercero.
> Lo que **no** dice esa página es que exista un *rewards center* con tareas rotativas ni que
> activar las notificaciones sea una de las premiadas. Lo dejo escrito porque de esa observación
> cuelga la frase sobre el push que se repite en la estrategia (§2.5) y en la intervención (§3.6),
> y conviene que se lea como lo que es: una inferencia razonable sobre el diseño de la categoría,
> no un hecho documentado.

### Familia 4 · Ver = ganar dinero (el extremo, y funciona)

**Hongguo Short Drama** (ByteDance, China) es el caso más grande del mundo y no aparece en
ninguna comparativa occidental: **304 M de MAU en febrero de 2026** (QuestMobile), #1 en
Entretenimiento del App Store chino, y **unos 125 minutos diarios por usuario** — más que iQIYI.
Las fichas enciclopédicas todavía repiten **1,38 h/día**, pero ese número es de marzo de 2024 y el
de usuarios es de febrero de 2026: entre los dos hay **casi dos años**, y la misma ficha mezcla
además un MAU de marzo de 2025 (173 M) sin decir que no es contemporáneo de nada de lo anterior.
Puestos en la misma frase, describen una app que nunca existió así. Su modelo es el opuesto exacto
al de Idilio:

- **Todo gratis, financiado por publicidad.** No hay muro de monedas.
- El usuario **gana monedas de oro viendo** y las **convierte en dinero real** ("regístrate 7
  días y retira hasta ¥4,79").
- Onboarding —la entrada del usuario nuevo— con credenciales de Douyin, lo que le abarata la adquisición.

Es el mismo mecanismo de "tarea → recompensa por tiempo de pantalla" que la Comisión Europea
**prohibió permanentemente** en TikTok Lite (§5.4, D5). Opera a escala de esos **304 M de MAU** en
una jurisdicción donde eso es legal. **La mecánica más eficaz de la categoría es, literalmente,
la que no se puede exportar a Europa.**

Y trae de regalo el mejor caso de estudio de la categoría sobre **cambiar las reglas de la
economía**, que es exactamente lo que esta intervención propone hacer. En mayo de 2026 los
usuarios descubrieron que una película exigía VIP de pago (¥8/semana, ¥30/mes, ¥260/año) y el
tema estalló en Weibo. Hongguo respondió, con razón, que **el VIP existía desde el lanzamiento
en agosto de 2023** y que solo cubría el mínimo contenido que exigían ciertos titulares de
derechos. No sirvió de nada: la lectura pública fue que *"el personaje de gratis se derrumbó"*.
El análisis de prensa lo resume con precisión:

> El desafío real de Hongguo no es si cobrar, sino **cómo lograr que el usuario perciba y acepte
> el cobro. No es un problema de precio: es un problema de reescritura de reglas.**

A eso se suma, en febrero de 2026, que a numerosos usuarios en el exterior **se les pusieron en
cero las monedas acumuladas y el saldo retirable, sin aviso y sin historial**. Es el mismo
material del que están hechas las quejas por caducidad de monedas en DramaBox y ReelShort.

### Familia 5 · Programación y eventos (hábito sin gamificación)

La familia menos explorada y la más interesante para Idilio, porque **no requiere economía**:

- **ViX Micro** declara **cadencia semanal**: estreno cada viernes desde el 25-jul-2025. Es el
  ejemplo más sólido de la familia, porque sale del comunicado oficial de TelevisaUnivisión y no
  de una reseña. Convierte el estreno en cita sin tocar la economía.
- **GoodShort** publica decenas de episodios nuevos **cada día** para que siempre haya movimiento
  en el catálogo. **Sin fuente que lo sostenga:** no está en la que lo citaba, así que va acá
  como descripción, no como caso.
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
no está construyendo. La escala del formato confirma que la pelea vale: **US$26.000 M anuales para
2030** —una proyección de Variety, vía CNN en Español, que es la nota que la reproduce y la que
está en §5.7—, y una serie completa se produce en una semana y se explota durante un mes.

*(Acá la proyección colgaba de Variety a secas mientras la lista de fuentes la tenía bajo CNN: el
cuerpo y §5.7 se atribuían la misma cifra a dos medios distintos. Es de Variety, y llegué a ella
por CNN; se dice así.)*

---

## 5.4 · Los seis desafíos, y cómo los resolvió cada quien

### D1 · La mecánica de "espera y es gratis" funciona o fracasa según el contenido, no según el diseño

Es el hallazgo más importante para esta intervención, porque **la misma mecánica produjo el mayor
éxito y los dos fracasos más citados**.

| | Piccoma Japón | Webtoon Daily Pass | Piccoma Francia |
|---|---|---|---|
| Resultado | **¥105.000 M** transaccionados en 2023, #1 | Retirado 2025 | Cerrada 2024 |
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

- **Duolingo** midió el problema y publicó el número: **casi el 40 % de los learners que entraban
  dos días seguidos y aun así no tenían racha eran los que se habían puesto la meta diaria más alta
  ("intense")**. La meta ambiciosa no producía racha: producía abandono de la racha. Duolingo
  entonces **separó la racha de la meta diaria** —una lección corta ya cuenta— y eso **subió más de
  un 40 % la cantidad de learners con rachas de 7+ días**; un año después, **algo más de la mitad**
  de sus learners diarios sostenía 7+ días, contra **un tercio** antes. Bajar la barra sube la
  racha, y está medido. Además dejan al usuario **configurar la hora de inicio de su día** —el
  rollover no es medianoche por decreto— y venden el *streak freeze* (el congelador de racha: un día libre que no la rompe) como red de seguridad, no
  como castigo.
- **Snapchat** monetiza el rescate, y el detalle importa para el diseño: **el primer Streak Restore
  es gratis y cada uno adicional cuesta 99 centavos** en Estados Unidos (el precio varía por país);
  los suscriptores de Snapchat+ además reciben varios y pueden **congelar** la racha. Lo que se
  cobra, entonces, no es el perdón: es la reincidencia. Pero es también el caso de advertencia: una
  investigación del Bureau of Investigative Journalism documentó que **el propio personal de
  Snapchat advirtió internamente del efecto de estas mecánicas sobre la salud mental de los
  adolescentes y la empresa siguió adelante**. *(La cifra de ingresos por rescates que circula en
  los resúmenes de industria no la pude sostener con ninguna fuente; queda fuera de este anexo.)*

**Lo que valida el diseño actual:** la noche que cierra a las 5 a.m. es la versión de Idilio del
"day start" configurable de Duolingo — la diferencia es que aquí no se le pide al usuario que lo
configure, se infiere del comportamiento (54 % de sesiones entre 11 p.m. y 2 a.m.). Y hay evidencia
externa apuntando en la misma dirección: el **70 % de los espectadores de MyDrama** —la app de
Holywater— dice ver **en la cama antes de dormir**, sobre una encuesta a **2.737 usuarios de
MyDrama, publicada en julio de 2026**. Es una sola app, no la categoría entera; con esa reserva,
confirma que la unidad correcta es la noche.

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
- **China, 2026: ya no es un borrador.** La NRTA publicó a consulta las *Medidas para el desarrollo
  de microdramas* el 24-jun-2026 y las **aprobó el 27 de julio** (orden n.º 16); **entran en vigor
  el 1 de septiembre de 2026**, seis días después de la fecha del censo con el que cierra este
  entregable (26-ago-2026). El regulador chino entró a normar el formato entero —clasificación de contenidos, revisión, aprobación de la
  distribución— y de paso tocó la economía: el **artículo 37 prohíbe "usar modelos algorítmicos que
  induzcan al usuario a la adicción o al consumo excesivo"**, y el **artículo 40 obliga a quien
  ofrezca contenido de pago a "informar con claridad la información relativa al cobro"**. Es, casi
  literalmente, el hallazgo F2 convertido en obligación legal en el mercado más grande de la
  categoría.

Idilio opera en 120 países, España incluida. La distinción que salva el diseño es fina pero
sustantiva: **TikTok premiaba tiempo de pantalla; el Pase de la Noche premia terminar un
episodio.** Uno recompensa la permanencia, el otro la finalización de una unidad narrativa —y
tiene techo duro: **se emite un pase por noche y no más de 7 por semana**, sin anuncios que lo
levanten ni forma de comprar más. Que la entrega ocurra al ver no afloja ese techo: lo que el
usuario puede recibir lo fija el reloj, no cuánto tiempo pase en la app. Vale la pena que esa distinción esté escrita en el
documento de producto **antes** de que la pregunte alguien de fuera. La misma lógica refuerza
F2: declarar el precio en episodios en vez de en monedas desnudas no es solo mejor UX, es alinearse
con la dirección en que se mueve la regulación — la obligación de informar el cobro con claridad.

### D6 · Dónde se pone el muro es la decisión de producto más cara de la categoría

El consenso del sector: **10 episodios gratis, a veces hasta 20**, y el muro justo después de un
cliffhanger, cuando el compromiso emocional ya está hecho. La formulación que más se repite en
los análisis: *"el corte gratis-a-pago es la única palanca que importa más que ninguna otra:
demasiado pronto y espantas al casual, demasiado tarde y regalas tus episodios más monetizables"*.

Idilio está exactamente en la moda de la categoría (10). Lo que el diagnóstico añadió y el
benchmark no contradice es que **el problema no es dónde está el muro por serie, sino cuántas
series hay detrás**: 500 episodios gratis repartidos en 50 títulos convierten el muro en un
desvío, no en una decisión. Ninguna de las fuentes revisadas analiza el muro a nivel de catálogo.
Eso sigue siendo original de este diagnóstico.

---

## 5.5 · Qué se lleva la intervención

**Se refuerza:**

| Decisión del diseño | Evidencia externa que la sostiene |
|---|---|
| Contar noches, no días | El **70 % de los espectadores de MyDrama** ve **en la cama antes de dormir** — encuesta de Holywater/Owl & Co a 2.737 usuarios de MyDrama, publicada en julio de 2026. Una sola app, pero medida |
| Rollover a las 5 a.m., no a medianoche | Duolingo permite configurar el "day start" precisamente por esto |
| Bajar la barra: la racha se acredita al **terminar un episodio** | Duolingo: casi el **40 %** de quienes entraban dos días seguidos sin racha tenía la meta diaria más alta. Separar racha y meta subió **+40 %** las rachas de 7+ días |
| El comodín que se consume solo | El *streak freeze* como red de seguridad, no como castigo |
| Pases que se acumulan hasta 2 | La queja documentada contra el Daily Pass fue que **convertía leer en una tarea diaria** —§5.4, D1—, y un recurso que caduca cada 24 h es justamente lo que obliga a aparecer todos los días. El tope de 2 rompe esa obligación sin permitir acumular la semana entera |
| Declarar todo en episodios | El artículo 40 de las Medidas de la NRTA china —en vigor desde el 1-sep-2026— obliga a informar el cobro con claridad; el 37 prohíbe los algoritmos que inducen al consumo excesivo |
| Que el pase sea **aditivo** (abre el ep. 11+), no restrictivo | Es la diferencia exacta entre Piccoma Japón y Webtoon Daily Pass |

**Se corrige o se añade:**

1. **El muro ya ofrece la suscripción, y ese no era el problema.** Este anexo dio por hecho que no
   la mostraba, leyendo la captura de la ficha de tienda. El muro real la encabeza. Lo que entra en
   el diagnóstico como falla es el **orden**: lo más caro primero y la salida gratuita —el anuncio
   recompensado, diez episodios diarios— en la tarjeta más apagada, con su valor escrito `0/10`.
2. **La escalera de monedas está mal calibrada contra la propia suscripción.** Terminar la serie
   mediana comprando sus episodios sale ≈ $ 21.000; el mensual abre el catálogo entero por
   $ 24.500. Comprar una serie cuesta casi lo mismo que un mes de todo, y las dos ofertas están en
   la misma pantalla. No es materia de esta intervención, pero es un hallazgo de pricing que el
   equipo debería mirar.
3. **La barra de éxito baja y se vuelve relativa.** Con D7 de categoría en 8,6 %, la promesa
   honesta es mover D7 unos puntos, no duplicar D30. Nadie en el sector lo ha logrado.
4. **Hay que escribir la distinción anti-DSA.** Una línea en el documento de producto: se premia
   la finalización de una unidad narrativa, no el tiempo de pantalla; con techo duro y sin venta
   de rescates.
5. **No monetizar el comodín.** Snapchat probó que se puede cobrar el rescate —99 centavos a partir
   del segundo—; del otro lado del mostrador, lo que hay documentado es que **su propio personal
   advirtió internamente** por el efecto de estas mecánicas sobre la salud mental adolescente y la
   empresa siguió adelante (TBIJ, §5.7).
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
9. **La programación es la palanca gratuita que nadie en LatAm está usando.** La cadencia semanal
   declarada de ViX Micro —estreno cada viernes, y está en su comunicado oficial— y el push de
   continuidad de toda la categoría producen hábito sin tocar la economía. Es más barato que
   cualquier rediseño del muro y es complementario a la intervención. *(Acá citaba también los
   "binge-hours" de ShortMax; los saqué porque no los pude verificar — §5.3, Familia 5.)*

---

## 5.6 · Lo que no pude verificar

- **La retención propia de Idilio** contra los benchmarks de categoría. Los números de
  categoría son públicos; los de Idilio, no. La comparación de §5.2 es indicativa.
- **Si el pase semanal/mensual aparece en algún punto del flujo nativo.** La ficha de App Store
  lo lista como IAP; el muro del build 1.20.0 no lo mostró en el dogfooding. Puede estar en otra
  superficie que no recorrí.
- **Los números de Adjoe Playtime** (16,3 vs 5,0 días de retorno) vienen del proveedor del
  producto. Los cito como reclamo comercial, no como dato independiente. **Y la tabla D1/D7/D14
  de §5.2 sale del mismo blog**, aunque el cuerpo la atribuía a Sensor Tower hasta esta pasada:
  es la fuente más cargada de todo el anexo sosteniendo su sección más citada.
- ~~**La mecánica exacta de "retos" y video recompensado dentro de Idilio.**~~ **Ya no es una
  incógnita: está medida.** La pestaña Recompensas da **15 monedas por anuncio con tope de 10
  diarios** —hasta 10 episodios gratis por día—, una racha diaria de 7 escalones que paga 450
  monedas la semana completa y 90 en tareas
  sociales de una sola vez. Capturas en el [registro de dogfooding](../00-dogfooding/#las-cuatro-fuentes-gratuitas-de-monedas).
  Con eso, Idilio deja de ser el caso sin anuncios de la comparación de §5.3 y pasa a estar en el
  centro del estándar de la categoría.
- **Ninguna app de series verticales con un pase gratuito diario asignable por serie.**
  Amplié la búsqueda a las trece apps que nombra §5.3 y la conclusión se sostiene: la categoría usa
  check-in, anuncios, tareas rotativas, ver-para-ganar y programación —las cinco familias del
  censo— pero **ninguna usa espera**. Lo más cercano es el "episodio gratis diario" que reparten
  DramaBox, ReelShort y ShortMax, pero es una asignación que hace el sistema, no un recurso que el
  usuario dirige. La espera vive en el
  vecindario de al lado (Piccoma, Pocket FM), no en este. Es a la vez la oportunidad y el motivo
  de que no haya precedente directo que lo respalde.
- **Si ViX Micro tiene alguna mecánica de hábito propia dentro de la app.** Verifiqué su modelo de
  distribución y monetización, no su capa de retención. Es la verificación que más falta hace.
- **Las cifras de Hongguo.** El 304 M de MAU es de QuestMobile (feb-2026) y está replicado en
  prensa china; el resto del perfil de uso sale de fichas y análisis de terceros, con fechas
  distintas y sin auditar. Ninguna de las dos cosas es un reporte financiero.
- **Los "binge-hours" de ShortMax.** No están en la fuente que los citaba, ni en su ficha de
  App Store, ni en la de Google Play, ni aparecen por búsqueda directa. Los saqué de §5.3 y de la
  recomendación 9. Era el ejemplo más vistoso de la Familia 5, y por eso mismo había que
  verificarlo.
- **Las "decenas de episodios nuevos cada día" de GoodShort.** Tampoco están en la fuente que las
  citaba. Quedan en §5.3 marcadas como lo que son, porque la Familia 5 se sostiene con los otros
  dos casos y borrarlas ocultaría que la lista tiene tres viñetas y dos casos verificados.
- **El *rewards center* de ReelShort con tareas rotativas**, y en particular que activar las
  notificaciones sea una de las premiadas. La página de primera mano de ReelShort no lo menciona
  —sí menciona, con sus palabras, que fallar un día devuelve la racha al día 1, y los 15–20
  anuncios diarios—. Queda marcado en §5.3 como inferencia, no como hecho, porque de ahí cuelga la
  frase sobre el push que se repite en §2.5 y §3.6.
- **Buena parte del detalle operativo de la Familia 1 y la Familia 2** (las ~165 monedas semanales
  de ReelShort, la caducidad de las monedas bonus, los topes diarios de ShortMax). La fuente que
  los agrupaba no los contiene; quedan porque son el mejor dato disponible, marcados como lo que
  son. Lo único de ese bloque que sí tiene fuente de primera mano es el reset de la racha.
- **Los ingresos de Snapchat por restaurar rachas.** La cifra de $4,2 M que circula en resúmenes de
  industria no aparece en el newsroom de Snap ni en ninguna fuente que haya podido abrir. La saqué
  del anexo. El precio (99 centavos a partir del segundo rescate) sí está en el soporte de Snapchat
  y se queda.
- **El ARPU (ingreso promedio por usuario) de apps en Latinoamérica.** El $11,30 mensual que circula para esta métrica no está en el *State of Subscription Apps 2026* de RevenueCat, y la única fuente que lo
  publica es un resumen de tercero que no abre. El anexo usa en su lugar lo que el reporte sí trae
  (MRR mediano +17,2 %, ~$0,10 de ingreso por instalación a D14, 29 % de ingresos en plan semanal),
  que es lo que sostiene el argumento de precio de §5.1.
- **El tope de anuncios de DramaBox** (15/día × 2 monedas). La cadena de fuentes es de tercera mano:
  un blog de tutoriales que cita la guía de una VPN. Ninguna app de la categoría publica sus topes,
  así que lo dejo señalado en §5.3 en vez de borrarlo.

---

## 5.7 · Fuentes

> **Cómo leer esta lista.** No todas las fuentes pesan lo mismo y conviene saber cuál se está
> pisando. Cada entrada de abajo cae en uno de estos cuatro niveles, sin excepción:
>
> **Nivel 1 — quien hizo, midió o reguló la cosa, hablando de ella.** NRTA, Comisión Europea,
> QuestMobile, RevenueCat, Sensor Tower (vía Marketing Dive), Mintegral/Insightrackr (vía Advanced
> Television y MARKETECH APAC), el comunicado de TelevisaUnivisión, el de Premios India Catalina,
> el de Holywater/Owl & Co en GlobeNewswire —y la landing de su reporte, que pide formulario y no
> publica los datos—, el blog de producto de Duolingo, el newsroom y el centro de ayuda de
> Snapchat, la página de monedas gratis de ReelShort, el centro de ayuda de Wattpad, y las fichas
> de App Store y Google Play (Idilio, FlexTV, NetShort).
>
> **Nivel 2 — prensa reportando sobre terceros.** Variety, C21, TechCrunch, KED Global, Global
> Times, CNN en Español, Infobae, Rio Times, PRODU, Stream TV Insider, Business of Apps, The Asia
> Business Daily, 北京商报, 17173, kr-asia, Comics Beat, Kcomicsbeat, GeekWire, What's on Netflix.
> Y TBIJ, que es investigación sobre documentos internos y pesa más que el resto de esta fila.
>
> **Nivel 3 — blogs de SEO y content marketing, agregadores y material de proveedor:** unstar,
> filmustage, qwe.edu.pl, vodlix, kanopylabs, foxdata, Apptitude, EngageFabric, Design Compass,
> GrowthX, Value for Startups, 199IT (que replica la cifra de QuestMobile) y **Adjoe**, que además
> vende a esta categoría el producto que sus propios números promocionan. Sostienen datos
> operativos de apps de la competencia —topes de anuncios, escalones de check-in, caducidades— que
> ninguna de esas apps publica y que no están en ningún otro lado. No quedan descartados por eso: se usan
> para describir mecánicas, no para afirmar cifras de negocio, y cada vez que un dato del anexo se
> apoya solo en este nivel está dicho en el texto. La excepción incómoda es la tabla de retención
> de §5.2, que es una cifra de negocio y cuelga de Adjoe: está anotado ahí y en §5.6.
>
> **Nivel 4 — enciclopedias colaborativas: Wikipedia y Baidu Baike.** Las uso para hitos y fechas,
> nunca para cifras de uso. La vara es la misma para las dos: Baidu Baike mezcla un MAU de marzo
> de 2025 con un tiempo de uso de marzo de 2024, y el cierre de Piccoma Francia lo sostiene
> Wikipedia, que es el mismo tipo de fuente — solo que ese además está en Design Compass, en
> Kcomicsbeat y en The Asia Business Daily, así que no cuelga de la enciclopedia.
>
> Decir de qué nivel es cada cosa es lo que hace utilizable este anexo.

**Idilio TV**
- [C21Media · Colombia's Idilio raises US$5m](https://www.c21media.net/news/colombias-idilio-raises-us5m-to-scale-microdrama-platform/) — ronda, inversores, fundadora, GammaTime
- [App Store · idilio tv](https://apps.apple.com/us/app/idilio-tv/id6749875422) — lista de compras in-app, versión 1.20.0
- [Google Play · Idilio Tv: Microdramas Virales](https://play.google.com/store/apps/details?id=com.stvrae.idilio) — descargas, reseñas
- [Rio Times · Colombia app raises $5M for microdramas](https://www.riotimesonline.com/colombia-idilio-microdrama-app-5-million-seed-round-june-2026/) — países, lanzamiento; los MAU los da como "unos pocos cientos de miles", sin cifra
- [Infobae · Ganadores de la edición 42 de los Premios India Catalina](https://www.infobae.com/colombia/2026/04/19/edicion-42-de-los-premios-india-catalina-en-cartagena-esta-es-la-lista-completa-de-los-ganadores-2026/) — *Chamado na Madrugada* gana Mejor Serie de Ficción Vertical (Cartagena, 18-abr-2026)
- [Infobae · Nominados de la edición 42](https://www.infobae.com/colombia/2026/03/25/premios-india-catalina-2026-conozca-la-lista-completa-de-nominados-en-la-edicion-42/) — los cuatro finalistas de ficción vertical: dos son de Idilio (*Chamado na Madrugada* y *Dulce Destino*)
- [Premios India Catalina · Comunicado oficial de prenominados, edición 42](https://premiosindiacatalina.com/comunicado-oficial-prenominados-42-premios-india-catalina-de-la-industria-audiovisual/) — los seis prenominados de ficción vertical, tres de ellos de Idilio (se suma *Pasión a Domicilio*)

**Datos de categoría**
- [Marketing Dive · Microdrama apps stand out on mobile (Sensor Tower, State of Mobile 2026)](https://www.marketingdive.com/news/microdrama-apps-stand-out-on-mobile-heres-what-the-numbers-say/812610/) — $2.980 M, +115 %, y el ranking por crecimiento frente al ranking por ingresos absolutos
- [Adjoe · Short drama apps' hyper-growth problems](https://adjoe.io/blog/short-drama-apps-rewarded-engagement/) — retención D1/D7/D14, concentración 68,8 %, Playtime
- [GlobeNewswire · Holywater Tech y Owl & Co publican el primer reporte de audiencia de series verticales](https://www.globenewswire.com/news-release/2026/07/23/3332522/0/en/HOLYWATER-TECH-and-Owl-Co-Publish-First-Industry-Report-on-the-Vertical-Series-Audience.html) — **el 70 % es de espectadores de MyDrama**, sobre una encuesta a 2.737 usuarios de MyDrama, publicada en julio de 2026; 13,1 h/semana. **El comunicado no da mes de campo**
- [Variety · Men flock to microdramas (Owl & Co study)](https://variety.com/2026/tv/news/microdramas-men-romance-sunday-holywater-my-drama-my-muse-1236819953/) — la misma encuesta, en prensa de industria
- [Holywater Tech + Owl & Co · The State of Microdrama 2026](https://www.holywater.tech/report) — la landing del reporte: pide formulario, **los datos no están en la página**
- [Business of Apps · Bite-sized bingeing](https://www.businessofapps.com/insights/bite-sized-bingeing-inside-the-explosion-of-short-drama-apps) — panorama de la categoría
- [Advanced Television · Short drama app downloads surge 95,5 % (Mintegral con Insightrackr, *Global Non-Gaming App Trends*, H1-2026)](https://www.advanced-television.com/2026/08/18/report-short-drama-app-downloads-surge-95-5/) y [MARKETECH APAC · la misma cobertura](https://marketech-apac.com/short-drama-app-downloads-hits-95-5-as-active-advertisers-rise-132-globally-report/) — 1.450 M de descargas, 57,6 % con monetización híbrida
- [RevenueCat · State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps) — LatAm: MRR mediano +17,2 % (el más alto), ~$0,10 de ingreso por instalación a D14, 29 % de los ingresos de suscripción en plan semanal

**La capa latinoamericana**
- [TelevisaUnivision · ViX's microdramas premiere](https://corporate.televisaunivision.com/press/2025/07/21/microdramas/) — niveles de suscripción, estreno en redes, cadencia semanal, cita de Rafael Urbina
- [CNN en Español · De la televisión al celular: el auge de las teleseries verticales en América Latina](https://abc17news.com/cnn-spanish/2026/07/22/de-la-television-al-celular-el-auge-de-las-teleseries-verticales-en-america-latina/) — ViX, Globo, Telefe, Canal 13, TVN, César Opazo, y la proyección de US$26.000 M para 2030 que CNN atribuye a Variety: es por acá que entra al anexo
- [PRODU · TelevisaUnivisión presenta ViX microdramas](https://www.produ.com/television/noticias/televisaunivision-presenta-vix-micro-contenido-corto-y-serializado-para-consumo-movil/)
- [Stream TV Insider · A look at TelevisaUnivision's foray into microdramas](https://www.streamtvinsider.com/content/look-televisaunivisions-foray-microdramas-vix)

**Mecánicas de la categoría**
- [Unstar · ReelShort vs DramaBox: 5 short drama apps ranked 2026](https://unstar.app/blog/reelshort-dramabox-shortmax-goodshort-flextv-short-drama-apps-ranked-2026)
- [Unstar · Is DramaBox legit & safe? What reviews say](https://unstar.app/blog/is-dramabox-legit-safe-short-drama-app-reviews-2026) — caducidad de monedas, doble monetización, reembolsos
- [ReelShort Fandom · How to earn free coins](https://www.reelshort.com/fandom/how-to-earn-free-coins-on-reelshort-01-25-3faa2218/) — check-in de 7 días con reset, rewards center, caducidad de monedas bonus 7–30 días
- [Google Play · FlexTV](https://play.google.com/store/apps/details?id=com.aytech.flextv) y [Google Play · NetShort](https://play.google.com/store/apps/details?id=com.netshort.abroad) — check-in y quejas de usuarios
- [Kanopy Labs · How to build a short-form drama streaming app like ReelShort](https://kanopylabs.com/blog/how-to-build-a-short-form-drama-streaming-app) — push de continuidad, check-in escalonado y su efecto declarado sobre D7/D30
- [Filmustage · ReelShort vs DramaBox 2026](https://filmustage.com/blog/short-drama-apps-compared-reelshort-vs-dramabox-in-2026/) — episodios gratis diarios
- [QWE · DramaBox guide: coins vs subscription](https://www.qwe.edu.pl/tutorial/dramabox-guide-coins-vs-subscription/) — 15 ads/día. **Tercera mano:** es un blog de tutoriales que cita, a su vez, la guía comercial de una VPN
- [kr-asia · ByteDance takes short dramas global with Melolo](https://kr-asia.com/bytedance-takes-short-dramas-global-with-melolo-launch)
- [Vodlix · Top short drama platforms and how they monetize in 2026](https://vodlix.com/blog/top-short-drama-platforms-and-how-they-monetize) — corte gratis-a-pago

**Hongguo (ByteDance, China)**
- [FoxData · Inside the meteoric rise of Hongguo Short Drama](https://foxdata.com/en/blogs/bytedances-next-global-hit-after-tiktok-inside-the-meteoric-rise-of-hongguo-short-drama-app/) — modelo gratuito, monedas de oro, integración con Douyin
- [QuestMobile · Informe de la industria de microdramas 2026](https://www.questmobile.com.cn/research/report/2041710682848727041/) y [199IT · la cifra de febrero](https://www.199it.com/archives/1820784.html) — **304 M de MAU en feb-2026** y ~125 minutos diarios por usuario
- [Baidu Baike · 红果短剧](https://baike.baidu.com/en/item/Hongguo%20Short%20Drama/12377) — "regístrate 7 días y retira". **Ojo con las fechas:** su MAU es de marzo de 2025 (173 M) y su 1,38 h/día, de marzo de 2024. No son contemporáneos entre sí ni con la cifra de QuestMobile
- [北京商报 · 红果短剧收费VIP：de "olvidado" a "tema candente"](https://www.bbtnews.com.cn/2026/0505/592581.shtml) y [17173 · Respuesta oficial de Hongguo al VIP de pago](https://news.17173.com/content/05032026/200254425.shtml) — la crisis de mayo-2026 y la cita sobre reescribir las reglas

**Precedentes de "espera y es gratis"**
- [KED Global · Piccoma sees record transaction value in Japan](https://www.kedglobal.com/us/webtoons/newsView/ked202401220013) — **¥105.000 M transaccionados en 2023**, por primera vez sobre los ¥100.000 M desde su lanzamiento en abril de 2016, y #1 del mercado por segundo año
- [Wikipedia · Piccoma](https://en.wikipedia.org/wiki/Piccoma) y [Design Compass · Kakao's global entertainment strategy](https://designcompass.org/en/2025/08/27/kakaos-global-entertainment-strategy/) — el cierre de Francia (anunciado el 27-may-2024, efectivo el 30-sep-2024) por reducción de unidades no rentables, y la cuota japonesa
- [The Asia Business Daily · "Wait-for-free" model falls short in France](https://view.asiae.co.kr/en/article/2026032510533909792) — el fracaso francés y el ángulo regulatorio
- [Kcomicsbeat · Kakao to sunset European Piccoma operation](https://kcomicsbeat.com/2024/05/15/kakao-piccoma-to-shutter-french-webtoon-app-operations-in-europe/)
- [Comics Beat · WEBTOON removes Daily Pass](https://www.comicsbeat.com/no-youre-not-losing-it-webtoon-got-rid-of-daily-pass-2/) *(ya citado en §3.4bis)*
- [GeekWire · Amazon to shut down Kindle Vella](https://www.geekwire.com/2024/amazon-to-shut-down-kindle-vella-serial-book-platform-saying-it-hasnt-caught-on-as-wed-hoped/)
- [GrowthX · Pocket FM monetization](https://growthx.club/proof-of-work/entertainment/pocketfm/monetization-project-----pocket-fm%7C67a75ae05c7c7bf7f3bee13b) y [Value for Startups · Pocket FM investor report 2026](https://valueforstartups.in/pocketfm) — 85 % micropagos, RFM
- [Wattpad Help · Earning coins with videos and bonus coins](https://support.wattpad.com/hc/en-us/articles/360034232392-Earning-Coins-with-Videos-Offers-and-Bonus-Coins-Frequently-Asked-Questions) — caducidad a 30 días

**Rachas fuera de la categoría**
- [Duolingo Blog · Improving the streak](https://blog.duolingo.com/improving-the-streak) — **la fuente primaria**: el ~40 % con meta "intense" entre quienes entraban dos días seguidos sin racha, separar racha y meta diaria, +40 % de rachas de 7+ días, la mitad de los learners diarios un año después
- [Apptitude · How Duolingo's streak mechanic actually works](https://apptitude.io/blog/how-duolingos-streak-mechanic-actually-works/) — el "day start" configurable
- [EngageFabric · Building a Duolingo-style streak system](https://engagefabric.com/blog/building-duolingo-style-streak-system) — day start configurable, husos horarios
- [Snapchat Support · How much does it cost to restore a Streak](https://help.snapchat.com/hc/en-us/articles/13086861638676-How-much-does-it-cost-to-restore-a-Streak) — un rescate gratis por persona, 99 centavos cada uno adicional en EE. UU., precio variable por país
- [Snap Newsroom · Keep the streak with Restore](https://newsroom.snap.com/keep-the-streak-with-restore) — el anuncio de la función; **no da ni precio ni ingresos**
- [TBIJ · What Snapchat knew about addicted users](https://www.thebureauinvestigates.com/stories/2025-12-03/snapchat-ignored-staff-warnings-about-teens-mental-health) — advertencias internas del propio personal sobre adolescentes, no una declaración pública de la empresa

**Regulación**
- [Comisión Europea · TikTok commits to permanently withdraw TikTok Lite Rewards](https://digital-strategy.ec.europa.eu/en/news/tiktok-commits-permanently-withdraw-tiktok-lite-rewards-programme-eu-comply-digital-services-act)
- [NRTA · *Medidas para el desarrollo de microdramas*, texto aprobado (orden n.º 16, 27-jul-2026, en vigor el 1-sep-2026)](https://www.nrta.gov.cn/art/2026/7/31/art_113_73785.html) y [la notificación de la consulta pública (24-jun-2026)](https://www.nrta.gov.cn/art/2026/6/24/art_113_73514.html) — **la fuente primaria**: art. 37, prohibición de "modelos algorítmicos que induzcan al usuario a la adicción o al consumo excesivo"; art. 40, obligación de informar con claridad el cobro
- [Global Times · China releases draft regulation on micro-drama development (NRTA, jun-2026)](https://www.globaltimes.cn/page/202606/1364363.shtml) — la cobertura en inglés: clasificación de contenidos, revisión y aprobación de la distribución. **No cubre el articulado de cobro**

**Los grandes**
- [TechCrunch · Netflix wants you to watch 'Clips'](https://techcrunch.com/2026/04/30/netflix-wants-you-to-watch-clips-its-tiktok-like-vertical-video-feed/)
- [What's on Netflix · Netflix Star Daily Trivia](https://www.whats-on-netflix.com/news/netflix-games/netflix-star-daily-trivia-game-released/) — racha como eje
