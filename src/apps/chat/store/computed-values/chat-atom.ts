import { computed } from 'nanostores';
import { responsesAtom } from '../atoms/responses';
import { selectedQuestionsAtom } from '../atoms/selected-questions';
import { QuestionId } from '../data';

export const chatAtom = computed(
  [selectedQuestionsAtom, responsesAtom],
  (questions, responses) => {
    const chatList: (
      | {
          key: QuestionId;
          isTyping: boolean;
          type: 'question';
          answer?: never;
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
