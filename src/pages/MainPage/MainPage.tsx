import { FC } from 'react';
import styles from './MainPage.module.css';
import { ChatContainer } from '../../containers/ChatContainer';

const MainPage: FC = () => {
  return (
    <div className={styles.container}>
      <ChatContainer />
    </div>
  );
};
export default MainPage;
