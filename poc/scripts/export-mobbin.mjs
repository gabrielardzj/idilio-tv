/**
 * Export tipo Mobbin.
 * Recorre el POC estado por estado, captura cada pantalla en 3x y emite
 * un manifiesto con la taxonomía (flujo · pantalla · patrones · elementos),
 * más una galería navegable.
 *
 *   node scripts/export-mobbin.mjs [baseUrl] [outDir]
 */
import { chromium } from 'playwright-core'
import { mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const BASE = process.argv[2] || 'http://localhost:5199/'
/** La implementación sobre el stack real. Si no está arriba, ese flujo se salta. */
const STACK = process.env.STACK_URL || 'http://localhost:5301'
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const OUT = process.argv[3] || join(ROOT, '..', 'mobbin-export')

const APP = {
  app: 'Idilio TV',
  release: 'Continuará · Pase de la Noche (propuesta)',
  platform: 'iOS · vertical · una mano',
  captured: '2026-08-25',
  device: 'iPhone 14 Pro · 390×844 @3x',
  theme: 'Dark',
  language: 'es-419',
}

async function click(page, text) {
  await page.locator(`button:has-text("${text}")`).first().click()
  await page.waitForTimeout(700)
}
async function dismissIfAccount(page) {
  const b = page.locator('button:has-text("Ahora no")')
  if (await b.count()) { await b.first().click(); await page.waitForTimeout(500) }
}

/** Cada shot: cómo llegar + qué es. `do` recibe la página. */
const FLOWS = [
  {
    id: 'f0-llegar-al-muro',
    name: 'Cómo se llega al muro',
    intent: 'El muro no se puede juzgar en el vacío. Hay que llegar a él como se llega de verdad: eligiendo una serie del catálogo, viendo un rato y chocando. Estas tres pantallas son el camino.',
    screens: [
      {
        id: '01-home', name: 'Home · el catálogo',
        estado: 'home',
        type: 'Home / Browse', patterns: ['Content rails', 'Continue watching', 'Currency balance'],
        elements: ['Top bar', 'Wallet chip', 'Horizontal rail', 'Poster', 'Progress bar', 'Tab bar'],
        note: 'La estructura del producto real tal como es hoy, con los pósters de verdad del catálogo y los rieles en el orden de la app (Estrenos, Seguir viendo, Lo más visto y los géneros —«Amores Prohibidos», «Venganza Pasional»— hasta «Nuestra selección para ti») y las 41 series con muro del catálogo, con sus cifras medidas. Dos diferencias, y son la propuesta: el chip de saldo lleva su traducción a episodios, y la pestaña «Recompensas» ya no existe — su contenido se mudó al muro, que es donde pasa el 100% de los usuarios.',
        act: async () => {},
      },
      {
        id: '02-serie', name: 'Ficha de serie · la progresión visible',
        estado: 'serie-detalle',
        type: 'Detail', patterns: ['Chapter list', 'Progress indicator', 'Unlock cost'],
        elements: ['Top bar', 'Poster', 'Synopsis', 'Progress bar', 'Reward card', 'Chapter list', 'Badge', 'Lock', 'Fine print'],
        note: 'La pantalla es la de la app nativa tal como es hoy, capítulo por capítulo: «Volver», «Resumen» con el póster y la sinopsis real del catálogo, y la lista de «Capítulo N» con la píldora «Interactiva» y el candado. Encima van tres cosas, y son la propuesta: dónde vas —el contador y la barra—, qué ya viste, y qué abre el siguiente, dicho en la tarjeta donde está el muro y no en una letra chica. La ficha real muestra el candado y nunca el precio.',
        // Esta serie y no la primera del riel: es de la que hay capturas de la
        // app nativa, así que esta pantalla se puede poner al lado de la del
        // producto y compararse tarjeta por tarjeta. También es la única con
        // capítulos «Interactiva» medidos, que es un elemento de la pantalla real.
        act: async (p) => {
          await p.locator('.poster[aria-label*="Apasionada"]').first().click()
          await p.waitForTimeout(500)
        },
      },
      {
        id: '02b-serie-capitulos', name: 'Ficha de serie · la lista de capítulos',
        estado: 'serie-detalle',
        type: 'Detail', patterns: ['Chapter list', 'Unlock cost', 'Progress indicator'],
        elements: ['Chapter list', 'Badge', 'Lock', 'Chevron', 'Price row'],
        // La ficha no cabe en una pantalla —en el producto real tampoco: el
        // resumen se come la primera—, así que la lista va en su propia
        // captura. Es la mitad donde vive la propuesta, y recortarla dejaría el
        // entregable mostrando solo la parte copiada del producto.
        note: 'La misma ficha, bajando. Las tarjetas son las del producto —«Capítulo N», el número como título, «Interactiva» y el candado—; lo que el producto no tiene son las tres marcas de la propuesta: el visto de los que ya viste, el «Seguir viendo» de dónde te quedaste, y el precio en la tarjeta del capítulo 11, que es donde está el muro. Del 12 en adelante la tarjeta se apaga, igual que en la app.',
        act: async (p) => {
          await p.locator('.ep.cerrado').first().scrollIntoViewIfNeeded()
          await p.locator('.serie-scroll').evaluate((e) => { e.scrollTop -= 150 })
          await p.waitForTimeout(400)
        },
      },
      {
        id: '03-player', name: 'Player · el core loop',
        estado: 'player-free',
        type: 'Media player', patterns: ['Vertical video', 'Swipe navigation', 'Progress indicator'],
        elements: ['Video', 'Top bar', 'Wallet chip', 'Action rail', 'Progress bar'],
        note: 'El core loop: lo que el usuario hace una y otra vez. Se desliza hacia arriba para el siguiente episodio y hacia abajo para el anterior, como en el producto. El muro aparece cuando el siguiente está bloqueado — no antes.',
        act: async (p) => {
          await p.locator('.serie-scroll').evaluate((e) => { e.scrollTop = 0 })
          await p.locator('.ep.abierto').first().click()
          await p.waitForTimeout(600)
        },
      },
    ],
  },
  {
    id: 'f1-pase-de-la-noche',
    name: 'Desbloqueo con el Pase de la Noche',
    intent: 'El invitado ve un episodio y la noche se acredita sola. Después llega al muro sin monedas y sale con el episodio abierto. En ningún momento reclama nada.',
    screens: [
      {
        id: '01-player-libre', name: 'Player · episodio gratis',
        estado: 'player-free',
        type: 'Media player', patterns: ['Vertical video', 'Progress indicator', 'Currency balance'],
        elements: ['Video', 'Top bar', 'Wallet chip', 'Action rail', 'Progress bar', 'Scrubber'],
        note: 'El saldo nunca viaja solo: el chip lleva siempre la traducción a episodios. Es la única huella permanente del metajuego dentro del core loop.',
        act: async (p) => { await click(p, '1 · Episodio gratis') },
      },
      {
        id: '01b-acuse-de-la-noche', name: 'El acuse de la noche',
        estado: 'player-free',
        type: 'Media player', patterns: ['Silent accrual', 'Toast', 'Currency balance'],
        elements: ['Video', 'Toast', 'Wallet chip', 'Progress bar'],
        note: 'El único momento en que el metajuego aparece dentro del video, y dura dos segundos. Al terminar el episodio se acredita la noche, el pase y el bono — sin botón. Acreditar en silencio habría dejado el metajuego invisible otra vez, que es el defecto que este trabajo corrige.',
        act: async (p) => { await click(p, 'Es mañana y volví'); await p.waitForTimeout(150) },
      },
      {
        id: '02-muro-pase-listo', name: 'Muro · el Pase está listo',
        estado: 'wall-pass-ready',
        type: 'Paywall', patterns: ['Bottom sheet', 'Reward claim', 'Streak', 'Progress indicator', 'Cliffhanger'],
        elements: ['Bottom sheet', 'Headline', 'Progress bar', 'Reward card', 'Primary button', 'Text button', 'Streak strip'],
        note: 'Orden deliberado: la historia, dónde estoy, lo gratis, lo pago, la racha. Un muro que abre con precios enseña que el sistema es una tienda. Lo gratuito tiene dos escalones y el orden entre ellos también es una decisión: el Pase arriba y el anuncio debajo, porque el Pase es lo mismo sin los 30 segundos ni el corte en el cliffhanger.',
        act: async (p) => { await p.waitForTimeout(2700); await click(p, '2 · El muro · un pase') },
      },
      {
        id: '03-eleccion-de-pase', name: 'Elegir a qué serie va el pase',
        estado: 'pass-choice',
        type: 'Selection', patterns: ['Single select', 'Scarcity', 'Cross-content discovery'],
        elements: ['Bottom sheet', 'Radio list', 'Thumbnail', 'Progress label', 'Primary button'],
        note: 'El corazón pedagógico: obligar a elegir con un recurso escaso enseña la economía por uso, no por explicación.',
        act: async (p) => { await click(p, 'Usar el pase en este episodio') },
      },
      {
        id: '04-desbloqueo-celebracion', name: 'Desbloqueado · la racha avanza',
        estado: 'unlocked-via-pass',
        type: 'Confirmation', patterns: ['Reward reveal', 'Streak advance', 'Milestone unlock'],
        elements: ['Bottom sheet', 'Medal', 'Reward lines', 'Streak strip', 'Primary button'],
        note: 'La recompensa se entrega en el mismo gesto que resuelve la necesidad. La noche 3 dispara el comodín.',
        act: async (p) => { await click(p, 'Usar el pase aquí') },
      },
      {
        id: '05-player-desbloqueado', name: 'Player · episodio 13 abierto',
        estado: 'player-free',
        type: 'Media player', patterns: ['Vertical video', 'Progress indicator'],
        elements: ['Video', 'Wallet chip', 'Progress bar'],
        note: 'El regreso al loop es inmediato: un toque desde la celebración, sin pantallas intermedias.',
        act: async (p) => { await click(p, 'Ver el episodio'); await p.waitForTimeout(900); await dismissIfAccount(p) },
      },
    ],
  },
  {
    id: 'f2-la-cita',
    name: 'El pase ya se usó · la cita de mañana',
    intent: 'El muro deja de ser un final y pasa a ser una hora. El countdown es el motivo del próximo regreso.',
    screens: [
      {
        id: '01-muro-pase-gastado', name: 'Muro · faltan horas para el próximo pase',
        estado: 'wall-pass-spent',
        type: 'Paywall', patterns: ['Countdown', 'Appointment', 'Streak', 'Bottom sheet'],
        elements: ['Bottom sheet', 'Countdown timer', 'Secondary card', 'Primary button', 'Streak strip'],
        note: 'El countdown ocupa el lugar jerárquico que antes tenía el precio. La compra queda debajo, como atajo, no como única salida.',
        act: async (p) => { await click(p, '5 · El muro') },
      },
      {
        id: '01b-tras-el-anuncio', name: 'Después del anuncio · la economía encadena',
        estado: 'wall-with-balance',
        type: 'Paywall', patterns: ['Rewarded ad', 'Ad-gated unlock', 'Quota translated', 'Countdown'],
        elements: ['Bottom sheet', 'Reward row', 'Quota caption', 'Primary button', 'Countdown timer'],
        note: 'La salida gratuita que el producto YA tenía y que este trabajo casi propone como si fuera nueva: el anuncio recompensado, 15 monedas, tope 10 al día. Lo que la intervención aporta no es el anuncio sino su sitio y su etiqueta. El producto lo rotula «0/10» en gris: una fracción sin unidad, que además cuenta anuncios y no episodios. Acá dice cuántas veces se puede hacer y lo que cuesta cada vez, y el título ya dice qué abre — así el valor se entiende sin mezclar las dos unidades. Y al usarlo pasa algo que no estaba diseñado: las 15 monedas activan «Abrirlo ahora por 15 monedas» como acción primaria, así que la pantalla cambia de estado sola. Es la mejor prueba de que las piezas de la economía encajan.',
        act: async (p) => {
          await click(p, '5 · El muro')
          await p.locator('.anuncio').click()
          await p.waitForTimeout(450)
        },
      },
      {
        id: '02-muro-con-saldo', name: 'Muro · con saldo suficiente',
        estado: 'wall-with-balance',
        type: 'Paywall', patterns: ['Balance spend', 'Countdown', 'Streak'],
        elements: ['Bottom sheet', 'Countdown timer', 'Primary button', 'Balance caption'],
        note: 'Con saldo, la acción de pago sube a primaria — pero el saldo restante se declara en episodios, no en monedas.',
        act: async (p) => { await click(p, '6 · El muro') },
      },
    ],
  },
  {
    id: 'f3-tienda',
    name: 'Conseguir monedas',
    intent: 'La tienda deja de vender monedas y pasa a vender episodios.',
    screens: [
      {
        id: '01-tienda', name: 'Tienda · el precio en episodios',
        estado: 'store',
        type: 'Store', patterns: ['IAP packs', 'Value ladder', 'Unit-of-value translation'],
        elements: ['Bottom sheet', 'Goal row', 'Pack list', 'Badge', 'Price per unit'],
        note: 'Jerarquía invertida: EPISODIOS grande, monedas de subtítulo, precio a la derecha. La escalera baja el precio por episodio en cada escalón — hoy $1.99 y $3.99 rinden casi lo mismo. Y no hay ni un precio tachado: la fila superior calcula la meta real de la serie que el usuario está viendo, y el badge cae sobre el paquete que de verdad la termina.',
        act: async (p) => { await click(p, '7 · Tienda') },
      },
    ],
  },
  {
    id: 'f4-comodin',
    name: 'Faltar noches · el perdón del sistema',
    intent: 'Un usuario de 2.3 días por semana no puede sostener 7 de 7. El flujo abre con el momento en que el usuario vuelve —el acuse le dice qué se acumuló mientras no estaba— y sigue con los tres estados de perdón: el comodín que absorbe la falta, la racha que se corta sin drama, y los pases que se detienen en dos. Las dos primeras pantallas salen de un solo recorrido: el toast en el player, y el muro al que llega ese mismo usuario al darle a siguiente.',
    screens: [
      {
        id: '01-acuse-de-la-vuelta', name: 'Vuelves tras faltar · entran los dos',
        estado: 'player-free',
        type: 'Media player', patterns: ['Silent accrual', 'Toast', 'Anti-FOMO'],
        elements: ['Video', 'Toast', 'Wallet chip', 'Progress bar'],
        note: 'El único momento en que la regla anti-FOMO se le hace visible al usuario como recompensa y no como estado: *«Tu comodín te cubrió · Noche 4 · +2 pases»*. El pase se emite por reloj aunque nadie abra la app, así que al volver entra lo que se acumuló mientras no estabas. Si entrara uno solo, faltar costaría el pase de esa noche — el «úsalo o piérdelo» de Webtoon, que es justo lo que esta mecánica existe para no repetir.',
        act: async (p) => {
          await click(p, '5 · El muro')       // termina su noche con el pase gastado
          await click(p, 'Falté una noche')   // pasa una noche entera sin abrir la app
          await p.locator('.sheet-close').click()
          await p.waitForTimeout(150)
          // El `estado:` de arriba no alcanza acá: player-free también sería
          // cierto con un toast que dijera «+1 pase», que es exactamente la
          // regresión que esta pantalla existe para documentar.
          const t = await p.locator('.toast').first().innerText()
          if (!t.includes('+2 pases')) throw new Error(`el acuse decía «${t.replace(/\n/g, ' ')}», no «+2 pases»`)
        },
      },
      {
        id: '02-comodin-usado', name: 'El comodín te cubrió',
        estado: 'wall-passes-capped',
        type: 'Paywall', patterns: ['Streak protection', 'Forgiveness mechanic'],
        elements: ['Bottom sheet', 'Streak strip', 'Status row', 'Reward card'],
        note: 'Se consume solo. No hay nada que reclamar ni que comprar: si hay que hacer algo para no perder la racha, la racha ya es una tarea.',
        // Sigue al acuse sin resetear nada: el mismo usuario que acaba de ver el
        // toast le da a "siguiente" y choca con el muro. Las dos pantallas salen
        // de un recorrido, no de dos saltos independientes.
        act: async (p) => {
          await p.locator('[aria-label^="Siguiente episodio"]').click()
          await p.waitForTimeout(400)
        },
      },
      {
        id: '03-racha-rota', name: 'Se cortó la racha',
        estado: 'wall-streak-broken',
        type: 'Paywall', patterns: ['Streak reset', 'Non-punitive feedback'],
        elements: ['Bottom sheet', 'Notice', 'Streak strip', 'Reward card'],
        note: 'Sin rojo, sin alarma, sin oferta para "recuperar tu racha" por monedas. Se explica qué pasó, se dice cuándo vuelve el comodín, y el pase sigue estando ahí. Monetizar la culpa habría sido fácil y habría enseñado que el sistema es adversario.',
        act: async (p) => { await click(p, '10 · Racha rota') },
      },
      {
        id: '04-dos-pases', name: 'Dos pases acumulados · el tope',
        estado: 'wall-passes-capped',
        type: 'Paywall', patterns: ['Resource cap', 'Anti-FOMO'],
        elements: ['Bottom sheet', 'Reward card', 'Primary button', 'Streak strip'],
        note: 'Los pases se guardan hasta dos. Es la respuesta directa a la crítica que hundió al Daily Pass de Webtoon: un pase que se pierde es una obligación disfrazada de regalo. Con tope 2 faltar una noche no cuesta nada, y volver seguido sigue rindiendo más.',
        act: async (p) => { await click(p, '2b · El muro') },
      },
    ],
  },
  {
    id: 'f5-cuenta',
    name: 'Guardar la racha · de invitado a cuenta',
    intent: '88% consume como invitado. La cuenta se pide una sola vez y solo cuando ya hay algo que perder.',
    screens: [
      {
        id: '01-guardar-racha', name: 'Tienes algo que guardar',
        estado: 'account-prompt',
        type: 'Sign up', patterns: ['Contextual auth', 'Loss aversion', 'Guest-first'],
        elements: ['Bottom sheet', 'Stat tiles', 'Primary button', 'Text button', 'Fine print'],
        note: 'No hay muro de registro. El argumento no es "crea tu cuenta" sino "no pierdas estas 4 noches y estas 75 monedas".',
        act: async (p) => { await click(p, '8 · Guardar la racha') },
      },
    ],
  },
  {
    id: 'f6-mi-economia',
    name: 'Mi economía',
    intent: 'Objetivo de experiencia: que el usuario entienda fuentes, sumideros y su posición. Se abre desde el chip de saldo, dentro del player.',
    screens: [
      {
        id: '01-mi-economia', name: 'De dónde salen mis monedas',
        estado: 'streak-detail',
        type: 'Account / Wallet', patterns: ['Ledger', 'Source-sink model', 'Streak'],
        elements: ['Bottom sheet', 'Balance headline', 'Streak strip', 'Breakdown list', 'Total row'],
        note: 'La única superficie que explica la economía completa, y se llega a ella con un toque desde el player — no desde una pestaña.',
        act: async (p) => { await click(p, '9 · Mi economía') },
      },
    ],
  },
  {
    id: 'f7-stack-real',
    name: 'Sobre el stack real de Idilio',
    intent: 'La misma mecánica implementada en Next.js App Router + Tailwind v4 + Supabase, con los tokens de producción. El estado económico se resuelve en el servidor, que es el riesgo técnico nº 1 de la propuesta.',
    // Estas pantallas no se navegan con el panel: son rutas reales y prerrenderizadas.
    base: STACK,
    selector: 'main',
    // La versión del stack ocupa el alto del viewport (h-dvh), así que el
    // contexto tiene que medir lo mismo que el teléfono o las capturas salen
    // con otra proporción que las del prototipo.
    viewport: { width: 430, height: 932 },
    screens: [
      {
        id: '01-muro-pase-listo', name: 'Muro · el Pase está listo',
        estado: 'wall-pass-ready',
        type: 'Paywall', patterns: ['Server-rendered state', 'Reward claim', 'Streak'],
        elements: ['Bottom sheet', 'Reward card', 'Primary button', 'Streak strip'],
        note: 'Mismo muro, tokens reales: el violeta es #a000f0 y las superficies son negro neutro. Comparado con el prototipo se ve que mis superficies tenían tinte violeta — el producto real es más sobrio.',
        goto: '/serie/pasion-a-domicilio/13',
      },
      {
        id: '02-la-cita', name: 'La cita · hoy a las 21:30',
        estado: 'wall-pass-spent',
        type: 'Paywall', patterns: ['Countdown', 'Appointment', 'Opt-in notification'],
        elements: ['Bottom sheet', 'Clock time', 'Reminder toggle', 'Primary button', 'Streak strip'],
        note: 'El héroe es la hora del reloj. El botón «Avísame» es el que cierra el ciclo: sin push —el aviso que llega al teléfono—, la cita depende de que el usuario se acuerde — y ahí se pierde la mitad del efecto.',
        goto: '/serie/la-herencia-del-patriarca/19',
      },
      {
        id: '03-cuenta-regresiva-corta', name: 'Faltan 42 minutos',
        estado: 'wall-with-balance',
        type: 'Paywall', patterns: ['Countdown', 'Balance spend'],
        elements: ['Bottom sheet', 'Countdown timer', 'Primary button', 'Balance caption'],
        note: 'Debajo de una hora el countdown vuelve a ser el héroe: ahí los segundos sí son la información relevante. Y con saldo, el pago sube a primario — pero el resto se declara en episodios, no en monedas.',
        goto: '/serie/la-enfermera-infiltrada/13',
      },
    ],
  },
]

const log = (m) => process.stdout.write(m + '\n')

const run = async () => {
  await rm(OUT, { recursive: true, force: true })

  const browser = await chromium.launch()
  const manifest = { ...APP, flows: [] }
  let total = 0
  /** huella del PNG → qué pantalla la produjo. Ver la comprobación de duplicados. */
  const huellas = new Map()

  for (const flow of FLOWS) {
    const ctx = await browser.newContext({
      viewport: flow.viewport ?? { width: 1280, height: 1000 },
      deviceScaleFactor: 3,
      reducedMotion: 'reduce',
      colorScheme: 'dark',
      locale: 'es-MX',
    })
    const page = await ctx.newPage()
    const raiz = flow.base || BASE
    const selector = flow.selector || '.phone'

    if (flow.base) {
      const vivo = await page.goto(raiz, { waitUntil: 'networkidle' }).then(r => r?.ok()).catch(() => false)
      if (!vivo) {
        log(`  · ${flow.id} SALTADO — ${raiz} no responde`)
        await ctx.close()
        continue
      }
    } else {
      await page.goto(raiz, { waitUntil: 'networkidle' })
      await page.waitForTimeout(900)
    }

    const dir = join(OUT, 'flows', flow.id)
    await mkdir(dir, { recursive: true })

    const screens = []
    for (const s of flow.screens) {
      if (s.goto) {
        await page.goto(raiz + s.goto, { waitUntil: 'networkidle' })
        await page.waitForTimeout(600)
      } else {
        await s.act(page)
      }
      // Dos formatos a propósito: el PNG a 3x es el archivo —sirve para hacer
      // zoom y para llevarlo a Figma— y el WebP es lo que carga la galería.
      // Servir 17 PNG de 3x en la portada del entregable son 14 MB, y la
      // portada es lo primero que abre quien lo revisa.
      const file = `${s.id}.png`
      const preview = `${s.id}.webp`
      const nodo = page.locator(selector).first()

      // Comprobar ANTES de capturar. Este script llegó a publicar tres veces el
      // home con las etiquetas «Player · episodio gratis», «El acuse de la
      // noche» y «Player · episodio 13 abierto»: los `act` no habían llegado al
      // estado, el script lo anotó fielmente como stateKey "home" en el
      // manifiesto y siguió. El dato para detectarlo estaba ahí desde siempre;
      // lo que faltaba era compararlo contra algo.
      const stateKey = await nodo.getAttribute('data-state')
      if (s.estado && stateKey !== s.estado) {
        throw new Error(
          `${flow.id}/${s.id}: esperaba data-state="${s.estado}" y encontré "${stateKey}". ` +
          'El recorrido no llegó al estado, así que la captura sería de otra pantalla.',
        )
      }

      await nodo.screenshot({ path: join(dir, file) })
      await nodo.screenshot({ path: join(dir, preview), type: 'webp', quality: 80 })

      // Y una red debajo de la red. `data-state` es grueso a propósito: dos
      // pantallas legítimamente distintas comparten estado (las dos de f4 son
      // `wall-passes-capped` y difieren en la racha). Así que además: dos
      // capturas nunca pueden ser el mismo archivo. Es la comprobación que
      // habría cazado el bug de f1 sin depender de que alguien se acordara de
      // escribir el `estado:` correcto.
      const huella = createHash('md5').update(await readFile(join(dir, file))).digest('hex')
      if (huellas.has(huella)) {
        throw new Error(
          `${flow.id}/${s.id} salió idéntica a ${huellas.get(huella)}. ` +
          'Son la misma pantalla con dos nombres: una de las dos está mal.',
        )
      }
      huellas.set(huella, `${flow.id}/${s.id}`)

      screens.push({
        id: s.id, name: s.name, screenType: s.type,
        patterns: s.patterns, elements: s.elements, note: s.note,
        stateKey,
        image: `flows/${flow.id}/${file}`,
        preview: `flows/${flow.id}/${preview}`,
      })
      total++
      process.stdout.write(`  · ${flow.id}/${s.id}  [${stateKey}]\n`)
    }
    manifest.flows.push({ id: flow.id, name: flow.name, intent: flow.intent, screens })
    await ctx.close()
  }

  await browser.close()

  manifest.summary = {
    flows: manifest.flows.length,
    screens: total,
    screenTypes: [...new Set(manifest.flows.flatMap(f => f.screens.map(s => s.screenType)))].sort(),
    patterns: [...new Set(manifest.flows.flatMap(f => f.screens.flatMap(s => s.patterns)))].sort(),
    elements: [...new Set(manifest.flows.flatMap(f => f.screens.flatMap(s => s.elements)))].sort(),
  }

  await writeFile(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2))
  await writeFile(join(OUT, 'index.html'), gallery(manifest))
  await writeFile(join(OUT, 'README.md'), readme(manifest))
  console.log(`\n${total} pantallas · ${manifest.flows.length} flujos → ${OUT}`)
}

const gallery = (m) => `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${m.app} · ${m.release} — export de flujos</title>
<!-- Sin esto el navegador pide /favicon.ico en la raíz del dominio y se lleva un
     404 en la consola de la primera página que abre quien revisa. El icono vive
     en la raíz del sitio publicado, un nivel arriba de /flujos/. -->
<link rel="icon" type="image/svg+xml" href="../favicon.svg">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--bg:#08060D;--tx:#F2EBF7;--mid:#B7A9C4;--lo:#7C6E8B;--v:#A855F7;--c:#3FE0D0}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--tx);font-family:Outfit,system-ui,sans-serif;-webkit-font-smoothing:antialiased;
background-image:radial-gradient(900px 500px at 20% -5%,#1B0C2E,transparent 60%)}
.wrap{max-width:1180px;margin:0 auto;padding:56px 28px 100px}
header{border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:32px;margin-bottom:48px}
h1{font-size:36px;font-weight:800;letter-spacing:-1.2px;line-height:1.1}
.sub{color:var(--mid);font-size:15px;margin-top:10px;line-height:1.6;max-width:66ch}
.meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}
.tag{font-size:11.5px;font-weight:600;padding:5px 11px;border-radius:99px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);color:var(--mid)}
.flow{margin-bottom:72px}
.flow h2{font-size:22px;font-weight:700;letter-spacing:-.5px;display:flex;align-items:center;gap:11px}
.flow h2 i{font-style:normal;font-size:11px;font-weight:700;letter-spacing:1px;color:var(--v);background:rgba(168,85,247,.14);border:1px solid rgba(168,85,247,.3);padding:4px 9px;border-radius:99px;white-space:nowrap}
.flow .intent{color:var(--mid);font-size:14.5px;margin:12px 0 28px;line-height:1.65;max-width:70ch}
.row{display:flex;gap:24px;overflow-x:auto;padding-bottom:16px;scroll-snap-type:x mandatory}
.row::-webkit-scrollbar{height:8px}.row::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:99px}
.card{flex:0 0 292px;scroll-snap-align:start}
.card img{width:100%;height:auto;aspect-ratio:390/844;object-fit:contain;border-radius:26px;border:1px solid rgba(255,255,255,.1);display:block;background:#000}
.card h3{font-size:14.5px;font-weight:700;margin:15px 0 4px;letter-spacing:-.2px}
.card .type{font-size:11px;font-weight:700;letter-spacing:.9px;text-transform:uppercase;color:var(--c);margin-top:16px}
.card .note{font-size:12.5px;color:var(--mid);line-height:1.6;margin:10px 0}
.chips{display:flex;gap:5px;flex-wrap:wrap;margin-top:9px}
.chip{font-size:10.5px;font-weight:600;padding:3px 8px;border-radius:6px;background:rgba(168,85,247,.11);border:1px solid rgba(168,85,247,.22);color:#D3B6F5}
.chip.el{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.09);color:var(--lo)}
.tax{margin-top:64px;padding-top:40px;border-top:1px solid rgba(255,255,255,.08)}
.tax h2{font-size:19px;margin-bottom:22px;font-weight:700}
.taxgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:28px}
.taxgrid h3{font-size:11px;letter-spacing:1.1px;text-transform:uppercase;color:var(--lo);margin-bottom:11px;font-weight:700}
.taxgrid>div{line-height:2.2}
footer{margin-top:56px;color:var(--lo);font-size:12.5px;line-height:1.75}
code{color:var(--c);font-size:11.5px}
</style></head><body><div class="wrap">
<header>
<h1>${m.app} · ${m.release}</h1>
<p class="sub">Export de flujos del POC funcional. ${m.summary.screens} pantallas en ${m.summary.flows} flujos, capturadas de los prototipos funcionales — no son mockups.</p>
<div class="meta">
<span class="tag">${m.platform}</span><span class="tag">${m.device}</span>
<span class="tag">${m.theme}</span><span class="tag">${m.language}</span><span class="tag">${m.captured}</span>
</div>
</header>
<main>
${m.flows.map((f, i) => `<section class="flow">
<h2><i>Flujo ${i + 1}</i> ${f.name}</h2>
<p class="intent">${f.intent}</p>
<div class="row">${f.screens.map(s => `<article class="card">
<a href="${s.image}" target="_blank" rel="noopener" title="Abrir a tamaño completo">
<img src="${s.preview}" alt="${s.name}" width="390" height="844" loading="lazy" decoding="async">
</a>
<div class="type">${s.screenType}</div>
<h3>${s.name}</h3>
<p class="note">${s.note}</p>
<div class="chips">${s.patterns.map(p => `<span class="chip">${p}</span>`).join('')}</div>
<div class="chips">${s.elements.map(e => `<span class="chip el">${e}</span>`).join('')}</div>
</article>`).join('')}</div></section>`).join('')}
<section class="tax"><h2>Taxonomía</h2><div class="taxgrid">
<div><h3>Tipos de pantalla</h3>${m.summary.screenTypes.map(t => `<span class="chip">${t}</span> `).join('')}</div>
<div><h3>Patrones</h3>${m.summary.patterns.map(t => `<span class="chip">${t}</span> `).join('')}</div>
<div><h3>Elementos</h3>${m.summary.elements.map(t => `<span class="chip el">${t}</span> `).join('')}</div>
</div></section>
</main>
<footer>Capturado automáticamente de los prototipos con <code>poc/scripts/export-mobbin.mjs</code>.
Cada tarjeta abre la captura a 3× al hacer clic.<br>
Cifras medidas en las 50 series del catálogo el 26-ago-2026: 1 episodio = <b>15 monedas</b> sin
excepción · <b>10 episodios gratis</b> por serie (la moda) · <b>500 gratis</b> de 2.230 en total.</footer>
</div></body></html>`

const readme = (m) => `# Export de flujos · ${m.app}
### ${m.release}

${m.summary.screens} pantallas · ${m.summary.flows} flujos · ${m.device} · ${m.captured}

Abre \`index.html\` para la galería navegable. \`manifest.json\` tiene la taxonomía completa
en formato consumible (flujo → pantalla → tipo · patrones · elementos · estado interno del POC).

> La taxonomía —«Paywall», «Bottom sheet», «Reward claim»— va en inglés a propósito: es el
> vocabulario con el que Mobbin indexa estos flujos, y traducirlo lo haría inbuscable. Traducidos:
> *paywall* es el muro de pago, *bottom sheet* la tarjeta que sube desde abajo, *reward claim* el
> reclamo de la recompensa, *streak* la racha y *countdown* la cuenta regresiva.

Regenerar: \`cd poc && npm run export\` (con el dev server arriba).

${m.flows.map((f, i) => `## Flujo ${i + 1} · ${f.name}

${f.intent}

| # | Pantalla | Tipo | Patrones |
|---|---|---|---|
${f.screens.map((s, j) => `| ${j + 1} | [${s.name}](${s.image}) | ${s.screenType} | ${s.patterns.join(', ')} |`).join('\n')}

${f.screens.map(s => `**${s.name}** — ${s.note}`).join('\n\n')}
`).join('\n')}
## Taxonomía

**Tipos de pantalla:** ${m.summary.screenTypes.join(' · ')}

**Patrones:** ${m.summary.patterns.join(' · ')}

**Elementos:** ${m.summary.elements.join(' · ')}
`

run().catch((e) => { console.error(e); process.exit(1) })
