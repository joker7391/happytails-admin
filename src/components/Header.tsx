import React from "react";
import logo from "../assets/Admin.png";
// import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  return (
    <div className="lg:p-3 p-1 bg-[#fff] flex justify-between items-center w-full ">
      {/*  */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="w-[25px] h-[18px] lg:w-[30px] lg:h-[30px] "
        />
        <h1 className="uppercase cursor-pointer text-[#2997d8] font-bold text-[15px] lg:text-[20px] ">
          Happy Tails
        </h1>
      </div>
      {/* <div className="relative">
        <input
          type="search"
          className="border-[1.5px] border-black px-1 py-1 placeholder:text-right "
        />
        <AiOutlineSearch className="absolute top-2 right-3 text-[16px] " />
      </div> */}
    </div>
  );
};

export default Header;
