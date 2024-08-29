// grid items event listeners and count
const grid = (function() {
    const gridItems = document.querySelectorAll('.cell');

    function addListeners() {
        gridItems.forEach(item => {
            item.addEventListener('click', handleClick);
            item.addEventListener('mouseover', handleHover);
            item.addEventListener('mouseout', handleMouseOut);
        });
    }

    function removeEventListeners() {
        gridItems.forEach(item => {
            item.removeEventListener('click', handleClick);
            item.removeEventListener('mouseover', handleHover);
            item.removeEventListener('mouseout', handleMouseOut);
        });
    }

    function fullGrid() {
        let count = 0
        gridItems.forEach(item => {
            if (item.innerHTML != '') {
                count++
            }
        })
        return count
    }

    function resetGrid() {
        gridItems.forEach(item => {
            item.innerHTML = '';
            item.removeAttribute('clicked');
            item.addEventListener('mouseover', handleHover);
            item.addEventListener('mouseout', handleMouseOut);
        });
    }

    addListeners()

    return {addListeners, removeEventListeners, fullGrid, resetGrid};

})();

const game = (function() {
    const gameboard = {
    A: [null, null, null],
    B: [null, null, null],
    C: [null, null, null],
    }

    const players = (function () {
        const player1 = createPlayer('Enter Player 1 name', 'X');
        const player2 = createPlayer('Enter Player 2 name', 'O');
        player1.turn = true;
    
        return {player1, player2}
    })();
    
    function Player(name, marker) {
        this.name = name;
        this.marker = marker;
        this.turn = false;
        this.score = 0
    }
    
    function createPlayer(promptMessage, marker) {
        const name = prompt(promptMessage);
        const player = new Player(name, marker);
        return player;
    }

    function updateBoard(player, row, col) {
        gameboard[row][col - 1] = player.marker;
        document.getElementById(row + (col)).innerHTML = player.marker;
        return gameboard
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

    function scores() {
        const scoreDiv1 = document.querySelector('.player1')
        scoreDiv1.innerHTML = `${players.player1.name}: ${players.player1.score}`
        const scoreDiv2 = document.querySelector('.player2')
        scoreDiv2.innerHTML = `${players.player2.name}: ${players.player2.score}`
    }

    function resetGame() {
        const replayBtn = document.querySelector('.replay')
        replayBtn.style.visibility = 'visible'
        replayBtn.addEventListener('click', () => {
            players.player1.turn = true;
            players.player2.turn = false;
            for (let row in gameboard) {
                gameboard[row] = [null, null, null];
            }
            grid.resetGrid()
            grid.addListeners()
            replayBtn.style.visibility = 'hidden'
        })
    }

    scores()

    return {players, updateBoard, winState, scores, resetGame}
})();

function handleClick(event) {
    const currentPlayer = game.players.player1.turn ? game.players.player1 : game.players.player2;
    if ((event.target.innerHTML === currentPlayer.marker) && !event.target.getAttribute('clicked')) {
        event.target.setAttribute('clicked', true)
        event.target.removeEventListener('mouseover', handleHover)
        event.target.removeEventListener('mouseout', handleMouseOut)

        let row = event.target.id.charAt(0);
        let col = parseInt(event.target.id.charAt(1));
        game.updateBoard(currentPlayer, row, col);

        // Small delay to allow the UI to update before checking win state

        if (game.winState()) {
            alert(`${currentPlayer.name} wins!`);
            currentPlayer.score++
            game.scores()
            grid.removeEventListeners()
            game.resetGame();
        } else if (grid.fullGrid() == 9) {
            alert("It's a tie!");
            game.resetGame();
        } else {
            game.players.player1.turn = !game.players.player1.turn;
            game.players.player2.turn = !game.players.player2.turn;
        }

    } else {
        alert('The cell is already taken!');
    }
}

function handleHover(event) {
    const currentPlayer = game.players.player1.turn ? game.players.player1 : game.players.player2;
    event.target.innerHTML = currentPlayer.marker;
}

function handleMouseOut(event) {
    event.target.innerHTML = '';
}