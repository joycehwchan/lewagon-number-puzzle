const button = document.querySelector("#show-hint");
const hint = document.querySelector(".hint");
const cells = document.querySelectorAll("td");
const explaination = document.querySelector("#explaination")
const winningString = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0"

// Show Hint
button.addEventListener("click", (event) => {
  hint.classList.add("active");
  button.classList.add("disabled");
});

// Check is there is space(empty space) around clicked cell
const isMovable = (cell) => {
  const emptyCell = document.querySelector(".empty");
  const [cellX, cellY] = [cell.cellIndex, cell.parentElement.rowIndex];
  const [emptyCellX, emptyCellY] = [emptyCell.cellIndex, emptyCell.parentElement.rowIndex];
  return (cellX === emptyCellX && (Math.abs(cellY - emptyCellY)  === 1)) ||
         (cellY === emptyCellY && (Math.abs(cellX - emptyCellX)  === 1 ))
};

// Swap emtpy cell and clicked cell
const swap = (cell) => {
  const emptyCell = document.querySelector(".empty");
  emptyCell.classList.remove("empty");
  emptyCell.innerHTML = cell.innerHTML;
  cell.classList.add("empty");
  cell.innerHTML = "";
};

// Check if puzzle is solved
const checkWin = (cells) => {
  const numOrder = [];
  cells.forEach((cell) => {
    const num = cell.querySelector("strong")
    // numOrder.push(num);
    if (num) {
      numOrder.push(num.textContent);
    } else {
      numOrder.push(0)
    };
  });
  console.log(numOrder.join());
  return (numOrder.join() === winningString);
};

// display row(Y) and cell(X) index
const updateIndex = () => {
  cells.forEach((cell) => {
    const [cellX, cellY] = [cell.cellIndex, cell.parentElement.rowIndex];
    const previousIndexes = cell.querySelectorAll("p");
    previousIndexes.forEach(index => index.remove());

    cell.insertAdjacentHTML("afterbegin", `<p>row index: ${cellY}</p>`)
    cell.insertAdjacentHTML("beforeend", `<p>cell index : ${cellX}</p>`)

  });
};

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const cell = e.currentTarget;
    console.log(isMovable(cell))
    if (isMovable(cell)) {
      swap(cell);
      updateIndex();
      if (checkWin(cells)) {
        cells.forEach(cell => cell.classList.add("bg-success", "text-white"));
        // Display message and refresh page
        setTimeout(() => {
          alert("You won!")
          window.location.reload();
        }, 180);
      }
    }
  })
});

window.addEventListener('load', (event) => {
  cells.forEach((cell) => {
    const [cellX, cellY] = [cell.cellIndex, cell.parentElement.rowIndex];
    cell.insertAdjacentHTML("afterbegin", `<p>row index: ${cellY}</p>`)
    cell.insertAdjacentHTML("beforeend", `<p>cell index : ${cellX}</p>`)
  });
});
