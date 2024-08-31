const ticTacToe = (function (){

    let gameBoard = ['.', '.', '.', '.', '.', '.', '.', '.', '.']
       , _turns = 0;
 
    function searchArr (arr){
 
     let index = 0;
 
     // X - AXIS
     for (let i = 1; i < 4; i++){
 
         const currentRow = [arr[index], arr[index + 1], arr[index + 2]].join('');
 
         resetBoard(currentRow);
 
         index = 3 * i;
     }
 
     // Y-AXIS
     for (let i = 0; i < 3; i++){
 
         const currentColumn = [arr[0 + i], arr[3 + i], arr[6 + i]].join('');
 
         resetBoard(currentColumn);
     }
 
     // DIAGONALS
     const diag1 = [arr[0], arr[4], arr[8]].join('')
            , diag2 = [arr[2], arr[4], arr[6]].join('');
 
     resetBoard(diag1);
     resetBoard(diag2);
    }
 
    function searchBoard (){
 
     searchArr(this.gameBoard);
 
     console.log(_turns);
 
     _turns++;
 
     if (_turns === 9){
 
         alert(`IT'S A TIE!`);
 
         resetBoard('TIE');
         
         _turns = 0;
     }
    }
 
    function resetBoard (tiles){ 
 
     switch (tiles){
 
         case 'XXX':
             alert('PLAYER 1 WINS!');
             player1.incrementScore();
             break;
         
         case 'OOO':
             alert('PLAYER 2 WINS!');
             player2.incrementScore();
             break;
 
         case 'TIE':
             break;
 
         default:
             return;
     }
 
     _turns = 0;
     gameBoard = ['.', '.', '.', '.', '.', '.', '.', '.', '.'];
    }
 
    return { gameBoard, searchBoard };
 
 })();
 
 function Player (name, mark){
 
     let _score = 0;
 
     const incrementScore = function (){ _score++; }
            , getScore = function (){ return _score; }
            , resetScore = function (){ _score = 0;}
            , markBoard = function (){
 
             const playerChoice = (+prompt('Choose which grid to mark.')) - 1;
 
             if ( ticTacToe.gameBoard[playerChoice] === '.'){
                 
                 ticTacToe.gameBoard[playerChoice] = this.mark;
 
             } else{
 
                 alert('Tile is already marked');
 
                 markBoard();
             }
            };
 
     
     return { name, mark, incrementScore, getScore, resetScore, markBoard };
 };
 
 const player1 = Player ('Peter', 'X')
        , player2 = Player ('Clark', '0');
 