const ticTacToe = (function (){

    let gameBoard = ['.', '.', '.', '.', '.', '.', '.', '.', '.']
       , _turns = 0
       , _boardState; // To reset the object's turns if either player wins.
 
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
            
     searchArr(ticTacToe.gameBoard);
  
     _turns++;

    if (_boardState === true) _turns = 0;

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
            
    ticTacToe.gameBoard = ['.', '.', '.', '.', '.', '.', '.', '.', '.'];
    _boardState = true;

    document.querySelectorAll('.board > div > img').forEach((item) => item.remove());
    
    const bodyClone = document.querySelector('main').cloneNode(true); // Must remove images first or else the clone would include the logos.

    // https://stackoverflow.com/a/65495646 (So that all event listeners will be removed, and player1.startEvent() will work as intended)
    document.querySelector('main').remove();
    document.querySelector('body').append(bodyClone); 

    player1.startEvent(); // Each time that the boards reset, the turns of the players will reset aswell.
    }
 
    return { gameBoard, searchBoard };
 
})();
 
function Player (name, mark){
 
     let _score = 0
        , _turn = (mark === 'X') ? true : false;

    const updateDom = function (index){

        const _markImage = document.createElement('img')
               , _boardDivs = document.querySelectorAll('.board div');

         _markImage.src = mark === 'X' ? './resources/icon/cross.svg' : './resources/icon/circle.svg';


        _boardDivs[index].append(_markImage);
    }
 
     const incrementScore = function (){ _score++; }
            , getScore = function (){ return _score; }
            , resetScore = function (){ _score = 0; }
            , changeTurn = function (){ _turn = _turn === false ? true : _turn }
            , startEvent = function (){ document.querySelector('main').addEventListener('click', (e) => this.markBoard(this, e.target.getAttribute('data-tile')), {once: true}) }
            , markBoard = function (obj, index){

            const playerChoice = index - 1;
                        
            if (playerChoice === -1) return;

            if ( ticTacToe.gameBoard[playerChoice] === '.'){
                 
                 ticTacToe.gameBoard[playerChoice] = obj.mark;
                 
                 updateDom(playerChoice);

             } else{
 
                 alert('Tile is already marked');
 
                 markBoard();
             }

             _turn = false;

             if (obj.mark === 'X') player2.startEvent();
             if (obj.mark === 'O') player1.startEvent();

             ticTacToe.searchBoard();
            };

    return { name, mark, incrementScore, getScore, resetScore, changeTurn, markBoard, startEvent};
 };
 
const player1 = Player ('Peter', 'X')
        , player2 = Player ('Clark', 'O');

player1.startEvent();

