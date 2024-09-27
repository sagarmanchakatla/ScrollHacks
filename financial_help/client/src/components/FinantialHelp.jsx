import { useState } from "react";

const FinancialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    location: "",
    earnings: 0,
    spendings: 0,
    dailySpendings: 0,
    salary: 0,
    emis: "",
    financialGoal: "",
  });

  const [advice, setAdvice] = useState(null); // State to hold the generated financial advice

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/generate-advice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send form data to the backend
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      setAdvice(responseData.financialAdvice); // Set the financial advice
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />
        <input
          type="number"
          name="earnings"
          placeholder="Earnings"
          onChange={handleChange}
        />
        <input
          type="number"
          name="spendings"
          placeholder="Spendings"
          onChange={handleChange}
        />
        <input
          type="number"
          name="dailySpendings"
          placeholder="Daily Spendings"
          onChange={handleChange}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
        />
        <input
          type="text"
          name="emis"
          placeholder="EMI types"
          onChange={handleChange}
        />
        <input
          type="text"
          name="financialGoal"
          placeholder="Financial Goal"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      {advice && (
        <div>
          <h3>Generated Financial Advice</h3>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
};

export default FinancialForm;
