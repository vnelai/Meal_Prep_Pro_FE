// Import modules
import React, { useEffect, useState } from "react"; // Import React
import './RecipeList.css';  // Import css file

//RecipeList component function
function RecipeList({ recipes, addToFavorites }) {

  return (
    <div className="recipe-list-div">
      {/*  Check if recipes exists and is not empty */}
      {recipes && recipes.length > 0 ? ( 
        // Mapping over recipes array and rendering data
        recipes.map((recipe, index) => (
        <div key={recipe.recipeId || recipe._id} className="recipe-card">
          <img src={recipe.image} alt={recipe.title} />
          <div className="card-content">
          <h3>{recipe.title}</h3>
          <div className="btn-div">
             {/* View Details Button */}
            <button className="view-details-btn">View Details</button>
            {/* Add to Favorites Button */}
            <button 
                className="add-to-favorites-btn" 
                onClick={() => addToFavorites(recipe)}
            >Add Favorite</button>
          </div>
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
