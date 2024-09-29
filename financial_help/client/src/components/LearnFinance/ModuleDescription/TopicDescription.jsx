import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  ChevronDown,
  ChevronUp,
  Book,
  Link as LinkIcon,
  ArrowLeft,
  ArrowRight,
  PlayCircle,
  FileText,
} from "lucide-react";

import PrettyLoder from "../../Navbar/PrettyLoder";

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
    links_for_youtube: [],
  });
  const [expandedSections, setExpandedSections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
        setDescription(result.financialAdvice);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [topic]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderSection = (title, content, icon) => (
    <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden border border-blue-200">
      <button
        onClick={() => toggleSection(title)}
        className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white"
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
        <div className="px-6 py-4 bg-blue-50">
          <ReactMarkdown className="prose max-w-none">{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      // <div className="flex justify-center items-center h-screen bg-blue-100">
      //   <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      // </div>
      <PrettyLoder type={"module"} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <h1 className="text-4xl font-bold mb-2 text-blue-800">
            {Number(id) + 1}. {topic}
          </h1>
          <div className="flex space-x-4">
            <a
              href={description.links_for_youtube[0]}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <PlayCircle size={20} className="mr-1" />
              Watch videos
            </a>
            <Link
              to="#"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FileText size={20} className="mr-1" />
              Download PDF
            </Link>
          </div>
        </div>

        {renderSection(
          "Background",
          description.background,
          <Book size={20} />
        )}
        {renderSection("Need", description.need, <Book size={20} />)}
        {renderSection(
          "Importance",
          description.importance,
          <Book size={20} />
        )}
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
        {renderSection(
          "Conclusion",
          description.conclusion,
          <Book size={20} />
        )}

        {description.links_for_further_study.length > 0 && (
          <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden border border-blue-200">
            <button
              onClick={() => toggleSection("Further Study")}
              className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white"
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
              <div className="px-6 py-4 bg-blue-50">
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
              className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Previous Module
            </Link>
          )}
          {Number(id) < financeTopics.length - 1 && (
            <Link
              to={`/learnfinance/${Number(id) + 1}`}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Next Module
              <ArrowRight size={20} className="ml-2" />
            </Link>
          )}
        </div>
        <div className="mt-4 text-center">
          <Link
            to={`/modulequiz/${id}`}
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopicDescription;
