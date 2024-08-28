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
// console.log(gameboard[userInput.charAt(0).toUpperCase()][parseInt(userInput.charAt(1))-1])
function game(player1, player2) {
     if (player1.turn) {
        userInput = prompt(`${player1}: Choose your position (ex. B2)`)
        if (gameboard[userInput.charAt(0).toUpperCase()][parseInt(userInput.charAt(1))-1] === null && player2.marker) {
            gameboard[userInput.charAt(0).toUpperCase()][parseInt(userInput.charAt(1))-1] = player1.marker
            console.log(gameboard)
            player1.turn = false
            player2.turn = true
         }
     } else if (player2.turn) {
        userInput = prompt(`${player2}: Choose your position (ex. B2)`)
        if (gameboard[userInput.charAt(0).toUpperCase()][parseInt(userInput.charAt(1))-1] === null && player1.marker) {
            gameboard[userInput.charAt(0).toUpperCase()][parseInt(userInput.charAt(1))-1] = player2.marker
            console.log(gameboard)
            player2.turn = false
            player1.turn = true
         }
     }
}

game(player1, player2)