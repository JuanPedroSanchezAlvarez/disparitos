abstract class Projectile implements Animated {

    readonly color: string;
    readonly speed: number;
    velocity: Velocity;

    constructor(color: string, speed: number, velocity: Velocity) {
        this.color = color;
        this.speed = speed;
        this.velocity = velocity;
    }

    abstract getPosition(): Position;
    abstract draw(): void;
    abstract update(): void;

}