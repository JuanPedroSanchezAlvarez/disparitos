class Mouse {

	realPosition: Position;
	scaledPosition: Position;

	// Singleton design pattern.
    private static instance: Mouse;

    public static getInstance(): Mouse {
        if (!Mouse.instance) { Mouse.instance = new Mouse(); }
        return Mouse.instance;
    }

	private constructor() {
        this.realPosition = new Position();
		this.scaledPosition = new Position();
	}

}