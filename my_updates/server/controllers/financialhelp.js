const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAEwiKHPiFMh6bcrJBvpryExpZVIqHslWs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.generateFinancialAdvice = async (req, res) => {
  const userData = req.body;

  const prompt = `Generate a financial plan for a user with the following data: ${JSON.stringify(
    userData
  )}.
  Please provide tips on savings, investments, and managing expenses to achieve the financial goal of ${
    userData.financialGoal
  }.`;

  try {
    const result = await model.generateContent(prompt);
    res.status(200).json({ financialAdvice: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res
      .status(500)
      .json({ message: "Error generating financial advice", error });
  }
};
