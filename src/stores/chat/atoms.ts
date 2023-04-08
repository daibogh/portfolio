import { persistentAtom } from '@nanostores/persistent';
import { QuestionId } from './data';

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
export const responsesAtom = persistentAtom<
  Partial<Record<QuestionId, { key: string; isTyping: boolean }>>
>(
  'responsesAtom',
  {},
  {
    encode: (value) => JSON.stringify(value),
    decode: (value) => JSON.parse(value),
  },
);
