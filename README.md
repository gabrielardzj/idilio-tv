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
| **Prototipo** | **https://gabrielardzj.github.io/idilio-tv/** |
| **Export de flujos** | **https://gabrielardzj.github.io/idilio-tv/flujos/** |
| **Sobre el stack real de Idilio** | **https://gabrielardzj.github.io/idilio-tv/stack/** |

---

## Los cuatro entregables

| | Entregable | Qué hay adentro |
|---|---|---|
| **1** | **[Diagnóstico](docs/01-diagnostico/)** | Qué falla hoy, a partir de usar la app y leer los datos. Qué señales pesaron y qué descarté — incluido por qué no construyo sobre el 2.4x de D30. |
| **2** | **[Estrategia](docs/02-estrategia/)** | Ocho intervenciones en tres olas, con hipótesis, métricas, guardrails y criterio de priorización. Y qué no cabe en un trimestre. |
| **3** | **[La intervención en profundidad](docs/03-diseno/)** | El Pase de la Noche: mecánica, diagrama de flujo, ocho decisiones de diseño con su porqué, la revisión crítica del precedente, modelo económico y riesgos técnicos. Más el [archivo de diseño](docs/03-diseno/pencil/), el [sistema visual](docs/03-diseno/sistema.md) y sus [tokens](docs/03-diseno/tokens.json). |
| **4** | **[POC](docs/04-poc/)** | Prototipo funcional · [`/poc`](poc/) · y el [export de flujos](mobbin-export/) con 17 pantallas en 7 flujos. |
| **+** | **[Sobre el stack real](web/)** | La misma intervención implementada en Next.js App Router + Tailwind v4 + Supabase, el stack que Idilio corre hoy. Incluye la migración SQL completa. Es la respuesta a *«la viabilidad de implementación hace parte de la propuesta»*. |

**Anexos ·** [Registro de dogfooding](docs/00-dogfooding/) — qué se pudo usar del producto real y qué se verificó ahí. · [Benchmark competitivo](docs/05-benchmark/) — quién más construye un metajuego sobre contenido serializado, contra qué chocó y cómo lo resolvió.

---

## Los dos hallazgos que ordenan todo

Medí las **43 series del catálogo** ([censo completo](docs/00-dogfooding/)). La moda es **10 episodios gratis** por serie y el desbloqueo cuesta **15 monedas**, sin excepción. La sesión promedio dura **22 minutos ≈ 14 episodios**.

**Primero: 14 = 10 + 4.** La sesión promedio no termina cuando el usuario se sacia — termina cuando choca, con hambre para cuatro episodios más. Los 22 minutos no son salud, son el techo que impone la economía.

Y lo que hay en ese choque, verificado en el paywall real del build 1.20.0:

```
Costo del episodio: 15        Tu balance: 0
─────────────────────────────────────────
       Obtén monedas para continuar
  $0.99 → 180    $1.99 → 180    $3.99 → 375
```

Un usuario que nunca vio una moneda, a la 1 a.m., a mitad de un cliffhanger, recibe una tienda y ninguna otra salida. La recompensa diaria — la única fuente gratuita — vive en otra pestaña.

**No es que el metajuego esté mal diseñado. Está en otro edificio.**

**Segundo, y más grande: hay una salida más barata que pagar.** El catálogo tiene **428 episodios gratis** repartidos en 43 series — el 23% de sus 1.885 episodios. A 14 por sesión son **31 sesiones sin pagar un peso: tres meses**.

Así que el 14 = 10 + 4 significa otra cosa: la sesión típica es *"agoto los 10 gratis de una serie, choco, y me voy a empezar otra"*. **El muro no expulsa al usuario de la app. Lo expulsa de la historia.** Y alguien que rota entre 43 títulos sin apegarse a ninguno no tiene motivo para volver mañana — tiene relación con el catálogo, no con una serie.

Por eso la respuesta no es recortar los gratis (eso ataca conversión, no stickiness). Es **darle una razón para quedarse en una historia en vez de saltar a la siguiente**.

---

## La propuesta, en cinco reglas

1. **No hay nada que reclamar.** El Pase se acredita al terminar un episodio, una vez por noche, y avanza la racha. Un toast de dos segundos lo dice y el usuario sigue viendo. Se guardan hasta dos.
2. **El usuario elige a qué serie se lo da.** Un recurso que se asigna se entiende; uno que se recibe, no.
3. **La noche corre de 5 a.m. a 5 a.m.**, no de medianoche a medianoche. 54% de las sesiones son entre 11 p.m. y 2 a.m.
4. **Un comodín que se consume solo.** Si hay que hacer algo para no perder la racha, la racha ya es una tarea.
5. **Todo se declara en episodios.** El saldo, el precio, el paquete, la meta.

Y el muro deja de decir *«tu balance: 0»* para decir **«Hoy a las 18:05»**.

---

## Correrlo local

```bash
cd poc && npm install && npm run dev   # el prototipo — http://localhost:5173
cd web && npm install && npm run dev   # sobre el stack real — http://localhost:5301
```

O abrir [`mobbin-export/index.html`](mobbin-export/index.html) para ver los 7 flujos completos sin instalar nada.
