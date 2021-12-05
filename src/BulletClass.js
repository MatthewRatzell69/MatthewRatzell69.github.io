import * as main from './main.js';
import Balls from './BallsClass.js';
import * as utils from './utils.js';

export default class Bullet {
    constructor(ctx, x, y, speed, radius = 25, fillStyle = "red", lineWidth = 2, strokeStyle = "yellow") {
        //super();
        this.isAlive = false;
        this.gravityScale = .01;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.fillStyle = fillStyle;
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.isColliding = false;
        this.hasCollided = false;
        this.dx = 0;
        this.dy = 0;

    }
    //this is where the methods and getters and setters will go
    drawBullet(ctx) {
        ctx.save();
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        if (this.lineWidth > 0) {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.closePath();
        ctx.restore();
    }

    moveBullet(ctx, xTarget, yTarget, dt = 1 / 60) {
        this.isAlive = true;
        //before collision
        if (!this.hasCollided) {

            this.dx = (xTarget - 500) / 150;
            this.dy = (yTarget - 25) / 150 + this.gravityScale;       
            //increment for largely here 
            this.gravityScale += .01;
        }
        //after
        else {
            //reverse the ball when it hits initially
            if (this.isColliding) {
                this.dx = -this.dx + utils.getRandom(-3,3);
                this.dy = -this.dy * 1.05;
                //reset gravity scale 
                this.gravityScale = .01;
            }

            this.dx = this.dx *.9995;
            //making sure it slows down after collision and that gravity is acting on it
            this.dy = (this.dy * .99) + this.gravityScale;
            //making sure we increment gravity scale
            this.gravityScale += .0003;
            console.log(`X:${this.dx} Y:${this.dy}`);
        }

        this.x += this.dx;
        this.y += this.dy;
        //while the ball is moving if it goes off screen it resets 
        if (this.x >= 1000 || this.x < 0 || this.y >= 800 || this.y < 0) {
            this.resetBall();
        }
    }

    //setter but only sets true
    setAlive() {
        this.isAlive = true;
    }
    //getter
    getIsAlive() {
        return this.isAlive;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    resetBall() {
        main.decrementBalls();
        this.isAlive = false;
        this.x = 500;
        this.y = 50;
        this.dx = 0;
        this.dy = 0;
        this.hasCollided = false;
        this.gravityScale = .01;
    }

    checkColliding(ballX, ballY, ballRadius) {
        //first get the distance of our x and y to later use poppyseeds therorem for triangulating the center of jupiter
        let dx = (ballX + ballRadius) - (this.x + this.radius);
        let dy = (ballY + ballRadius) - (this.y + this.radius);
        //pythagorem theorem 
        let distance = Math.sqrt(dx * dx + dy * dy);
        //bounding circle 2d collision detection really really simple
        if (distance < (ballRadius + this.radius)) {
            //making sure we reset the bullet if it is the last ball
            if (main.getBallArray().length <= 0) {
                this.resetBall();
            }
            console.log("okay");
            this.isColliding = true;
            this.hasCollided = true;
            return true;
        }
        else {

            this.isColliding = false;
            return false;
        }
    }

}