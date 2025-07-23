import React from "react";
import { Link } from "react-router-dom";


const products = [
  { id: "1", name: "Laptop", description: "A high-performance laptop." },
  { id: "2", name: "Smartphone", description: "A latest model smartphone." },
  { id: "3", name: "Headphones", description: "Noise-canceling headphones." },
];

const ProductsList = () => {
  return (
    <div className="products-container">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
