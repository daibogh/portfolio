import { FC } from 'react';
import { cn } from '../../../../lib/utils';
import { useTextAnimation } from './use-text-animation';

type TextAnimationProps = {
  text: string;
  shouldAnimate?: boolean;
  onTypeEnd?: () => void;
  className?: string;
};

const noop = () => {};

const TextAnimation: FC<TextAnimationProps> = ({
  text,
  onTypeEnd = noop,
  shouldAnimate,
  className,
}) => {
  const { visibleText, shouldShowCursor } = useTextAnimation({
    text,
    onTypeEnd,
    shouldAnimate,
  });

  return (
    <div className={cn("relative", className)}>
      {visibleText}
      {shouldShowCursor && (
        <span 
          className={cn(
            "inline-block w-0.5 h-4 ml-0.5 bg-primary animate-pulse",
            "align-middle"
          )} 
          data-testid="cursor" 
        />
      )}
    </div>
  );
};

export default TextAnimation;
