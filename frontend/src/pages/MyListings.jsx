import AppPagination from "@/components/appPagination";
import React from "react";

const MyListings = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <p>View and manage your listed items.</p>
      </div>

      <AppPagination />
    </>
  );
};

export default MyListings;
