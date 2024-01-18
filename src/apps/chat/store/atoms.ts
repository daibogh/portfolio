import { persistentAtom } from '@nanostores/persistent';
import { QuestionId, Response } from './data';
import { firebaseColAtom } from 'utils/firebase-col-atom';
import { getFirebase } from '../../../firebase/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
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
  Partial<Record<QuestionId, { answer: Response[]; isTyping: boolean }>>
>(
  'responsesAtom',
  {},
  {
    encode: (value) => JSON.stringify(value),
    decode: (value) => JSON.parse(value),
  },
);

const { firestore } = getFirebase();

export const chatConfigColAtom = firebaseColAtom({
  query: query(collection(firestore, 'chat_config'), orderBy('idx', 'asc')),
});

chatConfigColAtom.store.subscribe((col) => {
  console.log(col);
});
