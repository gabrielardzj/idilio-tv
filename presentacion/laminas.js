/**
 * Las láminas, en HTML plano.
 *
 * Van aparte del índice para poder corregirlas sin tocar la navegación. Las
 * cifras son las mismas que el resto del entregable —el verificador las
 * persigue en los documentos— y las capturas salen del export, que se
 * regenera del prototipo vivo.
 *
 * El orden es el del argumento: cómo se midió, qué es el producto, qué
 * encuentra el usuario, qué dicen los datos cuando se leen contra esa medición,
 * qué falla, por qué, qué hacer, en qué orden, cuál se elige y cómo se sabe si
 * funcionó. Los datos entran donde deciden algo, no en un anexo.
 */
const LAMINAS = [

// 1 · el título, que es ya el diagnóstico
`<div class="sube paso">Idilio TV · reto de Product Designer</div>
 <h1 class="sube">El producto ya lo tiene todo,<br>menos un motivo.</h1>
 <p class="sube" style="margin-top:26px">La economía está construida, es visible y reparte de sobra. Lo que no hay es una razón para volver mañana — y eso es lo que mide el <b>DAU/MAU, hoy en 0,33</b>: unos 2,3 días activos por semana.</p>
 <div class="cita sube"><p>¿Cómo usar mecánicas de gamificación para que <b>volver a Idilio</b> forme parte natural de la experiencia de ver microdramas?</p></div>`,

// 2 · el método: el censo va antes que las métricas
`<div class="sube paso">El método</div>
 <h2 class="sube">Primero se usó el producto.<br><em>Después se miraron las métricas.</em></h2>
 <p class="sube">El análisis parte del uso directo del reproductor web de idilio.tv y del build nativo 1.20.0, y del <b>censo completo de las 50 series del catálogo</b>: cuántos episodios tiene cada una, cuántos regala y qué cuesta desbloquear el resto. Las nueve señales de comportamiento se leyeron al final, ya con el catálogo medido delante — y ese orden es el que cambia lo que dicen.</p>
 <div class="cifras sube">
   <div class="cifra cian"><div class="n">50</div><div class="q">series censadas, una por una</div></div>
   <div class="cifra"><div class="n">2.230</div><div class="q">episodios contados, con su precio</div></div>
   <div class="cifra oro"><div class="n" style="font-size:clamp(24px,2.7vw,36px)">1.20.0</div><div class="q">el build nativo recorrido, con storefront de Colombia</div></div>
 </div>
 <div class="aviso sube"><b>De dónde viene cada cifra.</b> Las nueve señales de comportamiento vienen del brief y son hipotéticas: no son métricas reales del producto. El catálogo, los precios en pesos, el costo por episodio y el muro están medidos dentro de la app. El entregable distingue las dos procedencias en cada afirmación.</div>`,

// 3 · lo tiene todo · el muro, entero
`<div class="sube paso">Lo tiene todo · 1 de 2</div>
 <h2 class="sube">El muro ya ofrece <em>todas las salidas</em></h2>
 <div class="duo sube">
   <figure>
     <img src="../docs/activos/docs__00-dogfooding__evidencia__muro-nativo-real-1.png" alt="Parte superior del muro: saldo, costo del episodio y los dos planes de suscripción">
     <figcaption>Arriba · el saldo, el costo del episodio y los dos planes</figcaption>
   </figure>
   <figure>
     <img src="../docs/activos/docs__00-dogfooding__evidencia__muro-nativo-real-2.png" alt="Parte inferior del muro: anuncio recompensado, los tres paquetes de monedas y el enlace a Recompensas">
     <figcaption>Abajo · el anuncio gratuito, los tres paquetes y el enlace a Recompensas</figcaption>
   </figure>
 </div>
 <p class="sube">Una salida gratuita, tres de pago por monedas, dos de suscripción y un enlace a las demás. Con el saldo y el costo arriba del todo, y cada paquete traducido a episodios: <b>«desbloquea 12 episodios»</b>, no «180 monedas».</p>
 <div class="cierre sube"><b>No hay nada que agregar a esta pantalla.</b> Todo lo que un rediseño propondría —hacer visible la economía, ofrecer una alternativa gratuita, traducir la moneda— ya está puesto. El trabajo no es añadir: es ordenar.</div>`,

// 4 · lo tiene todo · el catálogo
`<div class="sube paso">Lo tiene todo · 2 de 2</div>
 <h2 class="sube">Y el catálogo <em>reparte de sobra</em></h2>
 <p class="sube">El censo de las 50 series, una por una: cuántos episodios tiene cada una, cuántos regala y qué cuesta desbloquear el resto. La conclusión no es que falte contenido gratis.</p>
 <div class="cifras sube">
   <div class="cifra cian"><div class="n">50</div><div class="q">series · 2.230 episodios</div></div>
   <div class="cifra oro"><div class="n">15</div><div class="q">monedas por episodio, igual en las 41 con muro</div></div>
   <div class="cifra"><div class="n">10</div><div class="q">episodios gratis, la moda del catálogo</div></div>
   <div class="cifra viol"><div class="n">500</div><div class="q">episodios gratis sumando el catálogo entero</div></div>
 </div>
 <p class="sube baja" style="margin-top:20px;font-size:15px">Casi cuatro meses de consumo sin pagar un peso. Ese número reaparece: es el que cambia el diagnóstico.</p>`,

// 5 · el giro · los datos del brief leídos contra el censo
`<div class="sube paso">El giro · los datos leídos contra el censo</div>
 <h2 class="sube">Las mismas cifras, <em>otra lectura</em></h2>
 <p class="sube" style="margin-top:-8px">Ninguna de estas señales cambia. Cambia contra qué se lee.</p>
 <table class="senales sube">
   <thead><tr><th>Señal</th><th>Lectura sin el censo</th><th>Lectura con el catálogo a la vista</th></tr></thead>
   <tbody>
     <tr><td class="sen">Stickiness (DAU/MAU)<span class="val">0,33 · 2,3 días/sem</span></td><td class="antes">Les falta hábito.</td><td class="luego"><b>Ninguna historia en particular los está esperando.</b> Su relación es con el catálogo, no con una serie.</td></tr>
     <tr><td class="sen">Sesión promedio<span class="val">22 min · 14 eps</span></td><td class="antes">Buen engagement: la gente usa mucho la app.</td><td class="luego">La serie típica regala <b>10</b>. Al menos una serie agotada por sesión — y el usuario choca con hambre para cuatro episodios más.</td></tr>
     <tr><td class="sen">Reclama la recompensa diaria<span class="val">19%</span></td><td class="antes">El diálogo de recompensa está mal resuelto.</td><td class="luego"><b>Todavía nadie necesita monedas.</b> Con 500 episodios gratis por delante, esa necesidad tarda meses en aparecer. No es un problema de pantalla.</td></tr>
     <tr><td class="sen">Llega al 3.er día de racha<span class="val">6%</span></td><td class="antes">La pantalla de la racha no convence.</td><td class="luego">Se le piden <b>7 días de 7</b> a quien entra 2,3 — y el premio <b>baja</b> después del día 3, justo donde hay que sostenerlo.</td></tr>
     <tr><td class="sen">Revé series terminadas<span class="val">23%</span></td><td class="antes">Aman el contenido.</td><td class="luego">Ya vieron lo que era gratis y <b>no tienen a dónde ir</b>. Las dos lecturas apuntan a lo mismo: falta apego, no sobra.</td></tr>
     <tr class="fuera"><td class="sen">Retención D30 con racha de 3+<span class="val">2,4x</span></td><td class="antes">La racha retiene: hay que llevar gente al día 3.</td><td class="luego"><b>Descartada como causa.</b> Quien sostiene tres días seguidos probablemente ya era el usuario fiel. Se resuelve con un grupo de control, no con una interpretación.</td></tr>
   </tbody>
 </table>
 <p class="sube baja" style="margin-top:14px;font-size:13.5px">Las tres restantes —82% sin perfil, 88% invitados, 54% de madrugada— no cambian de lectura: son restricciones, y entran más adelante cerrando puertas.</p>`,

// 6 · y aun así
`<div class="sube paso">Y aun así</div>
 <h2 class="sube">El metajuego está construido, y <em>casi nadie lo juega</em></h2>
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

// 7 · hallazgo 1, con la sesión dentro
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

// 8 · hallazgo 2
`<div class="sube paso">Hallazgo 2</div>
 <h2 class="sube">Pagar no es la única salida: <em>empezar otra serie es gratis</em></h2>
 <p class="sube">Con <b>500 episodios gratis</b> repartidos por el catálogo —casi cuatro meses de consumo—, el muro no expulsa de la app. Expulsa de la historia: la alternativa a pagar no es irse, es empezar otra cosa. Y ahí se pierde el vínculo que hacía volver.</p>
 <p class="sube">El <b>23%</b> que revé series terminadas apunta a lo mismo. La lectura optimista sería amor al contenido; la que encaja con el resto es que ya vieron lo gratis y no tienen a dónde ir.</p>
 <div class="cifras sube">
   <div class="cifra viol"><div class="n">500</div><div class="q">episodios gratis en el catálogo</div></div>
   <div class="cifra"><div class="n">9</div><div class="q">series enteramente gratis, sin muro</div></div>
   <div class="cifra oro"><div class="n">23%</div><div class="q">revé series que ya terminó</div></div>
 </div>`,

// 9 · las cinco fallas
`<div class="sube paso">El diagnóstico, condensado</div>
 <h2 class="sube">Cinco fallas, y <em>ninguna es de visibilidad</em></h2>
 <div class="lista sube">
   <div class="item"><span class="k">F1</span><span class="v">El muro enseña la economía entera y <b>la ordena al revés</b>: abre por lo más caro y deja la salida gratuita en la tarjeta más apagada, rotulada <code>0/10</code> — anuncios vistos, la unidad que menos le dice al usuario.</span></div>
   <div class="item"><span class="k">F2</span><span class="v">La traducción a episodios está en los paquetes y <b>falta justo donde se decide</b>: el saldo, el tope del anuncio y lo que sale terminar la serie.</span></div>
   <div class="item"><span class="k">F3</span><span class="v">La escalera de precios no sube. El escalón barato es <b>2,6 veces mejor</b> que los dos grandes y lleva el badge más agresivo: pasar de 375 a 725 monedas cuesta casi el doble y mejora el episodio un 1,7%.</span></div>
   <div class="item"><span class="k">F4</span><span class="v">La racha pide <b>7 días de 7 a una base que entra 2,3</b>, su premio baja después del día 3 y corta a medianoche en un producto que se usa de madrugada.</span></div>
   <div class="item"><span class="k">F5</span><span class="v">El usuario <b>no ve su avance</b> dentro de una serie ni su posición en el sistema. Y como el 82% nunca abre el perfil, no hay otro sitio donde verlo.</span></div>
 </div>
 <p class="sube baja" style="margin-top:18px;font-size:15px">Ninguna se arregla mostrando más. Todas son de orden, de unidad o de momento.</p>`,

// 10 · la tesis
`<div class="sube paso">La tesis</div>
 <h2 class="sube">A esta economía no le falta legibilidad.<br><em>Le falta escasez.</em></h2>
 <p class="sube">El anuncio recompensado del muro da <b>15 monedas</b> y admite <b>diez al día</b>: 70 episodios gratis por semana, contra los 32 que consume el usuario promedio. Sumado a los 500 del catálogo, la moneda no significa gran cosa.</p>
 <p class="sube">Y ninguna de las salidas del muro <b>tiene fecha</b>: el anuncio se agota hoy, la suscripción abre todo, el paquete se compra una vez. Nada obliga a volver mañana.</p>
 <div class="cifras sube">
   <div class="cifra oro"><div class="n">70</div><div class="q">episodios gratis por semana solo con anuncios</div></div>
   <div class="cifra"><div class="n">32</div><div class="q">episodios que consume el usuario promedio</div></div>
   <div class="cifra mag"><div class="n">217%</div><div class="q">de su consumo ya está cubierto sin pagar</div></div>
 </div>`,

// 11 · por dónde no se puede ir
`<div class="sube paso">Por dónde no puede ir el diseño</div>
 <h2 class="sube">Tres cifras que <em>cierran puertas</em></h2>
 <p class="sube">Antes de proponer, conviene descartar. Estas tres eliminan las tres respuestas más obvias.</p>
 <div class="lista sube">
   <div class="item"><span class="k">82%</span><span class="v">nunca abrió el perfil. <b>Descarta rediseñarlo</b>: lo que vive en una pestaña aparte, para este usuario, no existe.</span></div>
   <div class="item"><span class="k">88%</span><span class="v">consume como invitado. <b>Descarta rankings y comparación social</b>: sin identidad no hay a quién comparar — y a la 1 a.m., viendo en vertical, tampoco se quiere.</span></div>
   <div class="item"><span class="k">2,3</span><span class="v">días activos por semana. <b>Descarta cualquier racha de 7 de 7</b>: pedir una frecuencia que el usuario no tiene convierte la mecánica en una deuda.</span></div>
 </div>`,

// 12 · el criterio de priorización
`<div class="sube paso">Estrategia · cómo se prioriza</div>
 <h2 class="sube">Una pregunta <em>elimina</em>; las otras dos ordenan</h2>
 <p class="sube"><b>① ¿Ocurre donde el usuario ya está, cuando le hace falta, y se entiende ahí?</b> Una intervención que no la pasa se va al final de la lista por buena que sea en todo lo demás. Hay tres formas de fallarla, y las tres están medidas en el producto:</p>
 <div class="lista sube">
   <div class="item"><span class="k">falla A</span><span class="v">Pedirle al usuario que <b>navegue</b>. El 82% nunca abre el perfil.</span></div>
   <div class="item"><span class="k">falla B</span><span class="v">Llegar <b>antes de que exista la necesidad</b>. El 81% cierra un regalo gratis que tiene delante al abrir la app.</span></div>
   <div class="item"><span class="k">falla C</span><span class="v">Estar en el momento correcto y <b>no decir lo que vale</b>. El anuncio del muro rinde diez episodios al día y lo escribe como un <code>0/10</code> gris.</span></div>
 </div>
 <p class="sube" style="margin-top:20px"><b>② Alcance × efecto ÷ costo</b> ordena las que sobreviven. <b>③ ¿Se lee en cuatro semanas?</b> desempata: un trimestre necesita dos ciclos de aprendizaje, no uno.</p>
 <p class="sube baja" style="font-size:15px">La falla C reordena el portafolio: vuelve la intervención más barata de todas —poner el anuncio arriba y traducir su contador— también en la de mayor alcance, porque no hay nada que construir.</p>`,

// 13 · el portafolio y su secuencia
`<div class="sube paso">Estrategia · ocho intervenciones, tres etapas, un trimestre</div>
 <h2 class="sube">Las etapas no van por costo:<br>van <em>por dependencia</em></h2>
 <div class="lista sube">
   <div class="item"><span class="k">1 · sem 1–4</span><span class="v"><b>Reordenar y traducir lo que ya existe.</b> I1 la moneda habla en episodios · I2 el muro pone arriba la salida gratuita · I3 la escalera de precios vuelve a subir · I4 continuidad web → app</span></div>
   <div class="item destaca"><span class="k">2 · sem 4–9</span><span class="v"><b>Cambiar la unidad del regreso.</b> I5 el Pase de la Noche + la Racha de Noches · I6 progreso de serie visible — <b>es la que se lleva a diseño y a POC</b></span></div>
   <div class="item"><span class="k">3 · sem 9–13</span><span class="v"><b>Convertir el hábito en cuenta y en catálogo.</b> I7 la cuenta se pide cuando hay algo que perder · I8 el pase como puente entre series</span></div>
 </div>
 <p class="sube" style="margin-top:20px">La Etapa 2 no puede abrir el trimestre: sin la Etapa 1, su línea base se mide contra un usuario que <b>no sabe que los anuncios le dan diez episodios más cada día</b>. Y la Etapa 3 tampoco: pedir una cuenta antes de que exista una racha es pedirla sin argumento.</p>
 <p class="sube baja" style="font-size:15px">La Etapa 1 no agrega mecánicas ni mueve piezas de sitio: cambia el orden y la unidad en que se expresan. La única mecánica nueva de todo el portafolio es I5.</p>`,

// 14 · por qué esta intervención y no otra
`<div class="sube paso">La elección, y su justificación</div>
 <h2 class="sube">De las ocho, <em>solo una</em> puede mover el regreso</h2>
 <div class="lista sube">
   <div class="item"><span class="k">1</span><span class="v"><b>Ataca el punto exacto donde la historia se corta.</b> 10 episodios gratis en 37 de las 41 series con muro, y después 15 monedas por episodio sin una sola excepción de precio en todo el catálogo.</span></div>
   <div class="item"><span class="k">2</span><span class="v"><b>Es la única que mueve DAU/MAU por sí sola.</b> Stickiness es una métrica de regreso, y el muro es el único momento del producto donde una promesa a futuro tiene valor real. Traducir la moneda o mostrar el progreso hacen mejor producto — no crean regreso.</span></div>
   <div class="item"><span class="k">3</span><span class="v"><b>Compite contra lo que el usuario hace de verdad</b>, que no es pagar: es empezar otra serie gratis. El pase lo devuelve al episodio 13 de la historia que eligió, no al 1 de una que todavía no le importa.</span></div>
   <div class="item"><span class="k">4</span><span class="v"><b>Funciona para el 88% que es invitado</b>, desde el día uno: sin cuenta, sin onboarding y sin perfil. El estado vive en el dispositivo y la cuenta se ofrece solo cuando ya hay algo que perder.</span></div>
 </div>
 <div class="cierre sube"><b>La alternativa más seria que quedó fuera:</b> rediseñar el diálogo de la recompensa diaria como intervención independiente. Cuesta la mitad y probablemente sube ese 19%. Pero deja intacto el mecanismo — la razón para volver seguiría siendo una moneda abstracta y un calendario, no la historia.</div>`,

// 15 · la intervención
`<div class="sube paso">La intervención · I5</div>
 <h2 class="sube">El muro deja de ser una pantalla<br>y pasa a ser <em>una hora del día</em></h2>
 <div class="par sube">
   <div>
     <p>Se emite <b>un pase por noche</b>, por reloj, esté el usuario o no. Se entrega al terminar un episodio —sin botón que pulsar— y se acumula hasta dos.</p>
     <p>El usuario <b>elige a qué serie</b> se lo da. Y la cita se ancla a su hora de siempre, no a «+24 h desde que lo usaste».</p>
     <p class="baja" style="font-size:15px">Ese momento de elegir no es pedagógico: es cuando el usuario declara cuál historia le importa, que es exactamente el apego que hoy no existe.</p>
   </div>
   <img src="../flujos/flows/f2-la-cita/01-muro-pase-gastado.png" alt="El muro convertido en una cita: hoy a las 21:30">
 </div>`,

// 16 · la objeción
`<div class="sube paso">La objeción más dura</div>
 <h2 class="sube">¿Y por qué no lo resuelve <em>el anuncio</em>?</h2>
 <p class="sube">Como fuente de monedas, el Pase es el <b>10%</b> de lo que ya existe. Defenderlo por volumen sería defenderlo por lo que no es.</p>
 <div class="cifras sube">
   <div class="cifra oro"><div class="n">70</div><div class="q">episodios por semana da el anuncio</div></div>
   <div class="cifra cian"><div class="n">7</div><div class="q">da el Pase de la Noche</div></div>
 </div>
 <p class="sube" style="margin-top:24px">Lo que el anuncio <b>no</b> da: una razón para volver un día concreto —se puede agotar hoy entero— y un desbloqueo sin cortar la historia. Treinta segundos de publicidad a mitad de un cliffhanger es justo lo que la suscripción vende evitar.</p>
 <div class="cita sube"><p>El Pase no compite por dar más episodios. Compite por dar el de mañana.</p></div>`,

// 17 · las reglas, con los datos que las obligan
`<div class="sube paso">Las reglas, y el dato que obliga a cada una</div>
 <h2 class="sube">Cinco decisiones, <em>ninguna arbitraria</em></h2>
 <div class="lista sube">
   <div class="item"><span class="k">R1</span><span class="v">Se emite por reloj y se entrega al ver: <b>no hay nada que reclamar</b>. Es la respuesta al 19% — quitar el botón lleva la adopción a ~100% por construcción.</span></div>
   <div class="item"><span class="k">R1b</span><span class="v">Se acumula hasta dos y ahí se detiene. Con <b>2,3 días por semana</b>, faltar una noche no puede costar nada.</span></div>
   <div class="item"><span class="k">R2</span><span class="v">El usuario elige a qué serie. Un recurso que se asigna se entiende; uno que se recibe, no.</span></div>
   <div class="item"><span class="k">R3</span><span class="v">La noche corre de 5 a.m. a 5 a.m. Con el <b>54% de las sesiones entre 11 p.m. y 2 a.m.</b>, un corte a medianoche partiría en dos la misma noche del usuario.</span></div>
   <div class="item"><span class="k">R4</span><span class="v">Un comodín que se consume solo. Si hay que hacer algo para no perder la racha, la racha ya es una tarea.</span></div>
 </div>`,

// 18 · el orden del muro
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

// 19 · cómo se sabe si funcionó
`<div class="sube paso">Cómo se sabe si funcionó</div>
 <h2 class="sube">Tres señales, y <em>un criterio de reversión</em></h2>
 <div class="lista sube">
   <div class="item"><span class="k">semana 1</span><span class="v"><i>Leading.</i> Qué fracción de los muros termina en <b>pase usado</b> en vez de en cierre. Contesta si pasó algo.</span></div>
   <div class="item"><span class="k">semana 2</span><span class="v"><i>Leading.</i> Qué fracción <b>vuelve dentro de las 36 horas</b> de haber usado el pase. Es el regreso, medido directo.</span></div>
   <div class="item"><span class="k">semana 4</span><span class="v"><i>Lagging.</i> <b>DAU/MAU</b> del grupo que recibe el cambio contra un grupo de control que no lo recibe. Contesta si valió la pena.</span></div>
   <div class="item destaca"><span class="k">kill</span><span class="v"><i>Guardrail.</i> ARPDAU leído como ingreso por usuario activo, no como mix de productos. <b>Si cae más de 8% relativo dos semanas seguidas, se revierte.</b></span></div>
 </div>
 <div class="cifras sube">
   <div class="cifra mag"><div class="n" style="font-size:clamp(24px,2.8vw,38px)">6% → 20%</div><div class="q">objetivo declarado de racha de 3+ noches</div></div>
   <div class="cifra oro"><div class="n" style="font-size:clamp(24px,2.8vw,38px)">19% → ~100%</div><div class="q">adopción de la fuente gratuita, por construcción: ya no hay botón que pulsar</div></div>
 </div>
 <p class="sube baja" style="margin-top:16px;font-size:14.5px">El criterio de reversión se decide antes de medir: no es una alarma para mirar, es una regla. Y ese ~100% deja de ser meta y pasa a ser guardrail — si no llega ahí, la acreditación está rota.</p>`,

// 20 · el POC
`<div class="sube paso">POC · y cómo se sabe que funciona</div>
 <h2 class="sube">Un prototipo que <em>se usa</em>, no que se mira</h2>
 <p class="sube">Interactivo, con el catálogo real de 50 series, en dos implementaciones: una de producto y otra sobre el stack verdadero de Idilio —Next.js, Tailwind, Supabase— con el estado económico resuelto en servidor, que es el riesgo técnico número uno.</p>
 <div class="cifras sube">
   <div class="cifra cian"><div class="n">40</div><div class="q">pasos del recorrido, en integración continua</div></div>
   <div class="cifra"><div class="n">27</div><div class="q">pantallas documentadas en 9 flujos</div></div>
   <div class="cifra oro"><div class="n">0</div><div class="q">violaciones WCAG en los 11 estados</div></div>
   <div class="cifra viol"><div class="n">67</div><div class="q">fuentes citadas, todas verificadas</div></div>
 </div>
 <p class="sube" style="margin-top:22px">Cada cifra publicada se comprueba contra el código antes de desplegar. Si un documento dice un número que el modelo no respalda, el despliegue falla.</p>`,

// 21 · lo descartado y adónde ir
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
