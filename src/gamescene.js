import ParticleConfig from './particleconfig.js'

class GameScene extends Phaser.Scene {
  constructor () {
    super('game')
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // Preload

  preload () {
    // Environment
    this.load.image('ground', 'assets/environment/groundRed.png')

    // Player
    this.load.spritesheet('red', 'assets/sprites/redRunSpritesheet.png', { frameWidth: 80, frameHeight: 37 })
    this.load.spritesheet('redJump', 'assets/sprites/redJumpSpritesheet.png', { frameWidth: 80, frameHeight: 36 })
    this.load.spritesheet('redHurt', 'assets/sprites/redHurtSpritesheet.png', { frameWidth: 80, frameHeight: 36 })

    // Wolf
    this.load.spritesheet('wolf', 'assets/sprites/wolfRunSpritesheet.png', { frameWidth: 32, frameHeight: 20 })
    this.load.spritesheet('wolfHowl', 'assets/sprites/wolfHowlSpritesheet.png', { frameWidth: 24, frameHeight: 21 })

    // Enemies
    this.load.spritesheet('skull', 'assets/sprites/skullSpritesheet.png', { frameWidth: 44, frameHeight: 40 })
    this.load.spritesheet('ghost', 'assets/sprites/ghostSpritesheet.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('ghostDead', 'assets/sprites/ghostDeadSpritesheet.png', { frameWidth: 32, frameHeight: 32 })

    // Candies
    this.load.image('candy1', 'assets/candies/3.png')
    this.load.image('candy2', 'assets/candies/7.png')
    this.load.image('candy3', 'assets/candies/10.png')
    this.load.image('candy4', 'assets/candies/13.png')
    this.load.image('candy5', 'assets/candies/15.png')

    // Grandma
    this.load.image('grandma', 'assets/sprites/grandma.png')

    // Audio
    this.load.audio('music', 'assets/audio/MagicalForest.ogg')
    this.load.audio('collect', 'assets/audio/SFX_UI_Confirm.mp3')
    this.load.audio('bonus', 'assets/audio/win.wav')
    this.load.audio('hit', 'assets/audio/SFX_UI_Exit.mp3')
    this.load.audio('death', 'assets/audio/loose.wav')

    // Info
    this.load.image('flag', 'assets/interface/Icon_FLag.png')
    this.load.image('heart', 'assets/interface/Icon_Heart.png')
    this.load.image('bag', 'assets/interface/Icon_BackPack.png')

    // Interface
    this.load.image('confirmationBanner', 'assets/interface/Item1.png')
    this.load.image('homeButton', 'assets/interface/Icon_Home.png')
    this.load.image('pauseButton', 'assets/interface/Icon_Pause.png')
    this.load.image('yesButton', 'assets/interface/Icon_Check.png')
    this.load.image('noButton', 'assets/interface/Icon_X.png')
    this.load.image('square', 'assets/interface/Icon_SquareStraight.png')

    // Particle
    this.load.image('star', 'assets/interface/Icon_Star.png')
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // Create

  create () {
    this.createSound()
    this.createEnvironment()
    this.createInfo()
    this.createPlayer()
    this.createWolf()
    this.createCursor()
    this.createParticles()
    this.createCandies()
    this.createEnemies()
    this.createGrandma()

    this.difficulty = 0
    this.gameOver = false
    this.jump = false
  }

  createSound () {
    this.music = this.sound.add('music')
    this.music.setLoop(true)
    this.music.play()

    this.collect = this.sound.add('collect')
    this.bonus = this.sound.add('bonus')
    this.hit = this.sound.add('hit')
    this.death = this.sound.add('death')
  }

  createEnvironment () {
    this.ground = this.add.tileSprite(400, 380, 640, 30, 'ground').setScale(2)
    this.physics.add.existing(this.ground)
    this.ground.body.immovable = true
    this.ground.body.moves = false

    this.background = this.add.tileSprite(400, 200, 320, 208, 'background').setScale(2.5)
    this.trees = this.add.tileSprite(400, 200, 640, 208, 'trees').setScale(2)
    this.foreground = this.add.tileSprite(400, 200, 640, 208, 'foreground').setScale(2)
    this.fog = this.add.tileSprite(400, 200, 640, 208, 'fog').setScale(2)
  }

  createInfo () {
    this.distance = 0
    this.score = 0
    this.lives = 3

    this.board = this.add.image(15, 15, 'board').setScale(0.2, 0.12).setOrigin(0, 0).setDepth(5)

    this.subF = this.add.image(50, 25, 'sub').setScale(0.2, 0.12).setOrigin(0, 0).setDepth(5)
    this.flag = this.add.image(25, 24, 'flag').setScale(0.12).setOrigin(0, 0).setDepth(5)
    this.distText = this.add.text(60, 25, `${this.distance}`, { font: '18px Calibri', color: '#000' }).setOrigin(0, 0).setDepth(5)

    this.subD = this.add.image(50, 52, 'sub').setScale(0.2, 0.12).setOrigin(0, 0).setDepth(5)
    this.bag = this.add.image(24, 52, 'bag').setScale(0.1).setOrigin(0, 0).setDepth(5)
    this.scoreText = this.add.text(60, 52, `${this.score}`, { font: '18px Calibri', color: '#000' }).setDepth(5)

    this.heart1 = this.add.image(35, 78, 'heart').setScale(0.13).setOrigin(0, 0).setDepth(5)
    this.heart2 = this.add.image(93, 78, 'heart').setScale(0.13).setOrigin(0, 0).setDepth(5)
    this.heart3 = this.add.image(150, 78, 'heart').setScale(0.13).setOrigin(0, 0).setDepth(5)

    this.homeIcon = this.add.image(15, 360, 'homeButton').setScale(0.15).setOrigin(0, 0)
    this.homeIcon.setInteractive()
    this.homeIcon.on('pointerdown', () => {
      this.isPaused = true
      this.pauseGame()
      this.pauseIcon.disableInteractive()
      this.confirmation = this.add.image(15, 240, 'confirmationBanner').setScale(0.25, 0.18).setOrigin(0, 0).setDepth(6)
      this.confText = this.add.text(25, 250, 'Do you really want to exit?', { font: '18px Calibri', color: '#000' }).setDepth(6)

      this.yesButton = this.add.image(30, 275, 'square').setScale(0.5, 0.22).setOrigin(0, 0).setDepth(6)
      this.yesIcon = this.add.image(42, 282, 'yesButton').setScale(0.13).setOrigin(0, 0).setDepth(6)
      this.yesText = this.add.text(70, 285, 'YES', { font: '20px Calibri', color: '#000' }).setDepth(6)
      this.yesButton.setInteractive()
      this.yesButton.on('pointerdown', () => { this.music.stop(); this.scene.start('preload') })

      this.noButton = this.add.image(130, 275, 'square').setScale(0.5, 0.22).setOrigin(0, 0).setDepth(6)
      this.noIcon = this.add.image(142, 282, 'noButton').setScale(0.13).setOrigin(0, 0).setDepth(6).setTint(0x76A3BE)
      this.noText = this.add.text(172, 285, 'NO', { font: '20px Calibri', color: '#000' }).setDepth(6)
      this.noButton.setInteractive()
      this.noButton.on('pointerdown', () => {
        this.isPaused = false
        this.resumeGame()
        this.pauseIcon.setInteractive()
        this.confirmation.visible = false
        this.confText.visible = false
        this.yesButton.visible = false
        this.yesIcon.visible = false
        this.yesText.visible = false
        this.noButton.visible = false
        this.noIcon.visible = false
        this.noText.visible = false
      })
    })

    this.createSoundIcon() // !!! Start the game with wrong icon. Fix later

    this.isPaused = false
    this.pauseIcon = this.add.image(105, 360, 'pauseButton').setScale(0.18).setOrigin(0, 0)
    this.pauseIcon.setInteractive()
    this.pauseIcon.on('pointerdown', () => {
      this.isPaused ? this.resumeGame() : this.pauseGame()
      this.isPaused = !this.isPaused
    })
  }

  createSoundIcon () {
    this.soundIcon = this.game.sound.mute ? this.add.image(60, 360, 'soundOn').setScale(0.15).setOrigin(0, 0) : this.add.image(58, 360, 'soundOff').setScale(0.15).setOrigin(0, 0)
    this.soundIcon.setInteractive()
    this.soundIcon.on('pointerdown', () => { this.game.sound.mute = !this.game.sound.mute; this.soundIcon.visible = false; this.createSoundIcon() })
  }

  pauseGame () {
    this.physics.pause()
    this.player.anims.pause()
    this.enemies.children.iterate((enemy) => { enemy.anims.pause() })
    this.wolf.anims.pause()
    this.timedEnemy.paused = true
    this.timedCandy.paused = true
    this.timedGrandma.paused = true
  }

  resumeGame () {
    this.physics.resume()
    this.player.anims.resume()
    this.enemies.children.iterate((enemy) => { enemy.anims.resume() })
    this.wolf.anims.resume()
    this.timedEnemy.paused = false
    this.timedCandy.paused = false
    this.timedGrandma.paused = false
  }

  createPlayer () {
    this.player = this.physics.add.sprite(350, 300, 'red').setScale(3.5).setDepth(5)
    this.player.setCircle(12, 18, 8)
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, this.ground)

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('red', { start: 0, end: 23 }),
      frameRate: 25,
      repeat: -1
    })

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('redJump', { start: 0, end: 18 }),
      frameRate: 16
    })

    this.anims.create({
      key: 'hitplayer',
      frames: this.anims.generateFrameNumbers('redHurt', { start: 0, end: 6 }),
      frameRate: 25
    })
  }

  createWolf () {
    this.wolf = this.physics.add.sprite(80, 300, 'wolf').setScale(5).setDepth(5)
    this.wolf.setCircle(8, 10, 4)

    this.wolf.setCollideWorldBounds(true)
    this.physics.add.collider(this.wolf, this.ground)

    this.anims.create({
      key: 'chase',
      frames: this.anims.generateFrameNumbers('wolf', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'howl',
      frames: this.anims.generateFrameNumbers('wolfHowl', { start: 0, end: 1 }),
      frameRate: 3
    })
  }

  createCursor () {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  createParticles () {
    this.candyParticles = this.add.particles('star')
    this.emitter1 = this.candyParticles.createEmitter(ParticleConfig)

    this.grandmaParticles = this.add.particles('heart')
    this.emitter2 = this.grandmaParticles.createEmitter(ParticleConfig)
  }

  // -----------------------------------
  // Grandma - Create, Add and Add Life

  createGrandma () {
    this.timedGrandma = this.time.addEvent({ delay: 200000, callback: this.addGrandma, callbackScope: this, loop: true })
  }

  addGrandma () {
    this.timedGrandma.reset({ delay: 200000, callback: this.addGrandma, callbackScope: this, loop: true })
    this.grandma = this.physics.add.image(800, 230, 'grandma').setScale(0.8)
    this.grandma.body.setAllowGravity(false)
    this.grandma.setVelocityX(-600)
    this.physics.add.overlap(this.player, this.grandma, this.addLife, null, this)
  }

  addLife () {
    if (this.lives < 3) {
      this.lives += 1
      this.lives === 3 ? this.heart3.clearTint() : this.heart2.clearTint()
      this.grandmaParticles.emitParticleAt(this.grandma.x, this.grandma.y, 100)
      this.grandma.destroy()
      this.player.setX(this.player.body.position.x + 120)
      this.bonus.play()
    }
  }

  // ----------------------------------
  // Candies - Create, Add and Collect

  createCandies () {
    this.candies = this.physics.add.group({ allowGravity: false })
    this.physics.add.collider(this.candies, this.ground)
    this.physics.add.overlap(this.player, this.candies, this.collectCandy, null, this)
    this.timedCandy = this.time.addEvent({ delay: 1000, callback: this.addCandy, callbackScope: this, loop: true })
  }

  addCandy () {
    const candyNum = Phaser.Math.Between(1, 5)
    this.timedCandy.reset({ delay: Phaser.Math.Between(1000 - this.difficulty, 4000 - this.difficulty), callback: this.addCandy, callbackScope: this, loop: true })
    const candy = this.candies.create(800, Phaser.Math.Between(75, 330), `candy${candyNum}`)
    candy.setScale(0.25)
    candy.setVelocityX(-600)
  }

  collectCandy (player, candy) {
    candy.destroy()
    this.collect.play()
    this.candyParticles.emitParticleAt(candy.x, candy.y, 40)
    this.score += 1
    this.scoreText.setText(`${this.score}`)
  }

  // ------------------------------
  // Enemies - Create, Add and Hit

  createEnemies () {
    this.enemies = this.physics.add.group()
    this.physics.add.collider(this.enemies, this.ground)
    this.physics.add.collider(this.player, this.enemies, this.hitEnemy, null, this)
    this.timedEnemy = this.time.addEvent({ delay: 1500, callback: this.addEnemy, callbackScope: this, loop: true })

    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('skull', { start: 0, end: 7 }),
      frameRate: 7,
      repeat: -1
    })

    this.anims.create({
      key: 'haunt',
      frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'hitghost',
      frames: this.anims.generateFrameNumbers('ghostDead', { start: 0, end: 7 }),
      frameRate: 30
    })
  }

  addEnemy () {
    const enemyNum = Phaser.Math.Between(1, 2) // 1 = skull, 2 = ghost
    this.timedEnemy.reset({ delay: Phaser.Math.Between(1000 - this.difficulty, 3500 - this.difficulty), callback: this.addEnemy, callbackScope: this, loop: true })
    if (enemyNum === 1) {
      const enemy = this.enemies.create(800, 310, 'skull')
      enemy.setCircle(20, 2)
      enemy.anims.play('turn', true)
      enemy.setBounceY(1)
      enemy.setVelocityX(Phaser.Math.Between(-620 - this.difficulty / 5, -580 - this.difficulty / 5))
      enemy.setVelocityY(Phaser.Math.Between(0, 150))
    } else {
      const enemy = this.enemies.create(800, Phaser.Math.Between(70, 210), 'ghost').setScale(2)
      enemy.body.setAllowGravity(false)
      enemy.setCircle(13, 3, 4)
      enemy.anims.play('haunt', true)
      enemy.setVelocityX(Phaser.Math.Between(-400 - this.difficulty / 5, -300 - this.difficulty / 5))
    }
  }

  hitEnemy (player, enemy) {
    if (enemy.anims.isPlaying && enemy.anims.currentAnim.key === 'turn') {
      this.updateLives()
      if (this.lives !== 0) {
        player.anims.play('hitplayer', false)
        player.setX(this.player.body.position.x + 40)
        enemy.destroy()
        this.hit.play()
      }
    } else if (enemy.anims.isPlaying && enemy.anims.currentAnim.key === 'haunt') {
      this.updateLives()
      if (this.lives !== 0) {
        player.anims.play('hitplayer', false)
        player.setX(this.player.body.position.x + 40)
        enemy.anims.play('hitghost', false)
        enemy.once('animationcomplete', () => { enemy.destroy() })
        this.hit.play()
      }
    }
  }

  updateLives () {
    this.lives === 3 ? this.heart3.setTint(0x000000) : this.lives === 2 ? this.heart2.setTint(0x000000) : this.heart1.setTint(0x000000)
    this.lives -= 1
    if (this.lives === 0) {
      this.gameOver = true
      this.music.stop()
      this.death.play()
      this.physics.pause()
      this.player.disableBody(true, true)
      this.enemies.children.iterate((enemy) => { enemy.disableBody(true, true) })
      this.candies.children.iterate((candy) => { candy.disableBody(true, true) })
      this.wolf.anims.pause()
      this.homeIcon.removeInteractive()
      this.pauseIcon.removeInteractive()
      this.soundIcon.removeInteractive()
      this.timedEnemy.reset({ loop: false })
      this.timedCandy.reset({ loop: false })
      this.timedGrandma.reset({ loop: false })
    }
  }

  endGame () {
    this.board = this.add.image(400, 115, 'board').setScale(0.25)
    this.gameOverText = this.add.text(400, 85, 'Game\nOver', { font: '64px Calibri', fill: '#000', align: 'center' })
    this.gameOverText.setOrigin(0.5)
    this.tryAgain = this.add.image(345, 180, 'sub').setScale(0.14, 0.3)
    this.tryAgainText = this.add.text(307, 170, 'Try Again', { font: '20px Calibri', fill: '#000' })
    this.tryAgain.setInteractive()
    this.tryAgain.on('pointerdown', () => { this.scene.start('game') })

    this.backHome = this.add.image(457, 180, 'sub').setScale(0.14, 0.3)
    this.backHomeText = this.add.text(430, 170, 'Home', { font: '20px Calibri', fill: '#000' })
    this.backHome.setInteractive()
    this.backHome.on('pointerdown', () => { this.scene.start('preload') })

    this.wolf.anims.play('howl', true)
    this.wolf.setX(400)
  }

  checkJump () {
    if (this.input.x > 201 && this.input.y < 370) {
      this.jump = true
    }
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // Update

  update () {
    if (this.isPaused) {
      this.pauseGame()
    } else if (!this.gameOver) {
      this.distance += 1 / 15
      this.difficulty = this.difficulty >= 1000 ? 1000 : (this.difficulty + 1 / 50)
      this.distText.setText(`${Math.round(this.distance)}`)
      this.wolf.anims.play('chase', true)

      // Move the environment
      this.background.tilePositionX += 1
      this.trees.tilePositionX += 2
      this.foreground.tilePositionX += 4
      this.ground.tilePositionX += 4
      this.fog.tilePositionX += 2

      this.input.on('pointerdown', () => this.checkJump())

      if ((this.cursors.up.isDown || this.cursors.space.isDown || this.jump) && this.player.body.onFloor()) {
        this.player.setVelocityY(-800)
        this.player.anims.play('jump', true)
        this.jump = false
      }

      if (!this.player.anims.isPlaying && this.player.body.onFloor()) {
        this.player.anims.play('run', true)
      }
    } else {
      this.endGame()
    }
  }
}

export default GameScene
