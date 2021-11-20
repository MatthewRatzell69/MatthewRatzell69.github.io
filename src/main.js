import * as utils from './utils.js';
import * as canvas from './canvas.js';
import Balls from './classes.js';
//this array will  hold all of the balls on the screen
let balls = [];

function init() 
{
  let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  setupUI(canvasElement);
  canvas.setupCanvas(canvasElement);
  loop();

  //testing just adding some balls
  let b = new Balls(canvas.getCtx,25,25);
  let b2 = new Balls(canvas.getCtx,50,50);
  
  balls.push(b);
  balls.push(b2);
}

function loop() 
{
  /* NOTE: This is temporary testing code that we will delete in Part II */
  requestAnimationFrame(loop);
  canvas.draw();
}

//this is where ball creation will be handeled
function loadLevel()
{

}
function setupUI(canvasElement) 
{
 
} // end setupUI

//our getters and setters
function getBall(i)
{
  return balls[i];
}
function getBallArray()
{
  return balls;
}
export { init,getBall,getBallArray};