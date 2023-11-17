const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const restartBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to initialize the Game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // we are changing to the UI also, without that it will not start new Game
  boxes.forEach((box, index) => {
    box.innerHTML = "";
    box.style.pointerEvents = "all";

    box.classList = `box box${index + 1}`;
  });
  restartBtn.classList.remove("active");
  gameInfo.innerHTML = `Current Player - ${currentPlayer} `;
}

// Function to swap the turn
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "0";
  } else {
    currentPlayer = "X";
  }

  // UI Game info updation
  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

// Function to handle clicks
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerHTML = currentPlayer; // These will change on UI
    gameGrid[index] = currentPlayer; // These will change on gameGrid
    boxes[index].style.pointerEvents = "none";
    swapTurn(); // Swapping the turn
    checkGameOver(); // checking game over or not
  }
}

// Function to check that Game is over or not
function checkGameOver() {
  let result = "";

  winningPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[0]] === gameGrid[position[2]]
    ) {
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      if (gameGrid[position[0]] === "X") result = "X";
      else result = "0";
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // if we have winner
  if (result !== "") {
    gameInfo.innerHTML = `Winner Player - ${result}`;
    restartBtn.classList.add("active");
    return;
  }

  // Logic for Game draw
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });
  // If all boxes are non-empty
  if (fillCount === 9) {
    gameInfo.innerHTML = "Game Tied!";
    restartBtn.classList.add("active");
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

initGame();
restartBtn.addEventListener("click", initGame);
