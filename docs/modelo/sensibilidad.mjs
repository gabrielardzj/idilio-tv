/**
 * ¿Es alcanzable DAU/MAU 0,38 con esta intervención?
 *
 * No es una proyección — no tengo datos para proyectar. Es un modelo de
 * SENSIBILIDAD: responde "¿qué tendría que ser verdad para que el objetivo
 * se cumpla?". Todo supuesto está declarado y se puede cambiar y re-ejecutar.
 *
 *   node docs/modelo/sensibilidad.mjs
 */

// ── Datos del brief (los únicos números que no son supuestos) ───────────────
const DIAS_MES = 30;
const DAU_MAU_HOY = 0.33;
const SHARE_DIA3_HOY = 0.06;   // % que alcanza el 3.er día consecutivo

// Días activos por usuario y mes que implica el DAU/MAU actual.
const DIAS_ACTIVOS_HOY = DAU_MAU_HOY * DIAS_MES;   // 9,9

// ── Supuesto declarado ─────────────────────────────────────────────────────
// Modelo de dos segmentos:
//   E = "enganchados", los que sostienen racha de 3+ días. Cuota s, dE días/mes.
//   C = "casuales", el resto. Cuota 1−s, dC días/mes.
// dC se DEDUCE del promedio observado, no se supone:
const casualesDias = (dE, s = SHARE_DIA3_HOY) => (DIAS_ACTIVOS_HOY - s * dE) / (1 - s);

const dauMau = (s, dE, dC) => (s * dE + (1 - s) * dC) / DIAS_MES;

const pct = (x) => (x * 100).toFixed(0) + '%';
const f3 = (x) => x.toFixed(3);

// ── 1 · Sensibilidad: mover SOLO el tamaño del segmento enganchado ──────────
const ESCENARIOS_dE = [
  { dE: 18, etiqueta: '≈ 4 noches/semana' },
  { dE: 22, etiqueta: '≈ 5 noches/semana' },
  { dE: 26, etiqueta: '≈ 6 noches/semana' },
];
const CUOTAS = [0.06, 0.10, 0.15, 0.20, 0.25];

console.log('\n=== 1 · Si la intervención solo MUEVE GENTE al segmento enganchado ===');
console.log('    (dC se mantiene constante: los casuales no cambian)\n');
console.log('  días/mes del enganchado │ ' + CUOTAS.map((s) => pct(s).padStart(7)).join(' │'));
console.log('  ' + '─'.repeat(24) + '┼' + CUOTAS.map(() => '─'.repeat(8)).join('┼'));
for (const { dE, etiqueta } of ESCENARIOS_dE) {
  const dC = casualesDias(dE);
  const fila = CUOTAS.map((s) => {
    const v = dauMau(s, dE, dC);
    return (v >= 0.38 ? '*' : ' ') + f3(v);
  });
  console.log(`  ${String(dE).padStart(2)} ${etiqueta.padEnd(20)}│ ` + fila.map((x) => x.padStart(7)).join(' │'));
}
console.log('\n  (* alcanza o supera el objetivo 0,380)');

// ── 2 · ¿Qué cuota haría falta para llegar a 0,38 solo con la racha? ────────
console.log('\n=== 2 · Cuota de día-3 necesaria para 0,380 SIN mover a los casuales ===\n');
for (const { dE, etiqueta } of ESCENARIOS_dE) {
  const dC = casualesDias(dE);
  const sNec = (0.38 * DIAS_MES - dC) / (dE - dC);
  console.log(`  dE=${dE} (${etiqueta}) → hace falta ${pct(sNec)} de día-3  (hoy 6%)`);
}

// ── 3 · El plan completo: racha AL 15% + lift en los casuales ───────────────
// Las intervenciones baratas de la Ola 0 (corte a las 4am) y I1b (migaja en el
// reproductor) no crean enganchados: suben un poco a TODA la base.
console.log('\n=== 3 · Objetivo 0,380 con la meta realista de 15% de día-3 ===\n');
for (const { dE, etiqueta } of ESCENARIOS_dE) {
  const dC = casualesDias(dE);
  const s = 0.15;
  const soloRacha = dauMau(s, dE, dC);
  const dCnecesario = (0.38 * DIAS_MES - s * dE) / (1 - s);
  const delta = dCnecesario - dC;
  const linea = delta <= 0
    ? '     no hace falta tocar a los casuales'
    : `     falta subir a los casuales ....... +${delta.toFixed(2)} días/mes  (+${pct(delta / dC)} sobre ${dC.toFixed(2)})`;
  console.log(
    `  dE=${dE} (${etiqueta})\n` +
    `     solo racha al 15% ................ DAU/MAU ${f3(soloRacha)}  ${soloRacha >= 0.38 ? '✓' : '✗ no llega'}\n` +
    linea + '\n'
  );
}

// ── 4 · Lectura ────────────────────────────────────────────────────────────
console.log('=== 4 · Lectura ===\n');
// Techo teórico: se FIJA dC en el escenario central (dE=22) y se lleva al
// segmento enganchado al máximo posible, 30 días. Si se recalculara dC aquí,
// el promedio volvería a 9,9 por construcción y el cálculo no diría nada.
const dCcentral = casualesDias(22);
const techo = dauMau(SHARE_DIA3_HOY, DIAS_MES, dCcentral);
console.log('  Un segmento del 6% no puede mover el agregado por bueno que sea.');
console.log('  Techo teórico: si esos usuarios entraran LOS 30 DÍAS del mes y');
console.log(`  nadie más cambiara, el DAU/MAU llegaría a ${f3(techo)}.`);
console.log(`  El objetivo es 0,380. Ni en el caso imposible se alcanza.`);
console.log('');
console.log('  Por eso el plan NO puede descansar solo en la racha. Necesita las');
console.log('  dos piezas baratas de la Ola 0 (corte a las 4am, migaja en el');
console.log('  reproductor), que no crean enganchados pero suben un poco a todos.');
console.log('  Eso es lo que el modelo dice que falta, y es medio día al mes.\n');
