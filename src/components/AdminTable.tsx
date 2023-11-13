import React, { useState, useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";

interface Admin {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

const AdminTable = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("admin").select("*");

        if (error) {
          throw error;
        }

        if (data) {
          setAdmins(data);
        }
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  //   if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
            {admins.map((admin, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{admin.id}</td>
                <td className="px-6 py-4">{admin.email}</td>
                {/* <td className="px-6 py-4">{admin.status}</td>
                <td className="px-6 py-4">{admin.last_login}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
