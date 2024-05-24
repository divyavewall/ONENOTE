let optionsContainer = document.querySelector(".options-container");
let toolsContainer = document.querySelector('.tools-container');
let pencilToolContainer = document.querySelector(".pencil-tool-container");
let eraserToolContainer = document.querySelector(".eraser-tool-container");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".stickynote");
let upload = document.querySelector(".upload");

let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;

optionsContainer.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;
    if (optionsFlag) openTools();
    else closeTools();
});

function openTools() {
    let iconElement = optionsContainer.children[0];
    iconElement.classList.remove("fa-times");
    iconElement.classList.add("fa-bars");
    toolsContainer.style.display = "flex";
}
function closeTools() {
    let iconElement = optionsContainer.children[0];
    iconElement.classList.remove("fa-bars");
    iconElement.classList.add("fa-times");
    toolsContainer.style.display = "none";
    pencilToolContainer.style.display = "none";
    eraserToolContainer.style.display = "none";
}

pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;
    if (pencilFlag) {
        pencilToolContainer.style.display = "block";
    } else {
        pencilToolContainer.style.display = "none"
    }
});

eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;
    if (eraserFlag) {
        eraserToolContainer.style.display = "flex";
    } else {
        eraserToolContainer.style.display = "none"
    }
});

function createSticky(stickyTemplateHTML){
    let stickyContainer = document.createElement("div");
        stickyContainer.setAttribute("class", "sticky-container");
        stickyContainer.innerHTML = stickyTemplateHTML;
        document.body.appendChild(stickyContainer);
        let minimize = stickyContainer.querySelector(".minimize");
        let remove = stickyContainer.querySelector(".remove");
        noteActions(minimize, remove, stickyContainer);
    
        stickyContainer.onmousedown = function(event) {
          dragAndDrop(stickyContainer, event);
        };
          
        stickyContainer.ondragstart = function() {
            return false;
        };
}
//----------------------------upload-------------------------------------
upload.addEventListener("click", (e)=>{
    //open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let stickyTemplateHTML = `
        <div class="header-container">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="note-container">
        <img class= "upload-img" src="${url}"/>
        </div>
        `
        createSticky(stickyTemplateHTML);

    })
})
//-------------------------------Sticky-notes----------------------------------------------
sticky.addEventListener("click", (e)=>{
    let stickyTemplateHTML = `
        <div class="header-container">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-container">
            <textarea>Type here</textarea>
        </div>
    `;
    createSticky(stickyTemplateHTML);
})


function noteActions(minimize, remove, stickyContainer) {
    remove.addEventListener("click", (e) => {
        stickyContainer.remove();
    })

    minimize.addEventListener("click", (e) => {
        let noteContainer = stickyContainer.querySelector(".note-container")
        let display = getComputedStyle(noteContainer).getPropertyValue("display");

        if(display === "none") noteContainer.style.display = "block";
        else noteContainer.style.display = "none"
    })
};

function dragAndDrop(element, event){
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zindex = 1000;
    
    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY){
        element.style.left = pageX - shiftX +'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event){
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    element.onmouseup = function(){
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    }
}

let eraserColor = "white";
function darkmode() {
    let body = document.body;
    body.classList.toggle("dark-mode");
    if (body.classList.contains('dark-mode')) {
        document.getElementById("btn").src = 'images/moon.png';
        eraserColor = "black"
    } else {
        document.getElementById("btn").src = 'images/sun.png';
        eraserColor = "white"
    }
}

