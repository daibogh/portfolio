import { useState, useCallback, useEffect, useMemo } from 'react';
const MAX_DELAY = 60;

export const useTextAnimation = ({
  text,
  shouldAnimate = false,
  onTypeEnd,
}: {
  text: string;
  shouldAnimate?: boolean;
  onTypeEnd: () => void;
}) => {
  const [visibleText, setVisibleText] = useState(shouldAnimate ? '' : text);
  const [shouldShowCursor, setShouldShowCursor] = useState(shouldAnimate);

  const updateVisibleText = useCallback(
    (idx: number, options: { timer: any }) => {
      if (idx >= text.length) {
        setShouldShowCursor(false);
        onTypeEnd();
        return;
      }
      setShouldShowCursor(true);
      options.timer = setTimeout(() => {
        setVisibleText(text.slice(0, idx + 1));
        updateVisibleText(idx + 1, options);
      }, Math.floor(Math.random() * MAX_DELAY));
    },
    [text, onTypeEnd],
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
  }, [updateVisibleText, shouldAnimate]);
  return useMemo(
    () => ({ visibleText, shouldShowCursor }),
    [visibleText, shouldShowCursor],
  );
};
