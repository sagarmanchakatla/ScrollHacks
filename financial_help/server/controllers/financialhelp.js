const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAEwiKHPiFMh6bcrJBvpryExpZVIqHslWs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.generateFinancialAdvice = async (req, res) => {
  const userData = req.body;

  const prompt = `Generate a comprehensive financial plan for a user with the following data:
  ${JSON.stringify(userData, null, 2)}

  Please provide detailed advice on:
  1. Budgeting strategies based on annual income and monthly spending
  2. Savings recommendations
  3. Investment opportunities considering the user's risk tolerance (${
    userData.riskLevel
  })
  4. Debt management strategies, including EMI management
  5. Steps to achieve the financial goal of ${userData.financialGoal}

  Consider the user's EMI commitments:
  - EMI Types: ${userData.emiTypes.join(", ")}
  - Total Monthly EMI: ${userData.totalEMI}

  Provide specific advice on managing these EMIs and potentially reducing debt burden.

  If the risk level is high, suggest 2-3 specific stocks or sectors that might align with the user's financial goals, but also include appropriate warnings about the volatility of stock investments.

  Format the advice in clear, easy-to-read Markdown with appropriate headers and bullet points.`;

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
