import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FinancialForm from "./components/FinantialHelp/FinantialHelp";
import LearnFinance from "./components/LearnFinance/LearnFinance";
import TopicDescription from "./components/LearnFinance/ModuleDescription/TopicDescription"; // New component for topic description
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/financialhelp" element={<FinancialForm />} />
        <Route path="/learnfinance" element={<LearnFinance />} />
        <Route path="/learnfinance/:id" element={<TopicDescription />} />{" "}
        {/* Add dynamic route */}
      </Routes>
    </Router>
  );
};

export default App;
