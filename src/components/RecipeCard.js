import React from 'react';

const RecipeCard = ({ recipe, onViewDetail }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <button onClick={() => onViewDetail(recipe)}>View</button>
    </div>
  );
};
export default RecipeCard;
