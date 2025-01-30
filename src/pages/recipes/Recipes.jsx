// Import modules
import React from 'react'  // Import react
// Import RecipeSearch component
import RecipeSearch from '../../components/recipe_search/RecipeSearch'
import RecipeList from './RecipeList'; // Import RecipeList component

function Recipes() {
  return (
    <div>
        <h2>Explore Recipes</h2>
        <RecipeSearch/>  
        <RecipeList/>
    </div>
  )
}

// Export Recipes
export default Recipes;