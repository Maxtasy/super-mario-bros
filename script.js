const cvs = document.querySelector("#game-canvas");
const ctx = cvs.getContext("2d");
const page = document.documentElement;

const GAME_VOLUME = 0.1;

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
            water: {x: 0, y: 1440},
            orange: {x:0 , y: 1920},
            grey: {x: 0, y: 2400}
        },
        type: {
            floor: {x: 0, y: 0},
            blockShiny: {x: 80, y: 0},
            block: {x: 160, y: 0},
            fence: {x: 400, y: 0},
            rollerLeft: {x: 480, y: 0},
            ropeHorizontal: {x: 560, y: 0},
            rollerRight: {x: 640, y: 0},
            cannonTop: {x: 720, y: 0},
            mushroomStumpTop: {x: 800, y: 0},
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
            rock: {x: 80, y: 80},
            solid: {x: 160, y: 80},
            bridge: {x: 240, y: 80},
            treeStump: {x: 400, y: 80},
            rope: {x: 480, y: 80},
            treeBottom: {x: 560, y: 80},
            cannonStand: {x: 640, y: 80},
            cannonBottom: {x: 720, y: 80},
            mushroomStump: {x: 800, y: 80},
            castleSemiTop: {x: 880, y: 80},
            castleDoorTop: {x: 960, y: 80},
            castleDoorBottom: {x: 1040, y: 80},
            flagTopAlt: {x: 1120, y: 80},
            coinTile: {x: 1920, y: 80},
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
            coral: {x: 880, y: 160},
            bowserBridgeRope: {x: 960, y: 160},
            treeTopSmall: {x: 1040,  y: 160},
            treeTopBigTop: {x: 1120,  y: 160},
            bridgeFence: {x: 1200, y: 160},
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
            treeTopBigBottom: {x: 1120,  y: 240},
            flagPole: {x: 1280, y: 240},
            bushyhillFillingWithDotsRight: {x: 1600, y: 240},
            bushyhillFilling: {x: 1680, y: 240},
            bushyhillFillingWithDotsLeft: {x: 1760, y: 240},
            cloudTopLeft: {x: 0, y: 320},
            cloudTop: {x: 80, y: 320},
            cloudTopRight: {x: 160, y: 320},
            waterTop: {x: 240, y: 320},
            bowserBridge: {x: 320, y: 320},
            cloudBottomLeft: {x: 0, y: 400},
            cloudBottom: {x: 80, y: 400},
            cloudBottomRight: {x: 160, y: 400},
            water: {x: 240, y: 400},
            cloudFloor: {x: 320, y: 400},
        }
    },
    objects: {
        theme: {
            overworld: {x: 0, y: 0},
            underworld: {x: 720, y: 0},
            castle: {x: 1440, y: 0},
            water: {x: 2160, y: 0},
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
            },
            platform: {
                x: 320,
                y: 640
            },
            jumpingBoard: {
                x: 400,
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
            koopaShell: {x: 800, y: 80},
            piranha: {x: 960, y: 0},
            buzzyBeetle: {x: 2560, y: 80},
            buzzyBeetleShell: {x: 2720, y: 80},
            spinyEgg: {x: 2240, y: 80},
            spiny: {x: 2400, y: 80},
            lakitu: {x: 2080, y: 0},
            hammerBro: {x: 1600, y: 0},
            bulletBill: {x: 2800, y: 80},
            bloober: {x: 2960, y: 0},
            cheepCheep: {x: 3120, y: 80},
            podoboo: {x: 2880, y: 80},
            hammer: {x: 1920, y: 0}
        }
    }
}

const worldData = {
    "test": {
        worldNum: "dev",
        levelNum: "test",
        timeLimit: 400,
        theme: "overworld",
        spawnLocation: {
            x: 80,
            y: 1000
        },
        width: 12800,
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 160},
            ],
            coins: [
                {x: 400, y: 760}
            ],
            tiles: [
                {x: 400, y: 840, type: "blockShiny", collision: true}
            ]
        }
    },
    11: {
        worldNum: 1,
        levelNum: 1,
        theme: "overworld",
        spawnLocation: {
            x: 160,
            y: 1000
        },
        width: 16960,
        levelEndLine: 16400,
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
                {x: 4560, y: 680, size: 4, destination: {worldID: 111}},
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
                {x: 15840, y: 120, destination: {worldID: 121, transitionType: "cutscene121"}},
            ],
        }
    },
    111: {
        worldNum: 1,
        levelNum: 1,
        theme: "underworld",
        music: "underworld",
        spawnLocation: {
            x: 440,
            y: 280
        },
        bg: "#000000",
        width: 1920,
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
        worldNum: 1,
        levelNum: 2,
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
                {x: 8240, y: 760, size: 3, piranha: true, destination: {worldID: 122}},
                {x: 8720, y: 680, size: 4, piranha: true},
                {x: 9200, y: 840, piranha: true},
                {x: 13280, y: 600, opening: "left", destination: {worldID: 123, transitionType: "pipeOutTop"}},
                {x: 14240, y: 760, size: 3, piranha: true, isWarp: true, destination: {worldID: 41}},
                {x: 14560, y: 760, size: 3, piranha: true, isWarp: true, destination: {worldID: 31}},
                {x: 14880, y: 760, size: 3, piranha: true, isWarp: true, destination: {worldID: 21}},
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
        worldNum: 1,
        levelNum: 2,
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
        worldNum: 1,
        levelNum: 2,
        theme: "underworld",
        spawnLocation: {
            x: 440,
            y: 280
        },
        bg: "#000000",
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
        worldNum: 1,
        levelNum: 2,
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
        worldNum: 1,
        levelNum: 3,
        theme: "overworld",
        timeLimit: 300,
        spawnLocation: {
            x: 160,
            y: 1000
        },
        width: 13120,
        levelEndLine: 12800,
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
        worldNum: 1,
        levelNum: 4,
        theme: "castle",
        spawnLocation: {
            x: 80,
            y: 520
        },
        bg: "#000000",
        width: 12800,
        timeLimit: 300,
        levelEndLine: 12240,
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
                
                {x: 10240, y: 760, w: 13, type: "bowserBridge", collision: true},
                
                {x: 1040, y: 920, w: 2, type: "waterTop"},
                {x: 1040, y: 1000, w: 2, type: "water"},
                {x: 2080, y: 1000, w: 3, type: "waterTop"},
                {x: 2560, y: 1000, w: 3, type: "waterTop"},
                {x: 10240, y: 1000, w: 13, type: "waterTop"},
            ],
            tiles: [
                {x: 1840, y: 440, type: "disabled", collision: true},
                {x: 2400, y: 440, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 2960, y: 440, type: "disabled", collision: true},
                {x: 6400, y: 200, type: "solid", collision: true},
                {x: 6400, y: 280, type: "disabled", collision: true},
                {x: 7040, y: 200, type: "solid", collision: true},
                {x: 7360, y: 680, type: "disabled", collision: true},

                {x: 8480, y: 680, type: "secret"},
                {x: 8720, y: 680, type: "secret"},
                {x: 8960, y: 680, type: "secret"},
                {x: 8560, y: 360, type: "secret"},
                {x: 8800, y: 360, type: "secret"},
                {x: 9040, y: 360, type: "secret"},

                {x: 11200, y: 680, type: "bowserBridgeRope"},

                {x: 12240, y: 840, type: "mushroomRetainerTop"},
                {x: 12240, y: 920, type: "mushroomRetainerBottom"},
            ],
            fireBars: [
                {x: 2400, y: 760, counterClockWise: true},
                {x: 3920, y: 440, counterClockWise: true},
                {x: 4840, y: 440, counterClockWise: true},
                {x: 5360, y: 440, counterClockWise: true},

                {x: 6080, y: 680, counterClockWise: true},
                {x: 6720, y: 680, counterClockWise: true},

                {x: 7040, y: 280},
            ],
            elevatorPlatforms: [
                {x: 11040, y: 440, w: 2, movementType: "leftRight"}
            ],
            axes: [
                {x: 11280, y: 600, destination: {worldID: 21}}
            ],
            bowsers: [
                {x: 10800, y: 600}
            ]
        }
    },
    21: {
        worldNum: 2,
        levelNum: 1,
        theme: "overworld",
        spawnLocation: {
            x: 160,
            y: 1000
        },
        vineLevel: {
            worldID: 211
        },
        width: 17040,
        levelEndLine: 16560,
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 92},
                {x: 7680, y: 1000, w: 10},
                {x: 8720, y: 1000, w: 30},
                {x: 11360, y: 1000, w: 10},
                {x: 12320, y: 1000, w: 59},
                {x: 2320, y: 360, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 2720, y: 680, h: 2, type: "stair", collision: true},
                {x: 2720, y: 840, w: 2, h: 2, type: "stair", collision: true},
                {x: 5600, y: 360, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 6480, y: 360, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 6720, y: 360, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 7360, y: 360, w: 4, type: "blockShiny", collision: true, individualCheck: true},
                {x: 10080, y: 360, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 12320, y: 760, h: 3, type: "stair", collision: true},
                {x: 13120, y: 360, w: 5, type: "blockShiny", collision: true, individualCheck: true},
                {x: 14800, y: 680, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 15200, y: 200, w: 2, h: 10, type: "stair", collision: true},
                {x: 1120, y: 920, w: 4, type: "fence"},
                {x: 3040, y: 920, w: 2, type: "fence"},
                {x: 4960, y: 920, w: 4, type: "fence"},
                {x: 6880, y: 920, w: 2, type: "fence"},
                {x: 8800, y: 920, w: 4, type: "fence"},
                {x: 10720, y: 920, w: 2, type: "fence"},
                {x: 12640, y: 920, w: 4, type: "fence"},
                {x: 14560, y: 920, w: 2, type: "fence"},
            ],
            steps: [
                {x: 1600, y: 600, w: 5}
            ],
            tiles: [
                {x: 1200, y: 680, type: "blockShiny", collision: true},
                {x: 1280, y: 680, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},
                {x: 1360, y: 680, type: "blockShiny", collision: true},
                {x: 2240, y: 680, type: "secret"},
                {x: 2240, y: 360, type: "secret", item: {type: "oneUp"}},
                {x: 4240, y: 360, type: "questionBlock"},
                {x: 4320, y: 360, type: "questionBlock"},
                {x: 4400, y: 360, type: "questionBlock"},
                {x: 4480, y: 360, type: "questionBlock"},
                {x: 4560, y: 360, type: "questionBlock"},
                {x: 4240, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 4320, y: 680, type: "questionBlock"},
                {x: 4400, y: 680, type: "questionBlock"},
                {x: 4480, y: 680, type: "questionBlock"},
                {x: 4560, y: 680, type: "questionBlock"},
                {x: 5440, y: 680, type: "blockShiny", collision: true},
                {x: 5520, y: 360, type: "blockShiny", collision: true, item: {type: "starman"}},
                {x: 6640, y: 360, type: "blockShiny", collision: true, item: {type: "vine"}},
                {x: 6320, y: 680, type: "questionBlock"},
                {x: 6400, y: 680, type: "questionBlock"},
                {x: 6480, y: 680, type: "questionBlock"},
                {x: 6560, y: 680, type: "questionBlock"},
                
                {x: 6800, y: 680, type: "questionBlock"},
                {x: 6880, y: 680, type: "questionBlock"},
                {x: 6960, y: 680, type: "questionBlock"},
                
                {x: 10000, y: 360, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},
                {x: 12880, y: 680, type: "multiCoinBlock"},
                {x: 13600, y: 680, type: "questionBlock"},
                {x: 13760, y: 360, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},
                {x: 14880, y: 360, type: "secret"},
                {x: 3280, y: 920, type: "fence"},
                {x: 7120, y: 920, type: "fence"},
                {x: 10960, y: 920, type: "fence"},
                {x: 14800, y: 920, type: "fence"},
                {x: 16720, y: 920, type: "fence"},
            ],
            pipes: [
                {x: 3680, y: 680, size: 4, piranha: true},
                {x: 5920, y: 680, size: 4, piranha: true},
                {x: 8240, y: 680, size: 4, piranha: true, destination: {worldID: 212}},
                {x: 9200, y: 840, size: 2, piranha: true},
                {x: 9760, y: 680, size: 4, piranha: true},
                {x: 10080, y: 760, size: 3, piranha: true},
                {x: 10400, y: 600, size: 5, piranha: true},
                {x: 14080, y: 760, size: 3, piranha: true},
            ],
            clouds: [
                {x: 1440, y: 200},
                {x: 2160, y: 120},
                {x: 2400, y: 200, amount: 2},
                {x: 3600, y: 120},
                {x: 3840, y: 200, amount: 2},
                {x: 5280, y: 200},
                {x: 6000, y: 120},
                {x: 6240, y: 200, amount: 2},
                {x: 7440, y: 120},
                {x: 7680, y: 200, amount: 2},
                {x: 9120, y: 200},
                {x: 9840, y: 120},
                {x: 10080, y: 200, amount: 2},
                {x: 11280, y: 120},
                {x: 11520, y: 200, amount: 2},
                {x: 12960, y: 200},
                {x: 13680, y: 120},
                {x: 13920, y: 200, amount: 2},
                {x: 15120, y: 120},
                {x: 15360, y: 200, amount: 2},
                {x: 16800, y: 200},
            ],
            enemies: [
                {x: 1920, y: 440},
                {x: 2560, y: 840, type: "koopaTroopa"},
                {x: 2640, y: 840, type: "koopaTroopa"},
                {x: 3360, y: 920},
                {x: 3480, y: 920},
                {x: 4400, y: 520, type: "koopaTroopa"},
                {x: 4720, y: 920},
                {x: 4840, y: 920},
                {x: 5280, y: 840, type: "koopaTroopa"},
                {x: 5440, y: 920},
                {x: 5560, y: 920},
                {x: 5680, y: 920},
                {x: 6960, y: 920},
                {x: 7080, y: 920},
                {x: 7200, y: 920},
                {x: 8240, y: 600},
                {x: 9120, y: 760},
                {x: 9600, y: 920},
                {x: 10960, y: 840, type: "koopaTroopa"},
                {x: 12080, y: 840, type: "koopaParatroopa"},
                {x: 12960, y: 920},
                {x: 13080, y: 920},
                {x: 13520, y: 840, type: "koopaParatroopa"},
                {x: 13680, y: 840, type: "koopaParatroopa"},
                {x: 14800, y: 840, type: "koopaTroopa"},
            ],
            trees: [
                {x: 880, y: 840},
                {x: 1040, y: 760, big: true},
                {x: 1680, y: 760, big: true},
                {x: 3200, y: 840},
                {x: 3440, y: 760, big: true},
                {x: 4720, y: 840},
                {x: 4880, y: 760, big: true},
                {x: 5520, y: 760, big: true},
                {x: 5680, y: 840},
                {x: 5760, y: 840},
                {x: 7040, y: 840},
                {x: 7280, y: 760, big: true},
                {x: 8720, y: 760, big: true},
                {x: 9360, y: 760, big: true},
                {x: 9520, y: 840},
                {x: 9600, y: 840},
                {x: 10880, y: 840},
                {x: 12400, y: 840},
                {x: 12560, y: 760, big: true},
                {x: 13200, y: 760, big: true},
                {x: 13360, y: 840},
                {x: 13440, y: 840},
                {x: 14720, y: 840},
                {x: 14960, y: 760, big: true},
                {x: 16240, y: 840},
            ],
            castles: [
                {x: 0, y: 120},
                {x: -160, y: 520, name: "rectangle5doors"},
                {x: 16320, y: 600},
            ],
            flags: [
                {x: 16000, y: 120, destination: {worldID: 22}}
            ],
            jumpingBoards: [
                {x: 15040, y: 840}
            ]
        }
    },
    211: {
        worldNum: 2,
        levelNum: 1,
        spawnLocation: {
            x: 320,
            y: 1000
        },
        width: 6400,
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 4, type: "cloudFloor", collision: true},
                {x: 400, y: 1000, w: 57, type: "cloudFloor", collision: true},
            ],
            vines: [
                {x: 320, y: 1000, h: 5}
            ],
            coins: [
                {x: 1200, y: 440},
                {x: 1280, y: 440},
                {x: 1360, y: 440},
                {x: 1440, y: 440},
                {x: 1520, y: 440},
                {x: 1600, y: 440},
                {x: 1680, y: 440},
                {x: 1760, y: 440},
                {x: 1840, y: 440},
                {x: 1920, y: 440},
                {x: 2000, y: 440},
                {x: 2080, y: 440},
                {x: 2160, y: 440},
                {x: 2240, y: 440},
                {x: 2320, y: 440},
                {x: 2400, y: 440},
                
                {x: 2560, y: 280},
                {x: 2640, y: 280},
                {x: 2720, y: 280},
                
                {x: 2880, y: 360},
                {x: 2960, y: 360},
                {x: 3040, y: 360},
                {x: 3120, y: 360},
                {x: 3200, y: 360},
                {x: 3280, y: 360},
                {x: 3360, y: 360},
                {x: 3440, y: 360},
                {x: 3520, y: 360},
                {x: 3600, y: 360},
                {x: 3680, y: 360},
                {x: 3760, y: 360},
                {x: 3840, y: 360},
                {x: 3920, y: 360},
                {x: 4000, y: 360},
                {x: 4080, y: 360},
                
                {x: 4240, y: 280},
                {x: 4320, y: 280},
                {x: 4400, y: 280},
                
                {x: 5520, y: 920},
                {x: 5600, y: 920},
                {x: 5680, y: 920},
            ],
            elevatorPlatforms: [
                {x: 1280, y: 760, movementType: "touchRight", type: "cloud"},
            ],
        }
    },
    212: {
        worldNum: 2,
        levelNum: 1,
        theme: "underworld",
        music: "underworld",
        spawnLocation: {
            x: 480,
            y: 120
        },
        bg: "#000000",
        width: 1920,
        gravity: 2.15,
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
                {x: 1360, y: 840, opening: "left", destination: {worldID: 21, scrollOffset: 8720, spawnLocation: {x: 520, y: 1000}, transitionType: "pipeOutTop"}},
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
    22: {
        worldNum: 2,
        levelNum: 2,
        theme: "water",
        width: 15360,
        gravity: .5,
        waterLevel: true,
        spawnLocation: {
            x: 200,
            y: 320
        },
        music: "water",
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 66, type: "rock", collision: true},
                {x: 5680, y: 1000, w: 60, type: "rock", collision: true},
                {x: 11200, y: 1000, w: 17, type: "rock", collision: true},
                {x: 13120, y: 1000, w: 28, type: "rock", collision: true},

                {x: 0, y: 120, w: 78, type: "waterTop", collision: true},
                {x: 6400, y: 120, w: 51, type: "waterTop", collision: true},
                {x: 10560, y: 120, w: 56, type: "waterTop", collision: true},
                
                {x: 1440, y: 680, w: 3, type: "rock", collision: true},
                {x: 3360, y: 680, w: 2, type: "rock", collision: true},
                {x: 5120, y: 760, h: 3, type: "rock", collision: true},
                {x: 5200, y: 600, h: 5, type: "rock", collision: true},
                {x: 5680, y: 600, h: 5, type: "rock", collision: true},
                {x: 5760, y: 760, h: 3, type: "rock", collision: true},
                {x: 6240, y: 120, w: 2, h: 3, type: "rock", collision: true},
                {x: 6240, y: 760, w: 2, h: 3, type: "rock", collision: true},
                {x: 6560, y: 360, w: 3, type: "rock", collision: true},
                {x: 8160, y: 680, w: 2, type: "rock", collision: true},
                {x: 9200, y: 600, w: 2, type: "rock", collision: true},
                {x: 10320, y: 680, h: 4, type: "rock", collision: true},
                {x: 10400, y: 840, h: 2, type: "rock", collision: true},
                {x: 11200, y: 840, h: 2, type: "rock", collision: true},
                {x: 11280, y: 680, h: 4, type: "rock", collision: true},

                {x: 10480, y: 120, h: 2, type: "rock", collision: true},
                {x: 10480, y: 280, w: 9, type: "rock", collision: true},

                {x: 12480, y: 360, h: 8, type: "rock", collision: true},
                {x: 12560, y: 360, w: 2, type: "rock", collision: true},
                {x: 12960, y: 360, w: 2, type: "rock", collision: true},
                {x: 13120, y: 360, h: 8, type: "rock", collision: true},

                {x: 13760, y: 360, w: 5, type: "rock", collision: true},
                {x: 13760, y: 680, w: 5, type: "rock", collision: true},
                {x: 14400, y: 360, w: 4, type: "rock", collision: true},
                {x: 14400, y: 680, w: 4, type: "rock", collision: true},
                
                {x: 15040, y: 120, w: 4, h: 4, type: "rock", collision: true},
                {x: 15200, y: 440, w: 2, h: 3, type: "rock", collision: true},
                {x: 15040, y: 680, w: 4, h: 4, type: "rock", collision: true},

                {x: 880, y: 760, h: 3, type: "coral", collision: true},
                {x: 2640, y: 600, h: 5, type: "coral", collision: true},
                {x: 3360, y: 520, h: 2, type: "coral", collision: true},
                {x: 4000, y: 680, h: 4, type: "coral", collision: true},
                {x: 6640, y: 200, h: 2, type: "coral", collision: true},
                {x: 7120, y: 760, h: 3, type: "coral", collision: true},
                {x: 8160, y: 360, h: 4, type: "coral", collision: true},
                {x: 9600, y: 680, h: 4, type: "coral", collision: true},
                {x: 11760, y: 840, h: 2, type: "coral", collision: true},
                {x: 11920, y: 760, h: 3, type: "coral", collision: true},
                {x: 13840, y: 200, h: 2, type: "coral", collision: true},
            ],
            steps: [
                {x: 14800, y: 760, w: 3, type: "rock"},
            ],
            pipes: [
                {x: 15120, y: 520, size: 1, theme: "overworld", opening: "left", destination: {worldID: 222}}
            ],
            coins: [
                {x: 1120, y: 920},
                {x: 1200, y: 920},
                {x: 2160, y: 360},
                {x: 2240, y: 360},
                {x: 2320, y: 360},
                {x: 2880, y: 920},
                {x: 2960, y: 920},
                {x: 3040, y: 920},
                {x: 5360, y: 760},
                {x: 5440, y: 760},
                {x: 5520, y: 760},
                {x: 8080, y: 840},
                {x: 8160, y: 840},
                {x: 8240, y: 840},
                {x: 9040, y: 440},
                {x: 9120, y: 440},
                {x: 9200, y: 440},
                {x: 10640, y: 840},
                {x: 10720, y: 920},
                {x: 10800, y: 920},
                {x: 10880, y: 920},
                {x: 10960, y: 840},
                {x: 12720, y: 680},
                {x: 12800, y: 680},
                {x: 12880, y: 680},
                {x: 12720, y: 920},
                {x: 12800, y: 920},
                {x: 12880, y: 920},
            ],
            enemies: [
                {x: 1760, y: 840, type: "bloober"},
                {x: 3680, y: 680, type: "bloober"},
                {x: 4400, y: 760, type: "bloober"},
                {x: 6640, y: 600, type: "bloober"},
                {x: 7520, y: 200, type: "bloober"},
                {x: 8400, y: 840, type: "bloober"},
            ],
        }
    },
    221: {
        worldNum: 2,
        levelNum: 2,
        theme: "overworld",
        spawnLocation: {
            x: 480,
            y: 1000
        },
        transitionType: "cutscene221",
        width: 1920,
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
    222: {
        worldNum: 2,
        levelNum: 2,
        spawnLocation: {
            x: 280,
            y: 1000
        },
        transitionType: "pipeOutTop",
        width: 2560,
        worldElements: {
            clouds: [
                {x: 320, y: 120, amount: 2},
                {x: 1920, y: 200}
            ],
            rectangles: [
                {x: 0, y: 1000, w: 32},
                {x: 1040, y: 360, h: 8, type: "stair", collision: true}
            ],
            steps: [
                {x: 400, y: 360, w: 8}
            ],
            hills: [
                {x: 1280, y: 760, h: 3}
            ],
            flags: [
                {x: 1760, y: 120, destination: {worldID: 23}}
            ],
            castles: [
                {x: 2080, y: 600}
            ],
            pipes: [
                {x: 240, y: 840, piranha: true}
            ],
            bushes: [
                {x: 2320, y: 920}
            ]
        }
    },
    23: {
        worldNum: 2,
        levelNum: 3,
        width: 18960,
        timeLimit: 300,
        levelEndLine: 18640,
        hasCheepCheeps: true,
        cheepCheepSpawnLine: 1200,
        spawnLocation: {
            x: 160, 
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 7},
                {x: 16560, y: 1000, w: 30},

                {x: 1040, y: 760, w: 2, h: 3, type: "stair", collision: true},
                {x: 2480, y: 760, h: 4, type: "stair", collision: true},
                {x: 3760, y: 760, h: 4, type: "stair", collision: true},
                {x: 5040, y: 760, h: 4, type: "stair", collision: true},
                {x: 5440, y: 760, h: 4, type: "stair", collision: true},
                {x: 6320, y: 760, h: 4, type: "stair", collision: true},
                {x: 6720, y: 760, h: 4, type: "stair", collision: true},
                {x: 7600, y: 760, h: 4, type: "stair", collision: true},
                {x: 7920, y: 680, h: 5, type: "stair", collision: true},
                {x: 8400, y: 680, h: 5, type: "stair", collision: true},
                {x: 10160, y: 760, h: 4, type: "stair", collision: true},
                {x: 11440, y: 760, h: 4, type: "stair", collision: true},
                {x: 11680, y: 920, h: 2, type: "stair", collision: true},
                {x: 12400, y: 920, h: 2, type: "stair", collision: true},
                {x: 12720, y: 760, h: 4, type: "stair", collision: true},
                {x: 13440, y: 760, h: 4, type: "stair", collision: true},
                {x: 14640, y: 760, h: 4, type: "stair", collision: true},
                {x: 15440, y: 760, h: 3, type: "stair", collision: true},
                {x: 17280, y: 360, h: 8, type: "stair", collision: true},

                {x: 1200, y: 680, w: 16, type: "bridgeFence"},
                {x: 1200, y: 760, w: 16, type: "bridge", collision: true},
                {x: 2560, y: 680, w: 15, type: "bridgeFence"},
                {x: 2560, y: 760, w: 15, type: "bridge", collision: true},
                {x: 3840, y: 680, w: 15, type: "bridgeFence"},
                {x: 3840, y: 760, w: 15, type: "bridge", collision: true},
                {x: 5520, y: 680, w: 10, type: "bridgeFence"},
                {x: 5520, y: 760, w: 10, type: "bridge", collision: true},
                {x: 6800, y: 680, w: 10, type: "bridgeFence"},
                {x: 6800, y: 760, w: 10, type: "bridge", collision: true},
                {x: 8000, y: 600, w: 5, type: "bridgeFence"},
                {x: 8000, y: 680, w: 5, type: "bridge", collision: true},
                {x: 9760, y: 680, w: 3, type: "bridgeFence"},
                {x: 9760, y: 760, w: 3, type: "bridge", collision: true},
                {x: 10240, y: 680, w: 15, type: "bridgeFence"},
                {x: 10240, y: 760, w: 15, type: "bridge", collision: true},
                {x: 11760, y: 840, w: 8, type: "bridgeFence"},
                {x: 11760, y: 920, w: 8, type: "bridge", collision: true},
                {x: 12800, y: 680, w: 8, type: "bridgeFence"},
                {x: 12800, y: 760, w: 8, type: "bridge", collision: true},
                {x: 13680, y: 680, w: 2, type: "bridgeFence"},
                {x: 13680, y: 760, w: 2, type: "bridge", collision: true},
                {x: 14000, y: 680, w: 2, type: "bridgeFence"},
                {x: 14000, y: 760, w: 2, type: "bridge", collision: true},
                {x: 14320, y: 680, w: 2, type: "bridgeFence"},
                {x: 14320, y: 760, w: 2, type: "bridge", collision: true},
                {x: 14720, y: 680, w: 9, type: "bridgeFence"},
                {x: 14720, y: 760, w: 9, type: "bridge", collision: true},
            ],
            castles: [
                {x: 0, y: 600},
                {x: 18400, y: 120},
                {x: 18240, y: 520, name: "rectangle5doors"},
            ],
            steps: [
                {x: 800, y: 760, w: 3},
                {x: 15520, y: 760, w: 3, reversed: true},
                {x: 16640, y: 360, w: 8},
            ],
            platforms: [
                {x: 640, y: 1000, w: 8},
                {x: 8960, y: 1000, w: 8},
                {x: 15360, y: 1000, w: 13},
            ],
            flags: [
                {x: 18000, y: 120, destination: {worldID: 24}},
            ],
            clouds: [
                {x: 240, y: 200, amount: 2},
                {x: 4080, y: 200, amount: 2},
                {x: 7920, y: 200, amount: 2},
                {x: 11760, y: 200, amount: 2},
                {x: 15600, y: 200, amount: 2},

                {x: 1440, y: 120, amount: 2},
                {x: 5280, y: 120, amount: 2},
                {x: 9120, y: 120, amount: 2},
                {x: 12960, y: 120, amount: 2},
                {x: 16800, y: 120, amount: 2},
                
                {x: 720, y: 520},
                {x: 2800, y: 520},
                {x: 5460, y: 520},
                {x: 6640, y: 520},
                {x: 8400, y: 520},
                {x: 10480, y: 520},
                {x: 12240, y: 520},
                {x: 14320, y: 520},
                {x: 16080, y: 520},
                {x: 18160, y: 520},
                
                {x: 2240, y: 840},
                {x: 3680, y: 840},
                {x: 6080, y: 840},
                {x: 7520, y: 840},
                {x: 9920, y: 840},
                {x: 11360, y: 840},
                {x: 13760, y: 840},
                {x: 15200, y: 840},
                {x: 17600, y: 840},
                
                {x: 3040, y: 440},
                {x: 6880, y: 440},
                {x: 10720, y: 440},
                {x: 14560, y: 440},
            ],
            coins: [
                {x: 2880, y: 360},
                {x: 2960, y: 360},
                {x: 3040, y: 360},
                {x: 3120, y: 360},

                {x: 4400, y: 360},
                {x: 4560, y: 360},
                {x: 4720, y: 360},
                {x: 4480, y: 440},
                {x: 4640, y: 440},
                
                {x: 5760, y: 360},
                {x: 5840, y: 280},
                {x: 5920, y: 280},
                {x: 6000, y: 360},
                
                {x: 7760, y: 360},
                {x: 7840, y: 360},
                {x: 7920, y: 360},
                
                {x: 8640, y: 360},
                {x: 8720, y: 360},
                {x: 8800, y: 360},
                
                {x: 10640, y: 360},
                {x: 10720, y: 360},
                {x: 10800, y: 360},
                {x: 10880, y: 360},
                {x: 10960, y: 360},
                {x: 11040, y: 360},
                
                {x: 11920, y: 600},
                {x: 12000, y: 600},
                {x: 12080, y: 600},
                {x: 12160, y: 600},
                
                {x: 13840, y: 440},
                {x: 13920, y: 440},
                {x: 14000, y: 440},
                {x: 14080, y: 440},
                {x: 14160, y: 440},
                {x: 14240, y: 440},
            ],
            tiles: [
                {x: 8160, y: 360, type: "questionBlock", item: {type: "magicMushroom"}}
            ]
        }
    },
    24: {
        worldNum: 2,
        levelNum: 4,
        spawnLocation: {
            x: 40, 
            y: 520
        },
        timeLimit: 300,
        levelEndLine: 12240,
        bg: "#000000",
        theme: "castle",
        width: 12800,
        worldElements: {
            rectangles: [
                {x: 0, y: 120, w: 16, h: 3, type: "solid", collision: true},
                {x: 0, y: 760, w: 16, h: 4, type: "solid", collision: true},
                {x: 0, y: 520, w: 2, h: 3, type: "solid", collision: true},
                {x: 1440, y: 680, w: 2, type: "solid", collision: true},
                {x: 2160, y: 680, w: 2, type: "solid", collision: true},

                {x: 2560, y: 760, w: 2, h: 4, type: "solid", collision: true},
                {x: 2720, y: 120, w: 49, h: 3, type: "solid", collision: true},
                {x: 2720, y: 360, w: 21, type: "solid", collision: true},
                {x: 4480, y: 360, w: 27, type: "solid", collision: true},

                {x: 2960, y: 680, w: 12, type: "solid", collision: true},
                {x: 4000, y: 680, w: 11, type: "solid", collision: true},
                {x: 4960, y: 680, w: 11, type: "solid", collision: true},

                {x: 2720, y: 1000, w: 9, type: "solid", collision: true},
                {x: 3520, y: 1000, w: 11, type: "solid", collision: true},
                {x: 4480, y: 1000, w: 11, type: "solid", collision: true},
                {x: 5440, y: 1000, w: 12, type: "solid", collision: true},
                
                {x: 6400, y: 760, w: 4, h: 4, type: "solid", collision: true},
                {x: 7440, y: 120, w: 6, h: 3, type: "solid", collision: true},
                {x: 7440, y: 760, w: 6, type: "solid", collision: true},
                {x: 7360, y: 840, w: 7, h: 2, type: "solid", collision: true},
                {x: 7360, y: 1000, w: 17, type: "solid", collision: true},
                {x: 8640, y: 760, h: 3, type: "solid", collision: true},
                {x: 8880, y: 760, w: 2, h: 4, type: "solid", collision: true},

                {x: 9200, y: 120, w: 45, type: "solid", collision: true},
                {x: 11280, y: 1000, w: 19, type: "solid", collision: true},
                {x: 9200, y: 200, w: 13, h: 2, type: "solid", collision: true},
                {x: 9200, y: 760, w: 5, h: 3, type: "solid", collision: true},
                {x: 9760, y: 760, w: 2, h: 3, type: "solid", collision: true},
                {x: 10080, y: 760, w: 2, h: 3, type: "solid", collision: true},
                {x: 9200, y: 1000, w: 13, type: "solid", collision: true},
                {x: 11360, y: 200, w: 2, h: 3, type: "solid", collision: true},
                {x: 11280, y: 680, w: 3, h: 4, type: "solid", collision: true},

                {x: 10240, y: 360, w: 6, type: "block", collision: true, individualCheck: true},
                
                {x: 10240, y: 760, w: 13, type: "bowserBridge", collision: true},

                {x: 1280, y: 1000, w: 16, type: "waterTop"},
                {x: 8720, y: 1000, w: 2, type: "waterTop"},
                {x: 9040, y: 1000, w: 2, type: "waterTop"},
                {x: 10240, y: 1000, w: 13, type: "waterTop"},
                {x: 6880, y: 120, h: 12, type: "rope"},
                {x: 7120, y: 120, h: 12, type: "rope"},
            ],
            tiles: [
                {x: 1760, y: 520, type: "solid", collision: true},
                {x: 1840, y: 520, type: "disabled", collision: true},
                {x: 1920, y: 520, type: "solid", collision: true},
                
                {x: 1840, y: 200, type: "questionBlock", item: {type: "magicMushroom"}},
                                
                {x: 3440, y: 1000, type: "disabled", collision: true},
                {x: 4400, y: 1000, type: "disabled", collision: true},
                {x: 5360, y: 1000, type: "disabled", collision: true},
                
                {x: 8240, y: 840, type: "disabled", collision: true},
                {x: 11200, y: 680, type: "bowserBridgeRope"},

                {x: 12240, y: 840, type: "mushroomRetainerTop"},
                {x: 12240, y: 920, type: "mushroomRetainerBottom"},
            ],
            axes: [
                {x: 11280, y: 600, destination: {worldID: 31}},
            ],
            enemies: [
                {x: 1280, y: 1080, type: "podoboo"},
                {x: 2400, y: 1080, type: "podoboo"},
            ],
            bowsers: [
                {x: 10800, y: 600},
            ],
            elevatorPlatforms: [
                {x: 6840, y: 760, w: 2, movementType: "up"},
                {x: 7080, y: 760, w: 2, movementType: "down"},
                {x: 11040, y: 440, w: 2, movementType: "leftRight"},
            ],
            fireBars: [
                {x: 3920, y: 680, counterClockwise: true},
                {x: 4880, y: 680, counterClockwise: true},
                {x: 5840, y: 680, counterClockwise: true},
                {x: 4400, y: 360, counterClockwise: true},
                {x: 6560, y: 440, counterClockwise: true},
                {x: 7360, y: 760},
            ],
            steps: [
                {x: 160, y: 520, w: 3, type: "solid", reversed: true}
            ],
            coins: [
                {x: 8160, y: 600},
                {x: 8240, y: 600},
                {x: 8320, y: 600},
                {x: 8160, y: 920},
                {x: 8240, y: 920},
                {x: 8320, y: 920},
            ]
        }
    },
    31: {
        worldNum: 3,
        levelNum: 1,
        bg: "#000000",
        theme: "overworld",
        spawnLocation: {
            x: 160,
            y: 1000
        },
        vineLevel: {
            worldID: 312
        },
        width: 16800,
        levelEndLine: 16560,
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 45},
                {x: 3840, y: 1000, w: 29},
                {x: 7040, y: 1000, w: 40},
                {x: 10560, y: 1000, w: 10},
                {x: 11520, y: 1000, w: 33},
                {x: 14400, y: 1000, w: 30},

                {x: 2080, y: 680, w: 3, type: "blockShiny", collision: true, individualCheck: true},

                {x: 6160, y: 600, w: 8, theme: "castle", type: "bridgeFence"},
                {x: 6160, y: 680, w: 8, type: "bridge", collision: true},
                {x: 6160, y: 920, w: 8, type: "waterTop"},
                {x: 6160, y: 1000, w: 8, type: "water"},

                {x: 6880, y: 920, w: 2, type: "waterTop"},
                {x: 6880, y: 1000, w: 2, type: "water"},
                
                {x: 6800, y: 680, h: 4, type: "stair", collision: true},
                {x: 7040, y: 680, h: 4, type: "stair", collision: true},
                {x: 7120, y: 840, h: 2, type: "stair", collision: true},
                
                {x: 7280, y: 360, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 8880, y: 360, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 9120, y: 360, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 9440, y: 360, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 8880, y: 680, w: 11, type: "blockShiny", collision: true, individualCheck: true},
                
                {x: 10320, y: 360, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 10320, y: 600, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                
                {x: 13440, y: 680, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                
                {x: 13920, y: 760, h: 3, type: "stair", collision: true},
                {x: 14000, y: 520, h: 6, type: "stair", collision: true},
                
                {x: 15280, y: 360, h: 8, type: "stair", collision: true},

                {x: 1120, y: 920, w: 4, type: "fence"},
                {x: 4960, y: 920, w: 4, type: "fence"},
                {x: 8800, y: 920, w: 4, type: "fence"},
                {x: 10720, y: 920, w: 2, type: "fence"},
                {x: 12640, y: 920, w: 4, type: "fence"},
            ],
            tiles: [
                {x: 1280, y: 680, type: "questionBlock"},
                {x: 1520, y: 600, type: "questionBlock"},
                {x: 1760, y: 600, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 4880, y: 680, type: "blockShiny", collision: true},
                {x: 6800, y: 1000, type: "floor"},
                {x: 6560, y: 360, type: "secret", item: {type: "oneUp"}},
                {x: 7200, y: 360, type: "blockShiny", collision: true, item: {type: "starman"}},
                {x: 9040, y: 360, type: "questionBlock"},
                {x: 9360, y: 360, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 10480, y: 360, type: "blockShiny", collision: true, item: {type: "vine"}},

                {x: 12000, y: 360, type: "blockShiny", collision: true},
                {x: 12080, y: 360, type: "questionBlock"},
                {x: 12160, y: 360, type: "blockShiny", collision: true},
                
                {x: 12400, y: 360, type: "blockShiny", collision: true},
                {x: 12480, y: 360, type: "questionBlock"},
                {x: 12560, y: 360, type: "blockShiny", collision: true},

                {x: 12000, y: 680, type: "blockShiny", collision: true},
                {x: 12080, y: 680, type: "questionBlock"},
                {x: 12160, y: 680, type: "blockShiny", collision: true},
                
                {x: 12400, y: 680, type: "blockShiny", collision: true},
                {x: 12480, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 12560, y: 680, type: "blockShiny", collision: true},
                
                {x: 13280, y: 680, type: "blockShiny", collision: true},
                {x: 13360, y: 680, type: "multiCoinBlock"},
                
                {x: 3280, y: 920, type: "fence"},
                {x: 14560, y: 920, type: "fence"},
                {x: 16720, y: 920, type: "fence"},
            ],
            pipes: [
                {x: 2560, y: 760, size: 3, piranha: true, theme: "castle"},
                {x: 3040, y: 680, size: 4, piranha: true, theme: "castle", destination: {worldID: 311}},
                {x: 4560, y: 760, size: 3, piranha: true, theme: "castle"},
                {x: 5360, y: 840, size: 2, piranha: true, theme: "castle"},
                {x: 8240, y: 680, size: 4, piranha: true, theme: "castle"},
            ],
            steps: [
                {x: 5840, y: 680, w: 4},
                {x: 10880, y: 520, w: 6},
                {x: 14640, y: 360, w: 8},
            ],
            enemies: [
                {x: 2960, y: 920},
                {x: 4240, y: 920},
                {x: 4360, y: 920},
                {x: 4480, y: 920},
                
                {x: 6560, y: 600},
                {x: 6680, y: 600},
                {x: 6800, y: 600},
                
                {x: 7520, y: 920},
                {x: 7640, y: 920},
                
                {x: 11120, y: 600},
                {x: 11200, y: 520},

                {x: 12320, y: 920},
                {x: 12440, y: 920},
                {x: 12560, y: 920},
                
                {x: 2000, y: 840, type: "koopaParatroopa"},
                {x: 13200, y: 840, type: "koopaParatroopa"},
                {x: 13680, y: 840, type: "koopaParatroopa"},
                
                {x: 5200, y: 840, type: "koopaTroopa"},
                {x: 8080, y: 840, type: "koopaTroopa"},
                {x: 11920, y: 840, type: "koopaTroopa"},

                {x: 12160, y: 200, type: "koopaTroopa"},
                {x: 15280, y: 200, type: "koopaTroopa"},
                
                {x: 13600, y: 440, type: "koopaTroopa"},
                {x: 15040, y: 360, type: "koopaTroopa"},
                
                {x: 2240, y: 760, type: "koopaParatroopa"},
                {x: 13440, y: 760, type: "koopaParatroopa"},
                
                {x: 9040, y: 520, type: "hammerBro"},
                {x: 9280, y: 840, type: "hammerBro"},
            ],
            castles: [
                {x: 0, y: 120},
                {x: -160, y: 520, name: "rectangle5doors"},
                {x: 16320, y: 600},
            ],
            trees: [
                {x: 1040, y: 760, theme: "castle", big: true},
                {x: 1680, y: 760, theme: "castle", big: true},
                {x: 3440, y: 760, theme: "castle", big: true},
                {x: 4880, y: 760, theme: "castle", big: true},
                {x: 5520, y: 760, theme: "castle", big: true},
                {x: 7280, y: 760, theme: "castle", big: true},
                {x: 8720, y: 760, theme: "castle", big: true},
                {x: 9360, y: 760, theme: "castle", big: true},
                {x: 12560, y: 760, theme: "castle", big: true},
                {x: 13200, y: 760, theme: "castle", big: true},
                
                {x: 880, y: 840, theme: "castle"},
                {x: 1840, y: 840, theme: "castle"},
                {x: 1920, y: 840, theme: "castle"},
                {x: 3200, y: 840, theme: "castle"},
                {x: 4720, y: 840, theme: "castle"},
                {x: 5680, y: 840, theme: "castle"},
                {x: 5760, y: 840, theme: "castle"},
                {x: 8560, y: 840, theme: "castle"},
                {x: 9520, y: 840, theme: "castle"},
                {x: 9600, y: 840, theme: "castle"},
                {x: 10880, y: 840, theme: "castle"},
                {x: 12400, y: 840, theme: "castle"},
                {x: 13360, y: 840, theme: "castle"},
                {x: 13440, y: 840, theme: "castle"},
                {x: 16240, y: 840, theme: "castle"},
            ],
            clouds: [
                {x: 1440, y: 200},
                {x: 5280, y: 200},
                {x: 9120, y: 200},
                {x: 12960, y: 200},
                
                {x: 2160, y: 120},
                {x: 3600, y: 120},
                {x: 6000, y: 120},
                {x: 7440, y: 120},
                {x: 9840, y: 120},
                {x: 11280, y: 120},
                {x: 13680, y: 120},
                {x: 15120, y: 120},
                
                {x: 2400, y: 200, amount: 2},
                {x: 3840, y: 200, amount: 2},
                {x: 6240, y: 200, amount: 2},
                {x: 7680, y: 200, amount: 2},
                {x: 10080, y: 200, amount: 2},
                {x: 11520, y: 200, amount: 2},
                {x: 13920, y: 200, amount: 2},
                {x: 15360, y: 200, amount: 2},
            ],
            flags: [
                {x: 16000, y: 120, theme: "castle", destination: {worldID: 32}}
            ],
            jumpingBoards: [
                {x: 10080, y: 840},
            ],
        }
    },
    311: {
        worldNum: 3,
        levelNum: 1,
        theme: "underworld",
        music: "underworld",
        width: 1920,
        bg: "#000000",
        spawnLocation: {
            x: 440,
            y: 120
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 24},
                {x: 0, y: 120, w: 5, h: 11, type: "block", collision: true},
                {x: 560, y: 360, w: 2, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 880, y: 360, w: 2, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 1200, y: 360, w: 2, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 560, y: 520, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 1280, y: 520, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 1680, y: 120, w: 3, h: 11, type: "block", collision: true},
                
                {x: 1520, y: 120, h: 9, type: "pipeVerticalLeft", collision: true},
                {x: 1600, y: 120, h: 11, type: "pipeVerticalRight", collision: true},
            ],
            tiles: [
                {x: 720, y: 360, type: "block", collision: true, item: {type: "magicMushroom"}},
                {x: 1120, y: 360, type: "block", collision: true},
                {x: 640, y: 680, type: "block", collision: true},
                {x: 720, y: 600, type: "block", collision: true},
                {x: 800, y: 520, type: "block", collision: true},
                {x: 1040, y: 520, type: "block", collision: true},
                {x: 1120, y: 600, type: "block", collision: true},
                {x: 1200, y: 680, type: "block", collision: true},
                
                {x: 1520, y: 840, type: "pipeConnectorTopLeft", collision: true},
                {x: 1520, y: 920, type: "pipeConnectorBottomLeft", collision: true},
            ],
            pipes: [
                {x: 1360, y: 840, opening: "left", destination: {worldID: 31, scrollOffset: 4960, spawnLocation: {x: 440, y: 1000}, transitionType: "pipeOutTop"}}
            ],
            coins: [
                {x: 880, y: 200},
                {x: 960, y: 200},
                
                {x: 800, y: 280},
                {x: 880, y: 280},
                {x: 960, y: 280},
                {x: 1040, y: 280},
                
                {x: 800, y: 440},
                {x: 1040, y: 440},
                
                {x: 720, y: 520},
                {x: 1120, y: 520},
                
                {x: 640, y: 600},
                {x: 1200, y: 600},
            ]
        }
    },
    312: {
        worldNum: 3,
        levelNum: 1,
        bg: "#000000",
        theme: "overworld",
        width: 7520,
        cloudLevel: true,
        levelEndLine: 6640,
        defaultDestination: {worldID: 31, scrollOffset: 12640, spawnLocation: {x: 360, y: 200}},
        spawnLocation: {
            x: 320,
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 4, type: "cloudFloor", collision: true},
                {x: 400, y: 1000, w: 78, type: "cloudFloor", collision: true},
                
                {x: 4080, y: 520, h:2, type: "cloudFloor", collision: true},
                {x: 4880, y: 520, h:2, type: "cloudFloor", collision: true},
                {x: 5360, y: 440, w:2, type: "cloudFloor", collision: true},
            ],
            tiles: [
                {x: 2560, y: 600, type: "cloudFloor", collision: true},
                {x: 5680, y: 520, type: "cloudFloor", collision: true},
                {x: 5840, y: 520, type: "cloudFloor", collision: true},
                {x: 6000, y: 520, type: "cloudFloor", collision: true},
                {x: 6160, y: 520, type: "cloudFloor", collision: true},
                {x: 6320, y: 520, type: "cloudFloor", collision: true},
            ],
            vines: [
                {x: 320, y: 1000, needsGrow: false, h: 5}
            ],
            coins: [
                {x: 1200, y: 440},
                {x: 1280, y: 440},
                {x: 1360, y: 440},
                {x: 1440, y: 440},
                {x: 1520, y: 440},
                {x: 1600, y: 440},
                {x: 1680, y: 440},
                {x: 1760, y: 440},
                {x: 1840, y: 440},
                {x: 1920, y: 440},
                {x: 2000, y: 440},
                {x: 2080, y: 440},
                {x: 2160, y: 440},
                {x: 2240, y: 440},
                {x: 2320, y: 440},
                {x: 2400, y: 440},
                
                {x: 2720, y: 440},
                {x: 2800, y: 440},
                {x: 2880, y: 440},
                {x: 2960, y: 440},
                {x: 3040, y: 440},
                {x: 3120, y: 440},
                {x: 3200, y: 440},
                {x: 3280, y: 440},
                {x: 3360, y: 440},
                {x: 3440, y: 440},
                {x: 3520, y: 440},
                {x: 3600, y: 440},
                {x: 3680, y: 440},
                {x: 3760, y: 440},
                {x: 3840, y: 440},
                {x: 3920, y: 440},
                
                {x: 4240, y: 360},
                {x: 4320, y: 360},
                {x: 4400, y: 360},
                {x: 4480, y: 360},
                {x: 4560, y: 360},
                {x: 4640, y: 360},
                {x: 4720, y: 360},
                
                {x: 5680, y: 360},
                {x: 5760, y: 360},
                {x: 5840, y: 360},
                {x: 5920, y: 360},
                {x: 6000, y: 360},
                {x: 6080, y: 360},
                {x: 6160, y: 360},
                {x: 6240, y: 360},
                {x: 6320, y: 360},
                {x: 6400, y: 360},
                
                {x: 6800, y: 840},
                {x: 6880, y: 840},
                {x: 6960, y: 840},
            ],
            elevatorPlatforms: [
                {x: 1280, y: 760, movementType: "touchRight", type: "cloud"}
            ]
        }
    },
    32: {
        worldNum: 3,
        levelNum: 2,
        timeLimit: 300,
        theme: "overworld",
        width: 17520,
        levelEndLine: 17280,
        bg: "#000000",
        spawnLocation: {
            x: 160,
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 80},
                {x: 6560, y: 1000, w: 41},
                {x: 10000, y: 1000, w: 3},
                {x: 10400, y: 1000, w: 89},
                
                {x: 4800, y: 760, h: 3, type: "stair", collision: true},
                {x: 6000, y: 840, h: 2, type: "stair", collision: true},
                {x: 6320, y: 840, h: 2, type: "stair", collision: true},
                {x: 10080, y: 840, h: 2, type: "stair", collision: true},
                {x: 16000, y: 360, h: 8, type: "stair", collision: true},
                
                {x: 1120, y: 920, w: 4, type: "fence"},
                {x: 3040, y: 920, w: 2, type: "fence"},
                {x: 4960, y: 920, w: 4, type: "fence"},
                {x: 6880, y: 920, w: 2, type: "fence"},
                {x: 8800, y: 920, w: 4, type: "fence"},
                {x: 10720, y: 920, w: 2, type: "fence"},
                {x: 12640, y: 920, w: 4, type: "fence"},
                {x: 14560, y: 920, w: 2, type: "fence"},
                {x: 16480, y: 920, w: 3, type: "fence"},
            ],
            castles: [
                {x: 0, y: 600},
                {x: 17040, y: 600},
            ],
            trees: [
                {x: 880, y: 840, theme: "castle"},
                {x: 1840, y: 840, theme: "castle"},
                {x: 1920, y: 840, theme: "castle"},
                {x: 3200, y: 840, theme: "castle"},
                {x: 4720, y: 840, theme: "castle"},
                {x: 5680, y: 840, theme: "castle"},
                {x: 5760, y: 840, theme: "castle"},
                {x: 7040, y: 840, theme: "castle"},
                {x: 8560, y: 840, theme: "castle"},
                {x: 9520, y: 840, theme: "castle"},
                {x: 9600, y: 840, theme: "castle"},
                {x: 10880, y: 840, theme: "castle"},
                {x: 12400, y: 840, theme: "castle"},
                {x: 13360, y: 840, theme: "castle"},
                {x: 13440, y: 840, theme: "castle"},
                {x: 14720, y: 840, theme: "castle"},
                {x: 16240, y: 840, theme: "castle"},
                
                {x: 1040, y: 760, theme: "castle", big: true},
                {x: 1680, y: 760, theme: "castle", big: true},
                {x: 3440, y: 760, theme: "castle", big: true},
                {x: 4880, y: 760, theme: "castle", big: true},
                {x: 7280, y: 760, theme: "castle", big: true},
                {x: 8720, y: 760, theme: "castle", big: true},
                {x: 9360, y: 760, theme: "castle", big: true},
                {x: 11120, y: 760, theme: "castle", big: true},
                {x: 12560, y: 760, theme: "castle", big: true},
                {x: 13200, y: 760, theme: "castle", big: true},
                {x: 14960, y: 760, theme: "castle", big: true},
                {x: 16400, y: 760, theme: "castle", big: true},
            ],
            enemies: [
                {x: 1360, y: 840, type: "koopaTroopa"},
                {x: 2640, y: 840, type: "koopaTroopa"},
                {x: 2760, y: 840, type: "koopaTroopa"},
                {x: 2880, y: 840, type: "koopaTroopa"},
                {x: 3440, y: 840, type: "koopaTroopa"},
                {x: 3560, y: 840, type: "koopaTroopa"},
                {x: 6240, y: 840, type: "koopaTroopa"},
                {x: 8880, y: 840, type: "koopaTroopa"},
                {x: 10720, y: 840, type: "koopaTroopa"},
                {x: 11200, y: 840, type: "koopaTroopa"},
                {x: 11320, y: 840, type: "koopaTroopa"},
                {x: 11440, y: 840, type: "koopaTroopa"},
                {x: 12000, y: 840, type: "koopaTroopa"},
                {x: 12120, y: 840, type: "koopaTroopa"},
                {x: 12960, y: 840, type: "koopaTroopa"},
                {x: 13080, y: 840, type: "koopaTroopa"},
                {x: 13200, y: 840, type: "koopaTroopa"},
                {x: 14000, y: 840, type: "koopaTroopa"},
                
                {x: 1920, y: 920},
                {x: 2040, y: 920},
                {x: 2160, y: 920},
                
                {x: 5680, y: 920},
                {x: 5800, y: 920},
                {x: 5920, y: 920},
                
                {x: 9520, y: 920},
                {x: 9640, y: 920},
                {x: 9760, y: 920},
                
                {x: 14320, y: 920},
                {x: 14440, y: 920},
                {x: 14560, y: 920},
                
                {x: 15040, y: 920},
                {x: 15160, y: 920},
                {x: 15280, y: 920},
                
                {x: 7360, y: 840, type: "koopaParatroopa"},
            ],
            tiles: [
                {x: 3920, y: 920, type: "stair", collision: true},
                {x: 4800, y: 440, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 6160, y: 680, type: "multiCoinBlock"},
                {x: 6160, y: 360, type: "blockShiny", collision: true, item: {type: "starman"}},
                {x: 10080, y: 440, type: "block", collision: true},
                
                {x: 3280, y: 920, type: "fence"},
                {x: 7120, y: 920, type: "fence"},
                {x: 10960, y: 920, type: "fence"},
                {x: 14800, y: 920, type: "fence"},
            ],
            clouds: [
                {x: 0, y: 200, amount: 2},
                {x: 2400, y: 200, amount: 2},
                {x: 3840, y: 200, amount: 2},
                {x: 6240, y: 200, amount: 2},
                {x: 7680, y: 200, amount: 2},
                {x: 10080, y: 200, amount: 2},
                {x: 11520, y: 200, amount: 2},
                {x: 13920, y: 200, amount: 2},
                {x: 15360, y: 200, amount: 2},
                
                {x: 1440, y: 200},
                {x: 5280, y: 200},
                {x: 9120, y: 200},
                {x: 12960, y: 200},
                {x: 16800, y: 200},
                
                {x: 2160, y: 120},
                {x: 3600, y: 120},
                {x: 6000, y: 120},
                {x: 7440, y: 120},
                {x: 9840, y: 120},
                {x: 11280, y: 120},
                {x: 13680, y: 120},
                {x: 15120, y: 120},
            ],
            coins: [
                {x: 4400, y: 680},
                {x: 4480, y: 680},
                {x: 4560, y: 680},
                
                {x: 13440, y: 440},
                {x: 13520, y: 440},
                {x: 13600, y: 440},
                {x: 13680, y: 440},
            ],
            pipes: [
                {x: 13520, y: 760, size: 3, piranha: true, theme: "castle"}
            ],
            steps: [
                {x: 15360, y: 360, w: 8},
            ],
            flags: [
                {x: 16720, y: 120, theme: "castle", destination: {worldID: 33}},
            ]
        }
    },
    33: {
        worldNum: 3,
        levelNum: 3,
        timeLimit: 300,
        bg: "#000000",
        spawnLocation: {
            x: 160,
            y: 1000
        },
        width: 13040,
        levelEndLine: 12720,
        worldElements: {
            castles: [
                {x: 0, y: 600},
                {x: 12480, y: 120},
                {x: 12320, y: 520, name: "rectangle5doors"},
            ],
            rectangles: [
                {x: 0, y: 1000, w: 16},
                {x: 11520, y: 1000, w: 19},

                {x: 1520, y: 840, w: 3, h: 3, type: "treeStump"},
                {x: 1840, y: 600, w: 4, h: 6, type: "treeStump"},
                {x: 2960, y: 1000, w: 5, type: "treeStump"},
                {x: 3520, y: 760, w: 2, h: 4, type: "treeStump"},
                {x: 3760, y: 920, w: 8, h: 2, type: "treeStump"},
                {x: 3840, y: 600, w: 4, h: 3, type: "treeStump"},
                {x: 4480, y: 280, w: 2, h: 10, type: "treeStump"},
                
                {x: 5280, y: 600, h: 5, type: "treeStump"},
                {x: 5600, y: 600, h: 5, type: "treeStump"},
                {x: 5920, y: 600, h: 5, type: "treeStump"},
                {x: 6240, y: 360, h: 8, type: "treeStump"},
                
                {x: 6800, y: 920, w: 2, h: 2, type: "treeStump"},
                {x: 7840, y: 760, h: 4, type: "treeStump"},
                {x: 8400, y: 440, w: 2, h: 8, type: "treeStump"},
                {x: 8640, y: 920, w: 3, h: 2, type: "treeStump"},
                {x: 8720, y: 600, h: 3, type: "treeStump"},
                {x: 9600, y: 840, w: 10, h: 3, type: "treeStump"},
            ],
            tiles: [
                {x: 3920, y: 200, type: "questionBlock", item: {type: "magicMushroom"}},
            ],
            platforms: [
                {x: 1440, y: 760, w: 5},
                
                {x: 1760, y: 520, w: 6},
                {x: 3760, y: 520, w: 6},
                {x: 5200, y: 520, w: 3},
                {x: 5520, y: 520, w: 3},
                {x: 5840, y: 520, w: 3},
                {x: 8640, y: 520, w: 3},
                
                {x: 2400, y: 1000, w: 3},
                {x: 5200, y: 1000, w: 16},
                {x: 9280, y: 1000, w: 3},
                
                {x: 2880, y: 920, w: 7},
                
                {x: 3440, y: 680, w: 4},
                {x: 7760, y: 680, w: 3},
                
                {x: 3680, y: 840, w: 10},
                {x: 6720, y: 840, w: 4},
                {x: 8560, y: 840, w: 5},
                
                {x: 4400, y: 200, w: 4},
                
                {x: 6160, y: 280, w: 3},
                
                {x: 8320, y: 360, w: 4},
            ],
            clouds: [
                {x: 240, y: 200, amount: 2},
                {x: 4080, y: 200, amount: 2},
                {x: 7920, y: 200, amount: 2},
                {x: 11760, y: 200, amount: 2},
                
                {x: 1440, y: 120, amount: 2},
                {x: 5280, y: 120, amount: 2},
                {x: 9120, y: 120, amount: 2},
                {x: 12960, y: 120},
                
                {x: 720, y: 520},
                {x: 2800, y: 520},
                {x: 4560, y: 520},
                {x: 6640, y: 520},
                {x: 8400, y: 520},
                {x: 10480, y: 520},
                {x: 12240, y: 520},
                
                {x: 2240, y: 840},
                {x: 3680, y: 840},
                {x: 6080, y: 840},
                {x: 7520, y: 840},
                {x: 11360, y: 840},
                
                {x: 3040, y: 440},
                {x: 6880, y: 440},
                {x: 10720, y: 440},
            ],
            enemies: [
                {x: 2080, y: 440},
                {x: 4160, y: 360, theme: "castle", type: "koopaTroopa"},
                {x: 4320, y: 680, theme: "castle", type: "koopaTroopa"},
                {x: 5840, y: 840, theme: "castle", type: "koopaTroopa"},
                {x: 9920, y: 600, theme: "castle", type: "koopaTroopa"},
                {x: 10080, y: 600, theme: "castle", type: "koopaTroopa"},
                {x: 9120, y: 280, theme: "castle", type: "koopaParatroopa"},
            ],
            flags: [
                {x: 12080, y: 120, destination: {worldID: 34}},
            ],
            elevatorPlatforms: [
                {x: 2400, y: 280, movementType: "leftRight"},
                {x: 2640, y: 600, movementType: "leftRight"},
                {x: 4800, y: 440},
                {x: 7520, y: 680, movementType: "leftRight"},
                {x: 7680, y: 360, movementType: "leftRight"},
                {x: 8240, y: 840, movementType: "leftRight"},
                {x: 10560, y: 440, movementType: "leftRight"},
            ],
            scalePlatforms: [
                {x: 6480, y: 120, w: 10, platformLeft: {x: 6480, y: 440, w: 3}, platformRight: {x: 7040, y: 600, w: 3}},
                {x: 10880, y: 120, w: 7, platformLeft: {x: 10880, y: 360, w: 3}, platformRight: {x: 11200, y: 600, w: 3}},
            ],
            coins: [
                {x: 2480, y: 920},
                {x: 2560, y: 920},
                {x: 2960, y: 440},
                
                {x: 3360, y: 440},
                {x: 3440, y: 440},
                {x: 3520, y: 440},
                
                {x: 4160, y: 680},
                {x: 4240, y: 680},
                {x: 4320, y: 680},
                
                {x: 4480, y: 120},
                {x: 4560, y: 120},
                
                {x: 5280, y: 440},
                {x: 5600, y: 440},
                {x: 5920, y: 440},
                
                {x: 6240, y: 200},
                {x: 8400, y: 200},
                {x: 8480, y: 200},
                
                {x: 6480, y: 360},
                {x: 7040, y: 360},
                {x: 7200, y: 360},
                
                {x: 8720, y: 440},
                {x: 8640, y: 760},
            ]
        }
    },
    34: {
        worldNum: 3,
        levelNum: 4,
        theme: "castle",
        bg: "#000000",
        timeLimit: 300,
        width: 12800,
        levelEndLine: 12240,
        spawnLocation: {
            x: 80,
            y: 520
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 120, w: 160, type: "solid", collision: true},
                {x: 0, y: 200, w: 16, h: 2, type: "solid", collision: true},
                {x: 0, y: 760, w: 16, h: 4, type: "solid", collision: true},
                {x: 0, y: 520, w: 2, h: 3, type: "solid", collision: true},
                
                {x: 1440, y: 760, w: 3, type: "solid", collision: true},
                {x: 1440, y: 920, w: 3, h: 2, type: "solid", collision: true},
                
                {x: 1840, y: 760, w: 3, type: "solid", collision: true},
                {x: 1840, y: 920, w: 3, h: 2, type: "solid", collision: true},
                
                {x: 2240, y: 760, w: 3, type: "solid", collision: true},
                {x: 2240, y: 920, w: 3, h: 2, type: "solid", collision: true},
                
                {x: 2640, y: 760, w: 2, h: 4, type: "solid", collision: true},
                
                {x: 2800, y: 1000, w: 11, type: "solid", collision: true},
                {x: 2800, y: 200, w: 11, h: 2, type: "solid", collision: true},
                
                {x: 3840, y: 1000, w: 40, type: "solid", collision: true},
                
                {x: 4240, y: 200, w: 3, h: 2, type: "solid", collision: true},
                {x: 5040, y: 200, w: 3, h: 2, type: "solid", collision: true},
                {x: 6320, y: 200, w: 3, h: 2, type: "solid", collision: true},
                
                {x: 4240, y: 920, w: 3, type: "solid", collision: true},
                {x: 5040, y: 920, w: 3, type: "solid", collision: true},
                {x: 6320, y: 920, w: 3, type: "solid", collision: true},
                
                {x: 7200, y: 200, w: 6, h: 2, type: "solid", collision: true},
                {x: 7200, y: 760, w: 6, h: 4, type: "solid", collision: true},
                {x: 7920, y: 760, w: 3, h: 4, type: "solid", collision: true},
                {x: 8400, y: 760, w: 3, h: 4, type: "solid", collision: true},
                
                {x: 8880, y: 200, w: 17, h: 2, type: "solid", collision: true},
                {x: 8880, y: 760, w: 5, h: 3, type: "solid", collision: true},
                {x: 9440, y: 760, w: 10, h: 3, type: "solid", collision: true},

                {x: 10560, y: 200, w: 2, h: 3, type: "block", collision: true, individualCheck: true},
                {x: 11360, y: 200, w: 2, h: 3, type: "solid", collision: true},
                {x: 11280, y: 680, w: 3, h: 4, type: "solid", collision: true},
                
                {x: 8880, y: 1000, w: 17, type: "solid", collision: true},
                {x: 11280, y: 1000, w: 19, type: "solid", collision: true},

                {x: 3680, y: 1000, w: 2, type: "waterTop"},
                {x: 7040, y: 1000, w: 2, type: "waterTop"},
                {x: 7680, y: 1000, w: 3, type: "waterTop"},
                {x: 8160, y: 1000, w: 3, type: "waterTop"},
                {x: 8640, y: 1000, w: 3, type: "waterTop"},
                {x: 10240, y: 1000, w: 13, type: "waterTop"},
                
                {x: 10240, y: 760, w: 13, type: "bowserBridge", collision: true},
            ],
            coins: [
                {x: 6480, y: 440},
                {x: 6560, y: 440},
                {x: 6640, y: 440},
            ],
            bowsers: [
                {x: 10800, y: 600}
            ],
            elevatorPlatforms: [
                {x: 11040, y: 440, w: 2, movementType: "leftRight"}
            ],
            tiles: [
                {x: 1440, y: 840, type: "solid", collision: true},
                {x: 1600, y: 840, type: "solid", collision: true},
                
                {x: 1840, y: 840, type: "solid", collision: true},
                {x: 2000, y: 840, type: "solid", collision: true},
                
                {x: 2240, y: 840, type: "solid", collision: true},
                {x: 2400, y: 840, type: "solid", collision: true},
                
                {x: 3360, y: 680, type: "questionBlock"},
                {x: 3440, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 3520, y: 680, type: "questionBlock"},

                {x: 11200, y: 680, type: "bowserBridgeRope"},

                {x: 12240, y: 840, type: "mushroomRetainerTop"},
                {x: 12240, y: 920, type: "mushroomRetainerBottom"},
            ],
            axes: [
                {x: 11280, y: 600, destination: {worldID: 41}}
            ],
            steps: [
                {x: 160, y: 520, w: 3, type: "solid", reversed: true},
            ],
            fireBars: [
                {x: 1520, y: 840, counterClockWise: true},
                {x: 1920, y: 840, counterClockWise: true},
                {x: 2320, y: 840, counterClockWise: true},
                
                {x: 4320, y: 360, counterClockWise: true},
                {x: 5120, y: 360, counterClockWise: true},
                {x: 6400, y: 360, counterClockWise: true},
                
                {x: 4320, y: 840},
                {x: 5120, y: 840},
                {x: 6400, y: 840},
            ],
            enemies: [
                {x: 1280, y: 1080, type: "podoboo"},
                {x: 2080, y: 1080, type: "podoboo"},
                {x: 7040, y: 1080, type: "podoboo"},
                {x: 7760, y: 1080, type: "podoboo"},
                {x: 8240, y: 1080, type: "podoboo"},
                {x: 8720, y: 1080, type: "podoboo"},
            ]
        }
    },
    41: {
        worldNum: 4,
        levelNum: 1,
        theme: "overworld",
        width: 19200,
        levelEndLine: 18560,
        spawnLocation: {
            x: 160,
            y: 1000
        },
        worldElements: {
            castles: [
                {x: 18320, y: 600},
                {x: 0, y: 120},
                {x: -160, y: 520, name: "rectangle5doors"}
            ],
            rectangles: [
                {x: 0, y: 1000, w: 32},
                {x: 2720, y: 1000, w: 44},
                {x: 6560, y: 1000, w: 67},
                {x: 12080, y: 1000, w: 23},
                {x: 14160, y: 1000, w: 3},
                {x: 14560, y: 1000, w: 8},
                {x: 15360, y: 1000, w: 48},
                
                {x: 8240, y: 760, h: 3, type: "stair", collision: true},
                {x: 15120, y: 760, h: 3, type: "stair", collision: true},
                {x: 17280, y: 360, h: 8, type: "stair", collision: true},
            ],
            clouds: [
                {x: 640, y: 200},
                {x: 4480, y: 200},
                {x: 8320, y: 200},
                {x: 12160, y: 200},
                {x: 16000, y: 200},
                
                {x: 2160, y: 200, amount: 3},
                {x: 6000, y: 200, amount: 3},
                {x: 9840, y: 200, amount: 3},
                {x: 13680, y: 200, amount: 3},
                {x: 17520, y: 200, amount: 3},
                
                {x: 1520, y: 120},
                {x: 5360, y: 120},
                {x: 9200, y: 120},
                {x: 13040, y: 120},
                {x: 16880, y: 120},
                
                {x: 2880, y: 120, amount: 2},
                {x: 6720, y: 120, amount: 2},
                {x: 10560, y: 120, amount: 2},
                {x: 14400, y: 120, amount: 2},
                {x: 18240, y: 120, amount: 2},
            ],
            bushes: [
                {x: 1840, y: 920},
                {x: 5680, y: 920},
                {x: 9520, y: 920},
                {x: 13360, y: 920},
                {x: 17200, y: 920},

                {x: 3280, y: 920, amount: 2},
                {x: 7120, y: 920, amount: 2},
                {x: 10960, y: 920, amount: 2},
                {x: 14800, y: 920, amount: 2},
                {x: 18640, y: 920, amount: 2},

                {x: 880, y: 920, amount: 3},
                {x: 4720, y: 920, amount: 3},
                {x: 8560, y: 920, amount: 3},
                {x: 12400, y: 920, amount: 3},
                {x: 16240, y: 920, amount: 3},
            ],
            hills: [
                {x: 1280, y: 840, h: 2},
                {x: 5120, y: 840, h: 2},
                {x: 8960, y: 840, h: 2},
                {x: 12800, y: 840, h: 2},
                
                {x: 3840, y: 760, h: 3},
                {x: 7680, y: 760, h: 3},
                {x: 11520, y: 760, h: 3},
                {x: 15360, y: 760, h: 3},
            ],
            tiles: [
                {x: 2000, y: 360, type: "questionBlock"},
                {x: 2000, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
                
                {x: 5120, y: 360, type: "questionBlock"},
                {x: 5280, y: 360, type: "questionBlock"},
                
                {x: 5120, y: 680, type: "questionBlock"},
                {x: 5280, y: 680, type: "questionBlock"},
                
                {x: 7200, y: 680, type: "questionBlock"},
                {x: 7280, y: 680, type: "questionBlock"},
                {x: 7360, y: 680, type: "questionBlock"},
                {x: 7440, y: 680, type: "questionBlock"},
                
                {x: 7360, y: 360, type: "secret", item: {type: "oneUp"}},
                
                {x: 11840, y: 360, type: "questionBlock"},
                {x: 11920, y: 360, type: "questionBlock"},
                {x: 12000, y: 360, type: "questionBlock"},
                {x: 12080, y: 360, type: "questionBlock"},
                
                {x: 11680, y: 680, type: "questionBlock"},
                {x: 11760, y: 680, type: "questionBlock"},
                {x: 11840, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 11920, y: 680, type: "block", collision: true},
                {x: 12000, y: 680, type: "block", collision: true},
                {x: 12080, y: 680, type: "questionBlock"},
                {x: 12160, y: 680, type: "questionBlock"},
                {x: 12240, y: 680, type: "questionBlock"},
                
                {x: 17600, y: 680, type: "multiCoinBlock"},
            ],
            coins: [
                {x: 3280, y: 680},
                {x: 3360, y: 600},
                {x: 3440, y: 600},
                {x: 3520, y: 680},
                
                {x: 8400, y: 440},
                {x: 8480, y: 440},
                {x: 8560, y: 440},
                {x: 8640, y: 440},
                
                {x: 9520, y: 440},
                {x: 9600, y: 440},
                {x: 9680, y: 440},
                {x: 9760, y: 440},
                
                {x: 10800, y: 440},
                {x: 10880, y: 440},
                {x: 10960, y: 440},
                {x: 11040, y: 440},
            ],
            enemies: [
                {x: 2400, y: 120, type: "lakitu"},
                {x: 8960, y: 120, type: "lakitu"},
                {x: 15440, y: 120, type: "lakitu"},
            ],
            pipes: [
                {x: 1680, y: 760, size: 3, piranha: true},
                {x: 9280, y: 680, size: 4, piranha: true},
                {x: 10560, y: 680, size: 4, piranha: true, destination: {worldID: 411}},
                {x: 13040, y: 840, piranha: true},
            ],
            steps: [
                {x: 16640, y: 360, w: 8}
            ],
            flags: [
                {x: 18000, y: 120, destination: {worldID: 421, transitionType: "cutscene421"}}
            ]
        }
    },
    411: {
        worldNum: 4,
        levelNum: 1,
        theme: "underworld",
        bg: "#000000",
        width: 1920,
        spawnLocation: {
            x: 440,
            y: 280
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 24},
                {x: 0, y: 120, w: 5, h: 11, type: "block", collision: true},
                {x: 1680, y: 120, w: 3, h: 11, type: "block", collision: true},
                
                {x: 560, y: 120, w: 12, type: "block", collision: true, individualCheck: true},
                {x: 560, y: 680, w: 8, type: "block", collision: true, individualCheck: true},
                {x: 560, y: 760, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 1120, y: 760, h: 2, type: "block", collision: true, individualCheck: true},
                
                {x: 1520, y: 120, h: 9, type: "pipeVerticalLeft", collision: true},
                {x: 1600, y: 120, h: 11, type: "pipeVerticalRight", collision: true},
            ],
            coins: [
                {x: 560, y: 600},
                {x: 640, y: 600},
                {x: 720, y: 600},
                {x: 800, y: 600},
                {x: 880, y: 600},
                {x: 960, y: 600},
                {x: 1040, y: 600},
                {x: 1120, y: 600},
                
                {x: 560, y: 920},
                {x: 640, y: 920},
                {x: 720, y: 920},
                {x: 800, y: 920},
                {x: 880, y: 920},
                {x: 960, y: 920},
                {x: 1040, y: 920},
                {x: 1120, y: 920},
                {x: 1200, y: 920},
                {x: 1280, y: 920},
            ],
            tiles: [
                {x: 1360, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 1520, y: 840, type: "pipeConnectorTopLeft"},
                {x: 1520, y: 920, type: "pipeConnectorBottomLeft"},
            ],
            pipes: [
                {x: 1360, y: 840, opening: "left", destination: {worldID: 41, scrollOffset: 12640, spawnLocation: {x: 440, y: 1000}, transitionType: "pipeOutTop"}}
            ]
        }
    },
    42: {
        worldNum: 4,
        levelNum: 2,
        theme: "underworld",
        bg: "#000000",
        spawnLocation: {
            x: 200,
            y: 280
        },
        vineLevel: {
            worldID: 422
        },
        width: 17920,
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 11},
                {x: 1040, y: 1000, w: 2},
                {x: 1680, y: 1000, w: 36},
                {x: 5040, y: 1000, w: 42},
                {x: 8560, y: 1000, w: 2},
                {x: 8880, y: 1000, w: 2},
                {x: 9520, y: 1000, w: 4},
                {x: 10320, y: 1000, w: 15},
                {x: 11680, y: 1000, w: 9},
                {x: 12800, y: 1000, w: 23},
                {x: 14800, y: 1000, w: 39},
                
                {x: 0, y: 120, h: 11, type: "block", collision: true},
                {x: 480, y: 120, w: 51, type: "block", collision: true, individualCheck: true},
                {x: 5360, y: 120, w: 45, type: "block", collision: true, individualCheck: true},
                {x: 9520, y: 120, w: 4, type: "block", collision: true, individualCheck: true},
                {x: 10240, y: 120, w: 27, type: "block", collision: true, individualCheck: true},
                {x: 12800, y: 120, w: 29, type: "block", collision: true, individualCheck: true},
                {x: 15280, y: 120, w: 28, type: "block", collision: true, individualCheck: true},

                {x: 1600, y: 200, w: 23, h: 3, type: "block", collision: true, individualCheck: true},
                {x: 3520, y: 200, w: 4, h: 3, type: "block", collision: true, individualCheck: true},
                {x: 1760, y: 680, w: 6, h: 1, type: "block", collision: true, individualCheck: true},
                {x: 1760, y: 760, w: 5, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 2400, y: 680, w: 18, h: 4, type: "block", collision: true},
                
                {x: 5200, y: 360, w: 2, h: 1, type: "block", collision: true, individualCheck: true},
                
                {x: 8240, y: 840, h: 2, type: "stair", collision: true},
                {x: 8320, y: 760, h: 3, type: "stair", collision: true},
                {x: 8880, y: 760, w: 2, h: 3, type: "stair", collision: true},
                
                {x: 9520, y: 680, w: 4, type: "block", collision: true, individualCheck: true},
                
                {x: 12800, y: 200, w: 16, h: 3, type: "block", collision: true, individualCheck: true},
                {x: 12800, y: 440, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 12960, y: 680, w: 10, type: "block", collision: true, individualCheck: true},

                {x: 15120, y: 120, h: 6, type: "pipeVerticalLeft", collision: true},
                {x: 15200, y: 120, h: 8, type: "pipeVerticalRight"},
                
                {x: 14800, y: 760, w: 6, h: 3, type: "block", collision: true},
                {x: 15280, y: 200, w: 18, h: 10, type: "block", collision: true},
                {x: 17760, y: 200, w: 2, h: 11, type: "block", collision: true},
            ],
            tiles: [
                {x: 1360, y: 1000, type: "floor", collision: true},
                {x: 2240, y: 680, type: "block",collision: true, item: {type: "magicMushroom"}},
                {x: 3440, y: 200, type: "block", collision: true},
                {x: 3440, y: 280, type: "multiCoinBlock"},
                {x: 3440, y: 360, type: "block", collision: true},
                
                {x: 4000, y: 360, type: "questionBlock"},
                {x: 4080, y: 360, type: "questionBlock"},
                
                {x: 4000, y: 680, type: "questionBlock"},
                {x: 4080, y: 680, type: "questionBlock"},
                
                {x: 4320, y: 680, type: "questionBlock"},
                {x: 4400, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 4480, y: 680, type: "questionBlock"},
                
                {x: 5040, y: 680, type: "secret"},
                {x: 5120, y: 600, type: "secret"},
                {x: 5200, y: 680, type: "secret"},
                {x: 5280, y: 760, type: "secret"},
                
                {x: 5120, y: 360, type: "block", collision: true, item: {type: "vine"}},
                
                {x: 6080, y: 680, type: "block", collision: true},
                {x: 6160, y: 680, type: "multiCoinBlock"},
                {x: 6400, y: 680, type: "block", collision: true},
                {x: 6480, y: 680, type: "block", collision: true, item: {type: "starman"}},
                
                {x: 6960, y: 600, type: "block", collision: true},
                
                {x: 9520, y: 360, type: "block", collision: true},
                {x: 9600, y: 360, type: "block", collision: true, item: {type: "magicMushroom"}},
                {x: 9680, y: 360, type: "block", collision: true},
                
                {x: 12880, y: 680, type: "block", collision: true, item: {type: "magicMushroom"}},
                
                {x: 15120, y: 600, type: "pipeConnectorTopLeft"},
                {x: 15120, y: 680, type: "pipeConnectorBottomLeft"},
            ],
            coins: [
                {x: 2160, y: 920},
                {x: 2240, y: 920},
                {x: 2320, y: 920},
                
                {x: 12960, y: 600},
                {x: 13040, y: 600},
                {x: 13120, y: 600},
                {x: 13200, y: 600},
                {x: 13280, y: 600},
                {x: 13360, y: 600},
                {x: 13440, y: 600},
                {x: 13520, y: 600},
                {x: 13600, y: 600},
                {x: 13680, y: 600},
            ],
            enemies: [
                {x: 3440, y: 600},
                {x: 3560, y: 600},
                {x: 3680, y: 600},
                
                {x: 6160, y: 840, type: "koopaTroopa"},
                {x: 8000, y: 840, type: "koopaTroopa"},
                {x: 8120, y: 840, type: "koopaTroopa"},
                {x: 10960, y: 840, type: "koopaTroopa"},
                {x: 13440, y: 840, type: "koopaTroopa"},
                {x: 13560, y: 840, type: "koopaTroopa"},
                
                {x: 6640, y: 920, type: "buzzyBeetle"},
                {x: 7040, y: 920, type: "buzzyBeetle"},
                {x: 14320, y: 920, type: "buzzyBeetle"},
                {x: 12320, y: 680, type: "buzzyBeetle"},
            ],
            elevatorPlatforms: [
                {x: 4720, y: 360, movementType: "down"},
                
                {x: 9200, y: 360, movementType: "down"},
                {x: 9200, y: 920, movementType: "down"},
                
                {x: 9920, y: 120, movementType: "up"},
                {x: 9920, y: 680, movementType: "up"},
                
                {x: 12480, y: 360, movementType: "down"},
                {x: 12480, y: 920, movementType: "down"},
            ],
            steps: [
                {x: 12160, y: 760, w: 3},
                {x: 13840, y: 680, w: 4},
            ],
            pipes: [
                {x: 5760, y: 760, size: 3, piranha: true},
                {x: 6720, y: 760, size: 3, piranha: true, destination: {worldID: 423}},
                {x: 7120, y: 760, size: 3, piranha: true},
                {x: 11040, y: 760, size: 3, piranha: true},
                {x: 17120, y: 760, size: 3, piranha: true, destination: {worldID: 51}},
                
                {x: 8560, y: 680, size: 4, piranha: true},
                {x: 10480, y: 840, size: 2},
                {x: 11360, y: 680, size: 4, piranha: true},

                {x: 6240, y: 440, size: 7, piranha: true},
                {x: 14400, y: 440, size: 7, piranha: true},
                
                {x: 14960, y: 600, size: 2, opening: "left", destination: {worldID: 424, spawnLocation: {x: 280, y: 1000}, transitionType: "pipeOutTop"}},
            ],
        }
    },
    421: {
        worldNum: 4,
        levelNum: 2,
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
    422: {
        worldNum: 4,
        levelNum: 2,
        theme: "overworld",
        width: 5120,
        spawnLocation: {
            x: 320,
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 4},
                {x: 400, y: 1000, w: 59},
                {x: 3920, y: 280, w: 11, type: "stair", collision: true},
                {x: 4960, y: 120, w: 2, h: 11, type: "stair", collision: true},

                {x: 1040, y: 840, h: 2, type: "mushroomStump"},
                {x: 1360, y: 520, h: 6, type: "mushroomStump"},
                {x: 1840, y: 520, h: 6, type: "mushroomStump"},
                {x: 2560, y: 440, h: 7, type: "mushroomStump"},
                {x: 2160, y: 680, h: 4, type: "mushroomStump"},
            ],
            platforms: [
                {x: 960, y: 680, w: 3, theme: "orange", variant: "Mushroom"},
                {x: 1280, y: 360, w: 3, theme: "orange", variant: "Mushroom"},
                {x: 1760, y: 360, w: 3, theme: "orange", variant: "Mushroom"},
                {x: 2080, y: 520, w: 3, theme: "orange", variant: "Mushroom"},
                {x: 1440, y: 840, w: 3, theme: "orange", variant: "Mushroom"},
                {x: 1760, y: 840, w: 5, theme: "orange", variant: "Mushroom"},
                {x: 2400, y: 280, w: 5, theme: "orange", variant: "Mushroom"},
                {x: 2480, y: 760, w: 7, theme: "orange", variant: "Mushroom"},
            ],
            tiles: [
                {x: 1040, y: 760, type: "mushroomStumpTop"},
                {x: 1360, y: 440, type: "mushroomStumpTop"},
                {x: 1840, y: 440, type: "mushroomStumpTop"},
                {x: 2560, y: 360, type: "mushroomStumpTop"},
                {x: 2160, y: 600, type: "mushroomStumpTop"},
                {x: 1520, y: 920, type: "mushroomStumpTop"},
                {x: 1920, y: 920, type: "mushroomStumpTop"},
                {x: 2720, y: 840, type: "mushroomStumpTop"},
                {x: 2720, y: 920, type: "mushroomStump"},
            ],
            coins: [
                {x: 960, y: 600},
                {x: 1040, y: 600},
                {x: 1120, y: 600},
                
                {x: 1280, y: 280},
                {x: 1360, y: 280},
                {x: 1440, y: 280},
                
                {x: 1760, y: 280},
                {x: 1840, y: 280},
                {x: 1920, y: 280},
                
                {x: 2080, y: 440},
                {x: 2160, y: 440},
                {x: 2240, y: 440},

                {x: 2400, y: 200},
                {x: 2480, y: 200},
                {x: 2560, y: 200},
                {x: 2640, y: 200},
                {x: 2720, y: 200},
                
                {x: 2800, y: 680},
                {x: 2880, y: 680},
            ],
            clouds: [
                {x: 720, y: 520},
                {x: 2800, y: 520},
                {x: 4560, y: 520},

                {x: 3040, y: 440},
                
                {x: -160, y: 840},
                {x: 2240, y: 840},

                {x: 240, y: 200, amount: 2},
                {x: 4080, y: 200, amount: 2},
                {x: 1440, y: 120, amount: 2},
            ],
            pipes: [
                {x: 4000, y: 760, size: 3, piranha: true, isWarp: true, theme: "orange", destination: {worldID: 81}},
                {x: 4320, y: 760, size: 3, piranha: true, isWarp: true, theme: "orange", destination: {worldID: 71}},
                {x: 4640, y: 760, size: 3, piranha: true, isWarp: true, theme: "orange", destination: {worldID: 61}},
            ],
            vines: [
                {x: 320, y: 1000, needsGrow: false, h: 5}
            ],
            steps: [
                {x: 3200, y: 280, w: 9}
            ]
        }
    },
    423: {
        worldNum: 4,
        levelNum: 2,
        theme: "underworld",
        width: 1920,
        bg: "#000000",
        spawnLocation: {
            x: 440,
            y: 280
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 24},
                {x: 0, y: 120, w: 5, h: 11, type: "block", collision: true},
                {x: 1680, y: 120, w: 3, h: 11, type: "block", collision: true},
                {x: 640, y: 120, w: 6, h: 1, type: "block", collision: true, individualCheck: true},
                {x: 640, y: 440, w: 1, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 720, y: 520, w: 5, h: 1, type: "block", collision: true, individualCheck: true},
                {x: 1120, y: 120, w: 1, h: 6, type: "block", collision: true, individualCheck: true},
                {x: 1200, y: 440, w: 2, h: 1, type: "block", collision: true, individualCheck: true},
                
                {x: 1520, y: 120, h: 9, type: "pipeVerticalLeft", collision: true},
                {x: 1600, y: 120, h: 11, type: "pipeVerticalRight", collision: true},
            ],
            tiles: [
                {x: 1440, y: 520, type: "multiCoinBlock"},
                {x: 1520, y: 840, type: "pipeConnectorTopLeft"},
                {x: 1520, y: 920, type: "pipeConnectorBottomLeft"},
            ],
            coins: [
                {x: 720, y: 360},
                {x: 800, y: 360},
                {x: 880, y: 360},
                {x: 960, y: 360},
                {x: 1040, y: 360},
                {x: 720, y: 440},
                {x: 800, y: 440},
                {x: 880, y: 440},
                {x: 960, y: 440},
                {x: 1040, y: 440},
            ],
            pipes: [
                {x: 1360, y: 840, opening: "left", destination: {worldID: 42, scrollOffset: 10320, spawnLocation: {x: 200, y: 1000}, transitionType: "pipeOutTop"}}
            ]
        }
    },
    424: {
        worldNum: 4,
        levelNum: 2,
        theme: "overworld",
        spawnLocation: {
            x: 280,
            y: 1000
        },
        width: 2560,
        levelEndLine: 2320,
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
                {x: 1760, y: 120, destination: {worldID: 43}},
            ]
        }
    },
    43: {
        worldNum: 4,
        levelNum: 3,
        timeLimit: 300,
        theme: "overworld",
        width: 12720,
        levelEndLine: 12400,
        spawnLocation: {
            x: 160,
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 15},
                {x: 11280, y: 1000, w: 18},

                {x: 8480, y: 920, h: 2, type: "mushroomStump"},
                {x: 10560, y: 920, h: 2, type: "mushroomStump"},

                {x: 2080, y: 840, h: 3, type: "mushroomStump"},
                {x: 3600, y: 840, h: 3, type: "mushroomStump"},
                {x: 5840, y: 840, h: 3, type: "mushroomStump"},
                {x: 6800, y: 840, h: 3, type: "mushroomStump"},
                {x: 9200, y: 840, h: 3, type: "mushroomStump"},
                
                {x: 4160, y: 760, h: 4, type: "mushroomStump"},
                
                {x: 5440, y: 680, h: 5, type: "mushroomStump"},
                
                {x: 9440, y: 600, h: 6, type: "mushroomStump"},

                {x: 1680, y: 520, h: 7, type: "mushroomStump"},
                {x: 3280, y: 520, h: 7, type: "mushroomStump"},
                {x: 6080, y: 520, h: 7, type: "mushroomStump"},
                
                {x: 2640, y: 440, h: 8, type: "mushroomStump"},
                
                {x: 5680, y: 360, h: 9, type: "mushroomStump"},
            ],
            tiles: [
                {x: 8480, y: 840, type: "mushroomStumpTop"},
                {x: 10560, y: 840, type: "mushroomStumpTop"},

                {x: 1680, y: 440, type: "mushroomStumpTop"},
                {x: 3280, y: 440, type: "mushroomStumpTop"},
                {x: 6080, y: 440, type: "mushroomStumpTop"},
                
                {x: 2080, y: 760, type: "mushroomStumpTop"},
                {x: 3600, y: 760, type: "mushroomStumpTop"},
                {x: 5840, y: 760, type: "mushroomStumpTop"},
                {x: 6800, y: 760, type: "mushroomStumpTop"},
                {x: 9200, y: 760, type: "mushroomStumpTop"},
                
                {x: 4160, y: 680, type: "mushroomStumpTop"},
                
                {x: 5440, y: 600, type: "mushroomStumpTop"},
                
                {x: 9440, y: 520, type: "mushroomStumpTop"},
                
                {x: 1680, y: 440, type: "mushroomStumpTop"},
                {x: 3280, y: 440, type: "mushroomStumpTop"},
                {x: 6080, y: 440, type: "mushroomStumpTop"},
                
                {x: 2640, y: 360, type: "mushroomStumpTop"},
                
                {x: 5680, y: 280, type: "mushroomStumpTop"},
                
                {x: 3120, y: 1000, type: "mushroomStumpTop"},
                
                {x: 8000, y: 920, type: "mushroomStumpTop"},
                
                {x: 8000, y: 1000, type: "mushroomStump"},
                
                {x: 3440, y: 120, type: "questionBlock", item: {type: "magicMushroom"}},
            ],
            clouds: [
                {x: 240, y: 200, amount: 2},
                {x: 4080, y: 200, amount: 2},
                {x: 7920, y: 200, amount: 2},
                
                {x: 1440, y: 120, amount: 2},
                {x: 5280, y: 120, amount: 2},
                {x: 9120, y: 120, amount: 2},
                
                {x: 720, y: 520},
                {x: 2800, y: 520},
                {x: 4560, y: 520},
                {x: 6640, y: 520},
                {x: 8400, y: 520},
                {x: 10480, y: 520},
                
                {x: 3040, y: 440},
                {x: 6880, y: 440},
                {x: 10720, y: 440},
                
                {x: 2240, y: 840},
                {x: 3680, y: 840},
                {x: 6080, y: 840},
                {x: 7520, y: 840},
                {x: 9920, y: 840},
            ],
            platforms: [
                {x: 1280, y: 1000, w: 5, theme: "orange", variant: "Mushroom"},
                {x: 5200, y: 1000, w: 5, theme: "orange", variant: "Mushroom"},
                {x: 9680, y: 1000, w: 7, theme: "orange", variant: "Mushroom"},
                
                {x: 2880, y: 920, w: 7, theme: "orange", variant: "Mushroom"},
                
                {x: 7920, y: 840, w: 3, theme: "orange", variant: "Mushroom"},
                
                {x: 8400, y: 760, w: 3, theme: "orange", variant: "Mushroom"},
                {x: 10400, y: 760, w: 5, theme: "orange", variant: "Mushroom"},
                
                {x: 1840, y: 680, w: 7, theme: "orange", variant: "Mushroom"},
                {x: 3520, y: 680, w: 3, theme: "orange", variant: "Mushroom"},
                {x: 5760, y: 680, w: 3, theme: "orange", variant: "Mushroom"},
                {x: 6720, y: 680, w: 3, theme: "orange", variant: "Mushroom"},
                {x: 9040, y: 680, w: 5, theme: "orange", variant: "Mushroom"},
                
                {x: 4080, y: 600, w: 3, theme: "orange", variant: "Mushroom"},
                
                {x: 5360, y: 520, w: 3, theme: "orange", variant: "Mushroom"},
                
                {x: 9360, y: 440, w: 3, theme: "orange", variant: "Mushroom"},
                
                {x: 1520, y: 360, w: 5, theme: "orange", variant: "Mushroom"},
                {x: 3120, y: 360, w: 5, theme: "orange", variant: "Mushroom"},
                {x: 5920, y: 360, w: 5, theme: "orange", variant: "Mushroom"},
                
                {x: 2560, y: 280, w: 3, theme: "orange", variant: "Mushroom"},
                
                {x: 5600, y: 200, w: 3, theme: "orange", variant: "Mushroom"},
            ],
            elevatorPlatforms: [
                {x: 4640, y: 440, movementType: "upDown"},
                {x: 4960, y: 280, movementType: "upDown"},
                {x: 10880, y: 360, movementType: "upDown"},
            ],
            scalePlatforms: [
                {x: 3840, y: 120, w: 10, platformLeft: {x: 3840, y: 360, w: 3}, platformRight: {x: 4400, y: 600, w: 3}},
                {x: 6400, y: 120, w: 11, platformLeft: {x: 6400, y: 360, w: 3}, platformRight: {x: 7040, y: 600, w: 3}},
                {x: 7280, y: 120, w: 8, platformLeft: {x: 7280, y: 360, w: 3}, platformRight: {x: 7680, y: 600, w: 3}},
                {x: 8160, y: 120, w: 9, platformLeft: {x: 8160, y: 360, w: 3}, platformRight: {x: 8640, y: 600, w: 3}},
            ],
            coins: [
                {x: 1600, y: 280},
                {x: 1680, y: 280},
                {x: 1760, y: 280},
                {x: 8320, y: 280},
                
                {x: 1920, y: 600},
                {x: 2000, y: 600},
                {x: 2080, y: 600},
                {x: 2160, y: 600},
                {x: 2240, y: 600},
                {x: 5840, y: 600},
                {x: 9040, y: 600},
                {x: 9120, y: 600},
                {x: 9200, y: 600},
                {x: 9280, y: 600},
                {x: 9360, y: 600},
                
                {x: 3040, y: 840},
                {x: 3120, y: 840},
                {x: 3200, y: 840},
                
                {x: 3840, y: 520},
                {x: 7680, y: 520},
                
                {x: 4560, y: 200},
                
                {x: 5600, y: 120},
                {x: 5680, y: 120},
                {x: 5760, y: 120},
                
                {x: 5360, y: 440},
                {x: 5440, y: 440},
                {x: 5520, y: 440},
            ],
            enemies: [
                {x: 2240, y: 520, theme: "castle", type: "koopaTroopa"},
                {x: 2320, y: 520, theme: "castle", type: "koopaTroopa"},
                {x: 3120, y: 760, theme: "castle", type: "koopaTroopa"},
                {x: 5440, y: 840, theme: "castle", type: "koopaTroopa"},
                {x: 6240, y: 200, theme: "castle", type: "koopaTroopa"},
                
                {x: 2880, y: 120, theme: "castle", type: "koopaParatroopa"},
            ],
            castles: [
                {x: 0, y: 600},
                {x: 12160, y: 120},
                {x: 12000, y: 520, name: "rectangle5doors"},
            ],
            flags: [
                {x: 11760, y: 120, theme: "orange", destination: {worldID: 44}}
            ]
        }
    },
    44: {
        worldNum: 4,
        levelNum: 4,
        theme: "castle",
        bg: "#000000",
        width: 15360,
        levelEndLine: 14800,
        spawnLocation: {
            x: 80,
            y: 520
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 120, w: 147, type: "solid", collision: true},
                {x: 12160, y: 120, w: 40, type: "solid", collision: true},
                {x: 1280, y: 1000, w: 72, type: "solid", collision: true},
                {x: 7600, y: 1000, w: 65, type: "solid", collision: true},
                {x: 13840, y: 1000, w: 19, type: "solid", collision: true},
                
                {x: 0, y: 200, w: 6, h: 2, type: "solid", collision: true},
                {x: 0, y: 520, w: 2, h: 3, type: "solid", collision: true},
                {x: 0, y: 760, w: 7, h: 4, type: "solid", collision: true},
                {x: 720, y: 760, w: 2, h: 4, type: "solid", collision: true},
                {x: 1040, y: 760, w: 3, h: 4, type: "solid", collision: true},
                
                {x: 1440, y: 440, w: 6, h: 4, type: "solid", collision: true},
                {x: 2000, y: 440, w: 1, h: 4, type: "solid", collision: true},
                {x: 2160, y: 440, w: 1, h: 4, type: "solid", collision: true},
                {x: 2320, y: 440, w: 1, h: 4, type: "solid", collision: true},
                {x: 2480, y: 440, w: 1, h: 4, type: "solid", collision: true},
                {x: 2640, y: 440, w: 1, h: 4, type: "solid", collision: true},
                {x: 2800, y: 440, w: 3, h: 4, type: "solid", collision: true},
                
                {x: 3040, y: 440, w: 6, h: 1, type: "solid", collision: true},

                {x: 3520, y: 440, w: 31, h: 4, type: "solid", collision: true},
                
                {x: 6160, y: 200, w: 3, h: 3, type: "solid", collision: true},
                {x: 6160, y: 760, w: 3, h: 3, type: "solid", collision: true},
                
                {x: 6880, y: 760, w: 2, h: 1, type: "solid", collision: true},
                {x: 7120, y: 600, w: 2, h: 1, type: "solid", collision: true},
                {x: 7200, y: 760, w: 1, h: 4, type: "solid", collision: true},
                {x: 7280, y: 760, w: 4, h: 1, type: "solid", collision: true},
                {x: 7520, y: 600, w: 1, h: 2, type: "solid", collision: true},
                {x: 7600, y: 440, w: 1, h: 2, type: "solid", collision: true},
                {x: 7680, y: 440, w: 2, h: 1, type: "solid", collision: true},
                
                {x: 8000, y: 440, w: 4, h: 1, type: "solid", collision: true},
                {x: 8400, y: 440, w: 1, h: 4, type: "solid", collision: true},
                {x: 8480, y: 440, w: 2, h: 1, type: "solid", collision: true},
                {x: 8800, y: 440, w: 34, h: 1, type: "solid", collision: true},
                {x: 7680, y: 760, w: 48, h: 1, type: "solid", collision: true},
                
                {x: 11520, y: 360, w: 1, h: 5, type: "solid", collision: true},
                {x: 11600, y: 200, w: 2, h: 2, type: "solid", collision: true},
                {x: 12160, y: 760, w: 4, h: 3, type: "solid", collision: true},
                {x: 12640, y: 760, w: 2, h: 3, type: "solid", collision: true},
                {x: 13840, y: 680, w: 3, h: 4, type: "solid", collision: true},
                {x: 13920, y: 200, w: 2, h: 3, type: "solid", collision: true},
                
                {x: 560, y: 1000, w: 2, h: 1, type: "waterTop"},
                {x: 880, y: 1000, w: 2, h: 1, type: "waterTop"},
                {x: 7040, y: 1000, w: 2, h: 1, type: "waterTop"},
                {x: 7280, y: 1000, w: 4, h: 1, type: "waterTop"},
                {x: 12800, y: 1000, w: 13, h: 1, type: "waterTop"},
                
                {x: 12800, y: 760, w: 13, h: 1, type: "bowserBridge", collision: true},
            ],
            teleportTriggers: [
                {x: 5760, y: 760, w: 3, h: 3, destination: {worldID: 44, scrollOffset: 720, spawnLocation: {x: 400, y: 760}}},
                {x: 11280, y: 200, w: 3, h: 3, destination: {worldID: 44, scrollOffset: 6160, spawnLocation: {x: 80, y: 760}}},
                {x: 11280, y: 520, w: 3, h: 3, destination: {worldID: 44, scrollOffset: 6160, spawnLocation: {x: 80, y: 760}}},
            ],
            tiles: [
                {x: 7440, y: 520, type: "solid", collision: true},
                {x: 13760, y: 680, type: "bowserBridgeRope"},
                {x: 14800, y: 840, type: "mushroomRetainerTop"},
                {x: 14800, y: 920, type: "mushroomRetainerBottom"},
            ],
            pipes: [
                {x: 3200, y: 760, size: 3},
            ],
            piranhas: [
                {x: 3240, y: 600, theme: "underworld"},
            ],
            fireBars: [
                {x: 4240, y: 440, noCenterTile: true},
                {x: 4800, y: 680, noCenterTile: true},
                {x: 9200, y: 440, noCenterTile: true},
                {x: 9760, y: 760, noCenterTile: true},
                {x: 12960, y: 760, noCenterTile: true},
            ],
            enemies: [
                {x: 13200, y: 920, type: "podoboo"}
            ],
            steps: [
                {x: 160, y: 520, w: 3, type: "solid", reversed: true},
            ],
            bowsers: [
                {x: 13360, y: 600}
            ],
            axes: [
                {x: 13840, y: 600, destination: {worldID: 51}}
            ]
        }
    },
    51: {
        worldNum: 5,
        levelNum: 1,
        timeLimit: 300,
        width: 16640,
        spawnLocation: {
            x: 160,
            y: 1000
        },
        levelEndLine: 16480,
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 49},
                {x: 4080, y: 1000, w: 41},
                {x: 7680, y: 1000, w: 18},
                {x: 9280, y: 1000, w: 36},
                {x: 12400, y: 1000, w: 53},
                
                {x: 1120, y: 920, w: 4, type: "fence"},
                {x: 3040, y: 920, w: 2, type: "fence"},
                {x: 4960, y: 920, w: 4, type: "fence"},
                {x: 6880, y: 920, w: 2, type: "fence"},
                {x: 8800, y: 920, w: 4, type: "fence"},
                {x: 10720, y: 920, w: 2, type: "fence"},
                {x: 12640, y: 920, w: 4, type: "fence"},
                
                {x: 11920, y: 680, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 7120, y: 680, h: 4, type: "stair", collision: true},
                {x: 7200, y: 680, w: 4, type: "stair", collision: true},
                {x: 9280, y: 760, h: 3, type: "stair", collision: true},
                {x: 11760, y: 680, h: 4, type: "stair", collision: true},
                {x: 12480, y: 680, w: 2, type: "stair", collision: true},
                {x: 15120, y: 360, w: 2, h: 6, type: "stair", collision: true},
            ],
            enemies: [
                {x: 1280, y: 840, type: "koopaTroopa"},
                {x: 3280, y: 840, type: "koopaTroopa"},
                {x: 3400, y: 840, type: "koopaTroopa"},
                {x: 10160, y: 840, type: "koopaTroopa"},
                {x: 11520, y: 840, type: "koopaTroopa"},
                {x: 11640, y: 840, type: "koopaTroopa"},
                
                {x: 1520, y: 920},
                {x: 1640, y: 920},
                {x: 1760, y: 920},
                
                {x: 2400, y: 920},
                {x: 2520, y: 920},
                {x: 2640, y: 920},
                
                {x: 5200, y: 920},
                {x: 5320, y: 920},
                {x: 5440, y: 920},
                
                {x: 6080, y: 920},
                {x: 6200, y: 920},
                {x: 6320, y: 920},
                
                {x: 8240, y: 920},
                {x: 8360, y: 920},
                {x: 8480, y: 920},
                
                {x: 9680, y: 920},
                {x: 9800, y: 920},
                {x: 9920, y: 920},
                
                {x: 10800, y: 920},
                {x: 10920, y: 920},
                {x: 11040, y: 920},
                
                {x: 4880, y: 840, type: "koopaParatroopa"},
                {x: 6960, y: 840, type: "koopaParatroopa"},
                {x: 14240, y: 840, type: "koopaParatroopa"},
                {x: 14560, y: 520, type: "koopaParatroopa"},
            ],
            castles: [
                {x: 16240, y: 600},
                {x: 0, y: 600},
            ],
            trees: [
                {x: 880, y: 840, theme: "grey"},
                {x: 1840, y: 840, theme: "grey"},
                {x: 1920, y: 840, theme: "grey"},
                {x: 3200, y: 840, theme: "grey"},
                {x: 4720, y: 840, theme: "grey"},
                {x: 5680, y: 840, theme: "grey"},
                {x: 5760, y: 840, theme: "grey"},
                {x: 7040, y: 840, theme: "grey"},
                {x: 8560, y: 840, theme: "grey"},
                {x: 9520, y: 840, theme: "grey"},
                {x: 9600, y: 840, theme: "grey"},
                {x: 10880, y: 840, theme: "grey"},
                {x: 12400, y: 840, theme: "grey"},
                {x: 13360, y: 840, theme: "grey"},
                {x: 13440, y: 840, theme: "grey"},
                
                {x: 1040, y: 760, theme: "grey", big: true},
                {x: 1680, y: 760, theme: "grey", big: true},
                {x: 3440, y: 760, theme: "grey", big: true},
                {x: 4880, y: 760, theme: "grey", big: true},
                {x: 5520, y: 760, theme: "grey", big: true},
                {x: 7280, y: 760, theme: "grey", big: true},
                {x: 8720, y: 760, theme: "grey", big: true},
                {x: 9360, y: 760, theme: "grey", big: true},
                {x: 11120, y: 760, theme: "grey", big: true},
                {x: 12560, y: 760, theme: "grey", big: true},
                {x: 13200, y: 760, theme: "grey", big: true},
                {x: 14960, y: 760, theme: "grey", big: true},
            ],
            pipes: [
                {x: 3520, y: 760, size: 3, theme: "grey"},
                {x: 4080, y: 760, size: 3, theme: "grey"},
                {x: 12480, y: 520, theme: "grey", destination: {worldID: 511}},
                {x: 13040, y: 840, theme: "grey"},
            ],
            piranhas: [
                {x: 3560, y: 600},
                {x: 4120, y: 600},
                {x: 12520, y: 360},
                {x: 13080, y: 680},
            ],
            clouds: [
                {x: 0, y: 200, amount: 2},
                {x: 2400, y: 200, amount: 2},
                {x: 3840, y: 200, amount: 2},
                {x: 6240, y: 200, amount: 2},
                {x: 7680, y: 200, amount: 2},
                {x: 10080, y: 200, amount: 2},
                {x: 11520, y: 200, amount: 2},
                {x: 13920, y: 200, amount: 2},
                {x: 15360, y: 200, amount: 2},
                
                {x: 1440, y: 200},
                {x: 5280, y: 200},
                {x: 9120, y: 200},
                {x: 12960, y: 200},
                
                {x: 2160, y: 120},
                {x: 3600, y: 120},
                {x: 6000, y: 120},
                {x: 7440, y: 120},
                {x: 9840, y: 120},
                {x: 11280, y: 120},
                {x: 13680, y: 120},
                {x: 15120, y: 120},
            ],
            tiles: [
                {x: 3280, y: 920, type: "fence"},
                {x: 10960, y: 920, type: "fence"},
                
                {x: 7200, y: 360, type: "blockShiny", collision: true},
                {x: 7280, y: 360, type: "blockShiny", collision: true, item: {type: "starman"}},
                {x: 7360, y: 360, type: "blockShiny", collision: true},
                
                {x: 11840, y: 680, type: "secret", item: {type: "oneUp"}},
            ],
            cannons: [
                {x: 8880, y: 840},
                {x: 12720, y: 840},
                {x: 13600, y: 840},
            ],
            steps: [
                {x: 14560, y: 600, w: 5}
            ],
            flags: [
                {x: 15920, y: 120, theme: "castle", destination: {worldID: 52}}
            ]
        }
    },
    511: {
        worldNum: 5,
        levelNum: 1,
        theme: "underworld",
        width: 1920,
        bg: "#000000",
        spawnLocation: {
            x: 440,
            y: 280
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 24},
                {x: 0, y: 120, w: 5, h: 11, type: "block", collision: true},
                {x: 1680, y: 120, w: 3, h: 11, type: "block", collision: true},
                {x: 640, y: 120, w: 6, h: 1, type: "block", collision: true, individualCheck: true},
                {x: 640, y: 440, w: 1, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 720, y: 520, w: 5, h: 1, type: "block", collision: true, individualCheck: true},
                {x: 1120, y: 120, w: 1, h: 6, type: "block", collision: true, individualCheck: true},
                {x: 1200, y: 440, w: 2, h: 1, type: "block", collision: true, individualCheck: true},
                
                {x: 1520, y: 120, h: 9, type: "pipeVerticalLeft", collision: true},
                {x: 1600, y: 120, h: 11, type: "pipeVerticalRight", collision: true},
            ],
            tiles: [
                {x: 1440, y: 520, type: "multiCoinBlock"},
                {x: 1520, y: 840, type: "pipeConnectorTopLeft"},
                {x: 1520, y: 920, type: "pipeConnectorBottomLeft"},
            ],
            coins: [
                {x: 720, y: 360},
                {x: 800, y: 360},
                {x: 880, y: 360},
                {x: 960, y: 360},
                {x: 1040, y: 360},
                {x: 720, y: 440},
                {x: 800, y: 440},
                {x: 880, y: 440},
                {x: 960, y: 440},
                {x: 1040, y: 440},
            ],
            pipes: [
                {x: 1360, y: 840, opening: "left", destination: {worldID: 51, scrollOffset: 12800, spawnLocation: {x: 280, y: 1000}, transitionType: "pipeOutTop"}}
            ]
        }
    },
    52: {
        worldNum: 5,
        levelNum: 2,
        theme: "overworld",
        width: 17040,
        levelEndLine: 16560,
        timeLimit: 400,
        spawnLocation: {
            x: 160,
            y: 1000
        },
        vineLevel: {
            worldID: 522
        },
        worldElements: {
            castles: [
                {x: 0, y: 600},
                {x: 16320, y: 600},
            ],
            flags: [
                {x: 16000, y: 120, theme: "grey", destination: {worldID: 53}}
            ],
            rectangles: [
                {x: 0, y: 1000, w: 26},
                {x: 2320, y: 1000, w: 37},
                {x: 5440, y: 1000, w: 24},
                {x: 7680, y: 1000, w: 31},
                {x: 10320, y: 1000, w: 15},
                {x: 12080, y: 1000, w: 19},
                {x: 13840, y: 1000, w: 2},
                {x: 14160, y: 1000, w: 8},
                {x: 14880, y: 1000, w: 2},
                {x: 15120, y: 1000, w: 24},
                
                {x: 1280, y: 680, w: 3, type: "stair", collision: true},
                {x: 3840, y: 680, h: 4, type: "stair", collision: true},
                {x: 3920, y: 860, h: 2, type: "stair", collision: true},
                {x: 5440, y: 600, h: 5, type: "stair", collision: true},
                {x: 5520, y: 520, w: 2, h: 6, type: "stair", collision: true},
                {x: 10320, y: 760, h: 3, type: "stair", collision: true},
                {x: 14880, y: 680, h: 4, type: "stair", collision: true},
                {x: 14960, y: 600, h: 5, type: "stair", collision: true},
                {x: 15120, y: 440, h: 7, type: "stair", collision: true},
                {x: 15200, y: 360, w: 2, h: 7, type: "stair", collision: true},

                {x: 2320, y: 360, w: 5, type: "blockShiny", collision: true, individualCheck: true},
                {x: 2320, y: 680, w: 6, type: "blockShiny", collision: true, individualCheck: true},
                {x: 6880, y: 360, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 7120, y: 600, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 9440, y: 360, w: 7, type: "blockShiny", collision: true, individualCheck: true},
                {x: 9440, y: 680, w: 8, type: "blockShiny", collision: true, individualCheck: true},
                {x: 11760, y: 680, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 12240, y: 360, w: 5, type: "blockShiny", collision: true, individualCheck: true},
                {x: 13760, y: 360, w: 4, type: "blockShiny", collision: true, individualCheck: true},

                {x: 1280, y: 920, w: 2, type: "fence"},
                {x: 3040, y: 920, w: 2, type: "fence"},
                {x: 6880, y: 920, w: 2, type: "fence"},
                {x: 8800, y: 920, w: 4, type: "fence"},
                {x: 10720, y: 920, w: 2, type: "fence"},
                {x: 12640, y: 920, w: 4, type: "fence"},
            ],
            tiles: [
                {x: 2720, y: 360, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},
                {x: 6800, y: 360, type: "blockShiny", collision: true, item: {type: "vine"}},
                {x: 10000, y: 360, type: "blockShiny", collision: true, item: {type: "starman"}},
                {x: 11280, y: 840, type: "multiCoinBlock"},
                {x: 11360, y: 840, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},
                {x: 13440, y: 680, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},

                {x: 6240, y: 680, type: "questionBlock"},
                {x: 6320, y: 680, type: "questionBlock"},
                {x: 6400, y: 680, type: "questionBlock"},
                {x: 6480, y: 680, type: "questionBlock"},
                {x: 6560, y: 680, type: "questionBlock"},
                
                {x: 6560, y: 680, type: "secret"},
                
                {x: 3280, y: 920, type: "fence"},
                {x: 14560, y: 920, type: "fence"},
                {x: 16720, y: 920, type: "fence"},
            ],
            enemies: [
                {x: 1840, y: 840, type: "koopaTroopa"},
                {x: 12560, y: 200, theme: "castle", type: "koopaTroopa"},
                
                {x: 3200, y: 840, type: "koopaParatroopa"},
                {x: 8480, y: 840, type: "koopaParatroopa"},
                {x: 13040, y: 840, type: "koopaParatroopa"},
                {x: 13280, y: 840, type: "koopaParatroopa"},
                {x: 14880, y: 520, type: "koopaParatroopa"},
                
                {x: 3680, y: 600, type: "hammerBro"},
                {x: 6480, y: 440, type: "hammerBro"},
                {x: 6900, y: 520, type: "hammerBro"},
                {x: 9920, y: 200, type: "hammerBro"},
                
                {x: 5040, y: 760},
                {x: 5200, y: 600},
                {x: 12400, y: 920},
                {x: 12480, y: 920},
                
                {x: 10880, y: 920, type: "buzzyBeetle"},
                {x: 10960, y: 920, type: "buzzyBeetle"},
                {x: 11040, y: 920, type: "buzzyBeetle"},
            ],
            trees: [
                {x: 880, y: 840, theme: "grey"},
                {x: 1840, y: 840, theme: "grey"},
                {x: 1920, y: 840, theme: "grey"},
                {x: 3200, y: 840, theme: "grey"},
                {x: 4720, y: 840, theme: "grey"},
                {x: 5680, y: 840, theme: "grey"},
                {x: 5760, y: 840, theme: "grey"},
                {x: 7040, y: 840, theme: "grey"},
                {x: 9520, y: 840, theme: "grey"},
                {x: 9600, y: 840, theme: "grey"},
                {x: 10880, y: 840, theme: "grey"},
                {x: 12400, y: 840, theme: "grey"},
                {x: 13360, y: 840, theme: "grey"},
                {x: 13440, y: 840, theme: "grey"},
                {x: 16240, y: 840, theme: "grey"},
                
                {x: 1040, y: 760, theme: "grey", big: true},
                {x: 1680, y: 760, theme: "grey", big: true},
                {x: 3440, y: 760, theme: "grey", big: true},
                {x: 4880, y: 760, theme: "grey", big: true},
                {x: 7280, y: 760, theme: "grey", big: true},
                {x: 8720, y: 760, theme: "grey", big: true},
                {x: 9360, y: 760, theme: "grey", big: true},
                {x: 11120, y: 760, theme: "grey", big: true},
                {x: 12560, y: 760, theme: "grey", big: true},
                {x: 13200, y: 760, theme: "grey", big: true},
            ],
            clouds: [
                {x: 0, y: 200, amount: 2},
                {x: 2400, y: 200, amount: 2},
                {x: 3840, y: 200, amount: 2},
                {x: 6240, y: 200, amount: 2},
                {x: 7680, y: 200, amount: 2},
                {x: 10080, y: 200, amount: 2},
                {x: 11520, y: 200, amount: 2},
                {x: 13920, y: 200, amount: 2},
                {x: 15360, y: 200, amount: 2},
                
                {x: 1440, y: 200},
                {x: 5280, y: 200},
                {x: 9120, y: 200},
                {x: 12960, y: 200},
                {x: 16800, y: 200},
                
                {x: 2160, y: 120},
                {x: 3600, y: 120},
                {x: 6000, y: 120},
                {x: 7440, y: 120},
                {x: 9840, y: 120},
                {x: 11280, y: 120},
                {x: 13680, y: 120},
                {x: 15120, y: 120},
            ],
            cannons: [
                {x: 1360, y: 520},
                {x: 8560, y: 480},
            ],
            coins: [
                {x: 1680, y: 280},
                {x: 1760, y: 280},
                {x: 1840, y: 280},
                
                {x: 2320, y: 600},
                {x: 2400, y: 600},
                {x: 2480, y: 600},

                {x: 6880, y: 280},
                {x: 6960, y: 280},

                {x: 7120, y: 920},
                {x: 7200, y: 920},

                {x: 13760, y: 280},
                {x: 13840, y: 280},
            ],
            pipes: [
                {x: 4400, y: 760, size: 3, theme: "grey", destination: {worldID: 521}},
                {x: 9200, y: 840, theme: "grey"},
                {x: 13840, y: 840, theme: "grey"},
            ],
            piranhas: [
                {x: 4440, y: 600},
                {x: 9240, y: 680},
                {x: 13880, y: 680},
            ],
            steps: [
                {x: 960, y: 680, w: 4},
                {x: 3520, y: 680, w: 4},
                {x: 4960, y: 680, w: 4},
                {x: 14640, y: 840, w: 2},
            ],
            jumpingBoards: [
                {x: 2000, y: 840}
            ],
        }
    },
    521: {
        worldNum: 5,
        levelNum: 2,
        theme: "water",
        waterLevel: true,
        gravity: .5,
        width: 5120,
        spawnLocation: {
            x: 120,
            y: 360
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 120, w: 26, type: "waterTop", collision: true},
                {x: 2240, y: 120, w: 4, type: "waterTop", collision: true},
                {x: 2720, y: 120, w: 27, type: "waterTop", collision: true},

                {x: 0, y: 1000, w: 22, type: "rock", collision: true},
                {x: 2720, y: 1000, w: 4, type: "rock", collision: true},
                {x: 3200, y: 1000, w: 2, type: "rock", collision: true},
                {x: 3520, y: 1000, w: 20, type: "rock", collision: true},
                {x: 880, y: 440, w: 5, type: "rock", collision: true},
                {x: 3040, y: 280, w: 6, type: "rock", collision: true},
                {x: 4000, y: 440, w: 4, type: "rock", collision: true},
                {x: 4320, y: 680, w: 4, type: "rock", collision: true},
                {x: 2080, y: 120, w: 2, h: 3, type: "rock", collision: true},
                {x: 2560, y: 120, w: 2, h: 3, type: "rock", collision: true},
                {x: 2080, y: 760, w: 2, h: 4, type: "rock", collision: true},
                {x: 2560, y: 760, w: 2, h: 4, type: "rock", collision: true},
                {x: 5040, y: 120, w: 1, h: 11, type: "rock", collision: true},
                {x: 4880, y: 120, w: 2, h: 4, type: "rock", collision: true},
                {x: 4880, y: 680, w: 2, h: 4, type: "rock", collision: true},
                
                {x: 960, y: 760, h: 3, type: "coral", collision: true},
                {x: 1600, y: 680, h: 4, type: "coral", collision: true},
                {x: 3680, y: 840, h: 2, type: "coral", collision: true},
                {x: 1200, y: 280, h: 2, type: "coral", collision: true},
                {x: 3040, y: 360, h: 4, type: "coral", collision: true},
                {x: 3440, y: 360, h: 4, type: "coral", collision: true},
            ],
            steps: [
                {x: 4720, y: 840, w: 2, type: "rock"}
            ],
            pipes: [
                {x: 4960, y: 520, size: 1, destination: {worldID: 52, scrollOffset: 8800, spawnLocation: {x: 360, y: 1000}, transitionType: "pipeOutTop"}}
            ],
            coins: [
                {x: 1760, y: 520},
                {x: 1840, y: 520},
                {x: 1920, y: 520},
                {x: 2000, y: 520},
                {x: 2080, y: 520},
                {x: 2160, y: 520},
                {x: 2240, y: 520},
                {x: 2320, y: 520},
                {x: 2400, y: 520},
                {x: 2480, y: 520},
                
                {x: 4320, y: 360},
                {x: 4400, y: 360},
                {x: 4480, y: 360},
                {x: 4560, y: 360},
                
                {x: 4000, y: 600},
                {x: 4080, y: 600},
                {x: 4160, y: 600},
                {x: 4240, y: 600},
                
                {x: 3200, y: 920},
                {x: 3280, y: 920},
            ],
            elevatorPlatforms: [
                {x: 1840, y: 440, movementType: "down"},
                {x: 2320, y: 920, movementType: "down"},
            ],
            enemies: [
                {x: 1520, y: 840, type: "bloober"},
                {x: 2800, y: 840, type: "bloober"},
                {x: 3600, y: 840, type: "bloober"},
            ]
        }
    },
    // TODO: teleportTrigger
    522: {
        worldNum: 5,
        levelNum: 2,
        spawnLocation: {
            x: 320,
            y: 1000
        },
        width: 6400,
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 4, type: "cloudFloor", collision: true},
                {x: 400, y: 1000, w: 57, type: "cloudFloor", collision: true},
            ],
            vines: [
                {x: 320, y: 1000, h: 5}
            ],
            coins: [
                {x: 1200, y: 440},
                {x: 1280, y: 440},
                {x: 1360, y: 440},
                {x: 1440, y: 440},
                {x: 1520, y: 440},
                {x: 1600, y: 440},
                {x: 1680, y: 440},
                {x: 1760, y: 440},
                {x: 1840, y: 440},
                {x: 1920, y: 440},
                {x: 2000, y: 440},
                {x: 2080, y: 440},
                {x: 2160, y: 440},
                {x: 2240, y: 440},
                {x: 2320, y: 440},
                {x: 2400, y: 440},
                
                {x: 2560, y: 280},
                {x: 2640, y: 280},
                {x: 2720, y: 280},
                
                {x: 2880, y: 360},
                {x: 2960, y: 360},
                {x: 3040, y: 360},
                {x: 3120, y: 360},
                {x: 3200, y: 360},
                {x: 3280, y: 360},
                {x: 3360, y: 360},
                {x: 3440, y: 360},
                {x: 3520, y: 360},
                {x: 3600, y: 360},
                {x: 3680, y: 360},
                {x: 3760, y: 360},
                {x: 3840, y: 360},
                {x: 3920, y: 360},
                {x: 4000, y: 360},
                {x: 4080, y: 360},
                
                {x: 4240, y: 280},
                {x: 4320, y: 280},
                {x: 4400, y: 280},
                
                {x: 5520, y: 920},
                {x: 5600, y: 920},
                {x: 5680, y: 920},
            ],
            elevatorPlatforms: [
                {x: 1280, y: 760, movementType: "touchRight", type: "cloud"},
            ],
        }
    },
    53: {
        worldNum: 5,
        levelNum: 3,
        timeLimit: 300,
        spawnLocation: {
            x: 160,
            y: 1000
        },
        width: 13120,
        levelEndLine: 12800,
        hasBulletBills: true,
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
                {x: 4400, y: 440, w: 2, movementType: "upDown"},
                {x: 6880, y: 600, w: 2, movementType: "leftRight"},
                {x: 7520, y: 680, w: 2, movementType: "leftRight"},
                {x: 10480, y: 440, w: 2, movementType: "leftRight"},
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
                {x: 12160, y: 120, destination: {worldID: 54}}
            ]
        }
    },
    54: {
        worldNum: 5,
        levelNum: 4,
        theme: "castle", 
        timeLimit: 300,
        width: 12800,
        levelEndLine: 12240,
        spawnLocation: {
            x: 80,
            y: 520
        },
        bg: "#000000",
        worldElements: {
            rectangles: [
                {x: 2720, y: 1000, w: 9, type: "solid", collision: true},
                {x: 3520, y: 1000, w: 11, type: "solid", collision: true},
                {x: 4480, y: 1000, w: 11, type: "solid", collision: true},
                {x: 5440, y: 1000, w: 12, type: "solid", collision: true},
                {x: 7920, y: 1000, w: 9, type: "solid", collision: true},
                {x: 9600, y: 1000, w: 2, type: "solid", collision: true},
                {x: 9920, y: 1000, w: 2, type: "solid", collision: true},
                {x: 11520, y: 1000, w: 16, type: "solid", collision: true},

                {x: 0, y: 120, w: 16, h: 3, type: "solid", collision: true},
                {x: 0, y: 760, w: 16, h: 4, type: "solid", collision: true},
                {x: 0, y: 520, w: 2, h: 3, type: "solid", collision: true},
                
                {x: 1440, y: 680, w: 2, h: 1, type: "solid", collision: true},
                {x: 2160, y: 680, w: 2, h: 1, type: "solid", collision: true},
                {x: 2560, y: 760, w: 2, h: 4, type: "solid", collision: true},
                {x: 2720, y: 120, w: 49, h: 4, type: "solid", collision: true},
                {x: 2960, y: 680, w: 36, h: 1, type: "solid", collision: true},
                {x: 6400, y: 760, w: 4, h: 4, type: "solid", collision: true},
                {x: 7440, y: 120, w: 6, h: 3, type: "solid", collision: true},
                {x: 7360, y: 760, w: 7, h: 4, type: "solid", collision: true},
                {x: 8640, y: 760, w: 1, h: 4, type: "solid", collision: true},
                {x: 8880, y: 760, w: 2, h: 4, type: "solid", collision: true},
                {x: 9200, y: 760, w: 5, h: 4, type: "solid", collision: true},
                {x: 9760, y: 760, w: 2, h: 4, type: "solid", collision: true},
                {x: 10080, y: 760, w: 2, h: 4, type: "solid", collision: true},
                {x: 9200, y: 120, w: 13, h: 3, type: "solid", collision: true},
                {x: 11360, y: 200, w: 2, h: 3, type: "solid", collision: true},
                {x: 11280, y: 680, w: 3, h: 5, type: "solid", collision: true},
                {x: 10240, y: 120, w: 32, type: "solid", collision: true},
                
                {x: 10240, y: 360, w: 6, h: 1, type: "block", collision: true, individualCheck: true},

                {x: 1280, y: 1000, w: 16, type: "waterTop"},
                {x: 8720, y: 1000, w: 2, type: "waterTop"},
                {x: 9040, y: 1000, w: 2, type: "waterTop"},
                {x: 10240, y: 1000, w: 13, type: "waterTop"},
                
                {x: 10240, y: 760, w: 13, type: "bowserBridge", collision: true},

                {x: 6880, y: 120, h: 12, type: "rope"},
                {x: 7120, y: 120, h: 12, type: "rope"},
            ],
            coins: [
                {x: 8160, y: 600},
                {x: 8240, y: 600},
                {x: 8320, y: 600},
                {x: 8160, y: 920},
                {x: 8240, y: 920},
                {x: 8320, y: 920},
            ],
            elevatorPlatforms: [
                {x: 6840, y: 760, w: 2, movementType: "up"},
                {x: 7080, y: 760, w: 2, movementType: "down"},
                {x: 11040, y: 440, w: 2, movementType: "leftRight"},
            ],
            tiles: [
                {x: 1760, y: 520, type: "solid", collision: true},
                {x: 1840, y: 200, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 1920, y: 520, type: "solid", collision: true},

                {x: 11200, y: 680, type: "bowserBridgeRope"},
                {x: 12240, y: 840, type: "mushroomRetainerTop"},
                {x: 12240, y: 920, type: "mushroomRetainerBottom"},
            ],
            steps: [
                {x: 160, y: 520, w: 3, type: "solid", reversed: true},
            ],
            axes: [
                {x: 11280, y: 600, destination: {worldID: 61}}
            ],
            enemies: [
                {x: 1280, y: 1000, type: "podoboo"},
                {x: 1600, y: 1000, type: "podoboo"},
                {x: 2400, y: 1000, type: "podoboo"},
                {x: 8720, y: 1000, type: "podoboo"},
                {x: 9040, y: 1000, type: "podoboo"},
                {x: 10480, y: 1000, type: "podoboo"},
            ],
            fireBars: [
                {x: 1840, y: 520, length: 12},
                {x: 3440, y: 1000},
                {x: 4400, y: 1000},
                {x: 5360, y: 1000, counterClockWise: true},
                {x: 3920, y: 680, counterClockWise: true},
                {x: 4880, y: 680, counterClockWise: true},
                {x: 5840, y: 680, counterClockWise: true},
                {x: 4400, y: 360, counterClockWise: true},
                {x: 6560, y: 440, counterClockWise: true},
                {x: 7360, y: 760},
                {x: 8240, y: 840},
            ],
            bowsers: [
                {x: 10800, y: 600}
            ],
        }
    },
    61: {
        worldNum: 6,
        levelNum: 1,
        bg: "#000000",
        width: 15920,
        levelEndLine: 15600,
        spawnLocation: {
            x: 160,
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 20},
                {x: 1760, y: 1000, w: 9},
                {x: 2960, y: 1000, w: 2},
                {x: 3280, y: 1000, w: 16},
                {x: 4720, y: 1000, w: 15},
                {x: 6160, y: 1000, w: 16},
                {x: 7680, y: 1000, w: 31},
                {x: 10720, y: 1000, w: 2},
                {x: 10960, y: 1000, w: 12},
                {x: 12400, y: 1000, w: 9},
                {x: 13360, y: 1000, w: 7},
                {x: 14080, y: 1000, w: 23},

                {x: 2080, y: 920, w: 6, type: "stair", collision: true},
                {x: 2320, y: 840, w: 5, type: "stair", collision: true},
                {x: 2560, y: 760, w: 4, type: "stair", collision: true},
                {x: 2800, y: 680, w: 3, type: "stair", collision: true},

                {x: 3280, y: 680, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                
                {x: 5840, y: 680, h: 4, type: "stair", collision: true},
                {x: 6960, y: 680, w: 3, h: 4, type: "stair", collision: true},
                
                {x: 7200, y: 440, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 7360, y: 760, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 10160, y: 600, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 10400, y: 920, w: 5, type: "blockShiny", collision: true, individualCheck: true},
                {x: 11920, y: 520, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 12160, y: 840, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                
                {x: 14080, y: 360, w: 2, h: 8, type: "stair", collision: true},
            ],
            tiles: [
                {x: 1280, y: 680, type: "questionBlock"},
                {x: 1360, y: 680, type: "questionBlock"},
                {x: 2880, y: 360, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},
                {x: 2960, y: 360, type: "blockShiny", collision: true},
                {x: 3440, y: 680, type: "multiCoinBlock"},
                
                {x: 7200, y: 600, type: "secret", item: {type: "oneUp"}},

                {x: 9040, y: 360, type: "secret"},
                {x: 9040, y: 680, type: "secret"},
                {x: 10400, y: 600, type: "questionBlock", collision: true, item: {type: "magicMushroom"}},
                {x: 10480, y: 600, type: "questionBlock"},
                {x: 12080, y: 680, type: "blockShiny", collision: true},
                {x: 12160, y: 680, type: "multiCoinBlock"},
            ],
            clouds: [
                {x: 640, y: 200},
                {x: 4480, y: 200},
                {x: 8320, y: 200},
                {x: 12160, y: 200},
                
                {x: 1520, y: 120},
                {x: 5360, y: 120},
                {x: 9200, y: 120},
                {x: 13040, y: 120},
                
                {x: 2160, y: 200, amount: 3},
                {x: 6000, y: 200, amount: 3},
                {x: 9840, y: 200, amount: 3},
                {x: 13680, y: 200, amount: 3},
                
                {x: 2880, y: 120, amount: 2},
                {x: 6720, y: 120, amount: 2},
                {x: 10560, y: 120, amount: 2},
                {x: 14400, y: 120, amount: 2},
            ],
            hills: [
                {x: 1280, y: 840},
                {x: 5120, y: 840},
                {x: 12800, y: 840},
                
                {x: 3840, y: 760, h: 3},
                {x: 7680, y: 760, h: 3},
            ],
            bushes: [
                {x: 880, y: 920, amount: 3},
                {x: 4720, y: 920, amount: 3},
                {x: 8560, y: 920, amount: 3},
                {x: 12400, y: 920, amount: 3},
                
                {x: 1840, y: 920},
                {x: 9520, y: 920},
                {x: 13360, y: 920},
                
                {x: 3280, y: 920, amount: 2},
                {x: 7120, y: 920, amount: 2},
                {x: 10960, y: 920, amount: 2},
                {x: 14800, y: 920, amount: 2},
            ],
            enemies: [
                {x: 2560, y: 120, type: "lakitu"},
                {x: 8960, y: 120, type: "lakitu"},
            ],
            steps: [
                {x: 5520, y: 680, w: 4},
                {x: 6720, y: 760, w: 2},
                {x: 6960, y: 440, w: 3},
                {x: 9760, y: 600, w: 5},
                {x: 11440, y: 520, w: 6},
                {x: 13520, y: 600, w: 5},
            ],
            castles: [
                {x: 0, y: 120},
                {x: -160, y: 520, name: "rectangle5doors"},
                {x: 15360, y: 600},
            ],
            flags: [
                {x: 14880, y: 120, destination: {worldID: 62}}
            ],
            pipes: [
                {x: 8160, y: 760, size: 3}
            ],
            pianhas: [
                {x: 8200, y: 600}
            ],
            coins: [
                {x: 4960, y: 680},
                {x: 5040, y: 680},
                {x: 5120, y: 680},
                
                {x: 6080, y: 520},
                {x: 6160, y: 520},
                
                {x: 8400, y: 600},
                {x: 8480, y: 600},
                {x: 8560, y: 600},
            ]
        }
    },
    62: {
        worldNum: 6,
        levelNum: 2,
        width: 18160, 
        levelEndLine: 17840,
        bg: "#000000",
        spawnLocation: {
            x: 160, 
            y: 1000
        },
        vineLevel: {worldID: 623},
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 123},
                {x: 10320, y: 1000, w: 12},
                {x: 11520, y: 1000, w: 8},
                {x: 12240, y: 1000, w: 74},
                
                {x: 800, y: 680, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 2560, y: 680, w: 2, type: "stair", collision: true},
                {x: 4960, y: 760, w: 2, type: "stair", collision: true},
                {x: 5360, y: 360, w: 5, type: "blockShiny", collision: true, individualCheck: true},
                {x: 6160, y: 360, w: 4, type: "blockShiny", collision: true, individualCheck: true},
                {x: 8880, y: 680, w: 2, type: "stair", collision: true},
                {x: 9520, y: 360, w: 9, type: "blockShiny", collision: true, individualCheck: true},
                {x: 11040, y: 600, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 11520, y: 680, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 11600, y: 360, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                
                {x: 12480, y: 680, h: 4, type: "stair", collision: true},
                {x: 12560, y: 840, h: 2, type: "stair", collision: true},
                
                {x: 12800, y: 360, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                {x: 12800, y: 680, w: 3, type: "blockShiny", collision: true, individualCheck: true},
                
                {x: 13360, y: 680, h: 2, type: "stair", collision: true},
                {x: 16240, y: 680, w: 4, h: 4, type: "stair", collision: true},
                {x: 16560, y: 360, h: 8, type: "stair", collision: true},
            ],
            tiles: [
                {x: 11360, y: 1000, type: "floor", collision: true},
                {x: 1840, y: 360, type: "blockShiny", collision: true},
                {x: 1920, y: 360, type: "multiCoinBlock"},
                {x: 2000, y: 360, type: "blockShiny", collision: true},
                {x: 1920, y: 680, type: "secret"},
                {x: 4080, y: 680, type: "blockShiny", collision: true},
                {x: 4160, y: 680, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},
                {x: 6480, y: 360, type: "blockShiny", collision: true, item: {type: "vine"}},
                {x: 6560, y: 680, type: "secret"},
                {x: 8800, y: 680, type: "blockShiny", collision: true},
                {x: 9040, y: 680, type: "blockShiny", collision: true},
                {x: 9200, y: 360, type: "blockShiny", collision: true},
                {x: 11200, y: 360, type: "blockShiny", collision: true, item: {type: "starman"}},
                {x: 11280, y: 360, type: "blockShiny", collision: true},
            ],
            steps: [
                {x: 11920, y: 760, w: 3},
                {x: 15920, y: 840, w: 2},
                {x: 16240, y: 360, w: 4},
            ],
            castles: [
                {x: 0, y: 600},
                {x: 17600, y: 600},
            ],
            flags: [
                {x: 17280, y: 120, destination: {worldID: 63}},
            ],
            pipes: [
                {x: 1520, y: 680, size: 4, piranha: true, destination: {worldID: 621}},
                {x: 2240, y: 680, piranha: true, size: 4},
                {x: 3680, y: 680, piranha: true, size: 4},
                {x: 8160, y: 680, piranha: true, size: 4},
                {x: 13920, y: 680, piranha: true, size: 4},
                {x: 16080, y: 680, piranha: true, size: 4},
                
                {x: 2800, y: 840, piranha: true},
                {x: 2960, y: 840, piranha: true},
                {x: 5360, y: 840, piranha: true},
                {x: 5920, y: 840, piranha: true},
                {x: 6720, y: 840, piranha: true},
                {x: 8400, y: 840, piranha: true},
                {x: 9200, y: 840, piranha: true},
                {x: 10480, y: 840, piranha: true},
                {x: 10800, y: 840, piranha: true},
                {x: 14320, y: 840, piranha: true},
                
                {x: 2560, y: 440, piranha: true},
                {x: 4960, y: 520, piranha: true},
                
                {x: 4480, y: 600, piranha: true, size: 5, destination: {worldID: 622}},
                
                {x: 6400, y: 760, piranha: true, size: 3},
                {x: 7520, y: 760, piranha: true, size: 3},
                {x: 8880, y: 440, piranha: true, size: 3},
                {x: 12240, y: 760, piranha: true, size: 3, destination: {worldID: 624}},
                {x: 13360, y: 440, piranha: true, size: 3},
                {x: 14440, y: 760, piranha: true, size: 3},
                {x: 15120, y: 760, piranha: true, size: 3},
            ],
            clouds: [
                {x: 640, y: 200},
                {x: 4480, y: 200},
                {x: 8320, y: 200},
                {x: 12160, y: 200},
                {x: 16000, y: 200},
                
                {x: 1520, y: 120},
                {x: 5360, y: 120},
                {x: 9200, y: 120},
                {x: 13040, y: 120},
                {x: 16880, y: 120},
                
                {x: 2160, y: 200, amount: 3},
                {x: 6000, y: 200, amount: 3},
                {x: 9840, y: 200, amount: 3},
                {x: 13680, y: 200, amount: 3},
                {x: 17520, y: 200, amount: 3},

                {x: 2880, y: 120, amount: 2},
                {x: 6720, y: 120, amount: 2},
                {x: 10560, y: 120, amount: 2},
                {x: 14400, y: 120, amount: 2},
            ],
            bushes: [
                {x: 880, y: 920, amount: 3},
                {x: 4720, y: 920, amount: 3},
                {x: 8560, y: 920, amount: 3},
                {x: 12400, y: 920, amount: 3},
                
                {x: 1840, y: 920},
                {x: 5680, y: 920},
                {x: 9520, y: 920},
                {x: 13360, y: 920},
                {x: 17200, y: 920},
                
                {x: 3280, y: 920, amount: 2},
                {x: 7120, y: 920, amount: 2},
                {x: 10960, y: 920, amount: 2},
                {x: 14800, y: 920, amount: 2},
            ],
            hills: [
                {x: 1280, y: 840},
                {x: 5120, y: 840},
                {x: 8960, y: 840},
                {x: 12800, y: 840},
                {x: 16640, y: 840},
                
                {x: 3840, y: 760, h: 3},
                {x: 7680, y: 760, h: 3},
                {x: 11520, y: 760, h: 3},
                {x: 15360, y: 760, h: 3},
            ],
            enemies: [
                {x: 2080, y: 840, type: "koopaTroopa"},
                {x: 3440, y: 840, type: "koopaParatroopa"},
                {x: 16480, y: 200, type: "koopaParatroopa"},
                {x: 4320, y: 920, type: "buzzyBeetle"},
                {x: 7360, y: 920, type: "buzzyBeetle"},
                {x: 9600, y: 280, type: "buzzyBeetle"},
                {x: 13040, y: 920, type: "buzzyBeetle"},
                {x: 5360, y: 280},
                {x: 5440, y: 280},
                {x: 13520, y: 280},
                {x: 13640, y: 280},
            ]
        }
    },
    621: {
        worldNum: 6,
        levelNum: 2,
        theme: "underworld",
        width: 1920,
        bg: "#000000",
        spawnLocation: {
            x: 440,
            y: 280
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 24},
                {x: 0, y: 120, w: 5, h: 11, type: "block", collision: true},
                {x: 1680, y: 120, w: 3, h: 11, type: "block", collision: true},
                {x: 640, y: 120, w: 6, h: 1, type: "block", collision: true, individualCheck: true},
                {x: 640, y: 440, w: 1, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 720, y: 520, w: 5, h: 1, type: "block", collision: true, individualCheck: true},
                {x: 1120, y: 120, w: 1, h: 6, type: "block", collision: true, individualCheck: true},
                {x: 1200, y: 440, w: 2, h: 1, type: "block", collision: true, individualCheck: true},
                
                {x: 1520, y: 120, h: 9, type: "pipeVerticalLeft", collision: true},
                {x: 1600, y: 120, h: 11, type: "pipeVerticalRight", collision: true},
            ],
            tiles: [
                {x: 1440, y: 520, type: "multiCoinBlock"},
                {x: 1520, y: 840, type: "pipeConnectorTopLeft"},
                {x: 1520, y: 920, type: "pipeConnectorBottomLeft"},
            ],
            coins: [
                {x: 720, y: 360},
                {x: 800, y: 360},
                {x: 880, y: 360},
                {x: 960, y: 360},
                {x: 1040, y: 360},
                {x: 720, y: 440},
                {x: 800, y: 440},
                {x: 880, y: 440},
                {x: 960, y: 440},
                {x: 1040, y: 440},
            ],
            pipes: [
                {x: 1360, y: 840, opening: "left", destination: {worldID: 62, scrollOffset: 2400, spawnLocation: {x: 480, y: 1000}, transitionType: "pipeOutTop"}}
            ]
        }
    },
    622: {
        worldNum: 6,
        levelNum: 2,
        theme: "water",
        waterLevel: true,
        gravity: .5,
        width: 5120,
        spawnLocation: {
            x: 120,
            y: 360
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 120, w: 26, type: "waterTop", collision: true},
                {x: 2240, y: 120, w: 4, type: "waterTop", collision: true},
                {x: 2720, y: 120, w: 27, type: "waterTop", collision: true},

                {x: 0, y: 1000, w: 22, type: "rock", collision: true},
                {x: 2720, y: 1000, w: 4, type: "rock", collision: true},
                {x: 3200, y: 1000, w: 2, type: "rock", collision: true},
                {x: 3520, y: 1000, w: 20, type: "rock", collision: true},
                {x: 880, y: 440, w: 5, type: "rock", collision: true},
                {x: 3040, y: 280, w: 6, type: "rock", collision: true},
                {x: 4000, y: 440, w: 4, type: "rock", collision: true},
                {x: 4320, y: 680, w: 4, type: "rock", collision: true},
                {x: 2080, y: 120, w: 2, h: 3, type: "rock", collision: true},
                {x: 2560, y: 120, w: 2, h: 3, type: "rock", collision: true},
                {x: 2080, y: 760, w: 2, h: 4, type: "rock", collision: true},
                {x: 2560, y: 760, w: 2, h: 4, type: "rock", collision: true},
                {x: 5040, y: 120, w: 1, h: 11, type: "rock", collision: true},
                {x: 4880, y: 120, w: 2, h: 4, type: "rock", collision: true},
                {x: 4880, y: 680, w: 2, h: 4, type: "rock", collision: true},
                
                {x: 960, y: 760, h: 3, type: "coral", collision: true},
                {x: 1600, y: 680, h: 4, type: "coral", collision: true},
                {x: 3680, y: 840, h: 2, type: "coral", collision: true},
                {x: 1200, y: 280, h: 2, type: "coral", collision: true},
                {x: 3040, y: 360, h: 4, type: "coral", collision: true},
                {x: 3440, y: 360, h: 4, type: "coral", collision: true},
            ],
            steps: [
                {x: 4720, y: 840, w: 2, type: "rock"}
            ],
            pipes: [
                {x: 4960, y: 520, size: 1, destination: {worldID: 62, scrollOffset: 8800, spawnLocation: {x: 440, y: 1000}, transitionType: "pipeOutTop"}}
            ],
            coins: [
                {x: 1760, y: 520},
                {x: 1840, y: 520},
                {x: 1920, y: 520},
                {x: 2000, y: 520},
                {x: 2080, y: 520},
                {x: 2160, y: 520},
                {x: 2240, y: 520},
                {x: 2320, y: 520},
                {x: 2400, y: 520},
                {x: 2480, y: 520},
                
                {x: 4320, y: 360},
                {x: 4400, y: 360},
                {x: 4480, y: 360},
                {x: 4560, y: 360},
                
                {x: 4000, y: 600},
                {x: 4080, y: 600},
                {x: 4160, y: 600},
                {x: 4240, y: 600},
                
                {x: 3200, y: 920},
                {x: 3280, y: 920},
            ],
            elevatorPlatforms: [
                {x: 1840, y: 440, w: 2, movementType: "down"},
                {x: 2320, y: 920, w: 2, movementType: "down"},
            ],
            enemies: [
                {x: 1520, y: 840, type: "bloober"},
                {x: 2800, y: 840, type: "bloober"},
                {x: 3600, y: 840, type: "bloober"},
            ]
        }
    },
    623: {
        worldNum: 6,
        levelNum: 2,
        bg: "#000000",
        theme: "overworld",
        width: 7520,
        cloudLevel: true,
        levelEndLine: 6640,
        defaultDestination: {worldID: 31, scrollOffset: 12640, spawnLocation: {x: 360, y: 200}},
        spawnLocation: {
            x: 320,
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 4, type: "cloudFloor", collision: true},
                {x: 400, y: 1000, w: 78, type: "cloudFloor", collision: true},
                
                {x: 4080, y: 520, h:2, type: "cloudFloor", collision: true},
                {x: 4880, y: 520, h:2, type: "cloudFloor", collision: true},
                {x: 5360, y: 440, w:2, type: "cloudFloor", collision: true},
            ],
            tiles: [
                {x: 2560, y: 600, type: "cloudFloor", collision: true},
                {x: 5680, y: 520, type: "cloudFloor", collision: true},
                {x: 5840, y: 520, type: "cloudFloor", collision: true},
                {x: 6000, y: 520, type: "cloudFloor", collision: true},
                {x: 6160, y: 520, type: "cloudFloor", collision: true},
                {x: 6320, y: 520, type: "cloudFloor", collision: true},
            ],
            vines: [
                {x: 320, y: 1000, needsGrow: false, h: 5}
            ],
            coins: [
                {x: 1200, y: 440},
                {x: 1280, y: 440},
                {x: 1360, y: 440},
                {x: 1440, y: 440},
                {x: 1520, y: 440},
                {x: 1600, y: 440},
                {x: 1680, y: 440},
                {x: 1760, y: 440},
                {x: 1840, y: 440},
                {x: 1920, y: 440},
                {x: 2000, y: 440},
                {x: 2080, y: 440},
                {x: 2160, y: 440},
                {x: 2240, y: 440},
                {x: 2320, y: 440},
                {x: 2400, y: 440},
                
                {x: 2720, y: 440},
                {x: 2800, y: 440},
                {x: 2880, y: 440},
                {x: 2960, y: 440},
                {x: 3040, y: 440},
                {x: 3120, y: 440},
                {x: 3200, y: 440},
                {x: 3280, y: 440},
                {x: 3360, y: 440},
                {x: 3440, y: 440},
                {x: 3520, y: 440},
                {x: 3600, y: 440},
                {x: 3680, y: 440},
                {x: 3760, y: 440},
                {x: 3840, y: 440},
                {x: 3920, y: 440},
                
                {x: 4240, y: 360},
                {x: 4320, y: 360},
                {x: 4400, y: 360},
                {x: 4480, y: 360},
                {x: 4560, y: 360},
                {x: 4640, y: 360},
                {x: 4720, y: 360},
                
                {x: 5680, y: 360},
                {x: 5760, y: 360},
                {x: 5840, y: 360},
                {x: 5920, y: 360},
                {x: 6000, y: 360},
                {x: 6080, y: 360},
                {x: 6160, y: 360},
                {x: 6240, y: 360},
                {x: 6320, y: 360},
                {x: 6400, y: 360},
                
                {x: 6800, y: 840},
                {x: 6880, y: 840},
                {x: 6960, y: 840},
            ],
            elevatorPlatforms: [
                {x: 1280, y: 760, movementType: "touchRight", type: "cloud"}
            ]
        }
    },
    624: {
        worldNum: 6,
        levelNum: 2,
        theme: "underworld",
        bg: "#000000",
        width: 1920,
        spawnLocation: {
            x: 440,
            y: 280
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 24},
                {x: 0, y: 120, w: 5, h: 11, type: "block", collision: true},
                {x: 1680, y: 120, w: 3, h: 11, type: "block", collision: true},
                
                {x: 560, y: 120, w: 12, type: "block", collision: true, individualCheck: true},
                {x: 560, y: 680, w: 8, type: "block", collision: true, individualCheck: true},
                {x: 560, y: 760, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 1120, y: 760, h: 2, type: "block", collision: true, individualCheck: true},
                
                {x: 1520, y: 120, h: 9, type: "pipeVerticalLeft", collision: true},
                {x: 1600, y: 120, h: 11, type: "pipeVerticalRight", collision: true},
            ],
            coins: [
                {x: 560, y: 600},
                {x: 640, y: 600},
                {x: 720, y: 600},
                {x: 800, y: 600},
                {x: 880, y: 600},
                {x: 960, y: 600},
                {x: 1040, y: 600},
                {x: 1120, y: 600},
                
                {x: 560, y: 920},
                {x: 640, y: 920},
                {x: 720, y: 920},
                {x: 800, y: 920},
                {x: 880, y: 920},
                {x: 960, y: 920},
                {x: 1040, y: 920},
                {x: 1120, y: 920},
                {x: 1200, y: 920},
                {x: 1280, y: 920},
            ],
            tiles: [
                {x: 1360, y: 680, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 1520, y: 840, type: "pipeConnectorTopLeft"},
                {x: 1520, y: 920, type: "pipeConnectorBottomLeft"},
            ],
            pipes: [
                {x: 1360, y: 840, opening: "left", destination: {worldID: 62, scrollOffset: 13920, spawnLocation: {x: 440, y: 1000}, transitionType: "pipeOutTop"}}
            ]
        }
    },
    63: {
        worldNum: 6,
        levelNum: 3,
        theme: "castle",
        music: "overworld",
        width: 14320,
        levelEndLine: 14000,
        hasBulletBills: true,
        timeLimit: 300,
        spawnLocation: {
            x: 160, 
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 16},
                {x: 12800, y: 1000, w: 19},
                
                {x: 1760, y: 760, h: 4, type: "treeStump"},
                {x: 2560, y: 760, w: 2, h: 4, type: "treeStump"},
                {x: 5280, y: 760, w: 3, h: 4, type: "treeStump"},
                {x: 8640, y: 760, w: 3, h: 4, type: "treeStump"},
                {x: 10880, y: 760, w: 2, h: 4, type: "treeStump"},
                
                {x: 4000, y: 920, w: 2, h: 2, type: "treeStump"},
                
                {x: 6880, y: 840, w: 3, h: 3, type: "treeStump"},

                {x: 7280, y: 680, h: 5, type: "treeStump"},
                
                {x: 6880, y: 280, h: 6, type: "treeStump"},
                
                {x: 10640, y: 440, h: 7, type: "treeStump"},
                {x: 12560, y: 440, h: 8, type: "treeStump"},
            ],
            tiles: [
                {x: 4400, y: 200, type: "questionBlock", item: {type: "magicMushroom"}}
            ],
            clouds: [
                {x: 240, y: 200, amount: 2},
                {x: 4080, y: 200, amount: 2},
                {x: 7920, y: 200, amount: 2},
                {x: 11760, y: 200, amount: 2},
                
                {x: 1440, y: 120, amount: 2},
                {x: 5280, y: 120, amount: 2},
                {x: 9120, y: 120, amount: 2},
                
                {x: 720, y: 520},
                {x: 2800, y: 520},
                {x: 4560, y: 520},
                {x: 6640, y: 520},
                {x: 8400, y: 520},
                {x: 10480, y: 520},
                {x: 12240, y: 520},
                
                {x: 2240, y: 840},
                {x: 3680, y: 840},
                {x: 6080, y: 840},
                {x: 7520, y: 840},
                {x: 9920, y: 840},
                {x: 11360, y: 840},
                
                {x: 3040, y: 440},
                {x: 6880, y: 440},
                {x: 10720, y: 440},
            ],
            coins: [
                {x: 2240, y: 120},
                {x: 2320, y: 120},

                {x: 3440, y: 280},
                {x: 3520, y: 280},
                {x: 3600, y: 280},
                {x: 3680, y: 280},
                {x: 3760, y: 280},
                {x: 3840, y: 280},
                {x: 3920, y: 280},
                
                {x: 5840, y: 360},
                {x: 5920, y: 360},
                
                {x: 6800, y: 120},
                {x: 6880, y: 120},
                {x: 6960, y: 120},
                
                {x: 8000, y: 600},
                {x: 8080, y: 600},
                {x: 8160, y: 600},
                {x: 8240, y: 600},
                
                {x: 10240, y: 360},
                {x: 10320, y: 360},
                
                {x: 11600, y: 520},
                {x: 11680, y: 520},
                
                {x: 12320, y: 200},
                {x: 12400, y: 200},
            ],
            platforms: [
                {x: 1440, y: 1000, w: 3},
                {x: 1920, y: 1000, w: 3},
                {x: 2960, y: 1000, w: 3},
                {x: 3440, y: 1000, w: 3},
                {x: 7440, y: 1000, w: 3},
                {x: 8240, y: 1000, w: 3},
                {x: 9840, y: 1000, w: 3},
                
                {x: 1680, y: 680, w: 3},
                
                {x: 2480, y: 680, w: 4},
                {x: 10800, y: 680, w: 4},
                
                {x: 3920, y: 840, w: 4},
                
                {x: 5200, y: 680, w: 5},
                {x: 8560, y: 680, w: 5},
                
                {x: 6800, y: 760, w: 5},
                
                {x: 6800, y: 200, w: 3},
                
                {x: 7200, y: 600, w: 3},
                
                {x: 7760, y: 1000, w: 4},
                {x: 10560, y: 1000, w: 4},

                {x: 9040, y: 1000, w: 5},
                
                {x: 10560, y: 360, w: 3},
                {x: 12480, y: 360, w: 3},
            ],
            elevatorPlatforms: [
                {x: 2240, y: 1000, w: 2, movementType: "upDown"},
                {x: 4800, y: 920, w: 2, movementType: "upDown"},
                
                {x: 3440, y: 360, w: 2, movementType: "leftRight"},
                {x: 3840, y: 520, w: 2, movementType: "leftRight"},
                {x: 4400, y: 440, w: 2, movementType: "leftRight"},
                {x: 9680, y: 360, w: 2, movementType: "leftRight"},
                
                {x: 11280, y: 520, w: 2, movementType: "falling"},
                {x: 11600, y: 440, w: 2, movementType: "falling"},
                {x: 11920, y: 600, w: 2, movementType: "falling"},
                {x: 12240, y: 520, w: 2, movementType: "falling"},
            ],
            castles: [
                {x: 0, y: 600},
                {x: 13760, y: 120},
                {x: 13600, y: 520, name: "rectangle5doors"},
            ],
            flags: [
                {x: 13360, y: 120, destination: {worldID: 64}}
            ],
            jumpingBoards: [
                {x: 3040, y: 840},
                {x: 9280, y: 840},
            ],
            scalePlatforms: [
                {x: 5640, y: 120, w: 6, ropeStart: 5680, ropeW: 5, platformLeft: {x: 5640, y: 360, w: 2}, platformRight: {x: 5969, y: 680, w: 2}},
                {x: 6280, y: 120, w: 6, ropeStart: 6320, ropeW: 4, platformLeft: {x: 6280, y: 360, w: 2}, platformRight: {x: 6520, y: 680, w: 2}},
                {x: 10120, y: 120, w: 6, ropeStart: 6320, ropeW: 4, platformLeft: {x: 10120, y: 440, w: 2}, platformRight: {x: 10360, y: 680, w: 2}},
            ]
        }
    },
    64: {
        worldNum: 6,
        levelNum: 4,
        theme: "castle",
        timeLimit: 300,
        spawnLocation: {
            x: 80,
            y: 520
        },
        bg: "#000000",
        width: 12800,
        levelEndLine: 12240,
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
                
                {x: 10240, y: 760, w: 13, type: "bowserBridge", collision: true},
                
                {x: 1040, y: 920, w: 2, type: "waterTop"},
                {x: 1040, y: 1000, w: 2, type: "water"},
                {x: 2080, y: 1000, w: 3, type: "waterTop"},
                {x: 2560, y: 1000, w: 3, type: "waterTop"},
                {x: 10240, y: 1000, w: 13, type: "waterTop"},
            ],
            tiles: [
                {x: 2400, y: 440, type: "questionBlock", item: {type: "magicMushroom"}},
                {x: 6400, y: 200, type: "solid", collision: true},
                {x: 7040, y: 200, type: "solid", collision: true},

                {x: 8480, y: 680, type: "secret"},
                {x: 8720, y: 680, type: "secret"},
                {x: 8960, y: 680, type: "secret"},
                {x: 8560, y: 360, type: "secret"},
                {x: 8800, y: 360, type: "secret"},
                {x: 9040, y: 360, type: "secret"},

                {x: 11200, y: 680, type: "bowserBridgeRope"},

                {x: 12240, y: 840, type: "mushroomRetainerTop"},
                {x: 12240, y: 920, type: "mushroomRetainerBottom"},
            ],
            fireBars: [
                {x: 1840, y: 440, counterClockWise: true},
                {x: 2400, y: 760, counterClockWise: true},
                {x: 2960, y: 440, counterClockWise: true},
                {x: 3920, y: 440, counterClockWise: true},
                {x: 4840, y: 440, counterClockWise: true},
                {x: 5360, y: 440, counterClockWise: true},

                {x: 6080, y: 680, counterClockWise: true},
                {x: 6400, y: 280},
                {x: 6720, y: 680, counterClockWise: true},
                {x: 7040, y: 280},
                {x: 7360, y: 680, counterClockWise: true},
            ],
            elevatorPlatforms: [
                {x: 11040, y: 440, w: 2, movementType: "leftRight"}
            ],
            axes: [
                {x: 11280, y: 600, destination: {worldID: 71}}
            ],
            bowsers: [
                {x: 10800, y: 600}
            ],
            enemies: [
                {x: 2160, y: 1000, type: "podoboo"},
                {x: 2640, y: 1000, type: "podoboo"},
                {x: 10480, y: 1000, type: "podoboo"},
            ]
        }
    },
    71: {
        worldNum: 7,
        levelNum: 1,
        theme: "overworld",
        width: 15360,
        levelEndLine: 14880,
        spawnLocation: {
            x: 160,
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 73},
                {x: 6000, y: 1000, w: 77},
                {x: 12240, y: 1000, w: 39},
                
                {x: 2240, y: 360, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 4960, y: 680, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 6560, y: 360, w: 7, type: "blockShiny", collision: true, individualCheck: true},
                {x: 6560, y: 680, w: 7, type: "blockShiny", collision: true, individualCheck: true},
                {x: 10720, y: 360, w: 5, type: "blockShiny", collision: true, individualCheck: true},
                {x: 10720, y: 680, w: 5, type: "blockShiny", collision: true, individualCheck: true},
                
                {x: 11920, y: 600, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 12240, y: 440, w: 2, type: "blockShiny", collision: true, individualCheck: true},

                {x: 11280, y: 760, h: 3, type: "stair", collision: true},
                {x: 13600, y: 360, h: 8, type: "stair", collision: true},
                
                {x: 1120, y: 920, w: 4, type: "fence"},
                {x: 4960, y: 920, w: 3, type: "fence"},
                {x: 8880, y: 920, w: 3, type: "fence"},
                {x: 12720, y: 920, w: 3, type: "fence"},
                {x: 3040, y: 920, w: 2, type: "fence"},
                {x: 6880, y: 920, w: 2, type: "fence"},
                {x: 10720, y: 920, w: 2, type: "fence"},
            ],
            tiles: [
                {x: 2160, y: 360, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},

                {x: 3120, y: 680, type: "questionBlock"},
                {x: 3200, y: 680, type: "questionBlock"},
                {x: 3280, y: 680, type: "questionBlock"},
                {x: 3360, y: 680, type: "questionBlock"},
                
                {x: 3680, y: 920, type: "cannonStand", collision: true},
                {x: 5120, y: 680, type: "stair", collision: true},
                {x: 5200, y: 680, type: "multiCoinBlock"},
                {x: 5280, y: 680, type: "blockShiny", collision: true},
                
                {x: 7440, y: 360, type: "secret", item: {type: "oneUp"}},
                
                {x: 12080, y: 120, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},
                
                {x: 3280, y: 920, type: "fence"},
                {x: 7120, y: 920, type: "fence"},
                {x: 10960, y: 920, type: "fence"},
                {x: 14560, y: 920, type: "fence"},
            ],
            pipes: [
                {x: 6080, y: 760, size: 3, theme: "grey", piranha: true},
                {x: 7440, y: 760, size: 3, theme: "grey", piranha: true, destination: {worldID: 711}},
                {x: 8720, y: 760, size: 3, theme: "grey", piranha: true},
                {x: 9200, y: 840, size: 2, theme: "grey", piranha: true},
                {x: 10240, y: 840, size: 2, theme: "grey", piranha: true},
            ],
            jumpingBoards: [
                {x: 12080, y: 840},
            ],
            cannons: [
                {x: 1520, y: 840},
                {x: 2880, y: 840},
                {x: 5440, y: 840},
                {x: 8320, y: 840},
                {x: 9760, y: 840},
                
                {x: 2240, y: 760},
                {x: 3680, y: 760},
                {x: 4480, y: 760},
                {x: 11680, y: 760},
                
                {x: 2240, y: 920},
                {x: 4480, y: 920},
                {x: 11680, y: 920},
                
                {x: 5120, y: 520},
            ],
            castles: [
                {x: 0, y: 120},
                {x: -160, y: 520, name: "rectangles5doors"},
                {x: 14640, y: 600},
            ],
            flags: [
                {x: 14320, y: 120, theme: "grey", destination: {worldID: 72}}
            ],
            steps: [
                {x: 12240, y: 520, w: 6},
                {x: 12960, y: 360, w: 8},
            ],
            enemies: [
                {x: 2080, y: 840, type: "koopaParatroopa"},
                {x: 3520, y: 840, type: "koopaParatroopa"},
                {x: 4240, y: 840, type: "koopaParatroopa"},
                {x: 5200, y: 840, type: "koopaParatroopa"},
                
                {x: 6720, y: 840, type: "hammerBro"},
                {x: 6880, y: 520, type: "hammerBro"},
                {x: 10800, y: 840, type: "hammerBro"},
                {x: 10960, y: 520, type: "hammerBro"},
                
                {x: 9120, y: 840, type: "koopaTroopa"},
                
                {x: 13520, y: 200, type: "buzzyBeetle"},
            ],
            clouds: [
                {x: 1440, y: 200},
                {x: 5280, y: 200},
                {x: 9120, y: 200},
                {x: 12960, y: 200},
                
                {x: 2160, y: 120},
                {x: 3600, y: 120},
                {x: 6000, y: 120},
                {x: 7440, y: 120},
                {x: 9840, y: 120},
                {x: 11280, y: 120},
                {x: 13680, y: 120},
                {x: 15120, y: 120},
                
                {x: 2400, y: 200, amount: 2},
                {x: 3840, y: 200, amount: 2},
                {x: 6240, y: 200, amount: 2},
                {x: 7680, y: 200, amount: 2},
                {x: 10080, y: 200, amount: 2},
                {x: 11520, y: 200, amount: 2},
                {x: 13920, y: 200, amount: 2},
            ],
            trees: [
                {x: 880, y: 840, theme: "grey"},
                {x: 1840, y: 840, theme: "grey"},
                {x: 1920, y: 840, theme: "grey"},
                {x: 3200, y: 840, theme: "grey"},
                {x: 4720, y: 840, theme: "grey"},
                {x: 5680, y: 840, theme: "grey"},
                {x: 5760, y: 840, theme: "grey"},
                {x: 7040, y: 840, theme: "grey"},
                {x: 8560, y: 840, theme: "grey"},
                {x: 9520, y: 840, theme: "grey"},
                {x: 9600, y: 840, theme: "grey"},
                {x: 10880, y: 840, theme: "grey"},
                
                {x: 1040, y: 760, theme: "grey", big: true},
                {x: 1680, y: 760, theme: "grey", big: true},
                {x: 3440, y: 760, theme: "grey", big: true},
                {x: 4880, y: 760, theme: "grey", big: true},
                {x: 5520, y: 760, theme: "grey", big: true},
                {x: 7280, y: 760, theme: "grey", big: true},
                {x: 9360, y: 760, theme: "grey", big: true},
                {x: 11120, y: 760, theme: "grey", big: true},
            ]
        }
    },
    711: {
        worldNum: 7,
        levelNum: 1,
        theme: "underworld",
        music: "underworld",
        spawnLocation: {
            x: 440,
            y: 280
        },
        bg: "#000000",
        width: 1920,
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
                {x: 1360, y: 840, opening: "left", destination: {worldID: 71, scrollOffset: 8880, spawnLocation: {x: 360, y: 1000}, transitionType: "pipeOutTop"}},
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
    72: {
        worldNum: 7,
        levelNum: 2,
        theme: "water",
        width: 15360,
        gravity: .5,
        waterLevel: true,
        spawnLocation: {
            x: 200,
            y: 320
        },
        music: "water",
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 66, type: "rock", collision: true},
                {x: 5680, y: 1000, w: 60, type: "rock", collision: true},
                {x: 11200, y: 1000, w: 17, type: "rock", collision: true},
                {x: 13120, y: 1000, w: 28, type: "rock", collision: true},

                {x: 0, y: 120, w: 78, type: "waterTop", collision: true},
                {x: 6400, y: 120, w: 51, type: "waterTop", collision: true},
                {x: 10560, y: 120, w: 56, type: "waterTop", collision: true},
                
                {x: 1440, y: 680, w: 3, type: "rock", collision: true},
                {x: 3360, y: 680, w: 2, type: "rock", collision: true},
                {x: 5120, y: 760, h: 3, type: "rock", collision: true},
                {x: 5200, y: 600, h: 5, type: "rock", collision: true},
                {x: 5680, y: 600, h: 5, type: "rock", collision: true},
                {x: 5760, y: 760, h: 3, type: "rock", collision: true},
                {x: 6240, y: 120, w: 2, h: 3, type: "rock", collision: true},
                {x: 6240, y: 760, w: 2, h: 3, type: "rock", collision: true},
                {x: 6560, y: 360, w: 3, type: "rock", collision: true},
                {x: 8160, y: 680, w: 2, type: "rock", collision: true},
                {x: 9200, y: 600, w: 2, type: "rock", collision: true},
                {x: 10320, y: 680, h: 4, type: "rock", collision: true},
                {x: 10400, y: 840, h: 2, type: "rock", collision: true},
                {x: 11200, y: 840, h: 2, type: "rock", collision: true},
                {x: 11280, y: 680, h: 4, type: "rock", collision: true},

                {x: 10480, y: 120, h: 2, type: "rock", collision: true},
                {x: 10480, y: 280, w: 9, type: "rock", collision: true},

                {x: 12480, y: 360, h: 8, type: "rock", collision: true},
                {x: 12560, y: 360, w: 2, type: "rock", collision: true},
                {x: 12960, y: 360, w: 2, type: "rock", collision: true},
                {x: 13120, y: 360, h: 8, type: "rock", collision: true},

                {x: 13760, y: 360, w: 5, type: "rock", collision: true},
                {x: 13760, y: 680, w: 5, type: "rock", collision: true},
                {x: 14400, y: 360, w: 4, type: "rock", collision: true},
                {x: 14400, y: 680, w: 4, type: "rock", collision: true},
                
                {x: 15040, y: 120, w: 4, h: 4, type: "rock", collision: true},
                {x: 15200, y: 440, w: 2, h: 3, type: "rock", collision: true},
                {x: 15040, y: 680, w: 4, h: 4, type: "rock", collision: true},

                {x: 880, y: 760, h: 3, type: "coral", collision: true},
                {x: 2640, y: 600, h: 5, type: "coral", collision: true},
                {x: 3360, y: 520, h: 2, type: "coral", collision: true},
                {x: 4000, y: 680, h: 4, type: "coral", collision: true},
                {x: 6640, y: 200, h: 2, type: "coral", collision: true},
                {x: 7120, y: 760, h: 3, type: "coral", collision: true},
                {x: 8160, y: 360, h: 4, type: "coral", collision: true},
                {x: 9600, y: 680, h: 4, type: "coral", collision: true},
                {x: 11760, y: 840, h: 2, type: "coral", collision: true},
                {x: 11920, y: 760, h: 3, type: "coral", collision: true},
                {x: 13840, y: 200, h: 2, type: "coral", collision: true},
            ],
            steps: [
                {x: 14800, y: 760, w: 3, type: "rock"},
            ],
            pipes: [
                {x: 15120, y: 520, size: 1, theme: "overworld", opening: "left", destination: {worldID: 722}}
            ],
            coins: [
                {x: 1120, y: 920},
                {x: 1200, y: 920},
                {x: 2160, y: 360},
                {x: 2240, y: 360},
                {x: 2320, y: 360},
                {x: 2880, y: 920},
                {x: 2960, y: 920},
                {x: 3040, y: 920},
                {x: 5360, y: 760},
                {x: 5440, y: 760},
                {x: 5520, y: 760},
                {x: 8080, y: 840},
                {x: 8160, y: 840},
                {x: 8240, y: 840},
                {x: 9040, y: 440},
                {x: 9120, y: 440},
                {x: 9200, y: 440},
                {x: 10640, y: 840},
                {x: 10720, y: 920},
                {x: 10800, y: 920},
                {x: 10880, y: 920},
                {x: 10960, y: 840},
                {x: 12720, y: 680},
                {x: 12800, y: 680},
                {x: 12880, y: 680},
                {x: 12720, y: 920},
                {x: 12800, y: 920},
                {x: 12880, y: 920},
            ],
            enemies: [
                {x: 1760, y: 840, type: "bloober"},
                {x: 2000, y: 520, type: "bloober"},
                {x: 3680, y: 680, type: "bloober"},
                {x: 4160, y: 520, type: "bloober"},
                {x: 4400, y: 760, type: "bloober"},
                {x: 6160, y: 440, type: "bloober"},
                {x: 6640, y: 600, type: "bloober"},
                {x: 7200, y: 840, type: "bloober"},
                {x: 7520, y: 200, type: "bloober"},
                {x: 8400, y: 840, type: "bloober"},
                {x: 12000, y: 600, type: "bloober"},
                {x: 13840, y: 840, type: "bloober"},
                {x: 14320, y: 840, type: "bloober"},
            ],
        }
    },
    721: {
        worldNum: 7,
        levelNum: 2,
        theme: "overworld",
        spawnLocation: {
            x: 480,
            y: 1000
        },
        transitionType: "cutscene721",
        width: 1920,
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
    722: {
        worldNum: 7,
        levelNum: 2,
        spawnLocation: {
            x: 280,
            y: 1000
        },
        transitionType: "pipeOutTop",
        width: 2560,
        worldElements: {
            clouds: [
                {x: 320, y: 120, amount: 2},
                {x: 1920, y: 200}
            ],
            rectangles: [
                {x: 0, y: 1000, w: 32},
                {x: 1040, y: 360, h: 8, type: "stair", collision: true}
            ],
            steps: [
                {x: 400, y: 360, w: 8}
            ],
            hills: [
                {x: 1280, y: 760, h: 3}
            ],
            flags: [
                {x: 1760, y: 120, destination: {worldID: 73}}
            ],
            castles: [
                {x: 2080, y: 600}
            ],
            pipes: [
                {x: 240, y: 840, piranha: true}
            ],
            bushes: [
                {x: 2320, y: 920}
            ]
        }
    },
    73: {
        worldNum: 7,
        levelNum: 3,
        width: 18960,
        timeLimit: 300,
        levelEndLine: 18640,
        hasCheepCheeps: true,
        cheepCheepSpawnLine: 1200,
        spawnLocation: {
            x: 160, 
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 7},
                {x: 16560, y: 1000, w: 30},

                {x: 1040, y: 760, w: 2, h: 3, type: "stair", collision: true},
                {x: 2480, y: 760, h: 4, type: "stair", collision: true},
                {x: 3760, y: 760, h: 4, type: "stair", collision: true},
                {x: 5040, y: 760, h: 4, type: "stair", collision: true},
                {x: 5440, y: 760, h: 4, type: "stair", collision: true},
                {x: 6320, y: 760, h: 4, type: "stair", collision: true},
                {x: 6720, y: 760, h: 4, type: "stair", collision: true},
                {x: 7600, y: 760, h: 4, type: "stair", collision: true},
                {x: 7920, y: 680, h: 5, type: "stair", collision: true},
                {x: 8400, y: 680, h: 5, type: "stair", collision: true},
                {x: 10160, y: 760, h: 4, type: "stair", collision: true},
                {x: 11440, y: 760, h: 4, type: "stair", collision: true},
                {x: 11680, y: 920, h: 2, type: "stair", collision: true},
                {x: 12400, y: 920, h: 2, type: "stair", collision: true},
                {x: 12720, y: 760, h: 4, type: "stair", collision: true},
                {x: 13440, y: 760, h: 4, type: "stair", collision: true},
                {x: 14640, y: 760, h: 4, type: "stair", collision: true},
                {x: 15440, y: 760, h: 3, type: "stair", collision: true},
                {x: 17280, y: 360, h: 8, type: "stair", collision: true},

                {x: 1200, y: 680, w: 16, type: "bridgeFence"},
                {x: 1200, y: 760, w: 16, type: "bridge", collision: true},
                {x: 2560, y: 680, w: 15, type: "bridgeFence"},
                {x: 2560, y: 760, w: 15, type: "bridge", collision: true},
                {x: 3840, y: 680, w: 15, type: "bridgeFence"},
                {x: 3840, y: 760, w: 15, type: "bridge", collision: true},
                {x: 5520, y: 680, w: 10, type: "bridgeFence"},
                {x: 5520, y: 760, w: 10, type: "bridge", collision: true},
                {x: 6800, y: 680, w: 10, type: "bridgeFence"},
                {x: 6800, y: 760, w: 10, type: "bridge", collision: true},
                {x: 8000, y: 600, w: 5, type: "bridgeFence"},
                {x: 8000, y: 680, w: 5, type: "bridge", collision: true},
                {x: 9760, y: 680, w: 3, type: "bridgeFence"},
                {x: 9760, y: 760, w: 3, type: "bridge", collision: true},
                {x: 10240, y: 680, w: 15, type: "bridgeFence"},
                {x: 10240, y: 760, w: 15, type: "bridge", collision: true},
                {x: 11760, y: 840, w: 8, type: "bridgeFence"},
                {x: 11760, y: 920, w: 8, type: "bridge", collision: true},
                {x: 12800, y: 680, w: 8, type: "bridgeFence"},
                {x: 12800, y: 760, w: 8, type: "bridge", collision: true},
                {x: 13680, y: 680, w: 2, type: "bridgeFence"},
                {x: 13680, y: 760, w: 2, type: "bridge", collision: true},
                {x: 14000, y: 680, w: 2, type: "bridgeFence"},
                {x: 14000, y: 760, w: 2, type: "bridge", collision: true},
                {x: 14320, y: 680, w: 2, type: "bridgeFence"},
                {x: 14320, y: 760, w: 2, type: "bridge", collision: true},
                {x: 14720, y: 680, w: 9, type: "bridgeFence"},
                {x: 14720, y: 760, w: 9, type: "bridge", collision: true},
            ],
            castles: [
                {x: 0, y: 600},
                {x: 18400, y: 120},
                {x: 18240, y: 520, name: "rectangle5doors"},
            ],
            steps: [
                {x: 800, y: 760, w: 3},
                {x: 15520, y: 760, w: 3, reversed: true},
                {x: 16640, y: 360, w: 8},
            ],
            platforms: [
                {x: 640, y: 1000, w: 8},
                {x: 8960, y: 1000, w: 8},
                {x: 15360, y: 1000, w: 13},
            ],
            flags: [
                {x: 18000, y: 120, destination: {worldID: 74}},
            ],
            clouds: [
                {x: 240, y: 200, amount: 2},
                {x: 4080, y: 200, amount: 2},
                {x: 7920, y: 200, amount: 2},
                {x: 11760, y: 200, amount: 2},
                {x: 15600, y: 200, amount: 2},

                {x: 1440, y: 120, amount: 2},
                {x: 5280, y: 120, amount: 2},
                {x: 9120, y: 120, amount: 2},
                {x: 12960, y: 120, amount: 2},
                {x: 16800, y: 120, amount: 2},
                
                {x: 720, y: 520},
                {x: 2800, y: 520},
                {x: 5460, y: 520},
                {x: 6640, y: 520},
                {x: 8400, y: 520},
                {x: 10480, y: 520},
                {x: 12240, y: 520},
                {x: 14320, y: 520},
                {x: 16080, y: 520},
                {x: 18160, y: 520},
                
                {x: 2240, y: 840},
                {x: 3680, y: 840},
                {x: 6080, y: 840},
                {x: 7520, y: 840},
                {x: 9920, y: 840},
                {x: 11360, y: 840},
                {x: 13760, y: 840},
                {x: 15200, y: 840},
                {x: 17600, y: 840},
                
                {x: 3040, y: 440},
                {x: 6880, y: 440},
                {x: 10720, y: 440},
                {x: 14560, y: 440},
            ],
            coins: [
                {x: 2880, y: 360},
                {x: 2960, y: 360},
                {x: 3040, y: 360},
                {x: 3120, y: 360},

                {x: 4400, y: 360},
                {x: 4560, y: 360},
                {x: 4720, y: 360},
                {x: 4480, y: 440},
                {x: 4640, y: 440},
                
                {x: 5760, y: 360},
                {x: 5840, y: 280},
                {x: 5920, y: 280},
                {x: 6000, y: 360},
                
                {x: 7760, y: 360},
                {x: 7840, y: 360},
                {x: 7920, y: 360},
                
                {x: 8640, y: 360},
                {x: 8720, y: 360},
                {x: 8800, y: 360},
                
                {x: 10640, y: 360},
                {x: 10720, y: 360},
                {x: 10800, y: 360},
                {x: 10880, y: 360},
                {x: 10960, y: 360},
                {x: 11040, y: 360},
                
                {x: 11920, y: 600},
                {x: 12000, y: 600},
                {x: 12080, y: 600},
                {x: 12160, y: 600},
                
                {x: 13840, y: 440},
                {x: 13920, y: 440},
                {x: 14000, y: 440},
                {x: 14080, y: 440},
                {x: 14160, y: 440},
                {x: 14240, y: 440},
            ],
            tiles: [
                {x: 8160, y: 360, type: "questionBlock", item: {type: "magicMushroom"}}
            ],
            enemies: [
                {x: 3120, y: 600, type: "koopaTroopa"},
                {x: 6320, y: 600, theme: "castle", type: "koopaTroopa"},
                {x: 7600, y: 600, theme: "castle", type: "koopaTroopa"},
                {x: 9520, y: 840, theme: "castle", type: "koopaTroopa"},
                
                {x: 4160, y: 600, type: "koopaParatroopa"},
                {x: 11200, y: 440, type: "koopaParatroopa"},
                {x: 12480, y: 600, type: "koopaParatroopa"},
            ]
        }
    },
    // TODO: TeleportTriggers need checkpoints
    74: {
        worldNum: 7,
        levelNum: 4,
        theme: "castle",
        bg: "#000000",
        width: 17920,
        levelEndLine: 17360,
        spawnLocation: {
            x: 80,
            y: 520
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 120, w: 224, type: "solid", collision: true},
                {x: 0, y: 200, w: 16, h: 2, type: "solid", collision: true},
                {x: 0, y: 760, w: 16, h: 4, type: "solid", collision: true},
                {x: 0, y: 520, w: 2, h: 2, type: "solid", collision: true},
                {x: 2160, y: 760, w: 5, h: 4, type: "solid", collision: true},
                {x: 2240, y: 200, w: 4, h: 2, type: "solid", collision: true},
                {x: 2560, y: 1000, w: 68, h: 1, type: "solid", collision: true},
                {x: 3120, y: 440, w: 11, h: 4, type: "solid", collision: true},
                {x: 4320, y: 760, w: 13, h: 1, type: "solid", collision: true},
                {x: 4400, y: 440, w: 11, h: 1, type: "solid", collision: true},
                {x: 5600, y: 440, w: 18, h: 4, type: "solid", collision: true},
                {x: 7040, y: 440, h: 3, type: "solid", collision: true},
                {x: 7120, y: 440, h: 2, type: "solid", collision: true},
                {x: 7200, y: 440, w: 2, type: "solid", collision: true},
                {x: 7440, y: 760, w: 3, h: 3, type: "solid", collision: true},
                {x: 7920, y: 440, w: 2, type: "solid", collision: true},
                {x: 8160, y: 440, w: 3, type: "solid", collision: true},
                {x: 8480, y: 440, w: 4, type: "solid", collision: true},
                {x: 8560, y: 1000, w: 85, type: "solid", collision: true},
                {x: 8800, y: 440, w: 6, h: 4, type: "solid", collision: true},
                {x: 9440, y: 440, w: 3, type: "solid", collision: true},
                {x: 9840, y: 440, w: 7, type: "solid", collision: true},
                {x: 10560, y: 440, w: 3, type: "solid", collision: true},
                {x: 9520, y: 760, w: 3, type: "solid", collision: true},
                {x: 9920, y: 760, w: 7, type: "solid", collision: true},
                {x: 10640, y: 760, w: 3, type: "solid", collision: true},
                {x: 10960, y: 440, h: 4, type: "solid", collision: true},
                {x: 11040, y: 440, w: 15, type: "solid", collision: true},
                {x: 11360, y: 760, w: 18, h: 3, type: "solid", collision: true},
                {x: 13040, y: 760, w: 3, h: 3, type: "solid", collision: true},
                {x: 13440, y: 760, w: 8, h: 3, type: "solid", collision: true},
                {x: 14240, y: 760, w: 2, h: 3, type: "solid", collision: true},
                {x: 14560, y: 760, w: 2, h: 3, type: "solid", collision: true},
                {x: 14880, y: 760, w: 6, h: 3, type: "solid", collision: true},
                {x: 16400, y: 680, w: 3, h: 4, type: "solid", collision: true},
                {x: 16480, y: 200, w: 2, h: 3, type: "solid", collision: true},
                
                {x: 1280, y: 1000, w: 11, h: 1, type: "waterTop"},
                {x: 8000, y: 1000, w: 3, h: 1, type: "waterTop"},
                {x: 8320, y: 1000, w: 3, h: 1, type: "waterTop"},
                {x: 15360, y: 1000, w: 13, h: 1, type: "waterTop"},
                
                {x: 15360, y: 760, w: 13, h: 1, type: "bowserBridge", collision: true},
            ],
            steps: [
                {x: 160, y: 520, w: 3, type: "solid", reversed: true},
                {x: 2800, y: 440, w: 4, type: "solid"},
                {x: 11120, y: 760, w: 3, type: "solid"},
            ],
            elevatorPlatforms: [
                {x: 1440, y: 520, w: 2, movementType: "falling"},
                {x: 1760, y: 600, w: 2, movementType: "falling"},
            ],
            enemies: [
                {x: 1600, y: 1000, type: "podoboo"},
                {x: 15680, y: 1000, type: "podoboo"},
            ],
            fireBars: [
                {x: 8240, y: 520, counterClockWise: true}
            ],
            tiles: [
                {x: 2720, y: 680, type: "solid", collision: true},
                {x: 8240, y: 1000, type: "solid", collision: true},

                {x: 16360, y: 680, type: "bowserBridgeRope"},
                
                {x: 17360, y: 840, type: "mushroomRetainerTop"},
                {x: 17360, y: 920, type: "mushroomRetainerBottom"},
            ],
            bowsers: [
                {x: 15920, y: 600}
            ],
            axes: [
                {x: 16400, y: 600, destination: {worldID: 81}}
            ],
            teleportTriggers: [
                {x: 7040, y: 760, w: 3, h: 3, destination: {worldID: 74, scrollOffset: 2000, spawnLocation: {x: 160, y: 760}}},
                {x: 12000, y: 520, w: 3, h: 3, destination: {worldID: 74, scrollOffset: 7440, spawnLocation: {x: 160, y: 760}}},
            ],
        }
    },
    81: {
        worldNum: 8,
        levelNum: 1,
        timeLimit: 300,
        width: 31120,
        levelEndLine: 30640,
        spawnLocation: {
            x: 160,
            y: 1000
        },
        worldElements: {
            castles: [
                {x: 0, y: 120},
                {x: 30400, y: 600},
                {x: -160, y: 520, name: "rectangle5doors"},
            ],
            flags: [
                {x: 30080, y: 120, destination: {worldID: 82}}
            ],
            rectangles: [
                {x: 0, y: 1000, w: 46},
                {x: 3920, y: 1000, w: 2},
                {x: 4160, y: 1000, w: 2},
                {x: 4400, y: 1000, w: 2},
                {x: 4640, y: 1000, w: 111},
                {x: 13760, y: 1000, w: 2},
                {x: 14160, y: 1000, w: 2},
                {x: 14400, y: 1000, w: 17},
                {x: 16160, y: 1000, w: 19},
                {x: 18160, y: 1000, w: 10},
                {x: 19040, y: 1000, w: 2},
                {x: 19360, y: 1000, w: 2},
                {x: 19680, y: 1000, w: 44},
                {x: 23440, y: 1000, w: 2},
                {x: 23840, y: 1000, w: 16},
                {x: 25920, y: 1000, w: 35},
                {x: 29280, y: 1000, w: 23},
                
                {x: 1120, y: 920, w: 4, type: "fence"},
                {x: 4960, y: 920, w: 4, type: "fence"},
                {x: 8800, y: 920, w: 4, type: "fence"},
                {x: 28000, y: 920, w: 4, type: "fence"},
                
                {x: 3040, y: 920, w: 2, type: "fence"},
                {x: 6880, y: 920, w: 2, type: "fence"},
                {x: 10720, y: 920, w: 2, type: "fence"},
                {x: 14560, y: 920, w: 2, type: "fence"},
                {x: 18400, y: 920, w: 2, type: "fence"},
                {x: 24320, y: 920, w: 2, type: "fence"},
                {x: 26080, y: 920, w: 2, type: "fence"},
                {x: 29920, y: 920, w: 2, type: "fence"},

                {x: 12240, y: 680, w: 1, h: 4, type: "stair", collision: true},
                {x: 13040, y: 680, w: 1, h: 4, type: "stair", collision: true},
                
                {x: 12320, y: 360, w: 4, h: 1, type: "blockShiny", collision: true, individualCheck: true},
                {x: 12720, y: 360, w: 3, h: 1, type: "blockShiny", collision: true, individualCheck: true},
                {x: 14720, y: 600, w: 2, h: 1, type: "blockShiny", collision: true, individualCheck: true},
                {x: 14960, y: 600, w: 5, h: 1, type: "blockShiny", collision: true, individualCheck: true},
                
                {x: 16800, y: 840, w: 1, h: 2, type: "stair", collision: true},
                {x: 24240, y: 840, w: 1, h: 2, type: "stair", collision: true},
                {x: 24560, y: 840, w: 1, h: 2, type: "stair", collision: true},
                {x: 28800, y: 840, w: 1, h: 2, type: "stair", collision: true},
                {x: 28960, y: 680, w: 1, h: 4, type: "stair", collision: true},
                {x: 29120, y: 520, w: 1, h: 6, type: "stair", collision: true},
                {x: 29280, y: 360, w: 2, h: 8, type: "stair", collision: true},
            ],
            tiles: [
                {x: 3760, y: 1000, type: "floor", collision: true},
                {x: 13600, y: 1000, type: "floor", collision: true},
                {x: 14000, y: 1000, type: "floor", collision: true},
                {x: 15840, y: 1000, type: "floor", collision: true},
                {x: 16000, y: 1000, type: "floor", collision: true},
                {x: 25520, y: 1000, type: "floor", collision: true},
                {x: 28800, y: 1000, type: "floor", collision: true},
                {x: 28960, y: 1000, type: "floor", collision: true},
                {x: 29120, y: 1000, type: "floor", collision: true},
                
                {x: 3280, y: 920, type: "fence"},
                {x: 7120, y: 920, type: "fence"},
                {x: 10960, y: 920, type: "fence"},
                {x: 14800, y: 920, type: "fence"},
                {x: 18640, y: 920, type: "fence"},
                {x: 22480, y: 920, type: "fence"},
                {x: 24160, y: 920, type: "fence"},
                {x: 26320, y: 920, type: "fence"},
                {x: 30160, y: 920, type: "fence"},
                
                {x: 6400, y: 600, type: "secret", item: {type: "oneUp"}},
                {x: 12640, y: 360, type: "multiCoinBlock"},
                {x: 12640, y: 680, type: "secret"},
                {x: 14880, y: 600, type: "blockShiny", collision: true, item: {type: "starMan"}},
            ],
            steps: [
                {x: 22000, y: 520, w: 6}
            ],
            trees: [
                {x: 880, y: 840},
                {x: 1840, y: 840},
                {x: 1920, y: 840},
                {x: 3200, y: 840},
                {x: 4720, y: 840},
                {x: 5680, y: 840},
                {x: 5760, y: 840},
                {x: 7040, y: 840},
                {x: 8560, y: 840},
                {x: 9520, y: 840},
                {x: 9600, y: 840},
                {x: 10880, y: 840},
                {x: 12400, y: 840},
                {x: 13360, y: 840},
                {x: 13440, y: 840},
                {x: 14720, y: 840},
                {x: 16240, y: 840},
                {x: 17200, y: 840},
                {x: 17280, y: 840},
                {x: 18560, y: 840},
                {x: 20080, y: 840},
                {x: 21040, y: 840},
                {x: 21120, y: 840},
                {x: 23920, y: 840},
                {x: 24880, y: 840},
                {x: 24960, y: 840},
                {x: 26240, y: 840},
                {x: 27760, y: 840},
                
                {x: 1040, y: 760, big: true},
                {x: 1680, y: 760, big: true},
                {x: 3440, y: 760, big: true},
                {x: 4880, y: 760, big: true},
                {x: 5520, y: 760, big: true},
                {x: 7280, y: 760, big: true},
                {x: 8720, y: 760, big: true},
                {x: 9360, y: 760, big: true},
                {x: 11120, y: 760, big: true},
                {x: 12560, y: 760, big: true},
                {x: 13200, y: 760, big: true},
                {x: 14960, y: 760, big: true},
                {x: 16400, y: 760, big: true},
                {x: 17040, y: 760, big: true},
                {x: 18800, y: 760, big: true},
                {x: 20240, y: 760, big: true},
                {x: 20880, y: 760, big: true},
                {x: 22640, y: 760, big: true},
                {x: 24080, y: 760, big: true},
                {x: 24720, y: 760, big: true},
                {x: 26480, y: 760, big: true},
                {x: 27920, y: 760, big: true},
                {x: 28560, y: 760, big: true},
                {x: 30320, y: 760, big: true},
            ],
            clouds: [
                {x: 1440, y: 200},
                {x: 5280, y: 200},
                {x: 9120, y: 200},
                {x: 12960, y: 200},
                {x: 16800, y: 200},
                {x: 20640, y: 200},
                {x: 24480, y: 200},
                {x: 28320, y: 200},
                
                {x: 2160, y: 120},
                {x: 3600, y: 120},
                {x: 6000, y: 120},
                {x: 7440, y: 120},
                {x: 9840, y: 120},
                {x: 11280, y: 120},
                {x: 13680, y: 120},
                {x: 15120, y: 120},
                {x: 17520, y: 120},
                {x: 18960, y: 120},
                {x: 21360, y: 120},
                {x: 22800, y: 120},
                {x: 25200, y: 120},
                {x: 26640, y: 120},
                {x: 29040, y: 120},
                {x: 30480, y: 120},
                
                {x: 2400, y: 200, amount: 2},
                {x: 3840, y: 200, amount: 2},
                {x: 6240, y: 200, amount: 2},
                {x: 7680, y: 200, amount: 2},
                {x: 10080, y: 200, amount: 2},
                {x: 11520, y: 200, amount: 2},
                {x: 13920, y: 200, amount: 2},
                {x: 15360, y: 200, amount: 2},
                {x: 17760, y: 200, amount: 2},
                {x: 19200, y: 200, amount: 2},
                {x: 21600, y: 200, amount: 2},
                {x: 23040, y: 200, amount: 2},
                {x: 25440, y: 200, amount: 2},
                {x: 26880, y: 200, amount: 2},
                {x: 29280, y: 200, amount: 2},
                {x: 30720, y: 200, amount: 2},
            ],
            pipes: [
                {x: 2800, y: 680, size: 4, piranha: true},
                {x: 6080, y: 680, size: 4, piranha: true},
                {x: 7520, y: 680, size: 4, piranha: true},
                {x: 8320, y: 680, size: 4, piranha: true, destination: {worldID: 811}},
                {x: 19360, y: 680, size: 4, piranha: true},
                
                {x: 6560, y: 760, size: 3, piranha: true},
                {x: 11200, y: 760, size: 3, piranha: true},
                {x: 19040, y: 760, size: 3, piranha: true},
                {x: 27520, y: 760, size: 3, piranha: true},
                
                {x: 9200, y: 840, size: 2, piranha: true},
                {x: 28400, y: 840, size: 2, piranha: true},
                
                {x: 19680, y: 600, size: 5, piranha: true},
            ],
            coins: [
                {x: 5120, y: 600},
                {x: 7120, y: 600},
                {x: 7840, y: 600},
                
                {x: 8720, y: 280},
                {x: 8800, y: 280},
                
                {x: 17840, y: 600},
                {x: 17920, y: 600},
                {x: 22640, y: 600},
                {x: 22720, y: 600},
                {x: 23280, y: 600},
                {x: 23680, y: 600},
                {x: 25280, y: 600},
                {x: 25360, y: 600},
                {x: 25680, y: 600},
                {x: 25760, y: 600},
            ],
            enemies: [
                {x: 1440, y: 920, type: "buzzyBeetle"},
                {x: 6480, y: 920, type: "buzzyBeetle"},
                {x: 20320, y: 920, type: "buzzyBeetle"},
                {x: 22640, y: 920, type: "buzzyBeetle"},
                
                {x: 1840, y: 920},
                {x: 1960, y: 920},
                {x: 2080, y: 920},
                
                {x: 2400, y: 920},
                {x: 2520, y: 920},
                {x: 2640, y: 920},
                
                {x: 5520, y: 920},
                {x: 5640, y: 920},
                {x: 5760, y: 920},
                
                {x: 8640, y: 920},
                {x: 8760, y: 920},
                {x: 8880, y: 920},
                
                {x: 11840, y: 920},
                {x: 11960, y: 920},
                {x: 12080, y: 920},

                {x: 18560, y: 920},
                {x: 18680, y: 920},
                {x: 18800, y: 920},
                
                {x: 20560, y: 920},
                {x: 20680, y: 920},
                {x: 20800, y: 920},
                
                {x: 21120, y: 920},
                {x: 21240, y: 920},
                {x: 21360, y: 920},

                {x: 21760, y: 920},
                {x: 21880, y: 920},
                
                {x: 3440, y: 840, type: "koopaTroopa"},
                {x: 3560, y: 840, type: "koopaTroopa"},
                {x: 4880, y: 840, type: "koopaTroopa"},
                {x: 9520, y: 840, type: "koopaTroopa"},
                {x: 9920, y: 840, type: "koopaTroopa"},
                {x: 10040, y: 840, type: "koopaTroopa"},
                {x: 10160, y: 840, type: "koopaTroopa"},
                
                {x: 10400, y: 840, type: "koopaTroopa"},
                {x: 10520, y: 840, type: "koopaTroopa"},
                {x: 10640, y: 840, type: "koopaTroopa"},
                
                {x: 16560, y: 840, type: "koopaTroopa"},
                {x: 16680, y: 840, type: "koopaTroopa"},
                
                {x: 24400, y: 840, type: "koopaTroopa"},
                {x: 26560, y: 840, type: "koopaTroopa"},
                
                {x: 27120, y: 840, type: "koopaTroopa"},
                {x: 27240, y: 840, type: "koopaTroopa"},
                {x: 27360, y: 840, type: "koopaTroopa"},
                
                {x: 12880, y: 840, type: "koopaParatroopa"},
                {x: 13760, y: 840, type: "koopaParatroopa"},
                {x: 14160, y: 840, type: "koopaParatroopa"},
            ],
        }
    },
    811: {
        worldNum: 8,
        levelNum: 1,
        theme: "underworld",
        spawnLocation: {
            x: 440,
            y: 280
        },
        bg: "#000000",
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
                {x: 1360, y: 840, opening: "left", destination: { worldID: 81, scrollOffset: 8960, spawnLocation: {x: 280, y: 1000}, transitionType: "pipeOutTop" }},
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
    82: {
        worldNum: 8,
        levelNum: 2,
        width: 18160,
        levelEndLine: 17840,
        spawnLocation: {
            x: 160, 
            y: 1000
        },
        worldElements: {
            castles: [
                {x: 0, y: 600},
                {x: 17600, y: 600},
            ],
            flags: [
                {x: 17280, y: 120, destination: {worldID: 83}}
            ],
            rectangles: [
                {x: 0, y: 1000, w: 15},
                {x: 1280, y: 1000, w: 5},
                {x: 1760, y: 1000, w: 14},
                {x: 2960, y: 1000, w: 8},
                {x: 3680, y: 1000, w: 4},
                {x: 4240, y: 1000, w: 3},
                {x: 4560, y: 1000, w: 6},
                {x: 5120, y: 1000, w: 14},
                {x: 6400, y: 1000, w: 4},
                {x: 6800, y: 1000, w: 53},
                {x: 11120, y: 1000, w: 5},
                {x: 12320, y: 1000, w: 20},
                {x: 14320, y: 1000, w: 23},
                {x: 16480, y: 1000, w: 21},
                
                {x: 3040, y: 920, w: 2, type: "fence"},
                {x: 5120, y: 920, w: 2, type: "fence"},
                {x: 6880, y: 920, w: 2, type: "fence"},
                {x: 8800, y: 920, w: 4, type: "fence"},
                {x: 10720, y: 920, w: 2, type: "fence"},
                {x: 12640, y: 920, w: 2, type: "fence"},
                {x: 16640, y: 920, w: 2, type: "fence"},
                
                {x: 1760, y: 600, w: 4, h: 5, type: "stair", collision: true},
                {x: 2000, y: 360, w: 1, h: 3, type: "stair", collision: true},
                
                {x: 3600, y: 360, w: 31, type: "blockShiny", collision: true, individualCheck: true},
                {x: 6160, y: 680, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 8800, y: 680, w: 2, type: "blockShiny", collision: true, individualCheck: true},
                {x: 16240, y: 600, w: 1, h: 5, type: "stair", collision: true},
                {x: 16480, y: 360, w: 2, h: 8, type: "stair", collision: true},
            ],
            tiles: [
                {x: 4080, y: 1000, type: "floor", collision: true},
                {x: 11600, y: 1000, type: "floor", collision: true},
                {x: 11760, y: 1000, type: "floor", collision: true},
                {x: 14000, y: 1000, type: "floor", collision: true},
                {x: 16240, y: 1000, type: "floor", collision: true},
                
                {x: 1120, y: 920, type: "fence"},
                {x: 1280, y: 920, type: "fence"},
                {x: 3280, y: 920, type: "fence"},
                {x: 4960, y: 920, type: "fence"},
                {x: 7120, y: 920, type: "fence"},
                {x: 10960, y: 920, type: "fence"},
                
                {x: 2320, y: 680, type: "questionBlock"},
                {x: 2400, y: 680, type: "questionBlock"},
                {x: 2480, y: 680, type: "questionBlock"},
                {x: 2560, y: 680, type: "questionBlock"},

                {x: 3440, y: 360, type: "blockShiny", collision: true},
                {x: 3520, y: 360, type: "blockShiny", collision: true, item: {type: "oneUp"}},
                {x: 7920, y: 680, type: "blockShiny", collision: true},
                {x: 8000, y: 680, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},
                {x: 9440, y: 680, type: "blockShiny", collision: true},
                {x: 9520, y: 680, type: "stair", collision: true},
                {x: 9600, y: 680, type: "multiCoinBlock"},
                {x: 10000, y: 920, type: "cannonStand", collision: true},
            ],
            steps: [
                {x: 1360, y: 680, w: 4},
                {x: 1760, y: 360, w: 3},
                {x: 14560, y: 600, w: 5},
                {x: 15920, y: 760, w: 3},
            ],
            trees: [
                {x: 880, y: 840},
                {x: 3200, y: 840},
                {x: 4720, y: 840},
                {x: 5680, y: 840},
                {x: 5760, y: 840},
                {x: 7040, y: 840},
                {x: 8560, y: 840},
                {x: 9520, y: 840},
                {x: 9600, y: 840},
                {x: 10880, y: 840},
                {x: 12400, y: 840},
                {x: 13360, y: 840},
                {x: 13440, y: 840},
                {x: 17200, y: 840},
                
                {x: 1040, y: 760, big: true},
                {x: 3440, y: 760, big: true},
                {x: 4880, y: 760, big: true},
                {x: 5520, y: 760, big: true},
                {x: 7280, y: 760, big: true},
                {x: 8720, y: 760, big: true},
                {x: 9360, y: 760, big: true},
                {x: 11120, y: 760, big: true},
                {x: 13200, y: 760, big: true},
                {x: 14960, y: 760, big: true},
                {x: 17040, y: 760, big: true},
            ],
            clouds: [
                {x: 0, y: 200, amount: 2},
                {x: 2400, y: 200, amount: 2},
                {x: 3840, y: 200, amount: 2},
                {x: 6240, y: 200, amount: 2},
                {x: 7680, y: 200, amount: 2},
                {x: 10080, y: 200, amount: 2},
                {x: 11520, y: 200, amount: 2},
                {x: 13920, y: 200, amount: 2},
                {x: 15360, y: 200, amount: 2},
                {x: 17760, y: 200, amount: 2},
                
                {x: 1440, y: 200},
                {x: 5280, y: 200},
                {x: 9120, y: 200},
                {x: 12960, y: 200},
                {x: 16800, y: 200},
                
                {x: 2160, y: 120},
                {x: 3600, y: 120},
                {x: 6000, y: 120},
                {x: 7440, y: 120},
                {x: 9840, y: 120},
                {x: 11280, y: 120},
                {x: 13680, y: 120},
                {x: 15120, y: 120},
                {x: 17520, y: 120},
            ],
            pipes: [
                {x: 10480, y: 840, piranha: true},
                {x: 11360, y: 840, piranha: true},
                {x: 12480, y: 680, size: 4, piranha: true, destination: {worldID: 821}},
                {x: 13040, y: 840, piranha: true},
            ],
            enemies: [
                {x: 1680, y: 120, type: "lakitu"},
                {x: 1440, y: 680, type: "koopaParatroopa"},
                {x: 1920, y: 200, type: "koopaParatroopa"},
                {x: 4560, y: 840, type: "koopaParatroopa"},
                {x: 5280, y: 840, type: "koopaParatroopa"},
                {x: 5520, y: 840, type: "koopaParatroopa"},
                {x: 7360, y: 840, type: "koopaParatroopa"},
                {x: 7600, y: 840, type: "koopaParatroopa"},
                {x: 11120, y: 840, type: "koopaParatroopa"},
                {x: 13600, y: 840, type: "koopaParatroopa"},
                {x: 13760, y: 840, type: "koopaParatroopa"},
                {x: 14000, y: 680, type: "koopaParatroopa"},
                {x: 16240, y: 440, type: "koopaParatroopa"},
                
                {x: 8880, y: 920, type: "buzzyBeetle"},
                {x: 9680, y: 920, type: "buzzyBeetle"},
                {x: 9840, y: 920, type: "buzzyBeetle"},
                {x: 15120, y: 920, type: "buzzyBeetle"},
                
                {x: 14720, y: 680},
                {x: 14880, y: 520},
            ],
            jumpingBoards: [
                {x: 3520, y: 840}
            ],
            cannons: [
                {x: 6800, y: 840},
                {x: 8400, y: 840},
                {x: 14000, y: 840},
                {x: 7440, y: 760},
                {x: 10000, y: 760},
                {x: 15280, y: 760},
                {x: 7440, y: 920},
                {x: 9200, y: 920},
                {x: 15280, y: 920},
                {x: 9520, y: 600},
            ]
        }
    },
    821: {
        worldNum: 8,
        levelNum: 2,
        theme: "underworld",
        width: 1920,
        bg: "#000000",
        spawnLocation: {
            x: 440,
            y: 280
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 24},
                {x: 0, y: 120, w: 5, h: 11, type: "block", collision: true},
                {x: 1680, y: 120, w: 3, h: 11, type: "block", collision: true},
                {x: 640, y: 120, w: 6, h: 1, type: "block", collision: true, individualCheck: true},
                {x: 640, y: 440, w: 1, h: 2, type: "block", collision: true, individualCheck: true},
                {x: 720, y: 520, w: 5, h: 1, type: "block", collision: true, individualCheck: true},
                {x: 1120, y: 120, w: 1, h: 6, type: "block", collision: true, individualCheck: true},
                {x: 1200, y: 440, w: 2, h: 1, type: "block", collision: true, individualCheck: true},
                
                {x: 1520, y: 120, h: 9, type: "pipeVerticalLeft", collision: true},
                {x: 1600, y: 120, h: 11, type: "pipeVerticalRight", collision: true},
            ],
            tiles: [
                {x: 1440, y: 520, type: "multiCoinBlock"},
                {x: 1520, y: 840, type: "pipeConnectorTopLeft"},
                {x: 1520, y: 920, type: "pipeConnectorBottomLeft"},
            ],
            coins: [
                {x: 720, y: 360},
                {x: 800, y: 360},
                {x: 880, y: 360},
                {x: 960, y: 360},
                {x: 1040, y: 360},
                {x: 720, y: 440},
                {x: 800, y: 440},
                {x: 880, y: 440},
                {x: 960, y: 440},
                {x: 1040, y: 440},
            ],
            pipes: [
                {x: 1360, y: 840, opening: "left", destination: {worldID: 82, scrollOffset: 12640, spawnLocation: {x: 440, y: 1000}, transitionType: "pipeOutTop"}}
            ]
        }
    },
    83: {
        worldNum: 8,
        levelNum: 3,
        timeLimit: 300,
        width: 18320, 
        levelEndLine: 18000,
        spawnLocation: {
            x: 160, 
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 1000, w: 69},
                {x: 5680, y: 1000, w: 4},
                {x: 6160, y: 1000, w: 47},
                {x: 10080, y: 1000, w: 2},
                {x: 10400, y: 1000, w: 67},
                {x: 16640, y: 1000, w: 21},
                
                {x: 1920, y: 520, w: 8, type: "castleTop"},
                {x: 1920, y: 600, h: 5, w: 8, type: "block"},
                {x: 2960, y: 520, w: 14, type: "castleTop"},
                {x: 2960, y: 600, h: 5, w: 14, type: "block"},
                {x: 6320, y: 520, w: 6, type: "castleTop"},
                {x: 6320, y: 600, h: 5, w: 6, type: "block"},
                {x: 7040, y: 520, w: 6, type: "castleTop"},
                {x: 7040, y: 600, h: 5, w: 6, type: "block"},
                {x: 7760, y: 520, w: 10, type: "castleTop"},
                {x: 7760, y: 600, h: 5, w: 10, type: "block"},
                {x: 10560, y: 520, w: 34, type: "castleTop"},
                {x: 10560, y: 600, h: 5, w: 34, type: "block"},
                {x: 13760, y: 520, w: 20, type: "castleTop"},
                {x: 13760, y: 600, h: 5, w: 20, type: "block"},

                {x: 1120, y: 920, w: 4, type: "fence"},
                {x: 4960, y: 920, w: 4, type: "fence"},
                {x: 8880, y: 920, w: 3, type: "fence"},
                {x: 16640, y: 920, w: 2, type: "fence"},
                
                {x: 4800, y: 360, w: 6, type: "blockShiny", collision: true, individualCheck: true},
                {x: 4800, y: 680, w: 8, type: "blockShiny", collision: true, individualCheck: true},
                {x: 9360, y: 360, w: 6, type: "blockShiny", collision: true, individualCheck: true},
                {x: 9200, y: 680, w: 8, type: "blockShiny", collision: true, individualCheck: true},
                
                {x: 7600, y: 760, h: 3, type: "stair", collision: true},
                {x: 8720, y: 680, w: 2, h: 3, type: "stair", collision: true},
                {x: 15600, y: 840, h: 2, type: "stair", collision: true},
                {x: 16320, y: 360, w: 2, type: "stair", collision: true},
            ],
            tiles: [
                {x: 2720, y: 920, type: "cannonStand", collision: true},
                {x: 5280, y: 360, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},
                {x: 5360, y: 360, type: "blockShiny", collision: true},
                {x: 9200, y: 360, type: "blockShiny", collision: true},
                {x: 9280, y: 360, type: "blockShiny", collision: true, item: {type: "magicMushroom"}},
                {x: 9660, y: 920, type: "fence"},
                {x: 15200, y: 680, type: "multiCoinBlock"},
                {x: 15840, y: 840, type: "stair", collision: true},
                {x: 16000, y: 680, type: "stair", collision: true},
                {x: 16160, y: 520, type: "stair", collision: true},
            ],
            steps: [
                {x: 5680, y: 680, w: 4, reversed: true}
            ],
            pipes: [
                {x: 4240, y: 680, size: 4, piranhas: true},
                {x: 10080, y: 680, size: 4, piranhas: true},
                {x: 13440, y: 760, size: 3, piranhas: true},
            ],
            clouds: [
                {x: 0, y: 200, amount: 2},
                {x: 2400, y: 200, amount: 2},
                {x: 3840, y: 200, amount: 2},
                {x: 6240, y: 200, amount: 2},
                {x: 7680, y: 200, amount: 2},
                {x: 10080, y: 200, amount: 2},
                {x: 11520, y: 200, amount: 2},
                {x: 13920, y: 200, amount: 2},
                {x: 15360, y: 200, amount: 2},
                
                {x: 1440, y: 200},
                {x: 5280, y: 200},
                {x: 9120, y: 200},
                {x: 12960, y: 200},
                {x: 16800, y: 200},
                
                {x: 2160, y: 120},
                {x: 3600, y: 120},
                {x: 6000, y: 120},
                {x: 7440, y: 120},
                {x: 9840, y: 120},
                {x: 11280, y: 120},
                {x: 13680, y: 120},
                {x: 15120, y: 120},
                {x: 17520, y: 120},
            ],
            trees: [
                {x: 880, y: 840},
                {x: 1840, y: 840},
                {x: 4720, y: 840},
                {x: 8560, y: 840},
                {x: 9520, y: 840},
                {x: 9600, y: 840},
                {x: 13360, y: 840},
                {x: 17200, y: 840},
                {x: 17280, y: 840},
                
                {x: 1040, y: 760, big: true},
                {x: 1680, y: 760, big: true},
                {x: 4880, y: 760, big: true},
                {x: 9360, y: 760, big: true},
                {x: 17040, y: 760, big: true},
            ],
            castles: [
                {x: 0, y: 600},
                {x: 17760, y: 120},
                {x: 17600, y: 520, name: "rectangle5doors"},
            ],
            flags: [
                {x: 17120, y: 120, destination: {worldID: 84}}
            ],
            cannons: [
                {x: 1440, y: 840},
                {x: 2720, y: 760},
                {x: 6880, y: 840},
            ],
            enemies: [
                {x: 2400, y: 840, type: "koopaParatroopa"},
                {x: 7440, y: 840, type: "koopaParatroopa"},
                
                {x: 5040, y: 840, type: "hammerBro"},
                {x: 9520, y: 840, type: "hammerBro"},
                {x: 11680, y: 840, type: "hammerBro"},
                {x: 12720, y: 840, type: "hammerBro"},
                {x: 14160, y: 840, type: "hammerBro"},
                {x: 14800, y: 840, type: "hammerBro"},
                
                {x: 5200, y: 520, type: "hammerBro"},
                {x: 9360, y: 520, type: "hammerBro"},
                
                {x: 10960, y: 840, type: "koopaTroopa"},
            ]
        }
    },
    84: {
        worldNum: 8,
        levelNum: 4,
        theme: "castle",
        bg: "#000000",
        width: 25600,
        levelEndLine: 25040,
        spawnLocation: {
            x: 80, 
            y: 520
        },
        worldElements: {
            rectangles: [
                {x: 0, y: 120, w: 320, type: "solid", collision: true},
                {x: 0, y: 520, w: 2, h: 4, type: "solid", collision: true},
                {x: 0, y: 760, w: 6, h: 3, type: "solid", collision: true},
                {x: 880, y: 1000, w: 8, type: "solid", collision: true},
                {x: 1680, y: 1000, w: 30, type: "solid", collision: true},
                {x: 4240, y: 1000, w: 9, type: "solid", collision: true},
                {x: 4960, y: 760, w: 4, h: 4, type: "solid", collision: true},
                {x: 6000, y: 760, w: 6, h: 4, type: "solid", collision: true},
                {x: 6080, y: 440, w: 4, h: 1, type: "solid", collision: true},
                {x: 6640, y: 760, w: 7, h: 4, type: "solid", collision: true},
                {x: 7360, y: 760, w: 4, h: 4, type: "solid", collision: true},
                {x: 7680, y: 1000, w: 19, h: 1, type: "solid", collision: true},
                {x: 9360, y: 1000, w: 5, h: 1, type: "solid", collision: true},
                {x: 9920, y: 1000, w: 8, h: 1, type: "solid", collision: true},
                {x: 10720, y: 1000, w: 8, h: 1, type: "solid", collision: true},
                {x: 11760, y: 1000, w: 48, h: 1, type: "solid", collision: true},
                {x: 12160, y: 680, w: 2, h: 1, type: "solid", collision: true},
                {x: 15840, y: 760, w: 6, h: 4, type: "solid", collision: true},
                {x: 16480, y: 760, w: 6, h: 4, type: "solid", collision: true},
                {x: 17120, y: 760, w: 6, h: 4, type: "solid", collision: true},
                {x: 17920, y: 760, w: 4, h: 4, type: "solid", collision: true},
                {x: 18400, y: 760, w: 26, h: 4, type: "solid", collision: true},
                {x: 20480, y: 1000, w: 3, h: 1, type: "solid", collision: true},
                {x: 20880, y: 1000, w: 5, h: 1, type: "solid", collision: true},
                {x: 21440, y: 1000, w: 9, h: 1, type: "solid", collision: true},
                {x: 22560, y: 760, w: 6, h: 4, type: "solid", collision: true},
                {x: 22560, y: 200, w: 6, h: 2, type: "solid", collision: true},
                {x: 24080, y: 680, w: 3, h: 5, type: "solid", collision: true},
                {x: 24160, y: 200, w: 2, h: 3, type: "solid", collision: true},
                
                {x: 480, y: 1000, w: 5, type: "waterTop"},
                {x: 5280, y: 1000, w: 9, type: "waterTop"},
                {x: 11520, y: 1000, w: 3, type: "waterTop"},
                {x: 17600, y: 1000, w: 4, type: "waterTop"},
                {x: 22160, y: 1000, w: 5, type: "waterTop"},
                {x: 23040, y: 1000, w: 13, type: "waterTop"},
                
                {x: 23040, y: 760, w: 13, type: "bowserBridge", collision: true},
            ],
            elevatorPlatforms: [
                {x: 5600, y: 1000, w: 2, movementType: "leftRight"}
            ],
            bowsers: [
                {x: 23600, y: 680}
            ],
            enemies: [
                {x: 4480, y: 920},
                {x: 4600, y: 920},
                {x: 4720, y: 920},
                
                {x: 10240, y: 920, type: "buzzyBeetle"},
                {x: 10400, y: 920, type: "buzzyBeetle"},
                
                {x: 11120, y: 840, type: "koopaParatroopa"},
                {x: 11280, y: 840, type: "koopaParatroopa"},
                {x: 12400, y: 840, type: "koopaParatroopa"},
                {x: 12560, y: 840, type: "koopaParatroopa"},
                
                {x: 21840, y: 840, type: "hammerBro"},
                
                {x: 22320, y: 1000, type: "podoboo"},
            ],
            tiles: [
                {x: 12000, y: 680, type: "secret"},
                {x: 15760, y: 1000, type: "solid", collision: true},
                {x: 24000, y: 680, type: "bowserBridgeRope"},
                {x: 25040, y: 840, type: "pricessPeachTop"},
                {x: 25040, y: 920, type: "pricessPeachBottom"},
            ],
            axes: [
                {x: 24080, y: 600, destination: {worldID: 11}}
            ],
            steps: [
                {x: 160, y: 520, w: 4, type: "solid", reversed: true},
            ],
            pipes: [
                {x: 1520, y: 840, size: 3, piranha: true},
                {x: 4080, y: 840, size: 3, piranha: true, destination: {worldID: 84, scrollOffset: 1120, spawnLocation: {x: 440, y: 1000}, transition: "pipeOutTop"}},
                {x: 6480, y: 600, size: 6, piranha: true, destination: {worldID: 84, scrollOffset: 8800, spawnLocation: {x: 440, y: 1000}, transition: "pipeOutTop"}},
                {x: 7200, y: 520, size: 7},
                {x: 9200, y: 840, size: 3, piranha: true},
                {x: 9760, y: 760, size: 4, piranha: true},
                {x: 10560, y: 840, size: 3, piranha: true, destination: {worldID: 84, scrollOffset: 1120, spawnLocation: {x: 440, y: 1000}, transition: "pipeOutTop"}},
                {x: 11360, y: 760, size: 4, piranha: true},
                {x: 12160, y: 440, size: 3, piranha: true, destination: {worldID: 84, scrollOffset: 15200, spawnLocation: {x: 440, y: 1000}, transition: "pipeOutTop"}},
                {x: 15600, y: 840, size: 3},
                {x: 16320, y: 600, size: 6},
                {x: 16960, y: 520, size: 7, piranha: true, destination: {worldID: 84, scrollOffset: 1120, spawnLocation: {x: 440, y: 1000}, transition: "pipeOutTop"}},
                {x: 18240, y: 600, size: 6, piranha: true, destination: {worldID: 841, transition: "pipeOutTop"}},
                {x: 20720, y: 840, size: 3},
                {x: 21280, y: 840, size: 3, piranha: true, destination: {worldID: 84, scrollOffset: 1120, spawnLocation: {x: 440, y: 1000}, transition: "pipeOutTop"}},
            ],
            teleportTriggers: [
                {x: 7520, y: 200, w: 2, h: 7, destination: {worldID: 84, scrollOffset: 2240, spawnLocation: {x: 320, y: 1000}}},
                {x: 13920, y: 200, w: 2, h: 10, destination: {worldID: 84, scrollOffset: 8560, spawnLocation: {x: 400, y: 1000}}},
                {x: 20320, y: 200, w: 2, h: 7, destination: {worldID: 84, scrollOffset: 14960, spawnLocation: {x: 400, y: 1000}}},
            ]
        }
    },
    841: {
        worldNum: 8,
        levelNum: 4,
        theme: "water",
        waterLevel: true,
        width: 5760,
        gravity: .5,
        spawnLocation: {
            x: 280,
            y: 1000
        },
        worldElements: {
            rectangles: [
                {x: 160, y: 120, w: 4, type: "waterTop", collision: true},

                {x: 0, y: 120, w: 2, h: 12, type: "solid", collision: true},
                {x: 1440, y: 1000, w: 54, h: 1, type: "solid", collision: true},
                {x: 1440, y: 120, w: 54, h: 1, type: "solid", collision: true},
                {x: 480, y: 120, w: 12, h: 3, type: "solid", collision: true},
                {x: 480, y: 760, w: 12, h: 4, type: "solid", collision: true},
                {x: 880, y: 360, w: 7, h: 1, type: "solid", collision: true},
                {x: 880, y: 680, w: 7, h: 1, type: "solid", collision: true},
                {x: 3120, y: 200, w: 3, h: 3, type: "solid", collision: true},
                {x: 3120, y: 760, w: 3, h: 3, type: "solid", collision: true},
                {x: 5360, y: 200, w: 5, h: 3, type: "solid", collision: true},
                {x: 5360, y: 680, w: 5, h: 4, type: "solid", collision: true},
                {x: 5520, y: 440, w: 3, h: 3, type: "solid", collision: true},
            ],
            tiles: [
                {x: 160, y: 1000, type: "solid", collision: true},
                {x: 400, y: 1000, type: "solid", collision: true},
            ],
            pipes: [
                {x: 240, y: 840, size: 3},
                {x: 5440, y: 520, size: 1, opening: "left", destination: {worldID: 84, scrollOffset: 20480, spawnLocation: {x: 260, y: 1000}, transition: "pipeOutTop"}},
            ],
            fireBars: [
                {x: 1600, y: 520, counterClockwise: true, noCenterTile: true},
                {x: 3200, y: 440, counterClockwise: true, noCenterTile: true},
                {x: 4480, y: 600, counterClockwise: true, noCenterTile: true},
                {x: 2480, y: 760, noCenterTile: true},
                {x: 5120, y: 520, noCenterTile: true},
            ],
            enemies: [
                {x: 2240, y: 840, type: "bloober"},
                {x: 4080, y: 760, type: "bloober"},
                {x: 4240, y: 440, type: "bloober"},
            ],
        }
    }
}

class JumpingBoard {
    constructor(parent, x, y) {
        this.objectName = "JumpingBoard";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = 1;
        this.h = 2;
        this.theme = this.parent.theme;
        this.sX = spriteOffsets.objects.theme[this.theme].x + spriteOffsets.objects.type.jumpingBoard.x;
        this.sY = spriteOffsets.objects.type.jumpingBoard.y;
        this.sprites = objectSprites;
        this.needsUpdate = true;
        this.jumpForce = -40;
    
        this.updateBoundingBox();
    
        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.onScreen = true;
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

    update() {

    }

    scroll(deltaX) {
        this.x -= deltaX;

        this.updateBoundingBox();
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class Cannon {
    constructor(parent, x, y, theme) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = 1;
        this.h = 2;
        this.theme = theme || this.parent.theme;
        this.sX = 720;
        this.sY = 0;
        this.sprites = tileSprites;
        this.collision = true;
        this.enemyCollision = true;
        this.cooldown = 60;
        this.needsUpdate = true;
        this.canShoot = true;
        this.canShootThreshold = 1.5 * this.blocksize;
    
        this.updateBoundingBox();
    
        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.onScreen = true;
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

    update() {
        if (!this.onScreen || !this.canShoot) return;

        this.cooldown--;
        if (this.cooldown === 0) {
            this.parent.spawnEnemy(this.x, this.y, "bulletBill");
            this.cooldown = 120;
            this.parent.parent.audioFiles.sounds.fireworks.currentTime = 0;
            this.parent.parent.audioFiles.sounds.fireworks.play();
        }
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        if (!this.onScreen) return;
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class TeleportTrigger {
    constructor(parent, x, y, w, h, destination) {
        this.objectName = "TeleportTrigger";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = w || 1;
        this.h = h || 1;
        this.destination = destination;
    
        this.updateBoundingBox();
    
        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.onScreen = true;
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

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();
    }
}

class ScalePlatform {
    constructor(parent, x, y, w, theme, ropeStart, ropeW, platformLeft, platformRight) {
        this.typeName = "ScalePlatform";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.needsUpdate = true;
        this.x = x;
        this.y = y;
        this.ropeStart = ropeStart;
        this.ropeW = ropeW;
        this.theme = theme || this.parent.theme;
        this.platformLeft = platformLeft;
        this.platformRight = platformRight;
        this.w = w;
        this.speed = 4;

        this.build();

        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    build() {
        this.parts = [];
        this.parts.push(new Rectangle(this, this.platformLeft.x, this.platformLeft.y, this.platformLeft.w, 1, "overworld", "platform", true));
        this.parts.push(new Rectangle(this, this.platformRight.x, this.platformRight.y, this.platformRight.w, 1, "overworld", "platform", true));

        this.leftRopeLength = (this.parts[0].y - this.y - this.blocksize) / this.blocksize;
        this.rightRopeLength = (this.parts[1].y - this.y - this.blocksize) / this.blocksize;
    }

    break() {
        this.broken = true;
        this.speed = 10;
    }

    update() {
        if (!this.onScreen) return;

        if (!this.broken) {
            this.leftRopeLength = Math.floor((this.parts[0].y - this.y - this.blocksize) / this.blocksize);
            this.leftRopeRestLength = (this.parts[0].y - this.y - this.blocksize) / this.blocksize - Math.floor((this.parts[0].y - this.y - this.blocksize) / this.blocksize);
            this.rightRopeLength = Math.floor((this.parts[1].y - this.y - this.blocksize) / this.blocksize);
            this.rightRopeRestLength = (this.parts[1].y - this.y - this.blocksize) / this.blocksize - Math.floor((this.parts[1].y - this.y - this.blocksize) / this.blocksize);
            return;
        }

        this.parts.forEach(part => {
            part.y += this.speed;
            part.updateBoundingBox();
        });

        if (this.parts.length === 0) return;

        if (this.parts[0].top > this.parent.parent.screensize.height && this.parts[1].top > this.parent.parent.screensize.height) {
            this.parts.length = 0;
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

    scroll(deltaX) {
        this.x -= deltaX;
        this.ropeStart -= deltaX;

        this.parts.forEach(part => {
            part.scroll(deltaX);
        });

        this.updateBoundingBox();
    }

    draw() {
        if (!this.onScreen) return;

        for (let i = 0; i < this.ropeW; i++) {
            let typeName = "ropeHorizontal";
            if (i === 0) {
                typeName = "rollerLeft";
            } else if (i === this.ropeW - 1) {
                typeName = "rollerRight";
            }
            const sX = spriteOffsets.tiles.theme[this.theme].x + spriteOffsets.tiles.type[typeName].x;
            const sY = spriteOffsets.tiles.type[typeName].y;
            ctx.drawImage(tileSprites, sX, sY, this.blocksize, this.blocksize, this.ropeStart + i * this.blocksize, this.y, this.blocksize, this.blocksize);
        }

        for (let i = 0; i < this.leftRopeLength; i++) {
            const sX = spriteOffsets.tiles.theme[this.theme].x + spriteOffsets.tiles.type.rope.x;
            const sY = spriteOffsets.tiles.type.rope.y;
            ctx.drawImage(tileSprites, sX, sY, this.blocksize, this.blocksize, this.ropeStart, this.y + (i + 1) * this.blocksize, this.blocksize, this.blocksize);
        }

        if (this.leftRopeRestLength) {
            const sX = spriteOffsets.tiles.theme[this.theme].x + spriteOffsets.tiles.type.rope.x;
            const sY = spriteOffsets.tiles.type.rope.y;
            ctx.drawImage(tileSprites, sX, sY, this.blocksize, this.leftRopeRestLength * this.blocksize, this.ropeStart, this.y + (this.leftRopeLength + 1) * this.blocksize, this.blocksize, this.leftRopeRestLength * this.blocksize);
        }

        for (let i = 0; i < this.rightRopeLength; i++) {
            const sX = spriteOffsets.tiles.theme[this.theme].x + spriteOffsets.tiles.type.rope.x;
            const sY = spriteOffsets.tiles.type.rope.y;
            ctx.drawImage(tileSprites, sX, sY, this.blocksize, this.blocksize, this.ropeStart + (this.ropeW - 1) * this.blocksize, this.y + (i + 1) * this.blocksize, this.blocksize, this.blocksize);
        }

        if (this.rightRopeRestLength) {
            const sX = spriteOffsets.tiles.theme[this.theme].x + spriteOffsets.tiles.type.rope.x;
            const sY = spriteOffsets.tiles.type.rope.y;
            ctx.drawImage(tileSprites, sX, sY, this.blocksize, this.rightRopeRestLength * this.blocksize, this.ropeStart + (this.ropeW - 1) * this.blocksize, this.y + (this.rightRopeLength + 1) * this.blocksize, this.blocksize, this.rightRopeRestLength * this.blocksize);
        }

        this.parts.forEach(part => {
            part.draw();
        });
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
        this.needsUpdate = true;
        this.collision = collision;
        if (this.type === "questionBlock") {
            this.updateOffScreen = true;
        }
        if (this.type === "questionBlock" || this.type === "secret") this.collision = true;
        this.item = item;
        if (this.type === "questionBlock" && !this.item || this.type === "secret" && !this.item) this.item = {type: "coinItem"};
        this.bouncing = false;
        if (this.type === "mushroomRetainerTop" || this.type === "mushroomRetainerBottom") {
            this.sprites = objectSprites;
            this.sX = 0;
            this.sY = (this.type === "mushroomRetainerTop") ? 1120 : 1200;
        } else if (this.type === "vineTop" || this.type === "vine") {
            this.sprites = objectSprites;
            this.sX = 320;
            this.sY = (this.type === "vineTop") ? 240 : 320;
        } else {
            this.sprites = tileSprites;
        }
        this.animateSequences = {
            "questionBlock": [1920, 1920, 2000, 2080, 2000],
        }

        if (this.animateSequences[this.type]) {
            this.frame = 0;
            this.animate = true;
            this.sequence = this.animateSequences[this.type];
        }

        if (this.type === "multiCoinBlock") {
            this.collision = true;
            this.states = {
                current: "inactive",
                inactive: "inactive",
                active: "active",
                lastHit: "lastHit"
            };
            this.timer = 8 * 60;
        }

        this.setSpriteOffsets();

        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
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

    setSpriteOffsets() {
        if (this.sprites === objectSprites) return;
        this.sX = spriteOffsets.tiles.type[this.type].x;
        this.sY = spriteOffsets.tiles.theme[this.theme].y + spriteOffsets.tiles.type[this.type].y;
    }

    destroy(tileList) {
        if (this.parent.constructor.name === "World") {
            const index = this.parent.worldElements.tiles.indexOf(this);
            this.parent.worldElements.tiles.splice(index, 1);
        } else {
            const index = tileList.indexOf(this);
            tileList.splice(index, 1);
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
        if (!this.onScreen && !this.updateOffScreen) return;
        
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
            if (item.onScreen &&
                this.top < item.bottom &&
                this.bottom > item.top &&
                this.left < item.right &&
                this.right > item.left)
            {
                item.destroy();
            }
        });
    }

    collisionCheckEnemies(list) {
        list.forEach(item => {
            if (item.onScreen &&
                this.bottom > item.top &&
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
                item.onScreen &&
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
        if (world.worldElements.coins) this.collisionCheckCoins(world.worldElements.coins);
        if (world.worldElements.enemies) this.collisionCheckEnemies(world.worldElements.enemies);
        if (world.worldElements.items) this.collisionCheckItems(world.worldElements.items);
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        if (!this.onScreen) return;
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class Axe {
    constructor(parent, x, y, destination) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.needsUpdate = true;
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.destination = destination;
        this.w = 1;
        this.h = 1;
        this.sX = 2160;
        this.sY =  80;
        this.sprites = tileSprites;
        this.frames = [0, 0, 80, 160, 80];

        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
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

    setSprite() {
        if (this.parent.parent.frame % 10 === 0) {
            this.frame = (this.frame + 1) % this.frames.length;
            this.sX = 2160 + this.frames[this.frame];
        }
    }

    update() {
        if (!this.onScreen) return;
        this.setSprite();
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        if (!this.onScreen) return;
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
        if (this.type === "floor") {
            this.collision = true;
        } else {
            this.collision = collision;
        }
        this.individualCheck = individualCheck;
        if (this.individualCheck) this.needsUpdate = true;
        if (this.type === "platform") {
            this.sprites = objectSprites;
            this.sX = spriteOffsets.objects.theme[this.theme].x + spriteOffsets.objects.type[this.type].x;
            this.sY = spriteOffsets.objects.type[this.type].y;
        } else {
            this.sprites = tileSprites;
            this.sX = spriteOffsets.tiles.type[this.type].x;
            this.sY = spriteOffsets.tiles.theme[this.theme].y + spriteOffsets.tiles.type[this.type].y;
        }

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.onScreen = true;
            if (!this.parts) return;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    build() {
        if (this.individualCheck) {
            this.parts = [];

            for (let i = 0; i < this.h; i++) {
                for (let j = 0; j < this.w; j++) {
                    this.parts.push(new Tile(this, this.x + j * this.blocksize, this.y + i * this.blocksize, this.theme, this.type, true));
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

    update() {
        if (!this.individualCheck || !this.onScreen) return;
        this.parts.forEach(part => {
            part.update();
        });
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();

        if (this.individualCheck) {
            this.parts.forEach(part => {
                part.scroll(deltaX);
            });
        }
    }

    draw() {
        if (!this.onScreen) return;

        if (this.individualCheck) {
            this.parts.forEach(part => {
                part.draw();
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
            this.onScreen = true;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    build() {
        this.parts = [];

        for (let i = 0; i < this.w; i++) {
            let typeName;
            if (i === 0) typeName = `platform${this.variant}Left`;
            else if (i === this.w - 1) typeName = `platform${this.variant}Right`;
            else typeName = `platform${this.variant}`;

            this.parts.push(new Tile(this, this.x + i * this.blocksize, this.y, this.theme, typeName, false, true));
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

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();

        this.parts.forEach(part => {
            part.scroll(deltaX);
        });
    }

    draw() {
        if (!this.onScreen) return;
        this.parts.forEach(part => {
            part.draw();
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
        this.h = h || 2;
        this.w = 1 + (this.h - 1) * 2;
        this.theme = theme || this.parent.theme;
        this.variant = variant || "";

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    build() {
        this.parts = [];

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
                    this.parts.push(new Tile(this, this.x + (leftSkip + j) * this.blocksize, this.y + i * this.blocksize, this.theme, typeName));
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

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();

        this.parts.forEach(part => {
            part.scroll(deltaX);
        });
    }

    draw() {
        if (!this.onScreen) return;
        this.parts.forEach(part => {
            part.draw();
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
            this.onScreen = true;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    build() {
        this.parts = [];
        
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
                    this.parts.push(new Tile(this, this.x + j * this.blocksize, this.y + i * this.blocksize, this.theme, typeName));
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

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();

        this.parts.forEach(part => {
            part.scroll(deltaX);
        });
    }

    draw() {
        if (!this.onScreen) return;
        this.parts.forEach(part => {
            part.draw();
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
        this.w = this.amount + 2;
        this.h = 2;

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    build() {
        this.parts = [];
        
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
                this.parts.push(new Tile(this, this.x + i * this.blocksize, this.y, this.theme, typeName));
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

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();

        this.parts.forEach(part => {
            part.scroll(deltaX);
        });
    }

    draw() {
        if (!this.onScreen) return;
        this.parts.forEach(part => {
            part.draw();
        });
    }
}

class Tree {
    constructor(parent, x, y, theme, big) {
        this.objectName = "Tree";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.theme = theme || this.parent.theme;
        this.big = big;
        this.w = 1;
        this.h = this.big ? 3 : 2;

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    build() {
        this.parts = [];

        if (this.big) {
            this.parts.push(new Tile(this, this.x, this.y, this.theme, "treeTopBigTop"));
            this.parts.push(new Tile(this, this.x, this.y + 1 * this.blocksize, this.theme, "treeTopBigBottom"));
            this.parts.push(new Tile(this, this.x, this.y + 2 * this.blocksize, "overworld", "treeBottom"));
        } else {
            this.parts.push(new Tile(this, this.x, this.y, this.theme, "treeTopSmall"));
            this.parts.push(new Tile(this, this.x, this.y + 1 * this.blocksize, "overworld", "treeBottom"));
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

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();

        this.parts.forEach(part => {
            part.scroll(deltaX);
        });
    }

    draw() {
        if (!this.onScreen) return;
        this.parts.forEach(part => {
            part.draw();
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
            this.onScreen = true;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    build() {
        this.parts = [];
        
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
            this.parts.push(new Rectangle(this, x, y, 1, h, this.theme, this.type, true));
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

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();

        this.parts.forEach(part => {
            part.scroll(deltaX);
        });
    }

    draw() {
        if (!this.onScreen) return;
        this.parts.forEach(part => {
            part.draw();
        });
    }
}

class Pipe {
    constructor(parent, x, y, size, theme, opening, piranha, isWarp, destination) {
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
        this.piranha = piranha;
        this.piranhaOnce = isWarp;
        this.destination = destination;
        this.collision = true;

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    build() {
        if (this.piranha) {
            if (!this.parent.worldElements.piranhas) this.parent.worldElements.piranhas = [];
            this.parent.worldElements.piranhas.push(new Piranha(this.parent, this.x + this.blocksize / 2, this.y - this.blocksize * 2, this.theme, this.isWarp))
        }

        this.parts = [];

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
                        this.parts.push(new Tile(this, this.x + j * this.blocksize, this.y + i * this.blocksize, this.theme, typeName, false, true));
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
                        this.parts.push(new Tile(this, this.x + j * this.blocksize, this.y + i * this.blocksize, this.theme, typeName, false, true));
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

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();

        this.parts.forEach(part => {
            part.scroll(deltaX);
        });
    }

    draw() {
        if (!this.onScreen) return;
        this.parts.forEach(part => {
            part.draw();
        });
    }
}

class Flag {
    constructor(parent, x, y, h, theme, destination) {
        this.objectName = "Flag";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.needsUpdate = true;
        this.x = x;
        this.y = y;
        this.h = h || 11;
        this.w = 1;
        this.theme = theme || this.parent.theme;
        this.destination = destination;
        this.collision = true;
        this.movingDown = false;

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    build() {
        this.parts = [];

        const flagSailTheme = (this.theme === "castle") ? "castle" : "overworld";

        this.parts.push(new Tile(this, this.x - this.blocksize / 2, this.y + this.blocksize, flagSailTheme, "flagSail"));
        this.parts.push(new Tile(this, this.x, this.y, this.theme, "flagTop", false, true));

        for (let i = 0; i < this.h - 2; i++) {
            this.parts.push(new Tile(this, this.x, this.y + (i + 1) *  this.blocksize, this.theme, "flagPole", false, true));
        }

        this.parts.push(new Tile(this, this.x, this.y + this.h * this.blocksize - this.blocksize, "overworld", "stair", false, true));
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

    pullDown() {
        this.movingDown = true;
    }

    update() {
        if (!this.movingDown || !this.onScreen) return;

        const flagSail = this.parts.find(element => element.type === "flagSail");

        if (flagSail.y >= this.y + (this.h - 2) * this.blocksize) {
            this.movingDown = false;
        }

        flagSail.y += 10;
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();

        this.parts.forEach(part => {
            part.scroll(deltaX);
        });
    }

    draw() {
        if (!this.onScreen) return;
        this.parts.forEach(part => {
            part.draw();
        });
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
            this.onScreen = true;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    build() {
        this.parts = [];

        this.castles[this.name].tiles.forEach(tile => {
            this.parts.push(new Tile(this, this.x + tile.x, this.y + tile.y, this.theme, tile.type));
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

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();

        this.parts.forEach(part => {
            part.scroll(deltaX);
        });
    }

    draw() {
        if (!this.onScreen) return;
        this.parts.forEach(part => {
            part.draw();
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
        this.needsUpdate = true;
        this.updateOffScreen = true;

        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.onScreen = true;
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

    setSprite() {
        if (this.parent.parent.frame % 10 === 0) {
            this.frame = (this.frame + 1) % this.sequence.length;
            this.sX = spriteOffsets.objects.theme[this.theme].x + this.sequence[this.frame];
        }
    }

    destroy() {
        this.parent.parent.coinCollected();

        const index = this.parent.worldElements.coins.indexOf(this);
        this.parent.worldElements.coins.splice(index, 1);
    }

    update() {
        this.setSprite();
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        if (!this.onScreen) return;
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class Enemy {
    constructor(parent, x, y, theme, type) {
        this.objectName = "Enemy";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.needsUpdate = true;
        this.enemyProperties = {
            goomba: {
                w: 1,
                h: 1,
                hitboxOffsetX: 20,
                hitboxOffsetTop: 30,
                hitboxOffsetBottom: 25,
                xVel: 5,
                yVel: 0,
                stompable: true,
                shootable: true,
                worldCollision: true
            },
            buzzyBeetle: {
                w: 1,
                h: 1,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 5,
                hitboxOffsetBottom: 20,
                xVel: 5,
                yVel: 0,
                stompable: true,
                shootable: false,
                worldCollision: true,
            },
            buzzyBeetleShell: {
                w: 1,
                h: 1,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 5,
                hitboxOffsetBottom: 20,
                xVel: 0,
                yVel: 0,
                stompable: true,
                shootable: false,
                kickable: true,
                worldCollision: true,
            },
            koopaTroopa: {
                w: 1,
                h: 2,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 85,
                hitboxOffsetBottom: 20,
                xVel: 5,
                yVel: 0,
                stompable: true,
                shootable: true,
                worldCollision: true,
            },
            koopaParatroopa: {
                w: 1,
                h: 2,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 85,
                hitboxOffsetBottom: 20,
                xVel: 3,
                yVel: 5,
                stompable: true,
                shootable: true,
                worldCollision: true,
                gravity: 0
            },
            koopaShell: {
                w: 1,
                h: 1,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 5,
                hitboxOffsetBottom: 20,
                xVel: 0,
                yVel: 0,
                stompable: true,
                shootable: true,
                kickable: true,
                worldCollision: true,
            },
            bloober: {
                w: 1,
                h: 2,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 45,
                hitboxOffsetBottom: 40,
                xVel: 5,
                yVel: -20,
                stompable: false,
                shootable: true,
                worldCollision: true,
            },
            cheepCheep: {
                w: 1,
                h: 1,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 30,
                hitboxOffsetBottom: 25,
                xVel: 5,
                yVel: -60,
                stompable: true,
                shootable: true,
            },
            podoboo: {
                w: 1,
                h: 1,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 30,
                hitboxOffsetBottom: 25,
                xVel: 0,
                yVel: -35,
                gravity: 1,
                stompable: false,
                shootable: false,
                undestructable: true,
                worldCollision: false,
            },
            hammerBro: {
                w: 1,
                h: 2,
                hitboxOffsetX: 25,
                hitboxOffsetTop: 60,
                hitboxOffsetBottom: 0,
                xVel: 2,
                yVel: 0,
                stompable: true,
                shootable: true,
                worldCollision: true,
                spawnObject: "hammer",
                spawnObjectCooldownInitial: 120,
                jumpForce: -20,
                jumpCooldownInitial: 180
            },
            lakitu: {
                w: 1,
                h: 2,
                hitboxOffsetX: 10,
                hitboxOffsetTop: 85,
                hitboxOffsetBottom: 20,
                xVel: 5,
                yVel: 0,
                stompable: true,
                shootable: true,
                spriteUpdateRate: 180,
                gravity: 0,
                spawnObject: "spinyEgg",
                spawnObjectCooldownInitial: 300
            },
            spinyEgg: {
                w: 1,
                h: 1,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 30,
                hitboxOffsetBottom: 25,
                xVel: 0,
                yVel: -10,
                stompable: false,
                shootable: false,
                worldCollision: true,
            },
            spiny: {
                w: 1,
                h: 1,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 30,
                hitboxOffsetBottom: 25,
                xVel: 5,
                yVel: 0,
                stompable: false,
                shootable: true,
                worldCollision: true,
            },
            bulletBill: {
                w: 1,
                h: 1,
                hitboxOffsetX: 15,
                hitboxOffsetTop: 35,
                hitboxOffsetBottom: 20,
                xVel: 5,
                yVel: 0,
                stompable: true,
                shootable: false,
                gravity: 0
            },
            hammer: {
                w: 1, 
                h: 1,
                hitboxOffsetX: 30,
                hitboxOffsetTop: 30,
                hitboxOffsetBottom: 30,
                xVel: 15,
                yVel: -20,
                undestructable: true,
            }
        }
        this.frame = 0;
        this.x = x;
        this.xInitial = this.x;
        this.xOld = this.x;
        this.y = y;
        this.yInitial = this.y;
        this.yOld = this.y;
        this.theme = theme;
        this.pointValue = 100;
        if (!this.theme) this.theme = this.parent.theme;
        this.type = type || "goomba";
        this.sprites = enemySprites;
        this.facingLeftYOffset = 160;
        this.facingRight = false;
        this.collision = true;
        if (this.type === "hammer") this.collision = false;
        this.destroyWhenLeavingScreen = true;
        this.animateSequences = {
            goomba: [{x: 0, y: 0}, {x: 80, y: 0}],
            koopaTroopa: [{x: 0, y: 0}, {x: 80, y: 0}],
            koopaParatroopa: [{x: 0, y: 0}, {x: 80, y: 0}],
            buzzyBeetle: [{x: 0, y: 0}, {x: 80, y: 0}],
            hammerBro: [{x: 0, y: 0}, {x: 80, y: 0}, {x: 160, y: 0}, {x: 240, y: 0}],
            lakitu: [{x: 0, y: 0}, {x: 80, y: 0}],
            spinyEgg: [{x: 0, y: 0}, {x: 80, y: 0}],
            spiny: [{x: 0, y: 0}, {x: 80, y: 0}],
            bloober: [{x: 0, y: 0}, {x: 80, y: 0}],
            cheepCheep: [{x: 0, y: 0}, {x: 80, y: 0}],
            hammer: [{x: 0, y: 0}, {x: 80, y: 0}, {x: 80, y: 0}, {x: 80, y: 80}]
        }

        this.setSpriteOffsets();
        this.setProperties();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
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

    setSpriteOffsets() {
        this.sX = spriteOffsets.enemies.type[this.type].x;
        this.sY = spriteOffsets.enemies.type[this.type].y + spriteOffsets.enemies.theme[this.theme].y;
    }

    setProperties() {
        this.frame = 0;
        this.w = this.enemyProperties[this.type].w;
        this.h = this.enemyProperties[this.type].h;
        this.xVel = this.enemyProperties[this.type].xVel;
        this.xVelInitial = this.xVel;
        this.yVel = this.enemyProperties[this.type].yVel;
        this.yVelInitial = this.yVel;

        if (!this.facingRight) {
            this.xVel *= -1;
            this.xVelInitial = this.xVel;
        }

        this.hitboxOffsetTop = this.enemyProperties[this.type].hitboxOffsetTop;
        this.hitboxOffsetBottom = this.enemyProperties[this.type].hitboxOffsetBottom;
        this.hitboxOffsetX = this.enemyProperties[this.type].hitboxOffsetX;

        this.gravity = this.enemyProperties[this.type].gravity;

        if (this.gravity === undefined) this.gravity = this.parent.gravity;

        this.stompable = this.enemyProperties[this.type].stompable;
        this.shootable = this.enemyProperties[this.type].shootable;
        this.kickable = this.enemyProperties[this.type].kickable;

        if (this.kickable) this.shellTime = 0;

        this.undestructable = this.enemyProperties[this.type].undestructable;
        this.worldCollision = this.enemyProperties[this.type].worldCollision;
        this.spriteUpdateRate = this.enemyProperties[this.type].spriteUpdateRate || 10;

        if (this.animateSequences[this.type]) {
            this.animate = true;
            this.sequence = this.animateSequences[this.type];
        } else {
            this.animate = false;
            this.sequence = null;
        }
        
        this.spawnObject = this.enemyProperties[this.type].spawnObject;
        this.spawnObjectCooldownInitial = this.enemyProperties[this.type].spawnObjectCooldownInitial;
        this.spawnObjectCooldown = this.spawnObjectCooldownInitial;
        this.jumpForce = this.enemyProperties[this.type].jumpForce;
        this.jumpCooldownInitial = this.enemyProperties[this.type].jumpCooldownInitial;
        this.jumpCooldown = this.jumpCooldownInitial;

        this.updateBoundingBox();
    }

    jump() {
        this.yVel += this.jumpForce;
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
        this.gravity = this.parent.gravity;
        this.collision = false;
        this.animate = false;
        this.xVel = 0;
        this.yVel = -10;
        this.parent.parent.audioFiles.sounds.kick.currentTime = 0;
        this.parent.parent.audioFiles.sounds.kick.play();
    }

    flatDeath() {
        this.parent.parent.score += this.pointValue;
        this.collision = false;
        this.animate = false;
        this.xVel = 0;
        this.sX = 160;
        this.despawnTimer = 90;
    }

    destroy() {
        if (!this.despawnTimer) {
            this.parent.parent.score += this.pointValue;
        }
        const index = this.parent.worldElements.enemies.indexOf(this);
        this.parent.worldElements.enemies.splice(index, 1);
    }

    updatePosition() {
        if (this.despawnTimer > 0) return;

        this.yVel += this.gravity;
        
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;
        this.updateBoundingBox();

        if (this.type === "lakitu" && this.left < 160) {
            this.xVel = this.xVelInitial;
            this.facingRight = true;
        } else if (this.type === "lakitu" && this.right > this.parent.parent.screensize.width - 160) {
            this.xVel = -this.xVelInitial;
            this.facingRight = false;
        }

        if (this.type === "hammerBro" && this.x >= this.xInitial + this.blocksize * 2) {
            this.xVel = this.xVelInitial;
        } else if (this.type === "hammerBro" && this.x <= this.xInitial - this.blocksize * 2) {
            this.xVel = -this.xVelInitial;
        }
    }

    collisionCheckRectangles(list) {
        list.forEach(item => {
            if (item.collision &&
                item.onScreen &&
                this.worldCollision &&
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
                    } else if (this.type === "spinyEgg") {
                        this.type = "spiny";
                        this.setProperties();
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
            if (item.onScreen) this.collisionCheckRectangles(item.parts);
        });
    }

    collisionCheckEnemies(list) {
        list.forEach(item => {
            if ((item !== this &&
                item.onScreen &&
                item.collision &&
                this.right > item.left &&
                this.left < item.right &&
                this.top < item.bottom &&
                this.bottom > item.top) && 
                ((this.right > item.left && this.rightOld <= item.left) || (this.left < item.right && this.leftOld >= item.right)))
            {
                if ((this.kickable) && this.xVel != 0) {
                    item.plopDeath();
                    this.parent.parent.audioFiles.sounds.kick.currentTime = 0;
                    this.parent.parent.audioFiles.sounds.kick.play();
                } else if (item.kickable && item.xVel != 0) {
                    this.plopDeath();
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
        if (this.type === "podoboo" && this.top > this.parent.parent.screensize.height) {
            this.yVel = this.yVelInitial;
            return;
        }

        // Screen edges
        if (this.right + 4 * this.blocksize < 0 || this.left - 4 * this.blocksize > this.parent.parent.screensize.width || this.top > this.parent.parent.screensize.height) {
            this.destroy();
        }

        if (!this.collision) return;

        if (this.parent.worldElements.rectangles) this.collisionCheckRectangles(this.parent.worldElements.rectangles);
        if (this.parent.worldElements.platforms) this.collisionCheckRectangles(this.parent.worldElements.platforms);
        if (this.parent.worldElements.steps) this.collisionCheckSteps(this.parent.worldElements.steps);
        if (this.parent.worldElements.tiles) this.collisionCheckRectangles(this.parent.worldElements.tiles);
        if (this.parent.worldElements.pipes) this.collisionCheckRectangles(this.parent.worldElements.pipes);
        if (this.parent.worldElements.cannons) this.collisionCheckRectangles(this.parent.worldElements.cannons);
        if (this.parent.worldElements.flags) this.collisionCheckRectangles(this.parent.worldElements.flags);
        if (this.parent.worldElements.enemies) this.collisionCheckEnemies(this.parent.worldElements.enemies);
        //TODO: Reflect off items

        // KoopaParatroopa up-down-movement
        if (this.type === "koopaParatroopa" && (this.bottom > this.yInitial + 3 * this.blocksize || this.top < this.yInitial - 3 * this.blocksize)) this.yVel *= -1;

    }

    setSprite() {
        if (this.type === "podoboo") {
            this.sY = (this.yVel > 0) ? 640 : 720;
            return;
        }

        if (this.animate && this.parent.parent.frame % this.spriteUpdateRate === 0) {
            this.frame = (this.frame + 1) % this.sequence.length;
            this.sX = spriteOffsets.enemies.type[this.type].x + this.sequence[this.frame].x;
            this.sY = spriteOffsets.enemies.type[this.type].y + spriteOffsets.enemies.theme[this.theme].y + this.sequence[this.frame].y;
        }
        
        this.sY = spriteOffsets.enemies.type[this.type].y + spriteOffsets.enemies.theme[this.theme].y;

        if (this.animate) this.sY += this.sequence[this.frame].y


        if (!this.facingRight) {
            this.sY += this.facingLeftYOffset;
        }
    }

    update() {
        if (!this.onScreen) return;

        if (this.despawnTimer > 0) {
            this.despawnTimer--;
            if (this.despawnTimer === 0) {
                this.destroy();
            }
        }

        if (this.kickable) {
            this.shellTime++;
            if (this.shellTime === 360 && this.type === "koopaShell") {
                this.sX += 80;
            } else if (this.shellTime >= 480) {
                if (this.type === "koopaShell") {
                    this.type = "koopaTroopa";
                    this.y -= this.h * this.blocksize;
                } else {
                    this.type = "buzzyBeetle";
                }
                this.setProperties();
            }
        }

        if (this.spawnObject) {
            this.spawnObjectCooldown--;
            if (this.spawnObjectCooldown === 0) {
                this.parent.spawnObject(this.x, this.y, this.spawnObject);
                this.spawnObjectCooldown = this.spawnObjectCooldownInitial;
            }
        }

        if (this.jumpForce) {
            this.jumpCooldown--;
            if (this.jumpCooldown === 0) {
                this.jump();
                this.jumpCooldown = this.jumpCooldownInitial;
            }
        }

        this.updatePosition();
        this.collisionCheck();
        this.setSprite();
    }

    scroll(deltaX) {
        if (this.type === "lakitu" && this.onScreen) return;
        this.x -= deltaX;
        this.xOld -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        if (!this.onScreen) return;
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class Bowser {
    constructor(parent, x, y) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.needsUpdate = true;
        this.gravity = 1.5;
        this.frame = 0;
        this.x = x;
        this.xInitial = this.x;
        this.y = y;
        this.yInitial = this.y;
        this.w = 2;
        this.h = 2;
        this.sX = 3280;
        this.sY = 160;
        this.xVel = -3;
        this.sprites = enemySprites;
        this.hitpoints = 5;
        this.flameShootTimer = 130;
        this.jumpTimer = 150;
        this.frames = [0, 160, 320, 480];
        this.jumping = false;
        this.destroyWhenLeavingScreen = true;

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
        }

        this.updateBoundingBox();
    }

    updateBoundingBox() {
        this.left = this.x;
        this.right = this.x + this.w * this.blocksize;

        this.hitboxHead = {top: this.y + 10, bottom: this.y + 100, left: this.x, right: this.x + this.blocksize};
        this.hitboxTail = {top: this.y + 50, bottom: this.y + 140, left: this.x + this.blocksize, right: this.x + this.blocksize * 2};
    }

    fireballHit() {
        this.hitpoints--;
        if (this.hitpoints <= 0) this.plopDeath();
    }

    plopDeath() {
        this.yVel = -30;
    }

    destroy() {
        const index = this.parent.worldElements.bowsers.indexOf(this);
        this.parent.worldElements.bowsers.splice(index, 1);
    }

    jump() {
        this.jumping = true;
        this.yVel = -25;
    }

    setVelocities() {
        if (this.jumping || this.hitpoints <= 0) {
            this.yVel += this.gravity;
        }
    }

    updatePosition() {
        this.x += this.xVel;

        if (this.x < this.xInitial - this.w * this.blocksize || this.x > this.xInitial) {
            this.xVel *= -1;
        }

        if (this.jumping || this.hitpoints <= 0) {
            this.y += this.yVel;
            if (this.hitpoints <= 0 && this.y > this.parent.parent.screensize.height) {
                this.destroy();
            } else if (this.hitpoints > 0 && this.y >= this.yInitial) {
                this.y = this.yInitial;
                this.jumping = false;
                this.yVel = 0;
            }
        }

        this.updateBoundingBox();
    }

    setSprite() {
        if (this.parent.parent.frame % 10 == 0) {
            this.frame = (this.frame + 1) % this.frames.length;
            this.sX = 3280 + this.frames[this.frame];
        }
    }

    update() {
        if (!this.onScreen) return;

        this.flameShootTimer--;

        if (this.flameShootTimer === 0) {
            this.parent.spawnObject(this.x, this.y, "overworld", "bowserFlame");
            this.flameShootTimer = 130;
        }

        this.jumpTimer--;

        if (this.jumpTimer <= 0) {
            this.jump();
            this.jumpTimer = 150;
        }
        this.setVelocities();
        this.updatePosition();
        this.setSprite();
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.xInitial -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        if (!this.onScreen) return;
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class BowserFlame {
    constructor(parent, x, y) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.needsUpdate = true;
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.w = 1.5;
        this.h = .5;
        this.sX = 3920;
        this.sY = 0;
        this.hitboxOffsetTop = 20;
        this.hitboxOffsetBottom = 0;
        this.hitboxOffsetLeft = 30;
        this.hitboxOffsetRight = 75;
        this.xVel = -5;
        this.sprites = enemySprites;
        this.frames = [0, 40];
        this.onScreen = true;
        this.destroyWhenLeavingScreen = true;
    }

    destroy() {
        const index = this.parent.worldElements.bowserFlames.indexOf(this);
        this.parent.worldElements.bowserFlames.splice(index, 1);
    }

    updateBoundingBox() {
        this.left = this.x;
        this.right = this.x + this.w * this.blocksize;
        this.top = this.y;
        this.bottom = this.y + this.h * this.blocksize;
    }

    updatePosition() {
        this.x += this.xVel;
        this.updateBoundingBox();
    }

    setSprite() {
        if (this.parent.parent.frame % 10 == 0) {
            this.frame = (this.frame + 1) % this.frames.length;
            this.sY = 0 + this.frames[this.frame];
        }
    }

    collisionCheck() {
        if (this.left > this.parent.parent.screensize.width || this.right < 0 || this.top > this.parent.parent.screensize.height) this.destroy();
    }

    update() {
        this.updatePosition();
        this.setSprite();
        this.collisionCheck();
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        if (!this.onScreen) return;
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class Piranha {
    constructor(parent, x, y, theme, once) {
        this.objectName = "Piranha";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = this.parent.gravity;
        this.needsUpdate = true;
        this.frame = 0;
        this.h = 2;
        this.w = 1;
        this.x = x;
        if (this.parent.spawnLocation.x === this.x) {
            this.y = y + this.h * this.blocksize;
        } else {
            this.y = y;
        }
        this.yInitial = y;
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
            this.onScreen = true;
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

    plopDeath() {
        this.collision = false;
        this.animate = false;
        this.xVel = 0;
        this.yVel = -10;
        game.audioFiles.sounds.stomp.currentTime = 0;
        game.audioFiles.sounds.stomp.play();
    }

    destroy() {
        const index = this.parent.worldElements.piranhas.indexOf(this);
        this.parent.worldElements.piranhas.splice(index, 1);
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

        if (!this.canMove && this.y >= this.yInitial + this.h * this.blocksize) {
            return;
        }

        if (this.canMove && this.timeOut > 0) {
            this.timeOut--;
            return;
        }

        this.y += this.yVel;

        if (this.y <= this.yInitial) {
            this.yVel = 3;
            this.timeOut = 90;
        } else if (this.y >= this.yInitial + this.h * this.blocksize) {
            if (this.once) this.destroy();
            this.yVel = -3;
            this.timeOut = 90;
        }

        this.updateBoundingBox();
    }

    setSprite() {
        if (this.parent.parent.frame % 20 === 0) {
            this.frame = (this.frame + 1) % this.sequence.length;
            this.sX = spriteOffsets.enemies.type.piranha.x + this.sequence[this.frame]
        }
    }

    update() {
        if (!this.onScreen) return;
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
        if (!this.onScreen) return;
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class FireBar {
    constructor(parent, x, y, length, counterClockWise, noCenterTile) {
        this.typeName = "FireBar";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.theme = this.parent.theme;
        this.length = length || 6;
        this.w = this.length / 2;
        this.counterClockWise = counterClockWise;
        this.sprites = objectSprites;
        this.sX = 520;
        this.degree = 0;
        this.needsUpdate = true;
        this.updateOffScreen = true;
        this.noCenterTile = noCenterTile;

        if (this.counterClockWise) {
            this.sY = 720;
        } else {
            this.sY = 760;
        }

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
        }
    }

    build() {
        if (!this.noCenterTile) {
            if (!this.parent.worldElements.tiles) this.parent.tiles = [];
            this.parent.worldElements.tiles.push(new Tile(this.parent, this.x, this.y, this.theme, "disabled", true));
        }

        this.parts = [];

        for (let i = 0; i < this.length; i++) {
            this.parts.push({x: 0, y: i * 40, r: i * 40});
        }
    }

    updateBoundingBox() {
        this.centerX = this.x + 40;
        this.centerY = this.y + 40;

        this.left = this.centerX - this.w * this.blocksize;
        this.right = this.centerX + this.w * this.blocksize;

        this.parts.forEach(part => {
            part.left = this.centerX + part.x - 20;
            part.right = this.centerX + part.x + 20;
            part.top = this.centerY + part.y - 20;
            part.bottom = this.centerY + part.y + 20;
        });
    }

    degToRad(degree) {
        return degree * 0.01745329252;
    }

    update() {
        if (this.parent.parent.frame % 5 === 0) {
            this.parts.forEach(part => {
                const rad = this.degToRad(this.degree);

                part.x = Math.sin(rad) * part.r;
                part.y = Math.cos(rad) * part.r;
            });
            
            if (this.counterClockWise) {
                this.degree = (this.degree + 9) % 360;
            } else {
                this.degree = (this.degree - 9) % 360;
            }

            this.updateBoundingBox();
        }
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.updateBoundingBox();
    }

    draw() {
        if (!this.onScreen) return;

        this.parts.forEach(part => {
            ctx.drawImage(this.sprites, this.sX, this.sY, 40, 40, this.centerX + part.x - 20, this.centerY + part.y - 20, 40, 40);
        })
    }
}

class ElevatorPlatform {
    constructor(parent, x, y, w, movementType="falling", type) {
        this.objectName = "ElevatorPlatform";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.needsUpdate = true;
        this.gravity = this.parent.gravity;
        this.x = x;
        this.xOld = this.x;
        this.xInitial = this.x;
        this.y = y;
        this.yInitial = this.y;
        this.yOld = this.y;
        this.w = w || 3;
        this.h = 1;
        this.sprites = objectSprites;
        this.type = type || "default";
        if (this.type === "default") {
            this.sX = 320;
            this.sY = 640;
        } else if (this.type === "cloud") {
            this.sX = 480;
            this.sY = 800;
        }
        this.movementType = movementType;
        this.weightApplied = false;

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

        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.x < this.parent.parent.screensize.width) {
            this.onScreen = true;
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

    destroy() {
        const index = this.parent.elevators.indexOf(this);
        this.parent.elevators.splice(index, 1);
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
        } else if ((this.movementType === "leftRight" || this.movementType === "touchRight") &&
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
        if (!this.onScreen) return;
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
        this.needsUpdate = true;
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

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
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
        const index = this.parent.worldElements.items.indexOf(this);
        this.parent.worldElements.items.splice(index, 1);
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
                item.onScreen &&
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
            if (item.onScreen) this.collisionCheckRectangles(item.parts);
        });
    }

    collisionCheck() {
        // Screen edges
        if (this.right + 4 * this.blocksize < 0 || this.left - 4 * this.blocksize > this.parent.parent.screensize.width || this.top > this.parent.parent.screensize.height) {
            this.destroy();
        }

        if (!this.collision) return;

        if (this.parent.worldElements.rectangles) this.collisionCheckRectangles(this.parent.worldElements.rectangles);
        if (this.parent.worldElements.platforms) this.collisionCheckRectangles(this.parent.worldElements.platforms);
        if (this.parent.worldElements.steps) this.collisionCheckSteps(this.parent.worldElements.steps);
        if (this.parent.worldElements.tiles) this.collisionCheckRectangles(this.parent.worldElements.tiles);
        if (this.parent.worldElements.pipes) this.collisionCheckRectangles(this.parent.worldElements.pipes);
        if (this.parent.worldElements.enemies) this.collisionCheckRectangles(this.parent.worldElements.enemies);
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
        if (!this.onScreen) return;
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.heightToDraw, this.x, this.y, this.w * this.blocksize, this.heightToDraw);
    }
}

class FireBall {
    constructor(parent, x, y) {
        this.parent = parent;
        this.gravity = this.parent.gravity;
        this.blocksize = this.parent.blocksize;
        this.needsUpdate = true;
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
        this.onScreen = true;
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
        const index = this.parent.worldElements.fireballs.indexOf(this);
        this.parent.worldElements.fireballs.splice(index, 1);
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
                item.onScreen &&
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
            if (!item.onScreen) return;
            this.collisionCheckRectangles(item.parts);
        });
    }

    collisionCheckFlags(list) {
        const g = this.parent.parent;

        list.forEach(item => {
            if (item.onScreen &&
                this.left < item.right &&
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
                item.onScreen &&
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

    collisionCheckBowsers(list) {
        list.forEach(item => {
            if ((item.onScreen &&
                this.bottom > item.hitboxHead.top && 
                this.top < item.hitboxHead.bottom && 
                this.left < item.hitboxHead.right && 
                this.right > item.hitboxHead.left) ||
                (this.bottom > item.hitboxTail.top && 
                this.top < item.hitboxTail.bottom && 
                this.left < item.hitboxTail.right && 
                this.right > item.hitboxTail.left))
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

        if (w.worldElements.rectangles) this.collisionCheckRectangles(w.worldElements.rectangles);
        if (w.worldElements.platforms) this.collisionCheckRectangles(w.worldElements.platforms);
        if (w.worldElements.elevatorPlatforms) this.collisionCheckRectangles(w.worldElements.elevatorPlatforms);
        if (w.worldElements.tiles) this.collisionCheckRectangles(w.worldElements.tiles);
        if (w.worldElements.flags) this.collisionCheckFlags(w.worldElements.flags);
        if (w.worldElements.enemies) this.collisionCheckEnemies(w.worldElements.enemies);
        if (w.worldElements.piranhas) this.collisionCheckEnemies(w.worldElements.piranhas);
        if (w.worldElements.pipes) this.collisionCheckRectangles(w.worldElements.pipes);
        if (w.worldElements.steps) this.collisionCheckSteps(w.worldElements.steps);
        if (w.worldElements.bowsers) this.collisionCheckBowsers(w.worldElements.bowsers);
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
        if (!this.onScreen) return;
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class Vine {
    constructor(parent, x, y, needsGrow, h) {
        this.objectName = "Vine";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = 1;
        this.needsGrow = needsGrow;
        if (this.needsGrow) this.needsUpdate = true;
        this.h = h;
        this.theme = "overworld";

        this.parts = [];
        if (this.needsGrow) {
            this.parts.push(new Tile(this, this.x, this.y, this.theme, "vineTop", true));
            this.reachedTop = false;
            this.h = 1;
        } else {
            for (let i = 0; i < this.h; i++) {
                if (i === this.h - 1) this.parts.push(new Tile(this, this.x, this.y - i * this.blocksize, this.theme, "vineTop", true));
                else this.parts.push(new Tile(this, this.x, this.y - i * this.blocksize, this.theme, "vine", true));
            }
            this.reachedTop = true;
        }

        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.onScreen = true;
            this.parts.forEach(part => {
                part.onScreen = true;
            });
        }
    }

    updateBoundingBox() {
        this.left = this.x;
        this.leftOld = this.xOld;
        this.right = this.x + this.w * this.blocksize;
        this.rightOld = this.xOld + this.w * this.blocksize;
        this.top = this.y - (this.h - 1) * this.blocksize;
        this.topOld = this.yOld - (this.h  - 1) * this.blocksize;
        this.bottom = this.y + this.blocksize;
        this.bottomOld = this.yOld + this.blocksize;
    }

    grow() {
        this.parts.forEach(part => {
            part.y -= 80;
            if (part.y <= 0) this.reachedTop = true;
        });
        this.parts.push(new Tile(this, this.x, this.y, this.theme, "vine", true));
        this.h++;
        this.updateBoundingBox();
    }

    update() {
        if (!this.reachedTop && this.parent.parent.frame % 10 === 0) this.grow();
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.parts.forEach(part => {
            part.scroll(deltaX);
        });

        this.updateBoundingBox();
    }

    draw() {
        if (!this.onScreen) return;
        this.parts.forEach(part => {
            part.draw();
        });
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
        this.hitboxOffsetTopDefault = 25;
        this.hitboxOffsetTop = this.hitboxOffsetTopDefault;
        this.hitboxOffsetBottom = 0;
        this.hitboxOffsetCrouchExtra = 60;

        this.facingLeftYOffset = 240;
        this.xVel = 0;
        this.yVel = 0;
        if (this.parent.waterLevel) {
            this.jumpForce = 10;
        } else {
            this.jumpForce = 40;
        }
        this.xVelMaxWalk = 10;
        this.xVelMaxSwim = 5;
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
            swimming: [720, 800, 880, 960, 1040],
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
        this.onVine = false;

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
            this.parent.spawnObject(this.x + this.w * this.blocksize / 2, this.y + this.h * this.blocksize * .25, "overworld", "fireBall");
            this.fireballCooldown = 15;
            this.parent.parent.audioFiles.sounds.fireball.play();
        }
    }

    die() {
        this.yVel = -40;
        this.parent.parent.setTransition("dying");
        this.parent.parent.audioFiles.sounds.marioDie.currentTime = 0;
        this.parent.parent.audioFiles.sounds.marioDie.play();
        this.parent.parent.music.pause();
    }

    gotInjured() {
        if (this.h === 2) {
            this.parent.parent.setTransition("shrinking");
            this.invincibility = 480;
            this.state.current = this.state.normal;
            this.parent.parent.audioFiles.sounds.pipe.currentTime = 0;
            this.parent.parent.audioFiles.sounds.pipe.play();
        } else if (this.invincibility === 0) {
            this.die();
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
        } else if (g.transitionType === "axeReached") {
            if (!w.levelEndLine) console.error("Level is missing worldData.LevelEndLine");
            if (this.right < w.levelEndLine) {
                this.movement.current = this.movement.walking;
                this.xVel = 5;
            } else {
                this.movement.current = this.movement.standing;
                this.xVel = 0;
                g.transition = false;
                g.transitionType = null;
                g.castleEndReached = true;
                setTimeout(() => {
                    g.loadWorld(this.h, this.state.current)
                }, 3000);
            }
        } else if (g.transitionType === "pipeEnterTop") {
            this.collision = false;
            if (g.transitionTimer == 0) {
                g.transition = false;
                g.transitionType = null;
                g.loadWorld(this.h, this.state.current, g.time);
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
                g.loadWorld(this.h, this.state.current, g.time);
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
            if (g.transitionTimer === 0) {
                g.transition = false;
                g.transitionType = null;
                g.gameState.current = g.gameState.preLevel;
                g.frame = 0;
            }
            this.xVel = 0;
            this.yVel += this.gravity;
            this.sX = 480;
            this.sY = 160;

            g.transitionTimer--;
        } else if (g.transitionType === "cutscene121") {
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
        } else if (g.transitionType === "cutscene221") {
            if (g.music.currentTime === 0) {
                g.music.play();
            }
            if (this.left >= 1040) {
                g.audioFiles.sounds.pipe.currentTime = 0;
                g.audioFiles.sounds.pipe.play();
                g.destination = {worldID: 22};
                g.transitionType = "pipeEnterLeft";
                g.transitionTimer = g.transitionTimers[g.transitionType];
            }
            this.movement.current = this.movement.walking;
            this.collision = false;
            this.xVel = 5;
            this.yVel = 0;
        } else if (g.transitionType === "cutscene421") {
            if (g.music.currentTime === 0) {
                g.music.play();
            }
            if (this.left >= 1040) {
                g.audioFiles.sounds.pipe.currentTime = 0;
                g.audioFiles.sounds.pipe.play();
                g.destination = {worldID: 42};
                g.transitionType = "pipeEnterLeft";
                g.transitionTimer = g.transitionTimers[g.transitionType];
            }
            this.movement.current = this.movement.walking;
            this.collision = false;
            this.xVel = 5;
            this.yVel = 0;
        } else if (g.transitionType === "cutscene721") {
            if (g.music.currentTime === 0) {
                g.music.play();
            }
            if (this.left >= 1040) {
                g.audioFiles.sounds.pipe.currentTime = 0;
                g.audioFiles.sounds.pipe.play();
                g.destination = {worldID: 72};
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

        if ((g.transition && g.transitionType != "axeReached") || this.onVine) return;

        // User wants to move right
        if (g.keyStates.right && !g.keyStates.left && !g.keyStates.down) {
            this.facingRight = true;
            if (this.xVel >= 0) {
                if (g.keyStates.sprint && !this.parent.waterLevel) {
                    this.xAccel = this.xAccelSprint;
                    this.xVelMax = this.xVelMaxSprint;
                    if (!this.inAir) this.movement.current = this.movement.running;
                } else {
                    if (this.parent.waterLevel) {
                        this.xVelMax = this.xVelMaxSwim;
                    } else {
                        this.xVelMax = this.xVelMaxWalk;
                    }
                    this.xAccel = this.xAccelWalk;
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
                if (g.keyStates.sprint && !this.parent.waterLevel) {
                    this.xAccel = -this.xAccelSprint;
                    this.xVelMax = -this.xVelMaxSprint;
                    if (!this.inAir) this.movement.current = this.movement.running;
                } else {
                    if (this.parent.waterLevel) {
                        this.xVelMax = -this.xVelMaxSwim;
                    } else {
                        this.xVelMax = -this.xVelMaxWalk;
                    }
                    this.xAccel = -this.xAccelWalk;
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
        } else if (this.right > this.parent.parent.screensize.width) {
            this.x = this.parent.parent.screensize.width - 80;
            this.updateBoundingBox();
        }
    }

    collisionCheckFallingToDeath() {
        if (this.parent.cloudLevel && this.left > this.parent.levelEndLine && this.top > this.parent.parent.screensize.height) {
            this.parent.parent.destination = this.parent.defaultDestination;
            this.parent.parent.loadWorld(this.h, this.state.current);
            return;
        }
        if (this.top > this.parent.parent.screensize.height) {
            this.yVel = 0;
            this.y = 160;
            this.x = 80;
            this.updateBoundingBox();
        }
    }

    collisionCheckTiles(list) {
        const g = this.parent.parent;
        const w = this.parent;

        list.forEach(item => {
            if (!item.onScreen) return;

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
                            w.spawnObject(item.x, item.y - item.blocksize, item.theme, "coinItem");
                            g.coinCollected();
                            item.bounce();
                            item.states.current = item.states.active;
                        } else if (item.states.current === item.states.active) {
                            w.spawnObject(item.x, item.y - item.blocksize, item.theme, "coinItem");
                            g.coinCollected();
                            item.bounce();
                        } else if (item.states.current === item.states.lastHit) {
                            w.spawnObject(item.x, item.y - item.blocksize, item.theme, "coinItem");
                            g.coinCollected();
                            item.bounce();
                            item.type = "disabled";
                            item.setSpriteOffsets()
                        }
                    } else if ((item.type === "blockShiny" || item.type === "block") && !item.item) {
                        if (this.h == 2) {
                            g.audioFiles.sounds.breakBlock.currentTime = 0;
                            g.audioFiles.sounds.breakBlock.play();
                            w.spawnObject(item.x - item.blocksize / 2, item.y - item.blocksize / 2, item.theme, "brokenTileTopLeft");
                            w.spawnObject(item.x + item.blocksize / 2, item.y - item.blocksize / 2, item.theme, "brokenTileTopRight");
                            w.spawnObject(item.x - item.blocksize / 2, item.y + item.blocksize / 2, item.theme, "brokenTileBottomLeft");
                            w.spawnObject(item.x + item.blocksize / 2, item.y + item.blocksize / 2, item.theme, "brokenTileBottomRight");
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
                                w.spawnObject(item.x, item.y, item.item.theme, "fireFlower", true);
                            } else {
                                w.spawnObject(item.x, item.y, item.item.theme, "magicMushroom", true);
                            }
                            g.audioFiles.sounds.powerupAppears.currentTime = 0;
                            g.audioFiles.sounds.powerupAppears.play();
                        } else if (item.item.type === "coinItem") {
                            w.spawnObject(item.x, item.y - item.blocksize, item.item.theme, "coinItem");
                            g.coinCollected();
                        } else if (item.item.type === "vine") {
                            w.spawnObject(item.x, item.y - item.blocksize, "overworld", "vine");
                            g.audioFiles.sounds.powerupAppears.currentTime = 0;
                            g.audioFiles.sounds.powerupAppears.play();
                        } else {
                            w.spawnObject(item.x, item.y, item.item.theme, item.item.type);
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
            if (!item.onScreen) return;
            
            if (item.collision && item.individualCheck) {
                this.collisionCheckTiles(item.parts);
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
            if (!item.onScreen) return;
            
            this.collisionCheckRectangles(item.parts);
        });
    }

    collisionCheckPipes(list) {
        const g = this.parent.parent;

        list.forEach(item => {
            if (!item.onScreen) return;
            
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

    collisionCheckCannons(list) {
        const g = this.parent.parent;

        list.forEach(item => {
            if (!item.onScreen) return;
            
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
            } else if (this.left > item.right + item.canShootThreshold && this.leftOld <= item.right + item.canShootThreshold ||
                this.right < item.left - item.canShootThreshold && this.rightOld >= item.left - item.canShootThreshold)
            {
                item.canShoot = true;
                item.cooldown = 60;
            } 
            else if (this.left < item.right + item.canShootThreshold && this.leftOld >= item.right + item.canShootThreshold ||
                    this.right > item.left - item.canShootThreshold && this.rightOld <= item.left - item.canShootThreshold)
            {
                item.canShoot = false;
                item.cooldown = 60;
            }
        });
    }

    collisionCheckItems(list) {
        list.forEach(item => {
            if (!item.onScreen) return;
            
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
            if (!item.onScreen || !item.collision) return;

            if (this.bottom > item.top + item.hitboxOffsetTop && 
                this.top + this.hitboxOffsetTop < item.bottom - item.hitboxOffsetBottom && 
                this.left + this.hitboxOffsetX < item.right - item.hitboxOffsetX && 
                this.right - this.hitboxOffsetX > item.left + item.hitboxOffsetX) 
            {
                if (this.state.current === this.state.starman && !item.undestructable) {
                    item.plopDeath();
                } else {
                    // Top
                    if (this.bottom > item.top + item.hitboxOffsetTop && 
                        this.bottomOld <= item.top + item.hitboxOffsetTop) 
                    {
                        if (item.stompable) {
                            this.y = item.top - this.h * this.blocksize;
                            this.yOld = this.y;
                            this.yVel = -20;
                            this.updateBoundingBox();

                            if (item.type === "koopaParatroopa") {
                                item.type = "koopaTroopa";
                                item.setSpriteOffsets();
                                item.setProperties();
                                g.audioFiles.sounds.stomp.currentTime = 0;
                                g.audioFiles.sounds.stomp.play();
                            } else if (item.type === "buzzyBeetle") {
                                item.type = "buzzyBeetleShell";
                                item.setSpriteOffsets();
                                item.setProperties();
                                g.audioFiles.sounds.stomp.currentTime = 0;
                                g.audioFiles.sounds.stomp.play();
                            } else if (item.type === "koopaTroopa") {
                                item.type = "koopaShell";
                                item.y += 80;
                                item.setSpriteOffsets();
                                item.setProperties();
                                g.audioFiles.sounds.stomp.currentTime = 0;
                                g.audioFiles.sounds.stomp.play();
                            } else if (item.kickable) {
                                if (item.xVel === 0) {
                                    if (this.left >= item.left) {
                                        item.xVel = -15;
                                    } else {
                                        item.xVel = 15;
                                    }
                                } else {
                                    item.xVel = 0;
                                }
                                g.audioFiles.sounds.kick.currentTime = 0;
                                g.audioFiles.sounds.kick.play();
                            } else if (item.type === "goomba") {
                                item.flatDeath();
                                g.audioFiles.sounds.stomp.currentTime = 0;
                                g.audioFiles.sounds.stomp.play();
                            } else {
                                item.plopDeath();
                                g.audioFiles.sounds.stomp.currentTime = 0;
                                g.audioFiles.sounds.stomp.play();
                            }
                        } else if (this.invincibility === 0) {
                            this.gotInjured();
                        }
                    } else if (item.kickable && item.xVel === 0) {
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
        });
    }

    collisionCheckPiranhas(list) {
        list.forEach(item => {
            if (!item.onScreen) return;
            
            if (this.bottom > item.top + item.hitboxOffsetTop && 
                this.top + this.hitboxOffsetTop < item.bottom - item.hitboxOffsetBottom&& 
                this.left + this.hitboxOffsetX < item.right - item.hitboxOffsetX && 
                this.right - this.hitboxOffsetX > item.left + item.hitboxOffsetX ) 
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

    collisionCheckBowserFlames(list) {
        list.forEach(item => {
            if (!item.onScreen) return;
            
            if (this.bottom > item.top && 
                this.top + this.hitboxOffsetTop < item.bottom - item.hitboxOffsetBottom && 
                this.left + this.hitboxOffsetX < item.right - item.hitboxOffsetRight&& 
                this.right - this.hitboxOffsetX  > item.left + item.hitboxOffsetLeft) 
            {
                this.gotInjured();
            }
        });
    }

    collisionCheckAxes(list) {
        list.forEach(item => {
            if (!item.onScreen) return;
            
            if (this.bottom > item.top && 
                this.top + this.hitboxOffsetTop < item.bottom && 
                this.left + this.hitboxOffsetX < item.right && 
                this.right - this.hitboxOffsetX  > item.left) 
            {
                this.parent.parent.destination = item.destination;
                this.x = item.right;
                this.y = item.top;
                this.yVel = 0;
                this.updateBoundingBox();
                this.parent.parent.setTransition("axeReached");
            }
        });
    }

    collisionCheckBowsers(list) {
        list.forEach(item => {
            if (!item.onScreen) return;
            
            if ((this.bottom > item.hitboxHead.top && 
                this.top + this.hitboxOffsetTop < item.hitboxHead.bottom && 
                this.left + this.hitboxOffsetX < item.hitboxHead.right && 
                this.right - this.hitboxOffsetX  > item.hitboxHead.left) ||
                (this.bottom > item.hitboxTail.top && 
                this.top + this.hitboxOffsetTop < item.hitboxTail.bottom && 
                this.left + this.hitboxOffsetX < item.hitboxTail.right && 
                this.right - this.hitboxOffsetX  > item.hitboxTail.left))
            {
                this.gotInjured();
            }
        });
    }

    collisionCheckFireBars(list) {
        list.forEach(item => {
            if (!item.onScreen) return;
            
            item.parts.forEach(part => {
                if (this.bottom > part.top && 
                    this.top + this.hitboxOffsetTop < part.bottom && 
                    this.left + this.hitboxOffsetX < part.right && 
                    this.right - this.hitboxOffsetX > part.left) 
                {
                    this.gotInjured();
                }
            });
        });
    }

    collisionCheckCoins(list) {
        list.forEach(item => {
            if (!item.onScreen) return;
            
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
            if (!item.onScreen) return;
            
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
            if (!item.onScreen) return;
            
            if (this.right > item.left &&
                this.left < item.right &&
                this.bottom > item.top &&
                this.bottomOld <= item.top)
            {
                if (item.movementType === "falling") {
                    item.y += 10;
                    this.y = this.yOld + 10;
                    this.inAir = false;
                    this.yVel = 0;
                } else {
                    this.y = item.top - this.h * this.blocksize;
                    this.yOld = this.y;
    
                    if (item.movementType === "down") this.yVel = item.yVel;
                    else this.yVel = 0;
    
                    if (item.movementType === "touchRight") item.xVel = 5;
    
                    this.inAir = false;
    
                    this.updateBoundingBox();
                }
            }
        });
    }

    collisionCheckScalePlatforms(list) {
        list.forEach(item => {
            if (!item.onScreen || item.broken) return;

            const speed = item.speed;
            
            const leftPlatform = item.parts[0];
            const rightPlatform = item.parts[1];
            
            if (this.right > leftPlatform.left &&
                this.left < leftPlatform.right &&
                this.bottom > leftPlatform.top &&
                this.bottomOld <= leftPlatform.top)
            {
                this.y = leftPlatform.top - this.h * this.blocksize;
                this.yOld = this.y;
                this.yVel = speed;
                this.inAir = false;
                leftPlatform.y += speed;
                leftPlatform.updateBoundingBox();
                rightPlatform.y -= speed;
                rightPlatform.updateBoundingBox();

                this.updateBoundingBox();
            } else if (this.right > rightPlatform.left &&
                this.left < rightPlatform.right &&
                this.bottom > rightPlatform.top &&
                this.bottomOld <= rightPlatform.top)
            {
                this.y = rightPlatform.top - this.h * this.blocksize;
                this.yOld = this.y;
                this.yVel = speed;
                this.inAir = false;
                rightPlatform.y += speed;
                rightPlatform.updateBoundingBox();
                leftPlatform.y -= speed;
                leftPlatform.updateBoundingBox();

                this.updateBoundingBox();
            }

            if (leftPlatform.y <= item.y + item.blocksize || rightPlatform.y <= item.y + item.blocksize) {
                item.break();
            }
        });
    }

    collisionCheckVines(list) {
        const g = this.parent.parent;

        this.onVine = false;

        list.forEach(item => {
            if (!item.onScreen) return;
            
            if (this.bottom > item.top &&
                this.top < item.bottom &&
                this.right > item.left &&
                this.left < item.right) 
            {
                if (this.bottom < 0) {
                    g.destination = g.world.vineLevel;
                    g.loadWorld(this.h, this.state.current)
                }
                this.onVine = true;
                if (g.keyStates.up && !g.keyStates.down) {
                    this.yVel = -5;
                    this.movement.current = this.movement.crappling;
                } else if (g.keyStates.down && !g.keyStates.up) {
                    this.yVel = 5;
                    this.movement.current = this.movement.crappling;
                } else if (g.keyStates.left && !g.keyStates.right) {
                    this.xVel = -5;
                } else if (g.keyStates.right && !g.keyStates.left) {
                    this.xVel = 5;
                } else {
                    this.yVel = 0;
                    this.xVel = 0;
                }
            }
        });
    }

    collisionCheckTeleportTriggers(list) {
        const g = this.parent.parent;

        list.forEach(item => {
            if (!item.onScreen) return;
            
            if (this.bottom > item.top &&
                this.top < item.bottom &&
                this.right > item.left &&
                this.left < item.right) 
            {
                g.destination = item.destination;
                g.loadWorld(this.h, this.state.current);
            }
        });
    }

    collisionCheckJumpingBoards(list) {
        const hitboxOffsetTop = (this.movement.current === this.movement.crouching) ? this.hitboxOffsetTop + this.hitboxOffsetCrouchExtra : this.hitboxOffsetTop;

        list.forEach(item => {
            if (!item.onScreen) return;

            if (this.bottom > item.top &&
                this.top + hitboxOffsetTop < item.bottom &&
                this.left + this.hitboxOffsetX < item.right &&
                this.right - this.hitboxOffsetX > item.left) 
                {
                // Top
                if (this.bottom > item.top && this.bottomOld <= item.top) {
                    this.y = item.top - this.h * this.blocksize;
                    this.yOld = this.y;
                    this.yVel = item.jumpForce;
                    // this.inAir = false;
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

    collisionCheck() {
        if ((this.parent.parent.transition && this.parent.parent.transitionType != "axeReached") || !this.collision) return;
        this.hitboxOffsetTop = (this.movement.current === this.movement.crouching) ? this.hitboxOffsetTopDefault + this.hitboxOffsetCrouchExtra : this.hitboxOffsetTopDefault;
        this.collisionCheckLeftScreenEdge();
        this.collisionCheckFallingToDeath();
        if (this.parent.worldElements.elevatorPlatforms) this.collisionCheckElevatorPlatforms(this.parent.worldElements.elevatorPlatforms);
        if (this.parent.worldElements.platforms) this.collisionCheckRectangles(this.parent.worldElements.platforms);
        if (this.parent.worldElements.rectangles) this.collisionCheckRectangles(this.parent.worldElements.rectangles);
        if (this.parent.worldElements.steps) this.collisionCheckSteps(this.parent.worldElements.steps);
        if (this.parent.worldElements.tiles) this.collisionCheckTiles(this.parent.worldElements.tiles);
        if (this.parent.worldElements.pipes) this.collisionCheckPipes(this.parent.worldElements.pipes);
        if (this.parent.worldElements.items) this.collisionCheckItems(this.parent.worldElements.items);
        if (this.parent.worldElements.enemies) this.collisionCheckEnemies(this.parent.worldElements.enemies);
        if (this.parent.worldElements.coins) this.collisionCheckCoins(this.parent.worldElements.coins);
        if (this.parent.worldElements.flags) this.collisionCheckFlags(this.parent.worldElements.flags);
        if (this.parent.worldElements.piranhas) this.collisionCheckPiranhas(this.parent.worldElements.piranhas);
        if (this.parent.worldElements.fireBars) this.collisionCheckFireBars(this.parent.worldElements.fireBars);
        if (this.parent.worldElements.bowserFlames) this.collisionCheckBowserFlames(this.parent.worldElements.bowserFlames);
        if (this.parent.worldElements.bowsers) this.collisionCheckBowsers(this.parent.worldElements.bowsers);
        if (this.parent.worldElements.axes) this.collisionCheckAxes(this.parent.worldElements.axes);
        if (this.parent.worldElements.vines) this.collisionCheckVines(this.parent.worldElements.vines);
        if (this.parent.worldElements.teleportTriggers) this.collisionCheckTeleportTriggers(this.parent.worldElements.teleportTriggers);
        if (this.parent.worldElements.cannons) this.collisionCheckCannons(this.parent.worldElements.cannons);
        if (this.parent.worldElements.scalePlatforms) this.collisionCheckScalePlatforms(this.parent.worldElements.scalePlatforms);
        if (this.parent.worldElements.jumpingBoards) this.collisionCheckJumpingBoards(this.parent.worldElements.jumpingBoards);
    }

    setMovement() {
        if (this.parent.parent.transition || this.onVine) return;
        if (this.parent.waterLevel) {
            this.movement.current = this.movement.swimming;
            return;
        }
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
        } else if (this.movement.current === this.movement.swimming) {
            if (g.frame % 5 === 0) {
                this.frame++;
            }
            this.sX = this.frames.swimming[this.frame % this.frames.swimming.length];
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
        if (!this.visible) return;
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
        this.gravity = worldData[this.worldID].gravity || 2.15;
        this.vineLevel = worldData[this.worldID].vineLevel;
        this.end = worldData[this.worldID].width;
        this.levelEndLine = worldData[this.worldID].levelEndLine;
        this.defaultDestination = worldData[this.worldID].defaultDestination;
        this.backgroundColor = worldData[this.worldID].bg || "#63adfe";
        this.waterLevel = worldData[this.worldID].waterLevel;
        this.cloudLevel = worldData[this.worldID].cloudLevel;
        this.hasCheepCheeps = worldData[this.worldID].hasCheepCheeps;
        this.hasBulletBills = worldData[this.worldID].hasBulletBills;
        this.cheepCheepSpawnLine = worldData[this.worldID].cheepCheepSpawnLine;
        this.theme = worldData[this.worldID].theme || "overworld";
        this.spawnLocation = worldData[this.worldID].spawnLocation;

        this.parent.worldNum = worldData[this.worldID].worldNum;
        this.parent.levelNum = worldData[this.worldID].levelNum;

        this.build(this.worldID);

        if (this.destination.scrollOffset) {
            this.scroll(this.destination.scrollOffset);
        }

        if (this.destination.spawnLocation) {
            this.spawnCharacter(this.destination.spawnLocation.x, this.destination.spawnLocation.y);
        } else {
            this.spawnCharacter(this.spawnLocation.x, this.spawnLocation.y);
        }

        if (this.destination.transitionType || worldData[this.worldID].transitionType) {
            this.parent.transition = true;
            this.parent.transitionType = this.destination.transitionType || worldData[this.worldID].transitionType;
            this.parent.transitionTimer = this.parent.transitionTimers[this.parent.transitionType];
        }
    }

    build(worldID) {
        this.worldElements = {};

        for (let key in worldData[worldID].worldElements) {
            this.worldElements[key] = [];
            worldData[worldID].worldElements[key].forEach(element => {
                if (key === "rectangles") this.worldElements.rectangles.push(new Rectangle(this, element.x, element.y, element.w, element.h, element.theme, element.type, element.collision, element.individualCheck));
                else if (key === "platforms") this.worldElements.platforms.push(new Platform(this, element.x, element.y, element.w, element.theme, element.variant));
                else if (key === "steps") this.worldElements.steps.push(new Step(this, element.x, element.y, element.w, element.theme, element.type, element.reversed));
                else if (key === "tiles") this.worldElements.tiles.push(new Tile(this, element.x, element.y, element.theme, element.type, element.collision, element.item));
                else if (key === "hills") this.worldElements.hills.push(new Hill(this, element.x, element.y, element.h, element.theme, element.variant));
                else if (key === "trees") this.worldElements.trees.push(new Tree(this, element.x, element.y, element.theme, element.big));
                else if (key === "clouds") this.worldElements.clouds.push(new Cloud(this, element.x, element.y, element.theme, element.amount));
                else if (key === "vines") this.worldElements.vines.push(new Vine(this, element.x, element.y, element.needsGrow, element.h));
                else if (key === "bushes") this.worldElements.bushes.push(new Bush(this, element.x, element.y, element.theme, element.amount));
                else if (key === "pipes") this.worldElements.pipes.push(new Pipe(this, element.x, element.y, element.size, element.theme, element.opening, element.piranha, element.isWarp, element.destination));
                else if (key === "castles") this.worldElements.castles.push(new Castle(this, element.x, element.y, element.theme, element.name));
                else if (key === "enemies") this.worldElements.enemies.push(new Enemy(this, element.x, element.y, element.theme, element.type, element.facingRight));
                else if (key === "coins") this.worldElements.coins.push(new Coin(this, element.x, element.y, element.theme));
                else if (key === "elevatorPlatforms") this.worldElements.elevatorPlatforms.push(new ElevatorPlatform(this, element.x, element.y, element.w, element.movementType, element.type));
                else if (key === "flags") this.worldElements.flags.push(new Flag(this, element.x, element.y, element.h, element.theme, element.destination));
                else if (key === "piranhas") this.worldElements.piranhas.push(new Piranha(this, element.x, element.y, element.theme, element.once));
                else if (key === "fireBars") this.worldElements.fireBars.push(new FireBar(this, element.x, element.y, element.length, element.counterClockWise, element.noCenterTile));
                else if (key === "bowsers") this.worldElements.bowsers.push(new Bowser(this, element.x, element.y));
                else if (key === "axes") this.worldElements.axes.push(new Axe(this, element.x, element.y, element.destination));
                else if (key === "scalePlatforms") this.worldElements.scalePlatforms.push(new ScalePlatform(this, element.x, element.y, element.w, element.theme, element.ropeStart, element.ropeW, element.platformLeft, element.platformRight));
                else if (key === "teleportTriggers") this.worldElements.teleportTriggers.push(new TeleportTrigger(this, element.x, element.y, element.w, element.h, element.destination));
                else if (key === "cannons") this.worldElements.cannons.push(new Cannon(this, element.x, element.y, element.theme));
                else if (key === "jumpingBoards") this.worldElements.jumpingBoards.push(new JumpingBoard(this, element.x, element.y, element.theme));
            });
        }
    }

    spawnCharacter(x, y) {
        this.character = new Character(this, x, y - this.parent.currentHeight * this.blocksize, this.parent.currentHeight, this.parent.currentCharacterState);
    }

    spawnObject(x, y, theme, type) {
        if (type === "spinyEgg" || type === "hammer" || this.type === "cheepCheep") {
            if (!this.worldElements.enemies) this.worldElements.enemies = [];
            this.worldElements.enemies.push(new Enemy(this, x, y, theme, type));
        } else if (type === "coinItem" || type === "fireFlower" || type === "magicMushroom" || type === "starman" || type === "oneUp" || type === "brokenTileTopLeft" || type === "brokenTileTopRight" || type === "brokenTileBottomLeft" || type === "brokenTileBottomRight") {
            if (!this.worldElements.items) this.worldElements.items = [];
            this.worldElements.items.push(new Item(this, x, y, theme, type));
        } else if (type === "bowserFlame") {
            if (!this.worldElements.bowserFlames) this.worldElements.bowserFlames = [];
            this.worldElements.bowserFlames.push(new BowserFlame(this, x, y));
            this.parent.audioFiles.sounds.bowserFire.currentTime = 0;
            this.parent.audioFiles.sounds.bowserFire.play();
        } else if (type === "fireBall") {
            if (!this.worldElements.fireballs) this.worldElements.fireballs = [];
            this.worldElements.fireballs.push(new FireBall(this, x, y));
        } else if (type === "vine") {
            if (!this.worldElements.vines) this.worldElements.vines = [];
            this.worldElements.vines.push(new Vine(this, x, y, true));
        }
    }

    update() {
        if (this.parent.transition) {
            if (this.worldElements.flags) {
                this.worldElements.flags.forEach(flag => {
                    flag.update();
                });
            }
        } else {
            if (this.hasCheepCheeps && this.character.left > this.cheepCheepSpawnLine && this.parent.frame % 180 === 0) {
                this.spawnObject(this.character.x + 160, 1000, "castle", "cheepCheep");
            }
            if (this.hasBulletBills && this.parent.frame % 180 === 0) {
                const y = Math.floor(Math.random() * this.parent.screensize.height);
                this.spawnObject(this.parent.screensize.width, y, this.theme, "bulletBill");
            }
            for (let key in this.worldElements) {
                this.worldElements[key].forEach(item => {
                    if (item.needsUpdate) {
                        item.update();
                    }
                });
            };
        }
        if (this.character) this.character.update();
    }

    scroll(deltaX) {
        this.end -= deltaX;
        this.levelEndLine -= deltaX;
        this.cheepCheepSpawnLine -= deltaX;

        for (let key in this.worldElements) {
            this.worldElements[key].forEach(element => {
                element.scroll(deltaX);
                if (!element.onScreen && element.left < this.parent.screensize.width && element.right > 0) {
                    element.onScreen = true;
                    if (element.parts) {
                        element.parts.forEach(part => {
                            part.onScreen = true;
                        });
                    }
                } else if (element.onScreen && element.right < 0) {
                    if (element.destroyWhenLeavingScreen) element.destroy();
                    else element.onScreen = false;
                    if (element.parts) {
                        element.parts.forEach(part => {
                            part.onScreen = false;
                        });
                    }
                }
            });
        }
        
        if (this.character) this.character.scroll(deltaX);
    }

    draw() {
        // Background
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.parent.screensize.width, this.parent.screensize.height);

        if (this.waterLevel) {
            ctx.fillStyle = "#4242ff";
            ctx.fillRect(0, 200, this.parent.screensize.width, this.parent.screensize.height);
        }

        if (this.worldElements.hills) {
            this.worldElements.hills.forEach(hill => {
                hill.draw();
            });
        }
        if (this.worldElements.bushes) {
            this.worldElements.bushes.forEach(bush => {
                bush.draw();
            });
        }
        if (this.worldElements.trees) {
            this.worldElements.trees.forEach(tree => {
                tree.draw();
            });
        }
        if (this.worldElements.clouds) {
            this.worldElements.clouds.forEach(cloud => {
                cloud.draw();
            });
        }
        if (this.worldElements.vines) {
            this.worldElements.vines.forEach(vine => {
                vine.draw();
            });
        }
        if (this.worldElements.castles) {
            this.worldElements.castles.forEach(castle => {
                castle.draw();
            });
        }
        if (this.worldElements.piranhas) {
            this.worldElements.piranhas.forEach(piranha => {
                piranha.draw();
            });
        }
        if (this.worldElements.cannons) {
            this.worldElements.cannons.forEach(cannon => {
                cannon.draw();
            });
        }
        if (this.worldElements.rectangles) {
            this.worldElements.rectangles.forEach(rectangle => {
                rectangle.draw();
            });
        }
        if (this.worldElements.platforms) {
            this.worldElements.platforms.forEach(platform => {
                platform.draw();
            });
        }
        if (this.worldElements.elevatorPlatforms) {
            this.worldElements.elevatorPlatforms.forEach(elevatorPlatform => {
                elevatorPlatform.draw();
            });
        }
        if (this.worldElements.steps) {
            this.worldElements.steps.forEach(step => {
                step.draw();
            });
        }
        if (this.worldElements.jumpingBoards) {
            this.worldElements.jumpingBoards.forEach(jumpingBoard => {
                jumpingBoard.draw();
            });
        }
        if (this.worldElements.tiles) {
            this.worldElements.tiles.forEach(tile => {
                tile.draw();
            });
        }
        if (this.worldElements.axes) {
            this.worldElements.axes.forEach(axe => {
                axe.draw();
            });
        }
        if (this.worldElements.flags) {
            this.worldElements.flags.forEach(flag => {
                flag.draw();
            });
        }
        if (this.worldElements.coins) {
            this.worldElements.coins.forEach(coin => {
                coin.draw();
            });
        }
        if (this.worldElements.enemies) {
            this.worldElements.enemies.forEach(enemy => {
                enemy.draw();
            });
        }
        if (this.worldElements.items) {
            this.worldElements.items.forEach(item => {
                item.draw();
            });
        }
        if (this.character) this.character.draw();
        if (this.worldElements.fireballs) {
            this.worldElements.fireballs.forEach(fireball => {
                fireball.draw();
            });
        }
        if (this.worldElements.pipes) {
            this.worldElements.pipes.forEach(pipe => {
                pipe.draw();
            });
        }
        if (this.worldElements.fireBars) {
            this.worldElements.fireBars.forEach(fireBar => {
                fireBar.draw();
            });
        }
        if (this.worldElements.bowsers) {
            this.worldElements.bowsers.forEach(bowser => {
                bowser.draw();
            });
        }
        if (this.worldElements.bowserFlames) {
            this.worldElements.bowserFlames.forEach(bowserFlame => {
                bowserFlame.draw();
            });
        }
        if (this.worldElements.scalePlatforms) {
            this.worldElements.scalePlatforms.forEach(scalePlatform => {
                scalePlatform.draw();
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
        ctx.fillText(this.parent.name, 80, 10);
        ctx.fillText(score, 80, 60);
    }

    drawCoins() {
        const coins = this.padNumber(this.parent.coins, 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "top"; 
        ctx.fillText("COINS", 720, 10);
        ctx.fillText(coins, 720, 60);
    }

    drawWorld() {
        ctx.textAlign = "center";
        ctx.textBaseline = "top"; 
        ctx.fillText("WORLD", 1200, 10);
        ctx.fillText(`${this.parent.worldNum}-${this.parent.levelNum}`, 1200, 60);
    }

    drawTime() {
        const time = this.padNumber(this.parent.time, 3);
        
        ctx.textAlign = "end";
        ctx.textBaseline = "top"; 
        ctx.fillText("TIME", this.parent.screensize.width - 80, 10);
        ctx.fillText(time, this.parent.screensize.width - 80, 60);
    }

    draw() {
        ctx.font = "60px VT323";
        ctx.fillStyle = "white";
        this.drawScore();
        this.drawCoins();
        this.drawWorld();
        if (this.parent.gameState.current === this.parent.gameState.play) this.drawTime();
    }
}

class Game {
    constructor() {
        this.objectName = "Game";
        this.blocksize = 80;
        this.frame = 0;
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
        this.lives = 3;
        // this.destination = {worldID: "test"};
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
            "shrinking": 7,
            "growing": 7,
            "axeReached": 480,
        };

        this.gameState = {
            current: "menu",
            menu: "menu",
            preLevel: "preLevel",
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

    coinCollected() {
        this.audioFiles.sounds.coin.currentTime = 0;
        this.audioFiles.sounds.coin.play();
        this.score += 200;
        this.coins++;
        if (this.coins === 100) {
            this.lives++
            this.coins = 0;
            this.audioFiles.sounds.oneUp.currentTime = 0;
            this.audioFiles.sounds.oneUp.play();
        }
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

    showMenuScreen() {
        ctx.clearRect(0, 0, this.screensize.width, this.screensize.height);
        ctx.drawImage(this.mainMenuImage, 0, 0, this.screensize.width, this.screensize.height);
        ctx.fillStyle = "white"
        ctx.font = "96px VT323";
        ctx.textAlign = "start";
        ctx.textBaseline = "top"; 
        ctx.fillText("MTC 999999", 920, 750);
    }
    // TODO: Set to 180 delay on final
    showPreLevelScreen() {
        if (this.frame > 0) {
            this.gameState.current = this.gameState.play;
            this.loadWorld();
        }

        ctx.clearRect(0, 0, this.screensize.width, this.screensize.height);
        ctx.drawImage(characterSprites, 0, 160, 80, 80, this.screensize.width / 2 - 160, this.screensize.height / 2, 80, 80);
        ctx.fillStyle = "white"
        ctx.font = "96px VT323";
        ctx.textAlign = "start";
        ctx.textBaseline = "center"; 
        ctx.fillText(`x ${this.lives}`, this.screensize.width / 2, this.screensize.height / 2);
    }

    startGame() {
        this.loadWorld();
    }

    loadWorld(height, state, timeleft) {
        this.frame = 0;
        this.currentHeight = height || 1;
        this.currentCharacterState = state || "normal";
        this.currentWorld = this.destination.worldID;
        this.castleEndReached = false;

        if (timeleft) this.time = timeleft;
        else this.time = worldData[this.currentWorld].timeLimit || 400;

        if (this.time < 100) {
            this.hurryUp = true;
        } else {
            this.hurryUp = false;
        }

        if (!worldData[this.currentWorld]) console.error(`WorldData.${this.currentWorld} does not exist.`);

        if (this.music) this.music.pause();
        
        this.audioFiles.sounds.stageClear.currentTime = 0;

        this.music = this.audioFiles.music[worldData[this.currentWorld].music] || this.audioFiles.music[worldData[this.currentWorld].theme];
        this.music.currentTime = 0;
        this.music.loop = true;
        if (this.hurryUp) this.music.playbackRate = 1.3;
        else this.music.playbackRate = 1;
        this.music.play();

        this.world = new World(this, this.destination);
    }

    // Runs each frame
    update() {
        if (this.gameState.current === this.gameState.menu) {
            this.showMenuScreen();
        } else if (this.gameState.current === this.gameState.preLevel) {
            this.showPreLevelScreen();
        } else if (this.gameState.current === this.gameState.play) {
            this.world.update();
    
            // Scroll screen if player character crossed "magic line"
            if (this.world.character.x > this.scrollLine && this.world.end > this.screensize.width) {
                const deltaX = Math.round(this.world.character.x - this.scrollLine);
                this.world.scroll(deltaX);
            }
            
            if (!this.transition && this.frame % 40 === 0) this.time--;

            if (!this.hurryUp && this.time < 100) {
                this.hurryUp = true;
                this.audioFiles.sounds.warning.currentTime = 0;
                this.audioFiles.sounds.warning.play();
                this.music.pause();
                this.music.currentTime = 0;
                this.music.playbackRate = 1.3;
                this.audioFiles.sounds.warning.addEventListener("ended", () => {
                    this.music.play();
                })
            }
            if (!this.transition && this.time === 0) {
                this.world.character.die();
            }
        }

        this.frame++;
    }

    drawCastleEndText() {
        const text = "Thank you Mario! But our princess is in another castle!";
        ctx.font = "60px VT323";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "center"; 
        ctx.fillText(text, this.screensize.width  / 2, this.screensize.height  / 2);
    }

    draw() {
        if (this.gameState.current === this.gameState.play) this.world.draw();
        if (this.gameState.current === this.gameState.play || this.gameState.current === this.gameState.preLevel) this.statusBar.draw();
        if (this.castleEndReached) this.drawCastleEndText();
    }
}

function stopHere() {
    throw new Error("Halting execution");
}

function handleKeydown(e) {
    if (e.keyCode === 32 && game.gameState.current === game.gameState.play && (!game.world.character.inAir || game.world.waterLevel)) {
        game.world.character.jump();
    } else if (e.keyCode === 37) {
        game.keyStates.left = true;
    } else if (e.keyCode === 38) {
        game.keyStates.up = true;
    } else if (e.keyCode === 39) {
        game.keyStates.right = true;
    } else if (e.keyCode === 40) {
        game.keyStates.down = true; 
    } else if (e.keyCode === 17 && game.gameState.current === game.gameState.play) {
        game.keyStates.sprint = true;
        game.world.character.shoot();
    } else if (e.keyCode === 70) {
        game.toggleFullscreen();
    } else if (e.keyCode === 13 && game.gameState.current === game.gameState.menu) {
        game.gameState.current = game.gameState.preLevel;
        game.frame = 0;
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
    } else if (e.keyCode === 17 && game.gameState.current === game.gameState.play) {
        game.keyStates.sprint = false;
        game.world.character.canShootAgain = true;
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
cvs.addEventListener("dblclick", game.toggleFullscreen);

loop();