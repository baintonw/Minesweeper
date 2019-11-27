const cells = [...document.querySelectorAll('.cell')]

function randomIndex() {
  let randomI = (Math.floor(Math.random() * 256))
  console.log('this is a cell: ', cells[randomI], 'this is its index: ', cells.indexOf(cells[randomI]))
  cell = cells[randomI]
  cell.style = "background: red"

}
