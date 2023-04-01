import Phaser from 'phaser';
import bugSrc from '../assets/bug.png';
export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super('helloworld');
  }

  preload() {
    // this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('logo', bugSrc);
    this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');
  }

  create() {
    this.createEmitter();
  }

  createEmitter() {
    const particles = this.add.particles('red');

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    });

    const logo = this.physics.add.image(400, 100, 'logo');
    logo.setScale(0.1, 0.1);
    logo.width = 25;
    logo.height = 25;
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }
}
