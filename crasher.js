let LivingCreature = require('./livingCreature.js');

class Crasher extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.directions = [];
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
    crash() {
        this.getNewCoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == 1) {
                    matrix[y][x] = 0
                    for (var i in grassArr) {
                        if (x == grassArr[i].x && y == grassArr[i].y) {
                            grassArr.splice(i, 1);
                            this.die();
                            break;
                        }
                    }
                }
                if (matrix[y][x] == 2) {
                    matrix[y][x] = 0
                    for (var i in grassEaterArr) {
                        if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1);
                            this.die();
                            break;
                        }
                    }
                }
                if (matrix[y][x] == 3) {
                    matrix[y][x] = 0
                    for (var i in predatorArr) {
                        if (x == predatorArr[i].x && y == predatorArr[i].y) {
                            predatorArr.splice(i, 1);
                            this.die();
                            break;
                        }
                    }
                }
                if (matrix[y][x] == 4) {
                    matrix[y][x] = 0
                    for (var i in allEaterArr) {
                        if (x == allEaterArr[i].x && y == allEaterArr[i].y) {
                            allEaterArr.splice(i, 1);
                            this.die();
                            break;
                        }
                    }
                }
                if (matrix[y][x] == 6) {
                    matrix[y][x] = 0
                    for (var i in foodArr) {
                        if (x == foodArr[i].x && y == foodArr[i].y) {
                            foodArr.splice(i, 1);
                            this.die();
                            break;
                        }
                    }
                }
                if (matrix[y][x] == 7) {
                    matrix[y][x] = 0
                    for (var i in transformArr) {
                        if (x == transformArr[i].x && y == transformArr[i].y) {
                            transformArr.splice(i, 1);
                            this.die();
                            break;
                        }
                    }
                }
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in crasherArr) {
            if (this.x == crasherArr[i].x && this.y == crasherArr[i].y) {
                crasherArr.splice(i, 1);
                break;
            }
        }

    }
}

module.exports = Crasher;