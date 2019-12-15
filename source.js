const grid = document.querySelector('.grid')
const counter = document.querySelector('.counter')
const timer = document.querySelector('.timer')

let rows = []
let cells = []
let bombCells = []
let numbers = []

let covered = 0
let correct = 0
let flags = 0

let playing = false
let seconds = 0

let smiley = document.querySelector('#smiley')

let mouseTarget;

function reset() {
  grid.innerHTML = ''
  rows = []
  cells = []
  bombCells = []
  numbers = []
  openCells = []
  correct = 0
  i = 0
}

function init() {
  reset()
  createGrid(16, 16);
  placeBombs(cells);
  placeNumbers(bombCells);

  covered = cells.length - bombCells.length
  flags = bombCells.length
  counter.innerText = flags

  timer.innerText = seconds
}

let start;

function timeElapsed() {
  seconds++
  timer.innerText = seconds
}

function stop() {
  clearInterval(start)
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
  playing = false
  stop()
  alert('BOOM, game over!')

  return
}

function reveal(node) {
  if(node === null) return;
  const empty = node.classList.value === 'cell'
  //If the cell is empty, then break
  if(empty) return;
  if([...node.classList].includes('flag')) return


  // if node is flagged

  //Uncover the cell
  node.classList.remove('covered')
  covered--
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

function check(node) {
  // console.log('checking!')
  let neighbors = findAdjacent(node)
  console.log('neighbors: ', neighbors)
  // neighbors = neighbors.filter(neighbor => neighbor !== node && neighbor.classList.value !== "cell")
  neighbors = neighbors.filter(neighbor => !!neighbor)
  console.log('neighbors after filter: ', neighbors)
  neighbors.forEach(neighbor => {
    if(neighbor.innerText === 'X' && !([...neighbor.classList].includes('flag'))) {
      console.log('Boom', neighbor)
      gameOver()
    } else if([...neighbor.classList].includes('flag')){
      return
    } else {

      neighbor.dataset.number === "1" ? neighbor.style = "color: blue" : null
      neighbor.dataset.number === "2" ? neighbor.style = "color: darkorange" : null
      neighbor.dataset.number === "3" ? neighbor.style = "color: red" : null
      neighbor.dataset.number === "4" ? neighbor.style = "color: maroon" : null
      neighbor.dataset.number === "5" ? neighbor.style = "color: green" : null

      // neighbor.classList.remove('covered')
      reveal(neighbor)

    }
  })
  console.log(neighbors)

}

function handleClick(e){
  if(e.target.classList.value === "cell covered" || e.target.classList.value === "cell") {
    // console.log('you have clicked a covered cell')
    let cell = e.target
    if(playing === false) {
      playing = true
      start = setInterval(timeElapsed, 1000)
    }
    reveal(cell)
    checkWin()

  }
}

function plantFlag(e, node) {
    console.log('Which event is this? ', e, 'which node is this ', node)
    let cell;
    if(!node) {
      e.preventDefault()
      cell = e.target
    } else if(node) {
      cell = node
    }
    console.log(cell)

    if(cell.classList.value === "cell covered flag") {
      cell.classList.remove('flag')
      if(cell.innerText === 'X') {
        correct--
      }
    } else if(cell.classList.value === "cell covered") {
      cell.classList.add('flag')
      if(cell.innerText === 'X') {
        correct++
        checkWin()
      }
      // console.log('RIGHT CLICK - this is the innerText: ', cell.innerText, cell.classList.value)
    }
    return false;
}

function checkWin() {
  if(correct === bombCells.length && covered === 0) {
    alert('Yay! You Win!')
    playing = false
    stop()
    smiley.src = "./public/minesweeper faces cool.png"
  }
}

function handleCheck(e) {
  // console.log("e.code: ", e.code, "e.target: ", e.target, "mouseTarget: ", mouseTarget)
  if(e.code === "Space") {
      // console.log(mouseTarget)
      if(mouseTarget.classList.value === "cell covered" || mouseTarget.classList.value === "cell covered flag") {
        plantFlag(e, mouseTarget)
      } else if(mouseTarget.classList.value === "cell") {
          check(mouseTarget)
      }
  }
}

init()





document.addEventListener('click', handleClick)

//drops flags
document.addEventListener('contextmenu', plantFlag, false);

//Determines mouseTarget on mouseover
document.addEventListener('mouseover', function(e) {
  // console.log('mouse event: ', e, 'mouse target: ', e.target)
  mouseTarget = e.target
})

document.addEventListener('keydown', handleCheck)

smiley.addEventListener('click', init)
