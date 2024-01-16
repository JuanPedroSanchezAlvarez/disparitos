class Room {

    name: string;
    rectangle: Rectangle;
    listOfDoors: Door[];

    constructor(name: string, listOfDoorPosition: DOOR_POSITION[]) {
        this.name = name;
        this.rectangle = new Rectangle(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        this.listOfDoors = [];
        listOfDoorPosition.forEach((position) => {
            this.listOfDoors.push(new Door(position));
        });
    }

    draw(): void {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.strokeText(this.name, WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        ctx.fillStyle = "white";
        ctx.fillText(this.name, WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    }

    update(): void {
        this.listOfDoors.forEach((door) => { door.update(); });
        this.draw();
    }

}