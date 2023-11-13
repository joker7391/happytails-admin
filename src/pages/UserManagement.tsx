import React, { useState } from "react";
import UserDetails from "../components/UserDetails";

import UserTable from "../components/UserTable";
import DoctorTable from "../components/DoctorTable";

const UserManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Users");
  const [showUserDetails, setShowUserDetails] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowUserDetails(false);
  };

  const handleAddUserClick = () => {
    setShowUserDetails(true);
  };

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex gap-3">
        <div className="flex gap-3 pr-20">
          <h1>Menu</h1> | <h1 className="text-blue-400">Users</h1>
        </div>

        <div className="flex gap-5 pl-32">
          <button
            className={`text-center py-1 px-2 rounded-[9px] ${
              selectedCategory === "Users"
                ? "bg-blue-400 text-white"
                : "bg-gray-400"
            }`}
            onClick={() => handleCategoryChange("Users")}
          >
            Users
          </button>
          <button
            className={`text-center py-1 px-2 rounded-[9px] ${
              selectedCategory === "Doctors"
                ? "bg-blue-400 text-white"
                : "bg-gray-400"
            }`}
            onClick={() => handleCategoryChange("Doctors")}
          >
            Doctors
          </button>
          {/* <button
            className={`text-center py-1 px-2 rounded-[9px] ${
              selectedCategory === "Admin"
                ? "bg-blue-400 text-white"
                : "bg-gray-400"
            }`}
            onClick={() => handleCategoryChange("Admin")}
          >
            Admin
          </button> */}
        </div>
      </div>
      <div className="bg-gray-300 w-[60em] px-2 flex gap-3">
        <button className="text-blue-400" onClick={handleAddUserClick}>
          Add New User
        </button>
      </div>
      <div>
        <h1 className="px-2 py-2 font-semibold text-lg">User Details</h1>
        {showUserDetails && <UserDetails />}
        {!showUserDetails && (
          <div>
            {selectedCategory === "Users" && <UserTable />}
            {selectedCategory === "Doctors" && <DoctorTable />}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
