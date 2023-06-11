class Enemy {

    position: { x: number; y: number };
    radius: number;
    color: string;
    velocity: { x: number; y: number };
    type: string;
    center: { x: number; y: number };
    radians: number;

    constructor(position: { x: number; y: number }, radius: number, color: string, velocity: { x: number; y: number }) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.type = 'linear';
        this.center = { x: this.position.x, y: this.position.y };
        this.radians = 0;

        if (Math.random() < 0.25) {
            this.type = 'homing';
            if (Math.random() < 0.5) {
                this.type = 'spinning';
                if (Math.random() < 0.75) {
                    this.type = 'homingSpinning';
                }
            }
        }
    }

    draw(): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(): void {
        this.draw();
        if (this.type === 'linear') {
            this.position.x = this.position.x + this.velocity.x;
            this.position.y = this.position.y + this.velocity.y;
        } else if (this.type === 'homing') {
            const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
            this.velocity = { x: Math.cos(angle), y: Math.sin(angle) };
            this.position.x = this.position.x + this.velocity.x;
            this.position.y = this.position.y + this.velocity.y;
        } else if (this.type === 'spinning') {
            this.radians += 0.05;
            this.center.x += this.velocity.x;
            this.center.y += this.velocity.y;
            this.position.x = this.center.x + Math.cos(this.radians) * 100;
            this.position.y = this.center.y + Math.sin(this.radians) * 100;
        } else if (this.type === 'homingSpinning') {
            const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
            this.velocity = { x: Math.cos(angle), y: Math.sin(angle) };
            this.radians += 0.05;
            this.center.x += this.velocity.x;
            this.center.y += this.velocity.y;
            this.position.x = this.center.x + Math.cos(this.radians) * 100;
            this.position.y = this.center.y + Math.sin(this.radians) * 100;
        }
        // linear travel
        // this.x = this.x + this.velocity.x
        // this.y = this.y + this.velocity.y
    }

}