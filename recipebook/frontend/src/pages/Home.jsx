import React, { useEffect, useState } from 'react';
import RecipeForm from '../components/RecipeForm';
import RecipeList from '../components/RecipeList';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const res = await fetch('http://localhost:5000/api/recipes');
    const data = await res.json();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <RecipeForm onAdd={fetchRecipes} />
      <RecipeList recipes={recipes} />
    </>
  );
};

export default Home;
