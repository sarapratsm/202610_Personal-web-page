# P2 — Plan de aprendizaje: lienzo de acuarela interactivo

**Objetivo:** construir yo misma el lienzo interactivo de acuarela dentro de `MiWebPersonal.Web`, entendiendo cada línea. El objetivo visual es `docs/references/wireframes.html` (solo como guía de cómo debe quedar, no como fuente de código).

**Alcance:** solo capa Web (`_Layout.cshtml`, `wwwroot/js`, `wwwroot/css`). No toca `Core` ni `Infrastructure`.


## Reglas del juego

- **No avanzo hasta que el código del paso funciona** (supera su "Cómo sé que funciona"). Las casillas de prueba que queden abiertas se dejan visibles en el plan y las cierro antes de terminar la fase.
- **Escribo el código a mano.** Aprendo solo con la documentación web (MDN y similares) que me van enseñando durante el aprendizaje: no consulto prototipos ni soluciones de terceros para programar. El wireframe es únicamente objetivo visual.
- **F12 abierto siempre** (pestaña Consola). Los errores son mis guías.
- **Escalera de ayuda** cuando me atasque:
  1. Releo la pista del paso y busco el concepto en MDN.
  2. Hago `console.log` de las variables.
  3. Pido una pista, no la solución.
  4. Enseño mi código y pido que me digan *dónde* está el fallo, sin arreglarlo.
  5. Solo como último recurso, pido una solución explicada.

## Cierre común (se repite en TODOS los pasos)

Cada paso tiene su checklist específica. Además, antes de darlo por terminado compruebo siempre esto:

- [ ] La consola (F12) no muestra errores míos. (Los de `browserLink` de Visual Studio los ignoro.)
- [ ] Recargo con `Ctrl+Shift+R` y sigue funcionando (descarta que sea caché).
- [ ] Las otras vistas (Privacy, Descargar CV...) siguen cargando bien.
- [ ] Sé explicar con mis propias palabras cada línea que he escrito.
- [ ] No quedan `console.log` sueltos (los de depuración pasan por `log` / `DEBUG`), ni código comentado, ni estilos en línea que no deban estar.
- [ ] Commit hecho. *(Decisión 2026-11-18: el formato del mensaje es libre cuando lo hago yo. Los que escribe el asistente van cortos, en español y sin prefijos.)*

---

## FASE A — Cimientos (el lienzo existe)

### Paso 1 · Un canvas vacío detrás de la página
- **Objetivo:** que haya un `<canvas>` a pantalla completa, fijo, detrás del contenido.
- **Conceptos:** elemento `<canvas>`, `position: fixed`, `inset`, `z-index`, variables CSS.
- **Qué hago:** añadir el canvas en la vista y envolver el contenido en un `div` con su propio `z-index`. Crear `wwwroot/css/lienzo.css` y enlazarlo. Crear `wwwroot/js/lienzo.js` y enlazarlo con `defer`.
- **Pista:** el canvas debe tener z-index menor que el contenido, y el contenido necesita `position: relative` para que el z-index le afecte.
- **Cómo sé que funciona:** en el inspector veo el canvas ocupando toda la ventana, y mi contenido sigue siendo clicable.

**✅ Checklist**
- [x] `lienzo.css` está enlazado en el `<head>` de `_Layout.cshtml` con `asp-append-version="true"`.
- [x] En el inspector, al seleccionar el canvas, el panel Styles muestra la regla `.capa-lienzo` con `lienzo.css:NN` a la derecha.
- [x] El canvas mide lo mismo que la ventana (sin contar la barra de scroll), no 300 × 150.
- [x] El canvas tiene `id` (para JavaScript) y `class` (para el estilo), y ningún `style` en línea.
- [x] Las variables `--z-*` están dentro de `:root { }` en `site.css`, con su `:` y su `;`.
- [x] Las capas usan `var(--z-...)`, no números sueltos.
- [x] La textura cubre toda la pantalla y tiene `pointer-events: none`.
- [x] La textura queda debajo del canvas.
- [x] El navbar se ve y sus enlaces navegan (la clase `.capa-navbar` está aplicada en `_Layout.cshtml`).
- [x] Los botones y enlaces de la página se pueden pulsar.
- [x] `.capa-contenido` tiene su regla en CSS y ya no queda `style="z-index: 2;"` en `Index.cshtml`.
- [x] Cierre común hecho.

### Paso 2 · Pintar algo desde JavaScript
- **Objetivo:** obtener el contexto 2D y dibujar un rectángulo de prueba.
- **Conceptos:** `getContext('2d')`, `fillStyle`, `fillRect`.
- **Qué hago:** en `lienzo.js`, seleccionar el canvas con `getElementById` y pintar un rectángulo rojo.
- **Pista:** si no se ve nada, comprueba que el script se carga (`console.log('lienzo cargado')`).
- **Cómo sé que funciona:** veo el rectángulo. Si se ve **borroso o estirado**, es normal: lo arreglo en el paso siguiente.

**✅ Checklist**
- [x] `lienzo.js` está en `wwwroot/js` y enlazado con `defer` en `_Layout.cshtml`.
- [x] En la consola aparece mi `console.log('lienzo cargado')`.
- [x] En la pestaña Network, `lienzo.js` sale con Status 200.
- [x] El `id` que busco en JS es exactamente el del HTML (`canvas-lienzo`).
- [x] Compruebo que `getElementById` no devuelve `null` antes de usar el canvas.
- [x] Uso `const` para lo que no reasigno (y no `var`).
- [x] Los nombres de variables son claros y coherentes (todos en español o todos en inglés).
- [x] El rectángulo se ve. Si sale deformado, sé explicar por qué (tamaño CSS ≠ tamaño interno).
- [ ] Cierre común hecho.

### Paso 3 · Que el canvas tenga el tamaño correcto
- **Objetivo:** que el canvas coincida con la ventana y se vea nítido en pantallas retina.
- **Conceptos:** tamaño CSS vs. tamaño interno (`canvas.width`), `window.innerWidth/innerHeight`, `devicePixelRatio`, `ctx.setTransform` o `ctx.scale`.
- **Qué hago:** poner el tamaño interno del canvas a `tamaño de ventana × devicePixelRatio` y escalar el contexto.
- **Pista:** asignar `canvas.width` **reinicia** el contexto, incluido el escalado. Escala *después* de asignar.
- **Cómo sé que funciona:** el rectángulo del paso 2 queda con bordes nítidos y mide exactamente lo que le pido.

**✅ Checklist**
- [x] En la consola, `canvas.width` es `innerWidth × devicePixelRatio` (y `canvas.height`, igual).
- [x] Asigno el tamaño **antes** de escalar el contexto.
- [x] No he tocado el tamaño CSS del canvas: lo sigue controlando `lienzo.css`.
- [x] El tamaño se calcula en una función con nombre (`ajustarTamano()`), no suelto.
- [x] Sé explicar qué es `devicePixelRatio` y por qué una pantalla retina lo necesita.
- [ ] Cierre común hecho.

### Paso 4 · Dibujar donde hago clic
- **Objetivo:** un círculo en la posición del ratón o dedo.
- **Conceptos:** eventos, `pointerdown`, `event.clientX/clientY`, `beginPath`, `arc`, `fill`.
- **Qué hago:** borrar el rectángulo de prueba. Escuchar `pointerdown` en `document` y dibujar un círculo de 40 px.
- **Pista:** pregunta por qué `pointerdown` es mejor que `click` + `touchstart` (investiga qué pasa en un móvil con los dos).
- **Cómo sé que funciona:** cada clic o toque pone un círculo justo bajo el puntero. Pruébalo con el modo móvil de F12.


**✅ Checklist**
- [x] Hay **un solo** listener, `pointerdown`, y no `click` + `touchstart`.
- [ ] El círculo queda centrado bajo el puntero en las cuatro esquinas de la ventana.
- [ ] En el modo dispositivo de F12, un toque pinta **un** círculo (no dos).
- [ ] Con la página con scroll, el círculo sigue saliendo bajo el puntero.
- [x] El listener solo llama a una función `salpicar(x, y)` que dibuja; no lleva todo el dibujo dentro. *(En mi código es `pintarLienzo(ctx, x, y)`.)*
- [x] El radio está en constantes con nombre, sin números mágicos repartidos. *(`RADIO_MINIMO` y `RADIO_MAXIMO`; el rango da de 20 a 40 incluidos.)*
- [x] He decidido si el botón derecho o central debe pintar (`event.button`). *(Decisión 2026-11-18: solo pinta el principal, `button === 0`.)*
- [x] El filtro del botón usa *early return* y una constante con nombre en vez del `0` suelto. *(`if (evento.button !== BOTON_PRINCIPAL) return;`)*
- [ ] En modo dispositivo de F12, un toque con el dedo pinta (en `pointerdown` táctil, `button` vale `0`).
- [ ] He decidido qué hacer con el menú contextual del clic derecho (dejarlo o suprimirlo con `contextmenu` + `preventDefault()`).
- [ ] Sé explicar por qué `evento.button` está disponible en un `PointerEvent` (herencia: `PointerEvent` → `MouseEvent`).
- [x] Sé explicar la diferencia entre `clientX` y `pageX`. *(Está explicado en un comentario de mi código.)*
- [ ] Cierre común hecho.

### Paso 5 · ¿Pintar al pulsar enlaces o botones? (decisión: sí)
- **Decisión (2026-11-18):** me gusta que **todos** los clics pinten, también sobre enlaces y botones. Así que no añado el filtro de abajo. Si cambio de idea, el plan original sigue aquí.
- **Objetivo original (descartado):** que la navegación y los controles no salpiquen.
- **Conceptos:** `event.target`, `element.closest(selector)`, `return` temprano.
- **Qué hago:** al inicio del manejador, salir si el objetivo está dentro de `a`, `button`, `input`, `select` o `[data-no-splash]`.
- **Cómo sé que funciona:** puedo pulsar el menú sin que aparezcan círculos, y en el resto de la página sí.
- **Consecuencia:** al pulsar un enlace la página navega y el canvas se vacía, así que la mancha solo se verá un instante. El paso 16 (guardar en `sessionStorage`) lo arregla.
- **Excepción (2026-11-18):** los controles del lienzo (limpiar, guardar, cambiar paleta, paso 15) **no pintan**. Si pintaran, `pointerdown` (que ocurre antes que `click`) haría que "Guardar" descargara un PNG con la mancha de ese propio clic, y "Limpiar" pintaría justo después de borrar. Se resuelve en el paso 15 con `closest` y un atributo `data-no-splash`.
- **Pendiente para más adelante:** cuando llegue el formulario de contacto, decidir si los campos (`input`, `textarea`) deben pintar. Escribir y pintar a la vez puede molestar.

**✅ Checklist**
*(Checklist adaptada a la decisión de pintar siempre.)*
- [x] Decisión tomada: los clics sobre enlaces y botones también pintan.
- [ ] Pulsar cada enlace del navbar sigue navegando (la mancha aparece un instante y la página cambia).
- [ ] Pulsar los botones de GitHub, LinkedIn y CV sigue funcionando.
- [ ] Con el teclado (`Tab` + `Enter`) los enlaces siguen funcionando.
- [ ] Sé explicar qué diferencia hay entre `target` y `closest`, por si más adelante excluyo los campos de formulario.

---

## FASE B — La mancha de acuarela (el corazón)

### Paso 6 · Color aleatorio con paleta
- **Objetivo:** cada mancha con un color distinto de una paleta mía, con una pequeña variación de tono, y con la estructura lista para tener una paleta por página (paso 14).
- **Conceptos:** arrays, objetos, `Math.random`, `Math.floor`, color `hsl()`/`hsla()` y por qué es cómodo para variar tonos.
- **Qué hago:** definir una paleta de 4-6 colores guardados como `{ h, s, l }` (no como texto), de colores suaves. Elegir uno al azar y variar un poco su tono, saturación y luminosidad en cada mancha. Crear una función pequeña `numeroAleatorio(min, max)` y usarla.
- **Pista:** guardar `h`, `s` y `l` por separado es lo que permite variarlos; con un texto `"hsl(350, 62%, 74%)"` no se puede.
- **Cómo sé que funciona:** las manchas salen de colores variados pero siempre reconocibles como de la paleta.
- 🟡 **Estado:** código terminado (paleta `{ h, s, l }`, `numeroAleatorio(min, max)` y variación de tono, saturación y luminosidad). Faltan las comprobaciones a mano de abajo (20 llamadas en consola y 20 clics) y la explicación de `hsl` vs `rgb`.

**✅ Checklist**
- [x] La paleta es una constante al principio del fichero, no está dentro de una función.
- [x] Cada color guarda `h`, `s` y `l` por separado.
- [x] `numeroAleatorio(min, max)` existe y la uso siempre, sin `Math.random()` suelto por el código.
- [x] En la consola, llamar 20 veces a `numeroAleatorio(5, 10)` devuelve siempre valores dentro del rango.
- [x] La variación de tono es pequeña: el color sigue siendo de la paleta.
- [x] Tras 20 clics, todos los colores se reconocen como de la paleta y ninguno es chillón.
- [x] Sé explicar por qué `hsl` es más cómodo que `rgb` para variar un color.
- [ ] Cierre común hecho.

### Paso 7 · De círculo a forma irregular
- **Objetivo:** que la mancha parezca orgánica, no un círculo perfecto.
- **Conceptos:** coordenadas polares (`x = cx + cos(ángulo)·r`), bucle `for`, array de puntos, `lineTo`.
- **Qué hago:** escribir una función que devuelva 12-16 puntos alrededor del clic, cada uno con un radio ligeramente aleatorio. Unirlos con líneas rectas.
- **Pista:** el ángulo de cada punto es `(i / n) · 2π`.
- **Cómo sé que funciona:** veo un polígono irregular, con picos. Es feo, y es lo esperado.

**✅ Checklist**
- [x] Una función (`crearPuntos(cx, cy, radio, n)`) **solo calcula** los puntos y los devuelve, no dibuja.
- [x] Otra parte del código recorre los puntos y los dibuja (separación de responsabilidades).
- [ ] `console.log(puntos.length)` da el número de puntos que pedí.
- [x] Los ángulos están repartidos de forma uniforme alrededor del círculo.
- [x] El polígono está cerrado (`closePath`) y no le falta ningún lado.
- [x] Cada clic genera una forma distinta.
- [x] El número de puntos y la irregularidad son parámetros con nombre, no números mágicos.
- [x] Cada llamada a `crearPuntos` da una forma nueva. *(En el paso 11, cada capa tendrá la suya: no se reutilizan los puntos.)*
- [ ] Cierre común hecho.

### Paso 8 · Suavizar los bordes
- **Objetivo:** convertir el polígono en una forma redondeada.
- **Conceptos:** `quadraticCurveTo(controlX, controlY, finalX, finalY)`, puntos medios entre vértices.
- **Qué hago:** en vez de `lineTo`, usar cada vértice como punto de control y el punto medio con el siguiente como destino.
- **Pista:** dibuja un papel con 5 puntos y marca los puntos medios para entender la idea antes de programarla. Recuerda cerrar la forma (el último punto enlaza con el primero). Si ves que la forma sale algo torcida, dibuja los puntos medios y compara con dónde empieza tu `moveTo`.
- **Cómo sé que funciona:** la forma parece una gota o charco, sin picos.

**✅ Checklist**
- [ ] No se ve ningún pico y la forma parece un charco.
- [ ] 🔎 ¿En qué punto empieza el trazo con `moveTo` y en cuál termina la última curva? ¿Coinciden? *(Revísalo con pocos puntos, por ejemplo 5, para verlo mejor. Mira también qué hace `closePath` al final.)*
- [x] La lógica está en una función reutilizable (`trazarCurva(puntos)`). *(La mía recibe también `ctx`: `trazarCurva(ctx, puntos)`, y está bien.)*
- [ ] Puedo explicar con un dibujo en papel por qué usamos puntos medios.
- [ ] Probado con 5 puntos y con 30 puntos, y la forma sigue siendo válida.
- [ ] Cierre común hecho.

### Paso 9 · Transparencia y mezcla de pigmentos
- **Objetivo:** que las manchas se vean translúcidas y se mezclen al solaparse.
- **Conceptos:** alfa en `hsla`, `globalCompositeOperation = 'multiply'`.
- **Qué hago:** bajar la opacidad a ~0.3 y activar `multiply`.
- **Nota (2026-11-18):** `ctx.save()` / `ctx.restore()` se ha movido al paso 11. Aquí el modo de mezcla se queda activado y no se nota, porque solo se dibujan manchas.
- **Cómo sé que funciona:** si pinto dos manchas solapadas, la zona común se ve más oscura, como acuarela real.

**✅ Checklist**
- [x] Dos manchas solapadas dan una zona más oscura en la intersección.
- [x] La opacidad está en una constante, no repetida en cinco sitios.
- [ ] La mancha se ve bien sobre la textura y sobre fondo claro.
- [ ] Sé explicar qué hace `multiply` y en qué se diferencia de simplemente bajar el alfa.
- [ ] Cierre común hecho.

### Paso 10 · Degradado y borde de pigmento
- **Objetivo:** centro más denso y borde más claro, con un fino anillo de pigmento cuyo grosor varía un poco de una mancha a otra.
- **Conceptos:** `createRadialGradient`, `addColorStop`, `stroke`, `lineWidth`.
- **Qué hago:** rellenar con un degradado radial en vez de color plano, y trazar el contorno con un color algo más oscuro y poco opaco.
- **Cómo sé que funciona:** la mancha ya "parece" acuarela cuando la miro a un palmo de la pantalla.

**✅ Checklist**
- [ ] Se distingue un centro más intenso y un borde más suave.
- [ ] Los `addColorStop` van entre 0 y 1 y en orden creciente.
- [ ] El radio exterior del degradado coincide con el tamaño de la mancha.
- [ ] El anillo es más oscuro y fino que el relleno, y no tiñe lo que se dibuje después. *(Esto último se cierra con `save()` / `restore()` en el paso 11.)*
- [ ] El grosor del anillo varía un poco de una mancha a otra.
- [ ] 30 clics seguidos no producen tirones.
- [ ] Sé explicar qué dos círculos define `createRadialGradient`.
- [ ] Cierre común hecho.

### Paso 11 · Capas
- **Objetivo:** dar profundidad dibujando 3 formas superpuestas, cada una algo más pequeña y algo más intensa.
- **Conceptos:** bucle de capas, reutilizar tu función de forma irregular, `ctx.save()` / `ctx.restore()` (movido aquí desde el paso 9).
- **Por qué `save()` / `restore()` aquí:** cada capa cambiará ajustes del contexto (opacidad, color, modo de mezcla). Sin guardar y restaurar, los ajustes de una capa se arrastran a la siguiente y a todo lo que se dibuje después. Aquí es donde se espera ver el problema.
- **Pista:** cada capa se calcula a partir del número de capa `c` del bucle: su radio baja con `c` y su opacidad sube con `c`. Una sola fórmula por valor, sin tres bloques copiados.
- **Cómo sé que funciona:** la mancha tiene zonas de distinta intensidad, no un solo tono. El anillo de pigmento sigue siendo uno solo, en la capa exterior.

**✅ Checklist**
- [ ] Las 3 capas se dibujan con un bucle `for`, sin copiar y pegar el mismo bloque tres veces.
- [ ] Cada capa tiene un radio menor que la anterior.
- [ ] La opacidad o la intensidad varía entre capas.
- [ ] Reutilizo las funciones de los pasos 7 y 8 en vez de duplicarlas, y cada capa tiene su propia forma irregular.
- [ ] Comparando con una captura del paso 10, se nota más profundidad.
- [ ] El número de capas es un parámetro con nombre.
- [ ] Uso `save()` antes de cambiar los ajustes del contexto y `restore()` después.
- [ ] Tras dibujar una mancha, `ctx.globalCompositeOperation` vuelve a `'source-over'` (compruébalo con `console.log`). *(Ahora se queda en `'multiply'`.)*
- [ ] Sé explicar qué ajustes guardan `save()` / `restore()` y cuáles no (los píxeles ya dibujados no se deshacen).
- [ ] Cierre común hecho.

### Paso 12 · Gotas y bruma
- **Objetivo:** salpicaduras alrededor de la mancha principal.
- **Conceptos:** posiciones aleatorias en un anillo (ángulo + distancia), tamaños variables, `ellipse` para gotas alargadas.
- **Qué hago:** primero unas 10 gotas circulares a distinta distancia del centro; luego que alrededor del 40 % sean alargadas y estén orientadas hacia fuera; por último, puntitos mínimos más lejos (bruma).
- **Pista:** mide la distancia de las gotas en múltiplos del radio de la mancha (por ejemplo, entre 0,8 y 2,5 veces), así las manchas grandes salpican más lejos que las pequeñas.
- **Cómo sé que funciona:** el resultado ya se parece al wireframe (`docs/references/wireframes.html`). Compáralo con él y con tus capturas de pasos anteriores, y anota 3 diferencias para pulir.

**✅ Checklist**
- [ ] Las gotas salen en un anillo alrededor de la mancha, no encima.
- [ ] Alrededor del 40 % de las gotas son alargadas y apuntan hacia fuera.
- [ ] Hay una bruma de puntitos más lejos que las gotas.
- [ ] La distancia de las gotas depende del radio de cada mancha.
- [ ] Cantidades, tamaños y distancias están en constantes de configuración, no esparcidos por el código.
- [ ] Hay una función separada (`dibujarGotas(...)`) que no mezcla su lógica con la de la mancha.
- [ ] Hacer clic cerca del borde de la pantalla no da errores.
- [ ] Tengo anotadas 3 diferencias frente al wireframe.
- [ ] Cierre común hecho.

---

## FASE C — Integrarlo en una web real

### Paso 13 · Que el contenido conviva con la pintura
- **Objetivo:** texto legible encima de manchas de cualquier color: ningún texto queda directamente sobre el lienzo.
- **Conceptos:** `backdrop-filter: blur()`, fondos `rgba`, contraste de color, variables CSS para el color del cristal.
- **Qué hago:** crear una clase `.glass-panel` (con su color en una variable CSS) y aplicarla a las tarjetas de `Index.cshtml`. El pie también va translúcido, y deja espacio abajo para que los controles flotantes del paso 17 no tapen su contenido.
- **Cómo sé que funciona:** puedo leer todo el texto aunque pinte justo detrás. Compruébalo también con la mancha más oscura que pueda salir.

**✅ Checklist**
- [ ] El texto es legible con manchas claras y oscuras detrás.
- [ ] El contraste del texto cumple 4,5:1 (en el inspector, el selector de color de DevTools lo muestra).
- [ ] Las tarjetas de proyectos también son legibles, no solo el panel principal.
- [ ] Mantengo `-webkit-backdrop-filter` junto a `backdrop-filter` para Safari.
- [ ] El color del cristal está en una variable CSS (`--glass`), no repetido en varias reglas.
- [ ] El pie es translúcido y tiene margen inferior suficiente para los controles flotantes.
- [ ] Todo el estilo está en clases reutilizables, sin `style` en línea.
- [ ] Cierre común hecho.

### Paso 14 · Una paleta por página (la parte propia de MVC)
- **Objetivo:** que cada página pinte con su propia paleta de colores suaves, sin que el JS tenga que saber en qué página está.
- **Conceptos:** `ViewData` de Razor, atributos `data-*`, `element.dataset`, objeto con claves (diccionario), valor por defecto.
- **Qué hago:** convertir mi paleta en un objeto con una paleta por clave (`inicio`, `proyectos`, `experiencia`, `contacto`, `error404`). Cada vista declara cuál usa con `ViewData` y `_Layout.cshtml` la escribe en el canvas como `data-paleta`. En `lienzo.js`, la leo con `dataset` y elijo la paleta. Paletas provisionales de `docs/references/README.md`: Inicio, rosas y melocotón; Proyectos, azules y lavanda; Experiencia y formación, verdes salvia; Contacto, melocotón y mantequilla; 404, lilas.
- **Pista:** el JS no pregunta "¿en qué página estoy?": el HTML se lo dice. Así `lienzo.js` no cambia al añadir una página nueva.
- **Cómo sé que funciona:** en Inicio salen rosas y melocotón, y al ir a otra página los colores cambian a los de esa página.

**✅ Checklist**
- [ ] Las paletas están en un único objeto al principio de `lienzo.js`.
- [ ] El `data-paleta` lo escribe `_Layout.cshtml` a partir de `ViewData`, y ningún `if` del JS depende de la URL.
- [ ] Cada vista existente declara su paleta (o usa la de por defecto, y sé decir cuál es y por qué).
- [ ] Si `data-paleta` falta o tiene un nombre que no existe, la web no falla: usa una paleta por defecto.
- [ ] Tras 20 clics en cada página, todos los colores son de la paleta de esa página.
- [ ] Sé explicar cómo viaja el dato: `ViewData` → Razor → atributo HTML → `dataset` → JS.
- [ ] Cierre común hecho.

### Paso 15 · No perder la pintura al redimensionar
- **Objetivo:** girar el móvil o cambiar el tamaño de ventana sin borrar la obra.
- **Conceptos:** evento `resize` (o `ResizeObserver`, a investigar), canvas auxiliar en memoria, `drawImage`.
- **Pista:** cambiar `canvas.width` borra el contenido. Antes de cambiarlo, copia el canvas a otro; después, devuélvelo.
- **Cómo sé que funciona:** pinto, redimensiono la ventana y la pintura sigue ahí.

**✅ Checklist**
- [ ] Pinto, achico la ventana, la agrando, y la pintura sigue ahí.
- [ ] En el modo dispositivo de F12, giro de vertical a horizontal y no se pierde.
- [ ] Cambiar el zoom del navegador tampoco la borra.
- [ ] `resize` no se dispara cientos de veces seguidas (considero un *debounce*).
- [ ] No creo un canvas auxiliar nuevo en cada evento sin necesidad.
- [ ] Si el tamaño no cambia de verdad, no hago nada.
- [ ] He decidido qué hacer al agrandar la ventana (zona vacía o pintura escalada) y sé justificarlo.
- [ ] Sé explicar por qué asignar `canvas.width` borra el contenido.
- [ ] Cierre común hecho.

### Paso 16 · Un toque, no un arrastre
- **Objetivo:** en móvil, que deslizar el dedo para hacer scroll no llene la pantalla de manchas. Solo pinta un toque sin desplazamiento.
- **Conceptos:** `pointerdown` + `pointerup` + `pointercancel`, distancia entre dos puntos (`Math.hypot`), umbral en constante, guardar el estado entre dos eventos.
- **Qué hago:** en `pointerdown` solo recuerdo dónde empezó el toque; en `pointerup` pinto si el dedo se ha movido menos de unos pocos píxeles (y el scroll no ha cambiado). Si el navegador cancela el gesto (`pointercancel`), me olvido del toque. *Esto sustituye al listener único del paso 4: ahora hay tres.*
- **Pista:** pregunta qué pasa con el ratón en escritorio: ¿sigue pintando justo al soltar? ¿Es un cambio notable respecto a pintar al pulsar?
- **Cómo sé que funciona:** en el modo dispositivo de F12, tocar pinta y deslizar para hacer scroll no pinta. Con el ratón, un clic sigue pintando.

**✅ Checklist**
- [ ] Un toque quieto pinta **una** mancha, en el punto donde se tocó.
- [ ] Deslizar para hacer scroll no pinta ninguna.
- [ ] Si el navegador cancela el gesto, no queda un toque "colgado" que pinte después.
- [ ] El umbral de movimiento está en una constante con nombre.
- [ ] El botón derecho y el central siguen sin pintar (mi decisión del paso 4).
- [ ] Un clic de ratón en escritorio sigue pintando.
- [ ] Sé explicar por qué `pointerdown` solo no basta en móvil.
- [ ] Cierre común hecho.

### Paso 17 · Controles: limpiar y apagar
- **Objetivo:** dos controles flotantes abajo a la derecha, en una píldora translúcida: un botón **Limpiar** y un interruptor **Lienzo** (encender/apagar).
- **Conceptos:** `clearRect` (¡cuidado con el escalado!), `<button type="button">`, `role="switch"` + `aria-checked`, `aria-label`, `position: fixed`, mostrar/ocultar con el atributo `hidden`.
- **Qué hago:** el botón borra todo el lienzo. El interruptor, al apagarse, borra las manchas, deja de pintar y oculta "Limpiar"; al encenderse, el lienzo vuelve en blanco y se puede pintar de nuevo. En escritorio muestran icono y texto; en móvil, solo icono (con `aria-label`).
- **Pista:** si el contexto está escalado por `devicePixelRatio`, borrar `width × height` en unidades CSS deja restos en las esquinas. Piensa en qué unidades trabaja `clearRect`.
- **Cómo sé que funciona:** limpiar deja la pantalla en blanco; apagar borra, deja de pintar y esconde "Limpiar"; encender lo devuelve todo.
- **Fuera de alcance:** no hay botón de guardar imagen ni selector de paleta (cada página trae la suya, paso 14).

**✅ Checklist**
- [ ] Limpiar borra **todo**, incluidas las esquinas, y también con zoom o pantalla retina.
- [ ] Apagar borra las manchas, deja de pintar y oculta "Limpiar"; encender vuelve a mostrarlo y el lienzo está en blanco.
- [ ] Pulsar los controles no pinta: son `<button>` y el filtro de botones los excluye.
- [ ] Los controles son `<button type="button">`, no `<div>` clicables.
- [ ] El interruptor lleva `role="switch"` y `aria-checked`, y los controles con solo icono tienen `aria-label`.
- [ ] Se pueden usar con teclado (`Tab` + `Enter` o espacio) y se ve el foco.
- [ ] En móvil solo se ve el icono y no tapan el contenido del pie.
- [ ] Cierre común hecho.

### Paso 18 · Recordar el apagado entre páginas
- **Objetivo:** que, si apago el lienzo, siga apagado al cambiar de página durante la visita. Cada visita nueva empieza encendido. La pintura **no** se guarda: cada página empieza en blanco.
- **Conceptos:** cada navegación recarga la página y reinicia el JS; `sessionStorage` (vive mientras dure la pestaña); `try/catch` (el almacenamiento puede fallar); valores guardados como texto.
- **Qué hago:** al apagar o encender, guardo ese estado en `sessionStorage`. Al cargar la página, lo leo y arranco encendida o apagada según corresponda.
- **Reflexión:** ¿qué pasa si el navegador bloquea el almacenamiento (ventana privada con datos bloqueados)? ¿Debe romperse algo?
- **Cómo sé que funciona:** apago en Inicio, voy a otra página y sigue apagado. Cierro la pestaña, abro otra y está encendido.
- **Nota:** esto sustituye al plan anterior (guardar una captura del canvas). Se descarta porque el documento de referencia pide que cada página empiece en blanco. Guardar la obra queda en "Ideas extra".

**✅ Checklist**
- [ ] Apago en una página, navego a otra y el lienzo sigue apagado, sin parpadeo de pintura.
- [ ] Cierro la pestaña y abro otra: el lienzo está encendido.
- [ ] En F12 > Application > Session Storage veo mi clave con un valor claro.
- [ ] Lectura y escritura van dentro de `try/catch`; si falla, el interruptor funciona en la página y la siguiente empieza encendida.
- [ ] La clave tiene un nombre claro y con versión (`lienzo:v1`).
- [ ] Con el lienzo apagado, el botón "Limpiar" no aparece al cargar la página.
- [ ] Al cambiar de página, el lienzo vuelve a empezar en blanco (decisión consciente, no un fallo).
- [ ] Sé explicar qué diferencia hay entre `sessionStorage` y `localStorage`, y por qué elijo `sessionStorage`.
- [ ] Cierre común hecho.

---

## FASE D — Pulido

### Paso 19 · Calidad y accesibilidad
- Marcar el canvas con `aria-hidden="true"` (es decorativo).
- Probar con teclado: todo lo importante debe seguir siendo accesible sin ratón.
- Probar en móvil real o en modo dispositivo de F12: ¿se pinta al hacer scroll? ¿molesta al tocar?
- Revisar rendimiento: pintar 100 manchas seguidas, ¿va fluido?
- Actualizar `README.md` y `docs/definicion/stack-tecnologico.md` si añado alguna decisión (p. ej. "sin dependencias JS externas para el lienzo").
- Revisar `docs/references/user-stories.md` (EP-02) y anotar las decisiones propias de este plan que difieran (por ejemplo, qué elementos pintan al pulsarlos).

**✅ Checklist**
- [ ] El canvas tiene `aria-hidden="true"`.
- [ ] Puedo recorrer toda la web solo con teclado.
- [ ] Lighthouse (DevTools > Lighthouse) da accesibilidad ≥ 90.
- [ ] En móvil, hacer scroll con el dedo no llena la pantalla de manchas indeseadas (paso 16).
- [ ] 100 manchas seguidas no producen tirones (pestaña Performance si dudo).
- [ ] El interruptor del lienzo funciona y se entiende sin ratón (paso 17).
- [ ] `DEBUG` está en `false` y no quedan `console.log` fuera de `log`, variables sin usar ni código muerto. *(Decisión 2026-11-18: `DEBUG` y `log` se quedan en el código final, desactivados.)*
- [ ] Los comentarios explican el **porqué**, no repiten lo que hace cada línea.
- [ ] `README.md`, `stack-tecnologico.md` y `user-stories.md` revisados y actualizados si hace falta.
- [ ] Cierre común hecho.

### Paso 20 · Revisión final con la documentación
- **Decisión (2026-11-18):** no hay prototipo ni solucionario. La revisión final se hace contra la documentación web, el wireframe y las user stories de EP-02.
- Repasar cada API usada (canvas, eventos, `sessionStorage`...) en MDN y comprobar que la uso como describe.
- Recorrer los criterios de aceptación y los casos de prueba de EP-02.US-01, US-02 y US-03 en `docs/references/user-stories.md`, y marcar los que cumple mi lienzo y los que no (anotando por qué, si la diferencia es una decisión mía).
- Comparar el resultado con `docs/references/wireframes.html` y anotar qué mejoraría y por qué.

**✅ Checklist**
- [ ] He releído en MDN la documentación de cada API que uso.
- [ ] He pasado los casos de prueba QA de EP-02 y sé explicar cada diferencia con el documento.
- [ ] Tengo anotadas al menos 3 mejoras posibles frente al wireframe.
- [ ] Para cada mejora sé decir por qué la haría y qué concepto nuevo necesito.
- [ ] Sé explicar con mis palabras cada función del fichero.
- [ ] Cierre común hecho.

---

## Ideas extra (cuando todo lo anterior esté hecho)

- **Guardar la obra entre páginas** (`toDataURL` en `sessionStorage`, con `new Image()` + `onload` para restaurarla y *debounce* al guardar): la idea original del paso 18.
- **Descargar la obra como PNG** con fondo crema (canvas auxiliar, `toDataURL`, `<a download>`).
- **Pintar arrastrando** (`pointermove` mientras el botón está pulsado) en vez de solo clic.
- **Elegir la paleta a mano** con un `<select>`.
- **Modo oscuro** (EP-01.US-03): el lienzo sigue claro y solo cambian los paneles.
- **Sonido** con la Web Audio API nativa (sin Tone.js).
- **Colores de marca** extraídos de `docs/diario-interno/analisis/marca-personal.md` (local) como paletas propias.
- **Salpicar al cargar la sección de proyectos**, cada proyecto con su color.
- **Respetar `prefers-reduced-motion`** y apagar el lienzo por defecto si está activo.
