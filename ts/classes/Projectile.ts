class Projectile {

    position: { x: number; y: number };
    radius: number;
    color: string;
    velocity: { x: number; y: number };

    constructor(position: { x: number; y: number }, radius: number, color: string, velocity: { x: number; y: number }) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(): void {
        this.draw();
        this.position.x = this.position.x + this.velocity.x;
        this.position.y = this.position.y + this.velocity.y;
    }

}