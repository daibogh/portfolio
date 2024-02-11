import { persistentAtom } from '@nanostores/persistent';

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
