class Player {

    position: { x: number; y: number };
    isMovingUp: boolean;
    isMovingLeft: boolean;
    isMovingDown: boolean;
    isMovingRight: boolean;
    isShooting: boolean;
    shootingFrame: number;

    constructor(position: { x: number; y: number }) {
        this.position = position;
        this.isMovingUp = false;
        this.isMovingLeft = false;
        this.isMovingDown = false;
        this.isMovingRight = false;
        this.isShooting = false;
        this.shootingFrame = 0;
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

        if (this.isShooting) {
            if (this.shootingFrame === 0 || this.shootingFrame % PLAYER_RATE_OF_FIRE_BLASTER === 0) {
                this.shoot(mouse);
            }
            this.shootingFrame++;
        } else {
            if (this.shootingFrame != 0) {
                this.shootingFrame = 0;
            }
        }

        this.draw();
    }

    shoot(mouse: { y: number; x: number }): void {
        const positionFrom = { x: this.position.x, y: this.position.y };
        const angle = Math.atan2(mouse.y - this.position.y, mouse.x - this.position.x);
        const positionTo = { x: positionFrom.x + (Math.cos(angle) * LASER_LENGTH), y: positionFrom.y + (Math.sin(angle) * LASER_LENGTH) };
        const velocity = { x: Math.cos(angle) * LASER_SPEED, y: Math.sin(angle) * LASER_SPEED };
        listOfProjectiles.push(new Projectile(positionFrom, positionTo, velocity));
        //shootAudio.play();
    }

}