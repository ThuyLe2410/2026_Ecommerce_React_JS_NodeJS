import dayjs from "dayjs";
import { formatMoney } from "../utils/money";
import axios from "axios";

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        const updateDeliveryOption = async () => {
          try {
            console.log("clicked option", deliveryOption.id);
            await axios.patch(
              `http://localhost:3001/api/cart/${cartItem.productId}`,
              {
                deliveryOptionId: deliveryOption.id,
              },
            );
            console.log("put ok, calling loadCart");
            await loadCart();
            console.log("loadCart done");
          } catch (e) {
            console.log("updateDeliveryOption error", e);
          }
        };

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={updateDeliveryOption}>
            <input
              className="delivery-option-input"
              type="radio"
              checked={
                String(deliveryOption.id) === String(cartItem.deliveryOptionId)
              }
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd,MMMM,D",
                )}
              </div>
              <div className="delivery-option-price">
                {" "}
                {deliveryOption.priceCents == 0
                  ? "FREE Shipping"
                  : `${formatMoney(deliveryOption.priceCents)} - Shipping`}{" "}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
