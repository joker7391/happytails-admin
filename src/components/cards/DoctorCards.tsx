import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/SupabaseClient";
import doctor from "../../assets/10.png";

const DoctorCards: React.FC = () => {
  const [doctorCount, setDoctorCount] = useState(0);

  useEffect(() => {
    const fetchDoctorCount = async () => {
      try {
        const { data, error, count } = await supabase
          .from("doctors") // Make sure this is your correct table name
          .select("*", { count: "exact" });

        if (error) throw error;

        console.log("Doctors data:", data);
        // Set state with count or fallback to 0 if count is null
        setDoctorCount(count ?? 0);
      } catch (error) {
        console.error("Error fetching doctor count:", error);
      }
    };

    fetchDoctorCount();
  }, []);

  return (
    <div className="bg-[#2997D8] w-[147px] h-[87px] flex justify-between p-3">
      <div className="flex flex-col justify-between">
        <img src={doctor} alt="scope" className="w-[35px]" />
        <h4 className="text-white font-bold text-[15px]">Doctor</h4>
      </div>
      {/* Dynamically display the count */}
      <h1 className="font-bold text-[20px] text-white">{doctorCount}</h1>
    </div>
  );
};

export default DoctorCards;
