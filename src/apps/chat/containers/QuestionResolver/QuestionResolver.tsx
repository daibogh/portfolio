import { FC, useEffect } from 'react';
import { TextAnimation } from '../../components/TextAnimation';
import { ChatMessage } from '../../components/ChatMessage';

type QuestionResolverProps = {
  text: string;
  isTyping: boolean;
  onTypeEnd: () => void;
};
const QuestionResolver: FC<QuestionResolverProps> = ({
  text,
  isTyping,
  onTypeEnd,
}) => {
  useEffect(() => {
    if (isTyping) {
      onTypeEnd();
    }
  });
  return (
    <ChatMessage type="right">
      <TextAnimation text={text} shouldAnimate={false} />
    </ChatMessage>
  );
};
export default QuestionResolver;
