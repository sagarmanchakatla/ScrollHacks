const express = require("express");
const { createUser, getUser } = require("../controllers/userController");
const router = express.Router();

const { generateFinancialAdvice } = require("../routes/financialhelp");

router.post("/user", createUser);
router.get("/user/:id", getUser);
router.post("/generate-advice", generateFinancialAdvice); // New route for financial advice

module.exports = router;
