class PortableMissileSystem extends Weapon {

    private static readonly NAME: string = "Portable Missile System";
    private static readonly PRECISION: number = 0.05;
    private static readonly RATE_OF_FIRE: number = 8;
    private static readonly MAX_MAGAZINE_SIZE: number = 30;
    private static readonly MAX_NUMBER_OF_BULLETS: number = 300;

    constructor() { 
        super(PortableMissileSystem.NAME, PortableMissileSystem.PRECISION, PortableMissileSystem.RATE_OF_FIRE, PortableMissileSystem.MAX_MAGAZINE_SIZE, PortableMissileSystem.MAX_NUMBER_OF_BULLETS);
    }

    override createProjectile(): Projectile {
        return new PortableMissileSystemProjectile({x:0, y:0}, {x:0, y:0});
    }

}