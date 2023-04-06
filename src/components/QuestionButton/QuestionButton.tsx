import { FC } from 'react';
import styles from './QuestionButton.module.css';
import cn from 'classnames';
const QuestionButton: FC<{
  text: string;
  onClick: () => void;
  disabled: boolean;
}> = ({ text, onClick, disabled }) => {
  return (
    <div
      className={cn(styles.container, { [styles.disabled]: disabled })}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
export default QuestionButton;
