# Export tipo Mobbin · Idilio TV — «Racha de Noches»

Catálogo navegable de pantallas, flujos y patrones de la intervención. Pensado para
reutilizarse en el proyecto: cada entrada trae la decisión que la sostiene, no solo la imagen.

- **Manifiesto legible por máquina:** [`idilio-racha-de-noches.json`](./idilio-racha-de-noches.json)
- **Capturas:** [`screens/`](./screens) — 430×932 (iPhone 15 Pro Max, CSS px)
- **Origen:** todas las capturas salen del **POC funcional**, no de mockups. Cada estado es
  alcanzable en el prototipo desde el panel `Estados`.
- **Salvedad declarada:** la captura 13 es la única tomada antes de la pasada de escala tipográfica.
  La diferencia con el build actual es de medio píxel en algunos tamaños; el estado, el copy y la
  composición son los de ahora. Se dejó así porque el backend de captura dejó de responder, y es
  preferible decirlo a rehacerla desde el archivo de diseño y hacerla pasar por una captura del POC.

---

## Flujos

### ① Core loop — consumo con la economía visible
| | Pantalla | Estado |
|---|---|---|
| <img src="screens/01-reproductor-episodio-libre.png" width="150"> | **Reproductor · episodio libre** | eps 1–10, sin racha |
| <img src="screens/12-reproductor-I-toast-racha.png" width="150"> | **Confirmación de racha** | Estado I · noche 2 acreditada |

> **Decisión.** La migaja de economía en el HUD tiene techo estricto: 2 chips, sin fondo sólido,
> nunca sobre la cara. El reproductor es la superficie sagrada y cualquier píxel añadido compite
> con el video. La confirmación es un **toast, no un modal**: interrumpir el video para anunciar
> un premio le cobra al usuario el premio que le acabamos de dar.

### ② Muro de desbloqueo — la intervención
| | Pantalla | Estado |
|---|---|---|
| <img src="screens/02-muro-A-noche1-invitado-sin-monedas.png" width="150"> | **A · Noche 1, invitado, sin monedas** | 1 pase · 0 monedas |
| <img src="screens/03-muro-B-pase-gastado-sin-monedas.png" width="150"> | **B · Pase gastado, sin monedas** | 0 pases · 0 monedas |
| <img src="screens/04-muro-C-pase-gastado-con-saldo.png" width="150"> | **C · Pase gastado, con saldo** | 0 pases · 90 monedas |
| <img src="screens/05-muro-D-noche2.png" width="150"> | **D · Noche 2** | 2 pases |
| <img src="screens/07-muro-E-noche3-hito-escudo.png" width="150"> | **E · Noche 3 (hito)** | 3 pases · 1 escudo |
| <img src="screens/08-muro-F-racha-rota.png" width="150"> | **F · Racha rota** | venía de 5 noches |
| <img src="screens/09-muro-G-escudo-consumido.png" width="150"> | **G · Escudo consumido** | racha intacta en 6 |
| <img src="screens/10-muro-H-noche7-ciclo-completo.png" width="150"> | **H · Noche 7, con cuenta** | 5 pases · 2 escudos |
| <img src="screens/13-muro-momento-del-gasto.png" width="150"> | **El momento del gasto** | 240 ms después del toque · alcanzable desde el panel `Estados` |

> **Sobre las animaciones.** Ninguna es decorativa. Si el saldo simplemente cambia de número,
> el usuario no percibe que pagó — y **percibir el gasto es la mitad de entender la economía**.
> Por eso: el saldo se interpola, sale un recibo `−15`, el CTA se confirma en el sitio durante
> 880 ms antes de cerrar, la barra de posición avanza un capítulo, y la luna de la noche nueva
> entra con un halo que se expande una sola vez. Todas respetan `prefers-reduced-motion`.
>
> **Decisión central.** El orden vertical **es** el argumento:
> `deseo → posición → acción gratuita → promesa de regreso → precio → cita`.
> El precio va **después** de que el usuario ya sabe que hay una vía sin pagar. Quien compra
> ahí compra por impaciencia, no por bloqueo.
>
> **Verificado en el POC, no estimado:** los seis bloques caben **sin scroll** en 430×932 **y
> también en 375×667 (iPhone SE)**, que es el caso duro. Medido en el DOM sobre los ocho
> estados: van de **565 a 585 px**, un rango de 20 px. La economía completa —dos fuentes, el
> sumidero, el saldo y la posición— entra en una sola pantalla en todos ellos.

### ③ Cuenta como seguro de la racha
| | Pantalla | Estado |
|---|---|---|
| <img src="screens/06-cuenta-E-noche3-guarda-tu-racha.png" width="150"> | **Guarda tu racha** | noche 3 · invitado |

> **Decisión.** No dice «crea tu cuenta para desbloquear beneficios». Dice **qué se pierde**.
> Y llega la única noche en que por primera vez hay algo real que perder.
> *Guardarraíl:* si tras el prompt caen los episodios por sesión, el momento estaba mal
> elegido y se retrasa a la noche 5. La conversión a cuenta no puede comprarse con consumo.

### ④ Fuente comprada
| | Pantalla | Estado |
|---|---|---|
| <img src="screens/11-tienda-monedas.png" width="150"> | **Tienda de monedas** | 3 paquetes |

> **Decisión.** Cada paquete se rotula en **capítulos**, no en monedas (`300 · 20 capítulos`).
> Nadie sabe cuánto vale una moneda; todo el mundo sabe cuánto vale un capítulo.

---

## Librería de patrones

| Patrón | Qué resuelve |
|---|---|
| `action-rail` | Columna vertical de acciones (me gusta / comentarios / compartir) en el borde derecho, al alcance del pulgar. Nunca se solapa con el subtítulo quemado ni con los metadatos. |
| `best-value-tag` | Etiqueta que ancla la comparación entre paquetes. Su trabajo es dar un punto de referencia, no presionar: sin un ancla, tres precios sueltos obligan al usuario a construir la comparación él mismo. Qué paquete la lleva es una decisión de negocio, no de diseño. |
| `bottom-sheet-paywall` | Muro como hoja inferior sobre el frame congelado y difuminado, nunca como pantalla nueva. Mantiene el deseo visible mientras se lee el precio. |
| `burned-in-subtitle` | Línea de diálogo quemada sobre el vídeo, centrada, display bold con sombra dura. Es la convención del formato y resuelve un caso observado en el producto real: el reproductor de idilio.tv arranca en mute (hay un botón «Activar sonido»), así que el primer contacto con la escena es solo visual. |
| `confirm-in-place` | El CTA se convierte en confirmación (✓) durante ~880 ms antes de cerrar, en vez de desaparecer al instante. |
| `cycle-completion` | Cierre del ciclo de 7 con la recompensa máxima y reposición del escudo. El contador de noches no se reinicia; lo que se repite es el ciclo. |
| `dismissible` | Toda hoja que pide algo se puede cerrar sin coste y sin repetirse. Si la mecánica necesita insistir, la mecánica está mal puesta. |
| `earned-currency-cta` | El CTA primario es la moneda GANADA cuando existe; la comprada baja a secundaria. Se invierte solo cuando la ganada se agotó. |
| `economy-chip` | Píldora de 28 px con icono y cifra en el HUD superior, fondo translúcido y sin relleno sólido. Techo estricto: como máximo dos, y nunca sobre la cara del actor. |
| `escalating-reward` | La recompensa crece con la constancia (1→2→3). Duplicar es la progresión más legible que existe y no necesita explicación. |
| `hud-mute-on-sheet` | Con el sheet abierto, los chips de economía del HUD se apagan: la economía ya está completa abajo y duplicarla arriba genera ruido y desincronización durante la animación. |
| `iap-packs` | Tres paquetes, uno marcado como mejor valor. Tres es el mínimo para que exista un punto medio y el máximo antes de que la elección pese. |
| `loss-framed-signup` | Registro planteado como seguro sobre algo ya ganado, no como peaje de entrada. |
| `max-faucet` | Techo explícito de la fuente gratuita, calibrado contra el apetito observado de la sesión. Aquí 5 episodios frente a 14: queda de pago el 64% del apetito. |
| `milestone-reward` | Salto de recompensa en la noche donde el dato dice que el producto más gana (aquí la 3, con el 2,4× de D30). Se premia donde el negocio gana, no donde queda bonito. |
| `no-blame-copy` | Al romperse una mecánica de constancia, el copy informa y reabre; nunca culpa. |
| `non-blocking-toast` | Confirmación de progreso que no detiene el video. 2,5–3,4 s. |
| `oauth-stack` | Proveedores de acceso apilados verticalmente y con el mismo peso visual, sin uno destacado. Destacar uno adivina el ecosistema del usuario y penaliza al resto. |
| `optimistic-counter` | El saldo se interpola hacia el valor nuevo en ~620 ms en vez de saltar. El usuario ve bajar su dinero. |
| `post-hoc-notification` | Se informa de lo que ya pasó, no se pide permiso para que pase. Aplica a todo lo que el sistema puede decidir sin ambigüedad. |
| `progress-position` | Barra de 5 px con «vas N de M» y capítulos restantes. Responde «¿dónde estoy?» antes de que la pantalla pregunte «¿cuánto pagas?». |
| `purchase-cta` | CTA de compra que nombra el precio exacto en el propio botón («Desbloquear por 15»), no un genérico «Desbloquear». El usuario tiene que poder hacer la resta antes de tocar. |
| `return-appointment` | Cita explícita con hora («mañana a las 8:00 pm») y recordatorio opcional. Sin esto, el regreso depende de que el usuario se acuerde. |
| `spend-receipt` | Un «−15» que sube y se desvanece sobre el saldo. Es el recibo: hace visible el gasto que el contador por sí solo esconde. |
| `streak-confirmation` | Acuse de recibo de que la noche se acreditó, entregado sin pedir nada a cambio. La acreditación ya ocurrió: esto solo la hace visible. |
| `streak-freeze-badge` | Insignia de escudo disponible, en cian para no confundirse con moneda ganada (marca) ni comprada (ámbar). |
| `streak-freeze-consumed` | El escudo se gasta solo, sin diálogo de confirmación. Cada pregunta al usuario sobre su racha es una oportunidad de que piense en abandonarla. |
| `streak-reset` | Al romperse la racha: se informa, no se regaña, y la recompensa de la noche nueva ya está visible en la misma pantalla. El modo de fallo documentado de las rachas es que al romperse el usuario abandona. |
| `streak-tracker` | Siete lunas numeradas. Hitos (3 y 7) preanunciados con borde magenta antes de alcanzarlos. |
| `swipe-navigation` | Deslizar arriba/abajo cambia de episodio. Es el gesto que el usuario ya trae aprendido de TikTok; cualquier botón de «siguiente» compite con él en vez de reemplazarlo. |
| `value-in-outcome-units` | Los precios se rotulan en la unidad que el usuario entiende (capítulos), no en la unidad interna (monedas). |
| `vertical-video-player` | Reproductor a pantalla completa 9:16 con controles mínimos: pausa por tap, barra de progreso de 2,5 px al borde inferior y sin cronómetro. En microdrama el episodio dura 60–90 s: mostrar el tiempo restante invita a calcular en vez de a seguir. |
| `wallet-row` | Fila compacta con saldo, unidad y precio unitario en la misma línea, más un acceso a recargar. El precio vive junto al saldo, nunca suelto. |

<sub>Tabla generada desde `idilio-racha-de-noches.json`. 33 patrones, todos usados por al menos una pantalla.</sub>

---

## Sistema visual (tokens reales del producto)

Extraídos de `www.idilio.tv` en producción, no inventados.

| Token | Valor | Uso |
|---|---|---|
| `--home-black` | `#000000` | fondo base |
| `--home-surface-1/2/3` | `#0b070f` · `#150d1c` · `#1e1426` | superficies |
| `--home-magenta` | `#d25af0` | acento de marca |
| `--home-violet` | `#6d19e2` | acento secundario, gradientes |
| `--home-cyan` | `#63d6dc` | escudo / informativo |
| `--home-amber` | `#ffb64d` | **moneda comprada** |
| texto base | `#ecedee` | |

**Regla semántica que hace legible la doble moneda:**
la moneda **ganada** y la racha visten violeta→magenta (los colores de la marca: el capítulo
es *de la casa*); la moneda **comprada** viste ámbar. Las dos monedas **nunca** comparten
familia cromática. Eso comunica el principio de doble moneda sin una sola línea de copy.

**Tipografía.** El producto usa `sofiaPro` (UI) y `newHero` (display), ambas de licencia
comercial. El POC sustituye por **Outfit** y **Archivo**, los equivalentes libres más
cercanos en eje geométrico y aperturas. La sustitución se declara; no se disimula.

**Escala tipográfica — 11 pasos.** `10 · 11 · 12 · 13 · 14 · 15 · 17 · 19 · 21 · 24 · 40`.
Antes había **19 tamaños distintos**, muchos separados por medio píxel. Medio píxel no es una
decisión: es ruido. Cada paso tiene un trabajo asignado, y los tokens están aplicados tanto en el
POC como en el archivo de diseño, así que no pueden divergir.

**Ritmo vertical — rejilla de 4 px.** Tras el ajuste, los ocho estados del muro miden
**556–577 px** (antes 565–585) y ninguno scrollea, ni en 430×932 ni en 375×667.

---

## Accesibilidad — verificado, no afirmado

Auditoría con **axe-core** (`a11y-mcp`) sobre `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` y `best-practice`:

```
violaciones: 0   ·   reglas aprobadas: 23
```

**Foco de teclado.** No había ninguno: la pantalla era imposible de recorrer sin ver dónde estabas.
Ahora hay un anillo blanco de 2 px con `:focus-visible` —blanco es el único color con contraste
suficiente tanto sobre las superficies oscuras como sobre el CTA ámbar— y **el reproductor pasa a
`inert` cuando hay una hoja abierta**. Sin eso, tabular desde el sheet llevaba el foco a botones
invisibles detrás: el fallo clásico que axe no detecta, porque esos elementos existen y son
perfectamente accesibles… debajo de otra cosa.

**Movimiento.** Ninguna animación es infinita. El grano del vídeo pasó a estático —en el producto
real el grano viene del vídeo, no de una capa CSS— y la pista de deslizar late cuatro veces y para.
Una pista que late para siempre deja de ser una pista y pasa a ser una insistencia, y además no deja
de consumir batería nunca: en una app que se ve de noche, en el móvil, 22 minutos seguidos.

Tres correcciones que salieron de la auditoría y del cálculo de contraste, no de la intuición:

1. **El gradiente del CTA se corta en `#9b2fe0` y no llega al magenta de marca.** Blanco sobre
   `#d25af0` da **3,25:1** y no pasa AA para texto normal; sobre `#9b2fe0` da **5,42:1**.
   *La marca cede ante la legibilidad.*
2. **El token de texto tenue subió de `0.38` a `0.52` de alfa.** A `0.38` daba **3,20:1** sobre
   `--home-surface-2` — por debajo del 4,5:1 de AA; a `0.52` da **4,97:1**.
3. **Se quitó `maximum-scale=1`** del viewport, que bloqueaba el zoom en móvil.
