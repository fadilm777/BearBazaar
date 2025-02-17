import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Get search query from URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        try {
          const response = await fetch(`/api/listings/search?query=${encodeURIComponent(query)}`);
          if (!response.ok) {
            throw new Error("Failed to fetch results");
          }
          const data = await response.json();
          setResults(data.listings); // Assuming the API returns an object with a 'listings' array
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Search Results for "{query}"</h2>
      <ul>
        {results.length > 0 ? (
          results.map((item) => (
            <li key={item.id} className="p-2 border-b">
              {item.title} - ${item.price}
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
