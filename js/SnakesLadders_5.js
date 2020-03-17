// https://www.codewars.com/kata/587136ba2eefcb92a9000027

const snl = {
    // snakes
    99: 80,
    95: 75,
    92: 88,
    89: 68,
    74: 53,
    64: 60,
    62: 19,
    49: 11,
    46: 25,
    16: 6,

    // ladders
    2: 38,
    7: 14,
    8: 31,
    15: 26,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    78: 98,
    87: 94,
}

class Player {
    constructor() {
        this.pos = 0;
    }

    move(roll) {
        let newPos = this.pos + roll;

        if (newPos > 100) {
            newPos = 100 - (newPos - 100);
        }

        if (Object.keys(snl).includes(newPos.toString())) {
            this.pos = snl[newPos];
            return;
        }

        this.pos = newPos;
    }

    get position() {
        return this.pos;
    }

}



class SnakesLadders {
    constructor() {
        this.players = {
            0: new Player(),
            1: new Player()
        }
        this.turn = 0;
    }

    currentPlayer() {
        return this.players[this.turn]
    }

    win() {
        return `Player ${this.turn + 1} Wins!`;
    }

    gameOver() {
        return `Game over!`
    }


    nextTurn(hasDouble) {
        const msg = `Player ${this.turn + 1} is on square ${this.currentPlayer().position}`;

        this.turn = hasDouble ? this.turn : Number(!this.turn);

        return msg
    }

    play(x, y) {

        if (this.players[0].position === 100 || this.players[1].position === 100) return this.gameOver();

        this.currentPlayer().move(x + y)

        if (this.currentPlayer().position === 100) return this.win()

        return this.nextTurn(x === y)


    }



}
