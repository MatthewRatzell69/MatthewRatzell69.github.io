
//export function that will be used to  create our targets on our screen
export default class Balls {
    constructor(ctx, x, y, fillStyle = "red", lineWidth = 2, strokeStyle = "yellow") {
        //super();
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle;
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;


    }
    //this is where the methods and getters and setters will go
    drawBall(ctx) {
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
}








