import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import bearBazaar from "./assets/bearbazaar.svg";

// Import pages
import Sell from "./pages/Sell";
import MyListings from "./pages/MyListings";
import Profile from "./pages/Profile";

export function SearchBar() {
  return <Input type="search" placeholder="Search" className="w-64 p-2 border rounded-md" />;
}

function App() {
  return (
    <>
      {/* Navigation Bar */}
      <div className="flex items-center p-4 bg-gray-100 shadow-md">
        <Link to="/">
          <img src={bearBazaar} alt="Bear Bazaar" className="h-12 w-auto" />
        </Link>

        <SearchBar className="ml-4" />

        {/* Navigation Menu */}
        <Menubar className="ml-auto flex gap-x-4">
          <MenubarMenu>
            <MenubarTrigger>
              <Link to="/">Home</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Link to="/sell">Sell</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Link to="/my-listings">My Listings</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Link to="/profile">Profile</Link>
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<h1 className="p-6 text-2xl font-bold">Welcome to Bear Bazaar</h1>} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
