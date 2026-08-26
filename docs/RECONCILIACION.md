# Las dos versiones, y cuál entregar

El reto se resolvió **dos veces en paralelo**, en dos workspaces. Este documento existe para que
elegir entre ellas no requiera leer los dos entregables completos.

> **Corrección previa.** Avisé tres veces de que las dos versiones iban a chocar en `main`.
> **Era falso.** El POC de *harare* vive en un repo aparte —`idilio-racha-de-noches-poc`, ya
> público y en vivo— y esa rama nunca escribió en `main` de `idilio-tv`. No hay conflicto que
> resolver: hay una elección que tomar.

| | **`harare` · Racha de Noches** | **`da-nang` · Pase de la Noche** |
|---|---|---|
| Link del POC | [idilio-racha-de-noches-poc](https://gabrielardzj.github.io/idilio-racha-de-noches-poc/) | [idilio-tv](https://gabrielardzj.github.io/idilio-tv/) |
| Rama | `idilio-tv-flow-export` | `da-nang` (fusionada a `main`) |

---

## 1 · El diagnóstico converge, y eso vale más que cualquiera de los dos

Trabajando por separado, los dos llegaron a la misma conclusión con palabras distintas:

- *harare*: «el metajuego no está mal diseñado, está **mal ubicado**» — economía asimétrica en visibilidad, sumidero al 100% y fuente al ≤18%.
- *da-nang*: «el metajuego no está mal diseñado, **está en otro edificio**».

Y los dos eligieron **el muro de desbloqueo** como la única superficie con alcance total, por el
mismo argumento aritmético: la sesión promedio (14 episodios) supera los 10 gratis por serie.

Dos análisis independientes que convergen son mucha más evidencia que uno solo. **Eso hay que
decirlo en la presentación, sea cual sea la versión que se entregue.**

---

## 2 · La diferencia de mecánica, y por qué mi crítica era parcialmente injusta

|  | harare | da-nang |
|---|---|---|
| **Cómo se gana** | al **terminar un episodio**, sin reclamar | al **usar el pase** en el muro |
| **Qué se gana** | capítulos que **caducan esa noche** | pases que **se acumulan hasta 2** |
| **Corte de la noche** | 4:00 am | 5:00 am |

Sostuve que la caducidad repetía el error del Daily Pass de Webtoon —retirado en 2025 tras cinco
años de la queja de que el «úsalo o piérdelo» volvía leer una tarea—. **Al leer el razonamiento
de harare, esa crítica no se sostiene como la planteé.**

La razón es que **cada mecanismo es coherente con su propio modelo de acreditación:**

- Si el recurso se acredita **por reloj** (como en el mío: uno cada 24 h), puede llegar cuando el
  usuario no está. Ahí la caducidad **sí** castiga la ausencia, y hace falta un tope que perdone.
- Si se acredita **por ver** (como en harare), se gana y se gasta en la misma sesión. La
  caducidad entonces no castiga ausencias: solo **impide acumular**, que es exactamente la misma
  función que cumple mi tope de 2.

**Las dos resuelven el mismo problema —que acumular mataría el DAU/MAU— con herramientas
distintas, y cada una es correcta dentro de su modelo.** Mi crítica aplica a la caducidad sobre
acreditación por reloj, no sobre acreditación por ver.

Y hay un argumento de harare que yo no tenía, y que invierte la objeción de canibalización:

> «Un usuario que no vuelve choca con **cero** muros. Uno que vuelve cinco noches choca con
> **cinco**. Cada capítulo gratis te deja otra vez frente al muro con más deseo: la fuente ganada
> no reduce las ocasiones de compra, **las fabrica**.»

---

## 3 · Qué tiene cada uno en exclusiva

### Solo en `harare`

- **Acreditación sin reclamar.** La racha avanza al terminar un episodio. La adopción de la
  fuente pasa de 19% a ~100% **por construcción**, no por diseño de pantalla. Es, a mi juicio,
  la mejor decisión aislada de las dos versiones.
- **Modelo de sensibilidad** del objetivo, con test automatizado de la economía.
- **Revisión adversarial** propia, con cinco defectos encontrados y corregidos.
- **D4b — la tercera ubicación**: el prompt al abrir la app, que usa ReelShort. Yo solo había
  considerado perfil vs muro. Reconoce que es un trade-off y no una obviedad.
- **Preparación de la sesión de cierre** con las preguntas difíciles.

### Solo en `da-nang`

- **Censo del catálogo completo** (50 series, 2.230 episodios). De ahí sale el segundo hallazgo:
  **500 episodios gratis = casi cuatro meses sin pagar**, que reencuadra el problema —la alternativa
  a pagar no es irse, es empezar otra serie— y que ninguna de las dos versiones tenía antes.
  Con una corrección que corresponde dejar acá: **el censo estuvo mal y hubo que rehacerlo.** La
  primera versión decía 43 series y 1.885 episodios porque el scraper raspaba los rieles del home
  en vez del sitemap, y tres series que sí leyó las emitió con total 0 sin dar un solo error. El
  censo nuevo se arma desde `sitemap.xml` y el script se cae si una ficha no se puede leer. El
  hallazgo no se movió de lugar —el colchón resultó más grande, no más chico—, pero estuvo
  apoyado varios días en un número que no era.
- **El precedente de Webtoon investigado**, que es el antecedente directo de la mecánica.
- **Implementación sobre el stack real** (Next.js + Tailwind v4 + Supabase) con la **migración
  SQL completa**: `viewer.device_id` para invitados, `viewer.timezone`, `night_of()`,
  `use_pass()` atómica y `episode_unlock.source` para medir canibalización.
- **Verificador de cifras en CI**: una cifra obsoleta rompe el despliegue.

---

## 4 · Lo que ya hice al respecto

**Adopté la acreditación de `harare` en esta versión.** No tenía sentido documentar que su
modelo es mejor y seguir enviando el mío.

| | Antes | Ahora |
|---|---|---|
| Cuándo llega el pase | un reloj de 24 h | **al terminar un episodio**, una vez por noche |
| Qué hace el usuario | usarlo en el muro (y ahí avanzaba la racha) | nada: se acredita solo, con un toast de 2 s |
| Adopción de la fuente | depende de llegar al muro | **~100% por construcción** |
| La cita | «+24 h desde que lo usaste» → hora arbitraria | **su hora de siempre** |

Con eso, la única diferencia de mecánica que queda entre las dos versiones es **caducar vs
topar en 2** — y como argumento arriba, cumplen la misma función una vez que la acreditación
es por ver. El tope se queda porque cubre un caso que la caducidad no: ver gratis, recibir el
pase y cerrar la app sin llegar al muro.

**La cita anclada a la hora habitual sí es aporte de esta versión**, y no está en la otra.

---

## 5 · La recomendación

**Fusionar.** Ya no por la mecánica —que converge— sino por el material.

El motivo es concreto y fue, en su momento, en contra de mi propio trabajo: **acreditar al
terminar un episodio es mejor que acreditar por reloj.** Mide la conducta que la métrica objetivo
persigue —volver— y lleva la adopción de la fuente a ~100% sin pedirle nada al usuario.

La fusión mínima que yo entregaría:

| Pieza | De dónde | Por qué |
|---|---|---|
| Acreditación al ver | **harare** *(ya adoptada aquí)* | La adopción por construcción es superior |
| Cita anclada a la hora habitual | **da-nang** | Una cita a una hora arbitraria no es una cita |
| Diagnóstico y censo del catálogo | **da-nang** | El hallazgo de los 500 episodios es el más fuerte de los dos, y harare no lo tiene |
| Precedente de Webtoon | **da-nang** | Es el antecedente directo; conviene tenerlo aunque refuerce a harare |
| Esquema SQL y viabilidad | **da-nang** | El brief evalúa viabilidad de implementación de forma explícita |
| Modelo de sensibilidad y sesión de cierre | **harare** | No tienen equivalente aquí |
| Corte de la noche | cualquiera | 4:00 y 5:00 am son ambos defendibles. Lo que importa es que **no** sea medianoche |

**Si hay que entregar una sola sin fusionar:** cualquiera de las dos sirve ahora que la
acreditación converge. Esta tiene el censo del catálogo, el precedente de Webtoon y la
viabilidad técnica; la otra tiene el modelo de sensibilidad y la sesión de cierre preparada.
Lo que ninguna de las dos debería entregar es la mitad del material de la otra pudiendo tenerlo.

---

*Escrito desde `da-nang` sobre una lectura de `harare` en modo solo lectura. No modifiqué nada
de ese workspace.*
