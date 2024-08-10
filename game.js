const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: "#049cd8",
  parent: "game",
  scene: {
    preload,
    create,
    update,
  },
};
new Phaser.Game(config);

function preload() {
  // mapa
  this.load.image("cloud1", "assets/scenery/overworld/cloud1.png");
  this.load.image("floorbricks", "assets/scenery/overworld/floorbricks.png");

  //personaje
  this.load.spritesheet("mario", "assets/entities/mario.png", {
    frameWidth: 18,
    frameHeight: 16,
  });
}

function create() {
  // mapa
  this.add.image(100, 50, "cloud1").setOrigin(0, 0).setScale(0.15);
  this.add
    .tileSprite(0, config.height, config.width, 32, "floorbricks")
    .setScale(1)
    .setOrigin(0, 1);

  // personaje
  this.mario = this.add.sprite(50, 210, "mario").setOrigin(0, 1);

  this.anims.create({
    key: "mario-walk",
    frames: this.anims.generateFrameNumbers("mario", { start: 3, end: 1 }),
    frameRate: 12,
    repeat: -1,
  });

  this.anims.create({
    key: "mario-idle",
    frames: [{ key: "mario", frame: "0" }],
  });

  this.anims.create({
    key: "mario-jump",
    frames: [{ key: "mario", frame: "5" }],
  });

  this.keys = this.input.keyboard.createCursorKeys();
}

function update() {
  if (this.keys.left.isDown) {
    this.mario.anims.play("mario-walk", true);
    this.mario.x -= 2;
    this.mario.flipX = true;
  } else if (this.keys.right.isDown) {
    this.mario.anims.play("mario-walk", true);
    this.mario.x += 2;
    this.mario.flipX = false;
  } else {
    this.mario.anims.play("mario-idle", true);
  }

  if (this.keys.up.isDown) {
    this.mario.y -= 5;
    this.mario.anims.play("mario-jump", true);
  }
}
