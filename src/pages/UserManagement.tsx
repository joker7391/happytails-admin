import React from "react";
import UserDetails from "../components/UserDetails";

const UserManagement: React.FC = () => {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex gap-3">
        <h1>Menu</h1> | <h1>Users</h1>
      </div>
      <div className="bg-gray-300 w-[60em] px-2 flex gap-3">
        <h1 className="text-blue-400">Add New User</h1>
        <h1 className="text-blue-400">Bulk Upload User</h1>
      </div>
      <div>
        <h1 className="px-2 py-2 font-semibold text-lg">User Details</h1>
        <UserDetails />
      </div>
    </div>
  );
};

export default UserManagement;
