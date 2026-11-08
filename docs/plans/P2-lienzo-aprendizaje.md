# P2 — Plan de aprendizaje: lienzo de acuarela interactivo

**Objetivo:** construir yo misma el lienzo interactivo de `docs/references/lienzo_personal_interactive_watercolor_portfolio.html` dentro de `MiWebPersonal.Web`, entendiendo cada línea.

**Alcance:** solo capa Web (`_Layout.cshtml`, `wwwroot/js`, `wwwroot/css`). No toca `Core` ni `Infrastructure`.

## Reglas del juego

- **No avanzo hasta superar el "Cómo sé que funciona" y marcar su checklist.**
- **Escribo el código a mano**, sin copiar y pegar de la referencia. Puedo leerla, pero cierro el fichero antes de teclear.
- **F12 abierto siempre** (pestaña Consola). Los errores son mis guías.
- **Escalera de ayuda** cuando me atasque:
  1. Releo la pista del paso y busco el concepto en MDN.
  2. Hago `console.log` de las variables.
  3. Pido a Claude una pista, no la solución.
  4. Pego mi código a Claude y le pido que me diga *dónde* está el fallo, sin arreglarlo.
  5. Solo como último recurso, miro la referencia.

## Cierre común (se repite en TODOS los pasos)

Cada paso tiene su checklist específica. Además, antes de darlo por terminado compruebo siempre esto:

- [ ] La consola (F12) no muestra errores míos. (Los de `browserLink` de Visual Studio los ignoro.)
- [ ] Recargo con `Ctrl+Shift+R` y sigue funcionando (descarta que sea caché).
- [ ] Las otras vistas (Privacy, Descargar CV...) siguen cargando bien.
- [ ] Sé explicar con mis propias palabras cada línea que he escrito.
- [ ] No quedan `console.log` de depuración, código comentado ni estilos en línea que no deban estar.
- [ ] Commit con mensaje claro (`lienzo: paso N - lo que hice`).
- [ ] Marco el paso en la tabla de progreso y anoto lo que aprendí.

---

## FASE A — Cimientos (el lienzo existe)

### Paso 1 · Un canvas vacío detrás de la página
- **Objetivo:** que haya un `<canvas>` a pantalla completa, fijo, detrás del contenido.
- **Conceptos:** elemento `<canvas>`, `position: fixed`, `inset`, `z-index`, variables CSS.
- **Qué hago:** añadir el canvas en la vista y envolver el contenido en un `div` con su propio `z-index`. Crear `wwwroot/css/lienzo.css` y enlazarlo. Crear `wwwroot/js/lienzo.js` y enlazarlo con `defer`.
- **Pista:** el canvas debe tener z-index menor que el contenido, y el contenido necesita `position: relative` para que el z-index le afecte.
- **Cómo sé que funciona:** en el inspector veo el canvas ocupando toda la ventana, y mi contenido sigue siendo clicable.

**✅ Checklist**
- [ ] `lienzo.css` está enlazado en el `<head>` de `_Layout.cshtml` con `asp-append-version="true"`.
- [ ] En el inspector, al seleccionar el canvas, el panel Styles muestra la regla `.capa-lienzo` con `lienzo.css:NN` a la derecha.
- [ ] El canvas mide lo mismo que la ventana (sin contar la barra de scroll), no 300 × 150.
- [ ] El canvas tiene `id` (para JavaScript) y `class` (para el estilo), y ningún `style` en línea.
- [ ] Las variables `--z-*` están dentro de `:root { }` en `site.css`, con su `:` y su `;`.
- [ ] Las capas usan `var(--z-...)`, no números sueltos.
- [ ] `inset: 0` está sin `top`/`left` repetidos.
- [ ] La textura cubre toda la pantalla y tiene `pointer-events: none`.
- [ ] He decidido si la textura va debajo del lienzo o encima con `mix-blend-mode`, y la pintura (cuando exista) no quedará tapada.
- [ ] El navbar se ve y sus enlaces navegan (la clase `.capa-navbar` está aplicada en `_Layout.cshtml`).
- [ ] Los botones y enlaces de la página se pueden pulsar.
- [ ] `.capa-contenido` tiene su regla en CSS y ya no queda `style="z-index: 2;"` en `Index.cshtml`.
- [ ] Cierre común hecho.

### Paso 2 · Pintar algo desde JavaScript
- **Objetivo:** obtener el contexto 2D y dibujar un rectángulo de prueba.
- **Conceptos:** `getContext('2d')`, `fillStyle`, `fillRect`.
- **Qué hago:** en `lienzo.js`, seleccionar el canvas con `getElementById` y pintar un rectángulo rojo.
- **Pista:** si no se ve nada, comprueba que el script se carga (`console.log('lienzo cargado')`).
- **Cómo sé que funciona:** veo el rectángulo. Si se ve **borroso o estirado**, es normal: lo arreglo en el paso siguiente.

**✅ Checklist**
- [ ] `lienzo.js` está en `wwwroot/js` y enlazado con `defer` en `_Layout.cshtml`.
- [ ] En la consola aparece mi `console.log('lienzo cargado')`.
- [ ] En la pestaña Network, `lienzo.js` sale con Status 200.
- [ ] El `id` que busco en JS es exactamente el del HTML (`canvas-lienzo`).
- [ ] Compruebo que `getElementById` no devuelve `null` antes de usar el canvas.
- [ ] Uso `const` para lo que no reasigno (y no `var`).
- [ ] Los nombres de variables son claros y coherentes (todos en español o todos en inglés).
- [ ] El rectángulo se ve. Si sale deformado, sé explicar por qué (tamaño CSS ≠ tamaño interno).
- [ ] Cierre común hecho.

### Paso 3 · Que el canvas tenga el tamaño correcto
- **Objetivo:** que el canvas coincida con la ventana y se vea nítido en pantallas retina.
- **Conceptos:** tamaño CSS vs. tamaño interno (`canvas.width`), `window.innerWidth/innerHeight`, `devicePixelRatio`, `ctx.setTransform` o `ctx.scale`.
- **Qué hago:** poner el tamaño interno del canvas a `tamaño de ventana × devicePixelRatio` y escalar el contexto.
- **Pista:** asignar `canvas.width` **reinicia** el contexto, incluido el escalado. Escala *después* de asignar.
- **Cómo sé que funciona:** el rectángulo del paso 2 queda con bordes nítidos y mide exactamente lo que le pido.

**✅ Checklist**
- [ ] En la consola, `canvas.width` es `innerWidth × devicePixelRatio` (y `canvas.height`, igual).
- [ ] Asigno el tamaño **antes** de escalar el contexto.
- [ ] Un rectángulo de 200 × 100 mide 200 × 100 píxeles CSS en pantalla.
- [ ] Los bordes salen nítidos, también con el zoom del navegador al 150 %.
- [ ] No he tocado el tamaño CSS del canvas: lo sigue controlando `lienzo.css`.
- [ ] El tamaño se calcula en una función con nombre (`ajustarTamano()`), no suelto.
- [ ] Sé explicar qué es `devicePixelRatio` y por qué una pantalla retina lo necesita.
- [ ] Cierre común hecho.

### Paso 4 · Dibujar donde hago clic
- **Objetivo:** un círculo en la posición del ratón o dedo.
- **Conceptos:** eventos, `pointerdown`, `event.clientX/clientY`, `beginPath`, `arc`, `fill`.
- **Qué hago:** borrar el rectángulo de prueba. Escuchar `pointerdown` en `document` y dibujar un círculo de 40 px.
- **Pista:** pregunta por qué `pointerdown` es mejor que `click` + `touchstart` (investiga qué pasa en un móvil con los dos).
- **Cómo sé que funciona:** cada clic o toque pone un círculo justo bajo el puntero. Pruébalo con el modo móvil de F12.

**✅ Checklist**
- [ ] Hay **un solo** listener, `pointerdown`, y no `click` + `touchstart`.
- [ ] El círculo queda centrado bajo el puntero en las cuatro esquinas de la ventana.
- [ ] En el modo dispositivo de F12, un toque pinta **un** círculo (no dos).
- [ ] Con la página con scroll, el círculo sigue saliendo bajo el puntero.
- [ ] El listener solo llama a una función `salpicar(x, y)` que dibuja; no lleva todo el dibujo dentro.
- [ ] El radio está en una constante con nombre, sin números mágicos repartidos.
- [ ] He decidido si el botón derecho o central debe pintar (`event.button`).
- [ ] Sé explicar la diferencia entre `clientX` y `pageX`.
- [ ] Cierre común hecho.

### Paso 5 · No pintar al pulsar enlaces o botones
- **Objetivo:** que la navegación y los controles no salpiquen.
- **Conceptos:** `event.target`, `element.closest(selector)`, `return` temprano.
- **Qué hago:** al inicio del manejador, salir si el objetivo está dentro de `a`, `button`, `input`, `select` o `[data-no-splash]`.
- **Cómo sé que funciona:** puedo pulsar el menú sin que aparezcan círculos, y en el resto de la página sí.

**✅ Checklist**
- [ ] Pulsar cada enlace del navbar navega y no pinta.
- [ ] Pulsar los botones de GitHub, LinkedIn y CV no pinta.
- [ ] Pulsar el **icono** (`<i>`) dentro de un botón tampoco pinta (esto prueba que uso `closest`, no solo `target`).
- [ ] Pulsar en el fondo o en el texto sí pinta.
- [ ] Uso un `return` temprano al inicio de la función, sin `if` anidados.
- [ ] El selector está en una constante con nombre.
- [ ] Con el teclado (`Tab` + `Enter`) los enlaces siguen funcionando.
- [ ] Sé explicar qué diferencia hay entre `target` y `closest`.
- [ ] Cierre común hecho.

---

## FASE B — La mancha de acuarela (el corazón)

### Paso 6 · Color aleatorio con paleta
- **Objetivo:** cada círculo con un color distinto de una paleta mía.
- **Conceptos:** arrays, `Math.random`, `Math.floor`, color `hsl()`/`hsla()` y por qué es cómodo para variar tonos.
- **Qué hago:** definir una paleta de 5-7 colores (idealmente de mi marca personal, ver `docs/analisis/marca-personal.md`) y elegir uno al azar. Crear una función pequeña `numeroAleatorio(min, max)` y usarla.
- **Cómo sé que funciona:** los círculos salen de colores variados y siempre dentro de la paleta.

**✅ Checklist**
- [ ] La paleta es una constante al principio del fichero, no está dentro de una función.
- [ ] `numeroAleatorio(min, max)` existe y la uso siempre, sin `Math.random()` suelto por el código.
- [ ] En la consola, llamar 20 veces a `numeroAleatorio(5, 10)` devuelve siempre valores dentro del rango.
- [ ] Tras 20 clics, todos los colores pertenecen a la paleta.
- [ ] La paleta sale de mi marca personal o de una razón que sé explicar.
- [ ] Sé explicar por qué `hsl` es más cómodo que `rgb` para variar un color.
- [ ] Cierre común hecho.

### Paso 7 · De círculo a forma irregular
- **Objetivo:** que la mancha parezca orgánica, no un círculo perfecto.
- **Conceptos:** coordenadas polares (`x = cx + cos(ángulo)·r`), bucle `for`, array de puntos, `lineTo`.
- **Qué hago:** escribir una función que devuelva 12-16 puntos alrededor del clic, cada uno con un radio ligeramente aleatorio. Unirlos con líneas rectas.
- **Pista:** el ángulo de cada punto es `(i / n) · 2π`.
- **Cómo sé que funciona:** veo un polígono irregular, con picos. Es feo, y es lo esperado.

**✅ Checklist**
- [ ] Una función (`crearPuntos(cx, cy, radio, n)`) **solo calcula** los puntos y los devuelve, no dibuja.
- [ ] Otra parte del código recorre los puntos y los dibuja (separación de responsabilidades).
- [ ] `console.log(puntos.length)` da el número de puntos que pedí.
- [ ] Los ángulos están repartidos de forma uniforme alrededor del círculo.
- [ ] El polígono está cerrado (`closePath`) y no le falta ningún lado.
- [ ] Cada clic genera una forma distinta.
- [ ] El número de puntos y la irregularidad son parámetros con nombre, no números mágicos.
- [ ] Cierre común hecho.

### Paso 8 · Suavizar los bordes
- **Objetivo:** convertir el polígono en una forma redondeada.
- **Conceptos:** `quadraticCurveTo(controlX, controlY, finalX, finalY)`, puntos medios entre vértices.
- **Qué hago:** en vez de `lineTo`, usar cada vértice como punto de control y el punto medio con el siguiente como destino.
- **Pista:** dibuja un papel con 5 puntos y marca los puntos medios para entender la idea antes de programarla. Recuerda cerrar la forma (el último punto enlaza con el primero).
- **Cómo sé que funciona:** la forma parece una gota o charco, sin picos.

**✅ Checklist**
- [ ] No se ve ningún pico y la forma parece un charco.
- [ ] No hay un "corte" entre el último y el primer punto.
- [ ] La lógica está en una función reutilizable (`trazarCurva(puntos)`).
- [ ] Puedo explicar con un dibujo en papel por qué usamos puntos medios.
- [ ] Probado con 5 puntos y con 30 puntos, y la forma sigue siendo válida.
- [ ] Cierre común hecho.

### Paso 9 · Transparencia y mezcla de pigmentos
- **Objetivo:** que las manchas se vean translúcidas y se mezclen al solaparse.
- **Conceptos:** alfa en `hsla`, `globalCompositeOperation = 'multiply'`, `ctx.save()` / `ctx.restore()`.
- **Qué hago:** bajar la opacidad a ~0.3 y activar `multiply` solo mientras dibujo la mancha, restaurando el estado después.
- **Cómo sé que funciona:** si pinto dos manchas solapadas, la zona común se ve más oscura, como acuarela real.

**✅ Checklist**
- [ ] Dos manchas solapadas dan una zona más oscura en la intersección.
- [ ] Uso `save()` antes de cambiar el modo de mezcla y `restore()` después.
- [ ] Tras dibujar una mancha, `ctx.globalCompositeOperation` vuelve a `'source-over'` (compruébalo con `console.log`).
- [ ] La opacidad está en una constante, no repetida en cinco sitios.
- [ ] La mancha se ve bien sobre la textura y sobre fondo claro.
- [ ] Sé explicar qué hace `multiply` y en qué se diferencia de simplemente bajar el alfa.
- [ ] Cierre común hecho.

### Paso 10 · Degradado y borde de pigmento
- **Objetivo:** centro más denso y borde más claro, con un fino anillo de pigmento.
- **Conceptos:** `createRadialGradient`, `addColorStop`, `stroke`, `lineWidth`.
- **Qué hago:** rellenar con un degradado radial en vez de color plano, y trazar el contorno con un color algo más oscuro y poco opaco.
- **Cómo sé que funciona:** la mancha ya "parece" acuarela cuando la miro a un palmo de la pantalla.

**✅ Checklist**
- [ ] Se distingue un centro más intenso y un borde más suave.
- [ ] Los `addColorStop` van entre 0 y 1 y en orden creciente.
- [ ] El radio exterior del degradado coincide con el tamaño de la mancha.
- [ ] El borde es más oscuro y fino, y no tiñe lo que dibuje después (estado restaurado).
- [ ] 30 clics seguidos no producen tirones.
- [ ] Sé explicar qué dos círculos define `createRadialGradient`.
- [ ] Cierre común hecho.

### Paso 11 · Capas
- **Objetivo:** dar profundidad dibujando 3 formas superpuestas, cada una algo más pequeña.
- **Conceptos:** bucle de capas, reutilizar tu función de forma irregular.
- **Cómo sé que funciona:** la mancha tiene zonas de distinta intensidad, no un solo tono.

**✅ Checklist**
- [ ] Las 3 capas se dibujan con un bucle `for`, sin copiar y pegar el mismo bloque tres veces.
- [ ] Cada capa tiene un radio menor que la anterior.
- [ ] La opacidad o la intensidad varía entre capas.
- [ ] Reutilizo las funciones de los pasos 7 y 8 en vez de duplicarlas.
- [ ] Comparando con una captura del paso 10, se nota más profundidad.
- [ ] El número de capas es un parámetro con nombre.
- [ ] Cierre común hecho.

### Paso 12 · Gotas y bruma
- **Objetivo:** salpicaduras alrededor de la mancha principal.
- **Conceptos:** posiciones aleatorias en un anillo (ángulo + distancia), tamaños variables, `ellipse` para gotas alargadas.
- **Qué hago:** primero 10 gotas circulares; luego un 40 % alargadas orientadas hacia fuera; por último puntitos mínimos (bruma).
- **Cómo sé que funciona:** el resultado ya se parece al de la referencia. Compáralos lado a lado y anota 3 diferencias para pulir.

**✅ Checklist**
- [ ] Las gotas salen en un anillo alrededor de la mancha, no encima.
- [ ] Alrededor del 40 % de las gotas son alargadas y apuntan hacia fuera.
- [ ] Hay una bruma de puntitos más lejos que las gotas.
- [ ] Cantidades, tamaños y distancias están en constantes de configuración, no esparcidos por el código.
- [ ] Hay una función separada (`dibujarGotas(...)`) que no mezcla su lógica con la de la mancha.
- [ ] Hacer clic cerca del borde de la pantalla no da errores.
- [ ] Tengo anotadas 3 diferencias frente a la referencia.
- [ ] Cierre común hecho.

---

## FASE C — Integrarlo en una web real

### Paso 13 · Que el contenido conviva con la pintura
- **Objetivo:** texto legible encima de manchas de cualquier color.
- **Conceptos:** `backdrop-filter: blur()`, fondos `rgba`, contraste de color.
- **Qué hago:** crear una clase `.glass-panel` y aplicarla a las tarjetas de `Index.cshtml`.
- **Cómo sé que funciona:** puedo leer todo el texto aunque pinte justo detrás. Compruébalo también con la paleta más oscura.

**✅ Checklist**
- [ ] El texto es legible con manchas de la paleta clara y de la oscura detrás.
- [ ] El contraste del texto cumple 4,5:1 (en el inspector, el selector de color de DevTools lo muestra).
- [ ] Las tarjetas de proyectos también son legibles, no solo el panel principal.
- [ ] Mantengo `-webkit-backdrop-filter` junto a `backdrop-filter` para Safari.
- [ ] Todo el estilo está en clases reutilizables, sin `style` en línea.
- [ ] Cierre común hecho.

### Paso 14 · No perder la pintura al redimensionar
- **Objetivo:** girar el móvil o cambiar el tamaño de ventana sin borrar la obra.
- **Conceptos:** evento `resize`, canvas auxiliar en memoria, `drawImage`.
- **Pista:** cambiar `canvas.width` borra el contenido. Antes de cambiarlo, copia el canvas a otro; después, devuélvelo.
- **Cómo sé que funciona:** pinto, redimensiono la ventana y la pintura sigue ahí.

**✅ Checklist**
- [ ] Pinto, achico la ventana, la agrando, y la pintura sigue ahí.
- [ ] En el modo dispositivo de F12, giro de vertical a horizontal y no se pierde.
- [ ] Cambiar el zoom del navegador tampoco la borra.
- [ ] `resize` no se dispara cientos de veces seguidas (considero un *debounce*).
- [ ] No creo un canvas auxiliar nuevo en cada evento sin necesidad.
- [ ] He decidido qué hacer al agrandar la ventana (zona vacía o pintura escalada) y sé justificarlo.
- [ ] Sé explicar por qué asignar `canvas.width` borra el contenido.
- [ ] Cierre común hecho.

### Paso 15 · Controles: limpiar, guardar y cambiar paleta
- **Objetivo:** tres botones funcionales.
- **Conceptos:** `clearRect` (¡cuidado con el escalado!), `canvas.toDataURL('image/png')`, enlace `<a download>` creado por código, un `<select>` que cambia la paleta activa.
- **Pista del guardado:** el canvas es transparente. Si descargas tal cual, no tiene fondo. Dibuja primero el color del papel en un canvas auxiliar.
- **Cómo sé que funciona:** limpiar deja la pantalla en blanco, guardar descarga un PNG con fondo crema, y cambiar la paleta afecta a las siguientes manchas.

**✅ Checklist**
- [ ] Limpiar borra **todo**, incluidas las esquinas, y también con zoom o pantalla retina.
- [ ] Guardar descarga un PNG que se abre bien y tiene fondo (no transparente).
- [ ] Cambiar la paleta afecta solo a las manchas nuevas.
- [ ] Pulsar los controles no pinta (paso 5 sigue funcionando).
- [ ] Los botones son `<button type="button">`, no `<div>` clicables.
- [ ] Los botones con solo icono tienen `aria-label`.
- [ ] Se pueden usar con teclado (`Tab` + `Enter`).
- [ ] Cierre común hecho.

### Paso 16 · La parte propia de MVC: conservar la obra entre páginas
- **Objetivo:** que al ir de Inicio a Proyectos la pintura no desaparezca.
- **Conceptos:** cada navegación recarga la página y vacía el canvas, `sessionStorage`, `toDataURL`, `new Image()` + `onload`, `try/catch` (el almacenamiento puede fallar).
- **Qué hago:** tras cada mancha, guardar una captura del canvas (con un pequeño retardo para no guardar en cada gota). Al cargar la página, restaurarla.
- **Reflexión:** ¿qué pasa si la captura es muy grande? ¿qué límite tiene `sessionStorage`? ¿cómo lo manejo?
- **Cómo sé que funciona:** pinto, navego a otra vista y la pintura sigue allí. Si cierro la pestaña, se borra.

**✅ Checklist**
- [ ] Pinto, voy a Privacy y vuelvo: la pintura sigue allí.
- [ ] Cierro la pestaña y abro otra: el lienzo está vacío.
- [ ] En F12 > Application > Session Storage veo mi clave y un tamaño razonable.
- [ ] Lectura y escritura van dentro de `try/catch`; he probado a provocar un fallo (por ejemplo, guardar una cadena enorme).
- [ ] Guardo con *debounce* (retardo), no en cada gota.
- [ ] El botón de limpiar también borra lo guardado.
- [ ] La clave tiene un nombre claro y con versión (`lienzo:v1`).
- [ ] No hay un parpadeo visible al navegar (restauro en cuanto cargue la página).
- [ ] Sé explicar qué límite tiene `sessionStorage` y qué hago si se supera.
- [ ] Cierre común hecho.

---

## FASE D — Pulido

### Paso 17 · Calidad y accesibilidad
- Marcar el canvas con `aria-hidden="true"` (es decorativo).
- Probar con teclado: todo lo importante debe seguir siendo accesible sin ratón.
- Probar en móvil real o en modo dispositivo de F12: ¿se pinta al hacer scroll? ¿molesta al tocar?
- Revisar rendimiento: pintar 100 manchas seguidas, ¿va fluido?
- Actualizar `README.md` y `docs/definicion/stack-tecnologico.md` si añado alguna decisión (p. ej. "sin dependencias JS externas para el lienzo").

**✅ Checklist**
- [ ] El canvas tiene `aria-hidden="true"`.
- [ ] Puedo recorrer toda la web solo con teclado.
- [ ] Lighthouse (DevTools > Lighthouse) da accesibilidad ≥ 90.
- [ ] En móvil, hacer scroll con el dedo no llena la pantalla de manchas indeseadas.
- [ ] 100 manchas seguidas no producen tirones (pestaña Performance si dudo).
- [ ] He ofrecido o valorado una forma de desactivar el lienzo.
- [ ] No quedan `console.log`, variables sin usar ni código muerto.
- [ ] Los comentarios explican el **porqué**, no repiten lo que hace cada línea.
- [ ] `README.md` y `stack-tecnologico.md` actualizados.
- [ ] Cierre común hecho.

### Paso 18 · Comparar con la referencia
- Leer por fin el prototipo y la versión de Claude (guardada como "solucionario") y anotar qué haría distinto cada uno y por qué.
- Si hay algo mejor en el solucionario, pregunto por qué antes de adoptarlo.

**✅ Checklist**
- [ ] He leído el prototipo y el solucionario completos.
- [ ] Tengo anotadas al menos 3 diferencias con cada uno.
- [ ] Para cada diferencia sé decir por qué es distinta y cuál prefiero.
- [ ] Si adopto algo de ellos, entiendo cada línea antes de copiarla.
- [ ] Cierre común hecho.

---

## Ideas extra (cuando todo lo anterior esté hecho)

- **Pintar arrastrando** (`pointermove` mientras el botón está pulsado) en vez de solo clic.
- **Sonido** con la Web Audio API nativa (sin Tone.js).
- **Colores de marca** extraídos de `marca-personal.md` como paleta propia.
- **Salpicar al cargar la sección de proyectos**, cada proyecto con su color.
- **Respetar `prefers-reduced-motion`** y ofrecer un interruptor para desactivar el lienzo.

## Registro de progreso

| Paso | Hecho | Fecha | Lo que aprendí / dudas |
|------|-------|-------|------------------------|
| 1    | ☐     |       |                        |
| 2    | ☐     |       |                        |
| 3    | ☐     |       |                        |
| 4    | ☐     |       |                        |
| 5    | ☐     |       |                        |
| 6    | ☐     |       |                        |
| 7    | ☐     |       |                        |
| 8    | ☐     |       |                        |
| 9    | ☐     |       |                        |
| 10   | ☐     |       |                        |
| 11   | ☐     |       |                        |
| 12   | ☐     |       |                        |
| 13   | ☐     |       |                        |
| 14   | ☐     |       |                        |
| 15   | ☐     |       |                        |
| 16   | ☐     |       |                        |
| 17   | ☐     |       |                        |
| 18   | ☐     |       |                        |