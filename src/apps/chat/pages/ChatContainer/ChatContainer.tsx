import {
  AnswerResolver,
  ChatMessage,
  TextAnimation,
  ChatLayout,
} from '@/chat/components';
import { QuestionResolver, QuestionSelector } from '@/chat/containers';
import { useAutoScrollDown } from '@/chat/hooks';

import {
  chatAtom,
  greetMessageConfigAtom,
  questionsMap,
  typeQuestionDone,
  typeAnswerDone,
  greetMessage,
  greetTypingDone,
} from '@/chat/store';
import { useStore } from '@nanostores/react';
import { FC, ReactNode, useMemo } from 'react';

const ChatContainer: FC = () => {
  const chatStore = useStore(chatAtom);
  const greetMessageConfig = useStore(greetMessageConfigAtom);

  const chat = useMemo(() => {
    const list: ReactNode[] = [];
    let counter = 0;

    for (const options of chatStore) {
      const { key, isTyping, answer, type: messageType } = options;

      const element: ReactNode =
        messageType === 'question' ? (
          <QuestionResolver
            text={questionsMap[key].text}
            isTyping={isTyping}
            onTypeEnd={() => typeQuestionDone(key)}
            key={counter++}
          />
        ) : (
          <AnswerResolver
            messageConfigs={answer}
            isTyping={isTyping}
            onTypeEnd={() => typeAnswerDone(key)}
            key={counter++}
          />
        );

      list.push(element);
    }

    return list;
  }, [chatStore]);

  useAutoScrollDown();

  return (
    <>
      <ChatMessage type="left">
        <TextAnimation
          text={greetMessage}
          shouldAnimate={greetMessageConfig.isTyping}
          onTypeEnd={greetTypingDone}
        />
      </ChatMessage>
      <ChatLayout>{chat}</ChatLayout>
      <QuestionSelector />
    </>
  );
};

export default ChatContainer;
