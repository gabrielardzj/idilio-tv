import { useEffect, useRef, useState } from 'react'

/**
 * Lo que sale también se ve.
 *
 * React desmonta en el mismo frame en que monta: la pantalla vieja desaparece
 * justo cuando entra la nueva, y durante los 300 ms de la animación de entrada
 * lo que hay detrás es el fondo negro del teléfono. Las hojas hacían lo mismo
 * pero peor —subían con animación y se iban de golpe, como si se apagaran— y al
 * relevarse entre ellas volvían a subir desde abajo aunque ya estuvieran ahí.
 *
 * Este módulo sostiene la capa saliente el tiempo exacto que dura su animación
 * de salida y después la suelta. Es lo único que hace falta para que entrar y
 * salir sean las dos mitades de un mismo movimiento y no dos cortes.
 */

/** Una capa en pantalla: la que está y, mientras dura el relevo, la que se va. */
export interface Capa<T> {
  id: number
  valor: T
  /** true mientras corre su animación de salida. Después desaparece. */
  sale: boolean
  /** El sentido del movimiento — la MISMA cadena para las dos capas, porque
   *  entrar y salir son las dos mitades de una sola transición y tienen que
   *  ir en direcciones complementarias. */
  dir: string
}

/**
 * Con `prefers-reduced-motion` no hay nada que sostener: la capa que sale se
 * suelta en el mismo frame.
 *
 * Se consulta al vuelo y no una vez al cargar por dos razones: el ajuste del
 * sistema puede cambiar con la página abierta, y el export de flujos levanta el
 * navegador con `reducedMotion: 'reduce'` — si acá quedara una duración viva,
 * las capturas saldrían con dos pantallas encimadas.
 */
export const quieto = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Devuelve las capas que hay que pintar: la actual, y la anterior mientras dure
 * su salida.
 *
 * @param actual  el valor de ahora, o `null` cuando no hay nada (ninguna hoja abierta)
 * @param clave   qué hace distinta a una capa de otra; si no cambia, no hay transición
 * @param ms      cuánto dura la salida — tiene que ser la MISMA cifra que el CSS,
 *                o la capa se queda montada sin animación o se va a mitad de camino
 * @param sentido de dónde a dónde va el movimiento; se guarda en las dos capas
 *
 * `clave` y `sentido` tienen que ser funciones estables (de módulo): entran en
 * las dependencias del efecto.
 */
export function useCapas<T>(
  actual: T | null,
  clave: (v: T) => string,
  ms: number,
  sentido?: (antes: T | null, ahora: T | null) => string,
): Capa<T>[] {
  const [capas, setCapas] = useState<Capa<T>[]>(() =>
    actual === null ? [] : [{ id: 0, valor: actual, sale: false, dir: '' }],
  )
  const seq = useRef(0)
  const previo = useRef<T | null>(actual)
  const claveAnterior = useRef<string | null>(actual === null ? null : clave(actual))
  // El temporizador vive en un ref y NO en el cleanup del efecto. El efecto se
  // vuelve a correr cada vez que cambia la identidad del valor —el reloj del
  // muro la cambia una vez por segundo—, y un cleanup habría cancelado el
  // retiro de la capa saliente sin programar otro: la pantalla vieja se
  // quedaba montada para siempre.
  const reloj = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(reloj.current), [])

  useEffect(() => {
    const k = actual === null ? null : clave(actual)

    if (k === claveAnterior.current) {
      // Es la misma capa con datos nuevos —el countdown que corre, el saldo que
      // cambia—. Se refresca en su sitio: reanimarla sería parpadear por nada.
      if (actual !== null && actual !== previo.current) {
        setCapas((cs) => cs.map((c) => (c.sale ? c : { ...c, valor: actual })))
      }
      previo.current = actual
      return
    }

    const dir = sentido ? sentido(previo.current, actual) : ''
    const id = seq.current + 1
    seq.current = id
    claveAnterior.current = k
    previo.current = actual

    setCapas((cs) => [
      // Si ya había una capa saliendo, se suelta acá mismo: dos salidas
      // encimadas no se leen, y si el usuario corre —o el recorrido
      // automatizado toca cada 90 ms— el DOM se llenaría de pantallas muertas.
      ...cs.filter((c) => !c.sale).map((c) => ({ ...c, sale: true, dir })),
      ...(actual === null ? [] : [{ id, valor: actual, sale: false, dir }]),
    ])

    clearTimeout(reloj.current)
    reloj.current = setTimeout(() => setCapas((cs) => cs.filter((c) => !c.sale)), quieto() ? 0 : ms)
  }, [actual, clave, ms, sentido])

  return capas
}
