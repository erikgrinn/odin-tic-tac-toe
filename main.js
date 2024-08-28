const gameboard = {
    A: [' ', ' ',' '],
    B: [' ', ' ',' '],
    C: [' ', ' ',' '],
}

// const gameboard = function (position){
//     row1: [' ', ' ',' '],
//     row2: [' ', ' ',' '],
//     row3: [' ', ' ',' '],
// }

function Player(name, marker) {
    this.name = name
    this.marker = marker
    this.turn = false

    // const player1 = (prompt('Enter Player 1 name'), 'X')
    // const player2 = (prompt('Enter Player 2 name'), '0')

}

// const player1 = new Player(prompt('Enter Player 1 name'), 'X')
// const player2 = new Player(prompt('Enter Player 2 name'), '0')
// player1.turn = true

console.log(player1, player2, gameboard)

// gameboard.A[2] = player1.marker
console.log(gameboard["A"])

let userInput;
function game(player1, player2) {
     if (player1.turn) {
        userInput = prompt(`${player1}: Choose your position (ex. B2)`)
        if (gameboard[userInput.charAt(0)][parseInt(userInput.charAt(1))] === (' ') && player2.marker) {
            gameboard[userInput.charAt(0)][parseInt(userInput.charAt(1))] = player1.marker
         }
     } else if (player2.turn) {
        userInput = prompt(`${player2}: Choose your position (ex. B2)`)
        if (gameboard[userInput.charAt(0)][parseInt(userInput.charAt(1))] === (' ') && player1.marker) {
            gameboard[userInput.charAt(0)][parseInt(userInput.charAt(1))] = player2.marker
         }
     }
}

// game(player1, player2)