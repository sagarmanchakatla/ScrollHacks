const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAEwiKHPiFMh6bcrJBvpryExpZVIqHslWs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.getTopicDescription = async (req, res) => {
  const topic = req.body.topic;

  const prompt = `Generate a detailed description of the following topic: ${topic}.
    The description should be in JSON format with the following keys: 
    - background
    - need
    - importance
    - detailed_description
    - key_takeaways
    - conclusion
    - links_for_further_study

    The response must be valid JSON without backticks, quotes, or code block formatting.`;

  try {
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();

    // Clean up any backticks or code block formatting that may be in the response
    const cleanedResponse = textResponse.replace(/```json|```/g, "").trim();

    // Parse the cleaned response into a JSON object
    const parsedResponse = JSON.parse(cleanedResponse);

    // Send parsed response back to the frontend
    return res.status(200).json({ financialAdvice: parsedResponse });
  } catch (error) {
    console.error("Error generating content:", error);
    res
      .status(500)
      .json({ message: "Error generating financial advice", error });
  }
};
