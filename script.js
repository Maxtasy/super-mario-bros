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
    "castleWall": {
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
    "coinTile": {
        x: 1920,
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
    "blank": {
        x: 240,
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
    },
    "coinItem": {
        x: 0,
        y: 560
    },
    "star": {
        x: 0,
        y: 240
    },
    "brokenTileTopLeft": {
        x: 320,
        y: 160
    },
    "brokenTileTopRight": {
        x: 320,
        y: 80
    },
    "brokenTileBottomLeft": {
        x: 320,
        y: 80
    },
    "brokenTileBottomRight": {
        x: 320,
        y: 160
    }
}

const worldData = {
    11: {
        spawnLocation: {
            x: 160,
            y: 760
        },
        bg: "#63adfe",
        width: 16960,
        levelEndLine: 16400,
        gravity: 2.15,
        rectangles: [
            {x: 0, y: 1000, w: 69, h: 1, theme: "overworld", type: "floor", collision: true},
            {x: 5680, y: 1000, w: 15, h: 1, theme: "overworld", type: "floor", collision: true},
            {x: 7120, y: 1000, w: 64, h: 1, theme: "overworld", type: "floor", collision: true},
            {x: 12400, y: 1000, w: 57, h: 1, theme: "overworld", type: "floor", collision: true},

            {x: 12160, y: 680, w: 1, h: 4, theme: "overworld", type: "solid", collision: true},
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
            {x: 1280, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "coinItem"},
            {x: 1680, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "mushroom"},
            {x: 1840, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "coinItem"},
            {x: 1760, y: 360, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "coinItem"},

            {x: 1600, y: 680, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 1760, y: 680, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 1920, y: 680, theme: "overworld", type: "breakableShiny", collision: true},

            {x: 5120, y: 600, theme: "overworld", type: "blank", collision: true, itemTheme: "overworld", itemType: "1up", secret: true},

            {x: 6160, y: 680, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 6240, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "mushroom"},
            {x: 6320, y: 680, theme: "overworld", type: "breakableShiny", collision: true},
            
            {x: 6400, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 6480, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 6560, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 6640, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 6720, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 6800, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 6880, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 6960, y: 360, theme: "overworld", type: "breakableShiny", collision: true},

            {x: 7280, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 7360, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 7440, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 7520, y: 360, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "coinItem"},

            {x: 7520, y: 680, theme: "overworld", type: "breakableShiny", collision: true, itemTheme: "overworld", itemType: "coinItem"},

            {x: 8000, y: 680, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 8080, y: 680, theme: "overworld", type: "breakableShiny", collision: true, itemTheme: "overworld", itemType: "star"},

            {x: 8480, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "coinItem"},
            {x: 8720, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "coinItem"},
            {x: 8720, y: 360, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "mushroom"},
            {x: 8960, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "coinItem"},
            
            {x: 9440, y: 680, theme: "overworld", type: "breakableShiny", collision: true},

            {x: 9680, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 9760, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 9840, y: 360, theme: "overworld", type: "breakableShiny", collision: true},

            {x: 10240, y: 360, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 10320, y: 360,  theme: "overworld", type: "questionMark",  animate: true, collision: true, itemTheme: "overworld", itemType: "coinItem"},
            {x: 10400, y: 360,  theme: "overworld", type: "questionMark",  animate: true, collision: true, itemTheme: "overworld", itemType: "coinItem"},
            {x: 10480, y: 360, theme: "overworld", type: "breakableShiny", collision: true},

            {x: 10320, y: 680,  theme: "overworld", type: "breakableShiny", collision: true},
            {x: 10400, y: 680,  theme: "overworld", type: "breakableShiny", collision: true},

            {x: 13440, y: 680, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 13520, y: 680, theme: "overworld", type: "breakableShiny", collision: true},
            {x: 13600, y: 680, theme: "overworld", type: "questionMark", animate: true, collision: true, itemTheme: "overworld", itemType: "coinItem"},
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
        bushes: [
            {x: 880, y: 920, theme: "overworld", amount: 3},
            {x: 1840, y: 920, theme: "overworld", amount: 1},
            {x: 3280, y: 920, theme: "overworld", amount: 2},
            {x: 4720, y: 920, theme: "overworld", amount: 3},
            {x: 5680, y: 920, theme: "overworld", amount: 1},
            {x: 7120, y: 920, theme: "overworld", amount: 2},
            {x: 8560, y: 920, theme: "overworld", amount: 3},
            {x: 9520, y: 920, theme: "overworld", amount: 1},
            {x: 10960, y: 920, theme: "overworld", amount: 2},
            {x: 12560, y: 920, theme: "overworld", amount: 1},
            {x: 13360, y: 920, theme: "overworld", amount: 1},
            {x: 16400, y: 920, theme: "overworld", amount: 1},
        ],
        pipes: [
            {x: 2240, y: 840, size: 2, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 3040, y: 760, size: 3, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 3680, y: 680, size: 4, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 4560, y: 680, size: 4, theme: "overworld", opening: "top", canEnter: true, destination: 111},
            {x: 13040, y: 840, size: 2, theme: "overworld", opening: "top", canEnter: false, destination: null},
        ],
        flag: {
            x: 15840,
            y: 120,
            w: 1,
            h: 11,
            theme: "overworld"
        },
        // flag: {
        //     x: 400,
        //     y: 120,
        //     w: 1,
        //     h: 11,
        //     theme: "overworld"
        // },
        castles: [
            {x: 16160, y: 600, theme: "overworld", name: "small"}
        ]
    },
    // Sub level of 11 (underworld)
    111: "#000000",
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
    "coinTile": [1920, 1920, 2000, 2800, 2000],
    "coinItem": [0, 80, 160, 240],
    "flower": [0, 80, 160, 240],
    "star": [0, 80, 160, 240],
}

const objectVelTable = {
    "mushroom": {
        xVel: 3,
        yVel: -10,
    },
    "1up": {
        xVel: 3,
        yVel: -10,
    },
    "goomba": {
        xVel: 3,
        yVel: 0
    },
    "coinItem": {
        xVel: 0,
        yVel: -20
    },
    "flower": {
        xVel: 0,
        yVel: 0
    },
    "star": {
        xVel: 0,
        yVel: 0
    },
    "brokenTileTopLeft": {
        xVel: -2,
        yVel: -10
    },
    "brokenTileTopRight": {
        xVel: 2,
        yVel: -10
    },
    "brokenTileBottomLeft": {
        xVel: -2,
        yVel: -10
    },
    "brokenTileBottomRight": {
        xVel: 2,
        yVel: -10
    }
}

const castles = {
    "small": [
        {x: 80, y: 0, type: "castleTop"},
        {x: 160, y: 0, type: "castleTop"},
        {x: 240, y: 0, type: "castleTop"},

        {x: 80, y: 80, type: "castleWindowsLeft"},
        {x: 160, y: 80, type: "castleWall"},
        {x: 240, y: 80, type: "castleWindowsRight"},

        {x: 0, y: 160, type: "castleTop"},
        {x: 80, y: 160, type: "castleSemiTop"},
        {x: 160, y: 160, type: "castleSemiTop"},
        {x: 240, y: 160, type: "castleSemiTop"},
        {x: 320, y: 160, type: "castleTop"},

        {x: 0, y: 240, type: "castleWall"},
        {x: 80, y: 240, type: "castleWall"},
        {x: 160, y: 240, type: "castleDoorTop"},
        {x: 240, y: 240, type: "castleWall"},
        {x: 320, y: 240, type: "castleWall"},

        {x: 0, y: 320, type: "castleWall"},
        {x: 80, y: 320, type: "castleWall"},
        {x: 160, y: 320, type: "castleDoorBottom"},
        {x: 240, y: 320, type: "castleWall"},
        {x: 320, y: 320, type: "castleWall"},
    ]
}

class Tile {
    constructor(parent, x, y, theme="overworld", type="floor", animate=false, collision=false, itemTheme=null, itemType=null, secret=false) {
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
        this.content = 1;
        if (this.type === "breakableShiny" && this.itemType === "coinItem") {
            this.content = 10;
        }
        this.secret = secret;
        this.sX = typeOffsetMap[this.type].x;
        this.sY = themeOffsetMap[this.theme] + typeOffsetMap[this.type].y;
        this.sprites = tileSprites;

        if (this.animate) {
            this.frame = 0;
            this.sequence = animateSequences[this.type];
        } 
    }

    updateSpriteOffsets() {
        this.sX = typeOffsetMap[this.type].x;
        this.sY = themeOffsetMap[this.theme] + typeOffsetMap[this.type].y;
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

class Bush {
    constructor(parent, x, y, theme="overworld", amount=1) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.theme = theme;
        this.amount = amount;

        this.tiles = [];
        
        for (let i = 0; i < this.amount + 2; i++) {
            let typeName = null;
            if (i === 0) {
                typeName = "bushLeft";
            } else if (i === this.amount + 1) {
                typeName = "bushRight";
            } else {
                typeName = "bush"
            }
            if (typeName) {
                this.tiles.push(new Tile(this, this.x + i * this.blocksize, this.y, this.theme, typeName));
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

    update() {
        this.parts.forEach(part => {
            part.update();
        });
    }

    scroll(deltaX) {
        this.x -= deltaX;
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
    constructor(parent, x, y, size=2, theme="overworld", opening="top", canEnter=false, destination=null) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.size = size;
        this.theme = theme;
        this.opening = opening;
        this.canEnter = canEnter;
        this.destination = destination;

        this.tiles = [];

        if (this.opening === "top") {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < 2; j++) {
                    let typeName = null;
                    if (i === 0 && j === 0) {
                        typeName = "pipeVerticalTopLeft";
                    } else if (i === 0 && j === 1) {
                        typeName = "pipeVerticalTopRight";
                    } else if (j === 0) {
                        typeName = "pipeVerticalLeft";
                    } else if (j === 1) {
                        typeName = "pipeVerticalRight";
                    }
                    if (typeName) {
                        this.tiles.push(new Tile(this, this.x + j * this.blocksize, this.y + i * this.blocksize, this.theme, typeName, false, true));
                    }
                }
            }
        }
    }

    scroll(deltaX) {
        this.x -= deltaX;
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

class Castle {
    constructor(parent, x, y, theme, name) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.theme = theme;
        this.name = name;

        this.tiles = [];

        castles[this.name].forEach(tile => {
            this.tiles.push(new Tile(this, this.x + tile.x, this.y + tile.y, this.theme, tile.type));
        })
    }

    scroll(deltaX) {
        this.x -= deltaX;
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

class World {
    constructor(parent, worldID) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.end = worldData[worldID].width;
        this.levelEndLine = worldData[worldID].levelEndLine;
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
            this.tiles.push(new Tile(this, tile.x, tile.y, tile.theme, tile.type, tile.animate, tile.collision, tile.itemTheme, tile.itemType, tile.secret));
        });

        this.hills = [];
        worldData[worldID].hills.forEach(hill => {
            this.hills.push(new Hill(this, hill.x, hill.y, hill.w, hill.h, hill.theme, hill.type));
        });

        this.clouds = [];
        worldData[worldID].clouds.forEach(cloud => {
            this.clouds.push(new Cloud(this, cloud.x, cloud.y, cloud.theme, cloud.amount));
        });

        this.bushes = [];
        worldData[worldID].bushes.forEach(bush => {
            this.bushes.push(new Bush(this, bush.x, bush.y, bush.theme, bush.amount));
        });

        this.pipes = [];
        worldData[worldID].pipes.forEach(pipe => {
            this.pipes.push(new Pipe(this, pipe.x, pipe.y, pipe.size, pipe.theme, pipe.opening, pipe.canEnter, pipe.destination));
        });

        this.castles = [];
        worldData[worldID].castles.forEach(castle => {
            this.castles.push(new Castle(this, castle.x, castle.y, castle.theme, castle.name));
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
        this.levelEndLine -= deltaX;

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
        // Bushes
        this.bushes.forEach(bush => {
            bush.scroll(deltaX);
        });
        // Pipes
        this.pipes.forEach(pipe => {
            pipe.scroll(deltaX);
        });
        // Castles
        this.castles.forEach(castle => {
            castle.scroll(deltaX);
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
        this.bushes.forEach(bush => {
            bush.draw();
        });
        // Pipes
        this.pipes.forEach(pipe => {
            pipe.draw();
        });
        // Flag
        this.flag.draw();
        // Castle
        this.castles.forEach(castle => {
            castle.draw();
        });
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
    constructor(parent, spawnLocationX, spawnLocationY) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.frame = 0;
        this.x = spawnLocationX;
        this.xOld = this.x;
        this.y = spawnLocationY;
        this.yOld = this.y;
        this.w = 80;
        this.h = 80;

        this.hitboxOffsetX = 4;
        this.hitboxOffsetTop = 5;

        this.facingLeftYOffset = 240;
        this.xVel = 0;
        this.yVel = 0;
        this.gravity = this.parent.gravity;
        this.jumpForce = 40;
        this.xVelMaxWalk = 10;
        this.xVelMaxSprint = 15;
        this.xVelMax = this.xVelMaxWalk;
        this.sprites = characterSprites;
        this.inAir = true;
        this.facingRight = true;
        this.friction = 0;
        this.frictionGround = 5;
        this.xAccel = 0;
        this.xAccelSprint = 9;
        this.xAccelWalk = 6;
        this.state = {
            current: "normal",
            last: "normal",
            normal: "normal",
            flower: "flower",
            star: "star",
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
            running: [80, 160, 240],
            growing: [
                {sX: 0, sY: 0, h: 160},
                {sX: 1200, sY: 0, h: 160},
                {sX: 0, sY: 160, h: 80},
                {sX: 1200, sY: 0, h: 160},
                {sX: 0, sY: 0, h: 160},
                {sX: 1200, sY: 0, h: 160},
                {sX: 0, sY: 160, h: 80},
            ]
        }
        this.visible = true;
        this.invincibility = 0;
        this.growing = 0;
    }

    jump() {
        this.yVel -= this.jumpForce;
        this.inAir = true;
        this.movement.current = this.movement.jumping;
    }

    die() {
        console.log("You died")
    }

    setHeight(height) {
        if (height == 80 && this.h != 80) {
            this.hitboxOffsetX = 4;
            this.hitboxOffsetTop = 5;
            this.y += 80;
            this.h = 80;
        } else if (height == 160 && this.h != 160) {
            this.hitboxOffsetX = 3;
            this.hitboxOffsetTop = 8;
            this.y -= 80;
            this.h = 160;
        }
    }

    setVelocities() {
        if (this.parent.flagReached || this.growing > 0) return;

        // User wants to move right
        if (this.parent.keyStates.right && !this.parent.keyStates.left) {
            this.facingRight = true;
            if (this.parent.keyStates.sprint) {
                this.xAccel = this.xAccelSprint;
                this.xVelMax = this.xVelMaxSprint;
            } else {
                this.xAccel = this.xAccelWalk;
                this.xVelMax = this.xVelMaxWalk;
            }
        // User wants to move left
        } else if (this.parent.keyStates.left && !this.parent.keyStates.right) {
            this.facingRight = false;
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

        // Add friction
        if (this.xVel > 0) {
            this.friction = this.frictionGround;
        } else if (this.xVel < 0) {
            this.friction = -this.frictionGround;
        } else {
            this.friction = 0;
        }

        // Calculate new x velocity
        this.xVel += this.xAccel - this.friction;

        // Cap x velocity at max value
        if (this.xVel > 0) {
            this.xVel = Math.min(this.xVel, this.xVelMax);
        } else if (this.xVel < 0) {
            this.xVel = Math.max(this.xVel, this.xVelMax);
        }

        // Calculate new y velocity
        this.yVel += this.gravity;

        // When falling off ledge prevent jumping midair
        if (this.yVel > 0) {
            this.inAir = true;
        }
    }

    updatePosition() {
        if (this.growing > 0) return

        if (this.parent.flagReached && this.y + this.h < 920) {
            this.yVel = 5;
            this.xVel = 0;
            this.movement.current = this.movement.crappling;
        } else if (this.parent.flagReached && this.y + this.h >= 1000) {
            this.xVel = 5;
            this.movement.current = this.movement.walking;
        }

        // Calculate new position and store old position
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;
    }

    collision() {
        // Left screen edge
        if (this.x - this.hitboxOffsetX <= 0) {
            this.x = 0 - this.hitboxOffsetX;
        } 

        // Respawn if falling to death (for testing)
        if (this.y > this.parent.screensize.height) {
            this.y = this.parent.screensize.height / 2;
            this.x = 80;
        }

        // Rectangles
        this.parent.world.rectangles.forEach(rectangle => {
            if (rectangle.collision && 
                this.y + this.h > rectangle.top && 
                this.y + this.hitboxOffsetTop < rectangle.bottom && 
                this.x + this.hitboxOffsetX < rectangle.right && 
                this.x + this.w - this.hitboxOffsetX > rectangle.left) {
                // Character entered rectangle from the top
                if (this.y + this.h > rectangle.top && this.yOld + this.h <= rectangle.top) {
                    this.y = rectangle.top - this.h;
                    this.yOld = this.y;
                    this.yVel = 0;
                    this.inAir = false;
                // Character entered rectangle from the left
                } else if (this.x + this.w - this.hitboxOffsetX > rectangle.left && this.xOld + this.w - this.hitboxOffsetX <= rectangle.left) {
                    this.x = rectangle.left - this.w + this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered rectangle from the right
                } else if (this.x + this.hitboxOffsetX < rectangle.right && this.xOld + this.hitboxOffsetX >= rectangle.right) {
                    this.x = rectangle.right - this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered rectangle from the bottom
                } else if (this.y + this.hitboxOffsetTop < rectangle.bottom && this.yOld + this.hitboxOffsetTop >= rectangle.bottom) {
                    this.y = rectangle.bottom - this.hitboxOffsetTop;
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
            if (tile.collision && this.y + this.h > tile.top && 
                this.y + this.hitboxOffsetTop < tile.bottom && 
                this.x + this.hitboxOffsetX < tile.right && 
                this.x + this.w - this.hitboxOffsetX > tile.left) {
                // Character entered tile from the top
                if (!tile.secret && this.y + this.h > tile.top && this.yOld + this.h <= tile.top) {
                    this.y = tile.top - this.h;
                    this.yOld = this.y;
                    this.yVel = 0;
                    this.inAir = false;
                // Character entered tile from the left
                } else if (!tile.secret && this.x + this.w - this.hitboxOffsetX > tile.left && this.xOld + this.w - this.hitboxOffsetX <= tile.left) {
                    this.x = tile.left - this.w + this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered tile from the right
                } else if (!tile.secret && this.x + this.hitboxOffsetX < tile.right && this.xOld + this.hitboxOffsetX >= tile.right) {
                    this.x = tile.right - this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered tile from the bottom
                } else if (this.y + this.hitboxOffsetTop < tile.bottom && this.yOld + this.hitboxOffsetTop >= tile.bottom) {
                    this.y = tile.bottom - this.hitboxOffsetTop;
                    this.yOld = this.y;
                    this.yVel = 0;

                    if (tile.type === "breakableShiny" && !tile.itemType && this.h == 160) {
                        tile.type = "blank";
                        tile.collision = false;
                        tile.updateSpriteOffsets();
                        this.parent.spawnItem(tile.x - this.blocksize / 2, tile.y - this.blocksize / 2, tile.theme, "brokenTileTopLeft");
                        this.parent.spawnItem(tile.x + this.blocksize / 2, tile.y - this.blocksize / 2, tile.theme, "brokenTileTopRight");
                        this.parent.spawnItem(tile.x - this.blocksize / 2, tile.y + this.blocksize / 2, tile.theme, "brokenTileBottomLeft");
                        this.parent.spawnItem(tile.x + this.blocksize / 2, tile.y + this.blocksize / 2, tile.theme, "brokenTileBottomRight");
                    }

                    if (tile.itemType) {
                        // Spawn flower instead of mushroom if we are big
                        if (tile.itemType === "mushroom" && this.h !== 80) {
                            this.parent.spawnItem(tile.x, tile.y - this.blocksize, tile.itemTheme, "flower", true);
                        } else {
                            this.parent.spawnItem(tile.x, tile.y - this.blocksize, tile.itemTheme, tile.itemType, true);
                        }

                        tile.content--;
                        if (tile.content === 0) {
                            tile.type = "disabled";
                            tile.updateSpriteOffsets()
                            tile.animate = false;
                            tile.itemTheme = null;
                            tile.itemType = null;
                        }
                    }
                }
            }
        });

        // Pipes
        this.parent.world.pipes.forEach(pipe => {
            if (pipe.opening === "top") {
                if (this.y + this.h > pipe.y && this.y < pipe.y + pipe.size * this.blocksize && this.x < pipe.x + 2 * this.blocksize && this.x + this.w > pipe.x) {
                    // Character entered pipe from the top
                    if (this.y + this.h > pipe.y && this.yOld + this.h <= pipe.y) {
                        if (pipe.canEnter &&
                            this.parent.keyStates.down && !this.parent.keyStates.up && 
                            this.x > pipe.x + this.blocksize * .25 && 
                            this.x + this.w < pipe.x + 2 * this.blocksize - this.blocksize * .25) {
                            console.log("wants to enter pipe")
                        }
                        this.y = pipe.y - this.h;
                        this.yOld = this.y;
                        this.yVel = 0;
                        this.inAir = false;
                    // Character entered pipe from the left
                    } else if (this.x + this.w > pipe.x && this.xOld + this.w <= pipe.x) {
                        this.x = pipe.x - this.w;
                        this.xOld = this.x;
                        this.xVel = 0;
                    // Character entered pipe from the right
                    } else if (this.x < pipe.x + 2 * this.blocksize && this.xOld >= pipe.x + 2 * this.blocksize) {
                        this.x = pipe.x + 2 * this.blocksize;
                        this.xOld = this.x;
                        this.xVel = 0;
                    // Character entered pipe from the bottom
                    } else if (this.y < pipe.y + pipe.size * this.blocksize && this.yOld >= pipe.y + pipe.size * this.blocksize) {
                        this.y = pipe.y + pipe.size * this.blocksize;
                        this.yOld = this.y;
                        this.yVel = 0;
                    }
                }
            }
        });

        // Items
        this.parent.items.forEach(item => {
            if (item.collision && this.y + this.h > item.y && this.y < item.y + this.blocksize && this.x < item.x + this.blocksize && this.x + this.w > item.x) {
                item.activate();
                item.destroy();
            }
        });

        // Flag
        if (this.x + this.w - this.hitboxOffsetX > this.parent.world.flag.x && !this.parent.flagReached) {
            if (this.y + this.h > 920) {
                this.x = this.parent.world.flag.x - this.w + this.hitboxOffsetX;
                this.xOld = this.x;
                this.xVel = 0;
            } else {
                this.parent.flagReached = true;
                this.x = this.parent.world.flag.x;
            }
        }

        // Level end line
        if (this.x + this.w > this.parent.world.levelEndLine) {
            this.visible = false;
        }
    }

    setMovement() {
        if (this.growing > 0) return
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
        if (this.growing > 0) {
            if (this.parent.frame % 10 == 0) {
                this.sX = this.frames.growing[this.growing - 1].sX;
                this.sY = this.frames.growing[this.growing - 1].sY;
                this.setHeight(this.frames.growing[this.growing - 1].h);

                // In which direction is the player looking
                if (!this.facingRight) {
                    this.sY += this.facingLeftYOffset;
                }
                this.growing--;
            }

            return;
        }

        if (this.state.current === this.state.normal) {
            if (this.h == 80) {
                this.sY = 160;
            } else {
                this.sY = 0;
            }
        } else if (this.state.current === this.state.flower) {
            if (this.h == 80) {
                this.sY = 1120;
            } else {
                this.sY = 960;
            }
        } else if (this.state.current === this.state.star) {
            if (this.parent.frame % 10 == 0) {
                this.invincibility--;
                if (this.invincibility == 0) {
                    this.state.current = this.state.last;
                }
            }
            if (this.h == 80) {
                this.sY = 1600 + this.invincibility % 3 * 480;
            } else {
                this.sY = 1440 + this.invincibility % 3 * 480;
            }
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

        // In which direction is the player looking
        if (!this.facingRight) {
            this.sY += this.facingLeftYOffset;
        }
    }

    update() {
        this.setVelocities();
        this.updatePosition();
        this.collision();
        this.setMovement();
        this.setSprite();
    }

    scroll(deltaX) {
        this.x -= deltaX;
    }

    draw() {
        if (this.visible) {
            ctx.drawImage(this.sprites, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}

class Enemy {
    
}

class Item {
    constructor (parent, x, y, theme, type, collision=false) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = this.parent.gravity;
        this.x = x;
        this.xOld = this.x;
        this.y = y;
        this.yOld = this.y;
        this.theme = theme;
        this.type = type;
        this.collision = collision;
        this.sprites = objectSprites;
        this.sX = objectThemeOffsetMap[this.theme] + objectTypeOffsetMap[this.type].x;
        this.sY = objectTypeOffsetMap[this.type].y;
        this.animate = animateSequences[this.type];
        this.xVel = objectVelTable[this.type].xVel;
        this.yVel = objectVelTable[this.type].yVel;
        this.lifetime = 20;

        if (this.animate) {
            this.frame = 0;
            this.sequence = animateSequences[this.type];
        }
    }

    activate() {
        if (this.type === "mushroom" || this.type === "flower" && this.parent.character.h === 80) {
            this.parent.character.growing = this.parent.character.frames.growing.length;
        } else if (this.type === "flower" && this.parent.character.h === 160) {
            this.parent.character.state.current = this.parent.character.state.flower;
        } else if (this.type === "1up") {
            this.parent.lives += 1;
        } else if (this.type === "star") {
            this.parent.character.state.last = this.parent.character.state.current;
            this.parent.character.state.current = this.parent.character.state.star;
            this.parent.character.invincibility = 60;
        }
    }

    destroy() {
        const itemIndex = this.parent.items.indexOf(this);
        this.parent.items.splice(itemIndex, 1)
    }

    update() {
        // Update sprite
        if (this.animate) {
            if (this.type === "coinItem") {
                this.lifetime--;
    
                if (this.lifetime < 0) {
                    this.destroy();
                }
            }

            if (this.parent.frame % 10 === 0) {
                this.frame = (this.frame + 1) % this.sequence.length;
                this.sX = this.sequence[this.frame];
            }
        }

        // Update position
        this.yVel += this.gravity;
        
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;

        // Collision
        // Screen edges
        if (this.x + this.blocksize < 0 || this.x > this.parent.screensize.width || this.y > this.parent.screensize.height) {
            this.destroy();
        }

        if (!this.collision) return
        
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

        // Pipes
        this.parent.world.pipes.forEach(pipe => {
            if (pipe.opening === "top") {
                if (this.y + this.blocksize > pipe.y && this.y < pipe.y + pipe.size * this.blocksize && this.x < pipe.x + 2 * this.blocksize && this.x + this.blocksize > pipe.x) {
                    // Character entered pipe from the top
                    if (this.y + this.blocksize > pipe.y && this.yOld + this.h <= pipe.y) {
                        this.y = pipe.y - this.blocksize;
                        this.yOld = this.y;
                        this.yVel = 0;
                    // Character entered pipe from the left
                    } else if (this.x + this.blocksize > pipe.x && this.xOld + this.blocksize <= pipe.x) {
                        this.x = pipe.x - this.blocksize;
                        this.xOld = this.x;
                        this.xVel *= -1;
                    // Character entered pipe from the right
                    } else if (this.x < pipe.x + 2 * this.blocksize && this.xOld >= pipe.x + 2 * this.blocksize) {
                        this.x = pipe.x + 2 * this.blocksize;
                        this.xOld = this.x;
                        this.xVel *= -1;
                    // Character entered pipe from the bottom
                    } else if (this.y < pipe.y + pipe.size * this.blocksize && this.yOld >= pipe.y + pipe.size * this.blocksize) {
                        this.y = pipe.y + pipe.size * this.blocksize;
                        this.yOld = this.y;
                        this.yVel = 0;
                    }
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
            sprint: false,
            up: false,
            down: false
        };
        this.lives = 3;
        this.ignoreInput = false;
        this.currentWorld = 11;
        this.gravity = worldData[this.currentWorld].gravity;
        this.blocksize = 80;
        this.scrollLine = this.screensize.width / 2;

        this.character = new Character(this, worldData[this.currentWorld].spawnLocation.x, worldData[this.currentWorld].spawnLocation.y);
        this.world = new World(this, this.currentWorld);

        this.flagReached = false;

        this.items = [];
    }

    enableInput() {
        this.ignoreInput = false;
    }

    disableInput() {
        this.ignoreInput = true;
    }

    spawnItem(x, y, theme, type, collision) {
        this.items.push(new Item(this, x, y, theme, type, collision));
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
    } else if (e.keyCode === 38) {
        game.keyStates.up = true;
    } else if (e.keyCode === 39) {
        game.keyStates.right = true;
    } else if (e.keyCode === 40) {
        game.keyStates.down = true; 
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
    } else if (e.keyCode === 38) {
        game.keyStates.up = false;
    } else if (e.keyCode === 39) {
        game.keyStates.right = false;
    } else if (e.keyCode === 40) {
        game.keyStates.down = false;
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