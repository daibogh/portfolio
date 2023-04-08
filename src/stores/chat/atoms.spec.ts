import {
  greetMessageConfigAtom,
  selectedQuestionsAtom,
  responsesAtom,
} from './atoms';

describe('atoms', () => {
  describe('greetMessageConfigAtom', () => {
    it('should return isTyping: true as initial value', () => {
      expect(greetMessageConfigAtom.get()).toEqual({ isTyping: true });
    });
  });
  describe('selectedQuestionsAtom', () => {
    it('should return [] as initial value', () => {
      expect(selectedQuestionsAtom.get()).toEqual([]);
    });
  });
  describe('responsesAtom', () => {
    it('should return {} as initial value', () => {
      expect(responsesAtom.get()).toEqual({});
    });
  });
});
