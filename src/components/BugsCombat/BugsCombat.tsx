import { FC, useLayoutEffect, useRef } from 'react';
import styles from './BugsCombat.module.css';
import { createGame } from './phaserGame';
const BugsCombat: FC = () => {
  const game = useRef<ReturnType<typeof createGame>>();
  const areaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!game.current) {
      game.current = createGame(areaRef);
    }
  }, []);
  return (
    <div ref={areaRef} id="bugs-combat" className={styles.bugsCombatArea} />
  );
};

export default BugsCombat;
