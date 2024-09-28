import { useState } from "react";
import InsuranceList from "./InsuranceList";

const Insurance = () => {
  const [insuranceType, setInsuranceType] = useState("car");

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Navigation Bar */}
      <nav className="flex justify-center mb-8">
        <button
          onClick={() => setInsuranceType("car")}
          className={`py-2 px-6 rounded-l-lg text-lg font-semibold border border-gray-300 transition-colors ${
            insuranceType === "car"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
        >
          Car Insurance
        </button>
        <button
          onClick={() => setInsuranceType("health")}
          className={`py-2 px-6 text-lg font-semibold border border-gray-300 transition-colors ${
            insuranceType === "health"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
        >
          Health Insurance
        </button>
        <button
          onClick={() => setInsuranceType("life")}
          className={`py-2 px-6 rounded-r-lg text-lg font-semibold border border-gray-300 transition-colors ${
            insuranceType === "life"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
        >
          Life Insurance
        </button>
      </nav>

      {/* Insurance List */}
      <InsuranceList type={insuranceType} />
    </div>
  );
};

export default Insurance;
