'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, Filter, Pencil, Info } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/styleselect"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";

type ChatMessageType = {
  role: "user" | "assistant";
  message: string;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [thread, setThread] = useState<ChatMessageType[]>([]);
  const [startedChat, setStartedChat] = useState(false);

  // Create a ref for the messages container
  const latestMessageRef = useRef<HTMLDivElement>(null);



  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    latestMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  // Trigger scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [thread]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setInput("")

    // Add user message to the thread
    const userMessage: ChatMessageType = { role: "user", message: input };
    setThread((prev) => [...prev, userMessage]);
    setStartedChat(true);

    try {
      console.log("Sending message:", input);
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input })
      });

      let data = await response.json();

      if (!response.ok) {
        data = "Error fetching llama response:" + data.error;
        console.error(data);
      }

      console.log(data);


      // Add assistant message to the thread
      const botResponse = data["llm_response"]
      setThread((prev) => [...prev, { role: "assistant", message: botResponse }]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }

  };

  const handleClear = async () => {
    setThread([]); // Clear messages
    setStartedChat(false); // Reset startedChat to false

    // signal backend to clear its own thread
    const response = await fetch('http://localhost:8080/clear', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data.message);
  }

  useEffect(() => {
    handleClear();
  }, []);



  return (
    <div className="min-h-screen relative flex flex-col text-white overflow-hidden">
      <div className="absolute w-full h-full bg-[url('/gradient.png')] bg-cover bg-no-repeat brightness-50 z-[-5]"></div>
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 z-10 bg-black/50 backdrop-blur-md">
        {/* Clear Messages Button in the top-left */}
        <Button
          variant="destructive"
          className="cursor-pointer ml"
          onClick={handleClear}
        >
          Clear Messages
        </Button>

        {/* Logo in the top-right */}
        <div className="flex items-center mr-2">
          <img
            src="/praxis_engineering_dark_mode_logo.png"
            alt="Praxis Engineering Logo"
            className="h-10 object-contain"
          />
        </div>
      </div>
      <main className="flex-1 flex flex-col">
        {!startedChat ? (
        <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center space-y-2 relative">
            <div className="absolute -right-16 top-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" className="bg-black/30 hover:gray/40 text-white/45 rounded-full h-10 w-10">
                    <Info className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>About EmailMiner.ai</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>EmailMiner.ai is an AI-powered tool that helps you analyze and understand email communications.</p>
                    <p>Key features:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Summarize key points from email threads</li>
                      <li>Track communication patterns between individuals</li>
                      <li>Analyze sentiment and tone of conversations</li>
                      <li>Generate insights from large email datasets</li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <h2 className="text-2xl font-medium text-[#E8C0BC] opacity-45">Welcome to</h2>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#E8C0BC] opacity-45">EmailMiner.ai</h1>
          </div>

        <div className="w-full max-w-6xl space-y-8 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-black/30 flex flex-col justify-center h-24 border-gray-500 backdrop-blur-sm hover:bg-black/40 transition-colors">
              <CardContent className="cursor-pointer" onClick={() => setInput("Summarize the key points from the emails sent by Jeffrey Skilling.")}>
                <h3 className="text-xl text-gray-100 font-semibold mb-2">Summarize the key points</h3>
                <p className="text-gray-300 text-sm">from the emails sent by Jeffrey Skilling.</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 flex flex-col justify-center h-24 border-gray-500 backdrop-blur-sm hover:bg-black/40 transition-colors">
              <CardContent className="cursor-pointer" onClick={() => setInput("List all emails exchanged between Jeffrey Skilling and Andy Fastow.")}>
                <h3 className="text-xl text-gray-100 font-semibold mb-2">List all emails exchanged</h3>
                <p className="text-gray-300 text-sm">between Jeffrey Skilling and Andy Fastow.</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 flex flex-col justify-center h-24 border-gray-500 backdrop-blur-sm hover:bg-black/40 transition-colors">
              <CardContent className="cursor-pointer" onClick={() => setInput("Analyze the sentiment of emails discussing the stock prices.")}>
                <h3 className="text-xl text-gray-100 font-semibold mb-2">Analyze the sentiment</h3>
                <p className="text-gray-300 text-sm">of emails discussing the stock prices.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      ) : (
        <div className="flex-1 pt-10 pb-[120px] mt-9 overflow-auto max-h-full flex-col-reverse">
          <div className="max-w-6xl mx-auto space-y-4">
            {thread.map((msg, index) => (
              <div ref={index === thread.length - 2 ? latestMessageRef : null} key = {index}>
                <ChatMessage message={msg.message} role={msg.role} />
              </div>

            ))}

          </div>
        </div>
      )}

        {/* Fixing input at the bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md p-3">
          <div className="flex flex-col justify-end md:flex-row gap-4 items-end max-w-6xl mx-auto">

            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" className="bg-[#f9402b] hover:bg-[#A04840] text-white rounded-full h-12 w-12 cursor-pointer">
                  <Filter size={24} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 border-gray-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filter Emails</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">From</label>
                      <Input
                        placeholder="Sender email address"
                        className="bg-black/30 border-gray-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">To</label>
                      <Input
                        placeholder="Recipient email address"
                        className="bg-black/30 border-gray-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">CC</label>
                      <Input
                        placeholder="CC email address"
                        className="bg-black/30 border-gray-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">BCC</label>
                      <Input
                        placeholder="BCC email address"
                        className="bg-black/30 border-gray-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Date Range</label>
                      <div className="flex gap-2">
                        <Input
                          type="date"
                          className="bg-black/30 border-gray-500 text-white"
                        />
                        <Input
                          type="date"
                          className="bg-black/30 border-gray-500 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Contains Keywords</label>
                      <Input
                        placeholder="Search terms"
                        className="bg-black/30 border-gray-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Has Attachment</label>
                      <Select>
                        <SelectTrigger className="bg-black/30 border-gray-500 text-white w-full">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="any">Any</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Add checkboxes for Neo4J and Qdrant */}
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="neo4j"
                        className="h-4 w-4 text-[#f9402b] border-gray-500 bg-black/30 focus:ring-[#f9402b]"
                      />
                      <label htmlFor="neo4j" className="ml-2 text-sm font-medium text-white">
                        Neo4J
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="qdrant"
                        className="h-4 w-4 text-[#f9402b] border-gray-500 bg-black/30 focus:ring-[#f9402b]"
                      />
                      <label htmlFor="qdrant" className="ml-2 text-sm font-medium text-white">
                        Qdrant
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-transparent border-gray-500 text-white hover:bg-black/30">
                        Reset
                      </Button>
                    </DialogTrigger>
                    <Button className="bg-[#f9402b] hover:bg-[#A04840] text-white border-none">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex-1 relative">
              <h2 className="text-zinc-400" >Character Count: {input.length} / 150</h2>
              <textarea
                placeholder="Enter a prompt..."
                className=" bg-black/30 border border-gray-500 pl-4 py-3 placeholder:text-gray-400 w-full rounded-md overflow-y-auto focus:outline-none focus:ring-1 focus:ring-gray-400"
                value={input}
                onChange={(e) => {
                  if (input.length < 150) {
                    setInput(e.target.value);
                  }




                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
                }}

                onKeyDown={(e) => {
                  // if (e.key === "Backspace") {
                  //   setInput(input.slice(0, -1));
                  // }
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSend} size="icon" className="bg-[#f9402b] hover:bg-[#A04840] text-white rounded-full h-12 w-12 cursor-pointer">
                <ArrowUp size={24} />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

