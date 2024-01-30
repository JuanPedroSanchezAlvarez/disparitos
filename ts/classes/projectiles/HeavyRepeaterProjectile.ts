class HeavyRepeaterProjectile extends ProjectileCircle {
    
    private static readonly COLOR: string = "orange";
    private static readonly SPEED: number = 20;
    private static readonly SIZE: number = 8;

    constructor(position: Position, velocity: Velocity) { 
        super(new Circle(position.x, position.y, HeavyRepeaterProjectile.SIZE), HeavyRepeaterProjectile.COLOR, HeavyRepeaterProjectile.SPEED, velocity);
    }

}