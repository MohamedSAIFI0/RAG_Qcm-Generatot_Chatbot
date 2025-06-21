import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div 
        className={`max-w-[75%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-indigo-600 dark:bg-indigo-500 text-white rounded-tr-none' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
        }`}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p>
        <div className={`text-xs ${isUser ? 'text-indigo-200 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'} mt-1`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;