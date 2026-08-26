# 4. El POC

**`/poc`** · React + TypeScript + Vite, sin librerías de UI. CSS propio con tokens.
**`/mobbin-export`** · 21 pantallas en 8 flujos, capturadas automáticamente de los dos prototipos.

---

## 4.1 Qué está construido

El brief acota el alcance a *"la pantalla o el momento donde ocurre la mecánica"*. El momento es **el muro de desbloqueo** — pero un muro no se puede juzgar en el vacío, así que el prototipo tiene también el camino que lleva hasta él:

| Pantalla | Para qué está |
|---|---|
| **Home** | Las 41 series reales con muro, con sus cifras medidas y **sus pósters reales**, en el chasis de la app: los rieles en el orden real (Estrenos, Seguir viendo, Lo más visto y los géneros, de «Amores Prohibidos» a «Nuestra selección para ti»). Dos detalles son la propuesta dicha en la navegación: el saldo lleva su traducción a episodios, y **la pestaña «Recompensas» ya no existe** — su contenido se mudó al muro. |
| **Ficha de serie** | Donde hoy hay 40 números grises, la grilla dice dónde vas, qué está abierto y qué cuesta terminar. |
| **Player** | Se desliza hacia arriba para avanzar y hacia abajo para retroceder, como en el producto. |

Y el muro, con sus trece estados:

| # | Estado | Qué demuestra |
|---|---|---|
| 1 | Player · episodio gratis | El chip de saldo con traducción a episodios; progreso de serie |
| 2 | Muro · pase disponible | La jerarquía: historia → progreso → gratis → pago → racha |
| 3 | Elección de serie | El recurso escaso que hay que asignar |
| 4 | Desbloqueo + racha avanza | Recompensa, bono de noche 3, comodín ganado |
| 5 | Player · episodio abierto | El regreso al loop en un toque |
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

Esa comprobación ya encontró un bug que el panel escondía: **el episodio 1 de cualquier serie sin empezar abría el muro en vez del player**, porque la condición miraba los episodios vistos y no los gratis. Saltar a un estado con el panel demuestra que el estado existe, no que se pueda llegar a él.

**Es un prototipo funcional, no un clickable.** El estado vive en un reducer real (`src/lib/state.ts`), el countdown corre contra un reloj, el saldo se descuenta, la racha avanza, el comodín se consume solo y la emisión está topada en un pase por noche. Se puede llegar a cualquier estado jugando, sin usar el panel lateral.

*Acá decía «y el pase entra en cooldown de 24 h», que describía la mecánica vieja tres párrafos antes de que [§4.4](#44-cinco-cosas-que-cambiaron-por-verificar-y-por-usar-el-prototipo) anuncie que se cambió.* En `src/lib/economy.ts` el `PASS_COOLDOWN_MS` sobrevive como **techo de emisión** —no se genera más de un pase por noche—, no como el reloj que acredita: eso pasa al terminar un episodio, y la cita de mañana la ancla `HORA_HABITUAL`.

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
| Costo de episodio | 15 monedas | Muro de idilio.tv + paywall nativo |
| Episodios gratis por serie | **10** (moda: 37 de las 41 series con muro) | Censo de las 50 series del catálogo |
| Series del catálogo | 50 · 2.230 episodios | Censo |
| Episodios gratis en total | 500 (22% del catálogo) | Censo |
| Precio de la serie mediana | 600 monedas ≈ $6.63 | 40 bloqueados × 15 |
| Paquetes actuales | $0.99/180 · $1.99/180 · $3.99/375 | Captura oficial del paywall (build 1.20.0) |

**Y las cifras se verifican solas.** `npm run verificar` corre 41 comprobaciones de los
documentos contra el código y contra el censo del catálogo: 35 son cifras (episodios, monedas,
precios, porcentajes) y 6 son invariantes que ninguna cifra sola expresa —que cada serie cuadre,
que la escalera de precios baje en cada escalón, que ningún paquete lleve precio tachado—.
Aparte, rastrea los textos buscando cifras que se corrigieron en el camino y podrían haber
sobrevivido a una edición, y audita el contraste de los tokens de texto. Corre en el pipeline
antes de cada build, así que una cifra vieja rompe el despliegue en vez de llegar al entregable.

`src/lib/economy.ts` marca cada constante como **REAL** o **PROPUESTA**. Es, a la vez, el modelo del POC y la especificación de la economía.

Las tres series del POC son reales y están elegidas para cubrir la moda y los dos extremos del censo: *La Enfermera Infiltrada* con 10 gratis (la moda: 37 de las 41 series con muro), *Pasión a Domicilio* con 12 (una de las dos que más regalan, junto con *Las Flores del Amor*) y *La Herencia del Patriarca Enamorado* con 7 (la que menos regala).

*Acá decía «las tres estructuras que existen en el catálogo». Son cuatro.* Entre las 41 series con muro la distribución de gratis tiene cuatro valores: una con 7, 37 con 10, una con 11 y dos con 12. Así que las tres del POC dejan sin representar a *La Mágica Navidad del Amargado Millonario*, la única con 11. No cambié la selección —los extremos son lo que hay que poder juzgar en el muro—, pero decir «las tres» era contar mal el propio censo.

## 4.4 Cinco cosas que cambiaron por verificar y por usar el prototipo

**El Pase dejó de colgar de un reloj.** Acreditaba uno cada 24 h. Al leer la versión paralela del reto vi que acreditar **al terminar un episodio** es mejor: la adopción de la fuente pasa a ~100% por construcción, en vez de depender de que el usuario llegue al muro. Es la corrección directa al 19% de reclamo. Y como acreditar en silencio dejaría el metajuego invisible —el defecto que este trabajo corrige—, el acuse es un toast de dos segundos: *«Noche 3 · +1 pase · +30 monedas»*.

**El countdown gigante estaba mal.** La primera versión mostraba `17h 47m 03s` como héroe. Al usarlo, comunica *«falta muchísimo»* — el mensaje opuesto al buscado. Se reemplazó por la hora del reloj (`HOY A LAS 21:30`, la hora de siempre del usuario) con el intervalo debajo. El countdown vuelve a ser héroe solo cuando falta menos de una hora.

**El pase caducaba, y eso era el error de Webtoon otra vez.** La primera versión decía *"no se acumula, el que no se usa se pierde"*. Al verificar el precedente — el Daily Pass de Webtoon, retirado en mayo de 2025 — resultó que la queja dominante de sus lectores durante cinco años fue justamente el "úsalo o piérdelo": convertía leer en una tarea. Era la misma trampa que el diagnóstico le señala a la racha diaria de Idilio, reintroducida sin darme cuenta. Los pases ahora se acumulan hasta 2: faltar una noche no cuesta nada y volver seguido sigue rindiendo más. Detalle completo en [§3.4bis](../03-diseno/#34bis--el-precedente-revisado-en-contra).

**Tocabas una historia y el reproductor te daba otra.** Es el peor fallo que encontré, y llevaba ahí desde el principio. El home muestra las 50 series del censo y la ficha de cualquiera funciona bien — pero el player y el muro leían un `seriesId` que solo se movía para las **tres** series con guion escrito. Abrir cualquiera de las otras 47 te dejaba viendo *Pasión a Domicilio* con un muro que decía *«quedan 44 episodios de Pasión a Domicilio»*. Yo había pedido *Enamoradas del Motociclista Mafioso*.

La raíz era una duplicación: el estado guardaba el progreso dos veces, en `vistos` (por id del catálogo) y en `unlocked` (por las tres con guion), o sea dos espacios de nombres para el mismo hecho. Se unificaron en el del catálogo, y `serieDe()` arma la serie desde el censo cuando no hay guion: título, total y gratis son cifras medidas. El muro cae entonces en *«La historia sigue.»* — que es verdad. Inventarle un cliffhanger a un contenido que no leyó nadie habría sido peor.

*Por qué no lo vio nadie antes.* [`recorrer.mjs`](../../poc/scripts/recorrer.mjs) caminaba justo por ese camino y pasaba, porque comprobaba `data-state` y nunca la **identidad**: el estado era el correcto y la historia era otra. Ahora comprueba las dos cosas en cada pantalla y camina además el flujo del pase entero —elegir serie, desbloquear, volver al episodio—, que es el corazón de la intervención y hasta hoy no lo recorría nadie. Son 19 comprobaciones donde había 11. Con el fallo puesto a propósito, caen cuatro y señalan la sustitución.

**La hoja del pase desmentía la mecánica.** Decía, quemado en el componente: *«Tienes un pase por noche. El que no uses hoy no se acumula.»* Es literalmente la regla vieja — el «úsalo o piérdelo» que [§3.4bis](../03-diseno/#34bis--el-precedente-revisado-en-contra) documenta como el error que hundió al Daily Pass de Webtoon y que esta mecánica corrigió. La pantalla central de la intervención le decía al usuario lo contrario de lo que el sistema hace. Sobrevivió a todas las correcciones del documento porque **nadie probaba el texto de la UI**; ahora sale del estado y el recorrido falla si vuelve a prometer que el pase caduca.

*Y la elección dejaba fuera la serie que estabas viendo.* Listaba solo las tres con guion, ordenadas por progreso: la historia que el usuario tenía delante podía no aparecer, y la hoja abría sin ninguna opción marcada. Ahora la del muro va siempre primera.

**El documento prometía un pase que el código no entregaba.** El diseño dice que el pase se *emite por reloj* y se *entrega al ver*, y que por eso al volver de una noche de ausencia hay **dos** esperando. Las dos implementaciones —el reducer del prototipo y `credit_night()` en SQL— entregaban `+1` por visita. La diferencia solo se nota en el caso que la mecánica existe para cubrir: quien gastó su pase anoche y faltó hoy volvía a encontrar uno solo, o sea *use it or lose it* — el error de Webtoon, otra vez, ahora escondido en una línea de código en vez de en una frase. Se corrigió en las dos, y ahora [`scripts/acreditacion.mjs`](../../poc/scripts/acreditacion.mjs) lo sostiene en CI: le devolví el `+1` fijo al reducer y la prueba cae señalando exactamente esa regla.

*Por qué hacía falta una prueba nueva.* [`recorrer.mjs`](../../poc/scripts/recorrer.mjs) evita el panel del director a propósito, porque saltar a un estado no prueba que se pueda llegar a él. Pero estas reglas hablan del **paso del tiempo**, y no hay forma de esperar una noche dentro de una prueba: ahí el panel es la única vía. Son dos scripts porque prueban dos cosas distintas, no por comodidad.

**El badge «Una serie completa» era falso en 40 de las 41 series con muro.** Estaba fijo sobre el paquete de 660 monedas porque *Pasión a Domicilio* cuesta exactamente eso — y es la única que cuesta exactamente eso. El censo mostró que las series van de 150 a 960 monedas, y los dos números que salen de ahí dicen cosas distintas: el badge es literalmente inexacto en 40 de 41, y en **19 de las 41 (el 46%)** el paquete directamente no alcanza para terminar la serie. Ese segundo caso es el que cuesta confianza, porque el usuario paga creyendo el badge y sigue frente al muro. Ahora la tienda abre con la meta calculada de la serie que el usuario está viendo y el badge cae sobre el paquete que de verdad alcanza.

*Acá decía «en el 46% de las compras».* El 46% son 19 de las 41 series con muro, no una fracción de las compras: ponderar por compras exigiría volumen de ventas, que el censo del catálogo no tiene.

**La tienda se contradecía a sí misma.** La primera versión mostraba «monedas por dólar» y el pie decía *«cada paquete rinde más por dólar que el anterior»* — pero los números daban 182, 151, 165, 180. Es exactamente el defecto que el diagnóstico le señala al producto real, reproducido por descuido. Se corrigió a **precio por episodio**, que además es la unidad legible, y la escalera quedó monótona de verdad: $0.15 → $0.11 → $0.10.

## 4.5 Qué queda fuera, a propósito

Navegación general, home, catálogo, búsqueda, perfil, reproducción de video real, compra real por IAP y persistencia entre sesiones. El brief lo excluye explícitamente y agregarlo diluiría la profundidad del único momento que sí importa evaluar.

## 4.6 Accesibilidad y contexto de uso

- Objetivos táctiles ≥44 px; todo alcanzable con el pulgar en el tercio inferior.
- Roles y `aria-label` en diálogos, temporizador, listas de selección y el chip de saldo (que se anuncia como *"Saldo: 90 monedas, 6 episodios"*).
- `prefers-reduced-motion` respetado: todas las animaciones se anulan.
- Blanco máximo `#F2EBF7` en lugar de `#FFFFFF`, pensado para brillo bajo en la franja de 11 p.m. a 2 a.m. — pero **ningún** token de texto por debajo de 4.5:1, y el ratio se calcula en el pipeline.
- Ningún estado depende solo del color: la racha combina color, icono y etiqueta de texto.

Los dos árboles auditados con **axe-core** (`wcag2a`, `wcag2aa`, `wcag21aa`, `best-practice`): **0 violaciones** en las tres superficies desplegadas — prototipo, galería de flujos y versión sobre el stack. La primera pasada del prototipo encontró cuatro — `maximum-scale` bloqueando el zoom, falta de landmark `main`, contenido fuera de landmarks y orden de encabezados — y están corregidas.
