let canvas = document.querySelector("canvas");
let tool = canvas.getContext("2d");
let mouseDown = false;
let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElement = document.querySelector(".pencil-width");
let eraserWidthElement = document.querySelector(".eraser-width");
let penColor = "crimson";
// let eraserColor = "white";
let penWidth = pencilWidthElement.value;
let eraserWidth = eraserWidthElement.value;
let download = document.querySelector(".download");
let undoRedoTracker = []; //data 
let track = 0; //represent which action wev need to perform from tracker array
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

// mousedown => start new path 
// mousemove => path fill graphics

canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    let data = {
        x: e.clientX,
        y: e.clientY,
    }
    socket.emit("beginPath", data);
});

canvas.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        let data = {
            x: e.clientX,
            y: e.clientY,
            color: eraserFlag ? eraserColor : penColor,
            width: eraserFlag ? eraserWidth : penWidth,
        }
        socket.emit("drawStroke", data);
    }
});

canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;
});

function undoRedoCanvas(trackObject) {
    track = trackObject.trackValue;
    undoRedoTracker = trackObject.undoRedoTracker;
    let url = undoRedoTracker[track];
    let img = new Image();
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
};

redo.addEventListener("click", (e)=>{
    if(track < undoRedoTracker.length-1) track++;
    //track action
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    socket.emit("redoUndo", data);
})

undo.addEventListener("click", (e)=>{
    if(track > 0) track--; 
    // track action
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    socket.emit("redoUndo", data)
})

function beginPath(strokeObject) {
    tool.beginPath();
    tool.moveTo(strokeObject.x, strokeObject.y);
};

function drawStroke(strokeObject) {
    tool.strokeStyle = strokeObject.color;
    tool.lineWidth = strokeObject.width;
    tool.lineTo(strokeObject.x, strokeObject.y);
    tool.stroke();
};

pencilColor.forEach((colorElement) => {
    colorElement.addEventListener("click", (e) => {
        let color = colorElement.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
    })
});

pencilWidthElement.addEventListener("change", (e) => {
    penWidth = pencilWidthElement.value;
    tool.lineWidth = penWidth;
});

eraserWidthElement.addEventListener("change", (e) => {
    eraserWidth = eraserWidthElement.value;
    tool.lineWidth = eraserWidth;
});

eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    } else {
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
});

download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
});


socket.on("beginPath", (data) => {
    beginPath(data);
})

socket.on("drawStroke", (data) => {
    drawStroke(data);
})

socket.on("redoUndo", (data)=>{
    undoRedoCanvas(data);
})