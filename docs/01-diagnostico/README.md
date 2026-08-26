# 1. Diagnóstico

> **Método.** El análisis parte del uso directo del producto —el reproductor web de idilio.tv y el build nativo 1.20.0— antes de mirar las métricas, y del censo completo de las 50 series del catálogo. Las métricas se leyeron después, y el diagnóstico surge de cruzar las dos fuentes. El registro del uso está en [`docs/00-dogfooding`](../00-dogfooding/).

## Resumen

El metajuego de Idilio no está mal diseñado: **llega en el momento equivocado**. Las monedas se regalan al abrir la app —un diálogo con un botón *Reclamar*, la primera vez que se entra cada día— y se necesitan horas después, en el reproductor, al chocar con el muro.

Ese diálogo es ineludible: le aparece a todo el mundo. Y aun así **el 81% no lo reclama**. Eso descarta la visibilidad como explicación y deja las dos que quedan: el regalo llega cuando el usuario todavía no necesita monedas, y está denominado en una unidad que el producto nunca traduce a episodios.

Debajo de esa falla hay otra mayor, que solo aparece al medir el catálogo completo: **la alternativa a pagar no es irse de la app, es empezar otra serie gratis.** Hay 500 episodios gratis repartidos en 50 títulos, casi cuatro meses de consumo sin pagar, de modo que la economía no ejerce ninguna presión sobre el usuario. Y quien salta de historia en historia no se apega a ninguna: no hay ninguna serie esperándolo mañana, que es precisamente lo que mide un DAU/MAU de 0.33.

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

Y esto es lo que el usuario encuentra en ese choque, verificado en el paywall (el muro de pago) del build 1.20.0:

```
Costo del episodio: 15        Tu balance: 0
─────────────────────────────────────────
       Obtén monedas para continuar
  $0.99 → 180    $1.99 → 180    $3.99 → 375
```

> **De dónde salen estos montos, y en qué moneda paga el usuario.** La captura es de la ficha de tienda, que Idilio publica en dólares — es el mismo material para todos los países. **A un usuario en Colombia la tienda le cobra en pesos:** la ficha de Google Play declara compras dentro de la app de **$1.900 a $59.900 por elemento**. Los montos por paquete en pesos no están en la evidencia que tengo, así que el análisis de abajo va sobre lo que sí está medido y no depende de la moneda: **las monedas que entrega cada paquete y la proporción entre ellos.**

Alguien que nunca vio una moneda, a la 1 a.m., a mitad de un cliffhanger, se encuentra con **cuatro packs de monedas y nada más**. Las maneras de conseguir monedas sin pagar —la recompensa diaria y una lista de tareas: compartir la app, seguir las cuentas de Facebook, Instagram, YouTube, TikTok y WhatsApp, calificar la app— viven todas en otra pestaña de la app. Y el pase semanal y el mensual, que el producto ya vende, tampoco aparecen acá (F1). El muro no le muestra al usuario la economía: le muestra un mostrador.

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

| Señal | Lectura ingenua | Lectura con el catálogo a la vista |
|---|---|---|
| Sesión de 22 min / 14 eps | Buen engagement (que la gente usa mucho la app) | Al menos una serie agotada — y, si la hipótesis de arriba se sostiene, otra recién empezada |
| 23% vuelve a ver series que ya terminó | Aman el contenido | Ya vieron lo que era gratis y no tienen a dónde ir |
| DAU/MAU 0.33 | Les falta hábito | **Ninguna historia en particular los está esperando** |
| 19% reclama la recompensa diaria | El diálogo de recompensa está mal resuelto | Todavía nadie necesita monedas: no es un problema de diseño de la pantalla |

**La conclusión que ordena la estrategia:**

> El muro no falla por ser caro. Falla porque **la alternativa a pagar no es irse de la app: es empezar otra serie, gratis**. Con 500 episodios gratis repartidos en 50 títulos, la economía no le pone ninguna presión al usuario durante los casi cuatro meses que le dura el colchón. Y alguien que salta de historia en historia sin apegarse a ninguna no tiene motivo para volver mañana: su relación es con el catálogo, no con una serie.

**Por eso el objetivo de negocio es stickiness y no conversión.** Y por eso la respuesta correcta no es recortar los episodios gratis —eso frena la adquisición y ataca la métrica equivocada—, sino **darle al usuario una razón para quedarse en una historia en vez de saltar a la siguiente.** De ahí sale la intervención que se desarrolla en [§3](../03-diseno/).

---

## 1.2 Las cinco fallas

### F1 · La fuente llega cuando no hace falta, y falta cuando hace falta

El brief habla de *fuentes* y *sumideros*: de dónde salen las monedas y en qué se van. En esta app nunca se cruzan **en el tiempo**.

La fuente gratuita **recurrente** se ofrece **al abrir la app**, en un diálogo que aparece la primera vez que se entra cada día y que hay que reclamar con un botón. La misma recompensa vive además en la pestaña **Recompensas**. El gasto ocurre horas después, en el **player** —el reproductor—, al chocar con el muro.

No es la única fuente gratuita, y conviene decirlo con precisión: la pestaña **Recompensas** lleva además una lista de tareas —compartir la app, seguir las cuentas de Facebook, Instagram, YouTube, TikTok y WhatsApp a 10 monedas cada una, calificar la app a 30— [capturada acá](../00-dogfooding/#capturas-de-la-evidencia). Son otra cosa que la recompensa diaria: por su naturaleza se cobran **una sola vez** —a nadie se le paga dos veces por seguir la misma cuenta—, así que suman 90 monedas, **seis episodios exactos**, y se acaban. Sirven para el arranque, no para volver cada noche. Lo que sigue vale para las dos: ninguna aparece en el muro.

- **19% de los usuarios activos reclama la recompensa diaria.** El diálogo no se puede no ver: se interpone entre el usuario y la app. Así que el 81% restante **no la deja pasar por no encontrarla: la descarta**.
- **82% nunca abrió el perfil.** Lo que vive en una pestaña aparte, para este usuario, no existe — y eso sí aplica a todo lo demás del metajuego.

Ese 19% es la señal más informativa del conjunto, precisamente porque el producto ya hizo lo máximo que se puede hacer con la visibilidad. Cuatro de cada cinco personas cierran un regalo gratis que tienen delante de los ojos, y hay tres razones que lo explican, las tres sostenidas por el resto de este diagnóstico:

| Por qué se descarta | Evidencia |
|---|---|
| **No sabe qué está rechazando.** Nada en el producto traduce monedas a episodios, así que el regalo no se lee como regalo | [F2](#f2--nadie-le-dice-al-usuario-cuánto-vale-una-moneda) |
| **No necesita monedas todavía.** El diálogo aparece antes de ver nada, con 10 episodios gratis por delante — y con 500 en el catálogo, esa necesidad tarda meses en aparecer | [Hallazgo 2](#hallazgo-2--pagar-no-es-la-única-salida-del-muro-empezar-otra-serie-es-gratis) |
| **Está en el camino a lo que vino a hacer.** A la 1 a.m., con una mano, lo que se interpone entre abrir la app y ver se cierra por reflejo | 54% de las sesiones entre 11 p.m. y 2 a.m. |

**La conclusión no es que la fuente esté escondida: es que el momento está mal elegido, y que hay un botón de por medio.** El único instante del día en que el usuario quiere monedas es cuando choca con el muro, y ahí la fuente gratuita no aparece.

**Y no es solo la fuente gratuita la que vive afuera.** La ficha de App Store del build 1.20.0 lista, además de los packs de monedas, un **pase semanal** y uno **mensual**: Idilio ya es un modelo híbrido, monedas y suscripción conviviendo. El muro no ofrece ninguno de los dos. El producto de mayor valor de toda la economía tampoco aparece en el único momento del día en que el usuario quiere algo que no puede tener — así que esta falla no es solo del metajuego: **lo que vive en otro edificio es también el techo del negocio.** *(El pase tiene además un problema propio, de número: el semanal cuesta más que terminar la serie mediana comprándola, que son 600 monedas. Se analiza en el [benchmark §5.1](../05-benchmark/#51--qué-es-idilio-tv-con-los-datos-que-el-brief-no-traía).)*

Conviene separar dos cosas, porque la estrategia descarta una y propone la otra. **Como mecánica de retención**, la suscripción no sirve para este objetivo: no mueve el DAU/MAU del no-pagador, que es el 95%+ de la base, y por eso queda descartada en [§2.6](../02-estrategia/#26-qué-queda-deliberadamente-afuera). **Como superficie**, es otra cosa: el producto de mayor valor de la economía no aparece en el momento de máxima intención, y eso es una falla del muro, no de la suscripción.

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

| Paquete | Precio | Monedas | Episodios | Contra el anterior |
|---|---|---|---|---|
| Primero · *«SUPER OFERTA 60%»* | — | 180 | 12 | — |
| Segundo | el doble del primero | 180 | 12 | **el doble de precio, las mismas monedas** |
| Tercero | el doble del segundo | 375 | 25 | el doble de precio, 2,08 veces las monedas |

De ahí salen dos problemas:

1. **Los dos primeros paquetes entregan exactamente las mismas 180 monedas a distinto precio.** El doble de precio por la misma cantidad, y no en pantallas distintas — en la captura del build 1.20.0 aparecen uno directamente debajo del otro. El segundo solo se puede leer como un error de la app o como una trampa. Cualquiera de las dos lecturas rompe la confianza justo en el momento de pagar.
2. **Subir del segundo al tercero mejora el valor apenas un 3.9%:** cuesta el doble y entrega 2,08 veces las monedas. Una escalera de paquetes existe para que al usuario le convenga comprar el grande; esta no le da ninguna razón para hacerlo. El resultado es que todos se quedan en el segundo y el escalón alto no se vende.

Además, **los cuatro paquetes llevan badge de descuento** (60%, 20%, 20%, 30%). Un precio tachado solo persuade si hay algo sin descuento contra qué compararlo. Cuando todo está en oferta, nada lo está.

### F4 · La racha le exige al usuario una frecuencia que no tiene

- Lo que el usuario realmente hace: **2.3 días activos por semana** (el DAU/MAU de 0.33).
- Lo que la racha diaria exige: **7 días de 7**.

Se le está pidiendo a alguien que entra dos o tres veces por semana que se comporte como si entrara todos los días. Que solo el **6% llegue al día 3** no es un problema de cómo se ve la pantalla de racha: es la consecuencia aritmética de haber elegido el día calendario como unidad de una conducta que no es diaria.

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

El censo destapa una palanca mayor que cualquiera de las ocho intervenciones de la estrategia: los 500 episodios gratis del catálogo. Este documento la llama **el colchón** — todo lo que un usuario puede ver sin pagar nunca.

Qué haría con ella depende enteramente de cuál sea el objetivo:

| Si el objetivo fuera… | La palanca diría… |
|---|---|
| **Convertir usuarios en pagadores** | Casi cuatro meses de contenido gratis es demasiado. Bajar el bloque gratis a 6 episodios por serie recortaría el colchón un 40% —de 500 episodios a 300— y pondría el muro donde todavía queda deseo. |
| **Adquirir usuarios y retenerlos el primer día** | Esos 10 episodios gratis son exactamente lo que engancha en la primera sesión. Tocarlos es tocar el motor de crecimiento. |
| **Stickiness (el objetivo real acá)** | **Ninguna de las dos.** Recortar lo gratis no hace que el usuario vuelva mañana: hace que se vaya antes. Y dejarlo como está tampoco lo trae de vuelta. |

Por eso el colchón queda intacto en esta propuesta. El objetivo del ejercicio es DAU/MAU, y el colchón no es una palanca de DAU/MAU sino de conversión. Pero es la variable más pesada de toda la economía y está a una sola decisión de distancia, así que quien lea este diagnóstico debe saber que existe.

**Lo que sí cambia en la propuesta por saber esto:** el Pase de la Noche no compite contra pagar. Compite contra **empezar otra serie gratis**, que es lo que el usuario hace hoy y no le cuesta nada. Ahí está su mejor argumento: es lo único en todo el producto que permite seguir *donde estabas*.
