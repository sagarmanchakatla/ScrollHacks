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

The response must be valid JSON without any backticks, quotes, or code block formatting.
Example:
{
  "background": "Provide background information here.",
  "need": "Explain the need for this topic.",
  "importance": "Describe the importance of this topic.",
  "detailed_description": "Provide a detailed description.",
  "key_takeaways": "List key takeaways.",
  "conclusion": "Conclude the description.",
  "links_for_further_study": ["https://example.com/resource1", "https://example.com/resource2"],
  "links_for_youtube": ["https://example.com/youtube1", "https://example.com/youtube2"]
}`;

  try {
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();

    // Use regex to extract the first JSON object from the response
    const jsonRegex = /{[\s\S]*}/;
    const match = textResponse.match(jsonRegex);

    if (!match) {
      throw new Error("No JSON object found in AI response.");
    }

    const jsonString = match[0];

    // Parse the JSON string
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      console.error("Raw AI Response:", textResponse);
      throw new Error("Invalid JSON format in AI response.");
    }

    // Validate the presence of all required keys
    const requiredKeys = [
      "background",
      "need",
      "importance",
      "detailed_description",
      "key_takeaways",
      "conclusion",
      "links_for_further_study",
    ];

    for (const key of requiredKeys) {
      if (!(key in parsedResponse)) {
        throw new Error(`Missing key "${key}" in AI response.`);
      }
    }

    // Ensure 'links_for_further_study' is an array
    if (!Array.isArray(parsedResponse.links_for_further_study)) {
      parsedResponse.links_for_further_study = [];
    }

    // Send the parsed response back to the frontend
    return res.status(200).json({ financialAdvice: parsedResponse });
  } catch (error) {
    console.error("Error generating content:", error.message);
    res.status(500).json({
      message: "Error generating financial advice",
      error: error.message,
    });
  }
};
