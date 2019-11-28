const grid = document.querySelector('.grid')
// const rows = [...document.querySelectorAll('.row')]
// const cells = [...document.querySelectorAll('.cell')]
let rows = []
let cells = []

function createGrid(x, y) {
  for(let i = 0; i < x; i++) {
    row = `<div class="row"></div>`.trim();
    grid.innerHTML += row
    for(let j = 0; j < y; j++) {
      let rows = document.querySelectorAll('.row')
      let lastRow = rows[rows.length - 1]
      let cell = `<div class="cell covered"></div>`.trim();
      lastRow.innerHTML += cell
    }
  }
  rows = [...grid.children]
  rows.forEach(row => {
    let children = [...row.children]
    cells.push(children)
  })
  placeBombs(cells.flat())
}


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
    let bombCells = [...document.querySelectorAll('.bomb.none')]
    console.log('BOMB CELLS', bombCells)
  }
}



createGrid(16, 16);

document.addEventListener('click', function(e) {
  console.log(e.target.classList.value)
  let cell = e.target
  if(cell.classList.value === 'cell covered') {
    cell.classList.remove('covered')
    if(cell.innerHTML === `<div class="bomb none">X</div>`){
          cell.innerHTML === `<div class="bomb none">X</div>` ? cell.innerHTML = `<div class="bomb">X</div>` : null
        alert('BOOM! GAME OVER')
    }


  }
})

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
