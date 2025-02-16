import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Redirect to search results page
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="p-2 border rounded-lg w-64"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white px-4 rounded-lg">
        Search
      </button>
    </form>
  );
};

export default AppSearchBar;
