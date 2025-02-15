// ALL INFORMATION IN THIS PAGE SHOULD BE LINKED TO THE DATABASE LATER ON
import React from "react";

const Profile = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <div className="flex items-center space-x-6">

        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src="https://via.placeholder.com/150" // Replace with actual image URL
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
        </div>

        {/* Profile Information */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-gray-600">Software Engineer</p>

          <div className="mt-4 space-y-2">
            <div>
              <label className="block text-gray-700 font-semibold">Full Name</label>
              <p className="text-gray-900">John Doe</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <p className="text-gray-900">johndoe@example.com</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Phone Number</label>
              <p className="text-gray-900">+1 (123) 456-7890</p>
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
