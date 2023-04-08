import {
  addQuestion,
  clearChat,
  greetTypingDone,
  typeQuestionDone,
  typeAnswerDone,
} from './actions';
import {
  greetMessageConfigAtom,
  responsesAtom,
  selectedQuestionsAtom,
} from './atoms';
describe('actions', () => {
  describe('greetTypingDone', () => {
    it('should set greetMessageConfigAtom.isTyping to false', () => {
      greetMessageConfigAtom.set({ isTyping: true });
      greetTypingDone();
      expect(greetMessageConfigAtom.get()).toEqual({ isTyping: false });
    });
  });
  describe('addQuestion', () => {
    beforeEach(() => {
      selectedQuestionsAtom.set([]);
    });
    it('should add question to selectedQuestionsAtom', () => {
      const question = 'aboutYourself';
      addQuestion(question);
      expect(selectedQuestionsAtom.get()).toEqual([
        { key: question, isTyping: true },
      ]);
    });
  });
  describe('clearChat', () => {
    it('should clear all atoms', () => {
      // should set selectedQuestionsAtom with some questions, responsesAtom with some responses and greetMessageConfigAtom with isTyping: true
      // then call clearChat and expect all atoms to be empty
      selectedQuestionsAtom.set([{ key: 'aboutYourself', isTyping: false }]);
      responsesAtom.set({
        aboutYourself: { key: 'aboutYourself', isTyping: false },
      });
      greetMessageConfigAtom.set({ isTyping: false });
      clearChat();
      expect(selectedQuestionsAtom.get()).toEqual([]);
      expect(responsesAtom.get()).toEqual({});
      expect(greetMessageConfigAtom.get()).toEqual({ isTyping: true });
    });
  });
  describe('typeQuestionDone', () => {
    it('should set selectedQuestionsAtom.isTyping to false', () => {
      selectedQuestionsAtom.set([{ key: 'aboutYourself', isTyping: true }]);
      typeQuestionDone('aboutYourself');
      expect(selectedQuestionsAtom.get()).toEqual([
        { key: 'aboutYourself', isTyping: false },
      ]);
    });
    it('should add response to responsesAtom', () => {
      selectedQuestionsAtom.set([{ key: 'aboutYourself', isTyping: true }]);
      typeQuestionDone('aboutYourself');
      expect(responsesAtom.get()).toEqual({
        aboutYourself: { key: 'aboutYourself', isTyping: true },
      });
    });
  });
  describe('typeAnswerDone', () => {
    it('should set responsesAtom.isTyping to false', () => {
      responsesAtom.set({
        aboutYourself: { key: 'aboutYourself', isTyping: true },
      });
      typeAnswerDone('aboutYourself');
      expect(responsesAtom.get()).toEqual({
        aboutYourself: { key: 'aboutYourself', isTyping: false },
      });
    });
  });
});
