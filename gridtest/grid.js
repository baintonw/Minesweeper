const grid = document.querySelector('.grid')
//
function makeGrid(x, y, container) {

  console.log(x, y, container)
    for(let i = 0; i < (x * y); i++) {
      container.innerHTML +=`
        <button style="height: ${container.offsetWidth / x}px; width: ${container.offsetHeight / y}px">x</button>
      `
    }
}

function logGrid() {
  xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  yAxis = [1, 2, 3, 4, 5, 6, 7, 8]

  let row = []

  for(let i = 0; i < xAxis.length; i++) {

    for(let j = 0; j < yAxis.length; j++) {
      row.push(xAxis[i] + yAxis[j])
    }
    console.log(row)

    row = []
  }

}
