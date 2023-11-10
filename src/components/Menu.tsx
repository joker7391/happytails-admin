import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../utils/SupabaseClient";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item: any, e: any) => {
    setSelectedItem(item);
  };

  const listItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "User Management", path: "/usermanagement" },
    { name: "Branch", path: "/branch" },
    { name: "Users", path: "/users" },
  ];

  //function for logging out
  const handleLogout = () => {
    supabase.auth
      .signOut()
      .then(() => {
        toast.success("You've been logged out", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error logging out", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  };

  return (
    <ul className="">
      {listItems.map((item, index) => (
        <Link to={item.path as any} key={index}>
          <motion.li
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleClick(item.name, e)}
            className={`px-3 py-2 my-1 font-semibold cursor-pointer ${
              selectedItem === item.name
                ? "bg-blue-400 text-white"
                : "bg-white  text-[#2997D8]"
            }`}
          >
            {item.name}
          </motion.li>
        </Link>
      ))}
      <motion.li
        whileTap={{ scale: 0.9 }}
        onClick={handleLogout}
        className="bg-white px-3 py-2 my-1 text-[#2997D8] font-semibold cursor-pointer"
      >
        Logout
      </motion.li>
    </ul>
  );
};

export default Menu;
