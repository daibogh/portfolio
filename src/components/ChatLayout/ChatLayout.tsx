import { FC, ReactNode } from 'react';
import styles from './ChatLayout.module.css';
const ChatLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ChatLayout;
