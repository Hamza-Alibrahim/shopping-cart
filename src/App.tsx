import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Aboute from "./pages/About";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

const App = () => {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <div className="max-w-[90%] mx-auto pb-5">
        <Routes>
          <Route path="shopping-cart/" element={<Home />} />
          <Route path="shopping-cart/store" element={<Store />} />
          <Route path="shopping-cart/about" element={<Aboute />} />
        </Routes>
      </div>
    </ShoppingCartProvider>
  );
};
export default App;
