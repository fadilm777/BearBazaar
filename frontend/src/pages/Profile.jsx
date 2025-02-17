import React, { useEffect, useState } from "react";
import { getUserProfile } from "@/backend/profile"; // Correctly import the API function

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const profile = await getUserProfile();
        setUserData(profile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <div className="flex items-center space-x-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={userData.profilePic || "../../../uploads/default.png"}
            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
          />
        </div>

        {/* Profile Information */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <div className="mt-4 space-y-2">
            <div>
              <h1><label className="block text-gray-700 font-semibold">Name</label></h1>
              <p className="text-gray-900">{userData.name || "Not Provided"}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Username</label>
              <p className="text-gray-900">{userData.username || "Not Provided"}</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <p className="text-gray-900">{userData.email || "Not Provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="mt-6 text-center">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
