import React from 'react';
import Markdown from 'react-markdown';
import Image from 'next/image';
import { User } from 'lucide-react'
import MarkdownTypedRenderer from '../ui/MarkdownTypedRenderer';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  message: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, message }) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {/* Bot Icon */}
      {role == 'assistant' && (
        <div className="w-8 h-8 rounded-full overflow-hidden mt-3 mr-3">
          <Image src="/image.png" alt="Bot Icon" width={32} height={32} className="object-cover" />
          </div>
      )}
      {/* Message Box */}
      <div 
      className={`text-white max-w-[80%] rounded-lg p-4 ${ role === 'user' ? 'bg-[#f9402b]/30 border border-[#f9402b] 50 ml-auto' : 'bg-black/30 border border-gray-500 mr-auto'}`}
      style = {{ 
        wordBreak: 'break-word',
        overflowWrap: 'break-word'
      }}>
            <p>{message}</p>
        </div>
        {/* User Icon */}
        {role == 'user' && (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mt-3 ml-3">
          <User />
          </div>
      )}
      </div>
  );
};
