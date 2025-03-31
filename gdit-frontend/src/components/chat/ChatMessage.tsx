import React from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  message: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, role }) => {
  const messageStyle =
    role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground';
  return (
    <div className={`p-2 my-2 rounded-md ${messageStyle}`}>
      <p>{message}</p>
    </div>
  );
};
