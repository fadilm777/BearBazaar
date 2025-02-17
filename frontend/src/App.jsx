import { ChatProvider } from "./contexts/ChatContext";
import { AuthProvider } from "./contexts/AuthContext";

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
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import ListingDetails from "./pages/Listing";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ResetPassword } from "./pages/Reset";

function PageLayout() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div className="flex items-center p-4 bg-gray-100 shadow-md rounded-full">
          <Link to="/dashboard">
            <img src={bearBazaar} alt="Bear Bazaar" className="h-12 w-auto rounded-full" />
          </Link>
          <div className="ml-10">
            <AppSearchBar className="search-bar" />
          </div>
          <AppMenuBar />
        </div>

        <Outlet />
      </ChatProvider>
    </AuthProvider>
  );
}

function AuthLayout() {
  if (window.localStorage.getItem('token')) {
    return <Navigate to="/dashboard" />
  }

  return <Outlet />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Default route is Login */}

        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PageLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dms" element={<DMs />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchResults />} /> {/* Search Route with Query Param */}
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
