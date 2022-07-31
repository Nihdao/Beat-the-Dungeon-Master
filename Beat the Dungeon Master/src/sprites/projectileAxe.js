class ProjectileAxe extends Phaser.GameObjects.Sprite {
    constructor(scene) {


        var x = player.x 
        var y = player.y + 5
        super(scene, x, y, "projectile");

        // Setup physics properties
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(0.95)
        this.body.setSize(50,50)
        this.body.setOffset(5, 5)
        this.play("projectileAxe_anim")
        if(player.flipX){
            this.body.setVelocityX(-1800);
        }else{
            this.body.setVelocityX(1800);
        }
        this.body.setAllowGravity(false).setImmovable(true);
        projectilesAxe.add(this);

    }

    updateToKill(){
        if (this.x > 1300 || this.x < 10){
            this.destroy();
        }
    }


}

