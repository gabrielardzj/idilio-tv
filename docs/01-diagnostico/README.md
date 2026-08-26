# 1. Diagnóstico

> **Método.** Primero usé la app —el reproductor web de idilio.tv y la evidencia del build nativo 1.20.0— sin mirar las métricas. Después leí las métricas y crucé las dos cosas. El registro completo de ese uso está en [`docs/00-dogfooding`](../00-dogfooding/).

Tres términos aparecen en todo el documento. Los dejo definidos acá para no repetirlos después:

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

Eso vale para la sesión promedio. En una sesión corta el bloque gratis sobra — y 14 es una media, que no dice cuántas sesiones son cortas.

**Hasta ahí llega el dato, y ni un centímetro más.** Lo que la economía limita es **cuánto se avanza dentro de una misma historia**: 10 episodios seguidos, en 37 de las 41 series con muro. Eso es lo único que la cifra sostiene por sí sola.

Decir además que **el muro es lo que corta la sesión** ya es otra afirmación, y el Hallazgo 2 da razones para dudarla: al chocar, al usuario le queda un catálogo entero de arranques gratis, así que podría seguir viendo sin pagar nada. **Por qué la sesión se detiene a los 14 y no a los 20, los datos disponibles no lo dicen.**

Y esto es lo que el usuario encuentra en ese choque, verificado en el paywall (el muro de pago) del build 1.20.0:

```
Costo del episodio: 15        Tu balance: 0
─────────────────────────────────────────
       Obtén monedas para continuar
  $0.99 → 180    $1.99 → 180    $3.99 → 375
```

Alguien que nunca vio una moneda, a la 1 a.m., a mitad de un cliffhanger, se encuentra con **cuatro packs de monedas y nada más** —la transcripción de arriba llega hasta el tercero; del cuarto solo pude capturar el badge de −30%, y queda anotado así en el [registro del dogfooding](../00-dogfooding/)—. La recompensa diaria —la única manera de conseguir monedas sin pagar— vive en otra pestaña de la app. Y el pase semanal y el mensual, que el producto ya vende, tampoco aparecen acá (F1). El muro no le muestra al usuario la economía: le muestra un mostrador.

### Hallazgo 2 · Pagar no es la única salida del muro: empezar otra serie es gratis

Este hallazgo solo aparece cuando se mide el catálogo entero.

| | |
|---|---|
| Series | 50 |
| Episodios totales | 2.230 |
| **Episodios gratis** | **500** — el 22% del catálogo |

**500 episodios gratis ÷ 14 por sesión = 36 sesiones sin gastar un centavo.**
A 2.3 días activos por semana, eso son **15 semanas: casi cuatro meses.** (La cuenta asume una sesión por día activo, que es el supuesto más generoso: DAU/MAU mide días, no sesiones. A 1.5 sesiones por día activo el colchón baja de unas 15 semanas a unas 10 — sigue siendo más de dos meses sin motivo para pagar.)

Con ese dato a la vista aparece una lectura tentadora de la sesión promedio: **14 = 10 + 4**. La sesión típica no sería "veo 14 episodios de una historia" sino **"termino los 10 gratis de una serie, choco con el muro y me voy a empezar otra"**.

**Es una hipótesis, no una conclusión.** Una media no se descompone: el mismo 14 sale de muchas sesiones de 2 episodios con unas pocas de 40. Y una sesión que arranca en el episodio 11 de anoche no choca con ningún muro a los 10. Vale acá el mismo criterio con el que descarto el 2.4x de retención a 30 días en [§1.3](#13-qué-señales-pesaron-y-cuáles-descarté): una cifra que encaja con la tesis todavía no la demuestra.

**Lo que la resuelve es una consulta, no un estudio:** la **distribución** de episodios por sesión —no la media— y qué fracción de las sesiones termina exactamente en el último episodio gratis de una serie. Si esa fracción es alta, la hipótesis se sostiene. Si es baja, el muro corta historias pero no sesiones, y hay que buscar en otro lado qué las corta.

[§3.1](../03-diseno/#31-por-qué-esta-intervención-y-no-otra) eligió no apoyarse en esta suma: ahí la intervención se sostiene en que el corte por precio existe, se descomponga o no el 14. Así que la consulta no decide si la intervención vale, sino cuánto rinde —si el muro corta sesiones y no solo historias, el mismo pase recupera bastante más—. Es igual la primera pregunta que haría con acceso a los datos.

Lo que sí queda firme sin esa consulta es lo más importante: **el muro no saca al usuario de la app, lo saca de la historia** — porque la alternativa gratis existe, está a un toque y hay 500 episodios de ella.

Eso cambia el significado de casi todas las demás señales:

| Señal | Lectura ingenua | Lectura con el catálogo a la vista |
|---|---|---|
| Sesión de 22 min / 14 eps | Buen engagement (que la gente usa mucho la app) | Al menos una serie agotada — y, si la hipótesis de arriba se sostiene, otra recién empezada |
| 23% vuelve a ver series que ya terminó | Aman el contenido | Ya vieron lo que era gratis y no tienen a dónde ir |
| DAU/MAU 0.33 | Les falta hábito | **Ninguna historia en particular los está esperando** |
| 19% reclama la recompensa diaria | La pantalla de recompensas está mal resuelta | Todavía nadie necesita monedas |

**La conclusión que ordena la estrategia:**

> El muro no falla por ser caro. Falla porque **la alternativa a pagar no es irse de la app: es empezar otra serie, gratis**. Con 500 episodios gratis repartidos en 50 títulos, la economía no le pone ninguna presión al usuario durante los casi cuatro meses que le dura el colchón. Y alguien que salta de historia en historia sin apegarse a ninguna no tiene motivo para volver mañana: su relación es con el catálogo, no con una serie.

**Por eso el objetivo de negocio es stickiness y no conversión.** Y por eso la respuesta correcta no es recortar los episodios gratis —eso frena la adquisición y ataca la métrica equivocada—, sino **darle al usuario una razón para quedarse en una historia en vez de saltar a la siguiente.** De ahí sale la intervención que elegí.

---

## 1.2 Las cinco fallas

### F1 · Lo que resolvería el muro vive en otra pantalla

*(Esta falla se llamaba "Las monedas se ganan en un lugar y se gastan en otro". Ensanché el título, no el contenido: el desajuste fuente↔sumidero es el primer caso, pero el segundo —la suscripción, que tampoco está en el muro— no es un problema de monedas y bajo el título viejo entraba de contrabando. Preferí ensanchar antes que abrir una F6: F2–F5 se citan por número en los otros documentos.)*

El brief habla de *fuentes* y *sumideros*: de dónde salen las monedas y en qué se van. En esta app nunca se cruzan. La única fuente gratuita —la recompensa diaria y su racha— vive en la pestaña **Recompensas**. El gasto ocurre en el **player** —el reproductor—, al chocar con el muro. Son dos pantallas distintas, y cuando el usuario necesita monedas siempre está en la segunda.

- **19% de los usuarios activos reclama la recompensa diaria.** El 81% restante no la rechaza: no sabe que existe, porque nunca aparece en el momento en que le haría falta.
- **82% nunca abrió el perfil.** El patrón se repite: para este usuario, lo que vive en una pestaña aparte no existe.

La pestaña Recompensas ya está en la barra inferior. Que exista no alcanza. **Un metajuego alojado en un destino que el usuario no visita no puede mover DAU/MAU, por bien diseñado que esté.**

**Y no es solo la fuente gratuita la que vive afuera.** La ficha de App Store del build 1.20.0 lista, además de los packs de monedas, un **pase semanal a $7.99** y uno **mensual a $14.99**: Idilio ya es un modelo híbrido, monedas y suscripción conviviendo. El muro no ofrece ninguno de los dos. El producto de mayor valor de toda la economía tampoco aparece en el único momento del día en que el usuario quiere algo que no puede tener — así que esta falla no es solo del metajuego: **lo que vive en otro edificio es también el techo del negocio.** *(El pase tiene además un problema propio, de número: el semanal a $7.99 sale más caro que terminar la serie mediana comprándola —600 monedas, entre ≈ $6.63 y ≈ $7.92 según el paquete con que se armen—. Se analiza en el [benchmark §5.1](../05-benchmark/#51--qué-es-idilio-tv-con-los-datos-que-el-brief-no-traía).)*

Vale separar dos cosas que se confunden fácil, porque la estrategia descarta una y propone la otra. **Como mecánica de retención**, la suscripción no sirve para este objetivo: no mueve el DAU/MAU del no-pagador, que es el 95%+ de la base, y por eso queda descartada en [§2.6](../02-estrategia/#26-qué-queda-deliberadamente-afuera). **Como superficie**, es otra cosa: el producto de mayor valor de la economía no aparece en el momento de máxima intención, y eso es una falla del muro, no de la suscripción.

### F2 · Nadie le dice al usuario cuánto vale una moneda

En ningún punto del sistema se explica cuánto rinde una moneda en la única cosa que al usuario le importa: episodios.

El paywall muestra `15`, `180`, `375`. Números sueltos, sin referencia. Para entenderlos hay que hacer una división mental a la 1 a.m.:

| Lo que ve el usuario | Lo que en realidad significa | ¿La app se lo dice? |
|---|---|---|
| 15 | 1 episodio | ✗ |
| 180 | 12 episodios | ✗ |
| 375 | 25 episodios | ✗ |
| 600 (serie mediana) | 40 episodios · ~$6.63 | ✗ |

Sin una unidad de valor no hay economía: hay una tarifa opaca. El usuario no puede juzgar si $0.99 es caro o barato, porque no sabe qué está comprando.

### F3 · Comprar el paquete más grande no le conviene a nadie

Datos reales del paywall:

| Paquete | Monedas | Monedas por USD |
|---|---|---|
| $0.99 (oferta de entrada) | 180 | **181.8** |
| $1.99 | 180 | 90.5 |
| $3.99 | 375 | **94.0** |
| (4º paquete) | — | — |

Del cuarto paquete solo pude leer el badge —−30%—: en la captura del paywall queda por debajo del corte, sin precio ni monedas visibles. Va en la tabla igual, porque una tabla de tres donde el producto tiene cuatro es el mismo tipo de omisión que este documento le señala al muro. El argumento de abajo se sostiene sobre los tres que sí se pudieron leer.

Dos problemas:

1. **$0.99 y $1.99 entregan exactamente las mismas 180 monedas.** Puestos uno al lado del otro, el de $1.99 se lee como un error de la app o como una trampa. Cualquiera de las dos lecturas rompe la confianza justo en el momento de pagar.
2. **Pasar de $1.99 a $3.99 mejora el valor apenas un 3.9%.** Una escalera de paquetes existe para que al usuario le convenga comprar el grande; esta no le da ninguna razón para hacerlo. El resultado es que todos se quedan en el paquete de $1.99 y el escalón alto no se vende.

Además, **los cuatro paquetes llevan badge de descuento** (60%, 20%, 20%, 30%). Un precio tachado solo persuade si hay algo sin descuento contra qué compararlo. Cuando todo está en oferta, nada lo está.

### F4 · La racha le exige al usuario una frecuencia que no tiene

- Lo que el usuario realmente hace: **2.3 días activos por semana** (el DAU/MAU de 0.33).
- Lo que la racha diaria exige: **7 días de 7**.

Se le está pidiendo a alguien que entra dos o tres veces por semana que se comporte como si entrara todos los días. Que solo el **6% llegue al día 3** no es un problema de cómo se ve la pantalla de racha: es la consecuencia aritmética de haber elegido el día calendario como unidad de una conducta que no es diaria.

Y hay algo peor: la racha castiga justo el comportamiento más común del producto. **54% de las sesiones ocurren entre las 11 p.m. y las 2 a.m.** Alguien que ve el lunes a las 23:30 y otra vez a las 00:30 vivió "dos noches seguidas". Para un contador de días calendario fue un solo día —el martes—, y el lunes quedó vacío: racha rota. El usuario pierde por un detalle de calendario que nunca va a aceptar como justo.

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
| **19% reclama la recompensa diaria** | Mide directamente la distancia entre donde se ganan las monedas y donde se gastan. Es la fuga más grande y la más barata de tapar. |
| **82% nunca abre el perfil** | Es la restricción de diseño más dura: descarta de entrada cualquier solución que viva en una pestaña. |
| **DAU/MAU 0.33 frente a una racha diaria** | La mecánica le pide al usuario una frecuencia que no tiene. Explica el 6% sin necesidad de más datos. |
| **88% son invitados, sin cuenta** | Cualquier cosa que exija registrarse arranca alcanzando apenas al 12%. Define el orden: primero el valor, después la cuenta. |

### Descarté

**El 2.4x de retención a 30 días, leído como causa.** Es la señal más tentadora del set y me parece la más peligrosa. Quien sostiene tres días seguidos ya era un usuario enganchado antes de que existiera la racha. La racha no lo creó: lo *identificó*. Armar la estrategia sobre "llevemos a más gente al día 3 y tendremos 2.4x" es suponer que el termómetro calienta la habitación.

Sigue siendo un dato útil, pero como **hipótesis a testear**, no como cimiento. La forma de comprobarlo es un experimento con grupo de control: darle racha a la mitad de los usuarios nuevos, no dársela a la otra mitad, y comparar la retención a 30 días entre los dos grupos. Si el 2.4x se sostiene, la racha causa retención. Si cae a 1.1x, lo que estábamos midiendo era que la racha simplemente distingue a los que ya estaban enganchados. Hasta que exista ese número, no apuesto la estrategia a él.

**El 23% que vuelve a ver series terminadas, leído como amor al contenido.** La lectura optimista es "les gusta tanto que lo ven de nuevo". La que sale del censo del catálogo es menos halagadora: con 500 episodios gratis disponibles, **volver a ver algo solo tiene sentido cuando ya se acabó lo gratis** —o cuando ninguna de las 50 series nuevas enganchó lo suficiente como para empezarla. Las dos lecturas apuntan a lo mismo: falta apego, no sobra.

No lo doy por cierto. Se contrasta con dos consultas: cruzar *quién vuelve a ver* contra *cuántos episodios gratis del catálogo le quedan sin ver*, y contra *cuántas monedas tenía en ese momento*. Si los que vuelven a ver todavía tienen cientos de episodios gratis por delante, mi lectura está mal y la optimista es la correcta.

**El perfil como palanca de engagement.** 82% nunca entra. Rediseñarlo es amoblar un cuarto al que nadie va. Lo que hay que mover es *dónde vive* el metajuego, no cómo se ve el cuarto.

**Mecánicas sociales (rankings, tablas de posiciones, comparación con amigos).** El contexto es de 11 p.m. a 2 a.m., consumo solitario, un género que carga cierto pudor ("novelas de celular"), y 88% de invitados sin identidad. Una tabla de posiciones acá no motiva: expone. Descartado por el contexto, no por la calidad de la mecánica.

**Coleccionables e insignias como intervención principal.** Nada en las señales disponibles indica motivación de coleccionista, agregan carga mental a un loop —el ciclo que el usuario repite— que debe operarse con una sola mano, y su relación con DAU/MAU (usuarios activos por día sobre usuarios activos por mes: qué tan seguido vuelve la gente) es indirecta. Pueden entrar después, como una capa; no como la apuesta.


---

## 1.4 Una tensión que señalo y no resuelvo

El censo destapa una palanca más grande que cualquiera de mis intervenciones, y que **no me corresponde accionar**: los 500 episodios gratis del catálogo. Los llamo *el colchón*: todo lo que un usuario puede ver sin pagar nunca. Corregir el censo lo hizo más grande, no más chico —eran 428 en la primera medición—, así que este apartado es hoy más fuerte que cuando lo escribí.

| Si el objetivo fuera… | La palanca diría… |
|---|---|
| **Convertir usuarios en pagadores** | Casi cuatro meses de contenido gratis es muchísimo. Bajar el bloque gratis a 6 episodios por serie recortaría el colchón un 40% —200 de los 500— y pondría el muro donde todavía queda deseo. |
| **Adquirir usuarios y retenerlos el primer día** | Esos 10 episodios gratis son exactamente lo que engancha en la primera sesión. Tocarlos es tocar el motor de crecimiento. |
| **Stickiness (el objetivo real acá)** | **Ninguna de las dos.** Recortar lo gratis no hace que el usuario vuelva mañana: hace que se vaya antes. Y dejarlo como está tampoco lo trae de vuelta. |

*(Una corrección sobre esa primera fila: una pasada anterior la cambió por "recortaría un 40% el bloque gratis de cada serie", creyendo que el 40% no cerraba. Cierra, pero es del colchón, no de cada serie: con un tope de 6, las 50 series pasan de 500 episodios gratis a 300 —exactamente 200 menos, el 40.0%—. Por serie el recorte no es 40% en las cinco que no empiezan en 10, y el número que importa acá es cuánto se achica el colchón, que es lo que sostiene los "casi cuatro meses".)*

Por eso no propongo tocar el colchón. El objetivo del ejercicio es DAU/MAU, y el colchón no es una palanca de DAU/MAU: es una de conversión. Pero es la variable más pesada de toda la economía, está a una sola decisión de distancia, y quien lea este diagnóstico debería saber que está ahí.

**Lo que sí cambia en mi propuesta por saber esto:** el Pase de la Noche no compite contra "pagar". Compite contra **"empezar otra serie gratis"**, que es lo que el usuario hace hoy y no le cuesta nada. Ahí es donde tiene su mejor argumento: es lo único en todo el producto que te deja seguir *donde estabas*.
