import { FC } from 'react';
import { WorkExperienceAnswer } from './WorkExperienceAnswer';
import { TextAnimation } from '../TextAnimation';

export const AnswerResolver: FC<{
  id: string;
  onTypeEnd: () => void;
  isTyping: boolean;
}> = ({ id, onTypeEnd, isTyping }) => {
  if (id === 'workExperience') {
    return <WorkExperienceAnswer onTypeEnd={onTypeEnd} isTyping={isTyping} />;
  }
  if (id === 'hobby') {
    return (
      <TextAnimation
        text={'I like videogames and my doggo 🐶'}
        onTypeEnd={onTypeEnd}
        shouldAnimate={isTyping}
      />
    );
  }
  if (id === 'aboutYourself') {
    return (
      <TextAnimation
        text={'I live in Belgrade, working as frontend engineer.'}
        onTypeEnd={onTypeEnd}
        shouldAnimate={isTyping}
      />
    );
  }
  return (
    <TextAnimation text={id} onTypeEnd={onTypeEnd} shouldAnimate={isTyping} />
  );
};
