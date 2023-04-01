import { FC, useCallback, useEffect, useState } from 'react';
import styles from './TextAnimation.module.css';
type TextAnimationProps = {
  text: string;
};

const TextAnimation: FC<TextAnimationProps> = ({ text }) => {
  const [visibleText, setVisibleText] = useState('');
  const updateVisibleText = useCallback(
    (idx: number, options: { timer: any }) => {
      console.log(idx);
      if (idx >= text.length) {
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
    const timerOptions = { timer: null };
    updateVisibleText(0, timerOptions);
    return () => {
      if (timerOptions.timer) {
        clearTimeout(timerOptions.timer);
      }
    };
  }, [updateVisibleText]);
  return <div className={styles.animatedText}>{visibleText}</div>;
};
export default TextAnimation;
