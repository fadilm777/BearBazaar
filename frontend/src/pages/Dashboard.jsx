import AppPagination from "@/components/appPagination";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Find items on BearBazaar!</p>
      </div>

      <AppPagination />
    </>
  );
};

export default Dashboard;
