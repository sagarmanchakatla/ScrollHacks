import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

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
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Modules</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {financeTopics.map((topic, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">
              {index + 1}. {topic}
            </h2>
            <p className="text-gray-600 mb-4">
              Learn about {topic} and how it can help you manage your finances
              effectively. This module will provide an overview and important
              details.
            </p>
            <div className="flex justify-between items-center">
              {/* Replace anchor with Link for navigation */}
              <Link
                to={`/learnfinance/${index}`} // Dynamic navigation based on topic index
                className="text-blue-500 hover:text-blue-700"
              >
                View module
              </Link>
              <button className="text-blue-500 hover:text-blue-700">
                Watch videos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnFinance;
