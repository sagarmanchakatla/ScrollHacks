import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white px-4 py-2">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-blue-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/financialhelp" className="hover:text-blue-300">
            Financial Help
          </Link>
        </li>
        <li>
          <Link to="/learnfinance" className="hover:text-blue-300">
            Learn Finance
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
