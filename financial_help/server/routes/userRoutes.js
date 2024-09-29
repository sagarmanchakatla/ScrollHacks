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

const calculateInvestment = (
  initialAmount,
  recurringContribution,
  rate,
  years,
  compoundFreq
) => {
  let futureValue = initialAmount;
  const periods = years * compoundFreq;
  const ratePerPeriod = rate / 100 / compoundFreq;

  for (let i = 0; i < periods; i++) {
    futureValue = (futureValue + recurringContribution) * (1 + ratePerPeriod);
  }
  return futureValue;
};

router.post("/calculate", (req, res) => {
  const {
    initialAmount,
    recurringContribution,
    rate,
    years,
    compoundFreq,
    inflationRate,
    taxRate,
  } = req.body;

  // Calculate future value
  let futureValue = calculateInvestment(
    initialAmount,
    recurringContribution,
    rate,
    years,
    compoundFreq
  );

  // Adjust for inflation
  if (inflationRate) {
    futureValue = futureValue / Math.pow(1 + inflationRate / 100, years);
  }

  // Adjust for taxes
  if (taxRate) {
    futureValue = futureValue * (1 - taxRate / 100);
  }

  res.json({ futureValue });
});

module.exports = router;
