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
          Investment Returns Calculator
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
      </motion.div>
    </div>
  );
};

export default InvestmentCalculator;
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import * as DialogPrimitive from "@radix-ui/react-dialog";
// import { ChartBar, HelpCircle, Download, DollarSign, Percent, Calendar } from "lucide-react";
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// const InvestmentCalculator = () => {
//   const [initialInvestment, setInitialInvestment] = useState(500000);
//   const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
//   const [investmentTerm, setInvestmentTerm] = useState(10);
//   const [portfolioRisk, setPortfolioRisk] = useState("balanced");
//   const [expectedReturn, setExpectedReturn] = useState(12);
//   const [compoundingFrequency, setCompoundingFrequency] = useState("monthly");
//   const [inflationRate, setInflationRate] = useState(6);
//   const [taxRate, setTaxRate] = useState(30);

//   const [totalInvested, setTotalInvested] = useState(0);
//   const [projectedValue, setProjectedValue] = useState(0);
//   const [inflationAdjustedValue, setInflationAdjustedValue] = useState(0);
//   const [graphData, setGraphData] = useState([]);
//   const [selectedChart, setSelectedChart] = useState("line");
//   const [showTooltip, setShowTooltip] = useState(false);

//   useEffect(() => {
//     calculateResults();
//   }, [
//     initialInvestment,
//     monthlyInvestment,
//     investmentTerm,
//     expectedReturn,
//     compoundingFrequency,
//     inflationRate,
//     taxRate,
//   ]);

//   const calculateResults = () => {
//     const totalInvested =
//       initialInvestment + monthlyInvestment * 12 * investmentTerm;
//     setTotalInvested(totalInvested);

//     const growthRate = expectedReturn / 100;
//     const compoundingsPerYear =
//       compoundingFrequency === "monthly"
//         ? 12
//         : compoundingFrequency === "quarterly"
//         ? 4
//         : 1;

//     let yearlyData = [];
//     let currentValue = initialInvestment;

//     for (let year = 0; year <= investmentTerm; year++) {
//       const yearlyContribution = year === 0 ? 0 : monthlyInvestment * 12;
//       currentValue =
//         (currentValue + yearlyContribution) *
//         Math.pow(1 + growthRate / compoundingsPerYear, compoundingsPerYear);
//       const inflationAdjustedValue =
//         currentValue / Math.pow(1 + inflationRate / 100, year);

//       yearlyData.push({
//         year,
//         projectedValue: Math.round(currentValue),
//         inflationAdjustedValue: Math.round(inflationAdjustedValue),
//         totalInvested: Math.round(
//           initialInvestment + yearlyContribution * year
//         ),
//       });
//     }

//     setGraphData(yearlyData);
//     setProjectedValue(currentValue);
//     setInflationAdjustedValue(
//       yearlyData[investmentTerm].inflationAdjustedValue
//     );
//   };

//   const formatRupees = (value) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(value);
//   };

//   const renderChart = () => {
//     const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

//     switch (selectedChart) {
//       case "line":
//         return (
//           <LineChart data={graphData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="year" />
//             <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
//             <Tooltip formatter={(value) => formatRupees(value)} />
//             <Legend />
//             <Line type="monotone" dataKey="projectedValue" name="Projected Value" stroke={COLORS[0]} />
//             <Line type="monotone" dataKey="inflationAdjustedValue" name="Inflation Adjusted Value" stroke={COLORS[1]} />
//             <Line type="monotone" dataKey="totalInvested" name="Total Invested" stroke={COLORS[2]} />
//           </LineChart>
//         );
//       case "bar":
//         return (
//           <BarChart data={graphData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="year" />
//             <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
//             <Tooltip formatter={(value) => formatRupees(value)} />
//             <Legend />
//             <Bar dataKey="projectedValue" name="Projected Value" fill={COLORS[0]} />
//             <Bar dataKey="inflationAdjustedValue" name="Inflation Adjusted Value" fill={COLORS[1]} />
//             <Bar dataKey="totalInvested" name="Total Invested" fill={COLORS[2]} />
//           </BarChart>
//         );
//       case "pie":
//         const pieData = [
//           { name: "Projected Value", value: projectedValue },
//           { name: "Inflation Adjusted Value", value: inflationAdjustedValue },
//           { name: "Total Invested", value: totalInvested },
//         ];
//         return (
//           <PieChart>
//             <Pie
//               data={pieData}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               outerRadius={80}
//               fill="#8884d8"
//               dataKey="value"
//               label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//             >
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip formatter={(value) => formatRupees(value)} />
//             <Legend />
//           </PieChart>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleDownload = () => {
//     const jsonData = JSON.stringify(graphData, null, 2);
//     const blob = new Blob([jsonData], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "investment_data.json";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-5xl mx-auto bg-white p-8 shadow-xl rounded-lg relative"
//       >
//         <h1 className="text-4xl font-bold mb-8 text-blue-900 text-center">
//           Smart Investment Returns Calculator
//         </h1>

//         {/* <Alert className="mb-6">
//           <AlertTitle>Pro Tip</AlertTitle>
//           <AlertDescription>
//             Diversifying your portfolio can help balance risk and potential returns. Consider a mix of stocks, bonds, and other assets based on your risk tolerance and financial goals.
//           </AlertDescription>
//         </Alert> */}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <label className="block text-blue-700 font-medium mb-2 flex items-center">
//               <DollarSign className="mr-2" size={20} />
//               Initial Investment (₹):
//             </label>
//             <input
//               type="number"
//               value={initialInvestment}
//               onChange={(e) => setInitialInvestment(Number(e.target.value))}
//               className="block w-full p-3 border border-blue-300 rounded-lg mb-2"
//             />
//             <input
//               type="range"
//               min="100000"
//               max="10000000"
//               step="10000"
//               value={initialInvestment}
//               onChange={(e) => setInitialInvestment(Number(e.target.value))}
//               className="w-full"
//             />
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <label className="block text-blue-700 font-medium mb-2 flex items-center">
//               <DollarSign className="mr-2" size={20} />
//               Monthly Investment (₹):
//             </label>
//             <input
//               type="number"
//               value={monthlyInvestment}
//               onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
//               className="block w-full p-3 border border-blue-300 rounded-lg mb-2"
//             />
//             <input
//               type="range"
//               min="5000"
//               max="1000000"
//               step="5000"
//               value={monthlyInvestment}
//               onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
//               className="w-full"
//             />
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <label className="block text-blue-700 font-medium mb-2 flex items-center">
//               <Calendar className="mr-2" size={20} />
//               Investment Term (Years):
//             </label>
//             <input
//               type="number"
//               value={investmentTerm}
//               onChange={(e) => setInvestmentTerm(Number(e.target.value))}
//               className="block w-full p-3 border border-blue-300 rounded-lg mb-2"
//             />
//             <input
//               type="range"
//               min="1"
//               max="30"
//               value={investmentTerm}
//               onChange={(e) => setInvestmentTerm(Number(e.target.value))}
//               className="w-full"
//             />
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <label className="block text-blue-700 font-medium mb-2 flex items-center">
//               <Percent className="mr-2" size={20} />
//               Expected Rate of Return (%):
//             </label>
//             <input
//               type="number"
//               value={expectedReturn}
//               onChange={(e) => setExpectedReturn(Number(e.target.value))}
//               className="block w-full p-3 border border-blue-300 rounded-lg mb-2"
//             />
//             <input
//               type="range"
//               min="1"
//               max="20"
//               value={expectedReturn}
//               onChange={(e) => setExpectedReturn(Number(e.target.value))}
//               className="w-full"
//             />
//           </motion.div>
//         </div>

//         <motion.div
//           className="mb-8"
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           <label className="block text-blue-700 font-medium mb-2">
//             Select your risk profile:
//           </label>
//           <div className="flex justify-between">
//             {["conservative", "balanced", "aggressive"].map((risk) => (
//               <motion.button
//                 key={risk}
//                 onClick={() => setPortfolioRisk(risk)}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`p-3 rounded-lg w-1/3 text-center font-bold ${
//                   portfolioRisk === risk
//                     ? "bg-blue-600 text-white"
//                     : "bg-blue-200 text-blue-800"
//                 }`}
//               >
//                 {risk.charAt(0).toUpperCase() + risk.slice(1)}
//               </motion.button>
//             ))}
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           {[
//             { label: "Total invested", value: totalInvested },
//             { label: "Projected value (before taxes)", value: projectedValue },
//             {
//               label: "Inflation-adjusted value",
//               value: inflationAdjustedValue,
//             },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.2 }}
//               className="p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg shadow-md"
//             >
//               <p className="text-xl font-bold text-blue-700">{item.label}:</p>
//               <p className="text-2xl font-bold text-blue-900">
//                 {formatRupees(item.value)}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         <DialogPrimitive.Root>
//           <DialogPrimitive.Trigger asChild>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full p-3 bg-blue-600 text-white rounded-lg font-bold mb-4 flex items-center justify-center"
//             >
//               <ChartBar className="mr-2" />
//               View Investment Graph
//             </motion.button>
//           </DialogPrimitive.Trigger>

//           <DialogPrimitive.Portal>
//             <DialogPrimitive.Overlay className="fixed inset-0 bg-black opacity-30" />
//             <DialogPrimitive.Content className="fixed top-[50%] left-[50%] w-[90vw] max-w-[800px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
//               <DialogPrimitive.Title className="text-2xl font-bold mb-4">
//                 Investment Growth Over Time
//               </DialogPrimitive.Title>
//               <div className="mb-4 flex justify-between items-center">
//                 <div>
//                   <label className="mr-2"></label>
// <div/>
//   <div/>
// <label className="mr-2">Select Chart Type:</label>
// <select
//   value={selectedChart}
//   onChange={(e) => setSelectedChart(e.target.value)}
//   className="border border-blue-300 rounded-lg p-2"
// >
//   <option value="line">Line Chart</option>
//   <option value="bar">Bar Chart</option>
//   <option value="pie">Pie Chart</option>
// </select>
// </div>
// <motion.button
// whileHover={{ scale: 1.05 }}
// whileTap={{ scale: 0.95 }}
// onClick={handleDownload}
// className="p-2 bg-green-500 text-white rounded-lg ml-4"
// >
// <Download className="mr-1" size={16} />
// Download Data
// </motion.button>
// </div>

// <div className="h-full">
// <ResponsiveContainer width="100%" height="100%">
// {renderChart()}
// </ResponsiveContainer>
// </div>

// <DialogPrimitive.Close asChild>
// <motion.button
// whileHover={{ scale: 1.05 }}
// whileTap={{ scale: 0.95 }}
// className="absolute top-4 right-4 text-gray-600"
// >
// ✕
// </motion.button>
// </DialogPrimitive.Close>
// </DialogPrimitive.Content>
// </DialogPrimitive.Portal>
// </DialogPrimitive.Root>
// </motion.div>
// </div>
// );
// };

// export default InvestmentCalculator;
