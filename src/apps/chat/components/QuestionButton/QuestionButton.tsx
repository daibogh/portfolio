import { FC } from 'react';
import { cn } from '../../../../lib/utils';

const QuestionButton: FC<{
  text: string;
  onClick: () => void;
  disabled: boolean;
}> = ({ text, onClick, disabled }) => {
  return (
    <button
      className={cn(
        "w-full rounded-lg px-3 py-2 mb-2",
        "bg-[#fff3e0]",
        "hover:bg-[#ffe0b2] transition-colors duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "text-sm",
        "last:mb-0"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default QuestionButton;
