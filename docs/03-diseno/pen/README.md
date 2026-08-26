# El archivo de diseño

El diseño existe en **dos herramientas**, construido de forma nativa en las dos — frames con
auto-layout, componentes reales, instancias y variables enlazadas. No son imágenes exportadas
de otra parte.

| | Dónde | Qué tiene |
|---|---|---|
| **Figma** | [`CCI8plwuWvfTV8VBpowN5X`](https://www.figma.com/design/CCI8plwuWvfTV8VBpowN5X) | Una página con tres secciones: 31 variables con *scope* y *code syntax*, 9 estilos de texto, 4 componentes y **las 10 pantallas** |
| **Pen** | `.pen` compartido | Las mismas 10 pantallas, con el chip de saldo como componente reusable |

> **Por qué las dos.** Empecé en Pen porque el conector de Figma no estaba autorizado. Cuando el
> usuario lo autorizó, reconstruí todo en Figma —que es lo que pide el brief— y después él pidió
> tenerlo también en Pen. Las dos versiones están completas y dicen lo mismo; la de Figma es la
> que lleva las variables con *code syntax* apuntando a los tokens reales del prototipo, así que
> es la que sirve para Dev Mode.

---

## Las diez pantallas

| | Pantalla | Qué resuelve |
|---|---|---|
| ![Home](01-home.png) | **01 · Home** | El chasis del producto con el catálogo real. Dos detalles son la propuesta dicha en la navegación: el saldo lleva su traducción a episodios, y **la pestaña «Recompensas» ya no existe** — su contenido se mudó al muro. |
| ![Ficha](02-ficha-de-serie.png) | **02 · Ficha de serie** | El chasis de la app nativa —«Resumen» con el póster y la lista de «Capítulo N»— y encima lo que la ficha real no dice: dónde vas, qué ya viste y qué abre el siguiente capítulo. Si hay pase disponible, lo dice antes que el precio. |
| ![Player](03-player.png) | **03 · Player** | El core loop. El muro aparece cuando el siguiente episodio está bloqueado, no antes. |
| ![Acuse](04-acuse-de-la-noche.png) | **04 · El acuse de la noche** | El único momento en que el metajuego aparece dentro del video, y dura dos segundos. Sin botón: la noche se acredita al ver. |
| ![Pase listo](05-muro-pase-listo.png) | **05 · Muro · el Pase está listo** | El orden que sostiene toda la intervención: historia → posición → gratis → pago → racha. |
| ![Elección](06-eleccion-de-serie.png) | **06 · ¿A cuál le das el pase?** | El corazón pedagógico: un recurso escaso que hay que asignar. Aquí el usuario declara cuál historia le importa. |
| ![Desbloqueo](07-desbloqueo.png) | **07 · Desbloqueado** | La noche 3 en dorado, el bono y el comodín ganado. |
| ![La cita](08-la-cita.png) | **08 · Muro · la cita** | El héroe es la hora del reloj, anclada a **su hora de siempre**, no a «+24 h». Y el «Avísame», que es lo que cierra el ciclo. |
| ![Tienda](09-tienda.png) | **09 · Tienda** | Episodios grande, monedas de subtítulo, precio por episodio. La meta calculada de la serie que el usuario está viendo. |
| ![Racha rota](10-racha-rota.png) | **10 · Se cortó la racha** | El fallo sin castigo: sin rojo, sin alarma y sin oferta para «recuperarla» pagando. |

---

## Dos cosas que aprendí construyéndolo dos veces

**Los hijos de un componente reusable no son direccionables desde el clon.** En Pen intenté
cambiar el saldo del chip dentro de las copias y falló: hay que usar `descendants` en el `Copy`,
o quedarse con el valor del componente.

**Una propiedad de texto enlazada en Figma comparte un solo valor entre todas las variantes.** Le
puse a cada variante del botón su etiqueta representativa y el resultado fue que **las cuatro
dijeron lo mismo**. La propiedad vale más que la demo, así que la etiqueta quedó neutra y el uso
típico de cada nivel se escribió en la descripción de su variante, que es donde un diseñador lo
lee de verdad.

> **Una corrección.** Una versión anterior de este documento decía que faltaba la pantalla del
> acuse porque el renderizador de Pen dejaba de dibujar los subárboles recién insertados. Al
> reconstruir en un documento nuevo, **el problema no se repitió**: era de aquel documento, no de
> la herramienta. La pantalla está, y es la número 04.

Regenerar los PNG: exportar los nodos del `.pen` a esta carpeta a escala 2×.
