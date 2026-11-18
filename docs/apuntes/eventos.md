# Eventos del navegador
Guía completa en: [Introducción a los eventos de MDN Web Docs](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/Events).

## Tipos principales de eventos

- De ratón (Mouse): `click`, `dblclick`, `mousedown`, `mouseup`, `mouseover`, `mouseout`.
- De teclado (Keyboard): `keydown`, `keyup`.
- De formulario: `submit` (al enviar un formulario), `focus`, `blur`.
- De carga y ventana: `DOMContentLoaded` (cuando el HTML y el DOM están listos), `load`, `resize`, `scroll`.
- De multimedia: `play`, `pause`, `ended`.

## Declarar un listener
Hay tres formas de escribirlo, con efectos muy distintos:
```js
function saludar(nombre) { console.log("Hola", nombre); }

boton.addEventListener("click", saludar);                 // 1
boton.addEventListener("click", saludar("Ana"));          // 2
boton.addEventListener("click", () => saludar("Ana"));    // 3
```

1. Pasa la función misma (una referencia). El navegador la llamará cuando haya un clic, pasándole el evento como primer argumento.
2. La llama ya, al registrar el listener, y registra lo que devuelva (`undefined`). Esto es lo que se evita.
3. Crea una función nueva que, cuando llegue el evento, llama a `saludar("Ana")`.

## Eventos de puntero (Pointer events)
Un único conjunto de eventos que sirve para ratón, dedo y lápiz digital. Se prefieren a `click` + `touchstart` porque con los dos a la vez, en un móvil, un solo toque puede disparar el código dos veces.

- `pointerdown`: se pulsa (botón del ratón, dedo o lápiz).
- `pointerup`: se suelta.
- `pointermove`: el puntero se mueve.
- `pointercancel`: el navegador interrumpe el gesto (por ejemplo, para hacer scroll).

```js
document.addEventListener("pointerdown", (evento) => {
    console.log(evento.pointerType, evento.clientX, evento.clientY);
});
```

Propiedades útiles del objeto `evento`:
- `pointerType`: `"mouse"`, `"touch"` o `"pen"`.
- `button`: qué botón del ratón se ha usado (`0` es el principal, `1` el central y `2` el derecho).
- `clientX` / `clientY`: posición en la parte *visible* de la ventana. Con `pageX` / `pageY` se mide sobre toda la página, scroll incluido.
- `target`: el elemento donde ha ocurrido el evento. Si hay que saber si está *dentro* de otro, se usa `target.closest("selector")`.

Más información (en inglés):
- [Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [Evento pointerdown](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerdown_event)
- [Element.closest()](https://developer.mozilla.org/es/docs/Web/API/Element/closest) (en español)
