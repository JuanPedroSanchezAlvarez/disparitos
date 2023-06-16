"use strict";
const WINDOW_WIDTH = 1920;
const WINDOW_HEIGHT = 1080;
const FONT_SIZE_STRING = "20px";
const FONT_SIZE_NUMBER = 20;
const PLAYER_RADIUS = 16;
const PLAYER_COLOR = "white";
const PLAYER_SPEED = 3;
const PLAYER_RATE_OF_FIRE_PISTOL = 16;
const PLAYER_RATE_OF_FIRE_BLASTER = 8;
const LASER_LENGTH = 16;
const LASER_WIDTH = 3;
const LASER_SPEED = 20;
const LASER_COLOR = "yellow";
class Position {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
class Size {
    constructor(width = 0, height = 0) {
        this.width = width;
        this.height = height;
    }
}
class Circle {
    constructor(positionX = 0, positionY = 0, radiusLength = 0) {
        this.position = new Position(positionX, positionY);
        this.radius = radiusLength;
    }
}
class Rectangle {
    constructor(positionX = 0, positionY = 0, width = 0, height = 0) {
        this.position = new Position(positionX, positionY);
        this.size = new Size(width, height);
    }
}
class Mouse {
    constructor() {
        this.realPosition = new Position();
        this.scaledPosition = new Position();
    }
}
class Player {
    constructor(circle) {
        this.circle = circle;
        this.isMovingUp = false;
        this.isMovingLeft = false;
        this.isMovingDown = false;
        this.isMovingRight = false;
        this.isShooting = false;
        this.shootingFrame = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = PLAYER_COLOR;
        ctx.arc(this.circle.position.x, this.circle.position.y, this.circle.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    }
    update() {
        if (this.isMovingUp) {
            this.circle.position.y -= PLAYER_SPEED;
        }
        if (this.isMovingLeft) {
            this.circle.position.x -= PLAYER_SPEED;
        }
        if (this.isMovingDown) {
            this.circle.position.y += PLAYER_SPEED;
        }
        if (this.isMovingRight) {
            this.circle.position.x += PLAYER_SPEED;
        }
        if (this.circle.position.x - this.circle.radius < 0) {
            this.circle.position.x = 0 + this.circle.radius;
        }
        else if (this.circle.position.x + this.circle.radius > canvas.width) {
            this.circle.position.x = canvas.width - this.circle.radius;
        }
        if (this.circle.position.y - this.circle.radius < 0) {
            this.circle.position.y = 0 + this.circle.radius;
        }
        else if (this.circle.position.y + this.circle.radius > canvas.height) {
            this.circle.position.y = canvas.height - this.circle.radius;
        }
        if (this.isShooting) {
            if (this.shootingFrame === 0 || this.shootingFrame % PLAYER_RATE_OF_FIRE_BLASTER === 0) {
                this.shoot(mouse);
            }
            this.shootingFrame++;
        }
        else {
            if (this.shootingFrame != 0) {
                this.shootingFrame = 0;
            }
        }
        this.draw();
    }
    shoot(mouse) {
        const positionFrom = new Position(this.circle.position.x, this.circle.position.y);
        const angle = Math.atan2(mouse.scaledPosition.y - this.circle.position.y, mouse.scaledPosition.x - this.circle.position.x);
        const modifier = (Math.random() / 10) - 0.05;
        const angleModified = angle + modifier;
        console.log(modifier);
        const positionTo = new Position(positionFrom.x + (Math.cos(angleModified) * LASER_LENGTH), positionFrom.y + (Math.sin(angleModified) * LASER_LENGTH));
        const velocity = { x: Math.cos(angleModified) * LASER_SPEED, y: Math.sin(angleModified) * LASER_SPEED };
        listOfProjectiles.push(new Projectile(positionFrom, positionTo, velocity));
    }
}
class Projectile {
    constructor(positionFrom, positionTo, velocity) {
        this.positionFrom = positionFrom;
        this.positionTo = positionTo;
        this.velocity = velocity;
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = LASER_COLOR;
        ctx.lineWidth = LASER_WIDTH;
        ctx.lineCap = "round";
        ctx.moveTo(this.positionFrom.x, this.positionFrom.y);
        ctx.lineTo(this.positionTo.x, this.positionTo.y);
        ctx.stroke();
        ctx.closePath();
    }
    update() {
        this.positionFrom.x = this.positionFrom.x + this.velocity.x;
        this.positionFrom.y = this.positionFrom.y + this.velocity.y;
        this.positionTo.x = this.positionTo.x + this.velocity.x;
        this.positionTo.y = this.positionTo.y + this.velocity.y;
        this.draw();
    }
}
function getCirclesDistance(circle1, circle2) {
    return Math.hypot(circle1.position.x - circle2.position.x, circle1.position.y - circle2.position.y);
}
function hasContactedCircles(circle1, circle2) {
    return (getCirclesDistance(circle1, circle2) - circle1.radius - circle2.radius < 1) ? true : false;
}
function hasCollidedCircles(circle1, circle2) {
    return (getCirclesDistance(circle1, circle2) - circle1.radius - circle2.radius < 0) ? true : false;
}
function hasCollidedRectangles(rectangle1, rectangle2) {
    if (rectangle1.position.x > (rectangle2.position.x + rectangle2.size.width) || (rectangle1.position.x + rectangle1.size.width) < rectangle2.position.x
        || rectangle1.position.y > (rectangle2.position.y + rectangle2.size.height) || (rectangle1.position.y + rectangle1.size.height) < rectangle2.position.y) {
        return false;
    }
    return true;
}
function isFullCircleInsideAnotherCircle(innerCircle, outerCircle) {
    return (getCirclesDistance(innerCircle, outerCircle) + innerCircle.radius <= outerCircle.radius) ? true : false;
}
function isFullCircleInsideRectangle(innerCircle, outerRectangle) {
    if (innerCircle.position.x - innerCircle.radius >= outerRectangle.position.x
        && innerCircle.position.x + innerCircle.radius <= outerRectangle.position.x + outerRectangle.size.width
        && innerCircle.position.y - innerCircle.radius >= outerRectangle.position.y
        && innerCircle.position.y + innerCircle.radius <= outerRectangle.position.y + outerRectangle.size.height) {
        return true;
    }
    return false;
}
function mouseOnRectangle(mouse, rectangle) {
    if (rectangle.position.x <= mouse.scaledPosition.x && mouse.scaledPosition.x <= (rectangle.position.x + rectangle.size.width) &&
        rectangle.position.y <= mouse.scaledPosition.y && mouse.scaledPosition.y <= (rectangle.position.y + rectangle.size.height)) {
        return true;
    }
    return false;
}
function mouseOnCircle(mouse, circle) {
    if (Math.hypot(mouse.scaledPosition.x - circle.position.x, mouse.scaledPosition.y - circle.position.y) <= circle.radius) {
        return true;
    }
    return false;
}
function mouseOnCircleAndRectangle(mouse, rangeCircle, battlefieldRectangle) {
    if (mouseOnCircle(mouse, rangeCircle) && mouseOnRectangle(mouse, battlefieldRectangle)) {
        return true;
    }
    return false;
}
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
canvas.style.width = "100%";
canvas.style.height = "100vh";
ctx.font = "normal " + FONT_SIZE_STRING + " Black Ops One, cursive";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
const mouse = new Mouse();
let player;
let listOfProjectiles;
function init() {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    player = new Player(new Circle(x, y, PLAYER_RADIUS));
    listOfProjectiles = [];
}
let animationId;
let frame = 0;
function animate() {
    frame = frame >= 60 ? 1 : frame + 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    listOfProjectiles.forEach((projectile, index) => {
        projectile.update();
        if (projectile.positionFrom.x < 0 ||
            projectile.positionFrom.x > canvas.width ||
            projectile.positionFrom.y < 0 ||
            projectile.positionFrom.y > canvas.height) {
            setTimeout(() => {
                listOfProjectiles.splice(index, 1);
            }, 0);
        }
    });
    animationId = window.requestAnimationFrame(animate);
}
addEventListener("mousemove", ({ clientX, clientY }) => {
    mouse.realPosition.x = clientX;
    mouse.realPosition.y = clientY;
    mouse.scaledPosition.x = clientX * (canvas.width / canvas.clientWidth);
    mouse.scaledPosition.y = clientY * (canvas.height / canvas.clientHeight);
});
addEventListener("mousedown", () => {
    player.isShooting = true;
});
addEventListener("mouseup", () => {
    player.isShooting = false;
});
addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
addEventListener("keydown", ({ key }) => {
    if (key === "w") {
        player.isMovingUp = true;
    }
    if (key === "a") {
        player.isMovingLeft = true;
    }
    if (key === "s") {
        player.isMovingDown = true;
    }
    if (key === "d") {
        player.isMovingRight = true;
    }
});
addEventListener("keyup", ({ key }) => {
    if (key === "w") {
        player.isMovingUp = false;
    }
    if (key === "a") {
        player.isMovingLeft = false;
    }
    if (key === "s") {
        player.isMovingDown = false;
    }
    if (key === "d") {
        player.isMovingRight = false;
    }
});
init();
animate();
class BackgroundParticle {
    constructor(x, y, radius, color) {
        this.position = { x: x, y: y };
        this.radius = radius;
        this.color = color;
        this.alpha = 0.05;
        this.initialAlpha = this.alpha;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.draw();
    }
}
class Enemy {
    constructor(position, radius, color, velocity) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.type = 'linear';
        this.center = { x: this.position.x, y: this.position.y };
        this.radians = 0;
        if (Math.random() < 0.25) {
            this.type = 'homing';
            if (Math.random() < 0.5) {
                this.type = 'spinning';
                if (Math.random() < 0.75) {
                    this.type = 'homingSpinning';
                }
            }
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.draw();
        if (this.type === 'linear') {
            this.position.x = this.position.x + this.velocity.x;
            this.position.y = this.position.y + this.velocity.y;
        }
        else if (this.type === 'homing') {
            const angle = Math.atan2(player.circle.position.y - this.position.y, player.circle.position.x - this.position.x);
            this.velocity = { x: Math.cos(angle), y: Math.sin(angle) };
            this.position.x = this.position.x + this.velocity.x;
            this.position.y = this.position.y + this.velocity.y;
        }
        else if (this.type === 'spinning') {
            this.radians += 0.05;
            this.center.x += this.velocity.x;
            this.center.y += this.velocity.y;
            this.position.x = this.center.x + Math.cos(this.radians) * 100;
            this.position.y = this.center.y + Math.sin(this.radians) * 100;
        }
        else if (this.type === 'homingSpinning') {
            const angle = Math.atan2(player.circle.position.y - this.position.y, player.circle.position.x - this.position.x);
            this.velocity = { x: Math.cos(angle), y: Math.sin(angle) };
            this.radians += 0.05;
            this.center.x += this.velocity.x;
            this.center.y += this.velocity.y;
            this.position.x = this.center.x + Math.cos(this.radians) * 100;
            this.position.y = this.center.y + Math.sin(this.radians) * 100;
        }
    }
}
class Particle {
    constructor(position, radius, color, velocity) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.draw();
        this.position.x = this.position.x + this.velocity.x;
        this.position.y = this.position.y + this.velocity.y;
        this.alpha -= 0.01;
    }
}
class PowerUp {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.width = 14;
        this.height = 18;
        this.radians = 0;
    }
    draw() {
        ctx.save();
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        ctx.rotate(this.radians);
        ctx.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);
        ctx.restore();
    }
    update() {
        this.radians += 0.002;
        this.draw();
        this.position.x = this.position.x + this.velocity.x;
        this.position.y = this.position.y + this.velocity.y;
    }
}
