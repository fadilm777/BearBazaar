import { ChatProvider } from "./contexts/ChatContext";

import "./App.css";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import bearBazaar from "./assets/bearbazaar.svg";

// Import components
import AppSearchBar from "./components/appSearchBar";
import AppMenuBar from "./components/appMenuBar";

// Import pages
import DMs from "./pages/DMs";
import Sell from "./pages/Sell";
import MyListings from "./pages/MyListings";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ResetPassword } from "./pages/Reset";

function PageLayout() {
  return (
    <>
      <div className="flex items-center p-4 bg-gray-100 shadow-md rounded-full"> 
        <Link to="/dashboard">
          <img src={bearBazaar} alt="Bear Bazaar" className="h-12 w-auto rounded-full" />
        </Link>
        <AppSearchBar className="ml-4 search-bar" />
        <AppMenuBar />
      </div>

      <Outlet />
    </>
  );
}

function App() {
  return (
    <ChatProvider>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<PageLayout />}>
          <Route path="/" element={<Navigate to="/login" />} /> {/* Default route is Login */}
          <Route path="/dms" element={<DMs />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchResults />} /> {/* Search Route with Query Param */}
        </Route>
      </Routes>
    </ChatProvider>
  );
}

export default App;
