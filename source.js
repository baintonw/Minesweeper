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
  // if(cell.innerText !== 'X'){
    let adjacentCells = []
    let adjacent;
    for(let i = -1; i < 2; i++){
      for(let j = -1; j < 2; j++) {
        // console.log('i: ', i, 'j: ', j)
        adjacent = document.querySelector(`[data-x="${cell.dataset.x - i}"][data-y="${cell.dataset.y - j}"]`)
          // console.log('this is adjacent: ', adjacent)
          adjacentCells.push(adjacent)
      }
    }
    // console.log('adjacent cells', adjacentCells)
    return adjacentCells;
    // }

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
  cell.classList.remove('covered')

  if(cell === null || (parseInt(cell.dataset.number)) > 0) {
    return
  } else if(cell.dataset.number === '0') {
    console.log('Hey now!')
    let adjacentCells = findAdjacent(cell)
    let newCell;

    for(let i = 0; i < adjacentCells.length; i++) {
      newCell = adjacentCells[i]
      if(newCell.dataset.number === '0' && newCell.classList.value === "cell covered" && newCell !== null) {
        console.log('this is a zero value cell!', newCell)
        reveal(newCell)
        //recur
      }
    }
  }
     return
}


function handleClick(e){
  // console.log(e.target.classList.value)
  let cell = e.target
  if(cell.classList.value === 'cell' || cell.classList.value === 'cell covered') {
    reveal(cell)
    if(cell.innerText === 'X'){
          cell.innerText === 'X' ? cell.innerText = 'X' : null
        alert('BOOM! GAME OVER')
    }
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
