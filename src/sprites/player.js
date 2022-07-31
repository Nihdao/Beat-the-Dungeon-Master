class Player extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y) {
        super(scene, x, y);
    
        // Setup physics properties
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.setScale(2)
        this.body.setSize(15, 35)
        this.body.setOffset(20, 8)
        this.body.setCollideWorldBounds(true)
        this.body.setGravityY(1000)
        this.play("idle_anim")

        // Config
        
        this.speed = 500;
        this.life = 5
        this.isAlive = 1
        lifeimg = scene.physics.add.image(-17, -85, 'hp5').setOrigin(0,0)
        lifeLowimg =  scene.physics.add.sprite(-17, -85, "lifeLow").setOrigin(0,0).setVisible(false).setActive(false)
        lifeLowimg.play("lifeLow_anim", true)
        lifeLowimg.body.allowGravity = false;
        lifeLowimg.setImmovable(true);

    


        // KEYS
        this.cursorKeys = scene.input.keyboard.createCursorKeys();
        // ENGLISH KEY
        this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // // FRENCH KEY
        this.keyZ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyQ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        
        // ATTACK
        this.keyK = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        // DASH
        this.keyL = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        // THROW
        this.keyJ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

        // INVINCIBLE
        this.keyI = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    }


    // MOVE MANAGER
        movePlayerManager(){

        if(this.keyQ._justDown || this.keyA._justDown){
            this.body.setVelocityX(-this.speed);
            this.flipX=true;
            this.body.setOffset(34, 8);
            if (player.body.onFloor() && attackState==0) {
                this.play("run_anim", true);
            }

        }else if(this.keyD._justDown){
            this.body.setVelocityX(this.speed)
            this.flipX=false;
            this.body.setOffset(20, 8);
            if (this.body.onFloor() && attackState==0) {
                this.play("run_anim", true);
            }
        }
        else {
            this.body.setVelocityX(0);
            if(this.body.onFloor() && attackState==0){
                this.play("idle_anim", true);
            }
            else if(!this.body.onFloor() && attackState==0){
                this.play("jump_anim", true);
            }
        }

        // ATTACK GESTION
        if(attackState==1){
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        } 
        if( this.keyK.isDown){
                if(nextAttack>this.scene.time.now){return;} // too early
                nextAttack = this.scene.time.now + 500;
                attackState=1
                player.play("hit1_anim", true);
                if(player.flipX){this.box = this.scene.add.rectangle(player.body.position.x-30, player.body.position.y+20, 90, 90)}
                else{this.box = this.scene.add.rectangle(player.body.position.x+60, player.body.position.y+20, 90, 90)}
                this.scene.hitbox.add(this.box);
                this.scene.time.addEvent({
                            delay: 100,
                            callback: ()=>{
                                attackState=0
                                this.box.destroy()
                            },
                            loop: false
                        })
                player.on('animationcomplete', () => { // if an animation ends play the idle animation
                    if(!player.body.touching.down){
                        player.play("jump_anim", true);
                    }else{
                        player.play("idle_anim", true);
                    }
                })
            }

        const didPressJump = Phaser.Input.Keyboard.JustDown(this.keyZ);
        if(this.body.onFloor()){
            jumpState=0;
        }
        if(didPressJump){
            if(this.body.onFloor()){
                jumpState=1
                this.canDoubleJump = true;
                this.body.setVelocityY(-600)
                this.play("jump_anim", true);
            }else if(this.canDoubleJump){
                this.canDoubleJump = false;
                this.body.setVelocityY(-600)
                this.play("jump_anim", true);
            }else if(!player.body.onFloor() && jumpState==0 && !this.canDoubleJump ){
                jumpState=1
                this.body.setVelocityY(-600)
                this.play("jump_anim", true);
            }
        }

    if (this.keyS.isDown) {
        if(player.body.onFloor() && player.body.position.y < 600){
            this.drop()
            this.scene.time.delayedCall(200, this.dropExpire);
            }
    }
    if(this.keyI.isDown && canInvincible == 1){
        this.skillInvincible()
    }
    if(this.keyJ.isDown && canThrow == 1){
        this.skillThrow()
    }
    if(this.keyL.isDown && canDash == 1){
        this.skillDash()
    }
    }

    skillDash() {
       if(nextDash>this.scene.time.now){return;} // too early
        nextDash= this.scene.time.now + 1000;
        cdDash=0;
        this.scene.time.addEvent({
            delay: 1000,
            callback: ()=>{
                cdDash=1
            },
            loop: false
        })
        if(player.flipX){
            player.play("dash_anim")
            player.body.setVelocityX(-player.speed*10)
        }else{
            player.play("dash_anim")
            player.body.setVelocityX(player.speed*10)
        }
    }
    skillInvincible() {
        if(nextInvincible==1){return;} // too early
        nextInvincible=1;
        player.alpha = 0.5;
        this.scene.time.addEvent({
            delay: 3000,
            callback: ()=>{
                player.alpha = 1;
            },
            loop: false
        })
    }

    skillThrow() {
        if(nextThrow>this.scene.time.now){return;}
        nextThrow= this.scene.time.now + 1500;
        cdThrow=0
        this.scene.time.addEvent({
            delay: 1500,
            callback: ()=>{
                cdThrow=1
            },
            loop: false
        })
        projectilesAxe.add(new ProjectileAxe(this.scene));
    }

    // DROP PLATFORM GESTION
    drop() {
    player.body.checkCollision.down = false;
    }

    dropExpire() {
    player.body.checkCollision.down = true;
    }

    lifeGestion(scene) {
        switch (this.life) {
            case 6:
                this.life = 5
                break
            case 5:
                lifeimg.destroy()
                lifeimg = scene.add.image(-17, -85, 'hp5').setOrigin(0,0)
                break
            case 4:
                lifeimg.destroy()
                lifeimg = scene.add.image(-17, -85, 'hp4').setOrigin(0,0)
                break
            case 3:
                lifeimg.destroy()
                lifeimg = scene.add.image(-17, -85, 'hp3').setOrigin(0,0)
                break
            case 2:
                lifeimg.destroy()
                lifeLowimg.setActive(false).setVisible(false)
                lifeimg = scene.add.image(-17, -85, 'hp2').setOrigin(0,0)
                break
            case 1:
                lifeimg.destroy()
                lifeLowimg.setActive(true).setVisible(true)
                break
            case 0:
                lifeimg.destroy()
                lifeLowimg.setActive(false).setVisible(false)
                lifeimg = scene.add.image(-17, -85, 'hp0').setOrigin(0,0)
                this.isAlive = false
                break
            }
    }


}

