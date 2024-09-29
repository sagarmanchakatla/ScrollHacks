import React from "react";
import { DollarSign, Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white shadow-md py-4 md:px-20 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <DollarSign size={32} className="text-purple-600" />
        <span className="text-xl font-bold text-gray-800">Fin-Lit</span>
      </div>
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-gray-100 lg:block"
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>
    </nav>
  );
};

export default Navbar;
