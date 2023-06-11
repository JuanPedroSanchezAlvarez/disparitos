"use strict";
class Player {
    constructor(position, radius, color) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.velocity = { x: 0, y: 0 };
        this.friction = 0.99;
        this.powerUp = '';
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.draw();
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        if (this.position.x - this.radius + this.velocity.x > 0 && this.position.x + this.radius + this.velocity.x < canvas.width) {
            this.position.x = this.position.x + this.velocity.x;
        }
        else {
            this.velocity.x = 0;
        }
        if (this.position.y - this.radius + this.velocity.y > 0 && this.position.y + this.radius + this.velocity.y < canvas.height) {
            this.position.y = this.position.y + this.velocity.y;
        }
        else {
            this.velocity.y = 0;
        }
    }
    shoot(mouse, color = 'white') {
        const angle = Math.atan2(mouse.y - this.position.y, mouse.x - this.position.x);
        const velocity = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5 };
        const position = { x: this.position.x, y: this.position.y };
        listOfProjectiles.push(new Projectile(position, 5, color, velocity));
    }
}
class Projectile {
    constructor(position, radius, color, velocity) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.draw();
        this.position.x = this.position.x + this.velocity.x;
        this.position.y = this.position.y + this.velocity.y;
    }
}
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let player;
let listOfProjectiles;
function init() {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    player = new Player({ x, y }, 10, "white");
    listOfProjectiles = [];
}
let animationId;
let frame = 0;
function animate() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    listOfProjectiles.forEach((projectile, index) => {
        projectile.update();
        if (projectile.position.x + projectile.radius < 0 ||
            projectile.position.x - projectile.radius > canvas.width ||
            projectile.position.y + projectile.radius < 0 ||
            projectile.position.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                listOfProjectiles.splice(index, 1);
            }, 0);
        }
    });
    animationId = window.requestAnimationFrame(animate);
}
const mouse = {
    down: false,
    x: 0,
    y: 0
};
addEventListener("mousedown", ({ clientX, clientY }) => {
    mouse.x = clientX;
    mouse.y = clientY;
    mouse.down = true;
});
addEventListener("mousemove", ({ clientX, clientY }) => {
    mouse.x = clientX;
    mouse.y = clientY;
});
addEventListener("mouseup", () => {
    mouse.down = false;
});
addEventListener("click", () => {
    player.shoot(mouse);
});
addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
addEventListener("keydown", ({ keyCode }) => {
    if (keyCode === 87) {
        player.velocity.y -= 1;
    }
    else if (keyCode === 65) {
        player.velocity.x -= 1;
    }
    else if (keyCode === 83) {
        player.velocity.y += 1;
    }
    else if (keyCode === 68) {
        player.velocity.x += 1;
    }
    switch (keyCode) {
        case 37:
            player.velocity.x -= 1;
            break;
        case 40:
            player.velocity.y += 1;
            break;
        case 39:
            player.velocity.x += 1;
            break;
        case 38:
            player.velocity.y -= 1;
            break;
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
            const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
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
            const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
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
