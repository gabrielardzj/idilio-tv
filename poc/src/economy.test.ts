import { describe, it, expect } from 'vitest';
import {
  COINS_PER_EPISODE, CYCLE_LENGTH, buyCoins, canUnlock, creditNight,
  initialState, isUnlocked, nextNightOpensAt, nightIndex, rewardForNight, unlock,
} from './economy';

/** 25-ago-2026 a las HH:MM hora local. */
const t = (h: number, m = 0, day = 25) => new Date(2026, 7, day, h, m, 0, 0);

describe('el día de la economía cierra a las 4:00 am, no a medianoche', () => {
  it('las 11:30 pm y la 1:00 am siguiente son LA MISMA noche', () => {
    // El caso que rompe rachas hoy: el 54% de las sesiones cae en esta franja.
    expect(nightIndex(t(23, 30, 25))).toBe(nightIndex(t(1, 0, 26)));
  });

  it('las 3:59 am siguen siendo la noche anterior; las 4:01 am ya no', () => {
    expect(nightIndex(t(3, 59, 26))).toBe(nightIndex(t(23, 0, 25)));
    expect(nightIndex(t(4, 1, 26))).not.toBe(nightIndex(t(23, 0, 25)));
  });

  it('dos noches consecutivas se diferencian en exactamente 1', () => {
    expect(nightIndex(t(23, 0, 26)) - nightIndex(t(23, 0, 25))).toBe(1);
  });

  it('la próxima noche abre a las 4:00 am', () => {
    expect(nextNightOpensAt(t(23, 30, 25)).getHours()).toBe(4);
    expect(nextNightOpensAt(t(23, 30, 25)).getDate()).toBe(26);
    // A la 1 am ya estamos "dentro" de la noche: la próxima abre hoy mismo a las 4.
    expect(nextNightOpensAt(t(1, 0, 26)).getDate()).toBe(26);
  });
});

describe('la racha se acredita por ver, no por reclamar', () => {
  it('el primer episodio terminado arranca la noche 1 y entrega 1 pase', () => {
    const { state, event } = creditNight(initialState(), t(23));
    expect(event).toEqual({ kind: 'started', night: 1 });
    expect(state.night).toBe(1);
    expect(state.passes).toBe(1);
  });

  it('ver más episodios la MISMA noche no acumula más pases', () => {
    const a = creditNight(initialState(), t(23)).state;
    const b = creditNight(a, t(23, 50));
    const c = creditNight(b.state, t(1, 10, 26)); // cruzó medianoche: misma noche
    expect(b.event).toBeNull();
    expect(c.event).toBeNull();
    expect(c.state.passes).toBe(1);
    expect(c.state.night).toBe(1);
  });
});

describe('la tabla de recompensas premia donde el dato dice 2,4×', () => {
  it('escala 1 → 2 → 3 y el hito de la noche 3 entrega escudo', () => {
    expect(rewardForNight(1)).toEqual({ passes: 1, shield: false });
    expect(rewardForNight(2)).toEqual({ passes: 2, shield: false });
    expect(rewardForNight(3)).toEqual({ passes: 3, shield: true });
  });

  it('la noche 7 cierra el ciclo con 5 pases y repone el escudo', () => {
    expect(rewardForNight(7)).toEqual({ passes: 5, shield: true });
  });

  it('el contador de noches no se reinicia: lo que se repite es el ciclo de 7', () => {
    expect(rewardForNight(8)).toEqual(rewardForNight(1));
    expect(rewardForNight(10)).toEqual(rewardForNight(3));
    expect(CYCLE_LENGTH).toBe(7);
  });

  it('tres noches seguidas dejan al usuario en noche 3 con 3 pases y 1 escudo', () => {
    let s = creditNight(initialState(), t(23, 0, 25)).state;
    s = creditNight(s, t(23, 0, 26)).state;
    const third = creditNight(s, t(23, 0, 27));
    expect(third.event).toEqual({ kind: 'continued', night: 3 });
    expect(third.state.night).toBe(3);
    expect(third.state.passes).toBe(3);
    expect(third.state.shields).toBe(1);
  });
});

describe('los pases son acceso, no saldo: no se acumulan entre noches', () => {
  it('llegar a la noche 2 sin haber gastado el pase de la noche 1 da 2, no 3', () => {
    const n1 = creditNight(initialState(), t(23, 0, 25)).state;
    expect(n1.passes).toBe(1);
    const n2 = creditNight(n1, t(23, 0, 26)).state;
    expect(n2.passes).toBe(2); // reemplaza, no suma
  });
});

describe('el escudo cubre una noche y se consume solo', () => {
  it('faltar UNA noche con escudo mantiene la racha y gasta el escudo', () => {
    let s = creditNight(initialState(), t(23, 0, 25)).state;
    s = creditNight(s, t(23, 0, 26)).state;
    s = creditNight(s, t(23, 0, 27)).state; // noche 3 → gana escudo
    expect(s.shields).toBe(1);
    const back = creditNight(s, t(23, 0, 29)); // se saltó el 28
    expect(back.event).toEqual({ kind: 'shielded', night: 4, nightsMissed: 1 });
    expect(back.state.night).toBe(4);
    expect(back.state.shields).toBe(0);
  });

  it('faltar DOS noches rompe la racha aunque haya escudo', () => {
    let s = creditNight(initialState(), t(23, 0, 25)).state;
    s = creditNight(s, t(23, 0, 26)).state;
    s = creditNight(s, t(23, 0, 27)).state;
    const back = creditNight(s, t(23, 0, 30)); // faltó 28 y 29
    expect(back.event).toEqual({ kind: 'broken', previousNight: 3 });
    expect(back.state.night).toBe(1);
    expect(back.state.shields).toBe(1); // el escudo no se malgasta en un caso que no cubre
  });

  it('faltar una noche SIN escudo rompe la racha', () => {
    const s = creditNight(initialState(), t(23, 0, 25)).state; // noche 1, sin escudo
    const back = creditNight(s, t(23, 0, 27));
    expect(back.event).toEqual({ kind: 'broken', previousNight: 1 });
  });

  it('nunca se acumulan más de 2 escudos', () => {
    let s = initialState({ shields: 2, night: 6, lastNightIndex: nightIndex(t(23, 0, 25)) });
    s = creditNight(s, t(23, 0, 26)).state; // noche 7 → repone escudo
    expect(s.shields).toBe(2);
  });
});

describe('sumidero', () => {
  it('los episodios 1 a 10 son libres; del 11 en adelante, no', () => {
    const s = initialState();
    expect(isUnlocked(s, 10)).toBe(true);
    expect(isUnlocked(s, 11)).toBe(false);
  });

  it('un pase desbloquea sin tocar las monedas', () => {
    const s = unlock(initialState({ passes: 1, coins: 90 }), 11, 'pass');
    expect(s.passes).toBe(0);
    expect(s.coins).toBe(90);
    expect(isUnlocked(s, 11)).toBe(true);
  });

  it('pagar descuenta exactamente el precio del episodio', () => {
    const s = unlock(initialState({ coins: 40 }), 11, 'coins');
    expect(s.coins).toBe(40 - COINS_PER_EPISODE);
  });

  it('sin fondos no pasa nada: el estado no cambia', () => {
    const before = initialState({ coins: COINS_PER_EPISODE - 1 });
    expect(canUnlock(before, 'coins')).toBe(false);
    expect(unlock(before, 11, 'coins')).toBe(before);
  });

  it('no se cobra dos veces por el mismo episodio', () => {
    const once = unlock(initialState({ coins: 90 }), 11, 'coins');
    expect(unlock(once, 11, 'coins')).toBe(once);
  });
});

describe('la fuente gratuita nunca cubre el apetito de la sesión', () => {
  it('ni en la mejor noche el regalo llega a los 14 episodios de la sesión promedio', () => {
    const best = Math.max(...Array.from({ length: CYCLE_LENGTH }, (_, i) => rewardForNight(i + 1).passes));
    expect(best).toBe(5);
    expect(best).toBeLessThan(14); // sesión promedio observada
    // Queda de pago el 64% del apetito: la fuente ganada no canibaliza, fabrica muros.
    expect(Math.round(((14 - best) / 14) * 100)).toBe(64);
  });
});

describe('las monedas compradas sí se acumulan y no caducan', () => {
  it('comprar suma al saldo y sobrevive al cambio de noche', () => {
    let s = buyCoins(initialState(), 300);
    s = creditNight(s, t(23, 0, 25)).state;
    s = creditNight(s, t(23, 0, 27)).state; // racha rota
    expect(s.coins).toBe(300);
    expect(s.night).toBe(1);
  });
});
