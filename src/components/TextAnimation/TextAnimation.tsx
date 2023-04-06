import { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './TextAnimation.module.css';
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
  const [visibleText, setVisibleText] = useState(shouldAnimate ? '' : text);
  const [shouldHideCursor, setShouldHideCursor] = useState(!shouldAnimate);

  const updateVisibleText = useCallback(
    (idx: number, options: { timer: any }) => {
      if (idx >= text.length) {
        setShouldHideCursor(true);
        onTypeEnd();
        return;
      }
      options.timer = setTimeout(() => {
        setVisibleText(text.slice(0, idx + 1));
        updateVisibleText(idx + 1, options);
      }, Math.floor(Math.random() * 300));
    },
    [text],
  );

  useEffect(() => {
    if (!shouldAnimate) return;
    const timerOptions = { timer: null };
    updateVisibleText(0, timerOptions);
    return () => {
      if (timerOptions.timer) {
        clearTimeout(timerOptions.timer);
      }
    };
  }, [updateVisibleText]);

  return (
    <div className={cn(styles.animatedText)}>
      {visibleText}
      {!shouldHideCursor && <span className={styles.cursor} />}
    </div>
  );
};
export default TextAnimation;
