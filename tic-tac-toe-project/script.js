function Gameboard() {
    let board = [
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

    const dialog = document.getElementById("new-game-dialog");
    dialog.close();

    const getBoard = () => board;
    const getWins = () => wins;

    return { getBoard, getWins };
};

function Cell() {
    const cellsArr = document.querySelectorAll('.cell');
    const gameboard = Gameboard();

    const displayBoardDOM = () => {
        const crossEl = `<span class="material-symbols-outlined">close</span>`;
        const circleEl = `<span class="material-symbols-outlined">radio_button_unchecked</span>`;

        const newGameDialog = document.getElementById("new-game-dialog");
        newGameDialog.showModal();
    
        cellsArr.forEach(cell => {
            cell.addEventListener('click', (event) => {
                if(gameboard.getBoard()[cell.dataset.row][cell.dataset.column] === undefined && cell.innerHTML === '') {
                    cell.innerHTML = game.getActivePlayer().marker === 'X' ? crossEl : circleEl;
                    game.makeMove(event, cell.dataset.row, cell.dataset.column, game.getActivePlayer());
                }
            });
        });
    }

    return {
        displayBoardDOM
    }
}

function GameController() {
    const gameboard = Gameboard();
    const cell = Cell();

    function Player(name, marker, moves) {
        this.name = name;
        this.marker = marker;
        this.moves = moves;
    }

    const Player1 = new Player('Player1', 'X', []);
    const Player2 = new Player('Player2', 'O', []);

    const setPlayersName = (player1Name, player2Name) => {
        Player1.name = player1Name;
        Player2.name = player2Name;
    };

    let activePlayer = Player1;

    switchPlayer = () => {
        activePlayer = activePlayer === Player1 ? Player2 : Player1;
    };
    
    const getActivePlayer = () => activePlayer;

    cell.displayBoardDOM();

    function makeMove(event, x, y) {
        const isMarkedWarning = document.getElementById('is-marked-warning');
        isMarkedWarning.style.display = "none";

        if(gameboard.getBoard()[x][y] === undefined) { 
            getActivePlayer().moves.push(`${x},${y}`);
            gameboard.getBoard()[x][y] = getActivePlayer().marker;
            checkWins(getActivePlayer());
            switchPlayer();
        } else {
            event.preventDefault();
            isMarkedWarning.style.display = "block";
        }
    }
    
    function checkWins() {
        const hasWinMove = (win) => getActivePlayer().moves.includes(win);
        const header = document.getElementById("result-message");
        const dialog = document.getElementById("result-dialog");

        const board = gameboard.getBoard();
        const wins = gameboard.getWins();
    
        wins.forEach(win => {
            if(win.every(hasWinMove)){
                header.textContent = `${getActivePlayer().name} has won!`;
                dialog.showModal();
                return;
            };
            const isATie = (array) => !array.includes(undefined);
    
            if(board.every(isATie)){
                header.textContent = `It's a tie!`;
                dialog.showModal();
            }
        });
    }

    return {
        makeMove,
        setPlayersName,
        getActivePlayer
    }
}

function startGame() {
    const player1Name = document.getElementById('player1-name').value;
    const player2Name = document.getElementById('player2-name').value;
    const dialog = document.getElementById("new-game-dialog");

    game.setPlayersName(player1Name, player2Name);
    dialog.close();
}

function closeDialog() {
    const dialog = document.getElementById("result-dialog");
    dialog.close();
}

const game = GameController();