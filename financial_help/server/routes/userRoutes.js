const express = require("express");
const { createUser, getUser } = require("../controllers/userController");
const { generateFinancialAdvice } = require("../controllers/financialhelp"); // Ensure this is imported
const { getTopicDescription } = require("../controllers/getTopicDescription");

const router = express.Router();

router.post("/user", createUser);
router.get("/user/:id", getUser);
router.post("/generate-advice", generateFinancialAdvice); // Use the imported function
router.post("/generate-topic-description", getTopicDescription);

module.exports = router;
