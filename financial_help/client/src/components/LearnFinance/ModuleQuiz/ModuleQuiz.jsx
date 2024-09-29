// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import Markdown from "react-markdown";
// import {
//   ChevronRight,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
// } from "lucide-react";

// const financeTopics = [
//   "Personal Finance Basics",
//   "Budgeting",
//   "Savings",
//   "Debt Management",
//   "Banking Fundamentals",
//   "Bank Accounts",
//   "Interest Rates",
//   "Credit Scores",
//   "Investing Basics",
//   "Stocks",
//   "Bonds",
//   "Mutual Funds and ETFs",
//   "Risk and Return",
//   "Trading",
//   "Stock Trading",
//   "Technical and Fundamental Analysis",
//   "Forex Trading",
//   "Cryptocurrency Trading",
//   "Taxes",
//   "Income Tax Basics",
//   "Tax Planning",
//   "Insurance",
//   "Health Insurance",
//   "Life Insurance",
//   "Auto and Home Insurance",
//   "Retirement Planning",
//   "Pensions and 401(k)",
//   "Individual Retirement Accounts (IRAs)",
//   "Real Estate Basics",
//   "Home Buying",
//   "Renting vs. Buying",
//   "Financial Planning",
//   "Goal Setting",
//   "Net Worth Calculation",
//   "Estate Planning",
//   "Financial Tools",
//   "Budgeting Apps",
//   "Investment Platforms",
// ];

// const ModuleQuiz = () => {
//   const { id } = useParams();
//   const topic = financeTopics[id];
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [advice, setAdvice] = useState("");
//   const [showAdvice, setShowAdvice] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "https://scrollhacks-fkqq.onrender.com/api/generate-quiz",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ topic: topic }),
//           }
//         );

//         const data = await response.json();
//         setQuizQuestions(data.quizQuestions);
//       } catch (error) {
//         console.error("Error fetching quiz questions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [topic]);

//   useEffect(() => {
//     if (quizQuestions.length > 0 && timeLeft > 0) {
//       const timer = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);

//       return () => clearInterval(timer);
//     } else if (timeLeft === 0) {
//       handleSubmitQuiz();
//     }
//   }, [quizQuestions, timeLeft]);

//   const handleAnswerChange = (selectedOption) => {
//     setAnswers({
//       ...answers,
//       [currentQuestionIndex]: selectedOption,
//     });
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < quizQuestions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       handleSubmitQuiz();
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     let calculatedScore = 0;
//     const incorrectQuestions = [];

//     quizQuestions.forEach((question, index) => {
//       if (question.options[answers[index]] === question.correctAnswer) {
//         calculatedScore += 1;
//       } else {
//         incorrectQuestions.push(question.question);
//       }
//     });

//     const totalScore = (calculatedScore / quizQuestions.length) * 100;
//     setScore(totalScore);

//     try {
//       const response = await fetch(
//         "https://scrollhacks-fkqq.onrender.com/api/get-advice-on-quiz",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             topic: topic,
//             score: totalScore,
//             incorrectQuestions: incorrectQuestions,
//           }),
//         }
//       );

//       const data = await response.json();
//       setAdvice(data.advice);
//     } catch (error) {
//       console.error("Error fetching advice:", error);
//     }
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8 px-4 max-w-3xl">
//       <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
//         {topic} Quiz
//       </h1>

//       <div className="bg-white shadow-lg rounded-lg p-6">
//         {score === null ? (
//           <>
//             <div className="mb-4 flex justify-between items-center">
//               <span className="text-lg font-semibold">
//                 Question {currentQuestionIndex + 1} of {quizQuestions.length}
//               </span>
//               <span className="text-lg font-semibold flex items-center">
//                 <Clock size={20} className="mr-2 text-indigo-600" />
//                 Time Left: {formatTime(timeLeft)}
//               </span>
//             </div>
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">
//                 {quizQuestions[currentQuestionIndex]?.question}
//               </h2>
//               <div className="space-y-3">
//                 {quizQuestions[currentQuestionIndex]?.options.map(
//                   (option, optionIndex) => (
//                     <label
//                       key={optionIndex}
//                       className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-indigo-50 transition-colors cursor-pointer"
//                     >
//                       <input
//                         type="radio"
//                         name={`question-${currentQuestionIndex}`}
//                         value={optionIndex}
//                         checked={answers[currentQuestionIndex] === optionIndex}
//                         onChange={() => handleAnswerChange(optionIndex)}
//                         className="form-radio text-indigo-600 focus:ring-indigo-500"
//                       />
//                       <span className="text-gray-700">{option}</span>
//                     </label>
//                   )
//                 )}
//               </div>
//             </div>
//             <button
//               onClick={handleNextQuestion}
//               className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
//             >
//               {currentQuestionIndex === quizQuestions.length - 1 ? (
//                 "Submit Quiz"
//               ) : (
//                 <>
//                   Next Question
//                   <ChevronRight size={20} className="ml-2" />
//                 </>
//               )}
//             </button>
//           </>
//         ) : (
//           <div className="text-center">
//             <h2 className="text-3xl font-bold mb-4">
//               Your Score:{" "}
//               <span className={score >= 50 ? "text-green-600" : "text-red-600"}>
//                 {score.toFixed(2)}%
//               </span>
//             </h2>
//             {score >= 50 ? (
//               <div className="mb-6">
//                 <CheckCircle
//                   size={64}
//                   className="mx-auto text-green-500 mb-4"
//                 />
//                 <p className="text-green-600 mb-4">
//                   Congratulations! You passed the quiz.
//                 </p>
//                 <Link
//                   to={`/learnfinance/${Number(id) + 1}`}
//                   className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
//                 >
//                   Next Module
//                 </Link>
//               </div>
//             ) : (
//               <div className="mb-6">
//                 <XCircle size={64} className="mx-auto text-red-500 mb-4" />
//                 <p className="text-red-600 mb-4">
//                   You scored below 50%. We recommend reviewing the material and
//                   trying again.
//                 </p>
//                 <Link
//                   to={`/learnfinance/${id}`}
//                   className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
//                 >
//                   Review Module
//                 </Link>
//               </div>
//             )}
//             <button
//               onClick={() => setShowAdvice(!showAdvice)}
//               className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center mx-auto"
//             >
//               <AlertCircle size={20} className="mr-2" />
//               {showAdvice ? "Hide Advice" : "Show Advice"}
//             </button>
//             {showAdvice && advice && (
//               <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
//                 <h3 className="text-xl font-semibold mb-2 text-indigo-700">
//                   Personalized Advice:
//                 </h3>
//                 <div className="text-gray-700 prose max-w-none">
//                   <Markdown>{advice}</Markdown>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ModuleQuiz;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  Award,
} from "lucide-react";
import PrettyLoader from "../../Navbar/PrettyLoder";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [advice, setAdvice] = useState("");
  const [showAdvice, setShowAdvice] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showConfetti, setShowConfetti] = useState(false);

  // Fetch quiz questions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://scrollhacks-fkqq.onrender.com/api/generate-quiz",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic }),
          }
        );

        const data = await response.json();
        setQuizQuestions(data.quizQuestions);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [topic]);

  // Timer functionality
  useEffect(() => {
    if (quizQuestions.length > 0 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [quizQuestions, timeLeft]);

  // Handle answer change
  const handleAnswerChange = (selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: selectedOption,
    }));
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  // Submit quiz and calculate score
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

    if (totalScore >= 50) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }

    try {
      const response = await fetch(
        "https://scrollhacks-fkqq.onrender.com/api/get-advice-on-quiz",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic,
            score: totalScore,
            incorrectQuestions,
          }),
        }
      );

      const data = await response.json();
      setAdvice(data.advice);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (loading) {
    return (
      // <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-blue-400">
      //   <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      // </div>
      <PrettyLoader type={"quiz"} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-blue-900"
        >
          {topic} Quiz
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md rounded-lg overflow-hidden p-6"
        >
          {score === null ? (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
                <span className="text-lg font-semibold flex items-center text-blue-600">
                  <Clock size={20} className="mr-2" />
                  {formatTime(timeLeft)}
                </span>
              </div>
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-4 bg-blue-50 rounded-lg"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {quizQuestions[currentQuestionIndex]?.question}
                </h2>
                <div className="space-y-3">
                  {quizQuestions[currentQuestionIndex]?.options.map(
                    (option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className="flex items-center space-x-3 p-3 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={optionIndex}
                          checked={
                            answers[currentQuestionIndex] === optionIndex
                          }
                          onChange={() => handleAnswerChange(optionIndex)}
                          className="form-radio text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    )
                  )}
                </div>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleNextQuestion}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none"
              >
                {currentQuestionIndex === quizQuestions.length - 1 ? (
                  <span>
                    Submit Quiz
                    <Award size={20} className="ml-2 inline" />
                  </span>
                ) : (
                  <span>
                    Next Question
                    <ChevronRight size={20} className="ml-2 inline" />
                  </span>
                )}
              </motion.button>
            </div>
          ) : (
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-4"
              >
                Your Score:{" "}
                <span
                  className={score >= 50 ? "text-green-600" : "text-red-600"}
                >
                  {score.toFixed(2)}%
                </span>
              </motion.h2>
              {score >= 50 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <CheckCircle
                    size={64}
                    className="mx-auto text-green-500 mb-4"
                  />
                  <p className="text-green-600 mb-4">
                    Congratulations! You passed the quiz.
                  </p>
                  <Link
                    to={`/learnfinance/${Number(id) + 1}`}
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next Module
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <XCircle size={64} className="mx-auto text-red-500 mb-4" />
                  <p className="text-red-600 mb-4">
                    You scored below 50%. We recommend reviewing the material
                    and trying again.
                  </p>
                  <Link
                    to={`/learnfinance/${id}`}
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <BookOpen size={20} className="inline mr-2" />
                    Review Module
                  </Link>
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowAdvice(!showAdvice)}
                className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center mx-auto"
              >
                <AlertCircle size={20} className="mr-2" />
                {showAdvice ? "Hide Advice" : "Show Advice"}
              </motion.button>
              {showAdvice && advice && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 p-4 bg-blue-100 rounded-lg text-left"
                >
                  <h3 className="text-xl font-semibold mb-2 text-blue-700">
                    Personalized Advice:
                  </h3>
                  <div className="text-gray-700 prose max-w-none">
                    <Markdown>{advice}</Markdown>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
};

export default ModuleQuiz;
