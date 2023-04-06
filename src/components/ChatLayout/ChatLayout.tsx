import { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './ChatLayout.module.css';
const ChatLayout: FC<{ children: ReactNode[] }> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children.map((el, idx) => (
        <div
          key={idx}
          className={cn(styles.message, {
            [styles.messageRight]: idx % 2 === 0,
            [styles.messageLeft]: idx % 2 === 1,
          })}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default ChatLayout;
