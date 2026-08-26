# Modelo de sensibilidad — ¿es alcanzable DAU/MAU 0,38?

> No es una proyección. **No tengo datos para proyectar.** Es un modelo de sensibilidad:
> responde *"¿qué tendría que ser verdad para que el objetivo se cumpla?"*.
> Todo supuesto está declarado y el cálculo es reproducible:
>
> ```bash
> node docs/modelo/sensibilidad.mjs
> ```

---

## Por qué lo hice

Al escribir la tabla de objetivos de la estrategia puse **15% de día-3** y **DAU/MAU 0,38–0,40**
en la misma fila, como si una cosa implicara la otra. **No lo verifiqué.** Al hacer la cuenta,
resulta que **no se implican**, y en un caso se contradicen. Esta sección existe porque el
modelo corrigió a la estrategia, no al revés.

## El modelo

Dos segmentos, y solo un supuesto libre:

| | Quién | Cuota | Días activos/mes |
|---|---|---|---|
| **E** | sostiene racha de 3+ días | `s` (hoy **6%**) | `dE` ← **único supuesto** |
| **C** | el resto | `1 − s` | `dC` ← **deducido**, no supuesto |

`dC` no se inventa: se despeja del promedio observado.
`DAU/MAU 0,33 × 30 días = 9,9 días activos/mes`, luego `dC = (9,9 − s·dE) / (1 − s)`.

---

## Resultado 1 · El techo del 6%

**Si el 6% que hoy sostiene racha entrara los 30 días del mes y nadie más cambiara,
el DAU/MAU llegaría a 0,346.**

El objetivo es 0,380. **Ni en el caso imposible se alcanza.**

Esto es lo más importante que dice el modelo: *un segmento del 6% no puede mover el
agregado por bueno que sea*. Cualquier estrategia que descanse solo en profundizar la
racha de quien ya la tiene está matemáticamente condenada. **Hay que ensanchar el
segmento, no solo profundizarlo** — que es exactamente lo que hace mover la mecánica
del perfil al muro.

## Resultado 2 · Cuánto hay que ensanchar

Moviendo **solo** gente al segmento enganchado, sin tocar a los casuales:

| días/mes del enganchado | 6% (hoy) | 10% | 15% | 20% | 25% |
|---|---|---|---|---|---|
| 18 · ≈4 noches/semana | 0,330 | 0,341 | 0,356 | 0,370 | **0,385** |
| 22 · ≈5 noches/semana | 0,330 | 0,347 | 0,369 | **0,390** | **0,412** |
| 26 · ≈6 noches/semana | 0,330 | 0,353 | **0,381** | **0,410** | **0,438** |

Cuota de día-3 necesaria para 0,380 **sin** mover a los casuales:

| `dE` | hace falta | hoy |
|---|---|---|
| 18 | **23%** | 6% |
| 22 | **18%** | 6% |
| 26 | **15%** | 6% |

## Resultado 3 · La corrección a la estrategia

Con la meta que puse en la estrategia (**15% de día-3**):

| `dE` | solo con la racha | ¿llega a 0,380? | qué falta |
|---|---|---|---|
| 18 | 0,356 | ✗ | **+0,85 días/mes** en los casuales (+9%) |
| 22 | 0,369 | ✗ | **+0,40 días/mes** en los casuales (+4%) |
| 26 | 0,381 | ✓ | — |

**En el escenario central (`dE`=22), la meta de 15% de día-3 da 0,369, no 0,38.**
Mi tabla original ponía las dos cifras juntas y estaba mal.

---

## La lectura, que además justifica todo el plan

Para llegar a 0,380 hacen falta **dos cosas a la vez**, no una:

1. **Ensanchar el segmento enganchado** del 6% al ~15% → es lo que hace la intervención profunda (sacar la racha del perfil y ponerla en el muro).
2. **Subir ~0,4 días activos al mes a toda la base** (+4%) → es lo que deberían aportar las dos piezas **baratas** de la Ola 0: el corte de la noche a las 4:00 am y la migaja de economía en el reproductor.

Es decir: **el modelo dice que el plan no funciona sin sus piezas menos vistosas.**
La intervención profunda sola se queda en 0,369. Lo que cierra la brecha es medio día
activo al mes en el resto de la base, y eso lo mueve un cambio de backend que no tiene
ni una sola pantalla.

Es un buen recordatorio de por qué la Ola 0 va primero y no al final.

---

## Lo que este modelo NO dice

- **No predice** que la intervención vaya a llevar el día-3 del 6% al 15%. Eso es una
  hipótesis a validar con un A/B, no un resultado del modelo.
- **Asume que `dC` no cae.** Si la intervención molestara a los casuales (más ruido en
  el reproductor, un prompt de cuenta mal puesto), `dC` bajaría y la brecha se ensancharía.
  Por eso el guardarraíl de *episodios por sesión* es tan importante.
- **`dE` es el supuesto libre y manda sobre todo el resultado.** Es el primer número que
  pediría del data warehouse: *¿cuántos días al mes está activo quien sostiene racha de 3+?*
  Con ese dato el modelo deja de tener rangos y da una sola respuesta.
