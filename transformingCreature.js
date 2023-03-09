let LivingCreature = require('./livingCreature.js');
let GrassEater = require('./grassEater.js');
let Predator = require('./predator.js');
let AllEater = require('./allEater.js');
let Crasher = require('./crasher.js');

class TransformingCreature extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
        this.transformInto = null;
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
        if (newCell && this.energy >=0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 7
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }
    transform() {
        let charactersToTransformInto = [GrassEater, Predator, AllEater, Crasher];
        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        let chosenCharacter = random(charactersToTransformInto);
        let index = transformArr.indexOf(this);
        transformArr.splice(index, 1);
        matrix[this.y][this.x] = 0;
        let newCreature = new chosenCharacter(this.x, this.y);
        switch (chosenCharacter) {
            case GrassEater:
                grassEaterArr.push(newCreature);
                matrix[this.y][this.x] = 2;
                break;
            case Predator:
                predatorArr.push(newCreature);
                matrix[this.y][this.x] = 3;
                break;
            case AllEater:
                allEaterArr.push(newCreature);
                matrix[this.y][this.x] = 4;
                break;
            case Crasher:
                crasherArr.push(newCreature);
                matrix[this.y][this.x] = 5;
                break;
        }
    }

    eat() {
        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        let grassCells = this.chooseCell(1);
        let newCell = random(grassCells);
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy++;
            if (this.energy >= 14) {
                this.transform();
            }
            for (let i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in transformArr) {
            if (this.x == transformArr[i].x && this.y == transformArr[i].y) {
                transformArr.splice(i, 1);
                break;
            }
        }
    }
    
}
module.exports = TransformingCreature;