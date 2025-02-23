const canvas = document.querySelector("canvas");
const toolButtons = document.querySelectorAll(".tool");
const fillColor = document.querySelector("#fill-color");
const sizeSlider = document.querySelector("#size-slider");
const colorButtons = document.querySelectorAll(".colors .option");
const colorPicker = document.querySelector("#colour-picker");
const clearCanvas = document.querySelector(".clear-canvas");
const ctx = canvas.getContext("2d");


let prevMouseX, prevMouseY, snapshot;
let isDrawing = false;
let selectedTool = "brush";
let brushWidth = 5;
let selectedColor = "#000";

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const drawRectangle = (e) => {

    if (!fillColor.checked){
       return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath();
    //let radius = ((e.offsetX - prevMouseX));
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(e.offsetX, e.offsetY, radius, 0, 2 * Math.PI);
    
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    //ctx.lineTo(prevMouseX, prevMouseY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;

    // copy canvas data and passing snapshot value which avoids dragging the image
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
    
}

const stopDraw = () => {
    isDrawing = false;
    
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);


    if(selectedTool ===  "brush"  || selectedTool === "eraser"){
        ctx.strokeStyle = selectedTool === "eraser" ? "#EDE8DC" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse
        ctx.stroke(); // drawing/filling line with colour
    }else if(selectedTool === "rectangle"){
        drawRectangle(e);
    }else if(selectedTool === "circle"){
        drawCircle(e);
    }else if(selectedTool === "triangle"){
        drawTriangle(e);
    }
}

toolButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        button.classList.add("active");
        selectedTool = button.id;
        console.log(button.id);
    })
});

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);

colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        button.classList.add("selected");
        selectedColor = window.getComputedStyle(button).getPropertyValue("background-color");
    });

});

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    //colorPicker.parentElement.click();
    selectedColor = colorPicker.value;
    //colorPicker.select();
});


clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
});
//const clearCanvasButton = document.getElementsByClassName("clear-canvas");
//clearCanvasButton.addEventListener("click", pressClearCanvas);

/*function pressClearCanvas(){
    //const contex = canvas.getContext("2d");
    contex.clearRect(0, 0, canvas.width, canvas.height);
}*/

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousemove", drawing);