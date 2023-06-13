/// <reference path="references.ts"/>

const canvas: HTMLCanvasElement = document.querySelector("canvas")!;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
// Tamaño de la resolución del juego.
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
// Escalamos la resolución al tamaño de la pantalla del dispositivo.
canvas.style.width = "100%";
canvas.style.height = "100vh";
// Cargamos la fuente de letra del juego y centramos los textos.
ctx.font = "normal " + FONT_SIZE_STRING + " Black Ops One, cursive";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

/*const scoreEl = document.querySelector('#scoreEl');
const startGameBtn = document.querySelector('#startGameBtn');
const modalEl = document.querySelector('#modalEl') as HTMLElement
const bigScoreEl = document.querySelector('#bigScoreEl')

const startGameAudio = new Audio('./audio/startGame.mp3')
const endGameAudio = new Audio('./audio/endGame.mp3')
const shootAudio = new Audio('./audio/shoot.mp3')
const enemyHitAudio = new Audio('./audio/enemyHit.mp3')
const enemyEliminatedAudio = new Audio('./audio/enemyEliminated.mp3')
const obtainPowerUpAudio = new Audio('./audio/obtainPowerUp.mp3')
const backgroundMusicAudio = new Audio('./audio/backgroundMusic.mp3')
backgroundMusicAudio.loop = true

const scene = {
    active: false
}

const powerUpImg = new Image()
powerUpImg.src = './images/lightning.png'

const friction = 0.99
*/
let player: Player;
//let powerUps: PowerUp[] = []
let listOfProjectiles: Projectile[];
//let enemies: Enemy[] = []
//let particles: Particle[] = []
//let backgroundParticles: BackgroundParticle[] = []

function init(): void {
    const x: number = canvas.width / 2;
    const y: number = canvas.height / 2;
    player = new Player({x, y});
    //powerUps = []
    listOfProjectiles = [];
    //enemies = []
    //particles = []
    //backgroundParticles = []

    /*for (let x = 0; x < canvas!.width; x += 30) {
        for (let y = 0; y < canvas!.height; y += 30) {
            backgroundParticles.push(new BackgroundParticle(x, y, 3, 'blue'))
        }
    }*/
}

/*function spawnEnemies() {
    const radius = Math.random() * (30 - 4) + 4

    let x
    let y

    if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas!.width + radius
        y = Math.random() * canvas!.height
    } else {
        x = Math.random() * canvas!.width
        y = Math.random() < 0.5 ? 0 - radius : canvas!.height + radius
    }

    const color = `hsl(${Math.random() * 360}, 50%, 50%)`

    const angle = Math.atan2(canvas!.height / 2 - y, canvas!.width / 2 - x)

    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    enemies.push(new Enemy({x, y}, radius, color, velocity))
}*/

/*function spawnPowerUps() {
    let x
    let y

    if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - 7 : canvas!.width + 7
        y = Math.random() * canvas!.height
    } else {
        x = Math.random() * canvas!.width
        y = Math.random() < 0.5 ? 0 - 9 : canvas!.height + 9
    }

    const angle = Math.atan2(canvas!.height / 2 - y, canvas!.width / 2 - x)

    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    powerUps.push(new PowerUp({x, y}, velocity))
}*/

/*function createScoreLabel(projectile: Projectile, score: string) {
    const scoreLabel = document.createElement('label')
    scoreLabel.innerHTML = score
    scoreLabel.style.position = 'absolute'
    scoreLabel.style.color = 'white'
    scoreLabel.style.userSelect = 'none'
    scoreLabel.style.left = projectile.position.x.toString();
    scoreLabel.style.top = projectile.position.y.toString();
    document.body.appendChild(scoreLabel)

    gsap.to(scoreLabel, {
        opacity: 0,
        y: -30,
        duration: 0.75,
        onComplete: () => {
            scoreLabel.parentNode!.removeChild(scoreLabel)
        }
    })
}*/

let animationId: number;
//let score = 0
let frame: number = 0;
function animate(): void {
    //animationId = window.requestAnimationFrame(animate);
    frame++;
    //ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    //ctx.fillRect(0, 0, canvas!.width, canvas!.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //if (frame % 70 === 0) spawnEnemies()
    //if (frame % 300 === 0) spawnPowerUps()

    /*backgroundParticles.forEach((backgroundParticle) => {
        const dist = Math.hypot(
            player.position.x - backgroundParticle.position.x,
            player.position.y - backgroundParticle.position.y
        )

        const hideRadius = 100
        if (dist < hideRadius) {
            if (dist < 70) {
                backgroundParticle.alpha = 0
            } else {
                backgroundParticle.alpha = 0.5
            }
        } else if (
            dist >= hideRadius &&
            backgroundParticle.alpha < backgroundParticle.initialAlpha
        ) {
            backgroundParticle.alpha += 0.01
        } else if (
            dist >= hideRadius &&
            backgroundParticle.alpha > backgroundParticle.initialAlpha
        ) {
            backgroundParticle.alpha -= 0.01
        }

        backgroundParticle.update()
    })*/

    player.update();
    
    /*particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1)
        } else {
            particle.update()
        }
    })*/

    if (player.isShooting && frame % PLAYER_RATE_OF_FIRE_BLASTER === 0) {
        player.shoot(mouse, '#FFF500');
    }

    /*powerUps.forEach((powerUp, index) => {
        const dist = Math.hypot(player.position.x - powerUp.position.x, player.position.y - powerUp.position.y)

        // obtain power up
        // gain the automatic shooting ability
        if (dist - player.radius - powerUp.width / 2 < 1) {
            player.color = '#FFF500'
            player.powerUp = 'Automatic'
            powerUps.splice(index, 1)

            obtainPowerUpAudio.play()

            setTimeout(() => {
                player.powerUp = ''
                player.color = '#FFFFFF'
            }, 5000)
        } else {
            powerUp.update()
        }
    })*/

    listOfProjectiles.forEach((projectile, index) => {
        projectile.update();
        // remove from edges of screen
        if (
            projectile.position.x + projectile.radius < 0 ||
            projectile.position.x - projectile.radius > canvas!.width ||
            projectile.position.y + projectile.radius < 0 ||
            projectile.position.y - projectile.radius > canvas!.height
        ) {
            setTimeout(() => {
                listOfProjectiles.splice(index, 1)
            }, 0)
        }
    })

    /*enemies.slice().forEach((enemy, index) => {
        enemy.update()

        const dist = Math.hypot(player.position.x - enemy.position.x, player.position.y - enemy.position.y)

        // end game
        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
            modalEl!.style.display = 'flex'
            bigScoreEl!.innerHTML = score.toString()
            endGameAudio.play()
            scene.active = false

            gsap.to('#whiteModalEl', {
                opacity: 1,
                scale: 1,
                duration: 0.45,
                ease: 'expo'
            })
        }

        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.position.x - enemy.position.x, projectile.position.y - enemy.position.y)

            // hit enemy
            // when projectiles touch enemy
            if (dist - enemy.radius - projectile.radius < 0.03) {
                // create explosions
                for (let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(
                        new Particle(
                            {
                                x: projectile.position.x,
                                y: projectile.position.y
                            },
                            Math.random() * 2,
                            enemy.color,
                            {
                                x: (Math.random() - 0.5) * (Math.random() * 6),
                                y: (Math.random() - 0.5) * (Math.random() * 6)
                            }
                        )
                    )
                }

                // shrink enemy
                if (enemy.radius - 10 > 5) {
                    enemyHitAudio.play()

                    // increase our score
                    score += 100
                    scoreEl!.innerHTML = score.toString();

                    createScoreLabel(projectile, (100).toString())

                    gsap.to(enemy, {
                        radius: enemy.radius - 10
                    })
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                } else {
                    // eliminate enemy
                    enemyEliminatedAudio.play()

                    // remove from scene altogether
                    score += 250
                    scoreEl!.innerHTML = score.toString();
                    createScoreLabel(projectile, (250).toString())

                    // change backgroundParticle colors
                    backgroundParticles.forEach((backgroundParticle) => {
                        backgroundParticle.color = enemy.color
                        gsap.to(backgroundParticle, {
                            alpha: 0.5,
                            duration: 0.015,
                            onComplete: () => {
                                gsap.to(backgroundParticle, {
                                    alpha: backgroundParticle.initialAlpha,
                                    duration: 0.03
                                })
                            }
                        })
                    })

                    setTimeout(() => {
                        const enemyFound = enemies.find((enemyValue) => {
                            return enemyValue === enemy
                        })

                        if (enemyFound) {
                            enemies.splice(index, 1)
                            projectiles.splice(projectileIndex, 1)
                        }
                    }, 0)
                }
            }
        })
    })*/
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
    player.isShooting = true;
});

addEventListener("mousemove", ({ clientX, clientY }) => {
    mouse.x = clientX;
    mouse.y = clientY;
});

addEventListener("mouseup", () => {
    player.isShooting = false;
});

/*addEventListener('touchstart', (event) => {
    mouse.x = event.touches[0]!.clientX
    mouse.y = event.touches[0]!.clientY
    mouse.down = true
})

addEventListener('touchmove', (event) => {
    mouse.x = event.touches[0]!.clientX
    mouse.y = event.touches[0]!.clientY
})

addEventListener('touchend', () => {
    mouse.down = false
})*/

/*addEventListener("click", ({ clientX, clientY }) => {
    if (scene.active && player.powerUp !== 'Automatic') {
        mouse.x = clientX
        mouse.y = clientY
        player.shoot(mouse)
    }
});*/

/*addEventListener("click", () => {
    player.shoot(mouse);
});*/

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

/*startGameBtn!.addEventListener('click', () => {
    init()
    animate()
    startGameAudio.play()
    scene.active = true

    score = 0
    scoreEl!.innerHTML = score.toString()
    bigScoreEl!.innerHTML = score.toString()
    backgroundMusicAudio.play()

    gsap.to('#whiteModalEl', {
        opacity: 0,
        scale: 0.75,
        duration: 0.25,
        ease: 'expo.in',
        onComplete: () => {
            modalEl.style.display = 'none'
        }
    })
})*/

addEventListener("keydown", ({ key }) => {
    if (key === "w") { player.isMovingUp = true; }
    if (key === "a") { player.isMovingLeft = true; }
    if (key === "s") { player.isMovingDown = true; }
    if (key === "d") { player.isMovingRight = true; }
});

addEventListener("keyup", ({ key }) => {
    if (key === "w") { player.isMovingUp = false; }
    if (key === "a") { player.isMovingLeft = false; }
    if (key === "s") { player.isMovingDown = false; }
    if (key === "d") { player.isMovingRight = false; }
});

init();
animate();