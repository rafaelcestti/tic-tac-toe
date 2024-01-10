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

    // Adds a player mark at a specific row & columns
    function addMark(row, column, mark) {
        board[row][column].setValue(mark);
    }

    // Prints out the board to the console
    function printBoard() {
        let tempBoard = board.map((row) => row.map((column) => column.getValue()));
        return tempBoard;
    }

    return { addMark, printBoard };
}
