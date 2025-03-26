import { FC, useState } from 'react';
import doggoSrc from './assets/img/olivie.jpg';
import { cn } from '../../../../lib/utils';
import { scrollToBottom } from '../../../../utils/scroll-to-bottom';
import ImageModal from '../ImageModal/ImageModal';

const DoggoImage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onLoad = () => {
    scrollToBottom();
  };

  return (
    <>
      <img
        src={doggoSrc}
        alt="doggo"
        className={cn(
          "w-full max-w-md rounded-lg",
          "shadow-lg",
          "transition-transform duration-200",
          "hover:scale-105",
          "cursor-pointer"
        )}
        onLoad={onLoad}
        onClick={() => setIsModalOpen(true)}
      />
      <ImageModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        imageSrc={doggoSrc}
      />
    </>
  );
};

export default DoggoImage;
