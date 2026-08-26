# Anexo B · Registro de uso del producto

> El brief pide que el diagnóstico parta del producto real. Este es el registro literal de esa sesión, con lo observado separado de lo interpretado.
>
> Dogfooding — Idilio TV (web, www.idilio.tv) · 2026-08-25

Sesión real de uso con viewport móvil 430×932 (iPhone 15 Pro Max). Registro literal de lo observado.

## Mapa de superficies observadas
| Ruta | Qué es |
|---|---|
| `/` | Home: hero rotativo ("Historia N de 5"), carruseles *Estrenos*, *Lo más visto* (con ranking numerado 1–6), *Premiadas*, y un módulo de **swipe tipo Tinder** "Encuentra el drama para ti" (Me gusta / No me gusta) |
| `/serie/{uuid}` | Ficha de serie |
| `/serie/{uuid}/{n}` | **Reproductor** de episodio |
| `/entrar` | Login (Apple / Google / Facebook / código por email) |
| `/checkout` | Compra del "pase" — **redirige a `/entrar` si eres invitado** |
| `/creators`, `/inversionistas` | B2B |

## El reproductor (`/serie/{uuid}/{n}`)
Controles observados en el DOM:
- `region "video player"`, `button "Pausar"`, `slider "Progreso del episodio"`, `button "Activar sonido"` (⚠️ **arranca en mute**)
- `link "Siguiente episodio"` → `/serie/{uuid}/{n+1}`
- `button "Compartir"`
- Metadatos: "Episodio 8", título de serie, **título del episodio** ("Miedo a enamorarse"), contador de *me gusta* (82) y *comentarios* (0)
- `button "Episodios"` → abre `dialog "Lista de episodios"`

**Ausencia notable: en el reproductor no hay ningún indicador de saldo de monedas, ni de racha, ni de progreso.** El HUD del core loop está vacío de metajuego.

## El muro de pago (dato duro, no hipótesis)
- Serie observada: *Tres Meses de Amor* — **Temporada 1 · 30 episodios**
- Episodios **1–10 libres**; **11–30 marcados `button "Episodio N, bloqueado"`**
- Al tocar un episodio bloqueado, el copy es:
  > **"Episodio 11 bloqueado"** — "Consigue un pase y disfruta todos los episodios sin límite en la app de Idilio."
  > CTAs: `Obtener el pase` · `Descargar la app`

→ En **web el sumidero se presenta como suscripción ("pase")**, no como moneda. La economía de monedas vive en la app nativa. La superficie web es de captación/deflection a la app.

## Contradicción con el brief (importante, hay que declararla)
El brief describe la economía como: 2 fuentes (compra de paquetes + recompensa diaria con racha) y 1 sumidero (desbloqueo). El producto real, según reseñas verificadas en Google Play, ya tiene **más piezas**:
- **Video recompensado (anuncios) por episodio** — reseña del 7-ago-2026: *"me aburre tener que ver tantos anuncios por un solo capítulo"*
- **"Retos" / misiones** — misma reseña: *"ya cumplí todos los retos"*
- **Membresía mensual** — misma reseña: *"pagar la membresía mensual está fuera de mi alcance"*
- **Precio del sumidero: ~15 monedas por episodio** — reseña del 18-ago-2026: *"cada capítulo se puede ver x 15 monedas y eso cuesta mucho"*

**Decisión metodológica:** diseño contra la economía **descrita en el brief** (es el terreno que se evalúa), pero dejo señalado el delta con el producto real, porque cambia el diagnóstico: el problema no es *falta de fuentes*, es que **las fuentes existentes no son legibles ni se sienten justas**.

## Señal cualitativa dominante en reseñas (4.7★, 28k opiniones, 1M+ descargas)
Las tres reseñas visibles de Google Play convergen en el **mismo** reclamo, no en tres distintos:
1. *"deberían dar más monedas"* (12 personas la marcaron útil — la más votada)
2. *"eso cuesta mucho, me podrían regalar más moneditas"*
3. *"ya cumplí todos los retos y pagar la membresía está fuera de mi alcance"*

Traducción de diseño: **el usuario percibe el sumidero pero no percibe las fuentes.** No dice "no entiendo las monedas"; dice "no me alcanzan". Eso es un problema de **legibilidad de la economía y de ritmo de las fuentes**, no de precio.

## Metadata de mercado
- Google Play: **4.7★ · 27.8k opiniones · 1M+ descargas** · Desarrollador `idilio` · pkg `com.stvrae.idilio`
- App Store MX: **4.9★ · 11 calificaciones** · Desarrollador **Latido TV SAS** · 93.5 MB · 13+
- Competencia directa listada por Play: ReelShort (4.5), GoodShort (4.9), DramaWave (4.8), Soda Reels (4.8), Playlet (4.5)
- Fundada por Gabriela Tafur; operación oficial desde sept-2025; respaldo de a16z
