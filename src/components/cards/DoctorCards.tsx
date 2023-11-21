import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/SupabaseClient";
import doctor from "../../assets/10.png";

const DoctorCards: React.FC = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorsCount = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_type", "doctor");

        if (error) {
          throw error;
        }

        if (data) {
          setDoctorCount(data.length);
        }
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorsCount();
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
