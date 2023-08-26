import { useStore } from '@nanostores/react';
import { MainLayout } from './MainLayout';
import { MainPage } from './routes/MainPage';
import { QuestPage } from './routes/QuestPage';
import { $router } from './routes/router';
import { FC } from 'react';

function App() {
  const page = useStore($router);
  const Page: FC = page?.route === 'quest' ? QuestPage : MainPage;

  return (
    <MainLayout>
      <Page />
    </MainLayout>
  );
}

export default App;
