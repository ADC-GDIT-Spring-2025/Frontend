'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, Filter, Pencil, Info } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
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
import { useState } from "react";
import { fetchLlamaResponse } from "@/lib/llamaApi"; 
import { ChatMessage } from "@/components/chat/ChatMessage";

export default function Home() {

  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: { text: string; sender: "user" | "bot" } = { text: input, sender: "user" };
    setMessages((prevMessages : { text: string; sender: "user" | "bot" }[]) => [...prevMessages, userMessage]);

    try {
      console.log("Sending message:", input);
      const botResponse = await fetchLlamaResponse(input);
      const botMessage: { text: string; sender: "user" | "bot" } = { text: botResponse, sender: "bot" };
      setMessages((prevMessages : { text: string; sender: "user" | "bot" }[]) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }

    setInput(""); //clear input after
  };
  return (
    <div className="min-h-screen relative flex flex-col text-white">
      <div className="absolute w-full h-full bg-[url('/gradient.png')] bg-cover bg-no-repeat brightness-50 z-[-5]"></div>
      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="flex-1 flex flex-col items-center justify-center">
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
        </div>

        <div className="w-full max-w-6xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-black/30 flex flex-col justify-center h-24 border-gray-500 backdrop-blur-sm hover:bg-black/40 transition-colors">
              <CardContent className="">
                <h3 className="text-xl text-gray-100 font-semibold mb-2">Summarize the key points</h3>
                <p className="text-gray-300 text-sm">from the emails sent by Jeffrey Skilling.</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 flex flex-col justify-center h-24 border-gray-500 backdrop-blur-sm hover:bg-black/40 transition-colors">
              <CardContent className="">
                <h3 className="text-xl text-gray-100 font-semibold mb-2">List all emails exchanged</h3>
                <p className="text-gray-300 text-sm">between Jeffrey Skilling and Andy Fastow.</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 flex flex-col justify-center h-24 border-gray-500 backdrop-blur-sm hover:bg-black/40 transition-colors">
              <CardContent className="">
                <h3 className="text-xl text-gray-100 font-semibold mb-2">Analyze the sentiment</h3>
                <p className="text-gray-300 text-sm">of emails discussing the stock prices.</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col justify-end md:flex-row gap-4 items-end">
            <Select>
              <SelectTrigger className="bg-[#f9402b] h-12 hover:bg-[#A04840] border-none">
                <Pencil className="h-5 w-5 mr-2" />
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" className="bg-[#f9402b] hover:bg-[#A04840] text-white rounded-full h-12 w-12">
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
              <Textarea
                placeholder="Enter a prompt..."
                className="bg-black/30 border-gray-500 min-h-[48px] max-h-[200px] pl-4 py-3 text-white placeholder:text-gray-400 w-full resize-none overflow-y-auto"
                onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  const target = e.currentTarget;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
                }}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSend} size="icon" className="bg-[#f9402b] hover:bg-[#A04840] text-white rounded-full h-12 w-12">
                <ArrowUp size={24} />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

