import "./App.css";
import { Routes, Route, Link, useLocation, Outlet } from "react-router-dom";
import bearBazaar from "./assets/bearbazaar.svg";

// Import components
import AppSearchBar from "./components/appSearchBar";
import AppMenuBar from "./components/appMenuBar";
import AppPagination from "./components/appPagination";

// Import pages
import Sell from "./pages/Sell";
import MyListings from "./pages/MyListings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function PageLayout() {
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

      <Outlet />
    </>
  );
}

function App() {
  const location = useLocation(); // Get the current URL path

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>


      {/* Page Routes */}
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<h1 className="p-6 text-2xl font-bold">Welcome to Bear Bazaar</h1>} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

      {/* Pagination: Show only on Home ("/") and My Listings ("/my-listings") */}
      {(location.pathname === "/" || location.pathname === "/my-listings") && <AppPagination />}
    </>
  );
}

export default App;
