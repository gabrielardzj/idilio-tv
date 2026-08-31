/**
 * Las láminas, en HTML plano.
 *
 * Van en un archivo aparte y no incrustadas en el índice para que se puedan
 * leer y corregir sin tocar la navegación. Las cifras son las mismas que el
 * resto del entregable —el verificador las persigue en los documentos— y las
 * capturas salen del export, que se regenera del prototipo vivo.
 */
const LAMINAS = [

// 1 · la pregunta del reto
`<div class="sube paso">Idilio TV · reto de Product Designer</div>
 <h1 class="sube">El muro no expulsa al usuario<br>de la app.<br>Lo expulsa de la historia.</h1>
 <p class="sube" style="margin-top:26px">¿Cómo usar mecánicas de gamificación para que <b>volver a Idilio</b> forme parte natural de la experiencia de ver microdramas?</p>
 <div class="cita sube"><p>Objetivo de negocio: subir el DAU/MAU. Objetivo de experiencia: que el usuario entienda la economía virtual — cuánto vale la moneda, de dónde sale y dónde está él dentro del sistema.</p></div>`,

// 2 · de qué producto hablamos
`<div class="sube paso">Punto de partida · medido, no supuesto</div>
 <h2 class="sube">Antes de diagnosticar, <em>censé el catálogo entero</em></h2>
 <p class="sube">El brief no traía cifras de producto, así que las tomé: las 50 series, sus episodios gratis y su costo de desbloqueo, leídos del reproductor web público. Todo lo que sigue se apoya en eso.</p>
 <div class="cifras sube">
   <div class="cifra cian"><div class="n">50</div><div class="q">series · 2.230 episodios</div></div>
   <div class="cifra oro"><div class="n">15</div><div class="q">monedas por episodio, en las 41 con muro</div></div>
   <div class="cifra"><div class="n">10</div><div class="q">episodios gratis, la moda del catálogo</div></div>
   <div class="cifra viol"><div class="n">2,3</div><div class="q">días por semana entra el usuario medio</div></div>
 </div>`,

// 3 · los datos del brief, y qué decide cada uno
`<div class="sube paso">Datos disponibles · las nueve señales del brief</div>
 <h2 class="sube">Cada cifra decide algo, <em>o queda descartada por escrito</em></h2>
 <table class="senales sube">
   <thead><tr><th>Señal</th><th>Valor</th><th>Qué decide en este trabajo</th></tr></thead>
   <tbody>
     <tr><td>Stickiness (DAU/MAU)</td><td class="val">0,33</td><td class="usa">El objetivo. Y sus <b>2,3 días por semana</b> obligan al comodín y al tope de dos: nadie sostiene 7 de 7.</td></tr>
     <tr><td>Reclaman la recompensa diaria</td><td class="val">19%</td><td class="usa">La corrección directa de <b>R1</b>: el pase no se reclama. Ese 81% restante no es que no la encuentre — la descarta.</td></tr>
     <tr><td>Llegan al 3.er día de racha</td><td class="val">6%</td><td class="usa">La métrica que <b>I5</b> mueve. Objetivo declarado: 20%.</td></tr>
     <tr><td>Sesión promedio</td><td class="val">22 min · 14 eps</td><td class="usa">Contra los 10 gratis del censo, es el <b>Hallazgo 1</b>: lo gratis se acaba antes que la sesión.</td></tr>
     <tr><td>Sesiones entre 11 p.m. y 2 a.m.</td><td class="val">54%</td><td class="usa">Por eso la noche corre de <b>5 a.m. a 5 a.m.</b> — con corte a medianoche, ver a las 23:40 y a las 00:20 rompería la racha.</td></tr>
     <tr><td>Consumen como invitado</td><td class="val">88%</td><td class="usa">La cuenta se pide tarde y una sola vez (<b>I7</b>), cuando ya hay racha y saldo que perder.</td></tr>
     <tr class="fuera"><td>Nunca abrieron el perfil</td><td class="val">82%</td><td class="usa"><b>Descarta</b> rediseñar el perfil. No se arregla un cuarto amoblándolo.</td></tr>
     <tr class="fuera"><td>Retención D30 con racha de 3+</td><td class="val">2,4x</td><td class="usa"><b>Descartada como causa.</b> Es la señal más tentadora y la más peligrosa: quien sostiene tres días ya era el usuario fiel.</td></tr>
     <tr class="fuera"><td>Revén series terminadas</td><td class="val">23%</td><td class="usa"><b>Descartada la lectura optimista.</b> No es amor al contenido: ya vieron lo gratis y no tienen a dónde ir.</td></tr>
   </tbody>
 </table>
 <div class="aviso sube"><b>Son hipotéticas.</b> Las nueve vienen del brief y fueron preparadas para este ejercicio: no corresponden a métricas reales de Idilio TV. Lo que sí está medido —el catálogo, los precios, el muro— lo censé yo y se distingue en todo el entregable.</div>`,

// 4 · de dónde sale cada cosa
`<div class="sube paso">Procedencia · qué es dato, qué es medición, qué es propuesta</div>
 <h2 class="sube">Tres orígenes distintos, y <em>nunca se mezclan</em></h2>
 <p class="sube">Un diagnóstico se sostiene o se cae por esto. Las nueve señales del brief son hipotéticas; el catálogo lo medí; la mecánica es propuesta mía. Cada afirmación del entregable dice de cuál de los tres viene.</p>
 <div class="lista sube">
   <div class="item"><span class="k">del brief</span><span class="v"><b>Hipotéticas.</b> Las nueve señales de comportamiento. Preparadas para el ejercicio, no son métricas reales del producto.</span></div>
   <div class="item destaca"><span class="k">medido</span><span class="v"><b>Del producto real.</b> Las 50 series y sus 2.230 episodios, los 15 monedas por episodio, los precios en pesos, el muro capturado dentro de la app. Lo levanté yo del reproductor web y de la app.</span></div>
   <div class="item"><span class="k">propuesta</span><span class="v"><b>Mío.</b> El Pase de la Noche, la Racha, el comodín, el orden del muro. Marcado como propuesta en el modelo económico, línea por línea.</span></div>
 </div>
 <div class="cita sube"><p>El código lo hace explícito: cada constante lleva <code>REAL</code> o <code>PROPUESTA</code>, y un verificador falla el despliegue si un documento publica una cifra que el modelo no respalda.</p></div>`,

// 3 · hallazgo 1
`<div class="sube paso">Hallazgo 1</div>
 <h2 class="sube">Lo gratis se acaba <em>antes que la sesión</em></h2>
 <div class="par sube">
   <div>
     <p>El bloque gratis típico son <b>10 episodios</b>. La sesión media llega a <b>14</b>. La sesión no termina cuando el usuario se sacia: termina cuando choca.</p>
     <p class="baja" style="font-size:15px">14 es una media y una media no se descompone en 10 + 4. Es la lectura más simple de esa diferencia, y así queda enunciada — no como demostración.</p>
   </div>
   <div class="cifras" style="grid-template-columns:1fr">
     <div class="cifra oro"><div class="n">10 → 14</div><div class="q">episodios gratis contra episodios por sesión</div></div>
     <div class="cifra"><div class="n">54%</div><div class="q">de las sesiones, entre 11 p.m. y 2 a.m.</div></div>
   </div>
 </div>`,

// 4 · hallazgo 2
`<div class="sube paso">Hallazgo 2</div>
 <h2 class="sube">Pagar no es la única salida: <em>empezar otra serie es gratis</em></h2>
 <p class="sube">El censo destapó algo más grande que el muro: sumando las 50 series hay <b>500 episodios gratis</b> repartidos por el catálogo. Casi cuatro meses de consumo sin pagar un peso.</p>
 <p class="sube">Por eso el muro no expulsa de la app. Expulsa de la historia: la alternativa a pagar no es irse, es empezar otra cosa — y ahí se pierde el vínculo que hacía volver.</p>
 <div class="cifras sube">
   <div class="cifra cian"><div class="n">500</div><div class="q">episodios gratis en el catálogo</div></div>
   <div class="cifra"><div class="n">9</div><div class="q">series enteramente gratis, sin muro</div></div>
   <div class="cifra viol"><div class="n">23%</div><div class="q">de lo que se ve son revisionados</div></div>
 </div>`,

// 5 · la corrección
`<div class="sube paso">Una corrección, a la vista</div>
 <h2 class="sube">La evidencia sobre la que construí <em>no era la app</em></h2>
 <p class="sube">Buena parte del diagnóstico se apoyaba en <code>paywall-nativo-1.20.0.jpg</code>, que resultó ser <b>material promocional de la ficha de App Store</b>: logo, mockup de teléfono, precios en dólares y una versión anterior del muro.</p>
 <p class="sube">Las capturas de la app real desmintieron cuatro afirmaciones del documento. Se corrigieron las cuatro y la imagen se conserva en la evidencia, etiquetada, porque saber cuál fue la fuente del error vale más que borrar la prueba.</p>
 <div class="lista sube">
   <div class="item"><span class="k">decía</span><span class="v">«cuatro packs de monedas y nada más»</span></div>
   <div class="item"><span class="k">decía</span><span class="v">«las fuentes gratuitas viven todas en otra pestaña»</span></div>
   <div class="item"><span class="k">decía</span><span class="v">«el muro no ofrece ninguno de los dos pases»</span></div>
   <div class="item destaca"><span class="k">es</span><span class="v">el muro enseña la economía entera — y la ordena al revés</span></div>
 </div>`,

// 6 · el muro real
`<div class="sube paso">El muro real, dentro de la app</div>
 <h2 class="sube">No esconde la economía: <em>la enseña entera</em></h2>
 <div class="par sube">
   <img src="../docs/activos/docs__00-dogfooding__evidencia__muro-nativo-real-1.png" alt="El muro real de Idilio, con el saldo, la suscripción y los paquetes">
   <div>
     <p>Dice el saldo y el costo antes que ningún precio, traduce cada paquete a episodios, ofrece la suscripción y lleva un <b>anuncio recompensado</b> que abre un episodio gratis.</p>
     <p>Lo que se lee mal es <b>el orden</b>: abre por lo más caro y deja la salida gratuita en la tarjeta más apagada, rotulada <code>0/10</code> — una fracción sin unidad que son diez episodios gratis al día.</p>
   </div>
 </div>`,

// 7 · la tesis
`<div class="sube paso">La tesis</div>
 <h2 class="sube">A esta economía no le falta legibilidad.<br><em>Le falta escasez.</em></h2>
 <p class="sube">Con diez episodios diarios por anuncio y 500 gratis repartidos por el catálogo, la moneda no significa gran cosa. Y ninguna de las salidas del muro <b>tiene fecha</b>: el anuncio se agota hoy, la suscripción abre todo, el paquete se compra una vez.</p>
 <p class="sube">Nada obliga a volver mañana. Por eso el metajuego no mueve el regreso por más monedas que reparta.</p>
 <div class="cifras sube">
   <div class="cifra oro"><div class="n">70</div><div class="q">episodios gratis por semana solo con anuncios</div></div>
   <div class="cifra"><div class="n">32</div><div class="q">episodios que consume el usuario medio</div></div>
   <div class="cifra mag"><div class="n">217%</div><div class="q">de su consumo ya está cubierto sin pagar</div></div>
 </div>`,

// 8 · la estrategia
`<div class="sube paso">Estrategia · ocho intervenciones, tres etapas</div>
 <h2 class="sube">Reordenar lo que existe antes de <em>añadir nada nuevo</em></h2>
 <p class="sube">La etapa 1 no agrega mecánicas ni mueve piezas de sitio: cambia el orden y la unidad en que se expresan. La única mecánica nueva de todo el portafolio es I5.</p>
 <div class="lista sube">
   <div class="item"><span class="k">Etapa 1</span><span class="v">I1 la moneda habla en episodios · I2 el muro muestra las salidas que ya existen · I3 la escalera de precios vuelve a serlo · I4 continuidad web → app</span></div>
   <div class="item destaca"><span class="k">Etapa 2</span><span class="v">I5 <b>el Pase de la Noche + la Racha de Noches</b> · I6 progreso de serie visible</span></div>
   <div class="item"><span class="k">Etapa 3</span><span class="v">I7 la cuenta se pide cuando hay algo que perder · I8 el pase como puente entre series</span></div>
 </div>`,

// 9 · la intervención
`<div class="sube paso">La intervención · I5</div>
 <h2 class="sube">El muro deja de ser una pantalla<br>y pasa a ser <em>una hora del día</em></h2>
 <div class="par sube">
   <div>
     <p>Se emite <b>un pase por noche</b>, por reloj, esté el usuario o no. Se entrega al terminar un episodio —sin botón que pulsar— y se acumula hasta dos.</p>
     <p>El usuario <b>elige a qué serie</b> se lo da. Y la cita se ancla a su hora de siempre, no a «+24 h desde que lo usaste».</p>
   </div>
   <img src="../flujos/flows/f2-la-cita/01-muro-pase-gastado.png" alt="El muro convertido en una cita: hoy a las 21:30">
 </div>`,

// 10 · la objeción más dura
`<div class="sube paso">La objeción más dura, con los números en contra</div>
 <h2 class="sube">¿Y por qué no lo resuelve <em>el anuncio</em>?</h2>
 <p class="sube">Como fuente de monedas, el Pase es el <b>10%</b> de lo que ya existe. Defenderlo por volumen sería defenderlo por lo que no es.</p>
 <div class="cifras sube">
   <div class="cifra oro"><div class="n">70</div><div class="q">episodios por semana da el anuncio</div></div>
   <div class="cifra cian"><div class="n">7</div><div class="q">da el Pase de la Noche</div></div>
 </div>
 <p class="sube" style="margin-top:24px">Lo que el anuncio <b>no</b> da: una razón para volver un día concreto —se puede agotar hoy entero— y un desbloqueo sin cortar la historia. Treinta segundos de publicidad a mitad de un cliffhanger es justo lo que la suscripción vende evitar.</p>
 <div class="cita sube"><p>El Pase no compite por dar más episodios. Compite por dar el de mañana.</p></div>`,

// 11 · las reglas
`<div class="sube paso">Las reglas que sostienen la mecánica</div>
 <h2 class="sube">Cinco decisiones, y por qué <em>cada una</em></h2>
 <div class="lista sube">
   <div class="item"><span class="k">R1</span><span class="v">Se emite por reloj y se entrega al ver. <b>No hay nada que reclamar</b> — es la corrección directa al 19% de reclamo de la recompensa diaria.</span></div>
   <div class="item"><span class="k">R1b</span><span class="v">Se acumula hasta dos y ahí se detiene. Faltar una noche no cuesta nada; el «úsalo o piérdelo» es lo que hundió al Daily Pass de Webtoon.</span></div>
   <div class="item"><span class="k">R2</span><span class="v">El usuario elige a qué serie. Un recurso que se asigna se entiende; uno que se recibe, no.</span></div>
   <div class="item"><span class="k">R3</span><span class="v">La noche corre de 5 a.m. a 5 a.m. Con corte a medianoche, ver a las 23:40 y a las 00:20 rompería la racha.</span></div>
   <div class="item"><span class="k">R4</span><span class="v">Un comodín que se consume solo. Si hay que hacer algo para no perder la racha, la racha ya es una tarea.</span></div>
 </div>`,

// 12 · el orden del muro
`<div class="sube paso">La decisión de diseño que lo gobierna todo</div>
 <h2 class="sube">Lo gratis <em>siempre</em> va arriba de lo pago</h2>
 <div class="par sube">
   <img src="../flujos/flows/f1-pase-de-la-noche/02-muro-pase-listo.png" alt="El muro rediseñado: historia, posición, pase, anuncio, pago, racha">
   <div>
     <p>De arriba a abajo: <b>la historia</b> (el cliffhanger), dónde va el usuario, el Pase, el anuncio, el pago y su racha.</p>
     <p>Un muro que abre con precios enseña que el sistema es una tienda. Uno que abre con la historia recuerda por qué el usuario está ahí — y el deseo es lo que le da valor a la moneda.</p>
     <p class="baja" style="font-size:15px">El anuncio va debajo del Pase porque el Pase es lo mismo sin los treinta segundos ni el corte.</p>
   </div>
 </div>`,

// 13 · el POC y lo verificado
`<div class="sube paso">POC · y cómo sé que funciona</div>
 <h2 class="sube">Un prototipo que <em>se usa</em>, no que se mira</h2>
 <p class="sube">Interactivo, con el catálogo real de 50 series, en dos implementaciones: una de producto y otra sobre el stack verdadero de Idilio —Next.js, Tailwind, Supabase— con el estado económico resuelto en servidor, que es el riesgo técnico número uno.</p>
 <div class="cifras sube">
   <div class="cifra cian"><div class="n">40</div><div class="q">pasos del recorrido, en integración continua</div></div>
   <div class="cifra"><div class="n">23</div><div class="q">pantallas documentadas en 8 flujos</div></div>
   <div class="cifra oro"><div class="n">0</div><div class="q">violaciones WCAG en los 11 estados</div></div>
   <div class="cifra viol"><div class="n">67</div><div class="q">fuentes citadas, todas verificadas</div></div>
 </div>
 <p class="sube" style="margin-top:22px">Cada cifra publicada se comprueba contra el código antes de desplegar. Si un documento dice un número que el modelo no respalda, el despliegue falla.</p>`,

// 14 · lo descartado y adónde ir
`<div class="sube paso">Lo que queda deliberadamente afuera</div>
 <h2 class="sube">Decidir qué <em>no</em> hacer es la mitad del trabajo</h2>
 <div class="lista sube">
   <div class="item"><span class="k">no</span><span class="v"><b>Rankings y comparación social.</b> 11 p.m.–2 a.m., consumo solitario, 88% sin identidad. No es motivación, es exposición.</span></div>
   <div class="item"><span class="k">no</span><span class="v"><b>Rediseñar el perfil.</b> El 82% nunca entra. No se arregla un cuarto amoblándolo.</span></div>
   <div class="item"><span class="k">no</span><span class="v"><b>La suscripción como mecánica de retención.</b> No mueve el DAU/MAU del no pagador, que es el 95% de la base.</span></div>
   <div class="item"><span class="k">no</span><span class="v"><b>Recortar los episodios gratis.</b> Es la palanca más pesada de la economía y la que más daño hace si se calcula mal.</span></div>
 </div>
 <p class="sube" style="margin-top:26px"><a href="../">El prototipo</a> · <a href="../docs/diagnostico.html">Diagnóstico</a> · <a href="../docs/estrategia.html">Estrategia</a> · <a href="../docs/intervencion.html">La intervención</a> · <a href="../flujos/">Los 23 flujos</a> · <a href="../stack/">Sobre el stack real</a></p>`,

]
