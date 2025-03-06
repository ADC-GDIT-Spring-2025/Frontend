import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun, CircleArrowUp,Filter } from "lucide-react"
import { Input } from "@/components/ui/input"



export default function Home() {
  return (
    <div className="flex flex-col justify-between h-screen p-4" >
      
      {/* The first div is for the section with the clear button and the dark mode switch */}
      <div className="flex justify-between items-center w-full" >
        <div className="flex items-center space-x-2">
          <Sun></Sun>
          <Switch/>
        </div>
        <Button className="cursor-pointer hover:bg-praxisRed">Clear</Button>
      </div>

      {/* Our second div witll have the title and sample prompts */}
      <div className="flex flex-col items-center space-y-4">

        <div className="flex justify-center items-center" >
          <h1 className="align-middle text-center text-5xl mr-2" >Welcome to </h1> <h1 className="align-middle text-center text-5xl text-praxisRed" > EmailMiner.ai</h1>
        </div>

        <h2 className="text-center text-xl text-gray-600">Stuck? Here are some example prompts...</h2>
        <div className="grid grid-flow-col grid-rows-2 gap-4">
          <div>
            <Button className="w-full cursor-pointer">Were there more emails sent in 2000 or 2001?</Button>
          </div>
          <div>
            <Button className="w-full cursor-pointer">How many emails are from the CEO?</Button>
          </div>
          <div>
            <Button className="w-full cursor-pointer">How many emails were agressive?</Button>
          </div>
          <div>
            <Button className="w-full cursor-pointer">Who sent the most amount of urgent emails?</Button>
          </div>
        </div>

      </div>
      


      {/* Our third div will have the actual text box */}
      <div className="flex flex-col items-center justify-between h-1/4">
        
        <div className=" border-2 border-solid w-1/2">
          <div>
            <Input placeholder="Type your question here..." className="border-0 mb-8"/>
          </div>

          <div className="flex justify-between items-center w-full">
            <Filter size={36} className="cursor-pointer ml-2 mb-1" ></Filter>
            <CircleArrowUp size={36} className="cursor-pointer mr-2 mb-1"/>
          </div>

        </div>
        
      </div>

      
    </div>
  );
}
