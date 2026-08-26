# Reto de diseño · Idilio TV
## «Continuará» — el Pase de la Noche

**¿Cómo podríamos usar mecánicas de gamificación para que volver a Idilio forme parte natural de la experiencia de ver microdramas?**

> El metajuego de Idilio existe, pero vive en una pestaña. El core loop vive en el player.
> La propuesta entera consiste en mudar el metajuego al lugar donde el usuario ya está,
> y en cambiar la unidad de todo: de monedas a episodios, de días calendario a noches.

---

## Verlo en vivo

| | |
|---|---|
| **Prototipo** — home, catálogo, ficha de serie y el muro | **https://gabrielardzj.github.io/idilio-tv/** |
| **Diagnóstico y estrategia** — los entregables de texto | **https://gabrielardzj.github.io/idilio-tv/docs/diagnostico.html** |
| **Export de flujos** — 20 pantallas en 8 flujos | **https://gabrielardzj.github.io/idilio-tv/flujos/** |
| **Diseño** — 6 pantallas + hoja de sistema | **https://gabrielardzj.github.io/idilio-tv/docs/diseno.html** |
| **Benchmark competitivo** — quién más lo intentó y contra qué chocó | **https://gabrielardzj.github.io/idilio-tv/docs/benchmark.html** |
| **Sobre el stack real de Idilio** | **https://gabrielardzj.github.io/idilio-tv/stack/** |

> **Sobre Figma:** no hay archivo de Figma. El conector necesita una autorización
> OAuth que esta sesión no puede hacer, así que el diseño se hizo en **Pencil**.
> Los detalles y el camino para llevarlo a Figma están en
> [el archivo de diseño](docs/03-diseno/pencil/) y en [el sistema visual](docs/03-diseno/sistema.md#del-prototipo-a-figma).

---

## Los cuatro entregables

| | Entregable | Qué hay adentro |
|---|---|---|
| **1** | **[Diagnóstico](docs/01-diagnostico/)** | Qué falla hoy, a partir de usar la app y leer los datos. Qué señales pesaron y qué descarté — incluido por qué no construyo sobre el 2.4x de D30. |
| **2** | **[Estrategia](docs/02-estrategia/)** | Ocho intervenciones en tres olas, con hipótesis, métricas, guardrails y criterio de priorización. Y qué no cabe en un trimestre. |
| **3** | **[La intervención en profundidad](docs/03-diseno/)** | El Pase de la Noche: mecánica, diagrama de flujo, ocho decisiones de diseño con su porqué, la revisión crítica del precedente, modelo económico y riesgos técnicos. Más el [archivo de diseño](docs/03-diseno/pencil/), el [sistema visual](docs/03-diseno/sistema.md) y sus [tokens](docs/03-diseno/tokens.json). |
| **4** | **[POC](docs/04-poc/)** | Prototipo funcional · [`/poc`](poc/) · y el [export de flujos](mobbin-export/) con 20 pantallas en 8 flujos. |
| **+** | **[Sobre el stack real](web/)** | La misma intervención implementada en Next.js App Router + Tailwind v4 + Supabase, el stack que Idilio corre hoy. Incluye la migración SQL completa. Es la respuesta a *«la viabilidad de implementación hace parte de la propuesta»*. |

**Anexos ·** [Registro de dogfooding](docs/00-dogfooding/) — qué se pudo usar del producto real y qué se verificó ahí. · [Benchmark competitivo](docs/05-benchmark/) — quién más construye un metajuego sobre contenido serializado, contra qué chocó y cómo lo resolvió.

---

## Los dos hallazgos que ordenan todo

Medí las **50 series del catálogo** ([censo completo](docs/00-dogfooding/)). La moda es **10 episodios gratis** por serie y el desbloqueo cuesta **15 monedas**, sin excepción. La sesión promedio dura **22 minutos ≈ 14 episodios**.

**Primero: cada serie regala 10 episodios y la sesión promedio dura 14.** No es una demostración —14 es una media, y una media no se descompone en 10 + 4— pero es la lectura más simple de esa diferencia: la sesión no termina cuando el usuario se sacia, termina cuando choca, con hambre para cuatro episodios más. Si es así, los 22 minutos no son salud: son el techo que impone la economía.

Y lo que hay en ese choque, verificado en el paywall real del build 1.20.0:

```
Costo del episodio: 15        Tu balance: 0
─────────────────────────────────────────
       Obtén monedas para continuar
  $0.99 → 180    $1.99 → 180    $3.99 → 375
```

Un usuario que nunca vio una moneda, a la 1 a.m., a mitad de un cliffhanger, recibe una tienda y ninguna otra salida. La recompensa diaria — la única fuente gratuita — vive en otra pestaña. Y la ficha de App Store del mismo build lista un **pase semanal a $7.99** y uno **mensual a $14.99**: la suscripción existe, pero el muro tampoco la ofrece.

**No es que el metajuego esté mal diseñado. Está en otro edificio.**

**Segundo, y más grande: hay una salida más barata que pagar.** El catálogo tiene **500 episodios gratis** repartidos en 50 series — el 22% de sus 2.230 episodios. A 14 por sesión son **36 sesiones sin pagar un peso: casi cuatro meses**.

Y ahí el 10 + 4 toma su forma completa: la sesión típica sería *"agoto los 10 gratis de una serie, choco, y me voy a empezar otra"*. **El muro no expulsa al usuario de la app. Lo expulsa de la historia.** Y alguien que rota entre 50 títulos sin apegarse a ninguno no tiene motivo para volver mañana — tiene relación con el catálogo, no con una serie.

Por eso la respuesta no es recortar los gratis (eso ataca conversión, no stickiness). Es **darle una razón para quedarse en una historia en vez de saltar a la siguiente**.

---

## La propuesta, en cinco reglas

1. **No hay nada que reclamar.** El Pase se acredita al terminar un episodio, una vez por noche, y avanza la racha. Un toast de dos segundos lo dice y el usuario sigue viendo. Se guardan hasta dos.
2. **El usuario elige a qué serie se lo da.** Un recurso que se asigna se entiende; uno que se recibe, no.
3. **La noche corre de 5 a.m. a 5 a.m.**, no de medianoche a medianoche. 54% de las sesiones son entre 11 p.m. y 2 a.m.
4. **Un comodín que se consume solo.** Si hay que hacer algo para no perder la racha, la racha ya es una tarea.
5. **Todo se declara en episodios.** El saldo, el precio, el paquete, la meta.

Y el muro deja de decir *«tu balance: 0»* para decir **«Hoy a las 21:30 · tu hora de siempre»**.

---

## Correrlo local

```bash
cd poc && npm install && npm run dev   # el prototipo — http://localhost:5173
cd web && npm install && npm run dev   # sobre el stack real — http://localhost:5301
```

O abrir [`mobbin-export/index.html`](mobbin-export/index.html) para ver los 8 flujos completos sin instalar nada.
