import { getListingsFeed } from "@/backend/listings";
import ListingCard from "@/components/ListingCard";
import AppPagination from "@/components/appPagination";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const listings = await getListingsFeed();
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
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Find items on BearBazaar!</p>
      </div>


      {/* TODO: use real UI here */}
      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error: ${error}</p> : null}
      {!loading && listings.length === 0 && !error ? <p>We don't have any remaining listings. Invite your friends!</p> : null}

      {listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}

      <AppPagination />
    </>
  );
};

export default Dashboard;
