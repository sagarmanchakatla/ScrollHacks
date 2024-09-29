import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown"; // Ensure correct import

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

  useEffect(() => {
    console.log(topic);
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

        // Ensure that each field is a string
        setDescription({
          background:
            typeof result.financialAdvice.background === "string"
              ? result.financialAdvice.background
              : "",
          need:
            typeof result.financialAdvice.need === "string"
              ? result.financialAdvice.need
              : "",
          importance:
            typeof result.financialAdvice.importance === "string"
              ? result.financialAdvice.importance
              : "",
          detailed_description:
            typeof result.financialAdvice.detailed_description === "string"
              ? result.financialAdvice.detailed_description
              : "",
          key_takeaways:
            typeof result.financialAdvice.key_takeaways === "string"
              ? result.financialAdvice.key_takeaways
              : "",
          conclusion:
            typeof result.financialAdvice.conclusion === "string"
              ? result.financialAdvice.conclusion
              : "",
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">{topic}</h1>

      {/* Render each part of the description using Markdown */}
      <div className="text-gray-600 text-lg mb-6">
        <strong>Background:</strong>
        <ReactMarkdown>{description.background}</ReactMarkdown>
      </div>

      <div className="text-gray-600 text-lg mb-6">
        <strong>Need:</strong>
        <ReactMarkdown>{description.need}</ReactMarkdown>
      </div>

      <div className="text-gray-600 text-lg mb-6">
        <strong>Importance:</strong>
        <ReactMarkdown>{description.importance}</ReactMarkdown>
      </div>

      <div className="text-gray-600 text-lg mb-6">
        <strong>Detailed Description:</strong>
        <ReactMarkdown>{description.detailed_description}</ReactMarkdown>
      </div>

      <div className="text-gray-600 text-lg mb-6">
        <strong>Key Takeaways:</strong>
        <ReactMarkdown>{description.key_takeaways}</ReactMarkdown>
      </div>

      <div className="text-gray-600 text-lg mb-6">
        <strong>Conclusion:</strong>
        <ReactMarkdown>{description.conclusion}</ReactMarkdown>
      </div>

      {/* Render links for further study as a list */}
      {description.links_for_further_study.length > 0 && (
        <div>
          <strong>More Links for Study:</strong>
          <ul className="list-disc ml-4">
            {description.links_for_further_study.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {Number(id) + 1 < financeTopics.length && (
          <Link
            to={`/learnfinance/${Number(id) + 1}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Next Module
          </Link>
        )}
        <Link
          to={`/modulequiz/${id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default TopicDescription;
