// Import modules
import React, { useEffect, useState } from "react"; // Import React
import './RecipeList.css';  // Import css file

//RecipeList component function
function RecipeList({ recipes }) {

  return (
    <div className="recipe-list-div">
      {/*  Check if recipes exists and is not empty */}
      {recipes && recipes.length > 0 ? ( 
        // Mapping over recipes array and rendering data
        recipes.map((recipe, index) => (
        <div key={index} className="recipe-card">
          <img src={recipe.image} alt={recipe.title} />
          <div className="card-content">
          <h3>{recipe.title}</h3>
          <p>{recipe.summary}</p>
          <button>View Details</button>
          </div>
        </div>
      ))
      ) : (
        // Display a message when no recipes found
        <p>No recipes found.</p> 
      )}  
    </div>
  );
}

// Export RecipeList component
export default RecipeList;
