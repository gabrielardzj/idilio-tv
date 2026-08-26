# 1 · Diagnóstico

> Método: uso real del producto (web, viewport móvil 430×932) + lectura crítica de los datos del brief + verificación cruzada con reseñas públicas de Google Play y benchmarks de la categoría. Todo lo que aquí se afirma está etiquetado como **[dato]**, **[observado]** o **[hipótesis]**.

---

## 1.1 La tesis en una frase

**El metajuego de Idilio no está mal diseñado: está mal ubicado.** Vive en una superficie que 4 de cada 5 usuarios nunca abren, mientras que el sumidero vive en la superficie que ve el 100%. El resultado es una economía que el usuario percibe como *solo precio*, sin fuentes visibles — y una racha que, cuando alguien logra encontrarla, funciona muy bien.

---

## 1.2 Las cuatro señales que pesaron

### Señal 1 — El 82% nunca abrió el perfil, y el metajuego vive ahí

**[dato]** 82% de usuarios nunca ha abierto la sección de perfil.
**[observado]** En el reproductor web no existe **ningún** indicador de saldo, racha o progresión. El HUD del core loop contiene: pausa, progreso, sonido, siguiente, compartir, lista de episodios, likes y comentarios. Cero economía.

Esto convierte al 82% en una cifra estructural, no en una curiosidad: **si el saldo, la racha y el progreso viven en perfil, no existen para el 82% de la base.** Cualquier intervención que se resuelva creando una pantalla nueva hereda ese mismo techo del 18%.

> **Consecuencia de diseño, no negociable:** la intervención tiene que ocurrir **dentro del reproductor o en el muro de pago**. Son las dos únicas superficies con alcance del 100%.

---

### Señal 2 — La recompensa diaria no tiene un problema de retención; tiene un problema de descubrimiento

Esta es la lectura que más cambia la estrategia, y requiere hacer una cuenta.

**[dato]** 19% de DAU reclama la recompensa diaria. **[dato]** 6% alcanza el tercer día consecutivo de racha.

Si reclamar fuera un evento aproximadamente independiente día a día con p ≈ 0,19, la probabilidad de encadenar tres días sería:

```
0,19³ = 0,0069  →  0,69 %
```

Se observa **6 %**, es decir **≈ 8,7 veces más de lo que predice la independencia**.

**Interpretación:** reclamar está fuertemente autocorrelacionado. No estamos ante una base que intenta la racha y la abandona. Estamos ante **dos poblaciones**: una minoría que descubrió la mecánica y la sostiene con mucha eficacia, y una mayoría que **nunca la encontró**. El embudo no se rompe en el día 2; se rompe **antes del día 1**.

> ⚠️ **Autocrítica del cálculo.** Los denominadores del brief no son idénticos: 19% es una tasa diaria sobre DAU y 6% es una tasa acumulada sobre usuarios. La comparación es **direccional, no exacta**. Pero el sesgo juega **a favor** de la conclusión: si el 6% se mide sobre una base más amplia que DAU, el exceso sobre la independencia es aún mayor. La conclusión aguanta.

**Y esto se refuerza con el otro dato:** quien mantiene 3 días consecutivos retiene **2,4× a D30**. Es decir, **la mecánica que ya funciona es la que casi nadie ve.** No hay que inventar una mecánica nueva. Hay que exponer la que existe.

---

### Señal 3 — La sesión promedio atraviesa el muro. El paywall no es un evento raro: es parte del loop.

**[dato]** Sesión promedio: 22 min ≈ **14 episodios**.
**[observado]** En *Tres Meses de Amor* (Temporada 1, 30 episodios): **episodios 1–10 libres, 11–30 bloqueados**.
**[dato verificado en reseñas]** El desbloqueo cuesta **~15 monedas por episodio** (reseña Google Play, 18-ago-2026).

```
14 episodios por sesión  >  10 episodios gratis por serie
```

**El usuario promedio choca con el muro dentro de su primera sesión.** No es un límite que aparece "más adelante": es el techo natural de la sesión típica. Y choca **en un cliffhanger**, porque así está construido el formato.

Esto significa que **el muro de pago es la superficie de mayor tráfico y mayor intensidad emocional de todo el producto** — y hoy está resuelto como un callejón sin salida. En web, literalmente:

> "Episodio 11 bloqueado — Consigue un pase y disfruta todos los episodios sin límite en la app de Idilio."
> `Obtener el pase` · `Descargar la app`

Dos CTAs, **ambas de pago o de salida**. Ninguna enseña la economía. Ninguna ofrece una vía de obtención. El usuario invitado (88% de la base) recibe, en su momento de máximo deseo, una puerta cerrada con un precio y ningún mapa.

---

### Señal 4 — El "día" de la economía está desalineado con el día real del usuario

**[dato]** 54% de las sesiones ocurren entre **11pm y 2am**.

Un reset de racha a medianoche parte exactamente por la mitad la ventana de consumo principal del producto. Consecuencias concretas:

- Un usuario que ve de 11:30pm a 00:30am cruza la frontera del día **dentro de una sola sesión**: la app cuenta dos días donde el usuario vivió uno.
- Un usuario que ve todas las noches a las 11:40pm y una noche entra a las 00:10am cree haber entrado "esa noche", pero el sistema registra un salto de día y **le rompe la racha por 30 minutos**.

**[hipótesis, alta confianza]** Parte de la caída 19%→6% no es desinterés: es **contabilidad**. Es la señal más barata de corregir de todo el diagnóstico y no requiere ninguna pantalla nueva.

> Corrección estándar de la industria: **el día de la economía cierra a las 4:00 am hora local del dispositivo**, no a medianoche.

---

## 1.3 Qué se descartó, y por qué

| Señal | Por qué **no** lidera el diagnóstico |
|---|---|
| **12% tiene cuenta creada** | Es tentador leerlo como "hay que empujar el registro". Pero el registro es *consecuencia*, no causa: nadie crea una cuenta para proteger un progreso que no sabe que tiene. **Primero hay que hacer visible el progreso; la cuenta se pide después, cuando ya duele perderlo.** Invertir el orden es la trampa clásica: se mide un alza de registros y una caída de sesiones. Lo mantengo en la estrategia, pero subordinado. |
| **23% revé episodios terminados** | Es una señal genuina y probablemente subexplotada (atención sin sumidero). Pero es un problema de **catálogo y descubrimiento**, no de economía. Moverlo no mueve DAU/MAU de forma directa y compite por foco con la señal 2, que tiene evidencia de 2,4×. Queda en el backlog de estrategia, no en la intervención profunda. |
| **Precio del episodio (15 monedas)** | Las reseñas gritan *"deberían dar más monedas"*. Es tentador leerlo como que el precio está alto. **No lo tomo como diagnóstico primario.** Un usuario que no ve fuentes siempre reportará el precio como el problema; es el único término de la ecuación que percibe. Bajar el precio sin arreglar la legibilidad de las fuentes cuesta ingreso y no enseña nada. Verificable con el benchmark: DramaBox/ReelShort entregan ~250 monedas/día vía check-in + ads (≈4–5 episodios). El problema comparativo no es el precio unitario: es **el caudal de la fuente y su visibilidad.** |
| **DAU/MAU 0,33 en sí mismo** | Es el objetivo, no una señal. Como número aislado no es malo para streaming de entretenimiento; se usa como línea base, no como diagnóstico. |
| Research no realizado, personas, journeys de plantilla | Fuera del alcance por decisión del brief y por honestidad: no hice research con usuarios, así que no voy a presentar hallazgos como si lo hubiera hecho. Lo que hay es uso propio + datos + reseñas públicas verificables. |

---

## 1.4 El diagnóstico, formalizado

Idilio tiene una economía virtual **asimétrica en visibilidad**:

|  | Dónde vive | Alcance real | Frecuencia con que el usuario la encuentra |
|---|---|---|---|
| **Sumidero** (desbloquear episodio) | Reproductor / muro | **100%** | ≥1 vez por sesión (14 eps > 10 gratis) |
| **Fuente A** (comprar paquete) | Muro / checkout | 100% (como precio) | Cada vez que choca |
| **Fuente B** (recompensa diaria + racha) | Perfil | **≤18%** | Casi nunca |
| **Progresión / posición en el sistema** | Perfil | **≤18%** | Casi nunca |

El usuario, por tanto, **no aprende una economía: aprende un precio.** Y una economía en la que solo se percibe el sumidero no se lee como economía, se lee como *paywall*. De ahí que el reclamo dominante en reseñas no sea "no entiendo las monedas" sino "no me alcanzan".

Y el DAU/MAU es consecuencia directa: **no existe ninguna razón para abrir Idilio un día en que no me apetece ver un episodio.** El único motor de regreso es el contenido. El metajuego —que es el que debería fabricar el regreso— está detrás de una puerta que el 82% no abre.

---

## 1.5 Las tres afirmaciones que sostienen toda la estrategia

1. **La mecánica correcta ya existe y ya funciona** (2,4× D30 a los 3 días). No hay que inventarla; hay que sacarla del perfil.
2. **La única superficie con alcance del 100% donde el metajuego cabe naturalmente es el muro de desbloqueo**, porque es donde el usuario ya está pensando en monedas y donde su deseo es máximo.
3. **Cualquier fuente nueva de moneda canibaliza la compra si es fungible con la comprada.** La salida es que lo ganado sea de **naturaleza distinta** a lo comprado (ver §2, principio de doble moneda).
