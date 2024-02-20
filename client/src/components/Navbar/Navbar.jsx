import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
 
const toggleDarkMode = () => {
  
}


  return (
    <nav className="">
        <Link to="Home" className="">
          Home
        </Link>
        <Link to="/login" className="">
          Login
        </Link>
        <button className="" onClick={toggleDarkMode}>
          Dark Mode
        </button>
      
    </nav>
  );
};