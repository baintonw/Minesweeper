const grid = document.querySelector('.grid')
// const rows = [...document.querySelectorAll('.row')]
// const cells = [...document.querySelectorAll('.cell')]
let rows = []
let cells = []
let bombCells = []
let numbers = []
let openCells = []
let i = 0



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
      cell.dataset.number === "1" ? cell.style = "color: blue" : null
      cell.dataset.number === "2" ? cell.style = "color: darkorange" : null
      cell.dataset.number === "3" ? cell.style = "color: red" : null
      cell.dataset.number === "4" ? cell.style = "color: maroon" : null
      cell.dataset.number === "5" ? cell.style = "color: green" : null



    }
  })

  // console.log(numbers)
}

// function reveal(cell) {
//   if(cell === null || cell.innerText === 'X'){
//     console.log('STOP')
//     return
//   }
//     cell.classList.remove('covered')
//     console.log('this is the cell: ', cell)
//     if(cell.innerText === 'X') return;
//     let surrounding = findAdjacent(cell)
//     surrounding = surrounding.filter(newCell => newCell !== cell)
//     surrounding = surrounding.filter(newCell => newCell !== null)
//
//
//     for(let i = 0; i < surrounding.length; i++) {
//       let outCell = surrounding[i]
//       console.log("outside loop: ", surrounding[i])
//       outCell.classList.remove('covered')
//       let newSurrounding = findAdjacent(surrounding[i])
//
//       console.log('newSurrounding', newSurrounding)
//       for(let j = 0; j < newSurrounding.length; j++) {
//         let inCell = newSurrounding[j]
//
//           console.log("inside loop: ", newSurrounding[j])
//           inCell.classList.remove('covered')
//           reveal(inCell)
//
//
//         }
//       }
//
//
// }

// if (mineCount==0) {
//    //Reveal all adjacent cells as they do not have a mine
//    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
//      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
//        //Recursive Call
//        if (grid.rows[i].cells[j].innerHTML=="") clickCell(grid.rows[i].cells[j]);
//      }
//    }
// }

function handleClick(e, cell){
  if(e.target === null || e.target === undefined) return;
  if(e.target.classList.value !== 'cell covered') return;
  let target = e.target
  target.classList.remove('covered')
  console.log('hit one!', e.target)

  //Bomb case
  if(target.innerText === 'X') {
    alert('Boom!')
    //Number case
  } else if(parseInt(target.dataset.number) > 0) {
    console.log('Numbah!')
    return
    //Blank case
  } else if(target.classList.value === 'cell' && e.target.classList.value !== 'cell covered') {
      target.classList.remove('covered')
      console.log('blank space', target)
      let neighbors = findAdjacent(target)
      //array of neighbors
      neighbors = neighbors.filter(neighbor => neighbor !== target)
      //for each neighbor, if it is still covered, run the click again

      for(let i = 0; i < neighbors.length; i++) {
        let allEmpty = []
        let newNeighbors = findAdjacent(neighbors[i])
        newNeighbors = newNeighbors.filter(neighbor => neighbor !== null)
        // neighbors[i].classList.remove('covered')
        for(let j = 0; j < newNeighbors.length; j++) {
          // handleClick(newNeighbors[j])

        }
        console.log('new neighbors', newNeighbors)
      }
      console.log('friendly neighbors: ', neighbors)
  }

}


// if(e.target === null || cell === null) return;
//
// if(e.target.classList.value === 'cell covered' || e.target.classList.value === 'cell') {
//   let cell = e.target
//   cell.classList.remove('covered')
//   console.log('this is what you ran the function on: ', cell)
//   if(cell === null || cell === undefined || cell.classList.value === 'cell') return
//   if(cell.innerText === 'X') {
//     alert('BOOM GAME OVER')
//   } else if(parseInt(cell.dataset.number) > 0) {
//     // cell.classList.remove('covered')
//   } else if(cell.dataset.number === '0') {
//     // cell.classList.remove('covered')
//
//     let neighbors = findAdjacent(cell)
//     neighbors = neighbors.filter(neighbor => neighbor !== cell && neighbor.classList.value === 'cell covered')
//     console.log('weve got a clear one!', 'Here are the lovely neighbors: ', neighbors, neighbors.indexOf(cell))
//     while(i < neighbors.length) {
//       i++
//       neighbors.forEach(neighbor => handleClick(e, neighbor))
//
//     }
//
//   }
// }


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
