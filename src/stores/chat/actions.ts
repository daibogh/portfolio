import { QuestionId, responsesMap } from './data';
import {
  greetMessageConfigAtom,
  responsesAtom,
  selectedQuestionsAtom,
} from './atoms';

export const greetTypingDone = () => {
  console.trace('greetTypingDone');
  greetMessageConfigAtom.set({ isTyping: false });
};

export const addQuestion = (question: QuestionId) => {
  selectedQuestionsAtom.set([
    ...selectedQuestionsAtom.get(),
    { key: question, isTyping: true },
  ]);
};

export const clearChat = () => {
  selectedQuestionsAtom.set([]);
  responsesAtom.set({});
  greetMessageConfigAtom.set({ isTyping: true });
};

export const typeQuestionDone = (question: QuestionId) => {
  selectedQuestionsAtom.set(
    selectedQuestionsAtom
      .get()
      .map((question) => ({ ...question, isTyping: false })),
  );
  responsesAtom.set({
    ...responsesAtom.get(),
    [question]: {
      answer: responsesMap[question],
      isTyping: true,
      key: question,
    },
  });
};
export const typeAnswerDone = (answerKey: QuestionId) => {
  const responsesMap = responsesAtom.get();
  responsesAtom.set({
    ...responsesMap,
    [answerKey]: { ...responsesMap[answerKey], isTyping: false },
  });
};
