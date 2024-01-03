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
        const crossEl = `<span class="material-symbols-outlined">close</span>`;
        const circleEl = `<span class="material-symbols-outlined">radio_button_unchecked</span>`;
    
        cellsArr.forEach(cell => {
            //TODO: fix bug with placing different marker in the spot which is already taken
            cell.addEventListener('click', (event) => {
                cell.innerHTML= game.getActivePlayer().marker === 'X' ? crossEl : game.getActivePlayer().marker === 'O' ? circleEl : event.preventDefault();
                game.makeMove(cell.dataset.row, cell.dataset.column, game.getActivePlayer())
            });
        });
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
        if(gameboard.getBoard()[x][y] === undefined) { 
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
                const dialog = document.getElementById("playerWonDialog");
                const header = document.createElement("h3");
                header.textContent = `${getActivePlayer().name} has won!`;
                dialog.prepend(header);
                dialog.showModal();
                return;
            };
        });
    
        const isATie = (array) => !array.includes(undefined);
    
        if(board.every(isATie)){
            const dialog = document.getElementById("tieDialog");
            dialog.showModal();
        }
    }

    return {
        makeMove,
        getActivePlayer
    }
}

const game = GameController();