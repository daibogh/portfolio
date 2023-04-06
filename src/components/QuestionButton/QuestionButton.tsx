import { FC } from 'react';
import styles from './QuestionButton.module.css';
const QuestionButton: FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {text}
    </div>
  );
};
export default QuestionButton;
