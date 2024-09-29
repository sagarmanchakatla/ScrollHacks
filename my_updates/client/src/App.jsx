import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FinancialForm from "./components/FinantialHelp/FinantialHelp";
import LearnFinance from "./components/LearnFinance/LearnFinance";
import TopicDescription from "./components/LearnFinance/ModuleDescription/TopicDescription"; // New component for topic description
import ModuleQuiz from "./components/LearnFinance/ModuleQuiz/ModuleQuiz";
import Navbar from "./components/Navbar/Navbar";
import BusinessProposal from "./components/businessProposal/proposal"; // Import the new component
import InvestorsPage from "./components/investor/investor"; // Import the new component
import Calendar from './components/calender/calender';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/financialhelp" element={<FinancialForm />} />
        <Route path="/learnfinance" element={<LearnFinance />} />
        <Route path="/learnfinance/:id" element={<TopicDescription />} />
        <Route path="/modulequiz/:id" element={<ModuleQuiz />} />
        <Route path="/businessProposal" element={<BusinessProposal />} /> 
        <Route path="/investor" element={<InvestorsPage />} />
        
        {/* Calendar route */}
        <Route path="/accept-proposal" element={<Calendar />} />
        
        {/* Default route */}
        <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
