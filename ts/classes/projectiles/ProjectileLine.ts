abstract class ProjectileLine extends Projectile {

    positionStart: Position;
    positionEnd: Position;
    readonly length: number;
    readonly width: number;

    constructor(positionStart: Position, positionEnd: Position, length: number, width: number, color: string, speed: number, velocity: Velocity) { 
        super(color, speed, velocity);
        this.length = length;
        this.width = width;
        this.positionStart = positionStart;
        this.positionEnd = positionEnd;
    }

    override getPosition(): Position {
        return this.positionStart;
    }

    override draw(): void {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.positionStart.x, this.positionStart.y);
        ctx.lineTo(this.positionEnd.x, this.positionEnd.y);
        ctx.closePath();
        ctx.stroke();
    }

    override update(): void {
        this.positionStart.x += this.velocity.x;
        this.positionStart.y += this.velocity.y;
        this.positionEnd.x += this.velocity.x;
        this.positionEnd.y += this.velocity.y;
        this.draw();
    }

}