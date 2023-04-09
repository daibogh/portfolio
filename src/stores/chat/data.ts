export const questionsMap = {
  aboutYourself: {
    text: 'Can you tell me about yourself?',
    id: 'aboutYourself',
  },
  workExperience: {
    text: 'What is your work experience?',
    id: 'workExperience',
  },
  hobby: { text: 'Do you have any kinda hobby?', id: 'hobby' },
} as const;
export type QuestionId = keyof typeof questionsMap;

export type Response = {
  type: 'text' | 'custom';
  text?: string;
  id?: string;
};

export const responsesMap: Record<QuestionId, Response[]> = {
  aboutYourself: [
    { type: 'text', text: 'I live in Belgrade, working as frontend engineer.' },
  ],
  hobby: [
    { type: 'text', text: 'I love programming, I guess that is my hobby#1 ❤️' },
    { type: 'text', text: 'Also I like videogames and my doggo 🐶' },
  ],
  workExperience: [
    {
      type: 'text',
      text: 'Well, I worked hard for 5 years as Frontend engineer.',
    },
    {
      type: 'text',
      text: 'Seriously.',
    },
    {
      type: 'text',
      text: 'It was quite curving path from ordinary intern to real specialist!',
    },
    { type: 'text', text: 'Let me show how I was fighting with bugs!' },
    { type: 'custom', id: 'bugsCombat' },
  ],
};
