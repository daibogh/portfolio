import { useStore } from '@nanostores/react';
import { FC, Fragment, ReactNode, useMemo } from 'react';
import { chatAtom, typeAnswerDone, typeQuestionDone } from '../../stores/chat';
import { QuestionId, questionsMap } from '../../stores/chat/data';
import { ChatLayout } from '../../components/ChatLayout';
import { QuestionSelector } from '../QuestionSelector';
import { TextAnimation } from '../../components/TextAnimation';
import { AnswerResolver } from '../../components/answers';
import styles from './ChatContainer.module.css';
const ChatContainer: FC = () => {
  const chatStore = useStore(chatAtom);
  const chat = useMemo(() => {
    const list: ReactNode[] = [];
    for (const options of chatStore) {
      let element: ReactNode = null;
      if (options.type === 'question') {
        const { key, isTyping } = options;
        element = (
          <TextAnimation
            className={styles.messageRight}
            text={questionsMap[key].text}
            shouldAnimate={isTyping}
            onTypeEnd={() => typeQuestionDone(key)}
          />
        );
      } else {
        const { key, isTyping, answer } = options;
        element = (
          <AnswerResolver
            messageConfigs={answer}
            isTyping={isTyping}
            onTypeEnd={() => typeAnswerDone(key as QuestionId)}
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
