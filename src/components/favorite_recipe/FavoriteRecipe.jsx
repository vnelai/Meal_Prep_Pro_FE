// Import Modules 
//Import react, useState, and useEffect
import React,  { useState, useEffect } from 'react';


// FavoriteRecipe function
function FavoriteRecipe() {
    // Track and set the states
    const [favorites, setFavorites] = useState([]);
    const [newRecipe, setNewRecipe] = useState({title: "", ingredients: ""});
    const [editId, setEditId] = useState("");

    const fetchFavorites = async () => {
        try {
            // Fetching from our backend route favorites
            const res = await fetch('/api/favorites');
            const data = await res.json();
            setFavorites(data);
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        }
    };

    // useEffect to fetch from api
    useEffect(() => {
        fetchFavorites();
    }, []);  // Once when it mounts

    // Function to handle adding a recipe to favorites
    const handleAddRecipe = async () => {
        if (!newRecipe.title || !newRecipe.ingredients) return;
        try {
            const res = await fetch('/api/favorites', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newRecipe),
            });
            fetchFavorites(); //Refresh the favorites list
            // const data = await res.json();  // Convert the res to json format
            // setFavorites([...favorites, data]); // Merge the new recipe data with existing favorites
            // setNewRecipe({title: "", ingredients: ""}); // Reset newRecipe state
        } catch (error) {
            console.error("Failed to add recipe:", error);
        }
    };

    // Function to handle edit of favorite recipe
    const handleEditRecipe = (recipe) => {
        setNewRecipe(recipe);
        setEditId(recipe._id);
    };


    // Function to handle the favorite recipe update
    const handleUpdateRecipe = async () => {
        try {
            // Send request to update recipe with PUT
            await fetch(`/api/favorites/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"}, //Tell server we are sending JSON data
                body: JSON.stringify(newRecipe), // Convert object to JSON string for sending data to server
            });
            // Update favorites state by replacing the edited recipe
            setFavorites(
                // Loop through favorites array
                favorites.map((recipe) => 
                    // Check if recipe id matched the id being edited
                    // If it matches then create a new object by merging existing recipe with newRecipe
                    // Spread operator used to copy properties
                    // If it doesn't match keep recipe as is
                    recipe._id === editId ? {...recipe, ...newRecipe} : recipe
                )
            );
            setNewRecipe({title: "", ingredients: ""}); // Reset inputs
            setEditId("");  // Reset input
        } catch (error) {
            console.error("Failed to update favorite recipe:", error);
        }
    };

    // Function to handle the delete of favorite recipe
    const handleDelete = async (id) => {
        try {
            await fetch(`/api/favorites/${id}`, {method: "DELETE"});
            // Update the state to remove the deleted favorite
            // filter() creates a new array that excludes the deleted favorite.
            // (fav._id != id) target and keep only the favorite id that doesn't match deleted id
            setFavorites(favorites.filter((recipe) => recipe._id !== id));
        } catch (error) {
            console.error("Failed to delete recipe:", error);
        }
    };

  // Staging on elements on component
  return (
    <div>
        <h2>Favorite Recipes</h2>
        <input
        type="text" 
        placeholder='Recipe Name'
        value={newRecipe.title}
        // Update the title of the new recipe with the input value
        //...newRecipe copies the new recipe object and then we can update the title
        onChange={(event) => setNewRecipe({...newRecipe, title: event.target.value})}
        />
        <input 
        type="text" 
        placeholder='Ingredients'
        value={newRecipe.ingredients}
        onChange={(event) => setNewRecipe({...newRecipe, ingredients:event.target.value})}
        />
        {editId ? (
            // If editId state has a value the button will call handleUpdate Recipe
            <button onClick={handleUpdateRecipe}>Update</button>
        ) : (
            //If editId state has no value the button will call handleAddRecipe Recipe
            <button onClick={handleAddRecipe}>Add</button> 
        )}
        <ul>
            {/* Loop through each favorite recipe */}
            {favorites.map((favRecipe) => (
                <li key={favRecipe._id}>
                    {/* Display title of recipe */}
                    <strong>{favRecipe.title}</strong> 
                    {/* Display ingredients of recipe */}
                    <p>{favRecipe.ingredients}</p>
                    {/* On click handle editing of recipe */}
                    <button onClick={() => handleEditRecipe(favRecipe)}>Edit</button>
                    {/* On click delete the recipe from favorites */}
                    <button onClick={() => handleDelete(favRecipe._id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
  );
};


// Export FavoriteRecipe component
export default FavoriteRecipe