const canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d");



let isDrawing = false;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const startDraw = () => {
    isDrawing = true;
    ctx.beginPath();
}

const stopDraw = () => {
    isDrawing = false;
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse
    ctx.stroke(); // drawing/filling line with colour
}

//const clearCanvasButton = document.getElementsByClassName("clear-canvas");
//clearCanvasButton.addEventListener("click", pressClearCanvas);

/*function pressClearCanvas(){
    //const contex = canvas.getContext("2d");
    contex.clearRect(0, 0, canvas.width, canvas.height);
}*/

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousemove", drawing);