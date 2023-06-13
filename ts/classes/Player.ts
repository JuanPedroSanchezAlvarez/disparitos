class Player {

    position: { x: number; y: number };
    isMovingUp: boolean;
    isMovingLeft: boolean;
    isMovingDown: boolean;
    isMovingRight: boolean;
    isShooting: boolean;

    constructor(position: { x: number; y: number }) {
        this.position = position;
        this.isMovingUp = false;
        this.isMovingLeft = false;
        this.isMovingDown = false;
        this.isMovingRight = false;
        this.isShooting = false;
    }

    draw(): void {
        ctx.beginPath();
        ctx.fillStyle = PLAYER_COLOR;
        ctx.arc(this.position.x, this.position.y, PLAYER_RADIUS, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    }

    update(): void {
        if (this.isMovingUp) { player.position.y -= PLAYER_SPEED; }
        if (this.isMovingLeft) { player.position.x -= PLAYER_SPEED; }
        if (this.isMovingDown) { player.position.y += PLAYER_SPEED; }
        if (this.isMovingRight) { player.position.x += PLAYER_SPEED; }

        if (this.position.x - PLAYER_RADIUS < 0) {
            this.position.x = 0 + PLAYER_RADIUS;
        } else if (this.position.x + PLAYER_RADIUS > canvas.width) {
            this.position.x = canvas.width - PLAYER_RADIUS;
        }
        if (this.position.y - PLAYER_RADIUS < 0) {
            this.position.y = 0 + PLAYER_RADIUS;
        } else if (this.position.y + PLAYER_RADIUS > canvas.height) {
            this.position.y = canvas.height - PLAYER_RADIUS;
        }

        this.draw();
    }

    shoot(mouse: { y: number; x: number }, color = 'white'): void {
        const angle = Math.atan2(mouse.y - this.position.y, mouse.x - this.position.x);
        const velocity = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5 };
        const position = { x: this.position.x, y: this.position.y };
        listOfProjectiles.push(new Projectile(position, 5, color, velocity));
        //shootAudio.play();
    }

}