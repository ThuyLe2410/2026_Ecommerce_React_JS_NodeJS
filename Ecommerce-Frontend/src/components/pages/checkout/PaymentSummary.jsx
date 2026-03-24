import { useNavigate } from "react-router";
import { formatMoney } from "../utils/money";
import axios from "axios";

export function PaymentSummary({ paymentSummary, loadCart }) {
  const navigate = useNavigate();
  const handlePlaceOrder = async () => {
    await axios.post(`http://localhost:3001/api/orders`,{}, {
      withCredentials: true,
    });
    await loadCart();
    navigate("/orders");
  };
  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>
      {paymentSummary && (
        <>
          <div className="payment-summary-row">
            <div>Items ({paymentSummary.quantity}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.amount)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping & handling: </div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shipping)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax: </div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostBeforeTax)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%): </div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.tax)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order Total: </div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalOrder)}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            onClick={handlePlaceOrder}>
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
