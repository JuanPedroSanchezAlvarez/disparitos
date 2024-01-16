function getCirclesDistance(circle1: Circle, circle2: Circle): number {
    return Math.hypot(circle1.position.x - circle2.position.x, circle1.position.y - circle2.position.y);
}

function hasContactedCircles(circle1: Circle, circle2: Circle): boolean {
    return (getCirclesDistance(circle1, circle2) - circle1.radius - circle2.radius < 1) ? true : false;
}

function hasCollidedCircles(circle1: Circle, circle2: Circle): boolean {
    return (getCirclesDistance(circle1, circle2) - circle1.radius - circle2.radius < 0) ? true : false;
}

function hasCollidedRectangles(rectangle1: Rectangle, rectangle2: Rectangle): boolean {
    if (rectangle1.position.x > (rectangle2.position.x + rectangle2.size.width) || (rectangle1.position.x  + rectangle1.size.width) < rectangle2.position.x
        || rectangle1.position.y > (rectangle2.position.y + rectangle2.size.height) || (rectangle1.position.y  + rectangle1.size.height) < rectangle2.position.y) {
        return false;
    }
    return true;
}

function hasCollidedCircleWithRectangle(circle: Circle, rectangle: Rectangle): boolean {
    // Temporary variables to set edges for testing.
    let testX: number = circle.position.x;
    let testY: number = circle.position.y;

    // Which edge is closest?
    if (circle.position.x < rectangle.position.x) {
        testX = rectangle.position.x; // Left edge.
    } else if (circle.position.x > rectangle.position.x + rectangle.size.width) {
        testX = rectangle.position.x + rectangle.size.width; // Right edge.
    }
    
    if (circle.position.y < rectangle.position.y) {
        testY = rectangle.position.y; // Top edge.
    } else if (circle.position.y > rectangle.position.y + rectangle.size.height) {
        testY = rectangle.position.y + rectangle.size.height; // Bottom edge.
    }

    // Get distance from closest edges.
    let distX: number = circle.position.x - testX;
    let distY: number = circle.position.y - testY;
    let distance: number = Math.sqrt( (distX * distX) + (distY * distY) );

    // If the distance is less than the radius, collision!
    return distance <= circle.radius ? true : false;
}

function isFullCircleInsideAnotherCircle(innerCircle: Circle, outerCircle: Circle): boolean {
    return (getCirclesDistance(innerCircle, outerCircle) + innerCircle.radius <= outerCircle.radius) ? true : false;
}

function isFullCircleInsideRectangle(innerCircle: Circle, outerRectangle: Rectangle): boolean {
    if (innerCircle.position.x - innerCircle.radius >= outerRectangle.position.x
        && innerCircle.position.x + innerCircle.radius <= outerRectangle.position.x + outerRectangle.size.width
        && innerCircle.position.y - innerCircle.radius >= outerRectangle.position.y
        && innerCircle.position.y + innerCircle.radius <= outerRectangle.position.y + outerRectangle.size.height) {
        return true;
    }
    return false;
}