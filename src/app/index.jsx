import GlobalStyles from "@/styles/globalStyles";
import AppProvider from "./main-provider";
import { createRouter } from "./routes";

function App() {
  return (
    <AppProvider>
      <GlobalStyles />
      <AppRouter />
    </AppProvider>
  );
}

const AppRouter = () => {
  return createRouter();
};

export default App;
