import { persistentAtom } from '@nanostores/persistent';
import { QuestionId } from '../data';

export const responsesAtom = persistentAtom<
  Partial<Record<QuestionId, { answer: Response[]; isTyping: boolean }>>
>(
  'responsesAtom',
  {},
  {
    encode: (value) => JSON.stringify(value),
    decode: (value) => JSON.parse(value),
  },
);
