# Archivo de diseño

Seis pantallas más la hoja de sistema, hechas en **Pencil** (`.pen`) sobre los tokens reales
de producción de Idilio TV.

> **Sobre Figma.** El conector de Figma necesita autorización OAuth desde una sesión
> interactiva, y esta no lo es, así que no pude escribir en el archivo compartido. El puente
> está listo para cuando se autorice: [`tokens.json`](../tokens.json) importa a Figma con
> Tokens Studio, y estos PNG a 2× sirven de referencia directa. El detalle está en
> [`sistema.md`](../sistema.md#del-prototipo-a-figma).

| | Pantalla | Qué resuelve |
|---|---|---|
| ![Sistema](00-sistema.png) | **00 · Sistema** | Los tokens de color con su uso, la escala tipográfica y las tres reglas que gobiernan todo lo demás. |
| ![Pase listo](01-muro-pase-listo.png) | **01 · Muro · el Pase está listo** | El orden que sostiene la intervención: historia → posición → gratis → pago → racha. El pase «se acredita solo al ver, una vez por noche». |
| ![La cita](02-muro-la-cita.png) | **02 · Muro · la cita** | El pase ya se usó. El héroe es la hora del reloj —anclada a **su hora de siempre**, no a «+24 h»— y aparece «Avísame». |
| ![Elección](03-eleccion-de-serie.png) | **03 · ¿A cuál le das el pase?** | El corazón pedagógico: un recurso escaso que hay que asignar. Aquí el usuario declara cuál historia le importa. |
| ![Desbloqueo](04-desbloqueo-racha-avanza.png) | **04 · Desbloqueado** | La noche 3 en dorado, el bono de 30 monedas y el comodín ganado. |
| ![Tienda](05-tienda.png) | **05 · Tienda** | Episodios grande, monedas de subtítulo, precio por episodio. La meta calculada de la serie, y el badge sobre el paquete que de verdad la termina. |
| ![Racha rota](06-racha-rota.png) | **06 · Se cortó la racha** | El fallo sin castigo: sin rojo, sin alarma y sin oferta para «recuperarla» pagando. |

**Falta una pantalla aquí, y lo digo:** el *acuse de la noche* —el toast de dos segundos dentro
del player, que es el mecanismo nuevo— no está en el `.pen`. El renderizador de Pencil dejó de
dibujar subárboles recién insertados en la sesión en que hice el cambio; los `Update` de texto sí
entraron, y por eso las seis pantallas de arriba están al día. Está capturado en el
[export de flujos](../../../mobbin-export/flows/f1-pase-de-la-noche/01b-acuse-de-la-noche.png),
tomado del prototipo funcional.

Regenerar los PNG: exportar los nodos del `.pen` a esta carpeta a escala 2×.
