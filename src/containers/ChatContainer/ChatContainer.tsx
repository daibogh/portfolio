import { useStore } from '@nanostores/react';
import { FC, Fragment, ReactNode } from 'react';
import { chatAtom } from '../../stores/chat/chatAtoms';
import { QuestionId, questionsMap } from '../../stores/chat/data';
import { ChatLayout } from '../../components/ChatLayout';
import { QuestionSelector } from '../QuestionSelector';

const ChatContainer: FC = () => {
  const selectedQuestions = useStore(chatAtom);
  const chat: ReactNode[] = (selectedQuestions as any[]).reduce(
    (accum, question) => [
      ...accum,
      <div>{questionsMap[question as QuestionId].text}</div>,
      <div>answer</div>,
    ],
    [],
  );
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
