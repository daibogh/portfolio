import { useStore } from '@nanostores/react';
import { FC, ReactNode, useEffect, useMemo } from 'react';

import { ChatLayout } from '../../components/ChatLayout';
import { QuestionSelector } from '../../containers/QuestionSelector';
import { AnswerResolver } from '../../components/AnswerResolver';
import { QuestionResolver } from '../../containers/QuestionResolver';
import { ChatMessage } from '../../components/ChatMessage';
import { TextAnimation } from '../../components/TextAnimation';
import {
  chatAtom,
  greetMessage,
  greetMessageConfigAtom,
  greetTypingDone,
  questionsMap,
  typeAnswerDone,
  typeQuestionDone,
} from '../../store';
import { scrollToBottom } from '../../../../utils/scroll-to-bottom';

const ChatContainer: FC = () => {
  const chatStore = useStore(chatAtom);
  const greetMessageConfig = useStore(greetMessageConfigAtom);

  const chat = useMemo(() => {
    const list: ReactNode[] = [];
    let counter = 0;

    for (const options of chatStore) {
      let element: ReactNode = null;

      if (options.type === 'question') {
        const { key, isTyping } = options;
        element = (
          <QuestionResolver
            text={questionsMap[key].text}
            isTyping={isTyping}
            onTypeEnd={() => typeQuestionDone(key)}
            key={counter++}
          />
        );
      } else {
        const { key, isTyping, answer } = options;
        element = (
          <AnswerResolver
            messageConfigs={answer}
            isTyping={isTyping}
            onTypeEnd={() => typeAnswerDone(key)}
            key={counter++}
          />
        );
      }

      list.push(element);
    }

    return list;
  }, [chatStore]);

  useEffect(() => {
    const target = document.querySelector('#root');

    if (target) {
      const callback = (mutationsList: any, observer: any) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            scrollToBottom();
          }
        }
      };

      const observer = new MutationObserver(callback);

      observer.observe(target, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

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
