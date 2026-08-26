# 4. El POC

**`/poc`** · React + TypeScript + Vite, sin librerías de UI. CSS propio con tokens (los valores del sistema —colores, tipografías, espacios— con nombre propio).
**`/mobbin-export`** · 22 pantallas en 8 flujos, capturadas automáticamente de los dos prototipos.

---

## 4.1 Qué está construido

El brief acota el alcance a *"la pantalla o el momento donde ocurre la mecánica"*. El momento es **el muro de desbloqueo** — pero un muro no se puede juzgar en el vacío, así que el prototipo tiene también el camino que lleva hasta él:

| Pantalla | Para qué está |
|---|---|
| **Home** | Las 41 series reales con muro, con sus cifras medidas y **sus pósters reales**, sobre la estructura de la app tal como es hoy: los rieles —las filas horizontales de pósters— en el orden real (Estrenos, Seguir viendo, Lo más visto y los géneros, de «Amores Prohibidos» a «Nuestra selección para ti»). Dos detalles son la propuesta dicha en la navegación: el saldo lleva su traducción a episodios, y **la pestaña «Recompensas» ya no existe** — su contenido se mudó al muro. |
| **Ficha de serie** | La pantalla de la app nativa tal como es hoy, capítulo por capítulo: «Volver», «Resumen» con el póster y **la sinopsis real del catálogo**, y la lista de «Capítulo N» con la píldora «Interactiva» y el candado. Encima, tres cosas que la ficha real no dice: dónde vas, qué ya viste, y **qué abre el siguiente** —el pase si lo tienes, el precio si no— dicho en la tarjeta donde está el muro. |
| **Player** (el reproductor) | Se desliza hacia arriba para avanzar y hacia abajo para retroceder, como en el producto. |

Y el muro, con sus trece estados:

| # | Estado | Qué demuestra |
|---|---|---|
| 1 | Player · episodio gratis | El chip de saldo —la pastilla de monedas— con traducción a episodios; progreso de serie |
| 2 | Muro · pase disponible | La jerarquía: historia → progreso → gratis → pago → racha |
| 3 | Elección de serie | El recurso escaso que hay que asignar |
| 4 | Desbloqueo + racha avanza | Recompensa, bono de noche 3, comodín ganado |
| 5 | Player · episodio abierto | El regreso al loop —el ciclo de ver y seguir— en un toque |
| 6 | Muro · pase gastado (la cita) | «Hoy a las 21:30 · tu hora de siempre», el intervalo debajo, y avísame |
| 7 | Muro · con saldo | El pago sube a primario, el saldo se declara en episodios |
| 8 | Tienda | Episodios grandes, monedas de subtítulo, precio por episodio |
| 9 | El comodín te cubrió | La mecánica de perdón, sin nada que reclamar |
| 10 | Se cortó la racha | El fallo sin castigo — y sin oferta para "recuperarla" pagando |
| 11 | Dos pases acumulados (tope) | El anti-FOMO: faltar no cuesta, volver seguido sigue rindiendo más |
| 12 | Guardar la racha | El prompt de cuenta con las tres cifras en juego |
| 13 | Mi economía | Fuentes, sumidero y posición, en una sola vista |

Y tres más en [`web/`](../../web/), sobre el stack real, que son **rutas prerrenderizadas** y no
estados de un panel: el pase listo, la cita de las 21:30 con «Avísame», y el contador de 42 minutos
donde los segundos vuelven a ser el héroe.

**El recorrido completo se verifica solo.** `npm run recorrer` maneja el prototipo como una persona —home → una serie sin empezar → ver los gratis → chocar con el muro— y comprueba once cosas, entre ellas que el muro abra con la historia antes que con el precio. Corre en el pipeline.

La distinción con el panel de revisión importa: saltar a un estado demuestra que el estado existe, no que se pueda llegar a él. Un fallo tan básico como que **el episodio 1 de una serie sin empezar abra el muro en vez del player** —la condición mira los episodios vistos y no los gratis— es invisible para el panel y evidente para el recorrido.

**Es un prototipo funcional, no un clickable.** El estado vive en un reducer real (`src/lib/state.ts`), el countdown corre contra un reloj, el saldo se descuenta, la racha avanza, el comodín se consume solo y la emisión está topada en un pase por noche. Se puede llegar a cualquier estado jugando, sin usar el panel lateral.

En `src/lib/economy.ts`, `PASS_COOLDOWN_MS` es el **techo de emisión** —no se genera más de un pase por noche— y no el reloj que acredita: la acreditación ocurre al terminar un episodio, y la cita de mañana la ancla `HORA_HABITUAL`.

## 4.2 Cómo correrlo

```bash
cd poc
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ — funciona también abierto desde el disco
npm run export     # regenera mobbin-export/ desde el POC (con el dev server arriba)
```

El **panel de la derecha** (visible en pantallas ≥900px) sirve para saltar a cualquier estado y para adelantar el reloj. Está fuera del teléfono a propósito: es andamio de revisión, no producto.

En móvil el panel desaparece y el POC ocupa la pantalla completa.

## 4.3 Los datos son reales

Todo lo económico está verificado en el producto en producción, no inventado:

| Constante | Valor | Dónde se verificó |
|---|---|---|
| Costo de episodio | 15 monedas | Muro de idilio.tv + paywall nativo (el muro de pago de la app) |
| Episodios gratis por serie | **10** (moda: 37 de las 41 series con muro) | Censo de las 50 series del catálogo |
| Series del catálogo | 50 · 2.230 episodios | Censo |
| Episodios gratis en total | 500 (22% del catálogo) | Censo |
| Precio de la serie mediana | 600 monedas ≈ $ 21.000 | 40 bloqueados × 15, al peldaño regular |
| Paquetes actuales | 180/$ 2.500 · 375/$ 13.500 · 725/$ 25.500 | Pestaña Recompensas, app nativa, storefront CO |
| Fuentes gratuitas | anuncio 15 ×10 diarios · racha diaria 15·40·60·50·40·45·200 · tareas 90 | Recompensas y modal de racha |
| Pase Idilio | $ 12.500 semanal · $ 24.500 mensual | Pestaña Recompensas, app nativa |

**Y las cifras se verifican solas.** `npm run verificar` corre 57 comprobaciones de los
documentos contra el código y contra el censo del catálogo: 48 son cifras —episodios, monedas,
precios en pesos, porcentajes, los topes de las fuentes gratuitas y los conteos que anuncian los
encabezados— y 9 son invariantes que ninguna cifra sola expresa: que cada serie cuadre, que la
escalera propuesta baje en cada escalón, que la real **no** lo haga en el último, que la de la
racha diaria baje después del día 3, que la fuente gratuita de hoy supere el consumo semanal, que
ningún paquete lleve precio tachado.
Aparte, rastrea los textos buscando cifras que se corrigieron en el camino y podrían haber
sobrevivido a una edición, y audita el contraste de los tokens de texto. Corre en el pipeline
antes de cada build, así que una cifra vieja rompe el despliegue en vez de llegar al entregable.

La número 44 es el guardián contándose a sí mismo: compara las comprobaciones que corrió contra
las que este párrafo publica, y falla si no coinciden. Era el único lugar del entregable donde una
cifra podía envejecer sin que nadie se enterara, porque el guardián miraba todos los documentos
menos el que lo describe a él.

`src/lib/economy.ts` marca cada constante como **REAL** o **PROPUESTA**. Es, a la vez, el modelo del POC y la especificación de la economía.

Las tres series del POC son reales y están elegidas para cubrir la moda y los dos extremos del censo: *La Enfermera Infiltrada* con 10 gratis (la moda: 37 de las 41 series con muro), *Pasión a Domicilio* con 12 (una de las dos que más regalan, junto con *Las Flores del Amor*) y *La Herencia del Patriarca Enamorado* con 7 (la que menos regala).

Entre las 41 series con muro la distribución de gratis tiene cuatro valores —una con 7, 37 con 10, una con 11 y dos con 12—, así que las tres del prototipo dejan sin representar a *La Mágica Navidad del Amargado Millonario*, la única con 11. Los extremos son lo que hay que poder juzgar en el muro; el caso de 11 no agrega nada que 10 y 12 no muestren ya.

## 4.4 Cinco decisiones que tomó el prototipo, no el documento

Cinco reglas del diseño no salieron de escribirlo sino de construirlo y de medir el catálogo. Las dejo acá porque explican por qué la mecánica tiene la forma que tiene.

**1 · El pase se entrega al ver, no por reloj.** El derecho se emite cada noche, pero se acredita cuando el usuario termina un episodio. Así la adopción de la fuente es del ~100% por construcción, en vez de depender de que llegue al muro — es la corrección directa al 19% de reclamo. La regla está tomada de la versión paralela del reto, donde está mejor resuelta. Y como acreditar en silencio dejaría el metajuego invisible —el defecto que este trabajo corrige—, el acuse es un toast de dos segundos: *«Noche 3 · +1 pase · +30 monedas»*.

**2 · El héroe del estado de espera es la hora, no el countdown.** Un `17h 47m 03s` en grande comunica *«falta muchísimo»*, que es el mensaje opuesto al buscado. La pantalla muestra la hora del reloj (`HOY A LAS 21:30`, la hora de siempre del usuario) con el intervalo en chico debajo. El countdown vuelve a ser héroe solo cuando falta menos de una hora.

**3 · Los pases se guardan hasta dos; no caducan.** El «úsalo o piérdelo» es la regla que sale sola al diseñar una fuente diaria, y es la que hundió al Daily Pass de Webtoon: durante cinco años la queja dominante de sus lectores fue que convertía leer en una tarea, y la mecánica se retiró en mayo de 2025. Es la misma trampa que el diagnóstico le señala a la racha diaria de Idilio. Con tope 2, faltar una noche no cuesta nada y volver seguido sigue rindiendo más. Detalle completo en [§3.4bis](../03-diseno/#34bis--el-precedente-revisado-en-contra).

**4 · El badge de la tienda se calcula contra la serie que el usuario está viendo.** La forma fácil es fijar *«Una serie completa»* sobre el paquete de 660 monedas, porque *Pasión a Domicilio* cuesta exactamente eso — y es la única. El censo muestra que las series van de 150 a 960 monedas: el badge fijo sería inexacto en 40 de las 41 series con muro, y en **19 de las 41 (el 46%)** el paquete directamente no alcanzaría para terminarla. Ese segundo caso es el que cuesta confianza, porque el usuario paga creyendo el badge y sigue frente al muro. Por eso la tienda abre con la meta calculada de su serie y el badge cae sobre el paquete que de verdad alcanza: o es cierto, o no aparece.

*El 46% son 19 de las 41 series con muro, no una fracción de las compras: ponderar por compras exigiría volumen de ventas, que el censo del catálogo no tiene.*

**5 · La escalera se mide en precio por episodio, en pesos.** Contar monedas por unidad de dinero es lo que le permite al producto llamar escalera a algo que no sube. En la unidad legible —pesos por episodio— la real es **$ 540 → $ 531 → $ 599**: se aplana y en el último escalón empeora. La propuesta queda monótona de verdad: **$ 540 → $ 510 → $ 499**.

**Y las cinco están sostenidas por el pipeline, no por la revisión.** `verificar` compara las cifras de estos documentos contra el código y contra el censo; `recorrer` maneja el prototipo como una persona y comprueba en cada pantalla el estado **y** la identidad de la serie; `acreditacion` avanza el reloj noche por noche y verifica la emisión, la entrega, el tope, el comodín y la vuelta de la escalera. Los tres corren antes de cada despliegue: una cifra vieja o una regla rota no llegan al entregable.

## 4.5 Qué queda fuera, a propósito

Navegación general, home, catálogo, búsqueda, perfil, reproducción de video real, compra real por IAP (in-app purchase: la compra dentro de la app) y persistencia entre sesiones. El brief lo excluye explícitamente, y agregarlo diluiría la profundidad del único momento que importa evaluar.

## 4.6 Accesibilidad y contexto de uso

- Objetivos táctiles ≥44 px; todo alcanzable con el pulgar en el tercio inferior.
- Roles y `aria-label` en diálogos, temporizador, listas de selección y el chip de saldo (que se anuncia como *"Saldo: 90 monedas, 6 episodios"*).
- `prefers-reduced-motion` respetado: todas las animaciones se anulan.
- Blanco máximo `#F2EBF7` en lugar de `#FFFFFF`, pensado para brillo bajo en la franja de 11 p.m. a 2 a.m. — pero **ningún** token de texto por debajo de 4.5:1, y el ratio se calcula en el pipeline.
- Ningún estado depende solo del color: la racha combina color, icono y etiqueta de texto.

Los dos árboles auditados con **axe-core** (`wcag2a`, `wcag2aa`, `wcag21aa`, `best-practice`): **0 violaciones** en las tres superficies desplegadas — prototipo, galería de flujos y versión sobre el stack. La auditoría cubre las cuatro fallas que más se cuelan en un prototipo de este tipo: `maximum-scale` bloqueando el zoom, ausencia de landmark `main`, contenido fuera de landmarks y orden de encabezados.
