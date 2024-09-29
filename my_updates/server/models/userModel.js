const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    occupation: String,
    location: String,
    earnings: Number,
    spendings: Number,
    dailySpendings: Number,
    salary: Number,
    emis: [{ type: String }],
    financialGoal: String,
    goalAmount: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
