import { useParams } from "react-router";
import { Header } from "../Header.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import './tracking.css';
import { useNavigate } from "react-router";

export function Tracking({ cart }) {
    const navigate = useNavigate() 
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/orders/${orderId}`,
      );
      setOrder(response.data);
    };
    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }
  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }
  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;
  console.log('orderProduct.product.image', orderProduct.product.image)

  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link" onClick={() => navigate("/orders")}>View all orders</a>
          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on" : "Arriving on"}{" "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div>Name {orderProduct.product.name}</div>
          <div className="product-info">Quantity: {orderProduct.quantity}</div>
          <img className="product-image" src={`/${orderProduct.product.image}`} />
          <div className="progress-labels-container">
            {" "}
            <div
              className={`progress-label ${isPreparing && "current-status"}`}>
              Preparing
            </div>
            <div
              className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}>
              Delivered
            </div>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}></div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
