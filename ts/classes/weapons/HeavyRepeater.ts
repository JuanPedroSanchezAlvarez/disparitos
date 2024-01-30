class HeavyRepeater extends Weapon {

    private static readonly NAME: string = "Heavy Repeater";
    private static readonly PRECISION: number = 0.05;
    private static readonly RATE_OF_FIRE: number = 8;
    private static readonly MAX_MAGAZINE_SIZE: number = 30;
    private static readonly MAX_NUMBER_OF_BULLETS: number = 300;

    constructor() { 
        super(HeavyRepeater.NAME, HeavyRepeater.PRECISION, HeavyRepeater.RATE_OF_FIRE, HeavyRepeater.MAX_MAGAZINE_SIZE, HeavyRepeater.MAX_NUMBER_OF_BULLETS);
    }

    override createProjectile(): Projectile {
        return new HeavyRepeaterProjectile({x:0, y:0}, {x:0, y:0});
    }

}