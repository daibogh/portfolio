import { useStore } from '@nanostores/react';
import { FC, ReactNode, useMemo } from 'react';
import { chatAtom, typeAnswerDone, typeQuestionDone } from '../../stores/chat';
import { questionsMap } from '../../stores/chat/data';
import { ChatLayout } from '../../components/ChatLayout';
import { QuestionSelector } from '../QuestionSelector';
import { AnswerResolver } from '../../components/AnswerResolver';
import { QuestionResolver } from '../QuestionResolver';
const ChatContainer: FC = () => {
  const chatStore = useStore(chatAtom);

  const chat = useMemo(() => {
    const list: ReactNode[] = [];
    for (const options of chatStore) {
      let element: ReactNode = null;
      if (options.type === 'question') {
        const { key, isTyping } = options;
        element = (
          <QuestionResolver
            text={questionsMap[key].text}
            isTyping={isTyping}
            onTypeEnd={() => typeQuestionDone(key)}
          />
        );
      } else {
        const { key, isTyping, answer } = options;
        element = (
          <AnswerResolver
            messageConfigs={answer}
            isTyping={isTyping}
            onTypeEnd={() => typeAnswerDone(key)}
          />
        );
      }
      list.push(element);
    }
    return list;
  }, [chatStore]);

  return (
    <>
      <ChatLayout>{chat}</ChatLayout>
      <QuestionSelector />
    </>
  );
};

export default ChatContainer;
