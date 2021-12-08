

//export function that will be used to  create our targets on our screen
export default class Balls {
    constructor(ctx, x, y, radius = 25, fillStyle = "blue", lineWidth = 2, strokeStyle = "") {
        //super();
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle;
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.radius = radius;

    }
    //this is where the methods and getters and setters will go
    drawBall(ctx) {
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
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getRadius(){
        return this.radius;
    }
    
}








