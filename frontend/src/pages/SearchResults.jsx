import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Get search query from URL
  const [results, setResults] = useState([]);

  // Dummy search data (Replace with API)
  useEffect(() => {
    if (query) {
      setResults([
        { id: 1, name: `Seller A - ${query}` },
        { id: 2, name: `Seller B - ${query}` },
        { id: 3, name: `John Doe - ${query}` },
      ]);
    }
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Search Results for "{query}"</h2>
      <ul>
        {results.length > 0 ? (
          results.map((item) => (
            <li key={item.id} className="p-2 border-b">
              {item.name}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
