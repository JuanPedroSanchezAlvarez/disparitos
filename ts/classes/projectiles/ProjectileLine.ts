abstract class ProjectileLine extends Projectile {

    readonly positionStart: Position;
    readonly positionEnd: Position;

    constructor(positionStart: Position, positionEnd: Position, velocity: Velocity) { 
        super(velocity);
        this.positionStart = positionStart;
        this.positionEnd = positionEnd;
    }

    override getPosition(): Position {
        return this.positionStart;
    }

}