import { createAnimations } from "./animations.js";

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: "#049cd8",
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
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

  this.load.audio("gameover", "assets/sound/music/gameover.mp3");
}

function create() {
  // mapa
  this.add.image(100, 50, "cloud1").setOrigin(0, 0).setScale(0.15);
  this.floor = this.physics.add.staticGroup();
  this.floor
    .create(0, config.height - 16, "floorbricks")
    .setOrigin(0, 0.5)
    .refreshBody();
  this.floor
    .create(150, config.height - 16, "floorbricks")
    .setOrigin(0, 0.5)
    .refreshBody();

  // personaje
  // this.mario = this.add.sprite(50, 210, "mario").setOrigin(0, 1);

  this.mario = this.physics.add
    .sprite(50, 100, "mario")
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(500);

  this.physics.world.setBounds(0, 0, 2000, config.height);
  this.physics.add.collider(this.mario, this.floor);

  this.cameras.main.setBounds(0, 0, 2000, config.height);
  this.cameras.main.startFollow(this.mario);

  createAnimations(this);

  this.keys = this.input.keyboard.createCursorKeys();
}

function update() {
  const { keys, mario } = this;
  const isMarioTouchingFloor = mario.body.touching.down;
  const isLeftKeyDown = keys.left.isDown;
  const isRightKeyDown = keys.right.isDown;
  const isUpKeyDown = keys.up.isDown;

  if (mario.isDead) return;

  if (isLeftKeyDown) {
    mario.anims.play("mario-walk", true);
    mario.x -= 2;
    mario.flipX = true;
  } else if (isRightKeyDown) {
    mario.anims.play("mario-walk", true);
    mario.x += 2;
    mario.flipX = false;
  } else if (isMarioTouchingFloor) {
    mario.anims.play("mario-idle", true);
  }

  if (isUpKeyDown && isMarioTouchingFloor) {
    mario.setVelocityY(-300);
    mario.anims.play("mario-jump", true);
  }

  if (mario.y >= config.height) {
    mario.isDead = true;
    mario.anims.play("mario-dead");
    mario.setCollideWorldBounds(false);
    this.sound.add("gameover", { volume: 0.2 }).play();

    setTimeout(() => {
      mario.setVelocityY(-350);
    }, 100);

    setTimeout(() => {
      this.scene.restart();
    }, 2000);
  }
}
