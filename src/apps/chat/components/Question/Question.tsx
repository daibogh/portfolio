import { FC } from 'react';

type QuestionProps = {
  text: string;
};

const Question: FC<QuestionProps> = ({ text }) => {
  return <div>{text}</div>;
};

export default Question;
