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
    ctx.globalAlpha = .3;
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
    utils.drawRectangle(ctx,0,canvasHeight-100,canvasWidth,100,"black");
    //DRAW THE PLInko cups
    ctx.save();
    //75-225 //300-450 // 550-700 //775-925
    utils.drawRectangle(ctx,75,canvasHeight-100,canvasWidth/4-100,100,"red",3,"grey");
    utils.drawRectangle(ctx,50+canvasWidth/4,canvasHeight-100,canvasWidth/4-100,100,"red",3,"grey");
    utils.drawRectangle(ctx,50+canvasWidth/2,canvasHeight-100,canvasWidth/4-100,100,"red",3,"grey");
    utils.drawRectangle(ctx,canvasWidth-225,canvasHeight-100,canvasWidth/4-100,100,"red",3,"grey");
    ctx.restore();
    
}


export { setupCanvas, draw, getCtx };