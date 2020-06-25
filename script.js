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
            cannonTop: {x: 720, y: 0},
            castleTop: {x: 880, y: 0},
            castleWindowsLeft: {x: 960, y: 0},
            castleWall: {x: 1040, y: 0},
            castleWindowsRight: {x: 1120, y: 0},
            questionBlock: {x: 1920, y: 0},
            disabled: {x: 2160, y: 0},
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
            },
            fireball: {
                x: 480,
                y: 720
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
            shell: {x: 800, y: 80},
            piranha: {x: 960, y: 0}
        }
    }
}

//TODO: Add piranha to all levels
const worldData = {
    "test": {
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
                {x: 160, y: 680, w: 10, type: "blockShiny", collision: true, individualCheck: true},
                // {x: 160, y: 760, w: 13, type: "blockShiny", collision: true, individualCheck: true},
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
            coins: [
                {x: 320, y: 600}
            ],
            steps : [
                {x: 10720, y: 680, w: 4},
                {x: 11200, y: 680, w: 4, reversed: true},
                {x: 11840, y: 680, w: 4},
                {x: 12400, y: 680, w: 4, reversed: true},
                {x: 14480, y: 360, w: 8},
            ],
            tiles: [
                {x: 80, y: 680, type: "questionBlock", item: {type: "starman"}},
                {x: 1280, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
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
                {x: 1760, y: 840, type: "koopaTroopa"},
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
                // {x: 1920, y: 120, destination: {worldID: 121, scrollOffset: null, transitionType: "cutscene1"}},
                {x: 15840, y: 120, destination: {worldID: 121, scrollOffset: null, transitionType: "cutscene1"}},
            ],
        }
    },
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
            ],
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
            ],
            piranhas: [
                {x: 8280, y: 600},
                {x: 8760, y: 520},
                {x: 9240, y: 680},
                {x: 14280, y: 600, once: true},
                {x: 14600, y: 600, once: true},
                {x: 14920, y: 600, once: true},
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
        this.w = 1;
        this.h = 1;
        this.yInitial = this.y;
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

        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        if (this.parent.constructor.name === "World") {
            const tileIndex = this.parent.worldElements.tiles.indexOf(this);
            this.parent.worldElements.tiles.splice(tileIndex, 1);
            const index = this.parent.onScreenElements.tiles.indexOf(this);
            this.parent.onScreenElements.tiles.splice(index, 1);
        } else {
            const tileIndex = tileList.indexOf(this);
            tileList.splice(tileIndex, 1);
        }
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
            this.collisionCheck();
            this.updateBoundingBox();
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

    collisionCheckCoins(list) {
        list.forEach(item => {
            if (this.top < item.bottom &&
                this.left < item.right &&
                this.right > item.left)
            {
                item.destroy();
            }
        });
    }

    collisionCheckEnemies(list) {
        list.forEach(item => {
            if (this.bottom > item.top &&
                this.top < item.bottom &&
                this.left < item.right && 
                this.right > item.left)
            {
                item.plopDeath();
            }
        });
    }

    collisionCheckItems(list) {
        list.forEach(item => {
            if (item.collision &&
                this.top < item.bottom &&
                this.left < item.right &&
                this.right > item.left)
            {
                item.bounce();
            }
        });
    }

    collisionCheck() {
        let world;
        if (this.parent.constructor.name === "World") {
            world = this.parent;
        } else {
            world = this.parent.parent;
        }
        if (world.onScreenElements.coins) this.collisionCheckCoins(world.onScreenElements.coins);
        if (world.onScreenElements.enemies) this.collisionCheckEnemies(world.onScreenElements.enemies);
        if (world.onScreenElements.items) this.collisionCheckItems(world.onScreenElements.items);
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
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
        this.theme = theme || this.parent.theme;
        this.type = type || "floor";
        this.collision = collision;
        if (this.type === "floor") this.collision = true;
        this.individualCheck = individualCheck;
        this.sX = spriteOffsets.tiles.type[this.type].x;
        this.sY = spriteOffsets.tiles.theme[this.theme].y + spriteOffsets.tiles.type[this.type].y;
        this.sprites = tileSprites;

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    build() {
        if (this.individualCheck) {
            this.tiles = [];

            for (let i = 0; i < this.h; i++) {
                for (let j = 0; j < this.w; j++) {
                    this.tiles.push(new Tile(this, this.x + j * this.blocksize, this.y + i * this.blocksize, this.theme, this.type, true));
                }
            }
        }
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.updateBoundingBox();

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
        this.h = 1;
        this.theme = theme || this.parent.theme;
        this.variant = variant || "Leaf";
        this.collision = true;

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    build() {
        this.tiles = [];

        for (let i = 0; i < this.w; i++) {
            let typeName;
            if (i === 0) typeName = `platform${this.variant}Left`;
            else if (i === this.w - 1) typeName = `platform${this.variant}Right`;
            else typeName = `platform${this.variant}`;

            this.tiles.push(new Tile(this, this.x + i * this.blocksize, this.y, this.theme, typeName, false, true));
        }
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.updateBoundingBox();

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

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    build() {
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

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.updateBoundingBox();

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
        this.h = 3;
        this.theme = theme || this.parent.theme;

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    build() {
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

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.updateBoundingBox();

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
        this.h = 2;

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    build() {
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

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.updateBoundingBox();

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
        this.h = this.w;
        this.theme = theme || this.parent.theme;
        this.type = type || "stair";
        this.reversed = reversed;

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    build() {
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
            this.rectangles.push(new Rectangle(this, x, y, 1, h, this.theme, this.type, true));
        }
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.updateBoundingBox();

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
        if (this.opening === "top") {
            this.w = 2;
            this.h = this.size;
        } else {
            this.w = this.size;
            this.h = 2;
        }
        this.destination = destination;
        this.collision = true;

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    build() {
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

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.updateBoundingBox();

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

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    build() {
        this.movingPiece = new Tile(this, this.x - this.blocksize / 2, this.y + this.blocksize, this.theme, "flagSail");
        this.movingDown = false;

        this.parts = [];

        this.parts.push(new Tile(this, this.x, this.y, this.theme, "flagTop", false, true));
        for (let i = 0; i < this.h - 2; i++) {
            this.parts.push(new Tile(this, this.x, this.y + (i + 1) *  this.blocksize, this.theme, "flagPole", false, true));
        }
        this.parts.push(new Tile(this, this.x, this.y + this.h * this.blocksize - this.blocksize, this.theme, "stair", false, true));
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.updateBoundingBox();

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
        this.castles = {
            "small": {
                w: 5,
                h: 5,
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
                h: 6,
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
        this.x = x;
        this.y = y;
        this.theme = theme || this.parent.theme;
        this.name = name || "small";
        this.w = this.castles[this.name].w;
        this.h = this.castles[this.name].h;
        this.left = this.x;
        this.right = this.x + this.w * this.blocksize;
        this.top = this.y;
        this.bottom = this.y + this.h * this.blocksize;

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    build() {
        this.tiles = [];

        this.castles[this.name].tiles.forEach(tile => {
            this.tiles.push(new Tile(this, this.x + tile.x, this.y + tile.y, this.theme, tile.type));
        })
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.updateBoundingBox();

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
        this.w = 1;
        this.h = 1;
        this.theme = theme || this.parent.theme;
        this.sX = spriteOffsets.objects.theme[this.theme].x;
        this.sY = 480;
        this.sprites = objectSprites;
        this.sequence = [0, 0, 80, 160, 240, 160];

        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.updateBoundingBox();
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class Enemy {
    constructor(parent, x, y, theme, type) {
        this.objectName = "Enemy";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.enemyProperties = {
            "goomba": {
                w: 1,
                h: 1,
                hitboxOffsetX: 20,
                hitboxOffsetTop: 30,
                hitboxOffsetBottom: 25,
                xVel: 5,
                yVel: 0,
                stompable: true,
                shootable: true,
            },
            "koopaTroopa": {
                w: 1,
                h: 2,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 85,
                hitboxOffsetBottom: 20,
                xVel: 5,
                yVel: 0,
                stompable: true,
                shootable: true,
            },
            "koopaParatroopa": {
                w: 1,
                h: 2,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 85,
                hitboxOffsetBottom: 20,
                xVel: 3,
                yVel: 5,
                stompable: true,
                shootable: true,
            },
            "shell": {
                w: 1,
                h: 1,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 5,
                hitboxOffsetBottom: 20,
                xVel: 0,
                yVel: 0,
                stompable: true,
                shootable: true,
            }
        }
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
        this.collision = true;
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

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.w = this.enemyProperties[this.type].w;
        this.h = this.enemyProperties[this.type].h;
        this.stompable = this.enemyProperties[this.type].stompable;
        this.shootable = this.enemyProperties[this.type].shootable;
        this.xVel = this.enemyProperties[this.type].xVel;
        this.yVel = this.enemyProperties[this.type].yVel;
        if (!this.facingRight) this.xVel *= -1;
        this.hitboxOffsetTop = this.enemyProperties[this.type].hitboxOffsetTop;
        this.hitboxOffsetBottom = this.enemyProperties[this.type].hitboxOffsetBottom;
        this.hitboxOffsetX = this.enemyProperties[this.type].hitboxOffsetX;
        if (this.animateSequences[this.type]) {
            this.animate = true;
            this.sequence = this.animateSequences[this.type];
        } else {
            this.animate = false;
            this.sequence = null;
        }
        
        if (this.type === "shell") this.shellTime = 0;

        this.updateBoundingBox();
    }

    fireballHit() {
        if (this.type === "koopaParatroopa") {
            this.type = "koopaTroopa";
            this.setProperties();
            this.parent.parent.audioFiles.sounds.kick.currentTime = 0;
            this.parent.parent.audioFiles.sounds.kick.play();
        } else if (this.type === "bowser") {
            this.hitpoints--;

            if (this.hitpoints <= 0) {
                this.plopDeath();
                this.parent.parent.audioFiles.sounds.kick.currentTime = 0;
                this.parent.parent.audioFiles.sounds.kick.play();
            } else {
                this.parent.parent.audioFiles.sounds.bump.currentTime = 0;
                this.parent.parent.audioFiles.sounds.bump.play();
            }
        } else if (this.type === "buzzyBeetle" || this.type === "bulletBill") {
            this.parent.parent.audioFiles.sounds.bump.currentTime = 0;
            this.parent.parent.audioFiles.sounds.bump.play();
        } else {
            this.plopDeath();
        }
    }

    plopDeath() {
        this.collision = false;
        this.animate = false;
        this.xVel = 0;
        this.yVel = -10;
        this.parent.parent.audioFiles.sounds.kick.currentTime = 0;
        this.parent.parent.audioFiles.sounds.kick.play();
    }

    flatDeath() {
        this.collision = false;
        this.animate = false;
        this.xVel = 0;
        this.sX = 160;
        this.destroyTimer = 90;
    }

    destroy() {
        const enemyIndex = this.parent.worldElements.enemies.indexOf(this);
        this.parent.worldElements.enemies.splice(enemyIndex, 1);

        const index = this.parent.onScreenElements.enemies.indexOf(this);
        this.parent.onScreenElements.enemies.splice(index, 1);
    }

    updatePosition() {
        if (this.destroyTimer > 0) return;
        if (this.type != "koopaParatroopa") this.yVel += this.gravity;
        
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;
        this.updateBoundingBox();
    }

    collisionCheckRectangles(list) {
        list.forEach(item => {
            if (item.collision &&
                this.bottom > item.top &&
                this.top < item.bottom &&
                this.left < item.right &&
                this.right > item.left)
                {
                // Top
                if (this.bottom > item.top && this.bottomOld <= item.top) {
                    this.y = item.top - this.h * this.blocksize;
                    this.yOld = this.y;
                    if (this.type === "koopaParatroopa") {
                        this.yVel *= -1;
                    } else {
                        this.yVel = 0;
                    }
                    this.updateBoundingBox();
                // Left
                } else if (this.right > item.left && this.rightOld <= item.left) {
                    this.x = item.left - this.w * this.blocksize;
                    this.xOld = this.x;
                    this.xVel *= -1;
                    this.facingRight = !this.facingRight;
                    this.updateBoundingBox();
                // Right
                } else if (this.left < item.right && this.leftOld >= item.right) {
                    this.x = item.right;
                    this.xOld = this.x;
                    this.xVel *= -1;
                    this.facingRight = !this.facingRight;
                    this.updateBoundingBox();
                // Bottom
                } else if (this.top < item.bottom && this.topOld >= item.bottom) {
                    this.y = item.bottom;
                    this.yOld = this.y;
                    if (this.type === "koopaParatroopa") {
                        this.yVel *= -1;
                    } else {
                        this.yVel = 0;
                    }
                    this.updateBoundingBox();
                }
            }
            // Red KoopaTrooper don't jump off ledges
            if (this.type === "koopaTroopa" &&
                this.theme === "castle" &&
                this.bottom === item.top &&
                ((this.left < item.left && this.leftOld >= item.left) || (this.right > item.right && this.rightOld <= item.right))) 
                {
                this.xVel *= -1;
                this.facingRight = !this.facingRight;
                this.updateBoundingBox();
            }
        });
    }

    collisionCheckSteps(list) {
        list.forEach(item => {
            this.collisionCheckRectangles(item.rectangles);
        });
    }

    collisionCheckEnemies(list) {
        list.forEach(item => {
            if (item === this) return;
            
            if ((this.right > item.left && this.rightOld <= item.left) || (this.left < item.right && this.leftOld >= item.right))
            {
                if (this.type === "shell" && this.xVel != 0) {
                    item.plopDeath();
                    this.parent.parent.audioFiles.sounds.kick.currentTime = 0;
                    this.parent.parent.audioFiles.sounds.kick.play();
                } else {
                    this.xVel *= -1;
                    this.facingRight = !this.facingRight;
                }
            }
        });
    }

    collisionCheck() {
        // Screen edges
        if (this.right + 4 * this.blocksize < 0 || this.left - 4 * this.blocksize > this.parent.parent.screensize.width || this.top > this.parent.parent.screensize.height) {
            this.destroy();
        }

        if (!this.collision) return;

        if (this.parent.onScreenElements.rectangles) this.collisionCheckRectangles(this.parent.onScreenElements.rectangles);
        if (this.parent.onScreenElements.platforms) this.collisionCheckRectangles(this.parent.onScreenElements.platforms);
        if (this.parent.onScreenElements.steps) this.collisionCheckSteps(this.parent.onScreenElements.steps);
        if (this.parent.onScreenElements.tiles) this.collisionCheckRectangles(this.parent.onScreenElements.tiles);
        if (this.parent.onScreenElements.pipes) this.collisionCheckRectangles(this.parent.onScreenElements.pipes);
        if (this.parent.onScreenElements.enemies) this.collisionCheckEnemies(this.parent.onScreenElements.enemies);
        //TODO: Reflect off items

        // KoopaParatroopa up-down-movement
        if (this.type === "koopaParatroopa" && this.bottom > this.yInitial + 3 * this.blocksize || this.top < this.yInitial - 3 * this.blocksize) this.yVel *= -1;

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
        if (this.destroyTimer > 0) this.destroyTimer--;
        else if (this.destroyTimer === 0) this.destroy();

        if (this.type === "shell") {
            this.shellTime++;

            if (this.shellTime === 360) {
                this.sX += 80;
            } else if (this.shellTime >= 480) {
                this.type = "koopaTroopa";
                this.y -= this.h * this.blocksize;
                this.setProperties();
            }
        }

        this.updatePosition();
        this.collisionCheck();
        this.setSprite();
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.xOld -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class Piranha {
    constructor(parent, x, y, theme, once) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = this.parent.gravity;
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.yInitial = y;
        this.h = 2;
        this.w = 1;
        this.hitboxOffsetTop = 105;
        this.hitboxOffsetBottom = 15;
        this.hitboxOffsetX = 20;
        this.theme = theme || this.parent.theme;
        this.once = once;
        this.sprites = enemySprites;
        this.sX = spriteOffsets.enemies.type.piranha.x;
        this.sY = spriteOffsets.enemies.theme[this.theme].y + spriteOffsets.enemies.type.piranha.y;
        this.yVel = 3;
        this.sequence = [0, 80];
        this.timeOut = 0;
        this.collision = true;
        this.canMove = true;
        this.canMoveThreshold = 1.5 * this.blocksize;

        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.piranhas.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.piranhas.indexOf(this);
        this.parent.onScreenElements.piranhas.splice(index, 1);
    }

    plopDeath() {
        this.collision = false;
        this.animate = false;
        this.xVel = 0;
        this.yVel = -10;
        game.audioFiles.sounds.stomp.currentTime = 0;
        game.audioFiles.sounds.stomp.play();
    }

    destroy() {
        const worldIndex = this.parent.worldElements.piranhas.indexOf(this);
        this.parent.worldElements.piranhas.splice(worldIndex, 1);

        const onScreenIndex = this.parent.onScreenElements.piranhas.indexOf(this);
        this.parent.onScreenElements.piranhas.splice(onScreenIndex, 1);
    }

    updateVelocities() {
        if (!this.collision) {
            this.yVel += this.gravity;
        }
    }

    updatePosition() {
        if (!this.collision) {
            this.y += this.yVel;
            return;
        }

        if (!this.canMove && this.y >= this.yInitial + this.h * this.blocksize) return;

        if (this.timeOut > 0) {
            this.timeOut--;
            return;
        }

        this.y += this.yVel;

        if (this.y <= this.yInitial || this.y >= this.yInitial + this.h * this.blocksize) {
            if (this.once) this.destroy();
            this.yVel *= -1;
            this.timeOut = 90;
        }

        this.updateBoundingBox();
    }

    setSprite() {
        if (!this.animate) return;
        if (this.parent.parent.frame % 20 === 0) {
            this.frame = (this.frame + 1) % this.sequence.length;
            this.sX = spriteOffsets.enemies.type.piranha.x + this.sequence[this.frame]
        }
    }

    update() {
        this.updateVelocities();
        this.updatePosition();
        this.setSprite();
    }

    scroll(deltaX) {
        this.x -= deltaX;

        this.updateBoundingBox();

        if (!this.parent.destination.spawnLocation) return; 
        if (this.parent.destination.spawnLocation.x + this.w * this.blocksize > this.left && this.parent.destination.spawnLocation.x < this.right) {
            this.y += this.h * this.blocksize;
            this.timeOut = 90;
            this.yVel = -this.yVel;
            this.canMove = false;
            this.updateBoundingBox();
        }
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
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
        this.h = 1;
        this.sprites = objectSprites;
        this.sX = 320;
        this.sY = 640;
        this.movementType = movementType;
        this.weightApplied = false;

        this.updateBoundingBox();

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

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        this.updateBoundingBox();
    }

    collisionCheck() {
        const c = this.parent.character;

        // Top of screen
        if (this.movementType === "up" && this.bottom < 0) {
            this.y = this.parent.parent.screensize.height;
            this.updateBoundingBox();
        }
        // Bottom of Screen
        else if (this.movementType === "down" && this.top > this.parent.parent.screensize.height) {
            this.y = -this.h * this.blocksize;
            this.updateBoundingBox();
        }
        else if (this.movementType === "falling" && this.top > this.parent.parent.screensize.height) this.destroy();
        else if (this.movementType === "leftRight" && (this.right >= this.xInitial + (this.w + 3) * this.blocksize || this.left <= this.xInitial - 3 * this.blocksize)) this.xVel *= -1;
        else if (this.movementType === "upDown" && (this.top > this.yInitial + 6 * this.blocksize || this.bottom < this.yInitial + (this.h - 6) * this.blocksize)) this.yVel *= -1;

        if (this.yVel < 0 &&
            !c.inAir &&
            c.right > this.left &&
            c.left < this.right &&
            c.bottom > this.top &&
            c.bottom <= this.topOld)
            {
                c.y = this.top - c.h * c.blocksize;
                c.yOld = c.y;
                c.yVel = 0;
                c.inAir = false;
                c.updateBoundingBox();
        } else if (this.movementType === "leftRight" &&
            c.bottom == this.top &&
            c.rightOld > this.leftOld &&
            c.left < this.rightOld)
        {
            const deltaX = this.left - this.leftOld;
            c.x += deltaX;
            c.updateBoundingBox();
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
        this.updateBoundingBox();
    }

    draw() {
        for (let i = 0; i < this.w; i++) {
            ctx.drawImage(this.sprites, this.sX, this.sY, this.blocksize, this.blocksize, this.x + i * this.blocksize, this.y, this.blocksize, this.blocksize);
        }
    }
}

class Item {
    constructor (parent, x, y, theme, type) {
        this.objectName = "Item";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.itemVelTable = {
            brokenTileTopLeft: {xVel: -4, yVel: -20},
            brokenTileTopRight: {xVel: 4, yVel: -20},
            brokenTileBottomLeft: {xVel: -4, yVel: -20},
            brokenTileBottomRight: {xVel: 4, yVel: -20}
        };
        this.gravity = this.parent.gravity;
        this.x = x;
        this.xOld = this.x;
        this.y = y;
        this.yOld = this.y;
        this.yInitial = this.y;
        this.w = 1;
        this.h = 1;
        this.theme = theme || this.parent.theme;
        this.type = type;
        if (this.type === "coinItem") {
            this.xVel = 0;
            this.yVel = -30;
        } else if (this.type === "magicMushroom" || this.type === "fireFlower" || this.type === "starman" || this.type === "oneUp") {
            this.xVel = 0;
            this.yVel = -1.75;
        } else {
            this.xVel = this.itemVelTable[this.type].xVel;
            this.yVel = this.itemVelTable[this.type].yVel;
            this.heightToDraw = this.h * this.blocksize;
        }
        this.despawnTimer = 0;
        this.collision = false;
        this.hitboxOffsetX = 10;
        this.hitboxOffsetTop = 10;
        this.hitboxOffsetBottom = 15;
        this.sprites = objectSprites;
        this.sX = spriteOffsets.objects.theme[this.theme].x + spriteOffsets.objects.type[this.type].x;
        this.sY = spriteOffsets.objects.type[this.type].y;
        this.lifetime = 15;
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

        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
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
        const g = this.parent.parent;
        const c = this.parent.character;

        if (this.type === "magicMushroom" || this.type === "fireFlower" && c.h === 1) {
            g.setTransition("growing");
            g.audioFiles.sounds.powerup.currentTime = 0;
            g.audioFiles.sounds.powerup.play()
        } else if (this.type === "fireFlower" && c.h === 2) {
            if (c.state.current != c.state.starman) c.state.current = c.state.flower;
            c.state.last = c.state.flower;
            g.audioFiles.sounds.powerup.currentTime = 0;
            g.audioFiles.sounds.powerup.play()
        } else if (this.type === "oneUp") {
            g.lives++;
            g.audioFiles.sounds.oneUp.currentTime = 0;
            g.audioFiles.sounds.oneUp.play()
        } else if (this.type === "starman") {
            c.state.last = c.state.current;
            c.state.current = c.state.starman;
            c.starTime = 61;
            g.music.pause();
            g.audioFiles.music.starman.currentTime = 0;
            g.audioFiles.music.starman.play();
        }
    }

    bounce() {
        this.yVel = -15;
    }

    destroy() {
        const itemIndex = this.parent.worldElements.items.indexOf(this);
        this.parent.worldElements.items.splice(itemIndex, 1);
        const index = this.parent.onScreenElements.items.indexOf(this);
        this.parent.onScreenElements.items.splice(index, 1);
    }

    updateVelocities() {
        if ((this.type === "magicMushroom" || this.type === "fireFlower" || this.type === "oneUp" || this.type === "starman") && !this.collision) return;
        this.yVel += this.gravity;
    }

    updatePosition() {
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;
        this.updateBoundingBox();

        if (Object.keys(this.itemVelTable).includes(this.type) || this.collision) return;

        if (this.top <= this.yInitial - this.h * this.blocksize) {
            this.collision = true;
            if (this.type === "magicMushroom" || this.type === "oneUp") {
                this.xVel = 3;
            } else if (this.type === "starman") {
                this.xVel = 3;
                this.yVel = -30;
            } else {
                this.xVel = 0;
                this.yVel = 0;
            }
        } else {
            this.heightToDraw = this.yInitial - this.y;
        }
    }

    collisionCheckRectangles(list) {
        list.forEach(item => {
            if (item.collision &&
                this.bottom > item.top &&
                this.top < item.bottom &&
                this.left < item.right &&
                this.right > item.left) {
                // Top
                if (this.bottom > item.top && this.bottomOld <= item.top) {
                    this.y = item.top - this.h * this.blocksize;
                    this.yOld = this.y;
                    if (this.type === "starman") {
                        this.yVel = -30;
                    } else {
                        this.yVel = 0;
                    }
                    this.updateBoundingBox();
                // Left
                } else if (this.right > item.left && this.rightOld <= item.left) {
                    this.x = item.left - this.w * this.blocksize;
                    this.xOld = this.x;
                    this.xVel *= -1;
                    this.updateBoundingBox();
                // Right
                } else if (this.left < item.right && this.leftOld >= item.right) {
                    this.x = item.right;
                    this.xOld = this.x;
                    this.xVel *= -1;
                    this.updateBoundingBox();
                // Bottom
                } else if (this.top < item.bottom && this.topOld >= item.bottom) {
                    this.y = item.bottom;
                    this.yOld = this.y;
                    this.yVel = 0;
                    this.updateBoundingBox();
                }
            }
        });
    }

    collisionCheckSteps(list) {
        list.forEach(item => {
            this.collisionCheckRectangles(item.rectangles);
        });
    }

    collisionCheck() {
        // Screen edges
        if (this.right + 4 * this.blocksize < 0 || this.left - 4 * this.blocksize > this.parent.parent.screensize.width || this.top > this.parent.parent.screensize.height) {
            this.destroy();
        }

        if (!this.collision) return;

        if (this.parent.onScreenElements.rectangles) this.collisionCheckRectangles(this.parent.onScreenElements.rectangles);
        if (this.parent.onScreenElements.platforms) this.collisionCheckRectangles(this.parent.onScreenElements.platforms);
        if (this.parent.onScreenElements.steps) this.collisionCheckSteps(this.parent.onScreenElements.steps);
        if (this.parent.onScreenElements.tiles) this.collisionCheckRectangles(this.parent.onScreenElements.tiles);
        if (this.parent.onScreenElements.pipes) this.collisionCheckRectangles(this.parent.onScreenElements.pipes);
        if (this.parent.onScreenElements.enemies) this.collisionCheckRectangles(this.parent.onScreenElements.enemies);
        //TODO: Reflect off items
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
        if (this.type === "starman") {
            this.despawnTimer++;

            if (this.despawnTimer >= 360) {
                this.destroy();
            }
        }
        this.updateVelocities();
        this.updatePosition();
        this.collisionCheck();
        this.setSprite();
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.heightToDraw, this.x, this.y, this.w * this.blocksize, this.heightToDraw);
    }
}

class Character {
    constructor(parent, x, y, h, state="normal") {
        this.objectName = "Character";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = this.parent.gravity;
        this.frame = 0;
        this.x = x;
        this.xOld = this.x;
        this.y = y;
        this.yOld = this.y;
        this.w = 1;
        this.h = h || 1;

        this.hitboxOffsetX = 20;
        this.hitboxOffsetTop = 25;
        this.hitboxOffsetCrouchExtra = 60;

        this.facingLeftYOffset = 240;
        this.xVel = 0;
        this.yVel = 0;
        this.jumpForce = 40;
        this.xVelMaxWalk = 10;
        this.xVelMaxSprint = 15;
        this.xVelMax = this.xVelMaxWalk;
        this.sprites = characterSprites;
        this.inAir = true;
        this.facingRight = true;
        this.friction = 0;
        this.frictionGround = .5;
        this.xAccel = 0;
        this.xAccelSprint = 1;
        this.xAccelWalk = 1;
        this.state = {
            current: state,
            last: "normal",
            normal: "normal",
            flower: "flower",
            starman: "starman",
        }
        this.movement = {
            current: "standing",
            standing: "standing",
            crouching: "crouching",
            walking: "walking",
            running: "running",
            jumping: "jumping",
            swimming: "swimming",
            crappling: "crappling",
            sliding: "sliding"
        }
        this.frames = {
            running: [80, 160, 240],
            growing: [
                {sX: 0, sY: 0, h: 2},
                {sX: 1200, sY: 0, h: 2},
                {sX: 0, sY: 160, h: 1},
                {sX: 1200, sY: 0, h: 2},
                {sX: 0, sY: 0, h: 2},
                {sX: 1200, sY: 0, h: 2},
                {sX: 0, sY: 160, h: 1},
            ],
            shrinking: [
                {sX: 0, sY: 160, h: 1},
                {sX: 1200, sY: 0, h: 2},
                {sX: 0, sY: 0, h: 2},
                {sX: 1200, sY: 0, h: 2},
                {sX: 0, sY: 0, h: 2},
                {sX: 1200, sY: 0, h: 2},
                {sX: 0, sY: 160, h: 1},
            ],
        }
        this.visible = true;
        this.invincibility = 0;
        this.starTime = 0;
        this.dying = 0;
        this.collision = true;
        this.fireballCooldown = 0;
        this.canShootAgain = true;

        this.updateBoundingBox();
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
    }

    jump() {
        if (this.parent.parent.transition) return;
        this.yVel -= this.jumpForce;
        this.inAir = true;
        this.movement.current = this.movement.jumping;
        this.parent.parent.audioFiles.sounds.jumpSmall.currentTime = 0;
        this.parent.parent.audioFiles.sounds.jumpSmall.play();
    }

    shoot() {
        if ((this.state.current === this.state.flower || this.state.current === this.state.starman && this.state.last === this.state.flower) && this.fireballCooldown <= 0 && this.canShootAgain) {
            this.canShootAgain = false;
            this.parent.spawnFireBall(this.x + this.w * this.blocksize / 2, this.y + this.h * this.blocksize * .25);
            this.fireballCooldown = 15;
            this.parent.parent.audioFiles.sounds.fireball.play();
        }
    }

    gotInjured() {
        if (this.h === 2) {
            this.parent.parent.setTransition("shrinking");
            this.invincibility = 480;
            this.state.current = this.state.normal;
            this.parent.parent.audioFiles.sounds.pipe.currentTime = 0;
            this.parent.parent.audioFiles.sounds.pipe.play();
        } else {
            this.yVel = -40;
            this.parent.parent.setTransition("dying");
            this.parent.parent.audioFiles.sounds.marioDie.currentTime = 0;
            this.parent.parent.audioFiles.sounds.marioDie.play();
            this.parent.parent.music.pause();
        }
    }

    setHeight(height) {
        if (height === 1 && this.h !== 1) {
            this.hitboxOffsetX = 20;
            this.hitboxOffsetTop = 25;
            this.y += this.blocksize;
            this.h = 1;
        } else if (height === 2 && this.h !== 2) {
            this.hitboxOffsetX = 15;
            this.hitboxOffsetTop = 40;
            this.y -= this.blocksize;
            this.h = 2;
        }
    }

    runTransition() {
        const g = this.parent.parent;
        const w = this.parent;

        if (g.transitionType === "flagReached" && this.bottom < 920) {
            this.yVel = 5;
            this.xVel = 0;
            this.movement.current = this.movement.crappling;
        } else if (g.transitionType === "flagReached" && this.bottom >= 1000 && this.right < w.levelEndLine) {
            this.yVel = 0;
            this.xVel = 5;
            this.movement.current = this.movement.walking;
        } else if (g.transitionType === "flagReached" && this.right > w.levelEndLine) {
            if (g.audioFiles.sounds.stageClear.currentTime === 0) {
                g.audioFiles.sounds.stageClear.play();
            }
            this.visible = false;

            if (g.transitionTimer == 0) {
                g.transition = false;
                g.transitionType = null;
                g.loadWorld(this.h, this.state.current);
            }

            g.transitionTimer--;
        } else if (g.transitionType === "pipeEnterTop") {
            if (g.transitionTimer == 0) {
                g.transition = false;
                g.transitionType = null;
                g.loadWorld(this.h, this.state.current);
            }
            this.xVel = 0;
            this.yVel = 3;
            this.movement.current = this.movement.standing;

            g.transitionTimer--;
        } else if (g.transitionType === "pipeOutTop") {
            if (g.transitionTimer == 0) {
                g.transition = false;
                g.transitionType = null;
            }
            this.xVel = 0;
            this.yVel = -3;
            this.movement.current = this.movement.standing;

            g.transitionTimer--;
        } else if (g.transitionType === "pipeEnterLeft") {
            if (g.transitionTimer == 35) this.visible = false;
            if (g.transitionTimer == 0) {
                g.transition = false;
                g.transitionType = null;
                if (g.music) {
                    g.music.pause();
                    g.music.currentTime = 0;
                }
                g.loadWorld(this.h, this.state.current);
            }
            this.xVel = 3;
            this.yVel = 0;
            this.movement.current = this.movement.walking;

            g.transitionTimer--;
        } else if (g.transitionType === "growing") {
            if (g.transitionTimer == 0) {
                g.transition = false;
                g.transitionType = null;
            } else if (g.frame % 5 == 0) {
                this.sX = this.frames.growing[g.transitionTimer - 1].sX;
                this.sY = this.frames.growing[g.transitionTimer - 1].sY;
                this.setHeight(this.frames.growing[g.transitionTimer - 1].h);

                // In which direction is the player looking
                if (!this.facingRight) {
                    this.sY += this.facingLeftYOffset;
                }

                g.transitionTimer--;
            }
        } else if (g.transitionType === "shrinking") {
            if (g.transitionTimer == 0) {
                g.transition = false;
                g.transitionType = null;
                this.invincibility = 240;
            } else if (g.frame % 5 == 0) {
                this.sX = this.frames.shrinking[g.transitionTimer - 1].sX;
                this.sY = this.frames.shrinking[g.transitionTimer - 1].sY;
                this.setHeight(this.frames.shrinking[g.transitionTimer - 1].h);
    
                // In which direction is the player looking
                if (!this.facingRight) {
                    this.sY += this.facingLeftYOffset;
                }

                g.transitionTimer--;
            }
        } else if (g.transitionType === "dying") {
            if (g.transitionTimer == 0) {
                g.transition = false;
                g.transitionType = null;
                g.loadWorld();
            }
            this.xVel = 0;
            this.yVel += this.gravity;
            this.sX = 480;
            this.sY = 160;

            g.transitionTimer--;
        } else if (g.transitionType === "cutscene1") {
            if (g.music.currentTime === 0) {
                g.music.play();
            }
            if (this.left >= 1040) {
                g.audioFiles.sounds.pipe.currentTime = 0;
                g.audioFiles.sounds.pipe.play();
                g.destination = {worldID: 12};
                g.transitionType = "pipeEnterLeft";
                g.transitionTimer = g.transitionTimers[g.transitionType];
            }
            this.movement.current = this.movement.walking;
            this.collision = false;
            this.xVel = 5;
            this.yVel = 0;
        }
    }

    setVelocities() {
        const g = this.parent.parent;

        if (g.transition) return;

        // User wants to move right
        if (g.keyStates.right && !g.keyStates.left && !g.keyStates.down) {
            this.facingRight = true;
            if (this.xVel >= 0) {
                if (g.keyStates.sprint) {
                    this.xAccel = this.xAccelSprint;
                    this.xVelMax = this.xVelMaxSprint;
                    if (!this.inAir) this.movement.current = this.movement.running;
                } else {
                    this.xAccel = this.xAccelWalk;
                    this.xVelMax = this.xVelMaxWalk;
                    if (!this.inAir) this.movement.current = this.movement.walking;
                }
            } else {
                this.xAccel = 0;
                if (!this.inAir) this.movement.current = this.movement.sliding;
            }
        // User wants to move left
        } else if (g.keyStates.left && !g.keyStates.right && !g.keyStates.down) {
            this.facingRight = false;
            if (this.xVel <= 0) {
                if (g.keyStates.sprint) {
                    this.xAccel = -this.xAccelSprint;
                    this.xVelMax = -this.xVelMaxSprint;
                    if (!this.inAir) this.movement.current = this.movement.running;
                } else {
                    this.xAccel = -this.xAccelWalk;
                    this.xVelMax = -this.xVelMaxWalk;
                    if (!this.inAir) this.movement.current = this.movement.walking;
                }
            } else {
                this.xAccel = 0;
                if (!this.inAir) this.movement.current = this.movement.sliding;
            }
        } else {
            this.xAccel = 0;
        }

        // Less xAccel if in air
        if (this.inAir) this.xAccel / 2;

        // Add friction
        if (this.xVel > 0) {
            this.friction = this.frictionGround;
        } else if (this.xVel < 0) {
            this.friction = -this.frictionGround;
        } else {
            this.friction = 0;
        }

        // Calculate new x velocity
        this.xVel = this.xVel + this.xAccel - this.friction;

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
        this.updateBoundingBox();
    }

    collisionCheckLeftScreenEdge() {
        if (this.left < 0) {
            this.x = 0;
            this.updateBoundingBox();
        }
    }

    collisionCheckFallingToDeath() {
        if (this.top > this.parent.parent.screensize.height) {
            this.y = 160;
            this.x = 80;
            this.updateBoundingBox();
        }
    }

    collisionCheckTiles(list) {
        const g = this.parent.parent;
        const w = this.parent;

        list.forEach(item => {
            if (item.collision &&
                this.bottom > item.top && 
                this.top + this.hitboxOffsetTop < item.bottom && 
                this.left + this.hitboxOffsetX < item.right && 
                this.right - this.hitboxOffsetX > item.left)
                {
                // Top
                if (item.type !== "secret" && this.bottom > item.top && this.bottomOld <= item.top) {
                    this.y = item.top - this.h * this.blocksize;
                    this.yOld = this.y;
                    this.yVel = 0;
                    this.inAir = false;
                    this.updateBoundingBox();
                // Left
                } else if (item.type !== "secret" && this.right - this.hitboxOffsetX > item.left && this.rightOld - this.hitboxOffsetX <= item.left) {
                    this.x = item.left - this.w * this.blocksize + this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                    this.updateBoundingBox();
                // Right
                } else if (item.type !== "secret" && this.left + this.hitboxOffsetX < item.right && this.leftOld + this.hitboxOffsetX >= item.right) {
                    this.x = item.right - this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                    this.updateBoundingBox();
                // Bottom
                } else if (this.top + this.hitboxOffsetTop < item.bottom && this.topOld + this.hitboxOffsetTop >= item.bottom) {
                    this.y = item.bottom - this.hitboxOffsetTop;
                    this.yOld = this.y;
                    this.yVel = 0;
                    this.updateBoundingBox();

                    if (item.type === "disabled") {
                        g.audioFiles.sounds.bump.currentTime = 0;
                        g.audioFiles.sounds.bump.play();
                    } else if (item.type === "multiCoinBlock") {
                        if (item.states.current === item.states.inactive) {
                            w.spawnItem(item.x, item.y - item.blocksize, item.theme, "coinItem");
                            g.audioFiles.sounds.coin.currentTime = 0;
                            g.audioFiles.sounds.coin.play();
                            item.bounce();
                            item.states.current = item.states.active;
                        } else if (item.states.current === item.states.active) {
                            w.spawnItem(item.x, item.y - item.blocksize, item.theme, "coinItem");
                            g.audioFiles.sounds.coin.currentTime = 0;
                            g.audioFiles.sounds.coin.play();
                            item.bounce();
                        } else if (item.states.current === item.states.lastHit) {
                            w.spawnItem(item.x, item.y - item.blocksize, item.theme, "coinItem");
                            g.audioFiles.sounds.coin.currentTime = 0;
                            g.audioFiles.sounds.coin.play();
                            item.bounce();
                            item.type = "disabled";
                            item.setSpriteOffsets()
                        }
                    } else if ((item.type === "blockShiny" || item.type === "block") && !item.item) {
                        if (this.h == 2) {
                            g.audioFiles.sounds.breakBlock.currentTime = 0;
                            g.audioFiles.sounds.breakBlock.play();
                            w.spawnItem(item.x - item.blocksize / 2, item.y - item.blocksize / 2, item.theme, "brokenTileTopLeft");
                            w.spawnItem(item.x + item.blocksize / 2, item.y - item.blocksize / 2, item.theme, "brokenTileTopRight");
                            w.spawnItem(item.x - item.blocksize / 2, item.y + item.blocksize / 2, item.theme, "brokenTileBottomLeft");
                            w.spawnItem(item.x + item.blocksize / 2, item.y + item.blocksize / 2, item.theme, "brokenTileBottomRight");
                            item.destroy(list);
                        } else {
                            g.audioFiles.sounds.bump.currentTime = 0;
                            g.audioFiles.sounds.bump.play();
                            item.bounce();
                        }
                    } else if (item.item) {
                        item.bounce();
                        // Spawn flower instead of mushroom if we are big
                        if (item.item.type === "magicMushroom") {
                            if (this.h !== 1) {
                                w.spawnItem(item.x, item.y, item.item.theme, "fireFlower", true);
                            } else {
                                w.spawnItem(item.x, item.y, item.item.theme, "magicMushroom", true);
                            }
                            g.audioFiles.sounds.powerupAppears.currentTime = 0;
                            g.audioFiles.sounds.powerupAppears.play();
                        } else if (item.item.type === "coinItem") {
                            w.spawnItem(item.x, item.y - item.blocksize, item.item.theme, "coinItem");
                            g.audioFiles.sounds.coin.currentTime = 0;
                            g.audioFiles.sounds.coin.play();
                        } else {
                            w.spawnItem(item.x, item.y, item.item.theme, item.item.type);
                            g.audioFiles.sounds.powerupAppears.currentTime = 0;
                            g.audioFiles.sounds.powerupAppears.play();
                        }

                        item.type = "disabled";
                        item.setSpriteOffsets()
                        item.animate = false;
                        item.item = null;
                    }
                }
            }
        });
    }

    collisionCheckRectangles(list) {
        const hitboxOffsetTop = (this.movement.current === this.movement.crouching) ? this.hitboxOffsetTop + this.hitboxOffsetCrouchExtra : this.hitboxOffsetTop;
        list.forEach(item => {
            if (item.collision && item.individualCheck) {
                this.collisionCheckTiles(item.tiles);
            } else if (item.collision &&
                this.bottom > item.top &&
                this.top + hitboxOffsetTop < item.bottom &&
                this.left + this.hitboxOffsetX < item.right &&
                this.right - this.hitboxOffsetX > item.left) 
                {
                // Top
                if (this.bottom > item.top && this.bottomOld <= item.top) {
                    this.y = item.top - this.h * this.blocksize;
                    this.yOld = this.y;
                    this.yVel = 0;
                    this.inAir = false;
                    this.updateBoundingBox();
                // Left
                } else if (this.right - this.hitboxOffsetX > item.left && this.rightOld - this.hitboxOffsetX <= item.left) {
                    this.x = item.left - this.w * this.blocksize + this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                    this.updateBoundingBox();
                // Right
                } else if (this.left + this.hitboxOffsetX < item.right && this.leftOld + this.hitboxOffsetX >= item.right) {
                    this.x = item.right - this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                    this.updateBoundingBox();
                // Bottom
                } else if (this.top + hitboxOffsetTop < item.bottom && this.topOld + hitboxOffsetTop >= item.bottom) {
                    this.y = item.bottom - hitboxOffsetTop;
                    this.yOld = this.y;
                    this.yVel = 0;
                    this.updateBoundingBox();
                }
            }
        });
    }

    collisionCheckSteps(list) {
        list.forEach(item => {
            this.collisionCheckRectangles(item.rectangles);
        });
    }

    collisionCheckPipes(list) {
        const g = this.parent.parent;

        list.forEach(item => {
            if (item.opening === "top") {
                if (this.bottom > item.top &&
                    this.top < item.bottom &&
                    this.left < item.right &&
                    this.right > item.left) 
                    {
                    // Top
                    if (this.bottom > item.top && this.bottomOld <= item.top) {
                        if (item.destination &&
                            g.keyStates.down && 
                            !g.keyStates.up && 
                            this.left > item.left + item.blocksize * .25 && 
                            this.right < item.right - item.blocksize * .25)
                        {
                            this.x = item.x + item.blocksize / 2;
                            g.setTransition("pipeEnterTop");
                            g.destination = item.destination;
                            g.audioFiles.sounds.pipe.currentTime = 0;
                            g.audioFiles.sounds.pipe.play();
                        }
                        this.y = item.top - this.h * this.blocksize;
                        this.yOld = this.y;
                        this.yVel = 0;
                        this.inAir = false;
                        this.updateBoundingBox();
                    // Left
                    } else if (this.right > item.left && this.rightOld <= item.left) {
                        this.x = item.left - this.w * this.blocksize;
                        this.xOld = this.x;
                        this.xVel = 0;
                        this.updateBoundingBox();
                    // Right
                    } else if (this.left < item.right + 2 * item.blocksize && this.leftOld >= item.left + 2 * item.blocksize) {
                        this.x = item.right;
                        this.xOld = this.x;
                        this.xVel = 0;
                        this.updateBoundingBox();
                    // Bottom
                    } else if (this.top < item.bottom && this.topOld >= item.bottom) {
                        this.y = item.bottom;
                        this.yOld = this.y;
                        this.yVel = 0;
                        this.updateBoundingBox();
                    }
                }
            } else if (item.opening === "left") {
                if (this.bottom > item.top &&
                    this.top < item.bottom &&
                    this.left < item.right &&
                    this.right > item.left)
                    {
                    // Top
                    if (this.bottom > item.top && this.bottomOld <= item.top) {
                        this.y = item.top - this.h * this.blocksize;
                        this.yOld = this.y;
                        this.yVel = 0;
                        this.inAir = false;
                        this.updateBoundingBox();
                    // Left
                    } else if (this.right > item.left && this.rightOld <= item.left) {
                        if (item.destination &&
                            g.keyStates.right &&
                            !g.keyStates.left && 
                            this.bottom > item.top + item.blocksize * 1.25)
                        {
                            this.y = item.bottom - this.h * this.blocksize;
                            g.setTransition("pipeEnterLeft");
                            g.destination = item.destination;
                            g.audioFiles.sounds.pipe.currentTime = 0;
                            g.audioFiles.sounds.pipe.play();
                        }
                        this.x = item.left - this.w * this.blocksize;
                        this.xOld = this.x;
                        this.xVel = 0;
                        this.updateBoundingBox();
                    // Right
                    } else if (this.left < item.right && this.leftOld >= item.right) {
                        this.x = item.right;
                        this.xOld = this.x;
                        this.xVel = 0;
                        this.updateBoundingBox();
                    // Bottom
                    } else if (this.top < item.bottom && this.topOld >= item.bottom) {
                        this.y = item.bottom;
                        this.yOld = this.y;
                        this.yVel = 0;
                        this.updateBoundingBox();
                    }
                }
            }
        });
    }

    collisionCheckItems(list) {
        list.forEach(item => {
            if (item.collision &&
                this.bottom > item.top + item.hitboxOffsetTop &&
                this.top + this.hitboxOffsetTop < item.bottom - item.hitboxOffsetBottom &&
                this.left + this.hitboxOffsetX < item.right - item.hitboxOffsetX &&
                this.right - this.hitboxOffsetX > item.left + item.hitboxOffsetX)
            {
                item.activate();
                item.destroy();
            }
        });
    }

    collisionCheckEnemies(list) {
        const g = this.parent.parent;

        list.forEach(item => {
            if (item.collision &&
                this.bottom > item.top + item.hitboxOffsetTop && 
                this.top + this.hitboxOffsetTop < item.bottom - item.hitboxOffsetBottom && 
                this.left + this.hitboxOffsetX < item.right - item.hitboxOffsetX && 
                this.right - this.hitboxOffsetX > item.left + item.hitboxOffsetX) 
            {
                if (this.state.current === this.state.starman) {
                    item.plopDeath();
                } else {
                    // Top
                    if (this.bottom > item.top + item.hitboxOffsetTop && this.bottomOld <= item.top + item.hitboxOffsetTop) {
                        this.y = item.top - this.h * this.blocksize;
                        this.yOld = this.y;
                        this.yVel = -20;
                        g.audioFiles.sounds.stomp.currentTime = 0;
                        g.audioFiles.sounds.stomp.play();
                        this.updateBoundingBox();
                        if (item.type === "koopaParatroopa") {
                            item.type = "koopaTroopa";
                            item.setSpriteOffsets();
                            item.setProperties();
                        } else if (item.type === "koopaTroopa") {
                            item.frame = 0;
                            item.type = "shell";
                            item.y += 80;
                            item.setSpriteOffsets();
                            item.setProperties();
                        } else if (item.type === "shell") {
                            if (item.xVel === 0) {
                                if (this.left >= item.left) {
                                    item.xVel = -20;
                                } else {
                                    item.xVel = 20;
                                }
                            } else {
                                item.xVel = 0;
                            }
                            g.audioFiles.sounds.kick.currentTime = 0;
                            g.audioFiles.sounds.kick.play();
                        } else if (item.type === "goomba") {
                            item.flatDeath();
                        }
                    } else if (this.invincibility === 0) {
                        if (item.type === "shell" && item.xVel === 0) {
                            // Left
                            if (this.right - this.hitboxOffsetX > item.left + item.hitboxOffsetX && this.rightOld - this.hitboxOffsetX <= item.left + item.hitboxOffsetX) {
                                item.xVel = 15;
                                this.x = item.left + item.hitboxOffsetX - this.w * this.blocksize - this.hitboxOffsetX;
                                this.updateBoundingBox();
                            // Right
                            } else if (this.left + this.hitboxOffsetX < item.right - item.hitboxOffsetX && this.leftOld + this.hitboxOffsetX >= item.right - item.hitboxOffsetX) {
                                item.xVel = -15;
                                this.x = item.right - item.hitboxOffsetX;
                                this.updateBoundingBox();
                            }
                            g.audioFiles.sounds.kick.currentTime = 0;
                            g.audioFiles.sounds.kick.play();
                        } else {
                            this.gotInjured();
                        }
                    }
                }
            }
        });
    }

    collisionCheckPiranhas(list) {
        list.forEach(item => {
            if (this.bottom > item.top && 
                this.top < item.bottom && 
                this.left < item.right && 
                this.right > item.left) 
            {
                this.gotInjured();
            } else if (this.left > item.right + item.canMoveThreshold && this.leftOld <= item.right + item.canMoveThreshold ||
                       this.right < item.left - item.canMoveThreshold && this.rightOld >= item.left - item.canMoveThreshold)
            {
                item.canMove = true;
                item.timeOut = 90;
            } 
            else if (this.left < item.right + item.canMoveThreshold && this.leftOld >= item.right + item.canMoveThreshold ||
                     this.right > item.left - item.canMoveThreshold && this.rightOld <= item.left - item.canMoveThreshold)
            {
                item.canMove = false;
                item.timeOut = 90;
            }
        });
    }

    collisionCheckCoins(list) {
        list.forEach(item => {
            if (this.bottom > item.top &&
                this.top < item.bottom &&
                this.left < item.right &&
                this.right > item.left)
            {
                item.destroy();
            }
        });
    }

    collisionCheckFlags(list) {
        const g = this.parent.parent;

        list.forEach(item => {
            if (this.right - this.hitboxOffsetX > item.left && g.transitionType !== "flagReached") {
                if (this.bottom >= item.bottom - item.blocksize) {
                    this.x = item.right + this.blocksize;
                    this.xOld = this.x;
                    this.xVel = 0;
                    this.updateBoundingBox();
                } else {
                    g.setTransition("flagReached");
                    this.x = item.left;
                    g.destination = item.destination;
                    g.audioFiles.sounds.flagpole.currentTime = 0;
                    g.audioFiles.sounds.flagpole.play();
                    g.music.pause();
                    item.pullDown();
                    this.updateBoundingBox();
                }
            }
        });
    }

    collisionCheckElevatorPlatforms(list) {
        list.forEach(item => {
            if (this.right > item.left &&
                this.left < item.right &&
                this.bottom > item.top &&
                this.bottomOld <= item.top)
            {
                this.y = item.top - this.h * this.blocksize;
                this.yOld = this.y;

                if (item.movementType === "down") this.yVel = item.yVel;
                else this.yVel = 0;

                this.inAir = false;

                this.updateBoundingBox();
            }
        });
    }

    collisionCheck() {
        if (this.parent.parent.transition || !this.collision) return;
        this.collisionCheckLeftScreenEdge();
        this.collisionCheckFallingToDeath();
        if (this.parent.onScreenElements.elevatorPlatforms) this.collisionCheckElevatorPlatforms(this.parent.onScreenElements.elevatorPlatforms);
        if (this.parent.onScreenElements.platforms) this.collisionCheckRectangles(this.parent.onScreenElements.platforms);
        if (this.parent.onScreenElements.rectangles) this.collisionCheckRectangles(this.parent.onScreenElements.rectangles);
        if (this.parent.onScreenElements.steps) this.collisionCheckSteps(this.parent.onScreenElements.steps);
        if (this.parent.onScreenElements.tiles) this.collisionCheckTiles(this.parent.onScreenElements.tiles);
        if (this.parent.onScreenElements.pipes) this.collisionCheckPipes(this.parent.onScreenElements.pipes);
        if (this.parent.onScreenElements.items) this.collisionCheckItems(this.parent.onScreenElements.items);
        if (this.parent.onScreenElements.enemies) this.collisionCheckEnemies(this.parent.onScreenElements.enemies);
        if (this.parent.onScreenElements.coins) this.collisionCheckCoins(this.parent.onScreenElements.coins);
        if (this.parent.onScreenElements.flags) this.collisionCheckFlags(this.parent.onScreenElements.flags);
        if (this.parent.onScreenElements.piranhas) this.collisionCheckPiranhas(this.parent.onScreenElements.piranhas);
    }

    setMovement() {
        if (this.parent.parent.transition) return;
        if (this.movement.current === this.movement.sliding && this.xVel == 0) this.movement.current = this.movement.standing;
        else if (this.movement.current === this.movement.running && this.xVel == 0) this.movement.current = this.movement.standing;
        else if (this.movement.current === this.movement.walking && this.xVel == 0) this.movement.current = this.movement.standing;
        else if (this.parent.parent.keyStates.down && !this.parent.parent.keyStates.up && this.h == 2) this.movement.current = this.movement.crouching;
        else if (this.inAir) this.movement.current = this.movement.jumping;
        else if (this.movement.current != this.movement.running && this.movement.current != this.movement.walking && this.movement.current != this.movement.sliding) this.movement.current = this.movement.standing;
    }

    setSprite() {
        const g = this.parent.parent;

        if (g.transitionType === "dying") return;

        if (this.state.current === this.state.normal) {
            if (this.h == 1) {
                this.sY = 160;
            } else {
                this.sY = 0;
            }
        } else if (this.state.current === this.state.flower) {
            if (this.h == 1) {
                this.sY = 1120;
            } else {
                this.sY = 960;
            }
        } else if (this.state.current === this.state.starman) {
            if (g.frame % 10 == 0) {
                this.starTime--;

                if (this.starTime == 0) {
                    this.state.current = this.state.last;
                    g.audioFiles.music.starman.pause();
                    g.music.currentTime = 0;
                    g.music.play();
                }
            }
            if (this.h == 1) {
                this.sY = 1600 + this.starTime % 3 * 480;
            } else {
                this.sY = 1440 + this.starTime % 3 * 480;
            }
        }

        // Standing/Walking/Jumping/Ducking/Swimming/etc
        if (this.movement.current === this.movement.standing) {
            this.sX = 0;
        } else if (this.movement.current === this.movement.sliding) {
            this.sX = 320;
        } else if (this.movement.current === this.movement.running) {
            if (g.frame % 5 === 0) {
                this.frame++;
            }
            this.sX = this.frames.running[this.frame % this.frames.running.length];
        } else if (this.movement.current === this.movement.walking) {
            if (g.frame % 10 === 0) {
                this.frame++;
            }
            this.sX = this.frames.running[this.frame % this.frames.running.length];
        } else if (this.movement.current === this.movement.jumping) {
            this.sX = 400;
        } else if (this.movement.current === this.movement.crappling) {
            this.sX = 640;
        } else if (this.movement.current === this.movement.crouching) {
            this.sX = 480
        }

        // In which direction is the player looking
        if (!this.facingRight) {
            this.sY += this.facingLeftYOffset;
        }
    }

    update() {
        if (this.invincibility > 0) {
            this.invincibility--;
            if (this.parent.parent.frame % 10 == 0) {
                this.visible = !this.visible;
            }
        } else if (!this.parent.parent.transition) {
            this.visible = true;
        }

        if (this.fireballCooldown > 0) this.fireballCooldown--;
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
            ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
        }
    }
}

class FireBall {
    constructor(parent, x, y) {
        this.parent = parent;
        this.gravity = this.parent.gravity;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.xOld = x;
        this.y = y;
        this.yOld = y;
        this.w = .5;
        this.h = .5;
        this.yVel = 0;
        if (this.parent.character.facingRight) {
            this.xVel = 15;
        } else {
            this.xVel = -15;
        }
        this.sprites = objectSprites;
        this.sX = spriteOffsets.objects.theme.overworld.x + spriteOffsets.objects.type.fireball.x;
        this.sY = spriteOffsets.objects.type.fireball.y;

        this.updateBoundingBox();
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y;
        this.topOld = this.yOld;
        this.bottom = this.y + this.h * this.blocksize;
        this.bottomOld = this.yOld + this.h * this.blocksize;
    }

    destroy() {
        const index = this.parent.onScreenElements.fireballs.indexOf(this);
        this.parent.onScreenElements.fireballs.splice(index, 1);
    }

    updateVelocities() {
        this.yVel += this.gravity;
    }

    updatePosition() {
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;
        this.updateBoundingBox();
    }

    collisionCheckRectangles(list) {
        const g = this.parent.parent;

        list.forEach(item => {
            if (item.collision &&
                this.left < item.right &&
                this.right > item.left &&
                this.top < item.bottom &&
                this.bottom > item.top)
            {
                if (this.bottom > item.top && this.bottomOld <= item.top) {
                    this.y = item.top - this.h * this.blocksize;
                    this.yVel = -10;
                    this.updateBoundingBox();
                } else {
                    this.destroy();
                    g.audioFiles.sounds.bump.currentTime = 0;
                    g.audioFiles.sounds.bump.play()
                }
            }
        });
    }

    collisionCheckSteps(list) {
        list.forEach(item => {
            this.collisionCheckRectangles(item.rectangles);
        });
    }

    collisionCheckFlags(list) {
        const g = this.parent.parent;

        list.forEach(item => {
            if (this.left < item.right &&
                this.right > item.left &&
                this.top < item.bottom &&
                this.bottom > item.top)
            {
                this.destroy();
                g.audioFiles.sounds.bump.currentTime = 0;
                g.audioFiles.sounds.bump.play()
            }
        });
    }

    collisionCheckEnemies(list) {
        list.forEach(item => {
            if (item.collision &&
                this.left < item.right &&
                this.right > item.left &&
                this.top < item.bottom &&
                this.bottom > item.top)
            {
                item.fireballHit();
                this.destroy();
            }
        });
    }

    collisionCheck() {
        const g = this.parent.parent;
        const w = this.parent;

        if (this.left > g.screensize.width || this.right < 0 || this.top > g.screensize.height) this.destroy();

        if (w.onScreenElements.rectangles) this.collisionCheckRectangles(w.onScreenElements.rectangles);
        if (w.onScreenElements.platforms) this.collisionCheckRectangles(w.onScreenElements.platforms);
        if (w.onScreenElements.elevatorPlatforms) this.collisionCheckRectangles(w.onScreenElements.elevatorPlatforms);
        if (w.onScreenElements.tiles) this.collisionCheckRectangles(w.onScreenElements.tiles);
        if (w.onScreenElements.flags) this.collisionCheckFlags(w.onScreenElements.flags);
        if (w.onScreenElements.enemies) this.collisionCheckEnemies(w.onScreenElements.enemies);
        if (w.onScreenElements.piranhas) this.collisionCheckEnemies(w.onScreenElements.piranhas);
        if (w.onScreenElements.pipes) this.collisionCheckRectangles(w.onScreenElements.pipes);
        if (w.onScreenElements.steps) this.collisionCheckSteps(w.onScreenElements.steps);
    }

    update() {
        this.updateVelocities();
        this.updatePosition();
        this.collisionCheck();
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
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
        this.needsUpdate = ["rectangles", "flags", "tiles", "elevatorPlatforms", "enemies", "piranhas", "coins", "items", "fireballs"]

        this.build(this.worldID);

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

    build(worldID) {
        this.worldElements = {};
        this.onScreenElements = {};
        this.onScreenElements.fireballs = [];

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
                else if (key === "piranhas") this.worldElements.piranhas.push(new Piranha(this, element.x, element.y, element.theme, element.once));
            });
        }
    }

    spawnCharacter(x, y) {
        this.character = new Character(this, x, y - this.parent.currentHeight * this.blocksize, this.parent.currentHeight, this.parent.currentCharacterState);
    }

    spawnFireBall(x, y) {
        this.onScreenElements.fireballs.push(new FireBall(this, x, y));
    }

    spawnItem(x, y, theme, type) {
        if (!this.worldElements.items) this.worldElements.items = [];
        this.worldElements.items.push(new Item(this, x, y, theme, type));
    }

    update() {
        if (this.parent.transition) {
            if (this.onScreenElements.flags) {
                this.onScreenElements.flags.forEach(flag => {
                    flag.update();
                });
            }
            if (this.character) this.character.update();
            return;
        } else {
            for (let key in this.onScreenElements) {
                if (this.needsUpdate.includes(key)) {
                    this.onScreenElements[key].forEach(element => {
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
                    element.addToOnScreen();
                } else if (element.onScreen && element.x + element.w * element.blocksize < 0) {
                    element.removeFromOnScreen();
                }
            });
        }

        this.onScreenElements.fireballs.forEach(fireball => {
            fireball.scroll(deltaX);
        });
        
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
        if (this.onScreenElements.piranhas) {
            this.onScreenElements.piranhas.forEach(piranha => {
                piranha.draw();
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

        if (this.onScreenElements.fireballs) {
            this.onScreenElements.fireballs.forEach(fireball => {
                fireball.draw();
            });
        }

        if (this.onScreenElements.pipes) {
            this.onScreenElements.pipes.forEach(pipe => {
                pipe.draw();
            });
        }
    }
}

class StatusBar {
    constructor(parent) {
        this.parent = parent;
        this.elements = {
            name: {x: 80, y: 20},
            score: {x: 80, y: 80}
        }
    }

    padNumber(numberStr, paddingAmount) {
        return numberStr.toString().padStart(paddingAmount, "0");
    }

    drawScore() {
        const score = this.padNumber(this.parent.score, 6);
        
        ctx.textAlign = "start";
        ctx.textBaseline = "top"; 
        ctx.fillText(this.parent.name, 80, 20);
        ctx.fillText(score, 80, 80);
    }

    drawCoins() {
        const coins = this.padNumber(this.parent.coins, 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "top"; 
        ctx.fillText("COINS", 720, 20);
        ctx.fillText(coins, 720, 80);
    }

    drawWorld() {
        ctx.textAlign = "center";
        ctx.textBaseline = "top"; 
        ctx.fillText("WORLD", 1200, 20);
        ctx.fillText(`${this.parent.worldNum}-${this.parent.levelNum}`, 1200, 80);
    }

    drawTime() {
        const time = this.padNumber(this.parent.time, 3);
        
        ctx.textAlign = "end";
        ctx.textBaseline = "top"; 
        ctx.fillText("TIME", this.parent.screensize.width - 80, 20);
        ctx.fillText(time, this.parent.screensize.width - 80, 80);
    }

    draw() {
        ctx.font = "60px VT323";
        ctx.fillStyle = "white";
        this.drawScore();
        this.drawCoins();
        this.drawWorld();
        this.drawTime();
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
        this.currentHeight = 1;
        this.currentCharacterState = "normal";
        this.name = "MARIO";
        this.score = 0;
        this.coins = 0;
        this.worldNum = 1;
        this.levelNum = 1;
        this.time = 400;
        this.lives = 3;
        this.destination = {worldID: "test"};

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
            "shrinking": 7,
            "growing": 7
        };

        this.gameState = {
            current: "menu",
            menu: "menu",
            paused: "paused",
            play: "play"
        }

        this.fullScreen = false;
        this.mainMenuImage = new Image();
        this.mainMenuImage.src = "img/mainMenu.png";
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

        this.statusBar = new StatusBar(this);

        this.setVolume(GAME_VOLUME);
    }

    setVolume(volume) {
        for (let type in this.audioFiles) {
            for (let audio in this.audioFiles[type]) {
                this.audioFiles[type][audio].volume = volume;
            }
        }
    }

    setTransition(type) {
        this.transition = true;
        this.transitionType = type;
        this.transitionTimer = this.transitionTimers[this.transitionType];
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
        ctx.clearRect(0, 0, this.screensize.width, this.screensize.height);
        ctx.drawImage(this.mainMenuImage, 0, 0, this.screensize.width, this.screensize.height);
        ctx.fillStyle = "red"
        ctx.font = "72px Arial";
        ctx.fillText("MTC 999999", 940, 820);
    }

    startGame() {
        this.loadWorld();
    }

    loadWorld(height, state) {
        this.frame = 0;
        this.currentHeight = height || 1;
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
        this.statusBar.draw();
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
        game.world.character.shoot();
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
        game.world.character.canShootAgain = true;
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