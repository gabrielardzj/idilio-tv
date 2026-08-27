# 2. Estrategia

## Resumen

Ocho intervenciones en tres etapas, sobre un trimestre. El criterio que las elimina es uno solo: **si no ocurre en el momento en que el usuario quiere lo que se le ofrece, no sirve** — y hay tres maneras de fallarla: vivir en una pestaña que el usuario no visita (82% nunca abre el perfil), llegar antes de que la necesidad exista (81% descarta la recompensa diaria que se le pone delante al abrir la app), o **estar en el momento correcto y no decir lo que vale**, que es lo que le pasa hoy al anuncio recompensado del muro con su tope escrito como un `0/10` gris.

El muro real cambia el peso entre esas tres. **La economía de Idilio no vive en otra pantalla: está entera en el muro** —saldo, costo, suscripción, anuncio gratuito, paquetes y enlace a Recompensas ([diagnóstico §1.1](../01-diagnostico/#hallazgo-1--lo-gratis-se-acaba-antes-que-la-sesión-10-episodios-contra-14))—. Lo que falla es el **orden** en que se ofrece y **lo que no traduce**. Así que la Etapa 1 casi no mueve piezas de sitio: las reordena y las nombra.

**Las etapas no están ordenadas por costo sino por dependencia: cada una necesita la anterior en producción para poder construirse o medirse.**

| Etapa | Semanas | Qué hace | No puede ir antes porque… | Intervenciones |
|---|---|---|---|---|
| **1** | 1–4 | Reordenar y terminar de traducir lo que el producto ya tiene | — | I1 la moneda habla en episodios donde todavía no lo hace · I2 el muro pone arriba la salida gratuita que ya tiene · I3 la escalera de precios vuelve a subir · I4 continuidad web→app |
| **2** | 4–9 | Cambiar la unidad del regreso — **es la que se lleva a diseño y POC** | sin la Etapa 1, la línea base se mide contra un usuario que no sabe que los anuncios le dan diez episodios más cada día | I5 el Pase de la Noche y la Racha de Noches · I6 progreso de serie visible |
| **3** | 9–13 | Convertir el hábito en cuenta y en catálogo | pedir cuenta antes de que exista una racha es pedirla sin argumento | I7 la cuenta se pide cuando hay algo que perder · I8 el pase como puente entre series |

La Etapa 1 va primero pese a mover menos: hace legible la economía sobre la que después se mide I5. Y I5 es la apuesta principal pero no abre el trimestre, porque cuesta 4–5 semanas y empezar por ahí significa llegar a la semana 9 sin haber aprendido nada.

---

## 2.1 La tesis

> El metajuego —la economía que rodea al acto de ver: monedas, racha, recompensas, suscripción— ya está donde tiene que estar: el muro le muestra al usuario la economía entera en el momento de máxima intención. Lo que falla es **cómo la ordena y qué deja sin traducir** — abre por lo más caro y rotula la salida gratuita con un `0/10` gris que cuenta anuncios, no los diez episodios que esos anuncios rinden. Y le falta lo único que ninguna de sus salidas tiene: **una fecha**. La estrategia consiste en **reordenar esa pantalla y cambiar la unidad en que habla** —de monedas a episodios, de días calendario a noches— y en agregar una sola mecánica: la que convierte el muro en una cita.

Conviene decir qué queda descartado con eso, porque era la intervención obvia. **Si la economía viviera en otra pantalla, el trabajo grande del trimestre sería llevarla al muro.** El muro ya la tiene, así que ese traslado no hay que hacerlo — y eso abarata el trimestre y vuelve más preciso el resto: lo que queda por construir es orden, etiqueta y una mecánica.

Por eso la Etapa 1 no agrega mecánicas ni mueve piezas de sitio: **reordena las que ya existen y cambia la unidad en que se expresan.** La única mecánica nueva de todo el portafolio es el Pase de la Noche ([I5](#i5--el-pase-de-la-noche--la-racha-de-noches-)), y entra recién en la Etapa 2.

## 2.2 Criterio de priorización

El orden sale de tres preguntas. La primera funciona distinto de las otras dos: **no suma ni resta, elimina.** Una intervención que no la pasa se va al final de la lista por buena que sea en todo lo demás, y las otras dos preguntas ni siquiera llegan a aplicársele. Las que sí la pasan se ordenan entre sí con la segunda y la tercera.

**① ¿Ocurre donde el usuario ya está, cuando le hace falta, y se entiende ahí?** *(la que elimina)*

Hay tres formas de fallarla, y las tres mandan la intervención al final de la lista:

1. **Pedirle al usuario que navegue.** El 82% nunca abre el perfil.
2. **Llegar antes de que exista la necesidad.** Es la menos evidente: el 81% que no reclama la recompensa diaria **sí la tiene delante**, en un diálogo al abrir la app, y la cierra igual. Estar a la vista no alcanza si el usuario todavía no quiere lo que se le ofrece.
3. **Estar en el momento correcto sin decir lo que vale.** Es la que el muro real destapa: el anuncio recompensado ocurre exactamente donde tiene que ocurrir, y su tope está escrito como un `0/10` gris en la esquina de la tarjeta más apagada de la hoja. Ese contador cuenta **anuncios**, que es la unidad que menos le importa al usuario: los diez anuncios son 150 monedas, o sea diez episodios más al día ([diagnóstico F1](../01-diagnostico/#f1--la-economía-está-a-la-vista-y-ordenada-al-revés)). Está en el sitio correcto y aun así falla, porque no se entiende, y el resultado para el usuario es el mismo.

La tercera forma es la que reordena el portafolio: hace que la intervención más barata de todas —[I2](#i2--el-muro-muestra-las-salidas-que-ya-existen)— sea también la de mayor alcance, porque no hay nada que construir.

**② Alcance × Efecto ÷ Costo.** *(la que ordena)*
Alcance = qué fracción de los usuarios activos la ve sin tener que buscarla. Efecto = cuánto se espera que mueva el DAU/MAU. Costo = semanas de equipo.

**③ ¿Se puede medir en 4 semanas?** *(la que desempata)*
Entre dos intervenciones parecidas, gana la que se puede leer rápido: en un trimestre hacen falta dos ciclos de aprendizaje, no uno. Una de mayor efecto pero con lectura a 90 días deja el trimestre sin margen para corregir.

## 2.3 El portafolio

Ocho intervenciones en tres etapas, ordenadas por dependencia y no por costo. Cada una se describe con cuatro campos: hipótesis, qué mueve, cómo se sabe si funcionó y cuánto cuesta.

**Las tres señales de «Cómo lo sé».** Todas las intervenciones se leen con las mismas tres, y cada una responde una pregunta distinta. Se definen acá una vez y después se nombran sueltas.

| Señal | Qué mide | Cuándo se lee | Qué contesta |
|---|---|---|---|
| ***Leading*** | La conducta que la intervención toca directamente | Días — semana 1 o 2 | **¿pasó algo?** |
| ***Lagging*** | El resultado de negocio al que esa conducta debería llevar | Semanas — semana 4 en adelante | **¿valió la pena?** |
| ***Guardrail*** | Lo que **no** tiene que moverse | En paralelo, todo el tiempo | **¿hay que parar?** |

Hacen falta las tres porque cada una tapa el hueco de la anterior. Sin la *leading* el equipo espera un mes para enterarse de si el cambio hizo algo. Sin la *lagging* se celebra un movimiento de conducta que nunca llegó a ingreso. Y sin el *guardrail* se puede subir una métrica rompiendo otra sin notarlo — el caso típico acá es empujar la salida gratuita y perder la compra: las dos salen del mismo muro.

Cuando un *guardrail* lleva un número —*«no cae más de 5% relativo»*— ese número es el **criterio de reversión**: si se cruza, la intervención se revierte. No es una alarma para mirar, es una regla decidida de antemano.

> **Los precios de este documento son pesos colombianos.** Están medidos dentro de la app con storefront de Colombia, no en la ficha de tienda —que publica en dólares y es el mismo material para todos los países—, y coinciden con lo que declara Google Play: compras dentro de la app de **$ 1.900 a $ 59.900 COP por elemento** ([diagnóstico §1.1](../01-diagnostico/#hallazgo-1--lo-gratis-se-acaba-antes-que-la-sesión-10-episodios-contra-14)).

---

### Etapa 1 — Reordenar y terminar de traducir lo que ya existe (semanas 1–4)

Nada de esto inventa economía ni la cambia de pantalla: el muro ya tiene las tres salidas. Todo es **reordenarlas y decir lo que valen**. Es la etapa más barata y la de mayor alcance.

#### I1 · La moneda habla en episodios
**La mitad de esto el producto ya lo hace, y por eso la intervención es chica.** El muro traduce cada paquete a episodios —*«Desbloquea 12 episodios»*, no *«180 monedas»*— y dice el saldo y el costo antes que ningún precio. Lo que falta es la traducción en los cuatro renglones donde todavía no está, que son justamente los que deciden:

| Dónde falta hoy | Qué dice | Qué debería decir |
|---|---|---|
| La cabecera del muro | *«Tu balance: 0 · Costo del episodio: 15»* | *«Te falta 1 episodio»* — la resta la hace el producto, no el usuario a la 1 a.m. |
| El contador del anuncio — cuenta anuncios, no episodios | `0/10` | *«te quedan 10 episodios gratis hoy»* — lo aplica [I2](#i2--el-muro-muestra-las-salidas-que-ya-existen) |
| La recompensa diaria | `15 · 40 · 60 · 50 · 40 · 45 · 200` monedas | su equivalente en episodios, que es lo único que el usuario compara |
| Terminar la serie | 600 monedas, sin total | *«$ 21.000 en monedas · $ 24.500 el mes entero»* — la comparación que el muro pone a la vista y no hace |

| | |
|---|---|
| **Hipótesis** | El usuario no rechaza el precio del paquete: ese ya está traducido. Lo que no puede calcular es **cuánto le falta**, **cuánto le queda gratis** y **cuánto sale terminar**, que son las tres cifras que deciden si paga, si mira un anuncio o si se va a otra serie. Dándole esas tres, decide — y decidir, aunque sea que no, es mejor que abandonar. |
| **Mueve** | Comprensión de la economía (objetivo de experiencia). Secundariamente conversión a pagador. |
| **Cómo lo sé** | *Leading:* qué fracción de los muros termina en algo que no sea cerrar — comprar, ver el anuncio o volver al catálogo. *Lagging:* conversión a primera compra. *Guardrail:* ARPDAU (ingreso promedio por usuario activo al día) no cae más de 5% relativo. |
| **Costo** | ~1 semana. Es copy y un componente. |
| **¿Pasa la pregunta ①?** | ✅ ocurre en el muro, dentro del loop. |

> **I1 e I2 mueven la misma señal temprana** —qué fracción de los muros termina en algo distinto de cerrar— y las dos salen en la Etapa 1. Desplegadas juntas a toda la base, el número sube y no se sabe cuál de las dos lo movió. Van en cohortes separadas, o I1 se mide antes de que I2 entre.

#### I2 · El muro muestra las salidas que ya existen
El muro ya tiene la salida gratuita: el anuncio recompensado está ahí, con su *«Desbloquea 1 episodio»* y su contador `0/10`. Lo que está mal es **el orden y la etiqueta**. La hoja abre con *«Desbloquea TODO Idilio»* —lo más caro— y deja el anuncio debajo, en la tarjeta más apagada, con su valor escrito como una fracción gris en una esquina.

La intervención es reordenar y renombrar, no mover: **el anuncio arriba**, y el contador traducido de anuncios a lo que el usuario vino a buscar — *«te quedan 10 episodios gratis hoy»* en vez de `0/10`. Es lo más barato y de mayor alcance de todo el portafolio, y no inventa nada: **el producto ya regala diez episodios diarios en anuncios —70 a la semana— encima de los que trae cada serie** ([diagnóstico F1](../01-diagnostico/#f1--la-economía-está-a-la-vista-y-ordenada-al-revés)) sin decírselo al usuario en el único segundo del día en que le importa.

**Y un tercer cambio, que sí es de comportamiento y conviene no colarlo entre los otros dos: el anuncio abre el episodio.** Hoy acredita 15 monedas que el usuario todavía tiene que gastar en un segundo toque. Un anuncio vale exactamente un episodio, así que la moneda en el medio no informa nada — solo agrega un paso a la única salida que esta intervención quiere hacer fácil, y obliga a la tarjeta a hablar en la unidad que [I1](#i1--la-moneda-habla-en-episodios) le está sacando de encima al usuario. La emisión no cambia —diez anuncios siguen siendo diez episodios por día, ni uno más— y el tope diario tampoco. Lo que cambia es que el botón cumple lo que dice: *«Ver un anuncio y abrir este episodio»*.

| | |
|---|---|
| **Hipótesis** | El `0/10` cuenta anuncios, así que para leerlo como diez episodios hay que multiplicar por 15 y dividir por 15 — nadie lo hace. Lo que sí lee primero es una suscripción de $ 24.500 COP. Con el anuncio arriba y su contador traducido a episodios (I1), el muro deja de leerse como un callejón de pago y el usuario aprende que la economía tiene fuentes. |
| **Mueve** | % de muros que terminan en desbloqueo y no en cierre. Anuncios vistos por DAU. Vía ambas, DAU/MAU. |
| **Cómo lo sé** | *Leading:* **qué fracción de los muros termina en algo que no sea cerrar la pantalla** — ver el anuncio, comprar o volver al catálogo. *Lagging:* **DAU/MAU.** *Guardrail:* que el ingreso por usuario activo y el porcentaje de gente que paga no caigan más de un 5% relativo. Es el riesgo propio de esta intervención: poner el anuncio arriba puede hacer que alguien que iba a comprar mire un anuncio en vez de pagar, y ahí es donde se vería. |
| **Costo** | ~2 semanas. El SDK de anuncios y el registro de saldos ya existen, así que el orden y la etiqueta son superficie. Lo único que no lo es —y es media jornada— es que la devolución del anuncio abra el episodio en vez de acreditar monedas. |
| **¿Pasa la pregunta ①?** | ✅ |

> **Y ojo con el conflicto que esto destapa:** el Pase Idilio vende *«sin anuncios»* como una de sus dos ventajas. O sea que la suscripción cobra por quitar la fuente gratuita más generosa del producto. Poner el anuncio en el muro hace ese conflicto más visible, y es una decisión de negocio que hay que tomar a la vista y no por omisión.

#### I3 · La escalera de precios vuelve a ser una escalera
Hoy la escalera se aplana y en el último escalón empeora. Los tres paquetes que el usuario ve en el muro salen a **$ 208, $ 540 y $ 531 COP** por episodio, y el de 1500 monedas que solo aparece en la ficha de tienda, a **$ 599** ([diagnóstico F3](../01-diagnostico/#f3--comprar-el-paquete-más-grande-no-le-conviene-a-nadie)). O sea: subir de 375 a 725 cuesta casi el doble y mejora nueve pesos —un 1,7%—, y subir un escalón más es directamente peor negocio. Dar mejora real por escalón, y reservar el badge de descuento para descuentos reales — hoy los tres del muro lo llevan a la vez.

| | |
|---|---|
| **Hipótesis** | Una escalera que no baja —y que en el último escalón sube— no le da al usuario ninguna razón para comprar el paquete grande, y un descuento en los tres a la vez no persuade en ninguno. Peor: el escalón barato es **2,6 veces mejor** que los otros dos y lleva el badge más agresivo, así que quien compara una sola vez aprende que fuera de la oferta el episodio cuesta el triple. Arreglar la escalera sube el ticket promedio sin tocar el tráfico. |
| **Mueve** | Valor de la primera compra, o sea el ingreso promedio por usuario que sí paga. No mueve DAU/MAU — entra igual porque cuesta poco y protege el resto. |
| **Cómo lo sé** | *Leading:* **qué paquete elige la gente.** Hoy casi todos se llevan el barato, porque es 2,6 veces mejor que los otros dos; si la escalera queda bien construida, los grandes empiezan a venderse y ese reparto se mueve en la primera semana. *Lagging:* **cuánto gasta en promedio quien sí compra** (ARPPU), que es lo que la escalera existe para subir. *Guardrail:* **que no se reduzca el número de compradores.** Hacer más atractivo el paquete grande no puede espantar a quien solo iba a gastar poco: si suben los ingresos pero cae la cantidad de gente que compra, el arreglo salió mal. |
| **Costo** | ~1 semana + config de store. |
| **¿Pasa la pregunta ①?** | ✅ |

#### I4 · Continuidad web → app

**El recorrido, tal como ocurre hoy.** Alguien comparte un episodio. Su amigo abre el link en el teléfono y cae en **idilio.tv**, que no es un landing sino un reproductor de verdad: reproduce, trae la lista de capítulos y encadena al siguiente solo. Ve unos cuantos, se engancha, y en el episodio 13 de *Pasión a Domicilio* aparece el muro web ([capturado acá](../00-dogfooding/evidencia/muro-web-ep13.png)).

Ese muro no se parece al de la app. **No tiene economía:** ni saldo, ni anuncio, ni paquetes. Dice *«Se desbloquea en la app con 15 monedas»* y ofrece una sola salida — **«Descargar la app»**. Así que toca, va a la tienda, instala, abre…

**…y la app lo recibe en el home.** Un catálogo de 50 series. La serie que venía viendo y el episodio donde se quedó se perdieron en el salto: ahora tiene que acordarse del nombre, encontrarlo entre los rieles y acordarse de en qué capítulo iba.

**Qué se tira ahí.** No es tráfico: es la señal de intención más específica que este producto puede recibir. Esa persona no llegó queriendo *«una app de microdramas»* — llegó queriendo **el episodio 13 de una serie concreta**, a la que ya le dedicó doce. El producto convierte esa intención en la de un visitante cualquiera, y le cobra el trabajo de reconstruirla a mano, a la 1 a.m., en una app que abrió por primera vez.

**Qué hace la intervención.** El link compartido abre la app **en ese episodio de esa serie**, esté la app instalada o no. Son dos piezas distintas y conviene no confundirlas, porque cuestan y fallan distinto:

| Caso | Qué hace falta | Qué resuelve |
|---|---|---|
| **App ya instalada** | *Universal Links* (iOS) y *App Links* (Android): el sistema operativo reconoce el dominio y abre la app en vez del navegador | Que quien ya tiene la app no termine viendo en web, sin saldo, sin racha y contra un muro que no ofrece nada |
| **App sin instalar** | Un *deferred deep link*, porque el viaje a la tienda borra el rastro y la app arranca sin saber de dónde vino nadie | Que la primera pantalla después de instalar sea el episodio que vino a ver, y no el home |

*Deep link* es el enlace que abre una pantalla **adentro** de la app y no la portada. *Deferred* —diferido— es la mitad que aguanta el paso por la tienda: el clic queda registrado antes de instalar, y la app lo cobra en su primer arranque.

**Y el muro web deja de ser un callejón.** Hoy pide instalar sin decir qué pasa después. Con el aterrizaje resuelto puede prometer lo que de verdad va a cumplir —*«seguí el episodio 13 en la app»*— y, con [I2](#i2--el-muro-muestra-las-salidas-que-ya-existen) en producción, decir además que ahí adentro ese episodio se abre gratis con un anuncio.

| | |
|---|---|
| **Hipótesis** | El compartir ya existe y funciona; lo que se rompe es el aterrizaje. Y no está a medias: el porcentaje de instalaciones que llegan al episodio correcto no es bajo, es **cero**, porque el camino no existe. Esto no persuade a nadie de nada — solo deja de tirar una intención que el usuario ya traía puesta. |
| **Mueve** | Instalaciones activadas, y cuál es el primer episodio que se ve después de instalar. Sobre DAU/MAU actúa indirecto, vía [I5](#i5--el-pase-de-la-noche--la-racha-de-noches-): el Pase solo tiene sentido para alguien que está **dentro de una historia**, y quien aterriza en el home vuelve a estar eligiendo entre 50 arranques gratis, que es la conducta que el diagnóstico señala como el problema. |
| **Cómo lo sé** | *Leading:* % de instalaciones desde link que llegan al episodio correcto (hoy 0%). *Lagging:* D1 —cuántos vuelven al día siguiente— de la cohorte (el grupo que entró por ahí) de link compartido, contra la que entró por otro lado. *Guardrail:* la tasa de instalación desde el muro web no cae; si el copy nuevo promete de más, se ve ahí. |
| **Costo** | ~1 semana. Con proveedor (Branch, AppsFlyer) es integrar un SDK. Sin proveedor son Universal Links y App Links propios, que exigen publicar un archivo de asociación en el dominio y **no cubren el caso diferido**, que es justamente el del usuario nuevo. Es plomería, no una mecánica: no compite por el presupuesto de I5. |
| **¿Pasa la pregunta ①?** | ✅ ocurre en el salto entre las dos superficies, que es exactamente el segundo en que el usuario quiere seguir viendo. |

> **Es de las que menos mueven el objetivo, y entra igual.** No hace que nadie vuelva mañana, y eso la deja al lado de [I3](#i3--la-escalera-de-precios-vuelve-a-ser-una-escalera) en el fondo del portafolio por efecto. Entra por tres razones: cuesta una semana, arregla algo que hoy vale cero y no un poco, y le entrega a I5 gente que ya está adentro de una historia en vez de parada frente a un catálogo.

---

### Etapa 2 — Cambiar la unidad del regreso (semanas 4–9) ← **la intervención profunda**

#### I5 · El Pase de la Noche + la Racha de Noches ⭐
**Es la intervención que se lleva a diseño y POC.** Detalle completo en [`docs/03-diseno`](../03-diseno/).

Cuatro cambios acoplados:

1. **Pase de la Noche.** Se emite uno por noche —tope de 7 por semana—, se entrega solo al terminar un episodio y se acumula hasta dos. *El usuario elige a qué serie se lo da*, y esa elección ocurre dentro del muro. **No hay nada que reclamar:** el botón entre el usuario y algo que ya se ganó es justamente lo que deja el reclamo diario en 19%.
2. **La unidad es la noche, no el día.** La ventana corre de 5 a.m. a 5 a.m. Ver a las 00:30 y a las 23:30 del mismo martes cuenta como dos noches, no como una.
3. **Comodín, y una escalera que no va hacia atrás.** Al llegar a la noche 3 se gana un escudo que se consume solo cuando se pierde una noche, uno por semana. Y el premio de cada noche nunca es menor que el de la anterior — que es el defecto exacto de la racha que el producto ya tiene: paga `15 · 40 · 60 · 50 · 40 · 45 · 200`, sube hasta el día 3 y después **baja dos días seguidos**, justo en el tramo donde la gente abandona ([diagnóstico F4](../01-diagnostico/#f4--la-racha-le-exige-al-usuario-una-frecuencia-que-no-tiene)). Es el mismo defecto que [I3](#i3--la-escalera-de-precios-vuelve-a-ser-una-escalera) corrige en la economía de pago: una escalera que no sube no es una escalera, y acá está cometido en la gratuita.
4. **Una corrección al muro, que es donde ocurren los otros tres.** El muro real ya tiene las tres salidas —suscripción, anuncio gratuito y paquetes de monedas—, así que la única salida nueva es el propio pase: lo demás es **reordenar**. Hoy abre con *«Desbloquea TODO Idilio»* y los dos planes del Pase Idilio ($ 12.500 COP semanal, $ 24.500 COP mensual, el mensual marcado *RECOMENDADO*), y deja el anuncio gratuito debajo, en la tarjeta más apagada, con su valor escrito como un `0/10` gris. La propuesta invierte ese orden y es la [D2 del diseño](../03-diseno/): **lo gratis arriba de lo pago**, con el Pase de la Noche primero, el anuncio después y la compra debajo. La suscripción se queda en la pantalla —el producto la vende y esconderla no ayuda a nadie— pero deja de ser lo primero que ve alguien a quien le faltan quince monedas.

   Y hay un número que el muro pone a la vista sin comentarlo: terminar la serie mediana comprando monedas —600— sale unos **$ 21.000**, y el mensual abre **el catálogo entero por $ 24.500**. Una serie cuesta casi lo mismo que un mes de todo. Eso no es un problema de qué mostrar sino de cómo está tarifada la escalera de monedas, y lo corrige [I3](#i3--la-escalera-de-precios-vuelve-a-ser-una-escalera).

*Es una propuesta y no un hecho: ni el diseño de [§3](../03-diseno/) ni el POC tienen suscripción — tienen el pase y la compra de monedas. Está escrita acá porque es donde corresponde decidirla, no donde corresponde mostrarla.*

**Y una consecuencia que conviene presupuestar en vez de descubrir: I5 toca el perfil.** No como rediseño —eso sigue descartado en [§2.6](#26-qué-queda-deliberadamente-afuera), y por la misma razón de siempre— sino porque hay tres piezas de esta intervención que no tienen ningún otro sitio donde vivir:

| Pieza | Por qué cae dentro de I5 |
|---|---|
| **Interruptor del aviso del pase** | La cita manda una notificación. Si no hay dónde apagarla dentro de la app, el usuario la apaga desde los ajustes del sistema — y ahí las pierde todas, para siempre y sin vuelta atrás. Es la diferencia entre *«no me avises tanto»* y *«silenciado»*. |
| **La línea que explica la noche** | *«Tu noche va de 5 a.m. a 5 a.m.»* Suena a detalle técnico y no lo es: con la base repartida en cuatro husos horarios, alguien va a escribir «me entró el pase el martes y la app dice lunes». Una línea de texto responde eso; sin ella lo responde soporte. |
| **Espejo de «Tu economía»** | El mismo componente que se abre desde el chip de saldo, con un segundo punto de entrada. Cuesta cero y sirve al 18% que sí entra al perfil, que es la parte más enganchada de la base. **Nunca como único camino:** la puerta principal sigue siendo el saldo, dentro del reproductor. |

Ninguna de las tres mueve la métrica. Las tres se notan si faltan.

**Y una cuarta, que no es del perfil sino del lanzamiento.** Esta intervención **elimina la pestaña de Recompensas**, y conviene ser preciso sobre qué desaparece y qué no: el anuncio recompensado y su tope de diez diarios **no se tocan** —ya están en el muro, y [I2](#i2--el-muro-muestra-las-salidas-que-ya-existen) los sube al primer renglón—; lo que se retira es **el destino**, con su diálogo de reclamo y su escalera de 450 monedas por semana, que el diseño reemplaza por una de 150 monedas más un pase por noche ([§3](../03-diseno/)). El valor se muda de la moneda al pase, que es lo que crea la cita.

Aun así hay un daño previsible, y es el 19% que hoy sí reclama la recompensa diaria: **se va a encontrar con que ya no hay nada que reclamar.** Objetivamente reciben más que antes —el pase llega solo, sin botón—, pero que te quiten algo no se corrige con aritmética, y es justamente el segmento más enganchado de la base. Un aviso de una sola vez en el reproductor, la primera vez que se acredita una noche: *«Ya no hay que reclamar nada. Tu pase llega solo mientras ves.»* Es el único daño previsible de la migración y la parte más barata de todo I5.

| | |
|---|---|
| **Hipótesis** | El muro no es un final —el anuncio recompensado ya lo abre— pero **ninguna de sus salidas tiene fecha**: el anuncio se puede ver diez veces hoy, la suscripción abre todo, el paquete se compra una vez. Nada obliga a volver mañana, y por eso la economía no mueve el regreso por más monedas que reparta. Convertido en una cita con hora — *"tu próximo episodio se abre hoy a las 21:30, tu hora de siempre"* — el muro pasa a ser el motivo del próximo regreso. Y como la unidad es la noche, los pases se acumulan hasta dos y hay comodín, un usuario de 2.3 días/semana puede sostener una racha sin cambiar de conducta. |
| **Y por qué no lo resuelve el anuncio** | Porque no compiten en lo mismo, y hay que decirlo con los números en contra: el anuncio da **70 episodios por semana** y el Pase, **7**. Como fuente, el Pase es el 10% de lo que ya existe y no hace falta. Lo que el anuncio no da es **una razón para volver un día concreto** —se puede agotar hoy— ni un desbloqueo **sin cortar la historia**: 30 segundos de publicidad a mitad de un cliffhanger es justo lo que la suscripción vende evitar. El Pase no compite por dar más episodios. Compite por dar el de mañana. |
| **Mueve** | **DAU/MAU** (objetivo primario). Racha de 3+: 6% → objetivo 20%. Y la adopción de la fuente gratuita, que hoy es del 19% porque hay un botón de por medio: acreditar al terminar un episodio la lleva a **~100% por construcción**, no por diseño de pantalla. Esa cifra deja de ser una meta y pasa a ser un guardrail — si no llega ahí, la acreditación está rota. |
| **Cómo lo sé** | *Leading (semana 1):* % de muros que terminan en pase usado en vez de cierre. *Leading (semana 2):* % que vuelve dentro de las 36 h de haber usado el pase. *Lagging (semana 4):* DAU/MAU del grupo que recibe el cambio contra un grupo de control que no lo recibe. *Guardrail:* ARPDAU, leído como ingreso por DAU y no como mix de productos: si el mensual en el muro solo canibaliza packs, el mix se mueve y el ingreso no, y eso no es una ganancia. **Criterio de kill:** si ARPDAU cae >8% relativo sostenido 2 semanas, se revierte. |
| **Costo** | ~4–5 semanas (server-authoritative timers, estado de invitado, migración a cuenta). El cuarto cambio no las mueve, y la razón conviene explicitarla: los dos pases ya son productos vivos de la ficha del build 1.20.0, así que no hay config de store que presupuestar —eso sí lo cuesta I3, que redefine qué trae cada pack—, y lo que suma es una opción más dentro de un muro que en esta intervención se reconstruye entero igual. Si enganchar la compra de la suscripción resulta más caro que eso, sale de I5 y se va a la Etapa 3: de los cuatro cambios es el que menos mueve el objetivo. Las cuatro piezas de perfil y de lanzamiento del párrafo anterior entran dentro de esas semanas: ninguna pasa de un día, y quedan contadas acá para que no aparezcan después como alcance no presupuestado. |
| **¿Pasa la pregunta ①?** | ✅ ocurre exactamente en el muro. |

#### I6 · Progreso de serie visible
"Vas 12 de 56". Barra de progreso en el header de la serie y en el muro. Hito visible: *"En el episodio 20 se destraba el resumen de la temporada"*.

| | |
|---|---|
| **Hipótesis** | Nadie quiere avanzar en algo cuyo avance no ve. Hacer visible la posición convierte 44 números grises en un camino. |
| **Mueve** | Episodios por sesión; secundariamente, intención de volver. |
| **Cómo lo sé** | *Leading:* **cuántos episodios ve la gente por sesión.** Si ver el avance empuja a seguir, esa cifra sube antes que ninguna otra. *Lagging:* **qué fracción de usuarios termina una serie**, que es la conducta que la barra de progreso intenta provocar. *Guardrail:* que no baje el número de series distintas empezadas — hacer visible el avance de una no puede cerrar la puerta a probar otra. |
| **Costo** | ~2 semanas. |
| **¿Pasa la pregunta ①?** | ✅ |

---

### Etapa 3 — Convertir el hábito en cuenta y en catálogo (semanas 9–13)

#### I7 · La cuenta se pide cuando hay algo que perder
No hay muro de registro. La cuenta se ofrece en un solo momento: cuando el invitado tiene racha y saldo acumulados. *"Guarda tu racha de 4 noches y tus 45 monedas."*

**Alcance en el perfil.** Pedir la cuenta en el muro obliga a que exista el camino de vuelta, y ese camino no cabe en el muro: **iniciar sesión** desde otro teléfono y **restaurar compras**. Lo segundo no lo inventa esta estrategia: el muro **ya vende el mensual hoy**, y las tiendas exigen un mecanismo de restauración para las suscripciones renovables. O sea que la deuda ya existe; lo que hace I7 es ponerle un sitio. Es soporte, no producto — pero si falta no aparece en el dashboard, aparece en las reseñas de la tienda.

| | |
|---|---|
| **Hipótesis** | 88% consume como invitado porque hoy la cuenta no le da nada. Con racha y saldo, la cuenta pasa a ser un seguro sobre algo que ya siente propio. Ese es el único momento en que registrarse tiene precio emocional. |
| **Mueve** | Cuentas creadas 12% → objetivo 30%. Habilita push (el aviso que llega al teléfono), cross-device (seguir en otro aparato) y medición real de retención. |
| **Cómo lo sé** | *Leading:* conversión del prompt contextual vs. el registro actual. *Lagging:* % con cuenta; D30 (cuántos siguen ahí a los 30 días) de la cohorte que se registró tras el prompt. *Guardrail:* abandono en el momento del prompt no sube. |
| **Costo** | ~3 semanas (merge de estado invitado→cuenta es lo caro). |
| **¿Pasa la pregunta ①?** | ✅ el prompt aparece en el muro, no en un onboarding (la seguidilla de pantallas de bienvenida). |

#### I8 · El pase como puente entre series
Cuando el usuario termina una serie o se queda sin pase, se le ofrece dirigir el pase de mañana a una serie nueva del catálogo. El metajuego pasa a ser también descubrimiento.

| | |
|---|---|
| **Hipótesis** | El 23% que reve series terminadas está buscando dónde gastar atención que hoy no tiene destino. Dirigirlo con el pase convierte rever en descubrir. |
| **Mueve** | Series iniciadas por usuario; DAU/MAU vía más series activas por persona. |
| **Cómo lo sé** | *Leading:* **cuántas series distintas empieza cada usuario por semana.** Es la conducta que la intervención toca directamente, y se mueve en días. *Lagging:* **DAU/MAU**, porque más historias vivas por persona deberían significar más noches con algo esperando. *Guardrail:* que no caiga el porcentaje de series que se terminan — repartir la atención entre más títulos no puede acabar en que no se termine ninguno. |
| **Costo** | ~2 semanas (encima de I5). |
| **¿Pasa la pregunta ①?** | ✅ |

---

## 2.4 La secuencia y por qué es esa

```
Sem  1  2  3  4  5  6  7  8  9  10 11 12 13
I1  ███
I2  ██████
I3     ███
I4        ███
I5           ████████████████
I6                    ██████
I7                          █████████
I8                                ██████
     └ Etapa 1 ┘└── Etapa 2 ──┘└─ Etapa 3 ──┘
```

**Por qué la Etapa 1 va primero aunque su efecto sobre DAU/MAU sea menor.** I1 e I2 son precondiciones del experimento de I5, y por una razón que el muro real hace más urgente, no menos: **la salida gratuita ya está en la pantalla**, así que si el Pase se lanza sin reordenarla antes, la línea base se mide contra un muro donde el usuario no sabe que los anuncios le dan diez episodios más cada día. No habría forma de distinguir "el pase no funciona" de "el usuario nunca leyó lo que ya tenía". Primero se ordena y se traduce el sistema; después se mide la mecánica dentro de él.

**Por qué I5 no va primero pese a ser la apuesta principal.** Cuesta 4–5 semanas y toca timers server-authoritative con estado de invitado. Arrancar el trimestre con lo más caro y lo más lento significa llegar a la semana 9 sin haber aprendido nada. Con la Etapa 1 en producción, I5 arranca con la economía traducida, con la salida gratuita del muro ya visible y medida, y con una línea base limpia.

**Por qué I7 va al final.** Pedir cuenta antes de que exista racha es pedirla sin argumento. La cuenta es la consecuencia de I5, no su requisito — por eso I5 tiene que funcionar para invitados.

## 2.5 Viabilidad: lo que sí y lo que no cabe en un trimestre

| | Cabe | Riesgo |
|---|---|---|
| I1, I3, I4, I6 | Sí, cómodo | Bajo. Son copy, config y un componente. |
| I2 | Sí, es lo más barato del trimestre | Bajo en lo técnico: el anuncio ya está en el muro y ya escribe en el ledger, así que es orden y copy dentro de una hoja que existe. El riesgo es **de negocio**: el Pase Idilio vende *«sin anuncios»* y esto sube el anuncio al primer renglón (ver el aviso bajo I2). |
| **I5** | Sí, es el grueso del trimestre | **Alto.** Ver abajo. |
| I7 | Ajustado | Alto: el merge invitado→cuenta sin perder saldo es la parte que históricamente rompe. Si aprieta, se corre al Q siguiente. |
| I8 | Solo si I5 salió limpio | Depende de I5. |

**Los tres riesgos de I5, declarados por adelantado:**

1. **El reloj no puede vivir en el dispositivo.** Un countdown en cliente se vulnera cambiando la hora del teléfono. Necesita ser server-authoritative, con el cliente mostrando un delta contra `server_time`. Presupuestado dentro de las 4–5 semanas.
2. **La ventana de 5 a.m. necesita zona horaria del usuario, no del servidor.** MX, CO y US-Hispano cruzan cuatro husos horarios. Si el corte se calcula en UTC, a un usuario de Los Ángeles se le rompe la racha a las 10 p.m. Esto es una decisión de producto disfrazada de detalle técnico y hay que resolverla antes de escribir el primer endpoint.
3. **Push es el 40% del valor del pase, y hoy no está disponible para el 88%.** **Ese 40% es una estimación, no un dato medido:** no hay medición de push en este producto, y la cifra sale del argumento, no de una fuente. Un pase con countdown y sin notificación que avise que ya está listo pierde buena parte de su efecto, y sin cuenta no hay push confiable. **Mitigación:** en Etapa 2 se usa push anónimo por token de dispositivo (un identificador del teléfono, sin cuenta detrás) (iOS y Android lo permiten sin cuenta), y se acepta que el valor completo llega recién con I7.

## 2.6 Qué queda deliberadamente afuera

| Descartado | Por qué |
|---|---|
| Rediseño de la sección de perfil | 82% nunca entra. No se arregla un cuarto amoblándolo — y el argumento más fuerte no es ese 82% sino el 81%, que dice algo peor: la recompensa diaria **se le pone delante** al usuario, en un diálogo ineludible al abrir la app, y cuatro de cada cinco la cierran igual ([diagnóstico F1](../01-diagnostico/#f1--la-economía-está-a-la-vista-y-ordenada-al-revés)). Si descartan dinero gratis que tienen en la cara, unas estadísticas que hay que ir a buscar no tienen ninguna chance. El 82% no es síntoma de un perfil vacío, es síntoma de que en esta sesión —entrar de madrugada, tocar «seguir viendo», cerrar— no hay ningún momento de navegación. *Queda descartado el rediseño, no la sección:* I5 e I7 sí tocan el perfil, con cuatro piezas chicas que no son engagement sino consecuencia —interruptor de avisos, la línea de la noche, el espejo de «Tu economía» y restaurar compras—. Van listadas dentro de cada intervención, y no como una novena, porque darles entidad propia contradiría la pregunta ① de [§2.2](#22-criterio-de-priorización). |
| Rankings, tablas, comparación social | 11 p.m.–2 a.m., consumo solitario, vertical con pudor, 88% sin identidad. No es motivación, es exposición. |
| Insignias y coleccionables como apuesta principal | Vínculo indirecto con DAU/MAU, carga cognitiva alta, sin evidencia de motivación de coleccionista. Candidatos a capa posterior. |
| Anuncios recompensados **como fuente nueva** | No hay nada que introducir: **el producto ya los tiene** — 15 monedas por anuncio, tope de 10 diarios, o sea hasta 70 episodios gratis por semana ([diagnóstico F1](../01-diagnostico/#f1--la-economía-está-a-la-vista-y-ordenada-al-revés)). La pregunta deja de ser si adoptarlos y pasa a ser dónde se ofrecen, que es lo que hace [I2](#i2--el-muro-muestra-las-salidas-que-ya-existen). Lo que sí queda afuera es **subir el tope diario**: con la fuente ya duplicando el consumo, más volumen no compra más regreso — compra menos motivo para pagar. |
| Suscripción **como mecánica de retención** | Ya existe en el producto —pase semanal a $ 12.500 COP, mensual a $ 24.500 COP— y ya se ofrece en el muro, y es una respuesta de monetización a un problema de retención: no mueve DAU/MAU del no-pagador, que es el 95%+ de la base. Por eso queda fuera como palanca del objetivo del trimestre. Como **superficie** ya está resuelta por el producto: encabeza el muro, con el mensual marcado *RECOMENDADO*. Así que acá no hay nada que agregar — hay que **moverla de renglón**, y esa es la única decisión abierta: [I5](#i5--el-pase-de-la-noche--la-racha-de-noches-) la baja debajo del pase y del anuncio, para que lo primero que vea alguien a quien le faltan quince monedas no sea una compra de $ 24.500. Descartarla como motor de regreso no obliga a esconderla como opción de compra: son dos decisiones distintas y se resuelven distinto. |
| **Recortar los episodios gratis del catálogo** | Es la palanca más pesada de toda la economía —500 episodios gratis, casi cuatro meses de consumo sin pagar— y está a una decisión de distancia. Pero es una palanca de **conversión**, no de stickiness: recortarla no hace que el usuario vuelva mañana, hace que se vaya antes. Y toca directamente el motor de adquisición. Queda señalada en el [diagnóstico §1.4](../01-diagnostico/#14-una-palanca-fuera-del-alcance-de-este-objetivo) porque quien lea esto debe saber que existe, y queda sin accionar porque el objetivo del ejercicio es DAU/MAU. |
