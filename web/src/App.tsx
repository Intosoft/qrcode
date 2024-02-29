import { Header } from "./components/Header";
import { HomePage } from "./pages/Home";
import GlobalStyle from "./GlobalStyle";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
      <GlobalStyle />
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
