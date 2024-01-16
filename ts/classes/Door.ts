class Door {

    rectangle: Rectangle;
    position: DOOR_POSITION;
    color: string = "yellow";

    constructor(position: DOOR_POSITION) {
        this.position = position;
        switch (this.position) {
            case DOOR_POSITION.UP: {
                this.rectangle = new Rectangle((WINDOW_WIDTH / 2) - (DOOR_LARGE / 2) , 0, DOOR_LARGE, DOOR_WIDTH);
                break;
            }
            case DOOR_POSITION.DOWN: {
                this.rectangle = new Rectangle((WINDOW_WIDTH / 2) - (DOOR_LARGE / 2) , WINDOW_HEIGHT - DOOR_WIDTH, DOOR_LARGE, DOOR_WIDTH);
                break;
            }
            case DOOR_POSITION.LEFT: {
                this.rectangle = new Rectangle(0, (WINDOW_HEIGHT / 2) - (DOOR_LARGE / 2), DOOR_WIDTH, DOOR_LARGE);
                break;
            }
            case DOOR_POSITION.RIGHT: {
                this.rectangle = new Rectangle(WINDOW_WIDTH - DOOR_WIDTH, (WINDOW_HEIGHT / 2) - (DOOR_LARGE / 2), DOOR_WIDTH, DOOR_LARGE);
                break;
            }
            default:
                this.rectangle = new Rectangle(0, 0, 0, 0);
                console.log("Error creating door.");
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