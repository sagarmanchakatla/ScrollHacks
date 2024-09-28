import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  DollarSign,
  BookOpen,
  Umbrella,
  FileText,
  Calculator,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", to: "/" },
    { icon: DollarSign, label: "Financial Help", to: "/financialhelp" },
    { icon: BookOpen, label: "Learn Finance", to: "/learnfinance" },
    { icon: Umbrella, label: "Insurance", to: "/insurance" },
    { icon: FileText, label: "My-Yojna", to: "/yojna" },
    {
      icon: Calculator,
      label: "Investment Calculator",
      to: "/investment-calculator",
    },
  ];

  return (
    <div
      className={`bg-white h-screen shadow-lg transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      } flex flex-col`}
    >
      <div className="p-4 flex justify-between items-center">
        {isExpanded && <h2 className="text-xl font-bold">FinPlanPro</h2>}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className={`flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 ${
                  isExpanded ? "justify-start space-x-4" : "justify-center"
                } ${location.pathname === item.to ? "bg-gray-200" : ""}`}
              >
                <item.icon size={20} />
                {isExpanded && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
