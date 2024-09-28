const car_insurance = require("../context/insurances/car_insurance");
const health_insurance = require("../context/insurances/health_insurance");
const life_insurance = require("../context/insurances/life_insurance");

exports.getInsuranceInfo = async (req, res) => {
  const type = req.body.type;
  if (type === "car") {
    res.json(car_insurance);
  } else if (type === "health") {
    res.json(health_insurance);
  } else if (type === "life") {
    res.json(life_insurance);
  } else {
    res.status(400).json({ message: "Invalid insurance type" });
  }
};
