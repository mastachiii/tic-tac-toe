let board = [ 
    ['.', '.', '.'], 
    ['.', '.', '.'], 
    ['.', '.', '.'] 
]

const makePlayer = function (name, mark){

    const markBoard = function (x, y){

        // Checks if board is not occupied by an existing mark.
        board[x][y] = board[x][y] === '.' ? this.mark : board[x][y];
    }

    return { name, mark, markBoard };
}

let player1 = makePlayer('Peter', 'X')
  , player2 = makePlayer('Clark', 'O');