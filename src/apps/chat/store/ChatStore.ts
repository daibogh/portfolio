import { makeAutoObservable } from 'mobx';
import { questionsMap, responsesMap, QuestionId, Response } from './data';

export type SelectedQuestion = {
  key: QuestionId;
  isTyping: boolean;
};

export type ResponseItem = {
  answer: Response[];
  isTyping: boolean;
  key: QuestionId;
};

export class ChatStore {
  greetMessageConfig = { isTyping: true };
  selectedQuestions: SelectedQuestion[] = [];
  responses: Record<QuestionId, ResponseItem> = {
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
  };

  constructor() {
    makeAutoObservable(this);
  }

  get isSomethingTyping() {
    return (
      this.greetMessageConfig.isTyping ||
      this.selectedQuestions.some(q => q.isTyping) ||
      Object.values(this.responses).some(r => r.isTyping)
    );
  }

  get chat() {
    const result = [];
    for (const question of this.selectedQuestions) {
      result.push({
        key: question.key,
        isTyping: question.isTyping,
        type: 'question' as const,
      });

      const response = this.responses[question.key];
      if (response) {
        result.push({
          key: response.key,
          isTyping: response.isTyping,
          type: 'response' as const,
          answer: response.answer,
        });
      }
    }
    return result;
  }

  get questionsToSelect() {
    const selectedKeys = new Set(this.selectedQuestions.map(q => q.key));
    const questions = Object.entries(questionsMap)
      .filter(([key]) => !selectedKeys.has(key as QuestionId))
      .map(([key, value]) => ({
        id: value.id,
        action: () => this.addQuestion(key as QuestionId),
      }));

    return [
      ...questions,
      {
        id: 'clear',
        action: () => this.clearChat(),
      },
    ];
  }

  greetTypingDone = () => {
    this.greetMessageConfig.isTyping = false;
  };

  addQuestion = (question: QuestionId) => {
    this.selectedQuestions.push({ key: question, isTyping: true });
  };

  clearChat = () => {
    this.selectedQuestions = [];
    this.responses = {
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
    };
    this.greetMessageConfig.isTyping = true;
  };

  typeQuestionDone = (question: QuestionId) => {
    this.selectedQuestions = this.selectedQuestions.map(q => ({ ...q, isTyping: false }));
    this.responses[question] = {
      answer: responsesMap[question],
      isTyping: true,
      key: question,
    };
  };

  typeAnswerDone = (answerKey: QuestionId) => {
    if (this.responses[answerKey]) {
      this.responses[answerKey].isTyping = false;
    }
  };
}

export const chatStore = new ChatStore(); 