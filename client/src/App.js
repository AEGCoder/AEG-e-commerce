import Header from "./components/header/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Customers from "./pages/Customers";
import Bills from "./pages/Bills";
import Register from "./pages/auth/register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RouterControl>
                <Home />
              </RouterControl>
            }
          />
          <Route
            path="/cart"
            element={
              <RouterControl>
                <Cart />
              </RouterControl>
            }
          />
          <Route
            path="/customers"
            element={
              <RouterControl>
                <Customers />
              </RouterControl>
            }
          />
          <Route
            path="/bills"
            element={
              <RouterControl>
                <Bills />
              </RouterControl>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={
              <div>
                <Header />
                <ProductPage />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const RouterControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
