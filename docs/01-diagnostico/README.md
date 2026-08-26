# 1. Diagnóstico

> Método: usé la app (reproductor web de idilio.tv + evidencia del build nativo 1.20.0) **antes** de mirar las cifras, y después crucé las dos cosas. El registro completo de dogfooding está en [`docs/00-dogfooding`](../00-dogfooding/).

---

## 1.1 Los dos hallazgos que ordenan todo lo demás

> **Nota de método.** La primera versión de este diagnóstico decía "12 episodios gratis por serie". Eso salía de la única serie que me tocó abrir. Fui a medir las 43 del catálogo y **la moda real es 10**; *Pasión a Domicilio* es una de tres excepciones. El censo completo está en [`docs/00-dogfooding`](../00-dogfooding/). Corregir el número no debilitó el hallazgo: lo hizo más nítido, y destapó uno más grande.

### Hallazgo 1 · La sesión promedio termina en el muro

**10 episodios gratis por serie. 14 episodios de sesión promedio.**

```
      ← 10 gratis →  ┃  ← 4 más de apetito →
   ●●●●●●●●●●        ┃  ○○○○
                     ┃
                   EL MURO
```

La sesión promedio no termina cuando el usuario se sacia. Termina cuando choca, **con hambre para cuatro episodios más**. Los 22 minutos no son una métrica de salud: son el techo que impone la economía.

Y lo que hay en ese choque, verificado en el paywall del build 1.20.0:

```
Costo del episodio: 15        Tu balance: 0
─────────────────────────────────────────
       Obtén monedas para continuar
  $0.99 → 180    $1.99 → 180    $3.99 → 375
```

Un usuario que nunca vio una moneda, a la 1 a.m., a mitad de un cliffhanger, recibe **una tienda y ninguna otra salida**. La recompensa diaria —la única fuente gratuita— vive en otra pestaña.

### Hallazgo 2 · Pero hay una salida más barata que pagar: otra serie

Este es el que aparece solo cuando se mide el catálogo entero.

| | |
|---|---|
| Series | 43 |
| Episodios totales | 1.885 |
| **Episodios gratis** | **428** — el 23% del catálogo |

**428 episodios gratis ÷ 14 por sesión = 31 sesiones sin pagar un peso.**
A 2.3 sesiones por semana, eso es **13 semanas. Tres meses.**

Ahora vuelvan a mirar la sesión promedio: **14 = 10 + 4**. La sesión típica no es "veo 14 episodios de una historia". Es **"agoto los 10 gratis de una serie, choco, y me voy a empezar otra"**. El muro no expulsa al usuario de la app: lo expulsa de la historia.

Eso reencuadra casi todas las demás señales:

| Señal | Lectura ingenua | Lectura con el catálogo a la vista |
|---|---|---|
| Sesión de 22 min / 14 eps | Buen engagement | Una serie agotada y otra empezada |
| 23% reve series terminadas | Aman el contenido | Ya se comieron el pasto gratis y no hay a dónde ir |
| DAU/MAU 0.33 | Falta de hábito | **No hay apego a ninguna historia en particular** |
| 19% reclama la recompensa | Mala UI de recompensas | No hace falta: nadie necesita monedas todavía |

**La conclusión que ordena la estrategia:**

> El muro no falla por ser caro. Falla porque **la alternativa a pagar no es irse: es empezar otra serie**. Con 428 episodios gratis repartidos en 43 títulos, la economía no ejerce ninguna presión durante los primeros tres meses. Y un usuario que rota entre historias sin apegarse a ninguna no tiene motivo para volver mañana — tiene relación con el catálogo, no con una serie.

**El objetivo de negocio es stickiness, no conversión.** Por eso la respuesta correcta no es recortar los episodios gratis —eso mata la adquisición y ataca la métrica equivocada—, sino **darle al usuario una razón para quedarse en una historia en vez de saltar a la siguiente.** De ahí sale la intervención que elegí.

---

## 1.2 Las cinco fallas

### F1 · La fuente y el sumidero nunca se encuentran

La única fuente gratuita de moneda (recompensa diaria + racha) vive en la pestaña **Recompensas**. El sumidero (desbloqueo) ocurre en el **player**. Son dos superficies distintas y el usuario solo está en una de ellas cuando necesita monedas.

- **19% de los DAU reclama la recompensa diaria.** El 81% restante no es que la rechace: no sabe que existe, porque nunca la encuentra en el momento en que le haría falta.
- **82% nunca abrió perfil.** El patrón se repite: lo que está en una pestaña, para este usuario, no existe.

La pestaña Recompensas ya existe en la barra inferior. Que exista no alcanza. **Un metajuego alojado en un destino que el usuario no visita no puede mover DAU/MAU, por bien diseñado que esté.**

### F2 · La moneda no tiene unidad de valor

En ningún punto del sistema se dice cuánto vale una moneda en la única cosa que el usuario quiere: episodios.

El paywall muestra `15`, `180`, `375`. Números desnudos. Para traducirlos hay que dividir mentalmente a la 1 a.m.:

| Lo que ve el usuario | Lo que significa | Nadie se lo dice |
|---|---|---|
| 15 | 1 episodio | ✗ |
| 180 | 12 episodios | ✗ |
| 375 | 25 episodios | ✗ |
| 600 (serie mediana) | 40 episodios · ~$6.63 | ✗ |

Sin unidad de valor no hay economía: hay una tarifa opaca. El usuario no puede juzgar si $0.99 es caro o barato porque no sabe qué compra.

### F3 · La escalera de precios no premia subir

Datos reales del paywall:

| Paquete | Monedas | Monedas por USD |
|---|---|---|
| $0.99 (oferta de entrada) | 180 | **181.8** |
| $1.99 | 180 | 90.5 |
| $3.99 | 375 | **94.0** |

Dos problemas:

1. **$0.99 y $1.99 dan exactamente lo mismo (180).** Puestos uno al lado del otro, el segundo se lee como un error o como una trampa. Cualquiera de las dos lecturas erosiona confianza en el momento de pagar.
2. **Subir de $1.99 a $3.99 mejora el valor apenas 3.9%.** Una escalera de paquetes existe para que convenga comprar más grande. Esta no da razón para hacerlo. Se maximiza el ticket de $1.99 y se deja sobre la mesa el escalón alto.

Además, **los cuatro paquetes tienen badge de descuento** (60%, 20%, 20%, 30%). Cuando todo está en oferta, nada lo está: el ancla tachada deja de anclar.

### F4 · La racha está calibrada para un usuario que no existe

- Stickiness real: **0.33 → 2.3 días activos por semana.**
- Una racha diaria exige **7 de 7**.

Se le está pidiendo a un usuario de 2.3 días/semana que se comporte como uno de 7. El **6% que llega al día 3** no es un problema de diseño de la pantalla de racha: es la consecuencia aritmética de haber elegido el día calendario como unidad de una conducta que no es diaria.

Y el diseño de la racha castiga precisamente el comportamiento dominante del producto: **54% de las sesiones ocurren entre 11 p.m. y 2 a.m.** Ver a las 00:30 del martes y a las 23:30 del martes son, para el usuario, "dos noches seguidas". Para un contador de días calendario, son el mismo día — y el lunes quedó roto. La racha pierde por un tecnicismo de husos y medianoche que el usuario nunca acepta como justo.

> El release note del build 1.20.0 (21-ago-2026) dice *"New daily streak UI"*. Se está iterando la **UI** de la racha. El problema no está en la UI.

### F5 · La progresión es invisible

La serie mediana tiene 50 episodios y 40 bloqueados. El usuario ve una grilla de 40 números grises. No hay:

- cuánto llevo / cuánto falta,
- cuánto cuesta terminar,
- ningún hito intermedio entre "episodio 11" y "episodio 50".

**82% nunca abrió perfil** significa que tampoco hay una representación de "mi posición en el sistema" en ningún otro lado. El usuario no sabe que está progresando, así que no puede querer volver a progresar.

---

## 1.3 Qué señales pesaron y cuáles descarté

### Pesaron

| Señal | Por qué pesó |
|---|---|
| **10 eps gratis + 14 eps/sesión** | La sesión la corta la economía, no el aburrimiento. Y 14 = 10 + 4 dice qué pasa después: se empieza otra serie. |
| **428 episodios gratis en el catálogo** | Tres meses de contenido sin pagar. Es la señal que explica por qué el 19% de reclamo de recompensa no es un problema de UI: nadie necesita monedas todavía. |
| **19% reclama la recompensa** | Mide directamente la desconexión fuente↔sumidero. Es la fuga más grande y la más barata de tapar. |
| **82% nunca abre perfil** | Es la restricción de diseño más dura: descarta de entrada toda solución que viva en una pestaña. |
| **DAU/MAU 0.33 vs. racha diaria** | Desalineación aritmética entre la mecánica y la conducta real. Explica el 6% sin necesidad de más datos. |
| **88% invitados** | Cualquier cosa que requiera cuenta arranca con 12% de alcance. Define el orden: primero valor, después cuenta. |

### Descarté

**El 2.4x de retención D30 como relación causal.** Es la señal más tentadora del set y creo que es la más peligrosa. Quien sostiene 3 días seguidos ya era, antes de la racha, un usuario enganchado. La racha no lo creó: lo *identificó*. Diseñar la estrategia sobre "hagamos que más gente llegue al día 3 y tendremos 2.4x" es asumir que el termómetro calienta la habitación.

Sigue siendo un dato útil, pero como **hipótesis a testear**, no como cimiento. La forma de saberlo es un holdout: dar racha al 50% de usuarios nuevos comparables y medir D30 contra el otro 50%. Si el 2.4x se sostiene en el experimento, la racha causa retención. Si colapsa a 1.1x, estábamos leyendo selección. Hasta que ese número exista, no apuesto la estrategia a él.

**El 23% que reve series terminadas, como señal de amor al contenido.** La lectura optimista es "les encanta tanto que lo reven". La lectura que sale del censo del catálogo es menos halagadora: con 428 episodios gratis disponibles, **rever solo tiene sentido cuando ya te comiste el pasto gratis** — o cuando ninguna de las 43 series nuevas te enganchó lo suficiente como para empezarla. Las dos lecturas apuntan a lo mismo: falta de apego, no exceso.

No lo doy por cierto. Es contrastable con dos consultas: cruzar *rever* contra *cuántos episodios gratis del catálogo le quedan a ese usuario*, y contra *saldo en el momento del rever*. Si los que reven todavía tienen cientos de episodios gratis sin ver, mi lectura está mal y la optimista es la correcta.

**La sección de perfil como palanca de engagement.** 82% nunca entra. Rediseñarla es amoblar un cuarto al que nadie va. Lo que hay que mover es *dónde* vive el metajuego, no cómo se ve el cuarto.

**Mecánicas sociales (rankings, tablas, comparación con amigos).** El contexto es 11 p.m.–2 a.m., consumo solitario, un vertical con carga de pudor ("novelas de celular"), y 88% de invitados sin identidad. Una tabla de posiciones aquí no es motivación: es exposición. Descartado por contexto, no por calidad de la mecánica.

**Coleccionables / insignias como intervención principal.** No hay evidencia de motivación de coleccionista en las señales disponibles, agregan carga cognitiva a un loop que debe ser de una mano, y su vínculo con DAU/MAU es indirecto. Pueden entrar después, como capa, no como apuesta.


---

## 1.4 Una tensión que señalo y no resuelvo

El censo destapa una palanca que es más grande que cualquiera de mis intervenciones y que **no me corresponde accionar**: los 428 episodios gratis del catálogo.

| Si el objetivo fuera… | La palanca diría… |
|---|---|
| **Conversión a pagador** | Tres meses de colchón gratis es muchísimo. Bajar de 10 a 6 gratis por serie recortaría el colchón un 40% y pondría el muro donde todavía hay deseo. |
| **Adquisición y D1** | Los 10 gratis son exactamente lo que hace que la app enganche en la primera sesión. Tocarlos es tocar el motor de crecimiento. |
| **Stickiness (el objetivo real)** | **Ninguna de las dos.** Recortar gratis no hace que el usuario vuelva mañana; hace que se vaya antes. Y dejarlo como está tampoco lo trae de vuelta. |

Por eso no propongo tocar el colchón. El objetivo del ejercicio es DAU/MAU, y el colchón no es una palanca de DAU/MAU: es una de conversión. Pero es la variable más pesada de la economía, está a una decisión de distancia, y quien lea este diagnóstico debería saber que está ahí.

**Lo que sí cambia en mi propuesta por saber esto:** el Pase de la Noche no compite contra "pagar". Compite contra **"empezar otra serie gratis"**, que es lo que el usuario hace hoy y le sale gratis. Y ahí es donde tiene su mejor argumento — es lo único en todo el producto que te deja seguir *donde estabas*.
