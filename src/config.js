import PreloadScene from './preloadscene.js'
import GameScene from './gamescene.js'

const config = {
  type: Phaser.AUTO,
  parent: 'gamecanvas',
  width: 800,
  height: 400,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 400
  },
  scene: [PreloadScene, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1500 }
      // debug: true,
    }
  }
}

export default config
