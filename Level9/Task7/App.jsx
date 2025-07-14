import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default App;
