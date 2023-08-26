import { FC, ReactNode } from 'react';
import styles from './QuestionSelectorLayout.module.css';
const QuestionSelectorLayout: FC<{ children: ReactNode[] }> = ({
  children,
}) => {
  return <div className={styles.container}>{children}</div>;
};
export default QuestionSelectorLayout;
