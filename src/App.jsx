import { createRouter } from "./app/routes";
import GlobalStyles from "./styles/globalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <AppRouter />
    </>
  );
}
const AppRouter = () => {
  return createRouter();
};

export default App;
