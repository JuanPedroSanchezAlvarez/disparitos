class WookieBowcaster extends Weapon {

    private static readonly NAME: string = "Wookie Bowcaster";
    private static readonly PRECISION: number = 0.05;
    private static readonly RATE_OF_FIRE: number = 8;
    private static readonly MAX_MAGAZINE_SIZE: number = 30;
    private static readonly MAX_NUMBER_OF_BULLETS: number = 300;

    constructor() { 
        super(WookieBowcaster.NAME, WookieBowcaster.PRECISION, WookieBowcaster.RATE_OF_FIRE, WookieBowcaster.MAX_MAGAZINE_SIZE, WookieBowcaster.MAX_NUMBER_OF_BULLETS);
    }

    override createProjectile(): Projectile {
        return new WookieBowcasterProjectile({x:0, y:0}, {x:0, y:0}, {x:0, y:0});
    }

}