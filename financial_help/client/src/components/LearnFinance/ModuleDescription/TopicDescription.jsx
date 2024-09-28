import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ChevronDown, ChevronUp, Book, Link as LinkIcon } from "lucide-react";

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

const TopicDescription = () => {
  const { id } = useParams();
  const topic = financeTopics[id];
  const [description, setDescription] = useState({
    background: "",
    need: "",
    importance: "",
    detailed_description: "",
    key_takeaways: "",
    conclusion: "",
    links_for_further_study: [],
  });
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/generate-topic-description",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ topic }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();

        setDescription({
          background: result.financialAdvice.background || "",
          need: result.financialAdvice.need || "",
          importance: result.financialAdvice.importance || "",
          detailed_description:
            result.financialAdvice.detailed_description || "",
          key_takeaways: result.financialAdvice.key_takeaways || "",
          conclusion: result.financialAdvice.conclusion || "",
          links_for_further_study: Array.isArray(
            result.financialAdvice.links_for_further_study
          )
            ? result.financialAdvice.links_for_further_study
            : [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [topic]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderSection = (title, content, icon) => (
    <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => toggleSection(title)}
        className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2 font-semibold">{title}</span>
        </div>
        {expandedSections[title] ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}
      </button>
      {expandedSections[title] && (
        <div className="px-6 py-4 bg-gray-50">
          <ReactMarkdown className="prose max-w-none">{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
        {topic}
      </h1>

      {renderSection("Background", description.background, <Book size={20} />)}
      {renderSection("Need", description.need, <Book size={20} />)}
      {renderSection("Importance", description.importance, <Book size={20} />)}
      {renderSection(
        "Detailed Description",
        description.detailed_description,
        <Book size={20} />
      )}
      {renderSection(
        "Key Takeaways",
        description.key_takeaways,
        <Book size={20} />
      )}
      {renderSection("Conclusion", description.conclusion, <Book size={20} />)}

      {description.links_for_further_study.length > 0 && (
        <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
          <button
            onClick={() => toggleSection("Further Study")}
            className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
          >
            <div className="flex items-center">
              <LinkIcon size={20} />
              <span className="ml-2 font-semibold">Further Study</span>
            </div>
            {expandedSections["Further Study"] ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
          {expandedSections["Further Study"] && (
            <div className="px-6 py-4 bg-gray-50">
              <ul className="list-disc ml-4">
                {description.links_for_further_study.map((link, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {Number(id) > 0 && (
          <Link
            to={`/learnfinance/${Number(id) - 1}`}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Previous Module
          </Link>
        )}
        {Number(id) + 1 < financeTopics.length && (
          <Link
            to={`/learnfinance/${Number(id) + 1}`}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Module
          </Link>
        )}
      </div>
      <div className="mt-4 text-center">
        <Link
          to={`/modulequiz/${id}`}
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-colors"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default TopicDescription;
