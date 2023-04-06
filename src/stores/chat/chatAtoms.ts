import { atom, computed } from 'nanostores';
import { QuestionId, questionsMap } from './data';

export const chatAtom = atom<QuestionId[]>([]);

export const questionsToSelect = computed(chatAtom, (selecteQuestions) => {
  return Object.keys(questionsMap)
    .filter((key) => !selecteQuestions.includes(key as QuestionId))
    .map((id) => ({
      id,
      action: addQuestion,
    }))
    .concat({ id: 'clear', action: clearQuestions }) as (
    | { id: QuestionId; action: (QuestionId: QuestionId) => void }
    | { id: 'clear'; action: () => void }
  )[];
});

const addQuestion = (question: QuestionId) => {
  chatAtom.set([...chatAtom.get(), question]);
};

const clearQuestions = () => {
  chatAtom.set([]);
};
