class PlayGame extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'playGame' });
    }

    create(data){
        ////////////////////
        /////// FIXE ///////
        ////////////////////
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.physics.world.setFPS(30)
        this.mainCamera = this.cameras.main
        // BG
        this.bg1 = this.add.tileSprite(0,0,config.width, config.height,"bg1").setOrigin(0,0)
        this.bg2 = this.add.tileSprite(0,0,config.width, config.height,"bg2").setOrigin(0,0)
        //  FLOORPLATFORMS
        floorplatform = this.physics.add.image(config.width/2, 785, 'ground').setScale(6).refreshBody()
        floorplatform.body.allowGravity = false;
        floorplatform.setImmovable(true);
        this.cameras.main.setRoundPixels(true); 
        //  PLATFORM
        platforms = this.physics.add.staticGroup();
        platforms.create(config.width/2, 230, 'ground').setScale(1,1).refreshBody()
        platforms.create(175, 380, 'ground').setScale(1,1).refreshBody()
        platforms.create(1105, 380, 'ground').setScale(1,1).refreshBody()
        platforms.create(80, 550, 'ground').setScale(2,1).refreshBody()
        platforms.create(1200, 550, 'ground').setScale(2,1).refreshBody()
        for (var i = 0; i < platforms.getChildren().length; i++) {
        var platform = platforms.getChildren()[i];
            platform.body.checkCollision.down = false;
            platform.body.checkCollision.left = false;
            platform.body.checkCollision.right = false;
        }
        // PLAYER
        player = new Player(this, screenCenterX, 645);
        this.hitbox = this.physics.add.staticGroup();
        nextInvincible = 0;
        
        // ENEMIES
        enemies = this.physics.add.group();

        // POTIONS
        potions = this.physics.add.group();

        // BOSS "FINAL"
        dungeonMaster = this.physics.add.group();

        // PROJECTILES
        projectiles = this.add.group();
        projectilesAxe = this.add.group();

        //  INTERACTIONS
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, floorplatform);
        this.physics.add.collider(potions, platforms);
        this.physics.add.collider(potions, floorplatform);
        this.physics.add.collider(enemies, floorplatform);
        this.physics.add.collider(enemies, platforms);
        this.physics.add.collider(dungeonMaster, platforms);
        this.physics.add.collider(dungeonMaster, floorplatform);

        this.physics.add.overlap(player, enemies, this.hurt, null, this)
        this.physics.add.overlap(player, dungeonMaster, this.hurt, null, this)
        this.physics.add.overlap(player, projectiles, this.hurt, null, this)
        this.physics.add.overlap(player, potions, this.heal, null, this)

        this.physics.add.overlap(this.hitbox, enemies, this.hit, null, this)
        this.physics.add.overlap(this.hitbox, dungeonMaster, this.hit, null, this)
        this.physics.add.overlap(projectilesAxe, enemies, this.hit, null, this)
        this.physics.add.overlap(projectilesAxe, dungeonMaster, this.hit, null, this)

        
        

        
        // STAGE MANAGER
        oneByOne = 1;
        stage = data.stagevalue || 1
        stageD = data.stageDvalue || 1
        player.life = data.lifePlayer || 5

        cdThrow = 1
        cdDash = 1
        nextInvincible=0
        this.stageManager()


        // STAGE COUNTER
            this.bigStagetxt = this.add.text(screenCenterX-185,screenCenterY, `STAGE ${stageD}-${stage}`,{
			fontFamily: 'NoContinue',
			fontSize: '90px'
		})

        this.time.addEvent({
            delay: 1000,
                callback: ()=>{
                    this.bigStagetxt.destroy()
                    this.stagetxt = this.add.text(20,70, `STAGE ${stageD}-${stage}`,{
                    fontFamily: 'NoContinue',
                    fontSize: '30px'
                    })
                },
                loop: false
            })

            if(stageD==2){
                this.bg1.setTint(0xFA8888);
                this.bg2.setTint(0xFA4444);
                floorplatform.setTint(0xFA0000);
                if(platforms.getChildren().length>0){
                    for (var i = 0; i < platforms.getChildren().length; i++) {
                    var platform = platforms.getChildren()[i];
                    platform.setTint(0xFA0000);
                    }
                }
            }

    }

    ////////////////////
    ////// MANAGER /////
    ////////////////////

    stageListener() {
       if(enemies.getChildren().length == 0 && stageD==1 && stage==4){
            player.alpha=0.99;
            this.stageCompletetxt = this.add.text(20,70, `STAGE ${stageD}-${stage} COMPLETE`,{
                    fontFamily: 'NoContinue',
                    fontSize: '30px'
                    })
            this.canThrowtxt = this.add.text(config.width/2-230,600, `You can now throw axes with J key`,{
                fontFamily: 'NoContinue',
                fontSize: '30px'
		    })
            canThrow = 1;
            this.time.addEvent({
                    delay: 5000,
                    callback: ()=>{
                        this.stageChange()
                    },
                    loop: false
                })
       }else if(enemies.getChildren().length == 0 && stageD==1 && stage==8){
            player.alpha=0.99;
            this.stageCompletetxt = this.add.text(20,70, `STAGE ${stageD}-${stage} COMPLETE`,{
                    fontFamily: 'NoContinue',
                    fontSize: '30px'
                    })
            this.canDashtxt = this.add.text(config.width/2-180,600, `You can now dash with L key`,{
                fontFamily: 'NoContinue',
                fontSize: '30px'
		    })
            canDash= 1;
            this.time.addEvent({
                    delay: 5000,
                    callback: ()=>{
                        this.stageChange()
                    },
                    loop: false
                })
       }else if(enemies.getChildren().length == 0 && stageD==1 && stage==12){
                player.alpha=0.99;
                this.stageCompletetxt = this.add.text(20,70, `STAGE ${stageD}-${stage} COMPLETE`,{
                        fontFamily: 'NoContinue',
                        fontSize: '30px'
                        })
                this.canInvincibletxt = this.add.text(config.width/2-330,600, `You can now be invincible with I key (once per stage)`,{
                    fontFamily: 'NoContinue',
                    fontSize: '30px'
                })
                canInvincible = 1;
                this.time.addEvent({
                        delay: 5000,
                        callback: ()=>{
                            this.stageChange()
                        },
                        loop: false
                    })
        }
        else if(enemies.getChildren().length == 0 && stage!=15){
            player.alpha=0.99;
            this.stageCompletetxt = this.add.text(20,70, `STAGE ${stageD}-${stage} COMPLETE`,{
                    fontFamily: 'NoContinue',
                    fontSize: '30px'
                    })
            this.time.addEvent({
                    delay: 2000,
                    callback: ()=>{
                        this.stageChange()
                    },
                    loop: false
                })
        }else if (dungeonMaster.getChildren().length == 0 && stage==15 && stageD==1 ){
            player.alpha=0.99;
            this.finishtxt = this.add.text(config.width/2-330,600, `You finished the dungeon... now let's try in hell mode`,{
                fontFamily: 'NoContinue',
                fontSize: '30px'
            })
            this.time.addEvent({
                    delay: 5000,
                    callback: ()=>{
                        this.stageChange()
                    },
                    loop: false
                })
        }else if (dungeonMaster.getChildren().length == 0 && stageD==2 && stage==15){
            player.alpha=0.99;
            this.finishtxt = this.add.text(config.width/2-270,600, `You finished the dungeon, congratulation !`,{
                fontFamily: 'NoContinue',
                fontSize: '30px'
            })
        }

    }

    stageChange(){
            this.scene.restart({ 
                stagevalue : stage+1,
                stageDvalue : stageD,
                lifePlayer : player.life,
            })
        }
    
  stageManager() {
    if(stage%16 == 0){
        stage = 1
        stageD++
    }
    if(stage == 1 && stageD == 2){
            player.life = 5
    }
        switch (stage) {
            case 1:   
                enemies.add(new Slime(this, 80, 285));;
                enemies.add(new Slime(this, 1260, 600));;
                break
            case 2:
                enemies.add(new Slime(this, 1260, 285));
                enemies.add(new Slime(this, 80, 450));;
                enemies.add(new Slime(this, 80, 610));
                enemies.add(new Slime(this, 1260, 450));
                if(Phaser.Math.Between(0, 10)>3*stageD){
                    potions.add(new Potion(this, config.width/2, 100));
                }
                break
            case 3:
                enemies.add(new Slime(this, 1260, 285));
                enemies.add(new Slime(this, 80, 285));
                enemies.add(new Goblin(this, 80, 450));;
                enemies.add(new Slime(this, 80, 610));
                if(Phaser.Math.Between(0, 10)>3*stageD){
                    potions.add(new Potion(this, config.width/2, 100));
                }
                break
            case 4: // BOSS
               enemies.add(new SlimeKing(this, config.width/2+70, 60));
                enemies.add(new Slime(this, 80, 450));
                enemies.add(new Slime(this, 1260, 450));
                this.GreenGeneration = this.time.addEvent({
                        delay: 3000,
                        callback: ()=>{
                            projectiles.add(new ProjectileGreen(this));
                        },
                        loop: true
                    })
                break
            case 5:
                enemies.add(new Slime(this, 1260, 285));
                enemies.add(new Goblin(this, 80, 450));
                enemies.add(new Goblin(this, 1260, 610));
                if(Phaser.Math.Between(0, 10)>3*stageD){
                    potions.add(new Potion(this, config.width/2, 100));
                }
                break
            case 6: 
                enemies.add(new Slime(this, 1260, 285));
                enemies.add(new Goblin(this, 80, 285));
                enemies.add(new Goblin(this, 1260, 450));
                enemies.add(new Goblin(this, 80, 610));
                if(Phaser.Math.Between(0, 10)>3*stageD){
                    potions.add(new Potion(this, config.width/2, 100));
                }
                break
            case 7:
                enemies.add(new Goblin(this, 1260, 285));
                enemies.add(new Goblin(this, 80, 450));
                enemies.add(new Goblin(this, 1260, 610));
                enemies.add(new Skeleton(this, 80, 610));
                if(Phaser.Math.Between(0, 10)>3*stageD){
                    potions.add(new Potion(this, config.width/2, 100));
                }
                break
            case 8: 
                enemies.add(new GoblinKing(this, config.width/2+70, 60));
                enemies.add(new Goblin(this, 80, 450));
                enemies.add(new Goblin(this, 1260, 450));
                enemies.add(new Goblin(this, 80, 610));
                enemies.add(new Goblin(this, 1260, 610));
                this.RedGeneration = this.time.addEvent({
                        delay: 5000,
                        callback: ()=>{
                            projectiles.add(new ProjectileRed(this));
                            projectiles.add(new ProjectileRed(this));
                            projectiles.add(new ProjectileRed(this));
                            projectiles.add(new ProjectileRed(this));
                            projectiles.add(new ProjectileRed(this));
                            projectiles.add(new ProjectileRed(this));
                        },
                        loop: true
                    })
                if(Phaser.Math.Between(0, 10)>3*stageD){
                    potions.add(new Potion(this, config.width/2, 100));
                }
                break
            case 9: 
                enemies.add(new Goblin(this, 80, 285));
                enemies.add(new Goblin(this, 80, 450));
                enemies.add(new Skeleton(this, 1260, 610));
                if(Phaser.Math.Between(0, 10)>3*stageD){
                    potions.add(new Potion(this, config.width/2, 100));
                }
                break
            case 10: 
                enemies.add(new Goblin(this, 1260, 450));
                enemies.add(new Goblin(this, 80, 450));
                enemies.add(new Skeleton(this, 1260, 285));
                enemies.add(new Skeleton(this, 80, 285));
                if(Phaser.Math.Between(0, 10)>3*stageD){
                    potions.add(new Potion(this, config.width/2, 100));
                }
                break
            case 11: 
                enemies.add(new Skeleton(this, 1260, 450));
                enemies.add(new Skeleton(this, 80, 610));
                enemies.add(new Skeleton(this, 1260, 610));
                enemies.add(new Skeleton(this, 1260, 285));
                if(Phaser.Math.Between(0, 10)>3*stageD){
                    potions.add(new Potion(this, config.width/2, 100));
                }
                break
            case 12: 
                enemies.add(new SkeletonKing(this, config.width/2+70, 60));
                enemies.add(new Skeleton(this, 80, 285));
                enemies.add(new Skeleton(this, 1260, 285));
                this.BlueGeneration = this.time.addEvent({
                        delay: 3000,
                        callback: ()=>{
                            projectiles.add(new ProjectileBlue(this));
                        },
                        loop: true
                    })
                if(Phaser.Math.Between(0, 10)>3*stageD){
                    potions.add(new Potion(this, config.width/2, 100));
                }
                break
            case 13: 
                enemies.add(new Slime(this, 1260, 610));
                enemies.add(new Slime(this, 80, 610));
                enemies.add(new Goblin(this, 80, 450));
                enemies.add(new Goblin(this, 1260, 450));
                enemies.add(new Skeleton(this, 1260, 285));
                enemies.add(new Skeleton(this, 80, 285));
                potions.add(new Potion(this, config.width/2, 100));
                break
            case 14: 
                enemies.add(new Goblin(this, 1260, 450));
                enemies.add(new Goblin(this, 80, 450));
                enemies.add(new Skeleton(this, 1260, 285));
                enemies.add(new Skeleton(this, 80, 285));
                potions.add(new Potion(this, config.width/2, 100));
                break
            case 15: 
            this.onceMagic = 0
            dungeonMaster.add(new DungeonMaster(this, 1300, 205, "green"));
            dungeonMaster.add(new DungeonMaster(this, 0, 530, "blue"));
            dungeonMaster.add(new DungeonMaster(this, config.width/2+170, 65, "red"));
            this.GreenGeneration = this.time.addEvent({
                    delay: 3000,
                    callback: ()=>{
                        projectiles.add(new ProjectileGreen(this));
                    },
                    loop: true
                })
            this.BlueGeneration = this.time.addEvent({
                    delay: 3000,
                    callback: ()=>{
                        projectiles.add(new ProjectileBlue(this));
                    },
                    loop: true
                })
                break
                
            }
    }

        
    update(){
        this.stageListener() 
        this.cooldownHUD(this)

        if(player.isAlive){
            player.movePlayerManager();
            player.lifeGestion(this); 
        }


        if(enemies.getChildren().length>0){
            for (var i = 0; i < enemies.getChildren().length; i++) {
            var enemy = enemies.getChildren()[i];
                enemy.showHP()
            }
        }
        if(dungeonMaster.getChildren().length>0){
            for (var i = 0; i < dungeonMaster.getChildren().length; i++) {
            var master = dungeonMaster.getChildren()[i];
                master.showHP()
            }
        }
        if(dungeonMaster.getChildren().length==1 && this.onceMagic==0){
            var masterUltimate = dungeonMaster.getChildren()[0]
            masterUltimate.life = 10
            masterUltimate.hpText.text = `HP: ${masterUltimate.life}`;
            this.RedGeneration = this.time.addEvent({
            delay: 1500,
            callback: ()=>{
                projectiles.add(new ProjectileRed(this));
                projectiles.add(new ProjectileRed(this));
                projectiles.add(new ProjectileRed(this));
            },
            loop: true
        })
            this.onceMagic=1
        }


        for (var i = 0; i < projectiles.getChildren().length; i++) {
        var projectile = projectiles.getChildren()[i];
        projectile.updateToKill();
        }

        for (var i = 0; i < projectilesAxe.getChildren().length; i++) {
        var projectileAxe = projectilesAxe.getChildren()[i];
        projectileAxe.updateToKill();
        }


}
    cooldownHUD(scene)
    {

        // THROW
        if(canThrow==1 && cdThrow==1){
            this.axeHUD = scene.add.image(40, 150, 'Axe').setScale(0.8)
            this.skill1 = this.add.circle(40, 150, 25).setStrokeStyle(2, 0x44FF44)
            this.skill1txt =  this.add.text(40,150, `J`,{fontFamily: 'NoContinue',fontSize: '20px'})
        }else if (canThrow==1 && cdThrow==0){
            this.skill1.destroy()
            this.skill1 = this.add.circle(40, 150, 25).setStrokeStyle(2, 0x999999)
        }

        // DASH
        if(canDash==1 && cdDash==1){
            this.dashHUD = scene.add.image(105, 150, 'Dash').setScale(0.8)
            this.skill2 = this.add.circle(105, 150, 25).setStrokeStyle(2, 0x44FF44)
            this.skill2txt =  this.add.text(105,150, `L`,{fontFamily: 'NoContinue',fontSize: '20px'})
        }else if (canDash==1 && cdDash==0){
            this.skill2.destroy()
            this.skill2 = this.add.circle(105, 150, 25).setStrokeStyle(2, 0x999999)
        }

        // INVINCIBLE
        if(canInvincible==1 && nextInvincible==0){
            this.invincibleHUD = scene.add.image(170, 150, 'Invincible').setScale(0.8)
            this.skill3 = this.add.circle(170, 150, 25).setStrokeStyle(2, 0x44FF44)
            this.skill3txt =  this.add.text(170,150, `I`,{fontFamily: 'NoContinue',fontSize: '20px'})
        }else if (canInvincible==1 && nextInvincible==1){
            this.skill3.destroy()
            this.skill3 = this.add.circle(170, 150, 25).setStrokeStyle(2, 0x999999)
        }
    }

    hit(hitbox, enemy){
        enemy.hurt()
        }

    heal(player, potion){
        player.life+=1;
        potion.destroy()
        }

    hurt(player, enemy){
        if(player.alpha<1 || enemy.life ==0){
            return;
        }
        player.alpha = 0.5;
        player.life -= 1
        console.log(player.life)
        if(player.life> 0){
            this.mainCamera.shake(50)
            player.alpha = 0.5
            this.playerReset = this.time.addEvent({
                delay: 1500,
                callback: ()=>{
                    player.alpha = 1;
                },
                loop: false
            })
        }else if (player.life==0){
            this.mainCamera.shake(100)
            var tween = this.tweens.add({
                targets: player,
                y: player.body.position.y+10,
                x: player.body.position.x+10,
                ease: 'Power1',
                duration: 100,
                onComplete: function (){
                    player.play("dead_anim")
                    player.body.setVelocityX(0)
                    player.body.setVelocityY(0)
                },

            })
            this.mainCamera.fadeOut(1000)
            this.mainCamera.on('camerafadeoutcomplete', function () {
                game.scene.start('gameover', { 
                    stagevalue : stage,
                    stageDvalue : stageD,
                   });
            })
        }
    }

    hurtAnim(){

        
}
}
