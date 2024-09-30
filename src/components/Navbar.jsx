import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-8"
              src="https://via.placeholder.com/50" // Replace with your logo
              alt="Logo"
            />
            <span className="text-white ml-2 text-xl font-semibold">BrandName</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-4">
            <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </a>
            <a href="courses" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Courses
            </a>
            <a href="portfolio" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Portfolio
            </a>
            <a href="tools" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Tools
            </a>
            <a href="newspage" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              News
            </a>
            <a href="events" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Events
            </a>
            <a href="contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Contact Us
            </a>
          </div>

          {/* Login Button */}
          <div className="hidden md:flex items-center">
            <a
              href="login"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Login / Sign In
            </a>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#home"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#courses"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Courses
            </a>
            <a
              href="#portfolio"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Portfolio
            </a>
            <a
              href="#news"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              News
            </a>
            <a
              href="events"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Events
            </a>
            <a
              href="#contact"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Contact Us
            </a>
            <a
              href="login"
              className="block text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Login / Sign In
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
