class Player {

    position: { x: number; y: number };
    radius: number;
    color: string;
    velocity: { x: number; y: number };
    friction: number;
    powerUp: string;

    constructor(position: { x: number; y: number }, radius: number, color: string) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.velocity = { x: 0, y: 0 };
        this.friction = 0.99;
        this.powerUp = '';
    }

    draw(): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(): void {
        this.draw();
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        if (this.position.x - this.radius + this.velocity.x > 0 && this.position.x + this.radius + this.velocity.x < canvas!.width) {
            this.position.x = this.position.x + this.velocity.x;
        } else {
            this.velocity.x = 0;
        }
        if (this.position.y - this.radius + this.velocity.y > 0 && this.position.y + this.radius + this.velocity.y < canvas!.height) {
            this.position.y = this.position.y + this.velocity.y;
        } else {
            this.velocity.y = 0;
        }
    }

    shoot(mouse: { y: number; x: number }, color = 'white'): void {
        const angle = Math.atan2(mouse.y - this.position.y, mouse.x - this.position.x);
        const velocity = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5 };
        const position = { x: this.position.x, y: this.position.y };
        listOfProjectiles.push(new Projectile(position, 5, color, velocity));
        //shootAudio.play();
    }

}