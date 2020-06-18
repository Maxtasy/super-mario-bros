const cvs = document.querySelector("#game-canvas");
const ctx = cvs.getContext("2d");
const page = document.documentElement;

let fullscreen = false;
const gameVolume = 0.2;

// Load sprites
const characterSprites = new Image();
characterSprites.src = "sprites/character.png";

const tileSprites = new Image();
tileSprites.src = "sprites/tiles.png";

const objectSprites = new Image();
objectSprites.src = "sprites/objects.png";

const enemySprites = new Image();
enemySprites.src = "sprites/enemies.png";

// Load audio files
const musicOverworld = new Audio("audio/music_overworld.wav");
musicOverworld.volume = gameVolume;
const musicUnderworld = new Audio("audio/music_underworld.wav");
musicUnderworld.volume = gameVolume;
const musicCastle = new Audio("audio/music_castle.wav");
musicCastle.volume = gameVolume;
const musicWater = new Audio("audio/music_water.wav");
musicWater.volume = gameVolume;
const musicInvincible = new Audio("audio/music_invincible.wav");
musicInvincible.volume = gameVolume;

const sound1up = new Audio("audio/smb_1-up.wav");
sound1up.volume = gameVolume;
const soundBowserFalls = new Audio("audio/smb_bowserfalls.wav");
soundBowserFalls.volume = gameVolume;
const soundBowserFire = new Audio("audio/smb_bowserfire.wav");
soundBowserFire.volume = gameVolume;
const soundBreakBlock = new Audio("audio/smb_breakblock.wav");
soundBreakBlock.volume = gameVolume;
const soundBump = new Audio("audio/smb_bump.wav");
soundBump.volume = gameVolume;
const soundCoin = new Audio("audio/smb_coin.wav");
soundCoin.volume = gameVolume;
const soundFireball = new Audio("audio/smb_fireball.wav");
soundFireball.volume = gameVolume;
const soundFireworks = new Audio("audio/smb_fireworks.wav");
soundFireworks.volume = gameVolume;
const soundFlagpole = new Audio("audio/smb_flagpole.wav");
soundFlagpole.volume = gameVolume;
const soundGameOver = new Audio("audio/smb_gameover.wav");
soundGameOver.volume = gameVolume;
const soundJumpSmall = new Audio("audio/smb_jump-small.wav");
soundJumpSmall.volume = gameVolume;
const soundJumpSuper = new Audio("audio/smb_jump-super.wav");
soundJumpSuper.volume = gameVolume;
const soundKick = new Audio("audio/smb_kick.wav");
soundKick.volume = gameVolume;
const soundMarioDie = new Audio("audio/smb_mariodie.wav");
soundMarioDie.volume = gameVolume;
const soundPause = new Audio("audio/smb_pause.wav");
soundPause.volume = gameVolume;
const soundPipe = new Audio("audio/smb_pipe.wav");
soundPipe.volume = gameVolume;
const soundPowerup = new Audio("audio/smb_powerup.wav");
soundPowerup.volume = gameVolume;
const soundPowerupAppears = new Audio("audio/smb_powerup_appears.wav");
soundPowerupAppears.volume = gameVolume;
const soundStageClear = new Audio("audio/smb_stage_clear.wav");
soundStageClear.volume = gameVolume;
const soundStomp = new Audio("audio/smb_stomp.wav");
soundStomp.volume = gameVolume;
const soundVine = new Audio("audio/smb_vine.wav");
soundVine.volume = gameVolume;
const soundWarning = new Audio("audio/smb_warning.wav");
soundWarning.volume = gameVolume;
const soundWorldClear = new Audio("audio/smb_world_clear.wav");
soundWorldClear.volume = gameVolume;

const themeOffsetMap = {
    "overworld": 0,
    "underworld": 480,
    "castle": 960,
    "water": 1840,
    "orange": 2320
}

const objectThemeOffsetMap = {
    "overworld": 0,
    "underworld": 720,
    "castle": 1440,
    "water": 2160,
}

const enemyThemeOffsetMap = {
    "overworld": 0,
    "underworld": 320,
    "castle": 640,
    "water": 960,
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
    "treeStump": {
        x: 400,
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
    },
    "flagMovingPiece": {
        x: 640,
        y: 160
    }
}

const animateSequences = {
    "questionMark": [1920, 1920, 2000, 2080, 2000],
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
    ],
    "rectangle5doors": [
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

const enemyProperties = {
    "goomba": {
        sX: 0,
        sY: 80,
        w: 80,
        h: 80,
        hitboxOffsetX: 20,
        hitboxOffsetTop: 30,
        hitboxOffsetBottom: 25,
        frames: [0, 80],
        xVel: 5,
        yVel: 0,
        stompable: true,
        shootable: true,
    },
    "koopaTroopa": {
        sX: 480,
        sY: 0,
        w: 80,
        h: 160,
        hitboxOffsetX: 15,
        hitboxOffsetTop: 85,
        hitboxOffsetBottom: 20,
        frames: [0, 80],
        xVel: 5,
        yVel: 0,
        stompable: true,
        shootable: true,
    },
    "koopaParatroopa": {
        sX: 640,
        sY: 0,
        w: 80,
        h: 160,
        hitboxOffsetX: 15,
        hitboxOffsetTop: 85,
        hitboxOffsetBottom: 20,
        frames: [0, 80],
        xVel: 3,
        yVel: 5,
        stompable: true,
        shootable: true,
    },
    "shell": {
        sX: 800,
        sY: 80,
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
        music: musicOverworld,
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
            {x: 640, y: 840, size: 2, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 2240, y: 840, size: 2, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 3040, y: 760, size: 3, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 3680, y: 680, size: 4, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 4560, y: 680, size: 4, theme: "overworld", opening: "top", canEnter: true, destination: {worldID: 111, scrollOffset: null, spawnLocation: null, transitionType: null}},
            {x: 13040, y: 840, size: 2, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 14320, y: 840, size: 2, theme: "overworld", opening: "top", canEnter: false, destination: null},
        ],
        enemies: [
            {x: 1760, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 3200, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 4080, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 4160, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 6400, y: 280, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 6480, y: 280, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 7760, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 7840, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            // {x: 8560, y: 840, theme: "overworld", type: "greenKoopaTroopa", facingRight: false, stompable: true, shootable: true},
            {x: 9120, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 9200, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 9920, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 10000, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 10240, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 10320, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 13920, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 14000, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
        ],
        elevatorPlatforms: [
            {x: 240, y: 520, w: 3, movementType: "down"},
            {x: 640, y: 40, w: 3, movementType: "up"},
        ],
        // flag: {x: 400, y: 120, w: 1, h: 11, theme: "overworld", destination: { worldID: 121, scrollOffset: null, spawnLocation: {x: 480, y: 1000}, transitionType: "cutscene1" }},
        flag: {x: 15840, y: 120, h: 11, destination: { worldID: 121, scrollOffset: null, spawnLocation: {x: 480, y: 1000}, transitionType: "cutscene1" }},
        castles: [
            {x: 16160, y: 600, name: "small"}
        ]
    },
    //TODO: Add piranha
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
        music: musicOverworld,
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
            {x: 640, y: 840, size: 2, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 2240, y: 840, size: 2, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 3040, y: 760, size: 3, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 3680, y: 680, size: 4, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 4560, y: 680, size: 4, theme: "overworld", opening: "top", canEnter: true, destination: {worldID: 111, scrollOffset: null, spawnLocation: null, transitionType: null}},
            {x: 13040, y: 840, size: 2, theme: "overworld", opening: "top", canEnter: false, destination: null},
            {x: 14320, y: 840, size: 2, theme: "overworld", opening: "top", canEnter: false, destination: null},
        ],
        enemies: [
            {x: 1760, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 3200, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 4080, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 4160, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 6400, y: 280, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 6480, y: 280, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 7760, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 7840, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 8560, y: 840, type: "koopaTroopa"},
            {x: 9120, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 9200, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 9920, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 10000, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 10240, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 10320, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 13920, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
            {x: 14000, y: 920, theme: "overworld", type: "goomba", facingRight: false, stompable: true, shootable: true},
        ],
        flag: {x: 15840, y: 120, w: 1, h: 11, theme: "overworld", destination: { worldID: 121, scrollOffset: null, spawnLocation: {x: 480, y: 1000}, transitionType: "cutscene1" }},
        castles: [
            {x: 16160, y: 600, theme: "overworld", name: "small"}
        ]
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
        rectangles: [
            {x: 0, y: 1000, w: 24, h: 1, theme: "underworld", type: "floor", collision: true},
            
            {x: 0, y: 120, w: 5, h: 11, theme: "underworld", type: "breakable", collision: true},
            {x: 640, y: 120, w: 7, h: 1, theme: "underworld", type: "breakable", collision: true},
            {x: 640, y: 760, w: 7, h: 3, theme: "underworld", type: "breakable", collision: true},
            
            {x: 1520, y: 120, w: 1, h: 9, theme: "underworld", type: "pipeVerticalLeft", collision: true},
            {x: 1600, y: 120, w: 1, h: 11, theme: "underworld", type: "pipeVerticalRight", collision: true},
            
            {x: 1680, y: 120, w: 3, h: 11, theme: "underworld", type: "breakable", collision: true},
        ],
        tiles: [
            {x: 1520, y: 840, theme: "underworld", type: "pipeConnectorTopLeft", collision: true},
            {x: 1520, y: 920, theme: "underworld", type: "pipeConnectorBottomLeft", collision: true},

        ],
        pipes: [
            {x: 1360, y: 840, size: 2, theme: "underworld", opening: "left", canEnter: true, destination: {worldID: 11, scrollOffset: 12400, spawnLocation: {x: 680, y: 1000}, transitionType: "pipeOutTop"}},
        ],
        coins: [
            {x: 720, y: 340, theme: "underworld"},
            {x: 800, y: 340, theme: "underworld"},
            {x: 880, y: 340, theme: "underworld"},
            {x: 960, y: 340, theme: "underworld"},
            {x: 1040, y: 340, theme: "underworld"},
            
            {x: 640, y: 500, theme: "underworld"},
            {x: 720, y: 500, theme: "underworld"},
            {x: 800, y: 500, theme: "underworld"},
            {x: 880, y: 500, theme: "underworld"},
            {x: 960, y: 500, theme: "underworld"},
            {x: 1040, y: 500, theme: "underworld"},
            {x: 1120, y: 500, theme: "underworld"},
            
            {x: 640, y: 660, theme: "underworld"},
            {x: 720, y: 660, theme: "underworld"},
            {x: 800, y: 660, theme: "underworld"},
            {x: 880, y: 660, theme: "underworld"},
            {x: 960, y: 660, theme: "underworld"},
            {x: 1040, y: 660, theme: "underworld"},
            {x: 1120, y: 660, theme: "underworld"},
        ],
    },
    //TODO: Add piranhas
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
        music: musicUnderworld,
        rectangles: [
            // Floor
            {x: 0, y: 1000, w: 81, h: 1, theme: "underworld", type: "floor", collision: true},
            {x: 6640, y: 1000, w: 37, h: 1, theme: "underworld", type: "floor", collision: true},
            {x: 9760, y: 1000, w: 2, h: 1, theme: "underworld", type: "floor", collision: true},
            {x: 10080, y: 1000, w: 12, h: 1, theme: "underworld", type: "floor", collision: true},
            {x: 11600, y: 1000, w: 8, h: 1, theme: "underworld", type: "floor", collision: true},
            {x: 12800, y: 1000, w: 32, h: 1, theme: "underworld", type: "floor", collision: true},
            // Roof
            {x: 480, y: 120, w: 83, h: 1, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 7200, y: 120, w: 48, h: 1, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 12880, y: 120, w: 7, h: 1, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            // Left Wall
            {x: 0, y: 120, w: 1, h: 11, theme: "underworld", type: "breakable", collision: true},

            {x: 1360, y: 920, w: 1, h: 1, theme: "underworld", type: "solid", collision: true},
            {x: 1520, y: 840, w: 1, h: 2, theme: "underworld", type: "solid", collision: true},
            {x: 1680, y: 760, w: 1, h: 3, theme: "underworld", type: "solid", collision: true},
            {x: 1840, y: 680, w: 1, h: 4, theme: "underworld", type: "solid", collision: true},
            {x: 2000, y: 680, w: 1, h: 4, theme: "underworld", type: "solid", collision: true},
            {x: 2160, y: 760, w: 1, h: 3, theme: "underworld", type: "solid", collision: true},
            {x: 2480, y: 760, w: 1, h: 3, theme: "underworld", type: "solid", collision: true},
            {x: 2640, y: 840, w: 1, h: 2, theme: "underworld", type: "solid", collision: true},
            {x: 10960, y: 680, w: 1, h: 4, theme: "underworld", type: "solid", collision: true},
            
            {x: 4160, y: 360, w: 2, h: 5, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 4320, y: 200, w: 2, h: 2, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 4320, y: 680, w: 2, h: 3, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 4640, y: 200, w: 6, h: 2, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 4960, y: 360, w: 2, h: 4, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 4640, y: 680, w: 6, h: 1, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 5280, y: 200, w: 4, h: 2, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 5360, y: 360, w: 1, h: 4, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 5360, y: 680, w: 3, h: 1, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 5760, y: 360, w: 2, h: 3, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 5760, y: 680, w: 2, h: 1, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 6080, y: 200, w: 4, h: 2, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 6080, y: 680, w: 4, h: 1, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 6720, y: 520, w: 6, h: 2, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 9760, y: 760, w: 2, h: 3, theme: "underworld", type: "breakable", collision: true},
            {x: 11600, y: 600, w: 5, h: 1, theme: "underworld", type: "breakable", collision: true, individualCheck: true},

            {x: 12800, y: 760, w: 10, h: 3, theme: "underworld", type: "breakable", collision: true},
            {x: 13600, y: 120, w: 7, h: 11, theme: "underworld", type: "breakable", collision: true},
            {x: 14160, y: 120, w: 10, h: 1, theme: "underworld", type: "breakable", collision: true},
            {x: 15200, y: 120, w: 2, h: 11, theme: "underworld", type: "breakable", collision: true},
            
            {x: 13440, y: 120, w: 1, h: 6, type: "pipeVerticalLeft", collision: true},
            {x: 13520, y: 120, w: 1, h: 8, type: "pipeVerticalRight", collision: true},
        ],
        steps: [
            {x: 10640, y: 680, w: 4, h: 4, theme: "underworld", type: "solid"},
        ],
        tiles: [
            {x: 800, y: 680, type: "questionMark", animate: true, collision: true, itemTheme: "underworld", itemType: "mushroom"},
            {x: 880, y: 680, type: "questionMark", animate: true, collision: true, itemTheme: "underworld", itemType: "coinItem"},
            {x: 960, y: 680, theme: "underworld", type: "questionMark", animate: true, collision: true, itemTheme: "underworld", itemType: "coinItem"},
            {x: 1040, y: 680, theme: "underworld", type: "questionMark", animate: true, collision: true, itemTheme: "underworld", itemType: "coinItem"},
            {x: 1120, y: 680, theme: "underworld", type: "questionMark", animate: true, collision: true, itemTheme: "underworld", itemType: "coinItem"},
            
            {x: 2320, y: 600, theme: "underworld", type: "breakable", animate: false, collision: true, itemTheme: "underworld", itemType: "coinItem"},
            
            {x: 3120, y: 520, theme: "underworld", type: "breakable", animate: false, collision: true},
            {x: 3120, y: 600, theme: "underworld", type: "breakable", animate: false, collision: true},
            {x: 3120, y: 680, theme: "underworld", type: "breakable", animate: false, collision: true},

            {x: 3200, y: 680, theme: "underworld", type: "breakable", animate: false, collision: true},
            
            {x: 3280, y: 520, theme: "underworld", type: "breakable", animate: false, collision: true},
            {x: 3280, y: 600, theme: "underworld", type: "breakable", animate: false, collision: true},
            {x: 3280, y: 680, theme: "underworld", type: "breakable", animate: false, collision: true},
            
            {x: 3360, y: 520, theme: "underworld", type: "breakable", animate: false, collision: true},
            {x: 3440, y: 520, theme: "underworld", type: "breakable", animate: false, collision: true},
            
            {x: 3520, y: 520, theme: "underworld", type: "breakable", animate: false, collision: true},
            {x: 3520, y: 600, theme: "underworld", type: "breakable", animate: false, collision: true},
            {x: 3520, y: 680, theme: "underworld", type: "breakable", animate: false, collision: true},
            
            {x: 3600, y: 680, theme: "underworld", type: "breakable", animate: false, collision: true},
            
            {x: 3680, y: 520, theme: "underworld", type: "breakable", animate: false, collision: true, itemTheme: "underworld", itemType: "star"},
            {x: 3680, y: 600, theme: "underworld", type: "breakable", animate: false, collision: true},
            {x: 3680, y: 680, theme: "underworld", type: "breakable", animate: false, collision: true},
            
            {x: 5520, y: 600, theme: "underworld", type: "breakable", animate: false, collision: true, itemTheme: "underworld", itemType: "mushroom"},
            {x: 5760, y: 600, theme: "underworld", type: "breakable", animate: false, collision: true},
            {x: 5840, y: 600, theme: "underworld", type: "breakable", animate: false, collision: true, itemTheme: "underworld", itemType: "coinItem"},
            
            {x: 7120, y: 120, type: "breakable", collision: true, itemTheme: "underworld", itemType: "1up"},
            
            {x: 12000, y: 600, theme: "underworld", type: "breakable", animate: false, collision: true, itemTheme: "underworld", itemType: "mushroom"},

            {x: 13440, y: 600, type: "pipeConnectorTopLeft"},
            {x: 13440, y: 680, type: "pipeConnectorBottomLeft"},
        ],
        pipes: [
            {x: 8240, y: 760, size: 3, theme: "underworld", opening: "top", canEnter: true, destination: {worldID: 122}},
            {x: 8720, y: 680, size: 4, theme: "underworld", opening: "top", canEnter: false},
            {x: 9200, y: 840, size: 2, theme: "underworld", opening: "top", canEnter: false},
            {x: 13280, y: 600, size: 2, theme: "underworld", opening: "left", canEnter: true, destination: {worldID: 123, transitionType: "pipeOutTop"}},
            {x: 14240, y: 760, size: 3, opening: "top", canEnter: true, destination: {worldID: 41}},
            {x: 14560, y: 760, size: 3, opening: "top", canEnter: true, destination: {worldID: 31}},
            {x: 14880, y: 760, size: 3, opening: "top", canEnter: true, destination: {worldID: 21}},
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
        music: musicOverworld,
        clouds: [
            {x: 560, y: 200, theme: "overworld", amount: 2},
            {x: 1040, y: 520, theme: "overworld", amount: 1},
        ],
        rectangles: [
            {x: 0, y: 1000, w: 24, h: 1, theme: "overworld", type: "floor", animation: false, collision: true},
            {x: 1360, y: 840, w: 1, h: 2, theme: "overworld", type: "pipeVerticalRight", animation: false, collision: false}
        ],
        tiles: [
            {x: 1280, y: 840, theme: "overworld", type: "pipeConnectorTopLeft", collision: true},
            {x: 1280, y: 920, theme: "overworld", type: "pipeConnectorBottomLeft", collision: true},
        ],
        pipes: [
            {x: 1120, y: 840, size: 2, theme: "overworld", opening: "left", canEnter: false, destination: null},
            {x: 1280, y: 680, size: 2, theme: "overworld", opening: "top", canEnter: false, destination: null},
        ],
        castles: [
            {x: 320, y: 600, theme: "overworld", name: "small"}
        ]
    },
    122: {
        theme: "underworld",
        spawnLocation: {
            x: 440,
            y: 120
        },
        bg: "#000000",
        gravity: 2.15,
        music: musicUnderworld,
        rectangles: [
            {x: 0, y: 1000, w: 24, h: 1, theme: "underworld", type: "floor", collision: true},
            {x: 0, y: 120, w: 5, h: 11, theme: "underworld", type: "breakable", collision: true},
            {x: 560, y: 120, w: 10, h: 4, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 560, y: 680, w: 9, h: 1, theme: "underworld", type: "breakable", collision: true, individualCheck: true},
            {x: 1360, y: 120, w: 2, h: 9, theme: "underworld", type: "breakable", collision: true},
            {x: 1680, y: 120, w: 3, h: 11, theme: "underworld", type: "breakable", collision: true},
            {x: 1520, y: 120, w: 1, h: 9, type: "pipeVerticalLeft"},
            {x: 1600, y: 120, w: 1, h: 11, type: "pipeVerticalRight"},
        ],
        tiles: [
            {x: 1520, y: 840, type: "pipeConnectorTopLeft"},
            {x: 1520, y: 920, type: "pipeConnectorBottomLeft"},
            {x: 1280, y: 680, type: "breakable", collision: true, itemTheme: "underworld", itemType: "coinItem"},
        ],
        pipes: [
            {x: 1360, y: 840, size: 2, theme: "underworld", opening: "left", canEnter: true, destination: { worldID: 12, scrollOffset: 8880, spawnLocation: {x: 360, y: 1000}, transitionType: "pipeOutTop" }},
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
    },
    //TODO: Add piranhas
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
        music: musicOverworld,
        rectangles: [
            {x: 0, y: 1000, w: 32, h: 1},
            {x: 1040, y: 360, w: 1, h: 8, type: "solid"},
        ],
        steps: [
            {x: 400, y: 360, w: 8, h: 8}
        ],
        hills: [
            {x: 1280, y: 760, w: 5, h: 3}
        ],
        clouds: [
            {x: 320, y: 120, amount: 2},
            {x: 1920, y: 200, amount: 1},
        ],
        castles: [
            {x: 2080, y: 600, name: "small"}
        ],
        flag: {x: 1760, y: 120, h: 11, destination: {worldID: 13}},
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
        music: musicOverworld,
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
            {x: 11040, y: 680, w: 6, h: 4, type: "solid", collision: true},
            {x: 11200, y: 520, w: 4, h: 2, type: "solid", collision: true},
            {x: 11360, y: 360, w: 2, h: 2, type: "solid", collision: true},
        ],
        tiles: [
            {x: 2640, y: 1000, type: "treeStump"},
            {x: 4720, y: 760, type: "blank", collision: true, itemTheme: "overworld", itemType: "mushroom", secret: true},
        ],
        clouds: [
            {x: 240, y: 200, amount: 2},
            {x: 720, y: 520, amount: 1},
            {x: 1440, y: 120, amount: 2},
            {x: 2800, y: 520, amount: 1},
            {x: 3040, y: 440, amount: 1},
            {x: 3680, y: 840, amount: 1},
            {x: 4080, y: 200, amount: 2},
            {x: 4560, y: 520, amount: 1},
            {x: 5280, y: 120, amount: 2},
            {x: 6080, y: 840, amount: 1},
            {x: 6640, y: 520, amount: 1},
            {x: 6880, y: 440, amount: 1},
            {x: 7520, y: 840, amount: 1},
            {x: 7920, y: 200, amount: 2},
            {x: 9120, y: 120, amount: 2},
            {x: 9920, y: 840, amount: 1},
            {x: 10480, y: 520, amount: 1},
            {x: 10720, y: 440, amount: 1},
            {x: 11360, y: 840, amount: 1},
            {x: 11760, y: 200, amount: 2},
            {x: 12240, y: 520, amount: 1},
            {x: 12960, y: 120, amount: 1},
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
            {x: 0, y: 600, name: "small"},
            {x: 12560, y: 120, name: "small"},
            {x: 12400, y: 520, name: "rectangle5doors"},
        ],
        flag: {x: 12160, y: 120, h: 11, destination: {worldID: 14}}
    },
    14: {},
    21: {},
    22: {},
    23: {},
    24: {},
    31: {},
    32: {},
    33: {},
    34: {},
    41: {},
    42: {},
    43: {},
    44: {},
    51: {},
    52: {},
    53: {},
    54: {},
    61: {},
    62: {},
    63: {},
    64: {},
    71: {},
    72: {},
    73: {},
    74: {},
    81: {},
    82: {},
    83: {},
    84: {},
}

class Tile {
    constructor(parent, x, y, theme, type="floor", animate=false, collision=false, itemTheme=null, itemType=null, secret=false) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = 2.15;
        this.x = x;
        this.y = y;
        this.mainY = this.y;
        this.left = this.x;
        this.right = this.x + this.blocksize;
        this.top = this.y;
        this.bottom = this.y + this.blocksize;
        this.theme = theme || this.parent.theme;
        this.type = type;
        this.animate = animate;
        this.collision = collision;
        this.itemTheme = itemTheme;
        this.itemType = itemType;
        this.content = 1;
        this.bouncing = false;
        if ((this.type === "breakableShiny" || this.type === "breakable") && this.itemType === "coinItem") {
            this.content = 10;
        }
        this.secret = secret;
        
        if (this.type === "flagMovingPiece") {
            this.sprites = objectSprites;
            this.sX = objectTypeOffsetMap[this.type].x;
            this.sY = objectThemeOffsetMap[this.theme] + objectTypeOffsetMap[this.type].y;
        } else {
            this.sprites = tileSprites;
            this.sX = typeOffsetMap[this.type].x;
            this.sY = themeOffsetMap[this.theme] + typeOffsetMap[this.type].y;
        }

        if (this.animate) {
            this.frame = 0;
            this.sequence = animateSequences[this.type];
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
        if (this.y >= this.mainY) {
            this.y = this.mainY;
            this.bouncing = false;
        }
    }

    destroy(tileList) {
        const tileIndex = tileList.indexOf(this);
        tileList.splice(tileIndex, 1);
    }

    updateSpriteOffsets() {
        this.sX = typeOffsetMap[this.type].x;
        this.sY = themeOffsetMap[this.theme] + typeOffsetMap[this.type].y;
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
    constructor(parent, x, y, w, h, theme, type="floor", animate=false, collision=false, individualCheck=null) {
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
        this.type = type;
        this.animate = animate;
        this.collision = collision;
        if (this.type === "floor") this.collision = true;
        this.individualCheck = individualCheck;
        this.sX = typeOffsetMap[this.type].x;
        this.sY = themeOffsetMap[this.theme] + typeOffsetMap[this.type].y;
        this.sprites = tileSprites;

        if (this.individualCheck) {
            this.tiles = [];

            for (let i = 0; i < this.h; i++) {
                for (let j = 0; j < this.w; j++) {
                    this.tiles.push(new Tile(this, this.x + j * this.blocksize, this.y + i * this.blocksize, this.theme, this.type, false, this.collision, false));
                }
            }
        }
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
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = w;
        this.theme = theme || this.parent.theme;
        this.variant = variant || "Leaf";

        this.tiles = [];

        for (let i = 0; i < this.w; i++) {
            let typeName;
            if (i === 0) typeName = `platform${this.variant}Left`;
            else if (i === this.w - 1) typeName = `platform${this.variant}Right`;
            else typeName = `platform${this.variant}`;

            this.tiles.push(new Tile(this, this.x + i * this.blocksize, this.y, this.theme, typeName, false, true));
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

class Hill {
    constructor(parent, x, y, w, h, theme, type="") {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.theme = theme || this.parent.theme;
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
    constructor(parent, x, y, theme, amount=1) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.theme = theme || this.parent.theme;
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
    constructor(parent, x, y, theme, amount=1) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.theme = theme || this.parent.theme;
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
    constructor(parent, x, y, w, h, theme, type="solid", animate=false, collision=true, reversed=false) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.theme = theme || this.parent.theme;
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
    constructor(parent, x, y, h, theme, destination) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.h = h;
        this.theme = theme;
        if (!this.theme) this.theme = this.parent.theme;
        this.destination = destination;

        this.movingPiece = new Tile(this, this.x - this.blocksize / 2, this.y + this.blocksize, this.theme, "flagMovingPiece");
        this.movingDown = false;

        this.parts = [];

        this.parts.push(new Tile(this, this.x, this.y, this.theme, "flagTop", false, true));
        for (let i = 0; i < this.h - 2; i++) {
            this.parts.push(new Tile(this, this.x, this.y + (i + 1) *  this.blocksize, this.theme, "flagPole", false, true));
        }
        this.parts.push(new Tile(this, this.x, this.y + this.h * this.blocksize - this.blocksize, this.theme, "solid", false, true));
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

class Pipe {
    constructor(parent, x, y, size=2, theme, opening="top", canEnter=false, destination=null) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.x = x;
        this.y = y;
        this.size = size;
        this.theme = theme || this.parent.world.theme;
        this.opening = opening;
        this.canEnter = canEnter;
        this.destination = destination;
        this.collision = true;

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
        } else if (this.opening === "left") {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < this.size; j++) {
                    let typeName = null;
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
        this.theme = theme || this.parent.theme;
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

class Coin {
    constructor(parent, x, y, theme) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.theme = theme || this.parent.theme;
        this.sX = objectThemeOffsetMap[this.theme];
        this.sY = 480;
        this.sprites = objectSprites;
        this.sequence = [0, 0, 80, 160, 240, 160];
    }

    setSprite() {
        if (this.parent.parent.frame % 10 === 0) {
            this.frame = (this.frame + 1) % this.sequence.length;
            this.sX = objectThemeOffsetMap[this.theme] + this.sequence[this.frame];
        }
    }

    destroy() {
        soundCoin.currentTime = 0;
        soundCoin.play();
        const coinIndex = this.parent.coins.indexOf(this);
        this.parent.coins.splice(coinIndex, 1);
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

class ElevatorPlatform {
    constructor(parent, x, y, w, movementType="falling") {
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
        if (this.x < this.parent.parent.screensize.width) {
            this.onScreen = true;
        } else {
            this.onScreen = false;
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
        if (this.yVel < 0 && !this.parent.parent.character.inAir && this.parent.parent.character.x + this.parent.parent.character.w > this.x && this.parent.parent.character.x < this.x + this.w * this.blocksize) {
            if (this.y < this.parent.parent.character.y + this.parent.parent.character.h && this.yOld >= this.parent.parent.character.y + this.parent.parent.character.h) {
                this.parent.parent.character.y = this.y - this.parent.parent.character.h;
                this.parent.parent.character.yOld = this.parent.parent.character.y;
                this.parent.parent.character.yVel = 0;
                this.parent.parent.character.inAir = false;
            }
        } else if (this.movementType === "leftRight" 
            && this.parent.parent.character.y + this.parent.parent.character.h == this.y 
            && this.parent.parent.character.xOld + this.parent.parent.character.w > this.xOld && this.parent.parent.character.x < this.xOld + this.w * this.blocksize)
        {
            const deltaX = this.x - this.xOld;
            this.parent.parent.character.x += deltaX;
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
        if (this.x <= this.parent.parent.screensize.width) this.onScreen = true;
    }

    draw() {
        for (let i = 0; i < this.w; i++) {
            ctx.drawImage(this.sprites, this.sX, this.sY, this.blocksize, this.blocksize, this.x + i * this.blocksize, this.y, this.blocksize, this.blocksize);
        }
    }
}

class World {
    constructor(parent, worldID) {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.gravity = this.parent.gravity;
        this.end = worldData[worldID].width;
        this.levelEndLine = worldData[worldID].levelEndLine;
        this.backgroundColor = worldData[worldID].bg;
        this.theme = worldData[worldID].theme;

        this.rectangles = [];
        if (worldData[worldID].rectangles) {
            worldData[worldID].rectangles.forEach(rectangle => {
                this.rectangles.push(new Rectangle(this, rectangle.x, rectangle.y, rectangle.w, rectangle.h, rectangle.theme, rectangle.type, rectangle.animate, rectangle.collision, rectangle.individualCheck));
            });
        }

        this.platforms = [];
        if (worldData[worldID].platforms) {
            worldData[worldID].platforms.forEach(platform => {
                this.platforms.push(new Platform(this, platform.x, platform.y, platform.w, platform.theme, platform.variant));
            });
        }

        this.steps = [];
        if (worldData[worldID].steps) {
            worldData[worldID].steps.forEach(step => {
                this.steps.push(new Step(this, step.x, step.y, step.w, step.h, step.theme, step.type, step.animate, step.collision, step.reversed));
            });
        }

        this.tiles = [];
        if (worldData[worldID].tiles) {
            worldData[worldID].tiles.forEach(tile => {
                this.tiles.push(new Tile(this, tile.x, tile.y, tile.theme, tile.type, tile.animate, tile.collision, tile.itemTheme, tile.itemType, tile.secret));
            });
        }

        this.hills = [];
        if (worldData[worldID].hills) {
            worldData[worldID].hills.forEach(hill => {
                this.hills.push(new Hill(this, hill.x, hill.y, hill.w, hill.h, hill.theme, hill.type));
            });

        }

        this.clouds = [];
        if (worldData[worldID].clouds) {
            worldData[worldID].clouds.forEach(cloud => {
                this.clouds.push(new Cloud(this, cloud.x, cloud.y, cloud.theme, cloud.amount));
            });
        }

        this.bushes = [];
        if (worldData[worldID].bushes) {
            worldData[worldID].bushes.forEach(bush => {
                this.bushes.push(new Bush(this, bush.x, bush.y, bush.theme, bush.amount));
            });
        }

        this.castles = [];
        if (worldData[worldID].castles) {
            worldData[worldID].castles.forEach(castle => {
                this.castles.push(new Castle(this, castle.x, castle.y, castle.theme, castle.name));
            });
        }

        this.enemies = [];
        if (worldData[worldID].enemies) {
            worldData[worldID].enemies.forEach(enemy => {
                this.enemies.push(new Enemy(this, enemy.x, enemy.y, enemy.theme, enemy.type, enemy.facingRight, enemy.stompable, enemy.shootable));
            });
        }

        this.coins = [];
        if (worldData[worldID].coins) {
            worldData[worldID].coins.forEach(coin => {
                this.coins.push(new Coin(this, coin.x, coin.y, coin.theme));
            });
        }

        this.elevatorPlatforms = [];
        if (worldData[worldID].elevatorPlatforms) {
            worldData[worldID].elevatorPlatforms.forEach(elevatorPlatform => {
                this.elevatorPlatforms.push(new ElevatorPlatform(this, elevatorPlatform.x, elevatorPlatform.y, elevatorPlatform.w, elevatorPlatform.movementType));
            });
        }

        if (worldData[worldID].flag) {
            const flagData = worldData[worldID].flag;
            this.flag = new Flag(this, flagData.x, flagData.y, flagData.h, flagData.theme, flagData.destination);
        }
    }

    update() {
        if (this.flag) {
            this.flag.update();
        }

        if (this.parent.transition || this.parent.character.growing > 0 || this.parent.character.shrinking > 0) return;

        this.rectangles.forEach(rectangle => {
            rectangle.update();
        });

        this.tiles.forEach(tile => {
            tile.update();
        });

        this.enemies.forEach(enemy => {
            enemy.update();
        });

        this.coins.forEach(coin => {
            coin.update();
        });

        this.elevatorPlatforms.forEach(elevatorPlatform => {
            elevatorPlatform.update();
        });
    }

    scroll(deltaX) {
        this.end -= deltaX;
        this.levelEndLine -= deltaX;

        this.rectangles.forEach(rectangle => {
            rectangle.scroll(deltaX);
        });
        this.platforms.forEach(platform => {
            platform.scroll(deltaX);
        });
        this.steps.forEach(step => {
            step.scroll(deltaX);
        });
        this.tiles.forEach(tile => {
            tile.scroll(deltaX);
        });
        this.hills.forEach(hill => {
            hill.scroll(deltaX);
        });
        this.clouds.forEach(cloud => {
            cloud.scroll(deltaX);
        });
        this.bushes.forEach(bush => {
            bush.scroll(deltaX);
        });
        this.castles.forEach(castle => {
            castle.scroll(deltaX);
        });
        this.enemies.forEach(enemy => {
            enemy.scroll(deltaX);
        });
        this.coins.forEach(coin => {
            coin.scroll(deltaX);
        });
        this.elevatorPlatforms.forEach(elevatorPlatform => {
            elevatorPlatform.scroll(deltaX);
        });
        if (this.flag)this.flag.scroll(deltaX);
    }

    draw() {
        // Background
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, cvs.width, cvs.height);

        this.hills.forEach(hill => {
            hill.draw();
        });
        this.clouds.forEach(cloud => {
            cloud.draw();
        });
        this.bushes.forEach(bush => {
            bush.draw();
        });
        this.castles.forEach(castle => {
            castle.draw();
        });
        this.rectangles.forEach(rectangle => {
            rectangle.draw();
        });
        this.platforms.forEach(platform => {
            platform.draw();
        });
        this.steps.forEach(step => {
            step.draw();
        });
        this.tiles.forEach(tile => {
            tile.draw();
        });
        this.enemies.forEach(enemy => {
            enemy.draw();
        });
        this.coins.forEach(coin => {
            coin.draw();
        });
        this.elevatorPlatforms.forEach(elevatorPlatform => {
            elevatorPlatform.draw();
        });
        if (this.flag) {
            this.flag.draw();
        }
    }
}

class Character {
    constructor(parent, spawnLocationX, spawnLocationY, height=80, state="normal") {
        this.parent = parent;
        this.blocksize = this.parent.blocksize;
        this.frame = 0;
        this.x = spawnLocationX;
        this.xOld = this.x;
        this.y = spawnLocationY;
        this.yOld = this.y;
        this.w = 80;
        this.h = height;

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
        if (this.parent.transition || this.growing > 0 || this.shrinking > 0) return;
        this.yVel -= this.jumpForce;
        this.inAir = true;
        this.movement.current = this.movement.jumping;
        soundJumpSmall.currentTime = 0;
        soundJumpSmall.play();
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
        if (this.parent.transitionType === "flagReached" && this.y + this.h < 920) {
            this.yVel = 5;
            this.xVel = 0;
            this.movement.current = this.movement.crappling;
        } else if (this.parent.transitionType === "flagReached" && this.y + this.h >= 1000 && this.x + this.w < this.parent.world.levelEndLine) {
            this.yVel = 0;
            this.xVel = 5;
            this.movement.current = this.movement.walking;
        } else if (this.parent.transitionType === "flagReached" && this.x + this.w > this.parent.world.levelEndLine) {
            if (soundStageClear.currentTime === 0) {
                soundStageClear.play();
            }
            this.endmusicPlaying = true;
            this.visible = false;

            if (this.parent.transitionTimer == 0) {
                this.parent.transition = false;
                this.parent.transitionType = null;
                this.parent.loadWorld(this.h, this.state.current);
            }

            this.parent.transitionTimer--;
        } else if (this.parent.transitionType === "pipeEnterTop") {
            if (this.parent.transitionTimer == 0) {
                this.parent.transition = false;
                this.parent.transitionType = null;
                this.parent.loadWorld(this.h, this.state.current);
            }
            this.xVel = 0;
            this.yVel = 3;
            this.movement.current = this.movement.standing;

            this.parent.transitionTimer--;
        } else if (this.parent.transitionType === "pipeOutTop") {
            if (this.parent.transitionTimer == 0) {
                this.parent.transition = false;
                this.parent.transitionType = null;
            }
            this.xVel = 0;
            this.yVel = -3;
            this.movement.current = this.movement.standing;

            this.parent.transitionTimer--;
        } else if (this.parent.transitionType === "pipeEnterLeft") {
            if (this.parent.transitionTimer == 35) this.visible = false;
            if (this.parent.transitionTimer == 0) {
                this.parent.transition = false;
                this.parent.transitionType = null;
                if (this.parent.music) {
                    this.parent.music.pause();
                    this.parent.music.currentTime = 0;
                }
                this.parent.loadWorld(this.h, this.state.current);
            }
            this.xVel = 3;
            this.yVel = 0;
            this.movement.current = this.movement.walking;

            this.parent.transitionTimer--;
        } else if (this.parent.transitionType === "growing") {
            if (this.parent.transitionTimer == 0) {
                this.parent.transition = false;
                this.parent.transitionType = null;
            } else if (this.parent.frame % 5 == 0) {
                this.sX = this.frames.growing[this.parent.transitionTimer - 1].sX;
                this.sY = this.frames.growing[this.parent.transitionTimer - 1].sY;
                this.setHeight(this.frames.growing[this.parent.transitionTimer - 1].h);

                // In which direction is the player looking
                if (!this.facingRight) {
                    this.sY += this.facingLeftYOffset;
                }
                this.parent.transitionTimer--;
            }
        } else if (this.parent.transitionType === "shrinking") {
            if (this.parent.transitionTimer == 0) {
                this.parent.transition = false;
                this.parent.transitionType = null;
                this.invincibility = 60;
            } else if (this.parent.frame % 5 == 0) {
                this.sX = this.frames.shrinking[this.parent.transitionTimer - 1].sX;
                this.sY = this.frames.shrinking[this.parent.transitionTimer - 1].sY;
                this.setHeight(this.frames.shrinking[this.parent.transitionTimer - 1].h);
    
                // In which direction is the player looking
                if (!this.facingRight) {
                    this.sY += this.facingLeftYOffset;
                }
                this.parent.transitionTimer--;
            }
        } else if (this.parent.transitionType === "dying") {
            if (this.parent.transitionTimer == 0) {
                this.parent.transition = false;
                this.parent.transitionType = null;
                this.parent.loadWorld();
            }
            this.xVel = 0;
            this.yVel += this.gravity;
            this.sX = 480;
            this.sY = 160;

            this.parent.transitionTimer--;
        } else if (this.parent.transitionType === "cutscene1") {
            if (this.parent.music.currentTime === 0) {
                this.parent.music.play();
            }
            if (this.x >= 1040) {
                soundPipe.play();
                this.parent.destination = {worldID: 12};
                this.parent.transitionType = "pipeEnterLeft";
                this.parent.transitionTimer = this.parent.transitionTimers[this.parent.transitionType];
            }
            this.movement.current = this.movement.walking;
            this.collision = false;
            this.xVel = 5;
            this.yVel = 0;
        }
    }

    setVelocities() {
        if (this.parent.transition) return;

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
        if (this.yVel >= this.yVelMax) this.yVel = this.yVelMax;

        // When falling off ledge prevent jumping midair
        if (this.yVel > 8) {
            this.inAir = true;
        }
    }

    updatePosition() {
        if (this.parent.transitionType === "growing" || this.parent.transitionType === "shrinking") return;

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
        if (this.y > this.parent.screensize.height) {
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

                    if (tile.secret) tile.secret = false;

                    if (tile.type === "disabled") {
                        soundBump.currentTime = 0;
                        soundBump.play(); 
                    } else if ((tile.type === "breakableShiny" || tile.type === "breakable") && !tile.itemType) {
                        if (this.h == 160) {
                            soundBreakBlock.currentTime = 0;
                            soundBreakBlock.play();
                            this.parent.spawnItem(tile.x - this.blocksize / 2, tile.y - this.blocksize / 2, tile.theme, "brokenTileTopLeft");
                            this.parent.spawnItem(tile.x + this.blocksize / 2, tile.y - this.blocksize / 2, tile.theme, "brokenTileTopRight");
                            this.parent.spawnItem(tile.x - this.blocksize / 2, tile.y + this.blocksize / 2, tile.theme, "brokenTileBottomLeft");
                            this.parent.spawnItem(tile.x + this.blocksize / 2, tile.y + this.blocksize / 2, tile.theme, "brokenTileBottomRight");
                            tile.destroy(tileList);
                        } else {
                            soundBump.currentTime = 0;
                            soundBump.play();
                            tile.bounce();
                        }
                    } else if (tile.itemType) {
                        tile.bounce();
                        // Spawn flower instead of mushroom if we are big
                        if (tile.itemType === "mushroom") {
                            if (this.h !== 80) {
                                this.parent.spawnItem(tile.x, tile.y - this.blocksize, tile.itemTheme, "flower", true);
                            } else {
                                this.parent.spawnItem(tile.x, tile.y - this.blocksize, tile.itemTheme, "mushroom", true);
                            }
                            soundPowerupAppears.currentTime = 0;
                            soundPowerupAppears.play();
                        } else if (tile.itemType === "coinItem") {
                            this.parent.spawnItem(tile.x, tile.y - this.blocksize, tile.itemTheme, "coinItem", true);
                            soundCoin.currentTime = 0;
                            soundCoin.play();
                        } else {
                            this.parent.spawnItem(tile.x, tile.y - this.blocksize, tile.itemTheme, tile.itemType, true);
                            soundPowerupAppears.currentTime = 0;
                            soundPowerupAppears.play();
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
    }

    collisionCheckRectangles() {
        this.parent.world.rectangles.forEach(rectangle => {
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

    collisionCheckPlatforms() {
        this.parent.world.platforms.forEach(platform => {
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

    collisionCheckSteps() {
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
    }

    collisionCheckPipes() {
        this.parent.pipes.forEach(pipe => {
            if (pipe.collision && pipe.opening === "top") {
                if (this.y + this.h > pipe.y && this.y < pipe.y + pipe.size * this.blocksize && this.x < pipe.x + 2 * this.blocksize && this.x + this.w > pipe.x) {
                    // Character entered pipe from the top
                    if (this.y + this.h > pipe.y && this.yOld + this.h <= pipe.y) {
                        if (pipe.canEnter &&
                            this.parent.keyStates.down && !this.parent.keyStates.up && 
                            this.x > pipe.x + this.blocksize * .25 && 
                            this.x + this.w < pipe.x + 2 * this.blocksize - this.blocksize * .25) {
                            this.x = pipe.x + this.blocksize / 2;
                            this.collision = false;
                            this.parent.transition = true;
                            this.parent.transitionType = "pipeEnterTop";
                            this.parent.transitionTimer = this.parent.transitionTimers[this.parent.transitionType];
                            this.parent.destination = pipe.destination;
                            soundPipe.currentTime = 0;
                            soundPipe.play();
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
            } else if (pipe.collision && pipe.opening === "left") {
                if (this.y + this.h > pipe.y && this.y < pipe.y + pipe.size * this.blocksize && this.x < pipe.x + 2 * this.blocksize && this.x + this.w > pipe.x) {
                    // Character entered pipe from the top
                    if (this.y + this.h > pipe.y && this.yOld + this.h <= pipe.y) {
                        this.y = pipe.y - this.h;
                        this.yOld = this.y;
                        this.yVel = 0;
                        this.inAir = false;
                    // Character entered pipe from the left
                    } else if (this.x + this.w > pipe.x && this.xOld + this.w <= pipe.x) {
                        if (pipe.canEnter &&
                            this.parent.keyStates.right && !this.parent.keyStates.left && 
                            this.y + this.h > pipe.y + this.blocksize * 1.25) {
                            this.y = pipe.y + 2* this.blocksize - this.h;
                            this.collision = false;
                            this.parent.transition = true;
                            this.parent.transitionType = "pipeEnterLeft";
                            this.parent.transitionTimer = this.parent.transitionTimers[this.parent.transitionType];
                            this.parent.destination = pipe.destination;
                            soundPipe.currentTime = 0;
                            soundPipe.play();
                        }
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
    }

    collisionCheckItems() {
        this.parent.items.forEach(item => {
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

    collisionCheckEnemies() {
        this.parent.world.enemies.forEach(enemy => {
            if (this.y + this.h > enemy.y + enemy.hitboxOffsetTop && 
                this.y + this.hitboxOffsetTop < enemy.y + enemy.h - enemy.hitboxOffsetBottom && 
                this.x + this.hitboxOffsetX < enemy.x + enemy.w - enemy.hitboxOffsetX && 
                this.x + this.w - this.hitboxOffsetX > enemy.x + enemy.hitboxOffsetX) {
                
                // Character is in star form
                if (this.state.current === this.state.star) {
                    enemy.destroy();
                    soundStomp.currentTime = 0;
                    soundStomp.play();
                } else {
                    // Character entered enemy from the top
                    if (this.y + this.h > enemy.y + enemy.hitboxOffsetTop && this.yOld + this.h <= enemy.y + enemy.hitboxOffsetTop) {
                        this.y = enemy.y - this.h;
                        this.yOld = this.y;
                        this.yVel = -20;
                        soundStomp.currentTime = 0;
                        soundStomp.play();
                        if (enemy.type === "koopaParatroopa") {
                            enemy.type = "koopaTroopa";
                            enemy.setProperties();
                        } else if (enemy.type === "koopaTroopa") {
                            enemy.frame = 0;
                            enemy.type = "shell";
                            enemy.y += 80;
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
                            soundKick.currentTime = 0;
                            soundKick.play();
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
                                soundKick.currentTime = 0;
                                soundKick.play();
                            // Character entered shell from the right
                            } else if (this.x + this.hitboxOffsetX < enemy.x + enemy.w - enemy.hitboxOffsetX && this.xOld + this.hitboxOffsetX >= enemy.x + enemy.w - enemy.hitboxOffsetX) {
                                enemy.xVel = -20;
                                this.x = enemy.x + enemy.w;
                                soundKick.currentTime = 0;
                                soundKick.play();
                            }
                        } else {
                            if (this.h != 80) {
                                this.parent.transitionTimer = this.frames.shrinking.length;
                                this.parent.transition = true;
                                this.parent.transitionType = "shrinking";
                                this.state.current = this.state.normal;
                                soundPipe.currentTime = 0;
                                soundPipe.play();
                            } else {
                                this.yVel = -40;
                                this.parent.transition = true;
                                this.parent.transitionType = "dying";
                                this.parent.transitionTimer = this.parent.transitionTimers.dying;
                                this.parent.music.pause();
                                soundMarioDie.currentTime = 0;
                                soundMarioDie.play();
                            }
                        }
                    }
                }
            }
        });
    }

    collisionCheckCoins() {
        this.parent.world.coins.forEach(coin => {
            if (this.y + this.h > coin.y && this.y < coin.y + this.blocksize && this.x < coin.x + this.blocksize && this.x + this.w > coin.x) {
                coin.destroy();
            }
        });
    }

    collisionCheckFlag() {
        if (this.parent.world.flag) {
            if (this.x + this.w - this.hitboxOffsetX > this.parent.world.flag.x && this.parent.transitionType !== "flagReached") {
                if (this.y + this.h >= 920) {
                    this.x = this.parent.world.flag.x - this.w + this.hitboxOffsetX;
                    this.xOld = this.x;
                    this.xVel = 0;
                } else {
                    this.parent.transitionType = "flagReached";
                    this.parent.transitionTimer = this.parent.transitionTimers[this.parent.transitionType];
                    this.parent.transition = true;
                    this.x = this.parent.world.flag.x;
                    this.parent.destination = this.parent.world.flag.destination;
                    soundFlagpole.currentTime = 0;
                    soundFlagpole.play();
                    musicOverworld.pause();
                    this.parent.world.flag.pullDown();
                }
            }
        }
    }

    collisionCheckElevatorPlatforms() {
        this.parent.world.elevatorPlatforms.forEach(elevatorPlatform => {
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
        if (this.parent.transition || !this.collision) return;
        this.collisionCheckLeftScreenEdge();
        this.collisionCheckFallingToDeath();
        this.collisionCheckRectangles();
        this.collisionCheckPlatforms()
        this.collisionCheckSteps();
        this.collisionCheckTiles(this.parent.world.tiles);
        this.collisionCheckPipes();
        this.collisionCheckItems();
        this.collisionCheckEnemies();
        this.collisionCheckCoins();
        this.collisionCheckFlag();
        this.collisionCheckElevatorPlatforms();
    }

    setMovement() {
        if (this.parent.transition || this.growing > 0 || this.shrinking > 0) return;
        if (this.inAir) this.movement.current = this.movement.jumping;
        else if (this.xVel === 0 && !this.inAir) {
            this.movement.current = this.movement.standing;
        } else if (this.xVel !== 0 && !this.inAir) {
            if (this.parent.keyStates.sprint) {
                this.movement.current = this.movement.running;
            } else {
                this.movement.current = this.movement.walking;
            }
        }
    }

    setSprite() {
        if (this.growing > 0 || this.shrinking > 0 || this.parent.transitionType === "dying") return;

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
                this.starTime--;
                if (this.starTime == 0) {
                    this.state.current = this.state.last;
                    musicInvincible.pause();
                    this.parent.music.currentTime = 0;
                    this.parent.music.play();
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
        if (this.invincibility > 0) this.invincibility--;
        if (this.parent.transition) this.runTransition();
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

class Enemy {
    constructor(parent, x, y, theme, type="goomba", facingRight=false, stompable=true, shootable=true) {
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
        this.type = type;
        this.stompable = stompable;
        this.shootable = shootable
        this.sprites = enemySprites;
        this.facingLeftYOffset = 160;
        this.facingRight = facingRight;
        if (this.x < this.parent.parent.screensize.width) {
            this.onScreen = true;
        } else {
            this.onScreen = false;
        }
        this.setProperties();
    }

    setProperties() {
        this.sX = enemyProperties[this.type].sX;
        this.sY = enemyProperties[this.type].sY + enemyThemeOffsetMap[this.theme];
        this.w = enemyProperties[this.type].w;
        this.h = enemyProperties[this.type].h;
        this.xVel = enemyProperties[this.type].xVel;
        this.yVel = enemyProperties[this.type].yVel;
        if (!this.facingRight) this.xVel *= -1;
        this.hitboxOffsetTop = enemyProperties[this.type].hitboxOffsetTop;
        this.hitboxOffsetBottom = enemyProperties[this.type].hitboxOffsetBottom;
        this.hitboxOffsetX = enemyProperties[this.type].hitboxOffsetX;
        if (enemyProperties[this.type].frames) {
            this.frames = enemyProperties[this.type].frames;
        } else {
            this.frames = null;
        }
    }

    destroy() {
        // Spawn dead body object (item?) in location with 2sec timer to disappear
        const enemyIndex = this.parent.enemies.indexOf(this);
        this.parent.enemies.splice(enemyIndex, 1);
    }

    updatePosition() {
        if (this.type != "koopaParatroopa") this.yVel += this.gravity;
        
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;
    }

    collisionCheck() {
        // Screen edges
        if (this.x + this.w + 2 * this.blocksize < 0 || this.x - 2 * this.blocksize > this.parent.parent.screensize.width || this.y - 2 * this.blocksize > this.parent.parent.screensize.height) {
            this.destroy();
        }
        
        // Rectangles
        this.parent.rectangles.forEach(rectangle => {
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
        
        // Platforms
        this.parent.platforms.forEach(platform => {
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
        
        // Steps
        this.parent.steps.forEach(step => {
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
        
        // Tiles
        this.parent.tiles.forEach(tile => {
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

        // Pipes
        this.parent.parent.pipes.forEach(pipe => {
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

        // KoopaParatroopa up-down-movement
        if (this.type === "koopaParatroopa" && this.y + this.h > this.yInitial + 3 * this.blocksize || this.y < this.yInitial - 3 * this.blocksize) this.yVel *= -1;

        //TODO: Reflect off other enemies
        //TODO: Reflect off items
    }

    setSprite() {
        if (this.frames && this.parent.parent.frame % 10 === 0) {
            this.frame = (this.frame + 1) % this.frames.length;
            this.sX = enemyProperties[this.type].sX + this.frames[this.frame];
        }
        this.sY = enemyProperties[this.type].sY + enemyThemeOffsetMap[this.theme];
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
        if (this.x <= this.parent.parent.screensize.width) this.onScreen = true;
    }

    draw() {
        ctx.drawImage(this.sprites, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
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
        this.hitboxOffsetX = 10;
        this.hitboxOffsetTop = 10;
        this.hitboxOffsetBottom = 15;
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
            this.parent.transitionTimer = this.parent.character.frames.growing.length;
            this.parent.transition = true;
            this.parent.transitionType = "growing";
            soundPowerup.currentTime = 0;
            soundPowerup.play()
        } else if (this.type === "flower" && this.parent.character.h === 160) {
            if (this.parent.character.state.current != this.parent.character.state.star) this.parent.character.state.current = this.parent.character.state.flower;
            this.parent.character.state.last = this.parent.character.state.flower;
            soundPowerup.currentTime = 0;
            soundPowerup.play()
        } else if (this.type === "1up") {
            this.parent.lives++;
            sound1up.currentTime = 0;
            sound1up.play()
        } else if (this.type === "star") {
            this.parent.character.state.last = this.parent.character.state.current;
            this.parent.character.state.current = this.parent.character.state.star;
            this.parent.character.starTime = 61;
            this.parent.music.pause();
            musicInvincible.currentTime = 0;
            musicInvincible.play();
        }
    }

    destroy() {
        const itemIndex = this.parent.items.indexOf(this);
        this.parent.items.splice(itemIndex, 1);
    }

    updatePosition() {
        this.yVel += this.gravity;
        
        this.xOld = this.x;
        this.x += this.xVel;
        this.yOld = this.y;
        this.y += this.yVel;
    }

    collisionCheck() {
        // Screen edges
        if (this.x + this.blocksize < 0 || this.x > this.parent.screensize.width || this.y > this.parent.screensize.height) {
            this.destroy();
        }

        if (!this.collision) return;
        
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
        this.parent.pipes.forEach(pipe => {
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

    setSprite() {
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
    }

    update() {
        if (this.parent.character.growing > 0 || this.parent.character.shrinking > 0) return;
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

class Game {
    constructor() {
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
        this.lives = 3;
        this.currentWorld = 13;

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
        this.spawnLocation = {
            x: null,
            y: null
        };

        this.destination = null;

        this.gameState = {
            current: "menu",
            menu: "menu",
            paused: "paused",
            play: "play"
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

    loadWorld(characterHeight=80, characterState="normal") {
        this.frame = 0;

        if (this.destination) {
            this.currentWorld = this.destination.worldID;

            if (this.destination.spawnLocation) {
                this.spawnLocation.x = this.destination.spawnLocation.x;
                this.spawnLocation.y = this.destination.spawnLocation.y;
            } else {
                this.spawnLocation.x = worldData[this.currentWorld].spawnLocation.x;
                this.spawnLocation.y = worldData[this.currentWorld].spawnLocation.y;
            }

            if (this.destination.scrollOffset) {
                this.scrollOffset = this.destination.scrollOffset;
            } else {
                this.scrollOffset = 0;
            }

            if (this.destination.transitionType) {
                this.transition = true;
                this.transitionType = this.destination.transitionType;
                this.transitionTimer = this.transitionTimers[this.transitionType];
            } else {
                this.transition = false;
                this.transitionType = null;
            }
        } else {
            this.spawnLocation.x = worldData[this.currentWorld].spawnLocation.x;
            this.spawnLocation.y = worldData[this.currentWorld].spawnLocation.y;
            this.scrollOffset = 0;
            this.transition = false;
            this.transitionType = null;
        }

        this.music = worldData[this.currentWorld].music;
        this.gravity = worldData[this.currentWorld].gravity;
        this.world = new World(this, this.currentWorld);

        this.pipes = [];
        if (worldData[this.currentWorld].pipes) {
            worldData[this.currentWorld].pipes.forEach(pipe => {
                this.pipes.push(new Pipe(this, pipe.x, pipe.y, pipe.size, pipe.theme, pipe.opening, pipe.canEnter, pipe.destination, pipe.scrollOffset));
            });
        }

        if (this.scrollOffset) {
            this.world.scroll(this.scrollOffset);
            this.pipes.forEach(pipe => {
                pipe.scroll(this.scrollOffset);
            });
        }

        this.character = new Character(this, this.spawnLocation.x, this.spawnLocation.y - characterHeight, characterHeight, characterState);

        this.items = [];
        this.destination = null;

        if (this.music) {
            this.music.currentTime = 0;
            this.music.play();
            this.music.loop = true;
        }
    }

    spawnItem(x, y, theme, type, collision) {
        this.items.push(new Item(this, x, y, theme, type, collision));
    }
    // Runs each frame
    update() {
        if (this.gameState.current !== this.gameState.play) return;
        this.frame++;

        this.world.update();
        this.character.update();
        this.items.forEach(item => {
            item.update();
        });

        // Scroll screen if player character crossed "magic line"
        if (this.character.x > this.scrollLine && this.world.end > this.screensize.width) {
            const deltaX = Math.round(this.character.x - this.scrollLine);
            this.character.scroll(deltaX);
            this.world.scroll(deltaX);
            this.pipes.forEach(pipe => {
                pipe.scroll(deltaX);
            });
            this.items.forEach(item => {
                item.scroll(deltaX);
            });
        }
    }

    draw() {
        if (this.gameState.current !== this.gameState.play) return;
        this.world.draw();
        this.character.draw();
        this.pipes.forEach(pipe => {
            pipe.draw();
        });
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
    game.showMenu();
    game.update();
    game.draw();
    setTimeout(loop, 16.66);
}

const game = new Game();

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
cvs.addEventListener("dblclick", toggleFullscreen);

loop();