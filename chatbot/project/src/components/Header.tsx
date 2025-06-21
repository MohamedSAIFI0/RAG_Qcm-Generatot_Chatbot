import React from 'react';
import { Zap, Sun, Moon, Menu } from 'lucide-react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle, onMenuClick, isSidebarOpen }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 sticky top-0 z-10 transition-colors duration-200">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <button
            onClick={onMenuClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-indigo-600 dark:bg-indigo-500 p-1.5 rounded-lg text-white">
              <Zap size={18} />
            </div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Jean Jaures</h1>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
        </div>
      </div>
    </header>
  );
};

export default Header;