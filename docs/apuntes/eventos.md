# Eventos del navegador
Guia completa en: [Introducción a los eventos de MDN Web Docs.](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/Events)

## Tipos principales de eventos

- De ratón (Mouse): `click`, `dblclick`, `mousedown`, `mouseup`, `mouseover`, `mouseout`.
- De teclado (Keyboard): `keydown`, `keyup`.
- De formulario: submit (al enviar un formulario), `focus`, `blur`.
- De carga y ventana: DOMContentLoaded (cuando el HTML y el DOM están listos), `load`, `resize`, `scroll`.
- De multimedia: `play`, `pause`, `ended`

## Declarar un listener
Hay tres formas de escribirlo, con efectos muy distintos
```
function saludar(nombre) { console.log("Hola", nombre); }

boton.addEventListener("click", saludar);                 // 1
boton.addEventListener("click", saludar("Ana"));          // 2
boton.addEventListener("click", () => saludar("Ana"));    // 3
```

1. Pasa la función misma (una referencia). El navegador la llamará cuando haya un clic, pasándole el evento como primer argumento.
2. La llama ya, al registrar el listener, y registra lo que devuelva (undefined). Esto es lo que se evita.
3. Crea una función nueva que, cuando llegue el evento, llama a saludar("Ana").