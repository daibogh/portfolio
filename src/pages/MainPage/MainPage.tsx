import { FC } from 'react';
import styles from './MainPage.module.css';
import { TextAnimation } from '../../components/TextAnimation';

const MainPage: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <TextAnimation text="Hi! My name is Peter." />
      </div>
    </div>
  );
};
export default MainPage;
// идея для портфолио - сделать анимацию, где я отстреливаю баги
// как в старой 2д игре про защиту от инопланетных захватчиков
