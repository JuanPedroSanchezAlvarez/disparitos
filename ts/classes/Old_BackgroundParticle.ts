class BackgroundParticle {

    position: { x: number; y: number };
    radius: number;
    color: string;
    alpha: number;
    initialAlpha: number;

    constructor(x: number, y: number, radius: number, color: string) {
        this.position = { x: x, y: y };
        this.radius = radius;
        this.color = color;
        this.alpha = 0.05;
        this.initialAlpha = this.alpha;
    }

    draw(): void {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update(): void {
        this.draw();
        // this.alpha -= 0.01
    }

}