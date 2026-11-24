# P3 — Plan de aprendizaje: distribución de las páginas (layout)

**Objetivo:** construir yo misma la estructura de todas las páginas de la web (cabecera, pie, y las pantallas de Inicio, Proyectos, Experiencia y formación, Contacto y 404) tal y como aparecen en `docs/references/wireframes.html`, en escritorio y en móvil. Al terminar sabré montar un layout con Razor, CSS Grid, Flexbox y media queries, y entenderé cada línea.

**Alcance:** solo la **distribución** (HTML + CSS + Razor). Se queda fuera, y tendrá su propio plan:
- El filtro de proyectos funcionando (JavaScript) y el modo oscuro con su interruptor.
- La validación y el envío del formulario de contacto, el señuelo y el límite de envíos.
- Los textos y datos definitivos (los del wireframe son provisionales) y las direcciones reales de correo, LinkedIn y GitHub.
- El comportamiento del lienzo (eso es P2). Aquí solo me aseguro de que convive con la estructura.

**Relación con P2:** P3 y P2 se tocan en `_Layout.cshtml` y en `site.css`. Hoy el canvas y la textura están dentro de `Index.cshtml` (paso 1 de P2), así que solo existen en Inicio. En el paso 3 de este plan los muevo al layout para que estén en todas las páginas. Los pasos 13 y 14 de P2 (paneles de cristal y paleta por página) encajan con los pasos 2 y 7 de este plan: no los duplico, los reutilizo.

## Reglas del juego

Las mismas que en P2 (`p2-lienzo-aprendizaje.md`): no avanzo hasta que el paso funciona, escribo el código a mano, F12 siempre abierto y escalera de ayuda de cinco peldaños. Además:

- **El wireframe es el objetivo visual, no una fuente de código.** Lo abro para mirar cómo debe quedar y escribo mi propio HTML y CSS. Copiar y pegar su CSS me dejaría sin aprender justo lo que quiero aprender.
- **Primero escritorio, luego móvil, paso a paso.** Cada paso se termina en las dos vistas (botón *Móvil* del wireframe y modo dispositivo de F12) antes de pasar al siguiente.
- **Nombres de clases en español**, como en el wireframe (`.panel`, `.tarjeta`, `.ficha`...), y siempre describen *qué es*, no *cómo se ve*.

## Cierre común (se repite en TODOS los pasos)

- [ ] La consola (F12) no muestra errores míos.
- [ ] Recargo con `Ctrl+Shift+R` y se ve igual (descarta caché).
- [ ] Lo comparo con el wireframe en escritorio **y** en móvil.
- [ ] Las páginas que ya tenía hechas siguen viéndose bien.
- [ ] No hay estilos en línea (`style="..."`) que no deban estar, ni CSS o HTML comentado sin motivo.
- [ ] Sé explicar con mis palabras cada regla CSS y cada etiqueta que he escrito.
- [ ] Commit hecho (mensaje corto, en español, sin prefijos).

---

## Conocimientos previos

Ya los tengo de P2 y de las prácticas: HTML básico, CSS básico (selectores, variables, `position`), Razor (`ViewData`, `_Layout`) y controladores MVC. Lo nuevo de este plan es: Flexbox, CSS Grid, media queries, vistas parciales y accesibilidad de estructura (landmarks, `aria-current`).

## Herramientas

| Herramienta | Qué es y por qué la uso |
|---|---|
| **Razor `_Layout.cshtml`** | La plantilla común que envuelve a todas las vistas. `@RenderBody()` es el hueco donde entra cada página. Es el sitio natural para la cabecera, el pie y el lienzo, porque así no se repiten en cada vista. |
| **Vistas parciales** (`_Cabecera.cshtml`, `_Pie.cshtml`) | Trozos de vista reutilizables. Mantienen el layout corto y legible. |
| **Flexbox** | Distribución en **una dimensión** (una fila o una columna). Lo uso para la cabecera, el pie, los botones y las etiquetas. |
| **CSS Grid** | Distribución en **dos dimensiones**. Lo uso para la rejilla de fichas de Proyectos (2 columnas en escritorio, 1 en móvil). |
| **Media queries** | Reglas CSS que solo se aplican a partir de cierto ancho. Es lo que cambia la cabecera de escritorio por la de móvil a los 900 px. |
| **Bootstrap** (ya instalado) | Decisión del paso 1: ¿lo sigo usando para el layout o paso a CSS propio? El wireframe está hecho con CSS propio. |

## Referencias

Todas comprobadas con `curl` (200) el 2026-11-24.

- [CSS Grid Layout (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
- [CSS Flexible Box Layout (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)
- [Usar media queries (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- [`position`, incluido `sticky` (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- [`backdrop-filter` (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [`scroll-margin-top` (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-top)
- [`aria-current` (MDN)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current)
- [El elemento `<header>` (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header)
- [Layout en ASP.NET Core MVC (Microsoft Learn)](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/layout?view=aspnetcore-10.0)
- [Vistas parciales en ASP.NET Core (Microsoft Learn)](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/partial?view=aspnetcore-10.0)
- [Sistema de rejilla de Bootstrap 5.3](https://getbootstrap.com/docs/5.3/layout/grid/)

## Mapa de pantallas

Es lo que voy a construir. La columna *Vista* ya existe o hay que crearla.

| Pantalla (wireframe) | Acción / vista | Ruta | Estado hoy | Paleta (P2) |
|---|---|---|---|---|
| Inicio (EP-03) | `Home/Index` | `/` | Existe, con otro diseño | `inicio` |
| Proyectos (EP-04) | `Home/Proyectos` | `/Home/Proyectos` | No existe | `proyectos` |
| Experiencia y formación (EP-05) | `Home/Experiencia` | `/Home/Experiencia` | No existe | `experiencia` |
| Contacto (EP-06) | `Home/Contacto` | `/Home/Contacto` | No existe | `contacto` |
| 404 (EP-01.US-05) | `Home/Error404` | (`UseStatusCodePagesWithReExecute`) | Existe, sin diseñar | `error404` |

Piezas comunes: **cabecera** (EP-01.US-01 y US-02) y **pie** (EP-01.US-04) en todas las páginas.

---

## FASE A — Cimientos de la estructura

### Paso 1 · Inventario y decisiones
- **Objetivo:** saber exactamente qué voy a construir y decidir las dos cosas que condicionan todo lo demás.
- **Conceptos:** leer un wireframe como un plano: bloques, jerarquía, qué se repite.
- **Qué hago:** abro `wireframes.html`, recorro las 6 pantallas en escritorio y móvil, y anoto en papel (o en un comentario al final de este plan) los bloques de cada una. Tomo estas decisiones y las dejo escritas aquí:
  1. **¿Bootstrap o CSS propio para el layout?** (El wireframe usa CSS propio. Con Bootstrap tendría que adaptar sus clases a un diseño que no es el suyo.)
  2. **Punto de corte móvil/escritorio:** el wireframe usa **900 px** (EP-01.US-01). Bootstrap `navbar-expand-lg` corta en 992 px. ¿Me quedo con 900 px?
- **Pista:** pregunta guía: ¿qué cosas se repiten en todas las pantallas? Eso va al layout. ¿Qué cambia? Eso va a cada vista.
- **Cómo sé que funciona:** tengo la tabla "Mapa de pantallas" revisada y las dos decisiones escritas, con una frase de por qué.

**✅ Checklist**
- [ ] He recorrido las 6 pantallas del wireframe en escritorio **y** móvil.
- [ ] Tengo anotado qué es común (cabecera, pie, lienzo, panel de cristal) y qué es propio de cada página.
- [ ] Decisión 1 (Bootstrap o CSS propio) tomada y justificada: _______
- [ ] Decisión 2 (punto de corte) tomada y justificada: _______
- [ ] Cierre común hecho.

### Paso 2 · Variables y piezas base (`.wrap`, `.panel`)
- **Objetivo:** tener los colores, radios y sombras en variables, y las dos piezas que usan todas las pantallas: el contenedor centrado y el panel de cristal.
- **Conceptos:** variables CSS en `:root`, `max-width` + `margin: 0 auto`, `box-sizing: border-box`, `backdrop-filter` con su prefijo `-webkit-`.
- **Qué hago:** en `site.css`, añadir las variables del wireframe que necesito (`--paper`, `--ink`, `--muted`, `--line`, `--primary`, `--glass`, `--radius`, `--shadow`...) junto a mis `--z-*`. Crear `.wrap` (ancho máximo 1040 px, centrado, con padding lateral) y `.panel` (fondo `--glass`, desenfoque, borde, radio, sombra, padding). Sustituir mi `.glass-panel` actual por `.panel`.
- **Pista:** no copies los valores a ciegas: pregunta por qué `.wrap` lleva `width: 100%` **y** `max-width`. Pruébalo quitando uno de los dos y mira qué pasa al encoger la ventana.
- **Cómo sé que funciona:** el panel de Inicio se ve igual que antes (o mejor), y al encoger la ventana el contenido nunca toca los bordes.

**✅ Checklist**
- [ ] Los colores y medidas repetidos están en variables dentro de `:root`, no sueltos.
- [ ] `.wrap` está centrado y con margen lateral también en móvil.
- [ ] `.panel` lleva `backdrop-filter` **y** `-webkit-backdrop-filter`.
- [ ] El color de cristal está en una variable (`--glass`), no repetido (esto cierra a la vez parte del paso 13 de P2).
- [ ] No queda `.glass-panel` sin usar en el CSS.
- [ ] Sé explicar para qué sirve `box-sizing: border-box`.
- [ ] Cierre común hecho.

### Paso 3 · El layout lleva el lienzo (para todas las páginas)
- **Objetivo:** que el canvas y la textura estén en todas las páginas sin repetirlos en cada vista.
- **Conceptos:** qué pertenece al layout y qué a la vista, `@RenderBody()`, `@section Scripts`.
- **Qué hago:** mover del `Index.cshtml` al `_Layout.cshtml` el `<canvas>`, el `div` de la textura, y el `<script ... lienzo.js defer>`. Envolver el cuerpo del layout en un contenedor con la clase `.capa-contenido` (el que ya tiene mi `z-index`). Dejar `Index.cshtml` solo con su contenido.
- **Pista:** el orden de las capas del paso 1 de P2 no cambia: textura, lienzo, contenido, navbar. Solo cambia *dónde* están escritas.
- **Cómo sé que funciona:** pinto en Inicio y en Privacy y funciona en las dos, sin haber tocado `Privacy.cshtml`.

**✅ Checklist**
- [ ] El canvas y la textura están una sola vez, en `_Layout.cshtml`.
- [ ] `lienzo.js` se carga desde el layout (con `defer` y `asp-append-version`).
- [ ] `Index.cshtml` ya no tiene canvas, textura ni `style="z-index: 2;"`.
- [ ] Pinto en Inicio y en Privacy; la cabecera y los enlaces siguen siendo clicables.
- [ ] Sé explicar por qué esto va en el layout y no en cada vista (DRY).
- [ ] Cierre común hecho.

### Paso 4 · Cabecera de escritorio
- **Objetivo:** la cabecera fija con logo, nombre, menú y hueco para el interruptor de modo oscuro (que se hará en otro plan).
- **Conceptos:** `display: flex`, `align-items`, `gap`, `margin-left: auto`, `position: sticky`, `aria-current="page"`, elementos semánticos `<header>` y `<nav>` con `aria-label`.
- **Qué hago:** crear una vista parcial `_Cabecera.cshtml` e incluirla desde el layout. Dentro: icono (`smiley.png` a `wwwroot/img`) + «Sara Prats Morales» enlazando a Inicio, el menú con **Inicio, Proyectos, Experiencia y formación y Contacto**, y un sitio reservado a la derecha para el interruptor. Marcar la página actual con `aria-current="page"` (y darle estilo a ese atributo).
- **Pista:** ¿cómo sabe la cabecera en qué página está? Piensa en el recorrido `ViewData` → Razor → HTML que ya hiciste (paso 14 de P2). Alternativa a investigar: `ViewContext.RouteData.Values["action"]`. Compara las dos y elige.
- **Cómo sé que funciona:** cada entrada lleva a su página (aunque algunas aún den 404), la actual aparece marcada y la cabecera se queda arriba al hacer scroll.

**✅ Checklist**
- [ ] La cabecera es una vista parcial, no HTML pegado en el layout.
- [ ] Logo y nombre enlazan a Inicio, y los dos juntos son **un solo** enlace.
- [ ] El menú tiene las cuatro entradas, en este orden.
- [ ] La página actual lleva `aria-current="page"` y se ve distinta; en la 404 no hay ninguna marcada.
- [ ] El estilo de la entrada actual usa el selector `[aria-current="page"]`, no una clase aparte.
- [ ] Al hacer scroll, la cabecera sigue arriba.
- [ ] Se puede recorrer con `Tab` en orden lógico y el foco se ve.
- [ ] La cabecera no tapa el elemento que recibe el foco (`scroll-margin-top`).
- [ ] Sé explicar la diferencia entre `fixed` y `sticky`.
- [ ] Cierre común hecho.

### Paso 5 · Cabecera de móvil y menú desplegable
- **Objetivo:** por debajo del punto de corte, el menú se esconde tras un botón de hamburguesa que lo despliega bajo la cabecera y empuja el contenido.
- **Conceptos:** media queries (`max-width`), `hidden`, `aria-expanded`, `aria-controls`, ocultar/mostrar con una clase.
- **Qué hago:** con una media query, ocultar el menú horizontal y mostrar el botón. Al pulsarlo, alternar el menú. Según la decisión del paso 1: con el `collapse` de Bootstrap (que ya está cargado) o con unas pocas líneas de JS propio.
- **Pista:** `aria-expanded` debe cambiar de `false` a `true` a la vez que se abre; es lo que le dice a un lector de pantalla qué está pasando.
- **Cómo sé que funciona:** en el modo dispositivo de F12, estrecho la ventana por debajo del corte: aparece la hamburguesa; la pulso, se despliega el menú y empuja el contenido; la vuelvo a pulsar y se cierra.

**✅ Checklist**
- [ ] Por encima del corte se ve el menú horizontal y no la hamburguesa; por debajo, al revés.
- [ ] El botón es un `<button type="button">`, no un `<div>`.
- [ ] `aria-expanded` cambia al abrir y cerrar, y `aria-controls` apunta al `id` del menú.
- [ ] El menú abierto empuja el contenido (no se superpone).
- [ ] Al pulsar una entrada, navega (y el menú aparece cerrado en la página nueva).
- [ ] Funciona con teclado (`Tab` + `Enter` o espacio).
- [ ] Sé explicar qué es una media query y por qué uso `max-width` (o `min-width`) y no un número en el JS.
- [ ] Cierre común hecho.

### Paso 6 · Pie de página
- **Objetivo:** el pie común con tres burbujas: LinkedIn, GitHub y el correo.
- **Conceptos:** `display: flex` con `flex-wrap`, `justify-content`, `padding-bottom` para dejar sitio a elementos flotantes.
- **Qué hago:** vista parcial `_Pie.cshtml` con los tres enlaces (los de LinkedIn y GitHub con icono y en pestaña nueva, el correo con `mailto:`). Direcciones provisionales. Fondo translúcido. Margen inferior grande para que los controles flotantes del lienzo (P2, paso 17) no tapen nada.
- **Pista:** un enlace con `target="_blank"` necesita `rel="noopener noreferrer"`. Busca por qué.
- **Cómo sé que funciona:** el pie aparece abajo en todas las páginas; en móvil las burbujas se centran y, si no caben, pasan a la línea siguiente.

**✅ Checklist**
- [ ] El pie es una vista parcial y sale en todas las páginas.
- [ ] LinkedIn y GitHub se abren en pestaña nueva con `rel="noopener noreferrer"`.
- [ ] Los enlaces con solo icono tienen `aria-label`.
- [ ] El correo es un enlace `mailto:`.
- [ ] Con poco contenido, el pie queda abajo del todo, no pegado a mitad de pantalla.
- [ ] En móvil se centran y saltan de línea si no caben.
- [ ] Hay espacio inferior suficiente para los controles flotantes del lienzo.
- [ ] Cierre común hecho.

---

## FASE B — Las pantallas

### Paso 7 · Acciones, vistas y paletas (esqueleto de navegación)
- **Objetivo:** que las cuatro entradas del menú lleven a una página real, aunque aún esté casi vacía.
- **Conceptos:** acciones de controlador, convención de nombres de vistas, `ViewData["Title"]`, `ViewData["Paleta"]`.
- **Qué hago:** crear en `HomeController` las acciones `Proyectos`, `Experiencia` y `Contacto`, y sus vistas con solo un `<h1>`. En cada vista declarar título y paleta con `ViewData`. Comprobar que `Error404` hace lo mismo.
- **Pista:** ¿qué pasa si una acción no tiene su vista? Provoca el error a propósito y léelo.
- **Cómo sé que funciona:** desde el menú llego a las cuatro páginas, el título de la pestaña cambia en cada una y la entrada actual se marca.

**✅ Checklist**
- [ ] Las tres acciones nuevas existen y devuelven su vista.
- [ ] Cada vista declara `ViewData["Title"]` y `ViewData["Paleta"]`.
- [ ] El `<title>` de la pestaña muestra el de cada página (cierra un TO-DO de `p0-to-do.md`).
- [ ] Cada página tiene **un solo** `<h1>`.
- [ ] La 404 sigue funcionando al escribir una ruta que no existe.
- [ ] Sé explicar cómo elige MVC la vista a partir del nombre de la acción.
- [ ] Cierre común hecho.

### Paso 8 · Inicio: la tarjeta centrada
- **Objetivo:** Inicio como en el wireframe: un único panel centrado con icono, nombre, titular, frase, bio y los botones de LinkedIn y GitHub.
- **Conceptos:** `max-width` + `margin: 0 auto`, `text-align: center`, jerarquía de encabezados, tamaños de fuente que cambian en móvil.
- **Qué hago:** reescribir `Index.cshtml` con una `<section class="panel tarjeta">` y sus partes. Los botones en una fila con `flex-wrap`. Adaptar tamaños de título y avatar en móvil.
- **Decisión:** la sección «Proyectos» que hoy vive en `Index.cshtml` se mueve a la página Proyectos (paso 9). El texto actual de bio es mío y más largo que el provisional del wireframe: ¿lo mantengo, lo acorto? (Es contenido, no layout: decido yo.)
- **Cómo sé que funciona:** se parece al wireframe de Inicio en escritorio y móvil, y el panel nunca se ve apretado contra los bordes.

**✅ Checklist**
- [ ] La tarjeta está centrada y no pasa de unos 560 px de ancho en escritorio.
- [ ] El nombre es el **único** `<h1>` de la página.
- [ ] Los botones se abren en pestaña nueva y están en una fila que salta de línea si hace falta.
- [ ] En móvil bajan los tamaños del título y del avatar.
- [ ] No quedan estilos en línea (`style=...`) ni la sección de proyectos antigua.
- [ ] Hay espacio debajo de la tarjeta para que se vea el lienzo y el pie no la pise.
- [ ] Cierre común hecho.

### Paso 9 · Proyectos: cabecera y rejilla de fichas
- **Objetivo:** el panel de título con los botones de filtro (solo su aspecto) y debajo una rejilla de fichas: 2 columnas en escritorio, 1 en móvil.
- **Conceptos:** `display: grid`, `grid-template-columns`, `gap`, `repeat()` y `fr`, cambiar de columnas con media query, tarjeta como flex en columna (`margin-top: auto` para empujar el botón abajo).
- **Qué hago:** vista `Proyectos.cshtml` con `@model List<Proyecto>` (pidiendo los datos al servicio, como ya hace `Index`). Panel de cabecera con `<h1>`, frase y una fila de botones de filtro sin comportamiento todavía. Debajo, un `<article class="panel ficha">` por proyecto con título, año, descripción, etiquetas de stack y botón «Ver repositorio».
- **Decisión:** el modelo `Proyecto` hoy tiene título, descripción y tecnologías, pero la ficha del wireframe también pide **año** y **repositorio**. Opciones: (a) ampliar `Proyecto` en `Core` y el servicio (sale del alcance «solo capa Web»); (b) maquetar la ficha con los campos que hay y dejar año y repo para después. Recomiendo (b) para no mezclar aprendizajes, pero la decisión es mía y la dejo anotada.
- **Pista:** una ficha con descripción corta y otra con descripción larga: ¿cómo consigo que los botones queden alineados abajo? Busca `margin-top: auto` dentro de un contenedor flex en columna.
- **Cómo sé que funciona:** dos columnas en escritorio, una en móvil, todas las fichas de una fila con la misma altura y los botones alineados.

**✅ Checklist**
- [ ] La rejilla usa `display: grid` con `gap`, no márgenes sueltos en cada ficha.
- [ ] Hay 2 columnas en escritorio y 1 en móvil, cambiadas con una media query.
- [ ] Cada ficha es un `<article>` y tiene su título como `<h2>` (el `<h1>` es el de la página).
- [ ] Las etiquetas de stack son una lista (`<ul>`) con aspecto de píldora.
- [ ] Los botones de «Ver repositorio» quedan alineados abajo en cada ficha.
- [ ] Los botones de filtro son `<button type="button">` en un grupo con `role="group"` y `aria-label`, y siempre hay uno marcado (`aria-pressed`).
- [ ] Con la lista vacía se ve un mensaje, no un hueco en blanco.
- [ ] Decisión sobre `Proyecto` (año y repositorio) anotada: _______
- [ ] Sé explicar la diferencia entre Grid y Flexbox y por qué uso Grid aquí.
- [ ] Cierre común hecho.

### Paso 10 · Experiencia y formación: líneas de tiempo
- **Objetivo:** dos listas verticales con una línea y un punto por entrada, y el botón de descargar el CV.
- **Conceptos:** `position: relative` en el padre y `absolute` en los hijos, pseudo-elementos `::before`, listas semánticas (`<ul>`/`<li>`), reutilizar un trozo de vista con un bucle.
- **Qué hago:** vista `Experiencia.cshtml`: panel de cabecera con `<h1>`, frase y botón «Descargar CV» (la acción `DescargarCurriculum` ya existe). Dos títulos «Experiencia» y «Formación», cada uno con su lista. La línea y el punto se dibujan con `::before` (nada de imágenes). Los datos, por ahora, escritos a mano en la vista o en una lista local.
- **Pista:** la línea es un pseudo-elemento absoluto del `<ul>`; los puntos, pseudo-elementos absolutos de cada `<li>`. Dibuja primero un esquema en papel con las posiciones.
- **Cómo sé que funciona:** se ven dos líneas de tiempo con sus puntos alineados con las tarjetas, en escritorio y en móvil (donde el hueco de la línea es más estrecho).

**✅ Checklist**
- [ ] La línea y los puntos son CSS (`::before`), no imágenes.
- [ ] Los puntos quedan centrados con la línea.
- [ ] Hay un solo `<h1>`, las secciones son `<h2>` y cada entrada, `<h3>`.
- [ ] Las entradas van de la más reciente a la más antigua.
- [ ] La ubicación es opcional: una entrada sin ella no deja un hueco raro.
- [ ] «Descargar CV» descarga el PDF y no pinta (usa `data-no-splash` cuando exista, paso 17 de P2).
- [ ] En móvil se reduce el espacio de la línea.
- [ ] Sé explicar por qué el padre necesita `position: relative` para que `absolute` funcione bien en los hijos.
- [ ] Cierre común hecho.

### Paso 11 · Contacto: maquetación del formulario
- **Objetivo:** el panel de título y el panel con el formulario (nombre, correo, mensaje, botón Enviar), centrado en una columna estrecha. **Solo aspecto**: validación y envío van en otro plan.
- **Conceptos:** `<form>`, `<label for>` + `id`, `<input type="email">`, `<textarea>`, `autocomplete`, `width: 100%`, campo oculto para el señuelo (aspecto, no lógica).
- **Qué hago:** vista `Contacto.cshtml`. Columna de unos 640 px. Cada campo es una etiqueta + control + hueco para el mensaje de error (aún vacío). Botón primario «Enviar». El señuelo se oculta con CSS **sin** `display: none` (los bots lo saltarían): fuera de pantalla y excluido del tabulador.
- **Pista:** ¿qué pasa al pulsar la etiqueta «Nombre» si el `for` no coincide con el `id` del `input`? Pruébalo.
- **Cómo sé que funciona:** el formulario se ve como en el wireframe, pulsar una etiqueta lleva el foco a su campo, y con `Tab` recorro nombre → correo → mensaje → Enviar sin pasar por el señuelo.

**✅ Checklist**
- [ ] Cada `<label>` está enlazado a su control (`for` = `id`).
- [ ] Los campos ocupan todo el ancho de la columna y el `textarea` solo se redimensiona en vertical.
- [ ] El correo es `type="email"` y los campos llevan `autocomplete` adecuado.
- [ ] Hay un hueco reservado bajo cada campo para el error (aunque esté vacío).
- [ ] El señuelo no se ve, no recibe el foco con `Tab` y lleva `aria-hidden="true"`.
- [ ] El correo, LinkedIn y GitHub **no** se repiten en esta página (están en el pie).
- [ ] El botón tiene un aspecto distinto cuando está desactivado (`:disabled`).
- [ ] Cierre común hecho.

### Paso 12 · Página 404
- **Objetivo:** la página de ruta no encontrada, con un 404 grande, un mensaje y un botón para volver a Inicio.
- **Conceptos:** centrar un bloque, tamaños relativos de fuente, no marcar ninguna entrada del menú.
- **Qué hago:** diseñar `Error404.cshtml`: código «404» grande, `<h1>` con el mensaje, un párrafo y el botón «Volver al inicio». Paleta de lilas.
- **Cómo sé que funciona:** al escribir `/loquesea` aparece esta página dentro del layout común, con la cabecera sin ninguna entrada marcada.

**✅ Checklist**
- [ ] Al escribir una ruta inexistente aparece mi 404, no la de por defecto.
- [ ] Va dentro del layout (cabecera, pie y lienzo con su paleta).
- [ ] Ninguna entrada del menú está marcada.
- [ ] El botón lleva a Inicio.
- [ ] El código HTTP de la respuesta sigue siendo 404 (pestaña Network).
- [ ] En móvil bajan los tamaños.
- [ ] Cierre común hecho.

---

## FASE C — Responsive y pulido

### Paso 13 · Repaso responsive de todas las pantallas
- **Objetivo:** que ninguna página se rompa en ningún ancho, no solo en los dos del wireframe.
- **Conceptos:** probar a anchos intermedios, unidades relativas, `min-width: 0` en hijos de grid/flex, desbordamientos.
- **Qué hago:** con el modo dispositivo de F12 recorro cada página arrastrando el ancho de 1400 px hasta 320 px. Anoto lo que se rompe (texto que desborda, botones que se montan, imágenes que se salen) y lo arreglo.
- **Cómo sé que funciona:** no hay scroll horizontal en ningún ancho de 320 px en adelante, y todo es legible.

**✅ Checklist**
- [ ] Sin scroll horizontal a 320, 375, 768, 900 (justo en el corte) y 1200 px.
- [ ] Justo en el punto de corte, la cabecera no se ve a medias.
- [ ] Las etiquetas de stack largas saltan de línea en vez de desbordar.
- [ ] Las fichas con título largo no deforman la rejilla.
- [ ] Probado también en horizontal (móvil girado).
- [ ] Cierre común hecho.

### Paso 14 · Estructura accesible
- **Objetivo:** que la web se entienda con un lector de pantalla y con teclado.
- **Conceptos:** *landmarks* (`<header>`, `<nav>`, `<main>`, `<footer>`), jerarquía de encabezados, enlace «saltar al contenido», contraste de color, foco visible.
- **Qué hago:** revisar que cada página tiene un único `<main>` y un único `<h1>`, y que los encabezados no se saltan niveles. Añadir un enlace «Saltar al contenido» al principio. Medir el contraste del texto sobre los paneles con el selector de color de DevTools (mínimo 4,5:1).
- **Cómo sé que funciona:** recorro cada página solo con `Tab`; Lighthouse (DevTools) da accesibilidad ≥ 90.

**✅ Checklist**
- [ ] Cada página tiene un `<header>`, un `<nav>` con `aria-label`, un `<main>` y un `<footer>`.
- [ ] Un solo `<h1>` por página y sin saltos de nivel (`h1` → `h2` → `h3`).
- [ ] Hay un enlace «Saltar al contenido» que aparece al recibir el foco.
- [ ] El foco se ve en todos los elementos interactivos.
- [ ] El contraste del texto cumple 4,5:1 sobre los paneles con cualquier mancha detrás.
- [ ] Los elementos con solo icono tienen `aria-label`.
- [ ] Lighthouse accesibilidad ≥ 90 en cada página.
- [ ] Cierre común hecho.

### Paso 15 · Revisión final contra los wireframes
- **Objetivo:** cerrar el plan comparando lo construido con lo definido.
- **Qué hago:** abro cada pantalla del wireframe y la mía una al lado de la otra (escritorio y móvil). Repaso los criterios de aceptación de EP-01, EP-03, EP-04, EP-05 y EP-06 en `docs/references/user-stories.md` que afectan **solo a la distribución**, y marco cuáles cumplo. Las diferencias que sean decisión mía las anoto con su porqué. Actualizo `README.md` y `docs/definicion/stack-tecnologico.md` si he tomado alguna decisión nueva (por ejemplo, CSS propio en lugar de Bootstrap).

**✅ Checklist**
- [ ] Comparadas las 6 pantallas en escritorio y móvil.
- [ ] Revisados los criterios de aceptación de distribución de EP-01, 03, 04, 05 y 06.
- [ ] Las diferencias con el wireframe están anotadas, cada una con su motivo.
- [ ] Anotados al menos 3 puntos para mejorar y qué concepto nuevo necesito para cada uno.
- [ ] `README.md` y `stack-tecnologico.md` revisados.
- [ ] Sé explicar con mis palabras cada fichero de estilos y cada vista parcial.
- [ ] Cierre común hecho.

---

## Buenas prácticas que trabajo en este plan

- **DRY:** lo que se repite va al layout o a una vista parcial; lo que se repite en CSS, a una clase o a una variable.
- **HTML semántico:** el elemento correcto para cada cosa (`<nav>`, `<article>`, `<ul>`, `<button>`), no `<div>` para todo.
- **Mobile-first o desktop-first, pero consciente:** decido el enfoque en el paso 1 y lo mantengo en todo el CSS.
- **Nombres de clases que dicen qué es, no cómo se ve** (`.ficha`, no `.caja-azul`).
- **CSS sin estilos en línea** y con valores repetidos en variables.
- **Accesibilidad desde el principio**, no al final: foco, `aria-*` y contraste forman parte de cada paso.
- **Commits pequeños:** uno por paso, como mínimo.

## Ideas extra (cuando todo lo anterior esté hecho)

- Modo oscuro con su interruptor (los tokens `[data-theme="dark"]` del wireframe ya dan la pista).
- Filtro de proyectos funcionando.
- Validación y envío del formulario de contacto, con honeypot y límite diario.
- Datos de experiencia y formación leídos desde un servicio, como los proyectos.
- Respetar `prefers-reduced-motion` y `prefers-color-scheme`.
