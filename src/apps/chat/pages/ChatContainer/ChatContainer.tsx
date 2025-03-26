import {
  AnswerResolver,
  ChatMessage,
  TextAnimation,
  ChatLayout,
} from '@/chat/components';
import { QuestionResolver, QuestionSelector } from '@/chat/containers';
import { useAutoScrollDown } from '@/chat/hooks';
import { chatStore } from '@/chat/store/ChatStore';
import { questionsMap, greetMessage } from '@/chat/store/data';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

const ChatContainer: FC = observer(() => {
  const chat = (() => {
    const list: ReactNode[] = [];
    let counter = 0;

    for (const options of chatStore.chat) {
      const { key, isTyping, answer, type: messageType } = options;

      const element: ReactNode =
        messageType === 'question' ? (
          <QuestionResolver
            text={questionsMap[key].text}
            isTyping={isTyping}
            onTypeEnd={() => chatStore.typeQuestionDone(key)}
            key={counter++}
          />
        ) : (
          <AnswerResolver
            messageConfigs={answer}
            isTyping={isTyping}
            onTypeEnd={() => chatStore.typeAnswerDone(key)}
            key={counter++}
          />
        );

      list.push(element);
    }

    return list;
  })();

  useAutoScrollDown();

  return (
    <>
      <ChatMessage type="left">
        <TextAnimation
          text={greetMessage}
          shouldAnimate={chatStore.greetMessageConfig.isTyping}
          onTypeEnd={chatStore.greetTypingDone}
        />
      </ChatMessage>
      <ChatLayout>{chat}</ChatLayout>
      <QuestionSelector />
    </>
  );
});

export default ChatContainer;
