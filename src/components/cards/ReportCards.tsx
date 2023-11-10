import React from "react";
import doctor from "../../assets/10.png";

const ReportCards = () => {
  return (
    <div className="bg-[#2997D8] w-[147px] h-[87px] flex justify-between p-3">
      <div className="flex flex-col justify-between">
        <img src={doctor} alt="scope" className="w-[35px]" />
        <h4 className="text-white font-bold text-[15px]">Report</h4>
      </div>
      {/* Dynamically display the count */}
      <h1 className="font-bold text-[20px] text-white">1</h1>
    </div>
  );
};

export default ReportCards;
