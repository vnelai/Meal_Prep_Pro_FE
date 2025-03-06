// Import Modules 
import React,  { useState, useEffect } from 'react';  //Import react, useState, and useEffect
import { useParams, useNavigate } from 'react-router-dom'; // to get the recipe ID from URL and navigate through our react app
import './FavoriteRecipe.css';  // Import styling sheet

// FavoriteRecipe function
function FavoriteRecipe() {
    const { id } = useParams(); // Get id from url param
    const navigate = useNavigate(); // Navigate with useNavigate
    // Track and set the states
    const [recipe, setRecipe] = useState(null); 
    const [isEditing, setIsEditing] = useState(false); // State for edit mode toggle
    const [updatedRecipe, setUpdatedRecipe] = useState({});


    const fetchRecipe = async () => {
        try {
            // Fetching from our backend route favorites
            // Local url `http://localhost:5001/api/favorites/${id}`
            const res = await fetch(`https://meal-prep-pro-be.onrender.com/api/favorites/${id}`);
            const data = await res.json();
            setUpdatedRecipe(data); 
            setRecipe(data);
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        }
    };

    // useEffect to fetch from api
    useEffect(() => {
        fetchRecipe();
    }, [id]);  // Once when it mounts


    // Function to handle edit of favorite recipe in the backend
    const handleUpdateRecipe = async () => {
        try {
          const { newIngredient, ...rest } = updatedRecipe; // Destructure newIngredient
          const finalRecipe = { ...rest };

          //Fix issue with last ingredient not saving
          if (newIngredient && Object.keys(newIngredient).length > 0) {
              finalRecipe.ingredients = [...(rest.ingredients || []), newIngredient];
          }

            // Send request to update recipe with PUT method then backend will handle the route with the method specified
            // Local url `http://localhost:5001/api/favorites/${id}`
            const res = await fetch(`https://meal-prep-pro-be.onrender.com/api/favorites/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', //Tell server we are sending JSON data
                },
                body: JSON.stringify(finalRecipe),  // Convert object to JSON string for sending data to server
            });

            if (res.ok) {
                setIsEditing(false);  // Exit edit mode
                fetchRecipe(); // Refresh recipe
                setUpdatedRecipe({}); //Clear newIngredient after save
            }
        } catch (error) {
            console.error("Failed to update recipe:", error)
        }
    };


    // Handle input field changes when editing
    const handleInputChange = (event, index = null) => {
        const { name, value } = event.target;  // Name comes from the name attribute of the input

        // Update the state
        setUpdatedRecipe(prev => {
          if (index !== null && prev.ingredients) {
            const updatedIngredients = [...(prev.ingredients || [])]; // Copy existing ingredients
            updatedIngredients[index] = { ...updatedIngredients[index], [name]: value };  // Update ingredient at index by merging existing properties with anything being updated 
            return { ...prev, ingredients: updatedIngredients }; // Update existing ingredient
          } else {
            return { ...prev, [name]: value};  // Update only the edited field
          }
      });
  };



    // Handle adding ingredients
    const handleAddIngredient = () => {
      setUpdatedRecipe(prev => ({
          ...prev,
          ingredients: [...(prev.ingredients || []), { name: '', quantity: '', unit: '' }]
      }));
    };


    // If there's no recipe or if recipe is an empty object return loading div
    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-details-div">
          <h1>{isEditing ? (
            // If editing toggle on then create an input filed for user to be able to edit name
            <input
              type="text"
              name="recipeName"
              value={updatedRecipe.recipeName || ''}
              onChange={handleInputChange}
            />
          ) : (
            //  If editing toggle is off then leave recipe name as is
            recipe.recipeName
          )}</h1>
          {isEditing ? (
            <input
              type="text"
              name="recipeImg"
              value={updatedRecipe.recipeImg || ''}
              onChange={handleInputChange}
              placeholder="Image URL"
            />
          ) : (
            // If we are not editing image than show image by creating an image element
            recipe.recipeImg && <img src={recipe.recipeImg} alt={recipe.recipeName} />
          )}
          
          <h3>Ingredients</h3>
          <ul>
            {/* If ingredients exist in updated recipe then we can loop through each ingredient */}
            {updatedRecipe.ingredients && updatedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <div className='ingredient'>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={ingredient.name}
                        onChange={(event) => handleInputChange(event, index)}
                        placeholder="Ingredient Name" 
                      />
                      <input
                        type="text"
                        name="quantity"
                        value={ingredient.quantity}
                        onChange={(event) => handleInputChange(event, index)}
                        placeholder="Quantity" 
                      />
                      <input
                        type="text"
                        name="unit"
                        value={ingredient.unit}
                        onChange={(event) => handleInputChange(event, index)}
                        placeholder="Unit" 
                      />
                    </>  
                ) : (
                  <div className='ingredient'> 
                    {/* Display structure when not editing */}
                    <span>{ingredient.name}</span> - 
                    <span>{ingredient.quantity}</span> 
                    <span>{ingredient.unit}</span>
                 </div>
                )}
              </div>  
              </li>
            ))}
            {/* Add the edit ingredient section */}
            {isEditing && (
                      <li key={updatedRecipe.ingredients?.length || 0}> {/* Add a new ingredient entry */}
                        <div className='ingredient'>
                          <input
                                  type="text"
                                  name="name"
                                  placeholder="Ingredient Name"
                                  onChange={(event) => handleInputChange(event)} // Pass the next available index
                              />
                              <input
                                  type="text"
                                  name="quantity"
                                  placeholder="Quantity"
                                  onChange={(event) => handleInputChange(event)}
                              />
                              <input
                                  type="text"
                                  name="unit"
                                  placeholder="Unit"
                                  onChange={(event) => handleInputChange(event)}
                              />
                        </div>
  
                      </li>      
                )}
                {isEditing && (
                    <li>
                        <button onClick={handleAddIngredient}>Add Ingredient</button>
                    </li>
                )}
          </ul>
    
          <h3>Instructions</h3>
          <textarea
            name="instructions"
            value={updatedRecipe.instructions || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          
          <div className="actions">
            {isEditing ? (
              <>
                <button onClick={handleUpdateRecipe}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <button onClick={() => { setUpdatedRecipe(recipe); setIsEditing(true); }}>Edit</button>
            )}
          </div>
        </div>
      );
    }
    


// Export FavoriteRecipe component
export default FavoriteRecipe;