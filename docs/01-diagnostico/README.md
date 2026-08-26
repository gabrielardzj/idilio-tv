# 1. Diagnóstico

> Método: usé la app (reproductor web de idilio.tv + evidencia del build nativo 1.20.0) **antes** de mirar las cifras, y después crucé las dos cosas. El registro completo de dogfooding está en [`docs/00-dogfooding`](../00-dogfooding/).

---

## 1.1 El hallazgo que ordena todo lo demás

La app tiene **12 episodios gratis por serie**. Cada desbloqueo cuesta **15 monedas**. La sesión promedio es de **22 minutos ≈ 14 episodios**.

**12 gratis + el muro ≈ 14 episodios.**

La sesión promedio no termina cuando el usuario se sacia. Termina cuando choca. Los 22 minutos no son una métrica de salud: son **el techo que impone la economía**.

Esto cambia el sentido de casi todas las demás señales:

- No hay un problema de "engagement con el contenido". El contenido retiene: 14 episodios seguidos a las 12 de la noche es un loop que funciona.
- Hay un problema de **qué pasa en el segundo 1.320 de la sesión**, cuando el loop se corta.

Y lo que pasa hoy en ese momento, verificado en el paywall real, es esto:

```
Costo del episodio: 15        Tu balance: 0
─────────────────────────────────────────
       Obtén monedas para continuar
  $0.99 → 180    $1.99 → 180    $3.99 → 375
```

Un usuario que jamás ha visto una moneda en su vida, a la 1 a.m., a mitad de un cliffhanger, recibe **una tienda y ninguna otra salida**. No hay "reclama tu recompensa de hoy". No hay "vuelve mañana". No hay "te faltan X". Solo botones de compra.

**El metajuego no está mal diseñado. Está en otro edificio.**

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
| 660 (serie completa) | 44 episodios · ~$7.29 | ✗ |

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

Una serie tiene 56 episodios. El usuario ve una grilla de 44 números grises. No hay:

- cuánto llevo / cuánto falta,
- cuánto cuesta terminar,
- ningún hito intermedio entre "episodio 13" y "episodio 56".

**82% nunca abrió perfil** significa que tampoco hay una representación de "mi posición en el sistema" en ningún otro lado. El usuario no sabe que está progresando, así que no puede querer volver a progresar.

---

## 1.3 Qué señales pesaron y cuáles descarté

### Pesaron

| Señal | Por qué pesó |
|---|---|
| **12 eps gratis + 14 eps/sesión** | Es el hallazgo estructural: la sesión la corta la economía, no el aburrimiento. Ordena el resto del diagnóstico. |
| **19% reclama la recompensa** | Mide directamente la desconexión fuente↔sumidero. Es la fuga más grande y la más barata de tapar. |
| **82% nunca abre perfil** | Es la restricción de diseño más dura: descarta de entrada toda solución que viva en una pestaña. |
| **DAU/MAU 0.33 vs. racha diaria** | Desalineación aritmética entre la mecánica y la conducta real. Explica el 6% sin necesidad de más datos. |
| **88% invitados** | Cualquier cosa que requiera cuenta arranca con 12% de alcance. Define el orden: primero valor, después cuenta. |

### Descarté

**El 2.4x de retención D30 como relación causal.** Es la señal más tentadora del set y creo que es la más peligrosa. Quien sostiene 3 días seguidos ya era, antes de la racha, un usuario enganchado. La racha no lo creó: lo *identificó*. Diseñar la estrategia sobre "hagamos que más gente llegue al día 3 y tendremos 2.4x" es asumir que el termómetro calienta la habitación.

Sigue siendo un dato útil, pero como **hipótesis a testear**, no como cimiento. La forma de saberlo es un holdout: dar racha al 50% de usuarios nuevos comparables y medir D30 contra el otro 50%. Si el 2.4x se sostiene en el experimento, la racha causa retención. Si colapsa a 1.1x, estábamos leyendo selección. Hasta que ese número exista, no apuesto la estrategia a él.

**El 23% que reve series terminadas, como señal de amor al contenido.** La lectura optimista es "les encanta tanto que lo reven". La lectura que el dogfooding sugiere es menos halagadora: **cuando no puedo pagar el siguiente episodio, me voy a los que ya son gratis**. Es el comportamiento de un sumidero tapado, no de un fandom. No lo doy por cierto — es contrastable cruzando rever contra saldo=0 en el momento del rever — pero no construyo sobre la lectura optimista.

**La sección de perfil como palanca de engagement.** 82% nunca entra. Rediseñarla es amoblar un cuarto al que nadie va. Lo que hay que mover es *dónde* vive el metajuego, no cómo se ve el cuarto.

**Mecánicas sociales (rankings, tablas, comparación con amigos).** El contexto es 11 p.m.–2 a.m., consumo solitario, un vertical con carga de pudor ("novelas de celular"), y 88% de invitados sin identidad. Una tabla de posiciones aquí no es motivación: es exposición. Descartado por contexto, no por calidad de la mecánica.

**Coleccionables / insignias como intervención principal.** No hay evidencia de motivación de coleccionista en las señales disponibles, agregan carga cognitiva a un loop que debe ser de una mano, y su vínculo con DAU/MAU es indirecto. Pueden entrar después, como capa, no como apuesta.
