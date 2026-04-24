import { useDarkMode } from '../context/ThemeContext';
import React from 'react';

const DarkModeButton = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className="fixed bottom-4 right-4 z-50">
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`px-5 py-2 rounded-md font-medium cursor-pointer transition-all duration-300 
        ${darkMode 
          ? 'bg-white text-gray-700 hover:bg-white/20' 
          : 'bg-gray-800 text-white hover:bg-amber-100'}
        shadow-md hover:shadow-lg`}
    >
      {darkMode ? '☀️ Light Mode' : '🌑 Dark Mode'}
    </button>
  </div>

  );
};

export default DarkModeButton;
