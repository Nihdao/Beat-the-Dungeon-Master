const config = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        backgroundColor: 0x000000,
        scale: {
            mode: Phaser.Scale.ENVELOP,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [
            Preloader,
            Home,
            Controls,
            PlayGame,
            GameOver
        ],
        pixelArt: true,
        physics:{
            default: "arcade",
            arcade: {
                gravity: { y: 300 },
                debug:false
            }
        }
    }

    // GLOBALS
    let game = new Phaser.Game(config)


    let platforms
    let player 
    let enemies 
    let attackState=0
    let jumpState=0
    let nextAttack

    let nextDash
    let canDash = 0
    let cdDash

    let nextInvincible
    let canInvincible = 0
    
    let nextThrow
    let canThrow = 0
    let cdThrow

    let floorplatform
    let oneByOne = 1;
    let lifeimg 
    let lifeLowimg
    let potions
    let projectiles
    let projectilesAxe
    let dungeonMaster
    let typeDM
    let stage = 1;
    let stageD






