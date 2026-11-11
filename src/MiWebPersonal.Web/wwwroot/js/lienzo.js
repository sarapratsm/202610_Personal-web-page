//Script de lienzo de la página web personal. Cada click crea pintura en el liezo :3
//=========CONSTANTES=========
const DEBUG = true;

//=========FUNCIONES AUXILIARES=========
function log(message) {
    if (DEBUG)
        console.log("[DEBUG]", message);
}

function corregirDimensiones(lienzo) {
    mostrarDimensiones(lienzo)
    lienzo.width = lienzo.clientWidth;
    lienzo.height = lienzo.clientHeight;
    mostrarDimensiones(lienzo)
}

function mostrarDimensiones(lienzo) {
    if (DEBUG) {
        //No utilitzo la funció log aqui per no haver de comprovar el if(DEBUG) a cada linea...
        console.log("------------")
        console.log("[DEBUG] Dimensiones del lienzo: ", lienzo.width, 'x', lienzo.height); //La cuadrícula interna de píxeles sobre la que se dibuja ~=resolucion de la foto
        console.log("[DEBUG] Ratio: ", lienzo.width / lienzo.height)
        console.log("[DEBUG] Dimensiones del lienzo cliente (cómo lo dibuja el navegador): ", lienzo.clientWidth, 'x', lienzo.clientHeight); //Cuánto ocupa en pantalla, en píxeles CSS ~=marco de la foto
        console.log("[DEBUG] Ratio: ", lienzo.clientWidth / lienzo.clientHeight)
        //Las dos ratios deben coincidir para que las formas no salgan deformadas.
        console.log("[DEBUG] Dimensiones de la página: ", document.documentElement.clientWidth
            , 'x', document.documentElement.clientHeight);
        console.log("[DEBUG] DevicePixelRatio:", window.devicePixelRatio) //Cuántos píxeles físicos de tu monitor hay por cada píxel CSS
        console.log("------------");
    }
}

function pintarLienzo(ctx, x, y) {
    const radio = 100
    /*
    Documentación: 
    https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes 
    https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D
    */

    /*
    arc(x, y, radius, startAngle, endAngle, counterclockwise)
    ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise)
    */

    ctx.fillStyle = "rgba(255, 203, 217, 0.5)";
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, 2 * Math.PI);
    ctx.fill();
}


//=========FUNCIÓN PRINCIPAL=========
function iniciarLienzo() {
    //Buscar y validar 
    const lienzo = document.getElementById("canvas-lienzo");
    if (!lienzo) {
        console.error("No se ha encontrado el lienzo")
        return null;
    }
    const ctx = lienzo.getContext("2d");
    if (!ctx) {
        console.error("No se ha encontrado el contexto")
        return null;
    }
    //Ajustar
    corregirDimensiones(lienzo)

    //Añadir listener de pintura
    lienzo.addEventListener("click", (evento) => {
        const rect = lienzo.getBoundingClientRect();
        const x = evento.clientX - rect.left;
        const y = evento.clientY - rect.top;

        pintarLienzo(ctx, x, y);
        log(" Estic pintant!! :3")
    })

    //Añadir listener de resize
    window.addEventListener("resize", (evento) => {
        corregirDimensiones(lienzo);
    })


    //Devolver
    //return ctx; //Nadie lo necesita ya
}

//=========LINEA DE ARRANQUE=========
iniciarLienzo();