# Anexo A · Tokens extraídos del producto real

> Volcado literal de las custom properties de `www.idilio.tv` en producción. Es la evidencia de que la paleta y la tipografía del diseño no son invención: son las del producto.
>
> Tokens de diseño reales — Idilio TV (extraídos de www.idilio.tv, 2026-08-25)

Fuente: `getComputedStyle` + volcado de custom properties de las hojas de estilo del sitio en producción.

## Tipografía
- UI: `sofiaPro` (`--font-sofia-pro`) → `--font-home-ui`
- Display/titulares: `newHero` (`--font-new-hero`) → `--font-home-display`
- Fallback: `system-ui, sans-serif`

## Color
| Token | Hex | Uso observado |
|---|---|---|
| `--home-black` | `#000000` | fondo base (`body`) |
| `--home-surface-1` | `#0b070f` | superficie elevada 1 |
| `--home-surface-2` | `#150d1c` | superficie elevada 2 |
| `--home-surface-3` | `#1e1426` | superficie elevada 3 |
| `--home-magenta` | `#d25af0` | acento primario |
| `--home-violet` | `#6d19e2` | acento secundario / gradientes |
| `--home-cyan` | `#63d6dc` | acento terciario |
| `--home-amber` | `#ffb64d` | acento cálido (candidato natural para "monedas") |
| texto base | `#ecedee` | `body color` |

## Layout
- `--home-gutter`: `max(clamp(20px, 4vw, 64px), (100vw - 1325px) / 2)`

## Tono de voz (copy real del sitio)
- "NOVELAS VERTICALES · CAPÍTULOS DE UN MINUTO · NUEVAS HISTORIAS CADA SEMANA"
- "Dale play", "Ir a la Serie", "Estrenos", "Originales de Idilio"
- Hashtags de marca: #IdilioTV #ViveElDrama #HistoriasQueAtrapan #OrgulloLatino
- Claim: "El futuro en cada historia"

## Implicación de diseño
La paleta es **oscura por defecto, morada-magenta**, coherente con consumo nocturno (54% de sesiones 11pm–2am).
El `--home-amber` (#ffb64d) es el único acento cálido del sistema: es el token correcto para la moneda virtual,
porque no compite con magenta/violeta (marca) ni con cian (utilidad/informativo).
