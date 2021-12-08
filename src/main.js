import * as utils from './utils.js';
import * as canvas from './canvas.js';
import Bullet from './BulletClass.js';
import Balls from './BallsClass.js';



// Gamestates that will be used for our game
const GameState = Object.freeze({
  START: Symbol("START"),
  MAIN: Symbol("MAIN"),
  INSTRUCTIONS: Symbol("INSTRUCTIONS"),
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
let instructions=[];

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
  //function that loads in instructions from json
  retrieveInstructions();
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
    //this else is gonna handle other scenes
    else{
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
    //draw background
    canvas.drawScreen();
    //input handler
    handleInputOnStartScreen();
  }
  else if(gameState == GameState.INSTRUCTIONS){
     //draw background
    canvas.drawScreen();
    //input handler
    handleInputOnInstructionsScreen();
    
  }
  else{
    canvas.drawScreen();
    highScoreScreen();
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

      canvas.getCtx().save();
      utils.drawButton(canvas.getCtx(),150,300,250,50,"Play Game");
      utils.drawButton(canvas.getCtx(),150,400,250,50,"View Instructions");
      utils.fillText(canvas.getCtx(),"Horse Plinko",50,150,"58pt 'Roboto', cursive");
      utils.fillText(canvas.getCtx(),"Horse Plinko",50,150,"58pt 'Roboto', cursive");
      canvas.getCtx().restore();
      // Draw background
      // Draw Text
      break;
    case GameState.MAIN:
      // draw score
      canvas.getCtx().save();
      utils.fillText(canvas.getCtx(), `Current Level:${currentLevel}`, canvasElement.width - 975, 25);
      utils.fillText(canvas.getCtx(), `Score${currentLevel}`, canvasElement.width - 975, 125);
      utils.fillText(canvas.getCtx(), `Total Balls Remaining:${numberOfBalls}`, canvasElement.width - 270, 25); 
      canvas.getCtx().restore();
      break;
    case GameState.INSTRUCTIONS:
      canvas.getCtx().save();
      utils.drawButton(canvas.getCtx(),150,350,250,50,"Return to Start Screen");
      utils.fillText(canvas.getCtx(),instructions[0],50,150,"18pt 'Roboto', cursive");
      utils.fillText(canvas.getCtx(),instructions[1],50,200,"18pt 'Roboto', cursive");
      utils.fillText(canvas.getCtx(),instructions[2],50,250,"18pt 'Roboto', cursive");
      canvas.getCtx().restore();
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
function handleInputOnStartScreen(){
  if(xAtClick>=150&&xAtClick<=400&&yAtClick>=300&&yAtClick<350){
    gameState = GameState.MAIN;
  }
  else if(xAtClick>=150&&xAtClick<=400&&yAtClick>=400&&yAtClick<=450){
    gameState = GameState.INSTRUCTIONS;
  }
}
function handleInputOnInstructionsScreen(){
  if(xAtClick>=150&&xAtClick<=400&&yAtClick>=350&&yAtClick<=400){
    gameState = GameState.START;
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

	//fetch this jimmy jawn
	fetch("../data/instructions-data.json")
	.then(response=>{
		//if response is successful, return the JSON
		if(response.ok){
			return response.json();//piping to next.then
		}
		//else throw an error that will be caught below
		return response.text().then(text=>{
			throw text;//goes right to catch
		});
	})//send the response.json() promise to the next .then()
		.then(json=>{//the second promise is resolved and json is a json object
			console.log(json);

			/////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////
      //getting the keys 
      const keys = Object.keys(json);
      //looping through each key and passing the instructions along
      for(let k of keys){
        const obj = json[k];
        instructions.push(obj.instructions);
      }

		}).catch(error => {
			//error
			console.log(error);
	});
}








  export { init, getBall, getBallArray, getBullet, decrementBalls, getWall, getWallArray };