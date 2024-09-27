const User = require("../models/userModel");
const { getFinancialPlan } = require("../routes/financialhelp");
// Create new user
exports.createUser = async (req, res) => {
  const {
    name,
    occupation,
    location,
    earnings,
    spendings,
    dailySpendings,
    salary,
    emis,
  } = req.body;
  try {
    const newUser = new User({
      name,
      occupation,
      location,
      earnings,
      spendings,
      dailySpendings,
      salary,
      emis,
    });
    await newUser.save();
    getFinancialPlan(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Fetch user details
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};
