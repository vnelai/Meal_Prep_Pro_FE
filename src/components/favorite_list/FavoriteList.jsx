// Import modules
// Import react, useState, useEffect
import React, { useState, useEffect } from 'react'  
import { Link } from 'react-router-dom';  // Import Link for navigation
import './FavoriteList.css'  // Import css stylesheet

// FavoriteList function
function FavoriteList() {
    // Track and set recipes in the favorites state
    const [favorites, setFavorites] = useState([]);
    // Create and set newFavoriteRecipe
    const [newFavRecipe, setNewFavRecipe] = useState("");

    // // Edit and set favorite recipe id
    // const [editId,setEditId] = useState("");
    // // Edit and set favorite recipe name
    // const [editName, setEditName] = useState("");

    // fetchFavorites function that gets data and results in json format
    const fetchFavorites = async () => {
        try {
            // We will be fetching from our backend route '/api/favorites' and formatting result in json
            const res = await fetch ('http://localhost:5001/api/favorites');
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
            const res= await fetch('http://localhost:5001/api/favorites', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    recipeName: newFavRecipe.trim(),
                }),
            });
            await fetchFavorites(); // Refresh list
            setNewFavRecipe(""); //Reset the state
        } catch (error) {
            console.error("Failed to add favorite:", error);  
        }
    };

    // // Function to update Favorite in FavoriteList
    // const updateFav = async (id) => {
    //     try {
    //         // Second argument of fetch request is optional object which specifies details of request
    //         const res = await fetch(`/api/favorites/${id}`, {
    //             method: "PUT",
    //             headers: { "Content-Type" : "application/json"}, //Tell server we are sending JSON data
    //             body: JSON.stringify({ name: editName.trim()}),  // Convert object to JSON string for sending data to server
    //         });
    //         if (res.ok) fetchFavorites();  // Refresh list
    //         setEditId("");  // Reset id
    //     } catch (error) {
    //         console.error("Failed to update favorite:", error); 
    //     }
    // };

    // Function to delete favorite from FavoriteList
    const deleteFav = async (id) => {
        try {
            await fetch(`http://localhost:5001/api/favorites/${id}`, { method: "DELETE" });
            // Update the state to remove the deleted favorite
            // filter() creates a new array that excludes the deleted favorite.
            // (fav._id != id) target and keep only the favorite id that doesn't match deleted id
            setFavorites(prevFavorites => prevFavorites.filter(fav => fav._id !== id));
        } catch (error) {
            console.error("Failed to delete favorite:", error);
        }
    };

  return (
    <>
        <div>
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite._id} className='favorite-list-div'>
                        <span className='fav-name'>{favorite.recipeName}</span>
                        <div className='fav-btns'>
                            {/* Link to view details */}
                            <Link to={`/favorites/${favorite._id}`}>
                                <button className='details-btn'>Details</button>
                            </Link>
                            {/* Delete button */}
                            <button className="delete-btn" onClick={() => deleteFav(favorite._id)}>Delete</button>   
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <div className='add-new-fav-recipe-div'>   
            {/* Add New Favorite */}
            <input 
                type="text"
                value={newFavRecipe}
                onChange={(event) => setNewFavRecipe(event.target.value)}
                placeholder='Add a new favorite recipe...'
            />
            {/* Activate addFav function when clicking on button */}
            <button onClick={addFav}>Add</button> 
        </div>
    </> 
  );
};
    
    


// Export FavoriteList component
export default FavoriteList;