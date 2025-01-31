// Import Modules
import React from 'react';  // Import React
// Import FavoriteList component
import FavoriteList from '../../components/favorite_list/FavoriteList';


// Favorites page function
function Favorites() {
  return (
    <div>
        <h1>Favorites Recipes</h1>
        <FavoriteList/>
    </div>
  );
}

// Export Favorites page
export default Favorites;