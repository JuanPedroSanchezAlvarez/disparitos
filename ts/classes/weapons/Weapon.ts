abstract class Weapon {

    readonly name: string;
    readonly precision: number;
    readonly rateOfFire: number;
    readonly magazineSize: number;
    readonly maxNumberOfBullets: number;
    readonly projectile: PROJECTILE;

    constructor(name: string, precision: number, rateOfFire: number, magazineSize: number, maxNumberOfBullets: number, projectile: PROJECTILE) { 
        this.name = name;
        this.precision = precision;
        this.rateOfFire = rateOfFire;
        this.magazineSize = magazineSize;
        this.maxNumberOfBullets = maxNumberOfBullets;
        this.projectile = projectile;
    }

}