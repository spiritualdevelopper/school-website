// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600">MPPS Velmagudem</div>
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li>
            <Link to="hero" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500">
              About
            </Link>
          </li>
          <li>
            <Link to="features" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500">
              Features
            </Link>
          </li>
          <li>
            <Link to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
