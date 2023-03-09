let LivingCreature = require('./livingCreature.js');

class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 14;
        this.directions = [];
        this.gender = Math.random() >= 0.5 ? 'm' : 'f';
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
        this.getNewCoordinates()
        return super.chooseCell(character);
    }
    mul() {
        if (spawnGrassEaters == true) {
            function random(arr) {
                return arr[Math.floor(Math.random() * arr.length)]
            }
            if (this.gender === 'f') {

                var emptyCells = this.chooseCell(0);
                var newCell = random(emptyCells);

                if (newCell) {
                    var newX = newCell[0];
                    var newY = newCell[1];
                    matrix[newY][newX] = 2;

                    let newGender = Math.random() >= 0.5 ? 'm' : 'f';
                    var newGrassEater = new GrassEater(newX, newY, newGender);
                    grassEaterArr.push(newGrassEater);
                    this.energy = 14;
                }
            }
        }
    }
    move() {
        this.energy--
        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY

        } else {
            this.die()
        }
    }

    eat() {
        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
            if (this.energy > 15) {
                this.mul()
            }
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}

module.exports = GrassEater;
