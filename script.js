const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const restartButton = document.getElementById("restartButton");
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const inputPlayerX = document.getElementById("playerXName");
const inputPlayerO = document.getElementById("playerOName");
const submitNamesButton = document.getElementById("submitNames");
const playerNamesForm = document.getElementById("playerNamesForm");
const playerXScoreDisplay = document.getElementById("playerXScore");
const playerOScoreDisplay = document.getElementById("playerOScore");
const drawScoreDisplay = document.getElementById("draw");

let circleTurn = false;
let crossTurn = true;
let crossPosition = [];
let circlePosition = [];
let totalMoves = 0;
let playerXName = 'Player X';
let playerOName = 'Player O';
let playerXScore = 0;
let playerOScore = 0;
let drawScore = 0;

playerNamesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    playerXName = inputPlayerX.value || "Player X";
    playerOName = inputPlayerO.value || "Player O";
    playerXScoreDisplay.textContent = playerXName + ": " + playerXScore;
    playerOScoreDisplay.textContent = playerOName + ": " + playerOScore;
    inputPlayerX.value = '';
    inputPlayerO.value = '';
    alert(`Names set! ${playerXName} is X and ${playerOName} is O.`);
});


restartButton.addEventListener('click', () => {
    reStartGame();
});

cellElements.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)) {
            return;
        }
        if (crossTurn) {
            cell.classList.add(X_CLASS);
            crossPosition.push(Array.from(cellElements).indexOf(cell));
            crossTurn = false;
            circleTurn = true;
            totalMoves++;
            console.log(crossPosition);
        } else {
            cell.classList.add(CIRCLE_CLASS);
            circlePosition.push(Array.from(cellElements).indexOf(cell));
            crossTurn = true;
            circleTurn = false;
            totalMoves++;
            console.log(circlePosition);
        }
        checkWin(crossPosition, circlePosition);
    });
});

function startGame() {
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
    });
    crossPosition = [];
    circlePosition = [];
    totalMoves = 0;
    crossTurn = true;
    circleTurn = false;
}

function reStartGame() {
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
    });
    crossPosition = [];
    circlePosition = [];
    totalMoves = 0;
    crossTurn = true;
    circleTurn = false;
    playerXScore = 0;
    playerOScore = 0;
    drawScore = 0;
    playerXName = '';
    playerOName = '';
    playerXScoreDisplay.textContent = "Player X: " + playerXScore;
    playerOScoreDisplay.textContent = "Player O: " + playerOScore;
    drawScoreDisplay.textContent = "Draws: " + drawScore;
}

function checkWin(crossPositions, circlePositions) {
    if (totalMoves < 5) {
        return false;
    }
    else {
        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
            const combination = WINNING_COMBINATIONS[i];
            let crossWin = combination.every(pos => crossPositions.includes(pos));
            let circleWin = combination.every(pos => circlePositions.includes(pos));
            if (crossWin) {
                alert(playerXName + " wins!");
                playerXScore++;
                playerXScoreDisplay.textContent = playerXName + ": " + playerXScore;
                startGame();
                return true;
            }
            if (circleWin) {
                alert(playerOName + " wins!");
                playerOScore++;
                playerOScoreDisplay.textContent = playerOName + ": " + playerOScore;
                startGame();
                return true;
            }
        }
        if (totalMoves === 9) {
            alert("It's a tie!");
            drawScore++;
            drawScoreDisplay.textContent = "Draws: " + drawScore;
            startGame();
            return true;
        }
    }
}
