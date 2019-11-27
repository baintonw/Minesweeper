const grid = document.querySelector('.grid')

function makeGrid(x, y, container) {

  console.log(x, y, container)
    for(let i = 0; i < (x * y); i++) {
      container.innerHTML +=`
        <button style="height:${container.offsetHeight / x}px; width:${container.offsetWidth / y}px"></button>
      `
    }
}
