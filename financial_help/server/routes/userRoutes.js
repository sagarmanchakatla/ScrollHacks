const express = require("express");
const { createUser, getUser } = require("../controllers/userController");
const { generateFinancialAdvice } = require("../controllers/financialhelp"); // Ensure this is imported
const { getTopicDescription } = require("../controllers/getTopicDescription");
const { getQuiz, getAdviceOnQuiz } = require("../controllers/getQuiz");
const { getInsuranceInfo } = require("../controllers/getInsuranceInfo");
const { processQuestion } = require("../controllers/processQuestion");

const router = express.Router();

router.post("/user", createUser);
router.get("/user/:id", getUser);
router.post("/generate-advice", generateFinancialAdvice); // Use the imported function
router.post("/generate-topic-description", getTopicDescription);
router.post("/generate-quiz", getQuiz);
router.post("/get-advice-on-quiz", getAdviceOnQuiz);
router.post("/get-insurance-details", getInsuranceInfo);
router.post("/process", processQuestion);

module.exports = router;
