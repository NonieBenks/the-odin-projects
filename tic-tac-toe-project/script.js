function Gameboard() {
    const board = [
        [ , , ,],
        [ , , ,],
        [ , , ,]
    ];

    const wins = [
        ["0,0", "1,1", "2,2"],
        ["2,0", "1,1", "0,2"],
        ["0,0", "1,0", "2,0"],
        ["0,1", "1,1", "2,1"],
        ["0,2", "1,2", "2,2"],
        ["1,0", "1,1", "1,2"],
        ["2,0", "2,1", "2,2"],
        ["0,0", "0,1", "0,2"]
    ];

    const getBoard = () => board;
    const getWins = () => wins;

    const displayBoardDOM = () => {
        const cellsArr = document.querySelectorAll('.cell');
    
        cellsArr.forEach(cell => {
            cell.addEventListener('click', (event) => {
                cell.textContent = game.getActivePlayer().marker;
                game.makeMove(cell.dataset.row, cell.dataset.column, game.getActivePlayer())
            });
        });
    
        getBoard().forEach(array => 
         {
            array.forEach(item=> {
                console.log(`${getBoard().indexOf(array)} , ${array.indexOf(item)}`);
            })
         }   
        )
    }

    displayBoardDOM();

    return { getBoard, displayBoardDOM, getWins };
};



function GameController() {
    const gameboard = Gameboard();

    function Player(name, marker, moves) {
        this.name = name;
        this.marker = marker;
        this.moves = moves;
    }
    
    const Player1 = new Player('Player 1', 'X', []);
    const Player2 = new Player('Player 2', 'O', []);

    let activePlayer = Player1;

    switchPlayer = () => {
        activePlayer = activePlayer === Player1 ? Player2 : Player1;
    };
    
    const getActivePlayer = () => activePlayer;

    function makeMove(x, y) {
        if(!gameboard.getBoard()[x][y]) { 
            getActivePlayer().moves.push(`${x},${y}`);
            gameboard.getBoard()[x][y] = getActivePlayer().marker;
            checkWins(getActivePlayer());
            switchPlayer();
        } else {
            console.log('This space is already marked! Choose a different move.')
        }
    }
    
    function checkWins() {
        const wins = gameboard.getWins();
        const board = gameboard.getBoard();
        const hasWinMove = (win) => getActivePlayer().moves.includes(win);
    
        wins.forEach(win => {
            if(win.every(hasWinMove)){
                console.log(`${getActivePlayer().name} has won!`);
                return;
            };
        });
    
        const isATie = (array) => !array.includes(undefined);
    
        if(board.every(isATie)){
            console.log(`It's a tie!`);
        }
    }

    return {
        makeMove,
        getActivePlayer
    }
}

const game = GameController();