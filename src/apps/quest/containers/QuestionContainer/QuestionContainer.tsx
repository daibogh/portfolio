import { FC } from 'react';

type QuestionContainerProps = {
  questionNumber: number;
  header: string;
  questionDescription: string;
  answers: string[];
  rightAnswerIdx: number;
  onChooseAnswer: (answerIdx: number) => void;
  status: 'correct' | 'incorrect' | 'pending';
  answerDescription: string;
};

export const _QuestionContainer: FC<QuestionContainerProps> = ({
  questionNumber,
  header,
  questionDescription,
  answers,
  rightAnswerIdx,
  onChooseAnswer,
}) => {
  return (
    <div>
      <div data-testid="questionNumber">question: {questionNumber}</div>
      <div>{header}</div>
      <div>{questionDescription}</div>
      {answers.map((answer, idx) => {
        return (
          <button
            data-testid={`answer-${idx}`}
            key={idx}
            type="button"
            onClick={() => {
              onChooseAnswer(idx);
            }}
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
};
