import React from "react";
import BranchDetails from "../components/BranchDetails";

const Branch = () => {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex gap-3 ">
        <h1>Menu</h1> | <h1>Branch</h1>
      </div>
      <div className="bg-gray-300 w-[60em] px-2 flex gap-3">
        <h1 className="text-blue-400">Add New Branch</h1>
        <h1 className="text-blue-400">Bulk Upload Branch</h1>
      </div>
      <div>
        <h1 className="px-2 py-2 font-semibold text-lg">Branch Details</h1>
        <BranchDetails />
      </div>
    </div>
  );
};

export default Branch;
