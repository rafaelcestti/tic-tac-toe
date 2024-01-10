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
    let cellValue = "test";

    function setValue(value) {
        cellValue = value;
    }

    function getValue() {
        return cellValue;
    }

    return {setValue, getValue};
}

let testCell = Cell();
