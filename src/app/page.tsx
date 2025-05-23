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
import Markdown from "react-markdown";
import Loader from "@/components/chat/loader";
import { ChatMessageType, EmailType } from "@/app/types";

export default function Home() {
  const [input, setInput] = useState("");
  const [thread, setThread] = useState<ChatMessageType[]>([]);
  const [startedChat, setStartedChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    cc: "",
    bcc: "",
    dateFrom: "",
    dateTo: "",
    keywords: "",
    hasAttachment: "any",
    useNeo4j: true,
    useQdrant: true,
  });
  const [emails, setEmails] = useState<EmailType[]>([]);

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
    const userMessage: ChatMessageType = { role: "user", message: input, emails: [] }; 
    setThread((prev) => [...prev, userMessage]);
    setStartedChat(true);
    setLoading(true);

    try {
      console.log("Sending message:", input);
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: input,
          filters: filters
        })
      });

      let data = await response.json();

      if (!response.ok) {
        data = "Error fetching llama response:" + (data.error ?? "Unknown error");
        console.error(data);
      }

      console.log(data);

      // Add assistant message to the thread
      const botResponse = data["llm_response"]
      setThread((prev) => [...prev, { role: "assistant", message: botResponse, emails: data["raw_emails"] ?? [] }]);

      setEmails(data["raw_emails"] ?? []); // Set emails from the response

      console.log(emails)
    } catch (error) {
      console.error("Error fetching bot response:", error);
    } finally {
      setLoading(false);
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
      {!startedChat ? (
        <div className="absolute w-full h-full bg-radial-[at_25%_25%] from-[#d4534a] via-[#471512] to-75% to-black bg-cover bg-no-repeat z-[-5]"></div>
      ) : (
        <div className="absolute w-full h-full">
        <div className="absolute w-full h-full bg-radial-[at_25%_25%] bg-blend-darken from-[#d4534a] via-[#471512] to-75% to-black bg-cover bg-no-repeat z-[-5]"></div>
        <div className="absolute w-full h-full bg-black z-[-4] opacity-30"></div>
        </div>
      )}
      
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 z-10 backdrop-blur-md">
        {/* Clear Messages Button in the top-left */}
        <Button
          variant="link"
          className="cursor-pointer text-white"
          onClick={handleClear}
        >
          Clear Messages
        </Button>

        {/* Logo in the top-right */}
        <div className="flex items-center mr-2">
              <img
              src="/praxis_engineering_dark_mode_logo.png"
              alt="Praxis Engineering Logo"
              className="h-10 object-contain opacity-50"
            />
        </div>
      </div>
      <main className="flex-1 flex flex-col">
        {!startedChat ? (
        <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
          {/* put here */}
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
              <CardContent className="cursor-pointer" onClick={() => setInput("Summarize the key points from the emails sent to or from Beverly Stephens.")}>
                <h3 className="text-xl text-gray-100 font-semibold mb-2">Summarize the key points</h3>
                <p className="text-gray-300 text-sm">from the emails sent to or from Beverly Stephens.</p>
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
        <div className="flex-1 pt-10 pb-[120px] mt-9 z-[9] overflow-auto max-h-full flex-col-reverse">
          <div className="max-w-6xl mx-auto space-y-4">
            {thread.map((msg, index) => (
              <div ref={index === thread.length - 2 ? latestMessageRef : null} key = {index} className="text-white">
                {msg.role === "user" && (
                  <ChatMessage message={msg.message} role={msg.role} />
                )}

                {msg.role === "assistant" && (
                  <div>
                    <div
                      className="prose prose-headings:text-white prose-li:text-white prose-ol:text-white prose-blockquote:text-white prose-strong:text-white text-white"
                      style={{
                        "--tw-prose-bullets": "white", // For unordered list bullets
                        "--tw-prose-counters": "white", // For ordered list numbers
                      } as React.CSSProperties}
                    >
                      <Markdown>{msg.message}</Markdown>
                    </div>

                    {/* Dialog Trigger Below Each Message When Emails Are Present */}
                    {msg.emails && msg.emails.length > 0 && (
                      <div className="mt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-[#f25b50] hover:bg-[#A04840] text-white rounded-md"
                            >
                              View Emails
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-black/90 border-gray-800 text-white max-h-[75vh] max-w-[90vw] overflow-y-scroll scrollbar-hide">
                            <DialogHeader>
                              <DialogTitle>Email Data</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              {msg.emails.map((email, emailIndex) => (
                                <div
                                  key={emailIndex}
                                  className="bg-black/30 border border-gray-500 rounded-md p-4 break-words whitespace-pre-wrap"
                                >
                                  <h3 className="text-lg font-semibold text-white">
                                    {email.subject}
                                  </h3>
                                  <p className="text-sm text-gray-300">
                                  <strong>From:</strong> {email.from}
                                </p>
                                <p className="text-sm text-gray-300">
                                      <strong>To:</strong> {email.to.join(", ")}
                                </p>
                                <p className="text-sm text-gray-300">
                                      <strong>Date:</strong> {email.time}
                                </p>
                                    {email.cc &&
                                      Array.isArray(email.cc) &&
                                      email.cc.length > 0 && (
                                <p className="text-sm text-gray-300">
                                          <strong>CC:</strong>{" "}
                                          {email.cc.join(", ")}
                                </p>
                                      )}
                                    {email.bcc &&
                                      Array.isArray(email.bcc) &&
                                      email.bcc.length > 0 && (
                                <p className="text-sm text-gray-300">
                                          <strong>BCC:</strong>{" "}
                                          {email.bcc.join(", ")}
                                </p>
                                      )}
                                <p className="text-sm text-gray-300 mt-2">
                                  {email.body}
                                </p>
                              </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {loading && (
                <Loader />
            )}
          </div>
        </div>
      )}

        {/* Fixing input at the bottom */}
        <div className="fixed bottom-0 left-0 z-[10] right-0 backdrop-blur-md p-3">
          <div className="flex flex-col justify-end md:flex-row md:items-center gap-4 items-end max-w-6xl mx-auto">

            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" className="bg-[#f25b50] hover:bg-[#A04840] text-white rounded-full h-12 w-12 cursor-pointer">
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
                        value={filters.from}
                        onChange={(e) => setFilters(prev => ({ ...prev, from: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">To</label>
                      <Input
                        placeholder="Recipient email address"
                        className="bg-black/30 border-gray-500 text-white placeholder:text-gray-400"
                        value={filters.to}
                        onChange={(e) => setFilters(prev => ({ ...prev, to: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">CC</label>
                      <Input
                        placeholder="CC email address"
                        className="bg-black/30 border-gray-500 text-white placeholder:text-gray-400"
                        value={filters.cc}
                        onChange={(e) => setFilters(prev => ({ ...prev, cc: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">BCC</label>
                      <Input
                        placeholder="BCC email address"
                        className="bg-black/30 border-gray-500 text-white placeholder:text-gray-400"
                        value={filters.bcc}
                        onChange={(e) => setFilters(prev => ({ ...prev, bcc: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Date Range</label>
                      <div className="flex gap-2">
                        <Input
                          type="date"
                          className="bg-black/30 border-gray-500 text-white"
                          value={filters.dateFrom}
                          onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                        />
                        <Input
                          type="date"
                          className="bg-black/30 border-gray-500 text-white"
                          value={filters.dateTo}
                          onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Contains Keywords</label>
                      <Input
                        placeholder="Search terms"
                        className="bg-black/30 border-gray-500 text-white placeholder:text-gray-400"
                        value={filters.keywords}
                        onChange={(e) => setFilters(prev => ({ ...prev, keywords: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Has Attachment</label>
                      <Select value={filters.hasAttachment} onValueChange={(value) => setFilters(prev => ({ ...prev, hasAttachment: value }))}>
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
                        className="h-4 w-4 text-[#f25b50] border-gray-500 bg-black/30 focus:ring-[#f9402b]"
                        checked={filters.useNeo4j}
                        onChange={(e) => setFilters(prev => ({ ...prev, useNeo4j: e.target.checked }))}
                      />
                      <label htmlFor="neo4j" className="ml-2 text-sm font-medium text-white">
                        Neo4J
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="qdrant"
                        className="h-4 w-4 text-[#f25b50] border-gray-500 bg-black/30 focus:ring-[#f9402b]"
                        checked={filters.useQdrant}
                        onChange={(e) => setFilters(prev => ({ ...prev, useQdrant: e.target.checked }))}
                      />
                      <label htmlFor="qdrant" className="ml-2 text-sm font-medium text-white">
                        Qdrant
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="bg-transparent border-gray-500 text-white hover:bg-black/30"
                        onClick={() => setFilters({
                          from: "",
                          to: "",
                          cc: "",
                          bcc: "",
                          dateFrom: "",
                          dateTo: "",
                          keywords: "",
                          hasAttachment: "any",
                          useNeo4j: true,
                          useQdrant: false
                        })}
                      >
                        Reset
                      </Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                      <Button className="bg-[#f25b50] hover:bg-[#A04840] text-white border-none">
                        Apply Filters
                      </Button>
                    </DialogTrigger>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex-1 relative">
              <textarea
                placeholder="Enter a prompt..."
                className=" bg-black/30 border border-gray-500 resize-none pl-4 py-3 placeholder:text-gray-400 w-full rounded-md overflow-y-auto focus:outline-none focus:ring-1 scrollbar-hide focus:ring-gray-400"
                value={input}
                onChange={(e) => {
                  if (input.length < 150) {
                    setInput(e.target.value);
                  }




                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 175)}px`;
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
              <Button onClick={handleSend} size="icon" className="bg-[#f25b50] hover:bg-[#A04840] text-white rounded-full h-12 w-12 cursor-pointer">
                <ArrowUp size={24} />
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <h2 className="text-zinc-400" >Character Remaining: {150 - input.length} / 150</h2>
          </div>
        </div>
      </main>
    </div>
  )
}

