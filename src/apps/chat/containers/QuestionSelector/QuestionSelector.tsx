import { FC, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { QuestionSelectorLayout } from '../../components/QuestionSelectorLayout';
import { QuestionButton } from '../../components/QuestionButton';
import {
  questionsToSelectAtom,
  isSomethingTyping,
  questionsMap,
} from '../../store';

const QuestionSelector: FC = () => {
  const questions = useStore(questionsToSelectAtom);
  const shouldDisable = useStore(isSomethingTyping);
  const questionsList = useMemo(() => {
    return questions.map(({ id, action }) => {
      return (
        <QuestionButton
          disabled={shouldDisable}
          key={id}
          text={id === 'clear' ? 'Clear chat history' : questionsMap[id].text}
          onClick={() => (id === 'clear' ? action() : action(id))}
        />
      );
    });
  }, [questions, shouldDisable]);
  return <QuestionSelectorLayout>{questionsList}</QuestionSelectorLayout>;
};
export default QuestionSelector;
