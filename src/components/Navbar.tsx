
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    localStorage.setItem('darkMode', newIsDark.toString());
    document.documentElement.classList.toggle('dark', newIsDark);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 sm:h-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        <NavLink to="/" className="text-xl font-bold">Happy Birthday</NavLink>
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/" className="hover:text-gray-500 transition-colors">Home</NavLink>
          <NavLink to="/wishes" className="hover:text-gray-500 transition-colors">Wishes</NavLink>
          <NavLink to="/gallery" className="hover:text-gray-500 transition-colors">Gallery</NavLink>
          <NavLink to="/music" className="hover:text-gray-500 transition-colors">Music</NavLink>
          <NavLink to="/memories" className="hover:text-gray-500 transition-colors">Memories</NavLink>
          <NavLink to="/about" className="hover:text-gray-500 transition-colors">About</NavLink>
          <button onClick={toggleDarkMode} className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            {isDarkMode ? '🌞' : '🌚'}
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-4">
          <NavLink to="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/wishes" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Wishes</NavLink>
          <NavLink to="/gallery" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Gallery</NavLink>
          <NavLink to="/music" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Music</NavLink>
          <NavLink to="/memories" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Memories</NavLink>
          <NavLink to="/about" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>About</NavLink>
          <div className="px-4 mt-4">
            <button onClick={toggleDarkMode} className="w-full py-2 rounded-md bg-gray-200 dark:bg-gray-700">
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
