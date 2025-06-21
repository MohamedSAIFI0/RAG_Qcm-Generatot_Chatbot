import React from 'react';
import { Download, Trash2, MessageSquare, Plus } from 'lucide-react';
import { Conversation } from '../types';
import { generatePDF } from '../utils/pdfGenerator';

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onClearHistory: () => void;
  onNewConversation: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  conversations, 
  currentConversationId, 
  onSelectConversation, 
  onClearHistory,
  onNewConversation 
}) => {
  const handleDownloadPDF = () => {
    const currentConversation = conversations.find(conv => conv.id === currentConversationId);
    if (currentConversation) {
      generatePDF(currentConversation.messages);
    }
  };

  return (
    <div className="w-72 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onNewConversation}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors"
        >
          <Plus size={16} />
          <span>Nouvelle conversation</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {conversations.map(conversation => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                conversation.id === currentConversationId
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare size={16} className="flex-shrink-0" />
                <span className="text-sm font-medium truncate">{conversation.title}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(conversation.updatedAt).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button
          onClick={handleDownloadPDF}
          disabled={!currentConversationId}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download size={16} />
          <span>Télécharger le PDF</span>
        </button>
        
        <button
          onClick={onClearHistory}
          disabled={conversations.length === 0}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Trash2 size={16} />
          <span>Effacer l'historique</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;