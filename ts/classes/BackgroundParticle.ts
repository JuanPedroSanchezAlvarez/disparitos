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
        // this.alpha -= 0.01
    }

}