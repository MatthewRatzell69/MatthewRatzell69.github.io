import * as utils from './utils.js';
import * as main from './main.js';


let ctx, canvasWidth, canvasHeight;


function setupCanvas(canvasElement) 
{
    // create drawing context
    //create our bullet
    
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

    //draw the bullet
    

    //looping through and making sure we draw every ball in our ball array
    //the array will be handeled in main
    for(let i =0;i<main.getBallArray().length;i++)
    {
        
        main.getBall(i).drawBall(ctx);
    }

    if(main.getBullet() != null){
        main.getBullet().drawBullet(ctx);
    }
    

    
}
function drawBullet(){
    bullet.moveBullet(ctx,);
}

export { setupCanvas, draw, getCtx };