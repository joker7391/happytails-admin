import React from "react";
import icon from "../assets/15.png";
import { AuthContextProps, useAuth } from "../provider/AuthProvider";

const Profile: React.FC<AuthContextProps> = () => {
  const user = useAuth();
  console.log("User", user);
  return (
    <div className="p-1 flex items-center">
      <img src={icon} alt="icon" className="w-[57px] " />
      <div>
        <p className="text-[13px] font-bold">{(user as any)?.email}</p>

        <p className="text-[10px] font-semibold">Admin</p>
      </div>
    </div>
  );
};

export default Profile;
