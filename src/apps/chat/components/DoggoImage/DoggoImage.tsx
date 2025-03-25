import { FC } from 'react';
import doggoSrc from './assets/img/olivie.jpg';
import { cn } from '../../../../lib/utils';
import { scrollToBottom } from '../../../../utils/scroll-to-bottom';

const DoggoImage: FC = () => {
  const onLoad = () => {
    scrollToBottom();
  };

  return (
    <img
      src={doggoSrc}
      alt="doggo"
      className={cn(
        "w-full max-w-md rounded-lg",
        "shadow-lg",
        "transition-transform duration-200",
        "hover:scale-105"
      )}
      onLoad={onLoad}
    />
  );
};

export default DoggoImage;
