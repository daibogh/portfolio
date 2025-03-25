import { FC, useLayoutEffect, useRef } from 'react';
import { cn } from '../../../../lib/utils';
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
    <div 
      ref={areaRef} 
      id="bugs-combat" 
      className={cn(
        "aspect-video w-[320px] h-[480px]",
        "rounded-lg overflow-hidden",
        "bg-background border border-border",
        "shadow-md",
        "mx-auto"
      )} 
    />
  );
};

export default BugsCombat;
