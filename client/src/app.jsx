import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome } from "./components/Welcome/Welcome";
import { Footer } from "./components/Footer/Footer";
import { Menu } from "./components/Menu/Menu";
import { CartProvider } from "./contexts/CartProvider";
import { Erro } from "./components/testes/Erro";
import { Sucesso } from "./components/testes/Sucesso";
import { Pendente } from "./components/testes/Pendente";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Welcome />
                <Footer />
              </>
            }
          />
          <Route path="/menu" element={<Menu />} />
          <Route path="/success" element={<Sucesso />} />
          <Route path="/failure" element={<Erro />} />
          <Route path="/pending" element={<Pendente />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
