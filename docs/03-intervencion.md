# 3 · Intervención en profundidad — **Racha de Noches**

> El muro de desbloqueo deja de ser un callejón sin salida y pasa a ser la única superficie donde el usuario ve, junto y en el momento en que le importa: **cuánto tiene, de dónde sale lo que no compró, cuánto le falta, y qué pasa si vuelve mañana.**

---

## 3.1 La decisión que cambia todo: se elimina el "reclamar"

Hoy la recompensa diaria hay que **ir a buscarla** al perfil y **reclamarla**. El 19% lo hace. El diagnóstico (§1.2, señal 2) mostró que quien la encuentra la sostiene: no es un problema de motivación, es **un paso de más en un lugar que nadie visita**.

**Rediseño:** la racha **no se reclama. Se acredita por ver.**

```
ANTES:  abrir app → ir a perfil → encontrar el módulo → tocar "Reclamar" → +monedas
                    └─────────── aquí se pierde el 81% ───────────┘

AHORA:  abrir app → ver un episodio → la noche ya cuenta
```

Esto no es una mejora incremental de una pantalla. Es mover la fuente **desde una acción que hay que descubrir hasta una acción que el usuario ya hace todas las sesiones**. Por construcción, la adopción de la fuente pasa de ~19% a ~100% de quien ve un episodio: es la misma acción.

> **Autocrítica.** ¿Se devalúa la recompensa si no cuesta nada obtenerla? Es el riesgo real. Se mitiga con dos cosas: (a) el requisito no es *abrir*, es **terminar un episodio** — una acción con costo real de atención y correlacionada con el valor; (b) la recompensa **escala con la racha** (§3.3), así que lo que se gana el día 5 no es lo que se gana el día 1. La escasez se mueve del acto de reclamar a la **constancia**, que es lo que de verdad queremos premiar.

---

## 3.2 La segunda decisión: se cuentan **noches**, no días

**[dato]** 54% de las sesiones ocurren entre 11pm y 2am.

Un contador de **días** que corta a medianoche parte por la mitad la ventana principal de consumo. Un usuario que entra a las 00:10 am cree haber entrado "esta noche"; el sistema le rompe la racha por diez minutos.

La corrección técnica es mover el corte a las **4:00 am hora local**. Pero una corrección técnica que contradice el nombre de la cosa se siente como un bug. Si el contador dice "días" y el día cierra a las 4am, el usuario no lo entiende.

**Por eso el contador dice noches.** *"Noche 3"*. Con ese nombre, que una noche termine a las 4am no hay que explicarlo: **ya es como funcionan las noches.**

> Esto es lo que quiere decir que el metajuego se integre "con la menor carga posible": la carga de aprendizaje más barata es la que no existe porque el nombre ya la resolvió. Y de paso, alinea la mecánica con la identidad real del producto — Idilio es una app que se ve de noche.

---

## 3.3 La economía: qué se entrega, cuánto y por qué

### Lo que se gana **no es moneda**

**Principio P3 del §2.** Lo ganado son **capítulos de la casa**: acceso, no saldo.

| | Monedas (compradas) | Capítulos de la casa (ganados) |
|---|---|---|
| Se acumulan | ✅ sí | ❌ **no** |
| Caducan | ❌ no | ✅ **al cerrar la noche (4am)** |
| Sirven para | cualquier episodio | cualquier episodio |
| Se pueden ahorrar para una compra futura | ✅ | ❌ |

**Por qué no regalar monedas** (que es exactamente lo que piden las reseñas): una moneda regalada es fungible con una comprada. El usuario aprende a **esperar en vez de pagar**, y cada moneda regalada desplaza ingreso 1:1. Un capítulo que caduca esta noche no compite con un paquete de monedas: **no se puede guardar, así que solo tiene un uso posible — hoy.**

### La tabla de recompensas está construida sobre el dato del 2,4×

| Noche | Capítulos de la casa | Extra | Por qué |
|---|---|---|---|
| 1 | **1** | — | El costo de entrada a la mecánica es cero. Se gana solo por ver, que es lo que ya venías a hacer. |
| 2 | **2** | — | Primer refuerzo. Duplicar es la progresión más legible que existe. |
| 3 | **3** | 🛡️ **Escudo** + oferta de cuenta | **Aquí está el 2,4× de D30.** Es el punto de la curva donde el producto más gana, así que es donde se pone el premio más grande y donde por primera vez se pide algo (la cuenta). |
| 4–6 | **3** | — | Meseta deliberada: la racha ya no crece sola, hay que llegar a la noche 7. |
| 7 | **5** | 🛡️ Escudo se repone | Cierre de ciclo semanal. Se reinicia el ciclo manteniendo el contador de noches. |
| 8+ | ciclo de 7 | | El contador de noches nunca se reinicia; lo que se repite es el ciclo de recompensa. |

### La cuenta que hace que esto no canibalice

Apetito observado: **14 episodios por sesión** ([dato]). Techo del regalo: **5 capítulos por noche**, y solo a partir de la noche 7.

```
Apetito de sesión:        ██████████████  14 episodios
Regalo máx. (noche 7):    █████            5 episodios
Brecha que sigue siendo de pago:  9 episodios  ── el 64% del apetito
```

**La fuente gratuita cubre la entrada, nunca la comida.**

### El argumento que invierte la objeción

La objeción estándar es *"regalar acceso canibaliza la compra"*. En este diseño es al revés, y se puede razonar:

> Un usuario que **no vuelve** choca con **cero** muros de pago.
> Un usuario que vuelve **cinco noches seguidas** choca con **cinco**.

Cada capítulo de la casa te mete más profundo en una serie que ya te enganchó y **te deja otra vez frente al muro, con más deseo que antes**, porque los microdramas terminan en cliffhanger por construcción. La fuente ganada no reduce las ocasiones de compra: **las fabrica**.

Esto es una hipótesis, no un teorema, y por eso el A/B de I2 (§2.2) compara el pase caducable contra monedas equivalentes midiendo **sesiones/semana y conversión a pagador en las dos ramas**. Si las monedas ganan en ambas, este argumento estaba mal y hay que rehacer la economía.

---

## 3.4 El escudo (streak freeze)

**El problema documentado:** las rachas fallan por el *abstinence violation effect* — cuando se rompen, el usuario no reintenta, abandona. El contador rígido convierte la aversión a la pérdida, que era el motor, en la razón para irse.

**Reglas:**
- Se **gana** en la noche 3. **Nunca se compra.**
- Máximo **1 acumulado** (2 si se llega a noche 7).
- Se consume **automáticamente**, sin preguntar.
- Se avisa **después**, no antes: *"Anoche no viniste. Usamos tu escudo — tu racha sigue en 5 noches."*

**Por qué no se vende:** si el escudo se compra, la racha deja de significar constancia y pasa a significar poder adquisitivo. En ese momento el número deja de tener sentido para todo el mundo, incluido quien lo compra. Es una decisión de **integridad de la mecánica** que renuncia explícitamente a un ingreso disponible.

---

## 3.5 El invitado (88% de la base)

Todo lo anterior funciona **sin cuenta**, desde el primer episodio. Estado en el dispositivo.

La cuenta se ofrece **una sola vez**, en la **noche 3**, y con este encuadre:

> **"Tu racha de 3 noches vive solo en este teléfono."**
> Guárdala · *(Apple · Google · correo)*
> `Ahora no`

No dice "crea tu cuenta para desbloquear beneficios". Dice **qué se pierde**. Y llega justo cuando por primera vez hay algo real que perder — que es también la noche en que se entregó el premio más grande.

**Guardarraíl:** si tras el prompt caen los *episodios por sesión*, el momento estaba mal elegido y se retrasa a la noche 5. La conversión a cuenta **no puede comprarse con consumo**.

---

## 3.6 Anatomía de la pantalla

**No es una pantalla. Es un `bottom sheet` sobre el frame congelado del cliffhanger.**

Decisión deliberada: el video **no** se reemplaza, se **pausa y difumina** detrás del sheet. El deseo tiene que seguir visible mientras se lee la economía. Sacar al usuario a una pantalla de tienda rompe exactamente la tensión que hace que quiera pagar.

Orden vertical, y el orden **es** el argumento:

| # | Bloque | Qué responde | Por qué va ahí |
|---|---|---|---|
| 1 | Frame difuminado + `Episodio 11 · Tres Meses de Amor` | *¿Qué quiero?* | El deseo primero. Nunca se pierde de vista. |
| 2 | **`Vas 10 de 30`** + barra | *¿Dónde estoy?* | El "posición en el sistema de progresión" del brief. Contexto antes que precio. |
| 3 | **`Ver gratis`** · Capítulo de la casa · `1 de 1` | *¿Puedo seguir ahora?* | **La respuesta es sí.** Es lo primero accionable y es gratis. Aquí se rompe con el muro actual, que empieza por el precio. |
| 4 | 🔥 **`Noche 1`** · ● ○ ○ ○ ○ ○ ○ + *"Vuelve mañana y son 2"* | *¿Qué gano si vuelvo?* | La promesa de retorno, **inmediatamente después de haber recibido algo**. Reciprocidad, no exigencia. |
| 5 | `Tienes 0 🪙 · cada capítulo cuesta 15` → **`Conseguir monedas`** | *¿Y si quiero más ahora?* | El precio va **después** de que el usuario ya entendió que hay una vía gratuita. Quien compra aquí compra por impaciencia, no por bloqueo. |
| 6 | *"Tu próximo capítulo de la casa llega mañana a las 8pm"* + `Avísame` | *¿Cuándo vuelvo?* | Cita explícita. Sin esto, la mecánica de retorno depende de que el usuario se acuerde. |

**Lo que se enseña sin decirlo:** en un solo sheet aparecen las **dos fuentes** (ganada y comprada), el **sumidero** (15/episodio), el **saldo** y la **posición** (10 de 30). Es la definición literal del objetivo de experiencia del brief, entregada en la superficie que ve el 100% de la base.

---

## 3.7 Estados (los que se construyen en el POC)

| # | Estado | Disparador | Qué cambia |
|---|---|---|---|
| **A** | Invitado · noche 1 · sin monedas · pase disponible | Primer muro | CTA primario = `Ver gratis`. Precio en secundario. |
| **B** | Pase ya usado esta noche · sin monedas | Segundo muro de la noche | CTA primario pasa a `Conseguir monedas`. Aparece la cita: *"mañana a las 8pm"*. **Este es el estado que monetiza.** |
| **C** | Pase usado · con saldo suficiente | Usuario con monedas | CTA primario = `Desbloquear por 15 🪙`. Saldo se descuenta con animación. |
| **D** | Noche 2 | Vuelve al día siguiente | Contador ●●○○○○○, `2 de 2` pases, copy *"y mañana son 3"*. |
| **E** | Noche 3 — hito | Tercera noche | 3 pases + 🛡️ escudo + **prompt de cuenta**. Celebración contenida. |
| **F** | Racha rota | >1 noche sin ver, sin escudo | *"Tu racha de 5 noches terminó."* Reencuadre a `Noche 1`, sin culpa. |
| **G** | Escudo consumido | Falta 1 noche, con escudo | *"Usamos tu escudo. Sigues en 5 noches."* Informativo, no interruptivo. |
| **H** | Con cuenta | Post-registro | Desaparece el prompt; aparece la racha respaldada. |
| **I** | Confirmación en reproductor | Termina 1er episodio de la noche | **Toast, no modal.** `Noche 2 🔥 · 2 capítulos listos`. 2,5s, no bloquea. |

---

## 3.8 Viabilidad — lo que es caro y hay que decirlo

| Pieza | Costo | Nota honesta |
|---|---|---|
| Contador de noches + corte 4am local | Bajo | Cuidado con migrar rachas vivas y con el reloj del dispositivo. |
| Acreditación por ver (quitar el "reclamar") | Bajo | Solo mueve el disparador del evento. |
| Rediseño del sheet del muro | Medio | Es UI + el ensamblado de 4 fuentes de datos que hoy no conviven. |
| **Pases con caducidad (entitlements con TTL)** | **Alto** | **La pieza que más probablemente se corta.** Exige entitlements con expiración, reconciliación con IAP de App Store/Play y defensa contra manipulación del reloj del dispositivo. *Mitigación fase 1:* contador simple no acumulable que se resetea con la noche, sin TTL fino. |
| Escudo | Bajo | |
| Racha de invitado en dispositivo | Bajo-medio | Se pierde al reinstalar — que es justo el gancho del prompt de cuenta. |
| Recordatorio *"mañana a las 8pm"* | Medio | Depende de permiso de notificaciones, que en iOS es un recurso escaso y ya está gastado en otras cosas. **Hay que decidir a qué renuncia.** |
