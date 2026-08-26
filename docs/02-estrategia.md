# 2 · Estrategia

> Objetivo de negocio: **subir DAU/MAU**. Objetivo de experiencia: **que el usuario entienda la economía** (valor, fuentes, sumideros, su posición).
> Este entregable se evalúa a nivel de razonamiento; no está diseñado, y a propósito.

---

## 2.0 Los cuatro principios que ordenan todas las decisiones

Antes de las intervenciones, los principios. Sin ellos, la lista de abajo es una lista de features.

**P1 · El metajuego no pide una pantalla. Pide un lugar en el loop.**
El 82% no abre perfil. Toda intervención se evalúa primero por *dónde ocurre*, no por *qué hace*. Si necesita una pantalla nueva para existir, su techo es 18%.

**P2 · Enseñar la economía es enseñarla en el momento del gasto.**
Nadie lee un tutorial de monedas. Todo el mundo lee un precio cuando quiere algo. El muro de desbloqueo es la única clase de economía a la que el usuario asiste voluntariamente.

**P3 · Doble moneda: lo que se gana no puede ser lo mismo que lo que se compra.**
Si la racha entrega monedas fungibles con las compradas, cada moneda regalada es ingreso destruido y el usuario aprende a esperar en vez de a pagar. La salida es que lo ganado tenga **naturaleza distinta**: acceso con caducidad, no saldo acumulable. Un pase que caduca esta noche no compite con un paquete de monedas: **crea la ocasión de usarlo** y empuja al muro otra vez.
*Verificación:* es el patrón de las vidas de Candy Crush y de los pases de DramaBox; y es exactamente lo contrario de regalar saldo, que es lo que las reseñas piden y lo que no hay que hacer.

**P4 · La racha se gana antes de pedir la cuenta, no después.**
88% consume como invitado. Pedir cuenta para *empezar* una racha es cobrar por adelantado un valor que el usuario aún no percibe. Pedir cuenta para *no perder* una racha de 3 días es ofrecer un seguro sobre algo que ya duele perder. El registro se diseña como consecuencia de la mecánica, no como su peaje de entrada.

---

## 2.1 Criterio de priorización

Cada intervención se puntúa con:

```
Prioridad  =  Alcance × Fuerza de evidencia
              ─────────────────────────────
                    Costo de construcción
```

- **Alcance** = % de la base que se topa con ella sin buscarla.
- **Fuerza de evidencia** = qué tan directamente la sostiene un dato del brief o del producto real (no una intuición).
- **Costo** = trimestre-persona aproximado, incluida la parte de backend/economía, no solo la de UI.

Esto empuja deliberadamente hacia arriba las intervenciones **baratas y de alcance total**, y hacia abajo las vistosas. En un producto donde la mecánica que funciona ya existe, **exponer vence a inventar.**

---

## 2.2 Las intervenciones

### 🟢 Ola 0 · Higiene de la economía (semanas 1–2, casi sin UI)

#### **I0 — El día cierra a las 4:00 am, hora local**
- **Hipótesis:** una parte no trivial de las rachas rotas no son abandono, son contabilidad: el 54% de las sesiones ocurre entre 11pm y 2am y el reset a medianoche parte esa ventana por la mitad.
- **Qué mueve:** % que alcanza día 3 (hoy 6%). Es la única intervención que puede mover la métrica clave **sin tocar una sola pantalla**.
- **Cómo lo sabríamos:** cohorte A/B sobre la hora de corte. Métrica de lectura fina: *% de rachas rotas cuya última sesión terminó entre 23:00 y 01:00*. Si esa cifra cae fuerte y el día-3 sube, la hipótesis era buena. Si no se mueve, era ruido y lo sabemos en dos semanas por casi nada.
- **Costo:** muy bajo (backend). **Riesgo:** bajo. Único cuidado: migrar rachas vivas sin romperlas.

#### **I0b — La racha existe para el invitado**
- **Hipótesis:** el 88% invitado hoy no tiene metajuego posible; el estado de racha debe persistir en el dispositivo desde la primera sesión, sin cuenta.
- **Qué mueve:** habilita todo lo demás. Sin esto, las olas 1 y 2 tienen techo del 12%.
- **Cómo lo sabríamos:** no es una intervención con métrica propia; es un prerrequisito. Se mide por cobertura: % de DAU con estado de racha asignado ≈ 100%.
- **Costo:** bajo-medio. **Riesgo:** pérdida al reinstalar/cambiar de equipo — que es justamente el gancho de I3.

---

### 🔴 Ola 1 · Legibilidad de la economía (semanas 3–8) — **aquí va la intervención profunda**

#### **I1 — ⭐ El muro de desbloqueo se convierte en la clase de economía** *(candidata a profundizar)*
- **Hipótesis:** si el usuario ve, en el mismo momento en que quiere el episodio, **las tres piezas juntas** —cuánto tiene, de dónde sale lo que no compró, y dónde va— aprende la economía completa en el único momento en que le importa. Y si la recompensa diaria se entrega **ahí** en vez de en el perfil, deja de depender de que alguien la busque.
- **Por qué esta y no otra:** es la intersección exacta de las cuatro señales del diagnóstico. Alcance 100% (14 eps/sesión > 10 gratis: **todo el mundo la ve, casi todos los días**). Evidencia máxima (2,4× D30 de la racha, 19% de descubrimiento de la fuente, 82% que no abre perfil). Y no requiere pantalla nueva: **rediseña una que ya existe y ya tiene tráfico.**
- **Qué mueve:** (1) % de DAU que **vuelve la noche siguiente** (racha ≥2); (2) % que alcanza la noche 3: 6% → 15%; (3) DAU/MAU, por vía indirecta vía (1) y (2).
- **⚠️ La intervención invalida la métrica actual, y hay que decirlo.** Hoy se mide *"% de DAU que reclama la recompensa diaria" = 19%*. Al quitar el paso de reclamar (§3.1), esa métrica se va a ~100% **por construcción** — recibirla y ver un episodio pasan a ser el mismo evento. **Un salto de 19% a 100% no sería un éxito: sería un cambio de definición.** Si el equipo mide eso, va a celebrar un artefacto. La métrica tiene que cambiar con la mecánica.
- **Cómo lo sabríamos:** A/B del muro. **Primaria: % de DAU que vuelve la noche siguiente** — es la única que pregunta lo que de verdad queremos (¿volvió?) y no es trivial por construcción. Secundaria: noche-3. **Guardarraíl duro: ARPDAU y conversión a primer pago no pueden caer.** Si la comprensión sube y el ingreso baja, la intervención fracasó aunque el objetivo de experiencia se haya cumplido.
- **Costo:** medio. **Riesgo principal:** convertir el muro en una pantalla densa y bajar la conversión a compra. Se mitiga con jerarquía, no con menos información (ver §3).

#### **I2 — Pase nocturno: lo que se gana caduca** *(mecánica que I1 entrega)*
- **Hipótesis (P3):** entregar acceso con caducidad en vez de saldo acumulable sostiene el regreso diario **sin** canibalizar la venta de paquetes, porque no se puede ahorrar. Un pase que muere esta noche obliga a volver mañana; 15 monedas regaladas se guardan y desplazan una compra.
- **Qué mueve:** frecuencia de sesión (el corazón del DAU/MAU) sin tocar ARPPU.
- **Cómo lo sabríamos:** A/B *pase caducable* vs *monedas equivalentes*. Se compara sesiones/semana **y** conversión a pagador en las dos ramas. Es la prueba directa de P3; si las monedas ganan en ambas, P3 está mal y hay que revisar toda la economía.
- **Costo:** medio (requiere entitlements con TTL, no solo un contador). **Riesgo:** que el usuario perciba la caducidad como castigo. Se mitiga en el copy: *"tu capítulo de esta noche"*, no *"caduca en 6h"*.

#### **I1b — Migaja de racha en el reproductor**
- **Hipótesis:** una señal mínima y persistente en el HUD (saldo + racha) mantiene la economía presente sin interrumpir. Hoy el HUD del reproductor no tiene ni una sola referencia a la economía.
- **Qué mueve:** comprensión (medible con encuesta in-app de 1 pregunta) y tráfico hacia el módulo de racha.
- **Riesgo real y declarado:** el reproductor es la superficie sagrada. Cualquier píxel añadido compite con el video. Va con techo estricto de intrusión y se mide contra *episodios por sesión*: si bajan, se revierte.
- **Costo:** bajo.

---

### 🟡 Ola 2 · Identidad y permanencia (semanas 9–13)

#### **I3 — La cuenta como seguro de la racha**
- **Hipótesis (P4):** ofrecer el registro en el momento en que la racha alcanza valor percibido (día 3, justo donde vive el 2,4×) convierte mejor que cualquier muro de registro, porque opera por aversión a la pérdida sobre algo ya ganado.
- **Qué mueve:** % con cuenta (hoy 12%) sin costo de sesión; y de rebote, retención cross-device.
- **Cómo lo sabríamos:** A/B del disparador (día 1 vs día 3 vs al primer intento de romper racha). **Guardarraíl: episodios por sesión no puede caer** — si el prompt de registro cuesta consumo, el orden estaba invertido.
- **Costo:** bajo-medio.

#### **I4 — Escudo de racha (streak freeze), ganado y limitado**
- **Hipótesis:** el modo de fallo documentado de las rachas es el *abstinence violation effect*: al romperse, el usuario no reintenta, abandona. Un escudo que se **gana** (no se compra) y se limita a 1–2 amortigua la caída sin devaluar la racha.
- **Qué mueve:** supervivencia de la racha más allá del primer fallo; D30.
- **Riesgo declarado:** si el escudo se vende, la racha deja de significar constancia y pierde su poder. **Se gana, no se compra.** Esta es una decisión de integridad de la mecánica, no de monetización.
- **Costo:** bajo.

---

### ⚪ Ola 3 · Profundidad del sistema (backlog, trimestre siguiente)

#### **I5 — Progresión por serie ("vas 12 de 30")**
Da al usuario "su posición en el sistema de progresión", que es literalmente el objetivo de experiencia del brief. Se posterga porque **sin I1 no tiene dónde mostrarse** y porque su evidencia es más débil que la de la racha.

#### **I6 — Reencuentro: el 23% que revé**
23% revé episodios de series terminadas: es atención real sin sumidero ni progresión asociada. Es una oportunidad genuina, pero es un problema de **catálogo y descubrimiento**, no de economía; movería DAU/MAU por una vía distinta a la que estamos atacando. Se documenta para no perderlo, no se prioriza ahora.

---

## 2.3 Secuencia y por qué ese orden

```
Ola 0  ──────►  Ola 1  ──────►  Ola 2  ──────►  Ola 3
higiene        legibilidad      identidad       profundidad
sem 1–2        sem 3–8          sem 9–13        Q siguiente
```

El orden **no** es por impacto esperado: es por **dependencia y por costo de aprender**.

1. **Ola 0 primero** porque es lo más barato del plan y porque, si I0 explica una parte de la caída de racha, **cambia el tamaño del problema que la Ola 1 tiene que resolver**. Diseñar la Ola 1 antes de saberlo es diseñar contra un número contaminado.
2. **Ola 1 segunda** porque es donde está la evidencia más fuerte y el alcance total, y porque **la Ola 2 no tiene sentido sin ella**: no se puede pedir una cuenta para proteger una racha que el usuario todavía no ve.
3. **Ola 2 tercera** por P4: la cuenta es consecuencia del valor percibido, nunca su precio de entrada.
4. **Ola 3 al final** porque es la única parte del plan que **inventa** en vez de exponer, y por tanto la que más riesgo tiene por unidad de esfuerzo.

## 2.4 Viabilidad en un trimestre — lo que sí y lo que no

**Cabe en el trimestre:** I0, I0b, I1, I1b, I3, I4.
**No cabe limpiamente y hay que decirlo:**
- **I2 (pase con caducidad)** parece barato en UI y es **caro en backend**: exige un sistema de *entitlements con TTL*, reconciliación con las compras nativas de App Store / Play, y manejo de reloj del dispositivo (o el usuario cambia la hora y se regala pases). Es la pieza que más probablemente se corta primero. Mitigación: fase 1 con un pase diario simple no acumulable, sin TTL fino.
- **I5 (progresión por serie)** depende de metadata de catálogo consistente en cientos de series. El costo real no es de producto, es de datos.

---

## 2.5 Cómo sabríamos que la estrategia entera funcionó

| Nivel | Métrica | Hoy | Objetivo a 1 trimestre |
|---|---|---|---|
| Negocio | **DAU/MAU** | 0,33 | **0,37 con la intervención sola · 0,38 con la Ola 0** |
| Mecánica | % de DAU que **vuelve la noche siguiente** (racha ≥2) | sin medir · cota implícita ≈19% | 35% |
| Mecánica | % que alcanza la noche 3 | 6% | 15% |
| — | ~~% que reclama la recompensa diaria~~ | 19% | **se retira**: la intervención la vuelve trivial (→100% por construcción) |
| Experiencia | Comprensión de la economía (encuesta 1 pregunta in-app) | sin medir | **medirlo es parte del entregable** |
| Guardarraíl | ARPDAU | — | **no cae** |
| Guardarraíl | Episodios por sesión | ~14 | **no cae** |

> **Corrección.** La primera versión de esta tabla ponía *15% de día-3* y *DAU/MAU 0,38–0,40*
> en la misma fila, como si una implicara la otra. **No las verifiqué, y no se implican.**
> Al hacer la cuenta ([`docs/modelo/`](modelo/README.md)), en el escenario central el 15% de
> día-3 da **0,369**, no 0,38. Peor: **aunque el 6% de hoy entrara los 30 días del mes, el
> DAU/MAU solo llegaría a 0,346** — un segmento del 6% no puede mover el agregado por bueno
> que sea.
>
> Lo que cierra la brecha son **+0,4 días activos al mes en el resto de la base** (+4%), que es
> justamente lo que deberían aportar las dos piezas baratas de la Ola 0. **El modelo dice que
> el plan no funciona sin sus piezas menos vistosas** — y es la mejor razón que tengo para
> defender que I0 va primero y no al final.

Los dos guardarraíles son la parte más importante de esta tabla. Una intervención de gamificación que sube el DAU/MAU y baja el ingreso o el consumo no es un éxito: **es una redistribución disfrazada.**
