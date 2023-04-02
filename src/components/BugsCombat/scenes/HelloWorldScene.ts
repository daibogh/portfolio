import Phaser from 'phaser';
import bugSrc from '../assets/bug.png';
import developerSrc from '../assets/developer.png';
export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super('helloworld');
  }

  preload() {
    // this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('bug', bugSrc);
    this.load.image('developer', developerSrc);
    this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');

    this.anims.create({
      key: 'shake',
      frames: [
        { key: 'bug', frame: 1 },
        { key: 'bug', frame: 2 },
      ],
      frameRate: 10,
      repeat: 4,
    });
  }

  create() {
    this.createEmitter();
  }

  createEmitter() {
    const bug = this.physics.add.image(400, 50, 'bug');

    bug.setScale(0.1, 0.1);
    bug.setVelocity(100, 0);
    bug.setBounce(1, 1);
    bug.setCollideWorldBounds(true);
    bug.body.allowGravity = false;

    const developer = this.physics.add.image(0, 0, 'developer');
    developer.setScale(0.1, 0.1);
    developer.x = +this.game.config.width / 2;
    developer.y = +this.game.config.height - developer.displayHeight;
    developer.setCollideWorldBounds(true);

    this.physics.world.setBoundsCollision(true, true, true, true);

    const bullets = this.physics.add.group();

    this.physics.add.collider(
      bug,
      bullets,
      undefined,
      (bug, bullet) => {
        //@ts-ignore
        bullet.setScale(1, 1);
        this.time.delayedCall(
          200,
          function () {
            //@ts-ignore
            bullet.destroy();
          },
          [],
          this,
        );
      },
      this,
    );

    bug.body.blocked.up = true;
    bug.body.checkCollision.up = false;

    const fireBullet = () => {
      const bullet = this.physics.add.image(developer.x, developer.y, 'red');

      bullet.setScale(0.5, 0.5);
      bullets.add(bullet);
      this.physics.moveToObject(bullet, bug, 500);
    };

    const shootTimer = this.time.addEvent({
      delay: 600,
      callback: fireBullet,
      callbackScope: this,
      loop: true,
    });
  }
}
