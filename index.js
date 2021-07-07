function setup(x, y, pattern) {
    for(let i = 0; i < pattern.length; i++){
        for(let j = 0; j < pattern[0].length; j++){
            sells[i + y][j + x] = pattern[i][j];
        }
    }
}


size = 150

let sells = createArray(size, size)
for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
        sells[i][j] = 0
    }
}



let sellsNext = createArray(size, size)
for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
        sellsNext[i][j] = 0
    }
}
 

function newDay(){
    document.body.style.width = size * 1.5 + "%"
    newGen()
    var outputHTML = "";
    for(let i = 1; i < size + 1; i++){
        for(let j = 1; j < size + 1; j++){
            if(j % size == 0){
                outputHTML += "<p></p>"
            }
            if(sellsNext[i-1][j-1] == 0){
                outputHTML += `<div class="area-black"></div>`;
            }
            if(sellsNext[i-1][j-1] == 1){
                outputHTML += `<div class="area-white"></div>`;
            }
        }
    }
    document.getElementById("inner").innerHTML = outputHTML;

    sells = createArray(size, size)
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            sells[i][j] = 0
        }
    }


    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            sells[i][j] = sellsNext[i][j]
        }
    }
}


function newGen(){
    for(let i = 1; i < size-1; i++){
        for(let j = 1; j < size-1; j++){
            if(sells[i][j] == 1){
                neighbors1 = checkNeighbors(i, j)
                if(neighbors1 == 2 || neighbors1 == 3){
                    sellsNext[i][j] = 1
                }
                else if(neighbors1 < 2 || neighbors1 > 3){
                    sellsNext[i][j] = 0;
                }
            }
            if(sells[i][j] == 0){
                neighbors0 = checkNeighbors(i, j)
                if(neighbors0 == 3){
                    sellsNext[i][j] = 1;
                }
            }
        } 
    }
}

function checkNeighbors(x, y) {
    let counter = 0;

    if(sells[x-1][y] == 1){
        counter++;
    }
    if(sells[x+1][y] == 1){
        counter++;
    }
    if(sells[x][y-1] == 1){
        counter++;
    }
    if(sells[x][y+1] == 1){
        counter++;
    }
    if(sells[x-1][y-1] == 1){
        counter++;
    }
    if(sells[x+1][y+1] == 1){
        counter++;
    }
    if(sells[x+1][y-1] == 1){
        counter++;
    }
    if(sells[x-1][y+1] == 1){
        counter++;
    }
    return counter
    
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr
}

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

// newDay()
setInterval(newDay, 250)
