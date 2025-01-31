// Import modules
import React from 'react';  // Import React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import './App.css' // Import app css file for styling
import Nav from './components/nav/Nav';  // Import Nav component
import Home from './pages/home/Home';  // Import Home page
import Recipes from './pages/recipes/Recipes';  // Import Recipes page
import Favorites from './pages/favorites/Favorites';  // Import Favorites page

// App.jsx function 
function App() {
  return (
    <>
      {/* Nav component will remain global component */}
      <Nav/>
      <Routes>
        {/* Add Home page route */}
        <Route path='/' element={<Home/>}/> 
        {/* Add Recipes page route */}
        <Route path='/recipes' element={<Recipes/>}/>
        {/* Add Favorites page route */}
        <Route path='/favorites' element={<Favorites/>}/>
      </Routes>
    </>
  );
};

// Export App function
export default App;
