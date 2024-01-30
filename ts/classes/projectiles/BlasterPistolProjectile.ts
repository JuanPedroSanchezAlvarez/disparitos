class BlasterPistolProjectile extends ProjectileLine {
    
    private static readonly COLOR: string = "yellow";
    private static readonly SPEED: number = 20;
    private static readonly LENGTH: number = 16;
    private static readonly WIDTH: number = 3;

    constructor(positionStart: Position, positionEnd: Position, velocity: Velocity) { 
        super(positionStart, positionEnd, BlasterPistolProjectile.LENGTH, BlasterPistolProjectile.WIDTH, BlasterPistolProjectile.COLOR, BlasterPistolProjectile.SPEED, velocity);
    }

}