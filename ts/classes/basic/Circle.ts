class Circle {

    position: Position;
    radius: number;

    constructor(positionX: number = 0, positionY: number = 0, radiusLength: number = 0) {
        this.position = new Position(positionX, positionY);
        this.radius = radiusLength;
    }
    
}