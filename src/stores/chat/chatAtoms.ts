import { computed } from 'nanostores';
import { QuestionId, questionsMap } from './data';
import { persistentAtom } from '@nanostores/persistent';

export const selectedQuestionsAtom = persistentAtom<
  { key: QuestionId; isTyping: boolean }[]
>('selectedQuestionsAtom', [], {
  encode: (value) => JSON.stringify(value),
  decode: (value) => JSON.parse(value),
});
export const greetMessageConfigAtom = persistentAtom<{
  isTyping: boolean;
}>(
  'greetMessageConfigAtom',
  { isTyping: true },
  {
    encode: (value) => JSON.stringify(value),
    decode: (value) => JSON.parse(value),
  },
);
export const greetTypingDone = () => {
  greetMessageConfigAtom.set({ isTyping: false });
};
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
      .concat({ id: 'clear', action: clearQuestions }) as (
      | { id: QuestionId; action: (QuestionId: QuestionId) => void }
      | { id: 'clear'; action: () => void }
    )[];
  },
);

const addQuestion = (question: QuestionId) => {
  selectedQuestionsAtom.set([
    ...selectedQuestionsAtom.get(),
    { key: question, isTyping: true },
  ]);
};

const clearQuestions = () => {
  selectedQuestionsAtom.set([]);
  responsesAtom.set({});
  greetMessageConfigAtom.set({ isTyping: true });
};

const responsesAtom = persistentAtom<
  Partial<Record<QuestionId, { key: string; isTyping: boolean }>>
>(
  'responsesAtom',
  {},
  {
    encode: (value) => JSON.stringify(value),
    decode: (value) => JSON.parse(value),
  },
);
export const typeQuestionDone = (question: QuestionId) => {
  selectedQuestionsAtom.set(
    selectedQuestionsAtom
      .get()
      .map((question) => ({ ...question, isTyping: false })),
  );
  responsesAtom.set({
    ...responsesAtom.get(),
    [question]: { key: question, isTyping: true },
  });
};
export const typeAnswerDone = (answerKey: QuestionId) => {
  const responsesMap = responsesAtom.get();
  responsesAtom.set({
    ...responsesMap,
    [answerKey]: { ...responsesMap[answerKey], isTyping: false },
  });
};
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
    const chatList: {
      key: string;
      isTyping: boolean;
      type: 'question' | 'answer';
    }[] = [];
    for (let i = 0; i < questions.length; i++) {
      chatList.push({ ...questions[i], type: 'question' });
      const responseObj = responses[questions[i].key];
      if (responseObj) {
        chatList.push({ ...responseObj, type: 'answer' });
      }
    }
    return chatList;
  },
);
