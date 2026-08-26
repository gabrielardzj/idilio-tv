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
