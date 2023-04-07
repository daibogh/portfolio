import { useStore } from '@nanostores/react';
import { FC, Fragment, ReactNode, useMemo } from 'react';
import {
  chatAtom,
  typeAnswerDone,
  typeQuestionDone,
} from '../../stores/chat/chatAtoms';
import { QuestionId, questionsMap } from '../../stores/chat/data';
import { ChatLayout } from '../../components/ChatLayout';
import { QuestionSelector } from '../QuestionSelector';
import { TextAnimation } from '../../components/TextAnimation';
import { AnswerResolver } from '../../components/answers';

const ChatContainer: FC = () => {
  const chatStore = useStore(chatAtom);
  const chat = useMemo(() => {
    const list: ReactNode[] = [];
    for (const { type, isTyping, key } of chatStore) {
      const element =
        type === 'question' ? (
          <TextAnimation
            text={questionsMap[key as QuestionId].text}
            shouldAnimate={isTyping}
            onTypeEnd={() => typeQuestionDone(key as QuestionId)}
          />
        ) : (
          <AnswerResolver
            id={key}
            isTyping={isTyping}
            onTypeEnd={() => typeAnswerDone(key as QuestionId)}
          />
        );
      list.push(element);
    }
    return list;
  }, [chatStore]);

  return (
    <>
      <ChatLayout>
        {chat.map((elem, idx) => (
          <Fragment key={idx}>{elem}</Fragment>
        ))}
      </ChatLayout>
      <QuestionSelector />
    </>
  );
};

export default ChatContainer;
