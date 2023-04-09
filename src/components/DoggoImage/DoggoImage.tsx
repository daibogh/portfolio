import { FC } from 'react';
import doggoSrc from './assets/img/olivie.jpg';
import styles from './DoggoImage.module.css';
const DoggoImage: FC = () => {
  return <img src={doggoSrc} alt="doggo" className={styles.doggoImage} />;
};
export default DoggoImage;
