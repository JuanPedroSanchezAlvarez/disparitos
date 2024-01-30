"use strict";
var DOOR_POSITION;
(function (DOOR_POSITION) {
    DOOR_POSITION[DOOR_POSITION["UP"] = 0] = "UP";
    DOOR_POSITION[DOOR_POSITION["DOWN"] = 1] = "DOWN";
    DOOR_POSITION[DOOR_POSITION["LEFT"] = 2] = "LEFT";
    DOOR_POSITION[DOOR_POSITION["RIGHT"] = 3] = "RIGHT";
})(DOOR_POSITION || (DOOR_POSITION = {}));
;
const WINDOW_WIDTH = 1920;
const WINDOW_HEIGHT = 1080;
const FONT_SIZE_STRING = "32px";
const FONT_SIZE_NUMBER = 32;
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
    static getInstance() {
        if (!Mouse.instance) {
            Mouse.instance = new Mouse();
        }
        return Mouse.instance;
    }
    constructor() {
        this.realPosition = new Position();
        this.scaledPosition = new Position();
    }
}
class Velocity {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
class Weapon {
    constructor(name, precision, rateOfFire, maxMagazineSize, maxNumberOfBullets) {
        this.name = name;
        this.precision = precision;
        this.rateOfFire = rateOfFire;
        this.magazineSize = 0;
        this.maxMagazineSize = maxMagazineSize;
        this.maxNumberOfBullets = maxNumberOfBullets;
    }
}
class BlasterPistol extends Weapon {
    constructor() {
        super(BlasterPistol.NAME, BlasterPistol.PRECISION, BlasterPistol.RATE_OF_FIRE, BlasterPistol.MAX_MAGAZINE_SIZE, BlasterPistol.MAX_NUMBER_OF_BULLETS);
    }
    createProjectile() {
        return new BlasterPistolProjectile({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 });
    }
}
BlasterPistol.NAME = "Blaster Pistol";
BlasterPistol.PRECISION = 0.05;
BlasterPistol.RATE_OF_FIRE = 16;
BlasterPistol.MAX_MAGAZINE_SIZE = 30;
BlasterPistol.MAX_NUMBER_OF_BULLETS = 300;
class BlasterRifle extends Weapon {
    constructor() {
        super(BlasterRifle.NAME, BlasterRifle.PRECISION, BlasterRifle.RATE_OF_FIRE, BlasterRifle.MAX_MAGAZINE_SIZE, BlasterRifle.MAX_NUMBER_OF_BULLETS);
    }
    createProjectile() {
        return new BlasterRifleProjectile({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 });
    }
}
BlasterRifle.NAME = "Blaster Rifle";
BlasterRifle.PRECISION = 0.05;
BlasterRifle.RATE_OF_FIRE = 8;
BlasterRifle.MAX_MAGAZINE_SIZE = 30;
BlasterRifle.MAX_NUMBER_OF_BULLETS = 300;
class FlechetteWeapon extends Weapon {
    constructor() {
        super(FlechetteWeapon.NAME, FlechetteWeapon.PRECISION, FlechetteWeapon.RATE_OF_FIRE, FlechetteWeapon.MAX_MAGAZINE_SIZE, FlechetteWeapon.MAX_NUMBER_OF_BULLETS);
    }
    createProjectile() {
        return new FlechetteWeaponProjectile({ x: 0, y: 0 }, { x: 0, y: 0 });
    }
}
FlechetteWeapon.NAME = "Flechette Weapon";
FlechetteWeapon.PRECISION = 0.05;
FlechetteWeapon.RATE_OF_FIRE = 8;
FlechetteWeapon.MAX_MAGAZINE_SIZE = 30;
FlechetteWeapon.MAX_NUMBER_OF_BULLETS = 300;
class HeavyRepeater extends Weapon {
    constructor() {
        super(HeavyRepeater.NAME, HeavyRepeater.PRECISION, HeavyRepeater.RATE_OF_FIRE, HeavyRepeater.MAX_MAGAZINE_SIZE, HeavyRepeater.MAX_NUMBER_OF_BULLETS);
    }
    createProjectile() {
        return new HeavyRepeaterProjectile({ x: 0, y: 0 }, { x: 0, y: 0 });
    }
}
HeavyRepeater.NAME = "Heavy Repeater";
HeavyRepeater.PRECISION = 0.05;
HeavyRepeater.RATE_OF_FIRE = 8;
HeavyRepeater.MAX_MAGAZINE_SIZE = 30;
HeavyRepeater.MAX_NUMBER_OF_BULLETS = 300;
class PortableMissileSystem extends Weapon {
    constructor() {
        super(PortableMissileSystem.NAME, PortableMissileSystem.PRECISION, PortableMissileSystem.RATE_OF_FIRE, PortableMissileSystem.MAX_MAGAZINE_SIZE, PortableMissileSystem.MAX_NUMBER_OF_BULLETS);
    }
    createProjectile() {
        return new PortableMissileSystemProjectile({ x: 0, y: 0 }, { x: 0, y: 0 });
    }
}
PortableMissileSystem.NAME = "Portable Missile System";
PortableMissileSystem.PRECISION = 0.05;
PortableMissileSystem.RATE_OF_FIRE = 8;
PortableMissileSystem.MAX_MAGAZINE_SIZE = 30;
PortableMissileSystem.MAX_NUMBER_OF_BULLETS = 300;
class WookieBowcaster extends Weapon {
    constructor() {
        super(WookieBowcaster.NAME, WookieBowcaster.PRECISION, WookieBowcaster.RATE_OF_FIRE, WookieBowcaster.MAX_MAGAZINE_SIZE, WookieBowcaster.MAX_NUMBER_OF_BULLETS);
    }
    createProjectile() {
        return new WookieBowcasterProjectile({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 });
    }
}
WookieBowcaster.NAME = "Wookie Bowcaster";
WookieBowcaster.PRECISION = 0.05;
WookieBowcaster.RATE_OF_FIRE = 8;
WookieBowcaster.MAX_MAGAZINE_SIZE = 30;
WookieBowcaster.MAX_NUMBER_OF_BULLETS = 300;
class Projectile {
    constructor(color, speed, velocity) {
        this.color = color;
        this.speed = speed;
        this.velocity = velocity;
    }
}
class ProjectileLine extends Projectile {
    constructor(positionStart, positionEnd, length, width, color, speed, velocity) {
        super(color, speed, velocity);
        this.length = length;
        this.width = width;
        this.positionStart = positionStart;
        this.positionEnd = positionEnd;
    }
    getPosition() {
        return this.positionStart;
    }
    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.positionStart.x, this.positionStart.y);
        ctx.lineTo(this.positionEnd.x, this.positionEnd.y);
        ctx.closePath();
        ctx.stroke();
    }
    update() {
        this.positionStart.x += this.velocity.x;
        this.positionStart.y += this.velocity.y;
        this.positionEnd.x += this.velocity.x;
        this.positionEnd.y += this.velocity.y;
        this.draw();
    }
}
class ProjectileCircle extends Projectile {
    constructor(circle, color, speed, velocity) {
        super(color, speed, velocity);
        this.circle = circle;
    }
    getPosition() {
        return this.circle.position;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.circle.position.x, this.circle.position.y, this.circle.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
    update() {
        this.circle.position.x += this.velocity.x;
        this.circle.position.y += this.velocity.y;
        this.draw();
    }
}
class BlasterPistolProjectile extends ProjectileLine {
    constructor(positionStart, positionEnd, velocity) {
        super(positionStart, positionEnd, BlasterPistolProjectile.LENGTH, BlasterPistolProjectile.WIDTH, BlasterPistolProjectile.COLOR, BlasterPistolProjectile.SPEED, velocity);
    }
}
BlasterPistolProjectile.COLOR = "yellow";
BlasterPistolProjectile.SPEED = 20;
BlasterPistolProjectile.LENGTH = 16;
BlasterPistolProjectile.WIDTH = 3;
class BlasterRifleProjectile extends ProjectileLine {
    constructor(positionStart, positionEnd, velocity) {
        super(positionStart, positionEnd, BlasterRifleProjectile.LENGTH, BlasterRifleProjectile.WIDTH, BlasterRifleProjectile.COLOR, BlasterRifleProjectile.SPEED, velocity);
    }
}
BlasterRifleProjectile.COLOR = "red";
BlasterRifleProjectile.SPEED = 20;
BlasterRifleProjectile.LENGTH = 16;
BlasterRifleProjectile.WIDTH = 3;
class FlechetteWeaponProjectile extends ProjectileCircle {
    constructor(position, velocity) {
        super(new Circle(position.x, position.y, FlechetteWeaponProjectile.SIZE), FlechetteWeaponProjectile.COLOR, FlechetteWeaponProjectile.SPEED, velocity);
    }
}
FlechetteWeaponProjectile.COLOR = "orange";
FlechetteWeaponProjectile.SPEED = 20;
FlechetteWeaponProjectile.SIZE = 8;
class HeavyRepeaterProjectile extends ProjectileCircle {
    constructor(position, velocity) {
        super(new Circle(position.x, position.y, HeavyRepeaterProjectile.SIZE), HeavyRepeaterProjectile.COLOR, HeavyRepeaterProjectile.SPEED, velocity);
    }
}
HeavyRepeaterProjectile.COLOR = "orange";
HeavyRepeaterProjectile.SPEED = 20;
HeavyRepeaterProjectile.SIZE = 8;
class PortableMissileSystemProjectile extends ProjectileCircle {
    constructor(position, velocity) {
        super(new Circle(position.x, position.y, PortableMissileSystemProjectile.SIZE), PortableMissileSystemProjectile.COLOR, PortableMissileSystemProjectile.SPEED, velocity);
    }
}
PortableMissileSystemProjectile.COLOR = "orange";
PortableMissileSystemProjectile.SPEED = 20;
PortableMissileSystemProjectile.SIZE = 8;
class WookieBowcasterProjectile extends ProjectileLine {
    constructor(positionStart, positionEnd, velocity) {
        super(positionStart, positionEnd, WookieBowcasterProjectile.LENGTH, WookieBowcasterProjectile.WIDTH, WookieBowcasterProjectile.COLOR, WookieBowcasterProjectile.SPEED, velocity);
    }
}
WookieBowcasterProjectile.COLOR = "green";
WookieBowcasterProjectile.SPEED = 20;
WookieBowcasterProjectile.LENGTH = 16;
WookieBowcasterProjectile.WIDTH = 3;
class Starship {
    static getInstance() {
        if (!Starship.instance) {
            Starship.instance = new Starship();
        }
        return Starship.instance;
    }
    constructor() {
        this.arrayOfRooms = [];
        for (let x = 0; x < 3; x++) {
            this.arrayOfRooms[x] = [];
            for (let y = 0; y < 3; y++) {
                let listOfDoors = [];
                if (x === 0 && y === 0) {
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                }
                else if (x === 2 && y === 0) {
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                }
                else if (x === 0 && y === 2) {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                }
                else if (x === 2 && y === 2) {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                }
                else if (x === 0) {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                }
                else if (x === 2) {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                }
                else if (y === 0) {
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                }
                else if (y === 2) {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                }
                else {
                    listOfDoors.push(DOOR_POSITION.UP);
                    listOfDoors.push(DOOR_POSITION.DOWN);
                    listOfDoors.push(DOOR_POSITION.LEFT);
                    listOfDoors.push(DOOR_POSITION.RIGHT);
                }
                this.arrayOfRooms[x][y] = new Room("Room " + x.toString() + y.toString(), listOfDoors);
            }
        }
        this.activeRoomPosition = new Position(1, 1);
    }
    getActiveRoom() {
        return this.arrayOfRooms[this.activeRoomPosition.x][this.activeRoomPosition.y];
    }
    changeActiveRoom(doorPosition) {
        switch (doorPosition) {
            case DOOR_POSITION.UP: {
                this.activeRoomPosition.y -= 1;
                player.circle.position.x = canvas.width / 2;
                player.circle.position.y = canvas.height - player.circle.radius - 10;
                break;
            }
            case DOOR_POSITION.DOWN: {
                this.activeRoomPosition.y += 1;
                player.circle.position.x = canvas.width / 2;
                player.circle.position.y = player.circle.radius + 10;
                break;
            }
            case DOOR_POSITION.LEFT: {
                this.activeRoomPosition.x -= 1;
                player.circle.position.x = canvas.width - player.circle.radius - 10;
                player.circle.position.y = canvas.height / 2;
                break;
            }
            case DOOR_POSITION.RIGHT: {
                this.activeRoomPosition.x += 1;
                player.circle.position.x = player.circle.radius + 10;
                player.circle.position.y = canvas.height / 2;
                break;
            }
            default:
                console.error("Error changing active room.");
        }
    }
    draw() {
    }
    update() {
        this.getActiveRoom().update();
        this.draw();
    }
}
class Room {
    constructor(name, listOfDoorPosition) {
        this.name = name;
        this.rectangle = new Rectangle(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        this.listOfDoors = [];
        listOfDoorPosition.forEach((position) => {
            this.listOfDoors.push(new Door(position));
        });
    }
    draw() {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.strokeText(this.name, WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        ctx.fillStyle = "white";
        ctx.fillText(this.name, WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    }
    update() {
        this.listOfDoors.forEach((door) => { door.update(); });
        this.draw();
    }
}
class Door {
    constructor(position) {
        this.color = "yellow";
        this.position = position;
        switch (this.position) {
            case DOOR_POSITION.UP: {
                this.rectangle = new Rectangle((WINDOW_WIDTH / 2) - (Door.LARGE / 2), 0, Door.LARGE, Door.WIDTH);
                break;
            }
            case DOOR_POSITION.DOWN: {
                this.rectangle = new Rectangle((WINDOW_WIDTH / 2) - (Door.LARGE / 2), WINDOW_HEIGHT - Door.WIDTH, Door.LARGE, Door.WIDTH);
                break;
            }
            case DOOR_POSITION.LEFT: {
                this.rectangle = new Rectangle(0, (WINDOW_HEIGHT / 2) - (Door.LARGE / 2), Door.WIDTH, Door.LARGE);
                break;
            }
            case DOOR_POSITION.RIGHT: {
                this.rectangle = new Rectangle(WINDOW_WIDTH - Door.WIDTH, (WINDOW_HEIGHT / 2) - (Door.LARGE / 2), Door.WIDTH, Door.LARGE);
                break;
            }
            default:
                this.rectangle = new Rectangle(0, 0, 0, 0);
                console.error("Error creating door.");
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.rectangle.position.x, this.rectangle.position.y, this.rectangle.size.width, this.rectangle.size.height);
    }
    update() {
        this.draw();
    }
}
Door.WIDTH = 4;
Door.LARGE = 120;
class Player {
    static getInstance() {
        if (!Player.instance) {
            Player.instance = new Player();
        }
        return Player.instance;
    }
    constructor() {
        this.circle = new Circle(canvas.width / 2, canvas.height / 2, Player.RADIUS);
        this.isMovingUp = false;
        this.isMovingLeft = false;
        this.isMovingDown = false;
        this.isMovingRight = false;
        this.isShooting = false;
        this.shootingFrame = 0;
        this.tupleOfPrimaryWeapons = [new BlasterPistol(), new BlasterRifle(), new FlechetteWeapon()];
        this.selectedPrimaryWeapon = 2;
    }
    getSelectedPrimaryWeapon() {
        return this.tupleOfPrimaryWeapons[this.selectedPrimaryWeapon];
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = Player.COLOR;
        ctx.arc(this.circle.position.x, this.circle.position.y, this.circle.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
    update() {
        if (this.isMovingUp) {
            this.circle.position.y -= Player.SPEED;
        }
        if (this.isMovingLeft) {
            this.circle.position.x -= Player.SPEED;
        }
        if (this.isMovingDown) {
            this.circle.position.y += Player.SPEED;
        }
        if (this.isMovingRight) {
            this.circle.position.x += Player.SPEED;
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
        starship.getActiveRoom().listOfDoors.forEach((door) => {
            if (hasCollidedCircleWithRectangle(this.circle, door.rectangle)) {
                starship.changeActiveRoom(door.position);
            }
        });
        if (this.isShooting) {
            if (this.shootingFrame === 0 || this.shootingFrame % this.getSelectedPrimaryWeapon().rateOfFire === 0) {
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
        const projectile = this.getSelectedPrimaryWeapon().createProjectile();
        const positionFrom = new Position(this.circle.position.x, this.circle.position.y);
        const angle = Math.atan2(mouse.scaledPosition.y - this.circle.position.y, mouse.scaledPosition.x - this.circle.position.x);
        const modifier = (Math.random() / 10) - this.getSelectedPrimaryWeapon().precision;
        const angleModified = angle + modifier;
        const velocity = new Velocity(Math.cos(angleModified) * projectile.speed, Math.sin(angleModified) * projectile.speed);
        projectile.velocity = velocity;
        if (projectile instanceof ProjectileLine) {
            const positionTo = new Position(positionFrom.x + (Math.cos(angleModified) * projectile.length), positionFrom.y + (Math.sin(angleModified) * projectile.length));
            projectile.positionStart = positionFrom;
            projectile.positionEnd = positionTo;
        }
        else if (projectile instanceof ProjectileCircle) {
            projectile.circle.position = positionFrom;
        }
        else {
            console.error("Error: Projectile must be Line or Circle.");
        }
        listOfProjectiles.push(projectile);
    }
}
Player.RADIUS = 16;
Player.COLOR = "white";
Player.SPEED = 3;
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
function hasCollidedCircleWithRectangle(circle, rectangle) {
    let testX = circle.position.x;
    let testY = circle.position.y;
    if (circle.position.x < rectangle.position.x) {
        testX = rectangle.position.x;
    }
    else if (circle.position.x > rectangle.position.x + rectangle.size.width) {
        testX = rectangle.position.x + rectangle.size.width;
    }
    if (circle.position.y < rectangle.position.y) {
        testY = rectangle.position.y;
    }
    else if (circle.position.y > rectangle.position.y + rectangle.size.height) {
        testY = rectangle.position.y + rectangle.size.height;
    }
    let distX = circle.position.x - testX;
    let distY = circle.position.y - testY;
    let distance = Math.sqrt((distX * distX) + (distY * distY));
    return distance <= circle.radius ? true : false;
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
function mouseOnCircleAndRectangle(mouse, rangeCircle, rectangle) {
    if (mouseOnCircle(mouse, rangeCircle) && mouseOnRectangle(mouse, rectangle)) {
        return true;
    }
    return false;
}
const canvas = document.getElementById("canvasGame");
const ctx = canvas.getContext("2d");
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
canvas.style.width = "100%";
canvas.style.height = "100vh";
ctx.font = "normal " + FONT_SIZE_STRING + " Black Ops One, cursive";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
const mouse = Mouse.getInstance();
const starship = Starship.getInstance();
const player = Player.getInstance();
let listOfProjectiles;
function init() {
    listOfProjectiles = [];
}
let animationId;
let frame = 0;
function animate() {
    frame = frame >= 60 ? 1 : frame + 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    starship.update();
    player.update();
    listOfProjectiles.forEach((projectile, index) => {
        projectile.update();
        if (projectile.getPosition().x < 0 ||
            projectile.getPosition().x > canvas.width ||
            projectile.getPosition().y < 0 ||
            projectile.getPosition().y > canvas.height) {
            setTimeout(() => {
                listOfProjectiles.splice(index, 1);
            }, 0);
        }
    });
    animationId = window.requestAnimationFrame(animate);
}
document.addEventListener("mousemove", ({ clientX, clientY }) => {
    mouse.realPosition.x = clientX;
    mouse.realPosition.y = clientY;
    mouse.scaledPosition.x = clientX * (canvas.width / canvas.clientWidth);
    mouse.scaledPosition.y = clientY * (canvas.height / canvas.clientHeight);
});
document.addEventListener("mousedown", () => {
    player.isShooting = true;
});
document.addEventListener("mouseup", () => {
    player.isShooting = false;
});
document.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
document.addEventListener("keydown", ({ key }) => {
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
document.addEventListener("keyup", ({ key }) => {
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
