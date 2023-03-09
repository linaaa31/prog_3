let LivingCreature = require('./livingCreature.js');
class AllEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.directions = [];
        this.energy = 20;
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
        return super.chooseCell(character);
    }

    mul() {
        if (spawnAllEaters == true) {

            function random(arr) {
                return arr[Math.floor(Math.random() * arr.length)]
            }
            if (this.gender === 'f') {

                var emptyCells = this.chooseCell(0);
                var newCell = random(emptyCells);

                if (newCell) {
                    var newX = newCell[0];
                    var newY = newCell[1];
                    matrix[newY][newX] = 4;
                    let newGender = Math.random() >= 0.5 ? 'm' : 'f';

                    var newallEater = new AllEater(newX, newY, newGender);
                    allEaterArr.push(newallEater);
                    this.energy = 20;
                }
            }
        }
    }
    move() {
        this.energy--;
        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4
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
        var allPredators = this.chooseCell(3)
        var allFood = this.chooseCell(6);
        let al = allGrass.concat(allGrasseaters);
        let alll = al.concat(allPredators);
        let all = alll.concat(allFood);
        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        var oneCell = random(all);
        if (oneCell) {
            this.energy++;
            var newX = oneCell[0];
            var newY = oneCell[1];
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
            if (this.energy > 23) {
                this.mul()
            }
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
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
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
        for (var i in allEaterArr) {
            if (this.x == allEaterArr[i].x && this.y == allEaterArr[i].y) {
                allEaterArr.splice(i, 1);
                break;
            }
        }
    }
}

module.exports = AllEater;
