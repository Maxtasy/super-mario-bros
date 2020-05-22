const cvs = document.querySelector("#game-canvas");
const ctx = cvs.getContext("2d");

// Load sprites
const tiles = new Image();
tiles.src = "tiles.png";
const marioSprites = new Image();
marioSprites.src = "mario_sprites.png";

class Mario {
    constructor(parent) {
        this.parent = parent;
        this.frame = 0;
        this.width = 80;
        this.height = 80;
        this.sX = 5;
        this.sY = 170;
        this.sOffset = 250;
        this.x = 0;
        this.y = cvs.height - this.parent.blocksize - this.height;
        this.xDir = 0;
        this.facingForward = true;
        this.xVel = 0;
        this.yVel = 0;
        this.gravity = 2;
        this.jumpForce = 36;
        this.startSpeed = 1;
        this.maxSpeedWalking = 8;
        this.maxSpeedRunning = 16;
        this.maxSpeed = this.maxSpeedWalking;
        this.currentSpriteSheet = marioSprites;
        this.inAir = false;
        this.xAccel = 0;
        this.walkAccel = 1.2;
        this.sprintAccel = 1.5;
        this.state = {
            current: "small",
            small: "small",
            big: "big",
            flower: "flower"
        }
        this.movement = {
            current: "standing",
            standing: "standing",
            walking: "walking",
            running: "running",
            jumping: "jumping",
            swimming: "swimming",
            ducking: "ducking"
        }
        this.animationFrames = {
            running: {
                0: {
                    x: 90,
                },
                1: {
                    x: 175,
                },
                2: {
                    x: 260,
                }
            }
        }
    }

    jump() {
        this.yVel -= this.jumpForce;
        this.inAir = true;
        this.movement.current = this.movement.jumping;
    }

    update() {
        // Set velocities
        // Are we moving on the x axis and are not airborne?
        if (this.xDir !== 0) {
            // Are we also sprinting?
            if (this.parent.keyStates.sprint) {
                this.xAccel = this.sprintAccel;
                this.maxSpeed = this.maxSpeedRunning;
            } else {
                this.xAccel = this.walkAccel;
                this.maxSpeed = this.maxSpeedWalking;
            }
            // If we just started moving, set speed to startSpeed
            if (this.xVel === 0) {
                this.xVel = this.startSpeed;
            } else {
            // Accelerate
                this.xVel = Math.min(this.xVel * this.xAccel, this.maxSpeed);
            }
        } else {
            this.xVel = 0;
        }

        this.yVel += this.gravity;

        // Calculate position for next tick
        this.x += this.xVel * this.xDir;
        this.y += this.yVel;

        // Check for collisions
        // Floor pieces
        this.parent.floorElements.forEach(floorElement => {
            if (this.y > floorElement.y - this.height && this.x < floorElement.endCoord && this.x + this.width > floorElement.startCoord) {
                this.y = floorElement.y - this.height;
                this.yVel = 0;
                this.inAir = false;
            }
        });
        // TODO: Any other Objects

        // Select current movement
        // console.log(this.xVel, this.yVel)
        if (this.xVel === 0 && this.yVel === 0 && !this.inAir) {
            this.movement.current = this.movement.standing;
        } else if (this.xVel !== 0 && this.yVel === 0 && !this.inAir) {
            if (this.parent.keyStates.sprint) {
                this.movement.current = this.movement.running;
            } else {
                this.movement.current = this.movement.walking;
            }
        } else {
            this.movement.current = this.movement.jumping;
        }

        // Sprite Selection

        // Size
        if (this.state.current === this.state.small) {
            this.sY = 170;
            this.height = 80;
        } else if (this.state.current === this.state.big) {
            this.sY = 5;
            this.height = 160;
        }

        // Standing/Walking/Jumping/Ducking/Swimming/etc
        if (this.movement.current === this.movement.standing) {
            this.sX = 5;
        } else if (this.movement.current === this.movement.running) {
            if (this.parent.frame % 5 === 0) {
                this.frame++;
            }
            this.sX = this.animationFrames.running[this.frame % 3].x;
        } else if (this.movement.current === this.movement.walking) {
            if (this.parent.frame % 10 === 0) {
                this.frame++;
            }
            this.sX = this.animationFrames.running[this.frame % 3].x;
        } else if (this.movement.current === this.movement.jumping) {
            this.sX = 430;
        }

        // In which direction is the player looking
        if (!this.facingForward) {
            this.sY += this.sOffset;
        }
    }

    draw() {
        ctx.drawImage(this.currentSpriteSheet, this.sX, this.sY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

class Floor {
    constructor(parent, startCoord, endCoord) {
        this.startCoord = startCoord;
        this.endCoord = endCoord;
        this.blocksize = 80;
        this.parent = parent;
        this.y = cvs.height - this.blocksize;
        this.parts = [];
    }

    draw() {
        for (let x = this.startCoord; x < this.endCoord; x += this.blocksize) {
            ctx.drawImage(tiles, 0, 0, this.blocksize, this.blocksize, x, this.y, this.blocksize, this.blocksize);
        }
    }
}

class Game {
    constructor() {
        this.frame = 0;
        this.blocksize = 16;
        this.backgroundColor = "#6b8cff";
        this.player = new Mario(this);
        this.keyStates = {
            left: false,
            right: false,
            sprint: false
        }
        this.floorElements = [];
        this.floorElements.push(new Floor(this, 0, 240));
        this.floorElements.push(new Floor(this, 480, 760));
    }  
    
    update() {
        this.frame++;

        // User wants to move left
        if (this.keyStates.left && !this.keyStates.right) {
            this.player.xDir = -1;
            this.player.facingForward = false;
        // User wants to move right
        } else if (!this.keyStates.left && this.keyStates.right) {
            this.player.xDir = 1;
            this.player.facingForward = true;
        // User stopped moving
        } else {
            this.player.xDir = 0;
        }

        this.player.update();
    }

    draw() {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        this.player.draw();
        this.floorElements.forEach(floorElement => {
            floorElement.draw();
        });
    }
}

function handleKeydown(e) {
    if (e.keyCode === 32 && game.player.yVel === 0) {
        game.player.jump();
    } else if (e.keyCode === 37) {
        game.keyStates.left = true;
    } else if (e.keyCode === 39) {
        game.keyStates.right = true;
    } else if (e.keyCode === 17) {
        game.keyStates.sprint = true;
    }
}

function handleKeyup(e) {
    if (e.keyCode === 37) {
        game.keyStates.left = false;
    } else if (e.keyCode === 39) {
        game.keyStates.right = false;
    } else if (e.keyCode === 17) {
        game.keyStates.sprint = false;
    }
}

function loop() {
    game.update();
    game.draw();
    setTimeout(loop, 16.66);
}

const game = new Game();

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);

loop();