export function checkControls ({ mario, keys }) {
  const isMarioTouchingFloor = mario.body.touching.down
  const isLeftKeyDown = keys.left.isDown || keys.a.isDown
  const isRightKeyDown = keys.right.isDown || keys.d.isDown
  const isUpKeyDown = keys.up.isDown || keys.w.isDown || keys.space.isDown

  if (mario.isDead) return

  if (isLeftKeyDown) {
    isMarioTouchingFloor && mario.anims.play('mario-walk', true)
    mario.x -= 2
    mario.flipX = true
  } else if (isRightKeyDown) {
    isMarioTouchingFloor && mario.anims.play('mario-walk', true)
    mario.x += 2
    mario.flipX = false
  } else if (isMarioTouchingFloor) {
    mario.anims.play('mario-idle', true)
  }

  if (isUpKeyDown && isMarioTouchingFloor) {
    mario.setVelocityY(-300)
    mario.anims.play('mario-jump', true)
  }
}
