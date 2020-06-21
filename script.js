const cvs = document.querySelector("#game-canvas");
const ctx = cvs.getContext("2d");
const page = document.documentElement;

const GAME_VOLUME = 0.2;

const characterSprites = new Image();
characterSprites.src = "sprites/character.png";

const tileSprites = new Image();
tileSprites.src = "sprites/tiles.png";

const objectSprites = new Image();
objectSprites.src = "sprites/objects.png";

const enemySprites = new Image();
enemySprites.src = "sprites/enemies.png";

const spriteOffsets = {
    tiles: {
        theme: {
            overworld: {x: 0, y: 0,},
            underworld: {x: 0, y: 480},
            castle: {x: 0, y: 960},
            water: {x: 0, y: 1840},
            orange: {x:0 , y: 2320}
        },
        type: {
            floor: {x: 0, y: 0},
            blockShiny: {x: 80, y: 0},
            block: {x: 160, y: 0},
            disabled: {x: 240, y: 0},
            cannonTop: {x: 720, y: 0},
            castleTop: {x: 880, y: 0},
            castleWindowsLeft: {x: 960, y: 0},
            castleWall: {x: 1040, y: 0},
            castleWindowsRight: {x: 1120, y: 0},
            questionBlock: {x: 1920, y: 0},
            flagSail: {x: 2240, y: 0},
            multiCoinBlock: {x: 2320, y: 0},
            secret: {x: 2400, y: 0},
            stair: {x: 0, y: 80},
            solid: {x: 160, y: 80},
            treeStump: {x: 400, y: 80},
            cannonBottom: {x: 720, y: 80},
            castleSemiTop: {x: 880, y: 80},
            castleDoorTop: {x: 960, y: 80},
            castleDoorBottom: {x: 1040, y: 80},
            flagTopAlt: {x: 1120, y: 80},
            coinTile: {x: 1920, y: 80},
            axe: {x: 2160, y: 80},
            pipeVerticalTopLeft: {x: 0, y: 160},
            pipeVerticalTopRight: {x: 80, y: 160},
            pipeHorizontalTopLeft: {x: 160, y: 160},
            pipeHorizontalTop: {x: 240, y: 160},
            pipeConnectorTopLeft: {x: 320, y: 160},
            platformLeafLeft: {x: 400, y: 160},
            platformLeaf: {x: 480, y: 160},
            platformLeafRight: {x: 560, y: 160},
            hillSlopeLeft: {x: 640, y: 160},
            hillTop: {x: 720, y: 160},
            hillSlopeRight: {x: 800, y: 160},
            bridgeRope: {x: 960, y: 160},
            flagTop: {x: 1280, y: 160},
            platformBushLeft: {x: 1360, y: 160},
            platformBush: {x: 1440, y: 160},
            platformBushRight: {x: 1520, y: 160},
            bushyhillSlopeLeft: {x: 1600, y: 160},
            bushyhillTop: {x: 1680, y: 160},
            bushyhillSlopeRight: {x: 1760, y: 160},
            pipeVerticalLeft: {x: 0, y: 240},
            pipeVerticalRight: {x: 80, y: 240},
            pipeHorizontalBottomLeft: {x: 160, y: 240},
            pipeHorizontalBottom: {x: 240, y: 240},
            pipeConnectorBottomLeft: {x: 320, y: 240},
            platformMushroomLeft: {x: 400, y: 240},
            platformMushroom: {x: 480, y: 240},
            platformMushroomRight: {x: 560, y: 240},
            hillFillingWithDotsRight: {x: 640, y: 240},
            hillFilling: {x: 720, y: 240},
            hillFillingWithDotsLeft: {x: 800, y: 240},
            bushLeft: {x: 880, y: 240},
            bush: {x: 960, y: 240},
            bushRight: {x: 1040, y: 240},
            flagPole: {x: 1280, y: 240},
            bushyhillFillingWithDotsRight: {x: 1600, y: 240},
            bushyhillFilling: {x: 1680, y: 240},
            bushyhillFillingWithDotsLeft: {x: 1760, y: 240},
            cloudTopLeft: {x: 0, y: 320},
            cloudTop: {x: 80, y: 320},
            cloudTopRight: {x: 160, y: 320},
            waterTop: {x: 240, y: 320},
            bridge: {x: 320, y: 320},
            cloudBottomLeft: {x: 0, y: 400},
            cloudBottom: {x: 80, y: 400},
            cloudBottomRight: {x: 160, y: 400},
            water: {x: 240, y: 400},
        }
    },
    objects: {
        theme: {
            overworld: {x: 0, y: 0},
            underworld: {x: 720, y: 0},
            castle: {x: 1440, y: 0},
            water: {x: 2160, y: 0}
        },
        type: {
            magicMushroom: {
                x: 0,
                y: 0
            },
            oneUp: {
                x: 80,
                y: 0
            },
            fireFlower: {
                x: 0,
                y: 160
            },
            coinItem: {
                x: 0,
                y: 560
            },
            starman: {
                x: 0,
                y: 240
            },
            brokenTileTopLeft: {
                x: 320,
                y: 160
            },
            brokenTileTopRight: {
                x: 320,
                y: 80
            },
            brokenTileBottomLeft: {
                x: 320,
                y: 80
            },
            brokenTileBottomRight: {
                x: 320,
                y: 160
            },
            flagMovingPiece: {
                x: 640,
                y: 160
            }
        }
    },
    enemies: {
        theme: {
            overworld: {x: 0, y: 0},
            underworld: {x: 0, y: 320},
            castle: {x: 0, y: 640},
            water: {x: 0, y: 960}
        },
        type: {
            goomba: {x: 0, y: 80},
            koopaTroopa: {x: 480, y: 0},
            koopaParatroopa: {x: 640, y: 0},
            shell: {x: 800, y: 80}
        }
    }
}

const objectVelTable = {
    magicMushroom: {xVel: 3, yVel: -10,},
    oneUp: {xVel: 3, yVel: -10,},
    coinItem: {xVel: 0, yVel: -20},
    fireFlower: {xVel: 0, yVel: 0},
    starman: {xVel: 0, yVel: 0},
    brokenTileTopLeft: {xVel: -2, yVel: -10},
    brokenTileTopRight: {xVel: 2, yVel: -10},
    brokenTileBottomLeft: {xVel: -2, yVel: -10},
    brokenTileBottomRight: {xVel: 2, yVel: -10}
}

const castles = {
    "small": {
        w: 5,
        tiles: [
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
        ],
    },
    "rectangle5doors": {
        w: 9,
        tiles: [
            {x: 0, y: 0, type: "castleTop"},
            {x: 80, y: 0, type: "castleTop"},
            {x: 160, y: 0, type: "castleSemiTop"},
            {x: 240, y: 0, type: "castleSemiTop"},
            {x: 320, y: 0, type: "castleSemiTop"},
            {x: 400, y: 0, type: "castleSemiTop"},
            {x: 480, y: 0, type: "castleSemiTop"},
            {x: 560, y: 0, type: "castleTop"},
            {x: 640, y: 0, type: "castleTop"},

            {x: 0, y: 80, type: "castleWall"},
            {x: 80, y: 80, type: "castleWall"},
            {x: 160, y: 80, type: "castleWall"},
            {x: 240, y: 80, type: "castleDoorTop"},
            {x: 320, y: 80, type: "castleWall"},
            {x: 400, y: 80, type: "castleDoorTop"},
            {x: 480, y: 80, type: "castleWall"},
            {x: 560, y: 80, type: "castleWall"},
            {x: 640, y: 80, type: "castleWall"},

            {x: 0, y: 160, type: "castleWall"},
            {x: 80, y: 160, type: "castleWall"},
            {x: 160, y: 160, type: "castleWall"},
            {x: 240, y: 160, type: "castleDoorBottom"},
            {x: 320, y: 160, type: "castleWall"},
            {x: 400, y: 160, type: "castleDoorBottom"},
            {x: 480, y: 160, type: "castleWall"},
            {x: 560, y: 160, type: "castleWall"},
            {x: 640, y: 160, type: "castleWall"},

            {x: 0, y: 240, type: "castleWall"},
            {x: 80, y: 240, type: "castleWall"},
            {x: 160, y: 240, type: "castleWall"},
            {x: 240, y: 240, type: "castleWall"},
            {x: 320, y: 240, type: "castleWall"},
            {x: 400, y: 240, type: "castleWall"},
            {x: 480, y: 240, type: "castleWall"},
            {x: 560, y: 240, type: "castleWall"},
            {x: 640, y: 240, type: "castleWall"},

            {x: 0, y: 320, type: "castleWall"},
            {x: 80, y: 320, type: "castleWall"},
            {x: 160, y: 320, type: "castleDoorTop"},
            {x: 240, y: 320, type: "castleWall"},
            {x: 320, y: 320, type: "castleDoorTop"},
            {x: 400, y: 320, type: "castleWall"},
            {x: 480, y: 320, type: "castleDoorTop"},
            {x: 560, y: 320, type: "castleWall"},
            {x: 640, y: 320, type: "castleWall"},

            {x: 0, y: 400, type: "castleWall"},
            {x: 80, y: 400, type: "castleWall"},
            {x: 160, y: 400, type: "castleDoorBottom"},
            {x: 240, y: 400, type: "castleWall"},
            {x: 320, y: 400, type: "castleDoorBottom"},
            {x: 400, y: 400, type: "castleWall"},
            {x: 480, y: 400, type: "castleDoorBottom"},
            {x: 560, y: 400, type: "castleWall"},
            {x: 640, y: 400, type: "castleWall"},
        ]
    }
}

const enemyProperties = {
    "goomba": {
        w: 80,
        h: 80,
        hitboxOffsetX: 20,
        hitboxOffsetTop: 30,
        hitboxOffsetBottom: 25,
        xVel: 5,
        yVel: 0,
        stompable: true,
        shootable: true,
    },
    "koopaTroopa": {
        w: 80,
        h: 160,
        hitboxOffsetX: 15,
        hitboxOffsetTop: 85,
        hitboxOffsetBottom: 20,
        xVel: 5,
        yVel: 0,
        stompable: true,
        shootable: true,
    },
    "koopaParatroopa": {
        w: 80,
        h: 160,
        hitboxOffsetX: 15,
        hitboxOffsetTop: 85,
        hitboxOffsetBottom: 20,
        xVel: 3,
        yVel: 5,
        stompable: true,
        shootable: true,
    },
    "shell": {
        w: 80,
        h: 80,
        hitboxOffsetX: 15,
        hitboxOffsetTop: 5,
        hitboxOffsetBottom: 20,
        xVel: 0,
        yVel: 0,
        stompable: true,
        shootable: true,
    }
}

//TODO: Add piranha to all levels
const worldData = {
    11: {
        theme: "overworld",
        spawnLocation: {
            x: 160,
            y: 680
        },
        bg: "#63adfe",
        width: 16960,
        levelEndLine: 16400,
        gravity: 2.15,
        music: "overworld",
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 69},
                {x: 5680, y: 1000, w: 15},
                {x: 7120, y: 1000, w: 64},
                {x: 12400, y: 1000, w: 57},
                {x: 6400, y: 360, w: 8, type: "blockShiny", collision: true, individualCheck: true},
                {x: 7280, y: 360, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 9680, y: 360, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 10320, y: 680, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 12160, y: 680, h: 4, type: "stair", collision: true},
                {x: 13440, y: 680, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 15120, y: 360, h: 8, type: "stair", collision: true},
            ],
            steps : [
                {x: 10720, y: 680, w: 4},
                {x: 11200, y: 680, w: 4, reversed: true},
                {x: 11840, y: 680, w: 4},
                {x: 12400, y: 680, w: 4, reversed: true},
                {x: 14480, y: 360, w: 8},
            ],
            tiles: [
                {x: 1280, y: 680, type: "questionBlock"},
                {x: 1600, y: 680, type: "blockShiny", collision: true},
                {x: 1680, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 1760, y: 360, type: "questionBlock"},
                {x: 1760, y: 680, type: "blockShiny", collision: true},
                {x: 1840, y: 680, type: "questionBlock"},
                {x: 1920, y: 680, type: "blockShiny", collision: true},
                {x: 5120, y: 600, type: "secret", item: {type: "oneUp"}},
                {x: 6160, y: 680, type: "blockShiny", collision: true},
                {x: 6240, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 6320, y: 680, type: "blockShiny", collision: true},
                {x: 7520, y: 360, type: "questionBlock"},
                {x: 7520, y: 680, type: "multiCoinBlock"},
                {x: 8000, y: 680, type: "blockShiny", collision: true},
                {x: 8080, y: 680, type: "blockShiny", collision: true, item: {type: "starman"}},
                {x: 8480, y: 680, type: "questionBlock"},
                {x: 8720, y: 680, type: "questionBlock"},
                {x: 8720, y: 360, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 8960, y: 680, type: "questionBlock"},
                {x: 9440, y: 680, type: "blockShiny", collision: true},
                {x: 10240, y: 360, type: "blockShiny", collision: true},
                {x: 10320, y: 360, type: "questionBlock"},
                {x: 10400, y: 360, type: "questionBlock"},
                {x: 10480, y: 360, type: "blockShiny", collision: true},
                {x: 13600, y: 680, type: "questionBlock"},
                {x: 13680, y: 680, type: "blockShiny", collision: true},
            ],
            hills: [
                {x: 0, y: 760, h: 3}, 
                {x: 1280, y: 840, h: 2}, 
                {x: 3840, y: 760, h: 3}, 
                {x: 5120, y: 840, h: 2}, 
                {x: 7680, y: 760, h: 3}, 
                {x: 8960, y: 840, h: 2}, 
                {x: 11520, y: 760, h: 3}, 
                {x: 12800, y: 840, h: 2}, 
                {x: 15360, y: 760, h: 3}, 
                {x: 16640, y: 840, h: 2}
            ],
            clouds: [
                {x: 640, y: 200},
                {x: 1520, y: 120},
                {x: 2160, y: 200, amount: 3},
                {x: 2880, y: 120, amount: 2},
                {x: 4480, y: 200},
                {x: 5360, y: 120},
                {x: 6000, y: 200, amount: 3},
                {x: 6720, y: 120, amount: 2},
                {x: 8320, y: 200},
                {x: 9200, y: 120},
                {x: 9840, y: 200, amount: 3},
                {x: 10560, y: 120, amount: 2},
                {x: 12160, y: 200},
                {x: 13040, y: 120},
                {x: 13680, y: 200, amount: 3},
                {x: 14400, y: 120, amount: 2},
                {x: 16000, y: 200},
            ],
            bushes: [
                {x: 880, y: 920, amount: 3},
                {x: 1840, y: 920},
                {x: 3280, y: 920, amount: 2},
                {x: 4720, y: 920, amount: 3},
                {x: 5680, y: 920},
                {x: 7120, y: 920, amount: 2},
                {x: 8560, y: 920, amount: 3},
                {x: 9520, y: 920},
                {x: 10960, y: 920, amount: 2},
                {x: 12560, y: 920},
                {x: 13360, y: 920},
                {x: 16400, y: 920},
            ],
            pipes: [
                {x: 2240, y: 840},
                {x: 3040, y: 760, size: 3},
                {x: 3680, y: 680, size: 4},
                {x: 4560, y: 680, size: 4, destination: {worldID: 111, scrollOffset: null, spawnLocation: null, transitionType: null}},
                {x: 13040, y: 840},
                {x: 14320, y: 840},
            ],
            enemies: [
                {x: 1760, y: 920},
                {x: 3200, y: 920},
                {x: 4080, y: 920},
                {x: 4200, y: 920},
                {x: 6400, y: 280},
                {x: 6560, y: 280},
                {x: 7760, y: 920},
                {x: 7880, y: 920},
                {x: 8560, y: 840, type: "koopaTroopa"},
                {x: 9120, y: 920},
                {x: 9240, y: 920},
                {x: 9920, y: 920},
                {x: 10040, y: 920},
                {x: 10240, y: 920},
                {x: 10360, y: 920},
                {x: 13920, y: 920},
                {x: 14040, y: 920},
            ],
            castles: [
                {x: 16160, y: 600}
            ],
            flags: [
                {x: 15840, y: 120, destination: {worldID: 121, scrollOffset: null, transitionType: "cutscene1"}},
            ]
        }
    },
    111: {
        theme: "underworld",
        spawnLocation: {
            x: 480,
            y: 120
        },
        bg: "#000000",
        width: 1920,
        gravity: 2.15,
        //TODO: Which music is playing here?
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 24},
                {x: 0, y: 120, w: 5, h: 11, type: "block", collision: true},
                {x: 640, y: 120, w: 7, type: "block", collision: true},
                {x: 640, y: 760, w: 7, h: 3, type: "block", collision: true},
                
                {x: 1520, y: 120, w: 1, h: 9, type: "pipeVerticalLeft", collision: true},
                {x: 1600, y: 120, w: 1, h: 11, type: "pipeVerticalRight", collision: true},
                
                {x: 1680, y: 120, w: 3, h: 11, type: "block", collision: true},
            ],
            tiles: [
                {x: 1520, y: 840, type: "pipeConnectorTopLeft"},
                {x: 1520, y: 920, type: "pipeConnectorBottomLeft"},
            ],
            pipes: [
                {x: 1360, y: 840, opening: "left", destination: {worldID: 11, scrollOffset: 12400, spawnLocation: {x: 680, y: 1000}, transitionType: "pipeOutTop"}},
            ],
            coins: [
                {x: 720, y: 340},
                {x: 800, y: 340},
                {x: 880, y: 340},
                {x: 960, y: 340},
                {x: 1040, y: 340},
                
                {x: 640, y: 500},
                {x: 720, y: 500},
                {x: 800, y: 500},
                {x: 880, y: 500},
                {x: 960, y: 500},
                {x: 1040, y: 500},
                {x: 1120, y: 500},
                
                {x: 640, y: 660},
                {x: 720, y: 660},
                {x: 800, y: 660},
                {x: 880, y: 660},
                {x: 960, y: 660},
                {x: 1040, y: 660},
                {x: 1120, y: 660},
            ],
        }
    },
    12: {
        theme: "underworld",
        spawnLocation: {
            x: 160,
            y: 160
        },
        bg: "#000000",
        width: 15360,
        levelEndLine: null,
        gravity: 2.15,
        music: "underworld",
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 81},
                {x: 6640, y: 1000, w: 37},
                {x: 9760, y: 1000, w: 2},
                {x: 10080, y: 1000, w: 12},
                {x: 11600, y: 1000, w: 8},
                {x: 12800, y: 1000, w: 32},

                {x: 480, y: 120, w: 83, type: "block", collision: true, individualCheck: true},
                {x: 7200, y: 120, w: 48, type: "block", collision: true, individualCheck: true},
                {x: 12880, y: 120, w: 7, type: "block", collision: true, individualCheck: true},

                {x: 0, y: 120, h: 11, type: "block", collision: true},
                {x: 1520, y: 840, h: 2, type: "stair", collision: true},
                {x: 1680, y: 760, h: 3, type: "stair", collision: true},
                {x: 1840, y: 680, h: 4, type: "stair", collision: true},
                {x: 2000, y: 680, h: 4, type: "stair", collision: true},
                {x: 2160, y: 760, h: 3, type: "stair", collision: true},
                {x: 2480, y: 760, h: 3, type: "stair", collision: true},
                {x: 2640, y: 840, h: 2, type: "stair", collision: true},
                {x: 10960, y: 680, h: 4, type: "stair", collision: true},
                
                {x: 4160, y: 360, w: 2, h: 5, type: "block", collision: true, individualCheck: true},
                {x: 4320, y: 200, w: 2, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 4320, y: 680, w: 2, h: 3, type: "block", collision: true, individualCheck: true},
                {x: 4640, y: 200, w: 6, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 4960, y: 360, w: 2, h: 4, type: "block", collision: true, individualCheck: true},
                {x: 4640, y: 680, w: 6, type: "block", collision: true, individualCheck: true},
                {x: 5280, y: 200, w: 4, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 5360, y: 360, h: 4, type: "block", collision: true, individualCheck: true},
                {x: 5360, y: 680, w: 3, type: "block", collision: true, individualCheck: true},
                {x: 5760, y: 360, w: 2, h: 3, type: "block", collision: true, individualCheck: true},
                {x: 5760, y: 680, w: 2, type: "block", collision: true, individualCheck: true},
                {x: 6080, y: 200, w: 4, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 6080, y: 680, w: 4, type: "block", collision: true, individualCheck: true},
                {x: 6720, y: 520, w: 6, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 9760, y: 760, w: 2, h: 3, type: "block", collision: true},
                {x: 11600, y: 600, w: 5, type: "block", collision: true, individualCheck: true},
    
                {x: 12800, y: 760, w: 10, h: 3, type: "block", collision: true},
                {x: 13600, y: 120, w: 7, h: 11, type: "block", collision: true},
                {x: 14160, y: 120, w: 10, h: 1, type: "block", collision: true},
                {x: 15200, y: 120, w: 2, h: 11, type: "block", collision: true},
                
                {x: 13440, y: 120, h: 6, type: "pipeVerticalLeft", collision: true},
                {x: 13520, y: 120, h: 8, type: "pipeVerticalRight", collision: true},
            ],
            steps: [
                {x: 10640, y: 680, w: 4, h: 4},
            ],
            tiles: [
                {x: 800, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 880, y: 680, type: "questionBlock"},
                {x: 960, y: 680, type: "questionBlock"},
                {x: 1040, y: 680, type: "questionBlock"},
                {x: 1120, y: 680, type: "questionBlock"},
    
                {x: 1360, y: 920, type: "stair", collision: true},
                
                {x: 2320, y: 600, type: "multiCoinBlock"},
                
                {x: 3120, y: 520, type: "block", collision: true},
                {x: 3120, y: 600, type: "block", collision: true},
                {x: 3120, y: 680, type: "block", collision: true},
    
                {x: 3200, y: 680, type: "block", collision: true},
                
                {x: 3280, y: 520, type: "block", collision: true},
                {x: 3280, y: 600, type: "block", collision: true},
                {x: 3280, y: 680, type: "block", collision: true},
                
                {x: 3360, y: 520, type: "block", collision: true},
                {x: 3440, y: 520, type: "block", collision: true},
                
                {x: 3520, y: 520, type: "block", collision: true},
                {x: 3520, y: 600, type: "block", collision: true},
                {x: 3520, y: 680, type: "block", collision: true},
                
                {x: 3600, y: 680, type: "block", collision: true},
                
                {x: 3680, y: 520, type: "block", collision: true, item: {type: "starman"}},
                {x: 3680, y: 600, type: "block", collision: true},
                {x: 3680, y: 680, type: "block", collision: true},
                
                {x: 5520, y: 600, type: "block", collision: true, item: {type: "magicMushroom"}},
                {x: 5760, y: 600, type: "block", collision: true},
                {x: 5840, y: 600, type: "multiCoinBlock"},
                
                {x: 7120, y: 120, type: "block", collision: true, item: {type: "oneUp"}},
                
                {x: 12000, y: 600, type: "block", collision: true, item: {type: "magicMushroom"}},
    
                {x: 13440, y: 600, type: "pipeConnectorTopLeft"},
                {x: 13440, y: 680, type: "pipeConnectorBottomLeft"},
            ],
            pipes: [
                {x: 8240, y: 760, size: 3, destination: {worldID: 122}},
                {x: 8720, y: 680, size: 4},
                {x: 9200, y: 840},
                {x: 13280, y: 600, opening: "left", destination: {worldID: 123, transitionType: "pipeOutTop"}},
                {x: 14240, y: 760, size: 3, destination: {worldID: 41}},
                {x: 14560, y: 760, size: 3, destination: {worldID: 31}},
                {x: 14880, y: 760, size: 3, destination: {worldID: 21}},
            ],
            coins: [
                {x: 3200, y: 600},
                {x: 3280, y: 360},
                {x: 3360, y: 360},
                {x: 3440, y: 360},
                {x: 3520, y: 360},
                {x: 3600, y: 600},
                
                {x: 4640, y: 600},
                {x: 4720, y: 600},
                {x: 4800, y: 600},
                {x: 4880, y: 600},
                
                {x: 5440, y: 600},
                
                {x: 6720, y: 360},
                {x: 6800, y: 360},
                {x: 6880, y: 360},
                {x: 6960, y: 360},
                {x: 7040, y: 360},
                {x: 7120, y: 360},
            ],
            elevatorPlatforms: [
                {x: 11200, y: 520, w: 3, movementType: "down"},
                {x: 11200, y: 1000, w: 3, movementType: "down"},
                {x: 12400, y: 40, w: 3, movementType: "up"},
                {x: 12400, y: 680, w: 3, movementType: "up"},
            ],
            enemies: [
                {x: 1280, y: 920},
                {x: 1360, y: 840},
                {x: 2320, y: 920},
                {x: 3520, y: 840, type: "koopaTroopa"},
                {x: 3640, y: 840, type: "koopaTroopa"},
                {x: 4720, y: 840, type: "koopaTroopa"},
                {x: 4960, y: 920},
                {x: 5120, y: 920},
                {x: 5840, y: 280},
                {x: 6080, y: 600},
                {x: 6200, y: 600},
                {x: 7920, y: 920},
                {x: 8040, y: 920},
                {x: 8160, y: 920},
                {x: 9040, y: 920},
                {x: 10800, y: 600},
                {x: 10920, y: 600},
                {x: 11680, y: 840, theme: "castle", type: "koopaTroopa"},
            ]

        }
    },
    121: {
        theme: "overworld",
        spawnLocation: {
            x: 480,
            y: 1000
        },
        bg: "#63adfe",
        width: 1920,
        gravity: 2.15,
        music: "overworld",
        worldElements: {
            clouds: [
                {x: 560, y: 200, amount: 2},
                {x: 1040, y: 520},
            ],
            rectangles: [
                {x: 0, y: 1000, w: 24},
                {x: 1360, y: 840, h: 2, type: "pipeVerticalRight"}
            ],
            tiles: [
                {x: 1280, y: 840, type: "pipeConnectorTopLeft"},
                {x: 1280, y: 920, type: "pipeConnectorBottomLeft"},
            ],
            pipes: [
                {x: 1120, y: 840, opening: "left"},
                {x: 1280, y: 680},
            ],
            castles: [
                {x: 320, y: 600}
            ]
        }
    },
    122: {
        theme: "underworld",
        spawnLocation: {
            x: 440,
            y: 120
        },
        bg: "#000000",
        gravity: 2.15,
        music: "underworld",
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 24},
                {x: 0, y: 120, w: 5, h: 11, type: "block", collision: true},
                {x: 560, y: 120, w: 10, h: 4, type: "block", collision: true, individualCheck: true},
                {x: 560, y: 680, w: 9, h: 1, type: "block", collision: true, individualCheck: true},
                {x: 1360, y: 120, w: 2, h: 9, type: "block", collision: true},
                {x: 1680, y: 120, w: 3, h: 11, type: "block", collision: true},
                {x: 1520, y: 120, h: 9, type: "pipeVerticalLeft"},
                {x: 1600, y: 120, h: 11, type: "pipeVerticalRight"},
            ],
            tiles: [
                {x: 1520, y: 840, type: "pipeConnectorTopLeft"},
                {x: 1520, y: 920, type: "pipeConnectorBottomLeft"},
                {x: 1280, y: 680, type: "multiCoinBlock"},
            ],
            pipes: [
                {x: 1360, y: 840, opening: "left", destination: { worldID: 12, scrollOffset: 8880, spawnLocation: {x: 360, y: 1000}, transitionType: "pipeOutTop" }},
            ],
            coins: [
                {x: 640, y: 600},
                {x: 720, y: 600},
                {x: 800, y: 600},
                {x: 880, y: 600},
                {x: 960, y: 600},
                {x: 1040, y: 600},
                {x: 1120, y: 600},
                {x: 1200, y: 600},
                
                {x: 560, y: 920},
                {x: 640, y: 920},
                {x: 720, y: 920},
                {x: 800, y: 920},
                {x: 880, y: 920},
                {x: 960, y: 920},
                {x: 1040, y: 920},
                {x: 1120, y: 920},
                {x: 1200, y: 920},
            ]
        }
    },
    123: {
        theme: "overworld",
        spawnLocation: {
            x: 280,
            y: 1000
        },
        bg: "#63adfe",
        width: 2560,
        levelEndLine: 2320,
        gravity: 2.15,
        music: "overworld",
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 32},
                {x: 1040, y: 360, h: 8, type: "stair"},
            ],
            steps: [
                {x: 400, y: 360, w: 8}
            ],
            hills: [
                {x: 1280, y: 760, h: 3}
            ],
            clouds: [
                {x: 320, y: 120, amount: 2},
                {x: 1920, y: 200},
            ],
            castles: [
                {x: 2080, y: 600}
            ],
            pipes: [
                {x: 240, y: 840}
            ],
            flags: [
                {x: 1760, y: 120, destination: {worldID: 13}},
            ]
        }
    },
    13: {
        theme: "overworld",
        spawnLocation: {
            x: 160,
            y: 1000
        },
        bg: "#63adfe",
        width: 13120,
        levelEndLine: 12800,
        gravity: 2.15,
        music: "overworld",
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 16},
                {x: 10320, y: 1000, w: 35},
                {x: 1520, y: 1000, w: 2, type: "treeStump"},
                {x: 2160, y: 440, w: 3, h: 3, type: "treeStump"},
                {x: 2000, y: 760, w: 6, h: 4, type: "treeStump"},
                {x: 2880, y: 680, w: 3, h: 5, type: "treeStump"},
                {x: 3280, y: 360, w: 5, h: 9, type: "treeStump"},
                {x: 4880, y: 440, w: 2, h: 7, type: "treeStump"},
                {x: 5680, y: 760, h: 4, type: "treeStump"},
                {x: 6160, y: 520, w: 4, h: 7, type: "treeStump"},
                {x: 7920, y: 920, w: 2, h: 2, type: "treeStump"},
                {x: 8400, y: 600, w: 6, h: 6, type: "treeStump"},
                {x: 9360, y: 760, w: 2, h: 4, type: "treeStump"},
                {x: 9840, y: 760, w: 2, h: 4, type: "treeStump"},
                {x: 11040, y: 680, w: 6, h: 4, type: "stair", collision: true},
                {x: 11200, y: 520, w: 4, h: 2, type: "stair", collision: true},
                {x: 11360, y: 360, w: 2, h: 2, type: "stair", collision: true},
            ],
            tiles: [
                {x: 2640, y: 1000, type: "treeStump"},
                {x: 4720, y: 760, type: "secret", item: {type: "magicMushroom"}},
            ],
            clouds: [
                {x: 240, y: 200, amount: 2},
                {x: 720, y: 520},
                {x: 1440, y: 120, amount: 2},
                {x: 2800, y: 520},
                {x: 3040, y: 440},
                {x: 3680, y: 840},
                {x: 4080, y: 200, amount: 2},
                {x: 4560, y: 520},
                {x: 5280, y: 120, amount: 2},
                {x: 6080, y: 840},
                {x: 6640, y: 520},
                {x: 6880, y: 440},
                {x: 7520, y: 840},
                {x: 7920, y: 200, amount: 2},
                {x: 9120, y: 120, amount: 2},
                {x: 9920, y: 840},
                {x: 10480, y: 520},
                {x: 10720, y: 440},
                {x: 11360, y: 840},
                {x: 11760, y: 200, amount: 2},
                {x: 12240, y: 520},
                {x: 12960, y: 120},
            ],
            platforms: [
                {x: 1440, y: 920, w: 4},
                {x: 1920, y: 680, w: 8},
                {x: 2080, y: 360, w: 5},
                {x: 2560, y: 920, w: 3},
                {x: 2800, y: 600, w: 5},
                {x: 3200, y: 280, w: 7},
                {x: 4000, y: 1000, w: 4},
                {x: 4720, y: 1000, w: 5},
                {x: 5200, y: 1000, w: 5},
                {x: 4800, y: 360, w: 4},
                {x: 5600, y: 680, w: 3},
                {x: 6080, y: 440, w: 6},
                {x: 7840, y: 840, w: 4},
                {x: 8320, y: 520, w: 8},
                {x: 9040, y: 1000, w: 3},
                {x: 9280, y: 680, w: 4},
                {x: 9760, y: 680, w: 4},
            ],
            coins: [
                {x: 2160, y: 280},
                {x: 2240, y: 280},
                {x: 2320, y: 280},
                {x: 2640, y: 840},
                {x: 2960, y: 120},
                {x: 3040, y: 120},
                {x: 4000, y: 440},
                {x: 4080, y: 440},
                {x: 4800, y: 280},
                {x: 4880, y: 280},
                {x: 4960, y: 280},
                {x: 5040, y: 280},
                {x: 6800, y: 360},
                {x: 6880, y: 360},
                {x: 7440, y: 180},
                {x: 7520, y: 180},
                {x: 7760, y: 180},
                {x: 7840, y: 180},
                {x: 9040, y: 920},
                {x: 9120, y: 920},
                {x: 9200, y: 920},
                {x: 9600, y: 360},
                {x: 9680, y: 360},
            ],
            elevatorPlatforms: [
                {x: 4400, y: 440, w: 3, movementType: "upDown"},
                {x: 6880, y: 600, w: 3, movementType: "leftRight"},
                {x: 7520, y: 680, w: 3, movementType: "leftRight"},
                {x: 10480, y: 440, w: 3, movementType: "leftRight"},
            ],
            enemies: [
                {x: 2400, y: 200, theme: "castle", type: "koopaTroopa"},
                {x: 3520, y: 200},
                {x: 3680, y: 200},
                {x: 5920, y: 200, theme: "castle", type: "koopaParatroopa"},
                {x: 6400, y: 280},
                {x: 8800, y: 360, theme: "castle", type: "koopaTroopa"},
                {x: 9120, y: 280, theme: "castle", type: "koopaParatroopa"},
                {x: 10640, y: 840, theme: "castle", type: "koopaTroopa"},
            ],
            castles: [
                {x: 0, y: 600},
                {x: 12560, y: 120},
                {x: 12400, y: 520, name: "rectangle5doors"},
            ],
            flags: [
                {x: 12160, y: 120, destination: {worldID: 14}}
            ]
        }
    },
    14: {
        theme: "castle",
        spawnLocation: {
            x: 80,
            y: 520
        },
        bg: "#000000",
        width: 12800,
        gravity: 2.15,
        music: "castle",
        worldElements: {
            rectangles: [
                {x: 0, y: 120, w: 23, h: 3, type: "solid", collision: true},
                {x: 1840, y: 120, h: 4, type: "solid", collision: true},
                {x: 0, y: 520, w: 3, type: "solid", collision: true},
                {x: 0, y: 600, w: 4, type: "solid", collision: true},
                {x: 0, y: 680, w: 5, type: "solid", collision: true},
                {x: 0, y: 760, w: 13, h: 4, type: "solid", collision: true},
                {x: 1200, y: 760, w: 11, h: 4, type: "solid", collision: true},
                {x: 2320, y: 760, h: 4, type: "solid", collision: true},
                {x: 2400, y: 840, h: 3, type: "solid", collision: true},
                {x: 2480, y: 760, h: 4, type: "solid", collision: true},
                {x: 1920, y: 120, w: 13, type: "solid", collision: true},
                {x: 2960, y: 120, h: 4, w: 35, type: "solid", collision: true},
                {x: 2800, y: 680, h: 5, w: 37, type: "solid", collision: true},
                {x: 5760, y: 120, w: 25, type: "solid", collision: true},
                {x: 5760, y: 760, w: 32, h: 4, type: "solid", collision: true},
                {x: 7760, y: 120, w: 7, h: 3, type: "solid", collision: true},
                {x: 8320, y: 120, w: 19, type: "solid", collision: true},
                {x: 8320, y: 1000, w: 24, type: "solid", collision: true},
                {x: 9280, y: 760, w: 4, h: 3, type: "solid", collision: true},
                {x: 9840, y: 120, w: 5, h: 3, type: "solid", collision: true},
                {x: 9840, y: 760, w: 5, h: 3, type: "solid", collision: true},
                {x: 10240, y: 120, w: 14, type: "solid", collision: true},
                {x: 11360, y: 120, w: 2, h: 4, type: "solid", collision: true},
                {x: 11280, y: 680, w: 3, h: 5, type: "solid", collision: true},
                {x: 11520, y: 120, w: 16, type: "solid", collision: true},
                {x: 11520, y: 1000, w: 16, type: "solid", collision: true},
                
                {x: 10240, y: 760, w: 13, type: "bridge", collision: true},
                
                {x: 1040, y: 920, w: 2, type: "waterTop"},
                {x: 1040, y: 1000, w: 2, type: "water"},
                {x: 2080, y: 1000, w: 3, type: "waterTop"},
                {x: 2560, y: 1000, w: 3, type: "waterTop"},
                {x: 10240, y: 1000, w: 13, type: "waterTop"},
            ],
            tiles: [
                {x: 1840, y: 440, type: "disabled", collision: true},
                {x: 2400, y: 440, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 2400, y: 760, type: "disabled", collision: true},
                {x: 2960, y: 440, type: "disabled", collision: true},
                {x: 3920, y: 440, type: "disabled", collision: true},
                {x: 4800, y: 440, type: "disabled", collision: true},
                {x: 5360, y: 440, type: "disabled", collision: true},
                {x: 6080, y: 680, type: "disabled", collision: true},
                {x: 6400, y: 200, type: "solid", collision: true},
                {x: 6400, y: 280, type: "disabled", collision: true},
                {x: 6720, y: 680, type: "disabled", collision: true},
                {x: 7040, y: 200, type: "solid", collision: true},
                {x: 7040, y: 280, type: "disabled", collision: true},
                {x: 7360, y: 680, type: "disabled", collision: true},

                {x: 8480, y: 680, type: "secret"},
                {x: 8720, y: 680, type: "secret"},
                {x: 8960, y: 680, type: "secret"},
                {x: 8560, y: 360, type: "secret"},
                {x: 8800, y: 360, type: "secret"},
                {x: 9040, y: 360, type: "secret"},

                {x: 11200, y: 680, type: "bridgeRope"},
                
                {x: 11280, y: 600, type: "axe", collision: true},
            ],
            elevatorPlatforms: [
                {x: 11040, y: 440, w: 2, movementType: "leftRight"}
            ]
        }
    },
    21: {
        theme: "overground",
        spawnLocation: {
            x: 160,
            y: 1000
        },
        bg: "#63adfe",
        width: 17040,
        levelEndLine: 16560,
        music: "overworld",
        worldElements: {

        }
    }
}

class Tile {
    constructor(parent, x, y, theme, type, collision, item) {
        this.objectName = "Tile";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = this.parent.gravity || 2.15;
        this.x = x;
        this.y = y;
        this.w = this.blocksize;
        this.yInitial = this.y;
        this.left = this.x;
        this.right = this.x + this.blocksize;
        this.top = this.y;
        this.bottom = this.y + this.blocksize;
        this.theme = theme || this.parent.theme;
        this.type = type || "blockShiny";
        this.collision = collision;
        if (this.type === "questionBlock" || this.type === "secret") this.collision = true;
        this.item = item;
        if (this.type === "questionBlock" && !this.item || this.type === "secret" && !this.item) this.item = {type: "coinItem"};
        this.bouncing = false;
        this.sprites = tileSprites;
        this.animateSequences = {
            "questionBlock": [1920, 1920, 2000, 2080, 2000],
            "axe": [2160, 2160, 2240, 2320, 2240],
        }

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        if (this.animateSequences[this.type]) {
            this.frame = 0;
            this.animate = true;
            this.sequence = this.animateSequences[this.type];
        }

        if (this.type === "multiCoinBlock") {
            this.collision = true;
            //TODO: Calculate this time with global frame_rate (10sec)
            this.states = {
                current: "inactive",
                inactive: "inactive",
                active: "active",
                lastHit: "lastHit"
            };
            this.timer = 10 * 60;
        }

        this.setSpriteOffsets();
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.tiles.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.tiles.indexOf(this);
        this.parent.onScreenElements.tiles.splice(index, 1);
    }

    setSpriteOffsets() {
        this.sX = spriteOffsets.tiles.type[this.type].x;
        this.sY = spriteOffsets.tiles.theme[this.theme].y + spriteOffsets.tiles.type[this.type].y;
    }

    destroy(tileList) {
        const tileIndex = tileList.indexOf(this);
        tileList.splice(tileIndex, 1);
    }

    bounce() {
        this.bouncing = true;
        this.yVel = -10;
    }

    updateVelocities() {
        this.yVel += this.gravity;
    }

    updatePosition() {
        this.y += this.yVel;
        if (this.y >= this.yInitial) {
            this.y = this.yInitial;
            this.bouncing = false;
        }
    }

    update() {
        if (this.bouncing) {
            this.updateVelocities();
            this.updatePosition();
        }
        if (this.animate && this.parent.parent.frame % 10 === 0) {
            this.frame = (this.frame + 1) % this.sequence.length;
            this.sX = this.sequence[this.frame];
        }
        if (this.type === "multiCoinBlock" && this.states.current === this.states.active) {
            this.timer--;
            if (this.timer <= 0) this.states.current = this.states.lastHit;
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
    constructor(parent, x, y, w, h, theme, type, collision, individualCheck) {
        this.objectName = "Rectangle";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = w || 1;
        this.h = h || 1;
        this.left = this.x;
        this.right = this.x + this.w * this.blocksize;
        this.top = this.y;
        this.bottom = this.y + this.h * this.blocksize;
        this.theme = theme || this.parent.theme;
        this.type = type || "floor";
        this.collision = collision;
        if (this.type === "floor") this.collision = true;
        this.individualCheck = individualCheck;
        this.sX = spriteOffsets.tiles.type[this.type].x;
        this.sY = spriteOffsets.tiles.theme[this.theme].y + spriteOffsets.tiles.type[this.type].y;
        this.sprites = tileSprites;
        this.onScreen = false;
        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        if (this.individualCheck) {
            this.tiles = [];

            for (let i = 0; i < this.h; i++) {
                for (let j = 0; j < this.w; j++) {
                    this.tiles.push(new Tile(this, this.x + j * this.blocksize, this.y + i * this.blocksize, this.theme, this.type, true));
                }
            }
        }
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.rectangles.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.rectangles.indexOf(this);
        this.parent.onScreenElements.rectangles.splice(index, 1);
    }

    update() {
        if (this.individualCheck) {
            this.tiles.forEach(tile => {
                tile.update();
            });
        }
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.left = this.x;
        this.right = this.x + this.w * this.blocksize;

        if (this.individualCheck) {
            this.tiles.forEach(tile => {
                tile.scroll(deltaX);
            });
        }
    }

    draw() {
        if (this.individualCheck) {
            this.tiles.forEach(tile => {
                tile.draw();
            });
        } else {
            for (let i = 0; i < this.h; i++) {
                for (let j = 0; j < this.w; j++) {
                    ctx.drawImage(this.sprites, this.sX, this.sY, this.blocksize, this.blocksize, this.x + j * this.blocksize, this.y + i * this.blocksize, this.blocksize, this.blocksize);
                }
            }
        }
    }
}

class Platform {
    constructor(parent, x, y, w, theme, variant) {
        this.objectName = "Platform";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = w;
        this.theme = theme || this.parent.theme;
        this.variant = variant || "Leaf";

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        this.tiles = [];

        for (let i = 0; i < this.w; i++) {
            let typeName;
            if (i === 0) typeName = `platform${this.variant}Left`;
            else if (i === this.w - 1) typeName = `platform${this.variant}Right`;
            else typeName = `platform${this.variant}`;

            this.tiles.push(new Tile(this, this.x + i * this.blocksize, this.y, this.theme, typeName, false, true));
        }
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.platforms.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.platforms.indexOf(this);
        this.parent.onScreenElements.platforms.splice(index, 1);
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

class Hill {
    constructor(parent, x, y, h, theme, variant) {
        this.objectName = "Hill";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = 1 + (this.h - 1) * 2;
        this.theme = theme || this.parent.theme;
        this.variant = variant || "";

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        this.tiles = [];

        let rowWidth = 1;
        let leftSkip = (this.w - 1) / 2;

        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < rowWidth; j++) {
                let typeName;
                if (i == 0 && j === 0) {
                    typeName = `${this.variant}hillTop`;
                } else if (j === 0) {
                    typeName = `${this.variant}hillSlopeLeft`;
                } else if (j === rowWidth - 1) {
                    typeName = `${this.variant}hillSlopeRight`;
                } else if (j === 1) {
                    typeName = `${this.variant}hillFillingWithDotsRight`;
                } else if (j === rowWidth - 2) {
                    typeName = `${this.variant}hillFillingWithDotsLeft`;
                } else {
                    typeName = `${this.variant}hillFilling`;
                }

                if (typeName) {
                    this.tiles.push(new Tile(this, this.x + (leftSkip + j) * this.blocksize, this.y + i * this.blocksize, this.theme, typeName));
                }
            }
            rowWidth += 2;
            leftSkip--;
        }
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.hills.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.hills.indexOf(this);
        this.parent.onScreenElements.hills.splice(index, 1);
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

class Cloud {
    constructor(parent, x, y, theme, amount) {
        this.objectName = "Cloud";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.amount = amount || 1;
        this.w = this.amount + 2;
        this.theme = theme || this.parent.theme;

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        this.tiles = [];
        
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2 + this.amount; j++) {
                let typeName;
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

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.clouds.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.clouds.indexOf(this);
        this.parent.onScreenElements.clouds.splice(index, 1);
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

class Bush {
    constructor(parent, x, y, theme, amount) {
        this.objectName = "Bush";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.theme = theme || this.parent.theme;
        this.amount = amount || 1;
        this.w = amount + 2;

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        this.tiles = [];
        
        for (let i = 0; i < this.amount + 2; i++) {
            let typeName;
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

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.bushes.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.bushes.indexOf(this);
        this.parent.onScreenElements.bushes.splice(index, 1);
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

class Step {
    constructor(parent, x, y, w, theme, type, reversed) {
        this.objectName = "Step";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = w;
        this.theme = theme || this.parent.theme;
        this.type = type || "stair";
        this.reversed = reversed;

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        this.rectangles = [];
        
        for (let i = 0; i < this.w; i++) {
            let x, y, h;
            if (this.reversed) {
                x = this.x + i * this.blocksize;
                y = this.y + i * this.blocksize;
                h = this.w - i;
            } else {
                x = this.x + i * this.blocksize;
                y = this.y + (this.w - 1 - i) * this.blocksize;
                h = 1 + i;
            }
            this.rectangles.push(new Rectangle(this, x, y, 1, h, this.theme, this.type, false, true));
        }
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.steps.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.steps.indexOf(this);
        this.parent.onScreenElements.steps.splice(index, 1);
    }

    scroll(deltaX) {
        this.x -= deltaX;
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

class Pipe {
    constructor(parent, x, y, size, theme, opening, destination) {
        this.objectName = "Pipe";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.size = size || 2;
        this.theme = theme || this.parent.theme;
        this.opening = opening || "top";
        if (this.opening === "top") this.w = 2;
        else this.w = this.size;
        this.destination = destination;
        this.collision = true;

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        this.tiles = [];

        if (this.opening === "top") {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < 2; j++) {
                    let typeName;
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
        } else if (this.opening === "left") {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < this.size; j++) {
                    let typeName;
                    if (i === 0 && j === 0) {
                        typeName = "pipeHorizontalTopLeft";
                    } else if (i === 1 && j === 0) {
                        typeName = "pipeHorizontalBottomLeft";
                    } else if (i === 0) {
                        typeName = "pipeHorizontalTop";
                    } else if (i === 1) {
                        typeName = "pipeHorizontalBottom";
                    }
                    if (typeName) {
                        this.tiles.push(new Tile(this, this.x + j * this.blocksize, this.y + i * this.blocksize, this.theme, typeName, false, true));
                    }
                }
            }
        }
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.pipes.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.pipes.indexOf(this);
        this.parent.onScreenElements.pipes.splice(index, 1);
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

class Flag {
    constructor(parent, x, y, h, theme, destination) {
        this.objectName = "Flag";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.h = h || 11;
        this.w = 1;
        this.theme = theme || this.parent.theme;
        this.destination = destination;

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        this.movingPiece = new Tile(this, this.x - this.blocksize / 2, this.y + this.blocksize, this.theme, "flagSail");
        this.movingDown = false;

        this.parts = [];

        this.parts.push(new Tile(this, this.x, this.y, this.theme, "flagTop", false, true));
        for (let i = 0; i < this.h - 2; i++) {
            this.parts.push(new Tile(this, this.x, this.y + (i + 1) *  this.blocksize, this.theme, "flagPole", false, true));
        }
        this.parts.push(new Tile(this, this.x, this.y + this.h * this.blocksize - this.blocksize, this.theme, "stair", false, true));
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.flags.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.flags.indexOf(this);
        this.parent.onScreenElements.flags.splice(index, 1);
    }

    pullDown() {
        this.movingDown = true;
    }

    update() {
        if (!this.movingDown) return;
        if (this.movingPiece.y >= this.y + (this.h - 2) * this.blocksize) {
            this.movingDown = false;
        }
        this.movingPiece.y += 10;
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.parts.forEach(part => {
            part.scroll(deltaX);
        });
        this.movingPiece.x -= deltaX;
    }

    draw() {
        this.parts.forEach(part => {
            part.draw();
        });
        this.movingPiece.draw();
    }
}

class Castle {
    constructor(parent, x, y, theme, name) {
        this.objectName = "Castle";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.theme = theme || this.parent.theme;
        this.name = name || "small";
        this.w = castles[this.name].w;


        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        this.tiles = [];

        castles[this.name].tiles.forEach(tile => {
            this.tiles.push(new Tile(this, this.x + tile.x, this.y + tile.y, this.theme, tile.type));
        })
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.castles.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.castles.indexOf(this);
        this.parent.onScreenElements.castles.splice(index, 1);
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

class Coin {
    constructor(parent, x, y, theme) {
        this.objectName = "Coin";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.theme = theme || this.parent.theme;
        this.sX = spriteOffsets.objects.theme[this.theme].x;
        this.sY = 480;
        this.sprites = objectSprites;
        this.sequence = [0, 0, 80, 160, 240, 160];

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.coins.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.coins.indexOf(this);
        this.parent.onScreenElements.coins.splice(index, 1);
    }

    setSprite() {
        if (this.parent.parent.frame % 10 === 0) {
            this.frame = (this.frame + 1) % this.sequence.length;
            this.sX = spriteOffsets.objects.theme[this.theme].x + this.sequence[this.frame];
        }
    }

    destroy() {
        this.parent.parent.audioFiles.sounds.coin.currentTime = 0;
        this.parent.parent.audioFiles.sounds.coin.play();
        const coinIndex = this.parent.worldElements.coins.indexOf(this);
        this.parent.worldElements.coins.splice(coinIndex, 1);
        const index = this.parent.onScreenElements.coins.indexOf(this);
        this.parent.onScreenElements.coins.splice(index, 1);
    }

    update() {
        this.setSprite();
    }

    scroll(deltaX) {
        this.x -= deltaX;
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.blocksize, this.blocksize, this.x, this.y, this.blocksize, this.blocksize);
    }
}

class Enemy {
    constructor(parent, x, y, theme, type) {
        this.objectName = "Enemy";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = this.parent.gravity;
        this.frame = 0;
        this.x = x;
        this.xOld = this.x;
        this.y = y;
        this.yInitial = this.y;
        this.yOld = this.y;
        this.theme = theme;
        if (!this.theme) this.theme = this.parent.theme;
        this.type = type || "goomba";
        this.sprites = enemySprites;
        this.facingLeftYOffset = 160;
        this.facingRight = false;
        if (this.x < this.parent.parent.screensize.width) {
            this.onScreen = true;
        } else {
            this.onScreen = false;
        }
        this.animateSequences = {
            goomba: [0, 80],
            koopaTroopa: [0, 80],
            koopaParatroopa: [0, 80],
        }

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        this.setSpriteOffsets();
        this.setProperties();
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.enemies.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.enemies.indexOf(this);
        this.parent.onScreenElements.enemies.splice(index, 1);
    }

    setSpriteOffsets() {
        this.sX = spriteOffsets.enemies.type[this.type].x;
        this.sY = spriteOffsets.enemies.type[this.type].y + spriteOffsets.enemies.theme[this.theme].y;
    }

    setProperties() {
        this.w = enemyProperties[this.type].w;
        this.h = enemyProperties[this.type].h;
        this.stompable = enemyProperties[this.type].stompable;
        this.shootable = enemyProperties[this.type].shootable;
        this.xVel = enemyProperties[this.type].xVel;
        this.yVel = enemyProperties[this.type].yVel;
        if (!this.facingRight) this.xVel *= -1;
        this.hitboxOffsetTop = enemyProperties[this.type].hitboxOffsetTop;
        this.hitboxOffsetBottom = enemyProperties[this.type].hitboxOffsetBottom;
        this.hitboxOffsetX = enemyProperties[this.type].hitboxOffsetX;
        if (this.animateSequences[this.type]) {
            this.animate = true;
            this.sequence = this.animateSequences[this.type];
        } else {
            this.animate = false;
            this.sequence = null;
        }
    }

    destroy() {
        // Spawn dead body object (item?) in location with 2sec timer to disappear
        const enemyIndex = this.parent.worldElements.enemies.indexOf(this);
        this.parent.worldElements.enemies.splice(enemyIndex, 1);

        const index = this.parent.onScreenElements.enemies.indexOf(this);
        this.parent.onScreenElements.enemies.splice(index, 1);
    }

    updatePosition() {
        if (this.type != "koopaParatroopa") this.yVel += this.gravity;
        
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;
    }

    collisionCheckRectangles(rectangleList) {
        rectangleList.forEach(rectangle => {
            if (rectangle.collision && this.y + this.h > rectangle.top && this.y < rectangle.bottom && this.x < rectangle.right && this.x + this.w > rectangle.left) {
                // Enemy entered rectangle from the top
                if (this.y + this.h > rectangle.top && this.yOld + this.h <= rectangle.top) {
                    this.y = rectangle.top - this.h;
                    this.yOld = this.y;
                    if (this.type === "koopaParatroopa") {
                        this.yVel *= -1;
                    } else {
                        this.yVel = 0;
                    }
                // Enemy entered rectangle from the left
                } else if (this.x + this.w > rectangle.left && this.xOld + this.w <= rectangle.left) {
                    this.x = rectangle.left - this.w;
                    this.xOld = this.x;
                    this.xVel *= -1;
                    this.facingRight = !this.facingRight;
                // Enemy entered rectangle from the right
                } else if (this.x < rectangle.right && this.xOld >= rectangle.right) {
                    this.x = rectangle.right;
                    this.xOld = this.x;
                    this.xVel *= -1;
                    this.facingRight = !this.facingRight;
                // Enemy entered rectangle from the bottom
                } else if (this.y < rectangle.bottom && this.yOld >= rectangle.bottom) {
                    this.y = rectangle.bottom;
                    this.yOld = this.y;
                    this.yVel = 0;
                }
            } 
            if (this.type != "shell"
                    && this.y + this.h == 1000
                    && this.y + this.h <= rectangle.top
                    && ((this.x < rectangle.left && this.xOld >= rectangle.left) || (this.x + this.w > rectangle.right && this.xOld + this.w <= rectangle.right)) 
                ) {
                this.xVel *= -1;
                this.facingRight = !this.facingRight;
            }
        });
    }

    collisionCheckPlatforms(platformList) {
        platformList.forEach(platform => {
            if (this.y + this.h > platform.y && this.y < platform.y + platform.blocksize && this.x < platform.x + platform.w * platform.blocksize && this.x + this.w > platform.x) {
                // Enemy entered platform from the top
                if (this.y + this.h > platform.y && this.yOld + this.h <= platform.y) {
                    this.y = platform.y - this.h;
                    this.yOld = this.y;
                    if (this.type === "koopaParatroopa") {
                        this.yVel *= -1;
                    } else {
                        this.yVel = 0;
                    }
                // Enemy entered platform from the left
                } else if (this.x + this.w > platform.x && this.xOld + this.w <= platform.x) {
                    this.x = platform.x - this.w;
                    this.xOld = this.x;
                    this.xVel *= -1;
                    this.facingRight = !this.facingRight;
                // Enemy entered platform from the right
                } else if (this.x < platform.x + platform.w * platform.blocksize && this.xOld >= platform.x + platform.w * platform.blocksize) {
                    this.x = platform.x + platform.w * platform.blocksize;
                    this.xOld = this.x;
                    this.xVel *= -1;
                    this.facingRight = !this.facingRight;
                // Enemy entered platform from the bottom
                } else if (this.y < platform.y + platform.blocksize && this.yOld >= platform.y + platform.blocksize) {
                    this.y = platform.y + platform.blocksize;
                    this.yOld = this.y;
                    this.yVel = 0;
                }
            } 
            if (this.type != "shell"
                    && ((this.type === "goomba" && this.y + this.h == 1000) || (this.type === "koopaTroopa" && this.y + this.h == platform.y))
                    && this.y + this.h <= platform.y
                    && ((this.x < platform.x && this.xOld >= platform.x) || (this.x + this.w > platform.x + platform.w * platform.blocksize && this.xOld + this.w <= platform.x + platform.w * platform.blocksize)) 
                ) {
                this.xVel *= -1;
                this.facingRight = !this.facingRight;
            }
        });

    }

    collisionCheckSteps(stepList) {
        stepList.forEach(step => {
            // Check for each rectangle of the step
            step.rectangles.forEach(rectangle => {
                if (this.y + this.h > rectangle.top && this.y < rectangle.bottom && this.x < rectangle.right && this.x + this.w > rectangle.left) {
                    // Enemy entered rectangle from the top
                    if (this.y + this.h > rectangle.top && this.yOld + this.h <= rectangle.top) {
                        this.y = rectangle.top - this.h;
                        this.yOld = this.y;
                        this.yVel = 0;
                    // Enemy entered rectangle from the left
                    } else if (this.x + this.w > rectangle.left && this.xOld + this.w <= rectangle.left) {
                        this.x = rectangle.left - this.w;
                        this.xOld = this.x;
                        this.xVel *= -1;
                        this.facingRight = !this.facingRight;
                    // Enemy entered rectangle from the right
                    } else if (this.x < rectangle.right && this.xOld >= rectangle.right) {
                        this.x = rectangle.right;
                        this.xOld = this.x;
                        this.xVel *= -1;
                        this.facingRight = !this.facingRight;
                    // Enemy entered rectangle from the bottom
                    } else if (this.y < rectangle.bottom && this.yOld >= rectangle.bottom) {
                        this.y = rectangle.bottom;
                        this.yOld = this.y;
                        this.yVel = 0;
                    }
                }
            });
        });
    }

    collisionCheckTiles(tileList) {
        tileList.forEach(tile => {
            if (this.y + this.h > tile.top && this.y < tile.bottom && this.x < tile.right && this.x + this.w > tile.left) {
                // Enemy entered tile from the top
                if (this.y + this.h > tile.top && this.yOld + this.h <= tile.top) {
                    this.y = tile.top - this.h;
                    this.yOld = this.y;
                    this.yVel = 0;
                // Enemy entered tile from the left
                } else if (this.x + this.w > tile.left && this.xOld + this.w <= tile.left) {
                    this.x = tile.left - this.w;
                    this.xOld = this.x;
                    this.xVel *= -1;
                    this.facingRight = !this.facingRight;
                // Enemy entered tile from the right
                } else if (this.x < tile.right && this.xOld >= tile.right) {
                    this.x = tile.right;
                    this.xOld = this.x;
                    this.xVel *= -1;
                    this.facingRight = !this.facingRight;
                // Enemy entered tile from the bottom
                } else if (this.y < tile.bottom && this.yOld >= tile.bottom) {
                    this.y = tile.bottom;
                    this.yOld = this.y;
                    this.yVel = 0;
                }
            }
        });
    }

    collisionCheckPipes(pipeList) {
        pipeList.forEach(pipe => {
            if (pipe.opening === "top") {
                if (this.y + this.h > pipe.y && this.y < pipe.y + pipe.size * this.blocksize && this.x < pipe.x + 2 * this.blocksize && this.x + this.w > pipe.x) {
                    // Character entered pipe from the top
                    if (this.y + this.h > pipe.y && this.yOld + this.h <= pipe.y) {
                        this.y = pipe.y - this.h;
                        this.yOld = this.y;
                        this.yVel = 0;
                    // Character entered pipe from the left
                    } else if (this.x + this.w > pipe.x && this.xOld + this.w <= pipe.x) {
                        this.x = pipe.x - this.w;
                        this.xOld = this.x;
                        this.xVel *= -1;
                        this.facingRight = !this.facingRight;
                    // Character entered pipe from the right
                    } else if (this.x < pipe.x + 2 * this.blocksize && this.xOld >= pipe.x + 2 * this.blocksize) {
                        this.x = pipe.x + 2 * this.blocksize;
                        this.xOld = this.x;
                        this.xVel *= -1;
                        this.facingRight = !this.facingRight;
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

    collisionCheck() {
        // Screen edges
        if (this.x + this.w + 2 * this.blocksize < 0 || this.x - 2 * this.blocksize > this.parent.parent.screensize.width || this.y - 2 * this.blocksize > this.parent.parent.screensize.height) {
            this.destroy();
        }

        if (this.parent.onScreenElements.rectangles) this.collisionCheckRectangles(this.parent.onScreenElements.rectangles);
        if (this.parent.onScreenElements.platforms) this.collisionCheckPlatforms(this.parent.onScreenElements.platforms);
        if (this.parent.onScreenElements.steps) this.collisionCheckSteps(this.parent.onScreenElements.steps);
        if (this.parent.onScreenElements.tiles) this.collisionCheckTiles(this.parent.onScreenElements.tiles);
        if (this.parent.onScreenElements.pipes) this.collisionCheckPipes(this.parent.onScreenElements.pipes);

        // KoopaParatroopa up-down-movement
        if (this.type === "koopaParatroopa" && this.y + this.h > this.yInitial + 3 * this.blocksize || this.y < this.yInitial - 3 * this.blocksize) this.yVel *= -1;

        //TODO: Reflect off other enemies
        //TODO: Reflect off items
    }

    setSprite() {
        if (this.animate && this.parent.parent.frame % 10 === 0) {
            this.frame = (this.frame + 1) % this.sequence.length;
            this.sX = spriteOffsets.enemies.type[this.type].x + this.sequence[this.frame];
        }
        this.sY = spriteOffsets.enemies.type[this.type].y + spriteOffsets.enemies.theme[this.theme].y;
        if (!this.facingRight) {
            this.sY += this.facingLeftYOffset;
        }
    }

    update() {
        if (!this.onScreen) return;
        this.updatePosition();
        this.collisionCheck();
        this.setSprite();
    }

    scroll(deltaX) {
        this.x -= deltaX;
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}

class FireBar {
    constructor() {

    }

    update() {

    }

    scroll(deltaX) {

    }

    draw() {

    }
}

class ElevatorPlatform {
    constructor(parent, x, y, w, movementType="falling") {
        this.objectName = "ElevatorPlatform";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = this.parent.gravity;
        this.x = x;
        this.xOld = this.x;
        this.xInitial = this.x;
        this.y = y;
        this.yInitial = this.y;
        this.yOld = this.y;
        this.w = w;
        this.sprites = objectSprites;
        this.sX = 320;
        this.sY = 640;
        this.movementType = movementType;
        this.weightApplied = false;

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        if (this.movementType === "up") {
            this.xVel = 0;
            this.yVel = -5;
        } else if (this.movementType === "down") {
            this.xVel = 0;
            this.yVel = 5;
        } else if (this.movementType === "leftRight") {
            this.xVel = 5;
            this.yVel = 0;
        } else if (this.movementType === "upDown") {
            this.xVel = 0;
            this.yVel = -5;
        } else {
            this.yVel = 0;
            this.xVel = 0;
        }
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.elevatorPlatforms.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.elevatorPlatforms.indexOf(this);
        this.parent.onScreenElements.elevatorPlatforms.splice(index, 1);
    }

    destroy() {
        const elevattorIndex = this.parent.elevators.indexOf(this);
        this.parent.elevators.splice(elevattorIndex, 1);
    }

    updateVelocities() {
        if (this.movementType === "falling" && this.weightApplied) this.yVel += this.gravity;
    }

    updatePosition() {
        this.yOld = this.y;
        this.y += this.yVel;
        this.xOld = this.x;
        this.x += this.xVel;
        if (this.movementType === "up" && this.y + this.blocksize < 0) this.y = this.parent.parent.screensize.height;
        else if (this.movementType === "down" && this.y > this.parent.parent.screensize.height) this.y = 0 - this.blocksize;
        else if (this.movementType === "falling" && this.y > this.parent.parent.screensize.height) this.destroy();
        else if (this.movementType === "leftRight" && this.x + this.w * this.blocksize >= this.xInitial + this.w * this.blocksize + 3 * this.blocksize || this.x <= this.xInitial - 3 * this.blocksize) this.xVel *= -1;
        else if (this.movementType === "upDown" && this.y > this.yInitial + 6 * this.blocksize || this.y + this.blocksize < this.yInitial + this.blocksize - 6 * this.blocksize) this.yVel *= -1;
    }

    collisionCheck() {
        if (this.yVel < 0 && !this.parent.character.inAir && this.parent.character.x + this.parent.character.w > this.x && this.parent.character.x < this.x + this.w * this.blocksize) {
            if (this.y < this.parent.character.y + this.parent.character.h && this.yOld >= this.parent.character.y + this.parent.character.h) {
                this.parent.character.y = this.y - this.parent.character.h;
                this.parent.character.yOld = this.parent.character.y;
                this.parent.character.yVel = 0;
                this.parent.character.inAir = false;
            }
        } else if (this.movementType === "leftRight" 
            && this.parent.character.y + this.parent.character.h == this.y 
            && this.parent.character.xOld + this.parent.character.w > this.xOld && this.parent.character.x < this.xOld + this.w * this.blocksize)
        {
            const deltaX = this.x - this.xOld;
            this.parent.character.x += deltaX;
        }
    }

    update() {
        if (!this.onScreen) return;
        this.updateVelocities();
        this.updatePosition();
        this.collisionCheck();
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.xInitial -= deltaX;
    }

    draw() {
        for (let i = 0; i < this.w; i++) {
            ctx.drawImage(this.sprites, this.sX, this.sY, this.blocksize, this.blocksize, this.x + i * this.blocksize, this.y, this.blocksize, this.blocksize);
        }
    }
}

class Item {
    constructor (parent, x, y, theme, type, collision) {
        this.objectName = "Item";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = this.parent.gravity;
        this.x = x;
        this.xOld = this.x;
        this.y = y;
        this.yOld = this.y;
        this.theme = theme || this.parent.theme;
        this.type = type;
        this.hitboxOffsetX = 10;
        this.hitboxOffsetTop = 10;
        this.hitboxOffsetBottom = 15;
        this.collision = collision;
        this.sprites = objectSprites;
        this.sX = spriteOffsets.objects.theme[this.theme].x + spriteOffsets.objects.type[this.type].x;
        this.sY = spriteOffsets.objects.type[this.type].y;
        this.xVel = objectVelTable[this.type].xVel;
        this.yVel = objectVelTable[this.type].yVel;
        this.lifetime = 15;

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        this.animateSequences = {
            "coinItem": [0, 80, 160, 240],
            "fireFlower": [0, 80, 160, 240],
            "starman": [0, 80, 160, 240],
        }

        if (this.animateSequences[this.type]) {
            this.frame = 0;
            this.animate = true;
            this.sequence = this.animateSequences[this.type];
        }
    }

    addToOnScreen() {
        this.onScreen = true;
        if (!this.parent.onScreenElements.items) this.parent.onScreenElements.items = [];
        this.parent.onScreenElements.items.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.items.indexOf(this);
        this.parent.onScreenElements.items.splice(index, 1);
    }

    activate() {
        if (this.type === "magicMushroom" || this.type === "fireFlower" && this.parent.character.h === 80) {
            this.parent.parent.transitionTimer = this.parent.character.frames.growing.length;
            this.parent.parent.transition = true;
            this.parent.parent.transitionType = "growing";
            this.parent.parent.audioFiles.sounds.powerup.currentTime = 0;
            this.parent.parent.audioFiles.sounds.powerup.play()
        } else if (this.type === "fireFlower" && this.parent.character.h === 160) {
            if (this.parent.character.state.current != this.parent.character.state.star) this.parent.character.state.current = this.parent.character.state.flower;
            this.parent.character.state.last = this.parent.character.state.flower;
            this.parent.parent.audioFiles.sounds.powerup.currentTime = 0;
            this.parent.parent.audioFiles.sounds.powerup.play()
        } else if (this.type === "oneUp") {
            this.parent.parent.lives++;
            this.parent.parent.audioFiles.sounds.oneUp.currentTime = 0;
            this.parent.parent.audioFiles.sounds.oneUp.play()
        } else if (this.type === "starman") {
            this.parent.character.state.last = this.parent.character.state.current;
            this.parent.character.state.current = this.parent.character.state.star;
            this.parent.character.starTime = 61;
            this.parent.parent.music.pause();
            this.parent.parent.audioFiles.music.starman.currentTime = 0;
            this.parent.parent.audioFiles.music.starman.play();
        }
    }

    destroy() {
        const itemIndex = this.parent.worldElements.items.indexOf(this);
        this.parent.worldElements.items.splice(itemIndex, 1);
        const index = this.parent.onScreenElements.items.indexOf(this);
        this.parent.onScreenElements.items.splice(index, 1);
    }

    updatePosition() {
        this.yVel += this.gravity;
        
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;
    }

    collisionCheckRectangles(rectangleList) {
        rectangleList.forEach(rectangle => {
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
    }

    collisionCheckSteps(stepList) {
        stepList.forEach(step => {
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
    }

    collisionCheckTiles(tileList) {
        tileList.forEach(tile => {
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

    collisionCheckPipes(pipeList) {
        pipeList.forEach(pipe => {
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

    collisionCheck() {
        // Screen edges
        if (this.x + this.blocksize < 0 || this.x > this.parent.parent.screensize.width || this.y > this.parent.parent.screensize.height) {
            this.destroy();
        }

        if (!this.collision) return;
        if (this.parent.onScreenElements.rectangles) this.collisionCheckRectangles(this.parent.onScreenElements.rectangles);
        if (this.parent.onScreenElements.steps) this.collisionCheckSteps(this.parent.onScreenElements.steps);
        if (this.parent.onScreenElements.tiles) this.collisionCheckTiles(this.parent.onScreenElements.tiles);
        if (this.parent.onScreenElements.pipes) this.collisionCheckPipes(this.parent.onScreenElements.pipes);
    }

    setSprite() {
        if (this.animate) {
            if (this.type === "coinItem") {
                this.lifetime--;
    
                if (this.lifetime < 0) {
                    this.destroy();
                }
            }
            if (this.parent.parent.frame % 10 === 0) {
                this.frame = (this.frame + 1) % this.sequence.length;
                this.sX = this.sequence[this.frame];
            }
        }
    }

    update() {
        if (this.parent.parent.transition) return;
        this.updatePosition();
        this.collisionCheck();
        this.setSprite();
    }

    scroll(deltaX) {
        this.x -= deltaX;
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.blocksize, this.blocksize, this.x, this.y, this.blocksize, this.blocksize);
    }
}

class Character {
    constructor(parent, x, y, h, state="normal") {
        this.objectName = "Character";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.frame = 0;
        this.x = x;
        this.xOld = this.x;
        this.y = y;
        this.yOld = this.y;
        this.w = 80;
        this.h = h || 80;

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
            current: state,
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
            ],
            shrinking: [
                {sX: 0, sY: 160, h: 80},
                {sX: 1200, sY: 0, h: 160},
                {sX: 0, sY: 0, h: 160},
                {sX: 1200, sY: 0, h: 160},
                {sX: 0, sY: 0, h: 160},
                {sX: 1200, sY: 0, h: 160},
                {sX: 0, sY: 160, h: 80},
            ],
        }
        this.visible = true;
        this.invincibility = 0;
        this.starTime = 0;
        this.dying = 0;
        this.collision = true;
    }

    jump() {
        if (this.parent.parent.transition) return;
        this.yVel -= this.jumpForce;
        this.inAir = true;
        this.movement.current = this.movement.jumping;
        this.parent.parent.audioFiles.sounds.jumpSmall.currentTime = 0;
        this.parent.parent.audioFiles.sounds.jumpSmall.play();
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

    runTransition() {
        if (this.parent.parent.transitionType === "flagReached" && this.y + this.h < 920) {
            this.yVel = 5;
            this.xVel = 0;
            this.movement.current = this.movement.crappling;
        } else if (this.parent.parent.transitionType === "flagReached" && this.y + this.h >= 1000 && this.x + this.w < this.parent.levelEndLine) {
            this.yVel = 0;
            this.xVel = 5;
            this.movement.current = this.movement.walking;
        } else if (this.parent.parent.transitionType === "flagReached" && this.x + this.w > this.parent.levelEndLine) {
            if (this.parent.parent.audioFiles.sounds.stageClear.currentTime === 0) {
                this.parent.parent.audioFiles.sounds.stageClear.play();
            }
            this.endmusicPlaying = true;
            this.visible = false;

            if (this.parent.parent.transitionTimer == 0) {
                this.parent.parent.transition = false;
                this.parent.parent.transitionType = null;
                this.parent.parent.loadWorld(this.h, this.state.current);
            }

            this.parent.parent.transitionTimer--;
        } else if (this.parent.parent.transitionType === "pipeEnterTop") {
            if (this.parent.parent.transitionTimer == 0) {
                this.parent.parent.transition = false;
                this.parent.parent.transitionType = null;
                this.parent.parent.loadWorld(this.h, this.state.current);
            }
            this.xVel = 0;
            this.yVel = 3;
            this.movement.current = this.movement.standing;

            this.parent.parent.transitionTimer--;
        } else if (this.parent.parent.transitionType === "pipeOutTop") {
            if (this.parent.parent.transitionTimer == 0) {
                this.parent.parent.transition = false;
                this.parent.parent.transitionType = null;
            }
            this.xVel = 0;
            this.yVel = -3;
            this.movement.current = this.movement.standing;

            this.parent.parent.transitionTimer--;
        } else if (this.parent.parent.transitionType === "pipeEnterLeft") {
            if (this.parent.parent.transitionTimer == 35) this.visible = false;
            if (this.parent.parent.transitionTimer == 0) {
                this.parent.parent.transition = false;
                this.parent.parent.transitionType = null;
                if (this.parent.parent.music) {
                    this.parent.parent.music.pause();
                    this.parent.parent.music.currentTime = 0;
                }
                this.parent.parent.loadWorld(this.h, this.state.current);
            }
            this.xVel = 3;
            this.yVel = 0;
            this.movement.current = this.movement.walking;

            this.parent.parent.transitionTimer--;
        } else if (this.parent.parent.transitionType === "growing") {
            if (this.parent.parent.transitionTimer == 0) {
                this.parent.parent.transition = false;
                this.parent.parent.transitionType = null;
            } else if (this.parent.parent.frame % 5 == 0) {
                this.sX = this.frames.growing[this.parent.parent.transitionTimer - 1].sX;
                this.sY = this.frames.growing[this.parent.parent.transitionTimer - 1].sY;
                this.setHeight(this.frames.growing[this.parent.parent.transitionTimer - 1].h);

                // In which direction is the player looking
                if (!this.facingRight) {
                    this.sY += this.facingLeftYOffset;
                }
                this.parent.parent.transitionTimer--;
            }
        } else if (this.parent.parent.transitionType === "shrinking") {
            if (this.parent.parent.transitionTimer == 0) {
                this.parent.parent.transition = false;
                this.parent.parent.transitionType = null;
                this.invincibility = 60;
            } else if (this.parent.parent.frame % 5 == 0) {
                this.sX = this.frames.shrinking[this.parent.parent.transitionTimer - 1].sX;
                this.sY = this.frames.shrinking[this.parent.parent.transitionTimer - 1].sY;
                this.setHeight(this.frames.shrinking[this.parent.parent.transitionTimer - 1].h);
    
                // In which direction is the player looking
                if (!this.facingRight) {
                    this.sY += this.facingLeftYOffset;
                }
                this.parent.parent.transitionTimer--;
            }
        } else if (this.parent.parent.transitionType === "dying") {
            if (this.parent.parent.transitionTimer == 0) {
                this.parent.parent.transition = false;
                this.parent.parent.transitionType = null;
                this.parent.parent.loadWorld();
            }
            this.xVel = 0;
            this.yVel += this.gravity;
            this.sX = 480;
            this.sY = 160;

            this.parent.parent.transitionTimer--;
        } else if (this.parent.parent.transitionType === "cutscene1") {
            if (this.parent.parent.music.currentTime === 0) {
                this.parent.parent.music.play();
            }
            if (this.x >= 1040) {
                this.parent.parent.audioFiles.sounds.pipe.currentTime = 0;
                this.parent.parent.audioFiles.sounds.pipe.play();
                this.parent.parent.destination = {worldID: 12};
                this.parent.parent.transitionType = "pipeEnterLeft";
                this.parent.parent.transitionTimer = this.parent.parent.transitionTimers[this.parent.parent.transitionType];
            }
            this.movement.current = this.movement.walking;
            this.collision = false;
            this.xVel = 5;
            this.yVel = 0;
        }
    }

    setVelocities() {
        if (this.parent.parent.transition) return;

        // User wants to move right
        if (this.parent.parent.keyStates.right && !this.parent.parent.keyStates.left) {
            this.facingRight = true;
            if (this.parent.parent.keyStates.sprint) {
                this.xAccel = this.xAccelSprint;
                this.xVelMax = this.xVelMaxSprint;
            } else {
                this.xAccel = this.xAccelWalk;
                this.xVelMax = this.xVelMaxWalk;
            }
        // User wants to move left
        } else if (this.parent.parent.keyStates.left && !this.parent.parent.keyStates.right) {
            this.facingRight = false;
            if (this.parent.parent.keyStates.sprint) {
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
        if (this.yVel >= this.yVelMax) this.yVel = this.yVelMax;

        // When falling off ledge prevent jumping midair
        if (this.yVel > 8) {
            this.inAir = true;
        }
    }

    updatePosition() {
        if (this.parent.parent.transitionType === "growing" || this.parent.parent.transitionType === "shrinking") return;

        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;
    }

    collisionCheckLeftScreenEdge() {
        if (this.x - this.hitboxOffsetX <= 0) {
            this.x = 0 - this.hitboxOffsetX;
        }
    }

    collisionCheckFallingToDeath() {
        if (this.y > this.parent.parent.screensize.height) {
            this.y = 160;
            this.x = 80;
        }
    }

    collisionCheckTiles(tileList) {
        tileList.forEach(tile => {
            if (tile.collision && this.y + this.h > tile.top && 
                this.y + this.hitboxOffsetTop < tile.bottom && 
                this.x + this.hitboxOffsetX < tile.right && 
                this.x + this.w - this.hitboxOffsetX > tile.left) {
                // Character entered tile from the top
                if (tile.type !== "secret" && this.y + this.h > tile.top && this.yOld + this.h <= tile.top) {
                    this.y = tile.top - this.h;
                    this.yOld = this.y;
                    this.yVel = 0;
                    this.inAir = false;
                // Character entered tile from the left
                } else if (tile.type !== "secret" && this.x + this.w - this.hitboxOffsetX > tile.left && this.xOld + this.w - this.hitboxOffsetX <= tile.left) {
                    this.x = tile.left - this.w + this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered tile from the right
                } else if (tile.type !== "secret" && this.x + this.hitboxOffsetX < tile.right && this.xOld + this.hitboxOffsetX >= tile.right) {
                    this.x = tile.right - this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered tile from the bottom
                } else if (this.y + this.hitboxOffsetTop < tile.bottom && this.yOld + this.hitboxOffsetTop >= tile.bottom) {
                    this.y = tile.bottom - this.hitboxOffsetTop;
                    this.yOld = this.y;
                    this.yVel = 0;

                    if (tile.type === "disabled") {
                        this.parent.parent.audioFiles.sounds.bump.currentTime = 0;
                        this.parent.parent.audioFiles.sounds.bump.play();
                    } else if (tile.type === "multiCoinBlock") {
                        if (tile.states.current === tile.states.inactive) {
                            this.parent.spawnItem(tile.x, tile.y - tile.blocksize, tile.theme, "coinItem");
                            this.parent.parent.audioFiles.sounds.coin.currentTime = 0;
                            this.parent.parent.audioFiles.sounds.coin.play();
                            tile.bounce();
                            tile.states.current = tile.states.active;
                        } else if (tile.states.current === tile.states.active) {
                            this.parent.spawnItem(tile.x, tile.y - tile.blocksize, tile.theme, "coinItem");
                            this.parent.parent.audioFiles.sounds.coin.currentTime = 0;
                            this.parent.parent.audioFiles.sounds.coin.play();
                            tile.bounce();
                        } else if (tile.states.current === tile.states.lastHit) {
                            this.parent.spawnItem(tile.x, tile.y - tile.blocksize, tile.theme, "coinItem");
                            this.parent.parent.audioFiles.sounds.coin.currentTime = 0;
                            this.parent.parent.audioFiles.sounds.coin.play();
                            tile.bounce();
                            tile.type = "disabled";
                            tile.setSpriteOffsets()
                        }
                    } else if ((tile.type === "blockShiny" || tile.type === "block") && !tile.item) {
                        if (this.h == 160) {
                            this.parent.parent.audioFiles.sounds.breakBlock.currentTime = 0;
                            this.parent.parent.audioFiles.sounds.breakBlock.play();
                            this.parent.spawnItem(tile.x - this.blocksize / 2, tile.y - this.blocksize / 2, tile.theme, "brokenTileTopLeft");
                            this.parent.spawnItem(tile.x + this.blocksize / 2, tile.y - this.blocksize / 2, tile.theme, "brokenTileTopRight");
                            this.parent.spawnItem(tile.x - this.blocksize / 2, tile.y + this.blocksize / 2, tile.theme, "brokenTileBottomLeft");
                            this.parent.spawnItem(tile.x + this.blocksize / 2, tile.y + this.blocksize / 2, tile.theme, "brokenTileBottomRight");
                            tile.destroy(tileList);
                        } else {
                            this.parent.parent.audioFiles.sounds.bump.currentTime = 0;
                            this.parent.parent.audioFiles.sounds.bump.play();
                            tile.bounce();
                        }
                    } else if (tile.item) {
                        tile.bounce();
                        // Spawn flower instead of mushroom if we are big
                        if (tile.item.type === "magicMushroom") {
                            if (this.h !== 80) {
                                this.parent.spawnItem(tile.x, tile.y - tile.blocksize, tile.item.theme, "fireFlower", true);
                            } else {
                                this.parent.spawnItem(tile.x, tile.y - tile.blocksize, tile.item.theme, "magicMushroom", true);
                            }
                            this.parent.parent.audioFiles.sounds.powerupAppears.currentTime = 0;
                            this.parent.parent.audioFiles.sounds.powerupAppears.play();
                        } else if (tile.item.type === "coinItem") {
                            this.parent.spawnItem(tile.x, tile.y - tile.blocksize, tile.item.theme, "coinItem");
                            this.parent.parent.audioFiles.sounds.coin.currentTime = 0;
                            this.parent.parent.audioFiles.sounds.coin.play();
                        } else {
                            this.parent.spawnItem(tile.x, tile.y - tile.blocksize, tile.item.theme, tile.item.type, true);
                            this.parent.parent.audioFiles.sounds.powerupAppears.currentTime = 0;
                            this.parent.parent.audioFiles.sounds.powerupAppears.play();
                        }

                        tile.type = "disabled";
                        tile.setSpriteOffsets()
                        tile.animate = false;
                        tile.item = null;
                    }
                }
            }
        });
    }

    collisionCheckRectangles(rectangleList) {
        rectangleList.forEach(rectangle => {
            if (rectangle.collision && rectangle.individualCheck) {
                this.collisionCheckTiles(rectangle.tiles);
            } else if (rectangle.collision 
                && this.y + this.h > rectangle.top 
                && this.y + this.hitboxOffsetTop < rectangle.bottom 
                && this.x + this.hitboxOffsetX < rectangle.right
                && this.x + this.w - this.hitboxOffsetX > rectangle.left) 
                {
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
    }

    collisionCheckPlatforms(platformList) {
        platformList.forEach(platform => {
            if (this.y + this.h > platform.y && 
                this.y + this.hitboxOffsetTop < platform.y + platform.blocksize && 
                this.x + this.hitboxOffsetX < platform.x + platform.w * platform.blocksize && 
                this.x + this.w - this.hitboxOffsetX > platform.x) 
                {
                // Character entered platform from the top
                if (this.y + this.h > platform.y && this.yOld + this.h <= platform.y) {
                    this.y = platform.y - this.h;
                    this.yOld = this.y;
                    this.yVel = 0;
                    this.inAir = false;
                // Character entered platform from the left
                } else if (this.x + this.w - this.hitboxOffsetX > platform.x && this.xOld + this.w - this.hitboxOffsetX <= platform.x) {
                    this.x = platform.x - this.w + this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered platform from the right
                } else if (this.x + this.hitboxOffsetX < platform.x + platform.w * platform.blocksize && this.xOld + this.hitboxOffsetX >= platform.x + platform.w * platform.blocksize) {
                    this.x = platform.x + platform.w * platform.blocksize - this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                // Character entered platform from the bottom
                } else if (this.y + this.hitboxOffsetTop < platform.y + platform.blocksize && this.yOld + this.hitboxOffsetTop >= platform.y + platform.blocksize) {
                    this.y = platform.y + platform.blocksize - this.hitboxOffsetTop;
                    this.yOld = this.y;
                    this.yVel = 0;
                }
            }
        });
    }

    collisionCheckSteps(stepList) {
        stepList.forEach(step => {
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
    }

    collisionCheckPipes(pipeList) {
        pipeList.forEach(pipe => {
            if (pipe.opening === "top") {
                if (this.y + this.h > pipe.y && this.y < pipe.y + pipe.size * pipe.blocksize && this.x < pipe.x + 2 * pipe.blocksize && this.x + this.w > pipe.x) {
                    // Character entered pipe from the top
                    if (this.y + this.h > pipe.y && this.yOld + this.h <= pipe.y) {
                        if (pipe.destination &&
                            this.parent.parent.keyStates.down && !this.parent.parent.keyStates.up && 
                            this.x > pipe.x + pipe.blocksize * .25 && 
                            this.x + this.w < pipe.x + 2 * pipe.blocksize - pipe.blocksize * .25) {
                            this.x = pipe.x + pipe.blocksize / 2;
                            this.parent.parent.transition = true;
                            this.parent.parent.transitionType = "pipeEnterTop";
                            this.parent.parent.transitionTimer = this.parent.parent.transitionTimers[this.parent.parent.transitionType];
                            this.parent.parent.destination = pipe.destination;
                            this.parent.parent.audioFiles.sounds.pipe.currentTime = 0;
                            this.parent.parent.audioFiles.sounds.pipe.play();
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
                    } else if (this.x < pipe.x + 2 * pipe.blocksize && this.xOld >= pipe.x + 2 * pipe.blocksize) {
                        this.x = pipe.x + 2 * pipe.blocksize;
                        this.xOld = this.x;
                        this.xVel = 0;
                    // Character entered pipe from the bottom
                    } else if (this.y < pipe.y + pipe.size * pipe.blocksize && this.yOld >= pipe.y + pipe.size * pipe.blocksize) {
                        this.y = pipe.y + pipe.size * pipe.blocksize;
                        this.yOld = this.y;
                        this.yVel = 0;
                    }
                }
            } else if (pipe.opening === "left") {
                if (this.y + this.h > pipe.y && this.y < pipe.y + pipe.size * pipe.blocksize && this.x < pipe.x + 2 * pipe.blocksize && this.x + this.w > pipe.x) {
                    // Character entered pipe from the top
                    if (this.y + this.h > pipe.y && this.yOld + this.h <= pipe.y) {
                        this.y = pipe.y - this.h;
                        this.yOld = this.y;
                        this.yVel = 0;
                        this.inAir = false;
                    // Character entered pipe from the left
                    } else if (this.x + this.w > pipe.x && this.xOld + this.w <= pipe.x) {
                        if (pipe.destination &&
                            this.parent.parent.keyStates.right && !this.parent.parent.keyStates.left && 
                            this.y + this.h > pipe.y + pipe.blocksize * 1.25) {
                            this.y = pipe.y + 2 * pipe.blocksize - this.h;
                            this.parent.parent.transition = true;
                            this.parent.parent.transitionType = "pipeEnterLeft";
                            this.parent.parent.transitionTimer = this.parent.parent.transitionTimers[this.parent.parent.transitionType];
                            this.parent.parent.destination = pipe.destination;
                            this.parent.parent.audioFiles.sounds.pipe.currentTime = 0;
                            this.parent.parent.audioFiles.sounds.pipe.play();
                        }
                        this.x = pipe.x - this.w;
                        this.xOld = this.x;
                        this.xVel = 0;
                    // Character entered pipe from the right
                    } else if (this.x < pipe.x + 2 * pipe.blocksize && this.xOld >= pipe.x + 2 * pipe.blocksize) {
                        this.x = pipe.x + 2 * pipe.blocksize;
                        this.xOld = this.x;
                        this.xVel = 0;
                    // Character entered pipe from the bottom
                    } else if (this.y < pipe.y + pipe.size * pipe.blocksize && this.yOld >= pipe.y + pipe.size * pipe.blocksize) {
                        this.y = pipe.y + pipe.size * pipe.blocksize;
                        this.yOld = this.y;
                        this.yVel = 0;
                    }
                }
            }
        });
    }

    collisionCheckItems(itemList) {
        itemList.forEach(item => {
            if (item.collision 
                && this.y + this.h > item.y + item.hitboxOffsetTop 
                && this.y + this.hitboxOffsetTop < item.y + this.blocksize - item.hitboxOffsetBottom 
                && this.x + this.hitboxOffsetX < item.x + this.blocksize - item.hitboxOffsetX 
                && this.x + this.w - this.hitboxOffsetX > item.x + item.hitboxOffsetX) {
                item.activate();
                item.destroy();
            }
        });
    }

    collisionCheckEnemies(enemyList) {
        enemyList.forEach(enemy => {
            if (this.y + this.h > enemy.y + enemy.hitboxOffsetTop && 
                this.y + this.hitboxOffsetTop < enemy.y + enemy.h - enemy.hitboxOffsetBottom && 
                this.x + this.hitboxOffsetX < enemy.x + enemy.w - enemy.hitboxOffsetX && 
                this.x + this.w - this.hitboxOffsetX > enemy.x + enemy.hitboxOffsetX) {
                
                // Character is in star form
                if (this.state.current === this.state.star) {
                    enemy.destroy();
                    this.parent.parent.audioFiles.sounds.stomp.currentTime = 0;
                    this.parent.parent.audioFiles.sounds.stomp.play();
                } else {
                    // Character entered enemy from the top
                    if (this.y + this.h > enemy.y + enemy.hitboxOffsetTop && this.yOld + this.h <= enemy.y + enemy.hitboxOffsetTop) {
                        this.y = enemy.y - this.h;
                        this.yOld = this.y;
                        this.yVel = -20;
                        this.parent.parent.audioFiles.sounds.stomp.currentTime = 0;
                        this.parent.parent.audioFiles.sounds.stomp.play();
                        if (enemy.type === "koopaParatroopa") {
                            enemy.type = "koopaTroopa";
                            enemy.setSpriteOffsets();
                            enemy.setProperties();
                        } else if (enemy.type === "koopaTroopa") {
                            enemy.frame = 0;
                            enemy.type = "shell";
                            enemy.y += 80;
                            enemy.setSpriteOffsets();
                            enemy.setProperties();
                        } else if (enemy.type === "shell") {
                            if (enemy.xVel == 0) {
                                if (this.x >= enemy.x) {
                                    enemy.xVel = -20;
                                } else {
                                    enemy.xVel = 20;
                                }
                            } else {
                                enemy.xVel = 0;
                            }
                            this.parent.parent.audioFiles.sounds.kick.currentTime = 0;
                            this.parent.parent.audioFiles.sounds.kick.play();
                        } else {
                            enemy.destroy();
                        }
                    // Character entered enemy from other sides
                    } else if (this.invincibility === 0) {
                        if (enemy.type === "shell" && enemy.xVel == 0) {
                            // Character entered shell from the left
                            if (this.x + this.w - this.hitboxOffsetX > enemy.x + enemy.hitboxOffsetX && this.xOld + this.w - this.hitboxOffsetX <= enemy.x + enemy.hitboxOffsetX) {
                                enemy.xVel = 20;
                                this.x = enemy.x - this.w;
                                this.parent.parent.audioFiles.sounds.kick.currentTime = 0;
                                this.parent.parent.audioFiles.sounds.kick.play();
                            // Character entered shell from the right
                            } else if (this.x + this.hitboxOffsetX < enemy.x + enemy.w - enemy.hitboxOffsetX && this.xOld + this.hitboxOffsetX >= enemy.x + enemy.w - enemy.hitboxOffsetX) {
                                enemy.xVel = -20;
                                this.x = enemy.x + enemy.w;
                                this.parent.parent.audioFiles.sounds.kick.currentTime = 0;
                                this.parent.parent.audioFiles.sounds.kick.play();
                            }
                        } else {
                            if (this.h != 80) {
                                this.parent.parent.transitionTimer = this.frames.shrinking.length;
                                this.parent.parent.transition = true;
                                this.parent.parent.transitionType = "shrinking";
                                this.state.current = this.state.normal;
                                this.parent.parent.audioFiles.sounds.pipe.currentTime = 0;
                                this.parent.parent.audioFiles.sounds.pipe.play();
                            } else {
                                this.yVel = -40;
                                this.parent.parent.transition = true;
                                this.parent.parent.transitionType = "dying";
                                this.parent.parent.transitionTimer = this.parent.parent.transitionTimers.dying;
                                this.parent.parent.music.pause();
                                this.parent.parent.audioFiles.sounds.marioDie.currentTime = 0;
                                this.parent.parent.audioFiles.sounds.marioDie.play();
                            }
                        }
                    }
                }
            }
        });
    }

    collisionCheckCoins(coinList) {
        coinList.forEach(coin => {
            if (this.y + this.h > coin.y && this.y < coin.y + this.blocksize && this.x < coin.x + this.blocksize && this.x + this.w > coin.x) {
                coin.destroy();
            }
        });
    }

    collisionCheckFlags(flagList) {
        flagList.forEach(flag => {
            if (this.x + this.w - this.hitboxOffsetX > flag.x && this.parent.transitionType !== "flagReached") {
                if (this.y + this.h >= 920) {
                    this.x = flag.x - this.w + this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                } else {
                    this.parent.parent.transitionType = "flagReached";
                    this.parent.parent.transitionTimer = this.parent.parent.transitionTimers[this.parent.parent.transitionType];
                    this.parent.parent.transition = true;
                    this.x = flag.x;
                    this.parent.parent.destination = flag.destination;
                    this.parent.parent.audioFiles.sounds.flagpole.currentTime = 0;
                    this.parent.parent.audioFiles.sounds.flagpole.play();
                    this.parent.parent.music.pause();
                    flag.pullDown();
                }
            }
        })
    }

    collisionCheckElevatorPlatforms(elevatorPlatformList) {
        elevatorPlatformList.forEach(elevatorPlatform => {
            if (this.x + this.w > elevatorPlatform.x && this.x < elevatorPlatform.x + elevatorPlatform.w * elevatorPlatform.blocksize) {
                if (this.y + this.h > elevatorPlatform.y && this.yOld + this.h <= elevatorPlatform.y) {
                    this.y = elevatorPlatform.y - this.h;
                    this.yOld = this.y;
                    if (elevatorPlatform.movementType === "down") this.yVel = elevatorPlatform.yVel;
                    else this.yVel = 0;
                    this.inAir = false;
                }
            }
        });
    }

    collisionCheck() {
        if (this.parent.parent.transition || !this.collision) return;
        this.collisionCheckLeftScreenEdge();
        this.collisionCheckFallingToDeath();
        if (this.parent.onScreenElements.rectangles) this.collisionCheckRectangles(this.parent.onScreenElements.rectangles);
        if (this.parent.onScreenElements.platforms) this.collisionCheckPlatforms(this.parent.onScreenElements.platforms);
        if (this.parent.onScreenElements.steps) this.collisionCheckSteps(this.parent.onScreenElements.steps);
        if (this.parent.onScreenElements.tiles) this.collisionCheckTiles(this.parent.onScreenElements.tiles);
        if (this.parent.onScreenElements.pipes) this.collisionCheckPipes(this.parent.onScreenElements.pipes);
        if (this.parent.onScreenElements.items) this.collisionCheckItems(this.parent.onScreenElements.items);
        if (this.parent.onScreenElements.enemies) this.collisionCheckEnemies(this.parent.onScreenElements.enemies);
        if (this.parent.onScreenElements.coins) this.collisionCheckCoins(this.parent.onScreenElements.coins);
        if (this.parent.onScreenElements.flags) this.collisionCheckFlags(this.parent.onScreenElements.flags);
        if (this.parent.onScreenElements.elevatorPlatforms) this.collisionCheckElevatorPlatforms(this.parent.onScreenElements.elevatorPlatforms);
    }

    setMovement() {
        if (this.parent.parent.transition) return;
        if (this.inAir) this.movement.current = this.movement.jumping;
        else if (this.xVel === 0 && !this.inAir) {
            this.movement.current = this.movement.standing;
        } else if (this.xVel !== 0 && !this.inAir) {
            if (this.parent.parent.keyStates.sprint) {
                this.movement.current = this.movement.running;
            } else {
                this.movement.current = this.movement.walking;
            }
        }
    }

    setSprite() {
        if (this.parent.parent.transitionType === "dying") return;

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
            if (this.parent.parent.frame % 10 == 0) {
                this.starTime--;
                if (this.starTime == 0) {
                    this.state.current = this.state.last;
                    this.parent.parent.audioFiles.music.starman.pause();
                    this.parent.parent.music.currentTime = 0;
                    this.parent.parent.music.play();
                }
            }
            if (this.h == 80) {
                this.sY = 1600 + this.starTime % 3 * 480;
            } else {
                this.sY = 1440 + this.starTime % 3 * 480;
            }
        }

        // Standing/Walking/Jumping/Ducking/Swimming/etc
        if (this.movement.current === this.movement.standing) {
            this.sX = 0;
        } else if (this.movement.current === this.movement.running) {
            if (this.parent.parent.frame % 5 === 0) {
                this.frame++;
            }
            this.sX = this.frames.running[this.frame % this.frames.running.length];
        } else if (this.movement.current === this.movement.walking) {
            if (this.parent.parent.frame % 10 === 0) {
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
        if (this.invincibility > 0) this.invincibility--;
        if (this.parent.parent.transition) {
            this.runTransition();
        }
        this.setVelocities();
        this.updatePosition();
        this.collisionCheck();
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

class World {
    constructor(parent, destination) {
        this.objectName = "World";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.destination = destination;
        this.worldID = this.destination.worldID;
        this.gravity = worldData[this.worldID].gravity;
        this.end = worldData[this.worldID].width;
        this.levelEndLine = worldData[this.worldID].levelEndLine;
        this.backgroundColor = worldData[this.worldID].bg;
        this.theme = worldData[this.worldID].theme;
        this.spawnLocation = worldData[this.worldID].spawnLocation;
        this.needsUpdate = ["rectangles", "flags", "tiles", "elevatorPlatforms", "enemies", "coins", "items"]

        this.buildWorld(this.worldID);

        if (this.destination.scrollOffset) {
            this.scroll(this.destination.scrollOffset);
        }

        if (this.destination.spawnLocation) {
            this.spawnCharacter(this.destination.spawnLocation.x, this.destination.spawnLocation.y);
        } else {
            this.spawnCharacter(this.spawnLocation.x, this.spawnLocation.y);
        }

        if (this.destination.transitionType) {
            this.parent.transition = true;
            this.parent.transitionType = this.destination.transitionType;
            this.parent.transitionTimer = this.parent.transitionTimers[this.parent.transitionType];
        }
    }

    buildWorld(worldID) {
        this.worldElements = {};
        this.onScreenElements = {};

        for (let key in worldData[worldID].worldElements) {
            this.worldElements[key] = [];
            this.onScreenElements[key] = [];
            worldData[worldID].worldElements[key].forEach(element => {
                if (key === "rectangles") this.worldElements.rectangles.push(new Rectangle(this, element.x, element.y, element.w, element.h, element.theme, element.type, element.collision, element.individualCheck));
                else if (key === "platforms") this.worldElements.platforms.push(new Platform(this, element.x, element.y, element.w, element.theme, element.variant));
                else if (key === "steps") this.worldElements.steps.push(new Step(this, element.x, element.y, element.w, element.theme, element.type, element.reversed));
                else if (key === "tiles") this.worldElements.tiles.push(new Tile(this, element.x, element.y, element.theme, element.type, element.collision, element.item));
                else if (key === "hills") this.worldElements.hills.push(new Hill(this, element.x, element.y, element.h, element.theme, element.variant));
                else if (key === "clouds") this.worldElements.clouds.push(new Cloud(this, element.x, element.y, element.theme, element.amount));
                else if (key === "bushes") this.worldElements.bushes.push(new Bush(this, element.x, element.y, element.theme, element.amount));
                else if (key === "pipes") this.worldElements.pipes.push(new Pipe(this, element.x, element.y, element.size, element.theme, element.opening, element.destination));
                else if (key === "castles") this.worldElements.castles.push(new Castle(this, element.x, element.y, element.theme, element.name));
                else if (key === "enemies") this.worldElements.enemies.push(new Enemy(this, element.x, element.y, element.theme, element.type, element.facingRight));
                else if (key === "coins") this.worldElements.coins.push(new Coin(this, element.x, element.y, element.theme));
                else if (key === "elevatorPlatforms") this.worldElements.elevatorPlatforms.push(new ElevatorPlatform(this, element.x, element.y, element.w, element.movementType));
                else if (key === "flags") this.worldElements.flags.push(new Flag(this, element.x, element.y, element.h, element.theme, element.destination));
            });
        }
    }

    spawnCharacter(x, y) {
        this.character = new Character(this, x, y - this.parent.currentHeight, this.parent.currentHeight, this.parent.currentCharacterState);
    }

    spawnItem(x, y, theme, type, collision) {
        if (!this.worldElements.items) this.worldElements["items"] = [];
        this.worldElements.items.push(new Item(this, x, y, theme, type, collision));
    }

    update() {
        if (this.parent.transition) {
            if (this.worldElements.flags) {
                this.worldElements.flags.forEach(flag => {
                    flag.update();
                });
            }
            if (this.character) this.character.update();
            return;
        } else {
            for (let key in this.worldElements) {
                if (this.needsUpdate.includes(key)) {
                    this.worldElements[key].forEach(element => {
                        element.update();
                    });
                }
            }
            if (this.character) this.character.update();
        }
    }

    scroll(deltaX) {
        this.end -= deltaX;
        this.levelEndLine -= deltaX;

        for (let key in this.worldElements) {
            this.worldElements[key].forEach(element => {
                element.scroll(deltaX);
                if (!element.onScreen && element.x < this.parent.screensize.width && element.x + element.w * element.blocksize > 0) {
                    // console.log("Added: " + element.objectName)
                    element.addToOnScreen();
                } else if (element.onScreen && element.x + element.w * element.blocksize < 0) {
                    // console.log("Removed: " + element.objectName)
                    element.removeFromOnScreen();
                }
            });
        }
        
        if (this.character) this.character.scroll(deltaX);
    }

    draw() {
        // Background
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.parent.screensize.width, this.parent.screensize.height);

        if (this.onScreenElements.hills) {
            this.onScreenElements.hills.forEach(hill => {
                hill.draw();
            });
        }
        if (this.onScreenElements.bushes) {
            this.onScreenElements.bushes.forEach(bush => {
                bush.draw();
            });
        }
        if (this.onScreenElements.clouds) {
            this.onScreenElements.clouds.forEach(cloud => {
                cloud.draw();
            });
        }
        if (this.onScreenElements.castles) {
            this.onScreenElements.castles.forEach(castle => {
                castle.draw();
            });
        }
        if (this.onScreenElements.rectangles) {
            this.onScreenElements.rectangles.forEach(rectangle => {
                rectangle.draw();
            });
        }
        if (this.onScreenElements.platforms) {
            this.onScreenElements.platforms.forEach(platform => {
                platform.draw();
            });
        }
        if (this.onScreenElements.elevatorPlatforms) {
            this.onScreenElements.elevatorPlatforms.forEach(elevatorPlatform => {
                elevatorPlatform.draw();
            });
        }
        if (this.onScreenElements.steps) {
            this.onScreenElements.steps.forEach(step => {
                step.draw();
            });
        }
        if (this.onScreenElements.tiles) {
            this.onScreenElements.tiles.forEach(tile => {
                tile.draw();
            });
        }
        if (this.onScreenElements.flags) {
            this.onScreenElements.flags.forEach(flag => {
                flag.draw();
            });
        }
        if (this.onScreenElements.coins) {
            this.onScreenElements.coins.forEach(coin => {
                coin.draw();
            });
        }
        if (this.onScreenElements.enemies) {
            this.onScreenElements.enemies.forEach(enemy => {
                enemy.draw();
            });
        }
        if (this.onScreenElements.items) {
            this.onScreenElements.items.forEach(item => {
                item.draw();
            });
        }

        if (this.character) this.character.draw();

        if (this.onScreenElements.pipes) {
            this.onScreenElements.pipes.forEach(pipe => {
                pipe.draw();
            });
        }
    }
}

class Game {
    constructor() {
        this.objectName = "Game";
        this.blocksize = 80;
        this.screensize = {
            width: cvs.width,
            height: cvs.height
        };
        this.scrollLine = this.screensize.width / 2;
        this.keyStates = {
            left: false,
            right: false,
            sprint: false,
            up: false,
            down: false
        };
        this.currentHeight = 80;
        this.currentCharacterState = "normal";
        this.lives = 3;
        this.destination = {worldID: 14};

        this.transition = false;
        this.transitionType = null;
        this.transitionTimer = 0;
        this.transitionTimers = {
            "pipeOutTop": 60,
            "pipeEnterTop": 60,
            "pipeEnterLeft": 60,
            "flagReached": 480,
            "dying": 240,
            "cutscene1": 300,
        };

        this.gameState = {
            current: "menu",
            menu: "menu",
            paused: "paused",
            play: "play"
        }

        this.fullScreen = false;
        this.audioFiles = {
            music: {
                overworld: new Audio("audio/music_overworld.wav"),
                underworld: new Audio("audio/music_underworld.wav"),
                castle: new Audio("audio/music_castle.wav"),
                water: new Audio("audio/music_water.wav"),
                starman: new Audio("audio/music_starman.wav")
            },
            sounds: {
                oneUp: new Audio("audio/smb_1-up.wav"),
                bowserFalls: new Audio("audio/smb_bowserfalls.wav"),
                bowserFire: new Audio("audio/smb_bowserfire.wav"),
                breakBlock: new Audio("audio/smb_breakblock.wav"),
                bump: new Audio("audio/smb_bump.wav"),
                coin: new Audio("audio/smb_coin.wav"),
                fireball: new Audio("audio/smb_fireball.wav"),
                fireworks: new Audio("audio/smb_fireworks.wav"),
                flagpole: new Audio("audio/smb_flagpole.wav"),
                gameOver: new Audio("audio/smb_gameover.wav"),
                jumpSmall: new Audio("audio/smb_jump-small.wav"),
                jumpSuper: new Audio("audio/smb_jump-super.wav"),
                kick: new Audio("audio/smb_kick.wav"),
                marioDie: new Audio("audio/smb_mariodie.wav"),
                pause: new Audio("audio/smb_pause.wav"),
                pipe: new Audio("audio/smb_pipe.wav"),
                powerup: new Audio("audio/smb_powerup.wav"),
                powerupAppears: new Audio("audio/smb_powerup_appears.wav"),
                stageClear: new Audio("audio/smb_stage_clear.wav"),
                stomp: new Audio("audio/smb_stomp.wav"),
                vine: new Audio("audio/smb_vine.wav"),
                warning: new Audio("audio/smb_warning.wav"),
                worldClear: new Audio("audio/smb_world_clear.wav")
            }
        }

        this.setVolume(GAME_VOLUME);
    }

    setVolume(volume) {
        for (let type in this.audioFiles) {
            for (let audio in this.audioFiles[type]) {
                this.audioFiles[type][audio].volume = volume;
            }
        }
    }

    toggleFullscreen() {
        if (!this.fullScreen) {
            if (page.requestFullscreen) {
              page.requestFullscreen();
              this.fullScreen = true;
            } else if (page.mozRequestFullScreen) { /* Firefox */
              page.mozRequestFullScreen();
              this.fullScreen = true;
            } else if (page.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
              page.webkitRequestFullscreen();
              this.fullScreen = true;
            } else if (page.msRequestFullscreen) { /* IE/Edge */
              page.msRequestFullscreen();
              this.fullScreen = true;
            }
        } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
              this.fullScreen = false;
            } else if (document.mozCancelFullScreen) { /* Firefox */
              document.mozCancelFullScreen();
              this.fullScreen = false;
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
              document.webkitExitFullscreen();
              this.fullScreen = false;
            } else if (document.msExitFullscreen) { /* IE/Edge */
              document.msExitFullscreen();
              this.fullScreen = false;
            }
        }
    }

    showMenu() {
        if (this.gameState.current !== this.gameState.menu) return;
        ctx.fillStyle = "red"
        ctx.font = "30px Arial";
        ctx.fillText("Press enter to play", 50, 50)
    }

    startGame() {
        this.loadWorld();
    }

    loadWorld(height, state) {
        this.frame = 0;
        this.currentHeight = height || 80;
        this.currentCharacterState = state || "normal";
        this.currentWorld = this.destination.worldID;

        this.music = this.audioFiles.music[worldData[this.currentWorld].music] || this.audioFiles.music.overworld;
        this.music.currentTime = 0;
        this.music.loop = true;
        this.music.play();

        this.world = new World(this, this.destination);
    }

    // Runs each frame
    update() {
        if (this.gameState.current !== this.gameState.play) return;
        this.frame++;

        this.world.update();

        // Scroll screen if player character crossed "magic line"
        if (this.world.character.x > this.scrollLine && this.world.end > this.screensize.width) {
            const deltaX = Math.round(this.world.character.x - this.scrollLine);
            this.world.scroll(deltaX);
        }
    }

    draw() {
        if (this.gameState.current !== this.gameState.play) return;
        this.world.draw();
    }
}

function stopHere() {
    throw new Error("Halting execution");
}

function handleKeydown(e) {
    if (e.keyCode === 32 && !game.world.character.inAir) {
        game.world.character.jump();
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
        game.toggleFullscreen();
    } else if (e.keyCode === 13 && game.gameState.current === game.gameState.menu) {
        game.gameState.current = game.gameState.play;
        game.loadWorld();
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

function loop() {
    game.showMenu();
    game.update();
    game.draw();
    setTimeout(loop, 16.66);
}

const game = new Game();

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
cvs.addEventListener("dblclick", game.toggleFullscreen);

loop();