class SkeletonKing extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y) {
        super(scene, x, y);
    
        // Setup physics properties
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setSize(260, 180)
        this.body.setOffset(30, 80)
        this.play("skeletonK_walk_anim")
        
        // Config
        var _this = this;
        this.speed = Math.random() * (2000 - 1300) + 1300;
        this.life=5
        if(stageD==2){this.life = 10}
        this.name = "Skeleton King"
        this.hpText = this.scene.add.text(this.body.position.x, this.body.position.y, `HP: ${this.life}`,{
			fontFamily: 'NoContinue',
			fontSize: '35px'
		}) 
        this.tween = this.scene.tweens.timeline({
                            targets: this,
                            loop: -1,
                            tweens: [
                                {
                                    targets: this,
                                    y: function () { return Phaser.Math.Between(400, 200); },
                                    ease: 'Power1',
                                    duration: this.speed
                                },{
                                    targets: this,
                                    y: -400,
                                    ease: 'Power1',
                                    duration: this.speed
                                },{
                                    targets: this,
                                    x: function () { return Phaser.Math.Between(1250, 1000); },
                                    ease: 'Power1',
                                    duration: 100
                                },{
                                    targets: this,
                                    y: function () { return Phaser.Math.Between(600, 350); },
                                    ease: 'Power1',
                                    duration: this.speed
                                },{
                                    targets: this,
                                    y: -400,
                                    ease: 'Power1',
                                    duration: this.speed
                                },{
                                    targets: this,
                                    x: function () { return Phaser.Math.Between(450, 0); },
                                    ease: 'Power1',
                                    duration: 100
                                },{
                                    targets: this,
                                    y: function () { return Phaser.Math.Between(600, 350); },
                                    ease: 'Power1',
                                    duration: this.speed
                                },{
                                    targets: this,
                                    y: -400,
                                    ease: 'Power1',
                                    duration: this.speed,
                                },
                                {
                                    targets: this,
                                    x: function () { return Phaser.Math.Between(550, 800); },
                                    ease: 'Power1',
                                    duration: 100
                                }
                            ]

                });
    }
     showHP(){
        this.hpText.x = this.body.position.x+ this.body.width/2 - this.hpText.width/2;         
        this.hpText.y = this.body.position.y-30;     
        }
    hurt(){
        if(oneByOne==1 && this.life > 0){
            oneByOne=0
            this.life -= 1;
            this.alpha=0.5
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
            if(this.life <= 0){
                this.hpText.destroy()
                this.play("skeletonK_dead_anim")
                this.tween.stop();
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

