import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
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



export default function Home() {
  return (
    <div className="flex flex-col justify-between h-screen p-4 bg-neutral-900" >
      
      {/* The first div is for the section with the clear button and the dark mode switch */}
      <div className="flex justify-between items-center w-full text-white text-3xl" >
        <h2>EmailMiner.ai</h2>

        <Button className="cursor-pointer hover:bg-praxisRed">Clear</Button>
      </div>

      {/* Our second div witll have the title and sample prompts */}
      <div className="flex flex-col items-center space-y-4">

        <div className="flex justify-center items-center" >
          <Mail color="#ffffff" size={50} className="" />
          <h1 className="align-middle text-center text-5xl mr-2 text-white ml-4" >Welcome to EmailMiner.ai </h1>
        </div>

        <h2 className="text-center text-xl text-gray-300">Stuck? Here are some example prompts...</h2>
        <div className="grid grid-flow-col grid-rows-2 gap-4">
          <div>
            <Button className="w-full cursor-pointer bg-neutral-800 text-white">Summarize the key points from the emails sent by Jeffrey Skilling.</Button>
          </div>
          <div>
            <Button className="w-full cursor-pointer bg-neutral-800 text-white">What were the most active hours or days for email exchanges?</Button>
          </div>
          <div>
            <Button className="w-full cursor-pointer bg-neutral-800 text-white">List all emails exchanged between Jeffrey Skilling and Andy Fastow.</Button>
          </div>
          <div>
            <Button className="w-full cursor-pointer bg-neutral-800 text-white">What was the sentiment of emails discussing stock price?</Button>
          </div>
        </div>

      </div>
      


      {/* Our third div will have the actual text box */}
      <div className="flex flex-col items-center justify-between h-1/4">
        
        <div className=" border-2 border-solid w-1/2 rounded-md bg-neutral-800 border-black">
          <div>
            <Input placeholder="Enter your prompt here..." className="mb-8 focus-visible:ring-0 !border-none shadow-none text-white placeholder:text-gray-400"/>
          </div>

          <div className="flex justify-between items-center w-full">
            <div className="relative inline-flex">
                  <Circle color = "#888888" size={38} strokeWidth={1.5} className="cursor-pointer ml-2 mb-2"></Circle>
                  <Filter color = "#888888" size={23} className="cursor-pointer absolute top-1/2 left-6.75 -translate-x-1/2 -translate-y-3.5" ></Filter>
            </div>
            <CircleArrowUp color = "#888888" size={38} strokeWidth={1.5} className="cursor-pointer mr-2 mb-2"/>
          </div>

        </div>
        
      </div>

      
    </div>
  );
}
