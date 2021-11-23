import * as utils from './utils.js';
import * as canvas from './canvas.js';
import Balls from './BallsClass.js';
import Bullet from './BulletClass.js';


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
let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
let gameState = GameState.MAIN;
let numberOfBalls;
function init() {

  numberOfBalls = 3;
  //create our bullet at the center
  bullet = new Bullet(canvas.getCtx(), 1 / 2 * canvasElement.width, 25, 1);
  //setting this to fault at the start so the bullet isnt moving arround
  decider = false;
  //adding a random ball somewhere
  balls.push(new Balls(canvas.getCtx(), 1 / 2 * canvasElement.width, 450));
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
    if(bullet.getX()==500&&bullet.getY()==25){
      doMouseDown(getMousePosition(canvasElement, e));
    }

  });

}


function loop(timestamp) {
  /* NOTE: This is temporary testing code that we will delete in Part II */
  requestAnimationFrame(loop);

  //draw the hud every frame
  drawHUD();

  if (gameState == GameState.MAIN) {
    //move the bullet only if the bullet is suppose to be moving
    if (decider == true && bullet.getIsAlive()) {

      bullet.moveBullet(canvas.getCtx(), xAtClick, yAtClick);
    }
    //make sure draw is always being called at the end of our logic
    canvas.draw();
  }

}

//this is where ball creation will be handeled
function loadLevel() {

}
function drawHUD() {
  switch (gameState) {
    case GameState.START:
      canvas.getCtx().save();
      // Draw background
      // Draw Text
      break;
    case GameState.MAIN:
      // draw score
      fillText(canvas.getCtx(), `Total Balls Remaining:${numberOfBalls}`, canvasElement.width - 285, 25);
      // strokeText(canvas.getCtx(),`Total Balls Remaining:${numberOfBalls}`, canvasElement.width - 100, 25);
      break;
    case GameState.LEVELOVER:
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
//getter for the entire ball array
function getBallArray() {
  return balls;
}
function getBullet() {
  return bullet;
}
function fillText(ctx, string, x, y, css = "18pt 'Press Start 2P', cursive", color = "orange") {
  canvas.getCtx().save();
  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  canvas.getCtx().font = css;
  canvas.getCtx().fillStyle = color;
  canvas.getCtx().fillText(string, x, y);
  canvas.getCtx().restore();
}
function strokeText(ctx, string, x, y, css = "36pt 'Press Start 2P', cursive", color = "orange", lineWidth = 5) {
  canvas.getCtx().save();
  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  canvas.getCtx().font = css;
  canvas.getCtx().strokeStyle = color;
  canvas.getCtx().lineWidth = lineWidth;
  canvas.getCtx().strokeText(string, x, y);
  canvas.getCtx().restore();
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








export { init, getBall, getBallArray, getBullet, decrementBalls };