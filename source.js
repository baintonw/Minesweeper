//board
const grid = document.querySelector('.grid')
const counter = document.querySelector('.counter')
const timer = document.querySelector('.timer')

//counter
const ones = document.querySelector('#ones')
const tens = document.querySelector('#tens')
const hundreds = document.querySelector('#hundreds')

//timer
const timerSeconds = document.querySelector('#seconds')
const timerTens = document.querySelector('#tens-seconds')
const timerMinutes = document.querySelector('#minutes')





//grid bombs and numbers
let rows = []
let cells = []
let bombCells = []
let numbers = []

//flags and correct guesses
let covered = 0
let correct = 0
let flags = 40




let playing = false
//timer
let seconds = 0

//smiley face : )
let smiley = document.querySelector('#smiley')

let mouseTarget;

function reset() {
  console.log('reset!')
  playing = false;
  stop();
  grid.innerHTML = '';
  rows = [];
  cells = [];
  bombCells = [];
  numbers = [];
  openCells = [];
  correct = 0;
  i = 0;
  flags = 40;

}

function init() {
  reset()
  createGrid(16, 16);
  placeBombs(cells);
  placeNumbers(bombCells);

  covered = cells.length - bombCells.length
  count(flags)
  time(seconds)
}

let start;

function timeElapsed() {
  seconds++
  time(seconds)
}

function stop() {
  seconds = 0;
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

    if(cell.innerText !== 'X'){
      cell.innerText = 'X'
      i++
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
    let notBombs = adjacent.filter(cell => cell !== null && cell.innerText !== 'X')
    numbers.push(notBombs)
  })
  numbers = numbers.flat()
  for(let i = 0; i < numbers.length; i++) {
    numbers[i].dataset.number++
  }
  numbers.forEach(cell => {
    if(cell.dataset.number > 0) {
      cell.innerText = cell.dataset.number
    }
  })

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
      // console.log('We are now clicking on a numbered node: ', node, nodeNumber)
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
      // console.log('neighbors: ', neighbors)

  }
}

//check if cells are bombs or flags

function check(node) {
  let neighbors = findAdjacent(node)
  neighbors = neighbors.filter(neighbor => !!neighbor)
  let hasFlags = neighbors.filter(neighbor => [...neighbor.classList].includes('flag'))
  if(hasFlags.length === 0) return;
  if(parseInt(node.innerText) !== hasFlags.length) return;

  neighbors.forEach(neighbor => {
    //if neighbor doesn't have a flag adjacent
    if(neighbor.innerText === 'X' && [...neighbor.classList].includes('flag')){
      return
    } else {

      neighbor.dataset.number === "1" ? neighbor.style = "color: blue" : null
      neighbor.dataset.number === "2" ? neighbor.style = "color: darkorange" : null
      neighbor.dataset.number === "3" ? neighbor.style = "color: red" : null
      neighbor.dataset.number === "4" ? neighbor.style = "color: maroon" : null
      neighbor.dataset.number === "5" ? neighbor.style = "color: green" : null
      reveal(neighbor)
    }
  })
  checkWin()
}

function handleClick(e){
  if(e.target.classList.value === "cell covered" || e.target.classList.value === "cell") {
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
    // console.log('Which event is this? ', e, 'which node is this ', node)
    let cell;
    if(!node) {
      e.preventDefault()
      cell = e.target
    } else if(node) {
      cell = node
    }


    if(cell.classList.value === "cell covered flag") {
      cell.classList.remove('flag')
      flags++
      count(flags)
      if(cell.innerText === 'X') {
        correct--
      }
    } else if(cell.classList.value === "cell covered") {
      if(flags < 1) return;

      cell.classList.add('flag')
      flags--
      flags < 0 ? flags = 0 : null

      count(flags)
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
  if(e.code === "Space") {
      if(mouseTarget.classList.value === "cell covered" || mouseTarget.classList.value === "cell covered flag") {
        plantFlag(e, mouseTarget)
      } else if(mouseTarget.classList.value === "cell") {
          check(mouseTarget)
      }
  }
}

init()


//pad the number such that it is always at least three digits
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

//counter function

function count(flags) {
  flags > 999 ? flags = 999 : null
  flags = pad(flags, 3)

  let hundredDecimal = flags[0]
  let tensDecimal = flags[1]
  let onesDecimal = flags[2]

  if(hundredDecimal === '0') {
    timerMinutes.className = "digit zero"
  } else if(hundredDecimal === '1') {
    timerMinutes.className = "digit one"
  } else if(hundredDecimal === '2') {
    timerMinutes.className = "digit two"
  } else if(hundredDecimal === '3') {
    timerMinutes.className = "digit three"
  } else if(hundredDecimal === '4') {
    timerMinutes.className = "digit four"
  } else if(hundredDecimal === '5') {
    timerMinutes.className = "digit five"
  } else if(hundredDecimal === '6') {
    timerMinutes.className = "digit six"
  } else if(hundredDecimal === '7') {
    timerMinutes.className = "digit seven"
  } else if(hundredDecimal === '8') {
    timerMinutes.className = "digit eight"
  } else if(hundredDecimal === '9') {
    timerMinutes.className = "digit nine"
  }


  // console.log('hundreds decimal place: ', hundredDecimal)
    if(tensDecimal === '0') {
      tens.className = "digit zero"
    } else if(tensDecimal === '1') {
      tens.className = "digit one"
    } else if(tensDecimal === '2') {
      tens.className = "digit two"
    } else if(tensDecimal === '3') {
      tens.className = "digit three"
    } else if(tensDecimal === '4') {
      tens.className = "digit four"
    } else if(tensDecimal === '5') {
      tens.className = "digit five"
    } else if(tensDecimal === '6') {
      tens.className = "digit six"
    } else if(tensDecimal === '7') {
      tens.className = "digit seven"
    } else if(tensDecimal === '8') {
      tens.className = "digit eight"
    } else if(tensDecimal === '9') {
      tens.className = "digit nine"
    }

    if(onesDecimal === '0') {
      ones.className = "digit zero"
    } else if(onesDecimal === '1') {
      ones.className = "digit one"
    } else if(onesDecimal === '2') {
      ones.className = "digit two"
    } else if(onesDecimal === '3') {
      ones.className = "digit three"
    } else if(onesDecimal === '4') {
      ones.className = "digit four"
    } else if(onesDecimal === '5') {
      ones.className = "digit five"
    } else if(onesDecimal === '6') {
      ones.className = "digit six"
    } else if(onesDecimal === '7') {
      ones.className = "digit seven"
    } else if(onesDecimal === '8') {
      ones.className = "digit eight"
    } else if(onesDecimal === '9') {
      ones.className = "digit nine"
    }

  }

  function time(seconds) {
    seconds > 999 ? seconds = 999 : null
    seconds = pad(seconds, 3)
    // console.log(seconds)

    let hundredDecimal = seconds[0]
    let tensDecimal = seconds[1]
    let onesDecimal = seconds[2]

    if(hundredDecimal === '0') {
      minutes.className = "digit zero"
    } else if(hundredDecimal === '1') {
      minutes.className = "digit one"
    } else if(hundredDecimal === '2') {
      minutes.className = "digit two"
    } else if(hundredDecimal === '3') {
      minutes.className = "digit three"
    } else if(hundredDecimal === '4') {
      minutes.className = "digit four"
    } else if(hundredDecimal === '5') {
      minutes.className = "digit five"
    } else if(hundredDecimal === '6') {
      minutes.className = "digit six"
    } else if(hundredDecimal === '7') {
      minutes.className = "digit seven"
    } else if(hundredDecimal === '8') {
      minutes.className = "digit eight"
    } else if(hundredDecimal === '9') {
      minutes.className = "digit nine"
    }


    // console.log('hundreds decimal place: ', hundredDecimal)
      if(tensDecimal === '0') {
        timerTens.className = "digit zero"
      } else if(tensDecimal === '1') {
        timerTens.className = "digit one"
      } else if(tensDecimal === '2') {
        timerTens.className = "digit two"
      } else if(tensDecimal === '3') {
        timerTens.className = "digit three"
      } else if(tensDecimal === '4') {
        timerTens.className = "digit four"
      } else if(tensDecimal === '5') {
        timerTens.className = "digit five"
      } else if(tensDecimal === '6') {
        timerTens.className = "digit six"
      } else if(tensDecimal === '7') {
        timerTens.className = "digit seven"
      } else if(tensDecimal === '8') {
        timerTens.className = "digit eight"
      } else if(tensDecimal === '9') {
        timerTens.className = "digit nine"
      }

      if(onesDecimal === '0') {
        timerSeconds.className = "digit zero"
      } else if(onesDecimal === '1') {
        timerSeconds.className = "digit one"
      } else if(onesDecimal === '2') {
        timerSeconds.className = "digit two"
      } else if(onesDecimal === '3') {
        timerSeconds.className = "digit three"
      } else if(onesDecimal === '4') {
        timerSeconds.className = "digit four"
      } else if(onesDecimal === '5') {
        timerSeconds.className = "digit five"
      } else if(onesDecimal === '6') {
        timerSeconds.className = "digit six"
      } else if(onesDecimal === '7') {
        timerSeconds.className = "digit seven"
      } else if(onesDecimal === '8') {
        timerSeconds.className = "digit eight"
      } else if(onesDecimal === '9') {
        timerSeconds.className = "digit nine"
      }
  }





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
smiley.addEventListener('mousedown', (e) => {
  smiley.className = "inset"
  smiley.src = "./public/ah face smiley.png"
})

smiley.addEventListener('mouseup', (e) => {
  smiley.className = ""
  smiley.src = "./public/minesweeper_face_normal.png"

})
