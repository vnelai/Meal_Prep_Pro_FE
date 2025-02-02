// Import modules
import React from 'react'  // Import react
// Import RecipeSearch component
import RecipeSearch from '../../components/recipe_search/RecipeSearch'
import RecipeList from '../../components/recipe_list/RecipeList'; // Import RecipeList component

function Recipes() {
  return (
    <div>
        <RecipeSearch/>  
        <RecipeList/>
    </div>
  )
}

// Export Recipes
export default Recipes;