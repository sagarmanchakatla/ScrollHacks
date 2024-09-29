import React, { useState } from "react";
import InsuranceList from "./InsuranceList";

const InsuranceButton = ({ type, currentType, onClick, children }) => (
  <button
    onClick={() => onClick(type)}
    className={`
      py-3 px-6 text-lg font-semibold transition-all duration-300
      ${currentType === type
        ? "bg-blue-600 text-white shadow-lg transform -translate-y-1"
        : "bg-white text-blue-600 hover:bg-blue-50"
      }
      ${type === "car" && "rounded-l-lg"}
      ${type === "life" && "rounded-r-lg"}
      border-r border-blue-200 last:border-r-0
    `}
  >
    {children}
  </button>
);

const Insurance = () => {
  const [insuranceType, setInsuranceType] = useState("car");

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">
        Insurance Explorer
      </h1>
      
      {/* Navigation Bar */}
      <nav className="flex justify-center mb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <InsuranceButton
            type="car"
            currentType={insuranceType}
            onClick={setInsuranceType}
          >
            Car Insurance
          </InsuranceButton>
          <InsuranceButton
            type="health"
            currentType={insuranceType}
            onClick={setInsuranceType}
          >
            Health Insurance
          </InsuranceButton>
          <InsuranceButton
            type="life"
            currentType={insuranceType}
            onClick={setInsuranceType}
          >
            Life Insurance
          </InsuranceButton>
        </div>
      </nav>

      {/* Insurance List */}
      <InsuranceList type={insuranceType} />
    </div>
  );
};

export default Insurance;