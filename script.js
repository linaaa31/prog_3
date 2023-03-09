const dimension = 50;
const side = 10;
const frameRate = 5;
let socket = io();
let currentWeather = "winter";
const weatherOptions = ["winter", "spring", "summer", "autumn"];

const weatherChangeInterval = 8000;

createTable(dimension, side, side);

setInterval(function() {
  let currentWeatherIndex = weatherOptions.indexOf(currentWeather);
  currentWeatherIndex = (currentWeatherIndex + 1) % weatherOptions.length;
  currentWeather = weatherOptions[currentWeatherIndex];
}, weatherChangeInterval);

(function loop() {
  socket.on('send matrix', function(matrix) {
    updateTable(matrix, currentWeather);
  });
  setTimeout(loop, 1000 / frameRate);
})();

function updateWeatherInfo(currentWeather) {
    const weatherInfoElement = document.getElementById("weather-info");
    weatherInfoElement.innerText = `Current weather: ${currentWeather}`;
  }

document.getElementById("grass-text").addEventListener("click",stopGrassSpawn );
document.getElementById("grass-start").addEventListener("click",startGrassSpawn );

document.getElementById("all-stop").addEventListener("click",stopAllEaterSpawn);
document.getElementById("all-start").addEventListener("click",startAllEaterSpawn );

function stopAllEaterSpawn() {
    spawnAllEaters = false;
    socket.emit('send event1', spawnAllEaters );
}
function stopGrassSpawn() {
    spawnGrass= false;
    socket.emit('send event3',  spawnGrass );
}
function startGrassSpawn(){
    spawnGrass = true;
    socket.emit('send event4', spawnGrass)
}
function startAllEaterSpawn(){
  spawnAllEaters = true;
  socket.emit('send event5', spawnAllEaters );
}