//Script de lienzo de la página web personal. Cada click crea pintura en el liezo :3

const lienzo = document.getElementById("canvas-lienzo");

function iniciarLienzo() {
    if (lienzo == null) {
        console.error("[DEBUG] No se ha encontrado el lienzo: ", lienzo);
        return;
    } else {
        console.log("[DEBUG] Se ha encontrado el lienzo: ", lienzo);
    }

    const lienzoCtx = lienzo.getContext("2d");

    if (lienzoCtx == null || lienzoCtx == undefined) {
        console.error("[DEBUG] No se ha encontrado el contexto del lienzo: ", lienzoCtx);
        return;
    } else {
        console.log("[DEBUG] Se ha encontrado el contexto del lienzo: ", lienzoCtx);
        return lienzoCtx;
    }
}

function pintarLienzo(ctx, x, y) {
    const radio = 5
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

const lienzoCtx = iniciarLienzo();
if (lienzo && lienzoCtx) {
    lienzo.addEventListener("click", (evento) => {
        const rect = lienzo.getBoundingClientRect();
        const x = evento.clientX - rect.left;
        const y = evento.clientY - rect.top;

        pintarLienzo(lienzoCtx, x, y);
        console.log("[DEBUG] Estic pintant!! :3")
    })
}
