# 5 · Registro de decisiones y análisis crítico

> Cada decisión con su razón, su alternativa descartada y —lo más importante— **cómo sabríamos que fue un error**. Al final, las cuatro cosas de este trabajo que más probablemente estén mal.

---

## 5.1 Decisiones de estrategia

### D1 · La intervención profunda es el muro, no una pantalla de racha

**Alternativas consideradas:** (a) pantalla/sección de racha propia, (b) HUD de racha en el reproductor, (c) progresión por serie, (d) onboarding de economía.

**Por qué el muro.** Es la intersección de las cuatro señales del diagnóstico:
- **Alcance 100%** — la sesión promedio es de 14 episodios y hay 10 gratis por serie; el muro no es un evento raro, es parte del loop.
- **82% nunca abre perfil** — cualquier opción que necesite pantalla propia tiene techo del 18%.
- **2,4× en D30 a los 3 días** — la mecánica correcta ya existe; hay que exponerla, no inventarla.
- **Momento de máximo deseo** — es la única "clase de economía" a la que el usuario asiste voluntariamente.

**Lo que se descartó y por qué.** (a) hereda el techo del 18%. (b) es correcta pero enseña menos: un chip no explica una economía, y va incluida como intervención secundaria (I1b). (c) es vistosa pero su evidencia es más débil y depende de metadata de catálogo en cientos de series. (d) es un tutorial, y los tutoriales no se leen.

**Cómo sabríamos que fue un error:** si el A/B del muro sube la comprensión pero **baja la conversión a primer pago**. Ahí la intervención habría cumplido el objetivo de experiencia destruyendo el de negocio.

---

### D2 · Se elimina el "reclamar"

La racha se acredita al **terminar un episodio**. No hay botón.

**Razón.** El 19% de adopción no es un problema de motivación sino de **un paso de más en un lugar que nadie visita**. La aritmética del §1.2 lo muestra: si reclamar fuera independiente día a día con p≈0,19, el 3.º día consecutivo daría 0,69%; se observa 6%, casi 9× más. Quien la encuentra, la sostiene. **El embudo se rompe antes del día 1.**

Al mover la acreditación a *terminar un episodio*, la adopción de la fuente pasa a ~100% **por construcción**: es la misma acción que el usuario ya hacía.

**Contraargumento honesto.** ¿Se devalúa una recompensa que no cuesta obtener? Sí, es el riesgo real. Mitigado por dos cosas: el requisito es *terminar*, no *abrir* (acción con costo de atención y correlacionada con valor); y la recompensa **escala con la racha**, así que la escasez se muda del acto de reclamar a la constancia — que es lo que de verdad queremos premiar.

**Cómo sabríamos que fue un error:** si el % que **vuelve la noche siguiente** no se mueve. Ojo con la trampa de medición: *"% que reclama la recompensa diaria"* saltará de 19% a ~100% **por construcción**, porque recibirla y ver un episodio pasan a ser el mismo evento. **Ese salto no prueba nada** — hay que retirar esa métrica junto con el botón que la generaba.

---

### D3 · Se cuentan noches, no días · la noche cierra a las 4:00 am

**Razón.** 54% de las sesiones ocurren entre 11pm y 2am. Un corte a medianoche parte esa ventana por la mitad y rompe rachas **por contabilidad, no por abandono**: quien entra a las 00:10 cree haber entrado "esta noche".

Mover el corte a las 4:00 am es la corrección técnica. **Llamarlo "noche" es la corrección de diseño**: con ese nombre, que la noche termine a las 4am no hay que explicarlo. Y de paso alinea la mecánica con la identidad real del producto.

> Esta es la decisión con **mejor relación impacto/costo** de todo el trabajo: no requiere una sola pantalla nueva.

**Cómo sabríamos que fue un error:** si tras el cambio el *% de rachas rotas cuya última sesión terminó entre 23:00 y 01:00* **no baja**. Entonces la hipótesis contable era ruido y el problema es puramente motivacional.

---

### D4 · Lo que se gana no es moneda: son capítulos que caducan

**Razón (principio P3).** Una moneda regalada es fungible con una comprada: el usuario aprende a **esperar en vez de pagar** y cada moneda regalada desplaza ingreso 1:1. Un capítulo que caduca esta noche **no se puede guardar**, así que solo tiene un uso posible: hoy.

**El argumento que invierte la objeción.** La objeción estándar es "regalar acceso canibaliza". Aquí es al revés:

> Un usuario que **no vuelve** choca con **cero** muros. Uno que vuelve **cinco noches** choca con **cinco**.

Los microdramas terminan en cliffhanger por construcción. Cada capítulo gratis te mete más adentro de una serie que ya te enganchó y **te deja otra vez frente al muro, con más deseo**. La fuente ganada no reduce las ocasiones de compra: **las fabrica**.

**Los números que lo sostienen.** Apetito observado: **14 eps/sesión**. Techo del regalo: **5**, y solo desde la noche 7. Queda de pago el **64% del apetito**. *La fuente cubre la entrada, nunca la comida.* (Verificado con un test automatizado en `poc/src/economy.test.ts`.)

**Esto es una hipótesis, no un teorema.** Por eso el A/B compara *pase caducable* vs *monedas equivalentes* midiendo **sesiones/semana y conversión a pagador en las dos ramas**. Si las monedas ganan en ambas, el argumento estaba mal y hay que rehacer la economía.

---

### D4b · Hay una tercera ubicación posible, y no la había considerado

Planteé dos opciones: **perfil** (lo que hace Idilio, y falla) y **muro** (mi propuesta).
ReelShort usa una tercera: **prompt al abrir la app**, y es la más barata de construir.

Sigo prefiriendo el muro —el prompt cobra un peaje de interrupción en *todas* las sesiones y
entrega la economía antes de que exista deseo, mientras que el muro la entrega en el pico— pero
**es un trade-off, no una obviedad**: el prompt está probado en la categoría, es más simple y no
toca el reproductor. Si el equipo necesitara la versión más barata posible de la Ola 1, es una
alternativa legítima. **Lo que no es defendible es dejarlo en el perfil.**

---

### D5 · El escudo se gana, nunca se compra

**Razón.** El modo de fallo documentado de las rachas es el *abstinence violation effect*: al romperse, el usuario no reintenta, abandona. El contador rígido convierte la aversión a la pérdida —que era el motor— en la razón para irse.

**Y por qué no se vende.** Si el escudo se compra, la racha deja de significar constancia y pasa a significar poder adquisitivo. En ese momento el número deja de tener sentido **para todo el mundo, incluido quien lo compró**. Es una decisión de integridad de la mecánica que **renuncia explícitamente a un ingreso disponible**, y conviene decirlo así en vez de disimularlo.

**Lo que el benchmark obliga a admitir:** no encontré **ningún** competidor con escudo de racha —
ReelShort reinicia a cero al fallar un día. Eso lo vuelve un diferenciador, pero también significa
que **la categoría no lo considera necesario**. Mi razón es el *abstinence violation effect*, no una
práctica del sector. Es una hipótesis mía: si el A/B no muestra supervivencia de rachas tras el
primer fallo, se corta.

---

### D6 · La cuenta se pide en la noche 3, con encuadre de pérdida

**Razón (principio P4).** 88% consume como invitado. Pedir cuenta para *empezar* una racha es cobrar por adelantado un valor que el usuario aún no percibe. Pedir cuenta para *no perder* una racha de 3 noches es ofrecer un seguro sobre algo que ya duele perder. Y la noche 3 es, además, donde se entregó el premio más grande — se pide justo después de dar.

**Guardarraíl explícito:** si tras el prompt caen los **episodios por sesión**, el momento estaba mal elegido y se retrasa a la noche 5. **La conversión a cuenta no puede comprarse con consumo.**

---

## 5.2 Decisiones de interfaz

| # | Decisión | Razón |
|---|---|---|
| **D7** | El muro es un **bottom sheet sobre el frame congelado y difuminado**, no una pantalla nueva | El deseo tiene que seguir visible mientras se lee el precio. Sacar al usuario a una tienda rompe la tensión que hace que quiera pagar. |
| **D8** | El **orden vertical es el argumento**: deseo → posición → acción gratuita → promesa → precio → cita | El precio va después de que el usuario ya sabe que hay vía sin pagar. Quien compra ahí compra por impaciencia, no por bloqueo. **Verificado: los 6 bloques caben sin scroll en 430×932.** |
| **D9** | La confirmación de racha es un **toast, no un modal** | Interrumpir el video para anunciar un premio le cobra al usuario el premio que le acabamos de dar. |
| **D10** | La racha se dibuja como **lunas**, no como fuego | El fuego es el cliché del género y además compite cromáticamente con el ámbar de las monedas. Las lunas son ownables y refuerzan el corte a las 4am. |
| **D11** | **Dos familias cromáticas, dos monedas.** Ganada = violeta→magenta (marca). Comprada = ámbar | Comunica el principio de doble moneda **sin una sola línea de copy**. |
| **D12** | Los paquetes de la tienda se rotulan en **capítulos**, no en monedas | Nadie sabe cuánto vale una moneda; todo el mundo sabe cuánto vale un capítulo. Misma tesis de legibilidad, aplicada a la tienda. |
| **D13** | La migaja de economía en el reproductor tiene **techo estricto**: 2 chips, sin fondo sólido | El reproductor es la superficie sagrada. Se mide contra *episodios por sesión*: si bajan, se revierte. |
| **D14** | El escudo se consume **sin preguntar** y se avisa **después** | Cada pregunta que le hacemos al usuario sobre su racha es una oportunidad de que piense en abandonarla. |
| **D15** | El gradiente del CTA **se corta antes del magenta de marca** (`#9b2fe0`) | Blanco sobre `#d25af0` da 3,25:1 y no pasa AA. Sobre `#9b2fe0` da 5,42:1. **La marca cede ante la legibilidad.** |

### Dos correcciones que salieron de usar el prototipo, no de pensarlo

1. **CTA muerto en el estado B.** La primera versión mostraba `Desbloquear por 15` **deshabilitado** cuando el usuario tenía 0 monedas. Un CTA deshabilitado enseña un precio y no ofrece camino. Corregido: el primario pasa a `Conseguir monedas`, que sí lleva a algún lado. *Este es exactamente el error que la app real comete hoy en web, a mayor escala: dos CTAs, ambas de pago o de salida.*

2. **Cerrar la hoja de cuenta dejaba al usuario dentro de un episodio bloqueado.** Corregido: si el episodio sigue bloqueado, se vuelve al muro.

3. **En iPhone SE, el estado de racha rota empujaba la cita de regreso por debajo del pliegue.**
   Esto no se ve mirando: se ve **midiendo**. Al instrumentar el `scrollHeight` de la hoja en los
   ocho estados a 375×667, el estado F daba **679 px** contra 613 disponibles — y lo que quedaba
   cortado era justamente **el bloque cuya única función es asegurar que el usuario vuelva**, en el
   único estado donde el usuario acaba de perder su racha. El peor recorte posible, en el peor
   momento posible.

   *Corrección:* el aviso pasó de ser una tarjeta propia a **ocupar el sitio de la línea de
   diálogo**. Dos mensajes seguidos competían de todos modos, y ahora los ocho estados miden entre
   **565 y 585 px** —un rango de 20 px— y ninguno scrollea, ni en 430×932 ni en iPhone SE.
   La consistencia de altura entre estados es parte del craft, no un detalle técnico.

   *Y una lección de método:* diseñé y revisé todo el muro en 430×932. **El caso duro no estaba en
   la pantalla que yo miraba.** Si algo hay que llevarse de esto, es que las afirmaciones sobre
   densidad hay que medirlas en el dispositivo pequeño, no en el bonito.

---

## 5.3 Lo que probablemente esté mal en este trabajo

Siete puntos débiles, ordenados por probabilidad de estarlo:

**① El cálculo del 8,7× compara denominadores distintos.**
19% es una tasa diaria sobre DAU; 6% es acumulada sobre usuarios. La comparación es **direccional, no exacta**. La defensa: el sesgo juega a favor de la conclusión (si el 6% se mide sobre una base más amplia que DAU, el exceso sobre la independencia es aún mayor). Pero si los denominadores fueran muy distintos de lo que asumo, el argumento se debilita. **Es el primer número que pediría verificar con datos reales.**

**② El objetivo de DAU/MAU 0,38 puede estar fuera del alcance de esta intervención sola.**
Al construir el modelo de sensibilidad ([`docs/modelo/`](modelo/README.md)) descubrí que mi
propia tabla de objetivos era **internamente inconsistente**: ponía 15% de día-3 y DAU/MAU
0,38–0,40 juntos sin haber hecho la cuenta. En el escenario central el 15% da **0,369**. Y hay
algo peor: **aunque el 6% de hoy entrara los 30 días del mes, el agregado solo llegaría a 0,346.**
Corregido en §2.5. Lo dejo escrito porque el error es instructivo: *una tabla de objetivos que
no se verifica aritméticamente es una lista de deseos.*

**③ La tabla de recompensas (1→2→3→3→3→3→5) es una hipótesis sin calibrar.**
Está construida para poner el premio grande en la noche 3, que es donde el dato dice que está el 2,4×. Pero los valores absolutos salen de un benchmark externo (DramaBox/ReelShort entregan ~250 monedas/día ≈ 4–5 episodios), no de la economía de Idilio. **La curva hay que calibrarla con datos propios; lo defendible aquí es la forma, no los números.**

**④ El brief describe una economía más simple que la real, y eso me costó un agujero.** *(parcialmente resuelto)*
El brief dice 2 fuentes y 1 sumidero. El producto real ya tiene **video recompensado, "retos" y membresía mensual**. El benchmark ([§6](06-benchmark.md)) convirtió ese riesgo abstracto en un número: en la categoría, el caudal gratuito real **no** es el check-in (0,5 eps/día en ReelShort) sino los **anuncios** — 15–20 al día, ~250 monedas, ~4 episodios. Si el capítulo de la casa sustituye al video recompensado, **desaparece inventario publicitario que hoy se monetiza**, y eso no estaba en ninguno de mis guardarraíles.

*Resuelto a medias:* añadí el principio de las **tres divisas** (tiempo → capítulo de la casa; atención → anuncio; dinero → compra) y un guardarraíl de impresiones de video recompensado. Sigue sin estar resuelto **cuánto** canibaliza, y por eso el A/B debe probar **3 vs 5 capítulos en la noche 7** en vez de dar 5 por sentado.

**⑤ Mi tabla de recompensas es ~10× más generosa que el check-in de la categoría.**
ReelShort da 30 monedas en el día 7 = **0,5 episodios**. Yo doy **5 episodios** en la noche 7.
No lo había dimensionado hasta hacer el benchmark. Mi defensa es que el check-in de ReelShort no
está diseñado para dar valor sino para enganchar, y que contra el caudal real de la categoría
(~4 eps/día vía anuncios) mis 5 no son excesivos. **Pero la defensa depende de que el número
correcto esté entre 3 y 5, y eso hay que probarlo, no argumentarlo.**

**⑥ El tramo del usuario que ya paga no está diseñado.**
Salió al preparar las preguntas de la sesión de cierre ([§7.2 ⑤](07-sesion-de-cierre.md)), no al
diseñar. Para un suscriptor **el muro no aparece nunca**, así que toda la mecánica le pasa por
encima — y es justo el usuario de mayor valor. La racha se le sigue acreditando, porque se acredita
por ver y no por chocar con el muro, y el toast del reproductor funciona igual; pero **la recompensa
pierde el sentido: no puedes regalarle acceso a quien ya lo compró todo.**
Mi intuición es que ahí la racha debería premiar algo que no sea acceso (estrenos antes que nadie,
estatus), pero **es una intuición, no una propuesta**, y prefiero declararlo como hueco antes que
inventar una pantalla para taparlo.

**⑦ La cita de regreso depende del permiso de notificaciones.**
"Mañana a las 8:00 pm · Avísame" es el mecanismo de retorno más directo del diseño y **descansa sobre un recurso escaso**: en iOS el permiso de notificaciones probablemente ya está gastado en avisos de estreno. Si el equipo no está dispuesto a reasignarlo, ese bloque pierde la mitad de su fuerza y queda solo como promesa visual. **Hay que decidir a qué se renuncia, y no lo puedo decidir yo desde fuera.**

---

## 5.4 Lo que no hice, y lo digo

- **No hice research con usuarios.** Lo que hay es uso propio del producto, lectura de los datos del brief y reseñas públicas verificables. No voy a presentar hallazgos como si hubiera investigado.
- **No probé la app nativa**, donde vive la economía de monedas. Probé la web, que es una superficie de captación con paywall de suscripción. El conocimiento de la economía nativa viene de reseñas públicas citadas, no de uso directo. **Es la principal limitación del diagnóstico** y por eso el precio (15 monedas/episodio) se trata como dato de segunda mano.
- **No construí un design system.** El brief no lo pedía. Lo que hay son los tokens reales del producto, extraídos de producción y usados con consistencia.
- **No diseñé el resto de la app.** El POC cubre una funcionalidad con sus estados, que es lo que el brief acota.
