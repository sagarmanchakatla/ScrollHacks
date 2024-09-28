import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChartBar } from "lucide-react";

const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(500000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [investmentTerm, setInvestmentTerm] = useState(10);
  const [portfolioRisk, setPortfolioRisk] = useState("medium");
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [compoundingFrequency, setCompoundingFrequency] = useState("monthly");
  const [inflationRate, setInflationRate] = useState(6);
  const [taxRate, setTaxRate] = useState(30);

  const [totalInvested, setTotalInvested] = useState(0);
  const [projectedValue, setProjectedValue] = useState(0);
  const [inflationAdjustedValue, setInflationAdjustedValue] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [selectedChart, setSelectedChart] = useState("line");

  useEffect(() => {
    calculateResults();
  }, [
    initialInvestment,
    monthlyInvestment,
    investmentTerm,
    expectedReturn,
    compoundingFrequency,
    inflationRate,
    taxRate,
  ]);

  const calculateResults = () => {
    const totalInvested =
      initialInvestment + monthlyInvestment * 12 * investmentTerm;
    setTotalInvested(totalInvested);

    const growthRate = expectedReturn / 100;
    const compoundingsPerYear =
      compoundingFrequency === "monthly"
        ? 12
        : compoundingFrequency === "quarterly"
        ? 4
        : 1;

    let yearlyData = [];
    let currentValue = initialInvestment;

    for (let year = 0; year <= investmentTerm; year++) {
      const yearlyContribution = year === 0 ? 0 : monthlyInvestment * 12;
      currentValue =
        (currentValue + yearlyContribution) *
        Math.pow(1 + growthRate / compoundingsPerYear, compoundingsPerYear);
      const inflationAdjustedValue =
        currentValue / Math.pow(1 + inflationRate / 100, year);

      yearlyData.push({
        year,
        projectedValue: Math.round(currentValue),
        inflationAdjustedValue: Math.round(inflationAdjustedValue),
        totalInvested: Math.round(
          initialInvestment + yearlyContribution * year
        ),
      });
    }

    setGraphData(yearlyData);
    setProjectedValue(currentValue);
    setInflationAdjustedValue(
      yearlyData[investmentTerm].inflationAdjustedValue
    );
  };

  const formatRupees = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderChart = () => {
    switch (selectedChart) {
      case "line":
        return (
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
            <Tooltip formatter={(value) => formatRupees(value)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="projectedValue"
              name="Projected Value"
              stroke="#8884d8"
            />
            <Line
              type="monotone"
              dataKey="inflationAdjustedValue"
              name="Inflation Adjusted Value"
              stroke="#82ca9d"
            />
            <Line
              type="monotone"
              dataKey="totalInvested"
              name="Total Invested"
              stroke="#ffc658"
            />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
            <Tooltip formatter={(value) => formatRupees(value)} />
            <Legend />
            <Bar
              dataKey="projectedValue"
              name="Projected Value"
              fill="#8884d8"
            />
            <Bar
              dataKey="inflationAdjustedValue"
              name="Inflation Adjusted Value"
              fill="#82ca9d"
            />
            <Bar dataKey="totalInvested" name="Total Invested" fill="#ffc658" />
          </BarChart>
        );
      case "pie":
        const pieData = [
          { name: "Projected Value", value: projectedValue },
          { name: "Inflation Adjusted Value", value: inflationAdjustedValue },
          { name: "Total Invested", value: totalInvested },
        ];
        const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatRupees(value)} />
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg relative"
      >
        <DialogPrimitive.Root>
          <DialogPrimitive.Trigger asChild>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-4 p-2 bg-blue-600 text-white rounded-full"
            >
              <ChartBar size={24} />
            </motion.button>
          </DialogPrimitive.Trigger>

          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 bg-black opacity-30" />
            <DialogPrimitive.Content className="fixed top-[50%] left-[50%] w-[90vw] max-w-[800px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
              <DialogPrimitive.Title className="text-2xl font-bold mb-4">
                Investment Growth Over Time
              </DialogPrimitive.Title>
              <div className="mb-4">
                <label className="mr-2">Chart Type:</label>
                <select
                  value={selectedChart}
                  onChange={(e) => setSelectedChart(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height="80%">
                {renderChart()}
              </ResponsiveContainer>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>

        <h1 className="text-3xl font-bold mb-8 text-blue-900">
          Investment Returns Calculator (in Rupees)
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-blue-700 font-medium mb-2">
              Initial Investment (₹):
            </label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="block w-full p-3 border border-blue-300 rounded-lg mb-2"
            />
            <input
              type="range"
              min="100000"
              max="10000000"
              step="10000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-blue-700 font-medium mb-2">
              Monthly Investment (₹):
            </label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="block w-full p-3 border border-blue-300 rounded-lg mb-2"
            />
            <input
              type="range"
              min="5000"
              max="1000000"
              step="5000"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-blue-700 font-medium mb-2">
              Investment Term (Years):
            </label>
            <input
              type="number"
              value={investmentTerm}
              onChange={(e) => setInvestmentTerm(Number(e.target.value))}
              className="block w-full p-3 border border-blue-300 rounded-lg mb-2"
            />
            <input
              type="range"
              min="1"
              max="30"
              value={investmentTerm}
              onChange={(e) => setInvestmentTerm(Number(e.target.value))}
              className="w-full"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-blue-700 font-medium mb-2">
              Expected Rate of Return (%):
            </label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="block w-full p-3 border border-blue-300 rounded-lg mb-2"
            />
            <input
              type="range"
              min="1"
              max="20"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-blue-700 font-medium mb-2">
              Compounding Frequency:
            </label>
            <select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(e.target.value)}
              className="block w-full p-3 border border-blue-300 rounded-lg mb-2"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-blue-700 font-medium mb-2">
              Inflation Rate (%):
            </label>
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="block w-full p-3 border border-blue-300 rounded-lg mb-2"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-blue-700 font-medium mb-2">
              Tax Rate (%):
            </label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="block w-full p-3 border border-blue-300 rounded-lg mb-2"
            />
          </motion.div>
        </div>

        <motion.div
          className="mb-8"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <label className="block text-blue-700 font-medium mb-2">
            Select a portfolio:
          </label>
          <div className="flex justify-between">
            {["low", "medium", "high"].map((risk) => (
              <motion.button
                key={risk}
                onClick={() => setPortfolioRisk(risk)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg w-1/3 text-center font-bold ${
                  portfolioRisk === risk
                    ? "bg-blue-600 text-white"
                    : "bg-blue-200 text-blue-800"
                }`}
              >
                {risk.charAt(0).toUpperCase() + risk.slice(1)} risk
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { label: "Total invested", value: totalInvested },
            { label: "Projected value (before taxes)", value: projectedValue },
            {
              label: "Inflation-adjusted value",
              value: inflationAdjustedValue,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-4 bg-blue-100 rounded-lg"
            >
              <p className="text-xl font-bold text-blue-700">{item.label}:</p>
              <p className="text-2xl font-bold text-blue-900">
                {formatRupees(item.value)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* <DialogPrimitive.Root>
          <DialogPrimitive.Trigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-3 bg-blue-600 text-white rounded-lg font-bold"
            >
              View Investment Graph
            </motion.button>
          </DialogPrimitive.Trigger>

          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 bg-black opacity-30" />
            <DialogPrimitive.Content className="fixed top-[50%] left-[50%] w-[90vw] max-w-[800px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
              <DialogPrimitive.Title className="text-2xl font-bold">
                Investment Growth Over Time
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-gray-600">
                This graph shows the projected growth of your investment over
                the specified term.
              </DialogPrimitive.Description>

              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    label={{
                      value: "Years",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) => `₹${value / 100000}L`}
                    label={{
                      value: "Amount (in Lakhs)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip formatter={(value) => formatRupees(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="projectedValue"
                    name="Projected Value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="inflationAdjustedValue"
                    name="Inflation Adjusted Value"
                    stroke="#82ca9d"
                  />
                  <Line
                    type="monotone"
                    dataKey="totalInvested"
                    name="Total Invested"
                    stroke="#ffc658"
                  />
                </LineChart>
              </ResponsiveContainer>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root> */}
      </motion.div>
    </div>
  );
};

export default InvestmentCalculator;
