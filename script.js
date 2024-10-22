const canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d");

let isDrawing = false;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const startDraw = () => {
    isDrawing = true;
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse
    ctx.stroke(); // drawing/filling line with colour
}

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing);