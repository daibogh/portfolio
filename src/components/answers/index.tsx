import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { TextAnimation } from '../TextAnimation';
import { Response } from '../../stores/chat/data';
import { BugsCombat } from '../BugsCombat';
import styles from './index.module.css';
const customMessagesDictionary: Record<string, FC> = {
  bugsCombat: BugsCombat,
};
const CustomComponentWrapper: FC<{
  onRenderEnd: () => void;
  children: ReactNode;
}> = ({ children, onRenderEnd }) => {
  useLayoutEffect(() => {
    onRenderEnd();
  }, []);
  return <>{children}</>;
};
export const AnswerResolver: FC<{
  onTypeEnd: () => void;
  isTyping: boolean;
  messageConfigs: Response[];
}> = ({ messageConfigs, onTypeEnd, isTyping }) => {
  const [shownMessages, setShownMessages] = useState(
    isTyping ? [messageConfigs[0]] : messageConfigs,
  );
  const [isPartBeignTyped, setIsPartBeignTyped] = useState(isTyping);
  useEffect(() => {
    console.log('isTyping', isTyping);
    console.log('isPartBeignTyped', isPartBeignTyped);
    console.log('shownMessages', shownMessages);
    if (!isPartBeignTyped && isTyping) {
      if (messageConfigs.length > shownMessages.length) {
        setShownMessages([
          ...shownMessages,
          messageConfigs[shownMessages.length],
        ]);
        setIsPartBeignTyped(true);
      } else {
        onTypeEnd();
      }
    }
  }, [isPartBeignTyped, isTyping]);
  const onPartBeingTypedEnd = useCallback(() => {
    setIsPartBeignTyped(false);
  }, []);
  return (
    <>
      {shownMessages.map((messageConfig, idx) => {
        const { id, text } = messageConfig;
        const CustomComponent: FC | null =
          (id && customMessagesDictionary[id]) || null;
        return (
          <div className={styles.messageLeft}>
            {text ? (
              <TextAnimation
                text={text}
                shouldAnimate={
                  isPartBeignTyped && idx === shownMessages.length - 1
                }
                onTypeEnd={onPartBeingTypedEnd}
              />
            ) : null}
            {CustomComponent ? (
              <CustomComponentWrapper onRenderEnd={onPartBeingTypedEnd}>
                <CustomComponent />
              </CustomComponentWrapper>
            ) : null}
          </div>
        );
      })}
    </>
  );
};
