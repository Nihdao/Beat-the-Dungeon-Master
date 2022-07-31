class Preloader extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'preloader' });
    }

    preload(){
        this.load.image("bg1", "src/assets/background/background1.png");
        this.load.image("bg2", "src/assets/background/background2.png");
        this.load.image("bg3", "src/assets/background/background3.png");
        this.load.image("hp5", "src/assets/HUD/HP/HP_Value_5.png");
        this.load.image("hp4", "src/assets/HUD/HP/HP_Value_4.png");
        this.load.image("hp3", "src/assets/HUD/HP/HP_Value_3.png");
        this.load.image("hp2", "src/assets/HUD/HP/HP_Value_2.png");
        this.load.image("hp0", "src/assets/HUD/HP/HP_Value_0.png");
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // LOADING GAME GESTION
        this.load.on('progress', (percent) => {
            const load = this.add.text(screenCenterX,screenCenterY, "Loading",{
                fontFamily: 'NoContinue',
                fontSize: '50px'
            }).setOrigin(0.5)
        });

        // PLAYER
        this.load.spritesheet("player", "src/assets/spritesheets/Warrior.png", {
            frameWidth: 69,
            frameHeight: 44
        })
        this.load.spritesheet("lifeLow", "src/assets/HUD/HP/HP_Low.png", {
            frameWidth: 240,
            frameHeight: 240
        })

        // PLATFORM
        this.load.image('ground', 'src/assets/images/platform.png');

        // GOBLIN
        this.load.spritesheet("goblin", "src/assets/spritesheets/Goblin.png", {
            frameWidth: 160,
            frameHeight: 160
        })
        // SKELETON
        this.load.spritesheet("skeleton", "src/assets/spritesheets/Skeleton.png", {
            frameWidth: 160,
            frameHeight: 160
        })
        // SLIME
        this.load.spritesheet("slime", "src/assets/spritesheets/Slime.png", {
            frameWidth: 160,
            frameHeight: 160
        })
        // GOBLIN KING
        this.load.spritesheet("GoblinKing", "src/assets/spritesheets/GoblinKing.png", {
            frameWidth: 320,
            frameHeight: 320
        })
        // SKELETON KING
        this.load.spritesheet("SkeletonKing", "src/assets/spritesheets/SkeletonKing.png", {
            frameWidth: 320,
            frameHeight: 320
        })
        // SLIME KING
        this.load.spritesheet("SlimeKing", "src/assets/spritesheets/SlimeKing.png", {
            frameWidth: 320,
            frameHeight: 320
        })
        // DUNGEON MASTER
        this.load.spritesheet("DungeonMaster", "src/assets/spritesheets/DungeonMaster.png", {
            frameWidth: 320,
            frameHeight: 320
        })
        // PROJECTILES
        this.load.spritesheet("Projectiles", "src/assets/spritesheets/Projectiles.png", {
            frameWidth: 320,
            frameHeight: 320
        })
        this.load.spritesheet("Axe", "src/assets/spritesheets/Axe.png", {
            frameWidth: 60,
            frameHeight: 60
        })
        // POTION
        this.load.spritesheet("Potion", "src/assets/HUD/Item/Potion.png", {
            frameWidth: 160,
            frameHeight: 160
        })
        // DASH
        this.load.spritesheet("Dash", "src/assets/spritesheets/Dash.png", {
            frameWidth: 60,
            frameHeight: 60
        })
        // INVINCIBLE
        this.load.spritesheet("Invincible", "src/assets/spritesheets/Invincible.png", {
            frameWidth: 60,
            frameHeight: 60
        })
    }

    
    create(){
    // CREATE ANIMATIONS
 
    // PLAYER
        this.anims.create({
            key: "idle_anim",
            frames: this.anims.generateFrameNumbers("player", {
                start:0,
                end: 5
            }),
            frameRate: 10,
            repeat:-1,
        })
        this.anims.create({
            key: "run_anim",
            frames: this.anims.generateFrameNumbers("player", {
                start:6,
                end: 13
            }),
            frameRate: 20,
            repeat:-1,
        })
        this.anims.create({
            key: "hit1_anim",
            frames: this.anims.generateFrameNumbers("player", {
                // start:18,16
                // end: 21,24
                start:18,
                end: 25
            }),
            frameRate: 60,

        })
        this.anims.create({
            key: "jump_anim",
            frames: this.anims.generateFrameNumbers("player", {
                start:41,
                end: 48
            }),
            frameRate: 10,
            repeat:-1
        })
        this.anims.create({
            key: "dash_anim",
            frames: this.anims.generateFrameNumbers("player", {
                start:69,
                end: 70
            }),
            frameRate: 30,
        })
        this.anims.create({
            key: "dead_anim",
            frames: this.anims.generateFrameNumbers("player", {
                start:27,
                end: 36
            }),
            frameRate: 15,
        })

        // LIFE LOW
        this.anims.create({
            key: "lifeLow_anim",
            frames: this.anims.generateFrameNumbers("lifeLow", {
                start:0,
                end: 3
            }),
            frameRate: 7,
            repeat:-1
        })


    // GOBLIN
        this.anims.create({
            key: "goblin_walk_anim",
            frames: this.anims.generateFrameNumbers("goblin", {
                start:0,
                end: 3
            }),
            frameRate: 7,
            repeat:-1,
        })
        this.anims.create({
            key: "goblin_dead_anim",
            frames: this.anims.generateFrameNumbers("goblin", {
                start:4,
                end: 7
            }),
            frameRate: 20,
        })
    // SKELETON
        this.anims.create({
            key: "skeleton_walk_anim",
            frames: this.anims.generateFrameNumbers("skeleton", {
                start:0,
                end: 3
            }),
            frameRate: 7,
            repeat:-1,
        })
        this.anims.create({
            key: "skeleton_dead_anim",
            frames: this.anims.generateFrameNumbers("skeleton", {
                start:4,
                end: 7
            }),
            frameRate: 20,
        })
    // SLIME
        this.anims.create({
            key: "slime_walk_anim",
            frames: this.anims.generateFrameNumbers("slime", {
                start:0,
                end: 3
            }),
            frameRate: 7,
            repeat:-1,
        })
        this.anims.create({
            key: "slime_dead_anim",
            frames: this.anims.generateFrameNumbers("slime", {
                start:4,
                end: 7
            }),
            frameRate: 20,
        })
    // GOBLIN KING
        this.anims.create({
            key: "goblinK_walk_anim",
            frames: this.anims.generateFrameNumbers("GoblinKing", {
                start:0,
                end: 3
            }),
            frameRate: 7,
            repeat:-1,
        })
        this.anims.create({
            key: "goblinK_dead_anim",
            frames: this.anims.generateFrameNumbers("GoblinKing", {
                start:4,
                end: 7
            }),
            frameRate: 10,
        })
    // SKELETON KING
        this.anims.create({
            key: "skeletonK_walk_anim",
            frames: this.anims.generateFrameNumbers("SkeletonKing", {
                start:0,
                end: 3
            }),
            frameRate: 7,
            repeat:-1,
        })
        this.anims.create({
            key: "skeletonK_dead_anim",
            frames: this.anims.generateFrameNumbers("SkeletonKing", {
                start:4,
                end: 7
            }),
            frameRate: 10,
        })
    // SLIME KING
        this.anims.create({
            key: "slimeK_walk_anim",
            frames: this.anims.generateFrameNumbers("SlimeKing", {
                start:0,
                end: 3
            }),
            frameRate: 7,
            repeat:-1,
        })
        this.anims.create({
            key: "slimeK_dead_anim",
            frames: this.anims.generateFrameNumbers("SlimeKing", {
                start:4,
                end: 7
            }),
            frameRate: 10,
        })
    // DUNGEON MASTER
        this.anims.create({
            key: "dungeonM_walk_anim",
            frames: this.anims.generateFrameNumbers("DungeonMaster", {
                start:0,
                end: 3
            }),
            frameRate: 7,
            repeat:-1,
        })
        this.anims.create({
            key: "dungeonM_dead_anim",
            frames: this.anims.generateFrameNumbers("DungeonMaster", {
                start:4,
                end: 15
            }),
            frameRate: 30,
        })
    // PROJECTILES
        this.anims.create({
            key: "projectileGreen_anim",
            frames: this.anims.generateFrameNumbers("Projectiles", {
                start:0,
                end: 3
            }),
            frameRate: 7,
            repeat:-1,
        })
        this.anims.create({
            key: "projectileBlue_anim",
            frames: this.anims.generateFrameNumbers("Projectiles", {
                start:4,
                end: 7
            }),
            frameRate: 7,
            repeat:-1,
        })
        this.anims.create({
            key: "projectileRed_anim",
            frames: this.anims.generateFrameNumbers("Projectiles", {
                start:8,
                end: 11
            }),
            frameRate: 7,
            repeat:-1,
        })
        this.anims.create({
            key: "projectileAxe_anim",
            frames: this.anims.generateFrameNumbers("Axe", {
                start:0,
                end: 5
            }),
            frameRate: 10,
            repeat:-1,
        })
        // POTION
        this.anims.create({
            key: "potion_anim",
            frames: this.anims.generateFrameNumbers("Potion", {
                start:0,
                end: 3
            }),
            frameRate: 5,
            repeat:-1,
        })

    // LETS GO
    this.scene.start('home');
    }


    }

