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
