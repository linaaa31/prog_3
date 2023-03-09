let LivingCreature = require('./livingCreature.js');

class Grass extends LivingCreature {
  constructor(x, y) {
    super(x, y);
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
    if (spawnGrass == true) {
      function random(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
      }
      if (this.gender === 'f') {
        this.multipy++;
        var newCell = random(this.chooseCell(0));
        if (this.multipy >= 2 && newCell) {
          let newX = newCell[0];
          let newY = newCell[1];
          matrix[newY][newX] = 1;

          let newGender = Math.random() >= 0.5 ? 'm' : 'f';
          let newGrass = new Grass(newX, newY, newGender);
          grassArr.push(newGrass);
          this.multipy = 0;

        }
      }
    }
  }
}

module.exports = Grass;