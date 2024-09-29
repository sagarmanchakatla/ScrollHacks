import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FinancialForm from "./components/FinantialHelp/FinantialHelp";
import LearnFinance from "./components/LearnFinance/LearnFinance";
import TopicDescription from "./components/LearnFinance/ModuleDescription/TopicDescription";
import ModuleQuiz from "./components/LearnFinance/ModuleQuiz/ModuleQuiz";
import Sidebar from "./components/Sidebar/Sidebar"; // Import the new Sidebar component
import Insurance from "./components/Insurances/Insurance";
import MySchemePortal from "./components/SchemaPortal/MySchemePortal";
import InvestmentCalculator from "./components/InvestmentCalculator/InvestmentCalculator";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-16 p-4">
          {" "}
          {/* Adjust ml-16 to ml-64 when sidebar is expanded */}
          <Routes>
            <Route path="/financialhelp" element={<FinancialForm />} />
            <Route path="/learnfinance" element={<LearnFinance />} />
            <Route path="/learnfinance/:id" element={<TopicDescription />} />
            <Route path="/modulequiz/:id" element={<ModuleQuiz />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/yojna" element={<MySchemePortal />} />
            <Route
              path="/investment-calculator"
              element={<InvestmentCalculator />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
