# `web/` — la intervención sobre el stack real de Idilio

El mismo momento de desbloqueo que resuelve [`/poc`](../poc/), pero implementado sobre
**el stack que Idilio corre hoy en producción**, no sobre uno de conveniencia.

> **Por qué existen los dos.** `poc/` es el prototipo: React + Vite, sin ataduras, para
> iterar el diseño rápido. `web/` responde a otra pregunta, que el brief evalúa de forma
> explícita — *«la viabilidad de implementación hace parte de la propuesta»*: qué hace
> falta de verdad para construir esto, en la casa de ellos.

## El stack, verificado en producción

Todo lo de esta columna se comprobó inspeccionando headers y bundles de `www.idilio.tv`
el 25-ago-2026 — no es una suposición.

| | Idilio en producción | Aquí |
|---|---|---|
| Framework | Next.js **App Router / RSC**, Turbopack, React 19 | igual |
| Estilos | **Tailwind v4** con tokens `@theme` | igual, con los tokens reales |
| Fuentes | `next/font`, self-hosted (`sofia_pro`, `new_hero`) | `next/font` con Outfit — las del producto son de licencia comercial |
| Video | **Mux** (`<mux-player>` + Mux Data) | el contrato del componente, sin la dependencia · [`components/Video.tsx`](components/Video.tsx) |
| Datos | **Supabase** (Postgres + Storage + RLS) | firmas reales + fixture · [`lib/supabase/`](lib/supabase/) |
| Hosting | **Vercel** | export estático para Pages; quitar `output` y corre en Vercel |

## Lo que este árbol demuestra y el prototipo no puede

### 1 · El reloj vive en el servidor

Es el riesgo técnico nº 1 de la propuesta. Un countdown calculado en el navegador se
vulnera cambiando la hora del teléfono, y con él la mecánica entera.

Acá el estado económico se resuelve en un **Server Component**
([`app/serie/[slug]/[ep]/page.tsx`](app/serie/[slug]/[ep]/page.tsx)) y el cliente solo
pinta el delta contra `serverNow`.

La entrega del pase **no cuelga de ningún reloj que dispare solo**: `credit_night()`
([`lib/supabase/schema.sql`](lib/supabase/schema.sql)) se llama al terminar un episodio, y es
idempotente dentro de la misma noche, así que llamarla en cada episodio es seguro. No hay cron
por usuario ni job que corra de madrugada — que es lo que hace que no haga falta ningún botón, y
lo que lleva la adopción de la fuente del 19% de hoy a ~100% por construcción. El esquema expone
cuatro funciones y nada más: `night_of()`, `use_pass()`, `credit_night()` y `claim_guest()`.

Tampoco es una acreditación perezosa *al leer el estado*: si el pase se acreditara al leer,
volvería a poder llegar sin el usuario delante, que es justo lo que el diseño evita.

**Con una salvedad que conviene decir acá, porque se ve al abrir el link.** El sitio publicado
cuenta contra un **ancla de tiempo fija**, y eso no lo causa el export estático: `estadoDelPase`
([`lib/supabase/queries.ts`](lib/supabase/queries.ts)) devuelve `serverNow: RELOJ_FIJO`
siempre, con `DEPLOY_TARGET=pages` y sin él. Lo que fija el reloj es el **fixture**, no el
hosting, y lo fija a propósito a una hora elegida —las 00:17 de Ciudad de México, por el motivo
que está más abajo— para poder juzgar el diseño en la franja en que de verdad se usa. El
contador sí corre: `useCuentaRegresiva` en [`components/Muro.tsx`](components/Muro.tsx) tiene un
`setInterval` de un segundo, y lo único congelado es el punto de partida.

Lo que el link demuestra es la **forma**, que es lo que estaba en duda: el estado se arma en el
servidor, el cliente recibe `serverNow` ya decidido y pinta el delta contra él, nunca contra el
reloj del teléfono. En producción, con Postgres detrás, ese mismo campo sale de `now()` y el
ancla deja de ser una constante.

> **Lo que el reloj fijo no significa.** No es un efecto del export estático. `RELOJ_FIJO` no mira
> `DEPLOY_TARGET`, y la ruta declara `dynamicParams = false` con `generateStaticParams`, así que se
> prerrenderiza en tiempo de build en los dos destinos. Lo que cambia en producción no es el modo
> de render: es que el estado deja de salir de un fixture.
>
> **Y la cita se resuelve en la zona del espectador**, en [`lib/pase.ts`](lib/pase.ts) — nunca con
> un `setHours` sobre la máquina que construye el sitio. Es el riesgo técnico nº 2 de la propuesta
> —«la ventana se calcula en la zona del usuario, nunca en UTC»— y es de los que no se ven al
> probar: en un portátil con la zona correcta el resultado sale bien, y el mismo código en un
> runner de CI que corre en UTC publica la cita a las 15:30 en vez de las 21:30.

### 2 · El esquema que hay que agregar a la base

[`lib/supabase/schema.sql`](lib/supabase/schema.sql) es la migración completa. Lo que
resuelve, y que en un prototipo no se ve:

- **`viewer.device_id`** — el 88% de la base es invitado, así que el estado NO cuelga de
  `auth.users`. Cuelga de la cookie `idl_did` que Idilio ya emite hoy, y `claim_guest()`
  lo migra a una cuenta sin perder nada.
- **`viewer.timezone`** — el corte de la noche se calcula en la zona del **usuario**. MX, CO
  y US-hispano cruzan cuatro husos: calcularlo en UTC le rompe la racha a las 10 p.m. a
  alguien en Los Ángeles.
- **`night_of()`** — la definición de "noche" (5 a.m. a 5 a.m.) existe una sola vez, y el
  cliente usa la misma en `nocheDe()`. Si divergieran, el cliente y la base discreparían
  sobre si la racha sigue viva.
- **`credit_night()`** — la función con más peso del esquema. Se llama **al terminar un episodio**,
  no con un cron: avanza la racha, entrega el pase, consume el comodín si hubo hueco, paga el bono
  y fija la cita de mañana. Idempotente dentro de la misma noche, así que llamarla en cada episodio
  es seguro. *Mientras la acreditación cuelgue de un botón —o de un reloj que puede sonar cuando el
  usuario no está— la adopción de la fuente se queda en el 19% de hoy.*
- **`use_pass()`** — descuenta el pase y registra el desbloqueo, y **nada más**: la racha ya avanzó
  al ver. `security definer`, porque el cliente no escribe estas tablas.
- **`viewer.habitual_hour`** — la hora en que ese usuario suele ver, derivada de su historial.
  Es lo que ancla la cita. «+24 h desde el último uso» la deja caer a una hora arbitraria, y una
  cita a una hora arbitraria no es una cita.
- **`episode_unlock.source`** — separa `free` / `pass` / `coins`. Sin esa columna no se puede
  medir canibalización, que es el guardrail de toda la intervención.

### 3 · La paleta real, no la mía

[`app/globals.css`](app/globals.css) usa los tokens del CSS de producción
(`--color-primary #a000f0`, magenta `#e256d6`, cian `#3fc1c9`, ámbar `#f5a93f`, superficies
`#0a0a0a`/`#141414`/`#1a1a1a`).

Comparar las dos versiones lado a lado deja ver algo que solo aparece así: **las superficies
de Idilio son negro neutro, y las de mi prototipo tenían tinte violeta.** El producto real es
más sobrio de lo que yo había asumido. La versión de esta carpeta es la fiel.

## Los tres estados son rutas, no ramas muertas

En producción `pass_state` es una fila por espectador y no depende de la serie. En el fixture,
en cambio, **cada serie devuelve un estado distinto** — es la forma de que las tres situaciones
del muro sean rutas reales y prerrenderizadas en vez de ramas de código que nadie puede alcanzar.

| Ruta | Estado | Qué demuestra |
|---|---|---|
| `/serie/pasion-a-domicilio/13` | 1 pase, racha 2, saldo 0 | El Pase disponible. Lo gratis arriba de lo pago. |
| `/serie/la-herencia-del-patriarca/19` | 0 pases, racha 3, comodín 1 | La cita: la hora del reloj como héroe, y «Avísame». |
| `/serie/la-enfermera-infiltrada/13` | 0 pases, racha 5, saldo 45 | Faltan 42 min → el countdown vuelve a ser el héroe. Y con saldo, el pago sube a primario. |

El reloj está anclado a las **00:17 de Ciudad de México** (`RELOJ_FIJO`). No es capricho: el 54%
de las sesiones de Idilio caen entre 11 p.m. y 2 a.m., que es la franja en la que hay que juzgar
este diseño. En producción, con Postgres detrás, se reemplaza por `now()`.

## Correrlo

```bash
npm install
npm run dev              # http://localhost:5301
npm run build            # build de Vercel (sin `output: 'export'`)
DEPLOY_TARGET=pages npm run build   # export estático, como en Pages
npm run check-economy    # verifica que no divergió del modelo del prototipo
```

El modelo económico vive una sola vez, en `poc/src/lib/economy.ts`. `web/lib/economy.ts` es
una copia verificada en CI: si divergen, el build falla. No puede pasar que el prototipo y la
implementación digan precios distintos.

## Lo que queda fuera

Reproducción real (hace falta un `playbackId` de Mux), compra por IAP, y el resto de la
navegación de la app. El brief lo excluye del alcance y agregarlo diluiría el único momento
que sí importa evaluar.
