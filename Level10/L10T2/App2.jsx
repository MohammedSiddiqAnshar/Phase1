import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Recipe from './Recipe';
import Cuisine from './Cuisine';
import Search from './Search';
import Category from './Category';
import SearchBar from './SearchBar';

export default function App2() {
  return (
    <BrowserRouter>
      <SearchBar />
      <Category />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
