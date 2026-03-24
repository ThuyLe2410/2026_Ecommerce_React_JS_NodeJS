import axios from "axios";
import { formatMoney } from "../utils/money";
import { useState } from "react";

export function Product({ product, loadCart }) {
  const [selectedValue, setSelectedValue] = useState(1);
  const [addedProductId, setAddedProductId] = useState(null);

  const selectValueHandler = (e) => {
    setSelectedValue(Number(e.target.value));
  };
  const addToCartHandler = async (productId) => {
    await axios.post("http://localhost:3001/api/cart", {
      productId: productId,
      quantity: selectedValue,
    }, {withCredentials:true});
    setAddedProductId(productId);
    await loadCart();
  };
  return (
    <div className="product-container" key={product.id}>
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name"> {product.name}</div>
      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count"> {product.rating.count}</div>
      </div>
      <div className="product-price">{formatMoney(product.priceCents)}</div>
      <div className="product-quantity-container">
        <select value={selectedValue} onChange={selectValueHandler}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div
        className={
          addedProductId === product.id ? "added-to-cart" : "added-to-cart-hide"
        }>
        <img className="checkmark" src="images/icons/checkmark.png" />
        Added
      </div>
      <button
        className="add-to-cart-button button-primary"
        onClick={() => addToCartHandler(product.id)}>
        Add to Cart
      </button>
    </div>
  );
}
