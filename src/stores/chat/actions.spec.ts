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
        aboutYourself: {
          answer: [{ text: 'answer1', type: 'text' }],
          isTyping: false,
        },
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
        aboutYourself: {
          key: 'aboutYourself',
          isTyping: true,
          answer: [
            {
              text: 'I live in Belgrade, working as frontend engineer.',
              type: 'text',
            },
          ],
        },
      });
    });
  });
  describe('typeAnswerDone', () => {
    it('should set responsesAtom.isTyping to false', () => {
      responsesAtom.set({
        aboutYourself: {
          isTyping: true,
          answer: [{ text: 'some text', type: 'text' }],
        },
      });
      typeAnswerDone('aboutYourself');
      expect(responsesAtom.get()).toEqual({
        aboutYourself: {
          isTyping: false,
          answer: [{ text: 'some text', type: 'text' }],
        },
      });
    });
  });
});
