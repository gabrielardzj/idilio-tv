/**
 * La página del anexo del perfil. Dos comportamientos y nada más.
 *
 * No hay framework a propósito: es una página de lectura, y todo lo que se ve
 * está en el HTML. Si este archivo no carga, la página sigue completa — las
 * barras ya traen su ancho en `--w` y los datos están además en la tabla.
 */

/* ── 1 · Las barras crecen al entrar en pantalla ───────────────
   Con `IntersectionObserver` y no al cargar: si el gráfico está tres pantallas
   más abajo, animarlo al cargar es animarlo donde nadie lo ve, y el lector
   llega a un gráfico ya quieto. */
const grafico = document.getElementById('grafico')
if (grafico) {
  const mostrar = () => grafico.classList.add('listo')
  if (!('IntersectionObserver' in window)) mostrar()
  else {
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) if (e.isIntersecting) { mostrar(); obs.disconnect() }
    }, { threshold: 0.35 })
    obs.observe(grafico)
  }
}

/* ── 2 · El tooltip de cada barra ──────────────────────────────
   El gráfico dice cuánta tasa exige cada objetivo; el tooltip dice qué
   significa esa tasa. Es una mejora del ratón y nada más: lo mismo, en texto,
   vive en la tabla de datos que hay debajo del gráfico. Ver la nota de adentro
   sobre por qué las filas no son enfocables. */
const tip = document.getElementById('tip')
const filas = document.querySelectorAll('.fila-b[data-tip]')

if (tip && filas.length) {
  for (const fila of filas) {
    // Ojo: las filas NO se hacen enfocables. Están dentro de un `role="img"`,
    // así que las tecnologías de asistencia no exponen a sus hijos: un elemento
    // enfocable ahí adentro sería una parada de tabulador que no se anuncia.
    // El tooltip es una mejora para el ratón, y todo lo que dice está —entero y
    // en texto— en la tabla de datos de abajo, que sí es accesible.
    const colocar = (x, y) => {
      const caja = grafico.getBoundingClientRect()
      // El tooltip se ancla dentro de la tarjeta del gráfico, no del viewport:
      // así no se sale por el borde cuando la barra está pegada a la derecha.
      const izq = Math.min(Math.max(x - caja.left, 80), caja.width - 80)
      tip.style.left = `${izq}px`
      tip.style.top = `${y - caja.top}px`
    }

    const abrir = (e) => {
      tip.innerHTML = `<b>${fila.querySelector('.eje').firstChild.textContent.trim()} de alcance</b>${fila.dataset.tip}`
      const caja = fila.getBoundingClientRect()
      colocar(e && e.clientX ? e.clientX : caja.left + caja.width / 2, caja.top)
      tip.classList.add('visible')
    }
    const cerrar = () => tip.classList.remove('visible')

    fila.addEventListener('mouseenter', abrir)
    fila.addEventListener('mousemove', (e) => { if (tip.classList.contains('visible')) colocar(e.clientX, fila.getBoundingClientRect().top) })
    fila.addEventListener('mouseleave', cerrar)
  }
  // Escape cierra: un tooltip abierto por teclado que no se puede cerrar es una
  // trampa, no una ayuda.
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') tip.classList.remove('visible') })
}
