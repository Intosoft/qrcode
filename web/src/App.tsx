import { Header } from "./components/Header";
import { HomePage } from "./pages/Home";
import GlobalStyle from "./GlobalStyle";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div>
      <Toaster />
      <GlobalStyle />
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
