import { FC, ReactNode } from 'react';
import { cn } from '../../../../lib/utils';

const QuestionSelectorLayout: FC<{ children: ReactNode[] }> = ({
  children,
}) => {
  return (
    <div className={cn(
      "flex flex-col gap-4",
      "w-full max-w-2xl mx-auto",
      "p-4"
    )}>
      {children}
    </div>
  );
};

export default QuestionSelectorLayout;
