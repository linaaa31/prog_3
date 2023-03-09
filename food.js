let LivingCreature = require('./livingCreature.js');

class Food extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 30;
        this.directions = [];
        this.getNewCoordinates();
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        return super.chooseCell(character);
    }

    move() {

        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy--;
        }
        if (this.energy == 0) {
            this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in foodArr) {
            if (this.x == foodArr[i].x && this.y == foodArr[i].y) {
                foodArr.splice(i, 1);
                break;
            }
        }
    }
}
module.exports = Food;
