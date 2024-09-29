const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const bodyParser = require("body-parser");

const app = express();
const userRoutes = require("./routes/userRoutes");
app.use(bodyParser.json());

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api", userRoutes); // Use the new route in your application

app.post("/api/generate-proposal", (req, res) => {
  const {
    companyName,
    businessProblem,
    businessSolution,
    targetMarket,
    revenueModel,
    financialGoal,
  } = req.body;

  // Validate request body
  if (
    !companyName ||
    !businessProblem ||
    !businessSolution ||
    !targetMarket ||
    !revenueModel ||
    !financialGoal
  ) {
    return res.status(400).send("All fields are required.");
  }

  // Generate proposal logic
  const proposal = `Here is a business proposal for ${companyName}: 
                    Problem: ${businessProblem}, 
                    Solution: ${businessSolution}, 
                    Target Market: ${targetMarket}, 
                    Revenue Model: ${revenueModel}, 
                    Financial Goal: ${financialGoal}`;

  // Simulate a proposal generation failure (if needed)
  if (!proposal) {
    return res.status(400).send("Proposal generation failed");
  }

  // Return the proposal as part of the response
  res.json({ businessProposal: proposal });
});

app.post("/api/send-email", (req, res) => {
  const {
    companyName,
    businessProblem,
    businessSolution,
    targetMarket,
    revenueModel,
    financialGoal,
  } = req.body;

  // Check for missing fields
  if (
    !companyName ||
    !businessProblem ||
    !businessSolution ||
    !targetMarket ||
    !revenueModel ||
    !financialGoal
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Proceed to send email
  // ...
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
