import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import bearBazaar from "./assets/bearbazaar.svg";

// Import components
import AppSearchBar from "./components/appSearchBar";
import AppMenuBar from "./components/appMenuBar";
import AppPagination from "./components/appPagination";

// Import pages
import DMs from "./pages/DMs";
import Sell from "./pages/Sell";
import MyListings from "./pages/MyListings";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();

  return (
    <>
      {/* Navigation Bar */}
      <div className="flex items-center p-4 bg-gray-100 shadow-md">
        {/* 🏠 Home Button (Logo) Now Redirects to /login */}
        <Link to="/login">
          <img src={bearBazaar} alt="Bear Bazaar" className="h-12 w-auto" />
        </Link>
        <AppSearchBar className="ml-4" />
        <AppMenuBar />
      </div>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Default route is Login */}
        <Route path="/dms" element={<DMs />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* Pagination: Show only on My Listings */}
      {location.pathname === "/my-listings" && <AppPagination />}
    </>
  );
}

export default App;
