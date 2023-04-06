import { FC } from 'react';
import {
  isSomethingTyping,
  questionsToSelectAtom,
} from '../../stores/chat/chatAtoms';
import { useStore } from '@nanostores/react';
import { questionsMap } from '../../stores/chat/data';
import { QuestionSelectorLayout } from '../../components/QuestionSelectorLayout';
import { QuestionButton } from '../../components/QuestionButton';

const QuestionSelector: FC = () => {
  const questions = useStore(questionsToSelectAtom);
  const shouldDisable = useStore(isSomethingTyping);
  return (
    <QuestionSelectorLayout>
      {questions.map(({ id, action }) => {
        return (
          <QuestionButton
            disabled={shouldDisable}
            key={id}
            text={id === 'clear' ? 'Clear chat history' : questionsMap[id].text}
            onClick={() => (id === 'clear' ? action() : action(id))}
          />
        );
      })}
    </QuestionSelectorLayout>
  );
};
export default QuestionSelector;
