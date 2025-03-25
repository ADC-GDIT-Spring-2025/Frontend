import React from 'react';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  const messageStyle =
    sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground';
  return (
    <div className={`p-2 my-2 rounded-md ${messageStyle}`}>
      <p>{message}</p>
    </div>
  );
};