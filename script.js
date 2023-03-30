//button constants
const bttnnew = document.querySelector("button.new");
const bttnclear = document.querySelector("button.clear");
const bttncolor = document.querySelector("button.color");

//document constants
const container = document.querySelector("div#container");
const sheet = document.styleSheets[0];
const rules = sheet.cssRules ?? sheet.rules;

//configurable pixel size for canvas
const MAX_SIZE = 960;

//variable which holds all drawable grid divs
let grid = document.querySelectorAll("div.grid");

//Get / Set size
function getSize() {
    let getNum = -1;

    while (getNum < 1 || getNum > 100) {
        getNum = parseInt(prompt("Enter a number between 1 and 100"));
        if (!Number.isFinite(getNum)) {
            getNum = -1;
        }
    }

    return getNum;z
}

function setSize(size) {
    let square = MAX_SIZE / size;
    rules[1].style.minHeight = `${square}px`;
    rules[1].style.minWidth = `${square}px`;
}

//Check / Set color
function isColor(strColor) {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== '';
}

function setColors(newColors) {
    let color1 = 'green';
    let color2 = 'black';

    if (newColors) {
        do {
            color1 = prompt("Pick a background color!");
            color2 = prompt("Pick a pen color!");
        } while (!(isColor(color1) && isColor(color2)));
    }

    rules[1].style.background = `${color1}`;
    rules[2].style.background = `${color2}`;
}

//clear all elements from the container div before creating new div grid
function remGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    grid = document.querySelectorAll("div.grid");
}

//Create the grid and attach correct properties and event listeners
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
    grid = document.querySelectorAll("div.grid");
    //Might be a better way to do this - maybe have a single click event for #container, then either check bubbling for div.grid above it, 
    //or check mouse position within the #container against .grid
    //This could allow for many many many more divs to be placed without lagging due to the event listeners
    for (const key in grid) {
        if (Object.hasOwnProperty.call(grid, key)) {
            const e = grid[key];
            e.addEventListener("mouseover", (event) => { startDraw(event); });
        }
    }

    
}

//callback function to add draw class to div
function startDraw(event) {
    event.target.classList.add("draw");
}

//on Clear, remove all draw classes from the grid
function endDraw(event) {
    for (const key in grid) {
        if (Object.hasOwnProperty.call(grid, key)) {
            const e = grid[key];
            e.classList.remove("draw");
        }
    }
}

bttnclear.addEventListener("click", (event) => { endDraw(event); });
bttnnew.addEventListener("click", (event) => { setGrid(getSize(), true); });
bttncolor.addEventListener("click", (event) => { setColors(true); });

setGrid(16, false);