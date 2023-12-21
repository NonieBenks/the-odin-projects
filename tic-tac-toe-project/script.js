let Gameboard = {
    board: [
        [ , , ,],
        [ , , ,],
        [ , , ,]
    ],
    wins : [
        ["0,0", "1,1", "2,2"],
        ["2,0", "1,1", "0,2"],
        ["0,0", "1,0", "2,0"],
        ["0,1", "1,1", "2,1"],
        ["0,2", "1,2", "2,2"],
        ["1,0", "1,1", "1,2"],
        ["2,0", "2,1", "2,2"],
        ["0,0", "0,1", "0,2"]
    ]
};

let Player1 = {
    marker: 'X',
    name: 'Player 1',
    moves: []
}

let Player2 = {
    marker: 'O',
    name: 'Player 2',
    moves: []
}


function displayBoard() {
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        console.log(cell);
        cell.addEventListener('click', makeMove(cell.dataset.row, cell.dataset.column, Player1));
    });

    Gameboard.board.forEach(array => 
     {
        array.forEach(item=> {
            console.log(`${Gameboard.board.indexOf(array)} , ${array.indexOf(item)}`);
        })
     }   
    )
}

const getBoard = () => Gameboard.board;

displayBoard();

function switchPlayer(activePlayer) {
    activePlayer = activePlayer === Player1 ? Player2 : Player1;
}


function makeMove(x, y, activePlayer) {
    if(!Gameboard.board[x][y]) { 
        activePlayer.moves.push(`${x},${y}`);
        checkWins(activePlayer);
        switchPlayer(activePlayer);
        Gameboard.board[x][y] = activePlayer.marker;
        console.log(Gameboard.board);
    } else {
        console.log('This space is already marked! Choose a different move.')
    }
}

function checkWins(activePlayer) {
    const wins = Object.values(Gameboard.wins);
    const hasWinMove = (win) => activePlayer.moves.includes(win);

    wins.forEach(win => {
        if(win.every(hasWinMove)){
            console.log(`${activePlayer.name} has won!`);
            return;
        };
    });

    const isATie = (array) => !array.includes(undefined);

    if(Gameboard.board.every(isATie)){
        console.log(`It's a tie!`);
    }
}
