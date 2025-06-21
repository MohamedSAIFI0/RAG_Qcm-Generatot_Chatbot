import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import Footer from './components/Footer';
import { Message, ChatState, Theme, Conversation } from './types';
import { sendPromptToOllama } from './services/ollamaService';

function App() {
  const [chatState, setChatState] = useState<ChatState>(() => {
    const savedState = localStorage.getItem('chatState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return {
        ...parsed,
        isLoading: false,
        error: null
      };
    }
    return {
      conversations: [],
      currentConversationId: null,
      isLoading: false,
      error: null
    };
  });

  const [theme, setTheme] = useState<Theme>('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('chatState', JSON.stringify({
      conversations: chatState.conversations,
      currentConversationId: chatState.currentConversationId
    }));
  }, [chatState.conversations, chatState.currentConversationId]);

  const getCurrentConversation = () => {
    return chatState.conversations.find(conv => conv.id === chatState.currentConversationId);
  };

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setChatState(prevState => ({
      ...prevState,
      conversations: [...prevState.conversations, newConversation],
      currentConversationId: newConversation.id
    }));
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      createdAt: new Date()
    };

    const currentConversation = getCurrentConversation();
    if (!currentConversation && chatState.conversations.length === 0) {
      createNewConversation();
    }

    setChatState(prevState => {
      const updatedConversations = prevState.conversations.map(conv => {
        if (conv.id === prevState.currentConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, userMessage],
            title: conv.messages.length === 0 ? content.slice(0, 30) + '...' : conv.title,
            updatedAt: new Date()
          };
        }
        return conv;
      });

      return {
        ...prevState,
        conversations: updatedConversations,
        isLoading: true,
        error: null
      };
    });

    try {
      const response = await sendPromptToOllama(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        createdAt: new Date()
      };

      setChatState(prevState => {
        const updatedConversations = prevState.conversations.map(conv => {
          if (conv.id === prevState.currentConversationId) {
            return {
              ...conv,
              messages: [...conv.messages, assistantMessage],
              updatedAt: new Date()
            };
          }
          return conv;
        });

        return {
          ...prevState,
          conversations: updatedConversations,
          isLoading: false
        };
      });
    } catch (error) {
      setChatState(prevState => ({
        ...prevState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      }));
    }
  };

  const handleClearHistory = () => {
    setChatState({
      conversations: [],
      currentConversationId: null,
      isLoading: false,
      error: null
    });
  };

  const handleSelectConversation = (conversationId: string) => {
    setChatState(prevState => ({
      ...prevState,
      currentConversationId: conversationId
    }));
    setIsSidebarOpen(false);
  };

  const currentConversation = getCurrentConversation();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div 
        className={`fixed top-0 left-0 h-full w-72 z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-72'
        }`}
      >
        <Sidebar 
          conversations={chatState.conversations}
          currentConversationId={chatState.currentConversationId}
          onSelectConversation={handleSelectConversation}
          onClearHistory={handleClearHistory}
          onNewConversation={createNewConversation}
        />
      </div>
      
      <div 
        className="flex-1 flex flex-col"
        onClick={() => setIsSidebarOpen(false)}
      >
        <Header 
          theme={theme} 
          onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          onMenuClick={(e) => {
            e.stopPropagation();
            setIsSidebarOpen(!isSidebarOpen);
          }}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="flex-1 flex flex-col min-h-0">
          <ChatContainer 
            messages={currentConversation?.messages || []}
            isLoading={chatState.isLoading}
            error={chatState.error}
          />
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 transition-colors duration-200">
            <div className="max-w-screen-lg mx-auto">
              <ChatInput 
                onSendMessage={handleSendMessage} 
                isLoading={chatState.isLoading} 
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;