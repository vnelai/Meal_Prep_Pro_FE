//Import Modules
import React, {useState, useEffect } from 'react'; // Import React, useState, useEffect
import './ShoppingList.css'  // Import stylesheet


// ShoppingList component function
function ShoppingList({groceryItem, updateGroceryItem, deleteGroceryItem}) {
    //State to track grocery items
    const [item, setItem] = useState(groceryItem); 

    useEffect(() => {
        setItem(groceryItem); // Update internal state when prop changes
      }, [groceryItem]); // Add dependency array to useEffect
    // Track and set if the item is being edited, by toggling between editing and view mode

    const [isEditingMode, setIsEditingMode] = useState(false);
    // Track and set the edited item
    const [editedShoppingItem, setEditedShoppingItem] = useState({
        itemName: groceryItem.itemName,
    });

    // Function to handle the updating and saving the shopping item
    const handleSaving= () => {
        updateGroceryItem(groceryItem._id, editedShoppingItem.itemName, editedShoppingItem.quantity);  //Update shopping Item passed from parent component
        setIsEditingMode(false); // Reset editing mode to off
    };

    // Function to handle switching from view mode to edit mode
    const handleEditing= () => {
        setIsEditingMode(true);
    };

    // Function to handle deleting an item from shopping list
    const handleDeleting= () => {
        deleteGroceryItem(groceryItem._id);  // Delete function passed from parent 
    };

  // Staging elements  
  return (
    <div className='shopping-list-div'>
        {/* If editing mode is on we will show an input field and a save button */}
        {isEditingMode ? (
            <div>
                <input 
                    type="text" 
                    value={editedShoppingItem.itemName} 
                    onChange={(event) => setEditedShoppingItem({ ...editedShoppingItem, itemName: event.target.value })}
                />
                <button onClick={handleSaving}>Save</button>
            </div>    
        ) : (
            <div>
                <span className='item-name'>{groceryItem.itemName}</span> 
                <div className='Shopping-list-btns-view-mode'>
                    <button onClick={handleEditing}>Edit</button>
                    <button onClick={handleDeleting}>Delete</button>
                </div>
            </div>
        )}   
    </div>
  );
};

// Exporting ShoppingList component
export default ShoppingList;