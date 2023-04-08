import { FC } from 'react';
import { TextAnimation } from '../../TextAnimation';
import { BugsCombat } from '../../BugsCombat';
import styles from './WorkExperienceAnswer.module.css';
const text =
  'I have been working hard during five years of my frontend carrier. Let me show you how I fight with bugs everyday :)';
const WorkExperienceAnswer: FC<{
  isTyping: boolean;
  onTypeEnd: () => void;
}> = ({ isTyping, onTypeEnd }) => {
  return (
    <div>
      <TextAnimation
        text={text}
        shouldAnimate={isTyping}
        onTypeEnd={onTypeEnd}
      />
      <div className={styles.bugsCombatContainer}>
        {!isTyping && <BugsCombat />}
      </div>
    </div>
  );
};
export default WorkExperienceAnswer;
