import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // To get the module ID

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
  const { id } = useParams(); // Get the id from the route params
  const topic = financeTopics[id]; // Get the topic based on id

  const [description, setDescription] = useState({
    background: "",
    need: "",
    importance: "",
    detailed_description: "",
    key_takeaways: "",
    conclusion: "",
    links_for_further_study: "",
  });

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
            body: JSON.stringify({ topic }), // Send topic as an object
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setDescription(result.financialAdvice); // Assuming the API sends back the description as `financialAdvice`
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [topic]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">{topic}</h1>
      <p className="text-gray-600 text-lg mb-6">
        <strong>Background:</strong> {description.background}
      </p>
      <p className="text-gray-600 text-lg mb-6">
        <strong>Need:</strong> {description.need}
      </p>
      <p className="text-gray-600 text-lg mb-6">
        <strong>Importance:</strong> {description.importance}
      </p>
      <p className="text-gray-600 text-lg mb-6">
        <strong>Detailed Description:</strong>{" "}
        {description.detailed_description}
      </p>
      <p className="text-gray-600 text-lg mb-6">
        <strong>Key Takeaways:</strong> {description.key_takeaways}
      </p>
      <p className="text-gray-600 text-lg mb-6">
        <strong>Conclusion:</strong> {description.conclusion}
      </p>
      <p className="text-gray-600 text-lg mb-6">
        <strong>More Links:</strong> {description.links_for_further_study}
      </p>

      <Link
        to={`/learnfinance/${Number(id) + 1}`} // Dynamic navigation based on topic index
        className="text-blue-500 hover:text-blue-700"
      >
        Next module
      </Link>
    </div>
  );
};

export default TopicDescription;
