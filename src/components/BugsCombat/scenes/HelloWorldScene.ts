import Phaser from 'phaser';
import bugSrc from '../assets/bug.png';
import developerSrc from '../assets/developer.png';
type DynamicBody = Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super('helloworld');
  }
  randomPhrases = [
    `That's a feature!`,
    'I will cover it with\n test!',
    'Send to backlog!',
    '//TODO: fix it later',
    'Assigned a meeting\nto discuss it',
    'Hm mb fix it\non backend?',
  ];
  gameState: {
    developer: DynamicBody;
    bugs: Phaser.Physics.Arcade.Group;
    genBugs: () => void;
    enemyVelocity: number;
    leftMostBug: DynamicBody;
    rightMostBug: DynamicBody;
    isInCollision: boolean;
    shootTimer: Phaser.Time.TimerEvent;
    rotationCoef: number;
    rotationLimit: number;
  } = {
    enemyVelocity: 0.3,
    isInCollision: false,
    rotationCoef: 0.01,
    rotationLimit: 1,
  } as any;
  preload() {
    this.load.image('bug', bugSrc);
    this.load.image('developer', developerSrc);
    this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');
  }

  create() {
    this.createBugs();
    this.createDeveloper();
    this.createBullets();
  }
  createBugs() {
    const bugs = this.physics.add.group();
    function genBug(x: number, y: number) {
      bugs
        .create(x, y, 'bug')
        .setScale(0.1)
        .setGravityY(-200)
        .setCollideWorldBounds(true);
    }
    this.gameState.bugs = bugs;
    function genBugs() {
      for (let yVal = 1; yVal < 4; yVal++) {
        for (let xVal = 1; xVal < 6; xVal += 2) {
          genBug(50 * xVal, 70 * yVal);
        }
      }
    }
    this.gameState.genBugs = genBugs.bind(this);
  }
  createDeveloper() {
    const developer = this.physics.add.image(0, 0, 'developer').setScale(0.1);
    developer.x = +this.game.config.width / 2;
    developer.y = +this.game.config.height - developer.displayHeight;
    developer.setCollideWorldBounds(true);
    this.physics.add.collider(
      developer,
      this.gameState.bugs,
      //@ts-ignore
      (developer: DynamicBody, bug: DynamicBody) => {
        if (this.gameState.isInCollision) {
          return;
        }
        this.gameState.isInCollision = true;
        const phrase = Phaser.Utils.Array.GetRandom(this.randomPhrases);
        const text = this.add.text(
          developer.x - 100,
          developer.y - 50,
          phrase,
          {
            color: 'green',
            backgroundColor: 'white',
            fontSize: '20px',
            padding: { x: 5, y: 5 },
          },
        );
        text.x = +this.game.config.width / 2 - text.displayWidth / 2;
        this.time.delayedCall(
          2500,
          () => {
            bug.destroy();
            text.destroy();
            this.gameState.isInCollision = false;
          },
          [],
        );
      },
    );
    this.gameState.developer = developer;
  }
  createBullets() {
    const bullets = this.physics.add.group();
    this.physics.add.collider(
      this.gameState.bugs,
      bullets,
      //@ts-ignore
      (bug: DynamicBody, bullet: DynamicBody) => {
        bullet.destroy();
        bug.setTint(0xff0000);
        bug.destroy();
        // this.gameState.genBug(Math.random() * +this.game.config.width, 50);
      },
    );
    const fireBullet = () => {
      const bullet = this.physics.add.image(
        this.gameState.developer.x,
        this.gameState.developer.y,
        'red',
      );

      bullet.setScale(0.5, 0.5);
      bullets.add(bullet);
      this.physics.moveToObject(
        bullet,
        Phaser.Utils.Array.GetRandom(this.gameState.bugs.getChildren()),
        500,
      );
    };

    this.gameState.shootTimer = this.time.addEvent({
      delay: 1000,
      callback: fireBullet,
      callbackScope: this,
      loop: true,
    });
  }
  sortedEnemies(): DynamicBody[] {
    const orderedByXCoord = this.gameState.bugs
      .getChildren()
      //@ts-ignore
      .sort((a: DynamicBody, b: DynamicBody) => a.x - b.x);
    return orderedByXCoord as any;
  }
  update() {
    if (this.gameState.bugs.getChildren().length === 0) {
      this.gameState.genBugs();
      if (this.gameState.shootTimer) {
        this.gameState.shootTimer.destroy();
      }
      this.createBullets();
    } else if (this.gameState.bugs.getChildren().length === 1) {
      this.gameState.shootTimer.destroy();
      this.physics.moveToObject(
        this.gameState.bugs.getChildren()[0],
        this.gameState.developer,
        500,
      );
    } else {
      this.gameState.bugs
        .getChildren()
        //@ts-ignore
        .forEach((bug: DynamicBody) => {
          bug.x += this.gameState.enemyVelocity;
          bug.rotation += this.gameState.rotationCoef;
        });
      const bug = this.gameState.bugs.getChildren()[0] as any as DynamicBody;
      if (Math.abs(bug.rotation) >= Math.abs(this.gameState.rotationLimit)) {
        this.gameState.rotationCoef *= -1;
        this.gameState.rotationLimit *= -1;
      }
      this.gameState.leftMostBug = this.sortedEnemies()[0];
      this.gameState.rightMostBug = this.sortedEnemies().reverse()[0];
      if (
        this.gameState.leftMostBug.x < 30 ||
        this.gameState.rightMostBug.x > +this.game.config.width - 30
      ) {
        this.gameState.enemyVelocity *= -1;
        this.gameState.bugs
          .getChildren()
          //@ts-ignore
          .forEach((bug: DynamicBody) => (bug.y += 20));
      }
    }
  }
}
