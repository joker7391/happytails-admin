import React, { useState, useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";

interface Doctor {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  last_login: string | null;
  status: string;
}

const DoctorTable = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_type", "doctor"); // Filter to only select doctors

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

  const updateDoctorStatus = async (doctorId: string, newStatus: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("users")
        .update({ status: newStatus })
        .eq("id", doctorId);

      if (error) {
        throw error;
      }

      setDoctors(
        doctors.map((doctor) => {
          if (doctor.id === doctorId) {
            return { ...doctor, status: newStatus };
          }
          return doctor;
        })
      );
    } catch (error: any) {
      setError(error.message || "An error occurred while updating status");
    } finally {
      setLoading(false);
    }
  };

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
                Name
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
                <td className="px-6 py-4">
                  <select
                    value={doctor.status}
                    onChange={(e) =>
                      updateDoctorStatus(doctor.id, e.target.value)
                    }
                    className="border-2 border-gray-300 rounded-md p-1"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    {/* Add more options as needed */}
                  </select>
                </td>
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
