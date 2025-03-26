import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";


const products = [
    { id: "1", name: "Laptop", description: "A high-performance laptop." },
    { id: "2", name: "Smartphone", description: "A latest model smartphone." },
    { id: "3", name: "Headphones", description: "Noise-canceling headphones." }
    ];

    // Product List Component
    const ProductList = () => {
    return (
        <div>
        <h2>Product List</h2>
        <ul>
            {products.map((product) => (
            <li key={product.id}>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
            ))}
        </ul>
        </div>
    );
    };

    // Product Detail Component
    const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === id);

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <Link to="/products">Back to Products</Link>
        </div>
    );
    };

    // App Component
    const Task2 = () => {
    return (
        <Router>
        <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
        </Router>
    );
    };

export default Task2;
