const gameboard = {
    A: [null, null, null],
    B: [null, null, null],
    C: [null, null, null],
}

function Player(name, marker) {
    this.name = name
    this.marker = marker
    this.turn = false

    // const player1 = (prompt('Enter Player 1 name'), 'X')
    // const player2 = (prompt('Enter Player 2 name'), '0')

}


const player1 = new Player(prompt('Enter Player 1 name'), 'X')
const player2 = new Player(prompt('Enter Player 2 name'), '0')
player1.turn = true

let userInput;
function game(player1, player2) {

     if (player1.turn) {
        userInput = prompt(`${player1}: Choose your position (ex. B2)`)
        if (gameboard[userInput.charAt(0).toUpperCase()][parseInt(userInput.charAt(1))-1] === null && player2.marker) {
            gameboard[userInput.charAt(0).toUpperCase()][parseInt(userInput.charAt(1))-1] = player1.marker
         }
     } else if (player2.turn) {
        userInput = prompt(`${player2}: Choose your position (ex. B2)`)
        if (gameboard[userInput.charAt(0).toUpperCase()][parseInt(userInput.charAt(1))-1] === null && player1.marker) {
            gameboard[userInput.charAt(0).toUpperCase()][parseInt(userInput.charAt(1))-1] = player2.marker
         }
     }

     console.log(gameboard)

     if (winState(gameboard)) {
        if (player1.turn) {
            return `${player1.name} wins!`
        } else {
            return `${player2.name} wins!`
        }
    } else {
        if (player1.turn) {
            player1.turn = false
            player2.turn = true
        }
        else if (player2.turn) {
            player2.turn = false
            player1.turn = true
        }
        return game(player1, player2) // recursive call, needed to display win message
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