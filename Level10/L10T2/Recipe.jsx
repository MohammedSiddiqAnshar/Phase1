import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=2b0b491aa44947ca802520c4ffafb5b6`
        );
        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
      <h3>Instructions:</h3>
      <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  );
}
