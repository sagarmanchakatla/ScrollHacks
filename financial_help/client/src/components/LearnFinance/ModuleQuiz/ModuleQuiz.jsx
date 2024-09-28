import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the module ID
import { Link } from "react-router-dom";

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

const ModuleQuiz = () => {
  const { id } = useParams();
  const topic = financeTopics[id];
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/generate-quiz",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ topic: topic }),
          }
        );

        const data = await response.json();
        setQuizQuestions(data.quizQuestions);
        console.log("Quiz Questions:", data.quizQuestions);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };
    fetchData();
  }, [topic]);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers({
      ...answers,
      [questionIndex]: selectedOption,
    });
  };

  const handleSubmitQuiz = async () => {
    let calculatedScore = 0;
    const incorrectQuestions = [];

    quizQuestions.forEach((question, index) => {
      if (question.options[answers[index]] === question.correctAnswer) {
        calculatedScore += 1;
      } else {
        incorrectQuestions.push(question.question);
      }
    });

    const totalScore = (calculatedScore / quizQuestions.length) * 100;
    setScore(totalScore);
    console.log("Final Score:", totalScore);

    // Get advice based on quiz performance
    try {
      const response = await fetch(
        "http://localhost:8000/api/get-advice-on-quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: topic,
            score: totalScore,
            incorrectQuestions: incorrectQuestions,
          }),
        }
      );

      const data = await response.json();
      setAdvice(data.advice);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Quiz: {topic}</h1>

      {quizQuestions.length > 0 ? (
        <form className="space-y-6">
          {quizQuestions.map((question, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                {question.question}
              </h2>
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="block mb-1">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    checked={answers[index] === optionIndex}
                    onChange={() => handleAnswerChange(index, optionIndex)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}

          <button
            type="button"
            onClick={handleSubmitQuiz}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Submit Quiz
          </button>
        </form>
      ) : (
        <p>Loading quiz questions...</p>
      )}

      {score !== null && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">
            Your Score: {score.toFixed(2)}%
          </h2>
          {score >= 50 ? (
            <>
              <p className="text-green-500">Great job! You passed the quiz.</p>
              <Link
                to={`/learnfinance/${Number(id) + 1}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Next Module
              </Link>
            </>
          ) : (
            <p className="text-red-500">
              You scored below 50%. Please review the material.
            </p>
          )}
          {advice && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Personalized Advice:</h3>
              <p>{advice}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleQuiz;
