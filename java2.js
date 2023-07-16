let size = N;

let numberOfTiles = size*size;

let moves =0;
let minutes =0 ,seconds =0;

let width = "60";
let height = "60";
let spacing = 1;
let tileWidth = (width-3-spacing*(size+1))/size;
let tileHeight = (height-3-spacing*(size+1))/size;

Box = document.getElementById("Box");

Box.style.width = width + "vw";
Box.style.height = height + "vw";

let reference = [];

for(let i=1; i< numberOfTiles; i++){
    reference.push(i);
}

reference.push(0);

let newdata = dataBase[0];

 // let newdata = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];

let data = [];

for(let j =0;j<size;j++){
    data.push([]);
}

for(let i =0;i<numberOfTiles;i++){
    let row = Math.floor(i/size);
    data[row].push(newdata[i]);
}


let newGame = document.getElementById("new-gamers");
let NewGame = document.getElementById("newgames");

let startGame = document.getElementById("play-switch");

startGame.addEventListener("click",function(){
    starTimer();
    document.getElementById("plays").style.display = "none";    
});
 
newGame.addEventListener("click", function(){
    window.location.reload();
});

NewGame.addEventListener("click", function(){
    window.location.reload();
});


function makeTiles(){
    for(let i =0;i < numberOfTiles;i++){
        let row = Math.floor(i/ size);       
        let col = i% size;
        if(data[row][col]!= 0){
            let tile = document.createElement("div");
            tile.style.width = tileWidth + "vw";
            tile.style.height = tileHeight + "vw";
            tile.className = "number-tile";
            tile.innerHTML = `<h1>${data[row][col]}</h1>`;
            Box.appendChild(tile);
            positionTiles(tile, col, row);
            tile.addEventListener("click",tileSwap);
        }
    }
}

function positionTiles(tile, col, row) {
    var x = col *(tileWidth + spacing) + spacing;
    var y = row * (tileHeight+ spacing) + spacing;
  
    tile.style.left = x + "vw";
    tile.style.top = y + "vw";

    tile.style.transition = 'left 0.6s, top 0.6s';

    if(data[row][col] === reference[(row*size)+ col]){
        tile.style.backgroundColor = "lightgreen";
    }
    else{
        tile.style.backgroundColor = "lightpink";
    }
}
  
function tileSwap(event){
    let tile = event.currentTarget;
    let value = parseInt(tile.innerText);
    let x,y;
    loop1:
    for(x=0 ; x < data.length ; x++) {
        for(y=0 ; y < data.length; y++) {
            if(data[x][y] == value){
                break loop1;
            }
        }
    }
    moveTile(tile,x,y);
}

function moveTile(tile,row,col){
    let dx=0;
    let dy=0;
    if(col>0 && data[row][col-1] == 0){
        dx = -1;
        moves++;
    }
    else if(col<size-1 && data[row][col + 1] == 0){
        dx = 1;
        moves++;
    }
    else if( row> 0 && data[row -1 ][col ] == 0){
        dy = -1;
        moves++;
    }
    else if( row <size -1 && data[row+1][col] == 0){
        dy = 1;
        moves++;
    }
    else{
        return;
    }
    document.getElementById("moves").innerHTML = moves;
    let value = data[row][col];
    data[row + dy][col + dx] = value;
    data[row][col] = 0;
    positionTiles(tile,col + dx ,row + dy);

    checkWinGame();
}

function checkWinGame(){
    let flag = 1;
    loop1:
    for(let row = 0; row < size;row++){
        for(let col = 0 ; col< size ; col++){
            if(data[row][col] != reference[row*size+col]){
                flag = 0;
                break loop1;
            }
        }
    }
    if(flag == 1 ){
        let opacity = 0;
        pauseTimer();
        let tile = document.createElement("div");
        tile.style.width = tileWidth + "vw";
        tile.style.height = tileHeight + "vw";
        tile.className = "number-tile";
        tile.innerHTML = `<h1>${size*size}</h1>`;
        tile.style.backgroundColor = "blue";
        tile.style.opacity = opacity;
        Box.appendChild(tile);
        positionTiles(tile,size-1,size-1)
        let intervalId = setInterval(function(){
            opacity += 0.1;
            tile.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(intervalId);
            }
        },100)
        let game = document.getElementById("games");
        let win = document.getElementById("win");
        setTimeout(function(){
            game.innerHTML = " "; 
            win.style.display = "block";
            console.log(win.style.opactiy);
        },1500);

        let noMoves = document.getElementById("move");
        noMoves.innerHTML = `You used ${moves} moves to win`;

        let timeTaken = document.getElementById("minutes")
        timeTaken.innerHTML = `You took ${minutes}:${seconds} minutes to complete the game`;
    }
}

makeTiles();


//Timer

let startTime,elapsedTime;

function starTimer(){
    if (!startTime) {
        startTime = Date.now(); 
        timerInterval = setInterval(updateTime, 1000); 
    }
}

function pauseTimer() {
    clearInterval(timerInterval); 
    startTime = null;
}
  
function resumeTimer() {
    if (!startTime) {
      startTime = Date.now() - elapsedTime; 
      timerInterval = setInterval(updateTime, 1000);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    let toSecond = Math.floor(elapsedTime/1000);
    minutes = Math.floor( toSecond/ 60);
    seconds = toSecond % 60;
    let formattedTime = `${minutes}:${seconds}`;

    document.getElementById("time").innerHTML = formattedTime
}

let pauseButton = document.getElementById("pas-button"); 
pauseButton.addEventListener("click", pauseTimer);

let playButton = document.getElementById("resum-button"); 
playButton.addEventListener("click", resumeTimer);