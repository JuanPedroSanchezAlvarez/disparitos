class Player implements Animated {

    private static readonly RADIUS: number = 16;
    private static readonly COLOR: string = "white";
    private static readonly SPEED: number = 3;

    circle: Circle;
    isMovingUp: boolean;
    isMovingLeft: boolean;
    isMovingDown: boolean;
    isMovingRight: boolean;
    isShooting: boolean;
    shootingFrame: number;
    tupleOfPrimaryWeapons: [BlasterPistol, BlasterRifle, Weapon];
    selectedPrimaryWeapon: number;

    // Singleton design pattern.
    private static instance: Player;

    public static getInstance(): Player {
        if (!Player.instance) { Player.instance = new Player(); }
        return Player.instance;
    }

    private constructor() {
        this.circle = new Circle(canvas.width / 2, canvas.height / 2, Player.RADIUS);
        this.isMovingUp = false;
        this.isMovingLeft = false;
        this.isMovingDown = false;
        this.isMovingRight = false;
        this.isShooting = false;
        this.shootingFrame = 0;
        this.tupleOfPrimaryWeapons = [new BlasterPistol(), new BlasterRifle(), new FlechetteWeapon()];
        this.selectedPrimaryWeapon = 1;
    }

    getSelectedPrimaryWeapon(): Weapon {
        return this.tupleOfPrimaryWeapons[this.selectedPrimaryWeapon]!;
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
            if (this.shootingFrame === 0 || this.shootingFrame % this.getSelectedPrimaryWeapon().rateOfFire === 0) {
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
        const projectile: Projectile = this.getSelectedPrimaryWeapon().createProjectile();

        const positionFrom: Position = new Position(this.circle.position.x, this.circle.position.y);
        const angle: number = Math.atan2(mouse.scaledPosition.y - this.circle.position.y, mouse.scaledPosition.x - this.circle.position.x);
        const modifier: number = (Math.random() / 10) - this.getSelectedPrimaryWeapon().precision; // Math.random() generates a random number between 0 and 1. Modified to generate it between +/- weapon precision.
        const angleModified: number = angle + modifier;
        const velocity = new Velocity(Math.cos(angleModified) * projectile.speed, Math.sin(angleModified) * projectile.speed);
        projectile.velocity = velocity;

        if (projectile instanceof ProjectileLine) {
            const positionTo: Position = new Position(positionFrom.x + (Math.cos(angleModified) * projectile.length), positionFrom.y + (Math.sin(angleModified) * projectile.length));
            projectile.positionStart = positionFrom;
            projectile.positionEnd = positionTo;
        } else if (projectile instanceof ProjectileCircle) {
            projectile.circle.position = positionFrom;
        } else {
            console.error("Error: Projectile must be Line or Circle.");
        }
        
        listOfProjectiles.push(projectile);
        //shootAudio.play();
    }

}