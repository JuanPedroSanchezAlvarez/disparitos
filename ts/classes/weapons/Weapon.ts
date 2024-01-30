abstract class Weapon {

    readonly name: string;
    readonly precision: number;
    readonly rateOfFire: number;
    readonly magazineSize: number;
    readonly maxMagazineSize: number;
    readonly maxNumberOfBullets: number;

    constructor(name: string, precision: number, rateOfFire: number, maxMagazineSize: number, maxNumberOfBullets: number) { 
        this.name = name;
        this.precision = precision;
        this.rateOfFire = rateOfFire;
        this.magazineSize = 0;
        this.maxMagazineSize = maxMagazineSize;
        this.maxNumberOfBullets = maxNumberOfBullets;
    }

    abstract createProjectile(): Projectile;

}