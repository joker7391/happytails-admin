import React from "react";

const Users = () => {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex gap-3 ">
        <h1>Menu</h1> | <h1>Users</h1>
      </div>
      <div className="bg-gray-300 w-[60em] px-2 flex gap-3">
        <h1 className="text-blue-400">Add New Branch</h1>
        <h1 className="text-blue-400">Bulk Upload Branch</h1>
      </div>
      <div></div>
    </div>
  );
};

export default Users;
