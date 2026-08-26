# 1. Diagnóstico

> **Método.** El análisis parte del uso directo del producto —el reproductor web de idilio.tv y el build nativo 1.20.0— antes de mirar las métricas, y del censo completo de las 50 series del catálogo. Las métricas se leyeron después, y el diagnóstico surge de cruzar las dos fuentes. El registro del uso está en [`docs/00-dogfooding`](../00-dogfooding/).

## Resumen

El metajuego de Idilio no está mal diseñado: **llega en el momento equivocado**. Las monedas se regalan al abrir la app —un diálogo con un botón *Reclamar*, la primera vez que se entra cada día— y se necesitan horas después, en el reproductor, al chocar con el muro.

Ese diálogo es ineludible: le aparece a todo el mundo. Y aun así **el 81% no lo reclama**. Eso descarta la visibilidad como explicación y deja las dos que quedan: el regalo llega cuando el usuario todavía no necesita monedas, y está denominado en una unidad que el producto nunca traduce a episodios.

Debajo de esa falla hay otra mayor: **esta economía no tiene ninguna escasez.** El catálogo regala 500 episodios repartidos en 50 títulos —casi cuatro meses de consumo—, y encima de ese colchón corren fuentes recurrentes que dan **hasta 70 episodios gratis por semana** solo por ver anuncios, contra los 32 que consume el usuario promedio. El muro tiene el anuncio y la suscripción, pero los ordena al revés: abre con lo más caro y deja la salida gratuita en la tarjeta más apagada, con su valor escrito como un `0/10` gris.

Sin escasez, la moneda no significa nada y el metajuego no puede mover el regreso. Y la alternativa a pagar nunca es irse: es empezar otra serie gratis. Quien salta de historia en historia no se apega a ninguna, así que no hay ninguna serie esperándolo mañana — que es precisamente lo que mide un DAU/MAU de 0.33.

| Falla | En una línea |
|---|---|
| **F1** | Lo que resolvería el muro —la recompensa diaria, las tareas de la pestaña Recompensas, el pase semanal, el mensual— vive en otra pantalla |
| **F2** | Nada traduce monedas a episodios, así que el usuario no puede juzgar el precio |
| **F3** | Dos paquetes distintos dan **las mismas 180 monedas** —el segundo al doble de precio, uno debajo del otro— y subir al siguiente escalón mejora el valor un 3.9% |
| **F4** | La racha pide 7 días de 7 a una base que entra 2.3, y corta a medianoche en un producto que se usa de madrugada |
| **F5** | El usuario no ve su avance dentro de una serie ni su posición en el sistema |

**Consecuencia para la estrategia:** el objetivo es stickiness y no conversión, y la respuesta no es recortar los episodios gratis sino dar una razón para quedarse en una historia en vez de saltar a la siguiente.

---

Tres términos se usan a lo largo del documento:

| Término | Qué significa en este documento |
|---|---|
| **DAU/MAU** | Los usuarios que abren la app un día cualquiera, divididos por los que la abren en todo el mes. Hoy es 0.33: el usuario entra 1 de cada 3 días, es decir unos **2.3 días por semana en promedio**. Es una media, no una mediana —con una cola de usuarios muy activos, el usuario del medio entra menos que eso—, y cuenta **días**, no sesiones. |
| **Stickiness** | Que el usuario vuelva mañana. Es justamente lo que mide DAU/MAU, y es el objetivo de este ejercicio. |
| **El muro** | La pantalla de pago que aparece cuando se acaban los episodios gratis de una serie. |

---

## 1.1 Los dos hallazgos que ordenan todo lo demás

### Hallazgo 1 · Lo gratis se acaba antes que la sesión: 10 episodios contra 14

**La serie típica regala 10 episodios gratis. La sesión promedio dura 14.** Los últimos cuatro caen del otro lado del muro.

```
   una sesión promedio: 14 episodios
      ← 10 gratis →  ┃  ← 4 de pago →
   ●●●●●●●●●●        ┃  ○○○○
                     ┃
                   EL MURO
```

Y no se arregla eligiendo otra serie: **ninguna del catálogo regala 14 episodios**. El bloque gratis más largo es de 12, y las 9 series que son gratis de punta a punta tienen 10 episodios o menos en total.

Lo que la economía limita, entonces, es **cuánto se avanza dentro de una misma historia**: 10 episodios seguidos, en 37 de las 41 series con muro.

> **Límite.** El dato no sostiene que el muro sea lo que *termina la sesión*, que es una afirmación distinta y más fuerte. 14 es una media —en una sesión corta el bloque gratis sobra— y al chocar el usuario todavía tiene un catálogo entero de arranques gratis por delante. Por qué la sesión se detiene a los 14 y no a los 20, los datos disponibles no lo dicen.

Y esto es lo que el usuario encuentra en ese choque, [capturado dentro de la app](../00-dogfooding/evidencia/muro-nativo-real-1.png) con storefront de Colombia:

```
🔒 Episodio 16/56
Tu balance: 0                    Costo del episodio: 15
────────────────────────────────────────────────────────
Desbloquea TODO Idilio
  SEMANAL  $12.500 COP/sem   ·   MENSUAL  $24.500 COP/mes
                                 RECOMENDADO · Ahorra 55%
────────────────────────────────────────────────────────
Obtén monedas para desbloquear episodios
   15  Desbloquea 1 episodio        [Ver anuncio]   0/10
  180  Desbloquea 12 episodios      $2.500 COP   SUPER OFERTA 69%
  375  Desbloquea 25 episodios      $13.500 COP  −20% DTO
  725  Completa la serie            $25.500 COP  −24% DTO

  ¿Más opciones? Ir a Recompensas
```

**El muro no esconde la economía: la enseña entera.** Dice el saldo y el costo del episodio antes que ningún precio, traduce cada paquete a episodios —*«Desbloquea 12 episodios»*, no *«180 monedas»*—, ofrece la suscripción, lleva un anuncio recompensado que abre un episodio gratis y enlaza a la pestaña de Recompensas. Cualquiera de esas cosas, por separado, sería una mejora razonable que proponer. Están todas.

Lo que sí se puede leer en esta pantalla es **su orden**: abre con *«Desbloquea TODO Idilio»* —lo más caro— y la única salida gratuita queda debajo, dentro de un bloque titulado *«Obtén monedas»*, en la tarjeta más apagada de las cuatro, mientras el paquete de pago lleva borde encendido y el badge más agresivo. Y su contador, `0/10`, no dice lo que vale: son **diez episodios gratis al día**, y ahí está escrito como una fracción gris en una esquina.

> **De dónde salen estos montos.** De la app, con storefront de Colombia, no de la ficha de tienda —que publica precios en dólares y es el mismo material para todos los países—. Coinciden con lo que declara Google Play: compras dentro de la app de **$1.900 a $59.900 por elemento**.

### Hallazgo 2 · Pagar no es la única salida del muro: empezar otra serie es gratis

Este hallazgo solo aparece cuando se mide el catálogo entero.

| | |
|---|---|
| Series | 50 |
| Episodios totales | 2.230 |
| **Episodios gratis** | **500** — el 22% del catálogo |

**500 episodios gratis ÷ 14 por sesión = 36 sesiones sin gastar un centavo.**
A 2.3 días activos por semana, eso son **15 semanas: casi cuatro meses.** La cuenta asume una sesión por día activo, que es el supuesto más generoso: a 1.5 sesiones por día el colchón baja a unas 10 semanas, y sigue siendo más de dos meses sin motivo para pagar.

De ahí sale el hallazgo: **el muro no saca al usuario de la app, lo saca de la historia.** La alternativa gratis existe, está a un toque y tiene 500 episodios.

> **Hipótesis derivada, no confirmada.** La sesión promedio podría descomponerse en **14 = 10 + 4**: terminar los 10 gratis de una serie, chocar con el muro y empezar otra. Encaja con todo lo anterior, y eso no la demuestra — una media no se descompone, y una sesión que arranca en el episodio 11 de anoche no choca con ningún muro a los 10.
>
> **Cómo se resuelve:** con una consulta, no con un estudio. La *distribución* de episodios por sesión, y qué fracción de las sesiones termina exactamente en el último episodio gratis de una serie.
>
> **Qué cambia si es falsa:** el tamaño del efecto, no la intervención. [§3.1](../03-diseno/#31-por-qué-esta-intervención-y-no-otra) se apoya en que el corte por precio existe, se descomponga o no el 14. Si el muro corta sesiones y no solo historias, el mismo pase recupera bastante más.

Eso cambia el significado de casi todas las demás señales:

| Señal | Lectura sin el censo | Lectura con el catálogo a la vista |
|---|---|---|
| Sesión de 22 min / 14 eps | Buen engagement (que la gente usa mucho la app) | Al menos una serie agotada — y, si la hipótesis de arriba se sostiene, otra recién empezada |
| 23% vuelve a ver series que ya terminó | Aman el contenido | Ya vieron lo que era gratis y no tienen a dónde ir |
| DAU/MAU 0.33 | Les falta hábito | **Ninguna historia en particular los está esperando** |
| 19% reclama la recompensa diaria | El diálogo de recompensa está mal resuelto | Todavía nadie necesita monedas: no es un problema de diseño de la pantalla |

**La conclusión que ordena la estrategia:**

> El muro no falla por caro, y eso hay que decirlo porque bajar el precio es la primera palanca
> que se toca cuando un muro no convierte. Acá es la que menos margen tiene: el episodio sale
> entre **$ 208 y $ 540** según el paquete ([F3](#f3--comprar-el-paquete-más-grande-no-le-conviene-a-nadie)),
> varias veces por debajo de lo que cobran los líderes de la categoría
> ([§3.4bis](../03-diseno/#34bis--el-precedente-revisado-en-contra)). Lo que está mal no es el
> número: es dónde aparece y contra qué compite. Falla porque **la alternativa a pagar no es irse de la app: es empezar otra serie, gratis**. Con 500 episodios gratis repartidos en 50 títulos, la economía no le pone ninguna presión al usuario durante los casi cuatro meses que le dura el colchón. Y alguien que salta de historia en historia sin apegarse a ninguna no tiene motivo para volver mañana: su relación es con el catálogo, no con una serie.

**Por eso el objetivo de negocio es stickiness y no conversión.** Y por eso la respuesta correcta no es recortar los episodios gratis —eso frena la adquisición y ataca la métrica equivocada—, sino **darle al usuario una razón para quedarse en una historia en vez de saltar a la siguiente.** De ahí sale la intervención que se desarrolla en [§3](../03-diseno/).

---

## 1.2 Las cinco fallas

### F1 · La economía está a la vista y ordenada al revés

El brief habla de *fuentes* y *sumideros*: de dónde salen las monedas y en qué se van. En esta app nunca se cruzan **en el tiempo**.

La fuente gratuita **recurrente** se ofrece **al abrir la app**, en un diálogo que aparece la primera vez que se entra cada día y que hay que reclamar con un botón. La misma recompensa vive además en la pestaña **Recompensas**. El gasto ocurre horas después, en el **player** —el reproductor—, al chocar con el muro.

Y no es la única fuente. La pestaña **Recompensas** concentra cuatro, [capturadas acá](../00-dogfooding/#capturas-de-la-evidencia):

| Fuente | Cuánto da | En episodios |
|---|---|---|
| **Ver anuncios** | 15 monedas · tope **10 diarios** | **hasta 10 episodios por día** |
| Recompensa diaria | escalera de 7 días: **15 · 40 · 60 · 50 · 40 · 45 · 200** | 30 episodios en una semana perfecta |
| Tareas sociales (una sola vez) | 10 cada una · 30 por calificar | 6 en total |
| Programa de referidos | sin cifra capturada | — |

**La más grande, por mucho, es el anuncio recompensado — y cambia el diagnóstico.** Diez anuncios diarios son 150 monedas: **70 episodios gratis por semana**. El usuario promedio entra 2.3 veces y ve 14 episodios por sesión, unos 32 a la semana. **La fuente gratuita recurrente más que duplica el consumo.** Quien sepa que ese botón existe no choca nunca con un muro.

**Y la mayor de las cuatro sí aparece en el muro** —[capturado dentro de la app](../00-dogfooding/evidencia/muro-nativo-real-2.png)—: el anuncio recompensado está dentro de la hoja, con su *«Desbloquea 1 episodio»* y su contador *0/10*. Lo que no está es lo que ese contador significa. Un `0/10` en gris, en la esquina de una tarjeta, no le dice a nadie que ahí hay **diez episodios gratis al día**, que es la cifra que cambia el diagnóstico. La fuente no está escondida: está sin traducir, que es el mismo defecto que este documento le señala a la moneda.

- **19% de los usuarios activos reclama la recompensa diaria.** El diálogo no se puede no ver: se interpone entre el usuario y la app. Así que el 81% restante **no la deja pasar por no encontrarla: la descarta**.
- **82% nunca abrió el perfil.** Lo que vive en una pestaña aparte, para este usuario, no existe — y eso sí aplica a todo lo demás del metajuego.

Ese 19% es la señal más informativa del conjunto, precisamente porque el producto ya hizo lo máximo que se puede hacer con la visibilidad. Cuatro de cada cinco personas cierran un regalo gratis que tienen delante de los ojos, y hay tres razones que lo explican, las tres sostenidas por el resto de este diagnóstico:

| Por qué se descarta | Evidencia |
|---|---|
| **No sabe qué está rechazando.** Nada en el producto traduce monedas a episodios, así que el regalo no se lee como regalo | [F2](#f2--nadie-le-dice-al-usuario-cuánto-vale-una-moneda) |
| **No necesita monedas todavía.** El diálogo aparece antes de ver nada, con 10 episodios gratis por delante — y con 500 en el catálogo, esa necesidad tarda meses en aparecer | [Hallazgo 2](#hallazgo-2--pagar-no-es-la-única-salida-del-muro-empezar-otra-serie-es-gratis) |
| **Está en el camino a lo que vino a hacer.** A la 1 a.m., con una mano, lo que se interpone entre abrir la app y ver se cierra por reflejo | 54% de las sesiones entre 11 p.m. y 2 a.m. |

**La conclusión no es que la fuente esté escondida ni que falte del muro: es que llega sin traducir y en el peor renglón de la pantalla.** El único instante del día en que el usuario quiere monedas es cuando choca con el muro. La fuente está ahí — debajo de la suscripción, en la tarjeta más apagada, y con su tope escrito como `0/10` en vez de como los diez episodios diarios que son.

**Y la suscripción tampoco vive afuera: encabeza el muro.** Idilio ya es un modelo híbrido —monedas y suscripción conviviendo— y el pase semanal ($12.500) y el mensual ($24.500) son lo primero que aparece al chocar, con el mensual marcado *RECOMENDADO*. El producto de mayor valor de la economía está exactamente donde tiene que estar.

Lo que queda en pie es un problema de número, no de ubicación: **terminar la serie mediana comprando monedas —600— sale unos $21.000, y el mensual abre el catálogo entero por $24.500.** Una sola serie cuesta casi lo mismo que un mes de todo, y el muro pone las dos ofertas en la misma pantalla sin que nada haga esa comparación por el usuario. Se analiza en el [benchmark §5.1](../05-benchmark/#51--qué-es-idilio-tv-con-los-datos-que-el-brief-no-traía).

Y conviene separar dos cosas, porque la estrategia descarta una. **Como mecánica de retención**, la suscripción no sirve para este objetivo: no mueve el DAU/MAU del no-pagador, que es el 95%+ de la base, y por eso queda descartada en [§2.6](../02-estrategia/#26-qué-queda-deliberadamente-afuera). Como superficie ya está resuelta por el producto.

### F2 · Nadie le dice al usuario cuánto vale una moneda

En ningún punto del sistema se explica cuánto rinde una moneda en la única cosa que al usuario le importa: episodios.

El paywall muestra `15`, `180`, `375`. Números sueltos, sin referencia. Para entenderlos hay que hacer una división mental a la 1 a.m.:

| Lo que ve el usuario | Lo que en realidad significa | ¿La app se lo dice? |
|---|---|---|
| 15 | 1 episodio | ✗ |
| 180 | 12 episodios | ✗ |
| 375 | 25 episodios | ✗ |
| 600 (serie mediana) | 40 episodios | ✗ |

Sin una unidad de valor no hay economía: hay una tarifa opaca. El usuario no puede juzgar si un paquete es caro o barato, porque no sabe qué está comprando.

### F3 · Comprar el paquete más grande no le conviene a nadie

Datos reales del paywall:

| Paquete | Precio | Episodios | **Precio por episodio** | Badge |
|---|---|---|---|---|
| 180 monedas | $ 2.500 | 12 | **$ 208** | SUPER OFERTA 69% |
| 375 monedas | $ 13.500 | 25 | **$ 540** | −20% DTO |
| 725 monedas | $ 25.500 | 48 | **$ 531** | −24% DTO |

De ahí salen tres problemas:

1. **Los dos escalones grandes son el mismo precio.** Pasar de 375 a 725 monedas cuesta casi el doble de dinero y mejora el precio por episodio un **1,7%**: nueve pesos. Una escalera de paquetes existe para que al usuario le convenga subir; esta no le da ninguna razón.
2. **El escalón barato es 2,6 veces mejor que los otros dos**, y lleva encima el badge más agresivo. Un usuario que compare una sola vez aprende que fuera de la oferta el episodio cuesta el triple, y esa es la lección que se lleva de la economía entera.
3. **Los tres llevan badge de descuento a la vez** —69%, 20%, 24%—. Un descuento solo persuade si hay algo sin descuento contra qué compararlo. Cuando los tres están en oferta, ninguno lo está: el badge deja de ser información y pasa a ser decoración.

Y por encima de la escalera hay un número que la desarma: terminar la serie mediana comprando monedas —600— sale unos **$ 21.000**, y el **Pase Idilio mensual abre el catálogo entero por $ 24.500**. Comprar una serie cuesta casi lo mismo que un mes de todo, y el muro pone las dos ofertas en la misma pantalla: la suscripción arriba, los paquetes abajo. Nada hace la comparación por el usuario, y es la que decide si paga una vez o todos los meses.

### F4 · La racha le exige al usuario una frecuencia que no tiene

- Lo que el usuario realmente hace: **2.3 días activos por semana** (el DAU/MAU de 0.33).
- Lo que la racha diaria exige: **7 días de 7**.

Se le está pidiendo a alguien que entra dos o tres veces por semana que se comporte como si entrara todos los días.

**Y la escalera de premios va hacia atrás justo donde la gente abandona.** Esto es lo que paga la racha, medido en el modal de la app ([captura](../00-dogfooding/#capturas-de-la-evidencia)):

| Día | 1 | 2 | **3** | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| Monedas | 15 | 40 | **60** | 50 | 40 | 45 | 200 |

Sube hasta el día 3, y después **baja dos días seguidos**. Quien llega al día 3 —el 6%— se encuentra con que mañana rinde menos que hoy, y pasado menos todavía. La curva desinfla el esfuerzo exactamente en el tramo donde hay que sostenerlo, y guarda todo el premio para un día 7 al que casi nadie llega.

Es el mismo defecto que [F3](#f3--comprar-el-paquete-más-grande-no-le-conviene-a-nadie) le señala a la escalera de paquetes —una escalera que no sube no es una escalera— cometido esta vez en la economía gratuita. Que el pico caiga en el día 3 y el 6% se mida ahí no es coincidencia: el día 3 es donde el sistema deja de dar más. Que solo el **6% llegue al día 3** no es un problema de cómo se ve la pantalla de racha: es la consecuencia aritmética de haber elegido el día calendario como unidad de una conducta que no es diaria.

El corte de día calendario agrava el problema, porque castiga el comportamiento más común del producto. **54% de las sesiones ocurren entre las 11 p.m. y las 2 a.m.** Alguien que ve el lunes a las 23:30 y otra vez a las 00:30 vivió "dos noches seguidas". Para un contador de días calendario fue un solo día —el martes—, y el lunes quedó vacío: racha rota. El usuario pierde por un detalle de calendario que nunca va a aceptar como justo.

> El release note del build 1.20.0 (21-ago-2026) dice *"New daily streak UI"* («nueva interfaz de la racha diaria»). Se está iterando la **interfaz** de la racha. El problema no está en la interfaz.

### F5 · El usuario no puede ver su propio progreso

La serie mediana tiene 50 episodios y 40 de ellos bloqueados. El usuario ve una lista de capítulos numerados —tarjetas de `Capítulo N` en la app nativa, una grilla de números grises en el reproductor web ([capturas](../00-dogfooding/#capturas-de-la-evidencia))—. Las dos superficies dicen exactamente lo mismo: cuáles están bloqueados. En ningún lado aparece:

- cuánto lleva visto y cuánto le falta,
- cuánto costaría terminar la serie,
- ningún hito intermedio entre el episodio 11 y el 50.

Y como **82% nunca abre el perfil**, tampoco hay otro lugar donde vea su posición dentro del sistema. El usuario no percibe que está avanzando, así que no puede querer volver a avanzar.

---

## 1.3 Qué señales pesaron y cuáles descarté

### Pesaron

| Señal | Por qué pesó |
|---|---|
| **10 eps gratis + 14 eps por sesión** | Lo gratis se acaba antes que la sesión: la serie típica se queda sin episodios gratis a los 10 y la sesión promedio sigue hasta 14. Dónde cae el muro *dentro* de la sesión es hipótesis, no dato ([§1.1](#11-los-dos-hallazgos-que-ordenan-todo-lo-demás)). |
| **500 episodios gratis en el catálogo** | Son casi cuatro meses de contenido sin pagar. Explica por qué el 19% de reclamo de la recompensa no es un problema de pantalla: todavía nadie necesita monedas. |
| **19% reclama la recompensa diaria** | Mide la distancia entre *cuándo* se ofrecen las monedas y *cuándo* se necesitan. Pesa el doble por ser un diálogo ineludible: descarta la visibilidad como causa y deja el momento y la unidad. |
| **82% nunca abre el perfil** | Es la restricción de diseño más dura: descarta de entrada cualquier solución que viva en una pestaña. |
| **DAU/MAU 0.33 frente a una racha diaria** | La mecánica le pide al usuario una frecuencia que no tiene. Explica el 6% sin necesidad de más datos. |
| **88% son invitados, sin cuenta** | Cualquier cosa que exija registrarse arranca alcanzando apenas al 12%. Define el orden: primero el valor, después la cuenta. |

### Descarté

**El 2.4x de retención a 30 días, leído como causa.** Es la señal más tentadora del conjunto y la más peligrosa. Quien sostiene tres días seguidos ya era un usuario enganchado antes de que existiera la racha. La racha no lo creó: lo *identificó*. Armar la estrategia sobre "llevemos a más gente al día 3 y tendremos 2.4x" es suponer que el termómetro calienta la habitación.

> **Cómo se resuelve:** un experimento con grupo de control — racha para la mitad de los usuarios nuevos, no para la otra mitad, y comparar la retención a 30 días. Si el 2.4x se sostiene, la racha causa retención; si cae a 1.1x, lo que medía era quién ya estaba enganchado. Hasta que exista ese número, la estrategia no se apoya en él.

**El 23% que vuelve a ver series terminadas, leído como amor al contenido.** La lectura optimista es "les gusta tanto que lo ven de nuevo". La que sale del censo del catálogo es menos halagadora: con 500 episodios gratis disponibles, **volver a ver algo solo tiene sentido cuando ya se acabó lo gratis** —o cuando ninguna de las 50 series nuevas enganchó lo suficiente como para empezarla. Las dos lecturas apuntan a lo mismo: falta apego, no sobra.

> **Cómo se resuelve:** dos consultas — cruzar *quién vuelve a ver* contra *cuántos episodios gratis del catálogo le quedan sin ver*, y contra *cuántas monedas tenía en ese momento*. Si quienes vuelven a ver todavía tienen cientos de episodios gratis por delante, la lectura correcta es la optimista y no esta.

**El perfil como palanca de engagement.** 82% nunca entra. Rediseñarlo es amoblar un cuarto al que nadie va. Lo que hay que mover es *dónde vive* el metajuego, no cómo se ve el cuarto.

**Mecánicas sociales (rankings, tablas de posiciones, comparación con amigos).** El contexto es de 11 p.m. a 2 a.m., consumo solitario, un género que carga cierto pudor, y 88% de invitados sin identidad. Una tabla de posiciones acá no motiva: expone. Descartado por el contexto, no por la calidad de la mecánica.

**Coleccionables e insignias como intervención principal.** Nada en las señales disponibles indica motivación de coleccionista, agregan carga mental a un loop —el ciclo que el usuario repite— que debe operarse con una sola mano, y su relación con DAU/MAU (usuarios activos por día sobre usuarios activos por mes: qué tan seguido vuelve la gente) es indirecta. Pueden entrar después, como una capa; no como la apuesta.


---

## 1.4 Una palanca fuera del alcance de este objetivo

El censo destapa una palanca mayor que cualquiera de las ocho intervenciones de la estrategia: los 500 episodios gratis del catálogo. Este documento la llama **el colchón** — todo lo que un usuario puede ver sin pagar nunca. Y el colchón es solo la mitad: encima corren las fuentes recurrentes de [F1](#f1--la-economía-está-a-la-vista-y-ordenada-al-revés), que con los anuncios dan hasta 70 episodios por semana. El stock se agota una vez; el flujo, no.

Qué haría con ella depende enteramente de cuál sea el objetivo:

| Si el objetivo fuera… | La palanca diría… |
|---|---|
| **Convertir usuarios en pagadores** | Casi cuatro meses de contenido gratis es demasiado. Bajar el bloque gratis a 6 episodios por serie recortaría el colchón un 40% —de 500 episodios a 300— y pondría el muro donde todavía queda deseo. |
| **Adquirir usuarios y retenerlos el primer día** | Esos 10 episodios gratis son exactamente lo que engancha en la primera sesión. Tocarlos es tocar el motor de crecimiento. |
| **Stickiness (el objetivo real acá)** | **Ninguna de las dos.** Recortar lo gratis no hace que el usuario vuelva mañana: hace que se vaya antes. Y dejarlo como está tampoco lo trae de vuelta. |

Por eso el colchón queda intacto en esta propuesta. El objetivo del ejercicio es DAU/MAU, y el colchón no es una palanca de DAU/MAU sino de conversión. Pero es la variable más pesada de toda la economía y está a una sola decisión de distancia, así que quien lea este diagnóstico debe saber que existe.

**Lo que sí cambia en la propuesta por saber esto:** el Pase de la Noche no compite contra pagar. Compite contra **empezar otra serie gratis**, que es lo que el usuario hace hoy y no le cuesta nada. Ahí está su mejor argumento: es lo único en todo el producto que permite seguir *donde estabas*.
