class ProjectileRed extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        var x = player.x + Phaser.Math.Between(-500, 500);
        var y = -20;
        super(scene, x, y, "projectile");

        // Setup physics properties
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.life=99 //Prevent BUG
        this.body.setSize(30, 50)
        this.body.setOffset(145, 120)
        this.play("projectileRed_anim")
        this.angle=90
        this.body.setVelocityY(250);
        if(stageD == 2){
            this.body.setVelocityY(400);
        }
        projectiles.add(this);

    }

    updateToKill(){
        if (this.y > 630){
            this.destroy();
        }
    }


}

