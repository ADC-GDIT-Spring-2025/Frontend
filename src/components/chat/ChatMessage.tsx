import React from 'react';
import Markdown from 'react-markdown';
import Image from 'next/image';
import { User } from 'lucide-react'

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      {/* Bot Icon */}
      {sender == 'bot' && (
        <div className="w-8 h-8 rounded-full overflow-hidden mt-3 mr-3">
          <Image src="/image.png" alt="Bot Icon" width={32} height={32} className="object-cover" />
          </div>
      )}
      {/* Message Box */}
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
        {/* User Icon */}
        {sender == 'user' && (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mt-3 ml-3">
          <User />
          </div>
      )}
      </div>
  );
};