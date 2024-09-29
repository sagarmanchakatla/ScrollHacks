import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const InsuranceList = ({ type }) => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.post(
          "https://scrollhacks-fkqq.onrender.com/api/get-insurance-details",
          { type }
        );
        setInsuranceData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch insurance data.");
        setLoading(false);
      }
    };

    fetchInsurance();
  }, [type]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="w-full p-6 bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center">
        {`${type.charAt(0).toUpperCase() + type.slice(1)} Insurance Plans`}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {insuranceData.length > 0 ? (
          insuranceData.map((insurance, index) => (
            <div
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between transform transition duration-500 hover:scale-105"
              key={index}
            >
              <div>
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  {insurance.name}
                </h3>
                <div className="text-gray-600 space-y-2">
                  <p className="flex justify-between">
                    <span className="font-medium">Premium:</span>
                    <span className="text-blue-600">{insurance.premium}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Coverage:</span>
                    <span className="text-blue-600">{insurance.coverage}</span>
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={insurance.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No insurance plans available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default InsuranceList;
