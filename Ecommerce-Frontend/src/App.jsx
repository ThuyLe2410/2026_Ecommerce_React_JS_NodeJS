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
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./context/authContext";


function App() {
  const [cart, setCart] = useState([]);
  const {user} = useAuth()
  const loadCart = async () => {
    const response = await axios.get("http://localhost:3001/api/cart", {withCredentials:true});
    setCart(response.data);
  };
  useEffect(() => {
    if (user) {
 loadCart();
    } else {
      setCart([])
    }
   
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage cart={cart} loadCart={loadCart} /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage cart={cart} loadCart={loadCart}/></ProtectedRoute>} />
      <Route path="/tracking/:orderId/:productId" element={<Tracking cart= {cart}/>}/>
      <Route path="/signUp" element={<SignUp/>}  />
      <Route path = "/signIn" element={<SignIn/>}  />
    </Routes>
  );
}

export default App;
