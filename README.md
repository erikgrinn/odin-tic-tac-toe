# odin-tic-tac-toe

This project is a simple implementation of the Tic-Tac-Toe game using HTML, CSS, and JavaScript. Below are the key coding concepts used in this project:

## Key Coding Concepts

### 1. Module Pattern
The project uses the module pattern to encapsulate the game logic and grid functionalities. This helps in organizing the code and avoiding global namespace pollution.

#### Example:
```js
const grid = (function() {
    // ...existing code...
    return {addListeners, removeEventListeners, fullGrid, resetGrid};
})();
```

### 2. Immediately Invoked Function Expressions (IIFE)
IIFEs are used to create isolated scopes for the modules, ensuring that the variables and functions do not interfere with each other.

#### Example:
```js
const game = (function() {
    // ...existing code...
    return {players, updateBoard, winState, scores, resetGame};
})();
```

### 3. Event Listeners
Event listeners are used to handle user interactions such as clicks and mouse movements on the game grid.

#### Example:
```js
function addListeners() {
    gridItems.forEach(item => {
        item.addEventListener('click', handleClick);
        item.addEventListener('mouseover', handleHover);
        item.addEventListener('mouseout', handleMouseOut);
    });
}
```
### 4. DOM Manipulation
The project extensively uses DOM manipulation to update the game board, display the winner, and reset the game.

#### Example:
```js
function updateBoard(player, row, col) {
    gameboard[row][col - 1] = player.marker;
    document.getElementById(row + (col)).innerHTML = player.marker;
}
```
### 5. Factory Functions
Factory functions are used to create player objects with specific properties and methods.

#### Example:
```js
function createPlayer(promptMessage, marker) {
    const name = prompt(promptMessage);
    const player = new Player(name, marker);
    return player;
}
```

### 6. Conditional Logic
Conditional logic is used to determine the game state, check for a win or tie, and switch turns between players.

#### Example:
```js
if (game.winState()) {
    // ...existing code...
} else if (grid.fullGrid() == 9) {
    // ...existing code...
} else {
    game.players.player1.turn = !game.players.player1.turn;
    game.players.player2.turn = !game.players.player2.turn;
}
```

### 7. CSS Flexbox and Grid
CSS Flexbox and Grid are used to style the game layout, ensuring that the elements are properly aligned and responsive.

#### Example:
```js
#board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    // ...existing code...
}
```

## How to Run the Project
1. Open index.html in a web browser.
2. Follow the prompts to enter player names.
3. Click on the cells to play the game.

Enjoy playing Tic-Tac-Toe!