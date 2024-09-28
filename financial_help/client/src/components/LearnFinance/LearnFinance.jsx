import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Book, Video } from "lucide-react";

const financeTopics = [
  "Personal Finance Basics",
  "Budgeting",
  "Savings",
  "Debt Management",
  "Banking Fundamentals",
  "Bank Accounts",
  "Interest Rates",
  "Credit Scores",
  "Investing Basics",
  "Stocks",
  "Bonds",
  "Mutual Funds and ETFs",
  "Risk and Return",
  "Trading",
  "Stock Trading",
  "Technical and Fundamental Analysis",
  "Forex Trading",
  "Cryptocurrency Trading",
  "Taxes",
  "Income Tax Basics",
  "Tax Planning",
  "Insurance",
  "Health Insurance",
  "Life Insurance",
  "Auto and Home Insurance",
  "Retirement Planning",
  "Pensions and 401(k)",
  "Individual Retirement Accounts (IRAs)",
  "Real Estate Basics",
  "Home Buying",
  "Renting vs. Buying",
  "Financial Planning",
  "Goal Setting",
  "Net Worth Calculation",
  "Estate Planning",
  "Financial Tools",
  "Budgeting Apps",
  "Investment Platforms",
];

const LearnFinance = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Finance Learning Modules
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {financeTopics.map((topic, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-3 text-indigo-700">
              {index + 1}. {topic}
            </h2>
            <p className="text-gray-600 mb-4 h-20 overflow-hidden">
              Explore {topic} and its impact on your financial well-being. This
              module offers comprehensive insights and practical knowledge.
            </p>
            <div className="flex justify-between items-center mt-4">
              <Link
                to={`/learnfinance/${index}`}
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Book size={18} className="mr-1" />
                <span>View module</span>
              </Link>
              <button className="flex items-center text-green-600 hover:text-green-800 transition-colors">
                <Video size={18} className="mr-1" />
                <span>Watch videos</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnFinance;
