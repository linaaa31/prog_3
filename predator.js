let LivingCreature = require('./livingCreature.js');

class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.directions = [];
        this.energy = 20;
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
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }
    eat() {
        this.getNewCoordinates()
        var allGrass = this.chooseCell(1);
        var allGrasseaters = this.chooseCell(2);
        var allFood = this.chooseCell(6);
        let al = allGrass.concat(allGrasseaters);
        let all = al.concat(allFood);
        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        var newCell = random(all);
        if (newCell) {
            this.energy++;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (var i in foodArr) {
                if (newX == foodArr[i].x && newY == foodArr[i].y) {
                    foodArr.splice(i, 1);
                    break;
                }
            }

        } else {
            this.move();
        }

    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}
module.exports = Predator;