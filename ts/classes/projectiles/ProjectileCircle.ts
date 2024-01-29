abstract class ProjectileCircle extends Projectile {

    readonly circle: Circle;

    constructor(circle: Circle, velocity: Velocity) { 
        super(velocity);
        this.circle = circle;
    }

    override getPosition(): Position {
        return this.circle.position;
    }

}