const gameboard = {
    A: [null, null, null],
    B: [null, null, null],
    C: [null, null, null],
};

function updateDisplay(player, row, col) {
    document.getElementById(row + (col)).innerHTML = player.marker;
}

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.turn = false;
}

function createPlayer(promptMessage, marker) {
    const name = prompt(promptMessage);
    const player = new Player(name, marker);
    return player;
}

const player1 = createPlayer('Enter Player 1 name', 'X');
const player2 = createPlayer('Enter Player 2 name', 'O');
player1.turn = true;

const gridItems = document.querySelectorAll('.cell');

let count = 0;

gridItems.forEach(item => {
    item.addEventListener('click', () => handleClick(item));
});

function handleClick(item) {
    const currentPlayer = player1.turn ? player1 : player2;

    if (item.innerHTML === '') {

        let row = item.id.charAt(0);
        let col = parseInt(item.id.charAt(1));
        updateDisplay(currentPlayer, row, col);
        gameboard[row][col - 1] = currentPlayer.marker;

        // Small delay to allow the UI to update before checking win state
        setTimeout(() => {
            if (winState()) {
                alert(`${currentPlayer.name} wins!`);
                resetGame();
            } else if (count === 8) {
                alert("It's a tie!");
                resetGame();
            } else {
                count++;
                player1.turn = !player1.turn;
                player2.turn = !player2.turn;
            }
        }, 50); 
    } else {
        alert('The cell is already taken!');
    }
}

function winState() {
    let col1 = gameboard.A[0] + gameboard.B[0] + gameboard.C[0];
    let col2 = gameboard.A[1] + gameboard.B[1] + gameboard.C[1];
    let col3 = gameboard.A[2] + gameboard.B[2] + gameboard.C[2];
    let row1 = gameboard.A[0] + gameboard.A[1] + gameboard.A[2];
    let row2 = gameboard.B[0] + gameboard.B[1] + gameboard.B[2];
    let row3 = gameboard.C[0] + gameboard.C[1] + gameboard.C[2];
    let dia1 = gameboard.A[0] + gameboard.B[1] + gameboard.C[2];
    let dia2 = gameboard.C[0] + gameboard.B[1] + gameboard.A[2];

    return (
        col1 === 'XXX' || col1 === 'OOO' ||
        col2 === 'XXX' || col2 === 'OOO' ||
        col3 === 'XXX' || col3 === 'OOO' ||
        row1 === 'XXX' || row1 === 'OOO' ||
        row2 === 'XXX' || row2 === 'OOO' ||
        row3 === 'XXX' || row3 === 'OOO' ||
        dia1 === 'XXX' || dia1 === 'OOO' ||
        dia2 === 'XXX' || dia2 === 'OOO'
    );
}

function resetGame() {
    count = 0;
    player1.turn = true;
    player2.turn = false;
    for (let row in gameboard) {
        gameboard[row] = [null, null, null];
    }
    gridItems.forEach(item => {
        item.innerHTML = '';
    });
}

alert(`${player1.name}'s turn. Pick a tile`);

