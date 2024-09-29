import React, { useState, useRef, useEffect } from "react";
import { ExternalLink, User, Bot, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Markdown from "react-markdown";

const MySchemePortal = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [websiteSummary, setWebsiteSummary] = useState("");
  const chatContainerRef = useRef(null);

  const sampleQuestions = [
    "What schemes are available for farmers?",
    "How can I apply for educational scholarships?",
    "Are there any schemes for women entrepreneurs?",
    "What health insurance schemes are offered?",
    "How do I check my eligibility for housing schemes?",
    "What schemes support skill development?",
    "Are there schemes for senior citizens?",
  ];

  const scanWebsite = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://scrollhacks-fkqq.onrender.com/api/process",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: "https://myscheme.gov.in" }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setWebsiteSummary(data.answer);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "I've scanned the MyScheme portal. How can I assist you with government schemes?",
          },
        ]);
      } else {
        throw new Error(data.message || "Failed to scan the website");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scanWebsite();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: inputMessage }]);
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://scrollhacks-fkqq.onrender.com/api/process",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: inputMessage,
            summary: websiteSummary,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { type: "bot", content: data.answer }]);
      } else {
        throw new Error(data.message || "Failed to get an answer");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setInputMessage("");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900 font-sans">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 w-full">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-700 text-white p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between shadow-lg mb-4 sm:mb-6"
        >
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mr-4 rounded-full bg-white p-1 shadow-inner">
              <img
                src="https://cdn.iconscout.com/icon/free/png-512/government-scheme-1795432-1522797.png"
                alt="MyScheme Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                MyScheme Portal AI
              </h1>
              <p className="text-lg sm:text-xl text-blue-100">
                Your gateway to government schemes
              </p>
            </div>
          </div>
          <a
            href="https://myscheme.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-100 hover:text-white transition-colors duration-300"
          >
            <span className="mr-2 text-base sm:text-lg">
              Visit Official Site
            </span>
            <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </motion.header>

        <div
          className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-lg mb-4 sm:mb-6 p-4 sm:p-6"
          ref={chatContainerRef}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-[75%] ${
                    message.type === "user"
                      ? "bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  } rounded-2xl p-3 sm:p-4 shadow-md flex items-start`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  ) : (
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  )}
                  <p className="text-sm sm:text-base">
                    <Markdown>{message.content}</Markdown>
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-2xl p-3 sm:p-4 shadow-md max-w-[75%]">
                <p className="flex items-center text-sm sm:text-base text-gray-900">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-700 flex-shrink-0" />
                  <span className="mr-2">Searching for scheme information</span>
                  <span className="animate-pulse">...</span>
                </p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            {sampleQuestions.map((question, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-50 text-blue-700 py-1 sm:py-2 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-100 transition-all duration-300"
                onClick={() => {
                  setInputMessage(question);
                  handleSubmit(new Event("submit"));
                }}
                disabled={isLoading}
              >
                {question}
              </motion.button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center space-x-2 sm:space-x-4"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about a government scheme"
              className="w-full bg-gray-50 py-2 sm:py-3 px-3 sm:px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all duration-300 text-sm sm:text-base placeholder-gray-400"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-700 text-white p-2 sm:p-3 rounded-full flex items-center justify-center hover:bg-blue-800 transition-all duration-300 flex-shrink-0"
              disabled={isLoading}
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </form>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mt-4 text-center text-sm sm:text-base"
            >
              {error}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySchemePortal;
