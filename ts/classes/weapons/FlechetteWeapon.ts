class FlechetteWeapon extends Weapon {

    private static readonly NAME: string = "Flechette Weapon";
    private static readonly PRECISION: number = 0.05;
    private static readonly RATE_OF_FIRE: number = 8;
    private static readonly MAX_MAGAZINE_SIZE: number = 30;
    private static readonly MAX_NUMBER_OF_BULLETS: number = 300;

    constructor() { 
        super(FlechetteWeapon.NAME, FlechetteWeapon.PRECISION, FlechetteWeapon.RATE_OF_FIRE, FlechetteWeapon.MAX_MAGAZINE_SIZE, FlechetteWeapon.MAX_NUMBER_OF_BULLETS);
    }

    override createProjectile(): Projectile {
        return new FlechetteWeaponProjectile({x:0, y:0}, {x:0, y:0});
    }

}