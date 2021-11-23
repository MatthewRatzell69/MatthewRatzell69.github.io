import * as main from './main.js';

export default class Bullet {
    constructor(ctx, x, y, speed, fillStyle = "red", lineWidth = 2, strokeStyle = "yellow") {
        //super();
        this.isAlive = false;
        this.startingX
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle;
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;


    }
    //this is where the methods and getters and setters will go
    drawBullet(ctx) {
        ctx.save();
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 25, 0, Math.PI * 2);
        ctx.fill();
        if (this.lineWidth > 0) {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.closePath();
        ctx.restore();
    }

    moveBullet(ctx,xTarget,yTarget,dt=1/60)
    {
        
        this.isAlive = true;
        ctx.save();
        //in order to move we will update our x and our y value
        this.x+=(xTarget-500)/100;
        this.y+=(yTarget-25)/100;
       
        ctx.restore();
        //while the ball is moving if it goes off screen it resets 
        if(this.x>=1000||this.x<0||this.y>=800||this.y<0){
            this.resetBall();
        }
    }
    //setter but only sets true
    setAlive(){
        this.isAlive = true;
    }
    //getter
    getIsAlive()
    {
        return this.isAlive;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    resetBall()
    {
        main.decrementBalls();
        this.isAlive = false;
        this.x = 500;
        this.y = 25;
    }
}