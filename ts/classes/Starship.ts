class Starship {

    arrayOfRooms: Room[][];
    activeRoom: Position;

    constructor() {
        this.arrayOfRooms = [];
        for (let x: number = 0; x < 3; x++) {
            this.arrayOfRooms[x] = [];
            for (let y: number = 0; y < 3; y++) {
                let listOfDoors: DOOR_POSITION[] = [];
                if (x === 0 && y === 0) {
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                } else if (x === 2 && y === 0) {
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                } else if (x === 0 && y === 2) {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                } else if (x === 2 && y === 2) {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                } else if (x === 0) {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                } else if (x === 2) {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                } else if (y === 0) {
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                } else if (y === 2) {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                } else {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                }
                this.arrayOfRooms[x]![y] = new Room("Room " + x.toString() + y.toString(), listOfDoors);
            }
        }
        this.activeRoom = new Position(1, 1);
    }

    getActiveRoom(): Room {
        return this.arrayOfRooms[this.activeRoom.x]![this.activeRoom.y]!;
    }

    changeActiveRoom(doorPosition: DOOR_POSITION): void {
        switch (doorPosition) {
            case DOOR_POSITION.UP: {
                this.activeRoom.y -= 1;
                break;
            }
            case DOOR_POSITION.DOWN: {
                this.activeRoom.y += 1;
                break;
            }
            case DOOR_POSITION.LEFT: {
                this.activeRoom.x -= 1;
                break;
            }
            case DOOR_POSITION.RIGHT: {
                this.activeRoom.x += 1;
                break;
            }
            default:
                console.log("Error changing active room.");
        }
        player.circle.position.x = canvas.width / 2;
        player.circle.position.y = canvas.height / 2;
    }

    draw(): void {
    }

    update(): void {
        this.getActiveRoom().update();
        this.draw();
    }

}