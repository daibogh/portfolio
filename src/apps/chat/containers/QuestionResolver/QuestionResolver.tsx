import { FC } from 'react';
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
  return (
    <ChatMessage type="right">
      <TextAnimation
        text={text}
        shouldAnimate={isTyping}
        onTypeEnd={onTypeEnd}
      />
    </ChatMessage>
  );
};
export default QuestionResolver;
