import { chatStore } from '@/chat/store/ChatStore';
import { questionsMap, QuestionId } from '@/chat/store/data';
import { observer } from 'mobx-react-lite';
import { FC, useMemo } from 'react';
import { Button } from 'shared/components';

export const QuestionSelector: FC = observer(() => {
  const questions = chatStore.questionsToSelect;
  const shouldDisable = chatStore.isSomethingTyping;

  const questionsList = useMemo(() => {
    return questions.map(({ id, action }) => (
      <Button
        key={id}
        onClick={() => action()}
        disabled={shouldDisable}
      >
        {id === 'clear' ? 'Clear chat history' : questionsMap[id as QuestionId].text}
      </Button>
    ));
  }, [questions, shouldDisable]);

  return (
    <div className="flex flex-wrap gap-2">
      {questionsList}
    </div>
  );
});
