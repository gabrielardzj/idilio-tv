# 2. Estrategia

## 2.1 La tesis

> El metajuego de Idilio existe, pero vive en una pestaña. El core loop (lo que el usuario hace una y otra vez) vive en el player. **La estrategia entera consiste en mudar el metajuego al lugar donde el usuario ya está**, y en cambiar la unidad de todo — de monedas a episodios, de días calendario a noches — para que hable el idioma del producto.

No propongo agregar mecánicas. Propongo **re-situar y re-denominar** las que ya existen, y recién después agregar.

## 2.2 Criterio de priorización

Ordeno con tres preguntas, en este orden. La primera es una compuerta, no un factor.

**① ¿Ocurre dentro del core loop?**
Si la intervención requiere que el usuario navegue a una pestaña, baja al último lugar sin importar qué tan buena sea. El 82% que nunca abre perfil y el 81% que no reclama la recompensa son la misma persona diciendo lo mismo: *no voy a ir a buscarlo*.

**② Alcance × Efecto ÷ Costo.**
Alcance = fracción de DAU que la ve sin buscarla. Efecto = magnitud esperada sobre DAU/MAU. Costo = semanas de equipo.

**③ ¿Se puede medir en 4 semanas?**
Prefiero una intervención con lectura rápida sobre una con efecto mayor y lectura a 90 días. En un trimestre necesito dos ciclos de aprendizaje, no uno.

## 2.3 El portafolio

Ocho intervenciones, tres olas. Cada una: hipótesis → qué mueve → cómo lo sé.

---

### Ola 1 — Hacer legible y accesible lo que ya existe (semanas 1–4)

Nada de esto inventa economía. Todo es re-situar y re-denominar. Es la ola más barata y la de mayor alcance.

#### I1 · La moneda habla en episodios
Cada cifra de monedas del producto lleva su traducción a episodios. `180` pasa a ser `180 monedas · 12 episodios`. El paywall (el muro de pago) abre con *"Te falta 1 episodio"*, no con *"Tu balance: 0"*.

| | |
|---|---|
| **Hipótesis** | El usuario no rechaza el precio: no lo puede calcular. Dándole la unidad que le importa, decide — y decidir, aunque sea que no, es mejor que abandonar. |
| **Mueve** | Comprensión de la economía (objetivo de experiencia). Secundariamente conversión a pagador. |
| **Cómo lo sé** | *Leading* —la señal temprana, la que se mueve en días—: tasa de interacción con el muro (hoy: cuántos tocan algo vs. cuántos cierran). *Lagging* —la señal tardía, la que confirma—: conversión a primera compra. *Guardrail* —la métrica de guardia, la que dice cuándo parar—: ARPDAU (ingreso promedio por usuario activo al día) no cae. |
| **Costo** | ~1 semana. Es copy y un componente. |
| **Compuerta ①** | ✅ ocurre en el muro, dentro del loop. |

#### I2 · El sumidero es también la fuente
La recompensa diaria se reclama **dentro del muro de desbloqueo**. Deja de ser un destino y pasa a ser una opción en el momento de necesidad.

| | |
|---|---|
| **Hipótesis** | El 81% que no reclama no la rechaza: no la encuentra. Ofrecida en el segundo en que le faltan 15 monedas, la tasa de reclamo se multiplica. |
| **Mueve** | Reclamo diario 19% → objetivo 55%+. Vía reclamo, DAU/MAU. |
| **Cómo lo sé** | *Leading:* % de DAU que reclama. *Lagging:* DAU/MAU. *Guardrail:* ARPDAU y % de pagadores no caen más de 5% relativo. |
| **Costo** | ~2 semanas. |
| **Compuerta ①** | ✅ |

#### I3 · La escalera de precios vuelve a ser una escalera
Diferenciar los dos paquetes de 180 monedas (hoy $0.99 y $1.99 dan lo mismo). Dar mejora real de valor por escalón. Reservar el badge de descuento para descuentos reales.

| | |
|---|---|
| **Hipótesis** | Dos paquetes idénticos a distinto precio se leen como error o como trampa; y sin mejora por volumen no hay razón para subir de escalón. Arreglar la escalera sube el ticket promedio sin tocar el tráfico. |
| **Mueve** | Valor de la primera compra, ARPPU. No mueve DAU/MAU — entra igual porque cuesta poco y protege el resto. |
| **Cómo lo sé** | *Leading:* mix de paquetes comprados. *Lagging:* ARPPU. |
| **Costo** | ~1 semana + config de store. |
| **Compuerta ①** | ✅ |

#### I4 · Continuidad web → app
El link compartido de idilio.tv abre la app **en ese episodio de esa serie**, no en el home. Hoy el muro web solo ofrece "Descargar la app" y el contexto se pierde.

| | |
|---|---|
| **Hipótesis** | El compartir ya existe y funciona; lo que se rompe es el aterrizaje. Un deferred deep link (el enlace que sobrevive a la instalación y abre la app justo en el episodio compartido) recupera intención que hoy se tira. |
| **Mueve** | Instalaciones activadas, y el primer episodio visto post-install. |
| **Cómo lo sé** | *Leading:* % de installs desde link que llegan al episodio correcto. *Lagging:* D1 (cuántos vuelven al día siguiente) de la cohorte (el grupo que entró por ahí) de link compartido. |
| **Costo** | ~1 semana (Branch/AppsFlyer o Universal Links propios). |
| **Compuerta ①** | ✅ |

---

### Ola 2 — Cambiar la unidad del regreso (semanas 4–9) ← **la intervención profunda**

#### I5 · El Pase de la Noche + la Racha de Noches ⭐
**Es la intervención que llevo a diseño y POC.** Detalle completo en [`docs/03-diseno`](../03-diseno/).

Cuatro cambios acoplados:

1. **Pase de la Noche.** Se emite uno por noche —tope de 7 por semana—, se entrega solo al terminar un episodio y se acumula hasta dos. *El usuario elige a qué serie se lo da*, y esa elección ocurre dentro del muro. **No hay nada que reclamar:** el botón entre el usuario y algo que ya se ganó es justamente lo que deja el reclamo diario en 19%.
2. **La unidad es la noche, no el día.** La ventana corre de 5 a.m. a 5 a.m. Ver a las 00:30 y a las 23:30 del mismo martes cuenta como dos noches, no como una.
3. **Comodín.** Al llegar a la noche 3 se gana un escudo que se consume solo cuando se pierde una noche. Uno por semana.
4. **Una corrección al muro, que es donde ocurren los otros tres.** Idilio ya vende un pase semanal a $7.99 y uno mensual a $14.99 —la ficha de App Store del build 1.20.0 los lista, [benchmark §5.1](../05-benchmark/#51--qué-es-idilio-tv-con-los-datos-que-el-brief-no-traía)— y el muro no ofrece ninguno de los dos: el producto de mayor valor de la economía no aparece en el momento de máxima intención. **Propongo agregarle al muro una tercera opción de desbloqueo**, debajo del pase y del pack de monedas, y propongo que sea el **mensual**, no el semanal. El semanal cuesta $7.99, y terminar la serie mediana comprándola —40 episodios bloqueados × 15 monedas = 600 monedas— sale ≈ $6.63: poner el semanal ahí es ofrecer el peor negocio de la pantalla justo en la única pantalla donde el usuario está comparando precios. El orden no se negocia y es el de [D2 del diseño](../03-diseno/): lo gratis arriba de lo pago, el pase primero. Así el muro quedaría con tres opciones de desbloqueo, donde el del build 1.20.0 tiene cuatro packs de monedas y nada más. Y ofrecer ahí la suscripción no es proponerla como mecánica de retención —eso sigue descartado en [§2.6](#26-qué-queda-deliberadamente-afuera)—: es proponerla como superficie, o sea dejar de esconder lo que el producto ya vende en el segundo en que el usuario está decidiendo cuánto vale un episodio.

*Acá decía, en presente, que «el muro rediseñado muestra las tres». Estaba mal: no es cierto en ningún artefacto de este repo —ni el diseño de [§3](../03-diseno/) ni el POC tienen suscripción; tienen el pase y la compra de monedas—, así que era una propuesta escrita como un hecho que el evaluador desmentía con solo seguir el link. Es una propuesta. Y admitirlo obliga a contar cuatro cambios en I5, no tres.*

**Y una consecuencia que conviene presupuestar en vez de descubrir: I5 toca el perfil.** No como rediseño —eso sigue descartado en [§2.6](#26-qué-queda-deliberadamente-afuera), y por la misma razón de siempre— sino porque hay tres piezas de esta intervención que no tienen ningún otro sitio donde vivir:

| Pieza | Por qué cae dentro de I5 |
|---|---|
| **Interruptor del aviso del pase** | La cita manda una notificación. Si no hay dónde apagarla dentro de la app, el usuario la apaga desde los ajustes del sistema — y ahí las pierde todas, para siempre y sin vuelta atrás. Es la diferencia entre *«no me avises tanto»* y *«silenciado»*. |
| **La línea que explica la noche** | *«Tu noche va de 5 a.m. a 5 a.m.»* Suena a detalle técnico y no lo es: con la base repartida en cuatro husos, alguien va a escribir «me entró el pase el martes y la app dice lunes». Una línea de texto responde eso; sin ella lo responde soporte. |
| **Espejo de «Tu economía»** | El mismo componente que se abre desde el chip de saldo, con un segundo punto de entrada. Cuesta cero y sirve al 18% que sí entra al perfil, que es la parte más enganchada de la base. **Nunca como único camino:** la puerta principal sigue siendo el saldo, dentro del reproductor. |

Ninguna de las tres mueve la métrica. Las tres se notan si faltan.

**Y una cuarta, que no es del perfil sino del lanzamiento.** Esta intervención elimina la pestaña de Recompensas, y **el 19% que hoy sí la usa se va a encontrar con que no está.** Objetivamente reciben más que antes —el pase llega solo y no hay nada que reclamar—, pero que te quiten algo no se corrige con aritmética, y es justamente el segmento más enganchado de la base. Un aviso de una sola vez en el reproductor, la primera vez que se acredita una noche: *«Ya no hay que reclamar nada. Tu pase llega solo mientras ves.»* Es el único daño previsible de la migración y la parte más barata de todo I5.

| | |
|---|---|
| **Hipótesis** | El muro es hoy un final. Convertido en una cita con hora — *"tu próximo episodio se abre hoy a las 21:30, tu hora de siempre"* — deja de ser el final de la relación y pasa a ser el motivo del próximo regreso. Y como la unidad es la noche, los pases se acumulan hasta dos y hay comodín, un usuario de 2.3 días/semana puede sostener una racha sin cambiar de conducta. |
| **Mueve** | **DAU/MAU** (objetivo primario). Racha de 3+: 6% → objetivo 20%. Reclamo diario: 19% → 55%+. |
| **Cómo lo sé** | *Leading (semana 1):* % de muros que terminan en pase usado en vez de cierre. *Leading (semana 2):* % que vuelve dentro de las 36 h de haber usado el pase. *Lagging (semana 4):* DAU/MAU de la celda tratada vs. holdout. *Guardrail:* ARPDAU, leído como ingreso por DAU y no como mix de productos: si el mensual en el muro solo canibaliza packs, el mix se mueve y el ingreso no, y eso no es una ganancia. **Criterio de kill:** si ARPDAU cae >8% relativo sostenido 2 semanas, se revierte. |
| **Costo** | ~4–5 semanas (server-authoritative timers, estado de invitado, migración a cuenta). El cuarto cambio no las mueve, y digo por qué en vez de dejarlo implícito: los dos pases ya son productos vivos de la ficha del build 1.20.0, así que no hay config de store que presupuestar —eso sí lo cuesta I3, que redefine qué trae cada pack—, y lo que suma es una opción más dentro de un muro que en esta intervención se reconstruye entero igual. Si enganchar la compra de la suscripción resulta más caro que eso, sale de I5 y se va a la Ola 3: de los cuatro cambios es el que menos mueve el objetivo. Las cuatro piezas de perfil y de lanzamiento del párrafo anterior entran dentro de esas semanas: ninguna pasa de un día, y las cuento acá para que no aparezcan después como alcance no presupuestado. |
| **Compuerta ①** | ✅ ocurre exactamente en el muro. |

#### I6 · Progreso de serie visible
"Vas 12 de 56". Barra de progreso en el header de la serie y en el muro. Hito visible: *"En el episodio 20 se destraba el resumen de la temporada"*.

| | |
|---|---|
| **Hipótesis** | Nadie quiere avanzar en algo cuyo avance no ve. Hacer visible la posición convierte 44 números grises en un camino. |
| **Mueve** | Episodios por sesión; secundariamente, intención de volver. |
| **Cómo lo sé** | *Leading:* episodios/sesión. *Lagging:* % de usuarios que completan una serie. |
| **Costo** | ~2 semanas. |
| **Compuerta ①** | ✅ |

---

### Ola 3 — Convertir el hábito en cuenta y en catálogo (semanas 9–13)

#### I7 · La cuenta se pide cuando hay algo que perder
No hay muro de registro. La cuenta se ofrece en un solo momento: cuando el invitado tiene racha y saldo acumulados. *"Guarda tu racha de 4 noches y tus 45 monedas."*

**Alcance en el perfil.** Pedir la cuenta en el muro obliga a que exista el camino de vuelta, y ese camino no cabe en el muro: **iniciar sesión** desde otro teléfono y **restaurar compras**. Lo segundo deja de ser opcional en cuanto el muro ofrece el mensual ([I5, cuarto cambio](#i5--el-pase-de-la-noche--la-racha-de-noches-)): las tiendas exigen un mecanismo de restauración para las suscripciones renovables. Es soporte, no producto — pero si falta no aparece en el dashboard, aparece en las reseñas de la tienda.

| | |
|---|---|
| **Hipótesis** | 88% consume como invitado porque hoy la cuenta no le da nada. Con racha y saldo, la cuenta pasa a ser un seguro sobre algo que ya siente propio. Ese es el único momento en que registrarse tiene precio emocional. |
| **Mueve** | Cuentas creadas 12% → objetivo 30%. Habilita push (el aviso que llega al teléfono), cross-device (seguir en otro aparato) y medición real de retención. |
| **Cómo lo sé** | *Leading:* conversión del prompt contextual vs. el registro actual. *Lagging:* % con cuenta; D30 (cuántos siguen ahí a los 30 días) de la cohorte que se registró tras el prompt. *Guardrail:* abandono en el momento del prompt no sube. |
| **Costo** | ~3 semanas (merge de estado invitado→cuenta es lo caro). |
| **Compuerta ①** | ✅ el prompt aparece en el muro, no en un onboarding (la seguidilla de pantallas de bienvenida). |

#### I8 · El pase como puente entre series
Cuando el usuario termina una serie o se queda sin pase, se le ofrece dirigir el pase de mañana a una serie nueva del catálogo. El metajuego pasa a ser también descubrimiento.

| | |
|---|---|
| **Hipótesis** | El 23% que reve series terminadas está buscando dónde gastar atención que hoy no tiene destino. Dirigirlo con el pase convierte rever en descubrir. |
| **Mueve** | Series iniciadas por usuario; DAU/MAU vía más series activas por persona. |
| **Cómo lo sé** | *Leading:* series distintas iniciadas/usuario/semana. *Lagging:* DAU/MAU. |
| **Costo** | ~2 semanas (encima de I5). |
| **Compuerta ①** | ✅ |

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
     └── Ola 1 ──┘└──── Ola 2 ────┘└─ Ola 3 ─┘
```

**Por qué la Ola 1 va primero aunque su efecto sobre DAU/MAU sea menor.** I1 e I2 son precondiciones del experimento de I5. Si el Pase de la Noche se lanza sobre una economía cuya moneda el usuario no sabe leer, no voy a poder distinguir "el pase no funciona" de "el usuario no entendió qué le dieron". Primero hago legible el sistema; después mido la mecánica dentro de él.

**Por qué I5 no va primero pese a ser la apuesta principal.** Cuesta 4–5 semanas y toca timers server-authoritative con estado de invitado. Arrancar el trimestre con lo más caro y lo más lento significa llegar a la semana 9 sin haber aprendido nada. Con la Ola 1 en producción, llego a I5 con la economía legible, con el reclamo diario ya subido, y con una línea base limpia.

**Por qué I7 va al final.** Pedir cuenta antes de que exista racha es pedirla sin argumento. La cuenta es la consecuencia de I5, no su requisito — por eso I5 tiene que funcionar para invitados.

## 2.5 Viabilidad: lo que sí y lo que no cabe en un trimestre

| | Cabe | Riesgo |
|---|---|---|
| I1, I3, I4, I6 | Sí, cómodo | Bajo. Son copy, config y un componente. |
| I2 | Sí | Medio: exige que el ledger de monedas acepte una escritura desde el player. |
| **I5** | Sí, es el grueso del trimestre | **Alto.** Ver abajo. |
| I7 | Ajustado | Alto: el merge invitado→cuenta sin perder saldo es la parte que históricamente rompe. Si aprieta, se corre al Q siguiente. |
| I8 | Solo si I5 salió limpio | Depende de I5. |

**Los tres riesgos reales de I5, dichos ahora y no después:**

1. **El reloj no puede vivir en el dispositivo.** Un countdown en cliente se vulnera cambiando la hora del teléfono. Necesita ser server-authoritative, con el cliente mostrando un delta contra `server_time`. Presupuestado dentro de las 4–5 semanas.
2. **La ventana de 5 a.m. necesita zona horaria del usuario, no del servidor.** MX, CO y US-Hispano cruzan cuatro husos. Si el corte se calcula en UTC, a un usuario de Los Ángeles se le rompe la racha a las 10 p.m. Esto es una decisión de producto disfrazada de detalle técnico y hay que resolverla antes de escribir el primer endpoint.
3. **Push es el 40% del valor del pase, y hoy no está disponible para el 88%.** Ese 40% es una estimación mía y no un dato medido: no hay medición de push en este producto y no la voy a inventar. Un pase con countdown y sin notificación que avise que ya está listo pierde buena parte de su efecto, y sin cuenta no hay push confiable. **Mitigación:** en Ola 2 se usa push anónimo por token de dispositivo (un identificador del teléfono, sin cuenta detrás) (iOS y Android lo permiten sin cuenta), y se acepta que el valor completo llega recién con I7.

## 2.6 Qué queda deliberadamente afuera

| Descartado | Por qué |
|---|---|
| Rediseño de la sección de perfil | 82% nunca entra. No se arregla un cuarto amoblándolo — y el argumento más fuerte no es ese 82% sino el 81%: la pestaña de Recompensas **regala monedas** y cuatro de cada cinco usuarios no van. Si no navegan por dinero gratis, tampoco van a navegar por unas estadísticas. El 82% no es síntoma de un perfil vacío, es síntoma de que en esta sesión —entrar de madrugada, tocar «seguir viendo», cerrar— no hay ningún momento de navegación. *Descarto el rediseño, no la sección:* I5 e I7 sí tocan el perfil, con cuatro piezas chicas que no son engagement sino consecuencia —interruptor de avisos, la línea de la noche, el espejo de «Tu economía» y restaurar compras—. Van listadas dentro de cada intervención, y no como una novena, porque darles entidad propia contradiría la compuerta ① de [§2.2](#22-criterio-de-priorización). |
| Rankings, tablas, comparación social | 11 p.m.–2 a.m., consumo solitario, vertical con pudor, 88% sin identidad. No es motivación, es exposición. |
| Insignias y coleccionables como apuesta principal | Vínculo indirecto con DAU/MAU, carga cognitiva alta, sin evidencia de motivación de coleccionista. Candidatos a capa posterior. |
| Anuncios recompensados como fuente | Es la fuente obvia y ya es estándar de la categoría: DramaBox permite hasta 15 anuncios diarios ≈ 30 monedas, y ReelShort también los ofrece. Pero cambia la naturaleza del producto (de corto-premium a ad-supported) y ese es un llamado de negocio, no de diseño. Lo señalo, no lo decido. La cifra de DramaBox es de fuente secundaria —una guía de terceros, no la app— y queda por verificar; la uso porque es la mejor que encontré. Acá decía además «unos 6 episodios gratis por día» y lo saqué: no hay precio por episodio de DramaBox en ninguna de las fuentes que junté, así que esa conversión no salía de ningún lado. |
| Suscripción **como mecánica de retención** | Ya existe en el producto —pase semanal a $7.99, mensual a $14.99— y es una respuesta de monetización a un problema de retención: no mueve DAU/MAU del no-pagador, que es el 95%+ de la base. Por eso no la propongo como palanca del objetivo del trimestre. Lo que sí propongo, y no es lo mismo, es ofrecerla **como superficie**: que el mensual aparezca en el muro, debajo del pase, porque hoy el producto de mayor valor de la economía no está en el momento de máxima intención ([I5](#i5--el-pase-de-la-noche--la-racha-de-noches-)). Descartarla como motor de regreso no obliga a esconderla como opción de compra: son dos decisiones distintas y las tomo distinto. |
| **Recortar los episodios gratis del catálogo** | Es la palanca más pesada de toda la economía —500 episodios gratis, casi cuatro meses de colchón— y está a una decisión de distancia. Pero es una palanca de **conversión**, no de stickiness: recortarla no hace que el usuario vuelva mañana, hace que se vaya antes. Y toca directamente el motor de adquisición. La señalo en el [diagnóstico §1.4](../01-diagnostico/#14-una-tensión-que-señalo-y-no-resuelvo) porque quien lea esto debe saber que existe. No la acciono porque el objetivo del ejercicio es DAU/MAU. |
