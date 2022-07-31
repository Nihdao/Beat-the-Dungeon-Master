class GameOver extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'gameover' });
    }

    preload(){

    }

    
    create(data){
        stage = data.stagevalue || 1
        stageD = data.stageDvalue || 1
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        const gameovertxt = this.add.text(screenCenterX,250, "You died",{
			fontFamily: 'NoContinue',
			fontSize: '50px'
		}).setOrigin(0.5)    
        const scoretxt = this.add.text(screenCenterX,300, `You reachead stage ${data.stageDvalue}.${data.stagevalue}`,{
			fontFamily: 'NoContinue',
			fontSize: '30px'
		}).setOrigin(0.5)
        const continuetxt = this.add.text(screenCenterX,500, `Press SPACE  to go to the home page`,{
			fontFamily: 'NoContinue',
			fontSize: '20px'
		}).setOrigin(0.5)    
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

        update(){
                if (this.spacebar.isDown){
                        window.location.reload();
                }
        }
    }

