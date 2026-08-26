# 2. Estrategia

## 2.1 La tesis

> El metajuego de Idilio existe, pero vive en una pestaña. El core loop vive en el player. **La estrategia entera consiste en mudar el metajuego al lugar donde el usuario ya está**, y en cambiar la unidad de todo — de monedas a episodios, de días calendario a noches — para que hable el idioma del producto.

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
Cada cifra de monedas del producto lleva su traducción a episodios. `180` pasa a ser `180 monedas · 12 episodios`. El paywall abre con *"Te falta 1 episodio"*, no con *"Tu balance: 0"*.

| | |
|---|---|
| **Hipótesis** | El usuario no rechaza el precio: no lo puede calcular. Dándole la unidad que le importa, decide — y decidir, aunque sea que no, es mejor que abandonar. |
| **Mueve** | Comprensión de la economía (objetivo de experiencia). Secundariamente conversión a pagador. |
| **Cómo lo sé** | *Leading:* tasa de interacción con el muro (hoy: cuántos tocan algo vs. cuántos cierran). *Lagging:* conversión a primera compra. *Guardrail:* ARPDAU no cae. |
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
| **Hipótesis** | El compartir ya existe y funciona; lo que se rompe es el aterrizaje. Un deferred deep link recupera intención que hoy se tira. |
| **Mueve** | Instalaciones activadas, y el primer episodio visto post-install. |
| **Cómo lo sé** | *Leading:* % de installs desde link que llegan al episodio correcto. *Lagging:* D1 de la cohorte de link compartido. |
| **Costo** | ~1 semana (Branch/AppsFlyer o Universal Links propios). |
| **Compuerta ①** | ✅ |

---

### Ola 2 — Cambiar la unidad del regreso (semanas 4–9) ← **la intervención profunda**

#### I5 · El Pase de la Noche + la Racha de Noches ⭐
**Es la intervención que llevo a diseño y POC.** Detalle completo en [`docs/03-diseno`](../03-diseno/).

Tres cambios acoplados:

1. **Pase de la Noche.** Un desbloqueo gratis cada 24 h, acumulable hasta dos. *El usuario elige a qué serie se lo da.* Se reclama dentro del muro.
2. **La unidad es la noche, no el día.** La ventana corre de 5 a.m. a 5 a.m. Ver a las 00:30 y a las 23:30 del mismo martes cuenta como dos noches, no como una.
3. **Comodín.** Al llegar a la noche 3 se gana un escudo que se consume solo cuando se pierde una noche. Uno por semana.

| | |
|---|---|
| **Hipótesis** | El muro es hoy un final. Convertido en una cita con hora — *"tu próximo episodio se abre hoy a las 18:05"* — deja de ser el final de la relación y pasa a ser el motivo del próximo regreso. Y como la unidad es la noche, los pases se acumulan hasta dos y hay comodín, un usuario de 2.3 días/semana puede sostener una racha sin cambiar de conducta. |
| **Mueve** | **DAU/MAU** (objetivo primario). Racha de 3+: 6% → objetivo 20%. Reclamo diario: 19% → 55%+. |
| **Cómo lo sé** | *Leading (semana 1):* % de muros que terminan en pase reclamado en vez de cierre. *Leading (semana 2):* % que vuelve dentro de las 36 h de haber usado el pase. *Lagging (semana 4):* DAU/MAU de la celda tratada vs. holdout. *Guardrail:* ARPDAU. **Criterio de kill:** si ARPDAU cae >8% relativo sostenido 2 semanas, se revierte. |
| **Costo** | ~4–5 semanas (server-authoritative timers, estado de invitado, migración a cuenta). |
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

| | |
|---|---|
| **Hipótesis** | 88% consume como invitado porque hoy la cuenta no le da nada. Con racha y saldo, la cuenta pasa a ser un seguro sobre algo que ya siente propio. Ese es el único momento en que registrarse tiene precio emocional. |
| **Mueve** | Cuentas creadas 12% → objetivo 30%. Habilita push, cross-device y medición real de retención. |
| **Cómo lo sé** | *Leading:* conversión del prompt contextual vs. el registro actual. *Lagging:* % con cuenta; D30 de la cohorte que se registró tras el prompt. *Guardrail:* abandono en el momento del prompt no sube. |
| **Costo** | ~3 semanas (merge de estado invitado→cuenta es lo caro). |
| **Compuerta ①** | ✅ el prompt aparece en el muro, no en un onboarding. |

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
3. **Push es el 40% del valor del pase y hoy no está disponible para el 88%.** Un pase con countdown sin notificación que avise que ya está listo pierde la mitad de su efecto. Sin cuenta no hay push confiable. **Mitigación:** en Ola 2 se usa push anónimo por token de dispositivo (iOS y Android lo permiten sin cuenta), y se acepta que el valor completo llega recién con I7.

## 2.6 Qué queda deliberadamente afuera

| Descartado | Por qué |
|---|---|
| Rediseño de la sección de perfil | 82% nunca entra. No se arregla un cuarto amoblándolo. |
| Rankings, tablas, comparación social | 11 p.m.–2 a.m., consumo solitario, vertical con pudor, 88% sin identidad. No es motivación, es exposición. |
| Insignias y coleccionables como apuesta principal | Vínculo indirecto con DAU/MAU, carga cognitiva alta, sin evidencia de motivación de coleccionista. Candidatos a capa posterior. |
| Anuncios recompensados como fuente | Es la fuente obvia y ya es estándar de la categoría: DramaBox permite hasta 15 anuncios diarios, unos 6 episodios gratis por día, y ReelShort también los ofrece. Pero cambia la naturaleza del producto (de corto-premium a ad-supported) y ese es un llamado de negocio, no de diseño. Lo señalo, no lo decido. |
| Suscripción como respuesta al muro | Ya existe en el producto. Es una respuesta de monetización a un problema de retención. No mueve DAU/MAU del no-pagador, que es el 95%+ de la base. |
