import dayjs from "dayjs";
import { formatMoney } from "../utils/money";
import { Fragment, useState } from "react";
import axios from "axios";

export function OrderGrid({ orders, loadCart }) {
  const [selectedItem, setSelectedItem] = useState({});
  const [qtyByProductId, setQtyByProductId] = useState({});
 const getQty = (id) =>
  Number.isFinite(qtyByProductId[id]) ? qtyByProductId[id] : 1;

  const handleBuyAgain = async (id) => {
    const qty = getQty(id)
    await axios.patch(
      `http://localhost:3001/api/cart/${id}`,
      {
        quantity: qty,
      },
      { withCredentials: true },
    );
    await loadCart();
  };
  const handleDecrease = (id) => {
    const next = Math.max(1, getQty(id) - 1);
    setQtyByProductId((prev) => ({ ...prev, [id]: next }));
  };
  const handleIncrease = (id) => {
    const next = getQty(id) + 1;
    setQtyByProductId((prev) => ({ ...prev, [id]: next }));
  };

  return (
    <div className="order-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <div className="order-header">
              <div className="order-left-section">
                <div className="order-date">
                  <div className="order-header-label"> Order Placed: </div>
                  <div> {dayjs(order.orderTimeMs).format("MMMM D")} </div>
                </div>
                <div className="order-total">
                  {" "}
                  <div className="order-header-label">Total:</div>
                  <div>{formatMoney(order.totalCostCents)}</div>{" "}
                </div>
              </div>
              <div className="order-right-section">
                <div className="order-header-label">Order ID:</div>
                <div> {order.id}</div>
              </div>
            </div>
            <div className="order-details-grid">
              {order.products.map((product) => {
                return (
                  <Fragment key={product.productId}>
                    <div className="product-image-container">
                      <img src={product.image} />
                    </div>
                    <div className="product-details">
                      <div className="product-name"> {product.name}</div>
                      <div className="product-delivery-date">
                        Arriving on:{" "}
                        {dayjs(product.estimatedDeliveryTimeMs).format(
                          "MMMM D",
                        )}
                      </div>
                      <div className="product-quantity">
                        {" "}
                        Quantity: {product.quantity}
                      </div>
                      {(selectedItem.productId == product.productId && selectedItem.orderId === order.id) ? (
                        <div>
                          <button
                            className="item-button"
                            onClick={() => handleDecrease(product.productId)}>
                            -
                          </button> {" "}
                          {getQty(product.productId)}
                          <button
                            className="item-button"
                            onClick={() => handleIncrease(product.productId)}>
                            +
                          </button>
                          <button className="button-secondary" onClick={() => handleBuyAgain(product.productId)}>Add to cart</button>
                        </div>
                      ) : (
                        <button className="buy-again-button button-primary">
                          <img
                            className="buy-again-icon"
                            src="images/icons/buy-again.png"
                          />
                          <span
                            className="buy-again-message"
                            onClick={() => setSelectedItem({productId: product.productId, orderId: order.id})}>
                            Buy it again
                          </span>
                        </button>
                      )}
                    </div>
                    <div className="product-actions">
                      <a href={`/tracking/${order.id}/${product.productId}`}>
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </a>
                    </div>
                  </Fragment>
                );
              })}{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
}
