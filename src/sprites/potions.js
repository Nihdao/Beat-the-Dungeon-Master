class Potion extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y) {
        super(scene, x, y);
    
        // Setup physics properties
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setSize(50, 60)
        this.body.setOffset(55, 100)
        this.body.setCollideWorldBounds(true)
        this.body.setGravityY(1000)
        this.play("potion_anim")
    
    }


}

