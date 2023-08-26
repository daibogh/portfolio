import { FC, useCallback, useEffect, useState } from 'react';
import { TextAnimation } from '../TextAnimation';
import { Response } from '../../store';
import { BugsCombat } from '../BugsCombat';
import { CustomAnswerWrapper } from '../CustomAnswerWrapper';
import { DoggoImage } from '../DoggoImage';
import { ChatMessage } from '../ChatMessage';
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
          <ChatMessage type="left" key={idx}>
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
          </ChatMessage>
        );
      })}
    </>
  );
};
export default AnswerResolver;
