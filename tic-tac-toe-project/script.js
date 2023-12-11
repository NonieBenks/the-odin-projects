let Gameboard = {
    board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]
};

let Player1 = {
    marker: 'X',
    makeMove: function(x, y) {
        Gameboard.board[x][y] = Player1.marker;
    }
}

let Player2 = {
    marker: 'O',
    makeMove: function(x, y) {
        Gameboard.board[x][y] = Player2.marker;
    }
}

console.log(Gameboard.board);