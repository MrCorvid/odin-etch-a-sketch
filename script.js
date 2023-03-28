const container = document.querySelector("div#container");
const sheet = document.styleSheets[0];
const rules = sheet.cssRules ?? sheet.rules;

const MAX_SIZE = 960;
//    min-width: 50px;
//    min-height: 50px;

let grid = document.querySelectorAll("div.grid");


function setGrid(size) {
    square = MAX_SIZE/size;
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
    grid = document.querySelectorAll("div.grid");
    sheet.insertRule(`div.grid{min-width: ${square}px; min-height: ${square}px; }`,0);
    
    for (const key in grid) {
        if (Object.hasOwnProperty.call(grid, key)) {
            const e = grid[key];
            e.addEventListener("mouseover", (event)=>{startDraw(event);});
            e.addEventListener("mouseout", (event)=>{endDraw(event);});
        }
    }
}


function startDraw(event){
    event.target.classList.add("draw");
}

function endDraw(event){
    //event.target.classList.remove("draw");
}



setGrid(16);