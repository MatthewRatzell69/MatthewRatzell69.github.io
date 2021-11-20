import * as utils from './utils.js';
import * as main from './main.js';
import Balls from './classes.js';

let ctx, canvasWidth, canvasHeight;


function setupCanvas(canvasElement) 
{
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;


}

function getCtx()
{
    return ctx;
}

function draw(params = {}) {

    // 2 - draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    //looping through and making sure we draw every ball in our ball array
    //the array will be handeled in main
    for(let i =0;i<main.getBallArray().length;i++)
    {
        main.getBall(i).drawBall(ctx);
    }
}

export { setupCanvas, draw, getCtx };