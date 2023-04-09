import { FC, useCallback, useEffect, useState } from 'react';
import { TextAnimation } from '../TextAnimation';
import { Response } from '../../stores/chat/data';
import { BugsCombat } from '../BugsCombat';
import styles from './AnswerResolver.module.css';
import { CustomAnswerWrapper } from '../CustomAnswerWrapper';
import { DoggoImage } from '../DoggoImage';
const customMessagesDictionary: Record<string, FC> = {
  bugsCombat: BugsCombat,
  doggoImage: DoggoImage,
};

const AnswerResolver: FC<{
  onTypeEnd: () => void;
  isTyping: boolean;
  messageConfigs: Response[];
}> = ({ messageConfigs, onTypeEnd, isTyping }) => {
  const [shownMessages, setShownMessages] = useState(
    isTyping ? [messageConfigs[0]] : messageConfigs,
  );
  const [isPartBeignTyped, setIsPartBeignTyped] = useState(isTyping);
  useEffect(() => {
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
  }, [isPartBeignTyped, isTyping, messageConfigs, shownMessages, onTypeEnd]);
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
              <CustomAnswerWrapper onRenderEnd={onPartBeingTypedEnd}>
                <CustomComponent />
              </CustomAnswerWrapper>
            ) : null}
          </div>
        );
      })}
    </>
  );
};
export default AnswerResolver;
