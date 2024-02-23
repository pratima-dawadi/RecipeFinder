import React from 'react';
import './Detail.css';

const Detail = ({ selectedRecipe, onBack }) => {
  if (!selectedRecipe) {
    return null;
  }

  const { strMeal,strMealThumb, strCategory, strArea, strInstructions, strIngredient1, strIngredient2, strIngredient3 } = selectedRecipe;

  return (
    <div className="detail-container">
      <button onClick={onBack}>Back</button>
      <h2 className='title'>{strMeal}</h2>
      <img src={strMealThumb} alt={strMeal} />
      <p>Category: {strCategory}</p>
      <p>Area: {strArea}</p>
      <h3>Ingredients:</h3>
      <ul>
        <li>{strIngredient1}</li>
        <li>{strIngredient2}</li>
        <li>{strIngredient3}</li>
      </ul>
      <h3>Instructions:</h3>
      <p>{strInstructions}</p>
    </div>
  );
};

export default Detail;
