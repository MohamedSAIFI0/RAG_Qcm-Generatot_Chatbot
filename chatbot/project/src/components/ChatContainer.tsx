import React, { useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';
import { Message } from '../types';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading, error }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-screen-lg mx-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mb-4">
              <Zap className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
            Commencez une conversation avec Jean Jaurès
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Tapez un message ci-dessous pour interagir avec Jean Jaurès
              </p>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </>
        )}
        
        {isLoading && <LoadingIndicator />}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg my-4">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer;