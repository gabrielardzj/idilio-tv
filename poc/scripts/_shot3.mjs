import { chromium } from 'playwright-core'
const b = await chromium.launch()
const c = await b.newContext({ viewport: { width: 1200, height: 1000 }, deviceScaleFactor: 1 })
const p = await c.newPage()
await p.goto('file:///tmp/sitio-docs/diseno.html', { waitUntil: 'networkidle' })
await p.waitForTimeout(600)
await p.screenshot({ path: '/tmp/diseno-top.png' })
// la costura entre los dos documentos
await p.locator('h2#el-archivo-de-diseño').scrollIntoViewIfNeeded()
await p.evaluate(() => window.scrollBy(0, -260))
await p.waitForTimeout(300)
await p.screenshot({ path: '/tmp/diseno-costura.png' })
await b.close()
