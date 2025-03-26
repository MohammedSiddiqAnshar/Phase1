import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, Outlet } from "react-router-dom";


const products = [
    { id: "1", name: "Laptop", description: "A high-performance laptop." },
    { id: "2", name: "Smartphone", description: "A latest model smartphone." },
    { id: "3", name: "Headphones", description: "Noise-canceling headphones." }
    ];


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


    const Dashboard = () => {
    return (
        <div style={{ display: "flex" }}>
        <nav style={{ width: "200px", padding: "20px", background: "#f4f4f4" }}>
            <h3>Dashboard</h3>
            <ul>
            <li><Link to="overview">Overview</Link></li>
            <li><Link to="profile">Profile</Link></li>
            <li><Link to="settings">Settings</Link></li>
            </ul>
        </nav>
        <main style={{ padding: "20px" }}>
            <Outlet /> 
        </main>
        </div>
    );
    };


    const Overview = () => <h2>Overview Section</h2>;
    const Profile = () => <div><h2>Profile Section</h2>
                <h2><span style={{color:"red"}}> It's about products Profile</span></h2></div>
    ;
    const Settings = () => <h2>Settings Section</h2>;


    const App = () => {
    return (
        <Router>
        <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />  
            <Route path="overview" element={<Overview />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
        </Router>
    );
    };

export default App;
