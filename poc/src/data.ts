/** Serie de muestra. Título, sinopsis y títulos de episodio 1 y 8 son literales
 *  del catálogo real de www.idilio.tv; el resto son plausibles y sirven de relleno. */
export const SERIES = {
  title: 'Tres Meses de Amor',
  totalEpisodes: 30,
  synopsis:
    'Natalia es una joven trabajadora de un parque acuático que se esfuerza para mantener a su abuela en México.',
};

export const EPISODES: { n: number; title: string; line: string }[] = [
  { n: 1,  title: 'La voz de Natalia',      line: '—Cántala otra vez. Nadie tiene que enterarse.' },
  { n: 8,  title: 'Miedo a enamorarse',     line: '—No me mires así, que después no sé cómo irme.' },
  { n: 9,  title: 'Lo que no se dice',      line: '—Hay cosas que si las digo, ya no hay vuelta atrás.' },
  { n: 10, title: 'La última canción',      line: '—Esta la escribí pensando en ti. Perdóname.' },
  { n: 11, title: 'Tres meses',             line: '—El doctor dijo tres meses. Tres.' },
  { n: 12, title: 'El primer vuelo',        line: '—Nunca he volado. Y ya no voy a alcanzar.' },
  { n: 13, title: 'Sin despegar del suelo', line: '—Entonces te traigo el mundo aquí.' },
];

export const episodeMeta = (n: number) =>
  EPISODES.find((e) => e.n === n) ?? {
    n,
    title: `Capítulo ${n}`,
    line: '—Todavía no sabes de lo que soy capaz.',
  };

/** Paletas del "frame" de video. Derivadas de los tokens reales de marca. */
const SCENES = [
  'linear-gradient(165deg, #2a1140 0%, #6d19e2 42%, #d25af0 100%)',
  'linear-gradient(200deg, #0b070f 0%, #3a1258 48%, #a13ad0 100%)',
  'linear-gradient(150deg, #1e1426 0%, #5b1fb0 55%, #ffb64d 130%)',
  'linear-gradient(185deg, #150d1c 0%, #2d1a5e 45%, #63d6dc 125%)',
  'linear-gradient(160deg, #240b2e 0%, #7a1fc9 50%, #d25af0 105%)',
];
export const sceneFor = (n: number) => SCENES[n % SCENES.length];

export const COIN_PACKS = [
  { coins: 60,   price: '$0.99',  note: '4 capítulos',  best: false },
  { coins: 300,  price: '$4.99',  note: '20 capítulos', best: false },
  { coins: 990,  price: '$14.99', note: '66 capítulos', best: true  },
];
