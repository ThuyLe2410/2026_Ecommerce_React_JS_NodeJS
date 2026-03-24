import "./header.css";
import { useState } from "react";

import { Link } from "react-router";
import { useAuth } from "../context/authContext";
export function Header({ setSearchInput, cart }) {
  const [searchValue, setSearchValue] = useState("");
  const {user, signout} = useAuth();

  const onSubmitSearch = (e) => {
    e.preventDefault();
    setSearchInput(searchValue);
  };
  const resetSearch = () => {
    setSearchInput("");
    setSearchValue("");
  };
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
 
  return (
    <div className="header">
      <div className="left-section">
        <Link className="header-link" to="/" onClick={resetSearch}>
          <img className="logo" src="/images/logo.png" />
        </Link>
      </div>

      <form onSubmit={onSubmitSearch} className="middle-section">
        <input
          className="search-bar"
          placeholder="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        />
        <button className="search-button" type="submit">
          <img className="search-icon" src="/images/icons/search-icon.png" />
        </button>
      </form>

      <div className="right-section">
        <Link className="profile-link header-link" to="/profile">
          <span className="user-text">Hello, {user?.name}</span>
    
        </Link>
        {user? (<button onClick={signout}>Sign out</button>):(<Link to="/signIn">Sign in</Link>)}
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>
        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="/images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <span className="cart-text">Cart</span>
        </Link>
      </div>
    </div>
  );
}
