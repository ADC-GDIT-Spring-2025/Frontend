import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { fetchLlamaResponse } from '@/lib/llamaApi';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (message: string) => {
    const userMessage: Message = { text: message, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const botResponse = await fetchLlamaResponse(message);
      const botMessage: Message = { text: botResponse, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} sender={msg.sender} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
};
