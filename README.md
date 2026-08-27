# Reto de diseño · Idilio TV
## «Continuará» — el Pase de la Noche

**¿Cómo podríamos usar mecánicas de gamificación para que volver a Idilio forme parte natural de la experiencia de ver microdramas?**

> El metajuego de Idilio existe, pero vive en una pestaña. El core loop (lo que el usuario hace una y otra vez) vive en el player.
> La propuesta entera consiste en mudar el metajuego al lugar donde el usuario ya está,
> y en cambiar la unidad de todo: de monedas a episodios, de días calendario a noches.

---

## Verlo en vivo

| | |
|---|---|
| **Prototipo** — home, catálogo, ficha de serie y el muro | **https://gabrielardzj.github.io/idilio-tv/** |
| **Diagnóstico y estrategia** — los entregables de texto | **https://gabrielardzj.github.io/idilio-tv/docs/diagnostico.html** |
| **Export de flujos** — 23 pantallas en 8 flujos | **https://gabrielardzj.github.io/idilio-tv/flujos/** |
| **Archivo de diseño** — 10 pantallas, 6 componentes y las variables, nativas de Figma | **https://www.figma.com/design/CCI8plwuWvfTV8VBpowN5X** |
| **Diseño** — el sistema visual y cómo leer ese archivo | **https://gabrielardzj.github.io/idilio-tv/docs/diseno.html** |
| **Sobre el stack real de Idilio** | **https://gabrielardzj.github.io/idilio-tv/stack/** |

> **El diseño es nativo de [Figma](https://www.figma.com/design/CCI8plwuWvfTV8VBpowN5X):** una
> página con tres secciones — 31 variables con *scope* (dónde se puede usar cada una) y *code
> syntax* (el nombre que lleva en el código), 9 estilos de texto, 4 componentes y las 10
> pantallas. Detalle en [el archivo de diseño](docs/03-diseno/pen/).

---

## Los cuatro entregables

| | Entregable | Qué hay adentro |
|---|---|---|
| **1** | **[Diagnóstico](docs/01-diagnostico/)** | Qué falla hoy, a partir de usar la app y leer los datos. Qué señales pesaron y qué descarté — incluido por qué no construyo sobre el 2.4x de D30 (cuántos siguen ahí a los 30 días). |
| **2** | **[Estrategia](docs/02-estrategia/)** | Ocho intervenciones en tres etapas, con hipótesis, métricas, guardrails (las métricas de guardia: las que dicen cuándo parar) y criterio de priorización. Y qué no cabe en un trimestre. |
| **3** | **[La intervención en profundidad](docs/03-diseno/)** | El Pase de la Noche: mecánica, diagrama de flujo, nueve decisiones de diseño con su porqué, la revisión crítica del precedente, modelo económico y riesgos técnicos. Más el [archivo de diseño](docs/03-diseno/pen/), el [sistema visual](docs/03-diseno/sistema.md) y sus [tokens](docs/03-diseno/tokens.json) (los valores del sistema —colores, tipografías, espacios— con nombre propio). |
| **4** | **[POC](docs/04-poc/)** | Prototipo funcional · [`/poc`](poc/) · y el [export de flujos](mobbin-export/) con 23 pantallas en 8 flujos. |
| **+** | **[Sobre el stack real](web/)** | La misma intervención implementada en Next.js App Router + Tailwind v4 + Supabase, el stack que Idilio corre hoy. Incluye la migración SQL completa. Es la respuesta a *«la viabilidad de implementación hace parte de la propuesta»*. |

**Anexos ·** No son páginas del sitio publicado; se leen acá, en el repo. · [Registro de dogfooding](docs/00-dogfooding/) (dogfooding: usar el propio producto como un usuario más) — qué se pudo usar del producto real y qué se verificó ahí. · [Benchmark competitivo](docs/05-benchmark/) — quién más construye un metajuego sobre contenido serializado, contra qué chocó y cómo lo resolvió.

---

## Los dos hallazgos que ordenan todo

Medí las **50 series del catálogo** ([censo completo](docs/00-dogfooding/)). La moda es **10 episodios gratis** por serie y el desbloqueo cuesta **15 monedas**, sin excepción. La sesión promedio dura **22 minutos ≈ 14 episodios**.

> **Una corrección que dejo a la vista.** Esta portada decía «cada serie regala 10 episodios». Es falso para cinco de las 50: hay una de 7, una de 8, una de 11 y dos de 12 — y una de esas dos es *Pasión a Domicilio*, la serie de casi todos mis ejemplos. El hallazgo aguanta la corrección; lo que no aguanta es enunciarse como regla.

**Primero: la sesión no termina cuando el usuario se sacia. Termina cuando choca.** El bloque gratis típico son 10 episodios —37 de las 41 series con muro— y la sesión promedio llega a 14. No es una demostración: 14 es una media, y una media no se descompone en 10 + 4. Pero es la lectura más simple de esa diferencia, y si es la correcta, los 22 minutos no son salud: son el techo que impone la economía, y el usuario se va con hambre para cuatro episodios más.

Y lo que hay en ese choque, [capturado dentro de la app](docs/00-dogfooding/evidencia/muro-nativo-real-1.png) con storefront de Colombia:

```
🔒 Episodio 16/56
Tu balance: 0                    Costo del episodio: 15
────────────────────────────────────────────────────────
Desbloquea TODO Idilio
  SEMANAL  $12.500 COP/sem   ·   MENSUAL  $24.500 COP/mes
                                 RECOMENDADO · Ahorra 55%
────────────────────────────────────────────────────────
Obtén monedas para desbloquear episodios
   15  Desbloquea 1 episodio        [Ver anuncio]   0/10
  180  Desbloquea 12 episodios      $2.500 COP   SUPER OFERTA 69%
  375  Desbloquea 25 episodios      $13.500 COP  −20% DTO
  725  Completa la serie            $25.500 COP  −24% DTO

  ¿Más opciones? Ir a Recompensas
```

**El muro no esconde la economía: la enseña entera.** Dice el saldo y el costo, traduce cada paquete a episodios, ofrece la suscripción, lleva un anuncio recompensado que da un episodio gratis —hasta diez al día— y enlaza a la pestaña de Recompensas. Cualquiera de esas cosas, sola, sería una mejora que proponer; están todas.

Lo que no hay, y es lo que este trabajo persigue, es **una razón para volver mañana**. Con diez episodios diarios por anuncio y 500 gratis repartidos por el catálogo, a esta economía no le falta legibilidad: le falta escasez, y sin escasez la moneda no significa nada y el metajuego no puede mover el regreso.

> **La corrección más grande de este trabajo.** Este párrafo decía que el muro era «una tienda y ninguna otra salida», que las fuentes gratuitas «viven todas en otra pestaña» y que la suscripción no se ofrecía ahí. Las tres cosas son falsas, y la culpa es de la evidencia: lo que yo trataba como captura del producto era `paywall-nativo-1.20.0.jpg`, una **imagen promocional de la ficha de App Store** —con logo, mockup de teléfono y una versión anterior del muro, en dólares y con precios tachados—. No es la app. Las capturas reales están en [`docs/00-dogfooding/evidencia`](docs/00-dogfooding/evidencia/) y el diagnóstico se reescribe sobre ellas.

**Segundo, y más grande: hay una salida más barata que pagar.** El catálogo tiene **500 episodios gratis** repartidos en 50 series — el 22% de sus 2.230 episodios. A 14 por sesión son **36 sesiones sin pagar un peso: casi cuatro meses**.

Y ahí la lectura del 10 + 4, si es la correcta, cierra: la sesión típica sería *"agoto los gratis de una serie, choco, y me voy a empezar otra"*. **El muro no expulsa al usuario de la app. Lo expulsa de la historia.** Eso último no depende de la hipótesis: con 500 episodios gratis en el catálogo, saltar es la salida barata, se agote el bloque a los 10 o a los 12. Y alguien que rota entre 50 títulos sin apegarse a ninguno no tiene motivo para volver mañana — tiene relación con el catálogo, no con una serie.

Por eso la respuesta no es recortar los gratis (eso ataca conversión, no stickiness). Es **darle una razón para quedarse en una historia en vez de saltar a la siguiente**.

---

## La propuesta, en cinco reglas

1. **No hay nada que reclamar.** Se emite un pase por noche —por el reloj, esté el usuario o no— y se **entrega** al terminar un episodio, que es cuando también avanza la racha. Un toast de dos segundos lo dice y el usuario sigue viendo. Lo pendiente se acumula hasta dos: por eso faltar una noche no cuesta nada, y volver seguido sigue rindiendo más.
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
