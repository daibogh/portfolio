import {
  greetMessageConfigAtom,
  responsesAtom,
  selectedQuestionsAtom,
} from './atoms';
import {
  isSomethingTyping,
  chatAtom,
  questionsToSelectAtom,
} from './computedValues';

describe('computedValues', () => {
  const clearAllAtoms = () => {
    //should clear set all atoms isTyping: false before each test
    greetMessageConfigAtom.set({ isTyping: false });
    selectedQuestionsAtom.set([]);
    responsesAtom.set({});
  };
  beforeEach(() => {
    clearAllAtoms();
  });
  afterAll(() => {
    clearAllAtoms();
  });

  describe('isSomethingTyping', () => {
    it('should be truthy if greetMessageConfigAtom.isTyping is true', () => {
      greetMessageConfigAtom.set({ isTyping: true });
      expect(isSomethingTyping.get()).toBeTruthy();
    });
    it('should be truthy is selectedQuestionsAtom has a question with isTyping true', () => {
      selectedQuestionsAtom.set([{ key: 'aboutYourself', isTyping: true }]);
      expect(isSomethingTyping.get()).toBeTruthy();
    });
    it('should be truthy if responsesAtom has a response with isTyping true', () => {
      responsesAtom.set({
        aboutYourself: { key: 'aboutYourself', isTyping: true },
      });
      expect(isSomethingTyping.get()).toBeTruthy();
    });
    it('should be falsy if all atoms have isTyping: false', () => {
      responsesAtom.set({
        aboutYourself: { key: 'aboutYourself', isTyping: false },
      });
      selectedQuestionsAtom.set([{ key: 'aboutYourself', isTyping: false }]);
      greetMessageConfigAtom.set({ isTyping: false });
      expect(isSomethingTyping.get()).toBeFalsy();
    });
  });
  describe('chatAtom', () => {
    it('should be include list of questions and responses according to selectedQuestionsAtom and responsesAtom', () => {
      // fill selectedQuestionsAtom with some questions
      selectedQuestionsAtom.set([{ key: 'aboutYourself', isTyping: false }]);
      // fill responsesAtom with some responses
      responsesAtom.set({
        aboutYourself: { key: 'aboutYourself', isTyping: true },
      });
      // expect chatAtom to be an array of questions and responses
      expect(chatAtom.get()).toEqual([
        { key: 'aboutYourself', isTyping: false, type: 'question' },
        { key: 'aboutYourself', isTyping: true, type: 'response' },
      ]);
    });
  });
  describe('questionsToSelectAtom', () => {
    it('should be an array of questions that are not in selectedQuestionsAtom', () => {
      // fill selectedQuestionsAtom with some questions
      selectedQuestionsAtom.set([{ key: 'aboutYourself', isTyping: false }]);
      // expect questionsToSelectAtom to be an array of questions that are not in selectedQuestionsAtom
      expect(questionsToSelectAtom.get()).toEqual([
        { id: 'workExperience', action: expect.any(Function) },
        { id: 'hobby', action: expect.any(Function) },
        { id: 'clear', action: expect.any(Function) },
      ]);
    });
  });
});
