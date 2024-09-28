import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Info } from "lucide-react";
import Markdown from "react-markdown";

const FinancialForm = () => {
  // Unchanged: Initial state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    occupation: "",
    industry: "",
    annualIncome: 0,
    monthlySpendings: 0,
    savings: 0,
    investments: 0,
    debts: 0,
    emiTypes: [],
    totalEMI: 0,
    financialGoal: "",
    riskLevel: "medium",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [advice, setAdvice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // New: Added loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);

  const validateCurrentStep = () => {
    const currentFields = formSections[currentStep].fields;
    const isValid = currentFields.every((field) => {
      if (field.type === "checkbox") {
        return formData[field.name].length > 0;
      }
      return formData[field.name] !== "" && formData[field.name] !== 0;
    });
    setIsCurrentStepValid(isValid);
  };

  React.useEffect(() => {
    validateCurrentStep();
  }, [formData, currentStep]);

  const goToNextStep = () => {
    if (isCurrentStepValid && currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  // Unchanged: handleChange function
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        emiTypes: checked
          ? [...prevState.emiTypes, name]
          : prevState.emiTypes.filter((type) => type !== name),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "number" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  // Modified: handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/generate-advice",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const responseData = await response.json();
      setAdvice(responseData.financialAdvice);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error submitting data:", error.message);
      // Optionally, show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  // Unchanged: closeModal function
  const closeModal = () => setIsModalOpen(false);

  // Unchanged: formSections
  const formSections = [
    {
      title: "Personal Information",
      fields: [
        {
          name: "name",
          label: "Full Name",
          type: "text",
          description: "Your legal full name",
        },
        {
          name: "age",
          label: "Age",
          type: "number",
          description: "Your current age in years",
        },
        {
          name: "location",
          label: "Location",
          type: "text",
          description: "Your current city and country of residence",
        },
      ],
    },
    {
      title: "Occupation",
      fields: [
        {
          name: "occupation",
          label: "Occupation",
          type: "text",
          description: "Your current job title or role",
        },
        {
          name: "industry",
          label: "Industry",
          type: "text",
          description: "The industry sector you work in",
        },
      ],
    },
    {
      title: "Financial Information",
      fields: [
        {
          name: "annualIncome",
          label: "Annual Income",
          type: "number",
          description: "Your total yearly income before taxes",
        },
        {
          name: "monthlySpendings",
          label: "Monthly Spendings",
          type: "number",
          description: "Your average monthly expenses",
        },
        {
          name: "savings",
          label: "Total Savings",
          type: "number",
          description: "The total amount you have saved in bank accounts",
        },
        {
          name: "investments",
          label: "Total Investments",
          type: "number",
          description:
            "The total value of your investments (stocks, bonds, mutual funds, etc.)",
        },
        {
          name: "debts",
          label: "Total Debts",
          type: "number",
          description: "The total amount of all your outstanding debts",
        },
      ],
    },
    {
      title: "EMI Information",
      fields: [
        {
          name: "emiTypes",
          label: "EMI Types",
          type: "checkbox",
          options: [
            { value: "homeLoan", label: "Home Loan" },
            { value: "carLoan", label: "Car Loan" },
            { value: "personalLoan", label: "Personal Loan" },
            { value: "educationLoan", label: "Education Loan" },
          ],
          description: "Select all types of EMIs you currently have",
        },
        {
          name: "totalEMI",
          label: "Total Monthly EMI",
          type: "number",
          description:
            "The total amount you pay monthly for all your EMIs combined",
        },
      ],
    },
    {
      title: "Goals and Risk",
      fields: [
        {
          name: "financialGoal",
          label: "Financial Goal",
          type: "text",
          description:
            "Your primary financial goal (e.g., retirement, buying a house, starting a business)",
        },
        {
          name: "riskLevel",
          label: "Risk Tolerance",
          type: "select",
          options: [
            {
              value: "low",
              label: "Low - I prefer stable, low-risk investments",
            },
            {
              value: "medium",
              label: "Medium - I'm comfortable with a balanced portfolio",
            },
            {
              value: "high",
              label:
                "High - I'm willing to take risks for potentially higher returns",
            },
          ],
          description: "Your comfort level with investment risk",
        },
      ],
    },
  ];

  // Unchanged: renderField function
  const renderField = (field) => (
    <div key={field.name} className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
      </label>
      {field.type === "select" ? (
        <select
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formData[field.name] === "" ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select an option</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === "checkbox" ? (
        <div className="space-y-2">
          {field.options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={option.value}
                checked={formData.emiTypes.includes(option.value)}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ) : (
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formData[field.name] === "" || formData[field.name] === 0
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
      )}
      {(formData[field.name] === "" || formData[field.name] === 0) && (
        <p className="text-red-500 text-sm">This field is required</p>
      )}
      <p className="text-sm text-gray-500 flex items-center">
        <Info size={16} className="mr-1" />
        {field.description}
      </p>
    </div>
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentStep < formSections.length - 1) {
      e.preventDefault(); // Prevent form submission if pressing Enter
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Comprehensive Financial Planning
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4">
                {formSections[currentStep].title}
              </h3>
              {formSections[currentStep].fields.map(renderField)}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <motion.button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg ${
                currentStep === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              <ChevronLeft className="inline mr-2" />
              Previous
            </motion.button>
            {currentStep === formSections.length - 1 ? (
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !isCurrentStepValid}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 ${
                  isLoading || !isCurrentStepValid
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading ? "Generating..." : "Generate Advice"}
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={goToNextStep}
                disabled={!isCurrentStepValid}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                  isCurrentStepValid
                    ? "hover:bg-blue-600"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Next
                <ChevronRight className="inline ml-2" />
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 bg-blue-600 text-white">
                <h3 className="text-2xl font-bold">
                  Your Personalized Financial Advice
                </h3>
              </div>
              <div className="p-6 overflow-y-auto flex-grow">
                <div className="prose prose-lg max-w-none">
                  <Markdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-2xl font-bold mb-4" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-xl font-semibold mt-6 mb-3"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-4" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-5 mb-4" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-5 mb-4" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-2" {...props} />
                      ),
                    }}
                  >
                    {advice}
                  </Markdown>
                </div>
              </div>
              <div className="p-4 bg-gray-100 flex justify-end">
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinancialForm;
