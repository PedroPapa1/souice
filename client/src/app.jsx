import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome } from "./components/Welcome/Welcome";
import { Menu } from "./components/Menu/Menu";
import { CartProvider } from "./contexts/CartProvider";
import { MpStatusScreens } from "./components/MpStatusScreens";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/success" element={<MpStatusScreens />} />
          <Route path="/failure" element={<MpStatusScreens />} />
          <Route path="/pending" element={<MpStatusScreens />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
