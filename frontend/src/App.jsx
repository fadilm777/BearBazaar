<<<<<<< HEAD
=======
<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
=======
import { useState } from "react";
>>>>>>> cd826875355688bb38d75d521fc824e0ab6b0498
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import bearBazaar from "./assets/bearbazaar.svg";

// Import components
import AppSearchBar from "./components/appSearchBar";
import AppMenuBar from "./components/appMenuBar";
import AppPagination from "./components/appPagination";

// Import pages
import Sell from "./pages/Sell";
import MyListings from "./pages/MyListings";
import Profile from "./pages/Profile";

<<<<<<< HEAD
=======
export function SearchBar() {
  return <Input type="search" placeholder="Search" className="w-64 p-2 border rounded-md" />;
}
>>>>>>> main

>>>>>>> cd826875355688bb38d75d521fc824e0ab6b0498
function App() {
  const location = useLocation(); // Get the current URL path

  return (
    <>
      {/* Navigation Bar */}
      <div className="flex items-center p-4 bg-gray-100 shadow-md">
        <Link to="/">
          <img src={bearBazaar} alt="Bear Bazaar" className="h-12 w-auto" />
        </Link>

        <AppSearchBar className="ml-4" />

        {/* Navigation Menu */}
        <AppMenuBar />
      </div>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<h1 className="p-6 text-2xl font-bold">Welcome to Bear Bazaar</h1>} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* Pagination: Show only on Home ("/") and My Listings ("/my-listings") */}
      {(location.pathname === "/" || location.pathname === "/my-listings") && <AppPagination />}
    </>
  );
}

export default App;

