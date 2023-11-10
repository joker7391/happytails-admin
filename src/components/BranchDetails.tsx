import React, { useState } from "react";
import { supabase } from "../utils/SupabaseClient"; // Make sure this path is correct

const BranchDetails = () => {
  const [branchName, setBranchName] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [street, setStreet] = useState("");
  const [block, setBlock] = useState("");
  const [building, setBuilding] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [activeManager, setActiveManager] = useState("");
  const [telephone1, setTelephone1] = useState("");
  const [telephone2, setTelephone2] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("branches").insert([
        {
          branch_id: 3,
          branch_name: branchName,
          street_no: streetNo,
          street: street,
          block_no: block,
          building_floor_room: building,
          city: city,
          zip_code: zipCode,
          country: country,
          active_manager: activeManager,
          telephone_no: telephone1,
          // telephone_no: telephone2,
          email: email,
        },
      ]);

      if (error) {
        throw error;
      }

      // Optionally, clear form here if needed

      alert("Branch added successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred.");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  // Function to clear the form
  const clearForm = () => {
    setBranchName("");
    setStreetNo("");
    setStreet("");
    setBlock("");
    setBuilding("");
    setCity("");
    setZipCode("");
    setCountry("");
    setActiveManager("");
    setTelephone1("");
    setTelephone2("");
    setEmail("");
  };

  return (
    <div className="px-2 flex gap-5 relative">
      <form className="flex flex-col gap-4 h-full w-[25em] py-3 ">
        <div className="flex justify-between">
          <label className="text-blue-400">Branch Name</label>
          <input
            onChange={(e) => setBranchName(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Street No.</label>
          <input
            onChange={(e) => setStreetNo(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Street</label>
          <input
            onChange={(e) => setStreet(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Block</label>
          <input
            onChange={(e) => setBlock(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Building/Floor/Room</label>
          <input
            onChange={(e) => setBuilding(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">City</label>
          <input
            onChange={(e) => setCity(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Zip Code</label>
          <input
            onChange={(e) => setZipCode(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Country</label>
          <input
            onChange={(e) => setCountry(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Active Manager</label>
          <input
            onChange={(e) => setActiveManager(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
      </form>
      <form className="flex flex-col gap-4 h-full w-[20em] py-3 ">
        <div className="flex justify-between">
          <label className="text-blue-400">Telephone 1</label>
          <input
            onChange={(e) => setTelephone1(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Telephone 2</label>
          <input
            onChange={(e) => setTelephone2(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-blue-400">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border-black border-[1px] px-1"
          />
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        onClick={handleSubmit}
        className="py-1 bg-blue-400 text-white w-[5em] absolute -bottom-10 right-24"
        disabled={loading}
      >
        {loading ? "Loading..." : "Add"}
      </button>
      <button
        type="button"
        onClick={clearForm}
        className="py-1 bg-blue-400 text-white w-[5em] absolute -bottom-10 right-0"
        disabled={loading}
      >
        Clear
      </button>
    </div>
  );
};

export default BranchDetails;
