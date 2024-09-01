const ticTacToe = (function (){

    let gameBoard = ['.', '.', '.', '.', '.', '.', '.', '.', '.']
       , _turns = 0
       , _ties = 0
       , _boardState; // To reset the object's turns if either player wins.

    const tiesDiv = document.querySelector('.ties');
 
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

     console.log(_turns);

     if (_boardState === true){ _turns = 0; _boardState = false; };

     if (_turns === 9){

        console.log('yes');
        console.log(_ties);
        _turns = 0;

        tiesDiv.textContent = _ties;

        resetBoard('TIE');
     }
    }
 
    function resetBoard (tiles){ 
 
     switch (tiles){
 
         case 'XXX':
             player1.incrementScore();
             break;
         
         case 'OOO':
             player2.incrementScore();
             break;
 
         case 'TIE':
             break;
 
         default:
             return;
    }
            
    ticTacToe.gameBoard = ['.', '.', '.', '.', '.', '.', '.', '.', '.'];
    _boardState = true;

    setTimeout(function (){

        document.querySelectorAll('.board > div > img').forEach((item) => item.remove());
    
        const bodyClone = document.querySelector('main').cloneNode(true); // Must remove images first or else the clone would include the logos.
    
        // https://stackoverflow.com/a/65495646 (So that all event listeners will be removed, and player1.startEvent() will work as intended)
        document.querySelector('main').remove();
        document.querySelector('body').append(bodyClone); 
    
        player1.startEvent(); // Each time that the boards reset, the turns of the players will reset aswell.    
    }, 200)
    }
 
    return { gameBoard, searchBoard };
 
})();
 
function Player (mark){
 
     let _score = 0
        , _turn = (mark === 'X') ? true : false;

    const updateBoard = function (index){

        if (index === undefined) index = null;

        const _markImage = document.createElement('img')
               , _boardDivs = document.querySelectorAll('.board div');

         _markImage.src = mark === 'X' ? './resources/icon/cross.svg' : './resources/icon/circle.svg';

        _boardDivs[index].append(_markImage);
    }

    const updateScore = function (mark){

        const _scoreDiv = document.querySelector(`.score${mark}`);

        _scoreDiv.textContent = _score;
    }
 
     const incrementScore = function (){ _score++; }
            , getScore = function (){ return _score; }
            , resetScore = function (){ _score = 0; }
            , changeTurn = function (){ _turn = _turn === false ? true : _turn }
            , startEvent = function (){ document.querySelector('main').addEventListener('click', (e) => {
                
                if (e.target.getAttribute('data-tile') === null){ this.startEvent(); return }; 

                this.markBoard(this, e.target.getAttribute('data-tile'));
            }
            , {once: true}) }
            , markBoard = function (obj, index){

            const playerChoice = index - 1;
                        
            if (playerChoice === -1) return;

            if ( ticTacToe.gameBoard[playerChoice] === '.'){
                 
                 ticTacToe.gameBoard[playerChoice] = obj.mark;
                 
                 updateBoard(playerChoice);

             } else{
 
                 alert('Tile is already marked');
 
                 markBoard();
             }

             _turn = false;

             if (obj.mark === 'X') player2.startEvent();
             if (obj.mark === 'O') player1.startEvent();

             ticTacToe.searchBoard();

             updateScore(obj.mark);

            };

    return {  mark, incrementScore, getScore, resetScore, changeTurn, markBoard, startEvent };
 };
 
const player1 = Player ('X')
        , player2 = Player ('O');

player1.startEvent();

