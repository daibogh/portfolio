import { FC } from 'react';
import cn from 'classnames';
import s from './TextAnimation.module.css';
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
    <div className={cn(s.animatedText, className)}>
      {visibleText}

      {shouldShowCursor && <span className={s.cursor} data-testid="cursor" />}
    </div>
  );
};
export default TextAnimation;
