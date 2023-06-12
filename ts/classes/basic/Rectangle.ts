class Rectangle {

	position: Position;
	size: Size;

	constructor(positionX: number = 0, positionY: number = 0, width: number = 0, height: number = 0) {
        this.position = new Position(positionX, positionY);
		this.size = new Size(width, height);
	}
    
}