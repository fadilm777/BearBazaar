import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import bearBazaar from "./assets/bearbazaar.svg";

// Import components
import AppSearchBar from "./components/appSearchBar";
import AppMenuBar from "./components/appMenuBar";

// Import pages
import DMs from "./pages/DMs";
import Sell from "./pages/Sell";
import MyListings from "./pages/MyListings";
import Profile from "./pages/Profile";
import { ChatProvider } from "./contexts/ChatContext";

function App() {
  return (
    <ChatProvider>
      {/* Navigation Bar */}
      <div className="flex items-center p-4 bg-gray-100 shadow-md">
        {/* Home Button (Logo/Image) Now Redirects to /dashboard */}
        <Link to="/dashboard">
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
    </ChatProvider>
  );
}

export default App;
