const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("."));

app.get("/", (req, res) => {
    res.redirect("index.html");
});

server.listen(3000);

matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
allEaterArr = [];
crasherArr = [];
foodArr = [];
transformArr = [];
spawnAllEaters = true;
spawnGrassEaters = true;
spawnFood = true;
spawnGrass = true;
let Grass = require('./grass.js');
let GrassEater = require('./grassEater.js');
let Predator = require('./predator.js');
let AllEater = require('./allEater.js');
let Crasher = require('./crasher.js');
let Food = require('./food.js');
let TransformingCreature = require('./transformingCreature.js');

io.on("connection", (socket) => {
    socket.on("send event1", (data) => {
        spawnAllEaters = data;

    })
    socket.on("send event2", (data) => {
        spawnGrassEaters = data;
    })
    socket.on("send event3", (data) => {
        spawnGrass = data;
    })
    socket.on("send event4", (data) => {
        spawnGrass = data;
    })
    socket.on("send event5", (data) => {
        spawnAllEaters = data;
    })
}
);


function matrixGenerator(size, countGrass, countGrassEater, countPredator, countAllEater, countCrasher, countFood, countTransform) {
    function random(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    for (let i = 0; i < size; i++) {
        matrix.push([])
        for (let j = 0; j < size; j++) {
            matrix[i].push(0)
        }
    }
    console.log(size);

    for (let i = 0; i < countGrass; i++) {
        let x = Math.floor(random(0, size - 1))
        let y = Math.floor(random(0, size - 1))
        matrix[y][x] = 1
    }
    for (let i = 0; i < countGrassEater; i++) {
        let x = Math.floor(random(0, size - 1))
        let y = Math.floor(random(0, size - 1))
        matrix[y][x] = 2
    }
    for (let i = 0; i < countPredator; i++) {
        let x = Math.floor(random(0, size - 1))
        let y = Math.floor(random(0, size - 1))
        matrix[y][x] = 3
    }
    for (let i = 0; i < countAllEater; i++) {
        let x = Math.floor(random(0, size - 1))
        let y = Math.floor(random(0, size - 1))
        matrix[y][x] = 4
    }
    for (let i = 0; i < countCrasher; i++) {
        let x = Math.floor(random(0, size - 1))
        let y = Math.floor(random(0, size - 1))
        matrix[y][x] = 5
    }
    for (let i = 0; i < countFood; i++) {
        let x = Math.floor(random(0, size - 1))
        let y = Math.floor(random(0, size - 1))
        matrix[y][x] = 6
    }
    for (let i = 0; i < countTransform; i++) {
        let x = Math.floor(random(0, size - 1))
        let y = Math.floor(random(0, size - 1))
        matrix[y][x] = 7
    }
    io.emit("send matrix", matrix);
};
matrixGenerator(50, 80, 30, 20, 30, 20, 10, 30);

function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {

                let grass = new Grass(x, y)
                grassArr.push(grass)
            }
            else if (matrix[y][x] == 2) {

                let grassEater = new GrassEater(x, y)
                grassEaterArr.push(grassEater)
            }
            else if (matrix[y][x] == 3) {

                let predator = new Predator(x, y)
                predatorArr.push(predator)
            }
            else if (matrix[y][x] == 4) {

                let allEater = new AllEater(x, y)
                allEaterArr.push(allEater)
            }
            else if (matrix[y][x] == 5) {

                let crasher = new Crasher(x, y)
                crasherArr.push(crasher)
            }
            else if (matrix[y][x] == 6) {

                let food = new Food(x, y)
                foodArr.push(food)
            }
            else if (matrix[y][x] == 7) {

                let transformer = new TransformingCreature(x, y)
                transformArr.push(transformer)
            }
        }
    }
}

createObject();

function gameMove() {
    for (let i = 0; i < grassArr.length; i++) {

        grassArr[i].mul()
    }
    for (let i = 0; i < grassEaterArr.length; i++) {

        grassEaterArr[i].eat()
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat()
    }
    for (let i = 0; i < allEaterArr.length; i++) {
        allEaterArr[i].eat()
    }
    for (let i = 0; i < crasherArr.length; i++) {
        crasherArr[i].crash()
    }
    for (let i = 0; i < foodArr.length; i++) {
        foodArr[i].move()
    }
    for (let i = 0; i < transformArr.length; i++) {
        transformArr[i].eat()
    }
    io.emit("send matrix", matrix);
}

const fs = require("fs");

fs.truncate('prog.txt', 0, function(){console.log('done')})

let count = 0;
let gameCount = 0;
const time = 1000;
const totalCount = 10; // or 60
let totalGrassCount = 0;

(function loop() {
    if (grassEaterArr.length === 0 && predatorArr.length === 0 && allEaterArr.length === 0 &&
        crasherArr.length === 0 && foodArr.length === 0 && transformArr.length === 0) {
        console.log("Game over - no characters on canvas.");
        return;
      }
  setTimeout(function () {
    gameMove();
    count++;
    const newGrassCount = grassArr.length - totalGrassCount;
    totalGrassCount += newGrassCount;
    if (count === totalCount) {
      const data = {
        totalGrassCount,
        gameCount,
      };
      const fs = require("fs");
      fs.appendFile("prog.txt", JSON.stringify(data)+ "\n", (err) => {
        if (err) throw err;
        console.log(`Grass counts written to file at game ${gameCount}`);
      });
      count = 0;
      totalGrassCount = 0;
      gameCount++;
    }
    loop();
  }, time);
  if (gameCount < totalCount && count === totalCount) {
    reset();
  }
})();

