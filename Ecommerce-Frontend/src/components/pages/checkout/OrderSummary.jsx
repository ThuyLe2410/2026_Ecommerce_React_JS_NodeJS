import dayjs from "dayjs";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryOptions } from "./DeliveryOptions";
import "./checkoutPage.css"

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  console.log("orderSummary_cart", cart);

  return (
    <div className="order-summary">
      {cart.map((item) => {
        const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
            return String(deliveryOption.id) === String(item.deliveryOptionId)
        });
        if (!selectedDeliveryOption) {
            return null;
        }

        return (
          <div key={item.id} className="cart-item-container">
            <div className="delivery-date"> Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd,MMMM,D')}</div>
            <div className="cart-item-details-grid">
              <CartItemDetails cartItem={item} loadCart={loadCart}/>
              <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={item} loadCart={loadCart}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}
