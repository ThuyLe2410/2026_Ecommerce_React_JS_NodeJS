import {Product} from "./Product.jsx";

export function ProductsGrid({ products, loadCart }) {
  console.log("products", products);
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <>
            <Product product={product} loadCart={loadCart} />
          </>
        );
      })}
    </div>
  );
}
