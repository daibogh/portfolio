import Phaser from 'phaser';

import HelloWorldScene from './scenes/HelloWorldScene';
import { RefObject } from 'react';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'bugs-combat',
  backgroundColor: '#282c34',
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [HelloWorldScene],
};

export default (ref: RefObject<HTMLDivElement>) =>
  new Phaser.Game({
    ...config,
    scale: {
      mode: Phaser.Scale.ScaleModes.RESIZE,
      width: ref.current?.offsetWidth,
      height: ref.current?.offsetHeight,
    },
  });
