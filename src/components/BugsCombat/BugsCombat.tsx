import { FC, useLayoutEffect, useRef } from 'react';
import styles from './BugsCombat.module.css';
import { createGame } from './phaserGame';
import { useMedia } from 'use-media';
const BugsCombat: FC = () => {
  const game = useRef<ReturnType<typeof createGame>>();
  const areaRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMedia({ minWidth: '768px' });
  useLayoutEffect(() => {
    if (!game.current) {
      game.current = createGame(areaRef, isDesktop);
    }
  }, []);
  return (
    <div ref={areaRef} id="bugs-combat" className={styles.bugsCombatArea} />
  );
};

export default BugsCombat;
