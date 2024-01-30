class BlasterPistol extends Weapon {

    private static readonly NAME: string = "Blaster Pistol";
    private static readonly PRECISION: number = 0.05;
    private static readonly RATE_OF_FIRE: number = 16;
    private static readonly MAX_MAGAZINE_SIZE: number = 30;
    private static readonly MAX_NUMBER_OF_BULLETS: number = 300;

    constructor() { 
        super(BlasterPistol.NAME, BlasterPistol.PRECISION, BlasterPistol.RATE_OF_FIRE, BlasterPistol.MAX_MAGAZINE_SIZE, BlasterPistol.MAX_NUMBER_OF_BULLETS);
    }

    override createProjectile(): Projectile {
        return new BlasterPistolProjectile({x:0, y:0}, {x:0, y:0}, {x:0, y:0});
    }

}