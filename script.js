const cvs = document.querySelector("#game-canvas");
const ctx = cvs.getContext("2d");
const page = document.documentElement;

let fullscreen = false;

// Load sprites
const characterSprites = new Image();
characterSprites.src = "sprites/character.png";

const tileSprites = new Image();
tileSprites.src = "sprites/tiles.png";

const objectSprites = new Image();
objectSprites.src = "sprites/objects.png";

const themeOffsetMap = {
    "overworld": 0,
    "underground": 480,
    "castle": 960,
    "water": 1840,
    "orange": 2320
}

const objectThemeOffsetMap = {
    "overworld": 0,
    "underground": 720,
    "castle": 1440,
    "water": 2160,
}

const typeOffsetMap = {
    "floor": {
        x: 0,
        y: 0
    },
    "breakableShiny": {
        x: 80,
        y: 0
    },
    "breakable": {
        x: 160,
        y: 0
    },
    "disabled": {
        x: 240,
        y: 0
    },
    "cannonTop": {
        x: 720,
        y: 0
    },
    "castleTop": {
        x: 880,
        y: 0
    },
    "castleWindowsLeft": {
        x: 960,
        y: 0
    },
    "castleWindowsMiddle": {
        x: 1040,
        y: 0
    },
    "castleWindowsRight": {
        x: 1120,
        y: 0
    },
    "questionMark": {
        x: 1920,
        y: 0
    },
    "solid": {
        x: 0,
        y: 80
    },
    "cannonBottom": {
        x: 720,
        y: 80
    },
    "castleSemiTop": {
        x: 880,
        y: 80
    },
    "castleDoorTop": {
        x: 960,
        y: 80
    },
    "castleDoorBottom": {
        x: 1040,
        y: 80
    },
    "flagTopAlt": {
        x: 1120,
        y: 80
    },
    "coin0": {
        x: 1920,
        y: 80
    },
    "coin1": {
        x: 2000,
        y: 80
    },
    "coin2": {
        x: 2080,
        y: 80
    },
    "pipeVerticalTopLeft": {
        x: 0,
        y: 160
    },
    "pipeVerticalTopRight": {
        x: 80,
        y: 160
    },
    "pipeHorizontalTopLeft": {
        x: 160,
        y: 160
    },
    "pipeHorizontalTop": {
        x: 240,
        y: 160
    },
    "pipeConnectorTopLeft": {
        x: 320,
        y: 160
    },
    "platformLeafLeft": {
        x: 400,
        y: 160
    },
    "platformLeaf": {
        x: 480,
        y: 160
    },
    "platformLeafRight": {
        x: 560,
        y: 160
    },
    "hillSlopeLeft": {
        x: 640,
        y: 160
    },
    "hillTop": {
        x: 720,
        y: 160
    },
    "hillSlopeRight": {
        x: 800,
        y: 160
    },
    "flagTop": {
        x: 1280,
        y: 160
    },
    "platformBushLeft": {
        x: 1360,
        y: 160
    },
    "platformBush": {
        x: 1440,
        y: 160
    },
    "platformBushLeftRight": {
        x: 1520,
        y: 160
    },
    "bushyhillSlopeLeft": {
        x: 1600,
        y: 160
    },
    "bushyhillTop": {
        x: 1680,
        y: 160
    },
    "bushyhillSlopeRight": {
        x: 1760,
        y: 160
    },
    "pipeVerticalLeft": {
        x: 0,
        y: 240
    },
    "pipeVerticalRight": {
        x: 80,
        y: 240
    },
    "pipeHorizontalBottomLeft": {
        x: 160,
        y: 240
    },
    "pipeHorizontalBottom": {
        x: 240,
        y: 240
    },
    "pipeConnectorBottomLeft": {
        x: 320,
        y: 240
    },
    "platformMushroomLeft": {
        x: 400,
        y: 240
    },
    "platformMushroom": {
        x: 480,
        y: 240
    },
    "platformMushroomRight": {
        x: 560,
        y: 240
    },
    "hillFillingWithDotsRight": {
        x: 640,
        y: 240
    },
    "hillFilling": {
        x: 720,
        y: 240
    },
    "hillFillingWithDotsLeft": {
        x: 800,
        y: 240
    },
    "bushLeft": {
        x: 880,
        y: 240
    },
    "bush": {
        x: 960,
        y: 240
    },
    "bushRight": {
        x: 1040,
        y: 240
    },
    "flagPole": {
        x: 1280,
        y: 240
    },
    "bushyhillFillingWithDotsRight": {
        x: 1600,
        y: 240
    },
    "bushyhillFilling": {
        x: 1680,
        y: 240
    },
    "bushyhillFillingWithDotsLeft": {
        x: 1760,
        y: 240
    },
    "cloudTopLeft": {
        x: 0,
        y: 320
    },
    "cloudTop": {
        x: 80,
        y: 320
    },
    "cloudTopRight": {
        x: 160,
        y: 320
    },
    "waterTop": {
        x: 160,
        y: 320
    },
    "cloudBottomLeft": {
        x: 0,
        y: 400
    },
    "cloudBottom": {
        x: 80,
        y: 400
    },
    "cloudBottomRight": {
        x: 160,
        y: 400
    },
}

const objectTypeOffsetMap = {
    "mushroom": {
        x: 0,
        y: 0
    },
    "1up": {
        x: 80,
        y: 0
    },
    "flower": {
        x: 0,
        y: 160
    }
}

const worldData = {
    11: {
        bg: "#6b8cff",
        width: 16960,
        gravity: 2.15,
        rectangles: [
            {x: 0, y: 1000, w: 69, h: 1, theme: "overworld", type: "floor", collision: true},
            {x: 5680, y: 1000, w: 15, h: 1, theme: "overworld", type: "floor", collision: true},
            {x: 7120, y: 1000, w: 64, h: 1, theme: "overworld", type: "floor", collision: true},
            {x: 12400, y: 1000, w: 57, h: 1, theme: "overworld", type: "floor", collision: true},

            {x: 6400, y: 360, w: 8, h: 1, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 7280, y: 360, w: 3, h: 1, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 9680, y: 360, w: 3, h: 1, theme: "overworld", type: "breakableShiny",  collision: true},
            {x: 10320, y: 680, w: 2, h: 1, theme: "overworld", type: "breakableShiny",  collision: true},
            {x: 12160, y: 680, w: 1, h: 4, theme: "overworld", type: "solid", collision: true},
            {x: 13440, y: 680, w: 2, h: 1, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 15120, y: 360, w: 1, h: 8, theme: "overworld", type: "solid", collision: true},
        ],
        steps : [
            {x: 10720, y: 680, w: 4, h: 4, theme: "overworld", type: "solid"},
            {x: 11200, y: 680, w: 4, h: 4, theme: "overworld", type: "solid", reversed: true},
            {x: 11840, y: 680, w: 4, h: 4, theme: "overworld", type: "solid"},
            {x: 12400, y: 680, w: 4, h: 4, theme: "overworld", type: "solid", reversed: true},
            {x: 14480, y: 360, w: 8, h: 8, theme: "overworld", type: "solid"},
        ],
        tiles: [
            {x: 1280, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "mushroom"},
            {x: 1680, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true},
            {x: 1840, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true},
            {x: 1760, y: 360, theme: "overworld", type: "questionMark", animate: true, collision: true},

            {x: 1600, y: 680, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 1760, y: 680, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 1920, y: 680, theme: "overworld", type: "breakableShiny", collision: true},

            {x: 6160, y: 6800, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 6240, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true},
            {x: 6320, y: 680, theme: "overworld", type: "breakableShiny", collision: true},

            {x: 7520, y: 360, theme: "overworld", type: "questionMark", animate: true, collision: true},
            {x: 7520, y: 680, theme: "overworld", type: "breakableShiny", collision: true},

            {x: 8480, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true},
            {x: 8720, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true},
            {x: 8720, y: 360, theme: "overworld", type: "questionMark", animate: true, collision: true},
            {x: 8960, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true},
            
            {x: 9440, y: 680, theme: "overworld", type: "breakableShiny", collision: true},

            {x: 10240, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 10480, y: 360, theme: "overworld", type: "breakableShiny", collision: true},

            {x: 10320, y: 360,  theme: "overworld", type: "questionMark",  animate: true, collision: true},
            {x: 10400, y: 360,  theme: "overworld", type: "questionMark",  animate: true, collision: true},

            {x: 13600, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true},
            {x: 13680, y: 680, theme: "overworld", type: "breakableShiny", collision: true},
        ],
        hills: [
            {x: 0, y: 760, w: 5, h: 3, theme: "overworld"}, 
            {x: 1280, y: 840, w: 3, h: 2, theme: "overworld"}, 
            {x: 3840, y: 760, w: 5, h: 3, theme: "overworld"}, 
            {x: 5120, y: 840, w: 3, h: 2, theme: "overworld"}, 
            {x: 7680, y: 760, w: 5, h: 3, theme: "overworld"}, 
            {x: 8960, y: 840, w: 3, h: 2, theme: "overworld"}, 
            {x: 11520, y: 760, w: 5, h: 3, theme: "overworld"}, 
            {x: 12800, y: 840, w: 3, h: 2, theme: "overworld"}, 
            {x: 15360, y: 760, w: 5, h: 3, theme: "overworld"}, 
            {x: 16640, y: 840, w: 3, h: 2, theme: "overworld"}
        ],
        clouds: [
            {x: 1520, y: 120, theme: "overworld", amount: 1},
            {x: 2160, y: 200, theme: "overworld", amount: 3},
            {x: 2880, y: 120, theme: "overworld", amount: 2},
            {x: 4480, y: 200, theme: "overworld", amount: 1},
            {x: 5360, y: 120, theme: "overworld", amount: 1},
            {x: 6000, y: 200, theme: "overworld", amount: 3},
            {x: 6720, y: 120, theme: "overworld", amount: 2},
            {x: 8320, y: 200, theme: "overworld", amount: 1},
            {x: 9200, y: 120, theme: "overworld", amount: 1},
            {x: 9840, y: 200, theme: "overworld", amount: 3},
            {x: 10560, y: 120, theme: "overworld", amount: 2},
            {x: 12160, y: 200, theme: "overworld", amount: 1},
            {x: 13040, y: 120, theme: "overworld", amount: 1},
            {x: 13680, y: 200, theme: "overworld", amount: 3},
            {x: 14400, y: 120, theme: "overworld", amount: 2},
            {x: 16000, y: 200, theme: "overworld", amount: 1},
        ],
        flag: {
            x: 15840,
            y: 120,
            w: 1,
            h: 11,
            theme: "overworld"
        },
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

const animateSequences = {
    "questionMark": [1920, 1920, 2000, 2080, 2000],
}

const objectVelTable = {
    "mushroom": 3
}

class Tile {
    constructor(parent, x, y, theme="overworld", type="floor", animate=false, collision=false, itemTheme=null, itemType=null) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.left = this.x;
        this.right = this.x + this.blocksize;
        this.top = this.y;
        this.bottom = this.y + this.blocksize;
        this.theme = theme;
        this.type = type;
        this.animate = animate;
        this.collision = collision;
        this.itemTheme = itemTheme;
        this.itemType = itemType;
        this.sX = typeOffsetMap[this.type].x;
        this.sY = themeOffsetMap[this.theme] + typeOffsetMap[this.type].y;
        this.sprites = tileSprites;

        if (this.animate) {
            this.frame = 0;
            this.sequence = animateSequences[this.type];
        } 
    }

    update() {
        if (this.animate && this.parent.parent.frame % 10 === 0) {
            this.frame = (this.frame + 1) % this.sequence.length;
            this.sX = this.sequence[this.frame];
        }
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.left = this.x;
        this.right = this.x + this.blocksize;
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.blocksize, this.blocksize, this.x, this.y, this.blocksize, this.blocksize);
    }
}

class Rectangle {
    constructor(parent, x, y, w, h, theme="overworld", type="floor", animate=false, collision=false) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.left = this.x;
        this.right = this.x + this.w * this.blocksize;
        this.top = this.y;
        this.bottom = this.y + this.h * this.blocksize;
        this.theme = theme;
        this.type = type;
        this.animate = animate;
        this.collision = collision;
        this.sX = typeOffsetMap[this.type].x;
        this.sY = themeOffsetMap[this.theme] + typeOffsetMap[this.type].y;
        this.sprites = tileSprites;
    }

    update() {
        if (this.animate) {
            // Update sprite
        }
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.left = this.x;
        this.right = this.x + this.w * this.blocksize;
    }

    draw() {
        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) {
                ctx.drawImage(this.sprites, this.sX, this.sY, this.blocksize, this.blocksize, this.x + j * this.blocksize, this.y + i * this.blocksize, this.blocksize, this.blocksize);
            }
        }
    }
}

class Hill {
    constructor(parent, x, y, w, h, theme="overworld", type="") {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.theme = theme;
        this.type = type;

        this.tiles = [];

        let rowWidth = 1;
        let offset = (this.w - 1) / 2;
        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < rowWidth; j++) {
                let typeName = null;
                if (i == 0 && j === 0) {
                    typeName = `${this.type}hillTop`;
                } else if (j === 0) {
                    typeName = `${this.type}hillSlopeLeft`;
                } else if (j === rowWidth - 1) {
                    typeName = `${this.type}hillSlopeRight`;
                } else if (j === 1) {
                    typeName = `${this.type}hillFillingWithDotsRight`;
                } else if (j === rowWidth - 2) {
                    typeName = `${this.type}hillFillingWithDotsLeft`;
                } else {
                    typeName = `${this.type}hillFilling`;
                }

                if (typeName) {
                    this.tiles.push(new Tile(this, this.x + (offset + j) * this.blocksize, this.y + i * this.blocksize, this.theme, typeName));
                }
            }
            rowWidth += 2;
            offset--;
        }
    }

    scroll(deltaX) {
        this.tiles.forEach(tile => {
            tile.scroll(deltaX);
        });
    }

    draw() {
        this.tiles.forEach(tile => {
            tile.draw();
        });
    }
}

class Cloud {
    constructor(parent, x, y, theme="overworld", amount=1) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.theme = theme;
        this.amount = amount;

        this.tiles = [];
        
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2 + this.amount; j++) {
                let typeName = null;
                if (i === 0 && j === 0) {
                    typeName = "cloudTopLeft";
                } else if (i === 0 && j === this.amount + 1) {
                    typeName = "cloudTopRight";
                } else if (i === 0) {
                    typeName = "cloudTop";
                } else if (i === 1 && j === 0) {
                    typeName = "cloudBottomLeft";
                } else if (i === 1 && j === this.amount + 1) {
                    typeName = "cloudBottomRight";
                } else if (i === 1) {
                    typeName = "cloudBottom";
                }
                if (typeName) {
                    this.tiles.push(new Tile(this, this.x + j * this.blocksize, this.y + i * this.blocksize, this.theme, typeName));
                }
            }
        }
    }

    scroll(deltaX) {
        this.tiles.forEach(tile => {
            tile.scroll(deltaX);
        });
    }

    draw() {
        this.tiles.forEach(tile => {
            tile.draw();
        });
    }
}

class Step {
    constructor(parent, x, y, w, h, theme="overworld", type="solid", animate=false, collision=true, reversed=false) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.theme = theme;
        this.type = type;
        this.animate = animate;
        this.collision = collision;
        this.reversed = reversed;

        this.rectangles = [];

        if (this.reversed) {
            for (let i = 0; i < this.h; i++) {
                this.rectangles.push(new Rectangle(this, this.x + i * this.blocksize, this.y + i * this.blocksize, 1, this.h - i, this.theme, this.type, this.animate, this.collision));
            }
        } else {
            for (let i = 0; i < this.h; i++) {
                this.rectangles.push(new Rectangle(this, this.x + i * this.blocksize, this.y + (this.h -1 - i) * this.blocksize, 1, 1 + i, this.theme, this.type, this.animate, this.collision));
            }
        }
    }

    update() {
        this.rectangles.forEach(rectangle => {
            rectangle.update();
        });
    }

    scroll(deltaX) {
        this.rectangles.forEach(rectangle => {
            rectangle.scroll(deltaX);
        });
    }

    draw() {
        this.rectangles.forEach(rectangle => {
            rectangle.draw();
        });
    }
}

class Flag {
    constructor(parent, x, y, w, h, theme) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.theme = theme;

        this.parts = [];

        this.parts.push(new Tile(this, this.x, this.y, this.theme, "flagTop", false, true));
        for (let i = 0; i < this.h; i++) {
            this.parts.push(new Tile(this, this.x, this.y + (i + 1) *  this.blocksize, this.theme, "flagPole", false, true));
        }
        this.parts.push(new Tile(this, this.x, this.y + this.h * this.blocksize - this.blocksize, this.theme, "solid", false, true));
    }

    removeCollision() {
        this.parts.forEach(part => {
            if (part.type === "flagPole") {
                part.collision = false;
            }
        });
    }

    update() {
        this.parts.forEach(part => {
            part.update();
        });
    }

    scroll(deltaX) {
        this.parts.forEach(part => {
            part.scroll(deltaX);
        });
    }

    draw() {
        this.parts.forEach(part => {
            part.draw();
        });
    }
}

class Pipe {

}

class World {
    constructor(parent, worldID) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.end = worldData[worldID].width;
        this.backgroundColor = worldData[worldID].bg;

        this.rectangles = [];
        worldData[worldID].rectangles.forEach(rectangle => {
            this.rectangles.push(new Rectangle(this, rectangle.x, rectangle.y, rectangle.w, rectangle.h, rectangle.theme, rectangle.type, rectangle.animate, rectangle.collision));
        });

        this.steps = [];
        worldData[worldID].steps.forEach(step => {
            this.steps.push(new Step(this, step.x, step.y, step.w, step.h, step.theme, step.type, step.animate, step.collision, step.reversed));
        });

        this.tiles = [];
        worldData[worldID].tiles.forEach(tile => {
            this.tiles.push(new Tile(this, tile.x, tile.y, tile.theme, tile.type, tile.animate, tile.collision, tile.itemTheme, tile.itemType));
        });

        this.hills = [];
        worldData[worldID].hills.forEach(hill => {
            this.hills.push(new Hill(this, hill.x, hill.y, hill.w, hill.h, hill.theme, hill.type));
        });

        this.clouds = [];
        worldData[worldID].clouds.forEach(cloud => {
            this.clouds.push(new Cloud(this, cloud.x, cloud.y, cloud.theme, cloud.amount));
        });
        const flagData = worldData[worldID].flag;
        this.flag = new Flag(this, flagData.x, flagData.y, flagData.w, flagData.h, flagData.theme);
    }

    update() {
        // Rectangles
        this.rectangles.forEach(rectangle => {
            rectangle.update();
        });
        // Steps
        this.steps.forEach(step => {
            step.update();
        });
        // Tiles
        this.tiles.forEach(tile => {
            tile.update();
        });
        // Flag
        this.flag.update();
    }

    scroll(deltaX) {
        this.end -= deltaX;

        // Rectangles
        this.rectangles.forEach(rectangle => {
            rectangle.scroll(deltaX);
        });
        // Steps
        this.steps.forEach(step => {
            step.scroll(deltaX);
        });
        // Tiles
        this.tiles.forEach(tile => {
            tile.scroll(deltaX);
        });
        // Hills
        this.hills.forEach(hill => {
            hill.scroll(deltaX);
        });
        // Clouds
        this.clouds.forEach(cloud => {
            cloud.scroll(deltaX);
        });
        // Flag
        this.flag.scroll(deltaX);
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
        // Pipes
        // Flag
        this.flag.draw();
        // Castle
        // Rectangles
        this.rectangles.forEach(rectangle => {
            rectangle.draw();
        });
        // Steps
        this.steps.forEach(step => {
            step.draw();
        });
        // Tiles
        this.tiles.forEach(tile => {
            tile.draw();
        });
    }
}

class Character {
    constructor(parent) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.frame = 0;
        this.x = 160;
        this.xOld = this.x;
        this.y = this.parent.screensize.height / 2;
        this.yOld = this.y;
        this.w = 80;
        this.h = 80;
        this.left = this.x;
        this.leftOld = this.left;
        this.right = this.x + this.w;
        this.rightOld = this.right;
        this.top = this.y;
        this.topOld = this.top;
        this.bottom = this.y + this.h;
        this.bottomOld = this.bottom;
        this.hitbox = {
            left: this.left + 15,
            right: this.right - 15,
            top: this.top + 20,
            bottom: this.bottom - 10
        };
        this.hitboxOld = this.hitbox;
        this.sX = 0;
        this.sY = 160;
        this.facingLeftYOffset = 240;
        
        this.xVel = 0;
        this.yVel = 0;
        this.gravity = this.parent.gravity;
        this.jumpForce = 40;
        this.xVelMaxWalk = 12;
        this.xVelMaxSprint = 18;
        this.xVelMax = this.xVelMaxWalk;
        this.sprites = characterSprites;
        this.inAir = true;
        this.facingForward = true;
        this.friction = 0;
        this.frictionAir = 1;
        this.frictionGround = 1;
        this.xAccel = 0;
        this.xAccelSprint = 3;
        this.xAccelWalk = 2;
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
            ducking: "ducking",
            crappling: "crappling"
        }
        this.frames = {
            running: [80, 160, 240]
        }

        this.endsequence = false;
    }

    jump() {
        this.yVel -= this.jumpForce;
        this.inAir = true;
        this.movement.current = this.movement.jumping;
    }

    grow() {
        this.setState(this.state.big);
        this.setHeight();
    }

    setState(newState) {
        this.state.current = newState;
    }

    setHeight() {
        if (this.state.current === this.state.small) {
            this.h = 80;
        } else {
            this.y -= 80;
            this.h = 160;
        }
    }

    setVelocities() {
        if (this.endsequence && this.y + this.h < this.parent.screensize.height - 160) return;
        // User wants to move right
        if (this.parent.keyStates.right && !this.parent.keyStates.left) {
            this.facingForward = true;
            if (this.parent.keyStates.sprint) {
                this.xAccel = this.xAccelSprint;
                this.xVelMax = this.xVelMaxSprint;
            } else {
                this.xAccel = this.xAccelWalk;
                this.xVelMax = this.xVelMaxWalk;
            }
        // User wants to move left
        } else if (this.parent.keyStates.left && !this.parent.keyStates.right) {
            this.facingForward = false;
            if (this.parent.keyStates.sprint) {
                this.xAccel = -this.xAccelSprint;
                this.xVelMax = -this.xVelMaxSprint;
            } else {
                this.xAccel = -this.xAccelWalk;
                this.xVelMax = -this.xVelMaxWalk;
            }
        } else {
            this.xAccel = 0;
        }

        // Add friction if we are not in the air
        if (!this.inAir) {
            if (this.xVel > 0) {
                this.friction = this.frictionGround;
            } else if (this.xVel < 0) {
                this.friction = -this.frictionGround;
            } else {
                this.friction = 0;
            }
        } else {
            if (this.xVel > 0) {
                this.friction = this.frictionAir;
            } else if (this.xVel < 0) {
                this.friction = -this.frictionAir;
            }
        }

        // Calculate new xVel
        this.xVel += this.xAccel - this.friction;

        if (this.xVel > 0) {
            this.xVel = Math.min(this.xVel, this.xVelMax);
        } else if (this.xVel < 0) {
            this.xVel = Math.max(this.xVel, this.xVelMax);
        }


        this.yVel += this.gravity;
    }

    collision() {
        // Calculate new position and store old position
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;

        console.log(this.y)

        if (this.endsequence && this.y + this.h < this.parent.screensize.height - 160) {
            return;
        } else if (this.endsequence) {
            this.movement.current = this.movement.walking;
            this.xVel = 5;
            this.parent.world.flag.removeCollision();
        }

        // Screen edges
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.w > this.parent.screensize.width) {
            this.x = this.parent.screensize.width - this.w;
        }

        // Respawn if falling to death (for testing)
        if (this.y > this.parent.screensize.height) {
            this.y = this.parent.screensize.height / 2;
            this.x = 80;
        }

        // Rectangles
        this.parent.world.rectangles.forEach(rectangle => {
            if (this.y + this.h > rectangle.top && this.y < rectangle.bottom && this.x < rectangle.right && this.x + this.w > rectangle.left) {
                // Character entered Rectangle from the top
                if (this.y + this.h > rectangle.top && this.yOld + this.h <= rectangle.top) {
                    this.y = rectangle.top - this.h;
                    this.yOld = this.y;
                    this.yVel = 0;
                    this.inAir = false;
                // Character entered Rectangle from the left
                } else if (this.x + this.w > rectangle.left && this.xOld + this.w <= rectangle.left) {
                    this.x = rectangle.left - this.w;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered Rectangle from the right
                } else if (this.x < rectangle.right && this.xOld >= rectangle.right) {
                    this.x = rectangle.right;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered Rectangle from the bottom
                } else if (this.y < rectangle.bottom && this.yOld >= rectangle.bottom) {
                    this.y = rectangle.bottom;
                    this.yOld = this.y;
                    this.yVel = 0;
                }
            }
        });


        // Steps
        this.parent.world.steps.forEach(step => {
            // Check for each rectangle of the step
            step.rectangles.forEach(rectangle => {
                if (this.y + this.h > rectangle.top && this.y < rectangle.bottom && this.x < rectangle.right && this.x + this.w > rectangle.left) {
                    // Character entered rectangle from the top
                    if (this.y + this.h > rectangle.top && this.yOld + this.h <= rectangle.top) {
                        this.y = rectangle.top - this.h;
                        this.yOld = this.y;
                        this.yVel = 0;
                        this.inAir = false;
                    // Character entered rectangle from the left
                    } else if (this.x + this.w > rectangle.left && this.xOld + this.w <= rectangle.left) {
                        this.x = rectangle.left - this.w;
                        this.xOld = this.x;
                        this.xVel = 0;
                    // Character entered rectangle from the right
                    } else if (this.x < rectangle.right && this.xOld >= rectangle.right) {
                        this.x = rectangle.right;
                        this.xOld = this.x;
                        this.xVel = 0;
                    // Character entered rectangle from the bottom
                    } else if (this.y < rectangle.bottom && this.yOld >= rectangle.bottom) {
                        this.y = rectangle.bottom;
                        this.yOld = this.y;
                        this.yVel = 0;
                    }
                }
            });
        });

        // Tiles
        this.parent.world.tiles.forEach(tile => {
            if (this.y + this.h > tile.top && this.y < tile.bottom && this.x < tile.right && this.x + this.w > tile.left) {
                // Character entered tile from the top
                if (this.y + this.h > tile.top && this.yOld + this.h <= tile.top) {
                    this.y = tile.top - this.h;
                    this.yOld = this.y;
                    this.yVel = 0;
                    this.inAir = false;
                // Character entered tile from the left
                } else if (this.x + this.w > tile.left && this.xOld + this.w <= tile.left) {
                    this.x = tile.left - this.w;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered tile from the right
                } else if (this.x < tile.right && this.xOld >= tile.right) {
                    this.x = tile.right;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered tile from the bottom
                } else if (this.y < tile.bottom && this.yOld >= tile.bottom) {
                    this.y = tile.bottom;
                    this.yOld = this.y;
                    this.yVel = 0;
                    if (tile.itemType) {
                        tile.type = "disabled";
                        tile.sX = typeOffsetMap[tile.type].x;
                        tile.sY = themeOffsetMap[tile.theme] + typeOffsetMap[tile.type].y;
                        this.parent.spawnItem(tile.x, tile.y - this.blocksize, tile.itemTheme, tile.itemType);
                        tile.animate = false;
                        tile.itemTheme = null;
                        tile.itemType = null;
                    }
                }
            }
        });

        // Flag
        this.parent.world.flag.parts.forEach(part => {
            if (part.type === "flagPole" && part.collision) {
                if (this.x + this.w > part.x) {
                    this.x = part.x - this.blocksize * 1/4;
                    this.xVel = 0;
                    this.movement.current = this.movement.crappling;
                    this.parent.disableInput();
                    this.endsequence = true;
                    this.yVel = 5;
                }
            } else {
                if (this.y + this.h > part.top && this.y < part.bottom && this.x < part.right && this.x + this.w > part.left) {
                    // Character entered tile from the top
                    if (this.y + this.h > part.top && this.yOld + this.h <= part.top) {
                        this.y = part.top - this.h;
                        this.yOld = this.y;
                        this.yVel = 0;
                        this.inAir = false;
                    // Character entered tile from the left
                    } else if (this.x + this.w > part.left && this.xOld + this.w <= part.left) {
                        this.x = part.left - this.w;
                        this.xOld = this.x;
                        this.xVel = 0;
                    // Character entered tile from the right
                    } else if (this.x < part.right && this.xOld >= part.right) {
                        this.x = part.right;
                        this.xOld = this.x;
                        this.xVel = 0;
                    // Character entered tile from the bottom
                    } else if (this.y < part.bottom && this.yOld >= part.bottom) {
                        this.y = part.bottom;
                        this.yOld = this.y;
                        this.yVel = 0;
                    }
                }
            }
        })

        // Items
        this.parent.items.forEach(item => {
            if (this.y + this.h > item.y && this.y < item.y + this.blocksize && this.x < item.x + this.blocksize && this.x + this.w > item.x) {
                item.activate();
                item.destroy();
            }
        });
    }

    setMovement() {
        if (this.movement.current == this.movement.crappling) {
            return;
        } else if (this.xVel === 0 && this.yVel === 0 && !this.inAir) {
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
    }

    setSprite() {
        // Size
        if (this.state.current === this.state.small) {
            this.sY = 160;
            this.h = 80;
        } else if (this.state.current === this.state.big) {
            this.sY = 0;
            this.h = 160;
        }

        // Standing/Walking/Jumping/Ducking/Swimming/etc
        if (this.movement.current === this.movement.standing) {
            this.sX = 0;
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
            this.sX = 400;
        } else if (this.movement.current === this.movement.crappling) {
            this.sX = 640;
        }

        // console.log(this.movement.current)

        // In which direction is the player looking
        if (!this.facingForward) {
            this.sY += this.facingLeftYOffset;
        }
    }

    update() {
        this.setVelocities();
        this.collision();
        this.setMovement();
        this.setSprite();
    }

    scroll(deltaX) {
        this.x -= deltaX;
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}

class Enemy {
    
}

class Item {
    constructor (parent, x, y, theme, type) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = this.parent.gravity;
        this.x = x;
        this.xOld = this.x;
        this.y = y;
        this.yOld = this.y;
        this.theme = theme;
        this.type = type;
        this.sprites = objectSprites;
        this.sX = objectThemeOffsetMap[this.theme] + objectTypeOffsetMap[this.type].x;
        this.sY = objectTypeOffsetMap[this.type].y;
        this.animate = animateSequences[this.type];
        this.xVel = objectVelTable[this.type];
        this.yVel = 0;

        if (this.animate) {
            this.frame = 0;
            this.sequence = animateSequences[this.type];
        }

        if (this.xVel) {
            this.xVel = objectVelTable[this.type];
        }
    }

    activate() {
        if (this.type === "mushroom" && this.parent.character.state.current === "small") {
            this.parent.character.grow();
        }
    }

    destroy() {
        const itemIndex = this.parent.items.indexOf(this);
        this.parent.items.splice(itemIndex, 1)
        console.log(this.parent.items)
    }

    update() {
        this.yVel += this.gravity;

        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;

        // Screen edges
        if (this.x + this.blocksize < 0 || this.x > this.parent.screensize.width || this.y > this.parent.screensize.height) {
            this.destroy();
        }

        // Rectangles
        this.parent.world.rectangles.forEach(rectangle => {
            if (this.y + this.blocksize > rectangle.top && this.y < rectangle.bottom && this.x < rectangle.right && this.x + this.blocksize > rectangle.left) {
                // Item entered Rectangle from the top
                if (this.y + this.blocksize > rectangle.top && this.yOld + this.blocksize <= rectangle.top) {
                    this.y = rectangle.top - this.blocksize;
                    this.yOld = this.y;
                    this.yVel = 0;
                // Item entered Rectangle from the left
                } else if (this.x + this.blocksize > rectangle.left && this.xOld + this.blocksize <= rectangle.left) {
                    this.x = rectangle.left - this.blocksize;
                    this.xOld = this.x;
                    this.xVel *= -1;
                // Item entered Rectangle from the right
                } else if (this.x < rectangle.right && this.xOld >= rectangle.right) {
                    this.x = rectangle.right;
                    this.xOld = this.x;
                    this.xVel *= -1;
                // Item entered Rectangle from the bottom
                } else if (this.y < rectangle.bottom && this.yOld >= rectangle.bottom) {
                    this.y = rectangle.bottom;
                    this.yOld = this.y;
                    this.yVel = 0;
                }
            }
        });
        
        
        // Steps
        this.parent.world.steps.forEach(step => {
            // Check for each rectangle of the step
            step.rectangles.forEach(rectangle => {
                if (this.y + this.blocksize > rectangle.top && this.y < rectangle.bottom && this.x < rectangle.right && this.x + this.blocksize > rectangle.left) {
                    // Item entered rectangle from the top
                    if (this.y + this.blocksize > rectangle.top && this.yOld + this.blocksize <= rectangle.top) {
                        this.y = rectangle.top - this.blocksize;
                        this.yOld = this.y;
                        this.yVel = 0;
                    // Item entered rectangle from the left
                    } else if (this.x + this.blocksize > rectangle.left && this.xOld + this.blocksize <= rectangle.left) {
                        this.x = rectangle.left - this.blocksize;
                        this.xOld = this.x;
                        this.xVel *= -1;
                    // Item entered rectangle from the right
                    } else if (this.x < rectangle.right && this.xOld >= rectangle.right) {
                        this.x = rectangle.right;
                        this.xOld = this.x;
                        this.xVel *= -1;
                    // Item entered rectangle from the bottom
                    } else if (this.y < rectangle.bottom && this.yOld >= rectangle.bottom) {
                        this.y = rectangle.bottom;
                        this.yOld = this.y;
                        this.yVel = 0;
                    }
                }
            });
        });
        
        // Tiles
        this.parent.world.tiles.forEach(tile => {
            if (this.y + this.blocksize > tile.top && this.y < tile.bottom && this.x < tile.right && this.x + this.blocksize > tile.left) {
                // Item entered tile from the top
                if (this.y + this.blocksize > tile.top && this.yOld + this.blocksize <= tile.top) {
                    this.y = tile.top - this.blocksize;
                    this.yOld = this.y;
                    this.yVel = 0;
                // Item entered tile from the left
                } else if (this.x + this.blocksize > tile.left && this.xOld + this.blocksize <= tile.left) {
                    this.x = tile.left - this.blocksize;
                    this.xOld = this.x;
                    this.xVel *= -1;
                // Item entered tile from the right
                } else if (this.x < tile.right && this.xOld >= tile.right) {
                    this.x = tile.right;
                    this.xOld = this.x;
                    this.xVel *= -1;
                // Item entered tile from the bottom
                } else if (this.y < tile.bottom && this.yOld >= tile.bottom) {
                    this.y = tile.bottom;
                    this.yOld = this.y;
                    this.yVel = 0;
                }
            }
        });
    }

    scroll(deltaX) {
        this.x -= deltaX;
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.blocksize, this.blocksize, this.x, this.y, this.blocksize, this.blocksize);
    }
}

class Game {
    constructor() {
        this.frame = 0;
        this.screensize = {
            width: cvs.width,
            height: cvs.height
        };
        this.keyStates = {
            left: false,
            right: false,
            sprint: false
        };
        this.ignoreInput = false;
        this.currentWorld = 11;
        this.gravity = worldData[this.currentWorld].gravity;
        this.blocksize = 80;
        this.scrollLine = this.screensize.width / 2;

        this.character = new Character(this);
        this.world = new World(this, this.currentWorld);

        this.items = [];
    }

    enableInput() {
        this.ignoreInput = false;
    }

    disableInput() {
        this.ignoreInput = true;
    }

    spawnItem(x, y, theme, type) {
        this.items.push(new Item(this, x, y, theme, type))
    }
    // Runs each frame
    update() {
        this.frame++;

        this.character.update();
        this.world.update();
        this.items.forEach(item => {
            item.update();
        });

        // Scroll screen if player character crossed "magic line"
        if (this.character.x > this.scrollLine && this.world.end > this.screensize.width) {
            const deltaX = Math.round(this.character.x - this.scrollLine);
            this.character.scroll(deltaX);
            this.world.scroll(deltaX);
            this.items.forEach(item => {
                item.scroll(deltaX);
            });
        }
    }

    draw() {
        this.world.draw();
        this.character.draw();
        this.items.forEach(item => {
            item.draw();
        });
    }
}

// Just for testing
function spawn() {
    game.player.x = 50;
    game.player.y = cvs.height / 2;
}

function stopHere() {
    throw new Error("Halting execution");
}

function handleKeydown(e) {
    if (game.ignoreInput) return;

    if (e.keyCode === 32 && !game.character.inAir) {
        game.character.jump();
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