const cells = [...document.querySelectorAll('.cell')]

function randomIndex() {
  // console.log('this is a cell: ', cells[randomI], 'this is its index: ', cells.indexOf(cells[randomI]))
  let i = 0
  while (i < 40) {
    let randomI = (Math.floor(Math.random() * 256))
    cell = cells[randomI]
    if(cell.innerHTML !== `<div class="bomb none">X</div>`){
      cell.innerHTML = `<div class="bomb none">X</div>`
      i++
      console.log(i)
    }
  }
}

cells.forEach(cell => {
  cell.addEventListener('click', function(){
    console.log('this cell: ', this, this)
    cell.classList.remove('covered')
    cell.innerHTML = `<div class="bomb">X</div>`
  })
})
