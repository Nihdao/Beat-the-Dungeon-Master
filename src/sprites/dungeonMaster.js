class DungeonMaster extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,typeDM) {
        super(scene, x, y, typeDM);
    
        // Setup physics properties
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setSize(100, 130)
        this.body.setOffset(100, 180)
        this.play("dungeonM_walk_anim")
        
        // Config
        var _this = this;
        this.typeDM = typeDM
        this.speed = Math.random() * (2000/stageD - 1000/stageD) + 1000/stageD;
        this.isKilled ="none"
        this.GreenKilled = 0
        this.BlueKilled = 0


        if (this.typeDM == "green") {
        _this.tint=0x00FF00
        _this.flipX=true
        this.life=4
        if(stageD==2){this.life = 8}
        this.tween = this.scene.tweens.timeline({
                                    targets: this,
                                    loop: -1,
                                    tweens: [
                                        {
                                            targets: this,
                                            x: function () { return Phaser.Math.Between(1000, 1200); },
                                            ease: 'Power1',
                                            duration: 1000,
                                        },
                                        {
                                            targets: this,
                                            x: 1400,
                                            ease: 'Power1',
                                            duration: 1000
                                        },

                                        // OOB
                                        {
                                            targets: this,
                                            x: 1400,
                                            y: -300,
                                            ease: 'Power1',
                                            duration: 100
                                        },
                                        {
                                            targets: this,
                                            x: -75,
                                            ease: 'Power1',
                                            duration: 100
                                        },
                                        {
                                            targets: this,
                                            x: -75,
                                            y: 195,
                                            ease: 'Power1',
                                            duration: 100,
                                            onComplete: function() {
                                                _this.flipX=false
                                            }
                                        },
                                        // END OOB
                                        {
                                            targets: this,
                                            x: function () { return Phaser.Math.Between(100, 300); },
                                            ease: 'Power1',
                                            duration: 1000
                                        },

                                        {
                                            targets: this,
                                            x: -100,
                                            ease: 'Linear',
                                            duration: 1000,
                                            onComplete: function() {
                                                _this.flipX=true
                                            }
                                        },
                                        {
                                            targets: this,
                                            x: -100,
                                            y: 210,
                                            ease: 'Linear',
                                            duration: 500,
                                        },
                                    ]

                        });
        } 
        else if (this.typeDM == "blue") {
            _this.tint=0x0000FF 
            this.life=6
            if(stageD==2){this.life = 15}
            this.tween = this.scene.tweens.timeline({
                                targets: this,
                                loop: -1,
                                tweens: [
                                    {
                                        targets: this,
                                        x: function () { return Phaser.Math.Between(1000, 1300); },
                                        ease: 'Power1',
                                        duration: 7500,
                                        onComplete: function() {
                                            _this.flipX=true
                                        }
                                    },
                                    {
                                        targets: this,
                                        x: -50,
                                        ease: 'Power1',
                                        duration: 1000,
                                        onComplete: function() {
                                            _this.flipX=false
                                        }
                                    },
                                    {
                                        targets: this,
                                        y: -800,
                                        duration: 100,
                                    },
                                    {
                                        targets: this,
                                        y: -800,
                                        x: 1300,
                                        duration: 100,
                                    },
                                    {
                                        targets: this,
                                        y: 530,
                                        duration: 100,
                                        onComplete: function() {
                                            _this.flipX=true
                                        }
                                    },
                                    {
                                        targets: this,
                                        x: function () { return Phaser.Math.Between(100, 300); },
                                        ease: 'Power1',
                                        duration: 7500,
                                    },
                                    {
                                        targets: this,
                                        x: 1500,
                                        ease: 'Power1',
                                        duration: 1000,
                                        onComplete: function() {
                                            _this.flipX=false
                                        }
                                    },
                                    {
                                        targets: this,
                                        x: 1500,
                                        duration: 500,

                                    },                                
                                ]

                    });
     }
     else if(this.typeDM == "red"){
        this.life = 999
        this.tween = scene.tweens.add({
            targets: this,
            x: 500,
            ease: 'Linear',
            duration: this.speed,
            yoyo: true,
            repeat: -1,
            onStart: function () { _this.flipX=true; },
            onYoyo: function () {  _this.flipX=false; },
            onRepeat: function () { _this.flipX=true; },
        })
     }



        this.hpText = this.scene.add.text(this.body.position.x, this.body.position.y, `HP: ${this.life}`,{
			fontFamily: 'NoContinue',
			fontSize: '35px'
		}) 
    }

    showHP(){
        this.hpText.x = this.body.position.x+ this.body.width/2 - this.hpText.width/2;         
        this.hpText.y = this.body.position.y-30;     
        }
    hurt(){
        if(oneByOne==1 && this.life > 0){
            oneByOne=0
            this.life -= 1;
            this.hpText.text = `HP: ${this.life}`;
            this.alpha=0.5
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
                if(this.typeDM=="blue"){
                    this.scene.BlueGeneration.remove()
                    this.BlueKilled = 1
                }else if(this.typeDM=="green"){
                    this.scene.GreenGeneration.remove()
                    this.GreenKilled = 1
                }
                this.hpText.destroy()
                this.play("dungeonM_dead_anim")
                this.tween.stop();
                this.on('animationcomplete', () => { 
                    console.log(this.isKilled)
                    this.destroy()
                })
            }  
        }
        }   

    oneByOneDelay(){
        oneByOne=1
    }

}

