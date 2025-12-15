const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const restartBtn = document.querySelector("#restart")

let go = "хрестик"

// Create board
function createBoard() {
    gameBoard.innerHTML = ""
    for (let i = 0; i < 9; i++) {
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id = i
        cellElement.addEventListener("click", addGo)
        gameBoard.append(cellElement)
    }
}

createBoard()

restartBtn.addEventListener("click", restartGame)

function restartGame() {
    go = "хрестик"
    infoDisplay.textContent = "Хрестик ходить першим"
    createBoard()
}

// Player move
function addGo(e) {
    if (go !== "хрестик") return

    placeMark(e.target, "хрестик")

    if (checkScore()) return

    go = "нулик"
    infoDisplay.textContent = "Хід комп'ютера..."

    setTimeout(computerMove, 500)
}

// Place mark helper
function placeMark(square, mark) {
    const markDisplay = document.createElement("div")
    markDisplay.classList.add(mark)
    square.append(markDisplay)
    square.removeEventListener("click", addGo)
}

// Computer move (random)
function computerMove() {
    const allSquares = document.querySelectorAll(".square")
    const emptySquares = [...allSquares].filter(
        square => !square.firstChild
    )

    if (emptySquares.length === 0) return

    const randomSquare =
        emptySquares[Math.floor(Math.random() * emptySquares.length)]

    placeMark(randomSquare, "нулик")

    if (checkScore()) return

    go = "хрестик"
    infoDisplay.textContent = "Твій хід"
}

// Check win / draw
function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    for (const combo of winningCombos) {
        if (combo.every(i =>
            allSquares[i].firstChild?.classList.contains("хрестик")
        )) {
            infoDisplay.textContent = "Ти виграв!"
            endGame(allSquares)
            return true
        }

        if (combo.every(i =>
            allSquares[i].firstChild?.classList.contains("нулик")
        )) {
            infoDisplay.textContent = "Комп'ютер виграв!"
            endGame(allSquares)
            return true
        }
    }

    const isDraw = [...allSquares].every(square => square.firstChild)
    if (isDraw) {
        infoDisplay.textContent = "Нічия!"
        return true
    }

    return false
}

// Disable board after game ends
function endGame(squares) {
    squares.forEach(square =>
        square.replaceWith(square.cloneNode(true))
    )
}
