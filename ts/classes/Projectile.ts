class Projectile {

    positionFrom: Position;
    positionTo: Position;
    velocity: { x: number; y: number };

    constructor(positionFrom: Position, positionTo: Position, velocity: { x: number; y: number }) {
        this.positionFrom = positionFrom;
        this.positionTo = positionTo;
        this.velocity = velocity;
    }

    draw(): void {
        ctx.beginPath();
        ctx.strokeStyle = LASER_COLOR;
        ctx.lineWidth = LASER_WIDTH;
        ctx.lineCap = "round";
        ctx.moveTo(this.positionFrom.x, this.positionFrom.y);
        ctx.lineTo(this.positionTo.x, this.positionTo.y);
        ctx.stroke();
        ctx.closePath();
    }

    update(): void {
        this.positionFrom.x = this.positionFrom.x + this.velocity.x;
        this.positionFrom.y = this.positionFrom.y + this.velocity.y;
        this.positionTo.x = this.positionTo.x + this.velocity.x;
        this.positionTo.y = this.positionTo.y + this.velocity.y;
        this.draw();
    }

}