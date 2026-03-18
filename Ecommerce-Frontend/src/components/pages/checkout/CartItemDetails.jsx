import axios from "axios";
import { formatMoney } from "../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [qty, setQty] = useState(cartItem.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (productId, nextQty) => {
    setIsUpdating(true);
    await axios.patch(`http://localhost:3001/api/cart/${productId}`, {
      quantity: nextQty,
    });
    await loadCart();
  };

  const handleDelete = async (productId) => {
    await axios.delete(`http://localhost:3001/api/cart/${productId}`);
    await loadCart();
  };

  const handleDecrease = async () => {
    const next = Math.max(1, qty - 1);
    setQty(next);
    handleUpdate(cartItem.productId, next);
  };

  const handleIncrease = async () => {
    const next = qty + 1;
    setQty(next);
    handleUpdate(cartItem.productId, next);
  };
  console.log("updating", isUpdating);
  return (
    <>
      <img className="product-image" src={cartItem.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.name}</div>
        <div className="product-price">{formatMoney(cartItem.priceCents)}</div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            <button
              className={isUpdating ? "item-button" : "item-button hide-button"}
              onClick={handleDecrease}>
              -
            </button>{" "}
            {qty}{" "}
          </span>
          <button
            className={isUpdating ? "item-button" : "item-button hide-button"}
            onClick={handleIncrease}>
            +
          </button>
          <button
            className="item-button"
            onClick={() => handleUpdate(cartItem.productId)}>
            Update
          </button>
          <button
            className="item-button"
            onClick={() => handleDelete(cartItem.productId)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
