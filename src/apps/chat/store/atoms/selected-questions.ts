import { persistentAtom } from '@nanostores/persistent';
import { QuestionId } from '../data';

export const selectedQuestionsAtom = persistentAtom<
  { key: QuestionId; isTyping: boolean }[]
>('selectedQuestionsAtom', [], {
  encode: (value) => JSON.stringify(value),
  decode: (value) => JSON.parse(value),
});
