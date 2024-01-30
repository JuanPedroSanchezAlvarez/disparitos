abstract class ProjectileCircle extends Projectile {

    readonly circle: Circle;

    constructor(circle: Circle, color: string, speed: number, velocity: Velocity) { 
        super(color, speed, velocity);
        this.circle = circle;
    }

    override getPosition(): Position {
        return this.circle.position;
    }

    override draw(): void {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.circle.position.x, this.circle.position.y, this.circle.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    override update(): void {
        this.circle.position.x += this.velocity.x;
        this.circle.position.y += this.velocity.y;
        this.draw();
    }

}