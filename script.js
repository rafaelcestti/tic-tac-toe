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
    let board = [];

    // Row & Column length for the board
    let rows = 3;
    let columns = 3;

    // Nested for-loop to initialize our board 2D array
    // Loop through rows
    for (let i = 0; i < rows; i++) {
        // Initialize an empty array at current row
        board[i] = [];
        // Loop through columns
        for (let j = 0; j < columns; j++) {
            // Push an empty cell to each column in the current row
            board[i].push(Cell());
        }
    }

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
            console.log("Cell already filled");
        } else {
            board[row][column].setValue(mark);
        }
    }

    return { checkSame, addMark };
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

    // Adds a mark at a specific row & column, checks if game is won, and switches player turn
    function setMark(row, column) {
        board.addMark(row, column, getCurrentTurnMark());
        if (board.checkSame()) {
            return true;
        } else {
            switchTurn();
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

    return { getCurrentTurnName, getCurrentTurnMark, setMark };
}

function Gamedisplay() {
    // Variable to make sure we only start the game one time
    let gameStart = false;
    // Initialize variable that will store our gamecontroller
    let game;
    // Select our Start Game button
    const startGameButton = document.querySelector("#startGameButton");
    // Add event listener to open dialog when we press it
    const dialog = document.querySelector("dialog");
    startGameButton.addEventListener("click", () => {
        dialog.showModal();
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
        dialog.close();
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
            // Add player mark
            cell.textContent = game.getCurrentTurnMark();
            let currentRound = game.setMark(cell.dataset.row, cell.dataset.column);
            // Check if someone won
            if (currentRound == true) {
                gameOverDialog.showModal();
                gameOverText.textContent = `${game.getCurrentTurnName()} Wins!`;
                return;
            }
            // Change the currentTurnContainer text
            else {
                currentTurnContainer.textContent = `${game.getCurrentTurnName()}'s Turn`;
            }
        })
    );
}

// Start our game
Gamedisplay();
