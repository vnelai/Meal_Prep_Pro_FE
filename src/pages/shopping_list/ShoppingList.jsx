// Import Modules
// Import react, useState, and useEffect
import React, { useState,  useEffect  } from "react";
// Import ShoppingList component
import ShoppingList from "../../components/shopping_list/ShoppingList";
import './ShoppingList.css'  // Import css stylesheet


// Shopping List page function
function ShoppingListPage() {
    // Track and set the grocery items
    const [groceryItems, setGroceryItems]= useState([]);

    // Track and set new grocery items
    const [newGroceryItem, setNewGroceryItem] = useState("");

    // Fetch grocery items from backend
    useEffect(() => {
        const fetchGroceryItems = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/shopping-list");
                const data = await res.json();
                setGroceryItems(data);
            } catch (error) {
                console.error("Failed to fetch grocery items:", error);
            }
        };
    
        fetchGroceryItems();
    }, []); // This will run only when component mounts

    // Function to update a grocery item
    const updateGroceryItem = async (id, updatedName) => {
        try {
            const updatedItem = { itemName: updatedName};
            const res = await fetch(`http://localhost:5001/api/shopping-list/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                // Making sure the variable name i want to update matches backend model
                body: JSON.stringify(updatedItem), // send updated name in the request body
            });
            const updatedGroceryItem = await res.json();

            setGroceryItems((prevGroceryItem) =>
                //Loop through each item in previous state and create a new array
                prevGroceryItem.map((GroceryItem) =>
                    //if the groceryItem from the previous state has the same id as the updated one
                    // We will merge the new name and update the existing one
                    // And if the ids don't math we will leave the groceryItem as is and not change it
                    // So basically we will loop through the array of items and only update the one we want
                    GroceryItem._id === updatedGroceryItem._id ? updatedGroceryItem : GroceryItem
                )
            );
        } catch (error) {
            console.error("Failed to update grocery item:", error);
        }
    };
   
    // Function to delete an item
    const deleteGroceryItem = async (id) => {
        try {
            await fetch(`http://localhost:5001/api/shopping-list/${id}`, {
                method: "DELETE",
            });
            // Update the shopping list state
            setGroceryItems((prevItems) =>
                // Loop through the current items and keep only the grocery items
                //  with a different id than the one input in function
                prevItems.filter((item) => item._id !== id)
            );
        } catch (error) {
            console.error("Failed to delete grocery item:", error);
        }
    };

    // Function to add a new grocery item
    const addGroceryItem = async () => {
        // If there's no new item entered don't save anything
        if (newGroceryItem.trim() === "") return;

        try {
            const res = await fetch("http://localhost:5001/api/shopping-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemName: newGroceryItem }),
            });
            const newGrocery = await res.json();
            // Update the Main GroceryItems state by adding the new grocery item
            setGroceryItems((prevGroceryItem) => [...prevGroceryItem, newGrocery]);
            // Reset the New grocery item state 
            setNewGroceryItem("");
        } catch (error) {
            console.error("Error adding grocery item:", error);
        }
};

  return (
    <div >
        <h2 className="header-name">Shopping List</h2>
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
        {/* Add new grocery item with value the input value from new state */}
        <div className="add-grocery-div">
            <input
                type="text"
                value={newGroceryItem}
                onChange={(event) => setNewGroceryItem(event.target.value)}
                placeholder="Enter item..."
                className="add-item-input"
            />
        {/* Pass handling function for adding grocery item to btn */}
        <button onClick={addGroceryItem} className="add-item-btn">Add</button>
        </div>   
    </div>
  );
}

// Export the ShoppingList page
export default ShoppingListPage;


