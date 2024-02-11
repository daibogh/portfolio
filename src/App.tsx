// import { useStore } from '@nanostores/react';
import { checkAuthAndSignInAnonymously } from '@/chat/auth/init';
import { MainLayout } from './MainLayout';
import { MainPage } from './routes/MainPage';
// import { $router } from './routes/router';
import { FC, useEffect } from 'react';

function App() {
  // const page = useStore($router);
  useEffect(() => {
    checkAuthAndSignInAnonymously();
  }, []);
  const Page: FC = MainPage;

  return (
    <MainLayout>
      <Page />
    </MainLayout>
  );
}

export default App;
