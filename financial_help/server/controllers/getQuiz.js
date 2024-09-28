const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAEwiKHPiFMh6bcrJBvpryExpZVIqHslWs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.getQuiz = async (req, res) => {
  const topic = req.body.topic;
  console.log(topic);

  // The prompt for AI to generate a quiz in a specific format
  const prompt = `Generate a 5-question multiple-choice quiz on the topic: ${topic}. 
  Provide 4 answer options and specify the correct answer. The response should be in JSON format 
  with keys "question", "options", and "correctAnswer".`;

  try {
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();

    // Cleaning up response to ensure it's valid JSON, removing markdown or any non-JSON structures
    let cleanedResponse = textResponse.replace(/```json|```/g, "").trim();

    // Try to parse the cleaned response as JSON
    const quizQuestions = JSON.parse(cleanedResponse);
    // console.log(quizQuestions);
    return res.status(200).json({ quizQuestions });
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ message: "Error generating quiz", error });
  }
};

exports.getAdviceOnQuiz = async (req, res) => {
  const { topic, score, incorrectQuestions } = req.body;
  console.log(topic, score, incorrectQuestions);
  let prompt;
  if (score < 50) {
    prompt = `The user scored ${score}% on a quiz about ${topic}. They struggled with the following questions: ${incorrectQuestions.join(
      ", "
    )}. Provide a brief paragraph of advice on which aspects of ${topic} they should focus on improving, and suggest 2-3 related topics they should study to strengthen their understanding.`;
  } else {
    prompt = `The user scored ${score}% on a quiz about ${topic}. Provide a brief paragraph of advice on how they can further improve their knowledge of ${topic}, and suggest 2-3 advanced topics they could explore next to deepen their understanding.`;
  }

  try {
    const result = await model.generateContent(prompt);
    const advice = result.response.text();
    return res.status(200).json({ advice });
  } catch (error) {
    console.error("Error generating advice:", error);
    res.status(500).json({ message: "Error generating advice", error });
  }
};
