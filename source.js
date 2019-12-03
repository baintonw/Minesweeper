const grid = document.querySelector('.grid')
// const rows = [...document.querySelectorAll('.row')]
// const cells = [...document.querySelectorAll('.cell')]
let rows = []
let cells = []
let bombCells = []
let numbers = []


function createGrid(x, y) {
  let id = 0
  for(let i = 0; i < x; i++) {
    row = `<div class="row"></div>`.trim();
    grid.innerHTML += row
    for(let j = 0; j < y; j++) {
      let rows = document.querySelectorAll('.row')
      let lastRow = rows[rows.length - 1]
      let cell = `<div id="${id++}" class="cell covered" data-x="${j + 1}" data-y="${y - (i)}" data-number="0"></div>`.trim();

      lastRow.innerHTML += cell
    }
  }
  rows = [...grid.children]
  rows.forEach(row => {
    let children = [...row.children]
    cells.push(children)
  })
  cells = cells.flat()
  // console.log('INIT CELLS', cells)
}


function placeBombs(cells) {
  // console.log('ALL CELLS IN placeBOMBS: ', cells)
  // console.log('this is a cell: ', cells[randomI], 'this is its index: ', cells.indexOf(cells[randomI]))
  let i = 0
  while (i < 40) {
    let randomI = (Math.floor(Math.random() * 256))
    cell = cells[randomI]
    // console.log('INDIVIDUAL CELLS', cell)

    if(cell.innerText !== 'X'){
      // console.log(cell)
      cell.innerText = 'X'
      i++
      // console.log(i)
    }

    bombCells = cells.filter(cell => cell.innerText === 'X')
  }
}

function findAdjacent(cell) {
    let adjacentCells = []
    let adjacent;
    for(let i = -1; i < 2; i++){
      for(let j = -1; j < 2; j++) {
        adjacent = document.querySelector(`[data-x="${cell.dataset.x - i}"][data-y="${cell.dataset.y - j}"]`)
          adjacentCells.push(adjacent)
      }
    }
    return adjacentCells;
}

//place numbers find all tiles that are adjacent to bombs that are not bombs themselves
function placeNumbers(bombCells) {
  bombCells.forEach(bomb => {
    let adjacent = findAdjacent(bomb)
    // console.log('ADJ IN NUMBERS', adjacent)
    let notBombs = adjacent.filter(cell => cell !== null && cell.innerText !== 'X')
    numbers.push(notBombs)
  })
  numbers = numbers.flat()
  for(let i = 0; i < numbers.length; i++) {
    // console.log(numbers[i].id)
    numbers[i].dataset.number++
    // console.log(numbers[i])
  }
  numbers.forEach(cell => {
    if(cell.dataset.number > 0) {
      cell.innerText = cell.dataset.number
      cell.dataset.number === "1" ? cell.style = "color: blue" : null
      cell.dataset.number === "2" ? cell.style = "color: darkorange" : null
      cell.dataset.number === "3" ? cell.style = "color: red" : null
      cell.dataset.number === "4" ? cell.style = "color: maroon" : null
      cell.dataset.number === "5" ? cell.style = "color: green" : null



    }
  })

  // console.log(numbers)
}

function reveal(cell) {
  console.log(cell)
  cell.classList.remove('covered')


}

// if (mineCount==0) {
//    //Reveal all adjacent cells as they do not have a mine
//    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
//      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
//        //Recursive Call
//        if (grid.rows[i].cells[j].innerHTML=="") clickCell(grid.rows[i].cells[j]);
//      }
//    }
// }

function handleClick(e){
  let cell = e.target
  // console.log(cell)
  if(cell.innerText === 'X') {
    cell.classList.remove('covered')
    alert('BOOM, game over')
  } else {
    reveal(cell)
  }
}

createGrid(16, 16);
placeBombs(cells);
placeNumbers(bombCells);

document.addEventListener('click', handleClick)




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
