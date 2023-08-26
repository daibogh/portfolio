import { FC, ReactNode } from 'react';
import cn from 'classnames';

import styles from './ChatMessage.module.css';

const ChatMessage: FC<{ type: 'right' | 'left'; children: ReactNode }> = ({
  children,
  type,
}) => {
  return (
    <div
      className={cn(styles.message, {
        [styles.messageRight]: type === 'right',
        [styles.messageLeft]: type === 'left',
      })}
    >
      {children}
    </div>
  );
};
export default ChatMessage;
