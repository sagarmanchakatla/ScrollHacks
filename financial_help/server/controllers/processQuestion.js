// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI("AIzaSyAEwiKHPiFMh6bcrJBvpryExpZVIqHslWs");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Controller to handle POST requests
// exports.processQuestion = async (req, res) => {
//   try {
//     const { question, summary, url } = req.body;

//     let responseContent = summary || "";

//     // If no summary is provided, scan the website (this runs once when the page is loaded)
//     if (!summary && url) {
//       const fullUrl = `https://s.jina.ai/${url}`;
//       const response = await fetch(fullUrl, { method: "GET" });
//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch website data: ${response.statusText} (${response.status})`
//         );
//       }
//       responseContent = await response.text();
//     }

//     // Prepare the AI prompt for Google Gemini AI
//     const prompt = summary
//       ? `Here's a summary of the website: ${summary}. The user asks: ${question}`
//       : `Summarize this website content: ${responseContent}`;

//     // Use Gemini AI to process the question and website summary
//     const result = await model.generateContent(prompt);
//     const aiResponse = result.response.text();
//     console.log("Raw AI response:", aiResponse);

//     // Clean the AI response, ensuring it's safe for JSON if necessary
//     // const cleanedResponse = aiResponse.replace(/```json|```/g, "").trim();

//     return res.status(200).json({ answer: aiResponse });
//   } catch (error) {
//     console.error("Error:", error.message);
//     return res
//       .status(500)
//       .json({ message: "Failed to process the request", error: error.message });
//   }
// };

const axios = require("axios");

// Load environment variables from the .env file
const groqApiKey = "";

if (!groqApiKey) {
  throw new Error("GROQ_API_KEY environment variable is not set");
}

// Initialize the GROQ API client
const groq = axios.create({
  baseURL: "https://api.groq.com/openai/v1",
  headers: {
    Authorization: `Bearer ${groqApiKey}`,
  },
});

// Controller function to handle the POST request
exports.processQuestion = async (req, res) => {
  try {
    const { question, summary, url } = req.body;

    // Validate the input parameters
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    let responseContent = summary || "";

    // If no summary is provided, fetch content from the given URL
    if (!summary && url) {
      try {
        const fullUrl = `https://s.jina.ai/${url}`;
        const response = await axios.get(fullUrl);
        responseContent = response.data;
      } catch (error) {
        return res
          .status(500)
          .json({ message: `Failed to fetch website data: ${error.message}` });
      }
    }

    // Create the prompt for the GROQ API
    const prompt = summary
      ? `Here's a summary of the website: ${summary}. The user asks: ${question}`
      : `The user asks: ${question}. Summarize this website content: ${responseContent}`;

    // Use GROQ to generate a response for the question
    const response = await groq.post("/generateText", {
      model: "llama3-8b-8192",
      prompt: prompt,
    });

    const insights = response.data.text || "No insights available.";

    // Return the generated insights in the response
    return res.json({ answer: insights });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Failed to process the request", error: error.message });
  }
};
