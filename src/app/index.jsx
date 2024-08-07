import GlobalStyles from '@/styles/globalStyles';
import AppProvider from './main-provider';
import { createRouter } from './routes';
import NotificationToster from './toaster-provider';

function App() {
  return (
    <AppProvider>
      <GlobalStyles />
      <NotificationToster />
      <AppRouter />
    </AppProvider>
  );
}

const AppRouter = () => {
  return createRouter();
};

export default App;
