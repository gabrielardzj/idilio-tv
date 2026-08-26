# Diseño

Construido en **Pencil** (`.pen`), con los tokens de color y tipografía extraídos del
producto real en producción. Exportado a PNG @2x en [`pencil/`](pencil).

| | Pantalla |
|---|---|
| <img src="pencil/00-portada-y-sistema.png" width="380"> | **Portada y sistema** — las dos monedas, la anatomía del muro y las tres decisiones |
| <img src="pencil/01-muro-A-noche1.png" width="130"> | **Muro · A** — noche 1, invitado, sin monedas |
| <img src="pencil/02-muro-B-pase-gastado.png" width="130"> | **Muro · B** — pase gastado, sin monedas *(el estado que monetiza)* |
| <img src="pencil/03-muro-E-noche3-hito.png" width="130"> | **Muro · E** — noche 3, hito con escudo |
| <img src="pencil/04-muro-F-racha-rota.png" width="130"> | **Muro · F** — racha rota |
| <img src="pencil/05-muro-H-noche7.png" width="130"> | **Muro · H** — noche 7, ciclo completo |
| <img src="pencil/06-reproductor-toast.png" width="130"> | **Reproductor** — confirmación de racha *(toast, no modal)* |
| <img src="pencil/07-cuenta-noche3.png" width="130"> | **Cuenta** — "tu racha vive solo en este teléfono" |

## Tokens

Extraídos con `getComputedStyle` sobre `www.idilio.tv`, no inventados
(ver [`.context/research/01-design-tokens-idilio.md`](../.context/research/01-design-tokens-idilio.md)).

```
--home-black     #000000      --home-magenta   #d25af0
--home-surface-1 #0b070f      --home-violet    #6d19e2
--home-surface-2 #150d1c      --home-cyan      #63d6dc
--home-surface-3 #1e1426      --home-amber     #ffb64d
texto base       #ecedee
```

**Tipografía.** El producto usa `sofiaPro` (UI) y `newHero` (display), ambas de licencia
comercial. El diseño y el POC sustituyen por **Outfit** y **Archivo**, los equivalentes
libres más cercanos. La sustitución se declara; no se disimula.

**Regla semántica.** La moneda **ganada** y la racha visten violeta→magenta (los colores de
la marca: el capítulo es *de la casa*); la moneda **comprada** viste ámbar. Las dos monedas
nunca comparten familia cromática — así el principio de doble moneda se comunica sin copy.
