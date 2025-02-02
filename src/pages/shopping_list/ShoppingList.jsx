// Import Modules
// Import react and useState
import React, { useState } from "react";
// Import ShoppingList component
import ShoppingList from "../../components/shopping_list/ShoppingList";


// Shopping List page function
function ShoppingList() {
    // Track and set the grocery items
    // Add some sample data for now
    const [groceryItems, setGroceryItems]= useState([
        { _id: 1, name: "Watermelon" },
        { _id: 2, name: "Feta" },
        { _id: 3, name: "Bread" }
    ]);

    // Function to update a grocery item
    const updateGroceryItem = (id, updatedName) => {
        // Update the groceryItems state from the previous state to the updated one
        setGroceryItems((prevGroceryItem) =>
            //Loop through each item in previous state and create a new array
        prevGroceryItem.map((groceryItem) => 
                //if the groceryItem from the previous state has the same id as the updated one
                // We will merge the new name and update the existing one
                // And if the ids don't math we will leave the groceryItem as is and not change it
                // So basically we will loop through the array of items and only update the one we want
                groceryItem._id === id ? {...groceryItem, name: updatedName} : groceryItem
            )  
        );
    };


    // Function to delete an item 
    const deleteGroceryItem = (id) => {
        // Update the shopping list state
        setGroceryItems((prevGroceryItem) => 
            // Loop through the current items and keep only the grocery items
            //  with a different id than the one input in function
            prevGroceryItem.filter((groceryItem) => groceryItem._id !== id)
        );      
    };

  return (
    <div>
        <h2>Shopping List</h2>
        {/* Loop through each grocery item in groceryItems array */}
        {groceryItems.map((groceryItem) => (
            // For each grocery item we will return a shoppingList component
            <ShoppingList
            key={groceryItem._id}  // Setting a unique key
            groceryItem={groceryItem}  //Passing each item as a prop ShoppingList component
            // Passing the necessary functions to handle deleting and updating items
            updateGroceryItem={updateGroceryItem} 
            deleteGroceryItem={deleteGroceryItem}
            />
        ))}
    </div>
  )
}

// Export the ShoppingList page
export default ShoppingList


