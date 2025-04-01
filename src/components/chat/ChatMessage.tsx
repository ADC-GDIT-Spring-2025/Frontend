import React from 'react';
import Markdown from 'react-markdown';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      
      <div 
      className={`max-w-[80%] rounded-lg p-4 ${ sender === 'user' ? 'bg-[#f9402b]/30 border border-[#f9402b] 50 ml-auto' : 'bg-black/30 border border-gray-500 mr-auto'}`}
      style = {{ 
        wordBreak: 'break-word',
        overflowWrap: 'break-word'
      }}>
            <Markdown>
              {message}
            </Markdown>
        </div>
      </div>
  );
};