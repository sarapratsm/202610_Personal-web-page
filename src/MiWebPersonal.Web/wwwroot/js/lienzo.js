//Script de lienzo de la página web personal. Cada click crea pintura en el liezo :3
//=========CONSTANTES=========
const DEBUG = true;

//=========FUNCIONES AUXILIARES=========
function log(message) {
    if (DEBUG)
        console.log("[DEBUG]", message);
}

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}

function corregirDimensiones(lienzo) {
    mostrarDimensiones(lienzo);
    /*Porque asignar lienzo.width o lienzo.height reinicia el canvas por completo, aunque le des el mismo valor que ya tenía.*/
    /*Por este motivo, al corregir las dimensiones, se borra el contenido del canvas.*/
    lienzo.width = lienzo.clientWidth;
    lienzo.height = lienzo.clientHeight;
    mostrarDimensiones(lienzo);
}

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

function pintarLienzo(ctx, x, y) {
    const radio = 25;
    let rndCol = `rgb(${random(255)} ${random(255)} ${random(255)} / 0.5)`; //https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/Events
    /*
    Documentación: 
    https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes 
    https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D
    */

    ctx.fillStyle = rndCol;
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, 2 * Math.PI);
    ctx.fill();
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
    corregirDimensiones(lienzo)

    //Añadir listener de pintura
    //obj.addEventListener("evento", (evento) => { ... })
    lienzo.addEventListener("click", (evento) => {
        const rect = lienzo.getBoundingClientRect();
        const x = evento.clientX - rect.left;
        const y = evento.clientY - rect.top;

        pintarLienzo(ctx, x, y);
        log(" Estic pintant!! :3");
    })

    //Añadir listener de resize
    //obj.addEventListener("evento", (evento) => { ... })
    window.addEventListener("resize", () => corregirDimensiones(lienzo));

    //obj.addEventListener("evento", funcion) no funciona aquí porque no necesitamos que la funcion se ejecute inmediatamente, sino que se ejecute cuando ocurra el evento (listener).


    //Devolver
    //Ya no necesita devolver nada 
}

//=========LINEA DE ARRANQUE=========
iniciarLienzo();