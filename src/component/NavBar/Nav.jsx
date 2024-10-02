import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">MyApp</Link>
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
                to="/projectList"
                className="block text-gray-200 hover:text-white px-4 py-2 lg:inline-block"
              >
                Project List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
