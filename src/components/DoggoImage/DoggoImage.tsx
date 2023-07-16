import { FC } from 'react';
import doggoSrc from './assets/img/olivie.jpg';
import styles from './DoggoImage.module.css';
import { scrollToBottom } from '../../utils/scroll-to-bottom';
const DoggoImage: FC = () => {
  const onLoad = () => {
    scrollToBottom();
  };
  return (
    <img
      src={doggoSrc}
      alt="doggo"
      className={styles.doggoImage}
      onLoad={onLoad}
    />
  );
};
export default DoggoImage;
