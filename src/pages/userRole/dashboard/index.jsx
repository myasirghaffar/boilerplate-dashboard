import React from "react";

const UserDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-poppins font-bold text-gray-800 mb-6">
        User Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-poppins font-semibold text-gray-700 mb-2">
            Profile
          </h3>
          <p className="text-gray-600 font-poppins">Manage your profile</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-poppins font-semibold text-gray-700 mb-2">
            Schedule
          </h3>
          <p className="text-gray-600 font-poppins">View your schedule</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-poppins font-semibold text-gray-700 mb-2">
            Messages
          </h3>
          <p className="text-gray-600 font-poppins">Check your messages</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
