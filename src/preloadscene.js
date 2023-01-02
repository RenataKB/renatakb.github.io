class PreloadScene extends Phaser.Scene {
  constructor () {
    super('preload')
  }

  preload () {
    // Environment
    this.load.image('background', 'assets/environment/background.png')
    this.load.image('trees', 'assets/environment/trees.png')
    this.load.image('foreground', 'assets/environment/foreground.png')
    this.load.image('fog', 'assets/environment/fog.png')

    // Interface
    this.load.image('menu', 'assets/interface/Item2.png')
    this.load.image('board', 'assets/interface/Item3.png')
    this.load.image('band', 'assets/interface/Item4.png')
    this.load.image('sub', 'assets/interface/Item5.png')

    this.load.image('playButton', 'assets/interface/Icon_Play.png')
    this.load.image('settingsButton', 'assets/interface/Icon_Settings.png')
    this.load.image('awardButton', 'assets/interface/Icon_Award.png')

    this.load.image('soundOn', 'assets/interface/Icon_SoundOn.png')
    this.load.image('soundOff', 'assets/interface/Icon_SoundOff.png')

    this.load.image('ghostIcon', 'assets/interface/Icon_Ghost.png')
    this.load.image('skullIcon', 'assets/interface/Icon_Skull.png')

    // Audio
    this.load.audio('bgmusic', 'assets/audio/Nostalgic.ogg')
  }

  create () {
    this.createBG()
    this.createBGSound()
    this.createMenu()
  }

  createBG () {
    this.background = this.add.tileSprite(400, 200, 320, 208, 'background').setScale(2.5)
    this.trees = this.add.tileSprite(400, 200, 640, 208, 'trees').setScale(2)
    this.foreground = this.add.tileSprite(400, 200, 640, 208, 'foreground').setScale(2)
    this.fog = this.add.tileSprite(400, 200, 640, 208, 'fog').setScale(2)
  }

  createBGSound () {
    this.bgmusic = this.sound.add('bgmusic')
    this.bgmusic.setLoop(true)
    this.bgmusic.play()
  }

  createMenu () {
    this.menu = this.add.image(400, 100, 'menu').setScale(0.25)
    this.band = this.add.image(400, 100, 'band').setScale(0.25)

    this.nameText1 = this.add.text(280, 68, 'Run,', { font: '40px Calibri', color: '#000' })
    this.nameText1.setAngle(-10)
    this.nameText2 = this.add.text(365, 55, 'Red,', { font: '40px Calibri', color: '#000' })
    this.nameText3 = this.add.text(448, 56, 'Run!', { font: '40px Calibri', color: '#000' })
    this.nameText3.setAngle(10)

    this.board = this.add.image(400, 250, 'board').setScale(0.25)

    this.subPlay = this.add.image(400, 190, 'sub').setScale(0.3)
    this.playButton = this.add.image(320, 190, 'playButton').setScale(0.18)
    this.playText = this.add.text(350, 175, 'Play', { font: '30px Calibri', color: '#000' }).setOrigin(0, 0)
    this.subPlay.setInteractive()
    this.subPlay.on('pointerdown', () => { this.bgmusic.stop(); this.scene.start('game') })

    this.settings = false
    this.subSettings = this.add.image(400, 250, 'sub').setScale(0.3)
    this.settingsButton = this.add.image(320, 250, 'settingsButton').setScale(0.15)
    this.settingsText = this.add.text(350, 235, 'Settings', { font: '30px Calibri', color: '#000' }).setOrigin(0, 0)
    this.subSettings.setInteractive()
    this.subSettings.on('pointerdown', () => { this.settings ? this.hideSettings() : this.createSettings() })

    this.awards = false
    this.subAward = this.add.image(400, 310, 'sub').setScale(0.3)
    this.awardButton = this.add.image(320, 310, 'awardButton').setScale(0.15)
    this.awardText = this.add.text(350, 295, 'Awards', { font: '30px Calibri', color: '#000' }).setOrigin(0, 0)
    this.subAward.setInteractive()
    this.subAward.on('pointerdown', () => { this.awards ? this.hideAwards() : this.createAwards() })
  }

  createSettings () {
    this.boardSetting = this.add.image(650, 250, 'board').setScale(0.25)

    this.subS1 = this.add.image(650, 250, 'sub').setScale(0.3)
    this.soundOn = this.add.image(575, 250, 'soundOn').setScale(0.18)
    this.soundOnText = this.add.text(605, 235, 'Sound On', { font: '30px Calibri', color: '#000' }).setOrigin(0, 0)
    this.subS1.setInteractive()
    this.subS1.on('pointerdown', () => { this.game.sound.mute = false })

    this.subS2 = this.add.image(650, 310, 'sub').setScale(0.3)
    this.soundOff = this.add.image(575, 310, 'soundOff').setScale(0.18)
    this.soundOffText = this.add.text(605, 295, 'Sound Off', { font: '30px Calibri', color: '#000' }).setOrigin(0, 0)
    this.subS2.setInteractive()
    this.subS2.on('pointerdown', () => { this.game.sound.mute = true })
    this.settings = true
  }

  hideSettings () {
    this.boardSetting.visible = false
    this.subS1.visible = false
    this.soundOn.visible = false
    this.soundOnText.visible = false
    this.subS2.visible = false
    this.soundOff.visible = false
    this.soundOffText.visible = false
    this.settings = false
  }

  createAwards () {
    this.boardAward = this.add.image(150, 250, 'board').setScale(0.25)
    this.awardText = this.add.text(70, 200, 'Sorry!\nNothing here', { font: '30px Calibri', color: '#000', align: 'center' }).setOrigin(0, 0)
    this.ghostIcon = this.add.image(110, 310, 'ghostIcon').setScale(0.18)
    this.skullIcon = this.add.image(170, 310, 'skullIcon').setScale(0.18)
    this.awards = true
  }

  hideAwards () {
    this.boardAward.visible = false
    this.awardText.visible = false
    this.ghostIcon.visible = false
    this.skullIcon.visible = false
    this.awards = false
  }

  update () {
    this.fog.tilePositionX += 2
  }
}

export default PreloadScene
