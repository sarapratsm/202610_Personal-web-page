//Script de lienzo de la página web personal. Cada click crea pintura en el lienzo :3
//=========CONSTANTES=========
const DEBUG = true;

//Constantes objetivas (no configurables, son las que son)
const BOTON_PRINCIPAL = 0; //El botón principal del ratón es el izquierdo, el secundario es el derecho y el central es la rueda. https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
const MAX_TONO_HSLA = 360; //Valor máximo de tono en el modelo de color HSL. https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl

//Constantes de configuración
const NUMERO_PUNTOS = 10; //Número de puntos que se crean para formar la curva. Cuantos más puntos, más suave será la curva, pero más costoso será dibujarla.

const RADIO_MINIMO = 20;
const RADIO_MAXIMO = 40;
const VARIACION_RADIO_MINIMA = 10;
const VARIACION_RADIO_MAXIMA = 50;
const VARIACION_TONO = 8;
const VARIACION_SATURACION = 5;
const VARIACION_LUMINOSIDAD = 5;
const OPACIDAD = 0.5; //Opacidad de la pintura. Cuanto más baja, más transparente será la pintura y más se mezclará con los colores de fondo y con otras pinturas.

const GRUESO_CONTORNO = 3; //Grosor del contorno de la pintura. Cuanto más alto, más grueso será el contorno y más se notará la forma de la pintura.
const VARIACION_GRUESO_CONTORNO = 2.5; //Variación aleatoria del grosor del contorno de la pintura. Cuanto más alto, más variará el grosor del contorno y más irregular será la forma de la pintura.
const OPACIDAD_CONTORNO = OPACIDAD / 3;
const OSCURECER_CONTORNO = 15;

const COMPOSICION = 'multiply'; //Modo de composición de la pintura. https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

// Paleta de colores
const PALETAS = {
    inicio: { nombre: "rosas y melocotón", colores: [{ h: 350, s: 62, l: 74 }, { h: 15, s: 70, l: 76 }, { h: 330, s: 45, l: 78 }, { h: 28, s: 72, l: 78 }] },
    proyectos: { nombre: "azules y lavanda", colores: [{ h: 205, s: 58, l: 72 }, { h: 225, s: 48, l: 76 }, { h: 190, s: 45, l: 70 }, { h: 255, s: 42, l: 78 }] },
    experiencia: { nombre: "verdes salvia", colores: [{ h: 140, s: 32, l: 70 }, { h: 100, s: 30, l: 72 }, { h: 165, s: 34, l: 68 }, { h: 65, s: 42, l: 76 }] },
    contacto: { nombre: "melocotón y mantequilla", colores: [{ h: 28, s: 78, l: 76 }, { h: 45, s: 72, l: 74 }, { h: 12, s: 62, l: 78 }, { h: 350, s: 52, l: 80 }] },
    error404: { nombre: "lilas", colores: [{ h: 275, s: 42, l: 76 }, { h: 300, s: 36, l: 78 }, { h: 250, s: 38, l: 74 }] }
};


//=========FUNCIONES AUXILIARES=========
/**
 * Muestra un mensaje de depuración en la consola si DEBUG es true.
 * @param {string} message - El mensaje a mostrar en la consola.
 */
function log(message) {
    if (DEBUG)
        console.log("[DEBUG]", message);
}

/**
 * Genera un número aleatorio entero entre el valor mínimo y máximo definidos
 * @param {number} min - El valor mínimo (incluido)
 * @param {number} max - El valor máximo (incluido)
 * @returns {number} Un número aleatorio entero en el rango [min, max]
 */
function enteroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Genera un número aleatorio decimal entre el valor mínimo y máximo definidos
 * @param {number} min - El valor mínimo (incluido)
 * @param {number} max - El valor máximo (nunca se alcanza del todo, porque Math.random() no devuelve 1)
 * @returns {number} Un número aleatorio decimal en el rango [min, max)
 */
function decimalAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}


/**
 * Corrige las dimensiones del lienzo para que coincidan con las dimensiones del cliente y ajusta la escala del contexto de dibujo.
 * @param {HTMLCanvasElement} lienzo - El elemento canvas que se quiere corregir.
 * @param {CanvasRenderingContext2D} ctx - El contexto de dibujo del lienzo.
 */
function corregirDimensiones(lienzo, ctx) {
    mostrarDimensiones(lienzo);
    const dpr = window.devicePixelRatio || 1; /*El devicePixelRatio es la relación entre los píxeles físicos del dispositivo y los píxeles CSS. Por ejemplo, en un monitor Retina, un píxel CSS puede corresponder a varios píxeles físicos, lo que hace que las imágenes se vean más nítidas.*/
    /*Porque asignar lienzo.width o lienzo.height reinicia el canvas por completo, aunque le des el mismo valor que ya tenía.*/
    /*Por este motivo, al corregir las dimensiones, se borra el contenido del canvas.*/
    lienzo.width = lienzo.clientWidth * dpr;
    lienzo.height = lienzo.clientHeight * dpr;
    ctx.scale(dpr, dpr);
    mostrarDimensiones(lienzo);
}

/**
 * Muestra las dimensiones del lienzo y del cliente en la consola si DEBUG es true.
 * @param {HTMLCanvasElement} lienzo - El elemento canvas del que se quieren mostrar las dimensiones.
 */
function mostrarDimensiones(lienzo) {
    if (DEBUG) {
        //No utilitzo la funció log aqui per no haver de comprovar el if(DEBUG) a cada linea...
        console.log("------------")
        console.log("[DEBUG] Dimensiones del lienzo: ", lienzo.width, 'x', lienzo.height); //La cuadrícula interna de píxeles sobre la que se dibuja ~=resolucion de la foto
        console.log("[DEBUG] Ratio: ", lienzo.width / lienzo.height);
        console.log("[DEBUG] Dimensiones del lienzo cliente (cómo lo dibuja el navegador): ", lienzo.clientWidth, 'x', lienzo.clientHeight); //Cuánto ocupa en pantalla, en píxeles CSS ~=marco de la foto
        console.log("[DEBUG] Ratio: ", lienzo.clientWidth / lienzo.clientHeight);
        //Las dos ratios deben coincidir para que las formas no salgan deformadas.
        console.log("[DEBUG] Dimensiones de la página: ", document.documentElement.clientWidth
            , 'x', document.documentElement.clientHeight);
        console.log("[DEBUG] DevicePixelRatio:", window.devicePixelRatio) //Cuántos píxeles físicos de tu monitor hay por cada píxel CSS
        console.log("------------");
    }

}

/**
 * Crea un array de puntos distribuidos uniformemente en un círculo con centro (cx, cy) y radio especificado.
 * @param {number} cx - La coordenada x del centro del círculo.
 * @param {number} cy - La coordenada y del centro del círculo.
 * @param {number} radio - El radio del círculo.
 * @param {number} n - El número de puntos a crear.
 */
function crearPuntos(cx, cy, radio, n) {
    //Usaremos coordenadas polares para crear los puntos de manera uniforme en un círculo.
    //x = cx + cos(ángulo) * radio
    //y = cy + sin(ángulo) * radio
    let puntos = []
    for (let i = 0; i < n; i++) {
        const angle = (i / n) * 2 * Math.PI;
        puntos[i] = {
            x: cx + Math.cos(angle) * (radio + enteroAleatorio(VARIACION_RADIO_MINIMA, VARIACION_RADIO_MAXIMA)),
            y: cy + Math.sin(angle) * (radio + enteroAleatorio(VARIACION_RADIO_MINIMA, VARIACION_RADIO_MAXIMA))
        };
    }
    return puntos;
}

/**
 * Calcula el punto medio entre dos puntos.
 * @param {{x: number, y: number}} a - Primer punto.
 * @param {{x: number, y: number}} b - Segundo punto.
 * @returns {{x: number, y: number}} El punto situado justo a mitad de camino entre a y b.
 */
function puntoMedio(a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/**
 * Traza en el contexto del canvas una forma cerrada y suave usando los puntos dados como puntos de control.
 * La curva no pasa por los puntos: pasa por los puntos medios entre cada par de puntos consecutivos y se dobla hacia cada punto, así que la forma queda algo por dentro de ellos.
 * @param {CanvasRenderingContext2D} ctx - El contexto del canvas donde se dibujará la curva.
 * @param {Array} puntos - Un array de objetos con propiedades x e y que hacen de puntos de control de la curva (no son puntos por los que pase).
 */
function trazarCurva(ctx, puntos) {
    if (!puntos || puntos.length === 0) return;

    //Empezamos en el punto medio entre el último punto y el primero: es donde terminará la última curva del bucle, así la forma se cierra sin ningún pico.
    const ultimo = puntos[puntos.length - 1];
    const inicio = puntoMedio(ultimo, puntos[0]);

    ctx.beginPath();
    ctx.moveTo(inicio.x, inicio.y);

    for (let i = 0; i < puntos.length; i++) {
        const pActual = puntos[i];
        const pSiguiente = puntos[(i + 1) % puntos.length]; //El siguiente punto, o el primero si estamos en el último punto.
        const pMedio = puntoMedio(pActual, pSiguiente);

        ctx.quadraticCurveTo(pActual.x, pActual.y, pMedio.x, pMedio.y); //Curva cuadrática hasta el punto medio, usando el punto actual como control.
    }
    ctx.closePath();
}

/**
 * Crea un gradiente radial en el contexto del canvas y lo asigna como relleno.
 * El gradiente va de un círculo interior (x, y, 0) a uno exterior (x, y, radio): mismo centro, y el color pasa de opaco en el centro a transparente en el borde.
 * @param {CanvasRenderingContext2D} ctx - El contexto del canvas donde se creará el gradiente.
 * @param {number} x - La coordenada x del centro del gradiente.
 * @param {number} y - La coordenada y del centro del gradiente.
 * @param {number} radio - El radio exterior del gradiente: debe cubrir toda la mancha, porque fuera de él se repite el último color (transparente).
 * @param {number} h - El tono del color (0-360).
 * @param {number} s - La saturación del color, en porcentaje.
 * @param {number} l - La luminosidad del color, en porcentaje.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient/addColorStop
 */
function aplicarGradiente(ctx, x, y, radio, h, s, l) {
    const color = `hsla(${h}, ${s}%, ${l}%, ${OPACIDAD})`;
    const colorTransparente = `hsla(${h}, ${s}%, ${l}%, 0)`;
    const gradiente = ctx.createRadialGradient(x, y, 0, x, y, radio);
    gradiente.addColorStop(0, color);
    gradiente.addColorStop(1, colorTransparente);
    ctx.fillStyle = gradiente;
}

/**
 * Pinta el relleno de la forma
 * @param {CanvasRenderingContext2D} ctx - El contexto del canvas
 */
function pintarRelleno(ctx) {
    ctx.fill();
}

/**
 * Pinta el contorno de la forma. Reutiliza el camino ya trazado con trazarCurva, así que debe llamarse después de ella.
 * El contorno es más oscuro que el relleno (OSCURECER_CONTORNO), poco opaco y de grosor aleatorio.
 * @param {CanvasRenderingContext2D} ctx - El contexto del canvas.
 * @param {number} h - El tono del color (0-360).
 * @param {number} s - La saturación del color, en porcentaje.
 * @param {number} l - La luminosidad del color de la mancha, en porcentaje (antes de oscurecerla para el contorno).
 */
function pintarContorno(ctx, h, s, l) {
    ctx.lineWidth = decimalAleatorio(GRUESO_CONTORNO - VARIACION_GRUESO_CONTORNO, GRUESO_CONTORNO + VARIACION_GRUESO_CONTORNO)
    const colorContorno = `hsla(${h}, ${s}%, ${l-OSCURECER_CONTORNO}%, ${OPACIDAD_CONTORNO})`;
    ctx.strokeStyle = colorContorno;
    ctx.stroke();
}


/**
 * Pinta un lienzo con una forma geométrica en las coordenadas especificadas.
 * @param {CanvasRenderingContext2D} ctx - El contexto del canvas.
 * @param {number} x - La coordenada x del centro de la forma.
 * @param {number} y - La coordenada y del centro de la forma.
 * @param {array} paleta - Paleta de colores sobre la que se variará un color 
 * @see https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
 * @see https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D
 * @see https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/Events
 */
function pintarLienzo(ctx, x, y, paleta) {
    const radio = enteroAleatorio(RADIO_MINIMO, RADIO_MAXIMO);
    const color = paleta[enteroAleatorio(0, paleta.length - 1)];
    const variacionTono = enteroAleatorio(-VARIACION_TONO, VARIACION_TONO);
    const variacionSaturacion = enteroAleatorio(-VARIACION_SATURACION, VARIACION_SATURACION);
    const variacionLuminosidad = enteroAleatorio(-VARIACION_LUMINOSIDAD, VARIACION_LUMINOSIDAD);
    const h = (color.h + variacionTono + MAX_TONO_HSLA) % MAX_TONO_HSLA;
    const s = color.s + variacionSaturacion;
    const l = color.l + variacionLuminosidad;

    const puntos = crearPuntos(x, y, radio, NUMERO_PUNTOS);
    ctx.globalCompositeOperation = COMPOSICION; //Para que los colores se mezclen al superponerse
    trazarCurva(ctx, puntos);
    aplicarGradiente(ctx, x, y, RADIO_MAXIMO + VARIACION_RADIO_MAXIMA, h, s, l);

    pintarRelleno(ctx);
    pintarContorno(ctx, h, s, l);


}


//=========FUNCIÓN PRINCIPAL=========

function iniciarLienzo() {
    //Buscar y validar 
    const lienzo = document.getElementById("canvas-lienzo");
    if (!lienzo) {
        console.error("No se ha encontrado el lienzo");
        return;
    }
    const ctx = lienzo.getContext("2d");
    if (!ctx) {
        console.error("No se ha encontrado el contexto");
        return;
    }
    //Ajustar
    corregirDimensiones(lienzo, ctx)

    //Añadir listener de pintura
    document.addEventListener("pointerdown", (evento) => {         //Ponemos el listener en el documento para que el click en cualquier lugar del documento active trigger del listener
        if (evento.button !== BOTON_PRINCIPAL) return; //Solo el botón principal activa el event listener. https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button 
        if (evento.target.closest('button') || evento.target.closest('select')) return; //Si el click es en un botón o selector, no pintamos. https://developer.mozilla.org/en-US/docs/Web/API/Element/closest'))
        const rect = lienzo.getBoundingClientRect();
        const x = evento.clientX - rect.left;
        const y = evento.clientY - rect.top;
        //ClientX es la posición del click en la ventana *visible* del navegador (!=pageX, que es todo el html incluyendo scroll), y rect.left es la posición del lienzo en la ventana del navegador. Restando obtenemos la posición relativa al lienzo.
        pintarLienzo(ctx, x, y, PALETAS.inicio.colores); //En el futuro cada página tendrá su propia paleta de colores.
        log(" Estic pintant!! :3");

    })

    //Añadir listener de resize
    //obj.addEventListener("evento", (evento) => { ... })
    window.addEventListener("resize", () => corregirDimensiones(lienzo, ctx));


    //Devolver
    //Ya no necesita devolver nada 
}

//=========LINEA DE ARRANQUE=========
iniciarLienzo();

