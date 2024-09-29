import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  DollarSign,
  BookOpen,
  Umbrella,
  FileText,
  Calculator,
  Briefcase,
  Users,
  Calendar,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  // Add new routes to the navItems array
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
    // New Routes
    { icon: Briefcase, label: "Business Proposal", to: "/businessProposal" },
    { icon: Users, label: "Investors", to: "/investor" },
    { icon: Calendar, label: "Accept Proposal", to: "/accept-proposal" },
  ];

  return (
    <div
      className={`bg-white h-screen shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      } ${
        isOpen ? "translate-x-0" : "-translate-x-48 sm:translate-x-0"
      } fixed left-0 top-0 z-30`}
    >
      <div className="p-4 flex justify-between items-center">
        {isOpen && (
          <>
            <DollarSign size={32} className="text-purple-600" />
            <span className="text-xl font-bold text-gray-800">Fin-Lit</span>
          </>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-200 sm:block hidden"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        {isOpen && (
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-200 sm:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index} onClick={toggleSidebar}>
              <Link
                to={item.to}
                className={`flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 ${
                  isOpen ? "justify-start space-x-4" : "justify-center"
                } ${location.pathname === item.to ? "bg-gray-200" : ""}`}
              >
                <item.icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
