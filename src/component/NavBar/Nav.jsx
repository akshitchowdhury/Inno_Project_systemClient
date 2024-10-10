import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-black p-4 h-[100px] flex items-center">
      <div className="container mx-auto flex justify-between  items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Admin Dashboard</Link>
        </div>

        {/* Hamburger icon */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-200 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <ul className="lg:flex lg:space-x-4">
            <li>
              <Link
                to="/"
                className="block text-gray-200 hover:text-white px-4 py-2 lg:inline-block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/userlist"
                className="block text-gray-200 hover:text-white px-4 py-2 lg:inline-block"
              >
                User List
              </Link>
            </li>
            <li>
              <Link
                to="/taskManage"
                className="block text-gray-200 hover:text-white px-4 py-2 lg:inline-block"
              >
                Task Manager
              </Link>
            </li>
            <li>
              <Link
                to="/attendanceTracker"
                className="block text-gray-200 hover:text-white px-4 py-2 lg:inline-block"
              >
                Attendance
              </Link>
            </li>
            <li>
              <Link
                to="/projectList"
                className="block text-gray-200 hover:text-white px-4 py-2 lg:inline-block"
              >
                Project List
              </Link>
            </li>
            <li
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="block text-gray-200 hover:text-white px-4 py-2 lg:inline-block cursor-pointer">
        Mail
      </span>

      {isOpen && (
        <div className="absolute -left-24 bg-gray-700 text-gray-200 py-2 rounded-lg shadow-lg w-40">
          <Link
            to="/receiveMail"
            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
          >
            Check Mail
          </Link>
          <Link
            to="/sendMail"
            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
          >
            Send Mail
          </Link>
        </div>
      )}
    </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
