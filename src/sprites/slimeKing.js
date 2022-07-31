class SlimeKing extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y) {
        super(scene, x, y);
    
        // Setup physics properties
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setSize(310, 120)
        this.body.setOffset(0, 120)
        this.body.setCollideWorldBounds(true)
        this.body.setGravityY(1000)
        this.play("slimeK_walk_anim")
        
        // Config
        var _this = this;
        this.speed = Math.random() * (5000/stageD - 4000/stageD) + 4000/stageD;
        this.life=10
        if(stageD==2){this.life = 15}
        this.name = "Slime King"
        this.hpText = this.scene.add.text(this.body.position.x, this.body.position.y, `HP: ${this.life}`,{
			fontFamily: 'NoContinue',
			fontSize: '35px'
		}) 


        // BELOW IS DUPLICATION
        // MOVEMENT CLASSIC 
            this.tween = scene.tweens.add({
                targets: this,
                x: 600,
                ease: 'Linear',
                duration: this.speed,
                yoyo: true,
                repeat: -1,
                onStart: function () { _this.flipX=true; },
                onYoyo: function () {  _this.flipX=false; },
                onRepeat: function () { _this.flipX=true; },
            })
    }

     showHP(){
        this.hpText.x = this.body.position.x+ this.body.width/2 - this.hpText.width/2;         
        this.hpText.y = this.body.position.y-30;     
        }
    hurt(){
        if(oneByOne==1 && this.life > 0){
            oneByOne=0
            this.alpha=0.5
            this.life -= 1;
            this.hpText.text = `HP: ${this.life}`;
            this.scene.time.addEvent({
                    delay: 200,
                    callback: ()=>{
                        this.alpha=1
                        this.oneByOneDelay()
                    },
                    loop: false
                })
            if(player.flipX){
                player.body.position.x = player.body.position.x+40
            }else if(!player.flipX){
                player.body.position.x = player.body.position.x-40
            }
            this.tween = this.tween.resume();
            if(this.life <= 0){
                this.hpText.destroy()
                this.play("slimeK_dead_anim")
                this.tween.remove();
                this.on('animationcomplete', () => { 
                    this.destroy()
                })
            }  
        }
        }   

    oneByOneDelay(){
        oneByOne=1
    }

}

