const cvs = document.querySelector("#game-canvas");
const ctx = cvs.getContext("2d");
const page = document.documentElement;

let fullscreen = false;

// Load sprites
const tiles = new Image();
tiles.src = "tiles.png";
const marioSprites = new Image();
marioSprites.src = "mario_sprites.png";

const worldData = {
    11: {
        bg: "#6b8cff",
        width: 16960,
        // Added testing floor for gap testing
        floors: [{start: 0, end: 5520},{start: 5680,end: 6880},{start: 7120,end: 12240},{start: 12400,end: 16960,}],
        // floors: [{start: 0, end: 800},{start: 880, end: 5520},{start: 5680,end: 6880},{start: 7120,end: 12240},{start: 12400,end: 16960,}],
        hills: [
            {color: "green", start: 0, end: 400, rows: 3, cols: 5}, 
            {color: "green", start: 1280, end: 1520, rows: 2, cols: 3}, 
            {color: "green", start: 3840, end: 2420, rows: 3, cols: 5}, 
            {color: "green", start: 5120, end: 5360, rows: 2, cols: 3}, 
            {color: "green", start: 7680, end: 8080, rows: 3, cols: 5}, 
            {color: "green", start: 8960, end: 9200, rows: 2, cols: 3}, 
            {color: "green", start: 11520, end: 11920, rows: 3, cols: 5}, 
            {color: "green", start: 12800, end: 13040, rows: 2, cols: 3}, 
            {color: "green", start: 15360, end: 15760, rows: 3, cols: 5}, 
            {color: "green", start: 16640, end: 16880, rows: 2, cols: 3}
        ],
        blocks: [
            {type: "questionMark", x: 1280, floorDistance: 320},
            {type: "questionMark", x: 1680, floorDistance: 320},
            {type: "questionMark", x: 1840, floorDistance: 320},
            {type: "questionMark", x: 1760, floorDistance: 640},
            {type: "questionMark", x: 6240, floorDistance: 320},
            {type: "questionMark", x: 7520, floorDistance: 640},
            {type: "questionMark", x: 8480, floorDistance: 320},
            {type: "questionMark", x: 8720, floorDistance: 320},
            {type: "questionMark", x: 8720, floorDistance: 640},
            {type: "questionMark", x: 8960, floorDistance: 320},
            {type: "questionMark", x: 10320, floorDistance: 640},
            {type: "questionMark", x: 10400, floorDistance: 640},
            {type: "questionMark", x: 13600, floorDistance: 320},
            {type: "breakable", x: 1600, floorDistance: 320},
            {type: "breakable", x: 1760, floorDistance: 320},
            {type: "breakable", x: 1920, floorDistance: 320},
            {type: "breakable", x: 6160, floorDistance: 320},
            {type: "breakable", x: 6320, floorDistance: 320},
            {type: "breakable", x: 6400, floorDistance: 640},
            {type: "breakable", x: 6480, floorDistance: 640},
            {type: "breakable", x: 6560, floorDistance: 640},
            {type: "breakable", x: 6640, floorDistance: 640},
            {type: "breakable", x: 6720, floorDistance: 640},
            {type: "breakable", x: 6800, floorDistance: 640},
            {type: "breakable", x: 6880, floorDistance: 640},
            {type: "breakable", x: 6960, floorDistance: 640},
            {type: "breakable", x: 7280, floorDistance: 640},
            {type: "breakable", x: 7360, floorDistance: 640},
            {type: "breakable", x: 7440, floorDistance: 640},
            {type: "breakable", x: 7520, floorDistance: 320},
            {type: "breakable", x: 8000, floorDistance: 320},
            {type: "breakable", x: 8080, floorDistance: 320},
            {type: "breakable", x: 9440, floorDistance: 320},
            {type: "breakable", x: 9680, floorDistance: 640},
            {type: "breakable", x: 9760, floorDistance: 640},
            {type: "breakable", x: 9840, floorDistance: 640},
            {type: "breakable", x: 10320, floorDistance: 320},
            {type: "breakable", x: 10400, floorDistance: 320},
            {type: "breakable", x: 10240, floorDistance: 640},
            {type: "breakable", x: 10480, floorDistance: 640},
            {type: "breakable", x: 13440, floorDistance: 320},
            {type: "breakable", x: 13520, floorDistance: 320},
            {type: "breakable", x: 13680, floorDistance: 320},
            {type: "solid", x: 10720, floorDistance: 80},
            {type: "solid", x: 10800, floorDistance: 80},
            {type: "solid", x: 10880, floorDistance: 80},
            {type: "solid", x: 10960, floorDistance: 80},
            {type: "solid", x: 10800, floorDistance: 160},
            {type: "solid", x: 10880, floorDistance: 160},
            {type: "solid", x: 10960, floorDistance: 160},
            {type: "solid", x: 10880, floorDistance: 240},
            {type: "solid", x: 10960, floorDistance: 240},
            {type: "solid", x: 10960, floorDistance: 320},

            {type: "solid", x: 11120, floorDistance: 320},
            {type: "solid", x: 11120, floorDistance: 240},
            {type: "solid", x: 11200, floorDistance: 240},
            {type: "solid", x: 11120, floorDistance: 160},
            {type: "solid", x: 11200, floorDistance: 160},
            {type: "solid", x: 11280, floorDistance: 160},
            {type: "solid", x: 11120, floorDistance: 80},
            {type: "solid", x: 11200, floorDistance: 80},
            {type: "solid", x: 11280, floorDistance: 80},
            {type: "solid", x: 11360, floorDistance: 80},

            {type: "solid", x: 11840, floorDistance: 80},
            {type: "solid", x: 11920, floorDistance: 80},
            {type: "solid", x: 12000, floorDistance: 80},
            {type: "solid", x: 12080, floorDistance: 80},
            {type: "solid", x: 11920, floorDistance: 160},
            {type: "solid", x: 12000, floorDistance: 160},
            {type: "solid", x: 12080, floorDistance: 160},
            {type: "solid", x: 12000, floorDistance: 240},
            {type: "solid", x: 12080, floorDistance: 240},
            {type: "solid", x: 12080, floorDistance: 320},

            {type: "solid", x: 12160, floorDistance: 80},
            {type: "solid", x: 12160, floorDistance: 160},
            {type: "solid", x: 12160, floorDistance: 240},
            {type: "solid", x: 12160, floorDistance: 320},

            {type: "solid", x: 12400, floorDistance: 320},
            {type: "solid", x: 12400, floorDistance: 240},
            {type: "solid", x: 12480, floorDistance: 240},
            {type: "solid", x: 12400, floorDistance: 160},
            {type: "solid", x: 12480, floorDistance: 160},
            {type: "solid", x: 12560, floorDistance: 160},
            {type: "solid", x: 12400, floorDistance: 80},
            {type: "solid", x: 12480, floorDistance: 80},
            {type: "solid", x: 12560, floorDistance: 80},
            {type: "solid", x: 12640, floorDistance: 80},

            {type: "solid", x: 14480, floorDistance: 80},
            {type: "solid", x: 14560, floorDistance: 80},
            {type: "solid", x: 14640, floorDistance: 80},
            {type: "solid", x: 14720, floorDistance: 80},
            {type: "solid", x: 14800, floorDistance: 80},
            {type: "solid", x: 14880, floorDistance: 80},
            {type: "solid", x: 14960, floorDistance: 80},
            {type: "solid", x: 15040, floorDistance: 80},
            {type: "solid", x: 15120, floorDistance: 80},
            {type: "solid", x: 14560, floorDistance: 160},
            {type: "solid", x: 14640, floorDistance: 160},
            {type: "solid", x: 14720, floorDistance: 160},
            {type: "solid", x: 14800, floorDistance: 160},
            {type: "solid", x: 14880, floorDistance: 160},
            {type: "solid", x: 14960, floorDistance: 160},
            {type: "solid", x: 15040, floorDistance: 160},
            {type: "solid", x: 15120, floorDistance: 160},
            {type: "solid", x: 14640, floorDistance: 240},
            {type: "solid", x: 14720, floorDistance: 240},
            {type: "solid", x: 14800, floorDistance: 240},
            {type: "solid", x: 14880, floorDistance: 240},
            {type: "solid", x: 14960, floorDistance: 240},
            {type: "solid", x: 15040, floorDistance: 240},
            {type: "solid", x: 15120, floorDistance: 240},
            {type: "solid", x: 14720, floorDistance: 320},
            {type: "solid", x: 14800, floorDistance: 320},
            {type: "solid", x: 14880, floorDistance: 320},
            {type: "solid", x: 14960, floorDistance: 320},
            {type: "solid", x: 15040, floorDistance: 320},
            {type: "solid", x: 15120, floorDistance: 320},
            {type: "solid", x: 14800, floorDistance: 400},
            {type: "solid", x: 14880, floorDistance: 400},
            {type: "solid", x: 14960, floorDistance: 400},
            {type: "solid", x: 15040, floorDistance: 400},
            {type: "solid", x: 15120, floorDistance: 400},
            {type: "solid", x: 14880, floorDistance: 480},
            {type: "solid", x: 14960, floorDistance: 480},
            {type: "solid", x: 15040, floorDistance: 480},
            {type: "solid", x: 15120, floorDistance: 480},
            {type: "solid", x: 14960, floorDistance: 560},
            {type: "solid", x: 15040, floorDistance: 560},
            {type: "solid", x: 15120, floorDistance: 560},
            {type: "solid", x: 15040, floorDistance: 640},
            {type: "solid", x: 15120, floorDistance: 640},
            
            {type: "solid", x: 15840, floorDistance: 80},
        ],
        clouds: [
            {type: "normal", x: 1520, floorDistance: 880, amount: 1},
            {type: "normal", x: 2160, floorDistance: 800, amount: 3},
            {type: "normal", x: 2880, floorDistance: 880, amount: 2},
            {type: "normal", x: 4480, floorDistance: 800, amount: 1},
            {type: "normal", x: 5360, floorDistance: 880, amount: 1},
            {type: "normal", x: 6000, floorDistance: 800, amount: 3},
            {type: "normal", x: 6720, floorDistance: 880, amount: 2},
            {type: "normal", x: 8320, floorDistance: 800, amount: 1},
            {type: "normal", x: 9200, floorDistance: 880, amount: 1},
            {type: "normal", x: 9840, floorDistance: 800, amount: 3},
            {type: "normal", x: 10560, floorDistance: 880, amount: 2},
            {type: "normal", x: 12160, floorDistance: 800, amount: 1},
            {type: "normal", x: 13040, floorDistance: 880, amount: 1},
            {type: "normal", x: 13680, floorDistance: 800, amount: 3},
            {type: "normal", x: 14400, floorDistance: 880, amount: 2},
            {type: "normal", x: 16000, floorDistance: 800, amount: 1},
        ]
    },
    12: "#6b8cff",
    13: "#6b8cff",
    14: "#000000",
    21: "#6b8cff",
    22: "#6b8cff",
    23: "#6b8cff",
    24: "#000000",
    31: "#000000",
    32: "#000000",
    33: "#000000",
    34: "#000000",
    41: "#6b8cff",
    42: "#6b8cff",
    43: "#6b8cff",
    44: "#000000",
    51: "#6b8cff",
    52: "#6b8cff",
    53: "#6b8cff",
    54: "#000000",
    61: "#000000",
    62: "#000000",
    63: "#000000",
    64: "#000000",
    71: "#6b8cff",
    72: "#6b8cff",
    73: "#6b8cff",
    74: "#000000",
    81: "#6b8cff",
    82: "#6b8cff",
    83: "#6b8cff",
    84: "#000000",
}

class Hill {
    constructor(parent, color, start, end, rows, cols) {
        this.blocksize = 80;
        this.parent = parent;
        this.y = cvs.height - this.blocksize * 2.5;
        this.sX = 640;
        this.sXOffset = 0;
        this.sYOffset = 0;
        this.sY = 640;
        this.sOffsets = {
            "green": 0,
            "lightGreen": 160,
            "red": 320,
            "grey": 480,
            "lightGrey": 640,
            "blue": 800,
        }
        this.color = color;
        this.start = start;
        this.end = end;
        this.sOffset = this.sOffsets[this.color];
        this.cols = cols;
        this.rows = rows;
    }

    update() {
        this.start += this.parent.parent.deltaX;
    }

    draw() {
        let colOffset = 0;
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (col >= colOffset && col < this.cols - colOffset) {
                    this.sXOffset = 0;
                    this.sYOffset = 0;
                    // Hill top
                    if (row === this.rows - 1 && col === (this.cols - 1) / 2) {
                        this.sXOffset += this.blocksize;
                    // Right slope
                    } else if (col === this.cols - 1 - colOffset) {
                        this.sXOffset += this.blocksize * 2;
                    // Left slope
                    } else if (col === 0 + colOffset) {
                        this.sXOffset = 0;
                    // Full color fill
                    } else if (col === (this.cols - 1) / 2 && row === 0 && this.cols > 3) {
                        this.sXOffset = this.blocksize;
                        this.sYOffset = this.blocksize;
                    // Full color with dots
                    } else {
                        this.sXOffset = 0;
                        this.sYOffset = this.blocksize;
                    }
                    ctx.drawImage(tiles, this.sX + this.sXOffset, this.sY + this.sOffset + this.sYOffset, this.blocksize, this.blocksize, this.start + col * this.blocksize, this.y - row * this.blocksize, this.blocksize, this.blocksize);
                }
            }

            colOffset++;
        }
    }
}

class Block {
    constructor(parent, type, x, y) {
        this.parent = parent;
        this.type = type;
        if (this.type === "questionMark") {
            this.frame = 0;
            this.frames = [1920, 1920, 1920, 2000, 2080, 2000];
            this.sX = 1920;
            this.sY = 0;
            this.hit = false;
        } else if (this.type === "breakable") {
            this.sX = 80;
            this.sY = 0;
        } else if (this.type === "solid") {
            this.sX = 0;
            this.sY = 80;
        }
        this.x = x;
        this.y = y;
    }

    update() {
        this.x += this.parent.parent.deltaX;
        if (this.type === "questionMark") {
            if (this.hit) {
                this.sX = 2160;
            } else if (this.parent.parent.frame % 10 === 0) {
                this.frame++;
                this.sX = this.frames[this.frame % this.frames.length];
            }
        }
    }

    draw() {
        ctx.drawImage(tiles, this.sX, this.sY, this.parent.parent.blocksize, this.parent.parent.blocksize, this.x, this.y, this.parent.parent.blocksize, this.parent.parent.blocksize);
    }
}

class Cloud {
    constructor(parent, type, x, y, amount) {
        this.parent = parent;
        this.type = type;
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.sX = 0;
        if (this.type === "normal") {
            this.sY = 1600;
        } else if (this.type === "lightblue") {
            this.sY = 1760;
        } else if (this.type === "red") {
            this.sY = 1920;
        } else if (this.type === "darkblue") {
            this.sY = 2080;
        }
    }

    update() {
        this.x += this.parent.parent.deltaX;
    }

    draw() {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2 + this.amount; j++) {
                let sXOffset = 0;
                let sYOffset = 0;
                if (i === 0 && j === 0) {
                    sXOffset = 0;
                } else if (i === 0 && j === this.amount + 1) {
                    sXOffset = 160;
                } else if (i === 0) {
                    sXOffset = 80;
                } else if (i === 1 && j === 0) {
                    sYOffset = 80;
                } else if (i === 1 && j === this.amount + 1) {
                    sYOffset = 80;
                    sXOffset = 160;
                } else if (i === 1) {
                    sXOffset = 80;
                    sYOffset = 80;
                }
                ctx.drawImage(tiles, this.sX + sXOffset, this.sY + sYOffset, this.parent.parent.blocksize, this.parent.parent.blocksize, this.x + j * this.parent.parent.blocksize, this.y + i * this.parent.parent.blocksize, this.parent.parent.blocksize, this.parent.parent.blocksize)
            }
        }
    }
}

class World {
    constructor(parent, worldID) {
        this.parent = parent
        this.backgroundColor = worldData[worldID].bg;

        this.floors = [];
        worldData[worldID].floors.forEach(floor => {
            this.floors.push(new Floor(this, floor.start, floor.end));
        });
        this.hills = [];
        worldData[worldID].hills.forEach(hill => {
            this.hills.push(new Hill(this, hill.color, hill.start, hill.end, hill.rows, hill.cols));
        });
        this.blocks = [];
        worldData[worldID].blocks.forEach(block => {
            this.blocks.push(new Block(this, block.type, block.x, this.parent.floorY - block.floorDistance));
        });
        this.clouds = [];
        worldData[worldID].clouds.forEach(cloud => {
            this.clouds.push(new Cloud(this, cloud.type, cloud.x, this.parent.floorY - cloud.floorDistance, cloud.amount));
        });
    }

    update() {
        // Floors
        this.floors.forEach(floor => {
            floor.update();
        });
        // Hills
        this.hills.forEach(hill => {
            hill.update();
        });
        // Blocks
        this.blocks.forEach(block => {
            block.update();
        });
        // Clouds
        this.clouds.forEach(cloud => {
            cloud.update();
        });
    }

    draw() {
        // Background
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        // Hills
        this.hills.forEach(hill => {
            hill.draw();
        });
        // Clouds
        this.clouds.forEach(cloud => {
            cloud.draw();
        });
        // Bushes
        // Blocks
        this.blocks.forEach(block => {
            block.draw();
        })
        // Pipes
        // Flag
        // Castle
        // Floors
        this.floors.forEach(floor => {
            floor.draw();
        });
    }
}

class Floor {
    constructor(parent, start, end) {
        this.start = start;
        this.end = end;
        this.width = this.end - this.start;
        this.parent = parent;
        this.y = this.parent.parent.floorY;
    }

    update() {
        this.start += this.parent.parent.deltaX;
        this.end += this.parent.parent.deltaX;
    }

    draw() {
        for (let x = this.start; x < this.end; x += this.parent.parent.blocksize) {
            ctx.drawImage(tiles, 0, 0, this.parent.parent.blocksize, this.parent.parent.blocksize, x, this.y, this.parent.parent.blocksize, this.parent.parent.blocksize);
            ctx.drawImage(tiles, 0, 0, this.parent.parent.blocksize, this.parent.parent.blocksize, x, this.y + this.parent.parent.blocksize, this.parent.parent.blocksize, this.parent.parent.blocksize);
        }
    }
}

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
        this.xOld = this.x;
        this.y = cvs.height / 2;
        this.yOld = this.y;
        this.xDir = 0;
        this.facingForward = true;
        this.xVel = 0;
        this.yVel = 0;
        this.gravity = 2.15;
        this.jumpForce = 40;
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
        this.frames = {
            running: [90, 175, 260]
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
        this.xOld = this.x;
        this.x += this.xVel * this.xDir + this.parent.deltaX;
        this.yOld = this.y;
        this.y += this.yVel;

        // Check for collisions
        // Left screen edge
        if (this.x < 0) {
            this.x = 0;
        }
        // Floor pieces
        this.parent.world.floors.forEach(floor => {
            if (this.y + this.height > floor.y && this.x < floor.end && this.x + this.width > floor.start) {
                // Collision from the top?
                if (this.y + this.height > floor.y && this.yOld + this.height <= floor.y) {
                    this.y = floor.y - this.height;
                    this.yVel = 0;
                    this.inAir = false;
                // Collision from the left?
                } else if (this.x + this.width > floor.start && this.xOld + this.width < floor.start + 8) {
                    this.x = floor.start - this.width;
                    this.xVel = 0;
                // Collision from the right
                } else if (this.x < floor.end && this.xOld >= floor.end) {
                    this.x = floor.end;
                    this.xVel = 0;
                }
            }
        });
        // Blocks
        this.parent.world.blocks.forEach(block => {
            if (this.y + this.height > block.y && this.y < block.y + this.parent.blocksize && this.x < block.x + this.parent.blocksize && this.x + this.width > block.x) {
                // Collision from the top?
                if (this.y + this.height > block.y && this.yOld + this.height <= block.y) {
                    console.log("top contact")
                    this.y = block.y - this.height;
                    this.yVel = 0;
                    this.inAir = false;
                // Collision from the left? TODO: Refine this detection, somehow it's possible to walk through blocks without and 8 pixel extra
                } else if (this.x + this.width > block.x && this.xOld + this.width < block.x + 8) {
                    console.log("left contact")
                    this.x = block.x - this.width;
                    this.xVel = 0;
                // Collision from the right
                } else if (this.x < block.x + this.parent.blocksize && this.xOld >= block.x + this.parent.blocksize) {
                    console.log("right contact")
                    this.x = block.x + this.parent.blocksize;
                    this.xVel = 0;
                // Collision from bottom
                } else if (this.y < block.y + this.parent.blocksize && this.yOld >= block.y + this.parent.blocksize) {
                    console.log("bottom contact")
                    this.y = block.y + this.parent.blocksize;
                    this.yVel = 0;
                }
            }
        });

        // Respawn if falling to death (for testing)
        if (this.y > cvs.height) {
            this.y = cvs.height / 2;
            this.x = 10;
        }

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
            this.sX = this.frames.running[this.frame % this.frames.running.length];
        } else if (this.movement.current === this.movement.walking) {
            if (this.parent.frame % 10 === 0) {
                this.frame++;
            }
            this.sX = this.frames.running[this.frame % this.frames.running.length];
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

class Game {
    constructor() {
        this.frame = 0;
        this.currentWorld = 11;
        this.blocksize = 80;
        this.floorY = cvs.height - this.blocksize * 1.5;
        this.player = new Mario(this);
        this.deltaX = 0;
        this.keyStates = {
            left: false,
            right: false,
            sprint: false
        };
        this.world = new World(this, this.currentWorld);
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

        // Scroll screen
        // console.log(this.world.floors[this.world.floors.length - 1].end)
        if (this.player.x > cvs.width / 2 && this.world.floors[this.world.floors.length - 1].end > cvs.width) {
            this.deltaX = Math.round(cvs.width / 2 - this.player.x);
            // this.player.x = cvs.width * 2/3;
        } else {
            this.deltaX = 0;
        }

        this.world.update();
        this.player.update();
    }

    draw() {
        this.world.draw();
        this.player.draw();
    }
}

function spawn() {
    game.player.x = 50;
    game.player.y = cvs.height / 2;
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
    } else if (e.keyCode === 70) {
        toggleFullscreen();
    } else if (e.keyCode === 71) {
        spawn();
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

// Toggle fullscreen
function toggleFullscreen() {
    if (!fullScreen) {
        if (page.requestFullscreen) {
          page.requestFullscreen();
          fullScreen = true;
        } else if (page.mozRequestFullScreen) { /* Firefox */
          page.mozRequestFullScreen();
          fullScreen = true;
        } else if (page.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          page.webkitRequestFullscreen();
          fullScreen = true;
        } else if (page.msRequestFullscreen) { /* IE/Edge */
          page.msRequestFullscreen();
          fullScreen = true;
        }
    } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          fullScreen = false;
        } else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen();
          fullScreen = false;
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
          fullScreen = false;
        } else if (document.msExitFullscreen) { /* IE/Edge */
          document.msExitFullscreen();
          fullScreen = false;
        }
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
cvs.addEventListener("dblclick", toggleFullscreen);

loop();