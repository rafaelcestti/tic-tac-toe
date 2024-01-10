/*

Cell Object
    value variable

    set value function

    get value function

    returns set value function, get value function

Gameboard Object
    board array variable
    nested for loops for 2d array with 3 rows & 3 columns

    add token function
        adds a token at a respective cell
    
    print board function
        prints out the 2d array in the console
    
    returns add token function, print board function

Game controller object
    player_array variable
    player objects
        mark: "x" or "o"
    
    board = gameboard()
    
    newRound function
        print board
        print "its X players turn"
    
    setToken function
        let user input row and column
        board.addToken at user's respective row and column
    
    returns newRound function, setToken function

 */

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

    // Adds a player mark at a specific row & columns, and check's if
    function addMark(row, column, mark) {
        // TODO: Check if cell is not blank
        board[row][column].setValue(mark);
    }

    // Prints out the board to the console
    function printBoard() {
        let tempBoard = board.map((row) => row.map((column) => column.getValue()));
        console.log(tempBoard);
    }

    return { checkSame, addMark, printBoard };
}

function Gamecontroller() {
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
    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");

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

    // Starts a new round
    function newRound() {
        board.printBoard();
        console.log(`It's ${currentTurn.getName()}'s turn.`);
    }

    // Adds a mark at a specific row & column, checks if game is won, switches player turn, and plays a new round
    function setMark(row, column) {
        board.addMark(row, column, currentTurn.getMark());
        if (board.checkSame()) {
            board.printBoard();
            console.log(`${currentTurn.getName()} has won.`);
        } else {
            switchTurn();
            newRound();
        }
    }

    // Calls new round at startup
    newRound();

    return { newRound, setMark };
}

game = Gamecontroller();
