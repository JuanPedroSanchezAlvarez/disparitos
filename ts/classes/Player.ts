class Player implements Animated {

    static readonly RADIUS: number = 16;
    static readonly COLOR: string = "white";
    static readonly SPEED: number = 3;

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
        ctx.fillStyle = Player.COLOR;
        ctx.arc(this.circle.position.x, this.circle.position.y, this.circle.radius, 0, Math.PI * 2, false);
        ctx.fill();
        //ctx.closePath();
        // Note: When you call fill(), any open shapes are closed automatically, so you don't have to call closePath(). This is not the case when you call stroke().
    }

    update(): void {
        if (this.isMovingUp) { this.circle.position.y -= Player.SPEED; }
        if (this.isMovingLeft) { this.circle.position.x -= Player.SPEED; }
        if (this.isMovingDown) { this.circle.position.y += Player.SPEED; }
        if (this.isMovingRight) { this.circle.position.x += Player.SPEED; }

        // Prevent player for getting out screen.
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

        // Check if player has collided with any door.
        starship.getActiveRoom().listOfDoors.forEach((door) => {
            if (hasCollidedCircleWithRectangle(this.circle, door.rectangle)) {
                starship.changeActiveRoom(door.position);
            }
        });

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
        const positionFrom: Position = new Position(this.circle.position.x, this.circle.position.y);
        const angle: number = Math.atan2(mouse.scaledPosition.y - this.circle.position.y, mouse.scaledPosition.x - this.circle.position.x);
        // Math.random() generates a random number between 0 and 1. Modified to generate it between -0.05 and 0.05.
        const modifier: number = (Math.random() / 10) - 0.05;
        const angleModified: number = angle + modifier;
        console.log(modifier);
        const positionTo: Position = new Position(positionFrom.x + (Math.cos(angleModified) * LASER_LENGTH), positionFrom.y + (Math.sin(angleModified) * LASER_LENGTH));
        const velocity = { x: Math.cos(angleModified) * LASER_SPEED, y: Math.sin(angleModified) * LASER_SPEED };
        listOfProjectiles.push(new Projectile(positionFrom, positionTo, velocity));
        //shootAudio.play();
    }

}