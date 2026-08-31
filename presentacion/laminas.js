/**
 * Las láminas, en HTML plano.
 *
 * Van aparte del índice para poder corregirlas sin tocar la navegación. Las
 * cifras son las mismas que el resto del entregable —el verificador las
 * persigue en los documentos— y las capturas salen del export, que se
 * regenera del prototipo vivo.
 *
 * El orden es el del argumento: qué es el producto, qué encuentra el usuario,
 * qué falla, por qué, qué hacer y en qué orden. Los datos entran donde
 * deciden algo, no en un anexo.
 */
const LAMINAS = [

// 1 · la pregunta
`<div class="sube paso">Idilio TV · reto de Product Designer</div>
 <h1 class="sube">El muro no expulsa al usuario<br>de la app.<br>Lo expulsa de la historia.</h1>
 <p class="sube" style="margin-top:26px">¿Cómo usar mecánicas de gamificación para que <b>volver a Idilio</b> forme parte natural de la experiencia de ver microdramas?</p>
 <div class="cita sube"><p>Objetivo de negocio: subir el DAU/MAU, hoy en <b>0,33</b> — unos 2,3 días activos por semana. Objetivo de experiencia: que el usuario entienda la economía virtual.</p></div>`,

// 2 · el censo
`<div class="sube paso">El punto de partida · censo del catálogo</div>
 <h2 class="sube">Antes de opinar del producto, <em>hay que medirlo</em></h2>
 <p class="sube">Las 50 series del catálogo, una por una: cuántos episodios tiene cada una, cuántos regala y qué cuesta desbloquear el resto. De ahí sale todo lo que viene después.</p>
 <div class="cifras sube">
   <div class="cifra cian"><div class="n">50</div><div class="q">series · 2.230 episodios</div></div>
   <div class="cifra oro"><div class="n">15</div><div class="q">monedas por episodio, igual en las 41 con muro</div></div>
   <div class="cifra"><div class="n">10</div><div class="q">episodios gratis, la moda del catálogo</div></div>
   <div class="cifra viol"><div class="n">500</div><div class="q">episodios gratis sumando el catálogo entero</div></div>
 </div>
 <p class="sube baja" style="margin-top:20px;font-size:15px">Ese último número reaparece más adelante: es el que cambia el diagnóstico.</p>`,

// 3 · el muro real
`<div class="sube paso">Qué encuentra el usuario al chocar</div>
 <h2 class="sube">El muro no esconde la economía: <em>la enseña entera</em></h2>
 <div class="par sube">
   <img src="../docs/activos/docs__00-dogfooding__evidencia__muro-nativo-real-1.png" alt="El muro de pago de Idilio, con saldo, suscripción, anuncio y paquetes">
   <div>
     <p>Dice el saldo y el costo del episodio antes que ningún precio. Traduce cada paquete a episodios. Ofrece la suscripción. Y lleva un <b>anuncio recompensado</b> que abre un episodio gratis.</p>
     <p>Cualquiera de esas cosas, por separado, sería una mejora razonable que proponer. Están todas.</p>
     <p class="baja" style="font-size:15px">Lo que se lee mal es el <b>orden</b>: abre por lo más caro y deja la salida gratuita en la tarjeta más apagada, rotulada <code>0/10</code> — una fracción sin unidad que son diez episodios al día.</p>
   </div>
 </div>`,

// 4 · hallazgo 1, con la sesión dentro
`<div class="sube paso">Hallazgo 1</div>
 <h2 class="sube">Lo gratis se acaba <em>antes que la sesión</em></h2>
 <div class="par sube">
   <div>
     <p>La sesión promedio dura <b>22 minutos</b> y cubre unos <b>14 episodios</b>. El bloque gratis típico son <b>10</b>.</p>
     <p>La sesión no termina cuando el usuario se sacia: termina cuando choca. Y choca con hambre para cuatro episodios más.</p>
     <p class="baja" style="font-size:15px">14 es una media, y una media no se descompone en 10 + 4. Es la lectura más simple de esa diferencia y así queda enunciada.</p>
   </div>
   <div class="cifras" style="grid-template-columns:1fr">
     <div class="cifra oro"><div class="n">10 → 14</div><div class="q">episodios gratis contra episodios por sesión</div></div>
     <div class="cifra cian"><div class="n">22 min</div><div class="q">dura la sesión promedio</div></div>
   </div>
 </div>`,

// 5 · hallazgo 2
`<div class="sube paso">Hallazgo 2</div>
 <h2 class="sube">Pagar no es la única salida: <em>empezar otra serie es gratis</em></h2>
 <p class="sube">Con <b>500 episodios gratis</b> repartidos por el catálogo —casi cuatro meses de consumo—, el muro no expulsa de la app. Expulsa de la historia: la alternativa a pagar no es irse, es empezar otra cosa. Y ahí se pierde el vínculo que hacía volver.</p>
 <p class="sube">El <b>23%</b> que revé series terminadas apunta a lo mismo. La lectura optimista sería amor al contenido; la que encaja con el resto es que ya vieron lo gratis y no tienen a dónde ir.</p>
 <div class="cifras sube">
   <div class="cifra viol"><div class="n">500</div><div class="q">episodios gratis en el catálogo</div></div>
   <div class="cifra"><div class="n">9</div><div class="q">series enteramente gratis, sin muro</div></div>
   <div class="cifra oro"><div class="n">23%</div><div class="q">revé series que ya terminó</div></div>
 </div>`,

// 6 · la tesis
`<div class="sube paso">La tesis</div>
 <h2 class="sube">A esta economía no le falta legibilidad.<br><em>Le falta escasez.</em></h2>
 <p class="sube">El anuncio recompensado del muro da <b>15 monedas</b> y admite <b>diez al día</b>: 70 episodios gratis por semana, contra los 32 que consume el usuario promedio. Sumado a los 500 del catálogo, la moneda no significa gran cosa.</p>
 <p class="sube">Y ninguna de las salidas del muro <b>tiene fecha</b>: el anuncio se agota hoy, la suscripción abre todo, el paquete se compra una vez. Nada obliga a volver mañana.</p>
 <div class="cifras sube">
   <div class="cifra oro"><div class="n">70</div><div class="q">episodios gratis por semana solo con anuncios</div></div>
   <div class="cifra"><div class="n">32</div><div class="q">episodios que consume el usuario promedio</div></div>
   <div class="cifra mag"><div class="n">217%</div><div class="q">de su consumo ya está cubierto sin pagar</div></div>
 </div>`,

// 7 · el síntoma en las métricas
`<div class="sube paso">Cómo se ve eso en las métricas</div>
 <h2 class="sube">El metajuego existe, y <em>casi nadie lo juega</em></h2>
 <div class="par sube">
   <div>
     <p>La recompensa diaria aparece en un diálogo que <b>no se puede no ver</b>: se interpone entre el usuario y la app. Aun así, solo el <b>19%</b> la reclama.</p>
     <p>Eso descarta la explicación de visibilidad. El 81% restante no es que no la encuentre — la descarta. Y solo el <b>6%</b> llega al tercer día consecutivo de racha.</p>
     <p>Quien sí sostiene tres días retiene <b>2,4 veces</b> más a 30 días. Es una correlación fuerte, no una causa demostrada: puede que la racha retenga, o que quien ya iba a quedarse sea el que la sostiene.</p>
   </div>
   <div class="cifras" style="grid-template-columns:1fr">
     <div class="cifra oro"><div class="n">19%</div><div class="q">reclama la recompensa diaria</div></div>
     <div class="cifra mag"><div class="n">6%</div><div class="q">llega al tercer día de racha</div></div>
     <div class="cifra cian"><div class="n">2,4x</div><div class="q">retención D30 de quien la sostiene</div></div>
   </div>
 </div>`,

// 8 · por dónde no se puede ir
`<div class="sube paso">Por dónde no puede ir el diseño</div>
 <h2 class="sube">Tres cifras que <em>cierran puertas</em></h2>
 <p class="sube">Antes de proponer, conviene descartar. Estas tres eliminan las tres respuestas más obvias.</p>
 <div class="lista sube">
   <div class="item"><span class="k">82%</span><span class="v">nunca abrió el perfil. <b>Descarta rediseñarlo</b>: lo que vive en una pestaña aparte, para este usuario, no existe.</span></div>
   <div class="item"><span class="k">88%</span><span class="v">consume como invitado. <b>Descarta rankings y comparación social</b>: sin identidad no hay a quién comparar — y a la 1 a.m., viendo en vertical, tampoco se quiere.</span></div>
   <div class="item"><span class="k">2,3</span><span class="v">días activos por semana. <b>Descarta cualquier racha de 7 de 7</b>: pedir una frecuencia que el usuario no tiene convierte la mecánica en una deuda.</span></div>
 </div>`,

// 9 · la estrategia
`<div class="sube paso">Estrategia · ocho intervenciones, tres etapas</div>
 <h2 class="sube">Reordenar lo que existe antes de <em>añadir nada nuevo</em></h2>
 <p class="sube">La etapa 1 no agrega mecánicas ni mueve piezas de sitio: cambia el orden y la unidad en que se expresan. La única mecánica nueva del portafolio es I5.</p>
 <div class="lista sube">
   <div class="item"><span class="k">Etapa 1</span><span class="v">I1 la moneda habla en episodios · I2 el muro muestra las salidas que ya existen · I3 la escalera de precios vuelve a serlo · I4 continuidad web → app</span></div>
   <div class="item destaca"><span class="k">Etapa 2</span><span class="v">I5 <b>el Pase de la Noche + la Racha de Noches</b> · I6 progreso de serie visible</span></div>
   <div class="item"><span class="k">Etapa 3</span><span class="v">I7 la cuenta se pide cuando hay algo que perder · I8 el pase como puente entre series</span></div>
 </div>`,

// 10 · la intervención
`<div class="sube paso">La intervención · I5</div>
 <h2 class="sube">El muro deja de ser una pantalla<br>y pasa a ser <em>una hora del día</em></h2>
 <div class="par sube">
   <div>
     <p>Se emite <b>un pase por noche</b>, por reloj, esté el usuario o no. Se entrega al terminar un episodio —sin botón que pulsar— y se acumula hasta dos.</p>
     <p>El usuario <b>elige a qué serie</b> se lo da. Y la cita se ancla a su hora de siempre, no a «+24 h desde que lo usaste».</p>
     <p class="baja" style="font-size:15px">Objetivo declarado: llevar la racha de 3+ del 6% al 20%, y el reclamo de la fuente gratuita del 19% a ~100% por construcción.</p>
   </div>
   <img src="../flujos/flows/f2-la-cita/01-muro-pase-gastado.png" alt="El muro convertido en una cita: hoy a las 21:30">
 </div>`,

// 11 · la objeción
`<div class="sube paso">La objeción más dura</div>
 <h2 class="sube">¿Y por qué no lo resuelve <em>el anuncio</em>?</h2>
 <p class="sube">Como fuente de monedas, el Pase es el <b>10%</b> de lo que ya existe. Defenderlo por volumen sería defenderlo por lo que no es.</p>
 <div class="cifras sube">
   <div class="cifra oro"><div class="n">70</div><div class="q">episodios por semana da el anuncio</div></div>
   <div class="cifra cian"><div class="n">7</div><div class="q">da el Pase de la Noche</div></div>
 </div>
 <p class="sube" style="margin-top:24px">Lo que el anuncio <b>no</b> da: una razón para volver un día concreto —se puede agotar hoy entero— y un desbloqueo sin cortar la historia. Treinta segundos de publicidad a mitad de un cliffhanger es justo lo que la suscripción vende evitar.</p>
 <div class="cita sube"><p>El Pase no compite por dar más episodios. Compite por dar el de mañana.</p></div>`,

// 12 · las reglas, con los datos que las obligan
`<div class="sube paso">Las reglas, y el dato que obliga a cada una</div>
 <h2 class="sube">Cinco decisiones, <em>ninguna arbitraria</em></h2>
 <div class="lista sube">
   <div class="item"><span class="k">R1</span><span class="v">Se emite por reloj y se entrega al ver: <b>no hay nada que reclamar</b>. Es la respuesta al 19% — quitar el botón lleva la adopción a ~100% por construcción.</span></div>
   <div class="item"><span class="k">R1b</span><span class="v">Se acumula hasta dos y ahí se detiene. Con <b>2,3 días por semana</b>, faltar una noche no puede costar nada.</span></div>
   <div class="item"><span class="k">R2</span><span class="v">El usuario elige a qué serie. Un recurso que se asigna se entiende; uno que se recibe, no.</span></div>
   <div class="item"><span class="k">R3</span><span class="v">La noche corre de 5 a.m. a 5 a.m. Con el <b>54% de las sesiones entre 11 p.m. y 2 a.m.</b>, un corte a medianoche partiría en dos la misma noche del usuario.</span></div>
   <div class="item"><span class="k">R4</span><span class="v">Un comodín que se consume solo. Si hay que hacer algo para no perder la racha, la racha ya es una tarea.</span></div>
 </div>`,

// 13 · el orden del muro
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

// 14 · el POC
`<div class="sube paso">POC · y cómo se sabe que funciona</div>
 <h2 class="sube">Un prototipo que <em>se usa</em>, no que se mira</h2>
 <p class="sube">Interactivo, con el catálogo real de 50 series, en dos implementaciones: una de producto y otra sobre el stack verdadero de Idilio —Next.js, Tailwind, Supabase— con el estado económico resuelto en servidor, que es el riesgo técnico número uno.</p>
 <div class="cifras sube">
   <div class="cifra cian"><div class="n">40</div><div class="q">pasos del recorrido, en integración continua</div></div>
   <div class="cifra"><div class="n">23</div><div class="q">pantallas documentadas en 8 flujos</div></div>
   <div class="cifra oro"><div class="n">0</div><div class="q">violaciones WCAG en los 11 estados</div></div>
   <div class="cifra viol"><div class="n">67</div><div class="q">fuentes citadas, todas verificadas</div></div>
 </div>
 <p class="sube" style="margin-top:22px">Cada cifra publicada se comprueba contra el código antes de desplegar. Si un documento dice un número que el modelo no respalda, el despliegue falla.</p>`,

// 15 · lo descartado y adónde ir
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
