class Door implements Animated {

    private static readonly WIDTH: number = 4;
    private static readonly LARGE: number = 120;

    rectangle: Rectangle;
    position: DOOR_POSITION;
    color: string = "yellow";

    constructor(position: DOOR_POSITION) {
        this.position = position;
        switch (this.position) {
            case DOOR_POSITION.UP: {
                this.rectangle = new Rectangle((WINDOW_WIDTH / 2) - (Door.LARGE / 2) , 0, Door.LARGE, Door.WIDTH);
                break;
            }
            case DOOR_POSITION.DOWN: {
                this.rectangle = new Rectangle((WINDOW_WIDTH / 2) - (Door.LARGE / 2) , WINDOW_HEIGHT - Door.WIDTH, Door.LARGE, Door.WIDTH);
                break;
            }
            case DOOR_POSITION.LEFT: {
                this.rectangle = new Rectangle(0, (WINDOW_HEIGHT / 2) - (Door.LARGE / 2), Door.WIDTH, Door.LARGE);
                break;
            }
            case DOOR_POSITION.RIGHT: {
                this.rectangle = new Rectangle(WINDOW_WIDTH - Door.WIDTH, (WINDOW_HEIGHT / 2) - (Door.LARGE / 2), Door.WIDTH, Door.LARGE);
                break;
            }
            default:
                this.rectangle = new Rectangle(0, 0, 0, 0);
                console.error("Error creating door.");
        }
    }

    draw(): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.rectangle.position.x, this.rectangle.position.y, this.rectangle.size.width, this.rectangle.size.height);
    }

    update(): void {
        this.draw();
    }

}