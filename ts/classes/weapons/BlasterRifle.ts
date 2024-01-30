class BlasterRifle extends Weapon {

    private static readonly NAME: string = "Blaster Rifle";
    private static readonly PRECISION: number = 0.05;
    private static readonly RATE_OF_FIRE: number = 8;
    private static readonly MAX_MAGAZINE_SIZE: number = 30;
    private static readonly MAX_NUMBER_OF_BULLETS: number = 300;

    constructor() { 
        super(BlasterRifle.NAME, BlasterRifle.PRECISION, BlasterRifle.RATE_OF_FIRE, BlasterRifle.MAX_MAGAZINE_SIZE, BlasterRifle.MAX_NUMBER_OF_BULLETS);
    }

    override createProjectile(): Projectile {
        return new BlasterRifleProjectile({x:0, y:0}, {x:0, y:0}, {x:0, y:0});
    }

}