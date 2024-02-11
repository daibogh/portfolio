import { computed } from 'nanostores';
import { responsesAtom } from '../atoms/responses';
import { selectedQuestionsAtom } from '../atoms/selected-questions';
import { greetMessageConfigAtom } from '../atoms/greet-message';

export const isSomethingTyping = computed(
  [selectedQuestionsAtom, responsesAtom, greetMessageConfigAtom],
  (selectedQuestionsAtom, responsesAtom, greetMessageConfigAtom) => {
    return (
      selectedQuestionsAtom.some(({ isTyping }) => isTyping) ||
      Object.values(responsesAtom).some(({ isTyping }) => isTyping) ||
      greetMessageConfigAtom.isTyping
    );
  },
);
