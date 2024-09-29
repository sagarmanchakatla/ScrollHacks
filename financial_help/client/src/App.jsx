import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FinancialForm from "./components/FinantialHelp/FinantialHelp";
import LearnFinance from "./components/LearnFinance/LearnFinance";
import TopicDescription from "./components/LearnFinance/ModuleDescription/TopicDescription";
import ModuleQuiz from "./components/LearnFinance/ModuleQuiz/ModuleQuiz";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar"; // Import the new Navbar component
import Insurance from "./components/Insurances/Insurance";
import MySchemePortal from "./components/SchemaPortal/MySchemePortal";
import InvestmentCalculator from "./components/InvestmentCalculator/InvestmentCalculator";
import Dashboard from "./components/FinantialHelp/Dashboard";
import BusinessProposal from "./components/businessProposal/proposal"; // Import the new component
import InvestorsPage from "./components/investor/investor"; // Import the new component
import Calendar from "./components/calender/calender";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main
            className={`flex-1 p-4 transition-all duration-300 ${
              isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
            }`}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
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
              <Route path="/businessProposal" element={<BusinessProposal />} />
              <Route path="/investor" element={<InvestorsPage />} />

              {/* Calendar route */}
              <Route path="/accept-proposal" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
