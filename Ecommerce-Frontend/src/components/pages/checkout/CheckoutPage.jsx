import { useEffect, useState } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import "./checkoutPage.css";
import { OrderSummary } from "./OrderSummary";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      const response = await axios.get(
        "http://localhost:3001/api/deliveryOptions",
      );
      setDeliveryOptions(response.data);
    };
    fetchDeliveryOptions();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get(
        "http://localhost:3001/api/paymentSummary",
      );
      setPaymentSummary(response.data);
    };
    fetchPaymentSummary();
  }, [cart]);

  return (
    <>
      <title>Check out</title>
      <CheckoutHeader cart={cart} />
      {cart.length && (
        <div className="checkout-page">
          <div className="page-title">Review your order</div>
          <div className="checkout-grid">
            <OrderSummary
              cart={cart}
              deliveryOptions={deliveryOptions}
              loadCart={loadCart}
            />
            <PaymentSummary
              paymentSummary={paymentSummary}
              loadCart={loadCart}
            />
          </div>
        </div>
      )}
    </>
  );
}
