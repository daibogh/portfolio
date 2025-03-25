import { FC, ReactNode } from 'react';
import { cn } from '../../../../lib/utils';

const ChatLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className={cn(
      "flex flex-col gap-2",
    )}>
      {children}
    </div>
  );
};

export default ChatLayout;
