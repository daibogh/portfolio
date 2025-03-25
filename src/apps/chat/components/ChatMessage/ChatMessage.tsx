import { FC, ReactNode } from 'react';
import { cn } from '../../../../lib/utils';

const ChatMessage: FC<{ type: 'right' | 'left'; children: ReactNode }> = ({
  children,
  type,
}) => {
  return (
    <div
      className={cn(
        "max-w-[80%] rounded-lg p-3 mb-3",
        type === 'right' 
          ? "ml-auto bg-[#e3f2fd]" 
          : "bg-[#e8f5e9]"
      )}
    >
      {children}
    </div>
  );
};

export default ChatMessage;
