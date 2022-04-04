//get width and height of the center container.//
const eleCenterDiv = document.querySelector('#center').getBoundingClientRect();
const divX = eleCenterDiv.left ;
const divY = eleCenterDiv.top ;
const divWidth =  eleCenterDiv.right ;
const divHeight = eleCenterDiv.bottom ;

const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png']
];
var idTimeout;
var game = document.getElementById('game');
var focus = [];          // values 0 or 1 for array index for selecting pic from PacArray// 
var pos = 0;
var direction = 0;
var pacMen = []; // This array holds all the pacmen

function setToRandom(minX, maxX, minY, maxY) {
    return {
        x: Math.random() * (maxX - minX) + minX,
        y: Math.random() * (maxY - minY) + minY
    }
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(-5, 10, -5, 5); 
    let position = setToRandom(divX, divWidth-50, divY, divHeight-50) ;
    
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = 'PacMan1.png';
    newimg.width = 50;
    newimg.focus = [0];
    newimg.direction = 0;

    // set position here         
    newimg.x = position.x ;
    newimg.y = position.y ;
    
    // add new Child image to game
    game.appendChild( newimg );
    // return details in an object
    return {
        position,
        velocity,
        newimg
    }
}
function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;

        item.newimg.focus = (item.newimg.focus + 1) % 2;
        //
        if (item.newimg.direction == 1 && item.velocity.x > 0) item.newimg.direction = 0;
        if (item.newimg.direction == 0 && item.velocity.x < 0) item.newimg.direction = 1;
        
        item.newimg.src = pacArray[item.newimg.direction][item.newimg.focus];           
    })
    ////
    idTimeout = setTimeout(update, 50);
}

function checkCollisions(item) {
    // detect collision with all walls and make pacman bounce
    if (item.position.x + item.velocity.x + item.newimg.width > divWidth  ||
        item.position.x + item.velocity.x < divX) {
            item.velocity.x = -item.velocity.x ;
        };

    if (item.position.y + item.velocity.y + item.newimg.height > divHeight ||
        item.position.y + item.velocity.y < divY) {
            item.velocity.y = -item.velocity.y ;
        };
    //
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
    focus[0] = 0;
    direction[0] = 0;
    pos[0] = 0;
}

function pauseGame() {
    clearTimeout (idTimeout);
}


function stopGame() {
    clearTimeout (idTimeout);
   
    let imgList = [];
    imgList = game.getElementsByTagName("IMG");

    while (imgList.length > 0) {
        game.removeChild(imgList[0]);
        imgList = game.getElementsByTagName("IMG");
    }
                    
    pacMen = [];
        
}
/*
function doFullScreen() {
   
  var elem = document.getElementById("center");
    if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { 
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}
*/
//
if (typeof module   !== 'undefined') {
    module.exports = { checkCollisions, update, pauseGame, stopGame, doFullScreen, pacMen };
  }