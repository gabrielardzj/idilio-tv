# Registro de dogfooding — Idilio TV
Dogfooding manual: 2026-08-25 · Censo del catálogo, rehecho y corregido: 2026-08-26 · Superficies usadas: web player (idilio.tv) + App Store MX (build 1.20.0, 2026-08-21)

## Qué se pudo usar y qué no
- **idilio.tv es un reproductor web funcional**, no solo un landing. Reproduce episodios, tiene lista de episodios, autoplay al siguiente y muro de bloqueo. No tiene economía (ni saldo, ni recompensas, ni perfil).
- La economía completa vive solo en la app nativa. Evidencia de la app: capturas oficiales de App Store del build vigente (1.20.0) + release notes.

## Hechos verificados (no hipótesis)

### Catálogo y estructura de serie
| Dato | Valor | Fuente |
|---|---|---|
| Serie muestreada | "Pasión a Domicilio" | web player |
| Episodios de la serie | 56 (Temporada 1) | panel "Episodios" |
| Episodios gratis | 1–12 | panel: ep. 13 en adelante marcado "bloqueado" |
| Episodios bloqueados | 44 | 56 − 12 |

### Precio del sumidero
| Dato | Valor | Fuente |
|---|---|---|
| Costo de desbloqueo | **15 monedas / episodio** | muro web ("Se desbloquea en la app con 15 monedas") + paywall nativo ("Costo del episodio: 15") |
| Costo de completar la serie | **660 monedas** | 44 × 15 |

### Paquetes de monedas (paywall nativo, captura oficial)

<!-- cifras-citadas -->
<!-- Los precios tachados de acá abajo son los del producto REAL, no los de la
     propuesta. El guardián de cifras persigue "$2.49" porque la escalera que
     proponemos no lleva ancla tachada; acá es evidencia, no una recaída. -->
| Precio ancla | Precio | Monedas | Badge | Monedas por USD |
|---|---|---|---|---|
| $2.49 | **$0.99** | 180 | SUPER OFERTA 60% | 181.8 |
| $2.49 | **$1.99** | 180 | −20% DTO | 90.5 |
| $4.99 | **$3.99** | 375 | −20% DTO | 94.0 |
| — | (4º paquete) | — | −30% DTO | — |

<!-- /cifras-citadas -->

Rango de IAP en Google Play: **$0.09 – $299.99**.

La ficha de App Store del build 1.20.0 lista además un **pase semanal a $7.99** y uno **mensual a $14.99**. O sea que Idilio ya es un modelo híbrido — monedas y suscripción conviviendo — y el muro no ofrece ninguno de los dos: solo dice que hay que descargar la app.

### Chasis de la app nativa
- Barra superior: logo + **chip de saldo** (ej. 2543) + búsqueda.
- Rieles home: círculos "Volver por tu próxima novela" → Estrenos → Seguir viendo → Lo más visto → Última Hora → Nuestra selección para ti.
- Tab bar de 3: **Inicio · Recompensas · Perfil** (Perfil con punto rojo de notificación).
- Player: overlay tipo TikTok (corazón, comentario, compartir), chip de saldo abajo-izquierda, "ver más" para sinopsis.
- **Ficha de serie:** barra «Volver» y nada más arriba —el título no se repite, va quemado en el arte del póster—, bloque **«Resumen»** con la miniatura a la izquierda y la sinopsis del catálogo al lado, y después **«Capítulos»**: una lista de tarjetas, no una grilla. Cada tarjeta lleva `Capítulo N` en violeta, el número del episodio como título, un galón a la derecha y —en algunos— la píldora **«Interactiva»**. Los bloqueados llevan candado: el primero en violeta encendido, los siguientes atenuados. **En ninguna tarjeta aparece el precio.**
- Release notes 1.20.0 (2026-08-21): *"Downloads for suscriptions / New daily streak UI"* → la racha se está iterando ahora mismo.

## Fricciones observadas de primera mano (web)
1. El reproductor web **no muestra saldo ni economía**: quien llega por un link compartido no ve el sistema, solo un muro.
2. El muro web es un callejón: única salida "Descargar la app". El contexto (serie, episodio, progreso) **no se transfiere** al deep link.
3. La lista de episodios muestra 44 números grises sin precio, sin total, sin "cuánto me falta". La progresión no es legible. **En la app nativa la lista es otra —tarjetas de «Capítulo N», no una grilla— y el resultado es el mismo:** dice cuáles están bloqueados y no dice cuántos faltan, cuánto lleva visto el usuario ni cuánto cuesta abrir el siguiente.
4. El autoplay al siguiente episodio funciona muy bien hasta el ep. 12; en el 13 el loop se corta en seco sin transición.
5. Imágenes de póster bloqueadas por CSP en el web player (error de consola) → el catálogo carga con huecos.

---

## Capturas de la evidencia

| | |
|---|---|
| ![Paywall nativo](evidencia/paywall-nativo-1.20.0.jpg) | ![Home nativo](evidencia/home-nativo.jpg) |
| **Paywall nativo, build 1.20.0.** `Costo del episodio: 15` · `Tu balance: 0` · solo opciones de compra. Dos paquetes distintos entregan las mismas 180 monedas. | **Home nativo.** Chip de saldo arriba a la derecha, tab bar de 3 con *Recompensas* y *Perfil*. La fuente gratuita vive aquí; el sumidero vive en el player. |
| ![Muro web](evidencia/muro-web-ep13.png) | ![Player web](evidencia/player-web.png) |
| **Muro del reproductor web.** *"Se desbloquea en la app con 15 monedas"* y una sola salida: descargar la app. El contexto de serie y episodio se pierde en el salto. | **Reproductor web.** Funciona bien, autoplay al siguiente episodio incluido — pero sin saldo, sin recompensas y sin ninguna huella de la economía. |

**La ficha de serie en la app nativa.** Es la pantalla que el prototipo reproduce, y estas tres capturas son la fuente: de acá salen la estructura, los colores y hasta la píldora «Interactiva».

| | | |
|---|---|---|
| ![Ficha nativa · resumen](evidencia/ficha-nativa-1-resumen.png) | ![Ficha nativa · capítulos](evidencia/ficha-nativa-2-capitulos.png) | ![Ficha nativa · bloqueados](evidencia/ficha-nativa-3-bloqueados.png) |
| **Arriba: «Volver» y «Resumen».** Sin título, sin contador de episodios, sin barra de avance. El póster a la izquierda y la sinopsis del catálogo al lado. | **«Capítulos».** Tarjetas de `Capítulo N` con el número como título y el galón a la derecha. La píldora «Interactiva» marca los episodios con decisión. | **El muro, dicho con un candado.** El capítulo 11 lleva candado violeta encendido; del 12 en adelante la tarjeta entera se apaga. **El precio no aparece en ningún lado.** |

---

## Censo del catálogo completo

Después de la primera pasada me di cuenta de que había generalizado a partir de **una sola serie**. El reproductor web renderiza en servidor la lista de episodios con sus bloqueos, así que escribí un script para medir el catálogo entero. El script está en [`scrape-catalogo.mjs`](scrape-catalogo.mjs) y los datos crudos en [`catalogo.json`](catalogo.json).

Esa segunda medición también estaba mal, y el error es peor que el primero. Lo encontré el 26-ago y rehice el censo desde cero.

**El scraper no estaba leyendo el catálogo.** Raspaba los enlaces del home, que son rieles curados: una selección editorial, no el inventario. El catálogo que el propio sitio declara vive en `sitemap.xml` y tiene **50 series**.

**Y de las 46 fichas que sí visitó, tres devolvieron 200 y no se pudieron parsear.** El script las emitió como `total: 0` y esos ceros se sumaron a los agregados como si fueran series vacías. Ninguna dio error — por eso nadie lo notó. El censo publicado decía 43 series mientras el JSON tenía 46 entradas, y esa contradicción estuvo a la vista todo el tiempo.

Las tres son *La Venganza de una Esposa Después de la Muerte* (65 episodios, 10 gratis), *Las Flores del Amor* (52 episodios, 12 gratis) y *Lágrimas en el Altar* (10 episodios, gratis entera).

**Y el guardián de cifras tampoco servía.** [`verificar-cifras.mjs`](../../poc/scripts/verificar-cifras.mjs) filtraba las entradas con `x.total > 0`, o sea que descartaba exactamente las tres entradas rotas, y después comparaba el resto contra una constante escrita a mano en el propio script. Daba "TODO CONSISTENTE" porque estaba comparando el censo consigo mismo.

Qué se arregló en el scraper:

- Los ids salen del `sitemap.xml`, no del home.
- El total sale del contador que publica la propia ficha ("N episodios"), no de `max(número de episodio)` — que fallaba justamente en las series con huecos de numeración.
- Cada ficha se reintenta tres veces antes de darla por perdida.
- **Si una sola ficha no se puede leer, el script termina con error y no emite censo.** Un censo que se cae es recuperable; uno que miente por omisión, no.

### Lo que corrige

<!-- cifras-citadas -->
<!-- Esta tabla compara las tres mediciones, así que sus celdas del medio traen
     las cifras viejas a propósito. La explicación vive en el encabezado, no en
     cada celda, y por eso una exención por línea no alcanza. -->

| | Primera pasada (una sola serie) | Segunda pasada (rieles del home) | **Real (sitemap, 26-ago)** |
|---|---|---|---|
| Series del catálogo | 1, medida a mano | 43 | **50** — 41 con muro |
| Episodios totales | 56 | 1.885 | **2.230** |
| Episodios gratis por serie | 12 | moda 10 · 32 de 35 | **moda 10 · 37 de 41** |
| "Series de 50 a 80 episodios" (del brief) | la única serie medida | 25 de 43 | **30 de 50** |
| Series de 30 episodios o menos | — | 15 | **17** |
| Mediana de episodios por serie | — | 50 | **50** |

<!-- /cifras-citadas -->

Las excepciones a los 10 gratis son **cuatro**, no tres: *La Herencia del Patriarca Enamorado* (7), *La Mágica Navidad del Amargado Millonario* (11), *Pasión a Domicilio* (12) — la serie que me tocó — y *Las Flores del Amor* (12), que era una de las tres que el censo anterior perdió.

### Lo que confirma

| | |
|---|---|
| Costo de desbloqueo | **15 monedas, sin una sola excepción** en las 41 series con muro |
| Estructura | Bloque gratis al inicio, todo lo demás bloqueado. Ninguna serie mezcla |

### El agregado

| | |
|---|---|
| Series | **50** (41 con muro · 9 enteramente gratis, todas de ≤10 episodios) |
| Episodios totales | **2.230** |
| Episodios gratis | **500** — el 22% del catálogo |
| Episodios bloqueados | **1.728** — el 78% |
| Costo de la serie mediana | 600 monedas ≈ **$6,63** |
| Costo del catálogo completo | 25.920 monedas ≈ **$286** |

*(Dólares calculados al precio de escalera vigente: $1.99 → 180 monedas = 90.5 monedas por dólar.)*

500 + 1.728 son 2.228, dos menos que 2.230. No es un error de suma: dos series tienen un hueco en la numeración de episodios — *Apasionada por el Padre de mi Hijo que no es mi Esposo* y *Pasión Frente a los Colmillos del Conde*, uno cada una — así que el contador que publica la ficha declara un episodio más de los que la lista efectivamente enumera. El JSON lo registra en el campo `huecoDeNumeracion`. En el censo anterior la misma diferencia de dos existía y no estaba explicada en ninguna parte.

### El catálogo, serie por serie

| Serie | Episodios | Gratis | Bloqueados | Costo/ep | Costo total |
|---|---|---|---|---|---|
| El Hermanastro Enamorado | 74 | 10 | 64 | 15 | 960 |
| Mi Esposo es la Muerte | 72 | 10 | 62 | 15 | 930 |
| Enamoradas del Motociclista Mafioso | 70 | 10 | 60 | 15 | 900 |
| Esposa del Playboy Billonario | 70 | 10 | 60 | 15 | 900 |
| Había una Vez un Divorcio: La Doble Vida de Lady Diana | 70 | 10 | 60 | 15 | 900 |
| Rico Padre Pobre Madre | 69 | 10 | 59 | 15 | 885 |
| Esposo Fugitivo Ámame Otra vez | 68 | 10 | 58 | 15 | 870 |
| La Herencia del Patriarca Enamorado | 66 | 7 | 59 | 15 | 885 |
| La Enfermera Infiltrada | 65 | 10 | 55 | 15 | 825 |
| La Venganza de una Esposa Después de la Muerte | 65 | 10 | 55 | 15 | 825 |
| Enamorándome de mi Guardián Prohibido | 64 | 10 | 54 | 15 | 810 |
| Abrázame Fuerte Señor Bombero | 62 | 10 | 52 | 15 | 780 |
| Mi Amante Secreto | 62 | 10 | 52 | 15 | 780 |
| La Venganza de la Abogada | 61 | 10 | 51 | 15 | 765 |
| Creo que mi esposa quiere matarme | 60 | 10 | 50 | 15 | 750 |
| Enamorada de la Voz del Lobo | 60 | 10 | 50 | 15 | 750 |
| La Mesera Millonaria | 60 | 10 | 50 | 15 | 750 |
| La Venganza de la Hija del Esmeraldero | 60 | 10 | 50 | 15 | 750 |
| Quiero a mi Ex Fuera de mi Vida | 60 | 10 | 50 | 15 | 750 |
| Pasión a Domicilio | 56 | 12 | 44 | 15 | 660 |
| Las Flores del Amor | 52 | 12 | 40 | 15 | 600 |
| La Mágica Navidad del Amargado Millonario | 51 | 11 | 40 | 15 | 600 |
| Apasionada por el Padre de mi Hijo que no es mi Esposo | 50 | 10 | 39 | 15 | 585 |
| Aún Eres Tú | 50 | 10 | 40 | 15 | 600 |
| Aún Sigues Siendo Tú | 50 | 10 | 40 | 15 | 600 |
| El Juego de la Herencia | 50 | 10 | 40 | 15 | 600 |
| El Pecado de Nuestro Amor | 50 | 10 | 40 | 15 | 600 |
| Intenciones ocultas | 50 | 10 | 40 | 15 | 600 |
| La Niñera Poderosa | 50 | 10 | 40 | 15 | 600 |
| Mi Apuesto Guardaespaldas | 50 | 10 | 40 | 15 | 600 |
| La Más Hermosa y el Espejo | 49 | 10 | 39 | 15 | 585 |
| Buscando a mi Padre me Enamoré de mi Hermano | 40 | 10 | 30 | 15 | 450 |
| Milagro de Amor en Nochebuena | 31 | 10 | 21 | 15 | 315 |
| La Bandida que me Amó | 30 | 10 | 20 | 15 | 300 |
| Mi Final Feliz | 30 | 10 | 20 | 15 | 300 |
| Mi Mejor Pasajera | 30 | 10 | 20 | 15 | 300 |
| Sangre Enemiga | 30 | 10 | 20 | 15 | 300 |
| Simona la Libertadora Enamorada | 30 | 10 | 20 | 15 | 300 |
| Tres Meses de Amor | 30 | 10 | 20 | 15 | 300 |
| Somos Cuatro | 24 | 10 | 14 | 15 | 210 |
| Pasión Frente a los Colmillos del Conde | 21 | 10 | 10 | 15 | 150 |
| Chamado na Madrugada | 10 | 10 | 0 | — | — |
| Dulce Destino | 10 | 10 | 0 | — | — |
| La Mujer en el Bar | 10 | 10 | 0 | — | — |
| La Prometida del Enemigo | 10 | 10 | 0 | — | — |
| La Secretaria Heredera | 10 | 10 | 0 | — | — |
| Lágrimas en el Altar | 10 | 10 | 0 | — | — |
| Sesiones Prohibidas | 10 | 10 | 0 | — | — |
| Última Hora | 10 | 10 | 0 | — | — |
| Amor a Muerte | 8 | 8 | 0 | — | — |
