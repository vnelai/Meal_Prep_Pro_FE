// Import modules
import React, { useEffect, useState } from "react"; // Import React
import './RecipeList.css';  // Import css file

//RecipeList component function
function RecipeList() {
  // Track and set recipes state, initialize with an empty array
  const [recipes, setRecipes] = useState([]);

  // with useEffect fetch recipes from 'api/recipes' and format the result in JSON
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("api/recipes");
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes(); // Call fetchRecipes function
  }, []); // Empty dependency because I want the function to run once when the component mounts

  return (
    <div className="recipe-list-div">
        {/* Mapping over recipes array and rendering data */}
        {recipes.map((recipe, index) => (
        <div key={index} className="recipe-card">
          <img src={recipe.image} alt={recipe.title} />
          <div className="card-content">
          <h3>{recipe.title}</h3>
          <p>{recipe.summary}</p>
          <button>View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Export RecipeList component
export default RecipeList;
