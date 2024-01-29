abstract class Projectile implements Animated{

    velocity: Velocity;

    constructor(velocity: Velocity) {
        this.velocity = velocity;
    }

    abstract getPosition(): Position;
    abstract draw(): void;
    abstract update(): void;

}