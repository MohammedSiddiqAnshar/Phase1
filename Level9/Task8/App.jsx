import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const DashBoard = lazy(() => import("./DashBoard"));
const Products = lazy(() => import("./Products"));

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/products">Products</Link>
      </nav>

      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashBoard" element={<DashBoard />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
