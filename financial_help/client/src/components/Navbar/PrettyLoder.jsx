import React from "react";
import { Loader } from "lucide-react";

const PrettyLoader = ({ type }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        <Loader className="text-blue-500 animate-pulse mt-4" size={48} />
        <h2 className="text-2xl font-bold text-blue-800 mt-4">Please Wait</h2>
        <p className="text-blue-600 mt-2">
          {type === "quiz"
            ? "We are generating your quiz..."
            : "We are generating your module..."}
        </p>
      </div>
    </div>
  );
};

export default PrettyLoader;
