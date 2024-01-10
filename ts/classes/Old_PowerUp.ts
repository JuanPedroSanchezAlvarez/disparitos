class PowerUp {

    position: { x: number; y: number };
    velocity: { x: number; y: number };
    width: number;
    height: number;
    radians: number;

    constructor(position: { x: number; y: number }, velocity: { x: number; y: number }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 14;
        this.height = 18;
        this.radians = 0;
    }

    draw(): void {
        ctx.save();
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        ctx.rotate(this.radians);
        ctx.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);
        //ctx.drawImage(powerUpImg, this.position.x, this.position.y, 14, 18);
        ctx.restore();
    }

    update(): void {
        this.radians += 0.002;
        this.draw();
        this.position.x = this.position.x + this.velocity.x;
        this.position.y = this.position.y + this.velocity.y;
    }

}