import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Shield, Target } from 'lucide-react';

const Card = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
    <div className="p-3 rounded-full bg-purple-100">
      <Icon className="w-8 h-8 text-purple-600" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const portfolioData = [
  { name: 'Stocks', value: 45 },
  { name: 'Bonds', value: 30 },
  { name: 'Real Estate', value: 15 },
  { name: 'Cryptocurrencies', value: 10 },
];

const investmentData = [
  { year: '2020', amount: 10000 },
  { year: '2021', amount: 15000 },
  { year: '2022', amount: 22000 },
  { year: '2023', amount: 30000 },
  { year: '2024', amount: 40000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const FinancialPlanDashboard = () => {
  return (
    <div className="bg-gray-100 p-8 rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Personalized Financial Plan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Net Worth" value="$250,000" icon={DollarSign} />
        <Card title="Annual Savings" value="$30,000" icon={TrendingUp} />
        <Card title="Risk Tolerance" value="Moderate" icon={Shield} />
        <Card title="Primary Goal" value="Retirement" icon={Target} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Portfolio Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Investment Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={investmentData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" name="Investment Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Key Recommendations</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Increase your emergency fund to cover 6 months of expenses</li>
          <li>Maximize contributions to your 401(k) and IRA</li>
          <li>Consider diversifying your portfolio with international stocks</li>
          <li>Review and adjust your insurance coverage annually</li>
          <li>Start planning for long-term care needs</li>
        </ul>
      </div>
    </div>
  );
};

export default FinancialPlanDashboard;