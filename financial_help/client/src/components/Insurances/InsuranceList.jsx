import React, { useState, useEffect } from "react";
import axios from "axios";

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
          "http://localhost:8000/api/get-insurance-details",
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{`${
        type.charAt(0).toUpperCase() + type.slice(1)
      } Insurance Plans`}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {insuranceData.length > 0 ? (
          insuranceData.map((insurance, index) => (
            <div
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
              key={index}
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {insurance.name}
                </h3>
                <div className="text-gray-600">
                  <p className="mb-2">
                    <strong>Premium:</strong> {insurance.premium}
                  </p>
                  <p className="mb-4">
                    <strong>Coverage:</strong> {insurance.coverage}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <a
                  href={insurance.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Know More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No insurance plans available.</p>
        )}
      </div>
    </div>
  );
};

export default InsuranceList;
