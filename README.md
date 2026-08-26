# Racha de Noches · Reto de diseño Idilio TV

> **¿Cómo podríamos usar mecánicas de gamificación para que volver a Idilio forme parte natural de la experiencia de ver microdramas?**

---

## La respuesta, en tres frases

**El metajuego de Idilio no está mal diseñado: está mal ubicado.** Vive en un perfil que el 82% nunca abre, mientras el sumidero vive en la superficie que ve el 100%. El usuario, por tanto, no aprende una economía: aprende un precio.

**La mecánica que funciona ya existe** — quien encadena 3 días retiene 2,4× a D30 — **pero casi nadie la encuentra.** No hay que inventarla; hay que sacarla del perfil.

**Y el único sitio con alcance total donde cabe es el muro de desbloqueo**, porque la sesión promedio (14 episodios) supera los 10 episodios gratis: todo el mundo choca con él, casi todas las noches, en un cliffhanger.

---

## Los cuatro entregables

| | Entregable | Dónde | Peso |
|---|---|---|---|
| 5.1 | **Diagnóstico** | [`docs/01-diagnostico.md`](docs/01-diagnostico.md) | 35% |
| 5.2 | **Estrategia** | [`docs/02-estrategia.md`](docs/02-estrategia.md) | *(con 5.1)* |
| 5.3 | **Intervención en profundidad + diseño + flujo** | [`docs/03-intervencion.md`](docs/03-intervencion.md) · [`docs/04-flujo.md`](docs/04-flujo.md) · [`design/`](design/) | 20% craft |
| 5.4 | **POC funcional** | [`poc/`](poc/) → *link de despliegue* | 25% |
| — | **Decisiones y análisis crítico** | [`docs/05-decisiones.md`](docs/05-decisiones.md) | 20% claridad |
| — | **Export tipo Mobbin** (pantallas, flujos y patrones) | [`export/`](export/) | — |

---

## El diagnóstico, en una tabla

La economía de Idilio es **asimétrica en visibilidad**:

| | Dónde vive | Alcance real | Con qué frecuencia la encuentra el usuario |
|---|---|---|---|
| **Sumidero** (desbloquear) | Reproductor / muro | **100%** | ≥1 vez por sesión |
| **Fuente A** (comprar) | Muro / checkout | 100% (como precio) | cada vez que choca |
| **Fuente B** (recompensa diaria + racha) | **Perfil** | **≤18%** | casi nunca |
| **Progresión / posición** | **Perfil** | **≤18%** | casi nunca |

Y el DAU/MAU es la consecuencia directa: **no existe ninguna razón para abrir Idilio un día en que no apetece ver un episodio.** El único motor de regreso es el contenido; el metajuego —que es el que debería fabricar el regreso— está detrás de una puerta que el 82% no abre.

---

## La intervención

**El muro de desbloqueo se convierte en la clase de economía.** Un bottom sheet sobre el frame congelado del cliffhanger, con seis bloques cuyo **orden es el argumento**:

```
1  deseo            el cliffhanger sigue visible detrás
2  posición         "vas 10 de 30"  ·  antes que el precio
3  acción gratuita  "Ver gratis"  ·  la respuesta es sí
4  promesa          "mañana es la noche 2: 2 capítulos"
5  precio           después de saber que hay vía sin pagar
6  cita             "mañana a las 8:00 pm"  ·  Avísame
```

Las tres decisiones que la sostienen:

1. **Se elimina el "reclamar".** La racha se acredita al *terminar un episodio*. La fuente pasa de ser un destino que hay que descubrir (19%) a una consecuencia de lo que el usuario ya hace (~100%).
2. **Se cuentan noches, no días**, y la noche cierra a las **4:00 am**. Con ese nombre no hay que explicarlo: ya es como funcionan las noches. *(54% de las sesiones son entre 11pm y 2am.)*
3. **Lo que se gana no es moneda, son capítulos que caducan.** No se acumulan, así que no canibalizan la compra — y como cada capítulo gratis te deja otra vez frente al muro con más deseo, **fabrican ocasiones de compra en vez de eliminarlas**.

---

## Verificación — lo que está comprobado, no afirmado

| Qué | Cómo | Resultado |
|---|---|---|
| Reglas de la economía | 22 tests automatizados sobre el motor puro (`poc/src/economy.test.ts`) | **22/22 ✓** |
| Accesibilidad | axe-core · `wcag2a` `wcag2aa` `wcag21a` `wcag21aa` `best-practice` | **0 violaciones · 23 reglas ✓** |
| Densidad del sheet | Captura real a 430×932 | los **6 bloques caben sin scroll** |
| Tokens de marca | Volcado de custom properties de `www.idilio.tv` en producción | 9 colores + 2 familias tipográficas |
| Muro real del producto | Uso propio de la web con viewport móvil | eps **1–10 libres, 11–30 bloqueados** |
| Precio del sumidero | Reseña verificada de Google Play (18-ago-2026) | **~15 monedas/episodio** |

Los tests incluyen el caso que rompe rachas hoy: **23:30 y 01:00 de la noche siguiente son la misma noche.**

```bash
cd poc && npm install && npm run dev     # http://localhost:5173
cd poc && npx vitest run                 # 22 tests
```

En el prototipo, el botón **`Estados`** (borde derecho) abre el panel para saltar a cualquier estado y para **viajar entre noches** — así se puede vivir el crecimiento de la racha, el escudo y la ruptura sin esperar días reales.

---

## Honestidad sobre los límites

- **No hice research con usuarios.** Uso propio + datos del brief + reseñas públicas citadas.
- **No probé la app nativa**, donde vive la economía de monedas. Probé la web, que es superficie de captación con paywall de suscripción. Es la principal limitación del diagnóstico.
- **El brief describe una economía más simple que la real:** las reseñas públicas muestran que el producto ya tiene video recompensado, "retos" y membresía mensual. Diseñé contra la economía del brief, pero esa reconciliación es la conversación número uno con el equipo.
- Los cuatro puntos donde este trabajo puede estar equivocado están enumerados en [`docs/05-decisiones.md` §5.3](docs/05-decisiones.md).
