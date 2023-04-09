import { FC } from 'react';
import cn from 'classnames';
import styles from './TextAnimation.module.css';
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
  const { visibleText, shouldHideCursor } = useTextAnimation({
    text,
    onTypeEnd,
    shouldAnimate,
  });
  return (
    <div className={cn(styles.animatedText, className)}>
      {visibleText}
      {!shouldHideCursor && (
        <span className={styles.cursor} data-testid="cursor" />
      )}
    </div>
  );
};
export default TextAnimation;
