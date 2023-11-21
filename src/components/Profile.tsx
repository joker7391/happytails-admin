import React, { useEffect, useState } from "react";
import icon from "../assets/15.png";
import { supabase } from "../utils/SupabaseClient";

interface User {
  email?: string;
}

const Profile: React.FC = () => {
  const [isUser, setIsUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data) {
        setIsUser(data.user);
      }
    };
    fetchUser();
  }, []);

  if (!isUser) {
    return <div>Loading...</div>; // Handle the loading or null state
  }

  return (
    <div className="p-1 flex items-center">
      <img src={icon} alt="icon" className="w-[57px]" />
      <div>
        <p className="text-[13px] font-bold">{isUser.email ?? "No Email"}</p>
        <p className="text-[10px] font-semibold">Admin</p>
      </div>
    </div>
  );
};

export default Profile;
