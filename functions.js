function createTable(tableSize, width, height) {
  let gamingTable = document.createElement("div");
  gamingTable.id = "gaming-table";
  document.body.insertBefore(gamingTable, document.body.firstChild);

  for (let i = 0; i < tableSize; i++) {
    let newRow = document.createElement("div");
    newRow.className = "row-" + (i + 1);
    newRow.style.height = height + "px";
    for (let j = 0; j < tableSize; j++) {
      let newCell = document.createElement("div");
      newCell.style.backgroundColor = "gray";
      newCell.style.width = width + "px";
      newCell.style.height = height + "px";
      newCell.style.display = "inline-block";
      newCell.style.border = "1px solid black";
      newCell.dataset.character = "0";
      newRow.appendChild(newCell);
    }
    gamingTable.appendChild(newRow);
  }
}
function updateTable(matrix, currentWeather) {
  children = document.getElementById("gaming-table").children;
  const colors = {
    0: {
      "winter": "gray",
      "spring": "gray",
      "summer": "gray",
      "autumn": "gray"
    },
    1: {
      "winter": "white",
      "spring": "green",
      "summer": "#06FF00",
      "autumn": "#0B4619"
    },
    2: {
      "winter": "#F9F54B",
      "spring": "yellow",
      "summer": "#FFE400",
      "autumn": "yellow"
    },
    3: {
      "winter": "#C92C6D",
      "spring": "magenta",
      "summer": "#EA047E",
      "autumn": "megenta"
    },
    4: {
      "winter": "#000957",
      "spring": "blue",
      "summer": "#0014FF",
      "autumn": "#0A2647"
    },
    5: {
      "winter": "#550A46",
      "spring": "red",
      "summer": "red",
      "autumn": "red"
    },
    6: {
      "winter": "black",
      "spring": "black",
      "summer": "#181823",
      "autumn": "black"
    },
    7: {
      "winter": "cyan",
      "spring": "cyan",
      "summer": "#00FFF6",
      "autumn": "#46C2CB"
    },
  };

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      let characterType = matrix[j][i];
      let characterColor = colors[characterType][currentWeather];
      children[i].children[j].style.backgroundColor = characterColor;
    }
  }
  updateWeatherInfo(currentWeather);
}

