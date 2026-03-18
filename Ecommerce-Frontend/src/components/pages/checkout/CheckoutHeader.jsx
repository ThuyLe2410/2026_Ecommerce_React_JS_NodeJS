import { Link } from "react-router";
import "./checkoutHeader.css";
export function CheckoutHeader({ cart }) {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link className="header-link" to="/">
            <img className="logo" src="images/logo.png" />
          </Link>
        </div>
        <div className="checkout-header-middle-section">
          {cart.length === 0 ? (
            <span>Your cart is empty</span>
          ) : (
            <div>
              Checkout ({totalQuantity} {totalQuantity > 1 ? "items" : "item"}
              )
            </div>
          )}
        </div>
        <div className="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>
    </div>
  );
}
