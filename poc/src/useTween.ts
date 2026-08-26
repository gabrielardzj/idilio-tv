import { useEffect, useRef, useState } from 'react';

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Interpola un número hacia `target`. Se usa para que el saldo y los pases
 * *bajen a la vista* al gastarlos: si el número simplemente cambia, el usuario
 * no percibe que pagó — y percibir el gasto es la mitad de entender la economía.
 */
export function useTween(target: number, ms = 620) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  const raf = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    if (a === target) return;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const v = a + (target - a) * easeOut(p);
      setValue(v);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else { from.current = target; setValue(target); }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, ms]);

  useEffect(() => { from.current = value; }, [value]);
  return value;
}
