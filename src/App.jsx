import { Route, Routes } from "react-router-dom";
import "./App.css";
import CartList from "./pages/CartList";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/cart" element={<CartList />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
