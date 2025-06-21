import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 animate-pulse p-3 rounded-lg bg-gray-50 dark:bg-gray-800 max-w-[70%]">
      <Loader2 className="h-4 w-4 animate-spin" />
      <p className="text-sm">Jean Jaurès réfléchit...</p>
    </div>
  );
};

export default LoadingIndicator;