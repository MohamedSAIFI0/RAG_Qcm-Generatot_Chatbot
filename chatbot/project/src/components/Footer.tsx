import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 px-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-screen-lg mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {currentYear} Jean Jaures. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;