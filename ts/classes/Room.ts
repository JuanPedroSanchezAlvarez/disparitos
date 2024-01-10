class Room {

    name: string;
    rectangle: Rectangle;
    listOfDoors: DOOR[];

    constructor(name: string, listOfDoors: DOOR[]) {
        this.name = name;
        this.rectangle = new Rectangle(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        this.listOfDoors = listOfDoors;
    }

    draw(): void {
        this.listOfDoors.forEach((door) => {
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            switch (door) {
                case DOOR.UP: {
                    ctx.moveTo((WINDOW_WIDTH / 2) - 30, 0);
                    ctx.lineTo((WINDOW_WIDTH / 2) + 30, 0);
                    break;
                }
                case DOOR.DOWN: {
                    ctx.moveTo((WINDOW_WIDTH / 2) - 30, WINDOW_HEIGHT);
                    ctx.lineTo((WINDOW_WIDTH / 2) + 30, WINDOW_HEIGHT);
                    break;
                }
                case DOOR.LEFT: {
                    ctx.moveTo(0, (WINDOW_HEIGHT / 2) - 30);
                    ctx.lineTo(0, (WINDOW_HEIGHT / 2) + 30);
                    break;
                }
                case DOOR.RIGHT: {
                    ctx.moveTo(WINDOW_WIDTH, (WINDOW_HEIGHT / 2) - 30);
                    ctx.lineTo(WINDOW_WIDTH, (WINDOW_HEIGHT / 2) + 30);
                    break;
                }
            }
            ctx.stroke();
            ctx.closePath();
        });
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.strokeText(this.name, WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        ctx.fillStyle = "white";
        ctx.fillText(this.name, WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    }

    update(): void {
        this.draw();
    }

}