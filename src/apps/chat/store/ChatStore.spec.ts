import { chatStore } from './ChatStore';
import { responsesMap } from './data';

describe('ChatStore', () => {
  beforeEach(() => {
    chatStore.clearChat();
  });

  describe('isSomethingTyping', () => {
    it('should return true when greet message is typing', () => {
      chatStore.greetMessageConfig.isTyping = true;
      expect(chatStore.isSomethingTyping).toBe(true);
    });

    it('should return true when a question is typing', () => {
      chatStore.selectedQuestions = [{ key: 'aboutYourself', isTyping: true }];
      expect(chatStore.isSomethingTyping).toBe(true);
    });

    it('should return true when a response is typing', () => {
      chatStore.responses = {
        aboutYourself: {
          answer: responsesMap.aboutYourself,
          isTyping: true,
          key: 'aboutYourself',
        },
        workExperience: {
          answer: [],
          isTyping: false,
          key: 'workExperience',
        },
        hobby: {
          answer: [],
          isTyping: false,
          key: 'hobby',
        },
      };
      expect(chatStore.isSomethingTyping).toBe(true);
    });

    it('should return false when nothing is typing', () => {
      chatStore.greetMessageConfig.isTyping = false;
      chatStore.selectedQuestions = [{ key: 'aboutYourself', isTyping: false }];
      chatStore.responses = {
        aboutYourself: {
          answer: responsesMap.aboutYourself,
          isTyping: false,
          key: 'aboutYourself',
        },
        workExperience: {
          answer: [],
          isTyping: false,
          key: 'workExperience',
        },
        hobby: {
          answer: [],
          isTyping: false,
          key: 'hobby',
        },
      };
      expect(chatStore.isSomethingTyping).toBe(false);
    });
  });

  describe('greetTypingDone', () => {
    it('should set greetMessageConfig.isTyping to false', () => {
      chatStore.greetMessageConfig.isTyping = true;
      chatStore.greetTypingDone();
      expect(chatStore.greetMessageConfig.isTyping).toBe(false);
    });
  });

  describe('addQuestion', () => {
    it('should add question to selectedQuestions', () => {
      const question = 'aboutYourself';
      chatStore.addQuestion(question);
      expect(chatStore.selectedQuestions).toEqual([
        { key: question, isTyping: true },
      ]);
    });
  });

  describe('clearChat', () => {
    it('should clear all state', () => {
      chatStore.selectedQuestions = [{ key: 'aboutYourself', isTyping: false }];
      chatStore.responses = {
        aboutYourself: {
          answer: [{ text: 'answer1', type: 'text' }],
          isTyping: false,
          key: 'aboutYourself',
        },
        workExperience: {
          answer: [],
          isTyping: false,
          key: 'workExperience',
        },
        hobby: {
          answer: [],
          isTyping: false,
          key: 'hobby',
        },
      };
      chatStore.greetMessageConfig.isTyping = false;

      chatStore.clearChat();

      expect(chatStore.selectedQuestions).toEqual([]);
      expect(chatStore.responses).toEqual({
        aboutYourself: {
          answer: [],
          isTyping: false,
          key: 'aboutYourself',
        },
        workExperience: {
          answer: [],
          isTyping: false,
          key: 'workExperience',
        },
        hobby: {
          answer: [],
          isTyping: false,
          key: 'hobby',
        },
      });
      expect(chatStore.greetMessageConfig.isTyping).toBe(true);
    });
  });

  describe('typeQuestionDone', () => {
    it('should update selectedQuestions and add response', () => {
      const question = 'aboutYourself';
      chatStore.selectedQuestions = [{ key: question, isTyping: true }];

      chatStore.typeQuestionDone(question);

      expect(chatStore.selectedQuestions).toEqual([
        { key: question, isTyping: false },
      ]);
      expect(chatStore.responses[question]).toEqual({
        answer: responsesMap[question],
        isTyping: true,
        key: question,
      });
    });
  });

  describe('typeAnswerDone', () => {
    it('should set response isTyping to false', () => {
      const question = 'aboutYourself';
      chatStore.responses = {
        aboutYourself: {
          answer: responsesMap[question],
          isTyping: true,
          key: question,
        },
        workExperience: {
          answer: [],
          isTyping: false,
          key: 'workExperience',
        },
        hobby: {
          answer: [],
          isTyping: false,
          key: 'hobby',
        },
      };

      chatStore.typeAnswerDone(question);

      expect(chatStore.responses[question].isTyping).toBe(false);
    });
  });

  describe('chat computed', () => {
    it('should return array of questions and responses', () => {
      const question = 'aboutYourself';
      chatStore.selectedQuestions = [{ key: question, isTyping: false }];
      chatStore.responses = {
        aboutYourself: {
          answer: [{ text: 'someText', type: 'text' }],
          isTyping: true,
          key: question,
        },
        workExperience: {
          answer: [],
          isTyping: false,
          key: 'workExperience',
        },
        hobby: {
          answer: [],
          isTyping: false,
          key: 'hobby',
        },
      };

      expect(chatStore.chat).toEqual([
        { key: question, isTyping: false, type: 'question' },
        {
          key: question,
          isTyping: true,
          type: 'response',
          answer: [{ text: 'someText', type: 'text' }],
        },
      ]);
    });
  });

  describe('questionsToSelect computed', () => {
    it('should return available questions and clear button', () => {
      chatStore.selectedQuestions = [{ key: 'aboutYourself', isTyping: false }];

      const questions = chatStore.questionsToSelect;
      expect(questions).toHaveLength(3); // workExperience, hobby, and clear button
      expect(questions.map(q => q.id)).not.toContain('aboutYourself');
      expect(questions.some(q => q.id === 'clear')).toBe(true);
    });

    it('should call clearChat when clear button is clicked', () => {
      const clearButton = chatStore.questionsToSelect.find(q => q.id === 'clear');
      expect(clearButton).toBeDefined();
      
      const clearChatSpy = jest.spyOn(chatStore, 'clearChat');
      clearButton?.action();
      expect(clearChatSpy).toHaveBeenCalled();
    });
  });
}); 