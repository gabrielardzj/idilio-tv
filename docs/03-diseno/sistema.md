# Sistema visual

No construí un design system — el brief no lo pide y habría sido tiempo mal gastado. Construí lo mínimo que hace falta para que trece pantallas se vean como una sola cosa: **42 tokens y siete componentes.**

Los tokens están en [`tokens.json`](tokens.json), en formato W3C Design Tokens, y se **generan desde el CSS del prototipo** (`npm run tokens`). El CSS es la fuente de verdad; el archivo de tokens se deriva de él y por construcción no puede desincronizarse.

---

## La regla que sostiene la paleta

> **El oro está racionado.** El único acento cálido de alta luminancia del sistema es `gold-400` (#FFC53D), y está reservado a dos cosas: la moneda y el Pase. Nada más.

A la 1 a.m. con el brillo bajo, la atención va donde está la luz. Si el oro también marcara avisos, promociones y badges, dejaría de significar algo. Racionarlo lo convierte en idioma: **dorado = esto es tuyo, o puede serlo.**

Corolarios:

| Regla | Por qué |
|---|---|
| El blanco máximo es `#F2EBF7`, no `#FFFFFF` | 8% menos de luminancia. 54% de las sesiones son entre 11 p.m. y 2 a.m. |
| Pero el contraste AA es un piso, no una preferencia | El texto terciario era `#7C6E8B` — **3.7:1**, por debajo del 4.5:1 de WCAG AA. axe no lo marcaba porque va sobre degradados que no sabe medir. Atenuar el texto primario es confort; dejar el terciario ilegible no lo es. Ahora es `#8F8896`, **5.2:1**. |
| El violeta es de las acciones de **pago**, nunca de las gratuitas | Separa los dos caminos sin necesidad de leer |
| El cian marca **progreso y racha cumplida** | Es lo ya conseguido; el oro es lo por conseguir |
| No hay rojo en todo el sistema | Ni siquiera cuando se rompe la racha. Un sistema que regaña enseña que es adversario |

---

## Tipografía

**Outfit**, un solo peso variable. Nueve escalones, cada uno con un trabajo:

| Escalón | Tamaño / peso | Dónde vive |
|---|---|---|
| `display` | 42 · 700 · −2px | La hora del próximo pase. El número más grande del sistema, y es una promesa, no un precio. |
| `title-1` | 24 · 700 · −0.6px | El cliffhanger. Primer elemento del muro. |
| `title-2` | 21 · 700 · −0.5px | Título de episodio en el reproductor. |
| `headline` | 16.5 · 700 | Encabezado del Pase; episodios de un paquete. |
| `button` | 15.5 · 700 | Acción primaria. |
| `body` | 13.5 · 400 · 1.5 | Explicaciones de mecánica. |
| `caption` | 12.5 · 600 | Nota al pie de una acción; estado del comodín. |
| `label` | 11 · 700 · +1.2px, versalitas | TU RACHA · MONEDAS · CONTINUARÁ |
| `micro` | 10.5 · 600 | La traducción a episodios. Pequeña, pero está siempre. |

---

## Los siete componentes

### 1 · Chip de saldo (`.wallet`)
La única huella permanente del metajuego dentro del reproductor.

**Anatomía:** moneda · cifra en `gold-300` tabular · traducción a episodios en `micro`.
**Estados:** normal · pulso (al cambiar el saldo, 700 ms) · sin saldo (*"sin episodios"* en vez de *"0 episodios"*).
**Regla:** nunca muestra una cifra sin su traducción. Si no cabe, se recorta la cifra, no la traducción.

### 2 · Tarjeta del Pase (`.pass`)
El elemento con más peso visual de todo el sistema. Es el único que lleva borde dorado, sombra dorada y barrido de luz.

**Estados:**

| Estado | Superficie | Contenido |
|---|---|---|
| Disponible (1) | Degradado dorado + barrido | «Tu Pase de la Noche está listo» |
| Disponible (2, tope) | Igual | «Tienes 2 Pases» + aviso de tope, sin urgencia |
| En espera | Degradado violeta, sin barrido, sin sombra | Hora del reloj + intervalo + «Avísame» |

El cambio de dorado a violeta cuando el pase se gasta no es decorativo: retira la luz del elemento que ya no ofrece nada.

### 3 · Tira de racha (`.streak`)
Siete casillas. La noche 3 lleva escudo en vez de número.

**Estados por casilla:** pendiente (gris) · cumplida (cian) · hoy (dorada, con pop de 500 ms).
**Fila de estado debajo:** «ganarás un comodín en la noche 3» / «tienes 1 comodín» / «tu comodín te cubrió» (ámbar, nunca rojo).
**Accesibilidad:** ningún estado depende solo del color — hay icono y etiqueta de texto en cada casilla.

### 4 · Hoja inferior (`.sheet`)
Contenedor de todo lo que no es video. Radio 30 arriba, borde superior violeta al 20%, entrada de 420 ms desde abajo.

**Regla de orden, invariable:** historia → posición → gratis → pago → racha.

### 5 · Fila de paquete (`.pack`)
Jerarquía deliberadamente invertida respecto de cualquier tienda: **episodios grande, monedas de subtítulo, precio a la derecha.**

**Variantes:** normal · destacado (`best`, borde violeta) · bienvenida (`intro`, borde punteado dorado — punteado porque es una oferta que no se repite).

### 6 · Fila de elección (`.choice`)
Miniatura · título · próximo episodio en dorado · progreso · radio.
Un solo seleccionable a la vez. La selección se marca con borde dorado **y** radio lleno.

### 7 · Botones
Tres niveles, y el nivel comunica quién paga:

| | Uso | Superficie |
|---|---|---|
| `btn-gold` | Usar el pase | Degradado dorado, texto oscuro |
| `btn-violet` | Pagar con monedas, comprar, continuar | Degradado violeta |
| `btn-text` | Alternativa que no queremos empujar | Solo texto |

Altura 54 px (50 en secundarios). Todo cae en el tercio inferior de la pantalla, alcanzable con el pulgar.

---

## Movimiento

Una sola curva, `cubic-bezier(.22, 1, .36, 1)`: rápido al inicio, asentado al final.

| Animación | Duración | Para qué |
|---|---|---|
| Entrada de hoja | 420 ms | Ubica de dónde vino |
| Barrido del Pase | 3.4 s, en bucle | Lo único que se mueve solo. Atrae sin parpadear |
| Pulso del saldo | 700 ms | Confirma que la cifra cambió |
| Pop de la noche | 500 ms | La única celebración del sistema |
| Aparición de la medalla | 550 ms, con rotación | Cierra el desbloqueo |

`prefers-reduced-motion` anula todo. Nada de la información depende del movimiento.

---

## Del prototipo a Figma

El prototipo es la fuente de verdad y hay dos caminos para llevarlo a Figma, según qué se necesite:

> El contraste de los seis tokens de texto se calcula en `npm run verificar`, contra las
> superficies declaradas de cada árbol. Corre en el pipeline: un token que baje de 4.5:1 rompe
> el despliegue.

> **Ya construido.** Los 31 tokens están creados como variables en
> [el archivo de Figma](https://www.figma.com/design/CCI8plwuWvfTV8VBpowN5X), cada uno con su
> *scope* explícito y su **code syntax** apuntando al token CSS real del prototipo
> (`var(--gold-400)`, `var(--sp-4)`). Dev Mode devuelve el token que **existe** en el código,
> no uno inventado. Lo de abajo queda como referencia para reimportarlos en otro archivo.

**Para los tokens** — importar [`tokens.json`](tokens.json) con **Tokens Studio**. Quedan como variables de Figma, agrupadas por superficie / texto / marca / moneda / estado / radio / espaciado / movimiento / tipografía.

**Para las pantallas** — dos opciones:
1. **Capas editables:** el plugin **html.to.design** sobre el prototipo corriendo (`npm run dev`). Importa el DOM como capas de Figma con texto real y auto-layout, no como imagen.
2. **Referencia visual:** los PNG a 3× de [`mobbin-export/flows/`](../../mobbin-export/flows/) — 1170 × 2532, listos para pegar como fondo de un frame de iPhone.

**Regenerar todo:**

```bash
cd poc
npm run tokens    # docs/03-diseno/tokens.json desde styles.css
npm run export    # mobbin-export/ desde el prototipo (con el dev server arriba)
```
