class Home extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'home' });
    }

    preload(){
    }

    create(){
        this.bg1 = this.add.tileSprite(0,0,config.width, config.height,"bg1").setOrigin(0,0);
        this.bg2 = this.add.tileSprite(0,0,config.width, config.height,"bg2").setOrigin(0,0);
        this.bg3 = this.add.tileSprite(0,0,config.width, config.height,"bg3").setOrigin(0,0);
        this.cameras.main.setRoundPixels(true); 

        // Variables
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        const title = this.add.text(screenCenterX,175, "Beat the Dungeon Master",{
			fontFamily: 'NoContinue',
			fontSize: '85px'
		}).setOrigin(0.5)
        const start = this.add.text(screenCenterX,350, "Start",{
			fontFamily: 'NoContinue',
			fontSize: '50px'
		}).setOrigin(0.5)
        const controls = this.add.text(screenCenterX,425, "Controls",{
			fontFamily: 'NoContinue',
			fontSize: '30px'
		}).setOrigin(0.5)
    


        // Gestion des clics
        // START
        start.setInteractive();
        start.once('pointerup', ()=>{
            this.scene.start("playGame")
        });
        // // controls
        controls.setInteractive();
        controls.on('pointerup', ()=>{
            this.scene.start("controls")
        });


    }

}

