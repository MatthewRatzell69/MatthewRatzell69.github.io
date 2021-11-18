
import * as utils from './utils.js';

let ctx, canvasWidth, canvasHeight;


function setupCanvas(canvasElement) 
{
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // keep a reference to the analyser node


}

function draw(params = {}) {

    // 2 - draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
}

export { setupCanvas, draw };