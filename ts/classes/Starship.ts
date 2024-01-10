class Starship {

    arrayOfRooms: Room[][];
    activeRoom: Position;

    constructor() {
        this.arrayOfRooms = [];
        for (let x: number = 0; x < 3; x++) {
            this.arrayOfRooms[x] = [];
            for (let y: number = 0; y < 3; y++) {
                let listOfDoors: DOOR[] = [];
                listOfDoors.push(DOOR.UP);
                listOfDoors.push(DOOR.DOWN);
                listOfDoors.push(DOOR.LEFT);
                listOfDoors.push(DOOR.RIGHT);
                if (x == 0) { listOfDoors.forEach((door, index) => { if (door === DOOR.UP) { listOfDoors.splice(index, 1); } }); }
                if (x == 2) { listOfDoors.forEach((door, index) => { if (door === DOOR.DOWN) { listOfDoors.splice(index, 1); } }); }
                if (y == 0) { listOfDoors.forEach((door, index) => { if (door === DOOR.LEFT) { listOfDoors.splice(index, 1); } }); }
                if (y == 2) { listOfDoors.forEach((door, index) => { if (door === DOOR.RIGHT) { listOfDoors.splice(index, 1); } }); }
                this.arrayOfRooms[x]![y] = new Room("Room " + x.toString() + y.toString(), listOfDoors);
            }
        }
        this.activeRoom = new Position(1, 1);
    }

    draw(): void {
    }

    update(): void {
        this.draw();
    }

}