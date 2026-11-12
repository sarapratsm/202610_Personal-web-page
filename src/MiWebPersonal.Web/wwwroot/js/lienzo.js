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

function corregirDimensiones(lienzo, ctx) {
    mostrarDimensiones(lienzo);
    const dpr = window.devicePixelRatio || 1;
    /*Porque asignar lienzo.width o lienzo.height reinicia el canvas por completo, aunque le des el mismo valor que ya tenía.*/
    /*Por este motivo, al corregir las dimensiones, se borra el contenido del canvas.*/
    lienzo.width = lienzo.clientWidth * dpr;
    lienzo.height = lienzo.clientHeight * dpr;
    ctx.scale(dpr, dpr);
    mostrarDimensiones(lienzo);
}

function mostrarDimensiones(lienzo) {
    if (DEBUG) {
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
}

function crearPuntos(cx, cy, radio, n) {
    //Usaremos coordenadas polares para crear los puntos de manera uniforme en un círculo.
    //x = cx + cos(ángulo) * radio
    //y = cy + sin(ángulo) * radio
    const variacion = 25; //Variación aleatoria del radio para que no queden todos los puntos exactamente en el mismo círculo.
    let puntos = []
    for (let i = 0; i < n; i++) {
        const angle = (i / n) * 2 * Math.PI;
        puntos[i] = {
            x: cx + Math.cos(angle) * (radio + random(variacion)),
            y: cy + Math.sin(angle) * (radio + random(variacion))
        };
    }
    return puntos;
}


function pintarLienzo(ctx, x, y) {
    /*
    Documentación: 
    https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes 
    https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D
    */
    const radio = 40;
    const numeroPuntos = 10;
    const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)} / 0.5)`; //https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/Events
    const puntos = crearPuntos(x, y, radio, numeroPuntos);

    ctx.fillStyle = rndCol;
    ctx.beginPath();
    for (let i = 0; i < puntos.length; i++) {
        const punto = puntos[i];
        ctx.lineTo(punto.x, punto.y);
    }
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
    corregirDimensiones(lienzo, ctx)

    //Añadir listener de pintura
    //obj.addEventListener("evento", (evento) => { ... })
    document.addEventListener("pointerdown", (evento) => {
        //Ponemos el listener en el documento para que cualquier click en cualquier lugar del documento active trigger del listener
        //Además cambiamos click por pointerdown para que se sienta más fluido.
        const rect = lienzo.getBoundingClientRect();
        const x = evento.clientX - rect.left;
        const y = evento.clientY - rect.top;
        //ClientX es la posición del click en la ventana *visible* del navegador (!=pageX, que es todo el html incluyendo scroll), y rect.left es la posición del lienzo en la ventana del navegador. Restando obtenemos la posición relativa al lienzo.

        pintarLienzo(ctx, x, y);
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