class BlasterRifleProjectile extends ProjectileLine {
    
    private static readonly COLOR: string = "red";
    public static readonly SPEED: number = 20;
    public static readonly LENGTH: number = 16;
    private static readonly WIDTH: number = 3;

    constructor(positionStart: Position, positionEnd: Position, velocity: Velocity) { 
        super(positionStart, positionEnd, velocity);
    }

    override draw(): void {
        ctx.strokeStyle = BlasterRifleProjectile.COLOR;
        ctx.lineWidth = BlasterRifleProjectile.WIDTH;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.positionStart.x, this.positionStart.y);
        ctx.lineTo(this.positionEnd.x, this.positionEnd.y);
        ctx.closePath();
        ctx.stroke();
    }

    override update(): void {
        this.positionStart.x = this.positionStart.x + this.velocity.x;
        this.positionStart.y = this.positionStart.y + this.velocity.y;
        this.positionEnd.x = this.positionEnd.x + this.velocity.x;
        this.positionEnd.y = this.positionEnd.y + this.velocity.y;
        this.draw();
    }

}