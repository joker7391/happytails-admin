import React, { useState, useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";

interface Users {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  last_login: string | null;
  user_type: string;
  status: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const { count } = await supabase
        .from("users")
        .select("id", { count: "exact" });
      if (count) {
        setTotalUsers(count);
      }
    };
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const startIndex = (currentPage - 1) * usersPerPage; // Calculate the start index
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .range(startIndex, startIndex + usersPerPage - 1); // Fetch 10 users based on the current page

        if (error) {
          throw error;
        }

        if (data) {
          setUsers(data);
        }
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
    fetchUsers();
  }, [currentPage, usersPerPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";

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

      setUsers(
        users.map((user) =>
          user.id === doctorId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error: any) {
      setError(error.message || "An error occurred while updating status");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

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
                User Type
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
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  {user.first_name} {user.last_name}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.user_type}</td>
                <td className="px-6 py-4">
                  <select
                    value={user.status}
                    onChange={(e) =>
                      updateDoctorStatus(user.id, e.target.value)
                    }
                    className="border-2 border-gray-300 rounded-md p-1"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td className="px-6 py-4">{formatDate(user.last_login)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-5 py-5">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-400 text-white px-2 py-1 w-[5em]"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalUsers === 0}
          className="bg-blue-400 text-white px-2 py-1 w-[5em]"
        >
          Next
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default UserTable;
