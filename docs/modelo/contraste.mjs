/**
 * Auditoría de contraste de la paleta — fórmula WCAG 2.x sobre sRGB linearizado.
 *
 * Existe porque en la primera versión del entregable dos ratios estaban
 * estimados a ojo y salieron mal (3,3 en vez de 3,20 · 4,8 en vez de 4,97).
 * Un número de accesibilidad que no se calcula no es un número: es una opinión.
 *
 *   node docs/modelo/contraste.mjs
 */

const lin = (c) => (c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

const lum = (hex) => {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** Compone un color translúcido sobre un fondo opaco, como hace el navegador. */
const over = (fg, bg, alpha) => {
  const [f, b] = [fg.replace('#', ''), bg.replace('#', '')];
  return '#' + [0, 2, 4].map((i) => {
    const v = Math.round(parseInt(f.slice(i, i + 2), 16) * alpha
                       + parseInt(b.slice(i, i + 2), 16) * (1 - alpha));
    return v.toString(16).padStart(2, '0');
  }).join('');
};

const S2 = '#150d1c';   // --home-surface-2, el fondo del sheet
const S1 = '#0b070f';   // --home-surface-1, el fondo de las tarjetas
const TX = '#ecedee';   // --home-text

const CASOS = [
  ['texto base sobre el sheet',        TX,                    S2, 'AA'],
  ['texto dim (α .62) sobre el sheet', over(TX, S2, 0.62),    S2, 'AA'],
  ['texto tenue (α .52) sobre sheet',  over(TX, S2, 0.52),    S2, 'AA'],
  ['— antes: tenue (α .38)',           over(TX, S2, 0.38),    S2, 'AA'],
  ['magenta sobre el sheet',           '#d25af0',             S2, 'AA'],
  ['ámbar sobre el sheet',             '#ffb64d',             S2, 'AA'],
  ['cian (escudo) sobre el sheet',     '#63d6dc',             S2, 'AA'],
  ['blanco sobre inicio del gradiente','#ffffff',        '#6d19e2', 'AA'],
  ['blanco sobre fin del gradiente',   '#ffffff',        '#9b2fe0', 'AA'],
  ['— si el gradiente llegara al magenta de marca', '#ffffff', '#d25af0', 'AA'],
  ['texto oscuro sobre el CTA ámbar',  '#1a1005',        '#ffb64d', 'AA'],
  ['lila del chip de racha sobre S1',  '#e9c6ff',             S1, 'AA'],
];

const UMBRAL = { AA: 4.5, 'AA-grande': 3.0 };

console.log('\n  Contraste de la paleta · fórmula WCAG 2.x\n');
let fallos = 0;
for (const [nombre, fg, bg, nivel] of CASOS) {
  const r = ratio(fg, bg);
  const pasa = r >= UMBRAL[nivel];
  const informativo = nombre.startsWith('—');
  if (!pasa && !informativo) fallos++;
  const marca = informativo ? '·' : pasa ? '✓' : '✗';
  console.log(`  ${marca} ${nombre.padEnd(46)} ${r.toFixed(2).padStart(6)}:1`);
}
console.log(`\n  ${fallos === 0 ? 'Sin fallos' : fallos + ' fallo(s)'} sobre ${CASOS.filter(c => !c[0].startsWith('—')).length} casos evaluados.`);
console.log('  Las filas marcadas con · son referencias descartadas, no parte de la paleta.\n');
process.exit(fallos === 0 ? 0 : 1);
