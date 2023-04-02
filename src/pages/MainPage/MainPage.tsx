import { FC } from 'react';
import styles from './MainPage.module.css';
import { TextAnimation } from '../../components/TextAnimation';
import { BugsCombat } from '../../components/BugsCombat';

const MainPage: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <TextAnimation text="Hi! My name is Peter" />
      </div>
      <BugsCombat />
    </div>
  );
};
export default MainPage;
// идея для портфолио - сделать анимацию, где я отстреливаю баги
// как в старой 2д игре про защиту от инопланетных захватчиков
// откуда вдохновляться https://github.com/kevinshen56714/create-react-phaser3-app
// а в случае, если баг не удалось расстрелять, то написать что это не баг а фича
