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
            water: {x: 0, y: 1440},
            orange: {x:0 , y: 1920}
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
            cannonBottom: {x: 720, y: 80},
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
            },
            platform: {
                x: 320,
                y: 640
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
        }
    }
}

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
            fireBars: [
                {x: 2680, y: 340, w: 7},
            ],
            tiles: [
                {x: 2640, y: 300, type: "disabled", collision: true},
                {x: 80, y: 680, type: "questionBlock", item: {type: "vine"}},
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
                {x: 800, y: 920, type: "buzzyBeetle"},
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
                {x: 15840, y: 120, destination: {worldID: 121, scrollOffset: null, transitionType: "cutscene11"}},
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
        levelEndLine: 12080,
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
    // TODO: Add jumpingBoard, vine to new level
    21: {
        spawnLocation: {
            x: 160,
            y: 1000
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
                {x: 3680, y: 680, size: 4},
                {x: 5920, y: 680, size: 4},
                {x: 8240, y: 680, size: 4, destination: {worldID: 212}},
                {x: 9200, y: 840, size: 2},
                {x: 9760, y: 680, size: 4},
                {x: 10080, y: 760, size: 3},
                {x: 10400, y: 600, size: 5},
                {x: 14080, y: 760, size: 3},
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
            piranhas: [
                {x: 3720, y: 520},
                {x: 5960, y: 520},
                {x: 8280, y: 520},
                {x: 9240, y: 680},
                {x: 9800, y: 520},
                {x: 10120, y: 600},
                {x: 10440, y: 440},
                {x: 14120, y: 600},
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
        }
    },
    // TODO: Fix vine + load new level when falling down at the end, music?
    211: {
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
    221: {
        theme: "overworld",
        spawnLocation: {
            x: 480,
            y: 1000
        },
        transitionType: "cutscene221",
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
    222: {
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
                {x: 240, y: 840}
            ],
            piranhas: [
                {x: 280, y: 680}
            ],
            bushes: [
                {x: 2320, y: 920}
            ]
        }
    },
    // TODO: Water specific fixes (movement, sprint, sprites)
    22: {
        width: 15360,
        gravity: .5,
        theme: "water",
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

                {x: 0, y: 120, w: 78, type: "waterTop"},
                {x: 6400, y: 120, w: 51, type: "waterTop"},
                {x: 10560, y: 120, w: 56, type: "waterTop"},
                
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
    23: {
        width: 18960,
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
        spawnLocation: {
            x: 40, 
            y: 520
        },
        levelEndLine: 12160,
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
    // TODO: Add jumpingBoard
    31: {
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
                {x: 2560, y: 760, size: 3, theme: "castle"},
                {x: 3040, y: 680, size: 4, theme: "castle", destination: {worldID: 311}},
                {x: 4560, y: 760, size: 3, theme: "castle"},
                {x: 5360, y: 840, size: 2, theme: "castle"},
                {x: 8240, y: 680, size: 4, theme: "castle"},
            ],
            piranhas: [
                {x: 2600, y: 600},
                {x: 3080, y: 520},
                {x: 4600, y: 600},
                {x: 5400, y: 680},
                {x: 8280, y: 520},
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
    // TODO: Not sure about music
    311: {
        theme: "underworld",
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
    // TODO: Not sure about music
    312: {
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
                {x: 13520, y: 760, size: 3, theme: "castle"}
            ],
            piranhas: [
                {x: 13560, y: 600}
            ],
            steps: [
                {x: 15360, y: 360, w: 8},
            ],
            flags: [
                {x: 16720, y: 120, theme: "castle", destination: {worldID: 33}},
            ]
        }
    },
    // TODO: Fix movementType "falling"
    33: {
        theme: "overworld",
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
        theme: "castle",
        bg: "#000000",
        width: 12800,
        levelEndLine: 12160,
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
            ],
            pipes: [
                {x: 1680, y: 760, size: 3, opening: "top"},
                {x: 9280, y: 680, size: 4, opening: "top"},
                {x: 10560, y: 680, size: 4, opening: "top", destination: {worldID: 411}},
                {x: 13040, y: 840, opening: "top"},
            ],
            piranhas: [
                {x: 1720, y: 600},
                {x: 9320, y: 520},
                {x: 10600, y: 520},
                {x: 13080, y: 680},
            ],
            steps: [
                {x: 16640, y: 360, w: 8}
            ],
            flags: [
                {x: 18000, y: 120, destination: {worldID: 44}}
            ]
        }
    },
}

class ScalePlatform {
    constructor(parent, x, y, w, theme, platformLeft, platformRight) {
        this.typeName = "ScalePlatform";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.theme = theme || this.parent.theme;
        this.platformLeft = platformLeft;
        this.platformRight = platformRight;
        this.w = w;

        this.build();

        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    build() {
        this.leftPlatform = new Rectangle(this, this.platformLeft.x, this.platformLeft.y, this.platformLeft.w, 1, "overworld", "platform", true);
        this.rightPlatform = new Rectangle(this, this.platformRight.x, this.platformRight.y, this.platformRight.w, 1, "overworld", "platform", true);
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
        this.parent.onScreenElements.scalePlatforms.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.scalePlatforms.indexOf(this);
        this.parent.onScreenElements.scalePlatforms.splice(index, 1);
    }

    scroll(deltaX) {
        this.x -= deltaX;
        this.leftPlatform.scroll(deltaX);
        this.rightPlatform.scroll(deltaX);

        this.updateBoundingBox();
    }

    draw() {
        this.leftPlatform.draw();
        this.rightPlatform.draw();
        const leftRoller = {
            x: this.leftPlatform.x + (this.leftPlatform.w - 1) / 2 * this.blocksize,
            y: this.y,
            sX: spriteOffsets.tiles.theme[this.theme].x + spriteOffsets.tiles.type.rollerLeft.x,
            sY: spriteOffsets.tiles.type.rollerLeft.y
        };
        const rightRoller = {
            x: this.rightPlatform.x + (this.rightPlatform.w - 1) / 2 * this.blocksize,
            y: this.y,
            sX: spriteOffsets.tiles.theme[this.theme].x + spriteOffsets.tiles.type.rollerRight.x,
            sY: spriteOffsets.tiles.type.rollerRight.y
        };
        ctx.drawImage(tileSprites, leftRoller.sX, leftRoller.sY, this.blocksize, this.blocksize, leftRoller.x, leftRoller.y, this.blocksize, this.blocksize);
        ctx.drawImage(tileSprites, rightRoller.sX, rightRoller.sY, this.blocksize, this.blocksize, rightRoller.x, rightRoller.y, this.blocksize, this.blocksize);

        const topRope = {
            length: (rightRoller.x - leftRoller.x - this.blocksize) / this.blocksize,
            x: leftRoller.x + this.blocksize,
            y: this.y,
            sX: spriteOffsets.tiles.theme[this.theme].x + spriteOffsets.tiles.type.ropeHorizontal.x,
            sY: spriteOffsets.tiles.type.ropeHorizontal.y
        }
        for (let i = 0; i < topRope.length; i++) {
            ctx.drawImage(tileSprites, topRope.sX, topRope.sY, this.blocksize, this.blocksize, topRope.x + i * this.blocksize, topRope.y, this.blocksize, this.blocksize);
        }

        const leftRope = {
            length: (this.leftPlatform.y - leftRoller.y - this.blocksize) / this.blocksize,
            x: leftRoller.x,
            y: this.y + this.blocksize,
            sX: spriteOffsets.tiles.theme[this.theme].x + spriteOffsets.tiles.type.rope.x,
            sY: spriteOffsets.tiles.type.rope.y
        }
        for (let i = 0; i < leftRope.length; i++) {
            ctx.drawImage(tileSprites, leftRope.sX, leftRope.sY, this.blocksize, this.blocksize, leftRope.x, leftRope.y + i * this.blocksize, this.blocksize, this.blocksize);
        }

        const rightRope = {
            length: (this.rightPlatform.y - rightRoller.y - this.blocksize) / this.blocksize,
            x: rightRoller.x,
            y: this.y + this.blocksize,
            sX: spriteOffsets.tiles.theme[this.theme].x + spriteOffsets.tiles.type.rope.x,
            sY: spriteOffsets.tiles.type.rope.y
        }
        for (let i = 0; i < rightRope.length; i++) {
            ctx.drawImage(tileSprites, rightRope.sX, rightRope.sY, this.blocksize, this.blocksize, rightRope.x, rightRope.y + i * this.blocksize, this.blocksize, this.blocksize);
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

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
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
        if (this.sprites === objectSprites) return;
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

class Axe {
    constructor(parent, x, y, destination) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
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
        this.parent.onScreenElements.axes.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.axes.indexOf(this);
        this.parent.onScreenElements.axes.splice(index, 1);
    }

    setSprite() {
        if (this.parent.parent.frame % 10 === 0) {
            this.frame = (this.frame + 1) % this.frames.length;
            this.sX = 2160 + this.frames[this.frame];
        }
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
        this.w = this.amount + 2;
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
            this.addToOnScreen();
        }
    }

    build() {
        this.tiles = [];

        if (this.big) {
            this.tiles.push(new Tile(this, this.x, this.y, this.theme, "treeTopBigTop"));
            this.tiles.push(new Tile(this, this.x, this.y + 1 * this.blocksize, this.theme, "treeTopBigBottom"));
            this.tiles.push(new Tile(this, this.x, this.y + 2 * this.blocksize, "overworld", "treeBottom"));
        } else {
            this.tiles.push(new Tile(this, this.x, this.y, this.theme, "treeTopSmall"));
            this.tiles.push(new Tile(this, this.x, this.y + 1 * this.blocksize, "overworld", "treeBottom"));
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
        this.parent.onScreenElements.trees.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.trees.indexOf(this);
        this.parent.onScreenElements.trees.splice(index, 1);
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
        this.movingPiece = new Tile(this, this.x - this.blocksize / 2, this.y + this.blocksize, "overworld", "flagSail");
        this.movingDown = false;

        this.parts = [];

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
                worldCollision: true,
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
                worldCollision: false,
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
                xVel: 1,
                yVel: 0,
                stompable: true,
                shootable: true,
                worldCollision: true,
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
            }
        }
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
            buzzyBeetle: [0, 80],
            hammerBro: [0, 80, 160, 240],
            lakitu: [0, 80],
            spinyEgg: [0, 80],
            spiny: [0, 80],
            bloober: [0, 80],
            cheepCheep: [0, 80]
        }

        this.setSpriteOffsets();
        this.setProperties();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
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
        if (!this.parent.onScreenElements.enemies) this.parent.onScreenElements.enemies = [];
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
        this.frame = 0;
        this.w = this.enemyProperties[this.type].w;
        this.h = this.enemyProperties[this.type].h;
        this.xVel = this.enemyProperties[this.type].xVel;
        this.yVel = this.enemyProperties[this.type].yVel;
        this.yVelInitial = this.enemyProperties[this.type].yVel;
        if (!this.facingRight) this.xVel *= -1;
        this.hitboxOffsetTop = this.enemyProperties[this.type].hitboxOffsetTop;
        this.hitboxOffsetBottom = this.enemyProperties[this.type].hitboxOffsetBottom;
        this.hitboxOffsetX = this.enemyProperties[this.type].hitboxOffsetX;
        this.gravity = this.enemyProperties[this.type].gravity || this.parent.gravity;
        this.stompable = this.enemyProperties[this.type].stompable;
        this.shootable = this.enemyProperties[this.type].shootable;
        this.kickable = this.enemyProperties[this.type].kickable;
        this.undestructable = this.enemyProperties[this.type].undestructable;
        this.worldCollision = this.enemyProperties[this.type].worldCollision;
        if (this.animateSequences[this.type]) {
            this.animate = true;
            this.sequence = this.animateSequences[this.type];
        } else {
            this.animate = false;
            this.sequence = null;
        }
        
        if (this.type === "koopaShell" || this.type === "buzzyBeetleShell") this.shellTime = 0;

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
        if (!this.parent.worldElements.enemies) this.parent.worldElements.enemies = [];
        const enemyIndex = this.parent.worldElements.enemies.indexOf(this);
        this.parent.worldElements.enemies.splice(enemyIndex, 1);

        const index = this.parent.onScreenElements.enemies.indexOf(this);
        this.parent.onScreenElements.enemies.splice(index, 1);
    }

    updatePosition() {
        if (this.destroyTimer > 0) return;
        if (this.type != "koopaParatroopa" && this.type != "lakitu") this.yVel += this.gravity;
        
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;
        this.updateBoundingBox();
    }

    collisionCheckRectangles(list) {
        list.forEach(item => {
            if (item.collision &&
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
                if ((this.type === "koopaShell" || this.type === "buzzyBeetleShell" ) && this.xVel != 0) {
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
        if (this.type === "podoboo" && this.top > this.parent.parent.screensize.height) {
            this.yVel = this.yVelInitial;
            return;
        }

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
        if (this.type === "koopaParatroopa" && (this.bottom > this.yInitial + 3 * this.blocksize || this.top < this.yInitial - 3 * this.blocksize)) this.yVel *= -1;

    }

    setSprite() {
        if (this.type === "podoboo") {
            this.sY = (this.yVel > 0) ? 640 : 720;
            return;
        }

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

        if (this.type === "koopaShell" || this.type === "buzzyBeetleShell") {
            this.shellTime++;

            if (this.type === "koopaShell" && this.shellTime === 360) {
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
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class Bowser {
    constructor(parent, x, y) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
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

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }

        this.updateBoundingBox();
    }

    updateBoundingBox() {
        this.left = this.x;
        this.right = this.x + this.w * this.blocksize;

        this.hitboxHead = {top: this.y + 10, bottom: this.y + 100, left: this.x, right: this.x + this.blocksize};
        this.hitboxTail = {top: this.y + 50, bottom: this.y + 140, left: this.x + this.blocksize, right: this.x + this.blocksize * 2};
    }

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.bowsers.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.bowsers.indexOf(this);
        this.parent.onScreenElements.bowsers.splice(index, 1);
    }

    fireballHit() {
        this.hitpoints--;
        if (this.hitpoints <= 0) this.plopDeath();
    }

    plopDeath() {
        this.yVel = -30;
    }

    destroy() {
        const enemyIndex = this.parent.worldElements.bowsers.indexOf(this);
        this.parent.worldElements.bowsers.splice(enemyIndex, 1);

        const index = this.parent.onScreenElements.bowsers.indexOf(this);
        this.parent.onScreenElements.bowsers.splice(index, 1);
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
        this.flameShootTimer--;

        if (this.flameShootTimer <= 0) {
            this.parent.spawnBowserFlame(this.x, this.y);
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
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class BowserFlame {
    constructor(parent, x, y) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
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
    }

    destroy() {
        const index = this.parent.onScreenElements.bowserFlames.indexOf(this);
        this.parent.onScreenElements.bowserFlames.splice(index, 1);
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
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w * this.blocksize, this.h * this.blocksize, this.x, this.y, this.w * this.blocksize, this.h * this.blocksize);
    }
}

class Piranha {
    constructor(parent, x, y, theme, once) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = this.parent.gravity;
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
    constructor(parent, x, y, length, counterClockWise) {
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

        if (this.counterClockWise) {
            this.sY = 720;
        } else {
            this.sY = 760;
        }

        this.build();
        this.updateBoundingBox();

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
            this.addToOnScreen();
        }
    }

    build() {
        this.centerTile = new Tile(this, this.x, this.y, this.theme, "disabled", true);
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

    addToOnScreen() {
        this.onScreen = true;
        this.parent.onScreenElements.fireBars.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.fireBars.indexOf(this);
        this.parent.onScreenElements.fireBars.splice(index, 1);
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
        this.centerTile.scroll(deltaX);
        this.updateBoundingBox();
    }

    draw() {
        this.centerTile.draw();

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

        if (this.parent.constructor.name === "World" && this.left < this.parent.parent.screensize.width) {
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
        } else if (this.invincibility === 0) {
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
                setTimeout(() => {
                    g.loadWorld(this.h, this.state.current)
                }, 3000);
            }
        } else if (g.transitionType === "pipeEnterTop") {
            this.collision = false;
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
            // this.collision = false;
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
        } else if (g.transitionType === "cutscene11") {
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
        }
    }

    setVelocities() {
        const g = this.parent.parent;

        if ((g.transition && g.transitionType != "axeReached") || this.onVine) return;

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
                        } else if (item.item.type === "vine") {
                            w.spawnVine(item.x, item.y - item.blocksize);
                            g.audioFiles.sounds.powerupAppears.currentTime = 0;
                            g.audioFiles.sounds.powerupAppears.play();
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
                            } else if (item.type === "cheepCheep") {
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
            this.collisionCheckTiles([item.centerTile]);
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

                if (item.movementType === "touchRight") item.xVel = 5;

                this.inAir = false;

                this.updateBoundingBox();
            }
        });
    }

    collisionCheckVines(list) {
        const g = this.parent.parent;

        this.onVine = false;

        list.forEach(item => {
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

    collisionCheck() {
        if ((this.parent.parent.transition && this.parent.parent.transitionType != "axeReached") || !this.collision) return;
        this.hitboxOffsetTop = (this.movement.current === this.movement.crouching) ? this.hitboxOffsetTopDefault + this.hitboxOffsetCrouchExtra : this.hitboxOffsetTopDefault;
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
        if (this.parent.onScreenElements.fireBars) this.collisionCheckFireBars(this.parent.onScreenElements.fireBars);
        if (this.parent.onScreenElements.bowserFlames) this.collisionCheckBowserFlames(this.parent.onScreenElements.bowserFlames);
        if (this.parent.onScreenElements.bowsers) this.collisionCheckBowsers(this.parent.onScreenElements.bowsers);
        if (this.parent.onScreenElements.axes) this.collisionCheckAxes(this.parent.onScreenElements.axes);
        if (this.parent.onScreenElements.vines) this.collisionCheckVines(this.parent.onScreenElements.vines);
    }

    setMovement() {
        if (this.parent.parent.transition || this.onVine) return;
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

    collisionCheckBowsers(list) {
        list.forEach(item => {
            if ((this.bottom > item.hitboxHead.top && 
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

        if (w.onScreenElements.rectangles) this.collisionCheckRectangles(w.onScreenElements.rectangles);
        if (w.onScreenElements.platforms) this.collisionCheckRectangles(w.onScreenElements.platforms);
        if (w.onScreenElements.elevatorPlatforms) this.collisionCheckRectangles(w.onScreenElements.elevatorPlatforms);
        if (w.onScreenElements.tiles) this.collisionCheckRectangles(w.onScreenElements.tiles);
        if (w.onScreenElements.flags) this.collisionCheckFlags(w.onScreenElements.flags);
        if (w.onScreenElements.enemies) this.collisionCheckEnemies(w.onScreenElements.enemies);
        if (w.onScreenElements.piranhas) this.collisionCheckEnemies(w.onScreenElements.piranhas);
        if (w.onScreenElements.pipes) this.collisionCheckRectangles(w.onScreenElements.pipes);
        if (w.onScreenElements.steps) this.collisionCheckSteps(w.onScreenElements.steps);
        if (w.onScreenElements.bowsers) this.collisionCheckBowsers(w.onScreenElements.bowsers);
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

class Vine {
    constructor(parent, x, y, needsGrow, h) {
        this.objectName = "Vine";
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = 1;
        this.needsGrow = needsGrow;
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
            this.addToOnScreen();
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

    addToOnScreen() {
        this.onScreen = true;
        if (!this.parent.onScreenElements.vines) this.parent.onScreenElements.vines = [];
        this.parent.onScreenElements.vines.push(this);
    }

    removeFromOnScreen() {
        this.onScreen = false;
        const index = this.parent.onScreenElements.vines.indexOf(this);
        this.parent.onScreenElements.vines.splice(index, 1);
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
        this.parts.forEach(part => {
            part.draw();
        });
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
        this.cheepCheepSpawnLine = worldData[this.worldID].cheepCheepSpawnLine;
        this.theme = worldData[this.worldID].theme || "overworld";
        this.spawnLocation = worldData[this.worldID].spawnLocation;
        this.needsUpdate = ["rectangles", "flags", "tiles", "elevatorPlatforms", "enemies", "piranhas", "coins", "items", "fireballs", "fireBars", "bowsers", "bowserFlames", "axes", "vines"];

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
                else if (key === "trees") this.worldElements.trees.push(new Tree(this, element.x, element.y, element.theme, element.big));
                else if (key === "clouds") this.worldElements.clouds.push(new Cloud(this, element.x, element.y, element.theme, element.amount));
                else if (key === "vines") this.worldElements.vines.push(new Vine(this, element.x, element.y, element.needsGrow, element.h));
                else if (key === "bushes") this.worldElements.bushes.push(new Bush(this, element.x, element.y, element.theme, element.amount));
                else if (key === "pipes") this.worldElements.pipes.push(new Pipe(this, element.x, element.y, element.size, element.theme, element.opening, element.destination));
                else if (key === "castles") this.worldElements.castles.push(new Castle(this, element.x, element.y, element.theme, element.name));
                else if (key === "enemies") this.worldElements.enemies.push(new Enemy(this, element.x, element.y, element.theme, element.type, element.facingRight));
                else if (key === "coins") this.worldElements.coins.push(new Coin(this, element.x, element.y, element.theme));
                else if (key === "elevatorPlatforms") this.worldElements.elevatorPlatforms.push(new ElevatorPlatform(this, element.x, element.y, element.w, element.movementType, element.type));
                else if (key === "flags") this.worldElements.flags.push(new Flag(this, element.x, element.y, element.h, element.theme, element.destination));
                else if (key === "piranhas") this.worldElements.piranhas.push(new Piranha(this, element.x, element.y, element.theme, element.once));
                else if (key === "fireBars") this.worldElements.fireBars.push(new FireBar(this, element.x, element.y, element.w, element.counterClockWise));
                else if (key === "bowsers") this.worldElements.bowsers.push(new Bowser(this, element.x, element.y));
                else if (key === "axes") this.worldElements.axes.push(new Axe(this, element.x, element.y, element.destination));
                else if (key === "scalePlatforms") this.worldElements.scalePlatforms.push(new ScalePlatform(this, element.x, element.y, element.w, element.theme, element.platformLeft, element.platformRight));
            });
        }
    }

    spawnCharacter(x, y) {
        this.character = new Character(this, x, y - this.parent.currentHeight * this.blocksize, this.parent.currentHeight, this.parent.currentCharacterState);
    }

    spawnFireBall(x, y) {
        if (!this.onScreenElements.fireballs) this.onScreenElements.fireballs = [];
        this.onScreenElements.fireballs.push(new FireBall(this, x, y));
    }

    spawnBowserFlame(x, y) {
        if (!this.onScreenElements.bowserFlames) this.onScreenElements.bowserFlames = [];
        this.onScreenElements.bowserFlames.push(new BowserFlame(this, x, y));
        this.parent.audioFiles.sounds.bowserFire.currentTime = 0;
        this.parent.audioFiles.sounds.bowserFire.play();
    }

    spawnCheepCheep() {
        if (!this.enemies) this.enemies = [];
        this.enemies.push(new Enemy(this, this.character.x + 160, 1000, "castle", "cheepCheep"));
    }

    spawnItem(x, y, theme, type) {
        if (!this.worldElements.items) this.worldElements.items = [];
        this.worldElements.items.push(new Item(this, x, y, theme, type));
    }

    spawnVine(x, y, destination) {
        if (!this.worldElements.vines) this.worldElements.vines = [];
        this.worldElements.vines.push(new Vine(this, x, y, true));
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
            if (this.hasCheepCheeps && this.character.left > this.cheepCheepSpawnLine && this.parent.frame % 180 === 0) {
                this.spawnCheepCheep();
            }
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
        this.cheepCheepSpawnLine -= deltaX;

        for (let key in this.worldElements) {
            this.worldElements[key].forEach(element => {
                element.scroll(deltaX);
                if (!element.onScreen && element.left < this.parent.screensize.width && element.right > 0) {
                    element.addToOnScreen();
                } else if (element.onScreen && element.right < 0) {
                    element.removeFromOnScreen();
                }
            });
        }

        if (this.onScreenElements.fireballs) {
            this.onScreenElements.fireballs.forEach(fireball => {
                fireball.scroll(deltaX);
            });
        }

        if (this.onScreenElements.bowserFlames) {
            this.onScreenElements.bowserFlames.forEach(bowserFlame => {
                bowserFlame.scroll(deltaX);
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
        if (this.onScreenElements.trees) {
            this.onScreenElements.trees.forEach(tree => {
                tree.draw();
            });
        }
        if (this.onScreenElements.clouds) {
            this.onScreenElements.clouds.forEach(cloud => {
                cloud.draw();
            });
        }
        if (this.onScreenElements.vines) {
            this.onScreenElements.vines.forEach(vine => {
                vine.draw();
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
        if (this.onScreenElements.axes) {
            this.onScreenElements.axes.forEach(axe => {
                axe.draw();
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
        if (this.onScreenElements.fireBars) {
            this.onScreenElements.fireBars.forEach(fireBar => {
                fireBar.draw();
            });
        }
        if (this.onScreenElements.bowsers) {
            this.onScreenElements.bowsers.forEach(bowser => {
                bowser.draw();
            });
        }
        if (this.onScreenElements.bowserFlames) {
            this.onScreenElements.bowserFlames.forEach(bowserFlame => {
                bowserFlame.draw();
            });
        }
        if (this.onScreenElements.scalePlatforms) {
            this.onScreenElements.scalePlatforms.forEach(scalePlatform => {
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
        this.drawTime();
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
        this.worldNum = 1;
        this.levelNum = 1;
        this.time = 400;
        this.lives = 3;
        this.destination = {worldID: 41};

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

    loadWorld(height, state) {
        this.frame = 0;
        this.currentHeight = height || 1;
        this.currentCharacterState = state || "normal";
        this.currentWorld = this.destination.worldID;

        if (!worldData[this.currentWorld]) console.error(`WorldData.${this.currentWorld} does not exist.`);

        this.music = this.audioFiles.music[worldData[this.currentWorld].music] || this.audioFiles.music[worldData[this.currentWorld].theme];
        this.music.currentTime = 0;
        this.music.loop = true;
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
        }

        this.frame++;
    }

    draw() {
        if (this.gameState.current === this.gameState.play) this.world.draw();
        if (this.gameState.current === this.gameState.play || this.gameState.current === this.gameState.preLevel) this.statusBar.draw();
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