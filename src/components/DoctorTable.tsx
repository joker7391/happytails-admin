import React, { useState, useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";

interface Doctor {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  last_login: string | null;
}

const DoctorTable = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("admin").select("*");

        if (error) {
          throw error;
        }

        if (data) {
          setDoctors(data);
        }
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Function to format the date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"; // Return "N/A" or similar if the date string is null or invalid

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Last Log-in
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  {doctor.first_name} {doctor.last_name}
                </td>
                <td className="px-6 py-4">{doctor.email}</td>
                <td className="px-6 py-4">{formatDate(doctor.last_login)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorTable;
