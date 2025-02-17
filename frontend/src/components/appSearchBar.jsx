import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const AppSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const response = await fetch(`/api/listings/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      // Handle the search results (e.g., update state to display results)
      console.log(data.listings);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <Input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="w-80 p-3 border rounded-full"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full">
        Search
      </button>
    </form>
  );
};

export default AppSearchBar;
