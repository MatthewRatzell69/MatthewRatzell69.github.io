import * as utils from './utils.js';
import * as canvas from './canvas.js';
import Bullet from './BulletClass.js';
import Balls from './BallsClass.js';



// Gamestates that will be used for our game
const GameState = Object.freeze({
  START: Symbol("START"),
  MAIN: Symbol("MAIN"),
  LEVELOVER: Symbol("LEVELOVER"),
  GAMEOVER: Symbol("GAMEOVER")
});

//this array will  hold all of the balls on the screen
let bullet;
//these will remember the x and y that was clicked orginally 
let xAtClick;
let yAtClick;
let decider;
let balls = [];
let walls = [];
let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
let gameState = GameState.START;
let numberOfBalls;
let currentLevel = 0;
let startX = 475;
let bulletImg;


let startY = 25;
function init() {
  bulletImg = document.getElementById("bulletImg");
  numberOfBalls = 3;
  //create our bullet at the center
  bullet = new Bullet(canvas.getCtx(), 475, 25, 1, 25, bulletImg);
  //setting this to fault at the start so the bullet isnt moving arround
  decider = false;
  //adding a random ball somewhere

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //next setup canvas
  canvas.setupCanvas(canvasElement);
  //first set up our UI
  setupUI(canvasElement);
  //run our logic loop
  loop();

  //adding our correct event listener may get moved out of init eventually
  canvasElement.addEventListener("mousedown", function (e) {
    bullet.setAlive();
    //we only want this code to run if our bullet is centered at the start
    if (bullet.getX() == startX && bullet.getY() == startY) {
      doMouseDown(getMousePosition(canvasElement, e));
    }
  });
  createWalls();

}


function loop(timestamp) {
  /* NOTE: This is temporary testing code that we will delete in Part II */
  requestAnimationFrame(loop);

  //draw the hud every frame
  drawHUD();

  if (gameState == GameState.MAIN) {
    //if there are no more balls we will load the next level
    if (balls.length <= 0) {
      //increment the level
      incrementBalls();
      bullet.resetBall();
      currentLevel++
      loadLevel(currentLevel);
    }
    //move the bullet only if the bullet is suppose to be moving
    if (decider == true && bullet.getIsAlive()) {

      //movement
      bullet.moveBullet(canvas.getCtx(), xAtClick, yAtClick);

      for (let i = 0; i < walls.length; i++) {

        if (bullet.checkColliding(getWall(i).getX(), getWall(i).getY(), getWall(i).getRadius())) {

          return;
        }
      }
      //collision detection
      for (let i = 0; i < balls.length; i++) {
        //if it is colliding with one we exit the loop so that the collision detection doesnt only work with the last ball
        if (bullet.checkColliding(getBall(i).getX(), getBall(i).getY(), getBall(i).getRadius())) {
          //remove the ball it collided with
          balls.splice(i, 1);
          return;
        }
      }

    }
    //make sure draw is always being called at the end of our logic
    canvas.draw();
  }
  else if(gameState == GameState.START){
    canvas.drawScreen();
  }

}

//this is where ball creation will be handeled
function loadLevel(levelNum) {
  if (levelNum == 1) {
    balls.push(new Balls(canvas.getCtx(), canvasElement.width / 2 - 250, 300));
    balls.push(new Balls(canvas.getCtx(), canvasElement.width / 2 + 250, 300));
    balls.push(new Balls(canvas.getCtx(), 50, 400));
    balls.push(new Balls(canvas.getCtx(), 125, 475));
    balls.push(new Balls(canvas.getCtx(), 200, 550));
    balls.push(new Balls(canvas.getCtx(), 275, 625));
    balls.push(new Balls(canvas.getCtx(), 350, 650));
    balls.push(new Balls(canvas.getCtx(), 425, 650));
    balls.push(new Balls(canvas.getCtx(), 500, 650));
    balls.push(new Balls(canvas.getCtx(), canvasElement.width - 425, 650));
    balls.push(new Balls(canvas.getCtx(), canvasElement.width - 350, 650));
    balls.push(new Balls(canvas.getCtx(), canvasElement.width - 275, 625));
    balls.push(new Balls(canvas.getCtx(), canvasElement.width - 200, 550));
    balls.push(new Balls(canvas.getCtx(), canvasElement.width - 125, 475));
    balls.push(new Balls(canvas.getCtx(), canvasElement.width - 50, 400));
  }


}

function drawHUD() {
  switch (gameState) {
    case GameState.START:
      utils.drawButton(canvas.getCtx(),50,50,700,50,"clear",0,"black","Horse Plinko",)
      // Draw background
      // Draw Text
      break;
    case GameState.MAIN:
      // draw score
      utils.fillText(canvas.getCtx(), `Current Level:${currentLevel}`, canvasElement.width - 975, 25);
      utils.fillText(canvas.getCtx(), `Total Balls Remaining:${numberOfBalls}`, canvasElement.width - 270, 25);
      // strokeText(canvas.getCtx(),`Total Balls Remaining:${numberOfBalls}`, canvasElement.width - 100, 25);
      break;
    case GameState.INSTRUCTIONS:
      // draw level results
      break;
    case GameState.GAMEOVER:
      // draw game results
      break;

    default:
      throw new Error(MyErrors.drawHUDswitch);


  }
}
function setupUI(canvasElement) {

} // end setupUI

//this function will be accessed by our bullet class to allow it to decrease the number of balls we have
function decrementBalls() {
  numberOfBalls--;
}
function incrementBalls() {
  numberOfBalls++;
}
//our getters and setters
//getter for a specific ball
function getBall(i) {
  return balls[i];
}
//getter for a specific wall
function getWall(i) {
  return walls[i];
}
//getter for the entire ball array
function getBallArray() {
  return balls;
}
function getWallArray() {
  return walls;
}
function getBullet() {
  return bullet;
}
//function that will return the mouse position we need
function getMousePosition(canvas, event) {
  let newArray = [];
  let rect = canvasElement.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  console.log(`X:${x},Y:${y}`);
  newArray[0] = x;
  newArray[1] = y;
  return newArray;
}
function doMouseDown(array) {
  //when the mouse is clicked save the x and y into our global variables that can be accessed in our loop
  xAtClick = array[0];
  yAtClick = array[1];
  switch (decider) {
    case false:
      decider = true;
      break;
    /*
  case true:
  decider = false;
    break;
    */
  }
}
function createWalls() {
  /////////////////////////////////drawing walls//////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //drawing a singular wall
  let x = 75;
  let y = 800;
  for (let i = 0; i < 25; i++) {
    walls.push(new Balls(canvas.getCtx(), x, y, 2));
    y -= 4;
  }
  y = 800
  x = 225;
  for (let i = 0; i < 25; i++) {
    walls.push(new Balls(canvas.getCtx(), x, y, 2));
    y -= 4;
  }
  y = 800
  x = 300;
  for (let i = 0; i < 25; i++) {
    walls.push(new Balls(canvas.getCtx(), x, y, 2));
    y -= 4;
  }
  y = 800
  x = 450;
  for (let i = 0; i < 25; i++) {
    walls.push(new Balls(canvas.getCtx(), x, y, 2));
    y -= 4;
  }
  y = 800
  x = 550;
  for (let i = 0; i < 25; i++) {
    walls.push(new Balls(canvas.getCtx(), x, y, 2));
    y -= 4;
  }
  y = 800
  x = 700;
  for (let i = 0; i < 25; i++) {
    walls.push(new Balls(canvas.getCtx(), x, y, 2));
    y -= 4;
  }
  y = 800
  x = 775;
  for (let i = 0; i < 25; i++) {
    walls.push(new Balls(canvas.getCtx(), x, y, 2));
    y -= 4;
  }
  y = 800
  x = 925;
  for (let i = 0; i < 25; i++) {
    walls.push(new Balls(canvas.getCtx(), x, y, 2));
    y -= 4;
  }
}


function retrieveInstructions() 
{


  const url = "data/babble-data.json";
  const xhr = new XMLHttpRequest();

  xhr.onload = (e) => {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);
    let json;
    //parsing in a try catch incase our json file is broke
    try {
      json = JSON.parse(e.target.responseText);
    } catch {
      console.log("error loading in json instructions");
    }


    //getting array of keys which are the guids this is like keys and dictionary
    const keys = Object.keys(json);
  }
}








  export { init, getBall, getBallArray, getBullet, decrementBalls, getWall, getWallArray };