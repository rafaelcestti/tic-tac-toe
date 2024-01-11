function Cell() {
    let cellValue = "";

    function setValue(value) {
        cellValue = value;
    }

    function getValue() {
        return cellValue;
    }

    return { setValue, getValue };
}

function Gameboard() {
    // Array where we will store our gameboard
    let emptyBoard = [];

    // Row & Column length for the board
    let rows = 3;
    let columns = 3;

    // Nested for-loop to initialize our board 2D array
    // Loop through rows
    for (let i = 0; i < rows; i++) {
        // Initialize an empty array at current row
        emptyBoard[i] = [];
        // Loop through columns
        for (let j = 0; j < columns; j++) {
            // Push an empty cell to each column in the current row
            emptyBoard[i].push(Cell());
        }
    }

    // Initialize a copy of the empty board that we can use on resetBoard()
    let board = emptyBoard;

    // Check if cells match in a row, column, or diagonally
    function checkSame() {
        for (let i = 0; i < 3; i++) {
            // Check if any cells match in a straight row
            if (board[i][0].getValue() == board[i][1].getValue() && board[i][1].getValue() == board[i][2].getValue()) {
                // Make sure that cells arent blank
                if (board[i][0].getValue() != "" && board[i][1].getValue() != "" && board[i][2].getValue() != "") {
                    return true;
                }
            }
            // Check if any cells match in a straight column
            if (board[0][i].getValue() == board[1][i].getValue() && board[1][i].getValue() == board[2][i].getValue()) {
                // Make sure that cells arent blank
                if (board[0][i].getValue() != "" && board[1][i].getValue() != "" && board[2][i].getValue() != "") {
                    return true;
                }
            }
        }
        // Check if any cells match diagonally from the left
        if (board[0][0].getValue() == board[1][1].getValue() && board[1][1].getValue() == board[2][2].getValue()) {
            // Make sure that cells arent blank
            if (board[0][0].getValue() != "" && board[1][1].getValue() != "" && board[2][2].getValue() != "") {
                return true;
            }
        }
        // Check if any cells match diagonally from the right
        if (board[0][2].getValue() == board[1][1].getValue() && board[1][1].getValue() == board[2][0].getValue()) {
            // Make sure that cells arent blank
            if (board[0][2].getValue() != "" && board[1][1].getValue() != "" && board[2][0].getValue() != "") {
                return true;
            }
        }
        return false;
    }

    // Adds a player mark at a specific row & columns, and check's if cell is not blank
    function addMark(row, column, mark) {
        // Check if cell is not blank
        if (board[row][column].getValue() != "") {
            return false;
        } else {
            board[row][column].setValue(mark);
        }
    }

    function resetBoard() {
        // Loop through board and set cell values to """
        for (let i = 0; i < rows; i++) {
            // Loop through columns
            for (let j = 0; j < columns; j++) {
                // Set cell value to empty
                emptyBoard[i][j].setValue("");
            }
        }
    }

    return { resetBoard, checkSame, addMark };
}

function Gamecontroller(playerOneName = "Player 1", playerTwoName = "Player 2") {
    // Player constructor
    function player(playerName, playerMark) {
        const mark = playerMark;
        const name = playerName;

        function getMark() {
            return mark;
        }

        function getName() {
            return name;
        }
        return { getMark, getName };
    }

    // Holds our players
    const players = [];

    // Initialize both players
    const player1 = player(playerOneName, "X");
    const player2 = player(playerTwoName, "O");

    // Insert both players to our players array
    players.push(player1, player2);

    // Initialize our gameboard
    const board = Gameboard();

    // Remember whose turn it is
    let currentTurn = player1;

    // Switches turn
    function switchTurn() {
        if (currentTurn == player1) {
            currentTurn = player2;
        } else {
            currentTurn = player1;
        }
    }

    // Adds a mark at a specific row & column & check if game is won
    function setMark(row, column) {
        if (board.addMark(row, column, getCurrentTurnMark()) == false) {
            return "Cell Filled";
        } else if (board.checkSame()) {
            return "Game Over";
        }
    }

    // Gets the mark for the current player
    function getCurrentTurnMark() {
        return currentTurn.getMark();
    }

    // Gets the name for the current player
    function getCurrentTurnName() {
        return currentTurn.getName();
    }

    // Reset the gameboard
    function resetGameboard() {
        board.resetBoard();
    }

    return { getCurrentTurnName, getCurrentTurnMark, setMark, resetGameboard, switchTurn };
}

function Gamedisplay() {
    // Variable to make sure we only start the game one time
    let gameStart = false;
    // Initialize variable that will store our gamecontroller
    let game;
    // Select our Start Game button
    const startGameButton = document.querySelector("#startGameButton");
    // Add event listener to open dialog when we press it
    const startGameDialog = document.querySelector("#startGameDialog");
    startGameButton.addEventListener("click", () => {
        startGameDialog.showModal();
    });
    // Add event listener to button inside the dialog
    const dialogButton = document.querySelector("#dialogButton");
    // Select player name input elements
    const player1 = document.querySelector("#player1");
    const player2 = document.querySelector("#player2");
    dialogButton.addEventListener("click", () => {
        if (gameStart == false) {
            // Initialize our gamecontroller with user's player names
            game = Gamecontroller(player1.value, player2.value);
            // Initialize the current turn player name
            currentTurnContainer.textContent = `${game.getCurrentTurnName()}'s Turn`;
        }
        gameStart = true;
        startGameDialog.close();
    });
    // Select all our cell elements
    const cells = document.querySelectorAll(".cell");
    // Select currentTurnContainer element
    const currentTurnContainer = document.querySelector("#currentTurnContainer");
    // Select gameOverContainer & gameOverText element
    const gameOverDialog = document.querySelector("#gameOverDialog");
    const gameOverText = document.querySelector("#gameOverText");
    cells.forEach((cell) =>
        cell.addEventListener("click", () => {
            let currentRound = game.setMark(cell.dataset.row, cell.dataset.column);
            // Check if cell is filled
            if (currentRound == "Cell Filled") {
                currentTurnContainer.textContent = "Cell is already filled";
            }
            // Check if someone won
            else if (currentRound == "Game Over") {
                cell.textContent = game.getCurrentTurnMark();
                gameOverDialog.showModal();
                gameOverText.textContent = `${game.getCurrentTurnName()} Wins!`;
                // Switch turn to get ready for next game
                game.switchTurn();
            }
            // Add player mark & change the currentTurnContainer text
            else {
                cell.textContent = game.getCurrentTurnMark();
                game.switchTurn();
                currentTurnContainer.textContent = `${game.getCurrentTurnName()}'s Turn`;
            }
        })
    );
    // Select play again button
    const playAgainButton = document.querySelector("#playAgainButton");
    // If play again button is clicked, clear the gameBoard & currentTurn container, and reset the gameboard
    playAgainButton.addEventListener("click", () => {
        currentTurnContainer.textContent = `${game.getCurrentTurnName()}'s Turn`;
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        game.resetGameboard();
        gameOverDialog.close();
    });
}

// Start our game
Gamedisplay();
