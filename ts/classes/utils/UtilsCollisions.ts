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