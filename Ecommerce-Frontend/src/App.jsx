import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./components/pages/home/HomePage";
import { CheckoutPage } from "./components/pages/checkout/CheckoutPage";
import { OrdersPage } from "./components/pages/orders/OrdersPage";
import { Tracking } from "./components/pages/Tracking";
import axios from "axios";
import { SignUp } from "./components/pages/auth/SignUp";
import { SignIn } from "./components/pages/auth/SignIn";

function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get("http://localhost:3001/api/cart");
    setCart(response.data);
    console.log('loadCart')
  };
  useEffect(() => {
    loadCart();
  }, []);
  console.log("cart", cart);
  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} loadCart={loadCart} />} />
      <Route path="/tracking/:orderId/:productId" element={<Tracking cart= {cart}/>}/>
      <Route path="/signUp" element={<SignUp/>} />
      <Route path = "/signIn" element={<SignIn/>}  />
    </Routes>
  );
}

export default App;
