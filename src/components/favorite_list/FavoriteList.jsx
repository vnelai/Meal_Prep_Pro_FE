// Import modules
// Import react, useState, useEffect
import React, { useState, useEffect } from 'react'  

// FavoriteList function
function FavoriteList() {
    // Track and set recipes in the favorites state
    const [favorites, setFavorites] = useState([]);
    // Create and set newFavoriteRecipe
    const [newFavRecipe, setNewFavRecipe] = useState("");
    // Edit and set favorite recipe id
    const [editId,setEditId] = useState("");
    // Edit and set favorite recipe name
    const [editName, setEditName] = useState("");

    // fetchFavorites function that gets data and results in json format
    const fetchFavorites = async () => {
        try {
            // We will be fetching from our backend route '/api/favorites'
            const res = await fetch ('/api/favorites');
            const data = await res.json();
            setFavorites(data);
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        }     
    };

    // useEffect for fetching the data from api 
    useEffect(() => {
        fetchFavorites();
    }, []); // Executed once when mounted

    // Function to add favorite to FavoriteList
    const addFav = async () => {
        try {
            const res= await fetch('/api/favorites', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newFavRecipe }),
            });
            fetchFavorites(); // Refresh list
            setNewFavRecipe(""); //Reset the state
        } catch (error) {
            console.error("Failed to add favorite:", error);  
        }
    };

    // Function to update Favorite in FavoriteList
    const updateFav = async (id) => {
        try {
            // Second argument of fetch request is optional object which specifies details of request
            const res = await fetch(`/api/favorites/${id}`, {
                method: "PUT",
                headers: { "Content-Type" : "Application/json"}, //Tell server we are sending JSON data
                body: JSON.stringify({ name: editName}),  // Convert object to JSON string for sending data to server
            });
            if (res.ok) fetchFavorites();  // Refresh list
            setEditId("");  // Reset id
        } catch (error) {
            console.error("Failed to update favorite:", error); 
        }
    };

    // Function to delete favorite from FavoriteList
    const deleteFav = async (id) => {
        try {
            await fetch(`/api/favorites/${id}`, { method: "DELETE" });
            // Update the state to remove the deleted favorite
            // filter() creates a new array that excludes the deleted favorite.
            // (fav._id != id) target and keep only the favorite id that doesn't match deleted id
            setFavorites(prevFavorites => prevFavorites.filter(fav => fav._id !== id));
        } catch (error) {
            console.error("Failed to delete favorite:", error);
        }
    };

  return (
    <div>
        <h2>Favorites</h2>
        {/* Add New Favorite */}
        <input 
        type="text"
        value={newFavRecipe}
        onChange={(event) => setNewFavRecipe(event.target.value)}
        placeholder='Add a new favorite recipe...'
        />
        {/* Activate addFav function when clicking on button */}
        <button onClick={addFav}>Add</button> 
        <ul>
            {favorites.map((favorite) => (
                <li key={favorite._id}>
                    {editId === favorite._id ? (
                        <>
                        <input 
                            type="text" 
                            value={editName}
                            onChange={(event) => setEditName(event.target.value)}
                        />
                        <button onClick={() => updateFav(favorite._id)}>Save</button>
                        <button onClick={() => setEditId("")}>Cancel</button>
                        </>
                    ) : (
                        <>
                            {favorite.name}
                            <button onClick={() => { setEditId(favorite._id); setEditName(favorite.name);}}>Edit</button>
                            <button onClick={() => deleteFav(favorite._id)}>Delete</button>
                        </>
                    )}   
                </li>
            ))}
        </ul>
    </div>
  );
};


// Export FavoriteList component
export default FavoriteList;