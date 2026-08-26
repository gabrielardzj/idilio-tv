# Registro de dogfooding — Idilio TV
Fecha: 2026-08-25 · Superficies usadas: web player (idilio.tv) + App Store MX (build 1.20.0, 2026-08-21)

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
| Precio ancla | Precio | Monedas | Badge | Monedas por USD |
|---|---|---|---|---|
| $2.49 | **$0.99** | 180 | SUPER OFERTA 60% | 181.8 |
| $2.49 | **$1.99** | 180 | −20% DTO | 90.5 |
| $4.99 | **$3.99** | 375 | −20% DTO | 94.0 |
| — | (4º paquete) | — | −30% DTO | — |

Rango de IAP en Google Play: **$0.09 – $299.99**.

### Chasis de la app nativa
- Barra superior: logo + **chip de saldo** (ej. 2543) + búsqueda.
- Rieles home: círculos "Volver por tu próxima novela" → Estrenos → Seguir viendo → Lo más visto → Última Hora → Nuestra selección para ti.
- Tab bar de 3: **Inicio · Recompensas · Perfil** (Perfil con punto rojo de notificación).
- Player: overlay tipo TikTok (corazón, comentario, compartir), chip de saldo abajo-izquierda, "ver más" para sinopsis.
- Release notes 1.20.0 (2026-08-21): *"Downloads for suscriptions / New daily streak UI"* → la racha se está iterando ahora mismo.

## Fricciones observadas de primera mano (web)
1. El reproductor web **no muestra saldo ni economía**: quien llega por un link compartido no ve el sistema, solo un muro.
2. El muro web es un callejón: única salida "Descargar la app". El contexto (serie, episodio, progreso) **no se transfiere** al deep link.
3. La lista de episodios muestra 44 números grises sin precio, sin total, sin "cuánto me falta". La progresión no es legible.
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

---

## Censo del catálogo completo

Después de la primera pasada me di cuenta de que había generalizado a partir de **una sola serie**. El reproductor web renderiza en servidor la lista de episodios con sus bloqueos, así que medí las 43 series del catálogo. El script está en [`scrape-catalogo.mjs`](scrape-catalogo.mjs) y los datos crudos en [`catalogo.json`](catalogo.json).

### Lo que corrige

| Afirmación de la primera pasada | Realidad medida |
|---|---|
| "12 episodios gratis por serie" | **La moda es 10** (32 de 35 series con muro). *Pasión a Domicilio* — la serie que me tocó — es una de las tres excepciones. |
| "Series de 50 a 80 episodios" (del brief) | Solo **25 de 43**. Hay 15 series de 30 episodios o menos. Mediana real: 50. |

### Lo que confirma

| | |
|---|---|
| Costo de desbloqueo | **15 monedas, sin excepción** en las 35 series con muro |
| Estructura | Bloque gratis al inicio, todo lo demás bloqueado. Ninguna serie mezcla |

### El agregado

| | |
|---|---|
| Series | **43** (35 con muro · 8 completamente gratis, todas de ≤10 episodios) |
| Episodios totales | **1.885** |
| Episodios gratis | **428** — el 23% del catálogo |
| Episodios bloqueados | **1.455** — el 77% |
| Costo de la serie mediana | 600 monedas ≈ **$6.63** |
| Costo del catálogo completo | 21.825 monedas ≈ **$241** |

*(Dólares calculados al precio de escalera vigente: $1.99 → 180 monedas = 90.5 monedas por dólar.)*

### El catálogo, serie por serie

| Serie | Episodios | Gratis | Bloqueados | Costo/ep | Costo total |
|---|---|---|---|---|---|
| El Hermanastro Enamorado | 74 | 10 | 64 | 15 | 960 |
| Mi Esposo es la Muerte | 72 | 10 | 62 | 15 | 930 |
| Enamoradas del Motociclista Mafioso | 70 | 10 | 60 | 15 | 900 |
| Esposa del Playboy Billonario | 70 | 10 | 60 | 15 | 900 |
| Había una Vez un Divorcio: La Doble Vida de Lady Diana | 70 | 10 | 60 | 15 | 900 |
| Rico Padre Pobre Madre | 69 | 10 | 59 | 15 | 885 |
| La Herencia del Patriarca Enamorado | 66 | 7 | 59 | 15 | 885 |
| La Enfermera Infiltrada | 65 | 10 | 55 | 15 | 825 |
| Enamorándome de mi Guardián Prohibido | 64 | 10 | 54 | 15 | 810 |
| Abrázame Fuerte Señor Bombero | 62 | 10 | 52 | 15 | 780 |
| Mi Amante Secreto | 62 | 10 | 52 | 15 | 780 |
| La Venganza de la Abogada | 61 | 10 | 51 | 15 | 765 |
| Creo que mi esposa quiere matarme | 60 | 10 | 50 | 15 | 750 |
| Enamorada de la Voz del Lobo | 60 | 10 | 50 | 15 | 750 |
| Quiero a mi Ex Fuera de mi Vida | 60 | 10 | 50 | 15 | 750 |
| Pasión a Domicilio | 56 | 12 | 44 | 15 | 660 |
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
| Simona la Libertadora Enamorada | 30 | 10 | 20 | 15 | 300 |
| Tres Meses de Amor | 30 | 10 | 20 | 15 | 300 |
| Somos Cuatro | 24 | 10 | 14 | 15 | 210 |
| Pasión Frente a los Colmillos del Conde | 21 | 10 | 10 | 15 | 150 |
| Chamado na Madrugada | 10 | 10 | 0 | — | — |
| Dulce Destino | 10 | 10 | 0 | — | — |
| La Mujer en el Bar | 10 | 10 | 0 | — | — |
| La Prometida del Enemigo | 10 | 10 | 0 | — | — |
| La Secretaria Heredera | 10 | 10 | 0 | — | — |
| Sesiones Prohibidas | 10 | 10 | 0 | — | — |
| Última Hora | 10 | 10 | 0 | — | — |
| Amor a Muerte | 8 | 8 | 0 | — | — |
