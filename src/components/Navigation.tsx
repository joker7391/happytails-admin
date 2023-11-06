import React from "react";
import Profile from "./Profile";
import Menu from "./Menu";

const Navigation: React.FC = () => {
  return (
    <div className="w-[250px] h-screen bg-slate-200 pr-3">
      <Profile user={{}} isAuthenticated={true} />
      <Menu />
    </div>
  );
};

export default Navigation;
