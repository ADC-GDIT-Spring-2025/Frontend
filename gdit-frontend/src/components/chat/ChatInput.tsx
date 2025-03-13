import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow border border-input rounded-md px-3 py-1"
        placeholder="Type your message..."
      />
      <button onClick={handleSend} className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Send
      </button>
    </div>
  );
};
