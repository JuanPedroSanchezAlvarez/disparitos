class Player {

    circle: Circle;
    isMovingUp: boolean;
    isMovingLeft: boolean;
    isMovingDown: boolean;
    isMovingRight: boolean;
    isShooting: boolean;
    shootingFrame: number;

    constructor(circle: Circle) {
        this.circle = circle;
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
        ctx.arc(this.circle.position.x, this.circle.position.y, this.circle.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    }

    update(): void {
        if (this.isMovingUp) { this.circle.position.y -= PLAYER_SPEED; }
        if (this.isMovingLeft) { this.circle.position.x -= PLAYER_SPEED; }
        if (this.isMovingDown) { this.circle.position.y += PLAYER_SPEED; }
        if (this.isMovingRight) { this.circle.position.x += PLAYER_SPEED; }

        if (this.circle.position.x - this.circle.radius < 0) {
            this.circle.position.x = 0 + this.circle.radius;
        } else if (this.circle.position.x + this.circle.radius > canvas.width) {
            this.circle.position.x = canvas.width - this.circle.radius;
        }
        if (this.circle.position.y - this.circle.radius < 0) {
            this.circle.position.y = 0 + this.circle.radius;
        } else if (this.circle.position.y + this.circle.radius > canvas.height) {
            this.circle.position.y = canvas.height - this.circle.radius;
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

    shoot(mouse: Mouse): void {
        const positionFrom = new Position(this.circle.position.x, this.circle.position.y);
        const angle = Math.atan2(mouse.scaledPosition.y - this.circle.position.y, mouse.scaledPosition.x - this.circle.position.x);
        const positionTo = new Position(positionFrom.x + (Math.cos(angle) * LASER_LENGTH), positionFrom.y + (Math.sin(angle) * LASER_LENGTH));
        const velocity = { x: Math.cos(angle) * LASER_SPEED, y: Math.sin(angle) * LASER_SPEED };
        listOfProjectiles.push(new Projectile(positionFrom, positionTo, velocity));
        //shootAudio.play();
    }

}