import React, { useState } from "react";
import { supabase } from "../utils/SupabaseClient";
import { useNavigate } from "react-router-dom";

const UserDetails: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [position, setPosition] = useState("doctor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Email", email);

  const navigate = useNavigate(); // Hook for navigating to different routes

  const validateForm = () => {
    if (!email || !password || !firstName || !lastName) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Sign up user with email and password.
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      // Check if the user was created.
      if (data && data.user) {
        // Step 2: Insert additional data into the `admin` table.
        const { error: insertError } = await supabase.from("admin").insert([
          {
            email: email,
            first_name: firstName,
            last_name: lastName,
            // Add other fields as needed
            account_type: position,
          },
        ]);

        if (insertError) {
          throw insertError;
        }

        // If everything is successful, navigate to the dashboard.
        navigate("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 flex gap-4 relative">
      <form className="flex flex-col gap-4 h-[15em] w-[20em] py-3">
        <div className="flex justify-between ">
          <label className="text-blue-400">First Name</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Middle Name</label>
          <input
            onChange={(e) => setMiddleName(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Last Name</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Mobile Number</label>
          <input
            onChange={(e) => setMobileNumber(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
      </form>
      <form className="flex flex-col gap-4 h-[15em] w-[25em] py-3">
        <div className="flex justify-between">
          <label className="text-blue-400">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Confirm Password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between gap-20 ">
          <label className="text-blue-400">Position</label>
          <select
            onChange={(e) => setPosition(e.target.value)}
            className="border-black border-[1px] w-[190px] px-[1.9px] py-[1px]"
          >
            <option value="doctor">Doctor</option>
            <option value="front desk">Front Desk</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSubmit}
        className="py-1 bg-blue-400 text-white w-[5em] absolute bottom-0"
      >
        {loading ? "Loading..." : "Save"}
      </button>
    </div>
  );
};

export default UserDetails;
