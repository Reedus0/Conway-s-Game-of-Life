size = 150  // Size of game, 
            // Game isn't optimizated well, so make sure to don't set large values,
            // I guess i'll fix it soon... or not...

let tiles = createArray(size, size)
for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
        tiles[i][j] = 0
    }
}

// Creating tiles masive which contain all the tiles. For now it's empty, but you can fill it using function setup



let tilesNext = createArray(size, size)
for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
        tilesNext[i][j] = 0
    }
}

// Creating next generation tiles masive

function setup(x, y, pattern) {
    for(let i = 0; i < pattern.length; i++){
        for(let j = 0; j < pattern[0].length; j++){
            tiles[i + y][j + x] = pattern[i][j];
        }
    }
}

// Function that allows you to create custom structure in custom cords

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr
}

// Function that creating arrays with choosen length

function newDay(){
    document.body.style.width = size * 1.5 + "%"
    newGen()
    var outputHTML = "";
    for(let i = 1; i < size + 1; i++){
        for(let j = 1; j < size + 1; j++){
            if(j % size == 0){
                outputHTML += "<p></p>"
            }
            if(tilesNext[i-1][j-1] == 0){
                outputHTML += `<div class="area-black"></div>`;
            }
            if(tilesNext[i-1][j-1] == 1){
                outputHTML += `<div class="area-white"></div>`;
            }
        }
    }
    document.getElementById("inner").innerHTML = outputHTML;

    tiles = createArray(size, size)
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            tiles[i][j] = 0
        }
    }
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            tiles[i][j] = tilesNext[i][j]
        }
    }
}

// Function that starts new day 

function newGen(){
    for(let i = 1; i < size-1; i++){
        for(let j = 1; j < size-1; j++){
            if(tiles[i][j] == 1){
                neighbors1 = checkNeighbors(i, j)
                if(neighbors1 == 2 || neighbors1 == 3){
                    tilesNext[i][j] = 1
                }
                else if(neighbors1 < 2 || neighbors1 > 3){
                    tilesNext[i][j] = 0;
                }
            }
            if(tiles[i][j] == 0){
                neighbors0 = checkNeighbors(i, j)
                if(neighbors0 == 3){
                    tilesNext[i][j] = 1;
                }
            }
        } 
    }
}

// Function that calculate new generation

function checkNeighbors(x, y) {
    let counter = 0;

    if(tiles[x-1][y] == 1){
        counter++;
    }
    if(tiles[x+1][y] == 1){
        counter++;
    }
    if(tiles[x][y-1] == 1){
        counter++;
    }
    if(tiles[x][y+1] == 1){
        counter++;
    }
    if(tiles[x-1][y-1] == 1){
        counter++;
    }
    if(tiles[x+1][y+1] == 1){
        counter++;
    }
    if(tiles[x+1][y-1] == 1){
        counter++;
    }
    if(tiles[x-1][y+1] == 1){
        counter++;
    }
    return counter
}

// Function that calculate all tile neighbors


// Setup =========================================================================


setup(15, 15, [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
])

// Gosper glider gun at the left top corner of the game, check wikipedia to learn what it is

setup(15, 135, [
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
])

// Same gun but at the bottom

setup(60, 70, [
    [1,1,0],
    [1,0,1],
    [1,0,0],
])


setup(90, 80, [
    [0,1,0],
    [1,0,0],
    [1,1,1],
])

// Some gliders, you can check it on wikipedia


setInterval(newDay, 250) // An interval that changes days
