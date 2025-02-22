const canvas = document.querySelector("canvas");
const toolButtons = document.querySelectorAll(".tool");
const ctx = canvas.getContext("2d");


let prevMouseX, prevMouseY, snapshot;
let isDrawing = false;
let selectedTool = "brush";
let brushWidth = 5;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const drawRectangle = (e) => {
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
    
}

const stopDraw = () => {
    isDrawing = false;
    
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);


    if(selectedTool ===  "brush"){
        ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse
        ctx.stroke(); // drawing/filling line with colour
    }else if(selectedTool === "rectangle"){
        drawRectangle(e);
    }
}

toolButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        button.classList.add("active");
        selectedTool = button.id;
        console.log(button.id);
    })
})

//const clearCanvasButton = document.getElementsByClassName("clear-canvas");
//clearCanvasButton.addEventListener("click", pressClearCanvas);

/*function pressClearCanvas(){
    //const contex = canvas.getContext("2d");
    contex.clearRect(0, 0, canvas.width, canvas.height);
}*/

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousemove", drawing);