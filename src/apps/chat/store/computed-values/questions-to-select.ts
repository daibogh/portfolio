import { computed } from 'nanostores';
import { addQuestion, clearChat } from '../actions';
import { selectedQuestionsAtom } from '../atoms/selected-questions';
import { questionsMap, QuestionId } from '../data';
import { chatConfigColAtom } from '../atoms';

export const questionsToSelectAtom = computed(
  [selectedQuestionsAtom, chatConfigColAtom],
  (selectedQuestions, chatConfig) => {
    return chatConfig
      .map((config) => config.id)
      .filter(
        (key) =>
          !selectedQuestions.some(
            ({ key: questionKey }) => key === questionKey,
          ),
      )
      .map((id) => ({
        id,
        action: addQuestion,
      }))
      .concat({ id: 'clear', action: clearChat }) as (
      | { id: QuestionId; action: (QuestionId: QuestionId) => void }
      | { id: 'clear'; action: () => void }
    )[];
  },
);
