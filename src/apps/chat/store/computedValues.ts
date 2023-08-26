import { computed } from 'nanostores';
import {
  greetMessageConfigAtom,
  responsesAtom,
  selectedQuestionsAtom,
} from './atoms';
import { QuestionId, questionsMap, Response } from './data';
import { addQuestion, clearChat } from './actions';

export const questionsToSelectAtom = computed(
  selectedQuestionsAtom,
  (_selectedQuestions) => {
    return Object.keys(questionsMap)
      .filter(
        (key) =>
          !_selectedQuestions.some(
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
export const chatAtom = computed(
  [selectedQuestionsAtom, responsesAtom],
  (questions, responses) => {
    const chatList: (
      | {
          key: QuestionId;
          isTyping: boolean;
          type: 'question';
        }
      | {
          key: QuestionId;
          answer: Response[];
          type: 'response';
          isTyping: boolean;
        }
    )[] = [];
    for (const question of questions) {
      const responseObj = responses[question.key];

      chatList.push({ ...question, type: 'question' });

      if (responseObj) {
        chatList.push({ ...responseObj, type: 'response', key: question.key });
      }
    }
    return chatList;
  },
);
