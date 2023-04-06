import { FC } from 'react';
import { questionsToSelect } from '../../stores/chat/chatAtoms';
import { useStore } from '@nanostores/react';
import { questionsMap } from '../../stores/chat/data';
import { QuestionSelectorLayout } from '../../components/QuestionSelectorLayout';

const QuestionSelector: FC = () => {
  const questions = useStore(questionsToSelect);
  return (
    <QuestionSelectorLayout>
      {questions.map(({ id, action }) => {
        return (
          <div
            key={id}
            onClick={() => (id === 'clear' ? action() : action(id))}
          >
            {id === 'clear' ? 'Clear chat history' : questionsMap[id].text}
          </div>
        );
      })}
    </QuestionSelectorLayout>
  );
};
export default QuestionSelector;
