const grid = document.querySelector('.grid')

let rows = []
let cells = []
let bombCells = []
let numbers = []

let correct = 0
// let openCells = []
// let i = 0

let smiley = document.querySelector('#smiley')

function reset() {
  grid.innerHTML = ''
  rows = []
  cells = []
  bombCells = []
  numbers = []
  openCells = []
  i = 0
}

function init() {
  reset()
  createGrid(16, 16);
  placeBombs(cells);
  placeNumbers(bombCells);
}

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
  if(cell === null || cell === undefined) return
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
    }
  })

  // console.log(numbers)
}

function gameOver() {
  bombCells.forEach(bombCell => {
    bombCell.classList.remove('covered')
    bombCell.style.background = "red"
  })
  alert('BOOM, game over!')
  return
}

function reveal(node) {
  if(node === null) return;
  const empty = node.classList.value === 'cell'
  //If the cell is empty, then break
  if(empty) return;

  //Uncover the cell
  node.classList.remove('covered')
  let nodeNumber = parseInt(node.dataset.number)
  //If the cell is a bomb, then end the game
  if(node.innerText === 'X') {
    gameOver()
    //if the cell is numbered, then break
  } else if(nodeNumber > 0) {
      console.log('We are now clicking on a numbered node: ', node, nodeNumber)
      node.dataset.number === "1" ? node.style = "color: blue" : null
      node.dataset.number === "2" ? node.style = "color: darkorange" : null
      node.dataset.number === "3" ? node.style = "color: red" : null
      node.dataset.number === "4" ? node.style = "color: maroon" : null
      node.dataset.number === "5" ? node.style = "color: green" : null
      return
    //If the cell is empty...
  } else if (nodeNumber === 0) {
      console.log('Vacant cell: ', node)
      let neighbors = findAdjacent(node)
      neighbors = neighbors.filter(neighbor => neighbor !== node)
      neighbors.forEach(neighbor => {
        reveal(neighbor)
      })
      console.log('neighbors: ', neighbors)

  }
}

function handleClick(e){
  if(e.target.classList.value === "cell covered" || e.target.classList.value === "cell") {
    // console.log('you have clicked a covered cell')
    let cell = e.target
    reveal(cell)
  }
}

function checkWin() {
  if(correct === bombCells.length) {
    alert('Yay! You Win!')
  }
}

init()





document.addEventListener('click', handleClick)

//drops flags
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    if(e.target.classList.value === "cell covered flag") {
      let cell = e.target
      cell.classList.remove('flag')
      if(cell.innerText = 'X') {
        correct--
      }
    } else if(e.target.classList.value === "cell covered") {
      let cell = e.target
      cell.classList.add('flag')
      if(cell.innerText = 'X') {
        correct++
        checkWin()
      }
      console.log('RIGHT CLICK - this is the innerText: ', cell.innerText, cell.classList.value)
      // cell.style = "background-color: red"
    }
    return false;
}, false);

smiley.addEventListener('click', init)
