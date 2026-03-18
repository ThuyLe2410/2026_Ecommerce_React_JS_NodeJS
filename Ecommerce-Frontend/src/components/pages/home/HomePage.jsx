import { Header } from "../../Header";
import "./homePage.css";
import { Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({cart, loadCart}) {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("http://localhost:3001/api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []);

  const filteredProducts = useMemo(()=> {
    if (!searchInput) return products;
    return products.filter((product)=> 
      product.keywords.some((keyword)=> keyword.toLowerCase().includes(searchInput))
    )
  }, [products, searchInput])
  return (
    <>
      <title>Ecommerce Project</title>
      <Header setSearchInput={setSearchInput} cart={cart}/>
      <div className="home-page">
        <ProductsGrid products={filteredProducts} loadCart={loadCart} />
      </div>
    </>
  );
}
