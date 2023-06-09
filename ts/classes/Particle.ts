class Particle {

    position: { x: number; y: number };
    radius: number;
    color: any;
    velocity: { x: number; y: number };
    alpha: number;

    constructor(position: { x: number; y: number }, radius: number, color: any, velocity: { x: number; y: number }) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw(): void {
        c!.save();
        c!.globalAlpha = this.alpha;
        c!.beginPath();
        c!.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c!.fillStyle = this.color;
        c!.fill();
        c!.restore();
    }

    update(): void {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.position.x = this.position.x + this.velocity.x;
        this.position.y = this.position.y + this.velocity.y;
        this.alpha -= 0.01;
    }

}