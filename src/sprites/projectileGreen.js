class ProjectileGreen extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        var x = player.x
        var y = -20;
        super(scene, x, y, "projectile");

        // Setup physics properties
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.life=99 //Prevent BUG
        this.body.setSize(30, 50)
        this.body.setOffset(145, 120)
        this.play("projectileGreen_anim")
        this.angle=90
        this.body.setVelocityY(50);
        if(stageD == 2){
            this.body.setVelocityY(100);
        }
        projectiles.add(this);

    }

    updateToKill(){
        if (this.y > 655){
            this.destroy();
        }
    }


}

