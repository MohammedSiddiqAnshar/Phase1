import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const products = [
  { id: "1", name: "Laptop", category: "Electronics" },
  { id: "2", name: "Smartphone", category: "Electronics" },
  { id: "3", name: "T-shirt", category: "Clothing" },
  { id: "4", name: "Jeans", category: "Clothing" },
  { id: "5", name: "Headphones", category: "Electronics" },
];

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  
  useEffect(() => {
    setSearchParams({ search: searchTerm, category });
  }, [searchTerm, category, setSearchParams]);

  
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "" || product.category === category)
    );
  });

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Product Search</h1>

      
      <input
        type="text"
        placeholder="Search product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "5px" }}>
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>

      
      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link> ({product.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
