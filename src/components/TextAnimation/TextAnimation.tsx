import { FC } from 'react';
import cn from 'classnames';
import styles from './TextAnimation.module.css';
import { useTextAnimation } from './use-text-animation';
type TextAnimationProps = {
  text: string;
  shouldAnimate?: boolean;
  onTypeEnd?: () => void;
};
const noop = () => {};
const TextAnimation: FC<TextAnimationProps> = ({
  text,
  onTypeEnd = noop,
  shouldAnimate,
}) => {
  const { visibleText, shouldHideCursor } = useTextAnimation({
    text,
    onTypeEnd,
    shouldAnimate,
  });
  return (
    <div className={cn(styles.animatedText)}>
      {visibleText}
      {!shouldHideCursor && (
        <span className={styles.cursor} data-testid="cursor" />
      )}
    </div>
  );
};
export default TextAnimation;
