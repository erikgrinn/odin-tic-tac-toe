const gameboard = {
    A: [null, null, null],
    B: [null, null, null],
    C: [null, null, null],
}

function Player(name, marker) {
    this.name = name
    this.marker = marker
    this.turn = false

}

function createPlayer(promptMessage, marker) {
    const name = prompt(promptMessage);
    const player = new Player(name, marker);
    return player;
}

const player1 = createPlayer('Enter Player 1 name', 'X');
const player2 = createPlayer('Enter Player 2 name', 'O');
player1.turn = true

let count = 0

function game(player1, player2) {
    let userInput;

    if (player1.turn) {
        userInput = prompt(`${player1.name}: Choose your position (ex. B2)`);
    } else if (player2.turn) {
        userInput = prompt(`${player2.name}: Choose your position (ex. B2)`);
    }

    // Input validation
    if (userInput.length !== 2 ||
        !['A', 'B', 'C'].includes(userInput.charAt(0).toUpperCase()) ||
        isNaN(userInput.charAt(1)) ||
        parseInt(userInput.charAt(1)) < 1 ||
        parseInt(userInput.charAt(1)) > 3) {
        alert('Input not valid');
        return game(player1, player2)
    }

    const row = userInput.charAt(0).toUpperCase();
    const col = parseInt(userInput.charAt(1)) - 1;

    if (player1.turn) {
        if (gameboard[row][col] === null) {
            gameboard[row][col] = player1.marker;
        } else {
            alert('Cell already occupied');
            return game(player1, player2);
        }
    } else if (player2.turn) {
        if (gameboard[row][col] === null) {
            gameboard[row][col] = player2.marker;
        } else {
            alert('Cell already occupied');
            return game(player1, player2);
        }
    }

    if (winState(gameboard)) {
        if (player1.turn) {
            return `${player1.name} wins!`;
        } else if (player2.turn) {
            return `${player2.name} wins!`;
        } 
    } else if (count === 8) {
        return "It's a tie!"
    } else {
        console.log(gameboard)
        count++
        if (player1.turn) {
            player1.turn = false;
            player2.turn = true;
        } else if (player2.turn) {
            player2.turn = false;
            player1.turn = true;
        }
        return game(player1, player2); // recursive call, needed to display win message
    }
}

function winState(gameboard) {
    let col1 = gameboard.A[0] + gameboard.B[0] + gameboard.C[0]  
    let col2 = gameboard.A[1] + gameboard.B[1] + gameboard.C[1]
    let col3 = gameboard.A[2] + gameboard.B[2] + gameboard.C[2]
    let row1 = gameboard.A[0] + gameboard.A[1] + gameboard.A[2]
    let row2 = gameboard.B[0] + gameboard.B[1] + gameboard.B[2]
    let row3 = gameboard.C[0] + gameboard.C[1] + gameboard.C[2]
    let dia1 = gameboard.A[0] + gameboard.B[1] + gameboard.C[2]
    let dia2 = gameboard.C[0] + gameboard.B[1] + gameboard.A[2]

    let gameState =
        col1 === 'XXX' || col1 === 'OOO' ||
        col2 === 'XXX' || col2 === 'OOO' ||
        col3 === 'XXX' || col3 === 'OOO' ||
        row1 === 'XXX' || row1 === 'OOO' ||
        row2 === 'XXX' || row2 === 'OOO' ||
        row3 === 'XXX' || row3 === 'OOO' ||
        dia1 === 'XXX' || dia1 === 'OOO' ||
        dia2 === 'XXX' || dia2 === 'OOO';

    return gameState
}

console.log(game(player1, player2))