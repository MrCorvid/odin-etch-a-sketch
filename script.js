const bttnnew = document.querySelector("button.new");
const bttnclear = document.querySelector("button.clear");
const bttncolor = document.querySelector("button.color");

const container = document.querySelector("div#container");
const sheet = document.styleSheets[0];
const rules = sheet.cssRules ?? sheet.rules;

const MAX_SIZE = 960;

let grid = document.querySelectorAll("div.grid");

function remGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    grid = document.querySelectorAll("div.grid");
}

function remSheets() {
    for (var i=0; i<rules.length; i++) {
        sheet.deleteRule (i);
    }  
}

function isColor(strColor) {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== '';
}

function setColors(newColors){
    let color1 = 'green';
    let color2 = 'black';


    if(newColors){
        do {
            color1 = prompt("Pick a background color!");
            color2 = prompt("Pick a pen color!");
        } while (!(isColor(color1) && isColor(color2)));
    }

    rules[1].style.background = `${color1}`;
    rules[2].style.background = `${color2}`;
}

function setSize(size){

    let square = MAX_SIZE/size;
    grid = document.querySelectorAll("div.grid");
    rules[1].style.minHeight = `${square}px`;
    rules[1].style.minWidth = `${square}px`;
}

function setGrid(size, newColors) {

    remGrid();

    setColors(newColors);

    for (let i = 0; i < size; i++) {
        let e = document.createElement('div');
        e.classList.add("gridContainer");
        container.appendChild(e);
        for (let j = 0; j < size; j++) {
            let n = document.createElement('div');
            n.classList.add("grid");
            n.innerHTML = ``;
            e.appendChild(n);
        }
    }

    setSize(size);
    
    for (const key in grid) {
        if (Object.hasOwnProperty.call(grid, key)) {
            const e = grid[key];
            e.addEventListener("mouseover", (event)=>{startDraw(event);});
        }
    }
}

bttnclear.addEventListener("click", (event) => {endDraw(event);});
bttnnew.addEventListener("click", (event) => {setGrid(getSize(), true);});
bttncolor.addEventListener("click", (event) => {setColors(true);});


function startDraw(event){
    event.target.classList.add("draw");
}

function endDraw(event){
    for (const key in grid) {
        if (Object.hasOwnProperty.call(grid, key)) {
            const e = grid[key];
            e.classList.remove("draw");
        }
    }
}

function getSize(){
    let getNum = -1;

    while (getNum < 1 || getNum >= 100){
        getNum = parseInt(prompt("Enter a number between 1 and 100"));
        if (!Number.isFinite(getNum)) {
            getNum = -1;
        }
    }

    return getNum;
}

setGrid(16, false);
//what