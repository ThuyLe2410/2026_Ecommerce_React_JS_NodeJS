import { useParams } from "react-router";
import { Header } from "../Header.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./tracking.css";
import { useNavigate } from "react-router";

export function Tracking({ cart }) {
  const navigate = useNavigate();
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrackingData = async () => {
        setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3001/api/orders/${orderId}`,{withCredentials: true}
      );
      setOrder(response.data);
      setIsLoading(false)
    };
    fetchTrackingData();
  }, [orderId]);
  if (isLoading) return <div> Loading tracking...</div>
  if (!order) {
    return <div>Order not found</div>;
  }
  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  if (!orderProduct) {
    return (
      <>
        <title>Tracking</title>
        <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
        <Header cart={cart}/>
        <div className="tracking-page">
          <div className="order-tracking">
            <a
              className="back-to-orders-link"
              onClick={() => navigate("/orders")}>
              View all orders
            </a>
            <div className="delivery-date">
              Product not found in this order.
            </div>
          </div>
        </div>
      </>
    );
  }

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

  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <Header cart={cart}/>
      <div className="tracking-page">
        <div className="order-tracking">
          <a
            className="back-to-orders-link"
            onClick={() => navigate("/orders")}>
            View all orders
          </a>
          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on" : "Arriving on"}{" "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div>Name {orderProduct.product.name}</div>
          <div className="product-info">Quantity: {orderProduct.quantity}</div>
          <img
            className="product-image"
            src={`/${orderProduct.product.image}`}
          />
          <div className="progress-labels-container">
            {" "}
            <div
              className={`progress-label ${isPreparing && "current-status"}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
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
