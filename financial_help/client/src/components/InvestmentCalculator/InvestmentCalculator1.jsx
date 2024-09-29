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
import { ChartBar, DollarSign, Percent, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(500000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [investmentTerm, setInvestmentTerm] = useState(10);
  const [portfolioRisk, setPortfolioRisk] = useState("balanced");
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
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

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
              stroke={COLORS[0]}
            />
            <Line
              type="monotone"
              dataKey="inflationAdjustedValue"
              name="Inflation Adjusted Value"
              stroke={COLORS[1]}
            />
            <Line
              type="monotone"
              dataKey="totalInvested"
              name="Total Invested"
              stroke={COLORS[2]}
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
              fill={COLORS[0]}
            />
            <Bar
              dataKey="inflationAdjustedValue"
              name="Inflation Adjusted Value"
              fill={COLORS[1]}
            />
            <Bar
              dataKey="totalInvested"
              name="Total Invested"
              fill={COLORS[2]}
            />
          </BarChart>
        );
      case "pie":
        const pieData = [
          { name: "Projected Value", value: projectedValue },
          { name: "Inflation Adjusted Value", value: inflationAdjustedValue },
          { name: "Total Invested", value: totalInvested },
        ];
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
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-900">
            Smart Investment Returns Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="initial-investment" className="flex items-center">
                <DollarSign className="mr-2" size={20} />
                Initial Investment (₹)
              </Label>
              <Input
                id="initial-investment"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="mb-2"
              />
              <Slider
                min={100000}
                max={10000000}
                step={10000}
                value={[initialInvestment]}
                onValueChange={([value]) => setInitialInvestment(value)}
              />
            </div>

            <div>
              <Label htmlFor="monthly-investment" className="flex items-center">
                <DollarSign className="mr-2" size={20} />
                Monthly Investment (₹)
              </Label>
              <Input
                id="monthly-investment"
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="mb-2"
              />
              <Slider
                min={5000}
                max={1000000}
                step={5000}
                value={[monthlyInvestment]}
                onValueChange={([value]) => setMonthlyInvestment(value)}
              />
            </div>

            <div>
              <Label htmlFor="investment-term" className="flex items-center">
                <Calendar className="mr-2" size={20} />
                Investment Term (Years)
              </Label>
              <Input
                id="investment-term"
                type="number"
                value={investmentTerm}
                onChange={(e) => setInvestmentTerm(Number(e.target.value))}
                className="mb-2"
              />
              <Slider
                min={1}
                max={30}
                value={[investmentTerm]}
                onValueChange={([value]) => setInvestmentTerm(value)}
              />
            </div>

            <div>
              <Label htmlFor="expected-return" className="flex items-center">
                <Percent className="mr-2" size={20} />
                Expected Rate of Return (%)
              </Label>
              <Input
                id="expected-return"
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="mb-2"
              />
              <Slider
                min={1}
                max={20}
                value={[expectedReturn]}
                onValueChange={([value]) => setExpectedReturn(value)}
              />
            </div>
          </div>

          <div className="mb-8">
            <Label>Select your risk profile</Label>
            <div className="flex justify-between mt-2">
              {["conservative", "balanced", "aggressive"].map((risk) => (
                <Button
                  key={risk}
                  onClick={() => setPortfolioRisk(risk)}
                  variant={portfolioRisk === risk ? "default" : "outline"}
                  className="w-1/3"
                >
                  {risk.charAt(0).toUpperCase() + risk.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { label: "Total invested", value: totalInvested },
              {
                label: "Projected value (before taxes)",
                value: projectedValue,
              },
              {
                label: "Inflation-adjusted value",
                value: inflationAdjustedValue,
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-lg font-semibold text-blue-700">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatRupees(item.value)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <ChartBar className="mr-2" />
                View Investment Graph
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[600px]">
              <DialogHeader>
                <DialogTitle>Investment Growth Over Time</DialogTitle>
              </DialogHeader>
              <div className="mb-4 flex justify-between items-center">
                <Select
                  value={selectedChart}
                  onValueChange={(value) => setSelectedChart(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentCalculator;
