class ProjectileBlue extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        var x = -20
        var y = player.y
        super(scene, x, y, "projectile");

        // Setup physics properties
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.life=99 //Prevent BUG
        this.body.setSize(50, 30)
        this.body.setOffset(135, 145)
        this.play("projectileBlue_anim")
        this.body.setVelocityX(200);
        if(stageD == 2){
            this.body.setVelocityX(400);
        }
        this.body.setAllowGravity(false).setImmovable(true);
        projectiles.add(this);

    }

    updateToKill(){
        if (this.x > 1200){
            this.destroy();
        }
    }


}

