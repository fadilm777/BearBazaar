import { getMyListings } from "@/backend/listings";
import ListingCard from "@/components/ListingCard";
import AppPagination from "@/components/appPagination";
import React, { useEffect, useState } from "react";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const listings = await getMyListings();
        setListings(listings);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="p-6 items-center">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <p>View and manage your listed items.</p>
      </div>

      {/* TODO: use real UI here */}
      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error: ${error}</p> : null}
      {!loading && listings.length === 0 && !error ? <p>You don&apos;t have any listings. Try creating some!</p> : null}
      <div className="h-8" />
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-y-16 gap-28">
          {listings.map((listing) => <ListingCard key={listing.id} listing={listing} location={"sell"} />)}
        </div>
      </div>
    </>
  );
};

export default MyListings;
