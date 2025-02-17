// TIC-TAC-TOE CHECK
function checkBoard(matrix) {
    // Check rows
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        const equal = row.every(col => col === row[0])
        if (equal && row[0]) return (String(row[0]) + " won!")
    }
    // Check columns
    for (let i = 0; i < matrix.length; i++) {
        const row = [];
        for (let j = 0; j < matrix.length; j++) row.push(matrix[j][i])
        const equal = row.every(col => col === row[0])
        if (equal && row[0]) return (String(row[0]) + " won!")
    }
    // Check diagnols
    let diagnol = []
    for (let j = 0; j < matrix.length; j++) diagnol.push(matrix[j][j])
    
    let equal = diagnol.every(col => col === diagnol[0])
    if (equal && diagnol[0]) return (String(diagnol[0]) + " won!")
    
    diagnol = []    
    for (let j = matrix.length - 1; j >= 0 ; j--) diagnol.push(matrix[Math.abs(2-j)][j])

    equal = diagnol.every(col => col === diagnol[0])
    if (equal && diagnol[0]) return (String(diagnol[0]) + " won!")
    
    // Check tie
    let matrixAsString = ""
    for (let i = 0; i < matrix.length; i++) {
        matrixAsString += matrix[i].toString()
        // if (equal && row[0]) return (String(row[0]) + " won!")
    }
    if (matrixAsString.length > 14) return (String("Tie!"))
    return -1
}

function displayBoard(matrix) {
    const board = document.createElement("div")
    board.classList.add('tic-tac-toe-board')
    matrix.forEach((row, rowIndex) => {
        row.forEach((column, colIndex) => {
           const box = document.createElement("span")
           box.classList.add('tic-tac')
           box.classList.add(`box-${rowIndex}-${colIndex}`)
           box.onclick = () => { 
                if (!matrix[rowIndex][colIndex]) {
                    matrix[rowIndex][colIndex] = 'X'; 
                    box.innerHTML = matrix[rowIndex][colIndex]; 
                    randomMove(matrix);
                    checkBoard(matrix);
                    checkEndGame(matrix)
                }
            }
           box.innerHTML = matrix[rowIndex][colIndex]
           board.appendChild(box)
        });
    });
    return board
}

function randomVal(max) {
    return Math.floor(Math.random() * max)
}

function randomMove(matrix) {
    let randRowIndex = randomVal(matrix.length);
    let randColIndex = randomVal(matrix.length);
    let count = 0;
    matrix[randRowIndex][randColIndex]
    while (matrix[randRowIndex][randColIndex] && count < 30) {
        count++;
        randRowIndex = randomVal(matrix.length);
        randColIndex = randomVal(matrix.length)
        matrix[randRowIndex][randColIndex]
    }
    const randBox = document.getElementsByClassName(`box-${randRowIndex}-${randColIndex}`)[0];
    if(!randBox.innerHTML) {
        matrix[randRowIndex][randColIndex] = 'O';
        randBox.innerHTML = 'O'
    }
}

function checkEndGame(matrix) {
    if (checkBoard(matrix) !== -1) {
        endGame.innerHTML = `<h1>END GAME <br /> ${checkBoard(matrix)}</h1>`
        endGame.style.display = "block"
        const replayBtn = document.createElement("button")
        replayBtn.className = "replay-btn"
        replayBtn.innerHTML = "REPLAY"
        replayBtn.onclick = () => {
            matrix = [['', '', ''], ['' ,'', ''], ['', '', '']]
            endGame.style.display = "none"
            const board = document.getElementsByClassName('tic-tac-toe-board')[0];
            board.remove();
            boardContainer.appendChild(displayBoard(matrix))
        }
        endGame.appendChild(replayBtn)
        boardContainer.appendChild(endGame)
    }
}

// Call and Display


const matrix = [['', '', ''], ['' ,'', ''], ['', '', '']]

var boardContainer = document.getElementsByClassName("board-container")[0]
boardContainer.appendChild(displayBoard(matrix))
checkBoard(matrix)

let endGame = document.createElement("div")
endGame.className = "end-game"
