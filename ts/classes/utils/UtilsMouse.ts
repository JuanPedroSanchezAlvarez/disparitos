function mouseOnRectangle(mouse: Mouse, rectangle: Rectangle): boolean {
    if (rectangle.position.x <= mouse.scaledPosition.x && mouse.scaledPosition.x <= (rectangle.position.x + rectangle.size.width) &&
        rectangle.position.y <= mouse.scaledPosition.y && mouse.scaledPosition.y <= (rectangle.position.y + rectangle.size.height)) {
        return true;
    }
    return false;
}

function mouseOnCircle(mouse: Mouse, circle: Circle): boolean {
    if (Math.hypot(mouse.scaledPosition.x - circle.position.x, mouse.scaledPosition.y - circle.position.y) <= circle.radius) {
        return true;
    }
    return false;
}

function mouseOnCircleAndRectangle(mouse: Mouse, rangeCircle: Circle, rectangle: Rectangle): boolean {
    if (mouseOnCircle(mouse, rangeCircle) && mouseOnRectangle(mouse, rectangle)) {
        return true;
    }
    return false;
}