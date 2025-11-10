const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
let winner;
let count;

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

// function to init game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  winner = "";
  count = 0;
  //ui par bhi empty karo
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;

  boxes.forEach((box, index) => {
    boxes[index].classList.remove("win");
  });

  boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
      handleClick(index);
    });
  });
}

initGame();

function swapTurn() {
  if (currentPlayer == "X") {
    currentPlayer = "0";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winningPosition.forEach((position) => {
    // all three boxes should be non empty and exacty same in value
    if (
      answer == "" &&
      gameGrid[position[0]] !== "" &&
      gameGrid[position[1]] !== "" &&
      gameGrid[position[2]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is x
      if (gameGrid[position[0]] == "X") {
        answer = "X";
      } else {
        answer = "0";
      }

      // now we know x/0 is winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // we have a winner
  if (answer !== "") {
    gameInfo.innerHTML = `Winner is ${answer}`;
    newGameBtn.classList.add("active");
    winner = answer;
    return;
  }
  if (count == 9) {
    gameInfo.innerText = `Match is Draw`;

    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] == "" && winner == "") {
    count++;
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";

    //swap karo turn
    swapTurn();

    //check if someone win
    checkGameOver();
  }
}

newGameBtn.addEventListener("click", initGame);
