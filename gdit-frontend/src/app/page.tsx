"use client"; // needs to run as a React-client component

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, CircleArrowUp,Filter, Circle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { FilterDialog } from "./FilterDialog"
import { fetchLlamaResponse } from "@/lib/llamaApi"; 
import { ChatMessage } from "@/components/chat/ChatMessage"; 



export default function Home() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: { text: string; sender: "user" | "bot" } = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const botResponse = await fetchLlamaResponse(input);
      const botMessage: { text: string; sender: "user" | "bot" } = { text: botResponse, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }

    setInput(""); //clear input after
  };

  return (
    <div className="flex flex-col justify-between h-screen p-4 bg-neutral-900">
      
      <div className="flex justify-between items-center w-full text-white text-3xl">
        <h2>EmailMiner.ai</h2>
        <Button className="cursor-pointer hover:bg-praxisRed" onClick={() => setMessages([])}>
          Clear
        </Button>
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center items-center">
          <Mail color="#ffffff" size={50} />
          <h1 className="text-center text-5xl mr-2 text-white ml-4">Welcome to EmailMiner.ai</h1>
        </div>
        <h2 className="text-center text-xl text-gray-300">Stuck? Here are some example prompts...</h2>
        <div className="grid grid-flow-col grid-rows-2 gap-4">
          {[
            "Summarize the key points from the emails sent by Jeffrey Skilling.",
            "What were the most active hours or days for email exchanges?",
            "List all emails exchanged between Jeffrey Skilling and Andy Fastow.",
            "What was the sentiment of emails discussing stock price?",
          ].map((example, index) => (
            <Button key={index} className="w-full cursor-pointer bg-neutral-800 text-white" onClick={() => setInput(example)}>
              {example}
            </Button>
          ))}
        </div>
      </div>

      {/* Chatbot Section */}
      <div className="flex flex-col items-center justify-between h-1/2 overflow-y-auto w-full max-w-2xl mx-auto bg-neutral-800 p-4 rounded-md">
        {/* Message Display */}
        <div className="flex-grow overflow-y-auto w-full">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.text} sender={msg.sender} />
          ))}
        </div>

        {/* Input Section */}
        <div className="border-2 border-solid w-full rounded-md bg-neutral-800 border-black p-2">
          <Input
            placeholder="Enter your prompt here..."
            className="mb-2 focus-visible:ring-0 !border-none shadow-none text-white placeholder:text-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()} 
          />
          <div className="flex justify-between items-center w-full">
          <FilterDialog />

          <CircleArrowUp color="#888888" size={38} strokeWidth={1.5} className="cursor-pointer mr-2 mb-2" onClick={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}
