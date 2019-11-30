const grid = document.querySelector('.grid')
let rows = []
let cells = []
let bombCells = []


//Creates grid on minesweeper board and assigns all "cells" to cell array
function createGrid(x, y) {
  for(let i = 0; i < x; i++) {
    row = `<div class="row"></div>`.trim();
    grid.innerHTML += row
    for(let j = 0; j < y; j++) {
      let rows = document.querySelectorAll('.row')
      let lastRow = rows[rows.length - 1]
      let cell = `<div class="cell covered" data-x="${j + 1}" data-y="${y - (i)}"></div>`.trim();
      lastRow.innerHTML += cell
    }
  }
  rows = [...grid.children]
  rows.forEach(row => {
    let children = [...row.children]
    cells.push(children)
  })
  cells = cells.flat()
  console.log('INIT CELLS', cells)
}

//Takes in the array of cells and adds bombs
function placeBombs(cells) {
  console.log('ALL CELLS IN placeBOMBS: ', cells)
  // console.log('this is a cell: ', cells[randomI], 'this is its index: ', cells.indexOf(cells[randomI]))
  let i = 0
  while (i < 40) {
    let randomI = (Math.floor(Math.random() * 256))
    cell = cells[randomI]
    console.log('INDIVIDUAL CELLS', cell)

    if(cell.innerHTML !== `<div class="bomb none">X</div>`){
      console.log(cell)
      cell.innerHTML = `<div class="bomb none">X</div>`
      i++
      console.log(i)
    }
    bombCells = [...document.querySelectorAll('.bomb.none')]
    console.log('BOMB CELLS', bombCells)
  }
}

//Function finds all adjacent cells (including diagonal) to any given cell
function findAdjacent(cell) {
  if(cell.innerHTML !== `<div class="bomb none">X</div>`){
    let adjacentCells = []
    let adjacent;
    for(let i = -1; i < 2; i++){
      for(let j = -1; j < 2; j++) {
        console.log('i: ', i, 'j: ', j)
        adjacent = document.querySelector(`[data-x="${cell.dataset.x - i}"][data-y="${cell.dataset.y - j}"]`)
          console.log('this is adjacent: ', adjacent)
          adjacentCells.push(adjacent)
      }
    }

    adjacentCells.forEach(cell => {
      if(cell !== null && cell.innerHTML !== `<div class="bomb none">X</div>`){
        cell.classList.remove('covered')
      }
    })

    return adjacentCells;
  }


}
function placeNumbers(cells) {
  adjacent = document.querySelectorAll(`[data-x="${(11 - 1) }"]`)
  let testy = document.querySelector('[data-x="11"][data-y="5"]')
}

//Handles click event. 1. Ends game if bomb. 2. Reveals tiles besides bombs if not a bomb
function handleClick(e) {
  console.log(e.target.classList.value)
  let cell = e.target
  if(cell.classList.value === 'cell covered') {
    findAdjacent(cell)
    if(cell.innerHTML === `<div class="bomb none">X</div>`){
          cell.innerHTML === `<div class="bomb none">X</div>` ? cell.innerHTML = `<div class="bomb">X</div>` : null
        alert('BOOM! GAME OVER')
    }


  }
}



createGrid(16, 16);
placeBombs(cells);

document.addEventListener('click', )




// document.addEventListener('click', reveal)

// document.addEventListener('keypress', function(e){
//   console.log(e)
//   if(e.code === 'Space') {
//     cells = document.querySelectorAll('.cell')
//     cells.forEach(cell => {
//       cell.classList.remove('covered')
//       e.target.innerHTML === `<div class="bomb none">X</div>` ? cell.innerHTML = `<div class="bomb">X</div>` : null
//     })
//   }
// })

// placeBombs();

// cells.forEach(cell => {
//   cell.addEventListener('click', function(){
//     console.log('this cell: ', this, this)
//     cell.classList.remove('covered')
//   })
// })
