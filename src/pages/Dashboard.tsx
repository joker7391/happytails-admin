import React from "react";
import DoctorCards from "../components/cards/DoctorCards";
import BranchesCards from "../components/cards/BranchesCards";
import ReportCards from "../components/cards/ReportCards";

const Dashboard = () => {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex gap-3 ">
        <h1>Menu</h1> | <h1 className="text-blue-500">Users</h1>
      </div>

      <div className="flex gap-5">
        <DoctorCards />
        <BranchesCards />
        <ReportCards />
      </div>
    </div>
  );
};

export default Dashboard;
