import { Header } from "./components/Header";
import { HomePage } from "./pages/Home";
import GlobalStyle from "./GlobalStyle";
function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
