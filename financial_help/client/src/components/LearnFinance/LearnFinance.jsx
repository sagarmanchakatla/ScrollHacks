import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Book, Video, Search, ChevronRight } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredTopic, setHoveredTopic] = useState(null);

  const filteredTopics = financeTopics.filter((topic) =>
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-blue-900">
          Finance Learning Hub
        </h1>
        <p className="text-xl text-center mb-12 text-blue-700">
          Dive into our comprehensive modules to enhance your financial expertise
        </p>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for a topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 px-4 pl-12 rounded-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none text-lg bg-white bg-opacity-80"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-80 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200 relative overflow-hidden"
              onMouseEnter={() => setHoveredTopic(index)}
              onMouseLeave={() => setHoveredTopic(null)}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">
                {topic}
              </h2>
              <p className="text-blue-600 mb-6">
                Master the essentials of {topic.toLowerCase()} and boost your financial acumen.
              </p>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/learnfinance/${index}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
                >
                  <Book size={18} className="mr-2" />
                  <span>Start Learning</span>
                  <ChevronRight size={18} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <button className="flex items-center text-blue-500 hover:text-blue-700 transition-colors">
                  <Video size={18} className="mr-2" />
                  <span>Watch Video</span>
                </button>
              </div>
              {hoveredTopic === index && (
                <div className="absolute inset-0 bg-blue-600 bg-opacity-90 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to={`/learnfinance/${index}`}
                    className="text-white text-xl font-semibold hover:underline"
                  >
                    Explore {topic} Now
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnFinance;