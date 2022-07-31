class Controls extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'controls' });
    }

    preload(){
    }

    
    create(){
        // Variables
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        const title = this.add.text(screenCenterX,175, "Controls",{
			fontFamily: 'NoContinue',
			fontSize: '75px'
		}).setOrigin(0.5)
        const returnHome = this.add.text(10,10,"<- Back",{
			fontFamily: 'NoContinue',
			fontSize: '25px'
		})
        const content =[
            "Movement",
            "Z or W : Up",
            "Q or A : Left",
            "S : Down",
            "D : Right",
            "",
            "Attacks",
            "K : Attack",
            "J : Skill 1",
            "L : Skill 2",
            "I : Skill 3",
        ]
        const version = this.add.text(screenCenterX,450,content,{
			fontFamily: 'NoContinue',
			fontSize: '25px'
		}).setOrigin(0.5)

    


        // Gestion des clics
        // ReturnHome
        returnHome.setInteractive();
        returnHome.on('pointerover', ()=>{
           game.canvas.style.cursor = "pointer";

        });
        returnHome.on('pointerout', ()=>{
           game.canvas.style.cursor = "default"
        });
        returnHome.on('pointerup', ()=>{
            this.scene.start("home")
        });

    }

}

