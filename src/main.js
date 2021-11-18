/*
  main.js is primarily responsible for hooking up the UI to the rest of the application 
  and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as canvas from './canvas.js';

//faking enumeration to work with checkboxes
const drawParams = {
  showGradient:true,
  showBars:true,
  showCircles:true,
  showNoise:false,
  showInvert:false,
  showEmboss:false
}


function init() {
  let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  setupUI(canvasElement);
  canvas.setupCanvas(canvasElement);
  loop();
}
function loop() {
  /* NOTE: This is temporary testing code that we will delete in Part II */
  requestAnimationFrame(loop);
  canvas.draw(drawParams);
}

function setupUI(canvasElement) {
 
} // end setupUI

export { init };