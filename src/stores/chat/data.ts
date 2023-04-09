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
    { type: 'text', text: 'I live in Belgrade, I am a frontend dev' },
    {
      type: 'text',
      text: "Before Serbia, I lived in Russia - where I received a master's degree in information technology",
    },
    {
      type: 'text',
      text: "Now i am working in a company called 'Toloka'",
    },
  ],
  hobby: [
    { type: 'text', text: 'I love programming, I guess that is my hobby#1 ❤️' },
    { type: 'text', text: 'Also I like videogames and my doggo 🐶' },
    { type: 'custom', id: 'doggoImage' },
  ],
  workExperience: [
    {
      type: 'text',
      text: 'Well, I worked hard for 5 years in Frontend',
    },
    {
      type: 'text',
      text: 'It was quite curving path from ordinary intern to real specialist 🙃',
    },
    {
      type: 'text',
      text: 'Year after year my skills grew. Now I know how to solve many different issues related to this sphere of work',
    },
    { type: 'text', text: 'Let me show how I was fighting with bugs 👾👾👾!' },
    { type: 'custom', id: 'bugsCombat' },
  ],
};
export const greetMessage = `Hello👋 My name is Peter`;
